import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { MULTI_LOCATION } from '@/lib/niches';
import { OG_IMAGE } from '@/lib/site';

export const metadata: Metadata = {
  title: MULTI_LOCATION.metaTitle,
  description: MULTI_LOCATION.metaDescription,
  alternates: { canonical: '/multi-location' },
  openGraph: {
    title: MULTI_LOCATION.metaTitle,
    description: MULTI_LOCATION.metaDescription,
    type: 'website',
    url: '/multi-location',
    images: [OG_IMAGE],
  },
};

export default function MultiLocationPage() {
  return <NicheFunnel content={MULTI_LOCATION} />;
}
