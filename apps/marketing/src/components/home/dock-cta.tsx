import { SectionShell } from './section-shell';
import { Reveal } from './reveal';
import { VoyageCtas } from './voyage-cta';

/**
 * §7 — The Dock / CTA (cream harbor). The voyage ends in a warm harbor: the
 * close. Free audit (primary) + book a call. See PLAN.md §B.
 */
export function DockCta(): JSX.Element {
  return (
    <SectionShell variant="cream" labelledBy="dock-title" seamTop>
      <Reveal className="mx-auto max-w-[42ch] text-center">
        <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-brand-purple">
          The dock
        </p>
        <h2
          id="dock-title"
          className="mt-6 text-balance font-display text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.1] tracking-[-0.015em] text-brand-charcoal"
        >
          Drop anchor. Let&rsquo;s get your pipeline full.
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-[1.075rem] leading-[1.7] text-brand-slate">
          Start with your Gold Map — we&rsquo;ll show you exactly where your leads are leaking and
          what we&rsquo;d fix first. No pitch, no jargon, just the map.
        </p>
        <VoyageCtas align="center" className="mt-9" />
      </Reveal>
    </SectionShell>
  );
}
