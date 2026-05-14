'use server';

import { Resend } from 'resend';
import {
  validateCustomQuote,
  type CustomQuoteInput,
  type CustomQuoteState,
} from '@/lib/custom-quote';

/** Where custom-quote inquiries are routed. */
const QUOTE_RECIPIENT = 'andrew@amagna.co';
const QUOTE_FROM = 'Amagna AI <noreply@amagna.co>';

function readForm(formData: FormData): CustomQuoteInput {
  const get = (k: string) => String(formData.get(k) ?? '').trim();
  return {
    companyName: get('companyName'),
    contactName: get('contactName'),
    contactEmail: get('contactEmail'),
    contactPhone: get('contactPhone'),
    niche: get('niche'),
    companySize: get('companySize'),
    locationsCount: get('locationsCount'),
    currentSpend: get('currentSpend'),
    primaryGoal: get('primaryGoal'),
  };
}

function emailBody(input: CustomQuoteInput): string {
  return [
    'New custom solutions inquiry from amagna.co',
    '',
    `Company:        ${input.companyName}`,
    `Contact:        ${input.contactName}`,
    `Email:          ${input.contactEmail}`,
    `Phone:          ${input.contactPhone || '—'}`,
    `Niche:          ${input.niche || '—'}`,
    `Company size:   ${input.companySize}`,
    `Locations:      ${input.locationsCount || '—'}`,
    `Current spend:  ${input.currentSpend || '—'}`,
    '',
    'Primary goal:',
    input.primaryGoal,
  ].join('\n');
}

/**
 * Server action behind the /custom-quote form.
 *
 * Routing today: emails QUOTE_RECIPIENT via Resend when RESEND_API_KEY is set.
 * Every submission is also logged server-side so nothing is lost before the
 * key + verified domain land.
 *
 * TODO (Phase 2, once Supabase is provisioned): also insert into the
 * `custom_solutions` table — the CustomQuoteInput field names already map to
 * that schema (see infra/supabase/migrations/0008_custom_solutions.sql).
 */
export async function submitCustomQuote(
  _prevState: CustomQuoteState,
  formData: FormData,
): Promise<CustomQuoteState> {
  const input = readForm(formData);

  const fieldErrors = validateCustomQuote(input);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false,
      message: 'Please fix the highlighted fields.',
      fieldErrors,
    };
  }

  // Always log — this is the safety net until email + DB are fully wired.
  console.info('[custom-quote] submission', JSON.stringify(input));

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: QUOTE_FROM,
        to: QUOTE_RECIPIENT,
        replyTo: input.contactEmail,
        subject: `Custom quote — ${input.companyName}`,
        text: emailBody(input),
      });
    } catch (error) {
      // Logged above, so the lead is not lost — surface for debugging only.
      console.error('[custom-quote] email send failed', error);
    }
  } else {
    console.warn('[custom-quote] RESEND_API_KEY not set — submission logged only');
  }

  return {
    ok: true,
    message:
      "Thanks — your inquiry is in. Andrew reviews every custom request personally and will get back to you within one business day.",
    fieldErrors: {},
  };
}
