# Autonomous Run 3 Report — 2026-06-05

> Branch `auto/2026-06-04-website-build`. Nothing pushed. Run 3 = Frame 2 polish
> + homepage build-out (video examples, services), positioning broadening, and
> "Starting at" pricing. Maintained live.

## How to review
```bash
git log --oneline 01e5e8a..HEAD       # run-3 commits
cd apps/marketing && npm run build     # confirm green
npm run dev                            # eyeball /hero-v2 (scroll Frame 2 → swipe deck → services), /who-we-serve, /pricing, /crew
```

---

## Status timeline

### Phase 0 — Checkpoint ✅
Committed the CLAUDE.md positioning/pricing/crew update + PLAN-3. Green baseline.

### Priority 1 — Frame 2 polish ✅
- **Seamless water hand-off:** replaced the streaky "strands" with realistic
  filled wave layers (the hero water family, much darker) with crest rim-light.
  The hero's lit foreground tone now blends down into Frame 2 (warm top sheen)
  and darkens to deep navy with only a faint sunset hint — no hard seam.
- **Ship on the water:** waves cluster at the ship's measured waterline and the
  composition moved up, so the ship visibly rides the water (not floating in
  empty navy). Wake kept and integrated.
- **Replay loop:** an IntersectionObserver *rearm* — scrolling fully out (above
  OR below) resets the sequence; re-entering replays the cruise + crew-deal from
  the start. Verified: 5 cards after play → 0 on scroll-out → re-deals on return.
  `prefers-reduced-motion` still renders the final state only.
- **Exodus → Creative Specialist** (canon) in shared `lib/crew.ts` → flows to
  Frame 2 + /crew.
Verified full sequence + replay + reduced-motion in a real browser (desktop).

---

### Priority 2 — Video examples swipe deck ✅
New "See the output" section below Frame 2: three 9:16 cards in a Tinder-style
deck. Front card drags left (touch + mouse); past a threshold it flies off and
the next rotates forward, looping infinitely. Prev/Next buttons + ←/→ keys are a
full keyboard fallback (verified the deck rotates Hook → Offer → Proof).
**Drop-in ready:** when `public/brand/examples/example-1..3.mp4` exist the cards
become muted/looped/inline `<video>`; a styled placeholder shows until then
(README documents the convention). reduced-motion removes the slide + autoplay.

### Priority 3 — Services pillars section ✅
Editorial numbered list (01–06) on the cream content canvas (a break from the
dark water frames) — AI-Generated Content, Ads Management (Meta/TikTok/Google),
Central Memory Layer, Full-Stack Automations, SEO, AEO — one plain-English line
each. **Placement decision:** after the video examples ("you've seen the output
→ here's the full system") and before the footer.

### Priority 4 — Positioning sweep (broaden) ✅
Core offering reframed to **Autonomous Marketing Systems for any operator**; home
services + real estate are FEATURED lanes, not the whole story.
- Site tagline (footer + metadata) + footer bottom line de-narrowed.
- `/who-we-serve`: broad hero, the two niches under "Where we go deepest", plus a
  third "and beyond" → `/custom` path. Niche funnels left intact.
- `/about`: the "two kinds, and only two" line + metadata broadened.

### Priority 5 — Pricing "Starting at" ✅
No flat monthly price. Growth → "Starting at $1,497/mo" + qualifier (scales with
content credits & ad spend, quoted on the call). Surfaced all three canonical
monthly tiers with starting prices — Foundation $997, Growth $1,497, Authority
$2,497 — plus the $500 one-time Update and a page-level scaling note. **Display
only — no checkout/Stripe changes.**

### Priority 6 — Quality sweep ✅
No `any` in new files; named exports; kebab-case; `tsc --noEmit` clean. A11y: the
swipe deck is keyboard-operable (buttons + arrow keys, focus rings), all new
animation respects `prefers-reduced-motion`, media has aria-labels / decorative
glyphs are aria-hidden. Verified the new sections stack on 390px.

---

## Commits made this run

| Commit | Concern |
|---|---|
| (phase 0) | Checkpoint: CLAUDE.md update + run-3 plan |
| 0e221cc | Update Exodus to Creative Specialist (canon) |
| 53f2a2f | Polish Frame 2: seamless water, ship on water, replay loop |
| b98b4f7 | Add homepage video examples swipe deck |
| d5e4dcf | Add homepage services pillars section |
| b208aea | Broaden positioning to Autonomous Marketing Systems |
| 997c580 | Pricing: 'Starting at' tiers with scaling qualifier |
| _final_ | Update autonomous run 3 report |

---

## Decisions made for Andrew
1. **Frame 2 water stays Canvas-2D** (not GL). It's the "same visual family,
   much darker" with filled wave layers; a full GL rebuild to match the hero's
   raymarcher was out of scope for the time budget. The seam is bridged with a
   warm top sheen + gradient blend.
2. **Services placed after the video examples** (output → full system), on a
   cream canvas to break the dark frames.
3. **Pricing surfaces all three monthly tiers** (Foundation/Growth/Authority)
   with "Starting at" prices, keeping the existing $500 one-time Update on-ramp.
   I did NOT touch `lib/plans.ts` or any checkout/Stripe code — pure display.
4. **Build & dev kept separate.** Running `npm run build` while `next dev` is
   live corrupts the shared `.next` (the "Cannot find module './135.js'" 500s I
   hit on /who-we-serve). Fixed by restarting dev; workflow adjusted to stop dev
   before building.

## Open questions for Andrew
1. **Live `/` (v1 voyage)** still has niche-specific body sections (the landfall
   fork). It's the legacy homepage (the new one is `/hero-v2`, not yet promoted),
   so I left its body copy; the shared footer/tagline there is already broadened.
2. **Video MP4s**: drop them at `public/brand/examples/example-1..3.mp4` and the
   placeholders become live players automatically.

## Circuit-breaker / blocker log
- One stale-dev-server false alarm (animation appeared dead) + one `.next`
  build/dev cache 500 — both tooling, fixed by restarting dev. No code failures;
  circuit breaker never tripped.
