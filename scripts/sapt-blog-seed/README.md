# Sapt blog seed — staged industry posts (NOT yet published)

10 industry blog posts written to give every Who-We-Serve sub-page 2 related
posts. **They are NOT published** — the Sapt REST API (`api.sapt.ai`) is
**read-only for CMS content** (verified against its OpenAPI spec: only
`GET /projects/{id}/cms/content/{type}` and `…/{type}/{slug}` exist; there is no
POST/PUT/PATCH for content). Content writes only go through the Sapt **MCP
`saveContent`** tool or the dashboard.

## What's here
- `seed.mjs` — generates the post bodies and (when a write path exists) posts them.
- `out/*.json` — the 10 posts staged as ready-to-publish JSON (one file per slug),
  in the exact Sapt CMS item shape (`{ slug, name, status, publishedAt, tags, content:{…} }`).

## Posts staged (2 per industry once published; counts include existing Sapt posts)
- **Home Services** (+1): `google-business-profile-cheapest-lead-source`
- **Real Estate** (+1): `real-estate-follow-up-system-leads-into-listings`
- **Medical Offices** (+2): `medical-practices-fill-schedule-without-headache`, `turn-patients-into-reviews-automatically`
- **Ecommerce** (+2): `always-on-ad-creative-system-ecommerce`, `ecommerce-email-sms-flows-bring-buyers-back`
- **Multi-Location** (+2): `multi-location-brands-on-brand-and-full`, `local-seo-at-scale-multi-location-google-profiles`
- **Political** (+2): `local-candidates-build-name-recognition`, `campaign-rapid-response-on-autopilot`

Each has: title, slug, excerpt, body (markdown), seoTitle, seoDescription,
targetKeywords, category (exact value the site filters on), author "The Amagna
Crew", publishStatus "published", publishedAt 2026-06-08.

## How to publish when the MCP is back
For each item in `out/`, call the Sapt MCP `saveContent` (no `id` = create) with
`contentTypeSlug: "blog-post"` and the file's `content` object (plus `status:
"published"`). Or paste each into the Sapt dashboard CMS → blog-post.

After publishing, the site picks them up automatically within ~1 hour (niche
pages + `/blog` revalidate hourly), or trigger a redeploy to surface immediately.
The related-posts sections filter by the exact `category` values above, so don't
change them.

## If the REST API ever gains a content-write endpoint
`node seed.mjs --post` GETs existing slugs, skips them, and POSTs the rest. It
currently 404s because no write path exists. Run with the key in env
(`set -a && . apps/marketing/.env.local && set +a` first) — never hard-code it.
