import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * OpenNext Cloudflare config. Default cache/queue handlers are fine for the
 * marketing app — every page is either static or simple SSR; no ISR, no
 * background revalidation. Revisit when we add Phase 4 agent workflows.
 */
export default defineCloudflareConfig({});
