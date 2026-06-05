/**
 * Client-safe types, options, validation, and prompt assembly for the Gold Map
 * (the /audit treasure-hunt funnel). NO server-only imports here — the Anthropic
 * generator lives in lib/gold-map.ts and must never reach the client bundle.
 */

/**
 * Optional "where you live online" links. Every field is optional — the lead
 * fills in whatever they have. Fed into BOTH the Step-2 key prompt and the plan
 * generator so the plan builds on existing presence and names the gaps.
 */
export type GoldMapLinks = {
  website: string;
  googleBusiness: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  youtube: string;
};

export type GoldMapIntake = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: string;
  monthlyRevenue: string;
  employees: string;
  serviceArea: string;
  socialChannels: string[];
  currentMarketing: string;
  goals: string;
  links: GoldMapLinks;
};

/** Where the lead got to in the hunt (stored on the submission). */
export type GoldMapStatus = 'intake_only' | 'keyed' | 'plan_generated';

/** Result of the Step-1 capture server action. */
export type IntakeResult = {
  ok: boolean;
  submissionId: string | null;
  fieldErrors: Partial<Record<keyof GoldMapIntake, string>>;
  message?: string;
};

/** Result of the plan-generation server action. */
export type PlanResult = {
  ok: boolean;
  plan?: GoldMapPlan;
  emailed?: boolean;
  message?: string;
};

/** The "Plan to Gold" — the genuinely-good, structured plan that IS the pitch. */
export type GoldMapPlan = {
  /** A punchy one-line framing of the opportunity, specific to them. */
  headline: string;
  /** One short paragraph: where they are → where this takes them. */
  summary: string;
  /** Ordered phases, each with concrete steps in plain English. */
  phases: { title: string; timeframe: string; steps: string[] }[];
  /** What the Amagna crew / system runs for them (plain English). */
  crewHandles: string[];
  /** The single first move to make. */
  firstMove: string;
};

export const BUSINESS_TYPES = [
  'Home services',
  'Real estate',
  'E-commerce',
  'Local service business',
  'Professional services',
  'Restaurant / hospitality',
  'Other',
] as const;

export const REVENUE_RANGES = [
  'Under $25K / month',
  '$25K–$75K / month',
  '$75K–$150K / month',
  '$150K–$400K / month',
  '$400K+ / month',
] as const;

export const EMPLOYEE_RANGES = ['Just me', '2–5', '6–15', '16–40', '40+'] as const;

export const SOCIAL_CHANNELS = [
  'Instagram',
  'Facebook',
  'TikTok',
  'YouTube',
  'LinkedIn',
  'X',
  'Google Business Profile',
  'None yet',
] as const;

/** Ordered link fields for the optional "where you live online" group. */
export const LINK_FIELDS = [
  { key: 'website', label: 'Website', placeholder: 'yourbusiness.com' },
  { key: 'googleBusiness', label: 'Google Business Profile', placeholder: 'Google Maps / GBP link' },
  { key: 'facebook', label: 'Facebook', placeholder: 'facebook.com/yourpage' },
  { key: 'instagram', label: 'Instagram', placeholder: '@handle or link' },
  { key: 'tiktok', label: 'TikTok', placeholder: '@handle or link' },
  { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/...' },
  { key: 'youtube', label: 'YouTube', placeholder: 'channel link' },
] as const satisfies ReadonlyArray<{ key: keyof GoldMapLinks; label: string; placeholder: string }>;

export function emptyLinks(): GoldMapLinks {
  return { website: '', googleBusiness: '', facebook: '', instagram: '', tiktok: '', linkedin: '', youtube: '' };
}

export function emptyIntake(): GoldMapIntake {
  return {
    name: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    monthlyRevenue: '',
    employees: '',
    serviceArea: '',
    socialChannels: [],
    currentMarketing: '',
    goals: '',
    links: emptyLinks(),
  };
}

/** Human-readable list of the links the lead actually filled in (label: value). */
export function presentLinks(links: GoldMapLinks): { label: string; value: string }[] {
  return LINK_FIELDS.map(({ key, label }) => ({ label, value: links[key].trim() })).filter(
    (l) => l.value.length > 0,
  );
}

/** The channels the lead listed a link for (used to name "started vs missing"). */
export function linksHaveAndMissing(links: GoldMapLinks): { have: string[]; missing: string[] } {
  const have: string[] = [];
  const missing: string[] = [];
  for (const { key, label } of LINK_FIELDS) {
    (links[key].trim() ? have : missing).push(label);
  }
  return { have, missing };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateIntake(input: GoldMapIntake): Partial<Record<keyof GoldMapIntake, string>> {
  const e: Partial<Record<keyof GoldMapIntake, string>> = {};
  if (!input.name.trim()) e.name = 'Your name is required.';
  if (!input.email.trim()) e.email = 'Email is required.';
  else if (!EMAIL_RE.test(input.email.trim())) e.email = 'Enter a valid email address.';
  if (!input.businessName.trim()) e.businessName = 'Business name is required.';
  if (!input.businessType.trim()) e.businessType = 'Pick the closest type.';
  if (!input.monthlyRevenue.trim()) e.monthlyRevenue = 'Pick a range.';
  if (!input.serviceArea.trim()) e.serviceArea = 'Where do you operate?';
  if (!input.goals.trim()) e.goals = 'What do you want more of?';
  else if (input.goals.trim().length < 8) e.goals = 'A few more words helps us chart it.';
  return e;
}

/**
 * Normalize a business name for cache-key comparison: lowercase, strip
 * punctuation, collapse whitespace. So "HydroClean", "hydroclean", and
 * "Hydro Clean!" all compare equal, but a genuinely different business
 * (e.g. "Breaking the Fast") never collides with another.
 */
export function normalizeBusiness(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Map a free business type onto the DB `niche` enum when it clearly matches. */
export function nicheFromType(businessType: string): 'home_services' | 'real_estate' | null {
  const t = businessType.toLowerCase();
  if (t.includes('home service')) return 'home_services';
  if (t.includes('real estate')) return 'real_estate';
  return null;
}

/** A readable one-blob rendering of the intake (for situation_text + emails). */
export function intakeSummary(i: GoldMapIntake): string {
  const links = presentLinks(i.links);
  return [
    `Business: ${i.businessName} (${i.businessType})`,
    `Monthly revenue: ${i.monthlyRevenue || '—'}`,
    `Team size: ${i.employees || '—'}`,
    `Service area: ${i.serviceArea || '—'}`,
    `Channels: ${i.socialChannels.length ? i.socialChannels.join(', ') : '—'}`,
    `Online presence: ${links.length ? links.map((l) => `${l.label}: ${l.value}`).join(' · ') : '—'}`,
    `Current marketing: ${i.currentMarketing || '—'}`,
    `Goals: ${i.goals || '—'}`,
    `Contact: ${i.name} · ${i.email} · ${i.phone || '—'}`,
  ].join('\n');
}

/**
 * Assemble — CLIENT-SIDE, no AI call — the personalized "forge your key" prompt.
 * The operator pastes this into their OWN AI (which already knows their
 * business); it returns a single dense "master prompt" (the key), ending with a
 * labeled, parseable data block.
 */
export function assembleKeyPrompt(i: GoldMapIntake): string {
  const links = presentLinks(i.links);
  const linksDataLine = links.length ? links.map((l) => `${l.label}: ${l.value}`).join(' | ') : '<none given>';
  const linksBrief = links.length
    ? links.map((l) => `  - ${l.label}: ${l.value}`).join('\n')
    : '  - (none provided)';
  return `I'm briefing a marketing agency (Amagna AI) so they can build me a custom growth plan. I want you to write ONE dense "master prompt" that describes my business completely.

Using everything you already know about my business — plus the details below and anything else I tell you — write a single, information-rich prompt that another AI could read cold and fully understand my business, my current situation, and my goals. Be specific and concrete. Add real context you know about me that isn't listed here. If you can see or recall what's on my website and social profiles below, factor in what I've already built and where I'm thin.

End your answer with a labeled data block in EXACTLY this format (keep the brackets):

[AMAGNA DATA]
Business: ${i.businessName || '<name>'}
Type: ${i.businessType || '<type>'}
Monthly revenue: ${i.monthlyRevenue || '<range>'}
Team size: ${i.employees || '<range>'}
Service area: ${i.serviceArea || '<area>'}
Channels: ${i.socialChannels.length ? i.socialChannels.join(', ') : '<channels>'}
Online presence: ${linksDataLine}
Current marketing: ${i.currentMarketing || '<what you do now>'}
Goals: ${i.goals || '<what you want more of>'}
[/AMAGNA DATA]

Here's what I told the agency to get you started:
- Business: ${i.businessName} — ${i.businessType}
- Monthly revenue: ${i.monthlyRevenue}
- Team size: ${i.employees}
- Service area: ${i.serviceArea}
- Channels: ${i.socialChannels.join(', ') || '—'}
- Where I live online:
${linksBrief}
- Current marketing: ${i.currentMarketing || '—'}
- Goals: ${i.goals}

Write the master prompt now.`;
}
