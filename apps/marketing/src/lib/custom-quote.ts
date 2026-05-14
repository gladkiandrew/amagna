/**
 * Shared types + validation for the /custom-quote intake flow.
 * Field names line up with the Supabase `custom_solutions` table
 * (see infra/supabase/migrations/0008_custom_solutions.sql) so wiring the
 * database insert later is a direct mapping.
 */

export const COMPANY_SIZES = ['1–10', '11–50', '51–200', '200+'] as const;

export const SPEND_RANGES = [
  'Under $2k / mo',
  '$2k – $5k / mo',
  '$5k – $15k / mo',
  '$15k+ / mo',
  'Not sure',
] as const;

export const NICHE_OPTIONS = [
  { value: 'home_services', label: 'Home services' },
  { value: 'real_estate', label: 'Real estate' },
  { value: 'other', label: 'Other / mixed' },
] as const;

export type CustomQuoteInput = {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  niche: string;
  companySize: string;
  locationsCount: string;
  currentSpend: string;
  primaryGoal: string;
};

export type CustomQuoteState = {
  ok: boolean;
  /** Empty before first submit; a message after. */
  message: string;
  /** Per-field error messages, keyed by field name. */
  fieldErrors: Partial<Record<keyof CustomQuoteInput, string>>;
};

export const INITIAL_CUSTOM_QUOTE_STATE: CustomQuoteState = {
  ok: false,
  message: '',
  fieldErrors: {},
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Validate a raw submission. Returns field errors keyed by field name. */
export function validateCustomQuote(
  input: CustomQuoteInput,
): Partial<Record<keyof CustomQuoteInput, string>> {
  const errors: Partial<Record<keyof CustomQuoteInput, string>> = {};

  if (!input.companyName.trim()) errors.companyName = 'Company name is required.';
  if (!input.contactName.trim()) errors.contactName = 'Your name is required.';
  if (!input.contactEmail.trim()) {
    errors.contactEmail = 'Email is required.';
  } else if (!EMAIL_RE.test(input.contactEmail.trim())) {
    errors.contactEmail = 'Enter a valid email address.';
  }
  if (!input.companySize) errors.companySize = 'Pick a company size.';
  if (!input.primaryGoal.trim()) {
    errors.primaryGoal = 'Tell us what you want to happen.';
  } else if (input.primaryGoal.trim().length < 10) {
    errors.primaryGoal = 'A sentence or two helps us scope it.';
  }

  return errors;
}
