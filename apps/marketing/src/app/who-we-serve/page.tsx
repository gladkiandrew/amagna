import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/sections/cta-band';
import { OG_IMAGE } from '@/lib/site';

const DESCRIPTION =
  'An Autonomous Marketing System for any operator who wants marketing that runs itself. We go deepest in two lanes — home services and real estate — and build for everyone else too.';

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
 * /who-we-serve — broad positioning: the Autonomous Marketing System serves any
 * operator who wants marketing that runs itself. Home services + real estate are
 * the two FEATURED lanes (we go deepest there; the niche funnels stay live as ad
 * landing targets), with a third "and beyond" path for everyone else. Voyage
 * visual language; never-mixed niche voice (Mike / Sarah ICPs, CLAUDE.md).
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
          For operators who&apos;d rather build than babysit their marketing.
        </h1>
        <p className="mt-7 max-w-[62ch] text-lg leading-[1.6] text-brand-slate">
          An Autonomous Marketing System works for almost any operator who wants growth
          without the busywork. Two lanes are where we go deepest — each with its own funnel,
          voice, and tuning — and we build for everyone else, too.
        </p>
      </section>

      {/* Featured lanes — the two niches we go deepest in */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[1000px] px-6 py-16 sm:py-20">
          <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Where we go deepest
          </p>
          <div className="grid gap-6 md:grid-cols-2">
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

          {/* And beyond — every other operator. */}
          <Link
            href="/custom"
            className="group mt-6 flex flex-col items-start gap-3 rounded-2xl border border-brand-charcoal/15 bg-brand-cream p-8 transition-transform duration-300 ease-voyage hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                For every other operator
              </p>
              <h2 className="mt-3 font-display text-[1.6rem] font-semibold leading-[1.15] tracking-[-0.015em] text-brand-charcoal">
                Not home services or real estate? The system still fits.
              </h2>
              <p className="mt-3 max-w-[58ch] leading-[1.7] text-brand-slate">
                The same Autonomous Marketing System adapts to most local and service
                businesses. Tell us what you run and we&apos;ll scope it to you.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple">
              Explore custom
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-voyage group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </div>
      </section>

      <CtaBand
        heading="Not sure which coast is yours?"
        subheading="Get your free audit — your gold map — and we'll show you exactly where you stand and what to do next. Or book a 20-minute call."
      />
    </main>
  );
}
