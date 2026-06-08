# Autonomous Run 8 — Who We Serve de-risk + Pricing/contracts overhaul

Branch: `auto/2026-06-04-website-build`. Date 2026-06-08.
amagna.co is LIVE on the Worker — every deploy is production. **Not pushed** (per instruction); Andrew pushes to deploy. All work verified locally (`next build` green + `next start` route checks + DPR-3 mobile emulation).

North Star unchanged: **"Get Your Gold Map" (/audit) is the #1 CTA site-wide.**

## Commits (per concern — `git log 8f2bc7e..HEAD`)
- `85127e8` De-risk Who We Serve cards; rename real-estate card
- `5cbf981` Soften guarantee language on industry sub-pages
- `19d3ce0` Rebuild pricing as three equal tiers with new prices and terms
- `9442e2e` Sync homepage FAQ to new pricing; redirect /checkout to Gold Map
- `2228c16` Make /checkout redirect a true edge 307 via next.config

## Decisions (confirmed with Andrew before editing)
- **/checkout:** redirect → /audit. Implemented as a `next.config` edge 307 (true `Location` header, works without JS) rather than a JS-dependent page redirect. Stripe integration code left fully intact.
- **Multi-Location card:** 3 bullets (reconstructed from the garbled brief) to match the other cards' rhythm.
- **Ad-spend explainer:** "~$5/day minimum" (reconstructed from corrupted source text).
- **Garbled-text reconstructions** (flagged, not asked): Growth tagline → "The full system, run by the crew."; homepage FAQ cost line → adds the missing "Authority" label; `ogescriptions` → og descriptions.

## Part A — Who We Serve hub cards (`who-we-serve/page.tsx`)
- Real-estate card retitled → **"Real Estate Agents + Owners"** (dropped "Developers & PE"); hook + bullets reworked to agents/teams/owners.
- All six cards' hooks + bullets replaced with the exact system-framed copy from the brief. Guarantee language removed ("fill the slow months", "never lets a job slip", "not buyer noise", "full schedule", "cut no-shows", "right patients").
- "Don't see your industry?" card left as-is (does not over-promise).

## Part A.3 — Industry sub-page softening (`lib/niches.ts`, drives all 5 funnels)
Reframed outcome promises → system/process language. Changes logged:
- **Home services:** headline "More calls. Predictable leads. We end the feast-or-famine cycle." → "Predictable, automated marketing for your service area."; sub "keeps your phone ringing" → "designed to bring in work through the slow months"; system point "Follow-up that never forgets / no job slips" → "Instant lead follow-up, run for you / follow-up happens without you chasing it"; CTA "to fill your calendar" → "the marketing system we would build for you"; meta "owned leads" → "automated marketing".
- **Real estate:** headline "More listings…" → "Automated marketing that keeps you top of mind."; eyebrow + sub now "agents, teams, and owners"; "your listings coming" → "your pipeline active"; "the agent they think of first" → "you stay top of mind"; "listing-intent ads, not buyer noise" → "listing-focused ads"; meta dropped "win more listings" and "developers, and real-estate PE".
- **Medical:** headline "A full schedule of the right patients…" → "Automated patient acquisition, handled compliantly."; "fills your chairs" → "designed to bring in the patients you want"; "Reviews & reputation on autopilot / reputation finally matches your care" → "Automated review workflows"; "Reminders & recall that reduce no-shows / keep the schedule full" → "Automated reminder & recall workflows / run without front-desk effort"; meta "Fill your schedule" → "Automated patient acquisition".
- **Ecommerce:** headline "…turn scrollers into repeat buyers" → "Automated content and ads for your store."; "Paid acquisition, tuned / spend finds profitable customers" → "Managed paid acquisition"; "Email & SMS that drives repeat orders / a base that comes back" → "Automated email & SMS flows"; CTA + meta reframed off "turn scrollers into repeat buyers".
- **Multi-location:** headline "Consistent marketing…" → "Automated marketing across every location…"; sub dropped "and full"; "shows up for nearby searches" → "each profile stays accurate and active"; meta "Consistent" → "Automated".
- Pains (the prospect's stated problems) left intact — they are not Amagna promises.

## Part B — Pricing + contracts (`pricing/page.tsx`, `faq-section.tsx`, `next.config.mjs`)
- **3 equal columns**, Growth elevated with **"Most popular"**. Foundation $200/mo (after a one-time $1,000 build) · Growth $1,500/mo `+ Ad Spend` · Authority $2,500/mo `+ Ad Spend` `+ token usage`. Sub-price lines visible (not fine print). Ad-spend explainer ("~$5/day minimum") + metered-token note placed by the cards.
- **Contracts reframed positively** everywhere: "Month one is the build … you commit to a 6-month minimum on your plan." Removed all month-to-month / no-long-term-contract copy.
- **Setup fee removed** entirely (hero, fine print, the old "What does the setup fee cover?" FAQ → "What does month one cover?").
- **Standalone $500 "Update" card deleted**; its /checkout link removed.
- **FAQ rewritten** on /pricing and **synced** on the homepage (`faq-section.tsx`): contracts, ad-spend (old "$5K+/month 10% override" sentence deleted), 3-business-day setup + 48-hour feedback call, "What does month one cover?", homepage cost line updated to the new prices.
- **Meta/OG/Twitter:** /pricing description updated; added an explicit page-level `twitter` block (page `openGraph` override otherwise drops the inherited twitter description) + canonical. New prices + 6-month terms now appear in /pricing meta, og, and twitter.
- All pricing CTAs route to **/audit** ("Get Your Gold Map"). No card triggers Stripe.

## ⚠️ Money-path items needing Andrew's attention
- **Stripe integration left untouched** as instructed: `lib/plans.ts` (still labels Growth `$1,497/month` and an `update` `$500 one-time` with `STRIPE_PRICE_GROWTH`/`STRIPE_PRICE_UPDATE`), `lib/stripe.ts`, `/api/stripe/*`, `components/checkout-buttons.tsx`. These are **no longer user-facing** — the only front door (`/checkout`) now 307-redirects to /audit, so nothing charges the old/discontinued amounts.
- **To re-enable direct purchase** you'll need: new Stripe price IDs for the new tiers ($200 + $1,000 build / $1,500 / $2,500), updated `plans.ts`, and removal/adjustment of the `/checkout` redirect in `next.config.mjs`. The retired `update` plan ($500) should be deleted from `plans.ts` when you do.
- `/checkout/success` is intentionally still live (Stripe `success_url`) and is unaffected by the redirect (exact-match source).

## Verification
- `next build` green after every commit.
- All routes 200 (`/`, `/who-we-serve`, `/pricing`, `/home-services`, `/real-estate`, `/medical-offices`, `/ecommerce-brands`, `/multi-location`, `/audit`); `/checkout` → 307 `Location: /audit`; `/checkout/success` → 200.
- Stale-string grep clean of all user-facing copy. Remaining matches are intended: the FAQ **question** "Are there long-term contracts?" (brief keeps it) and the untouched Stripe `plans.ts` labels (flagged above).
- DPR-3 mobile (390px, isMobile, deviceScaleFactor 3) via puppeteer-core emulation: `/pricing` and `/who-we-serve` both `documentScrollWidth == innerWidth == 390`, zero elements wider than viewport, visually clean. (Note: plain headless `--window-size` screenshots are misleading — they render the desktop layout and clip it; real device-metrics emulation is required to judge mobile.)
- **Not pushed.** Awaiting Andrew's deploy.

## Homepage video (done)
- `roofinspectionad.mp4` (720×1280, 9:16, 8s) added as `public/brand/examples/example-1.mp4` — the documented slot for the homepage "See the output" deck. Autoplays/loops in the front card; slots 2–3 keep the placeholder until more videos arrive.

---

# PLAN-8 execution (2026-06-08, second session) — DEPLOYED LIVE

CLAUDE.md was updated (new pricing model, Snapchat, onboarding flow, tool-connectivity, Political Candidates now an active non-partisan industry). Followed `PLAN-8.md` in order; **deployed to production and verified live after each priority.** No `git push` of the branch.

## Commits (`git log 6adfeff..HEAD`)
- Adjust Growth to $1,250 and reposition Authority at $2,000 (P1)
- Add Snapchat to ad-platform listings site-wide (P2)
- Add onboarding 'How it works' section to Who We Serve (P3)
- Elevate tool-connectivity message (MCP/API) site-wide (P4)
- Add Political Candidates as the 6th industry (P5)
- Restructure all industry sub-pages (P6)
- Update autonomous run 8 report (P7)

## Deploy versions (Cloudflare, amagna.co)
P1 `a47b06d1` · P2 `78985e0f` · P3 `58efc943` · P4 `392e7472` · P5 `feacb0a5` · P6 `3f9e9f4f`.

## What changed
- **P1 — Pricing:** Growth **$1,500 → $1,250/mo + Ad Spend**; Authority **$2,500 → $2,000/mo + Ad Spend + token usage**, repositioned as the full-business-automation tier ("Everything in Growth, plus — mainly focused on automating your whole business"; "2 managed ad campaigns" replaced "5–7 ad sets"). Updated across the /pricing cards, meta/og/twitter, and homepage FAQ. `lib/plans.ts` Stripe values left untouched (unreachable).
- **P2 — Snapchat:** added to every ad-platform listing — homepage services pillar, Growth pricing bullet, Thales (crew page/about + the Who We Serve crew line), home-services/medical/ecommerce niche ad bullets, ecommerce hub card, Gold Map prompt, blog fallback, and the (unused) legacy services component for consistency.
- **P3 — Onboarding:** new "How it works" section on /who-we-serve — Gold Map as the dominant Step 1, then book call → first payment → deployment call → delivered within 3 business days.
- **P4 — Tool connectivity:** /who-we-serve tools section now leads with "If it has a key, we can wire it in." + the MCP/API promise; homepage integrations orbit gained a prominent connectivity caption.
- **P5 — Political Candidates:** replaced the "Don't see your industry?" box with a real Political Candidates card + `/political-candidates` funnel (in sitemap). Non-partisan, system-focused copy per CLAUDE.md.
- **P6 — Sub-page restructure (all 6):** removed the "Sound familiar?" pain frame; "What We Built" is now the first frame below the hero; added "How to get started" (Gold Map + onboarding flow) and a "Plug it into the AI you already use" differentiator block (Claude/ChatGPT/Gemini); added a related-posts section filtered by each niche's `category`. Niche pages now `revalidate = 3600`.

## Related blog posts — wiring done, awaiting Cowork's posts
- Each sub-page reads published posts and shows up to 2 whose `category` (case-insensitive contains) matches: Home Services / Real Estate / Medical Offices / Ecommerce / Multi-Location / Political. Section is **hidden until matches exist** (graceful).
- As of this run, only the two fallback posts (`Foundations`, `Playbooks`) are live, so the section is hidden everywhere. **For Andrew/Cowork:** once posts are published in Sapt with those exact category values, they appear automatically within ~1 hour (hourly revalidate) — no redeploy needed. If they don't appear, check `SAPT_API_KEY` is set on the Worker and the posts' `category` field matches.

### Update — Sapt key set, live posts flowing (deploy `9f5d0396`)
- `SAPT_API_KEY` set as a Worker secret (`wrangler secret put`, value from `.env.local`, never printed). Redeployed so `/blog` regenerated against live Sapt.
- `/blog` now serves live Sapt posts (fallback Foundations/Playbooks gone). Related-posts sections populate live: `/home-services` and `/real-estate` each show their matching post; `/medical-offices` and `/political-candidates` still hidden (no posts in those categories yet — graceful).
- **Minor for Cowork:** one live post has an auto-generated slug `page-a8631b7daf62bdf6` (missing a proper slug field in Sapt) — worth fixing the slug in the CMS so its URL is clean.

## Verification (live on amagna.co)
- Build green before every commit; all routes 200 live (incl. `/political-candidates`).
- Redirects intact: `/checkout`→/audit (307), `/custom-quote`→/audit (308), `/hero-v2`→/ (308), `/crew`→/about#crew (308).
- Grep: no user-facing `$1,500`/`$2,500` (only `lib/plans.ts` Stripe values remain, unreachable); Snapchat in every platform listing; onboarding + tool-connectivity + AI-connection blocks live; "Sound familiar?" gone from all 6 sub-pages.
- DPR-3 mobile (real isMobile emulation) on live /pricing, /who-we-serve, /political-candidates: `scrollWidth == innerWidth == 390`, zero overflow.

## Money path (unchanged, still needs Andrew)
- Stripe stays OFF; all CTAs route to the Gold Map. `lib/plans.ts` holds OLD price IDs/labels — re-enabling direct purchase needs new Stripe prices for $200+$1,000 build / $1,250 / $2,000, an updated `plans.ts`, and removing the `/checkout` redirect.

---

# Blog seed run (2026-06-08) — BLOCKED on Sapt write API, posts staged

Goal: 2 published posts per industry in Sapt. **Could not publish** — the Sapt
REST API (`api.sapt.ai`) is **read-only for CMS content**: its OpenAPI spec
exposes only `GET /projects/{id}/cms/content/{type}` and `…/{type}/{slug}` (59
write endpoints exist, none for content/blog). All write-path probes 404'd; the
MCP `saveContent` path is down. Per instruction, stopped, left the blog fallback
untouched, and staged the posts.

## Written & staged (`scripts/sapt-blog-seed/`, seed.mjs + out/*.json + README)
10 posts, ~600–800 words, Amagna voice, system-framed, no guarantees/stats/
exclusivity, Gold Map CTA. Exact category values set for the related-posts filter.
Per industry (incl. existing live Sapt posts) → 2 each once published:
- Home Services: 1 live + 1 staged (`google-business-profile-cheapest-lead-source`)
- Real Estate: 1 live + 1 staged (`real-estate-follow-up-system-leads-into-listings`)
- Medical Offices: 0 live + 2 staged
- Ecommerce: 0 live + 2 staged
- Multi-Location: 0 live + 2 staged
- Political: 0 live + 2 staged

## Andrew action items
1. **Publish the 10 staged posts** when the Sapt MCP is back (`saveContent`, no id =
   create, contentTypeSlug `blog-post`, use each file's `content` object) or via the
   dashboard CMS. Steps in `scripts/sapt-blog-seed/README.md`.
2. After publishing, sub-pages + `/blog` pick them up within ~1h (hourly revalidate)
   or redeploy to surface now.
3. SEO note: the named keyword tools (`/marketing:seo-audit`, searchfit-seo) aren't
   installed here — keywords chosen via WebSearch validation + SEO judgment (long-tail,
   high-intent). No fabricated stats used.
