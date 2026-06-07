import type { Metadata } from 'next';
import { HeroV2 } from '@/components/hero-v2/hero-v2';
import { VoyageReveal } from '@/components/hero-v2/voyage-reveal';
import { VideoExamples } from '@/components/hero-v2/video-examples';
import { ServicesSection } from '@/components/hero-v2/services-section';
import { TestimonialsSection } from '@/components/hero-v2/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FieldNotesSection } from '@/components/sections/field-notes-section';
import { OG_IMAGE } from '@/lib/site';

const HOME_DESCRIPTION =
  'Amagna AI builds autonomous marketing systems — the machine that runs your marketing and the content that fuels it — for any operator who wants growth that runs itself, with deep playbooks for home services and real estate. Get your free Gold Map.';

export const metadata: Metadata = {
  description: HOME_DESCRIPTION,
  openGraph: {
    title: 'Amagna AI — Marketing that runs itself',
    description: HOME_DESCRIPTION,
    type: 'website',
    url: '/',
    images: [OG_IMAGE],
  },
};

/**
 * The Amagna homepage (promoted from the hero-v2 build on 2026-06-05).
 * Frame 1 is the photoreal WebGL ocean hero; Frame 2 is the crew/voyage reveal;
 * then the video examples, the services + integrations grid, and testimonials.
 * The original voyage homepage is preserved at /voyage-v1 as a fallback.
 */
export default function Home(): JSX.Element {
  return (
    <>
      <HeroV2 />
      <VoyageReveal />
      <VideoExamples />
      <ServicesSection />
      <TestimonialsSection />
      <FaqSection />
      <FieldNotesSection />
    </>
  );
}
