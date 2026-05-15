import type { Metadata } from 'next';
import { CheckoutButtons } from '@/components/checkout-buttons';
import { PLANS } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Start your subscription',
  description: 'Subscribe to Amagna AI. Month-to-month, no long-term contracts.',
};

export default function CheckoutPage() {
  return (
    <section className="mx-auto w-full max-w-[760px] px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
        Start your subscription
      </p>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Pick your plan
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
        Month-to-month, no long-term contracts. We earn the next month by delivering this
        one.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <PlanCard plan={PLANS.growth} highlighted />
        <PlanCard plan={PLANS.pilot} />
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  highlighted = false,
}: {
  plan: (typeof PLANS)[keyof typeof PLANS];
  highlighted?: boolean;
}): JSX.Element {
  return (
    <div
      className={
        highlighted
          ? 'rounded-2xl border-2 border-royal-purple bg-white p-6 shadow-sm'
          : 'rounded-2xl border border-black/5 bg-white p-6'
      }
    >
      <h2 className="text-lg font-semibold text-ink">{plan.name}</h2>
      <p className="mt-1 text-sm text-ink-muted">{plan.tagline}</p>
      <p className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-ink">
          ${(plan.priceCents / 100).toLocaleString()}
        </span>
        <span className="text-sm text-ink-muted">/ month</span>
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{plan.description}</p>
      <div className="mt-5">
        <CheckoutButtons plan={plan.slug} highlighted={highlighted} />
      </div>
    </div>
  );
}
