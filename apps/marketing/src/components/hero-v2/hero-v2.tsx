import type { CSSProperties } from 'react';
import { HeroOceanCanvas } from './hero-ocean-canvas';
import { VoyageCtas } from '@/components/home/voyage-cta';

/**
 * Hero v2 (Layer 1) — a calm, full-bleed coded ocean behind centered copy.
 *
 * Static hero only: NO ship, NO pointer reactivity, NO scroll behavior (those
 * are later layers). The fresh {@link HeroOceanCanvas} paints layered, crest-lit
 * waves; the DOM copy over it is the only thing that carries meaning ("delete
 * the canvas" test passes). Entrance reuses the repo's `.hero-rise` stagger
 * (globals.css) — pure CSS, alive on load, reduced-motion-aware.
 *
 * Mounted on the /hero-v2 preview route. The live homepage ("/") is untouched.
 */
export function HeroV2(): JSX.Element {
  return (
    <section
      aria-labelledby="hero-v2-title"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-[#05080F] text-brand-cream"
    >
      {/* Coded ocean — decorative, full-bleed, behind everything (z-0). */}
      <HeroOceanCanvas className="absolute inset-0 -z-0 h-full w-full" />

      {/* Legibility scrim — concentrated behind the copy so the gold crests and
          horizon glow still read at the edges. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_60%_50%_at_50%_46%,rgba(5,8,15,0.62),transparent_72%)]"
      />

      {/* Centered copy column. */}
      <div className="relative z-[2] mx-auto w-full max-w-[44rem] px-4 text-center sm:px-6">
        {/* Eyebrow — understated maritime label (no pill, no badge background). */}
        <p
          className="hero-rise flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.4em] text-brand-warmgold"
          style={{ '--i': 0 } as CSSProperties}
        >
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/55" />
          Amagna&nbsp;AI
          <span aria-hidden className="h-px w-7 bg-brand-warmgold/55" />
        </p>

        <h1
          id="hero-v2-title"
          className="hero-rise mt-6 font-display text-[clamp(1.3rem,6.2vw,5.75rem)] font-semibold leading-[1.05] tracking-[-0.024em]"
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
          className="hero-rise mx-auto mt-7 max-w-[40ch] text-[clamp(1.02rem,1.3vw,1.2rem)] leading-[1.6] text-brand-cream/82"
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
