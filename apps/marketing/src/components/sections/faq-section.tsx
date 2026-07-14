import { Plus } from 'lucide-react';
import { SITE } from '@/lib/site';

type Faq = { q: string; a: string };

/**
 * Shared FAQ section — native <details>/<summary> disclosures (accessible,
 * keyboard-operable, no JS) plus FAQPage JSON-LD for SEO/AEO. Used on the
 * homepage and /pricing. All answers are true per CLAUDE.md/README — no invented
 * claims, no fabricated metrics.
 */
const FAQS: Faq[] = [
  {
    q: "What's an Autonomous Marketing System?",
    a: 'A crew of AI agents that runs your content, ads, follow-up, and reporting day to day — with a human approving anything that matters.',
  },
  {
    q: 'How does the Gold Map work?',
    a: 'Tell us about your business, bring a master prompt from your own AI, and we generate a free, specific plan for growing your business — then you book a call to put it in motion.',
  },
  {
    q: 'What does it cost?',
    a: 'Foundation is a one-time $1,000 build (7 business days) then $50/mo for infrastructure — the base, with no managed ads or content. Growth is $1,250/mo and Authority $2,000/mo, both plus ad spend (Authority also has metered token usage).',
  },
  {
    q: 'Are there long-term contracts?',
    a: 'Month one is the build. After your system is deployed, you commit to a 6-month minimum on your plan.',
  },
  {
    q: 'Who do you work with?',
    a: 'Any operator who wants marketing that runs itself. We go deepest in home services, real estate, medical offices, ecommerce, and multi-location businesses — but the system adapts to most.',
  },
  {
    q: 'How fast will I see results?',
    a: 'Foundations (profile, follow-up, first content/ads) go live in the first weeks; compounding results build over the following months. We review real numbers with you on the call.',
  },
  {
    q: 'Do I have to do the Gold Map to talk to you?',
    a: 'No — you can book a call directly. But charting a Gold Map first means we come to the call already prepped on your business.',
  },
  {
    q: "What's the crew / Sapt?",
    a: 'Your marketing is run by a crew of AI agents (Zeno, Exodus, Solon, Mansa, Vela) built on the Sapt platform, with us at the helm.',
  },
];

export function FaqSection({
  heading = 'Questions, answered straight',
  faqs,
}: {
  heading?: string;
  /** Override the default site FAQs (e.g. per-niche local FAQs). */
  faqs?: Faq[];
}): JSX.Element {
  const items = faqs ?? FAQS;
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto w-full max-w-[820px] px-6 py-20 sm:py-24">
        <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          FAQ
        </p>
        <h2
          id="faq-title"
          className="mt-5 font-display text-[clamp(2rem,4.4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-brand-charcoal"
        >
          {heading}
        </h2>

        <div className="mt-10 divide-y divide-brand-gold/20 border-t border-brand-gold/20">
          {items.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-brand-charcoal [&::-webkit-details-marker]:hidden">
                {faq.q}
                <Plus
                  className="h-5 w-5 shrink-0 text-brand-purple transition-transform duration-300 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="mt-3 max-w-[68ch] leading-[1.7] text-brand-slate">{faq.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-sm text-brand-slate">
          Still have a question?{' '}
          <a
            href={`mailto:${SITE.email}`}
            className="font-semibold text-brand-purple underline decoration-1 underline-offset-4 hover:text-brand-purple/80"
          >
            Email us
          </a>{' '}
          or{' '}
          <a
            href="/audit"
            className="font-semibold text-brand-purple underline decoration-1 underline-offset-4 hover:text-brand-purple/80"
          >
            chart your Gold Map
          </a>
          .
        </p>
      </div>
    </section>
  );
}
