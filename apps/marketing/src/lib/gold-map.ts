import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import type { GoldMapIntake, GoldMapPlan } from './gold-map-shared';
import { intakeSummary } from './gold-map-shared';
import { env } from './env';

export type { GoldMapIntake, GoldMapPlan } from './gold-map-shared';

/**
 * Generate the "Plan to Gold" — the genuinely-good, specific plan that IS the
 * sales pitch. Server-only (imports the Anthropic SDK). Reuses the proven
 * audit tool-use pattern: forces structured JSON via a tool schema, falls back
 * gracefully when no API key is set.
 */
const SYSTEM_PROMPT = `You are an Amagna AI growth strategist writing a custom marketing plan for a small-business operator who just asked for one. Amagna builds "Autonomous Marketing Systems" — a crew of AI agents (Zeno orchestrates; Exodus makes content/video; Solon runs outreach & retention; Hero builds automations; Thales runs Meta/TikTok/Google ads) plus humans in the loop.

Audience: a busy operator (e.g. a home-services owner or real-estate agent). They do NOT care about "AI", "LLMs", or "agents" — they care about more calls, more customers, more revenue. They skim. Write so every line lands in one breath.

VOICE — tight and high-signal:
- Short lines. Lead with the verb. Cut every word that isn't doing work.
- Each step is ONE concrete action, ideally under ~16 words. No two-clause run-ons, no "in order to", no "this will help you".
- NO throat-clearing, NO setup sentences, NO buzzwords, NO recap of their own business back at them. Get straight to the move.
- Specificity is the whole point — name the channel, the area, the offer, the rough budget, the real tactic. Spend your words on specifics, never on prose.

HONESTY:
- NO invented numbers, rankings, or guarantees. We do NOT run live ranking checks yet — never claim "we analyzed your rankings/SEO" or imply you measured their site. You may reference their channels and obvious gaps, and note that the crew reviews live rankings on the call.
- Speak in typical-operator terms ("most operators in your spot…") rather than fake precision.
- NO exclusivity claims (never "one client per area" / "we won't work with competitors").

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
        description: 'Max 2 short sentences: where they are now → where this takes them in ~90 days. No throat-clearing, no recap of their business.',
      },
      phases: {
        type: 'array',
        minItems: 3,
        maxItems: 3,
        description: 'Exactly 3 ordered phases of the plan.',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Short phase name (2-5 words), e.g. "Get found".' },
            timeframe: { type: 'string', description: 'e.g. "First 2 weeks".' },
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
      firstMove: {
        type: 'string',
        description: 'The single most important first move this week. One or two tight sentences, action-first.',
      },
    },
    required: ['headline', 'summary', 'phases', 'crewHandles', 'firstMove'],
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
        timeframe: 'First 2 weeks',
        steps: [
          'Rebuild your Google Business Profile and website so they convert the traffic you already get.',
          'Map your top service keywords and the gaps your competitors are leaving open.',
        ],
      },
      {
        title: 'Turn on demand',
        timeframe: 'Weeks 2–6',
        steps: [
          'Launch a focused Meta/Google ad set aimed at your best service and area.',
          'Start a weekly short-form content rhythm in your voice.',
        ],
      },
      {
        title: 'Keep them',
        timeframe: 'Weeks 6–12',
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
    firstMove: 'Book a 20-minute call so we can confirm the plan and set the first two weeks in motion.',
  };
}

export async function generateGoldMapPlan(
  intake: GoldMapIntake,
  key?: string,
): Promise<GoldMapPlan> {
  const apiKey = env('ANTHROPIC_API_KEY');
  if (!apiKey) return fallbackPlan(intake);

  const anthropic = new Anthropic({ apiKey });
  const userPrompt = `Write a custom Plan to Gold for this operator.

Their intake:
${intakeSummary(intake)}
${key ? `\nThe operator also handed us this "master prompt" key from their own AI — use it for extra context:\n"""\n${key.slice(0, 6000)}\n"""` : '\n(No master-prompt key provided — chart the plan from the intake alone.)'}

Produce the plan using the submit_plan tool.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      tools: [SUBMIT_PLAN_TOOL],
      tool_choice: { type: 'tool', name: 'submit_plan' },
      messages: [{ role: 'user', content: userPrompt }],
    });
    const toolUse = response.content.find((b) => b.type === 'tool_use');
    if (toolUse && toolUse.type === 'tool_use') {
      return toolUse.input as GoldMapPlan;
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
