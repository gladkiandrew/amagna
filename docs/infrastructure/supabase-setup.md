# Supabase Setup — amagna

> **Status:** Live. All 9 migrations + seed are applied to the production project.
> **Last updated:** 2026-05-14

## What's provisioned

| Item | Value |
|---|---|
| Project name | `amagna` |
| Project ref | `gxruzbfstwecnjqbnspa` |
| API URL | `https://gxruzbfstwecnjqbnspa.supabase.co` |
| Region | `us-east-2` |
| Pooler host | `aws-1-us-east-2.pooler.supabase.com` (session mode, port 5432) |

## Schema — live

9 public tables, all with row-level security enabled:

```
organizations  users  clients  leads  agent_runs
content_pieces  reports  custom_solutions  audit_logs
```

The `organizations` table is seeded with the `Amagna AI` (`amagna`) row.

Source of truth is `infra/supabase/migrations/` (9 numbered files) + `infra/supabase/seed.sql`.
See `infra/supabase/README.md` for the data model and the RLS access model.

## How the migrations were run

The Supabase CLI and `psql` aren't installed locally, and the anon / service-role
keys are PostgREST/Auth JWTs — they cannot run DDL. So migrations run through a
small `pg`-based script that connects with the **database password**:

```bash
npm install pg                              # one-time, at repo root
node scripts/run-supabase-migrations.mjs    # reads SUPABASE_DB_PASSWORD from apps/marketing/.env.local
```

The script connects via the session-mode pooler (it probes `aws-1` then `aws-0`
shards), runs each migration file in its own transaction with per-file
verification, runs the seed, then lists the tables and the seeded org.

> The direct-connection host `db.<ref>.supabase.co` is IPv6-only, so the pooler
> is the reliable path from most machines.

## Verification (2026-05-14)

Confirmed live through PostgREST (the path the app's Supabase client will use):

- **Service role** read of `organizations` → `[{"name":"Amagna AI","slug":"amagna"}]`
  — schema is visible, seed row present, service role bypasses RLS as designed.
- **Anon** read of `organizations` → `[]` — RLS correctly blocks an
  unauthenticated caller. Tenant isolation is enforced.

## Environment

`apps/marketing/.env.local` (gitignored) holds:
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — client-side
- `SUPABASE_SERVICE_ROLE_KEY` — server-side only, never exposed to the browser
- `SUPABASE_DB_PASSWORD` — used only by the migration runner

The same keys are mirrored into the Cloudflare Pages project env vars
(see `docs/infrastructure/cloudflare-pages-setup.md`).

## Changing the schema later

Add a new numbered migration (`0010_*.sql`) — never edit one that's already
applied — then re-run `node scripts/run-supabase-migrations.mjs`. Each file is
idempotent-safe only if you write it that way; the runner stops on the first
failure and rolls that file back.

## Next steps (Phase 2)

The portal (`apps/portal`) builds on this schema: a shared Supabase client
package, Supabase Auth (magic links + Google OAuth), and per-tenant dashboards
gated by the RLS policies already in place.
