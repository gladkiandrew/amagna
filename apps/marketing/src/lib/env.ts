import 'server-only';
import { getRequestContext } from '@cloudflare/next-on-pages';

/**
 * Read an environment variable at request time.
 *
 * On Cloudflare Pages with `@cloudflare/next-on-pages`, runtime secrets set
 * in the Pages dashboard are *not* on `process.env` — they live on the request
 * context's `env` map. Falls back to `process.env` for local dev (`next dev`)
 * and for any code path that runs outside a Cloudflare request scope.
 */
export function env(name: string): string | undefined {
  try {
    const ctx = getRequestContext();
    const value = (ctx?.env as Record<string, unknown> | undefined)?.[name];
    if (typeof value === 'string' && value.length > 0) return value;
  } catch {
    // not inside a Cloudflare request — fall through to process.env
  }
  const v = process.env[name];
  return typeof v === 'string' && v.length > 0 ? v : undefined;
}
