# ADR-0003 — Ruflo as the agent orchestration layer

**Status:** Accepted
**Date:** 2026-05-14
**Deciders:** Andrew Gladki (mandated in the master build directive), Claude Code

## Context

The long-term product is the agent fleet — outreach, content, reporting, operations, sales
— that runs the agency so it scales without headcount. That fleet needs coordination:
multiple agents on one task, memory that persists across sessions, a way to observe and
improve what works per client, and routing across LLM providers.

The README's earlier draft floated "n8n or a custom Cloudflare Worker setup" as TBD. The
master build directive resolved it: use **Ruflo** (`github.com/ruvnet/ruflo`, the project
formerly known as `claude-flow`), built to sit on top of Claude Code.

## Decision

Adopt **Ruflo** as the orchestration layer. It provides swarm coordination, vector memory
(AgentDB / HNSW), Claude Code lifecycle hooks for self-learning, and multi-provider routing.

**Installation deviated from the directive on one point:** the directive specified a
`curl … | bash` install. We used `npm install -g ruflo@latest` instead — the identical
published package through an auditable registry rather than piping a remote script into a
shell. Same tool, safer channel, same outcome. `ruflo init --full` scaffolded the
integration into the repo. Full setup notes: [`docs/infrastructure/ruflo-setup.md`](../../infrastructure/ruflo-setup.md).

## Consequences

**Makes easy**
- Swarm coordination and cross-session memory are off-the-shelf, not hand-built.
- Lifecycle hooks let agents learn from observed outcomes per client over time.
- Multi-provider routing (Claude primary, GPT/Gemini fallback, Ollama local) is built in —
  complements the LLM choices in ADR-0002.

**Makes hard / accepted tradeoffs**
- **It is alpha software.** `ruflo@latest` currently resolves to `v3.7.0-alpha.35` and moves
  fast. We pin the version before any agent runtime depends on it in production.
- `ruflo init --full` wired **11 Claude Code lifecycle hooks** into `.claude/settings.json`
  — every Bash command and file edit now triggers a Ruflo hook handler. This is the
  intended mechanism, but it is a real change to how the dev environment behaves: a slow or
  failing hook affects every action. `.claude/settings.json` is the first place to look if
  Claude Code misbehaves.
- It registers three MCP servers (`ruflo` required, `ruv-swarm` and `flow-nexus` optional).
  They activate only after a Claude Code restart.
- Ruflo's own default ADR directory is `/docs/adr`; we keep ours at
  `docs/architecture/decisions/`. Don't let tooling fragment the docs.

## Boundary with the rest of the stack

Ruflo **coordinates**; it does not host and it is not the system of record.

- Agent runtimes deploy as **Cloudflare Workers** (ADR-0002). Ruflo orchestrates them.
- Durable client data — agent runs, content, reports, audit logs — lives in **Supabase**.
  Ruflo's local vector memory is for cross-session coordination, not durable client state.

## Revisit when

Ruflo's alpha instability blocks work, the hook overhead measurably slows the workflow, or a
simpler coordination model would do. Until then, it is the foundation.
