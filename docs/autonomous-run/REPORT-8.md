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

## Still open (separate from this task)
- Homepage AI-generated video: Andrew provided `Vids for Amagna/roofinspectionad.mp4` to feature on the homepage — tracked as the next task.
