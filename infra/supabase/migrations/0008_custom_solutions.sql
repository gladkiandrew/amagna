-- 0008_custom_solutions.sql
-- custom_solutions — engagements that don't fit the productized tiers:
-- multi-location real estate developers, home-services companies with multiple
-- GBPs, brokerages with several agents. Custom scoping, custom pricing, founder-
-- approved. Kept separate from clients because the pipeline and economics differ.
--
-- A custom_solution starts as an inquiry from /custom-quote. If it converts, it
-- may also get a clients row for fulfilment — linked via client_id.

create table public.custom_solutions (
  id                  uuid primary key default gen_random_uuid(),
  organization_id     uuid not null references public.organizations (id) on delete restrict,
  -- Set once the engagement converts and a managed-client record is created.
  client_id           uuid references public.clients (id) on delete set null,
  stage               custom_solution_stage not null default 'inquiry',
  -- Prospect / company.
  company_name        text not null,
  contact_name        text,
  contact_email       text,
  contact_phone       text,
  niche               niche,
  -- Intake answers from /custom-quote.
  company_size        text,
  locations_count     integer,
  current_spend_cents integer,
  primary_goal        text,
  intake_notes        text,
  -- Scoping + quote (founder-owned).
  scope_draft         text,
  quoted_amount_cents integer,
  -- Free-form structured detail as the engagement evolves.
  details             jsonb not null default '{}'::jsonb,
  -- Who on staff owns this engagement.
  owner_user_id       uuid references public.users (id) on delete set null,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

comment on table public.custom_solutions is 'Custom-quote engagements — custom scoping/pricing, founder-approved. Separate pipeline from managed clients.';
comment on column public.custom_solutions.client_id is 'Set once the engagement converts and gets a managed-client record.';
comment on column public.custom_solutions.quoted_amount_cents is 'Founder-approved quote in USD cents.';

create index custom_solutions_organization_id_idx on public.custom_solutions (organization_id);
create index custom_solutions_stage_idx on public.custom_solutions (stage);
create index custom_solutions_client_id_idx on public.custom_solutions (client_id);
create index custom_solutions_created_at_idx on public.custom_solutions (created_at desc);

create trigger custom_solutions_set_updated_at
  before update on public.custom_solutions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: custom_solutions
-- ---------------------------------------------------------------------------
alter table public.custom_solutions enable row level security;

-- Staff-only. The custom pipeline is internal to Amagna; prospects interact
-- through forms, not the portal.
create policy custom_solutions_select_staff
  on public.custom_solutions for select
  using (organization_id = public.current_org_id() and public.is_staff());

-- Staff + service-role write. /custom-quote submissions are inserted server-side
-- with the service role.
create policy custom_solutions_write_staff
  on public.custom_solutions for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
