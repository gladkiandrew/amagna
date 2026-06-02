import type { CSSProperties } from 'react';
import { SectionShell } from './section-shell';
import { Reveal } from './reveal';

const STEPS = [
  {
    title: 'Attract',
    body: 'Ads and content that reach the right local customers — built around your most profitable work, not vanity reach.',
  },
  {
    title: 'Capture',
    body: 'Every lead answered, qualified, and booked — fast, in your voice, so no job slips because nobody called back.',
  },
  {
    title: 'Keep',
    body: 'We stay in front of past customers and your sphere, so they come back, refer, and list with you first.',
  },
];

/**
 * §4 — The Method (cream). The mechanism, plainly: Attract · Capture · Keep.
 * Editorial numbered rows (not three identical icon-cards) per anti-generic
 * strategy. See PLAN.md §B/§G.
 */
export function TheMethod(): JSX.Element {
  return (
    <SectionShell variant="cream" labelledBy="method-title" seamTop>
      <Reveal className="max-w-[30ch]">
        <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brand-purple">
          The method
        </p>
        <h2
          id="method-title"
          className="mt-6 text-balance font-display text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.015em] text-brand-charcoal"
        >
          A system that runs whether you&rsquo;re on a roof or at a closing.
        </h2>
      </Reveal>

      <Reveal stagger className="mt-14 flex flex-col gap-px">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            style={{ '--i': i } as CSSProperties}
            className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-2 border-t border-brand-lightgray py-9 sm:grid-cols-[5rem_minmax(0,16rem)_1fr] sm:gap-x-10"
          >
            <span className="font-display text-[2.25rem] leading-none text-brand-purple sm:text-[2.75rem]">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-[1.7rem] leading-tight tracking-[-0.01em] text-brand-charcoal sm:text-[2rem]">
              {step.title}
            </h3>
            <p className="col-span-2 max-w-[52ch] text-[1.05rem] leading-[1.65] text-brand-slate sm:col-span-1 sm:pt-2">
              {step.body}
            </p>
          </div>
        ))}
      </Reveal>
    </SectionShell>
  );
}
