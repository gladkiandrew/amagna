import type { CSSProperties } from 'react';
import { SectionShell } from './section-shell';
import { Reveal } from './reveal';

/** The operator's lived pains — sparse, named plainly. */
const PAINS = [
  'Slammed one month, dead the next — revenue rides the season, not a pipeline you control.',
  'Renting leads the resellers sold to three competitors before they sold them to you.',
  'Paying for "marketing" you can\'t see, from someone who sends a report you never read.',
];

/**
 * §3 — The Storm (dark water). Names the pain so the operator feels seen.
 * Tension beat between the positioning and the method. See PLAN.md §B.
 */
export function TheStorm(): JSX.Element {
  return (
    <SectionShell variant="dark" labelledBy="storm-title">
      {/* Localized scrim so cream text clears the brightest water. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[#070b14]/45"
      />

      <div className="relative z-[2] grid gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <Reveal>
          <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brand-warmgold">
            The storm
          </p>
          <h2
            id="storm-title"
            className="mt-6 text-balance font-display text-[clamp(2.1rem,4.6vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.015em]"
          >
            Feast or famine is not a strategy.
          </h2>
          <p className="mt-6 max-w-[46ch] text-[1.075rem] leading-[1.65] text-brand-cream/75">
            You started in the field. Now you run the business — and marketing is the hat that slips
            first. The result is a calendar that swings, and a phone that goes quiet exactly when you
            need it.
          </p>
        </Reveal>

        <Reveal stagger className="flex flex-col">
          {PAINS.map((pain, i) => (
            <div
              key={pain}
              style={{ '--i': i } as CSSProperties}
              className="border-t border-brand-warmgold/20 py-5 first:border-t-0 first:pt-0"
            >
              <p className="flex gap-4 text-[1.02rem] leading-[1.55] text-brand-cream/80">
                <span className="mt-0.5 select-none font-display text-sm text-brand-warmgold/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{pain}</span>
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </SectionShell>
  );
}
