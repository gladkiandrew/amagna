import type { Metadata } from 'next';
import { HeroV2 } from '@/components/hero-v2/hero-v2';
import { RiverCanvas } from '@/components/sections/river-canvas';
import { SecondBrainSteps } from '@/components/sections/second-brain-steps';
import { ServicesSection } from '@/components/hero-v2/services-section';
import { TestimonialsSection } from '@/components/hero-v2/testimonials-section';
import { FaqSection } from '@/components/sections/faq-section';
import { FieldNotesSection } from '@/components/sections/field-notes-section';
import { OG_IMAGE } from '@/lib/site';

const HOME_DESCRIPTION =
  'Amagna AI is an AI marketing agency for operators who want growth that runs itself: we build your marketing system — website, funnels, managed ads, AI video, local SEO — and a crew of AI agents that runs it. Based in Saginaw, Michigan; plans from $50/mo to $2,000/mo. Get your free Gold Map.';

export const metadata: Metadata = {
  description: HOME_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Amagna AI — Marketing that runs itself',
    description: HOME_DESCRIPTION,
    type: 'website',
    url: '/',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amagna AI — Marketing that runs itself',
    description: HOME_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

/**
 * The Amagna homepage. Frame 1 is the photoreal WebGL ocean hero (untouched);
 * everything below it sits on the RiverCanvas — the universal cream canvas
 * with the purple/gold river drifting down behind the content. The body is
 * the four numbered Second Brain sections, then the integrations hub,
 * testimonials, FAQ, and Field Notes re-seated on the same canvas so the
 * page reads as one piece. The original voyage homepage is preserved at
 * /voyage-v1 as a fallback.
 */
export default function Home(): JSX.Element {
  return (
    <>
      <HeroV2 />
      <RiverCanvas seam>
        <SecondBrainSteps />
        <ServicesSection />
        <TestimonialsSection />
        <FaqSection />
        <FieldNotesSection />
      </RiverCanvas>
    </>
  );
}
