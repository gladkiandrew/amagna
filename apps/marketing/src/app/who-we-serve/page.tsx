import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/sections/cta-band';
import { OG_IMAGE } from '@/lib/site';

const DESCRIPTION =
  'Amagna goes deep in two niches — home-services operators and real-estate agents & teams. Pick your coast and see the system we build for it.';

export const metadata: Metadata = {
  title: 'Who We Serve',
  description: DESCRIPTION,
  openGraph: {
    title: 'Who We Serve — Amagna AI',
    description: DESCRIPTION,
    type: 'website',
    url: '/who-we-serve',
    images: [OG_IMAGE],
  },
};

/**
 * /who-we-serve — the "two coasts" landing. A hero statement, then two clear
 * niche panels that link through to the existing funnels (`/home-services`,
 * `/real-estate`), which stay live as ad landing targets. Voyage visual
 * language; never-mixed niche voice (Mike / Sarah ICPs, CLAUDE.md).
 */
const NICHES = [
  {
    href: '/home-services',
    eyebrow: 'For home-services operators',
    name: 'Home Services',
    headline: 'Own your leads. End feast or famine.',
    promise:
      'HVAC, plumbing, roofing, electrical, landscaping — a system that keeps the phone ringing through the slow months with real local calls, booked and qualified before they reach you.',
    // Rugged, earthier, heavier gold trim (per the landfall-fork spec).
    accent: 'border-brand-gold/40',
  },
  {
    href: '/real-estate',
    eyebrow: 'For real-estate agents & teams',
    name: 'Real Estate',
    headline: 'More listings. A sphere that never goes cold.',
    promise:
      'Stay top of mind with every past client and lead — automatically — so when they are ready to sell, you are the only name they call. Built for agents and teams who want listings, not busywork.',
    // Refined, cooler, finer trim.
    accent: 'border-brand-purple/30',
  },
] as const;

export default function WhoWeServePage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* Hero statement */}
      <section className="mx-auto w-full max-w-[860px] px-6 py-20 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Who We Serve
        </p>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.6rem]">
          Two coasts. We chart both — and only both.
        </h1>
        <p className="mt-7 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
          We don&apos;t serve everyone. We go deep for two kinds of operator, because
          deep beats wide: each niche gets its own funnel, its own voice, and a system
          tuned to how that business actually wins. Pick your coast.
        </p>
      </section>

      {/* Two niche panels */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto grid w-full max-w-[1000px] gap-6 px-6 py-16 sm:py-20 md:grid-cols-2">
          {NICHES.map((niche) => (
            <Link
              key={niche.href}
              href={niche.href}
              className={`group flex flex-col rounded-2xl border ${niche.accent} bg-brand-cream p-8 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)] transition-transform duration-300 ease-voyage hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                {niche.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.015em] text-brand-charcoal">
                {niche.headline}
              </h2>
              <p className="mt-4 flex-1 leading-[1.7] text-brand-slate">{niche.promise}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple">
                Chart this course
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-voyage group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        heading="Not sure which coast is yours?"
        subheading="Get your free audit — your gold map — and we'll show you exactly where you stand and what to do next. Or book a 20-minute call."
      />
    </main>
  );
}
