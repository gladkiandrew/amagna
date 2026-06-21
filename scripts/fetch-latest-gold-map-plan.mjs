#!/usr/bin/env node
/**
 * READ-ONLY. Fetch the most recent Gold Map submission that has a generated
 * plan and print its full stored `audit_json` (intake + plan). Used to capture
 * a reference sample of what the generator actually produced.
 *
 * This script ONLY runs SELECT queries. It never inserts, updates, or deletes.
 * Connection pattern mirrors scripts/run-supabase-migrations.mjs (session-mode
 * pooler, try both shards, password from apps/marketing/.env.local).
 *
 * Usage:  node scripts/fetch-latest-gold-map-plan.mjs
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENV_LOCAL = join(REPO_ROOT, 'apps/marketing/.env.local');

const PROJECT_REF = process.env.SUPABASE_PROJECT_REF || 'gxruzbfstwecnjqbnspa';
const REGION = process.env.SUPABASE_REGION || 'us-east-2';

/** Pull a single key out of a .env file without adding a dotenv dependency. */
function readEnvValue(path, key) {
  try {
    const line = readFileSync(path, 'utf8')
      .split('\n')
      .find((l) => l.trim().startsWith(`${key}=`));
    return line ? line.slice(line.indexOf('=') + 1).trim() : '';
  } catch {
    return '';
  }
}

const password =
  process.env.SUPABASE_DB_PASSWORD || readEnvValue(ENV_LOCAL, 'SUPABASE_DB_PASSWORD');

if (!password) {
  console.error(
    'ERROR: SUPABASE_DB_PASSWORD is not set.\n' +
      `Add it to ${ENV_LOCAL} (SUPABASE_DB_PASSWORD=...) and re-run.`,
  );
  process.exit(1);
}

const POOLER_HOSTS = process.env.SUPABASE_DB_HOST
  ? [process.env.SUPABASE_DB_HOST]
  : [`aws-1-${REGION}.pooler.supabase.com`, `aws-0-${REGION}.pooler.supabase.com`];

function connectionStringFor(host) {
  return (
    `postgresql://postgres.${PROJECT_REF}:${encodeURIComponent(password)}` +
    `@${host}:5432/postgres`
  );
}

async function connect() {
  let lastError;
  for (const host of POOLER_HOSTS) {
    const client = new pg.Client({
      connectionString: connectionStringFor(host),
      ssl: { rejectUnauthorized: false },
    });
    try {
      await client.connect();
      console.error(`Connected to Supabase project ${PROJECT_REF} via ${host}.\n`);
      return client;
    } catch (error) {
      lastError = error;
      await client.end().catch(() => {});
    }
  }
  throw lastError;
}

async function run() {
  const client = await connect();
  try {
    // READ-ONLY: most recent gold-map submission that actually has a plan.
    const { rows } = await client.query(`
      select id, created_at, business_name, email, audit_json
      from public.widget_submissions
      where audit_json ->> 'source' = 'gold-map'
        and audit_json -> 'plan' is not null
      order by created_at desc
      limit 1
    `);

    if (rows.length === 0) {
      console.error('No gold-map submission with a generated plan found.');
      process.exitCode = 2;
      return;
    }

    const row = rows[0];
    console.error(
      `Most recent plan: ${row.business_name} <${row.email}> — ${row.created_at}\n`,
    );
    // The audit_json is already JSON; print it whole on stdout so it can be piped.
    process.stdout.write(JSON.stringify(row.audit_json, null, 2) + '\n');
  } finally {
    await client.end().catch(() => {});
  }
}

run().catch((err) => {
  console.error('Fetch failed:', err.message || err);
  process.exit(1);
});
