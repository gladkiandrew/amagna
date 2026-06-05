# Autonomous Run Plan 5 — FINAL STRETCH: mobile polish + Gold Map green + amagna.co LIVE

> Andrew is away ~3 hours. This is the launch run. Work priorities IN ORDER,
> continuously, no questions. Decide per CLAUDE.md, log everything in
> `docs/autonomous-run/REPORT-5.md` as you go. Andrew has ALREADY detached
> amagna.co and www.amagna.co from the Pages project in the Cloudflare
> dashboard before leaving — the cutover is authorized and expected this run.

## Guardrails (changed for this run — read carefully)

1. Never `git push`. 2. Stay on `auto/2026-06-04-website-build`.
3. Stripe/checkout/book CODE frozen. 4. Zero new dependencies.
5. Never read `.env*` EXCEPT the existing sourced-deploy pattern already used
   this session (`set -a; . ./.env.local; set +a` for deploy env) — values
   must never be echoed/logged. 6. Build green before every commit.
7. 15-min rule; circuit breaker at 3 consecutive failures → if tripped AFTER
   cutover, prioritize leaving amagna.co serving the best green build.
8. **CUTOVER IS AUTHORIZED THIS RUN** — restoring wrangler.jsonc routes and
   attaching amagna.co to the Worker is the goal, not a landmine. The ONLY
   forbidden act is leaving the site broken: verify after every deploy.
9. Supabase additive-only, never run anything against the DB.
10. No exclusivity language; no fabricated claims.

## Priority 1 — CUTOVER FIRST (minimize amagna.co downtime — it is detached
and serving nothing right now)

1. Restore `wrangler.jsonc` routes (un-neutralize: amagna.co + www custom
   domains back in; keep workers_dev true).
2. Full cf:build + deploy. The deploy should attach both custom domains
   (token has Workers:Edit; the Pages conflict is gone since Andrew
   detached). If domain attach FAILS, log the exact error, fall back to a
   workers.dev-only deploy (re-neutralize), and continue the run — Andrew
   cuts over manually when back.
3. Verify live: https://amagna.co and https://www.amagna.co serve the NEW
   homepage (200, new hero copy present), all 18+ routes 200, /audit up,
   Stripe checkout POST returns a cs_test session on the live domain,
   webhook 400-gates. Log results.
4. From this point, every subsequent deploy in this run goes straight to
   production — that's fine (traffic is minimal pre-launch), but never leave
   the site red: verify after each deploy before moving on.

## Priority 2 — Mobile polish (Andrew's iPhone review; these are real bugs,
not domain artifacts; verify at deviceScaleFactor 3, not just narrow width)

1. **HERO BLUR (critical):** ocean is blurry/pixelated on phones — the
   mobile DPR/renderScale cap (0.75→0.4) is too aggressive. Target crisp
   rendering (~DPR 2 effective) on capable phones; adaptive degradation only
   under measured frame pressure.
2. **SCROLL JANK (critical):** iPhone scrolling catches/lags/rubber-bands.
   Audit: passive scroll/touch listeners everywhere, zero layout reads in
   scroll paths, GL loop must not block main thread, pause offscreen work.
   Report the root cause found.
3. **CREW SECTION height:** on mobile, restructure to a compact grid — 3
   cards row one, 2 cards row two, smaller portraits/type, crew fits ~one
   screen. Desktop unchanged.
4. **INTEGRATIONS HUB:** orbit logos too small on phones — scale up legibly.
5. **VIDEO DECK:** arrows move BELOW the card on mobile.
6. Commit per concern, deploy, verify live on amagna.co at mobile emulation.

## Priority 3 — Gold Map verification (as far as possible without Andrew)

The four fixes (coercePlan crash, intake-change regeneration, cache-hit
email, full-plan templates) are deployed. Verify what's verifiable headless:
- Confirm the deployed live-domain bundle contains all four fixes.
- If a headless server-action E2E is feasible (hand-crafted wire protocol),
  run ONE fresh-email test lead end-to-end (use
  gladkiandrew47+autotest1@gmail.com) and confirm: plan_generated row in
  Supabase with a real plan, no crash. Cap: max 2 generation calls this run.
- Verify Turnstile: server-side verify is enforcing if the Worker secret is
  set (check `npx wrangler secret list` for TURNSTILE_SECRET_KEY — Andrew
  may or may not have run it; if missing, log LOUDLY in the report that
  Andrew must run the secret command — do not attempt to set it yourself).
- Log exactly which checks passed and which need Andrew's human run-through.

## Priority 4 — Production hygiene

- robots/sitemap sanity on the live domain; /audit noindex decision logged
  (it's a funnel — index it; the old preview-noindex must NOT linger on /).
- Quick Lighthouse-style pass on mobile homepage (no new deps — use simple
  curl timing + bundle-size observations); log notable wins available later.
- Update docs/cutover-status.md to reflect reality post-cutover (Worker
  serving, Pages detached, date, version IDs).

## Priority 5 — If time remains

Polish mobile further (Frame 2 timing feel, hub layout), tighten Gold Map
plan prompt phrasing, accessibility sweep on changed components.

## Report (REPORT-5.md, maintained as you go)

Commits; cutover result + exact domain-attach outcome; live verification
table; mobile before/after notes; Gold Map checks matrix (passed /
needs-Andrew); anything Andrew must do (Turnstile secret? manual cutover?);
review commands. Final commit: `Update autonomous run 5 report`.
