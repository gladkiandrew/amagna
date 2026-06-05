'use server';

import { Resend } from 'resend';
import { generateGoldMapPlan, planToEmailText, planBodyText } from '@/lib/gold-map';
import {
  validateIntake,
  intakeSummary,
  nicheFromType,
  normalizeBusiness,
  intakeSignature,
  type GoldMapIntake,
  type GoldMapPlan,
  type IntakeResult,
  type PlanResult,
} from '@/lib/gold-map-shared';
import { getSupabaseAdmin, getAmagnaOrgId } from '@/lib/supabase-server';
import { verifyTurnstile } from '@/lib/turnstile';

const FROM = 'Amagna AI <noreply@amagna.co>';
const ANDREW = 'andrew@amagna.co';

/**
 * The Gold Map server actions (the rebuilt /audit funnel).
 *
 * Supabase: ADDITIVE ONLY — reuses the existing `widget_submissions` table with
 * ZERO schema change. Gold Map data rides in the existing columns: a readable
 * `situation_text`, and an `audit_json` payload carrying the source marker,
 * status (intake_only → keyed → plan_generated), the full intake, the master
 * key, and the generated plan. No migration is required.
 *
 * Every step degrades gracefully: on-screen render never depends on Supabase or
 * email. The lead is captured the instant Step 1 is submitted.
 */

type GoldMapPayload = {
  source: 'gold-map';
  status: 'intake_only' | 'keyed' | 'plan_generated';
  intake: GoldMapIntake;
  key?: string;
  plan?: GoldMapPlan;
  /** Content signature of intake+key when the plan was generated (cache key). */
  sig?: string;
  email_error?: string;
};

/**
 * Send the plan to the lead (hard requirement) + notify Andrew with the full
 * plan (best-effort). The lead email defines `emailed`; a failed notification
 * still counts as emailed but records the error. NOT exported — this is a
 * 'use server' module, so only the action functions may be exported.
 */
async function sendPlanEmails(
  intake: GoldMapIntake,
  plan: GoldMapPlan,
): Promise<{ emailed: boolean; emailError?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[gold-map] RESEND_API_KEY not set — plan not emailed');
    return { emailed: false };
  }
  if (!intake.email) return { emailed: false };

  const resend = new Resend(apiKey);
  try {
    await resend.emails.send({
      from: FROM,
      to: intake.email,
      replyTo: ANDREW,
      subject: 'Your Plan to Gold — the map the crew charted',
      text: planToEmailText(intake, plan),
    });
  } catch (error) {
    console.error('[gold-map] lead email send failed', error);
    return { emailed: false, emailError: error instanceof Error ? error.message : 'send failed' };
  }
  // Notify Andrew with the SAME full body the lead receives (best-effort).
  try {
    await resend.emails.send({
      from: FROM,
      to: ANDREW,
      replyTo: intake.email,
      subject: `Gold Map lead — ${intake.businessName}`,
      text: `${intakeSummary(intake)}\n\n--- Plan to Gold ---\n\n${planBodyText(plan)}`,
    });
  } catch (error) {
    console.error('[gold-map] lead notification send failed', error);
    return { emailed: true, emailError: error instanceof Error ? error.message : 'notify failed' };
  }
  return { emailed: true };
}

/** Persist the generated/reused plan + status on the submission (best-effort). */
async function persistPlan(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  submissionId: string | null,
  intake: GoldMapIntake,
  key: string | undefined,
  sig: string,
  plan: GoldMapPlan,
  emailError?: string,
): Promise<void> {
  if (!supabase || !submissionId) return;
  const payload: GoldMapPayload = {
    source: 'gold-map',
    status: 'plan_generated',
    intake,
    key: key?.trim() || undefined,
    plan,
    sig,
    ...(emailError ? { email_error: emailError } : {}),
  };
  await supabase
    .from('widget_submissions')
    .update({ audit_json: payload, viewed_at: new Date().toISOString() })
    .eq('id', submissionId);
}

/** Step 1 — capture the intake to Supabase immediately. Lead is never lost. */
export async function captureGoldMapIntake(intake: GoldMapIntake): Promise<IntakeResult> {
  const fieldErrors = validateIntake(intake);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, submissionId: null, fieldErrors, message: 'Please fix the highlighted fields.' };
  }

  // Always log — the safety net if the DB isn't configured.
  console.info('[gold-map] intake', JSON.stringify({ email: intake.email, business: intake.businessName }));

  const supabase = getSupabaseAdmin();
  let submissionId: string | null = null;
  if (supabase) {
    const orgId = await getAmagnaOrgId(supabase);
    if (orgId) {
      const payload: GoldMapPayload = { source: 'gold-map', status: 'intake_only', intake };
      const { data, error } = await supabase
        .from('widget_submissions')
        .insert({
          organization_id: orgId,
          name: intake.name,
          email: intake.email,
          business_name: intake.businessName,
          niche: nicheFromType(intake.businessType),
          situation_text: intakeSummary(intake),
          audit_json: payload,
        })
        .select('id')
        .single();
      if (!error && data) submissionId = data.id as string;
      else console.error('[gold-map] intake insert failed', error);
    }
  } else {
    console.warn('[gold-map] Supabase not configured — intake logged only');
  }

  return { ok: true, submissionId, fieldErrors: {} };
}

/**
 * The dig — generate the Plan to Gold, persist it, and email it to the lead.
 *
 * Cost discipline: if this submission already has a plan, reuse it (no repeat
 * generation). Generation only ever runs after Step-1 capture (the email gate).
 */
export async function generateGoldMapPlanAction(args: {
  submissionId: string | null;
  intake: GoldMapIntake;
  key?: string;
  turnstileToken?: string;
}): Promise<PlanResult> {
  const { submissionId, intake, key, turnstileToken } = args;

  // Bot gate — Step 1 already saved the lead, so this only protects the
  // expensive generation. 'unconfigured' (no secret in this env) passes
  // through; an invalid/missing token when the secret IS set is refused.
  const gate = await verifyTurnstile(turnstileToken);
  if (gate === 'invalid') {
    return { ok: false, message: 'Bot check failed — complete the verification and try again.' };
  }

  // Content signature of these exact inputs — the cache key for same-business reuse.
  const sig = intakeSignature(intake, key);

  const supabase = getSupabaseAdmin();

  // Cost guard — reuse an already-generated plan for this submission.
  if (supabase && submissionId) {
    const { data } = await supabase
      .from('widget_submissions')
      .select('audit_json')
      .eq('id', submissionId)
      .maybeSingle();
    const existing = data?.audit_json as GoldMapPayload | undefined;
    if (existing?.plan) {
      return { ok: true, plan: existing.plan, emailed: true };
    }
  }

  // Cost guard 2 — same email AND same business: reuse that business's recent
  // plan. Reusing is keyed on the NORMALIZED business name, so a second business
  // from the same email (HydroClean → Breaking the Fast) generates fresh and is
  // stored on its own submission row — it never returns or overwrites the other
  // business's plan. A per-email rate cap (max 3 generations / 24h) is the cost
  // backstop: over the cap we politely return the lead's most recent plan.
  if (supabase && intake.email) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data } = await supabase
      .from('widget_submissions')
      .select('audit_json, created_at')
      .eq('email', intake.email)
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(20);
    const recent = (data ?? [])
      .map((r) => r.audit_json as GoldMapPayload | undefined)
      .filter((pl): pl is GoldMapPayload => pl?.source === 'gold-map');

    // (a) Same business AND unchanged inputs → reuse its plan. The signature
    // guard means a materially-changed intake (new goals, area, key, …)
    // regenerates instead of returning a stale plan.
    const targetBiz = normalizeBusiness(intake.businessName);
    const sameBusiness = recent.find(
      (pl) =>
        pl.plan &&
        normalizeBusiness(pl.intake?.businessName ?? '') === targetBiz &&
        pl.sig === sig,
    );
    if (sameBusiness?.plan) {
      // Reuse the plan, but STILL email it — a cached return must never leave
      // the lead empty-handed — and record it on this submission row.
      const { emailed, emailError } = await sendPlanEmails(intake, sameBusiness.plan);
      await persistPlan(supabase, submissionId, intake, key, sig, sameBusiness.plan, emailError);
      return { ok: true, plan: sameBusiness.plan, emailed };
    }

    // (b) Different business, but the email is over its 24h generation cap →
    // hand back the most recent plan rather than paying for another generation.
    const generatedInWindow = recent.filter((pl) => pl.status === 'plan_generated' && pl.plan).length;
    if (generatedInWindow >= 3) {
      const mostRecent = recent.find((pl) => pl.plan);
      if (mostRecent?.plan) {
        return {
          ok: true,
          plan: mostRecent.plan,
          emailed: true,
          message:
            "You've charted a few maps recently — here's your latest. Reply to the email and the crew will help with more.",
        };
      }
    }
  }

  const plan = await generateGoldMapPlan(intake, key?.trim() || undefined);

  // Email the lead (+ notify Andrew), then persist — never block render on it.
  const { emailed, emailError } = await sendPlanEmails(intake, plan);
  await persistPlan(supabase, submissionId, intake, key, sig, plan, emailError);

  return { ok: true, plan, emailed };
}

/** Step 3 — mark the lead as "keyed" (stored the master key) before the dig. */
export async function markGoldMapKeyed(args: {
  submissionId: string | null;
  intake: GoldMapIntake;
  key: string;
}): Promise<{ ok: boolean }> {
  const { submissionId, intake, key } = args;
  const supabase = getSupabaseAdmin();
  if (supabase && submissionId) {
    const payload: GoldMapPayload = { source: 'gold-map', status: 'keyed', intake, key: key.trim() || undefined };
    await supabase
      .from('widget_submissions')
      .update({ audit_json: payload })
      .eq('id', submissionId);
  }
  return { ok: true };
}
