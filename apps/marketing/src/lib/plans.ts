/**
 * The two productized plans we sell. Stripe price IDs come from env so the
 * same code drives test and live mode without redeploying.
 */

export type PlanSlug = 'growth' | 'pilot';

export type Plan = {
  slug: PlanSlug;
  name: string;
  priceCents: number;
  tagline: string;
  description: string;
  /** Reads at request time so test/live mode can switch via env without rebuilding. */
  stripePriceEnvVar: 'STRIPE_PRICE_GROWTH' | 'STRIPE_PRICE_PILOT';
};

export const PLANS: Record<PlanSlug, Plan> = {
  growth: {
    slug: 'growth',
    name: 'Amagna Growth',
    priceCents: 149700,
    tagline: 'The full system, every month',
    description:
      'Funnel, ads, content, reviews, SEO, nurture, and a weekly report — built for your business and run every day.',
    stripePriceEnvVar: 'STRIPE_PRICE_GROWTH',
  },
  pilot: {
    slug: 'pilot',
    name: 'Amagna Pilot',
    priceCents: 99700,
    tagline: 'Starter for solo operators',
    description:
      'One funnel, base outreach, monthly report. A way to test the fit before stepping up to Growth.',
    stripePriceEnvVar: 'STRIPE_PRICE_PILOT',
  },
};

export function isPlanSlug(value: string): value is PlanSlug {
  return value === 'growth' || value === 'pilot';
}
