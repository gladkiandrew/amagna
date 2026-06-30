'use client';

import { useState } from 'react';

export type Way = { tab: string; title: string; body: string };

/**
 * Interactive "ways our AI works for you" toggle — vertical tabs on desktop,
 * horizontal scroll-pills on mobile, with an animated panel. Breaks the
 * card-grid rhythm of the section above it.
 */
export function WaysToggle({ ways }: { ways: readonly Way[] }): JSX.Element {
  const [active, setActive] = useState(0);
  const current = ways[active];

  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-8">
      {/* Tabs — horizontal scroll-pills (mobile) / vertical rail (desktop) */}
      <div
        role="tablist"
        aria-label="What our AI does for you"
        className="-mx-6 flex gap-2.5 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {ways.map((w, i) => {
          const on = i === active;
          return (
            <button
              key={w.tab}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className={`group relative flex shrink-0 items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 lg:w-full lg:rounded-2xl lg:py-4 lg:pl-6 lg:pr-5 ${
                on
                  ? 'bg-brand-deep text-brand-cream shadow-[0_14px_36px_-16px_rgba(26,14,54,0.9)]'
                  : 'bg-brand-cream text-brand-charcoal ring-1 ring-brand-gold/25 hover:bg-white hover:ring-brand-gold/60'
              }`}
            >
              {/* active accent bar (desktop only) */}
              <span
                aria-hidden
                className={`absolute left-0 top-1/2 hidden h-7 w-[3px] -translate-y-1/2 rounded-full bg-brand-warmgold transition-opacity duration-200 lg:block ${
                  on ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <span
                aria-hidden
                className={`font-display text-sm font-semibold tabular-nums transition-colors ${
                  on ? 'text-brand-warmgold' : 'text-brand-gold'
                }`}
              >
                0{i + 1}
              </span>
              <span className="whitespace-nowrap lg:whitespace-normal lg:text-left">{w.tab}</span>
            </button>
          );
        })}
      </div>

      {/* Panel — fixed min-height so it doesn't jump between tabs */}
      <div
        key={active}
        role="tabpanel"
        className="relative flex min-h-[220px] flex-col justify-center overflow-hidden rounded-3xl border border-brand-gold/30 bg-brand-cream p-8 shadow-[0_2px_44px_-18px_rgba(93,46,140,0.32)] motion-safe:animate-[growPanelIn_0.35s_ease-out_both] sm:min-h-[250px] sm:p-10"
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand-gold to-brand-warmgold"
        />
        {/* oversized watermark index */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-3 -top-7 select-none font-display text-[7rem] font-semibold leading-none text-brand-gold/[0.08] sm:text-[9rem]"
        >
          0{active + 1}
        </span>
        <p className="relative font-display text-2xl font-semibold leading-snug text-brand-charcoal sm:text-[1.95rem]">
          {current.title}
        </p>
        <p className="relative mt-4 max-w-[52ch] text-lg leading-[1.65] text-brand-slate">
          {current.body}
        </p>
      </div>
    </div>
  );
}
