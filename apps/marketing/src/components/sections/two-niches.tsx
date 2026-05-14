import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const NICHES = [
  {
    href: '/home-services',
    eyebrow: 'Home services',
    headline: 'Predictable, owned leads — not leads resold to your competitor.',
    body: 'HVAC, plumbing, roofing, electrical, landscaping. We end the feast-or-famine cycle: a steady phone for your most profitable work, and your name on Google when someone searches.',
    cta: 'See the home services system',
  },
  {
    href: '/real-estate',
    eyebrow: 'Real estate',
    headline: 'Stay top of mind 24/7 without ever opening Canva.',
    body: 'Solo agents, teams, and small brokerages. Your AI marketing team posts, follows up, and nurtures your sphere every day — in your voice — so the listings keep coming.',
    cta: 'See the real estate system',
  },
] as const;

/** Home page — the two go-to-market niches, each linking to its funnel page. */
export function TwoNiches(): JSX.Element {
  return (
    <section id="niches" className="border-t border-black/5">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          Two niches, deep focus
        </p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          We only do two things. We do them better than anyone.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {NICHES.map((niche) => (
            <Link
              key={niche.href}
              href={niche.href}
              className="group flex flex-col rounded-2xl border border-black/5 bg-white p-8 transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal-purple">
                {niche.eyebrow}
              </p>
              <h3 className="mt-3 text-balance text-xl font-semibold leading-snug text-ink">
                {niche.headline}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{niche.body}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-royal-purple">
                {niche.cta}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
