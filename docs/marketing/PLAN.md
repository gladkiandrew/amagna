# PLAN.md — Amagna Homepage "Voyage" Rebuild

> **Status:** Planning complete. This is the build contract for `feat/homepage-voyage`.
> **Author:** Claude (synthesized from 3 parallel reasoning streams + ui-ux-pro-max design intelligence).
> **Gate rule honored:** no page code is written until this plan exists. Andrew reviews the *Open Decisions* at the bottom; everything else proceeds on best-faith defaults.

A single-scroll homepage where Amagna's **dragon-ship sails down a living canvas ocean** and arrives at a **two-island fork** (Home Services / Real Estate). Premium, institutional, hand-crafted — never techy-startup.

---

## North-star constraints (non-negotiable)

- **Zero new runtime dependencies.** All motion = raw Canvas 2D + `requestAnimationFrame` + `IntersectionObserver` + `ResizeObserver` + CSS transforms. No three.js/WebGL, no GSAP, no Framer Motion. (Only addition: the **Fraunces** font via `next/font/google` — font loading, not a package.)
- **Color law (locked, from brand-guidelines.md):** realistic water = blue-black + antique-gold glints, **NO purple in the water**. Purple = accent on "land" (words, buttons). Cream = content canvas. Deep `#1A0E36` = night/horizon only.
- **60fps** on a mid laptop; graceful degrade on mobile + `prefers-reduced-motion`.
- **Don't touch** existing booking, Stripe, audit-widget code. **Preserve** the legacy hero intact, just relocate it.
- **Reuse brand tokens** — no new color systems.

---

## A. Performance architecture — *chosen*

**One fixed full-bleed canvas + one rAF loop + one state object.**

- A single `<canvas position:fixed; inset:0; z-index:0; pointer-events:none>` sits behind all DOM. The "world" is virtual; we draw a *camera window* into it driven by scroll progress. (Rejected: per-section canvases — they create visible seams and force the ship to be "handed off" across boundaries, fighting the "one continuous voyage" premise.)
- **Inputs are write-only; the loop is the sole screen-writer.** `scroll`/`pointer`/`resize` passive listeners write raw values to a plain state object and do nothing else (no layout reads → no reflow). The rAF loop consumes the *latest* value once per frame (natural coalescing, no throttle fn needed). All layout measurement happens once on load + on a debounced `ResizeObserver`.
- **DPR capped by tier:** high=2, mid=1.5, low/mobile=1. Water is full-screen fill-rate-bound; `renderScale` is the master perf knob. Sub-native DPR is invisible on moving water.
- **Pre-render static art to offscreen buffers** (sky gradient, ship hull sprite, island silhouettes, glint texture) and `drawImage` each frame — far cheaper than re-stroking paths.
- **Pause everything** on `document.visibilitychange === hidden` and when the canvas leaves the viewport (IntersectionObserver). Reset `dt` on resume so physics don't lurch.
- **Adaptive degradation:** rolling avg frame time > ~20ms for N frames → drop a tier (lower renderScale, fewer glints). Self-heals on unknown hardware.

**Main thread, not Worker/OffscreenCanvas:** the scene is scroll/pointer-coupled, and those inputs only exist on the main thread; posting them to a worker every frame adds latency that reads as the ship "rubber-banding." Worker offscreen is for self-contained animations, not input-coupled cameras.

**Frame budget (16.6ms; target ≤10ms work):** state update ~0.2 · base blit ~0.5 · far parallax ~0.5 · **water surface ~4–6 (the hot path)** · gold glints ~1–1.5 · ship sprite+foam ~0.5 · near fog/vignette ~0.5 → **~8–10ms**, leaving headroom for browser composite/GC.

## C. Motion / library choice — *chosen*

Exactly **two** mechanisms, no third, no library:

| Motion | Technique | Why |
|---|---|---|
| Scroll reveals (text/cards fade-up) | **IntersectionObserver + CSS transition** on `transform`/`opacity` | Zero per-frame JS, compositor-only, accessible. Reduced-motion → final state, no transition. |
| Scroll-linked ship scrub | **rAF + cached scroll** (the one loop) | Continuous coupling `position=f(progress)`; must also ease + sync to wave phase — can't be expressed by IO. |
| Canvas water | **rAF + Canvas 2D** | Live simulation; no alternative. |

Rejected `animation-timeline: scroll()` as primary — no stable Safari support at build time and it can't drive the canvas.

## D. The ship (character travel) — *chosen*

**Ship lives IN the canvas** as a cached sprite (pre-rendered once from `ship-display-hull-gold.svg`, `drawImage`'d each frame). Only option where the ship shares the ocean's light, lets crests occlude the stern, and water laps the hull. (Rejected DOM/SVG-over-canvas: reads as a "sticker on video.")

Its screen transform composes three coupled signals, all from the same per-frame state snapshot:
1. **Forward travel** = *eased* scroll progress `p∈[0,1]` (`p += (pTarget−p)(1−e^(−dt/τ))`, τ≈0.12s). Easing (not raw scroll) gives premium inertia — the ship drifts a beat after you stop scrolling. The *camera* pans with `p` so the ship stays ~centered while the world slides past.
2. **Buoyant bob** = live wave function `waveHeight(x,t)=Σ Aᵢ·sin(kᵢx+ωᵢt+φᵢ)` (2–3 components: swell + chop + ripple). Scroll-independent, so it bobs even when idle → the ocean feels *alive*.
3. **Pitch** = `atan(analytic slope)·gain`, eased for weight. Because bob + pitch come from the **same** `waveHeight()` the water is drawn from, the ship provably sits *on* the rendered surface.

## B. Section architecture & rhythm — *chosen*

Lean **7-beat** voyage, alternating dark-water ↔ cream, the ship threading each **gold-foam horizon seam** (a thin antique-gold rule + soft glow where water meets a cream "shore"). Length comes from *contrast + motion*, not word count — each cream panel = one headline + 2–3 short lines; each dark band even sparser.

| # | Section | Bg | Purpose / candidate headline (operator voice) |
|---|---|---|---|
| 1 | **Voyage Hero / Cast Off** | Dark water | Promise. *"More calls. More closings. Owned, not rented."* + Free-audit / Book CTAs. |
| 2 | **The Honest Turn** | Cream | Positioning. *"We don't sell you innovative tech. We fix your problem."* |
| 3 | **The Storm** | Dark water | Name the pain. *"Feast or famine is not a strategy."* |
| 4 | **The Method** | Cream | Mechanism, plainly: **Attract · Capture · Keep**. *"A system that runs whether you're on a roof or at a closing."* |
| 5 | **Landfall Fork** | Dark→islands | **CLIMAX** — two niches (see E). *"Two coasts. Pick the one that's yours."* |
| 6 | **Legacy Hero** (preserved `HeroFlow`) | Cream | Relocated intact, commented "pending final placement." |
| 7 | **The Dock / CTA** | Cream (harbor) | Close. *"Drop anchor. Let's get your pipeline full."* + Free-audit / Book CTAs. |

> **No fabricated proof.** The reasoning stream proposed an optional "Proof Strait" with stats — **omitted** per CLAUDE.md (no invented results/testimonials). A non-numeric trust line may live inside §4/§7. Add a real Proof band the day a real case study exists; the architecture supports dropping it in without redesign.

**Horizon hand-off mechanics:** cream sections are opaque parchment panels that scroll *over* the one sticky ocean canvas. Each dark↔cream boundary is a coastline seam (SVG-masked edge + 1–2px gilt rule + soft glow = "light on water hitting the shore"). The ship rides the seam for a beat, then descends to open water. No section owns its own ocean — continuity is the whole illusion.

## E. The landfall fork — *chosen*

**"The Channel Splits" + rise-on-scroll reveal.** As the section enters, two coastlines **rise out of the dark water** (emotional arrival), then form a **Y-channel** with the ship at the fork, a soft gold split-wake trailing to both shores. The central strait stays water (deep + gold, no purple) and is the *only* place the niches touch — the sea is the wall between them.

- **Islands are real DOM `<a>` links** layered over the canvas backdrop (keyboard/SR accessible; canvas hit-regions are not). Each = a full half-panel *place*, not a card: own eyebrow, headline, one-line promise, CTA, and niche motif worked into the land.
- **Hover/focus:** chosen island lifts + gold rim-light intensifies + soft purple glow behind *its* CTA; opposite island desaturates/recedes; ship prow turns a few degrees toward it; wake brightens that side only. `:focus-visible` plays the same.
- **Mobile:** Y-channel rotates vertical — scroll into the strait, top island then bottom, ship descending between; tap to sail. No hover.
- **Never mix:** distinct land warmth/texture per niche (Home Services = rugged, earthier, heavier gold trim; Real Estate = refined, cooler, finer trim), mirror-not-duplicate, hover enforces either/or, purple only on each island's own CTA.

**Island copy (candidate):**
- **Home Services** → /home-services · eyebrow "For home-services operators" · **"Own your leads. End feast or famine."** · "Steady, predictable calls from real local customers — booked and qualified before they reach you." · CTA **"Chart this course →"**
- **Real Estate** → /real-estate · eyebrow "For real-estate agents & teams" · **"More listings. A sphere that never goes cold."** · "Stay top of mind with every past client — automatically — so when they're ready to sell, you're the only name they call." · CTA **"Chart this course →"**

## F. Accessibility & mobile fallback — *chosen*

- **`prefers-reduced-motion`:** rAF loop never starts; paint **one static frame** (`t=0`, no pointer) of the same composition — preserves the art, removes vestibular risk, reuses one renderer. Also gate the existing `.pulse-*`/`.amagna-glow` SVG animations in `globals.css` with `@media (prefers-reduced-motion: reduce){animation:none}`.
- **Mobile** (`pointer:coarse` OR `<768px`): pointer reactivity OFF, DPR cap 1.5, wave layers 5→2, glints halved + slow twinkle, ship = simple bobbing silhouette, sections stack single-column, island CTAs stack full-width ≥44px tap targets / ≥8px gaps. FPS floor: 1s avg < 45fps → auto-drop to static frame.
- **Semantics:** `<canvas aria-hidden role="presentation">` — decorative, carries zero info. All meaning is real DOM text over it (**"delete the canvas" test:** remove the node, page still reads complete). One `<h1>`, sequential headings, landmarks (`header`/`main`/`section[aria-labelledby]`/`footer`), fork is `<nav aria-label="Choose your path">`, skip-link first.
- **Focus:** `:focus-visible` ring 2px + 2px offset — **purple `#5D2E8C` on cream, warm-gold `#D4B873` on dark** (purple-on-dark fails contrast). Never `outline:none` without replacement.
- **Contrast (verified):** purple-on-cream ~7.5:1 ✓, charcoal-on-cream ~16:1 ✓, slate-on-cream ~8:1 ✓ (≥14px), warm-gold-on-deep ~7:1 ✓. **Antique-gold `#C9A961` on cream ≈1.7:1 — FORBIDDEN for text** (decorative/glint/hairline only; this also enforces gold scarcity). Gold text on dark uses warm-gold, not antique.
- **`prefers-color-scheme`:** do **not** auto-flip this page to dark mode — the cream canvas *is* the brand and the art already contains its own dark (water) + light (panels). Set `color-scheme`/`theme-color` so chrome doesn't flash.

## G. Anti-generic strategy — *chosen*

Concrete tells avoided: default 16/24/32 type scale, flat 1.5 leading, uniform `py-16`/`gap-8`, linear `ease`, purple-gradient-on-everything, gold everywhere, three-centered-cards-with-emoji, dead-flat plastic fills, marketing-speak, relentless symmetry, system-blue links.

Countermoves baked into the build:
- **Modular type scale** (1.25): hero display `clamp(2.75rem, 6vw+1rem, 6rem)` in Fraunces, tracking `-0.02em`, `text-wrap:balance`, leading 1.05–1.1 on display / 1.6–1.7 body, measure capped 60–72ch.
- **One vertical-rhythm unit** (8px); section spacers 96/128/160, not uniform. **≥2 deliberate asymmetries** (offset ship, off-axis text block, headline hanging into margin).
- **Custom cubic-bezier easings** (signature reveal `cubic-bezier(0.16,1,0.3,1)`; inertial ship ease). Zero `transition:all`.
- **Gold scarcity** (≤~3 gold elements/viewport), **no purple gradients** (purple = flat ink), **film-grain overlay** ~3–5% on cream + ocean, real brand-voice microcopy (no "unlock/supercharge/seamless"), brand-color links/focus.

**ANTI-AI PRE-DELIVERY CHECKLIST** (run before "done" — all must pass):
- [ ] No emoji anywhere · [ ] No `grid-cols-3` identical centered cards · [ ] Hero display ≥72px Fraunces, tracked/`opsz` · [ ] Type from modular scale (no raw default sizes doing headline duty) · [ ] Documented rhythm unit + intentional spacers · [ ] ≥2 deliberate asymmetries · [ ] Custom cubic-beziers only · [ ] Gold scarcity + zero gold-text-on-cream · [ ] No purple gradients · [ ] Grain overlay present · [ ] Microcopy read-aloud passes brand voice · [ ] Measure capped, leading tuned · [ ] Brand-color links/focus, no system blue · [ ] Squint/2-sec "is this AI?" test passes · [ ] "Delete the canvas" test passes.

---

## Typography — chosen for the build (Andrew confirms)

**Fraunces (display serif, headlines) + Geist Sans (body, already in repo).** Most anti-generic of the candidates; adds no body-font dependency. Loaded via `next/font/google` as `--font-fraunces`. Alternatives if Andrew prefers (already in brand-guidelines.md): Cormorant Garamond + Inter (more delicate/regal), or Playfair Display + Inter (the DB's "Classic Elegant" — safe but highest templated risk). One-line swap in `layout.tsx`.

## Component tree

```
src/app/(home)/page.tsx              ← new voyage homepage (route "/"); old src/app/page.tsx removed
src/components/home/
  voyage-shell.tsx        'use client' — mounts the fixed OceanCanvas + coordinates scroll progress
  ocean/
    ocean-canvas.tsx      'use client' — the <canvas>, loop lifecycle, tier/reduced-motion/visibility wiring
    ocean-engine.ts       pure renderer: waves, glints, ship sprite, islands, camera (no React)
    ship-sprite.ts        pre-render ship-display-hull-gold.svg → offscreen bitmap
    use-scroll-progress.ts  rAF-throttled scroll → [0..1] + section anchors
    use-reduced-motion.ts
    use-in-view.ts        IntersectionObserver reveal hook (returns ref + inView)
  voyage-hero.tsx         §1 dark water
  honest-turn.tsx         §2 cream
  the-storm.tsx           §3 dark water
  the-method.tsx          §4 cream (Attract/Capture/Keep)
  landfall-fork.tsx       §5 climax  ──┐
  landfall-island.tsx     island half  ┘ (niche-identity props)
  legacy-hero-section.tsx §6 wraps preserved <HeroFlow/> unchanged
  dock-cta.tsx            §7 cream harbor
  grain-overlay.tsx       shared film-grain layer
  section-shell.tsx       shared reveal + horizon-seam wrapper
```
Hooks/engine under `components/home/ocean/`. No runnable source under `/public`.

## Build order

1. **Fraunces + typography tokens** (`layout.tsx`, `tailwind.config.ts` font families, `globals.css` rhythm/easing vars, grain).
2. **Ocean hooks** (reduced-motion, scroll-progress, in-view).
3. **Ocean engine + canvas** (waves → glints → ship sprite → camera → tiering → reduced-motion static frame).
4. **Content sections** (hero, honest-turn, storm, method) with reveals + seams + grain.
5. **Landfall fork + islands.**
6. **Dock CTA + legacy-hero wrapper.**
7. **Assemble `(home)/page.tsx`**, remove old `page.tsx`.
8. **`npm run build` green → anti-AI checklist → reduced-motion/mobile check → commit (no merge).**

## Performance budget

- ≤10ms scripting/frame (table above); water is the tunable via `renderScale`.
- No layout reads in event handlers; transform/opacity-only DOM animation.
- Canvas paused offscreen/hidden; loop never runs under reduced-motion.
- No new JS dependencies → no bundle-size regression; Fraunces self-hosted via `next/font` (no render-blocking external request, `display:swap`).

## Open decisions / risks for Andrew

1. **Font:** building on **Fraunces + Geist**. Confirm or pick Cormorant/Playfair (one-line swap).
2. **Proof/social proof:** intentionally **omitted** (no real numbers yet, per CLAUDE.md). When you have one real result or client line, we add a "Proof Strait" band. Want a non-numeric trust line in the meantime (e.g. "Built and run for operators, not dashboards")?
3. **Legacy hero placement:** parked at **§6, just above the Dock**, per instructions. Its CTAs slightly echo the Dock's — fine as "pending final placement"; long-term it likely migrates into the Home-Services funnel. Confirm.
4. **Header over dark hero:** the existing sticky **cream** header sits over the dark voyage hero (header is off-limits this task). Reads as a light bar over a dark ocean — acceptable/premium, but flagging in case you want a transparent-over-hero header later.
5. **All section/island copy is candidate microcopy** written in best-faith brand voice (you said "for any of the copy, you got it") — edit freely; it's centralized for easy change.
6. **Ship sprite source:** rasterized from `ship-display-hull-gold.svg`. If you later want a side-profile "sailing" pose distinct from the display pose, that's a new asset — flagging, not blocking.
