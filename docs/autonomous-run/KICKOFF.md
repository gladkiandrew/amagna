# Kickoff — run Claude Code unattended for ~3 hours

Do these 4 steps before you leave. Total time: ~2 minutes.

## 1. Keep the Mac awake

Open a regular terminal (not Cursor's) and run:

```
caffeinate -dims -t 11000
```

Leave it running. It keeps the system, display, and disk awake for ~3 hours,
then expires on its own.

## 2. Grant permissions for the run

From the repo root:

```
cp docs/autonomous-run/settings.local.json .claude/settings.local.json
```

This pre-approves build/lint/git-commit commands so Claude Code won't sit
frozen on a permission prompt while you're gone, and hard-denies `git push`,
`git merge`, `npm install`, and `rm -rf` for safety.

## 3. Start Claude Code in auto-accept mode

In Cursor's terminal:

```
claude --permission-mode acceptEdits
```

(Or in an already-running session, press Shift+Tab until the mode shows
"accept edits".)

Optional but recommended for a long run: type `/model sonnet` first — Sonnet
stretches your Max usage limits much further over 3 continuous hours.

## 4. Paste this kickoff prompt

```
Read CLAUDE.md, then read docs/autonomous-run/PLAN.md and follow it exactly.
Work through all phases in order in one continuous session without stopping
to ask me anything — I am away for 3 hours. The hard guardrails in the plan
override everything. Commit one concern at a time, verify npm run build
passes before every commit, and finish by writing
docs/autonomous-run/REPORT.md. If you hit the circuit breaker, write the
report and stop cleanly.
```

## When you're back

1. Read `docs/autonomous-run/REPORT.md`.
2. Review the work: `git log --oneline feat/hero-crew..HEAD` and `npm run dev`.
3. If happy, merge `auto/2026-06-04-voyage-polish` back into `feat/hero-crew`
   and push yourself. Nothing was pushed automatically.
4. Restore your old settings if you want:
   `git checkout -- .claude/settings.local.json` won't work (it's untracked) —
   just edit the file or delete the extra allow rules.

## Honest expectations

- Claude Code may still pause once or twice on an unanticipated permission
  (anything not in the allow list). The list covers the whole planned workflow,
  but surprises happen. Each pause just waits — no harm done.
- Max usage limits reset on a 5-hour window; a 3-hour Opus run may hit the cap
  partway through. Sonnet mitigates this.
- One long turn usually covers 1–2 phases before Claude Code naturally stops.
  If you can check in even once mid-run, paste: "Continue with
  docs/autonomous-run/PLAN.md from where you left off."
