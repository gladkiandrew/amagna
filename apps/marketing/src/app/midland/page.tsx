import type { Metadata } from 'next';
import { ServicePage } from '@/components/service-page';
import { MIDLAND } from '@/lib/service-pages';
import { OG_IMAGE } from '@/lib/site';

const C = MIDLAND;

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
  twitter: {
    card: 'summary_large_image',
    title: C.metaTitle,
    description: C.metaDescription,
    images: [OG_IMAGE.url],
  },
};

export default function MidlandPage(): JSX.Element {
  return <ServicePage content={C} />;
}
