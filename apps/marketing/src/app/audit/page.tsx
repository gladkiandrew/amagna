import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/site';
import { GoldMap } from '@/components/gold-map/gold-map';

const DESCRIPTION =
  'The Gold Map — a treasure-hunt audit. Tell us about your business, forge your key with your own AI, and dig up a custom Plan to Gold. Free, and yours to keep.';

export const metadata: Metadata = {
  title: 'The Gold Map',
  description: DESCRIPTION,
  openGraph: {
    title: 'The Gold Map — Amagna AI',
    description: DESCRIPTION,
    type: 'website',
    url: '/audit',
    images: [OG_IMAGE],
  },
};

/** /audit — the Gold Map treasure-hunt funnel (flagship lead intake). */
export default function GoldMapPage(): JSX.Element {
  return <GoldMap />;
}
