import type { CSSProperties } from 'react';
import { SectionShell } from './section-shell';
import { Reveal } from './reveal';
import { LandfallIsland } from './landfall-island';

/** Home-services motif — a rugged roofline ridge. */
function RooflineMotif(): JSX.Element {
  return (
    <svg viewBox="0 0 320 80" className="h-full w-full" fill="none" aria-hidden>
      <path
        d="M0 78 L60 40 L100 60 L150 22 L196 56 L248 30 L300 58 L320 48"
        stroke="#C9A961"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M150 22 L150 78 M196 56 L196 78 M248 30 L248 78" stroke="#C9A961" strokeWidth="1.4" />
    </svg>
  );
}

/** Real-estate motif — a refined row of warm-lit windows. */
function WindowsMotif(): JSX.Element {
  return (
    <svg viewBox="0 0 320 80" className="h-full w-full" fill="none" aria-hidden>
      {[18, 78, 138, 198, 258].map((x) => (
        <g key={x} stroke="#C9A961" strokeWidth="1.6">
          <rect x={x} y="20" width="44" height="52" rx="3" />
          <path d={`M${x + 22} 20 L${x + 22} 72 M${x} 46 L${x + 44} 46`} strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}

/**
 * §5 — The Landfall Fork (dark→islands). The climax. Two niche islands rise
 * from the water into a Y-channel; the ship (on the canvas behind) sits at the
 * fork. The central gap stays open water — the sea is the wall between the
 * niches. See PLAN.md §E.
 */
export function LandfallFork(): JSX.Element {
  return (
    <SectionShell variant="dark" labelledBy="landfall-title" className="py-[var(--space-section)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#060a12]/70 via-[#070b14]/30 to-[#060a12]/70"
      />

      <div className="relative z-[2]">
        <Reveal className="mx-auto max-w-[36ch] text-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brand-warmgold">
            Landfall
          </p>
          <h2
            id="landfall-title"
            className="mt-6 text-balance font-display text-[clamp(2.1rem,4.6vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.015em] text-brand-cream"
          >
            Two coasts. Pick the one that&rsquo;s yours.
          </h2>
        </Reveal>

        <nav aria-label="Choose your path" className="mt-14">
          <Reveal
            stagger
            className="landfall grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <div style={{ '--i': 0 } as CSSProperties}>
              <LandfallIsland
                href="/home-services"
                side="left"
                warmth="warm"
                eyebrow="For home-services operators"
                title="Own your leads. End feast or famine."
                body="Steady, predictable calls from real local customers — booked and qualified before they reach you. Stop renting leads. Build a pipeline that's yours."
                ariaLabel="Home services — own your leads and end feast or famine"
                motif={<RooflineMotif />}
              />
            </div>
            <div style={{ '--i': 1 } as CSSProperties}>
              <LandfallIsland
                href="/real-estate"
                side="right"
                warmth="cool"
                eyebrow="For real-estate agents & teams"
                title="More listings. A sphere that never goes cold."
                body="Stay top of mind with every past client and lead — automatically — so when they're ready to sell, you're the only name they call."
                ariaLabel="Real estate — more listings and a sphere that never goes cold"
                motif={<WindowsMotif />}
              />
            </div>
          </Reveal>
        </nav>
      </div>
    </SectionShell>
  );
}
