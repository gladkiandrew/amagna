-- 0011_subscriptions.sql
-- Stripe subscription mirror — populated by the /api/stripe/webhook handler
-- so we have a system-of-record view of who is paying us, independent of Stripe.

create table public.subscriptions (
  id                      uuid primary key default gen_random_uuid(),
  organization_id         uuid not null references public.organizations (id) on delete restrict,
  -- Optional link to a managed client once onboarded.
  client_id               uuid references public.clients (id) on delete set null,
  -- Stripe identifiers — sub_id is the join key the webhook upserts on.
  stripe_subscription_id  text not null unique,
  stripe_customer_id      text not null,
  -- Snapshot of the customer's contact info at signup.
  email                   text not null,
  business_name           text,
  -- Pricing snapshot.
  stripe_price_id         text,
  amount_cents            integer,
  currency                text default 'usd',
  -- Stripe subscription status: incomplete, trialing, active, past_due, canceled, unpaid.
  status                  text not null,
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean not null default false,
  canceled_at             timestamptz,
  -- Last raw event payload + the full subscription object for debugging.
  metadata                jsonb not null default '{}'::jsonb,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

comment on table public.subscriptions is 'Stripe subscription mirror — written by the webhook receiver. System-of-record for paying clients.';
comment on column public.subscriptions.client_id is 'Linked once the subscriber is onboarded as a managed client.';
comment on column public.subscriptions.status is 'Stripe status: incomplete, trialing, active, past_due, canceled, unpaid.';

create index subscriptions_organization_id_idx on public.subscriptions (organization_id);
create index subscriptions_client_id_idx on public.subscriptions (client_id);
create index subscriptions_email_idx on public.subscriptions (email);
create index subscriptions_status_idx on public.subscriptions (status);

create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: subscriptions
-- ---------------------------------------------------------------------------
alter table public.subscriptions enable row level security;

-- Staff-only. Stripe webhooks insert/update via the service role.
create policy subscriptions_select_staff
  on public.subscriptions for select
  using (organization_id = public.current_org_id() and public.is_staff());

create policy subscriptions_write_staff
  on public.subscriptions for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
