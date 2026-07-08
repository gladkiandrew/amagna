# /grow — Funnel Rebuild Brief

> Master brief for rebuilding the `/grow` VSL funnel. Hand this to CC. Cowork wrote it;
> Andrew refines the copy. All draft copy below is editable — structure/rules are firm.

## Mission
Rebuild `/grow` as the cold-traffic conversion funnel: a two-video top (filmed VSL → animated
in-depth services video), then relevance + what/how + a single Book-a-Call close. Premium,
Michigan, lean. We are an "AI company you can actually hire" — **never the word "agency."**

## Hard rules
- **One CTA: Book a Call** (the sticky bottom bar → `CALCOM_DIRECT_URL` from `@/lib/site`).
  No other book-a-call buttons competing on the page.
- Sticky CTA slides up **right after the hero** (after the VSL), not after the 3rd section.
- `noindex` (keep `robots: { index: false }`), **not** in `sitemap.ts`.
- Global SiteHeader/SiteFooter stay suppressed via `grow.css` (keep as-is). Page ships its own
  minimal logo header + legal footer.
- Brand palette only: brand-deep `#1A0E36`, brand-purple `#5D2E8C`, brand-gold `#C9A961`,
  brand-warmgold `#D4B873`, brand-cream `#FAF8F3`. Display type via `font-display`.
- Both videos are swappable consts at the top of `page.tsx` (empty string → styled placeholder),
  same pattern as the current `VSL_VIDEO`. Andrew drops files in later.
- TypeScript strict, named exports, two-space indent. Verify `npm run build` passes before done.

## File-level build order
1. **DELETE** `src/app/grow/agent-map.tsx` (the node-map artifact is gone — replaced by the
   in-depth video + the Type-of-AI-Agents section).
2. **RESTORE** `src/app/grow/ways-toggle.tsx` from git: `git show 54bf419:apps/marketing/src/app/grow/ways-toggle.tsx > apps/marketing/src/app/grow/ways-toggle.tsx`.
   This is the interactive tab/panel "what we build" component.
3. **KEEP** `reveal.tsx`, `grow.css`, `sticky-cta.tsx` (verify sticky triggers after the hero
   sentinel, not later).
4. **REWRITE** `src/app/grow/page.tsx` to the section order below.

## Section order + draft copy

### 0. Header — logo only (keep current).

### 1. Hero — the VSL
- H1 (font-display): **Watch how we build your AI system in 90 seconds.**
- VSL player: `VSL_VIDEO` const (filmed video, dropped in later). Placeholder = gold play icon.
- **Subtitle strip directly below the VSL** (small, italic, muted cream): *"90 seconds on the AI
  system we install to run your marketing and operations."*
- No button here — the sticky bar carries the CTA. Optional soft scroll cue.
- Hero-end sentinel `<div id="grow-hero-end">` stays — sticky CTA keys off it.

### 2. In-depth services video (replaces the old artifact)
- Eyebrow: `Go deeper`
- Heading: **The full system, explained.**
- Caption: "A closer look at what we build, how the agents work together, and what it does for
  your business."
- Player: new `INDEPTH_VIDEO` const (Lumen-rendered MP4, dropped in later). Autoplay muted loop
  when set; styled placeholder when empty. 16:9.

### 3. ~~Who it's for — niche strip~~ → REMOVED from the page (2026-06-30)
The niche strip was cut from `/grow` (kept the page short, less scroll). **The niches now live
inside the in-depth services video instead** (a "who it's for" beat). Niche list kept here as the
video's source copy:
  - **Home Services** — HVAC, plumbing, roofing, electrical.
  - **Real Estate** — agents, teams, brokers.
  - **Medical Offices** — practices, dental, med-spa.
  - **Ecommerce** — DTC and Shopify brands.
  - **Multi-Location** — franchises and groups.

### 4. What we build — rotating cards (`<WaysToggle />`)
Pass this `ways` array:
- **Marketing** → *Runs your marketing* — "Ads, content, and follow-up, built and run for you
  across Meta, TikTok, Google, and Snapchat."
- **Operations** → *Automates your operations* — "Booking, reviews, and follow-up handled 24/7,
  wired into the tools you already use."
- **Visibility** → *Gets you found* — "Rank on Google and get recommended by AI — SEO + AEO built in."
- **Custom installs** → *Installed in person* — "Bigger builds, mapped on-site and installed
  across your business."
- **Built around you** → *Built around you* — "Not sure where AI fits? We find the highest-leverage
  spots and build them."

### 5. Type of AI Agents — grid
- Eyebrow: `The agents we deploy`
- Heading: **A team of AI agents, working together.**
- Grid (icon + name + one line) — **functional names only, no crew names:**
  - **Research Agent** — Studies your market, competitors, and customers.
  - **Content Agent** — Writes and generates posts, blogs, and creative.
  - **Ads Agent** — Builds and runs paid campaigns across platforms.
  - **Booking Agent** — Captures leads and books them onto your calendar.
  - **Follow-Up Agent** — Nurtures every lead until they convert.
  - **Reviews Agent** — Requests and manages reviews automatically.
  - **SEO + AEO Agent** — Gets you found on Google and inside AI answers.

### 6. Close — Michigan + Book a Call
- Heading: **An AI company you can actually hire.**
- Sub: "Proudly Michigan. Tell us about your business and we'll map your system."
- Primary button: **Book a Call** → `CALCOM_DIRECT_URL`.

### 7. Sticky Book-a-Call bar (after hero) + minimal footer (logo, "Proudly Michigan.", Privacy · Terms).

## Acceptance test
- Page renders top-to-bottom in this order; `npm run build` passes; `tsc` + lint clean.
- Exactly ONE book-a-call destination (sticky bar + the close section button both → CALCOM); no
  stray CTAs.
- Sticky bar appears after the VSL hero, not later.
- Word "agency" appears nowhere.
- Both video slots show styled placeholders while the consts are empty strings.
- `agent-map.tsx` deleted; `ways-toggle.tsx` restored and rendering the 5 cards.
- noindex intact; `/grow` not in sitemap.
