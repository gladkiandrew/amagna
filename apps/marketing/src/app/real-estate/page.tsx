import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { REAL_ESTATE } from '@/lib/niches';

export const metadata: Metadata = {
  title: REAL_ESTATE.metaTitle,
  description: REAL_ESTATE.metaDescription,
};

export default function RealEstatePage() {
  return <NicheFunnel content={REAL_ESTATE} />;
}
