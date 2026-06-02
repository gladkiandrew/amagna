import { OceanCanvas } from '@/components/home/ocean/ocean-canvas';
import { VoyageHero } from '@/components/home/voyage-hero';
import { HonestTurn } from '@/components/home/honest-turn';
import { TheStorm } from '@/components/home/the-storm';
import { TheMethod } from '@/components/home/the-method';
import { LandfallFork } from '@/components/home/landfall-fork';
import { LegacyHeroSection } from '@/components/home/legacy-hero-section';
import { DockCta } from '@/components/home/dock-cta';

/**
 * The Amagna homepage — a single-scroll "voyage". The dragon-ship sails a live
 * ocean canvas (fixed, behind everything); dark-water sections reveal it, cream
 * panels cover it, and the journey ends at the two-island landfall fork.
 * See docs/marketing/PLAN.md for the full architecture.
 */
export default function Home(): JSX.Element {
  return (
    <>
      {/* Fixed ocean canvas (z-0). Decorative; all meaning is in the DOM below. */}
      <OceanCanvas />

      {/* Content rides above the sea. Dark sections are transparent (ocean shows
          through); cream sections are opaque (the "land"). */}
      <div className="relative z-10">
        <VoyageHero />
        <HonestTurn />
        <TheStorm />
        <TheMethod />
        <LandfallFork />
        <LegacyHeroSection />
        <DockCta />
      </div>
    </>
  );
}
