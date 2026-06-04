import { VoyageCtas } from './voyage-cta';

/**
 * §1 — Voyage Hero / Cast Off (dark water). The ship is the focal element,
 * re-staged larger in the lower third; copy holds the upper field so the two
 * share the frame on purpose. Entrance is a time-based stagger (pure CSS,
 * `.hero-rise` in globals.css — no IO, alive at scroll = 0). One <h1> per page.
 */
export function VoyageHero(): JSX.Element {
  return (
    <section
      data-ocean=""
      aria-labelledby="hero-title"
      className="grain-soft relative isolate flex min-h-[100svh] flex-col overflow-hidden text-brand-cream"
    >
      {/* Legibility scrim — pulled back so the gold crests + horizon glow read.
          Darkening is concentrated behind the text block only. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-deep/40 via-transparent to-transparent"
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1100px] px-6 pt-[max(6rem,14svh)]">
        <div>
          {/* Eyebrow — maritime label, not a SaaS pill. */}
          <p
            className="hero-rise flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.42em] text-brand-warmgold"
            style={{ '--i': 0 } as React.CSSProperties}
          >
            <span aria-hidden className="h-px w-8 bg-brand-warmgold/60" />
            Amagna&nbsp;AI
          </p>

          <h1
            id="hero-title"
            className="hero-rise mt-5 font-display text-[clamp(2.125rem,5vw+1.1rem,6.25rem)] font-semibold leading-[1.04] tracking-[-0.022em]"
            style={{ '--i': 1 } as React.CSSProperties}
          >
            Autonomous
            <br /> Marketing Systems
          </h1>

          {/* Thin gold hairline beneath the headline. */}
          <div
            aria-hidden
            className="hero-rise gold-rule mt-6"
            style={{ '--i': 2 } as React.CSSProperties}
          />

          <p
            className="hero-rise mt-6 max-w-[42ch] text-[clamp(1.02rem,1.3vw,1.25rem)] leading-[1.55] text-brand-cream/80"
            style={{ '--i': 3 } as React.CSSProperties}
          >
            We build your marketing machine — and the videos that fuel it.
          </p>

          <div className="hero-rise" style={{ '--i': 4 } as React.CSSProperties}>
            <VoyageCtas onDark className="mt-8" />
          </div>
        </div>
      </div>

      {/* Lower field belongs to the ship (drawn on the ocean canvas beneath).
          This spacer guarantees the CTAs never overlap the sail on small screens. */}
      <div aria-hidden className="min-h-[34svh] flex-1" />

      {/* Quiet scroll cue. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-6 z-[2] hidden flex-col items-center gap-2 text-brand-warmgold/70 sm:flex"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">The voyage</span>
        <span className="h-9 w-px bg-gradient-to-b from-brand-warmgold/70 to-transparent" />
      </div>
    </section>
  );
}
