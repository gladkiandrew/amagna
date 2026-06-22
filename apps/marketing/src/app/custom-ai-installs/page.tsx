import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/sections/cta-band';
import { OG_IMAGE } from '@/lib/site';

// Meta, canonical, and OG are intentionally preserved (per brief).
const DESCRIPTION =
  'Beyond marketing: Amagna builds and installs custom, full-stack AI for your business in person across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — mapped on-site, built bespoke across marketing, outreach, retention, content, and operations, with a security + memory layer so your data and IP stay yours.';

export const metadata: Metadata = {
  title: 'Custom AI Installs · Full-Stack Automation',
  description: DESCRIPTION,
  alternates: { canonical: '/custom-ai-installs' },
  openGraph: {
    title: 'Custom AI Installs — Amagna AI',
    description: DESCRIPTION,
    type: 'website',
    url: '/custom-ai-installs',
    images: [OG_IMAGE],
  },
};

const STEPS = [
  {
    title: 'Discovery Call',
    body: "We learn your business before we touch anything. What you sell, how you close, what's breaking, and what you want automated.",
  },
  {
    title: 'On-Site Mapping',
    body: 'We come to you and document your real workflows — the tools, the handoffs, the gaps. Nothing is assumed.',
  },
  {
    title: 'Bespoke Build',
    body: 'We build your custom AI system — agents, automations, and workflows scoped to exactly what your business needs. No templates, no presets.',
  },
  {
    title: 'Install + Train',
    body: "We put it in place and make sure your team knows how to use it. You don't need to be technical. We handle the handoff.",
  },
  {
    title: 'Ongoing Maintenance',
    body: 'We run it, improve it, and keep it sharp as your business evolves. This is what the monthly retainer covers.',
  },
] as const;

const BUILDS = [
  {
    name: 'Automated Client Intake + Booking',
    body: 'Capture leads and book jobs automatically — without anyone picking up the phone.',
  },
  {
    name: 'Follow-Up + Review Sequences',
    body: 'Automated follow-ups that match how your team talks. Review requests sent at the right moment, every time.',
  },
  {
    name: 'Content Systems Built On Your Voice',
    body: 'AI that knows your brand, your market, and your past work — and generates content that actually sounds like you.',
  },
  {
    name: 'Lead Qualification + Outreach',
    body: 'Outreach that runs on its own, qualifies leads before they hit your calendar, and hands off the warm ones.',
  },
  {
    name: 'Reporting + Ops Dashboards',
    body: 'See what’s working. Know your numbers. No spreadsheets.',
  },
  {
    name: 'Whatever Your Business Needs',
    body: 'These are examples — the real list gets built on the call.',
  },
] as const;

const PRICING = [
  {
    k: 'One-Time Build Fee',
    v: 'The bespoke build — discovery, design, and installation of your custom AI system. Scoped and quoted on the call.',
  },
  {
    k: 'Monthly Retainer: $500–$1,500/mo',
    v: "To run, maintain, and keep improving the system after it's live. Exact amount depends on scope and how frequently your system needs updates.",
  },
  {
    k: 'Pass-Through Expenses',
    v: 'Ad spend, API and token usage, and any third-party tools — billed at cost, paid directly to the providers. Visible in your admin profile.',
  },
] as const;

export default function CustomAiInstallsPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* SECTION 1 — HERO */}
      <section className="mx-auto w-full max-w-[880px] px-6 py-20 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Custom AI Installs
        </p>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.4rem]">
          Custom AI, Installed For Your Business.
        </h1>
        <p className="mt-7 max-w-[62ch] text-lg leading-[1.6] text-brand-slate">
          Most AI tools are generic. They don&apos;t know your industry, your clients, your voice, or
          how your team runs. We fix that — by building and installing AI that is custom to exactly
          how you work.
        </p>
        <div className="mt-9">
          <Link
            href="/audit"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-purple px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2"
          >
            Request a Custom Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* SECTION 2 — THE PROBLEM (pull-quote callout) */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[860px] px-6 py-16 sm:py-20">
          <blockquote className="border-l-2 border-brand-gold pl-6 sm:pl-8">
            <p className="text-balance font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-semibold leading-[1.25] tracking-[-0.01em] text-brand-charcoal">
              Off-the-shelf AI doesn&apos;t know your business. It doesn&apos;t know your clients, your
              crew, your market, or how you close jobs. That&apos;s why it doesn&apos;t stick — and why
              we build from scratch.
            </p>
          </blockquote>
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS (numbered vertical step flow) */}
      <section className="border-t border-brand-gold/20 bg-brand-cream">
        <div className="mx-auto w-full max-w-[920px] px-6 py-20 sm:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
            How It Works
          </p>
          <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
            Five steps from first call to a running system.
          </h2>
          <ol className="mt-12 space-y-px">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="flex gap-5 border-t border-brand-gold/20 py-7 first:border-t-0 sm:gap-7"
              >
                <span
                  aria-hidden
                  className="font-display text-2xl font-semibold leading-none text-brand-gold sm:text-3xl"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-brand-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[60ch] leading-[1.6] text-brand-slate">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 4 — WHAT GETS BUILT (grid of cards) */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
            What Gets Built
          </p>
          <h2 className="mt-5 max-w-[26ch] text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
            Scoped to your business on the call — here&apos;s what we typically build.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BUILDS.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-brand-gold/30 bg-brand-cream p-7 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)]"
              >
                <h3 className="font-display text-lg font-semibold leading-snug text-brand-charcoal">
                  {item.name}
                </h3>
                <p className="mt-3 leading-[1.6] text-brand-slate">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — MAKING YOUR AI SMARTER (key differentiator, heavy weight) */}
      <section className="border-t border-brand-gold/20 bg-brand-deep">
        <div className="mx-auto w-full max-w-[900px] px-6 py-24 sm:py-28">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold">
            <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
            The difference
          </p>
          <h2 className="mt-5 text-balance font-display text-[clamp(2.2rem,5.2vw,3.6rem)] font-semibold leading-[1.04] tracking-[-0.02em] text-brand-cream">
            An AI That Gets Smarter Every Month.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-[1.7] text-brand-cream/85 sm:text-xl">
            <p>
              Your custom install doesn&apos;t stay static. Every month, we update it with new context
              — new services, new markets, seasonal changes, what&apos;s working in your ads, what your
              clients are asking. The AI learns your business over time. That&apos;s what the retainer
              actually means.
            </p>
            <p>
              Most agencies set it and forget it. We treat your AI like a system that compounds. The
              longer it runs, the sharper it gets — and the more of your business it can handle on its
              own.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PRICING */}
      <section className="border-t border-brand-gold/20 bg-brand-cream">
        <div className="mx-auto w-full max-w-[900px] px-6 py-20 sm:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
            How Pricing Works
          </p>
          <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
            Scoped to your business. No surprises.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PRICING.map((row) => (
              <div
                key={row.k}
                className="flex flex-col rounded-2xl border border-brand-gold/30 bg-white p-7 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.2)]"
              >
                <h3 className="font-display text-lg font-semibold leading-snug text-brand-charcoal">
                  {row.k}
                </h3>
                <p className="mt-3 flex-1 leading-[1.6] text-brand-slate">{row.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-[60ch] text-sm leading-[1.7] text-brand-slate/80">
            We scope your exact numbers on the call. No fixed tiers — every install is different.
          </p>
        </div>
      </section>

      {/* SECTION 7 — CLOSING CTA */}
      <CtaBand
        heading="Ready for a custom AI install?"
        subheading="Request a custom quote — we'll map your operations and scope a full-stack AI system built for exactly how you work."
        ctaLabel="Request a Custom Quote"
      />
    </main>
  );
}
