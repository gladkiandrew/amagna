-- 0002_tenancy.sql
-- Multi-tenancy core: organizations, users, and the RLS helper functions
-- every other table's policies depend on.
--
-- Tenancy model:
--   organization  = top-level tenant boundary. Amagna AI is one organization;
--                   the schema supports more (white-label / partner books later).
--   user          = an auth login, belongs to exactly one organization, holds a role.
--                   owner/admin/staff are Amagna-side. role='client' is a client-portal
--                   login pinned to a single clients row via client_id.
-- Every tenant-scoped table carries organization_id and is filtered by RLS.

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------
create table public.organizations (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.organizations is 'Top-level tenant boundary. Amagna AI is one row.';

create trigger organizations_set_updated_at
  before update on public.organizations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- users — application profile, 1:1 with Supabase auth.users
-- ---------------------------------------------------------------------------
create table public.users (
  id               uuid primary key references auth.users (id) on delete cascade,
  organization_id  uuid not null references public.organizations (id) on delete restrict,
  email            text not null,
  full_name        text,
  role             user_role not null default 'client',
  -- Set only when role = 'client': the single clients row this login may see.
  -- FK constraint is added in 0003_clients.sql (clients table does not exist yet).
  client_id        uuid,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

comment on table public.users is 'Application profile + role for each auth login. 1:1 with auth.users.';
comment on column public.users.client_id is 'Only set for role=client — pins the login to one clients row. FK added in 0003.';

create index users_organization_id_idx on public.users (organization_id);
create index users_client_id_idx on public.users (client_id);

create trigger users_set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS helper functions.
-- SECURITY DEFINER so they can read public.users without tripping that table's
-- own RLS (which would otherwise recurse). STABLE — one value per statement.
-- ---------------------------------------------------------------------------

-- The calling user's organization. NULL if the caller has no users row.
create or replace function public.current_org_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from public.users where id = auth.uid();
$$;

-- The calling user's role.
create or replace function public.current_role_name()
returns user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.users where id = auth.uid();
$$;

-- The clients row a client-portal user is pinned to. NULL for staff.
create or replace function public.current_client_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select client_id from public.users where id = auth.uid();
$$;

-- True when the caller is Amagna-side staff (owner/admin/staff), not a client login.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select role in ('owner', 'admin', 'staff') from public.users where id = auth.uid()),
    false
  );
$$;

-- ---------------------------------------------------------------------------
-- RLS: organizations + users
-- ---------------------------------------------------------------------------
alter table public.organizations enable row level security;
alter table public.users enable row level security;

-- A user can see their own organization.
create policy organizations_select_own
  on public.organizations for select
  using (id = public.current_org_id());

-- Only owners/admins may rename or change an organization.
create policy organizations_write_admin
  on public.organizations for update
  using (id = public.current_org_id() and public.current_role_name() in ('owner', 'admin'))
  with check (id = public.current_org_id() and public.current_role_name() in ('owner', 'admin'));

-- Users can read their own profile; staff can read everyone in their org.
create policy users_select_self_or_staff
  on public.users for select
  using (
    id = auth.uid()
    or (organization_id = public.current_org_id() and public.is_staff())
  );

-- Staff manage user rows within their org. Clients cannot self-provision.
create policy users_write_staff
  on public.users for all
  using (organization_id = public.current_org_id() and public.is_staff())
  with check (organization_id = public.current_org_id() and public.is_staff());

-- Note: the service role key bypasses RLS entirely. Server-side admin code
-- (Next.js route handlers, Supabase edge functions) uses it for provisioning,
-- onboarding, and anything a logged-in user shouldn't do directly.
