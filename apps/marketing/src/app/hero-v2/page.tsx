import type { Metadata } from 'next';
import { HeroV2 } from '@/components/hero-v2/hero-v2';
import { VoyageReveal } from '@/components/hero-v2/voyage-reveal';
import { VideoExamples } from '@/components/hero-v2/video-examples';
import { ServicesSection } from '@/components/hero-v2/services-section';
import { TestimonialsSection } from '@/components/hero-v2/testimonials-section';

/**
 * /hero-v2 — preview route for the Layer 1 hero rebuild.
 *
 * Isolated from the live homepage ("/") so it can be reviewed without touching
 * the v1 voyage hero. `noindex` so the work-in-progress preview never shows up
 * in search.
 */
export const metadata: Metadata = {
  title: 'Hero v2 (preview)',
  robots: { index: false, follow: false },
};

export default function HeroV2Page(): JSX.Element {
  return (
    <>
      <HeroV2 />
      <VoyageReveal />
      <VideoExamples />
      <ServicesSection />
      <TestimonialsSection />
    </>
  );
}
