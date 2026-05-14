-- 0006_content_pieces.sql
-- content_pieces — content generated for a client by the content agent.
-- First month per client runs draft -> human approval; graduates to autopilot after.

create table public.content_pieces (
  id                uuid primary key default gen_random_uuid(),
  organization_id   uuid not null references public.organizations (id) on delete restrict,
  client_id         uuid not null references public.clients (id) on delete cascade,
  -- The agent run that produced this piece, if generated (vs. created by hand).
  agent_run_id      uuid references public.agent_runs (id) on delete set null,
  channel           content_channel not null,
  status            content_status not null default 'draft',
  title             text,
  body              text not null,
  -- Media references (R2 keys / URLs) and channel-specific metadata.
  media             jsonb not null default '[]'::jsonb,
  -- Approval + scheduling.
  approved_by       uuid references public.users (id) on delete set null,
  approved_at       timestamptz,
  scheduled_for     timestamptz,
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on table public.content_pieces is 'Content generated for a client. Draft -> approval -> scheduled -> published.';
comment on column public.content_pieces.media is 'Array of media refs (R2 keys / URLs) + channel-specific metadata.';

create index content_pieces_organization_id_idx on public.content_pieces (organization_id);
create index content_pieces_client_id_idx on public.content_pieces (client_id);
create index content_pieces_status_idx on public.content_pieces (status);
create index content_pieces_scheduled_for_idx on public.content_pieces (scheduled_for);

create trigger content_pieces_set_updated_at
  before update on public.content_pieces
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: content_pieces
-- ---------------------------------------------------------------------------
alter table public.content_pieces enable row level security;

-- Staff see all content in their org; a client sees only their own content
-- (so they can review and approve drafts in the portal).
create policy content_pieces_select_org_or_own
  on public.content_pieces for select
  using (
    organization_id = public.current_org_id()
    and (public.is_staff() or client_id = public.current_client_id())
  );

-- Writes are staff-only in v1. Client approval actions go through server-side
-- code (service role) that records approved_by / approved_at.
create policy content_pieces_write_staff
  on public.content_pieces for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
