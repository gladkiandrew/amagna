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
  slug:
    | 'home-services'
    | 'real-estate'
    | 'medical-offices'
    | 'ecommerce-brands'
    | 'multi-location';
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
  heroHeadline: 'More calls. Predictable leads. We end the feast-or-famine cycle.',
  heroSub:
    'HVAC, plumbing, roofing, electrical, landscaping. We build the marketing system that keeps your phone ringing in the slow months — then we run it for you, in your voice.',
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
    { src: '/brand/integrations/jobber.png', alt: 'Jobber' },
    { src: '/brand/integrations/hubspot.png', alt: 'HubSpot' },
    { src: '/brand/integrations/zoho.svg', alt: 'Zoho' },
    { src: '/brand/integrations/gmail.svg', alt: 'Gmail' },
    { src: '/brand/integrations/google-calendar.svg', alt: 'Google Calendar' },
  ],
  integrationsNote:
    'Leads route straight into the tools you already run your business on — no new software to learn.',
  ctaHeading: 'Let us look at your market',
  ctaSub:
    'Chart your Gold Map — a free, custom plan for exactly what we would do to fill your calendar. No pitch deck, no jargon.',
  metaTitle: 'Home services marketing',
  metaDescription:
    'Predictable, owned leads for HVAC, plumbing, roofing, and home services operators — built and run by AI. Book a call with Amagna AI.',
};

export const REAL_ESTATE: NicheContent = {
  slug: 'real-estate',
  eyebrow: 'For real estate agents & teams',
  heroHeadline: 'More listings. AI that handles the work between them.',
  heroSub:
    'Solo agents, teams, and small brokerages. We keep your sphere warm and your listings coming — daily content, sphere nurture, and listing-focused funnels, all run for you in your voice.',
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
    { src: '/brand/integrations/yardi.svg', alt: 'Yardi' },
    { src: '/brand/integrations/zillow.svg', alt: 'Zillow' },
    { src: '/brand/integrations/hubspot.png', alt: 'HubSpot' },
    { src: '/brand/integrations/gmail.svg', alt: 'Gmail' },
    { src: '/brand/integrations/google-calendar.svg', alt: 'Google Calendar' },
  ],
  integrationsNote:
    'Plugs into the CRM and tools you already use — your contacts and calendar stay where they are.',
  ctaHeading: 'Let us look at your market',
  ctaSub:
    'Chart your Gold Map — a free, custom plan for keeping your sphere warm and your listings coming. We bring it to the call.',
  metaTitle: 'Real estate marketing',
  metaDescription:
    'Stay top of mind and win more listings — daily content and sphere nurture for real estate agents, teams, developers, and real-estate PE, built and run by AI.',
};

export const MEDICAL_OFFICES: NicheContent = {
  slug: 'medical-offices',
  eyebrow: 'For medical & dental practices',
  heroHeadline: 'A full schedule of the right patients — handled, and handled right.',
  heroSub:
    'Private practices, dental, med-spa, specialty clinics. We build the marketing system that fills your chairs with the patients you want and runs it for you — reminders, reviews, and follow-up included.',
  pains: [
    {
      title: 'Empty slots you never see coming',
      body: 'A handful of no-shows and gaps a week quietly costs more than any ad budget — and nobody is working the schedule to fill them.',
    },
    {
      title: 'The wrong patients, or none at all',
      body: 'Generic ads bring price-shoppers and tire-kickers. You want the high-value cases your practice is built for.',
    },
    {
      title: 'Reviews that do not reflect your care',
      body: 'Your happiest patients never post; the one frustrated one does. Your online reputation lags your actual quality.',
    },
    {
      title: 'Front desk is buried, follow-up slips',
      body: 'Your team is running the office, not chasing leads. New inquiries and recalls fall through the cracks.',
    },
  ],
  systemHeading: 'The system we build for medical offices',
  systemSub:
    'Configured once around your services and the patients you want, then run every day by the agent fleet — with a human approving anything patient-facing.',
  systemPoints: [
    {
      title: 'Targeted patient acquisition',
      body: 'Meta and Google campaigns aimed at your highest-value services, with landing pages and intake built to turn a click into a booked appointment.',
    },
    {
      title: 'Reviews & reputation on autopilot',
      body: 'Happy patients get a gentle, well-timed nudge to leave a review, so your reputation finally matches your care.',
    },
    {
      title: 'Reminders & recall that reduce no-shows',
      body: 'Automated appointment reminders and recall sequences in your practice voice keep the schedule full without front-desk effort.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'New patients, booked appointments, review growth, what worked, what is next — in plain English, written by an agent.',
    },
  ],
  integrations: [
    { src: '/brand/integrations/google-calendar.svg', alt: 'Google Calendar' },
    { src: '/brand/integrations/gmail.svg', alt: 'Gmail' },
    { src: '/brand/integrations/hubspot.png', alt: 'HubSpot' },
    { src: '/brand/integrations/instagram.svg', alt: 'Instagram' },
    { src: '/brand/integrations/facebook.svg', alt: 'Facebook' },
  ],
  integrationsNote:
    'Works alongside the scheduling, CRM, and communication tools your practice already runs — nothing patient-facing goes out without your sign-off.',
  ctaHeading: 'Let us look at your practice',
  ctaSub:
    'Chart your Gold Map — a free, custom plan for filling your schedule with the right patients. We bring it to the call.',
  metaTitle: 'Medical office marketing',
  metaDescription:
    'Fill your schedule with the right patients — targeted acquisition, reviews, reminders, and recall for medical, dental, and specialty practices, built and run by AI.',
};

export const ECOMMERCE_BRANDS: NicheContent = {
  slug: 'ecommerce-brands',
  eyebrow: 'For ecommerce & DTC brands',
  heroHeadline: 'Content and ads that turn scrollers into repeat buyers.',
  heroSub:
    'DTC and ecommerce brands on Shopify and beyond. We build the content engine and paid-acquisition system that finds new customers and brings them back — run for you, in your brand voice.',
  pains: [
    {
      title: 'Ad costs climb, margins shrink',
      body: 'Acquisition keeps getting more expensive and a single channel owns your fate. One algorithm change and the month is gone.',
    },
    {
      title: 'The content treadmill never stops',
      body: 'Reels, UGC, emails, every week, forever. The brands that win post relentlessly — and you cannot keep that pace by hand.',
    },
    {
      title: 'One-time buyers who never come back',
      body: 'You pay to acquire a customer once and never email them again. The repeat-purchase money is left on the table.',
    },
    {
      title: 'Data everywhere, insight nowhere',
      body: 'Shopify, the ad managers, email — all separate. Nobody is turning the numbers into the next move.',
    },
  ],
  systemHeading: 'The system we build for ecommerce brands',
  systemSub:
    'Configured once around your catalog, margins, and brand voice, then run every day by the agent fleet behind it.',
  systemPoints: [
    {
      title: 'Always-on creative engine',
      body: 'A steady stream of scroll-stopping video, UGC-style content, and product posts for Meta, TikTok, and your feed — made for you, on brand.',
    },
    {
      title: 'Paid acquisition, tuned',
      body: 'Meta and TikTok ad campaigns built and optimized around your real margins and best-sellers, so spend finds profitable customers.',
    },
    {
      title: 'Email & SMS that drives repeat orders',
      body: 'Welcome, abandoned-cart, and win-back flows in your voice that turn first-time buyers into a base that comes back.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'Revenue, ROAS, repeat rate, what is working, what is next — plain English from an agent, not five dashboards.',
    },
  ],
  integrations: [
    { src: '/brand/integrations/shopify.svg', alt: 'Shopify' },
    { src: '/brand/integrations/instagram.svg', alt: 'Instagram' },
    { src: '/brand/integrations/tiktok.svg', alt: 'TikTok' },
    { src: '/brand/integrations/facebook.svg', alt: 'Facebook' },
    { src: '/brand/integrations/gmail.svg', alt: 'Gmail' },
  ],
  integrationsNote:
    'Plugs into Shopify and the ad and email platforms you already sell on — your store and data stay where they are.',
  ctaHeading: 'Let us look at your brand',
  ctaSub:
    'Chart your Gold Map — a free, custom plan for turning scrollers into repeat buyers. We bring it to the call.',
  metaTitle: 'Ecommerce brand marketing',
  metaDescription:
    'Content and ads that turn scrollers into repeat buyers — an always-on creative engine, tuned paid acquisition, and retention flows for DTC and ecommerce brands, built and run by AI.',
};

export const MULTI_LOCATION: NicheContent = {
  slug: 'multi-location',
  eyebrow: 'For multi-location & franchise operators',
  heroHeadline: 'Consistent marketing across every location — run from one brain.',
  heroSub:
    'Multi-location businesses, franchises, and groups. We build one system that keeps every location on-brand and full, with central control and local relevance — and we run it for you.',
  pains: [
    {
      title: 'Every location markets differently',
      body: 'One location posts daily, another went dark months ago. The brand looks inconsistent and the laggards drag the group down.',
    },
    {
      title: 'Local presence is a mess at scale',
      body: 'Dozens of Google Business Profiles, listings, and review streams — and no one has time to keep them all accurate and active.',
    },
    {
      title: 'No single source of truth',
      body: 'Each location reinvents the wheel. There is no shared brain holding brand, offers, and what is working across the group.',
    },
    {
      title: 'You cannot see what is working where',
      body: 'Rolling results up across locations by hand is impossible, so you are flying blind on where to push.',
    },
  ],
  systemHeading: 'The system we build for multi-location operators',
  systemSub:
    'One central brain configured for your brand, pushed to every location with local relevance — run every day by the agent fleet behind it.',
  systemPoints: [
    {
      title: 'Central brand, local relevance',
      body: 'One content and offer engine adapts to each location and market automatically, so every storefront stays on-brand and locally specific.',
    },
    {
      title: 'Local presence at scale',
      body: 'Google Business Profiles, local listings, and reviews managed across every location, so each one shows up for nearby searches.',
    },
    {
      title: 'One memory across the group',
      body: 'A shared brain remembers brand, offers, and what is working — so wins at one location roll out to all of them.',
    },
    {
      title: 'A roll-up report you actually read',
      body: 'Group and per-location performance side by side, in plain English — so you know exactly where to push next.',
    },
  ],
  integrations: [
    { src: '/brand/integrations/google-calendar.svg', alt: 'Google Calendar' },
    { src: '/brand/integrations/gmail.svg', alt: 'Gmail' },
    { src: '/brand/integrations/hubspot.png', alt: 'HubSpot' },
    { src: '/brand/integrations/instagram.svg', alt: 'Instagram' },
    { src: '/brand/integrations/facebook.svg', alt: 'Facebook' },
  ],
  integrationsNote:
    'Runs on top of the listings, CRM, and communication tools your locations already use — centrally managed, locally accurate.',
  ctaHeading: 'Let us look at your locations',
  ctaSub:
    'Chart your Gold Map — a free, custom plan for consistent marketing across every location. We bring it to the call.',
  metaTitle: 'Multi-location marketing',
  metaDescription:
    'Consistent marketing across every location, run from one brain — central brand control with local relevance for multi-location and franchise operators, built and run by AI.',
};

/** All five funnel niches, keyed by slug (for sitemap, JSON-LD, etc.). */
export const ALL_NICHES: NicheContent[] = [
  HOME_SERVICES,
  REAL_ESTATE,
  MEDICAL_OFFICES,
  ECOMMERCE_BRANDS,
  MULTI_LOCATION,
];
