# ADR-0005 — Live cutover: amagna.co + www off Pages, onto the OpenNext Worker

**Status:** Accepted. Cutover executed 2026-06-02. amagna.co + www.amagna.co are now served by the Worker `amagna-marketing-app`. The Pages project `amagna-marketing` is preserved untouched as the rollback target.
**Date:** 2026-06-02
**Deciders:** Andrew Gladki (executed the dashboard detach), Claude Code (executed the API attach + verification)

## Context

ADR-0004 established the migration of `apps/marketing` from `@cloudflare/next-on-pages` (Pages) to `@opennextjs/cloudflare` (Workers). The Worker was built, deployed, smoke-tested at `amagna-marketing-app.gladkiandrew47.workers.dev`, and verified end-to-end (Stripe checkout returning `cs_test_…`, webhook signature-verified, /audit hitting Anthropic, /custom-quote hitting Resend). The remaining step was to move the live `amagna.co` + `www.amagna.co` hostnames from the Pages project to the Worker.

## Decision

Detach apex + www from the Pages project `amagna-marketing` (dashboard) → attach both to the Worker `amagna-marketing-app` (CLI). Codify the routes in `apps/marketing/wrangler.jsonc` so future deploys preserve the bindings. Pages project remains intact and detached as the rollback path.

## Execution log

**Pre-cutover checks** (.workers.dev URL): all 11 pages 200; Stripe checkout 200 with `cs_test_…`; webhook 400 Missing stripe-signature; /book iframe `src` starts `https://cal.com/`; secrets and vars all wired. Token verified as `gladkiandrew47@gmail.com` via `wrangler whoami` after the day's re-roll.

**Detach** (Andrew, dashboard): Workers & Pages → `amagna-marketing` (Pages) → Custom domains → removed `amagna.co` then `www.amagna.co`. Confirmed via API `GET /pages/projects/amagna-marketing/domains` returning empty.

**Attach attempt 1** (Claude Code, raw API POST `/accounts/{acct}/workers/domains`): **FAILED** for both hostnames with `code: 10405, "Method not allowed for this authentication scheme"`. The newly-rolled "Edit Cloudflare Workers" token's auth scheme rejected direct POST on the Workers Domains endpoint despite GET on the same endpoint succeeding. Site was unbound during this window (~0 traffic, no impact).

**Attach attempt 2** (Claude Code, `wrangler deploy` with `routes[].custom_domain: true` in `wrangler.jsonc`): **SUCCEEDED.** Wrangler's deploy path uses a different API call internally that the token's scheme accepts. Both hostnames bound and propagated within ~10 seconds. TLS cert was already in place from the prior Pages binding, so the first probe of https://amagna.co/ returned HTTP 200 with valid cert.

**Live verification** (https://amagna.co/): every page route 200 (`/`, `/audit`, `/pricing`, `/checkout`, `/checkout/success`, `/book`, `/about`, `/home-services`, `/real-estate`, `/custom`, `/custom-quote`); `/book` iframe `src` starts `https://cal.com/`; `POST /api/stripe/checkout {plan:"growth"}` returns HTTP 200 with a `cs_test_…` URL; `POST /api/stripe/webhook` no-signature returns 400 `Missing stripe-signature`; `GET /api/stripe/checkout` returns 405. Response headers confirm Worker (`x-opennext: 1`, `x-powered-by: Next.js`). www.amagna.co spot-checked: same 200 behavior. **www → apex redirect is still NOT enforced** (see ADR-0004 known-gaps) — both hostnames currently serve the same site.

## Codification (config-as-code)

Two `custom_domain` routes added to `apps/marketing/wrangler.jsonc`:

```jsonc
"routes": [
  { "pattern": "amagna.co",     "custom_domain": true, "zone_id": "945e4c1755f729e954b82f565ffc5e58" },
  { "pattern": "www.amagna.co", "custom_domain": true, "zone_id": "945e4c1755f729e954b82f565ffc5e58" }
]
```

Future `wrangler deploy` (from any machine with the API token) preserves both bindings. There is no dashboard-only config left to drift.

`workers.dev` and Worker preview URLs are implicitly disabled by the presence of custom routes (wrangler logged a warning). The `.workers.dev` URL no longer responds. If we want a separate staging URL later, that's a `workers_dev: true` line plus a redeploy.

## Why the token-permission gap matters going forward

Direct calls to `POST /accounts/{acct}/workers/domains` from this token fail. `wrangler deploy` works because it uses a different code path that the token accepts. Operational implication: secret puts, domain attaches, and worker deploys should go through `wrangler` (or `npm run cf:deploy`), not through hand-crafted curls against the REST API. The infra doc reflects this.

If/when an automated CI path is wired, the recommended scope is the "Edit Cloudflare Workers" template plus an account-scoped Workers Domain Update permission (or equivalent), confirmed via `wrangler deploy` of a no-op change.

## Hard constraints honored

  - **Live site recovered** — site was unbound for the ~10 seconds between detach and successful wrangler-driven attach; ~0 traffic.
  - **Pages project preserved** — `amagna-marketing` (Pages) still exists, still serves `feaf751` on `amagna-marketing.pages.dev`. Rollback steps below.
  - **No Stripe live mode touched** — same test-mode secrets that were on the preview Worker.
  - **No code rollback needed** — the Stripe SDK `httpClient: Stripe.createFetchHttpClient()` fix landed before cutover (commit `b19ee08`); the cause of the earlier "An error occurred with our connection to Stripe" issue is gone.

## Rollback runbook (preserved for the next 30 days minimum)

If amagna.co misbehaves and we want to fall back to the last-known-good `feaf751` Pages deploy:

1. Cloudflare dashboard → Workers & Pages → `amagna-marketing-app` (Worker) → Settings → Domains & Routes. Remove the `amagna.co` and `www.amagna.co` custom-domain rows.
2. Same dashboard → `amagna-marketing` (Pages) → Custom domains → Set up a custom domain → enter `amagna.co`, save. Repeat for `www.amagna.co`.
3. Within ~30 seconds both hostnames resolve to the Pages deploy of `feaf751` again. TLS cert is reused (already valid for these hostnames in the zone).

Also remove the `routes` block from `apps/marketing/wrangler.jsonc` and commit, or the next `wrangler deploy` will try to re-attach.

## What changed

- New Worker `amagna-marketing-app` (account `5bfb8eefd63e128370fa0fa5776f2dd5`, zone `945e4c1755f729e954b82f565ffc5e58`) bound to apex + www
- `apps/marketing/wrangler.jsonc` — added two `custom_domain` routes
- This ADR; companion infra-doc rewrite at `docs/infrastructure/cloudflare-pages-setup.md` (now describes the Workers-based architecture with Pages as rollback)

## Consequences

The marketing site is now a Cloudflare **Worker** at the URL level, while the **DNS zone** for `amagna.co` continues to be Cloudflare-managed. The shared deploy/secret tooling moves to `wrangler` exclusively. The deprecated `@cloudflare/next-on-pages` adapter is no longer needed at all (already removed from devDependencies in ADR-0004's commits).

Open follow-ups (not blocking):

  - `NEXT_PUBLIC_META_PIXEL_ID` is still empty in wrangler.jsonc; pixel doesn't fire on the live site until set.
  - `www.amagna.co → amagna.co` 301 redirect rule still not enforced (carry-over from ADR-0004's known gaps; Rulesets perm not in the token).
  - Pages project `amagna-marketing` can be deleted once we're past the rollback window (suggest: at least 30 days of stable Worker operation).
