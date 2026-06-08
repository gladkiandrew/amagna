import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/sections/cta-band';
import { OG_IMAGE } from '@/lib/site';

const DESCRIPTION =
  'If your business runs on customers, our Autonomous Marketing System runs your marketing. We go deepest in home services, real estate, medical offices, ecommerce, and multi-location businesses — and adapt to almost any operator.';

export const metadata: Metadata = {
  title: 'Who We Serve',
  description: DESCRIPTION,
  alternates: { canonical: '/who-we-serve' },
  openGraph: {
    title: 'Who We Serve — Amagna AI',
    description: DESCRIPTION,
    type: 'website',
    url: '/who-we-serve',
    images: [OG_IMAGE],
  },
};

type ServeBox = {
  href: string;
  name: string;
  hook: string;
  points: string[];
  cta: string;
  accent: string;
};

/**
 * /who-we-serve — the hub. Six industry boxes; five link to dedicated landing
 * funnels (also used as paid-ad targets), the sixth is the broad/volume
 * catch-all into the Gold Map (CLAUDE.md). Card + "Chart this course →" pattern.
 */
const BOXES: ServeBox[] = [
  {
    href: '/home-services',
    name: 'Home Services',
    hook: 'Predictable, automated marketing for your service area.',
    points: [
      'Automated local lead funnels',
      'Google Business Profile + automated review requests',
      'Instant lead follow-up, run for you',
    ],
    cta: 'Chart this course',
    accent: 'border-brand-gold/40',
  },
  {
    href: '/real-estate',
    name: 'Real Estate Agents + Owners',
    hook: 'Automated marketing that keeps you top of mind.',
    points: [
      'Automated content + sphere nurture in your voice',
      'Listing-focused lead funnels',
      'One system across agents, teams, and owners',
    ],
    cta: 'Chart this course',
    accent: 'border-brand-purple/30',
  },
  {
    href: '/medical-offices',
    name: 'Medical Offices',
    hook: 'Automated patient acquisition, handled compliantly.',
    points: [
      'Automated patient acquisition campaigns',
      'Automated review + reminder workflows',
      'Patient-facing messages, always human-approved',
    ],
    cta: 'Chart this course',
    accent: 'border-brand-gold/40',
  },
  {
    href: '/ecommerce-brands',
    name: 'Ecommerce Brands',
    hook: 'Automated content and ads for your store.',
    points: [
      'Always-on ad creative for Meta, TikTok & Snapchat',
      'Managed paid acquisition campaigns',
      'Automated email & SMS flows',
    ],
    cta: 'Chart this course',
    accent: 'border-brand-purple/30',
  },
  {
    href: '/multi-location',
    name: 'Multi-Location Businesses',
    hook: 'Automated marketing across every location.',
    points: [
      'Central brand, automated marketing managed per location',
      'Listings + reviews managed across every location',
      'One automated roll-up report',
    ],
    cta: 'Chart this course',
    accent: 'border-brand-gold/40',
  },
  {
    href: '/audit',
    name: "Don't see your industry?",
    hook: 'The system adapts to almost any operator — chart a Gold Map and we’ll show you.',
    points: [
      'Built around your business, not a template',
      'Same crew, tuned to your goals',
      'A free, specific plan before you commit',
    ],
    cta: 'Chart a Gold Map',
    accent: 'border-brand-charcoal/15',
  },
];

const TOOL_LOGOS = [
  { src: '/brand/integrations/jobber.png', alt: 'Jobber' },
  { src: '/brand/integrations/hubspot.png', alt: 'HubSpot' },
  { src: '/brand/integrations/shopify.svg', alt: 'Shopify' },
  { src: '/brand/integrations/yardi.svg', alt: 'Yardi' },
  { src: '/brand/integrations/instagram.svg', alt: 'Instagram' },
  { src: '/brand/integrations/facebook.svg', alt: 'Facebook' },
  { src: '/brand/integrations/tiktok.svg', alt: 'TikTok' },
  { src: '/brand/integrations/google-calendar.svg', alt: 'Google Calendar' },
  { src: '/brand/integrations/gmail.svg', alt: 'Gmail' },
];

const CREW = [
  { name: 'Zeno', role: 'orchestrates the whole operation and keeps every agent on-strategy' },
  { name: 'Exodus', role: 'makes the content — video, posts, creative' },
  { name: 'Solon', role: 'runs outreach and keeps leads and clients warm' },
  { name: 'Hero', role: 'builds the automations that run it all' },
  { name: 'Thales', role: 'runs the paid ads across Meta, TikTok, Google, and Snapchat' },
];

export default function WhoWeServePage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* Hero statement */}
      <section className="mx-auto w-full max-w-[880px] px-6 py-20 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Who We Serve
        </p>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.4rem]">
          Who Are Our Marketing Systems Built For?
        </h1>
        <p className="mt-7 max-w-[62ch] text-lg leading-[1.6] text-brand-slate">
          If your business runs on customers, our system runs your marketing. Built for operators
          who&apos;d rather grow than babysit campaigns — here&apos;s where we go deepest.
        </p>
      </section>

      {/* Six industry boxes */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-16 sm:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BOXES.map((box) => (
              <Link
                key={box.href}
                href={box.href}
                className={`group flex flex-col rounded-2xl border ${box.accent} bg-brand-cream p-7 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)] transition-transform duration-300 ease-voyage hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2`}
              >
                <h2 className="font-display text-[1.7rem] font-semibold leading-[1.1] tracking-[-0.015em] text-brand-charcoal">
                  {box.name}
                </h2>
                <p className="mt-3 leading-[1.6] text-brand-slate">{box.hook}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {box.points.map((pt) => (
                    <li key={pt} className="flex gap-2.5 text-sm leading-[1.5] text-brand-slate">
                      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple">
                  {box.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-voyage group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How getting started works — onboarding flow */}
      <section className="border-t border-brand-gold/20 bg-brand-cream">
        <div className="mx-auto w-full max-w-[1000px] px-6 py-20 sm:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
            How it works
          </p>
          <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
            From first click to a system that runs itself.
          </h2>
          <p className="mt-4 max-w-[58ch] text-lg leading-[1.6] text-brand-slate">
            Five steps — and the first one matters most.
          </p>

          {/* Step 1 — Gold Map, the prominent step */}
          <div className="mt-10 overflow-hidden rounded-2xl border-2 border-brand-gold bg-white p-8 shadow-[0_8px_40px_-16px_rgba(176,141,87,0.45)] sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
              Step 1 · Start here
            </span>
            <h3 className="mt-4 font-display text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.015em] text-brand-charcoal">
              Chart your Gold Map
            </h3>
            <p className="mt-3 max-w-[60ch] text-base leading-[1.6] text-brand-slate">
              This is the most important step. The Gold Map is a free, custom plan that preps
              everything and makes the whole engagement sharper — the better your map, the better
              the system we build on top of it.
            </p>
            <Link
              href="/audit"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
            >
              Get Your Gold Map
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          {/* Steps 2–5 */}
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              { n: '2', title: 'Book your call', body: 'We walk the map together and answer everything.' },
              { n: '3', title: 'First monthly payment', body: 'Made after the call — it kicks off the build.' },
              { n: '4', title: 'Deployment call', body: 'Once your first payment is in, we schedule it.' },
              { n: '5', title: 'System delivered', body: 'Live within 3 business days of that first payment.' },
            ].map((step) => (
              <li
                key={step.n}
                className="flex gap-4 rounded-xl border border-brand-gold/25 bg-white px-5 py-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-charcoal/5 font-display text-base font-semibold text-brand-charcoal">
                  {step.n}
                </span>
                <span>
                  <strong className="block font-semibold text-brand-charcoal">{step.title}</strong>
                  <span className="mt-0.5 block text-sm leading-[1.5] text-brand-slate">{step.body}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The crew adapts to each client */}
      <section className="border-t border-brand-gold/20">
        <div className="mx-auto w-full max-w-[900px] px-6 py-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
            Configured for you, not one-size-fits-all
          </p>
          <h2 className="mt-4 text-balance font-display text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-charcoal sm:text-[2.6rem]">
            One crew, tuned to your business.
          </h2>
          <p className="mx-auto mt-5 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
            Your marketing is run by a crew of AI agents, configured around your industry, your
            voice, and your goals — with a human at the helm approving anything that matters.
            Captain <strong className="font-semibold text-brand-charcoal">Zeno</strong> orchestrates;
            the rest each own their lane and work in sync to produce results that compound.
          </p>
          <ul className="mx-auto mt-8 grid max-w-[640px] gap-3 text-left sm:grid-cols-2">
            {CREW.map((c) => (
              <li
                key={c.name}
                className="rounded-xl border border-brand-gold/25 bg-white px-4 py-3 text-sm leading-[1.5] text-brand-slate"
              >
                <strong className="font-semibold text-brand-charcoal">{c.name}</strong> {c.role}.
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Works with the tools you already run */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[1000px] px-6 py-20 text-center">
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
            Works with the tools you already run
          </p>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-balance font-display text-[clamp(1.9rem,4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-brand-charcoal">
            If it has a key, we can wire it in.
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-lg leading-[1.6] text-brand-slate">
            If the tools you already use have an MCP or an API, we connect to them, use them, and
            automate them — no new software to learn, your data stays where it is.
          </p>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {TOOL_LOGOS.map((logo) => (
              <li key={logo.alt} className="relative h-8 w-24">
                <Image src={logo.src} alt={logo.alt} fill className="object-contain grayscale" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        heading="Not sure which lane is yours?"
        subheading="Chart your Gold Map — a free, custom plan that shows you exactly where you stand and what to do next."
      />
    </main>
  );
}
