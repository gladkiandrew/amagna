'use client';

import { useEffect } from 'react';
import { trackSubscribe } from '@/lib/meta-pixel-events';
import { PLANS, isPlanSlug } from '@/lib/plans';

type CheckoutSuccessTrackerProps = {
  plan?: string;
};

/**
 * Fires the Meta pixel Subscribe event on /checkout/success. Picks up the
 * plan from the search params so the conversion value is reported correctly.
 */
export function CheckoutSuccessTracker({ plan }: CheckoutSuccessTrackerProps): null {
  useEffect(() => {
    if (!plan || !isPlanSlug(plan)) {
      trackSubscribe({});
      return;
    }
    const definition = PLANS[plan];
    trackSubscribe({
      plan: definition.slug,
      valueCents: definition.priceCents,
      currency: 'USD',
    });
  }, [plan]);
  return null;
}
