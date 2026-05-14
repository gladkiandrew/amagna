-- 0001_init.sql
-- Foundation: extensions, shared enum types, and the updated_at trigger helper.
-- Run order matters — this file must run before every other migration.

-- gen_random_uuid() is core in Postgres 13+, but enable pgcrypto defensively.
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Enum types. Centralised here so every table references the same vocabulary.
-- ---------------------------------------------------------------------------

-- Which of the two go-to-market niches a client belongs to.
create type niche as enum ('home_services', 'real_estate');

-- Productized retainer tiers + the custom-solutions track.
create type client_tier as enum ('foundation', 'growth', 'authority', 'custom');

-- Lifecycle of a managed client.
create type client_status as enum ('onboarding', 'active', 'paused', 'churned');

-- Roles a user can hold inside an organization.
-- owner/admin/staff are Amagna-side; client is a client-portal login.
create type user_role as enum ('owner', 'admin', 'staff', 'client');

-- Pipeline stages for a lead generated on behalf of a client.
create type lead_status as enum ('new', 'contacted', 'qualified', 'booked', 'won', 'lost');

-- Where a lead came from.
create type lead_source as enum ('meta_ad', 'google_ad', 'organic', 'referral', 'outreach', 'other');

-- The five agents in the fleet.
create type agent_type as enum ('outreach', 'content', 'reporting', 'operations', 'sales');

-- Status of a single agent execution.
create type agent_run_status as enum ('queued', 'running', 'succeeded', 'failed', 'needs_approval');

-- Lifecycle of a generated content piece (human approval required early per client).
create type content_status as enum ('draft', 'pending_approval', 'approved', 'scheduled', 'published', 'rejected');

-- Distribution channel for a content piece.
create type content_channel as enum ('instagram', 'facebook', 'linkedin', 'x', 'youtube', 'newsletter', 'blog', 'email', 'sms');

-- Cadence of a client report.
create type report_type as enum ('weekly', 'monthly', 'ad_hoc');

-- Status of a client report.
create type report_status as enum ('generating', 'draft', 'delivered');

-- Pipeline stages for a custom-solutions engagement (separate from managed clients).
create type custom_solution_stage as enum ('inquiry', 'scoping', 'quoted', 'negotiation', 'won', 'lost', 'in_progress', 'completed');

-- ---------------------------------------------------------------------------
-- Shared trigger function: keep updated_at honest on every row update.
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

comment on function public.set_updated_at() is
  'BEFORE UPDATE trigger function — sets updated_at to now() on every row update.';
