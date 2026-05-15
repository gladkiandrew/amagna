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
import { BOOK_A_CALL_HREF, AUDIT_HREF } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'One productized retainer at $1,497/month — Amagna Growth. Update tier ($500 one-time website + GBP rebuild) and custom solutions available. Clear pricing, no long-term contracts.',
};

const GROWTH_FEATURES = [
  'A niche-tuned lead funnel built for your market',
  'Meta + Google ad campaigns, set up and managed weekly',
  'Five to seven posts a week across your channels, in your voice',
  'Google Business Profile + local SEO + AI search visibility',
  'Email + SMS nurture sequences (10DLC compliance handled)',
  'Automated review generation after every job',
  'A weekly report in plain English — what worked, what is next',
] as const;

const INCLUDED = [
  'One client per zip code — your exclusivity guarantee. We never work with your competitor.',
  'A one-time setup fee ($500–$2,000) covers onboarding and the initial build.',
  'Month-to-month. No long-term contracts.',
];

const FAQ = [
  {
    q: 'Are there long-term contracts?',
    a: 'No. Month-to-month. We earn the next month by delivering this one.',
  },
  {
    q: 'What does the setup fee cover?',
    a: 'A one-time $500–$2,000 fee covers onboarding, account connections, and building your funnel and content engine. Quoted on your discovery call based on scope.',
  },
  {
    q: 'Is ad spend included in the retainer?',
    a: 'No — ad spend is paid directly to the platforms and is separate. For accounts spending $5K+/month we add a 10% management override, agreed up front.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Funnels and content go live in the first two weeks. Lead flow and ranking compound from there — and you get a report every week so you always know where things stand.',
  },
  {
    q: 'What if I want to start smaller?',
    a: 'The Update tier ($500, one time) is a flat-rate refresh of your website and Google Business Profile — modern, on-brand, conversion-ready. It is the natural on-ramp to Growth.',
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
          One retainer. More calls, more listings, every month.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
          No hourly billing. No surprises. Month-to-month. One client per zip code.
        </p>
      </section>

      {/* Primary offer — Growth */}
      <section className="mx-auto w-full max-w-[820px] px-6 pb-10">
        <div className="relative rounded-3xl border-2 border-royal-purple bg-white p-8 shadow-sm sm:p-12">
          <span className="absolute -top-3 left-8 rounded-full bg-royal-purple px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Amagna Growth
          </span>

          <div className="grid gap-8 sm:grid-cols-[1.2fr_1fr] sm:items-center">
            <div>
              <p className="flex items-baseline gap-1">
                <span className="text-5xl font-semibold tracking-tight text-ink">$1,497</span>
                <span className="text-base text-ink-muted">/ month</span>
              </p>
              <p className="mt-3 text-base leading-relaxed text-ink-muted">
                The full system: funnel, ads, content, reviews, SEO, nurture, and a weekly
                report — built once for your business and run every day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
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
                  Book a call
                </Link>
              </div>
            </div>
            <ul className="space-y-3">
              {GROWTH_FEATURES.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-antique-gold"
                    aria-hidden="true"
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alternative tiers — secondary, deliberately smaller */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                Update
              </h2>
              <p className="text-lg font-semibold text-ink">
                $500<span className="text-xs font-normal text-ink-muted"> one-time</span>
              </p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              A flat-rate website + Google Business Profile rebuild. Modern, on-brand,
              conversion-ready. The natural on-ramp to Growth.
            </p>
            <Link
              href="/checkout"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-royal-purple"
            >
              Start an Update
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                Authority
              </h2>
              <p className="text-lg font-semibold text-ink">Talk to us</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              For larger operators — premium creative, founder-led strategy, priority support.
              Scoped to your operation.
            </p>
            <Link
              href={BOOK_A_CALL_HREF}
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-royal-purple"
            >
              Book a call
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* What every plan includes */}
        <ul className="mt-8 grid gap-4 rounded-2xl border border-black/5 bg-white p-6 sm:grid-cols-3">
          {INCLUDED.map((item) => (
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
        subheading="Get a free audit of where you stand — or book a 20-minute call. Either way you leave with a plan."
      />
    </>
  );
}
