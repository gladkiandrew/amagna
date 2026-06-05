import { OceanCanvas } from '@/components/home/ocean/ocean-canvas';
import { VoyageHero } from '@/components/home/voyage-hero';
import { HonestTurn } from '@/components/home/honest-turn';
import { TheStorm } from '@/components/home/the-storm';
import { TheMethod } from '@/components/home/the-method';
import { LandfallFork } from '@/components/home/landfall-fork';
import { LegacyHeroSection } from '@/components/home/legacy-hero-section';
import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/site';
import { DockCta } from '@/components/home/dock-cta';

const HOME_DESCRIPTION =
  'Amagna AI is an AI-native marketing agency for home-services and real-estate operators. We sell outcomes — more calls, more listings — not hours. Get a free 60-second audit.';

/**
 * Legacy fallback metadata. `noindex` so the archived v1 voyage homepage never
 * competes with the live "/" homepage for search or creates duplicate content.
 * OG url retargeted to /voyage-v1.
 */
export const metadata: Metadata = {
  title: 'Amagna AI — Voyage (v1 archive)',
  description: HOME_DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Amagna AI — More calls. More listings. Owned, not rented.',
    description: HOME_DESCRIPTION,
    type: 'website',
    url: '/voyage-v1',
    images: [OG_IMAGE],
  },
};

/**
 * The original Amagna homepage — a single-scroll "voyage". Preserved at
 * /voyage-v1 as the legacy fallback when the hero-v2 homepage became "/"
 * (2026-06-05). The dragon-ship sails a live ocean canvas (fixed, behind
 * everything); dark-water sections reveal it, cream panels cover it, and the
 * journey ends at the two-island landfall fork.
 * See docs/marketing/PLAN.md for the full architecture.
 */
export default function VoyageV1(): JSX.Element {
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
