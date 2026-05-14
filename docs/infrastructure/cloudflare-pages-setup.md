# Cloudflare Pages Setup — amagna.co

> **Status:** Live. `https://amagna.co` serves the marketing site (HTTP 200).
> **Last updated:** 2026-05-14

## What's deployed

The `apps/marketing` Next.js 14 app is live on Cloudflare Pages.

| Item | Value |
|---|---|
| Pages project | `amagna-marketing` |
| Project URL | `https://amagna-marketing.pages.dev` |
| Production domain | `https://amagna.co` |
| Secondary domain | `https://www.amagna.co` (see "www redirect" below) |
| Production branch | `main` |
| Compatibility flags | `nodejs_compat` |
| Cloudflare account | `5bfb8eefd63e128370fa0fa5776f2dd5` |
| amagna.co zone id | `945e4c1755f729e954b82f565ffc5e58` |

## How it's built and deployed

Next.js 14 with the App Router is **not** a static site — `/custom-quote` uses a
server action. So a plain `.next` folder or a static `out/` export won't run on
Pages. The build goes through the Cloudflare adapter:

```bash
cd apps/marketing
npx @cloudflare/next-on-pages         # runs next build, then adapts it
# output: apps/marketing/.vercel/output/static  (includes _worker.js)
```

Deploy (direct upload):

```bash
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=5bfb8eefd63e128370fa0fa5776f2dd5 \
  wrangler pages deploy apps/marketing/.vercel/output/static \
    --project-name amagna-marketing --branch main
```

## Environment variables (set on the Pages project)

| Variable | Production | Preview | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | ✅ | Public — inlined into client JS |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | ✅ | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ (secret) | ❌ | Production only — never in preview |
| `RESEND_API_KEY` | ⏳ not set yet | ⏳ | Needed for `/custom-quote` email — add when the Resend domain is verified |
| `NEXT_PUBLIC_CALENDLY_URL` | ⏳ not set yet | ⏳ | Needed for the `/book` widget |

> With **direct-upload** deploys the build runs locally, so `NEXT_PUBLIC_*` values
> are inlined from `apps/marketing/.env.local` at build time. The project-level
> vars above matter for runtime (`_worker.js`) and for the future Git-integration
> build path.

## DNS (amagna.co zone)

Changed during setup:
- **Deleted** `A amagna.co → 162.255.119.39` (Namecheap parking page)
- **Created** `CNAME amagna.co → amagna-marketing.pages.dev` (proxied)
- **Repointed** `CNAME www.amagna.co → amagna-marketing.pages.dev` (was Namecheap parking)

Left untouched: the `MX` records and `SPF`/`DKIM`/`DMARC` `TXT` records for
Cloudflare Email Routing (`andrew@amagna.co`).

## Known gaps — small follow-ups

1. **Git integration is not connected.** Cloudflare's API/`wrangler` cannot link a
   GitHub repo to a Pages project — that is a dashboard-only action. Today, deploys
   are **direct uploads** (the command above). To get auto-deploy on push + PR
   preview deploys: Cloudflare dashboard → Workers & Pages → `amagna-marketing` →
   Settings → connect the `gladkiandrew/amagna` repo (root dir `apps/marketing`,
   build command `npx @cloudflare/next-on-pages`, output `.vercel/output/static`).

2. **www → apex redirect is not a true 301 yet.** `www.amagna.co` currently *serves*
   the site (it is a Pages custom domain) rather than redirecting. The redirect rule
   couldn't be created — the provided API token lacks the Zone → Rulesets permission.
   To finish: dashboard → amagna.co → Rules → Redirect Rules → redirect
   `www.amagna.co` to `https://amagna.co` (301, preserve path + query). Or re-issue
   the token with Rulesets edit and it can be scripted.

## Re-deploying

Until Git integration is connected, a deploy is:

```bash
cd apps/marketing && npx @cloudflare/next-on-pages
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=5bfb8eefd63e128370fa0fa5776f2dd5 \
  wrangler pages deploy apps/marketing/.vercel/output/static \
    --project-name amagna-marketing --branch main
```
