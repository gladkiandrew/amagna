-- 0007_reports.sql
-- reports — weekly/monthly client reports produced by the reporting agent.
-- Plain-English narrative plus the structured metrics behind it.

create table public.reports (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references public.organizations (id) on delete restrict,
  client_id         uuid not null references public.clients (id) on delete cascade,
  -- The agent run that produced this report, if generated.
  agent_run_id      uuid references public.agent_runs (id) on delete set null,
  report_type       report_type not null default 'weekly',
  status            report_status not null default 'generating',
  -- Reporting window.
  period_start      date not null,
  period_end        date not null,
  -- Plain-English narrative for the client.
  summary           text,
  -- Structured KPIs (lead counts, spend, content output, GBP metrics, etc.).
  metrics           jsonb not null default '{}'::jsonb,
  delivered_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.reports is 'Weekly/monthly client reports — plain-English summary + structured metrics.';
comment on column public.reports.metrics is 'Structured KPIs behind the narrative (leads, spend, content output, GBP).';

create index reports_organization_id_idx on public.reports (organization_id);
create index reports_client_id_idx on public.reports (client_id);
create index reports_period_idx on public.reports (period_start, period_end);

create trigger reports_set_updated_at
  before update on public.reports
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: reports
-- ---------------------------------------------------------------------------
alter table public.reports enable row level security;

-- Staff see all reports in their org; a client sees only their own — but only
-- once delivered, so they never see a half-generated report.
create policy reports_select_org_or_own
  on public.reports for select
  using (
    organization_id = public.current_org_id()
    and (
      public.is_staff()
      or (client_id = public.current_client_id() and status = 'delivered')
    )
  );

-- Writes are staff + service-role only.
create policy reports_write_staff
  on public.reports for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
