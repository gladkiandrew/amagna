# Architecture Decision Records

This directory holds the **why** behind structural decisions in the Amagna codebase.
Code documents what we did; ADRs document why we chose it over the alternatives, so a
future reader (or a future Claude Code session) doesn't re-litigate settled ground.

## Format

Each ADR is a numbered file: `NNNN-short-title.md`. They follow a light MADR structure:

- **Status** — Proposed | Accepted | Superseded by ADR-XXXX
- **Context** — the forces in play, the problem
- **Decision** — what we chose
- **Consequences** — what this makes easy, what it makes hard, what we accept

## When to write one

Write an ADR when a decision is hard to reverse, affects multiple parts of the system, or
would surprise someone later. Skip it for routine, easily-changed choices.

## Index

| ADR | Title | Status |
|---|---|---|
| [0001](0001-monorepo-structure.md) | Monorepo with npm workspaces | Accepted |
| [0002](0002-infrastructure-stack.md) | Infrastructure and platform stack | Accepted |
| [0003](0003-ruflo-agent-orchestration.md) | Ruflo as the agent orchestration layer | Accepted |
