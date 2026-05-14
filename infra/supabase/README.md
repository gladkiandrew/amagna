# Supabase — schema, migrations, and provisioning

This directory is the source of truth for the Amagna database. The schema is written
as plain SQL migrations so it lives in git, gets reviewed in PRs, and can be replayed
into any Supabase project.

## What's here

```
infra/supabase/
├── migrations/
│   ├── 0001_init.sql            extensions, enum types, set_updated_at() trigger fn
│   ├── 0002_tenancy.sql         organizations, users, RLS helper functions
│   ├── 0003_clients.sql         clients (primary tenant-data table)
│   ├── 0004_leads.sql           leads
│   ├── 0005_agent_runs.sql      agent_runs (agent observability + cost spine)
│   ├── 0006_content_pieces.sql  content_pieces
│   ├── 0007_reports.sql         reports
│   ├── 0008_custom_solutions.sql custom_solutions (custom-quote pipeline)
│   └── 0009_audit_logs.sql      audit_logs (append-only)
├── seed.sql                     minimal seed — the Amagna AI organization row
└── README.md                   this file
```

Migrations are numbered and **must run in order** — later files reference enums,
tables, and functions defined in earlier ones.

## The data model in one paragraph

`organizations` is the tenant boundary (Amagna AI is one). `users` are auth logins,
each in one organization with a `role` — `owner`/`admin`/`staff` are Amagna-side,
`client` is a client-portal login pinned to one `clients` row. `clients` are the
businesses Amagna serves; `leads`, `content_pieces`, and `reports` hang off a client.
`agent_runs` records every fleet-agent execution (with token + cost columns for budget
alerting). `custom_solutions` is the separate custom-quote pipeline. `audit_logs` is an
append-only trail of significant actions.

## Multi-tenancy and RLS

Row-level security is on for **every table**. Policies are defined alongside each table
in its migration file. The model:

- Helper functions in `0002` (`current_org_id()`, `current_role_name()`,
  `current_client_id()`, `is_staff()`) read the caller's `users` row. They are
  `SECURITY DEFINER` so they don't recurse through `users`' own RLS.
- **Staff** (`owner`/`admin`/`staff`) see and write everything in their organization.
- **Client** logins get read-only access to *their own* client record, leads, content,
  and delivered reports — nothing else.
- The **service role key** bypasses RLS. All server-side admin work — provisioning,
  onboarding, public form submissions (`/custom-quote`, contact forms), agent writes —
  runs server-side (Next.js route handlers / Supabase edge functions) with the service
  role. The `anon` key never writes directly.

> Security rule: the service role key is server-only. It must never reach the browser.
> See ADR-0002 and `.env.example`.

## Provisioning — step by step (Andrew)

You need a Supabase account; the CLI does the rest. From the repo root:

1. **Create the project** at https://supabase.com/dashboard — org `amagna`, name
   `amagna`, a strong database password (save it in your password manager), region
   closest to your clients (`us-east-1`).

2. **Install the Supabase CLI** (one time):
   ```bash
   brew install supabase/tap/supabase
   ```

3. **Link this repo to the project** (grab the project ref from the dashboard URL,
   `https://supabase.com/dashboard/project/<ref>`):
   ```bash
   supabase link --project-ref <ref> --workdir infra/supabase
   ```

4. **Push the schema:**
   ```bash
   supabase db push --workdir infra/supabase
   ```
   This runs every file in `migrations/` in order against the new project.

5. **Seed the organization row:**
   ```bash
   supabase db execute --workdir infra/supabase --file seed.sql
   ```

6. **Verify** in the dashboard → Table Editor: nine tables, each showing the green
   "RLS enabled" badge. Dashboard → Authentication → Policies should list the policies.

7. **Create your owner login:** sign up once through the app (or the dashboard's Auth
   tab) with `andrew@amagna.co`, then run the promotion query from the top of
   `seed.sql` to make that user the org `owner`.

8. **Hand the keys to the env config:** copy the project URL, `anon` key, and
   `service_role` key from dashboard → Project Settings → API into `.env.local`
   (never committed). This unblocks the env-vars task.

## Changing the schema later

Add a new numbered migration (`0010_*.sql`) — never edit a migration that has already
been pushed. Re-run `supabase db push`. Keep the comment style: every table and
non-obvious column gets a `comment on`.
