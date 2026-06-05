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

### Priority 2 — Navigation redesign ✅
- Header home link = the logo-mark icon + the Amagna AI wordmark → `/`.
- Nav: **Who We Serve · Our Story · Pricing · Gold Map · Book a Call** (button).
  Removed Home services / Real estate / Custom.
- Routing: Who We Serve → new **`/who-we-serve`** (hero + two niche panels linking
  to the still-live `/home-services` + `/real-estate` ad-landing funnels); Our
  Story → `/about`; Gold Map → `/audit`; Book a Call → `/book`.
- `NAV_LINKS` drives header + footer + mobile menu (verified the mobile menu lists
  all five); sitemap adds `/who-we-serve`; focus-visible rings on nav links.

### Priority 3 — Frame 2 of the voyage ✅
- **Ship enters on scroll:** the gold dragon-ship sails in with eased travel +
  sine bob + pitch, one IO/visibility-gated rAF loop; reduced-motion → static
  pose. **Decision:** used `ship-display-hull-gold.svg` (11 KB vector) over the
  6–7 MB crew PNGs — far lighter, scales crisply, and is the plan's named asset.
- **Five crew columns** from the canon roster with **real portraits**
  (`public/brand/crew/<slug>.webp`, object-cover center), names, titles, blurbs,
  and `/crew#<slug>` links. Zeno (captain) gets a brighter double ring + a
  "Captain" badge. Staggered IO + CSS reveals; reduced-motion → final states;
  closes into the footer with no dead band.
- **`/crew` rewritten** to the same canon roster (shared `lib/crew.ts`) with
  anchor ids; Andrew kept as the human at the helm, distinct from Zeno.
- Verified at desktop + 390px + reduced-motion.

### Priority 4 — Promotion gate check ✅ (NOT promoted — gate not met)
Re-ran the `CONTRACT-AUDIT.md` checklist against the upgraded `/hero-v2`
(hero + Frame 2). **`/hero-v2` is now "afterglow hero + crew reveal" — it does
NOT satisfy the contract's 7-beat voyage gate**, so per the plan ("promoting a
worse homepage is the only wrong answer") I did **not** promote it.

| Gate item | /hero-v2 |
|---|---|
| Reduced-motion fallback | ✅ |
| Visibility pause + DPR caps + adaptive | ✅ (GL canvas + ship loop) |
| Color law (no purple in water) | ✅ (purple sky approved; water reflection capped) |
| Ship physics (travel+bob+pitch) | ✅ (Frame 2) |
| **7-beat rhythm** (Honest Turn · Storm · Method · …) | ❌ missing |
| **Two-island landfall fork** → niche pages | ❌ missing |
| **Dock CTA close** | ❌ (closes into footer instead) |

The full 7-beat voyage **with the landfall fork still lives at `/`** (the v1).
Promoting `/hero-v2` now would replace it with a hero+crew page and lose the
Storm / Method / Fork / Dock — a downgrade. **Recommended path** (needs Andrew):
port the afterglow GL hero into the existing `/` voyage as its hero (the `/` ocean
is one scroll-coupled, ship-bearing fixed canvas; the GL afterglow is a
hero-viewport raymarcher — a real integration, not a drop-in), and graft Frame 2's
crew section in ahead of the Dock. Then `/hero-v2` retires.

---

## Commits made this run

| Commit | Concern |
|---|---|
| 8c984a4 | Checkpoint: restore ship SVG + add run-2 plan |
| 4612cee | Hero afterglow sky (sun set) — orange/pink/purple, water stays navy |
| d1be3af | Hero copy: bigger H1, bigger + bolder subtitle and CTAs |
| 852bdc1 | Repaint Canvas-2D fallback to the afterglow |
| 4dd655f | Redesign nav + add /who-we-serve |
| 52e1dd6 | Build Frame 2 + rewrite /crew to the canon roster |
| _final_ | Update autonomous run 2 report |

### Priority 5 — Quality sweep ✅
`/who-we-serve` ships with per-page metadata + OpenGraph. No `any` in any new
file; named exports; kebab-case; one `<h1>` per page with ordered `<h2>`s;
portrait `alt` text = "Name, Title"; decorative ship/logo are `aria-hidden`;
focus-visible rings on the nav, the niche panels, and the Frame 2 crew links.
`tsc --noEmit` clean; `npm run build` green (24 routes).

---

## Decisions made for Andrew
1. **Afterglow gradient compressed** into the visible sky band (raised horizon
   leaves little sky), so orange→pink→purple→blue all read. Tunable in
   `getSkyColor`.
2. **Purple kept out of the water** by capping the reflected-ray height (0.035)
   so the sea only mirrors the warm low afterglow — honours the color law while
   the sky shows the approved purple.
3. **Crew roster correction applied** (your mid-run note): canon roster
   Zeno/Exodus/Solon/Hero/Thales with the real portraits, both in Frame 2 and a
   `/crew` rewrite. Single source of truth = `lib/crew.ts`.
4. **Ship asset = the SVG**, not the crew PNGs — 11 KB vector vs 6–7 MB PNGs,
   scales crisply, and is the plan's named asset. The PNGs in `Pics for Amagna/`
   stay uncommitted (forbidden path) and unused; say the word if you'd rather the
   ship be the crew render and I'll add an optimized webp of it to `public/`.
5. **Did not promote `/hero-v2` to `/`** — it's an afterglow hero + crew reveal,
   not the contract's 7-beat voyage (no Storm/Method/Fork/Dock). Promoting would
   downgrade the live homepage. Full reasoning + the recommended integration path
   are in the Priority 4 table above.

## Open questions for Andrew
1. Hero water **mood / afterglow intensity** — purple band height, how warm the
   horizon glows, shimmer strength are all dial-able in the shader.
2. **Frame 2 ship**: SVG dragon-ship now. Want the crew render instead?
3. **Homepage promotion**: ready when you are to do the `/`-integration above
   (porting the afterglow hero onto the full voyage) — best done with you around.

## Circuit-breaker / blocker log
_(none — 0 consecutive failures; circuit breaker never tripped)_

---

## Session summary
All five run-2 priorities completed and committed on
`auto/2026-06-04-website-build`; build green at every commit and at the end.
Nothing pushed; `main`/`staging` untouched; money path frozen; zero new
dependencies; no `.env*` read/written; no forbidden paths committed.

**Headline results:** the `/hero-v2` ocean is now a post-sunset **afterglow**
(sun set, orange→pink→bright-purple sky; navy water reflecting only the warm
low band) with bigger/bolder copy and a matching 2D fallback; the **nav** is
redesigned (logo + Who We Serve · Our Story · Pricing · Gold Map · Book a Call)
with a new `/who-we-serve`; and **Frame 2** now exists — the gold ship sails in
and the five-agent crew is introduced with their real portraits, captained by
Zeno, linking through to a `/crew` rewritten to the canon roster.

### Review commands
```bash
git log --oneline 38cfa7e..HEAD            # run-2 commits
cd apps/marketing && npm run build         # confirm green
npm run dev                                # then eyeball:
#   /hero-v2     afterglow hero (desktop + 390px); scroll → ship + crew (Frame 2)
#   any page     new nav + mobile menu
#   /who-we-serve  two-coasts landing
#   /crew        canon roster (Zeno/Exodus/Solon/Hero/Thales) + #anchors
#   /            unchanged live voyage (afterglow hero not promoted here — see P4)
```
Run ended cleanly. — Claude

---

## Round 2 — Final feedback (interactive, same night)

Andrew reviewed the afterglow hero + Frame 2 and sent a final feedback round.
All build-green, committed per concern.

### Hero fixes ✅
- **H1 centering:** the copy block centred in the scrollbar-excluded content box,
  leaving it ~7.5px left of true centre on classic-scrollbar setups. Re-anchored
  the copy to the TRUE viewport centre (`left: 50vw` + translate), clipped by the
  section's `overflow-hidden`. Both H1 lines now measure exactly centred
  (640.0/640.0 at 1280, 720.0 at 1440). Two-line structure + size ratio kept.
- **Subtitle:** reverted to normal weight (from the bold change) while keeping the
  larger size, title case, and one-line-at-desktop.
- **Realistic afterglow:** rebalanced the sky to be dominated by warm **orange +
  golden yellow** at/above the horizon, fading up through just a little dusky pink
  to a deep dusk blue, with only a minimal purple cast. Warm-gold bloom; clouds
  de-purpled. Water reflection follows (samples the warm low band), stays navy.
  2D fallback repainted to match. Water geometry untouched.

### Frame 2 rework ✅ (replaces the static version)
Built the full choreographed sequence with the **real production ship renders**
(`ship-crew-full.webp` / `ship-empty-transparent.webp`, facing left):
- **Seamless water:** the hero's dark water continues into Frame 2 as a near-black
  navy canvas keeping a LIVE wave animation (the only animated bg) + the ship's
  white-foam **V wake**. No hard seam.
- **Time-based sequence** (triggered once on scroll-in): crew ship cruises in from
  the right heading left → stops centre → the five crew are **dealt out one by
  one**, each dropping into its card below → ship **swaps to the empty version**
  and **sails off left**, wake trailing, leaving the cards.
- **reduced-motion** → final state (cards visible, static water, no ship).
- Deleted the "The crew aboard" eyebrow; moved the "Five specialized agents…"
  line **below** the cards. Removed the now-unused `voyage-ship.tsx`.
- One IO/visibility-gated rAF loop drives water + wake + ship; cards are
  CSS-transitioned, revealed at timeline milestones. Verified the full sequence
  in a real browser at desktop + 390px + reduced-motion.

### Round-2 commits
| Commit | Concern |
|---|---|
| c14ffb3 | Hero: realistic afterglow (orange/yellow dominant) + 2D fallback |
| 0fe46cf | Hero copy: centre H1 precisely + revert subtitle weight |
| 26f0b53 | Rework Frame 2: ship cruise-in, crew deal, sail-off |
| _final_ | Update autonomous run 2 report (round 2) |

### Round-2 decisions / notes
1. **Ship asset switched** from the SVG to the real webp renders per Andrew's
   spec. `ship-display-hull-gold.svg` is now unused (left in the repo, harmless;
   reusable).
2. **Wake** is a particle V-foam trail aligned to the ship's measured waterline.
   It reads as a wake; spread/brightness are easy to dial in `drawWake` if Andrew
   wants it bigger.
3. **Sequence timing** ≈ 8.5s total (cruise 2.6s · deal 5×0.52s · sail-off 2.4s).
   Tunable via the timeline constants at the top of `voyage-reveal.tsx`.

Eyeball tomorrow: `npm run dev` → `/hero-v2`, scroll into Frame 2 to watch the
ship cruise in, deal the crew, and sail off (desktop + 390px). Round 2 ended
cleanly. — Claude
