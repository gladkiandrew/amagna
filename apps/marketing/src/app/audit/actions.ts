'use server';

import { generateAudit } from '@/lib/audit';
import {
  validateAuditInput,
  type AuditInput,
  type AuditState,
} from '@/lib/audit-shared';
import { getSupabaseAdmin, getAmagnaOrgId } from '@/lib/supabase-server';

function readForm(formData: FormData): AuditInput {
  const get = (k: string) => String(formData.get(k) ?? '').trim();
  const nicheRaw = get('niche');
  const niche =
    nicheRaw === 'home_services' || nicheRaw === 'real_estate' || nicheRaw === 'other'
      ? nicheRaw
      : null;
  return {
    name: get('name'),
    email: get('email'),
    businessName: get('businessName'),
    situationText: get('situationText'),
    niche,
  };
}

/**
 * /audit widget server action.
 *
 * Pipeline:
 *  1. validate input
 *  2. insert a `widget_submissions` row (lead capture happens first — never lost)
 *  3. generate the audit (Anthropic today; Sapt SERP/GBP wires in via lib/audit
 *     once SAPT_API_KEY lands — same return shape)
 *  4. update the row with audit_json + viewed_at
 *  5. return the audit so the client renders it inline
 *
 * Every step is guarded so a partial outage still captures the lead.
 *
 * TODO (when SAPT_API_KEY + SAPT_PROJECT_ID are set):
 *   call the Sapt SERP MCP for real ranking data and merge into the prompt
 *   context that lib/audit.generateAudit() passes to Claude.
 */
export async function submitAudit(
  _prevState: AuditState,
  formData: FormData,
): Promise<AuditState> {
  const input = readForm(formData);

  const fieldErrors = validateAuditInput(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: 'error',
      message: 'Please fix the highlighted fields.',
      fieldErrors,
    };
  }

  // Step 1 — capture the lead immediately, even if everything else fails.
  const supabase = getSupabaseAdmin();
  let submissionId: string | undefined;
  if (supabase) {
    const orgId = await getAmagnaOrgId(supabase);
    if (orgId) {
      const { data, error } = await supabase
        .from('widget_submissions')
        .insert({
          organization_id: orgId,
          name: input.name,
          email: input.email,
          business_name: input.businessName,
          niche: input.niche,
          situation_text: input.situationText,
        })
        .select('id')
        .single();
      if (!error && data) submissionId = data.id as string;
      else console.error('[audit] insert failed', error);
    }
  } else {
    console.warn('[audit] Supabase admin client not configured — lead not persisted');
  }

  // Step 2 — log the structured submission so nothing is lost regardless.
  console.info('[audit] submission', JSON.stringify({ ...input, submissionId }));

  // Step 3 — generate the audit. Returns a graceful fallback if no AI key set.
  const audit = await generateAudit(input);

  // Step 4 — persist the audit JSON + mark viewed.
  if (supabase && submissionId) {
    await supabase
      .from('widget_submissions')
      .update({ audit_json: audit, viewed_at: new Date().toISOString() })
      .eq('id', submissionId);
  }

  return {
    status: 'success',
    message: 'Audit ready.',
    fieldErrors: {},
    audit,
    submissionId,
  };
}
