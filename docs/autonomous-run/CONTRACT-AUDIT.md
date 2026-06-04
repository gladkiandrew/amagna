# Hero-v2 Contract Audit — Priority 1B (2026-06-04)

Audit of the `/hero-v2` implementation against the build contract in
`docs/marketing/PLAN.md` (as amended by Priority 1A). Done during the autonomous
run; Andrew reviews on return.

## Scope reality check (read this first)

`/hero-v2` today is **Frame 1 only** — the photoreal hero (`HeroV2` +
`HeroOcean`) followed by an intentionally **empty `VoyageReveal` scaffold**
(Frame 2, explicitly marked "do not build yet").

The **full 7-beat voyage already exists and ships at `/`** (the v1):
`VoyageHero → HonestTurn → TheStorm → TheMethod → LandfallFork →
LegacyHeroSection → DockCta`, over the fixed `OceanCanvas` with ship physics in
`components/home/ocean/ocean-engine.ts` and the two-island fork in
`landfall-fork.tsx` wired to `/home-services` and `/real-estate`.

So the contract's whole-page items (7-beat rhythm, ship, islands) are satisfied
**by `/`, not by `/hero-v2`.** `/hero-v2` is a focused hero rebuild, not a second
copy of the homepage.

## Item-by-item

| Contract item | Owner | Status |
|---|---|---|
| 7-beat section rhythm (dark↔cream, gold-foam seams) | `/` (v1) | ✅ on `/`; `/hero-v2` is Frame 1 only (by design) |
| Reduced-motion fallback (final state, no canvas loop) | hero-v2 | ✅ verified — emulated `prefers-reduced-motion` renders the Canvas-2D static frame, no rAF loop |
| Visibility pause (rAF pauses hidden/offscreen, `dt` reset on resume) | hero-v2 | ✅ both engines: IntersectionObserver + `visibilitychange`; paused time accumulated so `t` never lurches |
| DPR caps + adaptive degradation tiers | hero-v2 | ✅ GL: DPR cap 1.0 desktop / 0.75 mobile, renderScale tiers 1.0→0.7→0.5→0.4 with EMA frame-time trigger |
| Color law: no purple in the water | hero-v2 | ✅ grep-verified — both water engines use only navy/gold; purple appears only in prose comments |
| Ship physics (eased travel + bob + pitch from one `waveHeight()`) | `/` (v1) | ✅ on `/`; **not in `/hero-v2`** — Frame 1 is explicitly "no ship"; the sailing ship is a later frame |
| Two-island fork wired to niche pages | `/` (v1) | ✅ on `/` (`landfall-fork.tsx`); not in `/hero-v2` (Frame 1) |
| Promote hero-v2 to `/`, keep legacy reachable | — | ⛔ **Deliberately NOT done — see decision below** |

## Decision: do NOT promote `/hero-v2` to `/` this session

The contract's promotion gate is explicit: *"Promote hero-v2 to the real `/`
route when, and only when, it fully passes the contract."* `/hero-v2` is Frame 1
only — it has no 7-beat rhythm, no ship, no island fork — so it **does not pass**,
so per the gate it **must not be promoted**. Promoting it would replace the
working full voyage at `/` with a bare hero. The gate is working as intended.

Rebuilding the entire 7-beat voyage (ship + islands) into `/hero-v2` to force a
pass was rejected as out-of-scope for an unattended run: it is many hours of
high-risk work that would **duplicate the already-working homepage at `/`** and
risk the circuit breaker, for no net gain.

## Recommended next step for Andrew (one of)

1. **Port the photoreal ocean into the existing `/` voyage hero.** Highest value
   — the realism upgrade lands on the live homepage. Caveat: the `/` ocean is one
   *fixed, scroll-coupled, ship-bearing* world camera; the GL raymarcher is tuned
   for the hero viewport. This is a real integration task (camera/ship coupling),
   not a drop-in — worth a dedicated session with you available.
2. **Continue building `/hero-v2` frame by frame** (Frame 2 reveal, ship, fork)
   until it passes the contract, then promote. More faithful to the original
   plan, but slower.

Both are flagged in `REPORT.md` as open questions. The GL ocean is fully built,
verified, and committed regardless of which path is chosen.
