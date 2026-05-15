-- 0010_widget_submissions.sql
-- Lead capture from the Phase 1.5 /audit qualification widget. Email-gated
-- before the audit displays; the audit JSON and PDF URL are stored alongside
-- the submission so staff can review and follow up.

create table public.widget_submissions (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete restrict,
  name            text not null,
  email           text not null,
  business_name   text,
  niche           niche,
  -- The free-form situation/goal the visitor typed (or selected from a chip).
  situation_text  text not null,
  -- The structured audit (where you stand / what's missing / 30-day plan / opportunity).
  audit_json      jsonb,
  -- Public URL of the rendered audit PDF (sent by email).
  pdf_url         text,
  -- True once the visitor books a call from this audit.
  booked_call     boolean not null default false,
  -- When the visitor actually saw the audit render (vs just submitting).
  viewed_at       timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.widget_submissions is '/audit widget lead capture — name + email gated, audit JSON + PDF stored.';
comment on column public.widget_submissions.audit_json is 'Structured audit returned to the visitor (where-you-stand, gaps, 30-day plan, opportunity).';
comment on column public.widget_submissions.booked_call is 'Set true when the visitor books a Cal.com call from this audit.';

create index widget_submissions_organization_id_idx on public.widget_submissions (organization_id);
create index widget_submissions_email_idx on public.widget_submissions (email);
create index widget_submissions_created_at_idx on public.widget_submissions (created_at desc);
create index widget_submissions_niche_idx on public.widget_submissions (niche);

create trigger widget_submissions_set_updated_at
  before update on public.widget_submissions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS: widget_submissions
-- ---------------------------------------------------------------------------
alter table public.widget_submissions enable row level security;

-- Staff-only read. Public submissions land via the service role (server-side)
-- — anon users never insert directly. No client read path.
create policy widget_submissions_select_staff
  on public.widget_submissions for select
  using (organization_id = public.current_org_id() and public.is_staff());

create policy widget_submissions_write_staff
  on public.widget_submissions for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());
