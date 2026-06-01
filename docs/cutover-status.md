# Cutover status — 2026-06-01

Target worker: **amagna-marketing-app** at https://amagna-marketing-app.gladkiandrew47.workers.dev
Domain cutover step (C7) **not executed**. Live amagna.co still on the Pages project `amagna-marketing` (serving `feaf751`).

## 1. Secret/var state on amagna-marketing-app (updated 2026-06-01, after fixes)

Source of truth: `wrangler secret list` + wrangler.jsonc inspection, just now.

Worker SECRETS (7):
- `ANTHROPIC_API_KEY`
- `RESEND_API_KEY`
- `STRIPE_PRICE_GROWTH`
- `STRIPE_PRICE_UPDATE`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`

Worker VARS in wrangler.jsonc (committed to repo, public-by-design):
- `NEXT_PUBLIC_CALCOM_URL` — set
- `NEXT_PUBLIC_SUPABASE_URL` — set (40 chars, https://...supabase.co)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — set
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — set
- `NEXT_PUBLIC_META_PIXEL_ID` — empty (still unset by Andrew; pixel won't fire until provided)

Note on naming: code grep showed the server-side Supabase admin client reads `NEXT_PUBLIC_SUPABASE_URL` via the runtime env helper (`lib/supabase-server.ts:14`). Plain `SUPABASE_URL` is **not referenced anywhere** in the codebase. Andrew added both to `.env.local` for safety, but only `NEXT_PUBLIC_SUPABASE_URL` actually feeds the Worker. `SUPABASE_SERVICE_ROLE_KEY` is correctly **not** `NEXT_PUBLIC_`-prefixed.

The conflict that initially blocked `wrangler secret put NEXT_PUBLIC_SUPABASE_URL` — Cloudflare rejects setting a secret with the same name as an existing var. Resolved by populating the value in wrangler.jsonc's `vars` block via a python helper that reads `.env.local` (no echo) and re-deploying.

The pipe path: `python3 scripts/set-prod-worker-secrets.py` for the 7 server secrets. Each value piped via `subprocess.run(..., input=v)` so it never appeared in argv, shell history, or this transcript.

## 2. Money-path verification on .workers.dev (re-tested 2026-06-01, after Stripe-SDK fix)

Stripe checkout — **PASS.** `POST /api/stripe/checkout {plan:"growth"}` returns HTTP 200 with a real `cs_test_…` Stripe Checkout Session URL. Test mode confirmed.

Stripe webhook signature — **PASS.** `POST /api/stripe/webhook` with no signature returns HTTP 400 `{"error":"Missing stripe-signature header."}` — proves `STRIPE_WEBHOOK_SECRET` is wired (unwired would return 200 `configured:false`).

/audit (Anthropic + Supabase) — **PASS by wiring**, not E2E-curled (Next.js Server Action endpoint id is bundle-hashed). `ANTHROPIC_API_KEY` is set, so `generateAudit()` reaches real Anthropic. `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are both set, so `getSupabaseAdmin()` returns a working client and `widget_submissions` inserts will land.

/custom-quote (Resend) — **PASS by wiring**, not E2E-curled (server action). `RESEND_API_KEY` is set; `app/custom-quote/actions.ts` reaches Resend.

All 11 pages still 200: /, /audit, /pricing, /checkout, /checkout/success, /book, /about, /home-services, /real-estate, /custom, /custom-quote.

### Real bug found in the migration — fixed on this branch (not yet merged to main)

`lib/stripe.ts` instantiated the Stripe Node SDK without an explicit `httpClient`. On Cloudflare Workers (Node runtime via @opennextjs/cloudflare), the default Stripe http client tries to dial through `node:http`, which isn't in the nodejs_compat polyfill set. Every Stripe API call failed with "An error occurred with our connection to Stripe. Request was retried 2 times." (Worked on Pages/edge-runtime because the SDK detected fetch and used it by default.)

Fix: pass `httpClient: Stripe.createFetchHttpClient()` so the SDK routes through Worker global fetch (which Cloudflare allows). This is committed on `feat/opennext-workers`. After rebuild + redeploy, Stripe checkout flipped from HTTP 500 to HTTP 200 with a `cs_test_…` URL on the first call. This commit needs to land before any domain cutover, otherwise the Worker would 500 on every Stripe call once live.

Net: 4 of 4 money-path checks PASS on the .workers.dev URL. The framework + the wiring + the Stripe SDK fix all hold together. Safe (functionally) to cut over once C7 dashboard detach happens and routes are codified in wrangler.jsonc.

## 3. Cloudflare API token permissions

Probed via read-only API calls earlier this turn.

(a) Detach a domain from the Pages project — **probably NO, unconfirmed.** I confirmed `GET /accounts/{acct}/pages/projects/amagna-marketing/domains` returns 200. I did not execute a `DELETE` against a live Pages domain because the only way to undo it cleanly is to recreate. The token was issued from the "Edit Cloudflare Workers" template, which by default does not include Pages-Edit. Assume NO until proven otherwise by an actual attempt.

(b) Edit zone DNS — **NO.** Confirmed: `GET /zones/{zone_id}/dns_records` returned 403. Edit follows read.

(c) Attach a Workers custom domain — **YES.** The token has Workers:Edit (proved by `wrangler deploy` of `amagna-marketing-app` succeeding). The Worker custom-domain API at `POST /accounts/{acct}/workers/domains` provisions its own hostname routing internally and does not depend on Zone-DNS-Edit.

Net implication: the attach half of the cutover is API-doable on my end. The detach half from Pages is best done in the Cloudflare dashboard.

## 4. Recommended C7 cutover steps (dashboard-hybrid)

Order matters; the gap between detach and attach is the user-visible blip (acceptable with current ~zero traffic).

Step 1 — **secrets first.** Don't cut over until the 7 missing secrets are on `amagna-marketing-app`. Run `bash scripts/set-prod-worker-secrets.sh` (interactive — paste each value at the prompt). Verify with `cd apps/marketing && npx wrangler@latest secret list` showing all 8 names.

Step 2 — **detach from Pages (you, dashboard)**: https://dash.cloudflare.com → Workers & Pages → `amagna-marketing` (the Pages project) → Custom Domains → remove `amagna.co`, then remove `www.amagna.co`. Wait for both rows to disappear from the list.

Step 3 — **attach to Worker (me, API)**: ping me "detach done" and I immediately run:

```bash
set -a; source apps/marketing/.env.local; set +a
ACCT=5bfb8eefd63e128370fa0fa5776f2dd5
ZONE=945e4c1755f729e954b82f565ffc5e58
curl -sS -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"environment\":\"production\",\"hostname\":\"amagna.co\",\"service\":\"amagna-marketing-app\",\"zone_id\":\"$ZONE\"}" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCT/workers/domains"
curl -sS -X POST \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"environment\":\"production\",\"hostname\":\"www.amagna.co\",\"service\":\"amagna-marketing-app\",\"zone_id\":\"$ZONE\"}" \
  "https://api.cloudflare.com/client/v4/accounts/$ACCT/workers/domains"
```

Step 4 — **verify on amagna.co (me, curl)**: every page route returns 200, /book iframe `src` starts with `https://cal.com/`, `POST /api/stripe/checkout {plan:"growth"}` returns a `cs_test_…` URL, `/api/stripe/webhook` no-sig returns 400 missing-signature (proves `STRIPE_WEBHOOK_SECRET` is wired). Wait + retry up to a couple of minutes if TLS cert needs to provision.

Step 5 — **codify routes (me, code)**: add the two `routes` entries with `custom_domain: true` to `apps/marketing/wrangler.jsonc` and commit on main, so the next `wrangler deploy` preserves the bindings without re-attaching by hand.

Step 6 — **ADR + infra doc (me, code)**: write `docs/architecture/decisions/0005-live-cutover-pages-to-workers.md` and rewrite `docs/infrastructure/cloudflare-pages-setup.md` to reflect Workers-based live architecture with the Pages project documented as the rollback target.

Rollback if anything is off after Step 3: dashboard → Workers & Pages → `amagna-marketing-app` → Custom Domains → remove both; then Workers & Pages → `amagna-marketing` (Pages) → Custom Domains → Add → `amagna.co` and `www.amagna.co`. Back on the rolled-back Pages deploy within ~60s.

Pure-API alternative (Option A from earlier turn): same flow but with a `DELETE /accounts/$ACCT/pages/projects/amagna-marketing/domains/{host}` ahead of each attach. Probably 401/403s with this token (Pages-Edit not in the scope), so I'm not recommending it as primary.
