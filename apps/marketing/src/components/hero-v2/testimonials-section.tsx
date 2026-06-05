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
};

// ▼▼▼ DROP REAL TESTIMONIALS HERE — replace the empty strings. Real quotes only. ▼▼▼
const TESTIMONIALS: Testimonial[] = [
  { quote: '', name: '', role: '' },
  { quote: '', name: '', role: '' },
  { quote: '', name: '', role: '' },
];
// ▲▲▲ e.g. { quote: 'Our calls doubled in two months.', name: 'Mike R.', role: 'Owner, HVAC — Saginaw, MI' }

export function TestimonialsSection(): JSX.Element {
  return (
    <section aria-labelledby="testimonials-title" className="border-t border-brand-gold/20 bg-brand-cream">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-24 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          In their words
        </p>
        <h2
          id="testimonials-title"
          className="mt-5 max-w-[22ch] text-balance font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal"
        >
          Proof from the operators we crew for.
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
                      <p className="font-semibold text-brand-charcoal">{t.name}</p>
                      <p className="text-sm text-brand-slate">{t.role}</p>
                    </figcaption>
                  </>
                ) : (
                  <>
                    <p className="mt-4 flex-1 text-lg leading-[1.6] text-brand-slate/70">
                      Client testimonial — coming soon.
                    </p>
                    <p className="mt-6 border-t border-brand-gold/15 pt-4 text-sm text-brand-slate/60">
                      A real client&apos;s words will land here.
                    </p>
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
