'use client';

import { useState } from 'react';
import type { PlanSlug } from '@/lib/plans';

type CheckoutButtonsProps = {
  plan: PlanSlug;
  highlighted?: boolean;
  /** Override the default "Subscribe" label (e.g. "Buy the Update" for one-time). */
  label?: string;
};

/**
 * "Subscribe" button — POSTs to /api/stripe/checkout and redirects to the
 * Stripe-hosted Checkout page. Until the Stripe env is wired, the API
 * returns 503 and we surface a friendly "coming online soon" note.
 */
export function CheckoutButtons({
  plan,
  highlighted = false,
  label = 'Subscribe',
}: CheckoutButtonsProps): JSX.Element {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start(): Promise<void> {
    setPending(true);
    setError(null);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setError(
        data.error ??
          'Checkout is coming online shortly — book a call and we will send a link.',
      );
    } catch {
      setError('Something went wrong starting checkout. Please email andrew@amagna.co.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={pending}
        className={
          highlighted
            ? 'w-full rounded-full bg-royal-purple px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-royal-purple/90 disabled:opacity-60'
            : 'w-full rounded-full border border-royal-purple px-5 py-3 text-sm font-semibold text-royal-purple transition-colors hover:bg-royal-purple/5 disabled:opacity-60'
        }
      >
        {pending ? 'Opening checkout…' : label}
      </button>
      {error && <p className="mt-3 text-xs text-ink-muted">{error}</p>}
    </div>
  );
}
