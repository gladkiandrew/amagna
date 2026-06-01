# ADR-0004 — Cloudflare Pages → Workers (OpenNext)

**Status:** Accepted in principle; preview deployed; domain cutover gated on Andrew's review.
**Date:** 2026-06-01
**Deciders:** Andrew Gladki (mandated the migration), Claude Code (implementation)

## Context

The marketing app was hosted on Cloudflare **Pages** via `@cloudflare/next-on-pages@1.13.16`. Two things broke that setup over the last few weeks:

1. **Deploys stopped firing.** amagna.co was pinned to `feaf751` for ~17 days because the Pages project's GitHub integration was never wired (per `docs/infrastructure/cloudflare-pages-setup.md`: "Git integration is not connected … deploys are direct uploads"). When a forced rebuild finally went out on 2026-06-01, the build produced an **empty** deploy (`d92d7cd5`) — no `_worker.js`, no `_routes.json`, no `/_next/static/`. amagna.co's homepage kept serving a stale 7-day-cached HTML while every other route 404'd.
2. **`@cloudflare/next-on-pages` is deprecated.** Cloudflare's current recommendation for Next.js on their edge is `@opennextjs/cloudflare`, targeting **Workers** (not Pages). The adapter is more actively maintained, supports current Next versions, and uses a `wrangler.jsonc` config-as-code model that lives in the repo — no dashboard-only settings that can drift unobserved.

## Decision

Migrate `apps/marketing` from `@cloudflare/next-on-pages` (Pages) to `@opennextjs/cloudflare` (Workers).

**Worker name:** `amagna-marketing-preview` (deliberately not `amagna-marketing` to avoid colliding with the existing Pages project, and to make the preview/production split obvious until the cutover).

**Preview URL:** `https://amagna-marketing-preview.gladkiandrew47.workers.dev`

**Pinned versions (Next 14 compatibility):**

| Package | Version | Why |
|---|---|---|
| `@opennextjs/cloudflare` | `1.15.0` | Last release with Next 14.2.x in `peerDependencies`; 1.16+ requires Next 15. |
| `wrangler` | `^4.96.0` | Matches the peer range of OpenNext 1.15 and supports `wrangler.jsonc`. |
| `esbuild` | `^0.25.4` | Pinned as a direct devDep so OpenNext's bundler resolves the right version. The previous `next-on-pages` pulled `esbuild@0.15.18` which hoisted above OpenNext's required `0.25.x` and broke the bundler with `Invalid alias name: "next/dist/compiled/node-fetch"`. |

**Compatibility flags:** `nodejs_compat` + `compatibility_date >= 2025-04-01`. This combination lets `process.env` resolve worker `vars` + secrets natively at request time, so `lib/env.ts` simplifies to a one-liner over `process.env` (vs. the previous `getRequestContext().env` workaround that next-on-pages required).

**Edge-runtime routes converted to Node runtime:**

  - `app/api/stripe/checkout/route.ts`
  - `app/api/stripe/webhook/route.ts`
  - `app/book/page.tsx`
  - `app/checkout/success/page.tsx`

Workers runs the Node runtime; `stripe.webhooks.constructEventAsync` (Web Crypto) and the Stripe SDK both work natively on Node 20+ with `nodejs_compat`.

## Why this addresses the underlying problem

| Pages (before) | Workers / OpenNext (after) |
|---|---|
| Build settings live only in the Cloudflare dashboard | Build settings live in `wrangler.jsonc` (config-as-code, reviewable) |
| Auto-deploy required a Git integration that wasn't wired | CLI-driven: `wrangler deploy` deploys deterministically from any machine with the token |
| Output expected at `.vercel/output/static` (next-on-pages adapter) | Output at `.open-next/worker.js` + `.open-next/assets/` (Cloudflare's own adapter) |
| `process.env` required a custom request-context shim | `process.env` works natively under `nodejs_compat` + 2025-04-01 |
| Adapter deprecated by Cloudflare | Current officially-recommended adapter |

## Smoke test (preview Worker, 2026-06-01)

```
Route                              | Status | Note
-----------------------------------|--------|-------------------------------------
/                                  |  200   | static
/audit                             |  200   | server action + Anthropic fallback
/pricing                           |  200   | static
/checkout                          |  200   | static
/checkout/success                  |  200   | dynamic (?plan=…)
/book                              |  200   | iframe src renders with https://
/about                             |  200   | static
/home-services                     |  200   | static
/real-estate                       |  200   | static
/custom                            |  200   | static
/custom-quote                      |  200   | static + server action
GET  /api/stripe/checkout          |  405   | POST-only, as designed
POST /api/stripe/checkout {growth} |  503   | "Checkout is not configured yet — STRIPE_SECRET_KEY is unset" (expected without secrets on preview)
POST /api/stripe/webhook (no sig)  |  200   | received:false (expected without STRIPE_WEBHOOK_SECRET on preview)
```

The 503 / received:false responses are the codebase's intended degraded behavior when secrets are missing. To flip those to live (test-mode) responses on the preview Worker, set the secrets via `wrangler secret put` (see "Outstanding work" below).

## Hard constraints honored

  - **Live site untouched.** `amagna.co` continues to point at the Pages deployment. DNS unchanged. No custom domain bound to the preview Worker.
  - **No Stripe live mode.** No Stripe secrets were set on the Worker by this migration.
  - **All changes reversible.** Preview Worker can be deleted with `wrangler delete amagna-marketing-preview`. The original Pages deploy is independent.

## Outstanding work — before any domain cutover

1. **Restore service on amagna.co.** Track A: roll back the empty `d92d7cd5` Pages deploy to the last-good `feaf751` from the Cloudflare dashboard (or via wrangler — see `docs/infrastructure/cloudflare-pages-setup.md`, "Incident 2026-06-01").
2. **Set Worker secrets on the preview** (so /audit, Stripe checkout, and Supabase persistence all work end-to-end before cutover):
   ```bash
   set -a; source .env.local; set +a
   cd apps/marketing
   wrangler secret put STRIPE_SECRET_KEY
   wrangler secret put STRIPE_WEBHOOK_SECRET
   wrangler secret put STRIPE_PRICE_GROWTH
   wrangler secret put STRIPE_PRICE_UPDATE
   wrangler secret put ANTHROPIC_API_KEY
   wrangler secret put SUPABASE_URL
   wrangler secret put SUPABASE_SERVICE_ROLE_KEY
   wrangler secret put RESEND_API_KEY
   ```
3. **Populate the NEXT_PUBLIC_* vars** in `wrangler.jsonc` with real values (Supabase URL/anon key, Stripe publishable key, Meta pixel ID). These get inlined into client bundles at build time, so they must be set before `wrangler deploy` for the next preview to pick them up.
4. **End-to-end test on the preview**: real 4242 Stripe checkout walk, /audit submission with Anthropic generating, /book completing a Cal.com booking. Confirm Supabase rows persist.
5. **Plan the cutover:** add `amagna.co` and `www.amagna.co` as Custom Domains on the Worker, update DNS (delete the Pages CNAMEs, add Worker routes), kill the Pages project. This is a separate ADR (or addendum) when Andrew approves.

## Consequences

  - **Config-as-code:** the build pipeline (root dir, command, output, compat flags, env-var names) is in the repo. Future incidents like the 17-day silent failure are diagnosable from git, not gated on dashboard access.
  - **CLI-driven deploys:** `wrangler deploy` is the deterministic surface. CI integration is a small follow-up if/when wanted; the current state is "any maintainer with the token can deploy, reproducibly."
  - **One adapter to track.** `@cloudflare/next-on-pages` removed. `@opennextjs/cloudflare` is on the Cloudflare-recommended upgrade path; when the app moves to Next 15, bumping OpenNext past 1.15 is the only change needed.
  - **`framer-motion` / rebrand branch (`rebrand/phase-2`)** stays compatible — the v2 placeholder route compiles under OpenNext just like under next-on-pages.
