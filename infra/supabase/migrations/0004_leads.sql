-- 0004_leads.sql
-- leads — prospects generated for a client through ads, outreach, or organic.
-- The product Amagna sells to home-services clients: predictable owned leads.

create table public.leads (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references public.organizations (id) on delete restrict,
  client_id         uuid not null references public.clients (id) on delete cascade,
  full_name         text,
  email             text,
  phone             text,
  source            lead_source not null default 'other',
  status            lead_status not null default 'new',
  -- Estimated job/deal value in USD cents, if known.
  value_cents       integer,
  -- Campaign / ad-set attribution and any enrichment payload.
  attribution       jsonb not null default '{}'::jsonb,
  notes             text,
  -- When the lead last moved stage — drives stale-lead alerts.
  last_activity_at  timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.leads is 'Prospects generated for a client. Core deliverable for the home-services niche.';
comment on column public.leads.attribution is 'Campaign / ad-set attribution + enrichment payload.';

create index leads_organization_id_idx on public.leads (organization_id);
create index leads_client_id_idx on public.leads (client_id);
create index leads_status_idx on public.leads (status);
create index leads_created_at_idx on public.leads (created_at desc);

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: leads
-- ---------------------------------------------------------------------------
alter table public.leads enable row level security;

-- Staff see all leads in their org; a client sees only their own leads.
create policy leads_select_org_or_own
  on public.leads for select
  using (
    organization_id = public.current_org_id()
    and (public.is_staff() or client_id = public.current_client_id())
  );

-- Only staff (and service-role server code) write leads. Public form submissions
-- are inserted server-side with the service role, never directly by anon/clients.
create policy leads_write_staff
  on public.leads for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
