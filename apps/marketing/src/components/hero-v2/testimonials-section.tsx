import { Quote } from 'lucide-react';

/**
 * Homepage testimonials section — voyage visual language, three quote slots.
 *
 * IMPORTANT (CLAUDE.md): never fabricate testimonials. The slots below are
 * placeholders. To publish a real one, fill in its `quote`, `name`, and `role`
 * in the TESTIMONIALS array — a filled entry renders as a real quote card; an
 * empty entry shows the "coming soon" placeholder. That's the only edit needed.
 */
type Testimonial = {
  /** The client's exact words. Leave '' until you have a real, approved quote. */
  quote: string;
  /** Client name, e.g. 'Mike R.' */
  name: string;
  /** Role / business, e.g. 'Owner, HVAC — Saginaw, MI' */
  role: string;
  /** Optional link to the client's website (rendered on the name). */
  href?: string;
};

// ▼▼▼ REAL QUOTES ONLY — approved drafts are requested in the vault inbox
// (02-Inbox/2026-07-11 Testimonial requests). When one lands, paste it into
// `quote` and the card flips from "coming soon" to a live testimonial.
// Add each client's website to `href` to link their name. ▼▼▼
const TESTIMONIALS: Testimonial[] = [
  { quote: '', name: 'Breaking the Fast', role: 'Client — Local Service', href: '' },
  { quote: '', name: 'WRG', role: 'Client', href: '' },
  { quote: '', name: 'Sapt.AI', role: 'Partner', href: 'https://sapt.ai' },
];
// ▲▲▲ e.g. { quote: 'Our calls doubled in two months.', name: 'Breaking the Fast', role: 'Client — Local Service', href: 'https://...' }

export function TestimonialsSection(): JSX.Element {
  return (
    // Transparent surface — sits on the shared RiverCanvas; rhythm comes from
    // whitespace, not full-width rules that would slice the river.
    <section aria-labelledby="testimonials-title">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
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
          Real results from real clients — the first stories are on the way.
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
                      <p className="font-semibold text-brand-charcoal">
                        {t.href ? (
                          <a
                            href={t.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-brand-gold/50 underline-offset-4 hover:decoration-brand-gold"
                          >
                            {t.name}
                          </a>
                        ) : (
                          t.name
                        )}
                      </p>
                      <p className="text-sm text-brand-slate">{t.role}</p>
                    </figcaption>
                  </>
                ) : (
                  <>
                    <p className="mt-4 flex-1 text-lg leading-[1.6] text-brand-slate/70">
                      {t.name ? `${t.name}’s story — coming soon.` : 'Client testimonial — coming soon.'}
                    </p>
                    <div className="mt-6 border-t border-brand-gold/15 pt-4">
                      <p className="font-semibold text-brand-charcoal/80">
                        {t.href ? (
                          <a
                            href={t.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-brand-gold/50 underline-offset-4 hover:decoration-brand-gold"
                          >
                            {t.name}
                          </a>
                        ) : (
                          t.name
                        )}
                      </p>
                      <p className="text-sm text-brand-slate/70">{t.role}</p>
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
