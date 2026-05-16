import Image from 'next/image';
import Link from 'next/link';
import { CtaBand } from '@/components/sections/cta-band';
import { BOOK_A_CALL_HREF, AUDIT_HREF } from '@/lib/site';
import type { NicheContent } from '@/lib/niches';

type NicheFunnelProps = {
  content: NicheContent;
};

/**
 * Shared funnel-page layout for both niches. Structure is identical across
 * /home-services and /real-estate; all copy and logos come from the
 * NicheContent config so the two pages never mix assets.
 */
export function NicheFunnel({ content }: NicheFunnelProps): JSX.Element {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          {content.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {content.heroHeadline}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">{content.heroSub}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={AUDIT_HREF}
            className="rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
          >
            Get your free audit
          </Link>
          <Link
            href={BOOK_A_CALL_HREF}
            className="rounded-full border border-royal-purple bg-transparent px-6 py-3 text-sm font-medium text-royal-purple transition-colors hover:bg-royal-purple/5"
          >
            Book a 20-minute call
          </Link>
        </div>
      </section>

      {/* Pains */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Sound familiar?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {content.pains.map((pain) => (
              <div key={pain.title} className="rounded-2xl border border-black/5 bg-cream p-6">
                <h3 className="text-base font-semibold text-ink">{pain.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{pain.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The system */}
      <section className="border-t border-black/5">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
            What we build
          </p>
          <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {content.systemHeading}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
            {content.systemSub}
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {content.systemPoints.map((point, i) => (
              <div key={point.title} className="flex gap-4">
                <span className="font-mono text-sm font-medium text-antique-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
          <h2 className="max-w-2xl text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Works with the tools you already run on
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
            {content.integrationsNote}
          </p>
          <ul className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
            {content.integrations.map((logo) => (
              <li key={logo.alt} className="relative h-8 w-28">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain object-left grayscale"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand heading={content.ctaHeading} subheading={content.ctaSub} />
    </>
  );
}
