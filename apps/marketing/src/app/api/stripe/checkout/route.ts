import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { PLANS, isPlanSlug, type PlanSlug } from '@/lib/plans';
import { SITE } from '@/lib/site';

// next-on-pages requires non-static routes to opt into the edge runtime.
export const runtime = 'edge';

/**
 * POST /api/stripe/checkout
 *
 * Body: { plan: 'growth' | 'pilot', email?: string }
 *
 * Creates a Stripe Checkout Session for the requested plan and returns the
 * redirect URL. Returns 503 if Stripe isn't configured yet so the client
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

  const plan = body.plan;
  if (!plan || !isPlanSlug(plan)) {
    return NextResponse.json(
      { error: 'plan must be "growth" or "pilot".' },
      { status: 400 },
    );
  }

  const priceId = process.env[PLANS[plan as PlanSlug].stripePriceEnvVar];
  if (!priceId) {
    return NextResponse.json(
      {
        error: `Stripe price id missing for "${plan}" — set ${PLANS[plan as PlanSlug].stripePriceEnvVar}.`,
      },
      { status: 503 },
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: body.email,
      // metadata.plan rides through to the webhook so we can record the slug.
      metadata: { plan },
      subscription_data: {
        metadata: { plan },
      },
      success_url: `${SITE.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE.url}/checkout?canceled=1&plan=${plan}`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[stripe/checkout] session create failed', error);
    return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 });
  }
}
