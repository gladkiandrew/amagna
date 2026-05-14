import type { Metadata } from 'next';
import { CustomQuoteForm } from '@/components/custom-quote-form';

export const metadata: Metadata = {
  title: 'Get a custom quote',
  description:
    'Tell us about your operation — company size, locations, current spend, and your goal. Andrew reviews every custom inquiry personally and replies within one business day.',
};

export default function CustomQuotePage() {
  return (
    <section className="mx-auto w-full max-w-[760px] px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
        Custom solutions
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Tell us what you are working with
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
        A few questions about your operation. The more you tell us, the sharper the scope —
        and the founder gets back to you within one business day with a plan and a number.
      </p>

      <div className="mt-10">
        <CustomQuoteForm />
      </div>
    </section>
  );
}
