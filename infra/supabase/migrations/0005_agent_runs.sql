-- 0005_agent_runs.sql
-- agent_runs — one row per execution of a fleet agent. This is the observability
-- spine: every agent writes here so runs can be audited, costed, and learned from.
-- Cost controls (budget per run, alerting) read off this table.

create table public.agent_runs (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references public.organizations (id) on delete restrict,
  -- Most runs act on behalf of a client; some (e.g. outreach prospecting) do not.
  client_id         uuid references public.clients (id) on delete set null,
  agent_type        agent_type not null,
  status            agent_run_status not null default 'queued',
  -- What triggered the run + the inputs it received.
  trigger           text,
  input             jsonb not null default '{}'::jsonb,
  -- What the run produced, or the error if it failed.
  output            jsonb,
  error             text,
  -- Cost controls: model usage per run.
  model             text,
  input_tokens      integer,
  output_tokens     integer,
  cost_cents        integer,
  -- Timing.
  started_at        timestamptz,
  finished_at       timestamptz,
  -- Human-in-the-loop: set when status = needs_approval, cleared on decision.
  approved_by       uuid references public.users (id) on delete set null,
  approved_at       timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.agent_runs is 'One row per fleet-agent execution. Observability + cost-control spine.';
comment on column public.agent_runs.cost_cents is 'LLM cost of this run in USD cents — feeds per-agent budget alerting.';
comment on column public.agent_runs.approved_by is 'Set when a human approved a needs_approval run before it acted.';

create index agent_runs_organization_id_idx on public.agent_runs (organization_id);
create index agent_runs_client_id_idx on public.agent_runs (client_id);
create index agent_runs_agent_type_idx on public.agent_runs (agent_type);
create index agent_runs_status_idx on public.agent_runs (status);
create index agent_runs_created_at_idx on public.agent_runs (created_at desc);

create trigger agent_runs_set_updated_at
  before update on public.agent_runs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: agent_runs
-- ---------------------------------------------------------------------------
alter table public.agent_runs enable row level security;

-- Staff-only visibility. Agent internals are not exposed in the client portal in v1.
create policy agent_runs_select_staff
  on public.agent_runs for select
  using (organization_id = public.current_org_id() and public.is_staff());

-- Staff + service-role server code write agent runs.
create policy agent_runs_write_staff
  on public.agent_runs for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
