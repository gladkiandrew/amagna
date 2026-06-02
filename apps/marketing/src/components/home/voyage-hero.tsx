import { Reveal } from './reveal';
import { VoyageCtas } from './voyage-cta';

/**
 * §1 — Voyage Hero / Cast Off (dark water). The ship sails the live ocean
 * canvas below the copy. Text sits in the upper field so the ship reads in the
 * lower third. One <h1> for the page. See PLAN.md §B.
 */
export function VoyageHero(): JSX.Element {
  return (
    <section
      data-ocean=""
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden text-brand-cream"
    >
      {/* Legibility scrim over the live water (kept subtle; water is already dark). */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-b from-brand-deep/55 via-brand-deep/10 to-[#060a12]/40"
      />

      <div className="relative z-[2] mx-auto w-full max-w-[1100px] px-6 pb-[30vh] pt-[16vh]">
        <Reveal className="max-w-[44ch]">
          <p className="text-[12px] font-medium uppercase tracking-[0.32em] text-brand-warmgold">
            Amagna&nbsp;AI · AI-powered growth systems
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-balance font-display text-[clamp(2.75rem,6vw+1rem,6rem)] font-medium leading-[1.04] tracking-[-0.02em]"
          >
            More calls. More closings.{' '}
            <span className="italic text-brand-warmgold">Owned</span>, not rented.
          </h1>

          <p className="mt-7 max-w-[52ch] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.6] text-brand-cream/80">
            We build the marketing machine that brings home-services and real-estate operators a
            steady tide of real customers — then we run it for you.
          </p>

          <VoyageCtas onDark className="mt-9" />
        </Reveal>
      </div>

      {/* Quiet scroll cue. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-7 z-[2] flex flex-col items-center gap-2 text-brand-warmgold/70"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.3em]">The voyage</span>
        <span className="h-9 w-px bg-gradient-to-b from-brand-warmgold/70 to-transparent" />
      </div>
    </section>
  );
}
