# Autonomous Run Report — 2026-06-04

> Maintained live during the unattended session. Andrew reviews this on return.
> Branch: `auto/2026-06-04-website-build` (off `feat/hero-crew`). Nothing pushed.

## How to review

```bash
git log --oneline feat/hero-crew..HEAD      # every commit made this run
cd apps/marketing && npm run build          # confirm green
npm run dev                                  # then eyeball the pages below
```

Pages to eyeball: `/hero-v2` (desktop + 390px mobile), `/` , `/audit`, `/about`.

---

## Status timeline

### Phase 0 — Safety checkpoint ✅
- Confirmed on `feat/hero-crew`; branch `auto/2026-06-04-website-build` already
  existed (prior session, 0 commits ahead — identical to `feat/hero-crew`).
  Switched to it rather than recreate.
- Committed WIP hero-v2 work: `Checkpoint WIP hero-v2 voyage work before
  autonomous run` (437e1ee). Staged only website work — **excluded** the
  forbidden paths (`.agents/`, `Pics for Amagna/`, root `ship-display-hull-gold.svg`,
  `.claude/skills/`, `skills-lock.json`) and the stray
  `docs/autonomous-run/settings.local.json` (a local permissions file).
- `npm run build` passes clean — green baseline confirmed. 23 routes build.

### Priority 1A — Hero realism upgrade (WebGL2 ocean) ✅
Andrew rejected the Canvas-2D painterly seascape as not realistic enough
(reference: bluemarinefoundation.com/the-sea-we-breathe). Replaced the hero water
with a **photoreal, GPU-simulated WebGL2 ocean** — raw hand-written shaders, zero
new dependencies (three.js exception NOT needed).

What was built:
- `hero-ocean-gl-engine.ts` — a full-screen fragment shader that raymarches an
  analytic multi-octave wave heightfield: true perspective swell rolling toward
  the camera, surface normals derived from the same wave function it's drawn from,
  fresnel sky-reflection, warm-gold specular sun-glitter, atmospheric horizon
  haze. Amagna palette only — warm gold sky, deep navy/blue-black water, gold
  light response, **no purple in the water** (brand-colors.md honored).
- `hero-ocean-gl.tsx` — canvas lifecycle: tiered DPR cap, one rAF loop, visibility
  pause with `t` continuity, debounced resize, **adaptive degradation** (drops
  render scale a step when frames run long, self-heals).
- `hero-ocean.tsx` — selector: reduced-motion → Canvas-2D static frame;
  no-WebGL2 / GL init failure → Canvas-2D animated seascape; otherwise GL ocean.
  The existing Canvas-2D engine is **kept intact as the required fallback**.
- `hero-v2.tsx` — swapped to `<HeroOcean>`; re-tuned legibility for the brighter
  GL water (focused scrim halo + copy seated in the lower third over darker water
  + text-shadow) so the cream headline/CTAs stay readable.

Verified with REAL headless-Chrome screenshots (ANGLE Metal, Apple M4 Pro):
desktop 1280px + mobile 390px both render the photoreal ocean with legible copy;
reduced-motion emulation renders the Canvas-2D fallback correctly. `npm run build`
green; `tsc --noEmit` clean.

**Notable bug found & fixed during 1A:** `dispose()` originally called
`WEBGL_lose_context.loseContext()`. Under React StrictMode (dev) React reuses the
same `<canvas>` node across mount→cleanup→remount, and a force-lost context stays
lost on re-acquire → shader compile fails with an empty log → silent fallback to
2D. Removed the `loseContext()` call. This only bit dev (StrictMode double-invoke),
but it would have made Andrew's `npm run dev` preview always show the 2D fallback.

---

### Priority 1B — Contract audit ✅ (audited; promotion intentionally deferred)
Full audit in `docs/autonomous-run/CONTRACT-AUDIT.md`. Key finding: `/hero-v2` is
**Frame 1 only** (photoreal hero + empty Frame-2 scaffold); the full 7-beat
voyage with ship physics and the two-island fork **already ships at `/`** (v1).
Frame-1-scope items all pass (reduced-motion, visibility pause, DPR/adaptive,
color law). The whole-page items (7-beat, ship, islands) live on `/`, not
hero-v2. Per the contract's own gate ("promote only when it *fully* passes"),
hero-v2 does **not** pass, so I did **not** promote it to `/` — that would replace
the working voyage with a bare hero. Recommended next steps are in the audit doc.

### Priority 2 — Audit widget ✅
Made `/audit` a first-class, on-brand conversion tool.
- **Restyle to the voyage brand:** cream canvas, gold eyebrow + rule, Fraunces
  display headline, a gold-numbered 3-step "how it works" strip (Tell us → We
  read the water → 30-day plan), white form card with a gold hairline + soft
  purple shadow. Migrated all legacy color tokens (`royal-purple`, `antique-gold`,
  `ink`, `cream`) to the going-forward `brand-*` family (identical values).
- **Stronger post-audit CTA path:** the result's "next step" now offers BOTH
  *Book a 20-minute call* (`/book`) and *See pricing* (`/pricing`) — linked only,
  their code untouched.
- **Removed a fabricated claim** (guardrail #10 / CLAUDE.md "don't misrepresent
  real people"): the post-result soft-prompt said *"A note from Andrew: I'm in
  Madeira this week…"* — false (Andrew is in Saginaw, MI) and fake urgency.
  Replaced with an honest nudge.
- **Server logic untouched:** no changes to the Anthropic call (`lib/audit`) or
  the Supabase insert (`audit/actions.ts`). UI/UX/copy only.
Verified: `npm run build` green; real screenshots at 1280px + 390px.

### Priority 3 — Our Story page ✅
Rebuilt `/about` as **Our Story** (kept the `/about` URL — no second route, no
redirect needed; just retitled). Narrative arc: *why we exist* (sell outcomes,
not hours) → *the thesis* (AI-native, Sapt + agent fleet) → *the voyage* (the
ship/open-sea brand metaphor + the audit as the "gold map") → *the name* (magna
lineage + A·M·G) → *the founder* (Andrew, Saginaw MI, Breaking the Fast). Every
fact sourced from `README.md` / `CLAUDE.md` — no invented credentials. Voyage
visual language: cream/white alternating sections, gold eyebrows + rules,
Fraunces display headings, restrained brand-purple, reused `CtaBand`.
Verified: `npm run build` green; desktop screenshot.

### Priority 4 — Meet the Agents + Founder ✅
Built a new **`/crew`** page (decision below). The five agents are presented as
**the ship's crew** with nautical titles, the founder as **the captain** — the
structure that best fits the voyage metaphor.
- **The crew** (from CLAUDE.md/README): The Scout (Outreach), The Storyteller
  (Content), The Navigator (Reporting), The Quartermaster (Operations), The First
  Mate (Sales). Each: one-line single responsibility, what it does for a client,
  and a gold-dotted **"Human in the loop"** trust note. Laid out as an editorial
  "manifest" list, NOT a generic three-emoji card grid.
- **The captain — Andrew Michael Gladki:** first-person, build-in-public operator
  voice; Saginaw MI + Breaking the Fast, sourced from README. No invented
  credentials, no fabricated metrics.
- Discoverability without touching the (off-limits) header nav: added a "Meet the
  crew →" link from the Our Story thesis section, and added `/crew` to `sitemap.ts`.
Verified: `npm run build` green; desktop + mobile screenshots.

**Decision — structure:** chose a dedicated `/crew` page over folding the crew
into Our Story. The voyage metaphor makes "the crew" a natural standalone place
(captain + crew = the ship), it keeps Our Story focused on the narrative, and it
gives the agents room to each get a real introduction. Cross-linked from About so
it's reachable.

### Priority 5 — Quality sweep ✅ (metadata/OpenGraph + conventions)
- **Per-page metadata + OpenGraph** for `/`, `/audit`, `/about`, `/home-services`,
  `/real-estate`, `/pricing` (and `/crew`). The homepage had **no** metadata
  export — added one. Each page now emits a page-specific `og:title`/`description`.
- **Fixed an OG regression I introduced:** a page-level `openGraph` override drops
  the social image that the `opengraph-image` file convention auto-wires into the
  root layout. Added a shared `OG_IMAGE` (`lib/site.ts`) and re-attached it on
  every page — verified in the prerendered HTML that `og:title` (page-specific)
  **and** `og:image` now coexist on all pages.
- **Conventions:** no `any` in any file I touched; named exports for components
  (page default-exports are required by Next); all files kebab-case.
- **Accessibility:** new pages use semantic landmarks (`main`/`section`), one
  `<h1>` + ordered `<h2>`s, an `sr-only` section heading on `/crew`, decorative
  canvas is `aria-hidden`. `tsc --noEmit` clean; `npm run build` green.

---

## Commits made this run

| Commit | Concern |
|---|---|
| 437e1ee | Checkpoint WIP hero-v2 voyage work before autonomous run |
| 1c1a5a6 | Replace hero-v2 ocean with photoreal WebGL2 renderer |
| 0aac111 | Document hero-v2 contract audit (Priority 1B) |
| 4672846 | Restyle /audit to voyage brand; add pricing CTA; remove fabricated line |
| 21b72ce | Rebuild /about as Our Story (voyage narrative + visual language) |
| 4c960e4 | Add /crew (Meet the Crew) page — five agents + the founder |
| 0c75dee | Add per-page OpenGraph metadata across key routes |
| _final_ | Update autonomous run report |

---

## Decisions made for Andrew

1. **Branch reuse.** `auto/2026-06-04-website-build` already existed and was
   identical to `feat/hero-crew`, so I continued on it instead of erroring out.
2. **Raw WebGL2, not three.js.** The plan pre-approved three.js as a single-dep
   exception if raw shaders proved infeasible. They did not — the raymarched
   ocean works well in hand-written GLSL, so **no new dependency was added.**
3. **Copy moved to the lower third.** The realistic ocean's bright gold horizon
   sits where a vertically-centered headline used to be and washed it out. I
   seated the copy lower (over darker water) rather than darken the whole hero,
   which would have hidden the very realism Andrew asked for. Easy to retune —
   it's a single `translate-y` + scrim-center value in `hero-v2.tsx`.
4. **Render tiers.** Desktop renders the ocean at DPR-cap 1.0, mobile 0.75, with
   adaptive degradation down to 0.4 scale. Water hides the sub-native resolution;
   this is the master perf knob. Tune in `hero-ocean-gl.tsx` if Andrew wants it
   sharper on high-end machines.
5. **`/crew` over folding into Our Story** — see the Priority 4 note above.
6. **Did NOT relabel the header nav.** `/about` is now titled "Our Story" but the
   header/footer nav (`NAV_LINKS` in `lib/site.ts`) still says "About" and has no
   "Crew" entry. The nav is shared chrome I treated as off-limits this run.
   Trivial to change when you want — flagging rather than guessing.
7. **Screenshot verification used your local Chrome** (headless, ANGLE Metal) via
   the DevTools protocol — no new dependency installed. Found a real
   StrictMode/`loseContext` bug doing this (see Priority 1A).

---

## Open questions for Andrew

1. Hero water **mood** is currently a calm-to-moderate dusk swell. The shader
   exposes `seaHeight / choppy / speed / frequency` knobs (DEFAULT_GL_KNOBS) if
   you want it calmer or stormier.
2. The copy now sits lower-centre. If you prefer it higher, we lower the horizon
   in the shader instead (more sky) — say the word.
3. **Hero promotion:** `/hero-v2` is still a preview route — the realism upgrade
   is NOT on the live `/` homepage yet (see `CONTRACT-AUDIT.md` for why and the
   two recommended paths to get it there).
4. Want the header nav relabeled "About → Our Story" and a "Crew" link added?

---

## Circuit-breaker / blocker log

_(none — 0 consecutive failures; circuit breaker never tripped)_

---

## Session summary

All five priorities in the ladder were completed and committed; the build is
green at every commit and at the end. Nothing was pushed; nothing on `main` or
`staging` was touched; the money path (Stripe/checkout/book) was not modified; no
new dependencies were added; no `.env*` was read or written.

**Headline result:** the `/hero-v2` ocean is now a photoreal GPU-simulated WebGL2
sea in the Amagna palette — the realism Andrew asked for — with a working
Canvas-2D fallback and verified legibility at desktop + mobile.

**Biggest judgement call:** not promoting `/hero-v2` to `/`. It's Frame 1 only;
the full 7-beat voyage already lives on `/`. Promoting now would downgrade the
live homepage. The realism is built, verified, and committed and is ready to be
brought to `/` in a session with Andrew available (`CONTRACT-AUDIT.md`).

### Review commands

```bash
git log --oneline feat/hero-crew..HEAD          # the 7 commits of this run
cd apps/marketing && npm run build              # confirm green
npm run dev                                      # then eyeball:
#   /hero-v2   the photoreal ocean (desktop + 390px); scroll = empty Frame-2 scaffold (by design)
#   /audit     restyled conversion tool; submit to see the result + dual CTA
#   /about     Our Story narrative
#   /crew      Meet the Crew + the captain
#   /          unchanged live voyage homepage (realism not promoted here yet)
```

Run ended cleanly. — Claude
