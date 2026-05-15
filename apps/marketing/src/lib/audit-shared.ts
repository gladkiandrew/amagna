/**
 * Client-safe types, constants, and validation for the /audit widget.
 *
 * The server-only generator (which imports the Anthropic SDK) lives in
 * lib/audit.ts and must NOT be imported from client components — keeping
 * the SDK import out of this file is what lets `audit-widget.tsx` bundle.
 */

/** Shape of a completed audit — rendered inline + stored in widget_submissions.audit_json. */
export type Audit = {
  whereYouStand: string[];
  whatsMissing: string[];
  thirtyDayPlan: string[];
  opportunity: string;
};

export type AuditInput = {
  name: string;
  email: string;
  businessName: string;
  situationText: string;
  niche?: 'home_services' | 'real_estate' | 'other' | null;
};

/** State returned from the submitAudit server action — drives the widget UI. */
export type AuditState = {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors: Partial<Record<keyof AuditInput, string>>;
  audit?: Audit;
  submissionId?: string;
};

export const INITIAL_AUDIT_STATE: AuditState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
};

export const NICHE_OPTIONS = [
  { value: 'home_services', label: 'Home services' },
  { value: 'real_estate', label: 'Real estate' },
  { value: 'other', label: 'Other / mixed' },
] as const;

/** Quick-fill chips on the /audit widget. */
export const QUICK_FILL_CHIPS = [
  "I'm an HVAC company in Michigan and I want more residential calls",
  "I'm a real estate agent and I want more seller listings",
  "I run a roofing company and I'm too dependent on referrals",
  "I'm a brokerage owner and I want my agents to look more pro online",
  "I have multiple service locations and need each ranking locally",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAuditInput(
  input: AuditInput,
): Partial<Record<keyof AuditInput, string>> {
  const errors: Partial<Record<keyof AuditInput, string>> = {};
  if (!input.name.trim()) errors.name = 'Your name is required.';
  if (!input.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!input.businessName.trim()) errors.businessName = 'Business name is required.';
  if (!input.situationText.trim()) {
    errors.situationText = 'Tell us about your business and your goal.';
  } else if (input.situationText.trim().length < 15) {
    errors.situationText = 'A sentence or two helps us scope it.';
  }
  return errors;
}
