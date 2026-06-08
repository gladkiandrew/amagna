import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { POLITICAL_CANDIDATES } from '@/lib/niches';
import { OG_IMAGE } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: POLITICAL_CANDIDATES.metaTitle,
  description: POLITICAL_CANDIDATES.metaDescription,
  alternates: { canonical: '/political-candidates' },
  openGraph: {
    title: POLITICAL_CANDIDATES.metaTitle,
    description: POLITICAL_CANDIDATES.metaDescription,
    type: 'website',
    url: '/political-candidates',
    images: [OG_IMAGE],
  },
};

export default function PoliticalCandidatesPage() {
  return <NicheFunnel content={POLITICAL_CANDIDATES} />;
}
