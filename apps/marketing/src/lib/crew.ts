/**
 * The Amagna AI crew — canon roster (Andrew's source of truth). Shared by the
 * `/crew` page and Frame 2 of the voyage so the names, titles, portraits, and
 * anchors never drift. Andrew (the founder) is the human at the helm of the
 * company; Zeno captains the AI fleet — they are distinct.
 *
 * Portraits live at `public/brand/crew/<slug>.webp`. Most are 16:9 landscape;
 * Solon is portrait. Rendered with object-cover, centered.
 */
export type CrewMember = {
  /** URL slug + anchor id on /crew (e.g. /crew#zeno). */
  slug: 'zeno' | 'exodus' | 'solon' | 'hero' | 'thales';
  name: string;
  /** Role title (canon). */
  title: string;
  /** One-line responsibility (Frame 2 columns). */
  blurb: string;
  /** Fuller description (the /crew page). */
  description: string;
  /** The human-in-the-loop trust line. */
  trust: string;
  /** True for Zeno — the captain gets a visual distinction. */
  captain?: boolean;
  /** Intrinsic portrait size for next/image. */
  w: number;
  h: number;
};

export const CREW: readonly CrewMember[] = [
  {
    slug: 'zeno',
    name: 'Zeno',
    title: 'Captain · The Brain',
    blurb: 'Orchestrates the whole fleet — every agent answers to him.',
    description:
      'The orchestrator. Zeno reads the goal, assigns the work, and keeps every other agent rowing in the same direction — the brain that turns a plan into coordinated motion.',
    trust: 'Zeno proposes the course; a human approves it before the fleet sails.',
    captain: true,
    w: 1200,
    h: 675,
  },
  {
    slug: 'exodus',
    name: 'Exodus',
    title: 'Creative Specialist',
    blurb: 'Generates the videos, content, and blogs that fill your channels.',
    description:
      'Exodus is the maker — it produces the short-form videos, writes the posts and blogs, and turns your brand into a steady stream of creative that still sounds like you.',
    trust: 'You see and can edit every piece before it publishes.',
    w: 1200,
    h: 675,
  },
  {
    slug: 'solon',
    name: 'Solon',
    title: 'Outreach & Retention',
    blurb: 'Keeps clients and leads in the boat — outreach that lands, follow-up that holds.',
    description:
      'Solon keeps the relationships warm: outreach that actually lands, and follow-up that keeps clients and leads from drifting away between touches.',
    trust: 'Every message is approved before it reaches a real person.',
    w: 1000,
    h: 1200,
  },
  {
    slug: 'hero',
    name: 'Hero',
    title: 'Automation Specialist',
    blurb: 'Builds the systems that keep running while you sleep.',
    description:
      'Hero builds and wires the automations — the systems that move the work forward around the clock without anyone touching a keyboard.',
    trust: 'New automations are tested and signed off before they go live.',
    w: 1200,
    h: 675,
  },
  {
    slug: 'thales',
    name: 'Thales',
    title: 'Marketing Specialist',
    blurb: 'Meta, TikTok, Google, and Snapchat — the ads and content that bring the wind.',
    description:
      'Thales runs the paid and organic engine across Meta, TikTok, Google, and Snapchat — the ads and content that fill the sails and keep the pipeline moving.',
    trust: 'Spend and creative are approved by a human before anything launches.',
    w: 1200,
    h: 675,
  },
] as const;
