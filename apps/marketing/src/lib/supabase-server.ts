import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

/**
 * Server-side Supabase client using the service role key (bypasses RLS).
 *
 * SERVER-ONLY. Never import this from a client component — it would leak the
 * service role key into the browser bundle.
 *
 * Reads via the runtime env helper so Cloudflare-set secrets resolve on Pages.
 * Returns null when the env vars are missing so callers can degrade gracefully.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = env('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/** Slug of the single tenant we run today (Amagna AI). */
export const AMAGNA_ORG_SLUG = 'amagna';

/** Resolve the Amagna organization id at runtime. Cached per server instance. */
let cachedAmagnaOrgId: string | null = null;

export async function getAmagnaOrgId(client: SupabaseClient): Promise<string | null> {
  if (cachedAmagnaOrgId) return cachedAmagnaOrgId;
  const { data, error } = await client
    .from('organizations')
    .select('id')
    .eq('slug', AMAGNA_ORG_SLUG)
    .maybeSingle();
  if (error || !data) return null;
  cachedAmagnaOrgId = data.id as string;
  return cachedAmagnaOrgId;
}
