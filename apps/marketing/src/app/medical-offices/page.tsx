import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { MEDICAL_OFFICES } from '@/lib/niches';
import { OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: MEDICAL_OFFICES.metaTitle,
  description: MEDICAL_OFFICES.metaDescription,
  alternates: { canonical: '/medical-offices' },
  openGraph: {
    title: MEDICAL_OFFICES.metaTitle,
    description: MEDICAL_OFFICES.metaDescription,
    type: 'website',
    url: '/medical-offices',
    images: [OG_IMAGE],
  },
};

export default function MedicalOfficesPage() {
  return <NicheFunnel content={MEDICAL_OFFICES} />;
}
