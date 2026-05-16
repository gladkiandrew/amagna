-- 0009_audit_logs.sql
-- audit_logs — append-only record of significant actions across the system:
-- who did what, to which row, when. Written by server-side code and agents.
-- Append-only by design: there is no UPDATE or DELETE policy.

create table public.audit_logs (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references public.organizations (id) on delete restrict,
  -- The user who acted, if a human did. Null when an agent or system job acted.
  actor_user_id     uuid references public.users (id) on delete set null,
  -- Or the agent that acted.
  actor_agent_type  agent_type,
  -- What happened: a short verb-noun action key, e.g. 'client.created',
  -- 'content.approved', 'lead.status_changed', 'agent_run.failed'.
  action            text not null,
  -- The row the action touched, identified loosely (table name + id) so this
  -- table never needs an FK to everything.
  target_table      text,
  target_id         uuid,
  -- Before/after or any extra context.
  metadata          jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now()
);

comment on table public.audit_logs is 'Append-only audit trail. Written by server code + agents; no update/delete.';
comment on column public.audit_logs.action is 'Short verb-noun key, e.g. client.created, content.approved, agent_run.failed.';

create index audit_logs_organization_id_idx on public.audit_logs (organization_id);
create index audit_logs_action_idx on public.audit_logs (action);
create index audit_logs_target_idx on public.audit_logs (target_table, target_id);
create index audit_logs_created_at_idx on public.audit_logs (created_at desc);

-- ---------------------------------------------------------------------------
-- RLS: audit_logs
-- ---------------------------------------------------------------------------
alter table public.audit_logs enable row level security;

-- Staff-only read. No update/delete policy exists, so the log is append-only
-- for everyone except the service role (which bypasses RLS for server writes).
create policy audit_logs_select_staff
  on public.audit_logs for select
  using (organization_id = public.current_org_id() and public.is_staff());

-- Staff may insert audit entries; they cannot edit or delete them.
create policy audit_logs_insert_staff
  on public.audit_logs for insert
  with check (organization_id = public.current_org_id() and public.is_staff());
