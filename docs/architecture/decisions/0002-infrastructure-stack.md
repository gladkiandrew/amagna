# ADR-0002 — Infrastructure and platform stack

**Status:** Accepted
**Date:** 2026-05-14
**Deciders:** Andrew Gladki (locked these in the master build directive), Claude Code

## Context

Amagna needs hosting, a database, auth, payments, email, booking, and an LLM layer. The
founder is a rookie developer scaling a business without scaling headcount, so the stack
must minimize vendor sprawl, minimize ops burden, and stay cheap until revenue justifies
otherwise. These choices were locked by the founder; this ADR records them and the why so
they aren't re-litigated.

## Decision

| Concern | Choice | Why |
|---|---|---|
| Frontend framework | **Next.js 14 (App Router)**, TypeScript strict, Tailwind, shadcn/ui | One framework for marketing, funnels, portals. App Router + RSC. shadcn/ui pinned to the 2.x line (Tailwind v3 compatible) — see Consequences. |
| Static hosting | **Cloudflare Pages** | DNS for amagna.co already on Cloudflare. One vendor for the whole edge. |
| Serverless / agent runtime | **Cloudflare Workers** | Agents deploy as Workers, bound to KV for fast config/state lookups. |
| Object storage | **Cloudflare R2** | Brand assets, content media, exports. No egress fees. |
| Database / auth / storage | **Supabase** (Postgres) | Single source of truth for clients, leads, agent state, reports, audit logs. Multi-tenant with row-level security from day one. Auth via magic links + Google OAuth for both client and admin portals. Use `@supabase/ssr` for the App Router. |
| Payments | **Stripe** | Recurring for retainers, one-time for custom-project deposits, invoices for custom milestones. Test mode until launch; live mode is a founder-gated decision. |
| Inbound email | **Cloudflare Email Routing** | Already live (andrew@amagna.co → Gmail). |
| Outbound email | **Resend** | Better DX and a generous free tier for transactional + campaign mail. Revisit if deliverability at volume disappoints. (See ADR — to be written — if this changes.) |
| Booking | **Calendly** initially | Time-to-launch beats self-hosting. Self-hosted Cal.com on Cloudflare Pages is a later optimization, not a Phase 1 blocker. |
| LLM layer | **Anthropic Claude** primary, OpenAI fallback, Ollama for privacy-sensitive local work | Claude is the reasoning engine for all agent work. |

## Consequences

**Makes easy**
- Two primary vendors (Cloudflare + Supabase) cover hosting, edge compute, storage, DB,
  auth. One bill to reason about, one mental model.
- Supabase RLS gives real multi-tenancy without building an authz layer by hand.
- Everything has a free or near-free tier — the stack costs almost nothing until clients land.

**Makes hard / accepted tradeoffs**
- **shadcn/ui version pin:** `shadcn@latest` (4.x) targets Tailwind v4 + Next 15 + React 19
  and breaks our locked Next 14 build (it injects an unsupported `Geist` next/font import
  and a Tailwind-v4 CSS pipeline). We pin the **2.x line**. When we deliberately move to
  Next 15 / Tailwind v4, that gets its own ADR and its own migration.
- Cloudflare Workers ≠ Node — agent code must respect the Workers runtime (no arbitrary
  native modules). Constrains some library choices in `agents/*`.
- Vendor concentration risk on Cloudflare. Accepted: the consolidation savings outweigh it
  at this stage.
- Calendly is a hosted third party in the booking funnel — a dependency we don't control.
  Accepted for launch speed; Cal.com is the exit if it becomes a problem.

## Revisit when

We outgrow a free tier, deliverability or booking limitations bite, or we move off Next 14.
Each of those gets its own ADR rather than an edit here.
