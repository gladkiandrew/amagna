import 'server-only';

/**
 * Read an environment variable at request time.
 *
 * Under @opennextjs/cloudflare with `nodejs_compat` and
 * `compatibility_date >= 2025-04-01`, `process.env` is populated from
 * the worker's `vars` + secrets. That works the same way on Node locally
 * (next dev / next build), so this helper is now a thin wrapper that just
 * normalizes empty strings to undefined.
 *
 * The previous next-on-pages-specific `getRequestContext().env` path was
 * removed when the app migrated to Workers (ADR-004).
 */
export function env(name: string): string | undefined {
  const v = process.env[name];
  return typeof v === 'string' && v.length > 0 ? v : undefined;
}
