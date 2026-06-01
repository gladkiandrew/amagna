#!/usr/bin/env bash
# Interactively prompts you to paste each production-Worker secret. Each
# value goes straight to `wrangler secret put` via TTY (no echo, no shell
# history, no transcript).
#
# Run from repo root:   bash scripts/set-prod-worker-secrets.sh
#
# Worker target is read from apps/marketing/wrangler.jsonc (currently
# "amagna-marketing-app"). To set secrets on a different worker, prepend
# CLOUDFLARE_API_TOKEN + WRANGLER_NAME=... or run from a different cwd.

set -eu
cd "$(dirname "$0")/../apps/marketing"

# Load Cloudflare token (NOT the secrets — those come from your fingers).
if [ -f .env.local ]; then
  # shellcheck disable=SC1091
  set -a; source .env.local; set +a
fi

SECRETS=(
  STRIPE_SECRET_KEY
  STRIPE_WEBHOOK_SECRET
  STRIPE_PRICE_GROWTH
  STRIPE_PRICE_UPDATE
  ANTHROPIC_API_KEY
  SUPABASE_URL
  RESEND_API_KEY
  # SUPABASE_SERVICE_ROLE_KEY already set by the cutover script.
)

echo "Setting ${#SECRETS[@]} secrets on the production Worker. wrangler will"
echo "prompt for each value — paste it in and press Enter. The value never"
echo "appears in this terminal's output or in any chat transcript."
echo ""

for NAME in "${SECRETS[@]}"; do
  echo "----- $NAME -----"
  # `--quiet` suppresses extra wrangler chatter but keeps the prompt.
  npx wrangler@latest secret put "$NAME" || {
    echo "FAILED on $NAME — re-run the script to resume." >&2
    exit 1
  }
done

echo ""
echo "Done. Verify with:  npx wrangler@latest secret list  (from apps/marketing)"
