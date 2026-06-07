# Autonomous Run 7 — Last website day report

Branch: `auto/2026-06-04-website-build`. Started 2026-06-07. Following `PLAN-7.md`.
amagna.co is LIVE on the Worker — every deploy is production; verify after each.

North Star: **"Get Your Gold Map" (/audit) is the #1 CTA site-wide; booking is secondary.**

## Decisions log
- **URL scheme for new funnels:** `/medical-offices`, `/ecommerce-brands`, `/multi-location` (clean siblings of `/home-services`, `/real-estate`).
- **6th Who-We-Serve box:** "Don't see your industry?" → links to `/audit` (broad/volume catch-all, per CLAUDE.md), not a sub-page.
- **Booking kept (not swapped to Gold Map):** homepage hero secondary, `/book`, niche-page hero secondary (per P2), Gold Map plan-reveal end CTA, and checkout-success (post-purchase onboarding — not a lead CTA).
- **/custom-quote:** retired → 308 permanent redirect to `/audit`. The `/custom` page stays, CTA repointed to Gold Map.

## Commits
- See `git log a51df75..HEAD` (per-concern).

## Priority 1 — Global CTA + nav restructure ✅ LIVE (Version 5727b15e)

- Nav: Gold Map is the styled CTA button (header + footer); Book a Call & Field Notes removed from top nav. NAV_LINKS = Who We Serve / Our Story / Pricing.
- Site-wide CTA swap to "Get Your Gold Map" → /audit: CtaBand (now Gold-Map-only), custom-solutions panel, /custom, pricing tiers (book buttons removed). Hero keeps both; niche heros keep book secondary.
- `/custom-quote` → 308 → `/audit` (verified). 
- `/book`: Gold Map advisory above the calendar + "I'd rather just book" anchor.
- Verified live: all routes 200; redirect 308; advisory present.
## Priority 2 — Who We Serve hub + 6 funnels ✅ LIVE (Version 6d312b5b)

- Hub `/who-we-serve` rebuilt: new header + 6 boxes (5 funnels + Gold Map catch-all),
  big titles, hook + 2-3 bullets, crew-adapts explainer, tools logos.
- 3 new funnels live: `/medical-offices`, `/ecommerce-brands`, `/multi-location`
  (industry-specific copy, Service JSON-LD, testimonials placeholder, Gold Map CTA).
- **Logos reused** (no new SVGs): medical → google-calendar/gmail/hubspot/instagram/facebook;
  ecommerce → shopify/instagram/tiktok/facebook/gmail; multi-location → google-calendar/gmail/hubspot/instagram/facebook.
- All 6 in sitemap; verified all 200 + hub mobile DPR-clean.

## Priority 4 — Footer + FAQ + Field Notes ✅ LIVE (Version 513b7914)
> Done before P3 (must-land per plan rationale; completes P1's nav/footer story).
- Footer rebuilt: logo-led (mark + Amagna AI), Explore col now includes Gold Map + Field Notes, conditional socials row (SOCIAL_LINKS), disclaimer. Mobile-verified.
- `FaqSection` (accessible native `<details>` + FAQPage JSON-LD, canonical 8 Q&As) on the homepage. Pricing keeps its richer pricing-specific FAQ (P5 minimal-touch); only its closing copy updated.
- `FieldNotesSection` (latest posts, fallback-safe) on the homepage (and /about in P3). Field Notes is footer + these sections only — not the top nav.

## Priority 3 — Our Story redesign + crew merge ✅ LIVE (Version 64259e6b)
- `/about` tightened (less wordy, bigger lede) with cream/white/**navy** rhythm.
- Crew merged into an `#crew` section: Zeno featured (orchestrator) + 4 specialists in a grid, each with their story + human-in-loop line, framed around synergy. Portraits from `public/brand/crew/`.
- `/crew` → 308 → `/about#crew`; homepage Frame-2 crew links → `/about#crew`; `/crew` removed from sitemap. Field Notes section added above the footer on /about.

## Priority 5 — Pricing (CTA-only) ✅
- Tier CTAs → Get Your Gold Map (book buttons removed); custom-quote link gone; closing band Gold-Map-only. Tiers/content untouched (deferred to Andrew). Pricing's own FAQ kept.

## Priority 6 — Verify / mobile / sitemap ✅
- All 17 routes 200 live; `/custom-quote`→/audit and `/crew`→/about#crew both 308; www 200; Stripe checkout `cs_test` + webhook 400 intact.
- Mobile DPR sweep: hub, /about, homepage footer/FAQ/Field Notes, niche funnels — clean.
- Sitemap updated (+3 funnels, −custom-quote, −crew). FAQ = accessible disclosures; single h1 per page.

## Final live version: see latest deploy (64259e6b at report time).

## Andrew action items
1. **/blog + Field Notes still show FALLBACK posts** until a valid **CMS-scoped `SAPT_API_KEY`** is set on the Worker (carryover — the rotated keys 401'd). The homepage/about Field Notes pull the same source, so they'll go live automatically once the key works.
2. **Socials:** add agency profile URLs to `SOCIAL_LINKS` in `lib/site.ts` → they appear in the footer + Organization JSON-LD `sameAs`.
3. **Testimonials:** the niche pages + homepage have clearly-labeled placeholder slots — send real quotes to fill them (no fabrication per rules).
4. **Pricing:** deferred — tiers/content untouched this run; send your direction and I'll restructure.
5. **Review new funnel copy:** `/medical-offices`, `/ecommerce-brands`, `/multi-location` are industry-specific drafts — confirm claims/positioning read right for each.
6. **Gold Map E2E:** still your one manual run (Turnstile + human AI step).
7. **Optional cleanup:** the `/custom-quote` form + server action (`components/custom-quote-form.tsx`, `app/custom-quote/actions.ts`, `lib/custom-quote.ts`) are now orphaned (page redirects). Safe to delete when convenient.
8. **`/custom` page** still exists with its CTA repointed to the Gold Map — decide later whether to keep it or fold into the Who We Serve hub.
## Priority 4 — Footer + FAQ + Field Notes
## Priority 5 — Pricing (CTA-only)
## Priority 6 — Verify / mobile / sitemap

## Andrew action items
- (filled at end)
