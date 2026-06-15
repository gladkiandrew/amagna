/**
 * The Amagna AI crew — canon roster (Andrew's source of truth). Shared by the
 * `/crew` page and Frame 2 of the voyage so the names, titles, portraits, and
 * anchors never drift. Andrew (the founder) is the human at the helm of the
 * company; Zeno captains the AI fleet — they are distinct.
 *
 * Portraits live at `public/brand/crew/<slug>.webp`. Zeno/Exodus are 16:9
 * landscape; Solon/Mansa/Vela are portrait. Rendered with object-cover, centered.
 */
export type CrewMember = {
  /** URL slug + anchor id on /crew (e.g. /crew#zeno). */
  slug: 'zeno' | 'exodus' | 'solon' | 'mansa' | 'vela';
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
    title: 'Captain · Automation Specialist',
    blurb: 'Sets the course and keeps the whole system running.',
    description:
      'The brain of the fleet. Zeno sets the course and keeps the system running — orchestrates every agent, routes the work, holds the gates, and turns strategy into automated motion that runs around the clock.',
    trust: 'Zeno proposes the course; a human approves it before the fleet sails.',
    captain: true,
    w: 1200,
    h: 675,
  },
  {
    slug: 'exodus',
    name: 'Exodus',
    title: 'Creative & Content Specialist',
    blurb: 'Turns your brand into a daily presence across every channel.',
    description:
      'Exodus is the maker — it turns your brand into a daily presence, generating the images, video, and copy and shipping them across your channels in a voice that still sounds like you.',
    trust: 'You see and can edit every piece before it publishes.',
    w: 1200,
    h: 675,
  },
  {
    slug: 'solon',
    name: 'Solon',
    title: 'Outreach & Retention Specialist',
    blurb: 'Opens doors and keeps them open — outreach plus retention.',
    description:
      'Solon opens doors and keeps them open — running personalized outreach and the retention motion that turns first contact into long-term clients, so leads and customers never drift away between touches.',
    trust: 'Every message is approved before it reaches a real person.',
    w: 1000,
    h: 1200,
  },
  {
    slug: 'mansa',
    name: 'Mansa',
    title: 'Memory & Security Specialist',
    blurb: 'Guards your data and gives your AI a memory of your business.',
    description:
      'Guardian of the vault. Mansa protects your data and IP and gives your AI a true memory of your business — the security and memory layer that makes a bespoke, full-stack install trustworthy.',
    trust: 'Your data and IP stay yours — access is scoped, logged, and human-approved.',
    w: 896,
    h: 1200,
  },
  {
    slug: 'vela',
    name: 'Vela',
    title: 'Demand & Narrative Specialist',
    blurb: 'Catches the wind — paid demand and the story that pulls customers in.',
    description:
      'Vela catches the wind — running paid demand across Meta, TikTok, and Google and shaping the narrative that pulls the right customers toward you. The marketing engine and the story behind it.',
    trust: 'Spend and creative are approved by a human before anything launches.',
    w: 896,
    h: 1200,
  },
] as const;
