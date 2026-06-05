# Autonomous Run 2 Report — 2026-06-04

> Maintained live. Branch `auto/2026-06-04-website-build` (off `feat/hero-crew`).
> Nothing pushed. Run 2 = hero afterglow + nav redesign + Frame 2.

## How to review
```bash
git log --oneline 38cfa7e..HEAD          # run-2 commits (after the run-1 report)
cd apps/marketing && npm run build       # confirm green
npm run dev                              # eyeball /hero-v2 (desktop + 390px),
                                         # the nav, /who-we-serve, /crew
```

---

## Status timeline

### Phase 0 — Checkpoint ✅
Committed the restored `ship-display-hull-gold.svg` + `PLAN-2.md` (excluding all
forbidden paths). Green baseline.

### Priority 1 — Hero afterglow + bigger/bolder copy ✅
Andrew's review: sun out of frame, afterglow sky with approved **purple in the
SKY only**, bigger + bolder copy.
- **Afterglow sky (GL shader):** removed the sun disk + god rays (sun has set).
  New gradient — dark warm orange at the waterline → bright orange → pink →
  bright purple → dusk blue at the zenith. The gradient is **compressed into the
  visible sky band** (the raised horizon means the top of frame only reaches
  h≈0.16, so all four bands had to live below that or they'd never show).
- **Water untouched** (geometry/sim). Colour response only: the sea samples just
  the **warm low slice** of the afterglow (reflected-ray height capped at 0.035)
  so it stays deep navy with orange/pink horizon glints and **no purple**. The
  hard sun-glitter highway softened to a gentle shimmer.
- **Copy bigger + bolder:** both H1 lines scaled up (MS still > Autonomous, clamp
  mins tuned to fit one line down to 320px); subtitle larger + `font-semibold` +
  full-cream + stronger shadow (one line ≥768px); CTAs enlarged + bolder link via
  `VoyageCtas size='lg'`. "Marketing Systems" still at dead centre (measured 50.0%).
- **2D fallback repainted** to the same afterglow (sky gradient + pink band, no
  rays, horizon raised to 0.24, warm crests) so reduced-motion / no-WebGL
  visitors see the same brand moment.
- Verified with real screenshots at 1280 / 390 / 320 and reduced-motion.

### Mid-run correction (Andrew) — crew roster
The run-1 crew names were wrong. **Canon roster** (applied in Priority 3 + a
`/crew` rewrite): **Zeno** (Captain / The Brain — orchestrator), **Exodus**
(Data Specialist), **Solon** (Outreach / Retention), **Hero** (Automation),
**Thales** (Marketing — Meta/TikTok/Google). Real portraits exist at
`public/brand/crew/<slug>.webp` (zeno/exodus/hero/thales 16:9, solon portrait) —
used directly, no placeholders, `object-cover` center; Zeno gets a captain's
distinction. Andrew (founder) stays on `/crew` as the human at the helm, distinct
from Zeno who captains the AI fleet.

---

## Commits made this run

| Commit | Concern |
|---|---|
| 8c984a4 | Checkpoint: restore ship SVG + add run-2 plan |
| 4612cee | Hero afterglow sky (sun set) — orange/pink/purple, water stays navy |
| d1be3af | Hero copy: bigger H1, bigger + bolder subtitle and CTAs |
| _pending_ | Repaint Canvas-2D fallback to the afterglow |

---

## Decisions made for Andrew
1. **Afterglow gradient compressed** into the visible sky band (raised horizon
   leaves little sky), so orange→pink→purple→blue all read. Tunable in
   `getSkyColor`.
2. **Purple kept out of the water** by capping the reflected-ray height (0.035)
   so the sea only mirrors the warm low afterglow — honours the color law while
   the sky shows purple.

## Open questions for Andrew
_(none yet)_

## Circuit-breaker / blocker log
_(none — 0 consecutive failures)_
