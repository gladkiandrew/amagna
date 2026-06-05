'use server';

import { Resend } from 'resend';
import { generateGoldMapPlan, planToEmailText } from '@/lib/gold-map';
import {
  validateIntake,
  intakeSummary,
  nicheFromType,
  type GoldMapIntake,
  type GoldMapPlan,
  type IntakeResult,
  type PlanResult,
} from '@/lib/gold-map-shared';
import { getSupabaseAdmin, getAmagnaOrgId } from '@/lib/supabase-server';

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
  email_error?: string;
};

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
}): Promise<PlanResult> {
  const { submissionId, intake, key } = args;

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

  const plan = await generateGoldMapPlan(intake, key?.trim() || undefined);

  // Email the lead (hard requirement) — never block the on-screen render on it.
  let emailed = false;
  let emailError: string | undefined;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey && intake.email) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: FROM,
        to: intake.email,
        replyTo: ANDREW,
        subject: 'Your Plan to Gold — the map the crew charted',
        text: planToEmailText(intake, plan),
      });
      emailed = true;
      // Notify Andrew of the lead (best-effort).
      await resend.emails.send({
        from: FROM,
        to: ANDREW,
        replyTo: intake.email,
        subject: `Gold Map lead — ${intake.businessName}`,
        text: `${intakeSummary(intake)}\n\n--- Plan generated ---\n${plan.headline}`,
      });
    } catch (error) {
      emailError = error instanceof Error ? error.message : 'send failed';
      console.error('[gold-map] email send failed', error);
    }
  } else if (!apiKey) {
    console.warn('[gold-map] RESEND_API_KEY not set — plan not emailed');
  }

  // Persist the plan + status (best-effort).
  if (supabase && submissionId) {
    const payload: GoldMapPayload = {
      source: 'gold-map',
      status: 'plan_generated',
      intake,
      key: key?.trim() || undefined,
      plan,
      ...(emailError ? { email_error: emailError } : {}),
    };
    await supabase
      .from('widget_submissions')
      .update({ audit_json: payload, viewed_at: new Date().toISOString() })
      .eq('id', submissionId);
  }

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
