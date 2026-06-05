import 'server-only';
import { env } from './env';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export type TurnstileResult = 'ok' | 'invalid' | 'unconfigured';

/**
 * Verify a Cloudflare Turnstile token server-side via siteverify.
 *
 * Returns:
 *  - 'unconfigured' — TURNSTILE_SECRET_KEY is unset. The caller degrades
 *    gracefully: the lead is already captured at Step 1, so we never brick the
 *    funnel just because bot-check isn't wired in this environment.
 *  - 'invalid' — token missing, rejected by Cloudflare, or unverifiable. We
 *    fail closed on network errors so a generation is never paid for blind.
 *  - 'ok' — Cloudflare confirmed the token.
 *
 * No new npm dependency — a plain fetch POST, which the Worker runtime allows.
 */
export async function verifyTurnstile(token: string | undefined): Promise<TurnstileResult> {
  const secret = env('TURNSTILE_SECRET_KEY');
  if (!secret) return 'unconfigured';
  if (!token) return 'invalid';

  try {
    const body = new URLSearchParams({ secret, response: token });
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true ? 'ok' : 'invalid';
  } catch (error) {
    console.error('[turnstile] siteverify request failed', error);
    return 'invalid';
  }
}
