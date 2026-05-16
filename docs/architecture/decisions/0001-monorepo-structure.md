# ADR-0001 — Monorepo with npm workspaces

**Status:** Accepted
**Date:** 2026-05-14
**Deciders:** Andrew Gladki, Claude Code

## Context

Amagna is two products in one organization: customer-facing web surfaces (the marketing
site and niche funnels, later a client portal and admin portal) and an AI agent fleet
(outreach, content, reporting, operations, sales). These share brand assets, design
tokens, a Supabase client, and a Sapt API client. They ship on different cadences and to
different runtimes (Cloudflare Pages vs Cloudflare Workers).

The options were: many separate repos, a monorepo with a heavy build tool (Turborepo,
Nx), or a monorepo with plain npm workspaces.

## Decision

Single repository, **plain npm workspaces** — no Turborepo, no Nx yet.

The workspace layout (root `package.json` already declares `apps/*`, `packages/*`,
`agents/*`):

```
apps/         Deployable applications     — marketing, funnels, portal, admin
agents/       AI agent services           — outreach, content, reporting, ops, sales
packages/     Shared internal libraries   — shared-ui, sapt-client, supabase-client, analytics
infra/        Cloudflare + Supabase config — workers, Pages config, schema migrations
docs/         SOPs, playbooks, brand, ADRs, architecture
scripts/      Utility and ops scripts
```

Split by **responsibility**, not by technical layer. Things that change together live
together.

## Consequences

**Makes easy**
- One clone, one `npm install`, one source of truth. Atomic commits across app + shared package.
- Shared code (`packages/*`) is imported directly — no publish step, no version drift.
- A rookie developer holds the whole system in one place.

**Makes hard / accepted tradeoffs**
- No cross-package task caching or parallel pipelines yet — fine at this size, slow later.
  Revisit Turborepo when build times hurt, not before (YAGNI).
- Every workspace shares the root lockfile; a careless dependency bump can ripple. Mitigated
  by one-concern-per-PR discipline.
- All deployable apps build from `main`; each `apps/*` is its own Cloudflare Pages project.

## Revisit when

Build/test time across workspaces becomes a daily annoyance, or we add enough packages that
dependency graphs need real tooling. Then introduce Turborepo — the workspace layout above
is already compatible with it.
