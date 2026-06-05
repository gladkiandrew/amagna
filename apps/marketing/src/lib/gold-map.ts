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

Audience: an operator (e.g. a home-services owner or real-estate agent). They do NOT care about "AI", "LLMs", or "agents" — they care about more calls, more customers, more revenue. Write in plain English a busy owner understands. Be direct and operator-first.

Rules:
- Be SPECIFIC to this business, its type, revenue range, team size, area, channels, and stated goals.
- Concrete actions only (Google Business Profile, local SEO, Meta ads, short-form video, reviews, follow-up sequences, etc.) — name real tactics.
- NO fluffy filler, NO buzzwords, NO invented numbers, rankings, or guarantees you can't verify. Speak in terms of typical operator patterns ("most operators in your spot…").
- The plan must read as genuinely useful even if they never hire us — that's what earns the call.
- NO exclusivity claims (never "one client per area" / "we won't work with competitors").

You MUST respond by calling the submit_plan tool. Do not output prose.`;

const SUBMIT_PLAN_TOOL: Anthropic.Messages.Tool = {
  name: 'submit_plan',
  description: 'Return the structured Plan to Gold for the operator.',
  input_schema: {
    type: 'object',
    properties: {
      headline: {
        type: 'string',
        description: 'A punchy one-line framing of the opportunity, specific to this business.',
      },
      summary: {
        type: 'string',
        description: 'One short paragraph: where they are now → where this plan takes them in ~90 days.',
      },
      phases: {
        type: 'array',
        minItems: 3,
        maxItems: 3,
        description: 'Exactly 3 ordered phases of the plan.',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Short phase name, e.g. "Get found".' },
            timeframe: { type: 'string', description: 'e.g. "First 2 weeks".' },
            steps: {
              type: 'array',
              items: { type: 'string' },
              minItems: 2,
              maxItems: 4,
              description: '2-4 concrete actions for this phase, tailored to their intake.',
            },
          },
          required: ['title', 'timeframe', 'steps'],
        },
      },
      crewHandles: {
        type: 'array',
        items: { type: 'string' },
        minItems: 3,
        maxItems: 5,
        description: '3-5 plain-English things the Amagna crew/system runs for them day to day.',
      },
      firstMove: {
        type: 'string',
        description: 'The single most important first move to make this week.',
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

/** Plain-text rendering of the plan for the follow-up email (voyage voice). */
export function planToEmailText(intake: GoldMapIntake, plan: GoldMapPlan): string {
  const lines: string[] = [];
  lines.push(`${intake.name ? intake.name + ',' : 'Hi,'}`);
  lines.push('');
  lines.push('Here is your Plan to Gold — the map the crew charted from your log.');
  lines.push('');
  lines.push(plan.headline);
  lines.push('');
  lines.push(plan.summary);
  lines.push('');
  for (const phase of plan.phases) {
    lines.push(`${phase.title} — ${phase.timeframe}`);
    for (const step of phase.steps) lines.push(`  • ${step}`);
    lines.push('');
  }
  lines.push('What the crew handles for you:');
  for (const c of plan.crewHandles) lines.push(`  • ${c}`);
  lines.push('');
  lines.push(`First move: ${plan.firstMove}`);
  lines.push('');
  lines.push('The map is yours. The crew sails when you say go — book a call: https://amagna.co/book');
  lines.push('');
  lines.push('— Andrew & the Amagna crew');
  return lines.join('\n');
}
