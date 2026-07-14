import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUDIT_HREF } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page has drifted off the map. Head back home or start your free Gold Map.',
  robots: { index: false, follow: true },
};

export default function NotFound(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto flex w-full max-w-[720px] flex-col items-center px-6 py-28 text-center sm:py-36">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          404
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
        </p>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3rem]">
          This page drifted off the map
        </h1>
        <p className="mt-5 max-w-[46ch] leading-[1.7] text-brand-slate">
          The link may be old or the page may have moved. Let&rsquo;s get you back on course —
          head home, or start your free Gold Map and we&rsquo;ll chart the marketing plan for your business.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={AUDIT_HREF}
            className="inline-flex items-center gap-2 rounded-full bg-brand-purple px-6 py-3 text-sm font-semibold text-brand-cream transition hover:bg-brand-purple/90"
          >
            Get Your Gold Map
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-brand-purple underline underline-offset-4 hover:text-brand-purple/80"
          >
            Back to homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
