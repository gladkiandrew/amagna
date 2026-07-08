# CC Brief — "Second Brain" agent artifact (full build)

> Cowork generated the brain art (Higgsfield) + a composited STATIC artifact and wired it into
> `/grow` section 4. Your job: rebuild it as a live, responsive, animated React component and
> swap it in. The static image is the visual target + fallback.

## Current state (already in repo, on branch)
- **Brain art (Higgsfield, brand-locked, no blue/no text):** `public/brand/second-brain-core.webp`
  (the glowing gold brain on navy, edges fade out) and `…-core.png`.
- **Composited static artifact (the visual TARGET):** `public/brand/second-brain-artifact.webp`
  — brain + AM-monogram core + 6 agent cards + connector traces. This is what the live component
  should look like (and then improve with motion).
- **`/grow` section 4** currently renders that webp via `<Image>` under the headline
  *"We'll build your business's second brain."* Replace the `<Image>` with `<SecondBrain />`.

## Build `src/app/grow/second-brain.tsx` (client component)
Recreate the artifact as live SVG/HTML and elevate it:

**Layers (back → front):**
1. The brain image `/brand/second-brain-core.webp` as the centerpiece, centered, edges feathered
   (radial mask) so it melts into the navy section.
2. **AM monogram** as the glowing core INSIDE the brain — vector path (viewBox 0 0 200 210):
   `M 100 18 L 34 196 C 38 120 48 34 62 34 C 76 34 94 80 100 108 C 106 80 124 34 138 34 C 152 34 162 120 166 196 L 100 18 Z`
   Render cream/gold stroke with a soft dark backing disc + gold glow so it reads as the core.
3. **6 agent nodes** around the brain (3 left, 3 right), each a card: small icon dot + name + descriptor:
   - Content — creates your content
   - Ads — runs your ads
   - Booking — books your calls
   - Follow-Up — works every lead
   - Reviews — builds your reputation
   - SEO + AEO — gets you found
   (Functional names only — NO crew names.)
4. **Connector traces** from each card into the brain, with **animated gold pulse dots** travelling
   card→brain (or brain→card), staggered + looping, `motion-safe` only.

**Responsive — important:**
- Desktop/tablet (≥640px): the ringed layout (cards left/right of the brain) like the static target.
- Mobile (<640px): DO NOT shrink the ring into illegibility. Instead stack — brain + monogram on
  top, then the 6 agents as a clean 2-column list below with real, readable text.

**Rules:** brand palette only (navy #1A0E36, gold #C9A961, warm gold #D4B873, purple #5D2E8C,
cream #F9F8F3) — **no blue**. Real text (not baked), aria-label on the figure. Keep it lightweight
(SVG + CSS animation, no heavy deps). Keep the headline + eyebrow already in section 4.

## Acceptance
- `<SecondBrain />` replaces the `<Image>` in `/grow` section 4; headline unchanged.
- Looks like the static target on desktop, with subtle looping pulses; legible stacked layout on mobile.
- AM monogram clearly reads as the brain's core. No "agency". No blue. No crew names.
- `npm run build` + `tsc` + lint pass. Commit on the feature branch; leave deploy to Andrew.
- Once the component looks right, the static `<Image>` fallback can be removed (keep the
  `-core.webp` brain art — the component uses it).
