import { SectionShell } from './section-shell';
import { Reveal } from './reveal';

/**
 * §2 — The Honest Turn (cream). The positioning line, given room to land.
 * Disarms the "another AI tech pitch" reflex. See PLAN.md §B.
 */
export function HonestTurn(): JSX.Element {
  return (
    <SectionShell variant="cream" labelledBy="honest-title" seamTop>
      <Reveal className="mx-auto max-w-[20ch] text-center sm:max-w-[24ch]">
        <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brand-purple">
          The honest turn
        </p>
        <h2
          id="honest-title"
          className="mt-6 text-balance font-display text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.015em] text-brand-charcoal"
        >
          We don&rsquo;t sell you innovative tech. We{' '}
          <span className="relative whitespace-nowrap text-brand-purple">
            fix your problem
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-brand-gold/70"
            />
          </span>
          .
        </h2>
      </Reveal>

      <Reveal className="mx-auto mt-8 max-w-[58ch] text-center">
        <p className="text-[1.075rem] leading-[1.7] text-brand-slate">
          You don&rsquo;t need a dashboard you&rsquo;ll never log into. You need the phone to ring.
          We bring the leads, qualify them, and follow up — so you stay in the field doing the work
          you&rsquo;re great at.
        </p>
      </Reveal>
    </SectionShell>
  );
}
