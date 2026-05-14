import Link from 'next/link';
import { BOOK_A_CALL_HREF } from '@/lib/site';

type CtaBandProps = {
  /** Headline override — defaults to the home-page closing CTA. */
  heading?: string;
  /** Supporting line under the headline. */
  subheading?: string;
};

/**
 * Royal-purple closing call-to-action band. Reused at the bottom of the home
 * page and the niche / pricing pages, so the copy is overridable.
 */
export function CtaBand({
  heading = 'Ready for leads you actually own?',
  subheading = 'Book a 20-minute call. We will look at your market, tell you what we would do, and you decide from there. No pitch deck.',
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
        <Link
          href={BOOK_A_CALL_HREF}
          className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-royal-purple transition-colors hover:bg-white/90"
        >
          Book a call
        </Link>
      </div>
    </section>
  );
}
