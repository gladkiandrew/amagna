import type { CSSProperties } from 'react';
import { HeroOcean } from './hero-ocean';
import { VoyageCtas } from '@/components/home/voyage-cta';

/**
 * Hero v2 (Frame 1) — a photoreal, full-bleed ocean behind centered copy.
 *
 * Static hero only: NO ship, NO pointer reactivity, NO scroll behavior (those
 * are later frames). {@link HeroOcean} renders a GPU-simulated WebGL2 ocean
 * (perspective swell, fresnel, gold sun-glitter) and falls back to the Canvas-2D
 * seascape under reduced-motion / no-WebGL. The DOM copy over it is the only
 * thing that carries meaning ("delete the canvas" test passes). Entrance reuses
 * the repo's `.hero-rise` stagger (globals.css) — pure CSS, alive on load,
 * reduced-motion-aware.
 *
 * Mounted on the /hero-v2 preview route. The live homepage ("/") is untouched.
 */
export function HeroV2(): JSX.Element {
  return (
    <section
      aria-labelledby="hero-v2-title"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#05080F] text-brand-cream"
    >
      {/* Photoreal ocean — decorative, full-bleed, behind everything (z-0). */}
      <HeroOcean className="absolute inset-0 -z-0 h-full w-full" />

      {/* Legibility scrim — a soft, focused halo behind the centered copy. Kept
          deliberately tight with a quick falloff so the photoreal ocean and its
          warm horizon still read across most of the frame; the cream copy holds
          contrast through this plus its own text-shadow. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_62%_46%_at_50%_58%,rgba(4,7,13,0.66),rgba(4,7,13,0.2)_52%,transparent_78%)]"
      />

      {/* Copy column — seated in the lower third over the darker open water (the
          bright gold horizon reads as sky above it), so cream copy keeps
          contrast. Pure CSS translate; layout centering is unchanged. */}
      <div className="relative z-[2] mx-auto w-full max-w-[44rem] translate-y-[9vh] px-4 text-center sm:px-6">
        {/* Eyebrow — understated maritime label (no pill, no badge background). */}
        <p
          className="hero-rise flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-brand-warmgold [text-shadow:0_1px_12px_rgba(4,7,13,0.7)]"
          style={{ '--i': 0 } as CSSProperties}
        >
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/55" />
          Amagna&nbsp;AI
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/55" />
        </p>

        <h1
          id="hero-v2-title"
          className="hero-rise mt-6 font-display text-[clamp(1.3rem,6.2vw,5.75rem)] font-semibold leading-[1.05] tracking-[-0.024em] [text-shadow:0_2px_30px_rgba(4,7,13,0.85),0_0_64px_rgba(4,7,13,0.5)]"
          style={{ '--i': 1 } as CSSProperties}
        >
          Autonomous<br className="sm:hidden" /> Marketing Systems
        </h1>

        {/* Thin gold hairline, centered. */}
        <div
          aria-hidden
          className="hero-rise gold-rule mx-auto mt-7"
          style={{ '--i': 2 } as CSSProperties}
        />

        <p
          className="hero-rise mx-auto mt-7 max-w-[40ch] text-[clamp(1.02rem,1.3vw,1.2rem)] leading-[1.6] text-brand-cream/90 [text-shadow:0_1px_16px_rgba(4,7,13,0.75)]"
          style={{ '--i': 3 } as CSSProperties}
        >
          We build your marketing machine — and the content that fuels&nbsp;it.
        </p>

        <div
          className="hero-rise mt-9 flex justify-center"
          style={{ '--i': 4 } as CSSProperties}
        >
          <VoyageCtas onDark align="center" />
        </div>
      </div>
    </section>
  );
}
