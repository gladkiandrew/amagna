import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { REAL_ESTATE } from '@/lib/niches';
import { OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: REAL_ESTATE.metaTitle,
  description: REAL_ESTATE.metaDescription,
  openGraph: {
    title: REAL_ESTATE.metaTitle,
    description: REAL_ESTATE.metaDescription,
    type: 'website',
    url: '/real-estate',
    images: [OG_IMAGE],
  },
};

export default function RealEstatePage() {
  return <NicheFunnel content={REAL_ESTATE} />;
}
