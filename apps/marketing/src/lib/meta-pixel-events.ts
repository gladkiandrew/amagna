/**
 * Client-side helpers for firing Meta pixel custom events.
 *
 * Safe to call when the pixel isn't loaded (no-ops); never throws. Import
 * from client components only.
 */

type FbqArgs = ['track' | 'trackCustom', string, Record<string, unknown>?];

declare global {
  interface Window {
    fbq?: (...args: FbqArgs) => void;
  }
}

function fire(...args: FbqArgs): void {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq !== 'function') return;
  try {
    window.fbq(...args);
  } catch {
    // pixel script not loaded yet — swallow silently
  }
}

/** Fired when a visitor completes the /audit form successfully. */
export function trackLead(metadata?: { niche?: string | null; businessName?: string }): void {
  fire('track', 'Lead', {
    content_name: 'audit_widget',
    ...(metadata?.niche ? { content_category: metadata.niche } : {}),
    ...(metadata?.businessName ? { content_ids: [metadata.businessName] } : {}),
  });
}

/**
 * Fired when a visitor lands on /book (every "Book a call" CTA routes here, so
 * this tracks book-a-call intent). Standard `Contact` event — a top-of-funnel
 * signal, not a completed booking (the booking happens inside the Cal.com iframe).
 */
export function trackBookIntent(): void {
  fire('track', 'Contact', { content_name: 'book_a_call' });
}

/** Fired on /checkout/success — a Stripe Checkout Session completed. */
export function trackSubscribe(metadata?: {
  plan?: string;
  valueCents?: number;
  currency?: string;
}): void {
  fire('track', 'Subscribe', {
    content_name: metadata?.plan ?? 'amagna',
    value: metadata?.valueCents != null ? metadata.valueCents / 100 : undefined,
    currency: metadata?.currency ?? 'USD',
  });
}
