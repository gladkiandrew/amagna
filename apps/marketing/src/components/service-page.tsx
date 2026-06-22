import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/sections/cta-band';
import { FaqSection } from '@/components/sections/faq-section';
import { JsonLd } from '@/components/json-ld';
import { SITE, AUDIT_HREF, BOOK_A_CALL_HREF } from '@/lib/site';
import type { ServicePageContent } from '@/lib/service-pages';

/**
 * Shared template for the SEO keyword/service pages. Data-driven from
 * lib/service-pages.ts so every page ships the same on-page SEO + AEO surface:
 * one H1, logical H2s, a direct-answer FAQ (with FAQPage schema via FaqSection),
 * Service + BreadcrumbList JSON-LD, internal cross-links, and the Gold Map CTA.
 */
export function ServicePage({ content }: { content: ServicePageContent }): JSX.Element {
  const url = `${SITE.url}/${content.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: content.metaTitle,
    serviceType: content.serviceType,
    description: content.metaDescription,
    provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    areaServed: ['Saginaw, MI', 'Midland, MI', 'Bay City, MI', 'Great Lakes Bay Region', 'United States'],
    url,
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: content.eyebrow, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {content.h1}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{content.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={AUDIT_HREF}
            className="inline-flex items-center gap-1.5 rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
          >
            Get Your Gold Map
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={BOOK_A_CALL_HREF}
            className="rounded-full border border-royal-purple bg-transparent px-6 py-3 text-sm font-medium text-royal-purple transition-colors hover:bg-royal-purple/5"
          >
            Book a 20-minute call
          </Link>
        </div>
      </section>

      {/* What We Do */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What we do
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {content.whatWeDo.map((point, i) => (
              <div key={point.title} className="flex flex-col gap-3">
                <span className="font-mono text-sm font-medium text-antique-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            What you get
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {content.whatYouGet.map((item) => (
              <li key={item} className="flex gap-2.5 text-base leading-relaxed text-ink">
                <Check className="mt-1 h-4 w-4 shrink-0 text-antique-gold" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local signal */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
            Where we work
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-muted">{content.localSignal}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-royal-purple">
            {content.related.map((link) => (
              <Link key={link.href} href={link.href} className="hover:underline">
                {link.label} →
              </Link>
            ))}
            <Link href="/pricing" className="hover:underline">
              Pricing →
            </Link>
            <Link href="/blog" className="hover:underline">
              Field Notes →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — direct-answer Q&A + FAQPage schema (AEO) */}
      <FaqSection heading="Questions, answered straight" faqs={content.faqs} />

      <CtaBand
        heading="Ready for a system that brings the work in?"
        subheading="Chart your Gold Map — a free, custom plan for your business. You leave with a plan either way."
      />
    </>
  );
}
