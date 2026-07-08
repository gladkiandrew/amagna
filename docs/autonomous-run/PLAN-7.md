# Autonomous Run Plan 7 — Last website day: Gold Map as #1 CTA, Who We Serve funnels, Our Story, footer, FAQ

> amagna.co is LIVE — every deploy is production. Verify after each, never leave
> it broken. Work priorities IN ORDER, continuously, no questions. Decide per
> CLAUDE.md, log in `docs/autonomous-run/REPORT-7.md` as you go.

## The North Star (applies to everything below)

**The #1 call-to-action across the entire site is "Get Your Gold Map" (the
/audit funnel).** Booking a call is the SECONDARY path. We want visitors to
chart a Gold Map first (it qualifies them and preps us), then book. We still
allow a direct call booking, but it is NOT promoted everywhere — the hero is
the one sanctioned place to book without a Gold Map.

## Guardrails (same as prior runs)

No `git push`. Stay on `auto/2026-06-04-website-build`. Stripe/checkout CODE
frozen. The Cal.com booking integration CODE is frozen, but page copy/UI
around it is editable. Zero new npm deps. Never read `.env*` (except sourced
deploy). Build green before every commit. 15-min rule; circuit breaker at 3
fails. Never commit `Pics for Amagna/`, `.DS_Store`, `.agents/`, `.claude/*`,
`.env*`, `skills-lock.json`. No fabricated testimonials/metrics. No exclusivity
language.

## Phase 0 — Checkpoint, build green baseline.

---

## Priority 1 — Global CTA + nav restructure (high impact, do first)

1. **Nav bar:** remove "Book a Call" and remove "Field Notes" from the nav.
   Final desktop + mobile nav: logo (mark + "Amagna AI") → Who We Serve ·
   Our Story · Pricing · **[Get Your Gold Map]** as the primary styled button
   (links to /audit). Gold Map is the nav CTA now, not Book a Call.
2. **Site-wide CTA swap:** anywhere a "Book a Call" CTA appears as the primary
   action (section CTAs, CtaBand, page bottoms), change it to **"Get Your
   Gold Map" → /audit**. EXCEPTIONS that keep a book option: (a) the homepage
   hero keeps both — "Get Your Gold Map" primary + "Book a Call" secondary;
   (b) the /book page itself. Grep all CTAs and reconcile.
3. **Kill Custom Quote:** `/custom-quote` no longer exists — redirect it to
   `/audit`. Replace every "custom quote" / "get a quote" CTA across the site
   (incl. on `/custom` and pricing) with "Get Your Gold Map" → /audit. If a
   `/custom` page exists, keep the page but repoint its CTA to the Gold Map.
4. **Booking advisory on /book:** add a prominent nudge above the Cal.com
   widget: recommend charting a Gold Map first so the crew can prep ("Want a
   sharper call? Chart your Gold Map first — it tells us your background so we
   come ready. → Get Your Gold Map"). Keep a clear "I'd rather just book"
   path to the calendar below it. Do not modify the Cal.com integration code.
5. Commit per concern; deploy; verify.

## Priority 2 — Who We Serve hub + 6 industry landing funnels

This is the biggest build. `/who-we-serve` becomes a hub of SIX industry
boxes, each linking to its own sub-page that doubles as a paid-ad landing
funnel (a Meta ad for, say, real estate lands directly on that sub-page, then
flows to the homepage / Gold Map).

**Hub page (`/who-we-serve`):**
- Header: **"Who Are Our Marketing Systems Built For?"**
- Subtitle (use this): *"If your business runs on customers, our system runs
  your marketing. Built for operators who'd rather grow than babysit
  campaigns — here's where we go deepest."*
- **Six boxes.** Keep the card + "Chart this course →" pattern (he likes it).
  Each box: a BIG title (industry name — noticeably larger than now, a step
  below a headline), one short industry-specific hook line, then 2–3 **bullet**
  sub-points (not paragraphs), then the CTA into the sub-page. Remove the
  "For …" prefix from every title. The six:
  1. **Home Services** — hook: predictable, owned jobs instead of
     feast-or-famine. (existing `/home-services`)
  2. **Real Estate Agents, Developers & PE** — hook: stay top of mind and
     fill the pipeline across agents, teams, developers, and real-estate PE.
     (existing `/real-estate`)
  3. **Medical Offices** — hook: a full schedule of the right patients,
     handled compliantly. (new)
  4. **Ecommerce Brands** — hook: content + ads that turn scrollers into
     repeat buyers. (new)
  5. **Multi-Location Businesses** — hook: consistent marketing across every
     location, run from one brain. (new)
  6. **Don't see your industry?** — hook: the system adapts to almost any
     operator; chart a Gold Map and we'll show you. → links to /audit (this
     is the broad/volume-strategy catch-all; matches CLAUDE.md).
- **"Works with the tools you already run" logos section** — keep it (he
  likes it).
- **New explainer content:** add a section making clear our AI agents/crew
  **adapt to each client's custom needs** — the system is configured per
  business, not one-size-fits-all. Tie to the crew (Zeno/Exodus/Solon/Hero/
  Thales) tuning to their industry and goals.

**Each industry sub-page = a landing funnel.** Consistent template, but
genuinely industry-specific copy (not boilerplate with the noun swapped):
- Industry-specific hero headline + subhead + **Get Your Gold Map** primary
  CTA (secondary: book).
- The real pain that industry feels (specific, in their language).
- How the Autonomous Marketing System solves it for THEM (name the channels,
  the motions, what the crew runs).
- "Works with the tools you already run" (industry-relevant logos where
  possible; reuse existing assets, create simple SVG marks if needed and log
  which).
- A testimonials placeholder slot (clearly labeled, no fabrication).
- Strong closing CTA → Get Your Gold Map.
- Per-page SEO metadata + OG + JSON-LD. Add all six to sitemap. Keep
  `/home-services` and `/real-estate` at their existing URLs (ad targets);
  pick clean sibling URLs for the three new ones (e.g. `/medical-offices`,
  `/ecommerce-brands`, `/multi-location`) and log the scheme.
- Mobile-clean at DPR 3.

## Priority 3 — Our Story (/about) redesign + merge Meet the Crew in

1. **Make `/about` more dynamic, less wordy.** The current page reads heavy.
   Tighten the narrative arc (why we exist → the thesis → the voyage metaphor
   → the founder), cut wordiness, add visual rhythm (cream/navy sections,
   gold rules, Fraunces) so it feels designed, not text-dumped.
2. **Move "Meet the Crew" onto `/about`.** Consolidate the `/crew` content
   into an /about section. Each crew member (Zeno, Exodus, Solon, Hero,
   Thales) gets **their own short story** — who they are, what they own — and
   a clear through-line on **how they operate together in synergy** to produce
   dynamic output (Zeno orchestrates; the others execute their lane; human in
   the loop). Use the existing portraits at `public/brand/crew/<slug>.webp`.
   Keep the founder (Andrew) as the human at the helm, distinct from Zeno.
   Breaking the Fast is the FIRST CLIENT, never Andrew's company.
3. **Redirect `/crew` → `/about`** (with the crew anchor, e.g. `/about#crew`)
   so old links don't break. Update the homepage Frame-2 "Meet the crew" link
   to go directly to `/about` (the crew section).
4. Add a **Field Notes (recent blog posts) section** at the bottom of /about
   (see Priority 4).

## Priority 4 — Footer rebuild + FAQ + Field Notes placement

1. **Footer rebuild** (current one is weak): lead with the **logo (mark +
   "Amagna AI"), same as the nav.** Clean column structure — nav links
   (Who We Serve, Our Story, Pricing, Gold Map), a **Field Notes** link
   (blog), contact (andrew@amagna.co), socials (from SOCIAL_LINKS), and
   legal/disclaimer line. Field Notes STAYS in the footer (removed only from
   the top nav). Mobile-clean.
2. **FAQ section above the footer** (homepage; also add to /pricing). Draft
   from these (edit-ready, all true per CLAUDE.md/README — no invented
   claims):
   - **What's an Autonomous Marketing System?** A crew of AI agents that runs
     your content, ads, follow-up, and reporting day to day — with a human
     approving anything that matters.
   - **How does the Gold Map work?** Tell us about your business, bring a
     master prompt from your own AI, and we generate a free, specific plan for
     growing your business — then you book a call to put it in motion.
   - **What does it cost?** Plans start at $997/mo (Foundation), $1,497/mo
     (Growth), and $2,497/mo (Authority). Final pricing scales with credits
     and ad spend. A one-time setup fee ($500–$2,000) covers onboarding and
     the initial build.
   - **Are there long-term contracts?** No — month-to-month.
   - **Who do you work with?** Any operator who wants marketing that runs
     itself. We go deepest in home services, real estate, medical offices,
     ecommerce, and multi-location businesses — but the system adapts to most.
   - **How fast will I see results?** Foundations (profile, follow-up, first
     content/ads) go live in the first weeks; compounding results build over
     the following months. We review real numbers with you on the call.
   - **Do I have to do the Gold Map to talk to you?** No — you can book a call
     directly. But charting a Gold Map first means we come to the call already
     prepped on your business.
   - **What's the crew / Sapt?** Your marketing is run by a crew of AI agents
     (Zeno, Exodus, Solon, Hero, Thales) built on the Sapt platform, with us
     at the helm.
3. **Field Notes sections:** a recent-blog-posts section at the very bottom of
   the **homepage** and **/about** (above the footer), pulling latest posts
   from the same blog source. NOT in the top nav.

## Priority 5 — Pricing (DEFERRED — minimal touch only)

Andrew will detail pricing later. This run: ONLY apply the global CTA changes
to /pricing (Gold Map as primary CTA, kill any custom-quote link, add the FAQ
section). Do NOT restructure pricing tiers/content — leave that for his
direction.

## Priority 6 — Verify, mobile sweep, report

Full build green, all routes 200 on live, mobile DPR-3 sweep of every changed
page, accessibility (nav, cards, FAQ as accessible disclosure, headings).
Update sitemap. REPORT-7.md: commits, what's live, decisions made (URL scheme
for new sub-pages, the 6th box, etc.), and any Andrew action items. Final
commit: `Update autonomous run 7 report`.

## Priority order rationale (if time runs short)

P1 (CTA/nav) and P4 (footer/FAQ) are quick and high-visibility — they must
land. P2 (six funnels) is the big one; if time runs out mid-way, finish the
hub + the two existing niche pages polished, and leave the 3 new sub-pages as
solid drafts rather than half-built. P3 (Our Story/crew) is self-contained.
