# Autonomous Run 5 — FINAL STRETCH report

Branch: `auto/2026-06-04-website-build`. Started 2026-06-05. Following `PLAN-5.md`.
Andrew away ~3h. Cutover authorized (amagna.co + www detached from Pages by Andrew).

## Status log (live)

- **Start state:** routes neutralized in working tree (workers_dev-only). Last
  deploy this session = Gold Map fixes, Version `bc5807f3`. 7 worker secrets set.
- Restored `wrangler.jsonc` routes (amagna.co + www custom domains) and kept
  `workers_dev: true`. Building for production cutover.

## Commits (this run)

1. `1795811` Cut amagna.co over to the Workers deploy (restore custom-domain routes)
2. `7acface` Fix blurry hero ocean on mobile
3. `3e098ca` Compact the crew grid on mobile and smooth scroll through Frame 2
4. `1ae73d4` Enlarge integrations-hub logos so they read on phones
5. `8d8ed40` Move video-deck arrows below the card on mobile
6. `d3535c1` Add /audit (Gold Map funnel) to the sitemap
7. `89d9cad` Mark the Pages→Workers cutover complete in cutover-status
8. (this commit) Ignore env-file backups + Update autonomous run 5 report

Deploys: 285d1839 (cutover) → 22c20c0e (mobile) → 3f496ad6 (sitemap, current LIVE).

## Priority 1 — Cutover ✅ COMPLETE

Deployed Version `285d1839-4da7-4daf-9942-c21e24d7de0a`. Both custom domains
attached automatically by `opennextjs-cloudflare deploy` (no error — Pages
conflict gone since Andrew detached). **amagna.co is LIVE on the Worker.**

| Check | Result |
|-------|--------|
| Build green | ✅ OpenNext bundle built clean |
| Deploy + domain attach | ✅ amagna.co + www.amagna.co attached, Version 285d1839 |
| amagna.co 200 + new build | ✅ 200 (~0.8s); new routes /crew /voyage-v1 = 200 (don't exist on old Pages feaf751) |
| www.amagna.co 200 | ✅ 200 |
| All routes 200 | ✅ 16/16: / /about /audit /book /checkout /checkout/success /crew /custom /custom-quote /home-services /pricing /real-estate /voyage-v1 /who-we-serve /robots.txt /sitemap.xml |
| Stripe checkout cs_test | ✅ POST /api/stripe/checkout {plan:growth} → cs_test_… session URL |
| Webhook 400-gates | ✅ POST /api/stripe/webhook no-sig → 400 "Missing stripe-signature header." |

Observation (not in plan, logged for Andrew): homepage `<title>` still reads
"AI growth systems for home services & real estate" — CLAUDE.md says positioning
should NOT read as home-services/real-estate-only. Candidate copy fix later.

## Priority 2 — Mobile polish ✅ (deployed Version 22c20c0e)

Verified with proper mobile emulation via Chrome DevTools Protocol (no new deps —
system Chrome + Node 24 global WebSocket; helper at /tmp/shot.mjs) at iPhone
viewport 390×844, deviceScaleFactor 2–3, mobile+touch emulation. Before/after
screenshots in /tmp/amshots.

| Issue | Root cause | Fix | Verified |
|-------|-----------|-----|----------|
| Hero blur (critical) | mobile dprCap 0.75 × renderScale 0.85 ≈ 0.64 of CSS res, upscaled | dprCap→2 (≈DPR2 effective), renderScale→default 1; adaptive ladder still degrades only under measured frame pressure | Deployed; crest/horizon sharper. On-device motion sharpness = Andrew to confirm |
| Scroll jank (critical) | NOT a listener/layout violation — audit found all scroll listeners passive, zero layout reads in scroll/rAF paths, both canvases pause offscreen via IntersectionObserver. Real cost = Frame-2 ambient water repainting the full canvas every frame while scrolling through it | Throttle ambient water to ~30fps on touch devices (visually identical for slow waves, halves main-thread paint); release crew-card will-change after dealing | Structural; on-device feel = Andrew to confirm |
| Crew section too tall | 2-col grid + full blurbs + 40vh top pad | Compact 3+2 grid (portrait+name+title; blurb/Meet-link return at sm+), trim top pad on mobile | ✅ screenshot: Zeno/Exodus/Solon + Hero/Thales fit ~one screen |
| Hub logos too small | proportional SVG shrinks marks on narrow screens | logo boxes 44→60px, tighter mobile padding, diagram uses more width | ✅ screenshot: all 8 marks legible, no overlap |
| Video arrows above card | controls nested in copy column (above deck on mobile) | render below deck on mobile, under copy on desktop (responsive display, one in a11y tree per breakpoint) | ✅ screenshot: arrows below card |

Note: headline "Marketing Systems" does NOT clip at true DSF3 (an earlier
tall-window capture artifact suggested it did — ruled out, no change made).
Live re-verified amagna.co HTTP 200 after deploy.

## Priority 3 — Gold Map verification

| Check | Result |
|-------|--------|
| Four fixes in deployed bundle | ✅ Built from HEAD containing all four commits (e2dbb0f coercePlan crash, da6acee intake-change regen, 32f1301 cache-hit email, c8150a2 Turnstile + 202de3e cache key). Confirmed: cache-hit email subject literal "Your Plan to Gold…" present in built server function `handler.mjs` |
| Turnstile secret set | ✅ `TURNSTILE_SECRET_KEY` present in `wrangler secret list` (8 secrets total) |
| Turnstile site key live | ✅ `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (24-char `0x…`) inlined into the deployed `/audit` client chunk; script `challenges.cloudflare.com/turnstile` present; `TURNSTILE_ENABLED` true → widget renders + required; server `verifyTurnstile()` enforces |
| /audit funnel renders (mobile) | ✅ Scroll-styled Gold Map intro + 3-step card + positional scarcity ("the crew reviews every application" — no exclusivity, compliant) |
| Supabase lead capture wired | ✅ by wiring — `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set; `persistPlan`/submission code in bundle (same wiring verified prior runs) |
| **E2E plan generation** | ⚠️ **NEEDS ANDREW (human run-through).** Not headless-automatable BY DESIGN: (a) Step 2 requires a human to take the assembled prompt to their own AI and paste back a "master prompt key" — no AI-in-the-loop bypass; (b) Turnstile now (correctly) blocks programmatic submission; (c) Next.js server-action wire protocol is encrypted/obfuscated. Did NOT spend a generation on a fragile hand-crafted call. Andrew: run ONE fresh test with `gladkiandrew47+autotest1@gmail.com`, confirm a `plan_generated` row with a real plan + the emailed plan arrives. |

## Priority 4 — Hygiene ✅

- **robots.txt:** Cloudflare-managed, `search=yes`, AI-train bots disallowed,
  `Allow: /`, sitemap referenced. Good.
- **sitemap.xml:** fresh (lastmod today). Added `/audit` (Gold Map funnel) at
  priority 0.9 — it was crawlable but missing from the sitemap. Deployed + verified
  live. /checkout, /checkout/success, /voyage-v1 correctly excluded.
- **noindex audit:** NO `noindex` on `/` or `/audit` (the old preview-noindex is
  NOT lingering on the homepage). `/audit` decision = INDEX (it's the funnel).
- **Perf (curl-timing, no new deps):** homepage TTFB ~0.13–0.16s, total ~0.15–0.18s,
  HTML ~91 KB. First Load JS shared ~87 KB. Worker startup ~23 ms. Healthy for a
  pre-launch site; deeper Lighthouse pass available later (notable future win:
  the two animated canvases are the main mobile CPU cost — already gated/throttled).
- **cutover-status.md:** updated to COMPLETE (Worker serving, Pages = rollback,
  Version IDs, 8 secrets).
- **Security:** `.gitignore` now ignores `.env*.save/.bak/~` — an untracked
  `apps/marketing/.env.local.save` secrets backup was not matched by the existing
  patterns and could have been committed by a stray `git add .`.

## Comprehensive mobile recheck (all routes, CDP emulation 390×844)

Swept every page at mobile width — no layout bugs, no overflow, all CTAs/forms work:

| Page | Mobile result |
|------|---------------|
| / | hero crisp, crew compact 3+2, hub logos legible, deck arrows below card, testimonials = labeled placeholders (no fabrication) |
| /audit | Gold Map funnel renders; positional scarcity only (compliant) |
| /pricing | 4 tiers, "Starting at" on every tier (CLAUDE.md compliant), FAQ, CTAs — clean |
| /who-we-serve | broad positioning ("works for almost any operator… not home services or real estate? still fits") |
| /home-services, /real-estate | niche funnels clean, no asset mixing |
| /crew | full bios stack; founder section frames Breaking the Fast as client work |
| /about | brand story + etymology + founder; BTF framed as proving-ground client work |
| /custom-quote | full form mobile-friendly (full-width fields, working selects) |
| /book | Cal.com booking calendar renders + is usable on mobile |

## Final live verification (Version 3f496ad6, 2026-06-05)

All 16 routes + /voyage-v1 + www.amagna.co = 200. Stripe checkout → `cs_test_…`.
Webhook no-sig → 400. amagna.co is LIVE, green, and mobile-friendly.

## For Andrew (action items)

1. **Gold Map E2E (human):** run ONE fresh test through /audit with
   `gladkiandrew47+autotest1@gmail.com` — complete all 3 steps (the AI-key step
   needs a real human + AI), confirm a `plan_generated` row in Supabase with a
   real plan AND the emailed plan arrives. This is the only Gold Map check that
   can't be automated (Turnstile + human AI step, both by design).
2. **On-device mobile feel:** confirm on your iPhone that (a) the ocean is now
   crisp and (b) scrolling through the crew/voyage section is smooth. The fixes
   target ~DPR2 render + 30fps ambient water on touch; on-device is the real test.
3. **Positioning judgment call (optional):** the homepage SEO `<title>`/meta
   description still read "for home-services and real-estate operators" while the
   visible hero/body is broad. Left as-is (it targets your two lead niches for
   SEO) — change it if you want the metadata to read as broad too. Not changed
   autonomously since it's an outward-facing SEO decision.
4. **Delete** `apps/marketing/.env.local.save` when convenient (now gitignored,
   but no reason to keep a secrets backup lying around).
5. **Meta Pixel** `NEXT_PUBLIC_META_PIXEL_ID` still empty — pixel won't fire
   until you set it (var in wrangler.jsonc + .env.local, then redeploy).

## Review commands

```bash
# See this run's commits
git -C /Users/drekothapoet/dev/amagna log --oneline 32f1301..HEAD

# Re-verify live
for r in / /audit /pricing /book /custom-quote; do \
  echo "$(curl -s -o /dev/null -w '%{http_code}' https://amagna.co$r) $r"; done
curl -s -X POST https://amagna.co/api/stripe/checkout -H 'Content-Type: application/json' \
  -d '{"plan":"growth"}' | grep -o 'cs_test_[A-Za-z0-9]*' | head -1

# Mobile screenshots captured this run
ls /tmp/amshots/    # before-*/after-*/page-* PNGs at iPhone emulation

# Re-screenshot any page at iPhone DPR3 (helper, no deps)
node /tmp/shot.mjs "https://amagna.co/" /tmp/out.png 390 844 3 fold 4000
```
