import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/sections/cta-band';
import { OG_IMAGE } from '@/lib/site';

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

const POINTS = [
  {
    name: 'On-site discovery',
    body: 'We come to you and map exactly how your business runs — the workflows, the tools, the handoffs — before a single thing is built.',
  },
  {
    name: 'Bespoke build, not a template',
    body: 'Custom AI across marketing, outreach, retention, content, and operations — engineered for your business, not configured from a preset.',
  },
  {
    name: 'Security + memory layer',
    body: 'Mansa, our memory & security specialist, protects your data and IP and gives your AI a true memory of your business — what makes a bespoke install safe to trust.',
  },
  {
    name: 'Custom pricing',
    body: 'Scoped to your business, not a fixed tier — a one-time build, then a low monthly retainer to run and maintain it.',
  },
] as const;

export default function CustomAiInstallsPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      {/* Hero */}
      <section className="mx-auto w-full max-w-[880px] px-6 py-20 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Beyond marketing · Full-stack automation
        </p>
        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.4rem]">
          Custom AI, Installed In Person.
        </h1>
        <p className="mt-7 max-w-[62ch] text-lg leading-[1.6] text-brand-slate">
          We build and install custom, full-stack AI for your business — in person. We map your
          operations on-site, then build bespoke AI across marketing, outreach, retention, content,
          and automation, tailored to exactly how you work.
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

      {/* What's different */}
      <section className="border-t border-brand-gold/20 bg-white">
        <div className="mx-auto w-full max-w-[1100px] px-6 py-20 sm:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
            <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
            What a custom install is
          </p>
          <h2 className="mt-5 max-w-[24ch] text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal">
            Your whole business, not just your marketing.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {POINTS.map((point) => (
              <div
                key={point.name}
                className="rounded-2xl border border-brand-gold/30 bg-brand-cream p-7 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)]"
              >
                <h3 className="font-display text-xl font-semibold text-brand-charcoal">
                  {point.name}
                </h3>
                <p className="mt-3 leading-[1.6] text-brand-slate">{point.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing model */}
      <section className="border-t border-brand-gold/20 bg-brand-deep">
        <div className="mx-auto w-full max-w-[860px] px-6 py-20 sm:py-24">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-warmgold">
            <span aria-hidden className="h-px w-7 bg-brand-warmgold/60" />
            How custom pricing works
          </p>
          <h2 className="mt-5 text-balance font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-cream">
            Built once, run for a low monthly retainer.
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg leading-[1.7] text-brand-cream/80">
            Every install is scoped to the business — there&apos;s no fixed tier. The shape is the
            same:
          </p>
          <ul className="mt-8 space-y-4">
            {[
              {
                k: 'A one-time build fee, up front',
                v: 'The bespoke build — discovery, design, and installation of your custom AI system. Scoped to what your business needs.',
              },
              {
                k: 'A low monthly retainer — $250–$500/mo',
                v: "To run, maintain, and keep improving the system after it's live.",
              },
              {
                k: 'Plus pass-through expenses',
                v: 'Ad spend, API / token usage, and any third-party tools — billed at cost, paid to the providers.',
              },
            ].map((row) => (
              <li
                key={row.k}
                className="flex gap-4 rounded-xl border border-brand-warmgold/30 bg-white/[0.04] px-5 py-4"
              >
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-warmgold" />
                <span>
                  <strong className="block font-semibold text-brand-cream">{row.k}</strong>
                  <span className="mt-1 block text-sm leading-[1.6] text-brand-cream/70">{row.v}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-[60ch] text-sm leading-[1.7] text-brand-cream/60">
            We&apos;ll scope your exact numbers on the call. Start by requesting a custom quote — the
            Gold Map preps everything so the build is sharp from day one.
          </p>
        </div>
      </section>

      <CtaBand
        heading="Ready for a custom AI install?"
        subheading="Request a custom quote — we'll map your operations and scope a full-stack AI system built for exactly how you work."
        ctaLabel="Request a Custom Quote"
      />
    </main>
  );
}
