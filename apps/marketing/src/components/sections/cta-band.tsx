import Link from 'next/link';
import { BOOK_A_CALL_HREF, AUDIT_HREF } from '@/lib/site';

type CtaBandProps = {
  /** Headline override — defaults to the home-page closing CTA. */
  heading?: string;
  /** Supporting line under the headline. */
  subheading?: string;
};

/**
 * Royal-purple closing call-to-action band. Reused at the bottom of the home
 * page and the niche / pricing pages, so the copy is overridable.
 *
 * Primary CTA is the Gold Map (the qualified-lead funnel at /audit); secondary
 * is the 20-minute call (for visitors who already know what they want).
 */
export function CtaBand({
  heading = 'Ready for more calls and more listings?',
  subheading = 'Get your Gold Map — a custom plan for where you stand and what to do next — or skip ahead and book a 20-minute call.',
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
            className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-royal-purple transition-colors hover:bg-white/90"
          >
            Get your Gold Map
          </Link>
          <Link
            href={BOOK_A_CALL_HREF}
            className="rounded-full border border-white/40 bg-transparent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Book a 20-minute call
          </Link>
        </div>
      </div>
    </section>
  );
}
