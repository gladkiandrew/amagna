import { ArrowUpRight, Quote } from 'lucide-react';

/**
 * Homepage testimonials section — voyage visual language, three quote slots.
 *
 * IMPORTANT (CLAUDE.md): never fabricate testimonials. Every filled quote
 * below is client-approved and VERBATIM — the words are locked; do not
 * reword, trim, or embellish them. A slot with an empty `quote` renders the
 * "coming soon" placeholder, so future unfilled slots still work.
 */
type Testimonial = {
  /** The client's exact approved words. Leave '' until a real quote is approved. */
  quote: string;
  /** Person's name, e.g. 'Jack Smith' */
  name: string;
  /** Role + business, e.g. 'Owner, Breaking the Fast' */
  role: string;
  /** The client's website — rendered as an external link on the attribution. */
  url?: string;
};

// ▼▼▼ REAL QUOTES ONLY — client-approved, verbatim (Andrew, 2026-07-13). ▼▼▼
// Display order (left → right): Ben → Clarence → Jack.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Amagna is one of the fastest, most progressive building companies we work with. They run their whole operation on real analytics, and as a partner they push us to be better. Watching what they ship week to week is genuinely impressive.',
    name: 'Ben Meyer',
    role: 'Co-founder, Sapt.AI',
    url: 'https://sapt.ai/',
  },
  {
    quote:
      'We’ve worked with Amagna on several projects and some of our marketing. What stands out is how fast they move and how much they care about getting it right. We believe in what Andrew is building — Amagna is the real thing.',
    name: 'Clarence Rivette',
    role: 'President, WRG',
    url: 'https://www.wrgmi.com/',
  },
  {
    quote:
      'Amagna ran our ads and automated our entire meal-prep ordering process. Orders that used to need me now handle themselves, and the growth followed.',
    name: 'Jack Smith',
    role: 'Owner, Breaking the Fast',
    url: 'https://www.breakingthefast.com/',
  },
];
// ▲▲▲ words locked — changes only with the client's re-approval ▲▲▲

export function TestimonialsSection(): JSX.Element {
  return (
    // Transparent surface — sits on the shared RiverCanvas; rhythm comes from
    // whitespace, not full-width rules that would slice the river.
    <section aria-labelledby="testimonials-title">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 sm:py-28">
        <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          In their words
        </p>
        <h2
          id="testimonials-title"
          className="mt-5 max-w-[22ch] text-balance font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal"
        >
          Proof from the operators we sail for.
        </h2>
        <p className="mt-6 max-w-[60ch] text-lg leading-[1.6] text-brand-slate">
          In their own words — the clients and partners we build with.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const filled = t.quote.trim().length > 0;
            return (
              <figure
                key={i}
                className="flex h-full flex-col rounded-2xl border border-brand-gold/25 bg-white p-7 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)]"
              >
                <Quote
                  className={`h-8 w-8 shrink-0 ${filled ? 'text-brand-gold' : 'text-brand-gold/35'}`}
                  aria-hidden
                />
                {filled ? (
                  <>
                    <blockquote className="mt-4 flex-1 text-lg leading-[1.6] text-brand-charcoal">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-6 border-t border-brand-gold/15 pt-4">
                      <p className="font-semibold text-brand-charcoal">{t.name}</p>
                      {t.url ? (
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group mt-0.5 inline-flex items-center gap-1 text-sm text-brand-slate underline decoration-brand-gold/40 underline-offset-4 transition-colors hover:text-brand-charcoal hover:decoration-brand-gold"
                        >
                          {t.role}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-brand-gold transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
                            aria-hidden
                          />
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-brand-slate">{t.role}</p>
                      )}
                    </figcaption>
                  </>
                ) : (
                  <>
                    <p className="mt-4 flex-1 text-lg leading-[1.6] text-brand-slate/70">
                      {t.name ? `${t.name}’s story — coming soon.` : 'Client testimonial — coming soon.'}
                    </p>
                    <div className="mt-6 border-t border-brand-gold/15 pt-4">
                      <p className="font-semibold text-brand-charcoal/80">{t.name}</p>
                      {t.url ? (
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 inline-flex items-center gap-1 text-sm text-brand-slate/70 underline decoration-brand-gold/40 underline-offset-4 hover:decoration-brand-gold"
                        >
                          {t.role}
                          <ArrowUpRight className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-brand-slate/70">{t.role}</p>
                      )}
                    </div>
                  </>
                )}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
