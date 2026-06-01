#!/usr/bin/env python3
"""Pipe the 8 server secrets from apps/marketing/.env.local to the prod
Worker (amagna-marketing-app) via `wrangler secret put`. Never prints any
value. Reports each name + ok/fail only.

Non-interactive companion to scripts/set-prod-worker-secrets.sh (which
prompts at a TTY). Use this from CI / agent runs where .env.local already
holds real values.
"""
import subprocess
import sys
from pathlib import Path

APP_DIR = Path(__file__).resolve().parent.parent / 'apps' / 'marketing'
ENV_FILE = APP_DIR / '.env.local'

SECRETS = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_PRICE_GROWTH',
    'STRIPE_PRICE_UPDATE',
    'ANTHROPIC_API_KEY',
    # The codebase reads NEXT_PUBLIC_SUPABASE_URL server-side via env() in
    # lib/supabase-server.ts (not SUPABASE_URL). Set as a Worker secret so
    # it overrides the empty wrangler.jsonc var at runtime.
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'RESEND_API_KEY',
]


def main() -> int:
    if not ENV_FILE.exists():
        print(f"FATAL: {ENV_FILE} not found", file=sys.stderr)
        return 1
    values: dict[str, str] = {}
    for line in ENV_FILE.read_text().splitlines():
        if '=' in line and not line.lstrip().startswith('#'):
            k, _, v = line.partition('=')
            v = v.strip()
            if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                v = v[1:-1]
            values[k.strip()] = v
    failed = []
    for name in SECRETS:
        v = values.get(name, '')
        if not v:
            failed.append(name)
            print(f"  {name:32s}  FAIL (empty in .env.local)")
            continue
        try:
            r = subprocess.run(
                ['npx', 'wrangler@latest', 'secret', 'put', name],
                input=v,
                capture_output=True,
                text=True,
                cwd=str(APP_DIR),
                timeout=180,
            )
        except subprocess.TimeoutExpired:
            failed.append(name)
            print(f"  {name:32s}  FAIL (timeout)")
            continue
        out = (r.stdout or '') + (r.stderr or '')
        ok = (r.returncode == 0) and any(
            tok in out for tok in ('Success', 'Created', 'Uploaded', 'successfully')
        )
        if ok:
            print(f"  {name:32s}  set")
        else:
            failed.append(name)
            tail = '\n'.join(out.splitlines()[-2:]).replace(v, '[REDACTED]')
            print(f"  {name:32s}  FAIL ({r.returncode}) — {tail}")
    return 0 if not failed else 2


if __name__ == '__main__':
    sys.exit(main())
