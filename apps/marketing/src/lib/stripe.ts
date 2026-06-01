import 'server-only';
import Stripe from 'stripe';
import { env } from './env';

/**
 * Stripe server client. Reads STRIPE_SECRET_KEY via the runtime env helper
 * (populated from worker vars/secrets under nodejs_compat). Returns null
 * when the key is absent so callers degrade gracefully.
 *
 * Why `createFetchHttpClient`: on Cloudflare Workers (Node runtime via
 * @opennextjs/cloudflare) the Stripe SDK's default http client tries to
 * reach Stripe via node:http, which isn't part of the nodejs_compat
 * polyfill set — every request fails with "An error occurred with our
 * connection to Stripe." Switching to the fetch-based client routes
 * Stripe calls through the Worker's global fetch, which Cloudflare allows.
 */
export function getStripe(): Stripe | null {
  const key = env('STRIPE_SECRET_KEY');
  if (!key) return null;
  return new Stripe(key, {
    // Pin the API version so behaviour is deterministic across SDK upgrades.
    apiVersion: '2026-04-22.dahlia',
    httpClient: Stripe.createFetchHttpClient(),
  });
}
