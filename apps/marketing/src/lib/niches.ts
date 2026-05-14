/**
 * Per-niche funnel content. The marketing site serves two niches with the same
 * page *structure* (see components/niche-funnel.tsx) but never-mixed *content*.
 * Both niches' copy lives here so the page files stay thin.
 */

export type IntegrationLogo = {
  src: string;
  alt: string;
};

export type NicheContent = {
  slug: 'home-services' | 'real-estate';
  eyebrow: string;
  heroHeadline: string;
  heroSub: string;
  /** "Sound familiar?" — the prospect's lived problems. */
  pains: { title: string; body: string }[];
  systemHeading: string;
  systemSub: string;
  systemPoints: { title: string; body: string }[];
  integrations: IntegrationLogo[];
  integrationsNote: string;
  ctaHeading: string;
  ctaSub: string;
  metaTitle: string;
  metaDescription: string;
};

export const HOME_SERVICES: NicheContent = {
  slug: 'home-services',
  eyebrow: 'For home services operators',
  heroHeadline: 'Predictable, owned leads — not leads resold to your competitor.',
  heroSub:
    'HVAC, plumbing, roofing, electrical, landscaping. We build the marketing system that keeps your phone ringing in the slow months, then the agents run it for you.',
  pains: [
    {
      title: 'The phone is feast or famine',
      body: 'Slammed in summer, dead in winter. Your revenue rides the season instead of a steady pipeline you control.',
    },
    {
      title: 'You are renting leads, not owning them',
      body: 'The lead resellers sell the same call to three of your competitors. You pay either way.',
    },
    {
      title: 'You pay for "SEO" and have no idea what you get',
      body: 'Four hundred a month to a guy who sends a report you do not read. Nothing changes.',
    },
    {
      title: 'Marketing is one more hat you do not have time for',
      body: 'You started in the field. Now you run the business. Posting and follow-up are the first things to slip.',
    },
  ],
  systemHeading: 'The system we build for home services',
  systemSub:
    'Set up once for your business, then improved every week by the agent fleet behind it.',
  systemPoints: [
    {
      title: 'Local lead funnels',
      body: 'Meta and Google ad campaigns aimed at your most profitable services, with landing pages built to turn a click into a booked call.',
    },
    {
      title: 'Get found on Google',
      body: 'Google Business Profile management, local SEO, and review generation so you show up when someone searches "[your service] near me."',
    },
    {
      title: 'Follow-up that never forgets',
      body: 'Every lead gets worked — automated SMS and email sequences in your voice, so no job slips because nobody called back.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'Plain English: calls booked, jobs won, what worked, what is next. Written by an agent, not buried in a dashboard.',
    },
  ],
  integrations: [
    { src: '/brand/integrations/jobber icon.png', alt: 'Jobber' },
    { src: '/brand/integrations/hubspot logo.png', alt: 'HubSpot' },
    { src: '/brand/integrations/zoho logo.svg', alt: 'Zoho' },
    { src: '/brand/integrations/gmail icon.svg', alt: 'Gmail' },
    { src: '/brand/integrations/google calendar icon.svg', alt: 'Google Calendar' },
  ],
  integrationsNote:
    'Leads route straight into the tools you already run your business on — no new software to learn.',
  ctaHeading: 'Let us look at your market',
  ctaSub:
    'Book a 20-minute call. We will tell you exactly what we would do to fill your calendar — and you decide from there. No pitch deck, no jargon.',
  metaTitle: 'Home services marketing',
  metaDescription:
    'Predictable, owned leads for HVAC, plumbing, roofing, and home services operators — built and run by AI. Book a call with Amagna AI.',
};

export const REAL_ESTATE: NicheContent = {
  slug: 'real-estate',
  eyebrow: 'For real estate agents & teams',
  heroHeadline: 'Stay top of mind 24/7 without ever opening Canva.',
  heroSub:
    'Solo agents, teams, and small brokerages. We build the marketing system that keeps your sphere warm and the listings coming — then the agents run it for you, in your voice.',
  pains: [
    {
      title: 'Content matters — and you cannot stick with it',
      body: 'You know posting works. You also know it dies by week three, every time, the moment you get busy with a deal.',
    },
    {
      title: 'Your sphere goes cold',
      body: 'Listings come from staying top of mind with 400 past clients and neighbors. Manually texting them is not happening.',
    },
    {
      title: 'You want listings, not buyer leads',
      body: 'Most marketing fills your inbox with tire-kickers. Listings are the gold, and they come from brand and trust.',
    },
    {
      title: 'You do not want to look cringe',
      body: 'You want to look like the obvious professional in your zip codes — not like you are trying too hard online.',
    },
  ],
  systemHeading: 'The system we build for real estate',
  systemSub:
    'Set up once around your brand and voice, then run every day by the agent fleet behind it.',
  systemPoints: [
    {
      title: 'Daily content in your voice',
      body: 'Five to seven posts a week across Instagram and Facebook — market updates, listings, neighborhood expertise — written, scheduled, and posted for you.',
    },
    {
      title: 'Sphere nurture on autopilot',
      body: 'Your past clients and leads get consistent, personal-feeling touchpoints by email and SMS so you are the agent they think of first.',
    },
    {
      title: 'Listing-focused lead funnels',
      body: 'Campaigns built to attract sellers in your target zip codes — home valuation funnels and listing-intent ads, not buyer noise.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'Plain English: reach, engagement, leads, listing conversations started. Written by an agent, not a dashboard you decode.',
    },
  ],
  integrations: [
    { src: '/brand/integrations/yardi logo.svg', alt: 'Yardi' },
    { src: '/brand/integrations/Zillow Logo.svg', alt: 'Zillow' },
    { src: '/brand/integrations/hubspot logo.png', alt: 'HubSpot' },
    { src: '/brand/integrations/gmail icon.svg', alt: 'Gmail' },
    { src: '/brand/integrations/google calendar icon.svg', alt: 'Google Calendar' },
  ],
  integrationsNote:
    'Plugs into the CRM and tools you already use — your contacts and calendar stay where they are.',
  ctaHeading: 'Let us look at your market',
  ctaSub:
    'Book a 20-minute call. We will show you exactly how we would keep your sphere warm and your listings coming — and you decide from there.',
  metaTitle: 'Real estate marketing',
  metaDescription:
    'Stay top of mind and win more listings — daily content and sphere nurture for real estate agents, built and run by AI. Book a call with Amagna AI.',
};
