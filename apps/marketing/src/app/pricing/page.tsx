import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CustomSolutionsPanel } from '@/components/sections/custom-solutions-panel';
import { CtaBand } from '@/components/sections/cta-band';
import { AUDIT_HREF, OG_IMAGE } from '@/lib/site';

const PRICING_DESCRIPTION =
  'AI marketing agency pricing: Foundation is a one-time $1,000 build (7 business days) then $50/mo; Growth is $1,250/mo; Authority is $2,000/mo — all plus ad spend paid directly to the platforms. No separate setup fee. Get your free Gold Map.';

// AEO: structured pricing so answer engines can cite concrete numbers for
// "how much does an AI marketing agency cost". Real numbers only (CLAUDE.md canon).
const PRICING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Amagna AI — Autonomous Marketing System plans',
  url: 'https://amagna.co/pricing',
  itemListElement: [
    {
      '@type': 'Offer',
      name: 'Foundation',
      description: 'One-time build of the marketing infrastructure base (branding, website, Google Business Profile + base local SEO, dashboard), then $50/mo for infrastructure. No managed ads or content.',
      priceCurrency: 'USD',
      price: '1000',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1000',
        priceCurrency: 'USD',
        description: 'One-time build, then $50/mo infrastructure',
      },
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      description: 'The full done-for-you marketing machine run by the AI crew: niche funnel, managed Meta/TikTok/Google/Snapchat ads, AI video, GBP + local SEO + AEO, automated reviews, weekly report. Plus ad spend, paid to the platforms.',
      priceCurrency: 'USD',
      price: '1250',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1250',
        priceCurrency: 'USD',
        unitText: 'MONTH',
        billingIncrement: 1,
      },
    },
    {
      '@type': 'Offer',
      name: 'Authority',
      description: 'Everything in Growth plus full business automation: custom AI agents and workflows, 2 managed ad campaigns, founder-led strategy. Plus ad spend and metered token usage.',
      priceCurrency: 'USD',
      price: '2000',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '2000',
        priceCurrency: 'USD',
        unitText: 'MONTH',
        billingIncrement: 1,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'Pricing',
  description: PRICING_DESCRIPTION,
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — Amagna AI',
    description: PRICING_DESCRIPTION,
    type: 'website',
    url: '/pricing',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — Amagna AI',
    description: PRICING_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

type Tier = {
  name: string;
  price: string;
  cadence: string;
  /** Sub-price lines shown under the headline price (e.g. "+ Ad Spend"). */
  subLines: string[];
  tagline: string;
  features: string[];
  /** Plain-language note about what the tier deliberately does not include. */
  excludes?: string;
  /** Commitment note shown small in the card body (Growth / Authority). */
  commitment?: string;
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Foundation',
    price: '$1,000',
    cadence: 'one-time',
    subLines: ['7-business-day build', 'then $50/mo for infrastructure'],
    tagline: 'The infrastructure base, built for you.',
    features: [
      'Complete branding kit',
      'Conversion-ready website (modern, on-brand)',
      'Google Business Profile setup + base local SEO',
      'Access to the Amagna system / dashboard',
      '2 free revisions',
      'A live build session (FaceTime / Google Meet) with the founder while we build it',
    ],
    excludes: 'Infrastructure base only — no managed ads, no content generation, no AI agents.',
  },
  {
    name: 'Growth',
    price: '$1,250',
    cadence: '/mo',
    subLines: ['+ Ad Spend'],
    tagline: 'The full system, run by the crew.',
    features: [
      'Niche-tuned lead funnel',
      'Meta, TikTok, Google & Snapchat ad campaigns, managed weekly — 5 ad sets, 1 creative per ad set, rendered in every dimension to fit all placements and ad types',
      'AI video creation for ads / reels / shorts',
      'Google Business Profile + local SEO + AI search visibility (AEO)',
      'Automated review generation after every job',
      'Weekly plain-English report',
    ],
    commitment: '6-month commitment at this rate — price reduces after your commitment period.',
    highlighted: true,
  },
  {
    name: 'Authority',
    price: '$2,000',
    cadence: '/mo',
    subLines: ['+ Ad Spend', '+ token usage'],
    tagline: 'Everything in Growth, plus — mainly focused on automating your whole business.',
    features: [
      'Custom AI Agents + Workflows built for your business (the core focus)',
      '2 managed ad campaigns',
      'Founder-led strategy + priority support',
      'Metered token usage, billed monthly — visible in your admin profile',
    ],
    commitment: '6-month commitment at this rate — price reduces after your commitment period.',
  },
];

const FAQ = [
  {
    q: 'Is there a contract?',
    a: 'Growth and Authority plans require a 6-month commitment at the listed rate. After your commitment period, your rate reduces. No hidden fees — ad spend is always separate and paid directly to the platforms.',
  },
  {
    q: 'Is ad spend included in the retainer?',
    a: 'No. Ad spend is paid directly to the platforms and is separate.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Your system is set up within 3 business days, and we run an initial feedback call any time after the first 48 hours — on your schedule.',
  },
  {
    q: 'What does month one cover?',
    a: 'The build: branding, your site and profiles, and full system + campaign setup.',
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_SCHEMA) }}
      />
      {/* Header */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          Pricing
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Three plans. One system that runs your marketing.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
          No hourly billing, no surprises. Month one is the build — then a 6-month minimum
          once your system is live.
        </p>
      </section>

      {/* Three equal tiers */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-6">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.highlighted
                  ? 'relative flex flex-col rounded-3xl border-2 border-royal-purple bg-white p-8 shadow-md transition-transform duration-300 hover:-translate-y-1'
                  : 'relative flex flex-col rounded-3xl border border-black/5 bg-white p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1'
              }
            >
              {tier.highlighted ? (
                <span className="absolute -top-3 left-8 rounded-full bg-royal-purple px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Most popular
                </span>
              ) : null}

              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                {tier.name}
              </h2>

              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-ink">{tier.price}</span>
                <span className="text-base text-ink-muted">{tier.cadence}</span>
              </p>
              <div className="mt-1 space-y-0.5">
                {tier.subLines.map((line) => (
                  <p key={line} className="text-sm font-medium text-royal-purple">
                    {line}
                  </p>
                ))}
              </div>

              <p className="mt-4 text-base leading-relaxed text-ink-muted">{tier.tagline}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-antique-gold"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.excludes ? (
                <p className="mt-4 text-xs leading-relaxed text-ink-muted">{tier.excludes}</p>
              ) : null}

              {tier.commitment ? (
                <p className="mt-3 text-xs font-medium leading-relaxed text-royal-purple/80">
                  {tier.commitment}
                </p>
              ) : null}

              <div className="mt-7">
                <Link
                  href={AUDIT_HREF}
                  className={
                    tier.highlighted
                      ? 'inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90'
                      : 'inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-royal-purple px-6 py-3 text-sm font-semibold text-royal-purple transition-colors hover:bg-royal-purple/5'
                  }
                >
                  Get Your Gold Map
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Ad spend / token explainer — visible, not fine print */}
        <p className="mx-auto mt-6 max-w-[64ch] text-center text-sm leading-relaxed text-ink-muted">
          Ad spend is paid directly to the platforms — plan for roughly $25/day minimum to run
          campaigns. Authority adds metered token usage, billed monthly and visible anytime in
          your admin profile.
        </p>

        {/* How billing works */}
        <ul className="mt-8 grid gap-4 rounded-2xl border border-black/5 bg-white p-6 sm:grid-cols-3">
          {[
            'Month one is the build — branding, your site and profiles, and full system + campaign setup.',
            'Once your system is deployed and you are up and running, you commit to a 6-month minimum on your plan.',
            'Ad spend is paid directly to the platforms and is separate from your plan.',
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-antique-gold" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Custom solutions */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-12">
        <CustomSolutionsPanel />
      </section>

      {/* FAQ */}
      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-[760px] px-6 py-20">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Questions, answered straight
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            {FAQ.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-base font-medium text-ink">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-ink-muted">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <CtaBand
        heading="Not sure if it is a fit?"
        subheading="Chart your Gold Map — a free, custom plan for where you stand and what to do next. You leave with a plan either way."
      />
    </>
  );
}
