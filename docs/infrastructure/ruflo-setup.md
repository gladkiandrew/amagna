# Ruflo Setup — Agent Orchestration Layer

> **Status:** Installed and initialized (Phase 0). MCP servers and hooks require a Claude Code restart to activate.
> **Last updated:** 2026-05-14

## What Ruflo is

Ruflo (`github.com/ruvnet/ruflo`, formerly `claude-flow`) is the agent orchestration platform
that sits on top of Claude Code. It is the foundation for the Amagna agent fleet — outreach,
content, reporting, operations, sales. It gives us:

- **Swarm coordination** — multiple agents working one task with a shared task list
- **Vector memory** (AgentDB / HNSW) — persistent context across sessions
- **Lifecycle hooks** — Ruflo observes every tool call to learn patterns over time
- **Multi-provider routing** — Claude primary, GPT/Gemini fallback, Ollama local

## How it was installed

The master build directive specified a `curl ... | bash` install. We deliberately used the
**npm path instead** — it installs the identical published package through an auditable
registry rather than piping a remote script straight into a shell. Same tool, safer channel.

```bash
npm install -g ruflo@latest      # installed ruflo v3.7.0-alpha.35
ruflo init --full                # scaffolded config into the repo (no --force, no daemon auto-start)
```

> **Note:** `ruflo@latest` currently resolves to an **alpha** build (`3.7.0-alpha.35`).
> It is fast-moving. Pin the version before relying on it in production agent runtimes.

## What `ruflo init --full` created

| Path | Tracked in git? | What it is |
|---|---|---|
| `.claude/settings.json` | yes | 11 Claude Code lifecycle hooks + permissions + Ruflo config |
| `.claude/agents/` (98) | yes | Prebuilt agent definitions (coder, tester, reviewer, etc.) |
| `.claude/commands/` (10) | yes | Ruflo slash commands |
| `.claude/helpers/` | yes | Hook handler scripts the hooks invoke |
| `.mcp.json` | yes | Registers 3 MCP servers: `ruflo`, `ruv-swarm`, `flow-nexus` |
| `.claude-flow/` | **no** (gitignored) | Runtime state — config, data, logs, sessions |

The existing `.claude/settings.local.json` (local permissions) was **preserved untouched**.
`CLAUDE.md` was **not modified** — Ruflo detected it and skipped it.

## What this changes about your environment

This is the important part. After you restart Claude Code:

- **Every Bash command and every file edit triggers a Ruflo hook** (`node .claude/helpers/hook-handler.cjs`).
  This is how Ruflo learns. If a hook is slow or errors, it affects every action — so if Claude
  Code starts behaving oddly, the hooks in `.claude/settings.json` are the first place to look.
- **Three MCP servers** become available. Only `ruflo` is required; `ruv-swarm` and `flow-nexus`
  are optional (and `flow-nexus` needs a separate login).
- **Experimental "agent teams"** are enabled (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`).
- The background **daemon does NOT auto-start** — we left `autoStart: false` on purpose. Start it
  explicitly when you want it.

## To finish activation (action required)

Ruflo's MCP servers and hooks are written to disk but **not yet live in this session**. To turn
them on:

1. **Restart Claude Code** (exit and re-run `claude`) so it loads `.mcp.json` and `.claude/settings.json`.
2. Approve the `ruflo` MCP server when Claude Code prompts.
3. Verify the loop:
   ```bash
   ruflo memory init      # initialize the vector memory database
   ruflo swarm init       # initialize a swarm
   ruflo --version        # sanity check
   ```
4. Optionally start background workers: `ruflo daemon start`

Once the MCP server is live, the tools `memory_store`, `swarm_init`, and `agent_spawn` become
callable from inside Claude Code.

## Conventions for Amagna

- ADRs live in `docs/architecture/decisions/` (our convention) — **not** Ruflo's default `/docs/adr`.
- Agent runtimes will deploy as Cloudflare Workers (Phase 3); Ruflo coordinates them, it does not host them.
- Per-client agent state is the source of truth in **Supabase**, not in Ruflo's local memory —
  Ruflo memory is for cross-session coordination, Supabase is for durable client data.
