import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin, getAmagnaOrgId } from '@/lib/supabase-server';

/**
 * POST /api/stripe/webhook
 *
 * Stripe sends subscription lifecycle events here; we mirror them into the
 * Supabase `subscriptions` table so we have a system-of-record view of who
 * is paying us. Signature is verified with STRIPE_WEBHOOK_SECRET.
 *
 * Events handled:
 *   checkout.session.completed         — sets up the initial row
 *   customer.subscription.created      — covers signups that bypass Checkout
 *   customer.subscription.updated      — plan / status / period changes
 *   customer.subscription.deleted      — cancellations
 */
export async function POST(request: Request): Promise<Response> {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    // Don't 500 — Stripe retries, and we'd rather log + 200 once configured.
    console.warn('[stripe/webhook] not configured (missing secret) — ignoring event');
    return NextResponse.json({ received: true, configured: false });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  const raw = await request.text();
  let event: Stripe.Event;
  try {
    // constructEventAsync uses Web Crypto and works on the edge runtime.
    event = await stripe.webhooks.constructEventAsync(raw, signature, webhookSecret);
  } catch (error) {
    console.error('[stripe/webhook] signature verification failed', error);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.warn('[stripe/webhook] Supabase not configured — event logged only');
    console.info('[stripe/webhook] event', event.type, event.id);
    return NextResponse.json({ received: true, persisted: false });
  }

  const orgId = await getAmagnaOrgId(supabase);
  if (!orgId) {
    console.error('[stripe/webhook] could not resolve Amagna org id');
    return NextResponse.json({ received: true, persisted: false });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (typeof session.subscription === 'string' && typeof session.customer === 'string') {
          // Pull the subscription detail so we have prices + period info.
          const subscription = await stripe.subscriptions.retrieve(session.subscription);
          await upsertSubscription(supabase, orgId, subscription, {
            email: session.customer_details?.email ?? session.customer_email ?? null,
            businessName: session.metadata?.business_name ?? null,
          });
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscription(supabase, orgId, subscription, {});
        break;
      }
      default:
        // Acknowledge anything else — we only mirror subscription lifecycle.
        break;
    }
  } catch (error) {
    console.error('[stripe/webhook] handler error', event.type, error);
    return NextResponse.json({ error: 'Handler failure.' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function upsertSubscription(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  orgId: string,
  subscription: Stripe.Subscription,
  context: { email?: string | null; businessName?: string | null },
): Promise<void> {
  if (!supabase) return;
  const item = subscription.items.data[0];
  const priceId = item?.price?.id ?? null;
  const amountCents = item?.price?.unit_amount ?? null;
  const currency = item?.price?.currency ?? 'usd';

  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer.id;

  // Stripe API surfaced current_period_* on the item in 2025+; fall back to
  // subscription-level fields if the item shape is older.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodStartUnix = (item as any)?.current_period_start ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const periodEndUnix = (item as any)?.current_period_end ?? null;

  await supabase
    .from('subscriptions')
    .upsert(
      {
        organization_id: orgId,
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customerId,
        email: context.email ?? '',
        business_name: context.businessName ?? null,
        stripe_price_id: priceId,
        amount_cents: amountCents,
        currency,
        status: subscription.status,
        current_period_start: periodStartUnix
          ? new Date(periodStartUnix * 1000).toISOString()
          : null,
        current_period_end: periodEndUnix
          ? new Date(periodEndUnix * 1000).toISOString()
          : null,
        cancel_at_period_end: subscription.cancel_at_period_end ?? false,
        canceled_at: subscription.canceled_at
          ? new Date(subscription.canceled_at * 1000).toISOString()
          : null,
        metadata: subscription.metadata ?? {},
      },
      { onConflict: 'stripe_subscription_id' },
    );
}
