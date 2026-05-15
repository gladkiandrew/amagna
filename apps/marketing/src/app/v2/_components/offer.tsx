import Link from 'next/link';
import { PLANS } from '@/lib/plans';

const INCLUDED = [
  'A niche-tuned lead funnel built for your market',
  'Meta and Google ads, set up and managed weekly',
  'Five to seven posts a week across your channels, in your voice',
  'Google Business Profile + local SEO + AI search visibility',
  'Email and SMS nurture sequences, compliance handled',
  'Automated review generation after every job',
  'A weekly report in plain English — what worked, what is next',
];

/**
 * The offer — single plan, single price, single ask. Mirrors the Growth
 * tier defined in lib/plans.ts so price never drifts between surfaces.
 */
export function Offer(): JSX.Element {
  const growth = PLANS.growth;
  return (
    <section className="relative overflow-hidden bg-navy py-28 sm:py-36">
      {/* Decorative gold rule */}
      <div className="mx-auto h-px w-24 bg-gold/40" />

      <div className="mx-auto mt-12 w-full max-w-[1100px] px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-gold/80">
          The Offer
        </p>
        <h2 className="mx-auto mt-5 max-w-3xl font-serif text-[36px] leading-[1.1] text-white sm:text-5xl lg:text-[58px]">
          One plan. The whole fleet.
          <br />
          <span className="text-gold-bright">$1,497 a month.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          {growth.description} Month-to-month. One client per zip code.
        </p>

        <div className="mx-auto mt-14 max-w-2xl rounded-3xl border border-gold/20 bg-navy-deep/60 p-8 text-left sm:p-12">
          <div className="flex items-baseline justify-between gap-4 border-b border-gold/15 pb-6">
            <div>
              <p className="font-serif text-2xl text-gold-bright">{growth.name}</p>
              <p className="mt-1 text-sm text-white/60">{growth.tagline}</p>
            </div>
            <p className="font-serif text-4xl text-white sm:text-5xl">
              $1,497<span className="text-base text-white/50"> / mo</span>
            </p>
          </div>
          <ul className="mt-6 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-bright" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-2 rounded-full bg-gold-bright px-7 py-3.5 text-sm font-semibold text-navy-deep transition-colors hover:bg-gold"
            >
              Subscribe now
              <span>→</span>
            </Link>
            <Link
              href="/audit"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Not ready? Get the free audit first.
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
