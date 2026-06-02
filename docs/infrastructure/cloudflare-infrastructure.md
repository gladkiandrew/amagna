# Cloudflare Infrastructure — amagna.co

> **Status (2026-06-02):** Live on Cloudflare **Workers** via `@opennextjs/cloudflare`. The Pages project is preserved as a rollback target. See ADR-0004 (migration) and ADR-0005 (live cutover).
> **Last good Pages snapshot (rollback target):** `feaf751`, still deployable from the `amagna-marketing` Pages project.

## What's deployed

| Item | Value |
|---|---|
| Worker name | `amagna-marketing-app` |
| Worker URL (custom) | `https://amagna.co`, `https://www.amagna.co` |
| Worker URL (.workers.dev) | disabled (no `workers_dev: true` once custom routes attached) |
| Build adapter | `@opennextjs/cloudflare@1.15.0` |
| Compatibility date | `2025-04-01` |
| Compatibility flags | `nodejs_compat` |
| ASSETS binding | `.open-next/assets` |
| Cloudflare account | `5bfb8eefd63e128370fa0fa5776f2dd5` |
| `amagna.co` zone id | `945e4c1755f729e954b82f565ffc5e58` |
| Production branch | `main` |
| Rollback target (Pages) | project `amagna-marketing`, deploy `feaf751` |

Worker name `amagna-marketing-app` was deliberately chosen to avoid colliding with the Pages project `amagna-marketing` in Cloudflare's account-level namespace.

## How it builds and deploys

The full pipeline lives in code:

```bash
# from repo root
npm run cf:build           # delegates to apps/marketing → opennextjs-cloudflare build
# output: apps/marketing/.open-next/{worker.js, assets/}
```

```bash
# from apps/marketing
set -a; source .env.local; set +a            # CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
npx wrangler@latest deploy                   # reads wrangler.jsonc, uploads bundle + assets
```

Or both in one shot: `cd apps/marketing && npm run cf:deploy`.

`wrangler deploy` re-applies the `routes` config in wrangler.jsonc on every run, so the apex + www custom-domain bindings are reasserted as part of every deploy. Drift-free.

## Config-as-code

`apps/marketing/wrangler.jsonc` is the single source of truth for:

  - Worker name
  - Compat date + flags
  - ASSETS binding pointing at `.open-next/assets`
  - Observability enabled
  - Public NEXT_PUBLIC_* vars (CALCOM_URL, SUPABASE_URL, SUPABASE_ANON_KEY, STRIPE_PUBLISHABLE_KEY; META_PIXEL_ID still empty pending Andrew's pixel id)
  - Custom-domain routes: `amagna.co` and `www.amagna.co`

`apps/marketing/open-next.config.ts` is the OpenNext config — defaults are fine for now (no ISR, no cross-region cache).

## Secrets

Mirror server-side secrets onto the Worker with one of:

```bash
# non-interactive (reads values from apps/marketing/.env.local, never echoes):
python3 scripts/set-prod-worker-secrets.py

# interactive (paste each value at the wrangler prompt; for shells with a TTY):
bash scripts/set-prod-worker-secrets.sh
```

Currently on the Worker (per `npx wrangler@latest secret list` from `apps/marketing`):

  - `ANTHROPIC_API_KEY`
  - `RESEND_API_KEY`
  - `STRIPE_PRICE_GROWTH`
  - `STRIPE_PRICE_UPDATE`
  - `STRIPE_SECRET_KEY` (test-mode; live-mode rotation is a separate ADR when we cut over to live billing)
  - `STRIPE_WEBHOOK_SECRET`
  - `SUPABASE_SERVICE_ROLE_KEY`

`NEXT_PUBLIC_SUPABASE_URL` lives in wrangler.jsonc `vars` (Cloudflare's binding namespace rejects setting a secret with the same name as an existing var; the public Supabase URL is fine to commit).

## DNS

The `amagna.co` zone in Cloudflare DNS holds the records the Worker custom-domain mechanism manages automatically. The earlier Pages CNAMEs were replaced when Andrew detached the hostnames from Pages and the Worker `wrangler deploy` re-bound them. Cloudflare Email Routing MX + DKIM/SPF/DMARC records for `andrew@amagna.co` are unaffected.

## Re-deploying

```bash
cd apps/marketing
set -a; source .env.local; set +a
npm run cf:deploy
```

That runs `opennextjs-cloudflare build` then `wrangler deploy`. Output ends with the worker URL and the bound custom domains.

## Rollback to Pages (preserved for at least 30 days post-cutover)

If the Worker misbehaves and we need to fall back to the last-good Pages deploy `feaf751`:

1. Dashboard → Workers & Pages → `amagna-marketing-app` → **Settings → Domains & Routes** → remove `amagna.co` and `www.amagna.co`.
2. Same dashboard → `amagna-marketing` (Pages, has the "Pages" badge) → **Custom domains** → **Set up a custom domain** → enter `amagna.co`, save. Repeat for `www.amagna.co`.
3. Both hostnames resolve back to the Pages `feaf751` deploy within ~30s. TLS cert is already valid in the zone, no re-provisioning needed.

Then on the code side: remove the `routes` block from `apps/marketing/wrangler.jsonc` and commit, or the next `wrangler deploy` will re-attach.

## Permission gotcha for future operators

The current "Edit Cloudflare Workers" API token rejects direct `POST /accounts/{acct}/workers/domains` with `10405 "Method not allowed for this authentication scheme"`, even though `GET` on the same endpoint works. **Do attaches through `wrangler deploy`** (which uses a different API path the token accepts), not through hand-crafted REST calls. Same recommendation for secret puts (`wrangler secret put`) and worker deploys (`wrangler deploy`).

## Known gaps

  - **`NEXT_PUBLIC_META_PIXEL_ID` empty** — pixel doesn't fire on the live site until Andrew provides the value and re-deploys.
  - **`www → apex` 301 redirect not enforced** — both hostnames currently serve identical content. The Cloudflare Rulesets API needs a permission that's not in the current token; do it via dashboard (Rules → Redirect Rules) when you want it.
  - **Pages project `amagna-marketing` not deleted** — kept intentionally as rollback target. Delete only after a stable Worker run (suggested: 30+ days).

## Historical context

This file replaces `cloudflare-pages-setup.md` (kept in the repo for the cutover window as a record of the prior architecture). Pre-cutover details:

  - Pages project name: `amagna-marketing`, project URL `https://amagna-marketing.pages.dev`
  - Build adapter: `@cloudflare/next-on-pages@1.13.16` (deprecated)
  - Deploys were direct uploads via `wrangler pages deploy`; GitHub auto-deploys were never wired (root cause of the 17-day silent deploy gap that triggered this whole migration)
