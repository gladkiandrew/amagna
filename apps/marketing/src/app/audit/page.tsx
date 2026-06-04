import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/site';
import { AuditWidget } from '@/components/audit-widget';

const AUDIT_DESCRIPTION =
  'Tell us about your business and your #1 growth goal. In 60 seconds you get a custom audit, a 30-day plan, and the next step — no card required.';

export const metadata: Metadata = {
  title: 'Get your free audit',
  description: AUDIT_DESCRIPTION,
  openGraph: {
    title: 'Get your free audit — Amagna AI',
    description: AUDIT_DESCRIPTION,
    type: 'website',
    url: '/audit',
    images: [OG_IMAGE],
  },
};

/** Compact "how it works" steps — sets expectations before the form. */
const STEPS = [
  {
    n: '01',
    title: 'Tell us where you are',
    body: 'Your business, your market, and the one number you want to move.',
  },
  {
    n: '02',
    title: 'We read the water',
    body: 'A real look at your presence, your rankings, and what your competitors are doing.',
  },
  {
    n: '03',
    title: 'You get a 30-day plan',
    body: 'On screen now and emailed as a PDF. Yours to keep — run it with us or without us.',
  },
] as const;

export default function AuditPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-[820px] px-6 py-16 sm:py-24">
        {/* Eyebrow + gold rule — voyage brand treatment. */}
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Free audit
        </p>

        <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3.4rem]">
          See where you stand. Get a 30-day plan. Sixty seconds.
        </h1>

        <p className="mt-6 max-w-[58ch] text-lg leading-[1.6] text-brand-slate">
          Tell us about your business and your growth goal. You&apos;ll get a real audit of
          where you are, what&apos;s missing, and a 30-day action plan — on screen and emailed
          as a PDF. No card, no call required to get it.
        </p>

        {/* How it works — three beats, gold-numbered. */}
        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-brand-gold/25 bg-brand-gold/20 sm:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="bg-brand-cream p-6">
              <span className="font-mono text-xs font-semibold tracking-wider text-brand-gold">
                {step.n}
              </span>
              <h2 className="mt-3 text-base font-semibold text-brand-charcoal">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-slate">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <AuditWidget />
        </div>
      </section>
    </main>
  );
}
