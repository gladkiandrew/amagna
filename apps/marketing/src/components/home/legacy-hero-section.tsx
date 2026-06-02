import { HeroFlow } from '@/components/hero-flow';

/**
 * §6 — LEGACY HERO, RELOCATED INTACT. Pending final placement.
 *
 * This is the previous amagna.co homepage hero (the agentic-flow diagram). It is
 * NOT being rebuilt or edited — `HeroFlow` is preserved exactly. It has been
 * DEMOTED from the top of the page to just above the Dock/CTA while we decide
 * its long-term home (most likely a migration into the Home Services funnel).
 *
 * Wrapped in an opaque cream panel so its purple-on-cream styling reads
 * correctly and so it covers the ocean canvas behind it. Do not edit HeroFlow.
 */
export function LegacyHeroSection(): JSX.Element {
  return (
    <div className="relative isolate bg-brand-cream">
      <div className="gold-seam absolute inset-x-0 top-0 z-[2]" aria-hidden />
      <p className="mx-auto max-w-[1100px] px-6 pt-12 text-center text-[12px] font-medium uppercase tracking-[0.3em] text-brand-purple">
        How the system works
      </p>
      <HeroFlow />
    </div>
  );
}
