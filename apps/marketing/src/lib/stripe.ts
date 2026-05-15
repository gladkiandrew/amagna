import 'server-only';
import Stripe from 'stripe';

/**
 * Stripe server client. Reads STRIPE_SECRET_KEY at request time so test/live
 * mode can flip via env without rebuilding. Returns null when the key is
 * absent so callers can degrade gracefully (the checkout page renders a
 * "coming soon" panel).
 */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, {
    // Pin the API version so behaviour is deterministic across SDK upgrades.
    apiVersion: '2026-04-22.dahlia',
  });
}
