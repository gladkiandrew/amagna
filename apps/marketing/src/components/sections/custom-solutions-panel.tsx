import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * The Custom Solutions call-to-action panel. Reused on /pricing (as the
 * fourth option beside the productized tiers) and on the /custom page.
 */
export function CustomSolutionsPanel(): JSX.Element {
  return (
    <section className="rounded-3xl bg-royal-purple px-8 py-12 sm:px-12">
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-dark-mode-gold">
            Custom solutions
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Bigger than a box? We scope it to you.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75">
            Multi-location real estate developers, home services companies running several
            Google Business Profiles, brokerages with a roster of agents — anyone who needs a
            unified system rather than a single retainer. Custom scope, custom pricing,
            custom build.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <Link
            href="/custom-quote"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-royal-purple transition-colors hover:bg-white/90"
          >
            Get a custom quote
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/custom"
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            See how custom works
          </Link>
        </div>
      </div>
    </section>
  );
}
