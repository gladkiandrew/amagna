import { redirect } from 'next/navigation';

/**
 * Direct-purchase checkout is retired in favour of the Gold-Map-first strategy
 * (CLAUDE.md): every commercial CTA routes to /audit. The Stripe integration
 * (lib/plans.ts, lib/stripe.ts, /api/stripe/*) is intentionally left intact so
 * direct purchase can be re-enabled with new price IDs — until then this page
 * forwards to the Gold Map rather than charging the old, discontinued amounts.
 */
export default function CheckoutPage(): never {
  redirect('/audit');
}
