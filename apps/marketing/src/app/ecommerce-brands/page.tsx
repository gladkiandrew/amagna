import type { Metadata } from 'next';
import { NicheFunnel } from '@/components/niche-funnel';
import { ECOMMERCE_BRANDS } from '@/lib/niches';
import { OG_IMAGE } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: ECOMMERCE_BRANDS.metaTitle,
  description: ECOMMERCE_BRANDS.metaDescription,
  alternates: { canonical: '/ecommerce-brands' },
  openGraph: {
    title: ECOMMERCE_BRANDS.metaTitle,
    description: ECOMMERCE_BRANDS.metaDescription,
    type: 'website',
    url: '/ecommerce-brands',
    images: [OG_IMAGE],
  },
};

export default function EcommerceBrandsPage() {
  return <NicheFunnel content={ECOMMERCE_BRANDS} />;
}
