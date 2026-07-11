import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import type { GoldMapIntake, GoldMapPlan } from './gold-map-shared';
import { intakeSummary, linksHaveAndMissing, coercePlan } from './gold-map-shared';
import { env } from './env';

export type { GoldMapIntake, GoldMapPlan } from './gold-map-shared';

/**
 * Generate the "Plan to Gold" — the genuinely-good, specific plan that IS the
 * sales pitch. Server-only (imports the Anthropic SDK). Reuses the proven
 * audit tool-use pattern: forces structured JSON via a tool schema, falls back
 * gracefully when no API key is set.
 */
const SYSTEM_PROMPT = `You are an Amagna AI growth strategist writing a custom plan for an operator who just asked for one. Amagna installs a Second Brain in businesses — one central memory layer plus a crew of AI agents (Zeno captains the fleet & builds automations; Exodus makes content & video; Vela runs Meta/TikTok/Google/Snapchat ads & demand; Solon runs outreach & retention; Mansa guards memory & security) plus humans in the loop. The brain runs marketing AND operations: marketing is one output; outreach, operations, and reporting are the others.

Audience: a busy operator — anywhere from a solo local business to a multi-location, 8-figure company. They do NOT care about "AI", "LLMs", or "agents" — they care about more calls, more customers, more revenue, and hours back. They skim. Write so every line lands in one breath.

SCALE — match the advice to the operator:
- Read the revenue and team-size lines FIRST and write for that operator. Never hand a $400K+/mo or $1M+/mo company "post weekly on Facebook" basics — at that scale think pipeline and ops automation, multi-location consistency, paid acquisition at real budgets, and reporting the owner actually reads.
- Never hand a solo operator an enterprise rollout. Size every step to their team and budget.

OPS SIGNALS — the two highest-signal lines in the whole intake:
- "Ideal AI tools (their words)" and "Struggling workflows (their words)" are the operator telling you exactly where it hurts. When present, address them BY NAME in the plan — name the workflow, name the fix.
- At least one phase (or a clear thread through the phases) MUST be operations, not marketing: "automate X so Y stops taking Z hours." If they named struggling workflows, that is what it targets.
- If both lines are empty, still include one operations move sized to their scale.

VOICE — tight and high-signal:
- Short lines. Lead with the verb. Cut every word that isn't doing work.
- Each step is ONE concrete action, ideally under ~16 words. No two-clause run-ons, no "in order to", no "this will help you".
- NO throat-clearing, NO setup sentences, NO buzzwords, NO recap of their own business back at them. Get straight to the move.
- Specificity is the whole point — name the channel, the area, the offer, the rough budget, the real tactic. Spend your words on specifics, never on prose.

PRESENCE — build on what they've got:
- They may list links (website, Google Business Profile, Facebook, Instagram, TikTok, LinkedIn, YouTube). Build on the channels they HAVE and name the obvious gaps — a channel they're not on, or one that's clearly underused for their type.
- Reference it plainly: "you're already on X, so…" / "you're not on Y yet — that's where your buyers are." Tie each gap to a concrete first action.
- You can SEE which channels they linked, not what's on them. Never claim you reviewed the content, traffic, or rankings behind a link.

LOCAL — most operators here serve a specific town or area:
- If they named a city or service area, USE it by name in the plan (Phase 1 especially). Generic plans lose; "in [their town]" wins.
- Lead with the fastest local levers first: Google Business Profile (claim/rebuild + weekly posts), a steady review engine after every job, and a page that targets "[service] in [town]". These move the needle before paid ads do.
- Tie the ad step to their actual area + best service, with the rough daily budget.

HONESTY:
- NO invented numbers, rankings, or guarantees. We do NOT run live ranking checks yet — never claim "we analyzed your rankings/SEO" or imply you measured their site. Note that the crew reviews live rankings together on the call.
- Speak in typical-operator terms ("most operators in your spot…") rather than fake precision.
- NO exclusivity claims (never "one client per area" / "we won't work with competitors").

TIMELINE — plan a ~30-day (one-month) rollout, NOT 90 days. Use exactly these phase timeframes: Phase 1 = "First week", Phase 2 = "Weeks 2–3", Phase 3 = "Weeks 4–5". The summary frames the payoff in ~30 days. Never say 90 days.

RECOMMEND A PLAN — pick the ONE Amagna tier that fits this operator and say why, in their terms (no jargon):
- If they have NO website / funnel / real foundation yet → recommend FOUNDATION. They need the base built before running ads or content; do not push them into Growth.
- If they HAVE a foundation and want done-for-you ads + content → recommend GROWTH.
- If they want full business automation / custom AI agents + workflows → recommend AUTHORITY.
- Authority signals: they named struggling workflows or wished-for AI tools, sit in the larger revenue/team ranges ($400K+/mo, 41+ people), or their goals are about time and systems rather than just leads. Two or more of these → lean AUTHORITY.
Tier facts (use plainly, don't dump them all):
- Foundation: one-time $1,000 build (7 business days) + $50/mo infrastructure. The base only — no managed ads, no content generation.
- Growth: $1,250/mo + ad spend. The full done-for-you machine run by the crew (ads, content, follow-up, reviews, reporting).
- Authority: $2,000/mo + ad spend + token usage. Full business automation + custom AI agents & workflows, plus everything in Growth.
The "why" is one or two tight sentences in the operator's terms.

The plan must read as genuinely useful even if they never hire us — that's what earns the call. You MUST respond by calling the submit_plan tool. Do not output prose.`;

const SUBMIT_PLAN_TOOL: Anthropic.Messages.Tool = {
  name: 'submit_plan',
  description: 'Return the structured Plan to Gold for the operator.',
  input_schema: {
    type: 'object',
    properties: {
      headline: {
        type: 'string',
        description: 'One punchy line framing the opportunity, specific to this business. No preamble. Aim under 20 words.',
      },
      summary: {
        type: 'string',
        description: 'Max 2 short sentences: where they are now → where this takes them in ~30 days (one month). No throat-clearing, no recap of their business. Never say 90 days.',
      },
      phases: {
        type: 'array',
        minItems: 3,
        maxItems: 3,
        description: 'Exactly 3 ordered phases for a ~30-day rollout. Phase 1 timeframe "First week", Phase 2 "Weeks 2–3", Phase 3 "Weeks 4–5".',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Short phase name (2-5 words), e.g. "Get found".' },
            timeframe: { type: 'string', description: 'Exactly one of: "First week" (phase 1), "Weeks 2–3" (phase 2), "Weeks 4–5" (phase 3).' },
            steps: {
              type: 'array',
              items: {
                type: 'string',
                description: 'ONE concrete action, verb-first, ideally under ~16 words. Name the channel/area/offer/budget. No second clause explaining why.',
              },
              minItems: 2,
              maxItems: 4,
              description: '2-4 concrete, scannable actions for this phase, tailored to their intake.',
            },
          },
          required: ['title', 'timeframe', 'steps'],
        },
      },
      crewHandles: {
        type: 'array',
        items: {
          type: 'string',
          description: 'One short plain-English thing the crew runs for them. Under ~12 words. No explanation tail.',
        },
        minItems: 3,
        maxItems: 5,
        description: '3-5 things the Amagna crew/system runs for them day to day.',
      },
      recommendedPlan: {
        type: 'object',
        description: 'The single Amagna tier that best fits this operator right now, with a short why in their terms.',
        properties: {
          tier: {
            type: 'string',
            enum: ['Foundation', 'Growth', 'Authority'],
            description:
              'Foundation if they have no website/funnel/foundation yet (build the base first). Growth if they have a base and want done-for-you ads + content. Authority if they want full business automation / custom AI agents + workflows.',
          },
          why: {
            type: 'string',
            description: 'One or two tight sentences, operator terms, why this tier fits them now. No jargon.',
          },
        },
        required: ['tier', 'why'],
      },
      firstMove: {
        type: 'string',
        description: 'The single most important first move this week. One or two tight sentences, action-first.',
      },
    },
    required: ['headline', 'summary', 'phases', 'crewHandles', 'recommendedPlan', 'firstMove'],
  },
};

function fallbackPlan(intake: GoldMapIntake): GoldMapPlan {
  return {
    headline: `A steadier, owned pipeline for ${intake.businessName || 'your business'}.`,
    summary:
      'Your full Plan to Gold is being charted and will land in your inbox shortly. Andrew reviews every map personally — book a call below and we will walk it through together.',
    phases: [
      {
        title: 'Get found',
        timeframe: 'First week',
        steps: [
          'Rebuild your Google Business Profile and website so they convert the traffic you already get.',
          'Map your top service keywords and the gaps your competitors are leaving open.',
        ],
      },
      {
        title: 'Turn on demand',
        timeframe: 'Weeks 2–3',
        steps: [
          'Launch a focused Meta/Google ad set aimed at your best service and area.',
          'Start a weekly short-form content rhythm in your voice.',
        ],
      },
      {
        title: 'Keep them',
        timeframe: 'Weeks 4–5',
        steps: [
          'Automate review requests after every job and a follow-up sequence for every lead.',
          'Review the numbers weekly in plain English and double down on what works.',
        ],
      },
    ],
    crewHandles: [
      'Your content and ads, produced and managed for you',
      'Follow-up and review requests, handled automatically',
      'A weekly plain-English report so you always know where things stand',
    ],
    recommendedPlan: {
      tier: 'Growth',
      why: 'Growth is the most common fit — the full done-for-you machine. We will confirm the exact tier with you on the call.',
    },
    firstMove: 'Book a 20-minute call so we can confirm the plan and set the first week in motion.',
  };
}

export async function generateGoldMapPlan(
  intake: GoldMapIntake,
  key?: string,
): Promise<GoldMapPlan> {
  const apiKey = env('ANTHROPIC_API_KEY');
  if (!apiKey) return fallbackPlan(intake);

  // Hardening for Cloudflare Workers: cap a single attempt at 25s and allow one
  // retry, so a slow/hung Anthropic call can never hang the request past the
  // Worker limit. On timeout the catch below returns fallbackPlan — the lead was
  // already captured at Step 1, so nothing is ever lost.
  const anthropic = new Anthropic({ apiKey, timeout: 25_000, maxRetries: 1 });
  const { have, missing } = linksHaveAndMissing(intake.links);
  const presenceLine =
    have.length || missing.length
      ? `\nOnline presence — has a link for: ${have.length ? have.join(', ') : 'none'}. No link yet for: ${
          missing.length ? missing.join(', ') : 'none'
        }. Build on what they have; name the gaps as opportunities. (You can see which channels they linked, not the content behind them.)`
      : '';
  const userPrompt = `Write a custom Plan to Gold for this operator.

Their intake:
${intakeSummary(intake)}
${presenceLine}
${key ? `\nThe operator also handed us this "master prompt" key from their own AI — use it for extra context:\n"""\n${key.slice(0, 6000)}\n"""` : '\n(No master-prompt key provided — chart the plan from the intake alone.)'}

Produce the plan using the submit_plan tool.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 2600,
      system: SYSTEM_PROMPT,
      tools: [SUBMIT_PLAN_TOOL],
      tool_choice: { type: 'tool', name: 'submit_plan' },
      messages: [{ role: 'user', content: userPrompt }],
    });
    const toolUse = response.content.find((b) => b.type === 'tool_use');
    if (toolUse && toolUse.type === 'tool_use') {
      // The model forces the tool, but can still nest or omit fields — validate
      // before trusting it, or a malformed plan crashes the email + render.
      const coerced = coercePlan(toolUse.input);
      if (coerced) return coerced;
      console.error('[gold-map] tool output failed shape validation; using fallback', {
        stopReason: response.stop_reason,
        topKeys: toolUse.input && typeof toolUse.input === 'object' ? Object.keys(toolUse.input) : typeof toolUse.input,
      });
    }
    return fallbackPlan(intake);
  } catch (error) {
    console.error('[gold-map] Anthropic generation failed', error);
    return fallbackPlan(intake);
  }
}

/**
 * The complete plan rendered as readable plain text — headline, summary, every
 * phase + step, what the crew handles, and the first move. This is the SAME
 * content shown on screen, and it's shared by both the lead email and Andrew's
 * lead notification so neither can drift to a truncated version.
 */
export function planBodyText(plan: GoldMapPlan): string {
  const lines: string[] = [];
  lines.push(plan.headline);
  lines.push('');
  lines.push(plan.summary);
  lines.push('');
  plan.phases.forEach((phase, i) => {
    lines.push(`${i + 1}. ${phase.title} — ${phase.timeframe}`);
    for (const step of phase.steps) lines.push(`   • ${step}`);
    lines.push('');
  });
  lines.push('What the crew handles for you:');
  for (const c of plan.crewHandles) lines.push(`  • ${c}`);
  lines.push('');
  lines.push(`Recommended plan: ${plan.recommendedPlan.tier}`);
  lines.push(plan.recommendedPlan.why);
  lines.push('');
  lines.push(`First move: ${plan.firstMove}`);
  return lines.join('\n');
}

/** Plain-text rendering of the plan for the lead's follow-up email (voyage voice). */
export function planToEmailText(intake: GoldMapIntake, plan: GoldMapPlan): string {
  const lines: string[] = [];
  lines.push(`${intake.name ? intake.name + ',' : 'Hi,'}`);
  lines.push('');
  lines.push('Here is your Plan to Gold — the map the crew charted from your log.');
  lines.push('');
  lines.push(planBodyText(plan));
  lines.push('');
  lines.push('The map is yours. The crew sails when you say go — book a call: https://amagna.co/book');
  lines.push('');
  lines.push('— Andrew & the Amagna crew');
  return lines.join('\n');
}
