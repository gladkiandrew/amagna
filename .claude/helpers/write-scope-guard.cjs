#!/usr/bin/env node
/**
 * write-scope-guard.cjs — PreToolUse guard for Write|Edit|MultiEdit.
 *
 * Turns each crew agent's `memory_writes:` / charter ownership into a REAL
 * boundary. A named crew subagent (zeno/exodus/mansa/vela/solon/lumen) writing
 * outside its allowed paths is REFUSED with exit code 2 (the only enforcement
 * that holds under permission_mode: bypassPermissions, which subagents run in).
 *
 * Enforcement is scoped to the crew ONLY:
 *   - main thread (no agent_type) and any non-crew agent_type  -> ALLOW (exit 0)
 *   - crew agent, path IN scope                                -> ALLOW (exit 0)
 *   - crew agent, path OUT of scope                            -> BLOCK (exit 2)
 *
 * Fails OPEN on its own errors (bad JSON, unreadable config) so a guard bug can
 * never wedge the fleet — a malformed payload cannot carry a crew write anyway.
 *
 * Scope table: write-scopes.json (same dir). Absolute paths, ~ = home,
 * trailing /** = prefix match, otherwise exact-file match.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');

function allow() { process.exit(0); }
function block(msg) {
  process.stderr.write(msg + '\n');
  process.exit(2); // exit 2 = block the tool call, feed stderr back to the agent
}

let payload;
try {
  payload = JSON.parse(fs.readFileSync(0, 'utf8'));
} catch (e) {
  allow(); // can't parse -> can't attribute -> allow
}

const agentType = payload && payload.agent_type;
if (!agentType) allow(); // main thread

// Load scope table
let scopes;
try {
  const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'write-scopes.json'), 'utf8'));
  scopes = cfg.agents || {};
} catch (e) {
  allow(); // no/broken config -> don't wedge anything
}

const allowed = scopes[agentType];
if (!allowed) allow(); // agent_type not a scoped crew member -> unrestricted

// Resolve the target path from the tool input (Write/Edit/MultiEdit all use file_path)
const ti = (payload && payload.tool_input) || {};
const target = ti.file_path || ti.filePath || ti.path;
if (!target) allow(); // nothing to check

function expand(p) {
  if (p.startsWith('~/')) p = path.join(os.homedir(), p.slice(2));
  else if (p === '~') p = os.homedir();
  return path.resolve(p);
}

const abs = expand(target);
const inScope = allowed.some((pat) => {
  if (pat.endsWith('/**')) {
    const prefix = expand(pat.slice(0, -3));
    return abs === prefix || abs.startsWith(prefix + path.sep);
  }
  return abs === expand(pat);
});

if (inScope) allow();

block(
  `⛔ write-scope-guard: agent "${agentType}" is not allowed to write ${abs}.\n` +
  `This path is outside ${agentType}'s charter scope (see .claude/helpers/write-scopes.json).\n` +
  `Allowed for ${agentType}:\n` +
  allowed.map((p) => `  - ${p}`).join('\n') +
  `\nIf this write is legitimate, ask Andrew to widen ${agentType}'s scope — do not work around this.`
);
