# Autonomous Run Plan — 2026-06-04

> Read by Claude Code at the start of an unattended ~3-hour session.
> Andrew is away. The mission: **keep building the Amagna website the entire
> time.** Work the priority ladder below IN ORDER. When one priority is done
> (or blocked), move immediately to the next. Never idle, never stop early
> while priorities remain.
>
> Do not stop to ask questions — Andrew cannot answer. When a decision is
> ambiguous, make the call most consistent with `CLAUDE.md`, `README.md`, and
> `docs/marketing/PLAN.md`, log it in `docs/autonomous-run/REPORT.md` under
> "Decisions made for Andrew," and keep moving. He will review everything
> when he returns.

---

## Hard guardrails (override everything else)

1. **Never `git push`.** All work stays local for Andrew's review.
2. **Never touch `main` or `staging`.** Work only on the branch created in Phase 0.
3. **Money path is frozen:** do not modify Stripe, checkout, or booking code
   (`src/app/api/stripe/**`, `src/app/checkout/**`, `src/app/book/**`,
   `lib/stripe.ts`). The audit widget (`src/app/audit/**`) IS in scope — but do
   not change its server-action wiring to Anthropic/Supabase in ways you cannot
   verify locally; UI, UX, copy, and flow improvements are fair game.
4. **Zero new dependencies.** No `npm install` of anything new.
5. **Never read or write `.env*` files.**
6. **`npm run build` must pass before every commit.** Never commit a broken build.
7. **15-minute rule:** if one problem blocks you >15 minutes, log it in the
   report, revert the half-done change, and move to the next task.
8. **Circuit breaker:** if 3 consecutive tasks fail, stop, write the report,
   end cleanly.
9. **Never commit:** `Pics for Amagna/`, `.DS_Store`, `.agents/`,
   `.claude/settings.local.json`, the stray root `ship-display-hull-gold.svg`.
10. **No fabricated testimonials, fake metrics, or invented client results.**
    Per CLAUDE.md. Real facts from README.md/CLAUDE.md only.

---

## Phase 0 — Safety checkpoint (~5 min)

1. Confirm you are on `feat/hero-crew`. Create and switch to a new branch:
   `auto/2026-06-04-website-build`.
2. Commit all in-progress work so nothing can be lost (hero-v2 app + component
   files, new brand assets, the deleted old hull SVG). Message:
   `Checkpoint WIP hero-v2 voyage work before autonomous run`.
3. `npm run build` — fix anything broken (smallest change), commit a green
   baseline.

---

## The priority ladder — work top to bottom

### Priority 1 — Finish the homepage (voyage)

#### 1A. Hero realism upgrade (Andrew's direct instruction — do this first)

Andrew reviewed the current `/hero-v2` ocean and rejected it as not realistic
enough. His visual reference is **bluemarinefoundation.com/the-sea-we-breathe**:
a photoreal, GPU-simulated ocean — true perspective swell rolling toward the
camera, volumetric sky, water that looks like water, not a painting. He wants
the Amagna hero "very similar" in realism.

- **Constraint amendment (authorized by Andrew):** the old "Canvas 2D only, no
  WebGL" rule in `docs/marketing/PLAN.md` is lifted for the hero water.
  Photoreal water requires GPU shaders. Prefer **raw WebGL2 with hand-written
  shaders** (zero new dependencies). If that proves genuinely infeasible
  within the session, **three.js is pre-approved as the single dependency
  exception** — flag it prominently in the report.
- Realism targets: multi-octave Gerstner/FFT-style wave displacement with
  perspective (big slow swell + chop detail), specular sun response, fresnel
  toward the horizon, soft atmospheric haze at the horizon line.
- **Palette stays Amagna** — keep the warm gold sky and deep navy/blue-black
  water with gold light response (do NOT copy the reference's daylight-blue
  palette; copy its *realism*). Color law from `docs/brand/brand-colors.md`
  still applies: no purple in the water.
- Keep the existing Canvas 2D scene as the `prefers-reduced-motion` /
  no-WebGL / low-tier fallback — it already works; don't delete it.
- Same perf discipline: DPR caps, visibility pause, adaptive degradation,
  60fps on a mid laptop.
- Verify with real screenshots at desktop + 390px before calling it done.

#### 1B. Contract audit

The build contract is `docs/marketing/PLAN.md` (as amended by 1A). Audit the
current `hero-v2` implementation against it and close every gap:

- 7-beat section rhythm (dark-water ↔ cream, gold-foam horizon seams)
- Reduced-motion fallback (final states, no canvas loop)
- Visibility pause (rAF pauses when hidden/offscreen, `dt` reset on resume)
- DPR caps + adaptive degradation tiers
- Color law: no purple in the water (check `docs/brand/brand-colors.md`)
- Ship physics: eased travel + bob + pitch all from one `waveHeight()`
- The two-island fork landing (Home Services / Real Estate) wired to the
  niche pages
- Promote hero-v2 to the real `/` route when, and only when, it fully passes
  the contract; keep the legacy hero reachable as a fallback route

"Done" = builds clean, contract satisfied, reads well at mobile + desktop
widths. One commit per concern.

### Priority 2 — Audit widget

Make `/audit` a first-class conversion tool consistent with the voyage brand:

- Restyle to brand tokens (cream canvas, purple accents, gold details) so it
  no longer looks like a default form
- Improve UX: clear steps, loading/progress state while the audit generates,
  graceful error state, mobile layout
- Copy pass in the right niche voice (Mike / Sarah from CLAUDE.md ICPs)
- Add a strong post-audit CTA path → `/book` and `/pricing` (link to them;
  do not modify their code)
- Do NOT alter the Anthropic call logic or Supabase insert beyond what you can
  verify with `npm run build` — no live API testing without keys

### Priority 3 — Our Story page

Rebuild `/about` as **Our Story**:

- Retitle and rewrite as a narrative: why Amagna exists, the thesis (AI-native
  productized agency, outcomes not hours), the voyage/ship brand metaphor,
  Saginaw Michigan roots. Source every fact from `README.md` and `CLAUDE.md`.
- Keep the `/about` URL working. If you add an `/our-story` route, redirect
  one to the other — never two competing pages.
- Visual language consistent with the voyage homepage (cream sections, gold
  rules, restrained purple).

### Priority 4 — Meet the Agents + the Founder

Add an introduction for each member of the fleet and for Andrew:

- **The five agents** (from CLAUDE.md): Outreach, Content, Reporting,
  Operations, Sales. For each: name, single responsibility, what it does for
  a client, one-line "human in the loop" trust note. These are brand
  introductions for the website — do not build actual agent services.
- **The Founder — Andrew Michael Gladki (AMG):** founder intro sourced from
  README.md founder context. Build-in-public, operator voice, first-person
  where natural. No invented credentials.
- Structure choice is yours: a section on Our Story, a `/crew` or `/agents`
  page, or both — pick what fits the voyage metaphor best and note the
  reasoning in the report.

### Priority 5 — If time still remains

Quality sweep across everything you touched: conventions (no `any`, named
exports, kebab-case files), accessibility (semantic HTML, alt text, keyboard,
heading order), per-page `metadata` exports with OpenGraph for `/`, `/audit`,
`/about`, `/home-services`, `/real-estate`, `/pricing`. Then keep polishing
niche pages against their ICPs until time is up.

---

## Communication protocol

You cannot reach Andrew while he is away. Therefore:

- Never block waiting for input. Decide, log, continue.
- Maintain `docs/autonomous-run/REPORT.md` AS YOU GO (update it at the end of
  each priority, not only at the end) so the trail survives even if the
  session dies. Include: commits made, decisions taken on Andrew's behalf
  with reasoning, open questions for him, and exact review commands
  (`git log --oneline feat/hero-crew..HEAD`, `npm run dev`, pages to eyeball).

Final commit: `Update autonomous run report`. Then stop.
