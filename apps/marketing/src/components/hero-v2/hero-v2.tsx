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

      {/* Legibility scrim — a soft, focused halo behind the centered copy. The
          sunset sun + glitter road run down the centre, so this keeps the cream
          copy legible while the ocean and warm sky still read at the edges. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_64%_50%_at_50%_52%,rgba(4,7,13,0.7),rgba(4,7,13,0.22)_52%,transparent_78%)]"
      />

      {/* Copy column — raised so "Marketing Systems" lands at the vertical centre
          of the viewport, "Autonomous" above it, the hairline / subtitle / CTAs
          flowing below. Pure CSS translate; layout centering is unchanged. */}
      {/* Copy anchored to the TRUE viewport centre (left: 50vw) rather than the
          scrollbar-excluded content box, so it's precisely centred even when a
          classic scrollbar reserves space. The section's overflow-hidden clips
          any breakout. The H1 centres in this FULL-WIDTH box (no max-width) so
          the large second line never overflows a narrow column and gets pinned
          left — both lines share the same visual centre axis. The hairline /
          subtitle / CTAs sit in an inner narrow-measure wrapper. */}
      <div
        className="absolute z-[2] w-full px-4 text-center sm:px-6"
        style={{ left: '50vw', top: '50%', transform: 'translate(-50%, calc(-50% - 1vh))' }}
      >
        <h1
          id="hero-v2-title"
          className="hero-rise font-display font-semibold leading-[1.0] tracking-[-0.024em] [text-shadow:0_2px_30px_rgba(4,7,13,0.88),0_0_64px_rgba(4,7,13,0.6)]"
          style={{ '--i': 0 } as CSSProperties}
        >
          <span className="block text-[clamp(1.6rem,6.4vw,5.4rem)]">Autonomous</span>
          <span className="block text-[clamp(1.9rem,8.8vw,7.4rem)]">Marketing&nbsp;Systems</span>
        </h1>

        <div className="mx-auto max-w-[50rem]">
          {/* Thin gold hairline, centered. */}
          <div
            aria-hidden
            className="hero-rise gold-rule mx-auto mt-7"
            style={{ '--i': 1 } as CSSProperties}
          />

          <p
            className="hero-rise mx-auto mt-8 max-w-[46ch] text-[clamp(1.1rem,1.5vw,1.45rem)] font-normal leading-[1.5] text-brand-cream/90 [text-shadow:0_2px_18px_rgba(4,7,13,0.96),0_1px_3px_rgba(4,7,13,0.85)]"
            style={{ '--i': 2 } as CSSProperties}
          >
            From Autonomous Marketing to Full-Stack AI — Engineering Your Business to have a Second&nbsp;Brain.
          </p>

          <div
            className="hero-rise mt-9 flex justify-center"
            style={{ '--i': 3 } as CSSProperties}
          >
            <VoyageCtas onDark align="center" size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
