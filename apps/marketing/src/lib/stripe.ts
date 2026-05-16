import 'server-only';
import Stripe from 'stripe';
import { env } from './env';

/**
 * Stripe server client. Reads STRIPE_SECRET_KEY via the runtime env helper so
 * Cloudflare-set secrets resolve (raw process.env doesn't see them on Pages).
 * Returns null when the key is absent so callers degrade gracefully.
 */
export function getStripe(): Stripe | null {
  const key = env('STRIPE_SECRET_KEY');
  if (!key) return null;
  return new Stripe(key, {
    // Pin the API version so behaviour is deterministic across SDK upgrades.
    apiVersion: '2026-04-22.dahlia',
  });
}
