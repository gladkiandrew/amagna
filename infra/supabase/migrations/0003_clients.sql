-- 0003_clients.sql
-- clients — the businesses Amagna serves (Mike's HVAC, Sarah's real estate team).
-- This is the primary tenant-data table; leads, content, and reports hang off it.

create table public.clients (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references public.organizations (id) on delete restrict,
  business_name     text not null,
  niche             niche not null,
  tier              client_tier not null,
  status            client_status not null default 'onboarding',
  -- Primary contact at the client business.
  contact_name      text,
  contact_email     text,
  contact_phone     text,
  -- Market / geography — drives niche playbooks and exclusivity checks.
  city              text,
  state             text,
  -- Monthly retainer in USD cents. Custom-tier clients may leave this null
  -- and track value through custom_solutions instead.
  monthly_retainer_cents  integer,
  -- Free-form structured config: connected accounts, brand voice pointers,
  -- Sapt client id, niche-specific settings. Shape stabilises as the portal lands.
  settings          jsonb not null default '{}'::jsonb,
  onboarded_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.clients is 'Businesses Amagna manages. Primary tenant-data table.';
comment on column public.clients.settings is 'Structured per-client config (connected accounts, Sapt id, voice pointers).';
comment on column public.clients.monthly_retainer_cents is 'Retainer in USD cents. May be null for custom-tier clients.';

create index clients_organization_id_idx on public.clients (organization_id);
create index clients_niche_idx on public.clients (niche);
create index clients_status_idx on public.clients (status);

create trigger clients_set_updated_at
  before update on public.clients
  for each row execute function public.set_updated_at();

-- Deferred FK from 0002: a client-portal user is pinned to one clients row.
alter table public.users
  add constraint users_client_id_fkey
  foreign key (client_id) references public.clients (id) on delete set null;

-- ---------------------------------------------------------------------------
-- RLS: clients
-- ---------------------------------------------------------------------------
alter table public.clients enable row level security;

-- Staff see every client in their org. A client-portal user sees only their own.
create policy clients_select_org_or_own
  on public.clients for select
  using (
    organization_id = public.current_org_id()
    and (public.is_staff() or id = public.current_client_id())
  );

-- Only staff create / edit / remove client records.
create policy clients_write_staff
  on public.clients for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
