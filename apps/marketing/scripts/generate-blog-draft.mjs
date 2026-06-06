#!/usr/bin/env node
/**
 * AI blog-draft generator — writes a new post in Amagna voice targeting a
 * keyword, then files it as a DRAFT for human approval. NEVER auto-publishes.
 *
 * Human-in-the-loop: drafts land as status `draft` / publishStatus `pending`.
 * Andrew approves in the Sapt dashboard (flip to `published`, set publishedAt).
 *
 * Usage (run from apps/marketing so node_modules resolves):
 *   set -a; . ./.env.local; set +a
 *   node scripts/generate-blog-draft.mjs "your target keyword"      # writes to Sapt if keyed, else local
 *   node scripts/generate-blog-draft.mjs "keyword" --dry-run        # generate + save locally only (never touches Sapt)
 *
 * Env: ANTHROPIC_API_KEY (required to generate), SAPT_API_KEY + SAPT_PROJECT_ID
 * (optional; when set the draft is POSTed to Sapt), SAPT_API_URL (default api.sapt.ai).
 *
 * NOTE: Sapt's public REST OpenAPI exposes only content READS; the create-content
 * write is via tRPC/the connector and is NOT confirmable without the key. The
 * write call below uses the most-likely REST shape and is GUARDED — on any
 * non-2xx it saves the draft locally and logs loudly so the run never fails and
 * Andrew can paste it into Sapt (or confirm the endpoint). See REPORT-6.md.
 */
import Anthropic from '@anthropic-ai/sdk';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MODEL = 'claude-opus-4-7';
const CONTENT_TYPE = 'blog-post';
const DEFAULT_BASE = 'https://api.sapt.ai';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const keyword = args.filter((a) => !a.startsWith('--')).join(' ').trim()
  || 'how local service businesses get more booked jobs with AI';

const SYSTEM_PROMPT = `You write blog posts for Amagna AI, an AI-native marketing agency.

Positioning: Amagna builds "Autonomous Marketing Systems" — the machine that runs a business's marketing (content, ads, follow-up) plus the content that fuels it, with a human watching the wheel. It serves any operator who wants marketing that runs itself; home services and real estate are the two lead niches.

Voice: operator-to-operator, plain English, confident, zero marketing fluff or hype. Short sentences. Concrete. Like a sharp founder explaining something to a busy business owner. Light nautical brand flavor is fine but sparing. First person is OK (founder voice).

Hard rules:
- NEVER invent client names, testimonials, or specific result numbers/percentages. Keep claims general and honest.
- NEVER promise exclusivity ("only one client per area", etc.).
- Don't disparage competitors.
- End with a soft CTA pointing to the free Gold Map at /audit.

Output 600-900 words of Markdown body using ## and ### headings, short paragraphs, and lists where natural. Use a markdown link to /audit for the CTA.`;

const SUBMIT_POST_TOOL = {
  name: 'submit_post',
  description: 'Submit the finished blog post.',
  input_schema: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'Compelling, specific post title.' },
      slug: { type: 'string', description: 'kebab-case URL slug, no leading slash.' },
      excerpt: { type: 'string', description: '1-2 sentence summary for cards and meta description.' },
      body: { type: 'string', description: 'Full post body in Markdown (## / ### headings, lists, a /audit link).' },
      category: { type: 'string', description: 'One of: Foundations, Playbooks, Field Notes.' },
      seoTitle: { type: 'string', description: 'SEO title (~60 chars), include the target keyword.' },
      seoDescription: { type: 'string', description: 'Meta description (~155 chars).' },
      targetKeywords: { type: 'array', items: { type: 'string' }, description: '3-5 target keywords.' },
    },
    required: ['title', 'slug', 'excerpt', 'body', 'category', 'seoTitle', 'seoDescription', 'targetKeywords'],
  },
};

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

async function generate() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.length === 0) fail('ANTHROPIC_API_KEY not set (source apps/marketing/.env.local first).');

  const anthropic = new Anthropic({ apiKey });
  console.log(`▸ Generating draft for keyword: "${keyword}" (model ${MODEL})…`);
  const res = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    tools: [SUBMIT_POST_TOOL],
    tool_choice: { type: 'tool', name: 'submit_post' },
    messages: [{ role: 'user', content: `Write a blog post targeting this keyword/topic: "${keyword}". Use the submit_post tool.` }],
  });
  const toolUse = res.content.find((b) => b.type === 'tool_use');
  if (!toolUse) fail('Model did not return a post.');
  const post = toolUse.input;
  // Light validation/normalization.
  post.slug = String(post.slug || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  if (!post.slug || !post.title || !post.body) fail('Generated post missing slug/title/body.');
  if (!Array.isArray(post.targetKeywords)) post.targetKeywords = [];
  return post;
}

function saveLocal(post) {
  const dir = join(process.cwd(), 'drafts');
  mkdirSync(dir, { recursive: true });
  const jsonPath = join(dir, `${post.slug}.json`);
  const mdPath = join(dir, `${post.slug}.md`);
  writeFileSync(jsonPath, JSON.stringify(post, null, 2));
  writeFileSync(
    mdPath,
    `# ${post.title}\n\n> ${post.excerpt}\n\n_Category: ${post.category} · Keywords: ${post.targetKeywords.join(', ')}_\n\n${post.body}\n`,
  );
  console.log(`✓ Draft saved locally:\n  ${jsonPath}\n  ${mdPath}`);
}

/**
 * Attempt to create the draft in Sapt as status `draft` / publishStatus
 * `pending`. GUARDED: returns false (caller saves locally) on any failure.
 * The exact create endpoint is unconfirmed via the public REST spec — this is
 * the most-likely shape; verify against your Sapt account.
 */
async function writeToSapt(post) {
  const key = process.env.SAPT_API_KEY;
  const projectId = process.env.SAPT_PROJECT_ID;
  const base = process.env.SAPT_API_URL || DEFAULT_BASE;
  if (!key || !projectId) {
    console.log('• Sapt not keyed (SAPT_API_KEY/SAPT_PROJECT_ID) — saving locally instead.');
    return false;
  }
  const url = `${base}/projects/${encodeURIComponent(projectId)}/cms/content/${CONTENT_TYPE}`;
  const payload = {
    slug: post.slug,
    name: post.title,
    status: 'draft', // item-level: NOT published
    tags: ['ai-draft', ...(post.category ? [String(post.category).toLowerCase()] : [])],
    content: {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      body: post.body,
      author: 'The Amagna Crew',
      category: post.category,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      targetKeywords: post.targetKeywords,
      publishStatus: 'pending', // content-level gate: never public until approved
    },
  };
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `ApiKey ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (r.ok) {
      console.log(`✓ Draft created in Sapt as PENDING (status=draft). Approve it in the Sapt dashboard.`);
      return true;
    }
    console.warn(`• Sapt write returned HTTP ${r.status} (create endpoint may differ) — saving locally instead.`);
    return false;
  } catch (err) {
    console.warn(`• Sapt write failed (${err.message}) — saving locally instead.`);
    return false;
  }
}

const post = await generate();
console.log(`\n— "${post.title}"  (/blog/${post.slug})  [${post.category}]\n  ${post.excerpt}\n`);

if (dryRun) {
  console.log('• --dry-run: not touching Sapt.');
  saveLocal(post);
} else {
  const wrote = await writeToSapt(post);
  if (!wrote) saveLocal(post);
}
console.log('\nDone. Drafts are NEVER auto-published — approve in Sapt (flip publishStatus → published, set publishedAt).');
