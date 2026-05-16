import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { HOME_SERVICES } from '@/lib/niches';

export const metadata: Metadata = {
  title: HOME_SERVICES.metaTitle,
  description: HOME_SERVICES.metaDescription,
};

export default function HomeServicesPage() {
  return <NicheFunnel content={HOME_SERVICES} />;
}
