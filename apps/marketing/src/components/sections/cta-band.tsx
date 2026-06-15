import Link from 'next/link';
import { AUDIT_HREF } from '@/lib/site';

type CtaBandProps = {
  /** Headline override — defaults to the home-page closing CTA. */
  heading?: string;
  /** Supporting line under the headline. */
  subheading?: string;
  /** Button label override — still points at the Gold Map funnel (/audit). */
  ctaLabel?: string;
};

/**
 * Royal-purple closing call-to-action band. Reused at the bottom of the home
 * page and the niche / pricing pages, so the copy is overridable.
 *
 * The single CTA is the Gold Map (the qualified-lead funnel at /audit) — the
 * site-wide #1 action. Booking is intentionally not promoted here (only the
 * hero and /book offer a direct booking path).
 */
export function CtaBand({
  heading = 'Ready for more calls and more listings?',
  subheading = 'Chart your Gold Map — a free, custom plan for where you stand and exactly what to do next.',
  ctaLabel = 'Get Your Gold Map',
}: CtaBandProps): JSX.Element {
  return (
    <section className="bg-royal-purple">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-20 text-center">
        <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-white/75">
          {subheading}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={AUDIT_HREF}
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-royal-purple transition-colors hover:bg-white/90"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
