/**
 * The two productized offers. Stripe price IDs come from env so the same
 * code drives test and live mode without redeploying.
 *
 *   Growth — $1,497/month recurring (the primary offer)
 *   Update — $500 one-time flat-rate website + GBP rebuild; funnels into Growth
 */

export type PlanSlug = 'growth' | 'update';

export type Plan = {
  slug: PlanSlug;
  name: string;
  priceCents: number;
  /** Stripe Checkout mode — drives subscription vs one-time payment. */
  mode: 'subscription' | 'payment';
  /** How the price reads on the page ("$1,497 / month" vs "$500 one-time"). */
  priceLabel: string;
  tagline: string;
  description: string;
  /** Reads at request time so test/live mode can switch via env without rebuilding. */
  stripePriceEnvVar: 'STRIPE_PRICE_GROWTH' | 'STRIPE_PRICE_UPDATE';
};

export const PLANS: Record<PlanSlug, Plan> = {
  growth: {
    slug: 'growth',
    name: 'Amagna Growth',
    priceCents: 149700,
    mode: 'subscription',
    priceLabel: '$1,497 / month',
    tagline: 'The full system, every month',
    description:
      'Funnel, ads, content, reviews, SEO, nurture, and a weekly report — built for your business and run every day.',
    stripePriceEnvVar: 'STRIPE_PRICE_GROWTH',
  },
  update: {
    slug: 'update',
    name: 'Amagna Update',
    priceCents: 50000,
    mode: 'payment',
    priceLabel: '$500 one-time',
    tagline: 'Website + GBP rebuild',
    description:
      'A flat-rate refresh of your website and Google Business Profile — modern, on-brand, conversion-ready. The natural on-ramp to Growth.',
    stripePriceEnvVar: 'STRIPE_PRICE_UPDATE',
  },
};

export function isPlanSlug(value: string): value is PlanSlug {
  return value === 'growth' || value === 'update';
}
