import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { PLANS, isPlanSlug, type PlanSlug } from '@/lib/plans';
import { SITE } from '@/lib/site';
import { env } from '@/lib/env';

// next-on-pages requires non-static routes to opt into the edge runtime.
export const runtime = 'edge';

/**
 * POST /api/stripe/checkout
 *
 * Body: { plan: 'growth' | 'update', email?: string }
 *
 * Creates a Stripe Checkout Session for the requested plan and returns the
 * redirect URL. Mode is per-plan: Growth is a subscription, Update is a
 * one-time payment. Returns 503 if Stripe isn't configured yet so the client
 * can render the "coming online soon" state.
 */
export async function POST(request: Request): Promise<Response> {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: 'Checkout is not configured yet — STRIPE_SECRET_KEY is unset.' },
      { status: 503 },
    );
  }

  let body: { plan?: string; email?: string };
  try {
    body = (await request.json()) as { plan?: string; email?: string };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const planSlug = body.plan;
  if (!planSlug || !isPlanSlug(planSlug)) {
    return NextResponse.json(
      { error: 'plan must be "growth" or "update".' },
      { status: 400 },
    );
  }

  const plan = PLANS[planSlug as PlanSlug];
  const priceId = env(plan.stripePriceEnvVar);
  if (!priceId) {
    return NextResponse.json(
      {
        error: `Stripe price id missing for "${planSlug}" — set ${plan.stripePriceEnvVar}.`,
      },
      { status: 503 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: body.email,
      // metadata.plan rides through to the webhook so we can record the slug.
      metadata: { plan: plan.slug },
      ...(plan.mode === 'subscription'
        ? { subscription_data: { metadata: { plan: plan.slug } } }
        : { payment_intent_data: { metadata: { plan: plan.slug } } }),
      success_url: `${SITE.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan.slug}`,
      cancel_url: `${SITE.url}/checkout?canceled=1&plan=${plan.slug}`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[stripe/checkout] session create failed', error);
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 });
  }
}
