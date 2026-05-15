import 'server-only';
import Anthropic from '@anthropic-ai/sdk';
import type { Audit, AuditInput } from './audit-shared';

// Re-export shared types so existing call sites that imported from `@/lib/audit`
// keep working — server modules can import everything from here, clients should
// import from `@/lib/audit-shared`.
export type { Audit, AuditInput } from './audit-shared';
export { NICHE_OPTIONS, QUICK_FILL_CHIPS, validateAuditInput } from './audit-shared';

// ---------------------------------------------------------------------------
// Audit generation.
//
// Per the Phase 1.5 brief: Sapt SERP/GBP MCP is the *primary* data source.
// Until the Sapt SDK + credentials land (see SAPT_API_KEY in env.example) the
// generator falls back to Anthropic Claude with a tool-use schema that
// guarantees structured JSON output. If neither is configured we still return
// a graceful "we'll follow up" audit so the widget never breaks.
// ---------------------------------------------------------------------------

const AUDIT_SYSTEM_PROMPT = `You are an Amagna AI growth strategist auditing a small-business owner's marketing situation. Tone: direct, operator-first, no jargon. The audience is a home services owner or a real estate agent — they don't care about "AI", "LLMs", or "agents", they care about more calls and more listings.

Produce a concrete, opinionated audit. Be specific to the business and niche. Reference real tactics (Google Business Profile, local SEO, Meta ads, reviews, content cadence) by name. Never invent numbers or rankings you can't verify; speak in terms of typical operator patterns.

You MUST respond by calling the submit_audit tool. Do not output prose.`;

const SUBMIT_AUDIT_TOOL: Anthropic.Messages.Tool = {
  name: 'submit_audit',
  description: 'Return the structured audit for the operator.',
  input_schema: {
    type: 'object',
    properties: {
      whereYouStand: {
        type: 'array',
        items: { type: 'string' },
        minItems: 3,
        maxItems: 4,
        description: '3-4 specific observations about their current online presence (GBP, web, search, competitor positioning).',
      },
      whatsMissing: {
        type: 'array',
        items: { type: 'string' },
        minItems: 2,
        maxItems: 3,
        description: '2-3 specific gaps that are costing them business right now.',
      },
      thirtyDayPlan: {
        type: 'array',
        items: { type: 'string' },
        minItems: 5,
        maxItems: 5,
        description: 'Exactly 5 concrete actions to take in the next 30 days, in order, tailored to the stated goal.',
      },
      opportunity: {
        type: 'string',
        description: 'One paragraph framing what this business becomes in 90 days if the plan runs.',
      },
    },
    required: ['whereYouStand', 'whatsMissing', 'thirtyDayPlan', 'opportunity'],
  },
};

function fallbackAudit(input: AuditInput): Audit {
  return {
    whereYouStand: [
      `Thanks for the details on ${input.businessName}. We are still wiring up the live audit pipeline.`,
      'Andrew will personally review your situation and reply within one business day.',
      'In the meantime, your full audit + 30-day plan will land in your inbox.',
    ],
    whatsMissing: [
      'A real-time audit needs our Sapt SERP and Anthropic API keys, which are being provisioned today.',
      'You will not be charged for anything in the meantime.',
    ],
    thirtyDayPlan: [
      'We email you a full custom audit within one business day.',
      'You book a 20-minute call from the link below if you want to talk it through.',
      'We map your top 3 service keywords and competitor gaps.',
      'We draft your 30-day execution plan and share it before the call.',
      'If you decide to move forward, we go live in two weeks.',
    ],
    opportunity:
      'You skipped the gatekeepers and asked directly. That puts you ahead of most operators in your zip code. We will be back with the full audit shortly.',
  };
}

/**
 * Generate the audit for a submission. Server-only.
 * Sapt SERP integration wires in through this same surface once credentials land.
 */
export async function generateAudit(input: AuditInput): Promise<Audit> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return fallbackAudit(input);

  const anthropic = new Anthropic({ apiKey });
  const nicheLabel =
    input.niche === 'home_services'
      ? 'home services owner'
      : input.niche === 'real_estate'
        ? 'real estate agent / team'
        : 'small-business owner';

  const userPrompt = `Audit this operator's marketing situation.

Niche: ${nicheLabel}
Business name: ${input.businessName}
Their stated situation and goal:
${input.situationText}

Produce the audit using the submit_audit tool.`;

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-7',
      max_tokens: 1500,
      system: AUDIT_SYSTEM_PROMPT,
      tools: [SUBMIT_AUDIT_TOOL],
      tool_choice: { type: 'tool', name: 'submit_audit' },
      messages: [{ role: 'user', content: userPrompt }],
    });
    const toolUse = response.content.find((b) => b.type === 'tool_use');
    if (toolUse && toolUse.type === 'tool_use') {
      return toolUse.input as Audit;
    }
    return fallbackAudit(input);
  } catch (error) {
    console.error('[audit] Anthropic generation failed', error);
    return fallbackAudit(input);
  }
}
