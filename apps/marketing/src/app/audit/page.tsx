import type { Metadata } from 'next';
import { AuditWidget } from '@/components/audit-widget';

export const metadata: Metadata = {
  title: 'Get your free audit',
  description:
    'Tell us about your business and your #1 growth goal. In 60 seconds you get a custom audit, a 30-day plan, and the next step — no card required.',
};

export default function AuditPage() {
  return (
    <section className="mx-auto w-full max-w-[760px] px-6 py-16 sm:py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
        Free audit
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
        See where you stand. Get a 30-day plan. Sixty seconds.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
        Tell us about your business and your growth goal. You&apos;ll get a real audit of where
        you are, what&apos;s missing, and a 30-day action plan — delivered on screen and emailed
        as a PDF. No card needed.
      </p>

      <div className="mt-10">
        <AuditWidget />
      </div>
    </section>
  );
}
