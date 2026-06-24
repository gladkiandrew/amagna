import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { PHYSICAL_THERAPY_MARKETING } from '@/lib/service-pages';
import { OG_IMAGE } from '@/lib/site';

const C = PHYSICAL_THERAPY_MARKETING;

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: C.metaTitle },
  description: C.metaDescription,
  alternates: { canonical: `/${C.slug}` },
  openGraph: {
    title: C.metaTitle,
    description: C.metaDescription,
    type: 'website',
    url: `/${C.slug}`,
    images: [OG_IMAGE],
  },
};

export default function PhysicalTherapyMarketingPage(): JSX.Element {
  return <ServicePage content={C} />;
}
