import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { HOME_SERVICES } from '@/lib/niches';
import { OG_IMAGE } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: HOME_SERVICES.metaTitle,
  description: HOME_SERVICES.metaDescription,
  openGraph: {
    title: HOME_SERVICES.metaTitle,
    description: HOME_SERVICES.metaDescription,
    type: 'website',
    url: '/home-services',
    images: [OG_IMAGE],
  },
};

export default function HomeServicesPage() {
  return <NicheFunnel content={HOME_SERVICES} />;
}
