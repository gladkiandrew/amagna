import type { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CustomSolutionsPanel } from '@/components/sections/custom-solutions-panel';
import { CtaBand } from '@/components/sections/cta-band';
import { BOOK_A_CALL_HREF } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Three productized retainers — Foundation, Growth, Authority — plus a custom solutions track for larger operators. Clear pricing from Amagna AI.',
};

type Tier = {
  name: string;
  price: number;
  tagline: string;
  audience: string;
  features: string[];
  highlighted: boolean;
};

const TIERS: Tier[] = [
  {
    name: 'Foundation',
    price: 997,
    tagline: 'Get found, get called.',
    audience: 'Solo operators and single-location services.',
    features: [
      'One niche-tuned lead funnel',
      'Google Business Profile + local SEO',
      'Base outreach and lead follow-up',
      'Automated review generation',
      'Monthly performance report',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: 1497,
    tagline: 'Become the obvious choice in your market.',
    audience: 'Established operators, 5–25 employees.',
    features: [
      'Everything in Foundation',
      'Multi-channel content — 5–7 posts/week in your voice',
      'Dedicated agent fleet: outreach, content, reporting',
      'Email + SMS nurture sequences',
      'Weekly plain-English reports',
    ],
    highlighted: true,
  },
  {
    name: 'Authority',
    price: 2497,
    tagline: 'Build an empire.',
    audience: 'Top players and multi-location operators.',
    features: [
      'Everything in Growth',
      'Premium creative and custom builds',
      'Full reputation management',
      'Monthly founder-led strategy call',
      'Priority support',
    ],
    highlighted: false,
  },
];

const INCLUDED = [
  'One client per zip code — your exclusivity guarantee. We never work with your competitor.',
  'A one-time setup fee ($500–$2,000) covers onboarding and the initial build.',
  'Fulfillment runs on the Sapt platform with the Amagna agent layer wrapped around it.',
];

const FAQ = [
  {
    q: 'Are there long-term contracts?',
    a: 'No. Retainers are month to month. We earn the next month by delivering this one.',
  },
  {
    q: 'What does the setup fee cover?',
    a: 'A one-time $500–$2,000 fee covers onboarding, account connections, and building your funnel and content engine. It is quoted on your discovery call based on scope.',
  },
  {
    q: 'Is ad spend included in the retainer?',
    a: 'No — ad spend is paid directly to the platforms and is separate from the retainer. For accounts spending $5K+/month we add a 10% management override, agreed up front.',
  },
  {
    q: 'What if I am bigger than these tiers?',
    a: 'That is what the custom solutions track is for — multi-location operators, multiple Google Business Profiles, brokerages with several agents. Custom scope, custom pricing. Request a quote and the founder reviews it directly.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Funnels and content go live in the first few weeks. Lead flow and ranking compound from there — and you get a report every week so you always know where things stand.',
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          Pricing
        </p>
        <h1 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Productized retainers. No hourly billing, no surprises.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
          Pick the tier that fits where your business is now. Move up when you are ready —
          or get a custom quote if you have outgrown the boxes.
        </p>
      </section>

      {/* Tiers */}
      <section className="mx-auto w-full max-w-[1100px] px-6 pb-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={
                tier.highlighted
                  ? 'relative rounded-3xl border-2 border-royal-purple bg-white p-8 shadow-sm'
                  : 'relative rounded-3xl border border-black/5 bg-white p-8'
              }
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-8 rounded-full bg-royal-purple px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h2 className="text-lg font-semibold text-ink">{tier.name}</h2>
              <p className="mt-1 text-sm text-ink-muted">{tier.tagline}</p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-ink">
                  ${tier.price.toLocaleString()}
                </span>
                <span className="text-sm text-ink-muted">/ month</span>
              </p>
              <p className="mt-2 text-sm text-ink-muted">{tier.audience}</p>
              <Link
                href={BOOK_A_CALL_HREF}
                className={
                  tier.highlighted
                    ? 'mt-6 block rounded-full bg-royal-purple px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90'
                    : 'mt-6 block rounded-full border border-royal-purple px-5 py-3 text-center text-sm font-semibold text-royal-purple transition-colors hover:bg-royal-purple/5'
                }
              >
                Book a call
              </Link>
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm text-ink-muted">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-antique-gold"
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* What every plan includes */}
        <ul className="mt-10 grid gap-4 rounded-2xl border border-black/5 bg-white p-6 sm:grid-cols-3">
          {INCLUDED.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-ink-muted">
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
        heading="Not sure which tier fits?"
        subheading="Book a call. We will look at your business and tell you straight which plan makes sense — or whether you are a custom job."
      />
    </>
  );
}
