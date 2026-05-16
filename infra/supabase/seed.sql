-- seed.sql
-- Minimal seed: the Amagna AI organization itself. Every tenant-scoped row
-- references an organization, so the schema needs at least this one.
--
-- Run this AFTER all migrations. Safe to run more than once (idempotent on slug).
--
-- The owner user is intentionally NOT seeded here — users.id must reference a
-- real auth.users row. Create it by signing up at the app, then promote it:
--   update public.users
--   set role = 'owner',
--       organization_id = (select id from public.organizations where slug = 'amagna')
--   where email = 'andrew@amagna.co';

insert into public.organizations (name, slug)
values ('Amagna AI', 'amagna')
on conflict (slug) do nothing;
