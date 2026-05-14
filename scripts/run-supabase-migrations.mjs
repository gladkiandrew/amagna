#!/usr/bin/env node
/**
 * Run the Supabase schema migrations + seed against the live project.
 *
 * Why a custom runner instead of `supabase db push`:
 *  - it verifies each migration file individually before moving to the next
 *  - it works with our numbered files in infra/supabase/migrations/ as-is
 *  - it is one readable script, no CLI config dance
 *
 * Requires: SUPABASE_DB_PASSWORD (Supabase dashboard → Project Settings →
 * Database → Database password). Read from apps/marketing/.env.local, or
 * pass it in the environment. The anon / service-role keys CANNOT run DDL —
 * only the database password (or a direct connection) can.
 *
 * Usage:
 *   npm install pg            # one-time, at repo root
 *   node scripts/run-supabase-migrations.mjs
 */

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import pg from 'pg';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MIGRATIONS_DIR = join(REPO_ROOT, 'infra/supabase/migrations');
const SEED_FILE = join(REPO_ROOT, 'infra/supabase/seed.sql');
const ENV_LOCAL = join(REPO_ROOT, 'apps/marketing/.env.local');

// Project coordinates — override via env if the project ever changes.
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

const password = process.env.SUPABASE_DB_PASSWORD || readEnvValue(ENV_LOCAL, 'SUPABASE_DB_PASSWORD');

if (!password) {
  console.error(
    'ERROR: SUPABASE_DB_PASSWORD is not set.\n' +
      'Get it from the Supabase dashboard → Project Settings → Database → Database password,\n' +
      `then add it to ${ENV_LOCAL} (SUPABASE_DB_PASSWORD=...) and re-run.`,
  );
  process.exit(1);
}

// Session-mode pooler (port 5432) — supports the multi-statement DDL in our
// migrations. Supabase provisions projects across pooler shards (aws-0 / aws-1),
// so try both; SUPABASE_DB_HOST overrides if the host is ever known exactly.
const POOLER_HOSTS = process.env.SUPABASE_DB_HOST
  ? [process.env.SUPABASE_DB_HOST]
  : [`aws-1-${REGION}.pooler.supabase.com`, `aws-0-${REGION}.pooler.supabase.com`];

function connectionStringFor(host) {
  return (
    `postgresql://postgres.${PROJECT_REF}:${encodeURIComponent(password)}` +
    `@${host}:5432/postgres`
  );
}

/** Connect via whichever pooler shard hosts this project. */
async function connect() {
  let lastError;
  for (const host of POOLER_HOSTS) {
    const client = new pg.Client({
      connectionString: connectionStringFor(host),
      ssl: { rejectUnauthorized: false },
    });
    try {
      await client.connect();
      console.log(`Connected to Supabase project ${PROJECT_REF} via ${host}.\n`);
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

  // --- Migrations, in filename order, each wrapped in its own transaction ---
  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const sql = readFileSync(join(MIGRATIONS_DIR, file), 'utf8');
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('COMMIT');
      console.log(`  ✓ ${file}`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`  ✗ ${file} — FAILED, rolled back\n`);
      console.error(error.message);
      await client.end();
      process.exit(1);
    }
  }

  // --- Seed ---
  try {
    await client.query(readFileSync(SEED_FILE, 'utf8'));
    console.log('  ✓ seed.sql');
  } catch (error) {
    console.error('  ✗ seed.sql — FAILED');
    console.error(error.message);
    await client.end();
    process.exit(1);
  }

  // --- Verification: list tables + confirm the seed row ---
  const tables = await client.query(
    "select table_name from information_schema.tables where table_schema = 'public' order by table_name",
  );
  const orgs = await client.query('select name, slug from public.organizations');

  console.log(`\nPublic tables (${tables.rowCount}): ${tables.rows.map((r) => r.table_name).join(', ')}`);
  console.log(`Organizations seeded: ${orgs.rows.map((r) => `${r.name} (${r.slug})`).join(', ') || 'none'}`);

  await client.end();
  console.log('\nDone — schema is live.');
}

run().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
