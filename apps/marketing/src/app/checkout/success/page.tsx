import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { BOOK_A_CALL_HREF } from '@/lib/site';

export const metadata: Metadata = {
  title: 'You are in',
  description: 'Subscription started — welcome to Amagna AI.',
};

export default function CheckoutSuccessPage() {
  return (
    <section className="mx-auto w-full max-w-[640px] px-6 py-24 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-royal-purple" aria-hidden="true" />
      <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-ink">
        You are in. Welcome to Amagna.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink-muted">
        Your subscription is active. Andrew will be in touch within one business day to
        kick off onboarding — or grab a time below to lock in the kickoff call now.
      </p>
      <Link
        href={BOOK_A_CALL_HREF}
        className="mt-8 inline-block rounded-full bg-royal-purple px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90"
      >
        Book your kickoff call
      </Link>
    </section>
  );
}
