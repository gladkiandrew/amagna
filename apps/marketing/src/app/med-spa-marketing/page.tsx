import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { MED_SPA_MARKETING } from '@/lib/service-pages';
import { OG_IMAGE } from '@/lib/site';

const C = MED_SPA_MARKETING;

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

export default function MedSpaMarketingPage(): JSX.Element {
  return <ServicePage content={C} />;
}
