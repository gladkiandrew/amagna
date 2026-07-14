/**
 * Per-niche funnel content. The marketing site serves five niches with the same
 * page *structure* (see components/niche-funnel.tsx) but never-mixed *content*.
 * All five niches' copy lives here so the page files stay thin.
 *
 * Positioning (2026-07-14 rebuild): every niche page is "a Second Brain for
 * [their world]" — one vault + custom agents where marketing is one output.
 * Each page leads with the niche's OPERATIONAL reality, then shows the system
 * in two lanes: the marketing lane and the operations lane.
 */

export type IntegrationLogo = {
  src: string;
  alt: string;
};

export type LanePoint = { title: string; body: string };

export type NicheContent = {
  slug:
    | 'home-services'
    | 'real-estate'
    | 'medical-offices'
    | 'ecommerce-brands'
    | 'multi-location';
  /** Blog category to pull related posts from (case-insensitive contains). */
  category: string;
  eyebrow: string;
  heroHeadline: string;
  heroSub: string;
  /** 01 — section heading over the operational-reality cards. */
  realityHeading: string;
  /** 01 — their operational week, told in their language. Not "pain marketing" —
   *  the lived reality the brain is built to absorb. */
  reality: LanePoint[];
  /** 02 — heading + sub over the two lanes. */
  runsHeading: string;
  runsSub: string;
  /** 02 — what the brain runs for them: marketing lane (evolved from the old
   *  systemPoints) and the operations/agents lane (new, niche-specific). */
  marketingLane: LanePoint[];
  opsLane: LanePoint[];
  integrations: IntegrationLogo[];
  integrationsNote: string;
  ctaHeading: string;
  ctaSub: string;
  metaTitle: string;
  metaDescription: string;
  /** Local service area for this niche's Service JSON-LD. Omitted = national
   *  ('US'). Set for local-intent niches so the page signals the Tri-Cities. */
  areaServed?: string[];
  /** Niche-specific FAQs — rendered as a visible section + FAQPage JSON-LD
   *  (AEO). Local-intent + ops/agents questions; no pricing (pricing lives in
   *  one place). */
  faqs?: { q: string; a: string }[];
};

/** Tri-Cities service area, reused by the local-intent niches' Service schema. */
const TRI_CITIES_AREA = ['Saginaw, MI', 'Midland, MI', 'Bay City, MI', 'Great Lakes Bay Region'];

export const HOME_SERVICES: NicheContent = {
  slug: 'home-services',
  category: 'Home Services',
  eyebrow: 'For home services operators',
  heroHeadline: 'A Second Brain for your service business.',
  heroSub:
    'HVAC, plumbing, roofing, electrical, landscaping. One system that remembers every customer, quote, and job — with agents that run your marketing AND the follow-up, quoting, and office work that eats your nights.',
  realityHeading: 'You know this week.',
  reality: [
    {
      title: 'The day ends. The office work doesn’t.',
      body: 'Quotes to write, calls to return, reviews to ask for. The paperwork shift starts when the trucks park.',
    },
    {
      title: 'Leads go cold while you’re on a roof',
      body: 'The customer who called at 10am booked with whoever answered first. Follow-up can’t wait until 7pm — but you can’t answer from a crawlspace.',
    },
    {
      title: 'Feast or famine, every year',
      body: 'Slammed in season, quiet after. The pipeline rides the weather instead of anything you control.',
    },
    {
      title: 'Marketing is the hat that never gets worn',
      body: 'You started in the field. Posting, ads, and review requests are the first things to slip — every time.',
    },
  ],
  runsHeading: 'One brain. Both shifts.',
  runsSub:
    'The vault holds your customers, your services, your voice. Agents built on it run both lanes — in your name, with your approval.',
  marketingLane: [
    {
      title: 'Local lead funnels',
      body: 'Meta, TikTok, Google, and Snapchat campaigns aimed at your most profitable services, with landing pages built to turn a click into a booked call.',
    },
    {
      title: 'Found on Google — and in AI answers',
      body: 'Google Business Profile, local SEO, and AEO so you show up when someone asks Google or their AI for "[your service] near me."',
    },
    {
      title: 'Content in your voice',
      body: 'Job-site posts, seasonal reminders, before-and-afters — written and posted for you, sounding like you.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'Plain English: calls booked, jobs won, what worked, what’s next. Written by an agent, not buried in a dashboard.',
    },
  ],
  opsLane: [
    {
      title: 'Every lead answered in minutes',
      body: 'New inquiry at 10am or 10pm — an agent replies in your voice with the right next step and a booking link, before the competitor calls back.',
    },
    {
      title: 'Quotes that follow themselves up',
      body: 'Every estimate you send gets a polite, persistent nudge sequence until it becomes a yes or a no — not a maybe that dies in a truck cab.',
    },
    {
      title: 'Reviews asked for at the right moment',
      body: 'The request goes out right after the job wraps, automatically — so your Google profile finally reflects your work.',
    },
    {
      title: 'The night shift, off your plate',
      body: 'Reminders, reschedules, intake questions — handled around how your crew actually runs. Every action logged; nothing customer-facing ships without your sign-off.',
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
    'Leads and jobs route straight into the tools you already run your business on — no new software to learn.',
  ctaHeading: 'Let us look at your business',
  ctaSub:
    'Chart your Gold Map — a free, custom plan for the system we would build for you. No pitch deck, no jargon.',
  metaTitle: 'Home Services AI & Marketing in Saginaw & the Tri-Cities',
  metaDescription:
    'A Second Brain for HVAC, plumbing, roofing, and home-services operators across Saginaw, Midland, and Bay City, MI — AI agents that run your marketing and the lead follow-up, quoting, and reviews behind it.',
  areaServed: TRI_CITIES_AREA,
  faqs: [
    {
      q: 'Do you work with home-services businesses in Saginaw, Midland, and Bay City?',
      a: 'Yes — the Great Lakes Bay Region is home turf. We install Second Brains for HVAC, plumbing, roofing, electrical, and landscaping operators across Saginaw, Midland, Bay City, and the surrounding Tri-Cities.',
    },
    {
      q: 'How do you get a home-services business more local calls?',
      a: 'We rebuild your Google Business Profile and local pages so you show up for "[service] near me" — on Google and in AI answers — run targeted local ads, and automate review requests after every job. Then the operations lane answers every new lead in minutes, so the calls you win stop leaking.',
    },
    {
      q: 'Can it handle the office work too, or just marketing?',
      a: 'Both lanes. The same system that runs your ads and content also answers new leads in minutes, follows up every quote until it’s a yes or a no, chases reviews, and sends reminders — with you approving anything a customer sees.',
    },
    {
      q: 'Who answers my leads — a bot?',
      a: 'An agent writing in your voice, working from your business’s own vault — your services, your prices, your schedule. You approve how it runs, every action is logged, and you can take over any conversation at any time.',
    },
    {
      q: 'Does the work dry up in the slow season?',
      a: 'That is exactly what the system is built to smooth out — a steady, owned pipeline plus follow-up that converts more of what you already get, so revenue stops riding the season.',
    },
  ],
};

export const REAL_ESTATE: NicheContent = {
  slug: 'real-estate',
  category: 'Real Estate',
  eyebrow: 'For real estate agents, teams & owners',
  heroHeadline: 'A Second Brain for your real estate business.',
  heroSub:
    'Solo agents, teams, and owners. Every lead expects an instant, personal reply — day or night. One system remembers your entire sphere and answers like you, while the marketing lane keeps you the obvious professional in your zip codes.',
  realityHeading: 'You know this week.',
  reality: [
    {
      title: 'Every lead expects an answer now',
      body: 'A portal inquiry at 9pm expects a personal reply at 9:02. Whoever answers first usually wins the client — and you were at a showing.',
    },
    {
      title: 'Your sphere goes cold while you close',
      body: 'Listings come from staying top of mind with 400 past clients and neighbors. Manually texting them between deals is not happening.',
    },
    {
      title: 'Content dies by week three',
      body: 'You know posting works. You also know it stops the moment a transaction heats up — every time.',
    },
    {
      title: 'You want listings, not tire-kickers',
      body: 'Most marketing fills your inbox with buyer leads. Listings are the gold, and they come from brand and trust.',
    },
  ],
  runsHeading: 'One brain. Both lanes.',
  runsSub:
    'The vault holds your sphere, your market, your voice. Agents built on it keep every conversation warm and your name everywhere it should be.',
  marketingLane: [
    {
      title: 'Daily content in your voice',
      body: 'Five to seven posts a week across Instagram and Facebook — market updates, listings, neighborhood expertise — written, scheduled, and posted for you.',
    },
    {
      title: 'Listing-focused lead funnels',
      body: 'Campaigns built around sellers in your target zip codes — home-valuation funnels and listing-focused ads.',
    },
    {
      title: 'The obvious local professional',
      body: 'Brand, reviews, and presence tuned so you look like the authority in your neighborhoods — without sounding like everyone else.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'Plain English: reach, leads, listing conversations started. Written by an agent, not a dashboard you decode.',
    },
  ],
  opsLane: [
    {
      title: 'Instant, personal lead reply — 24/7',
      body: 'Every inquiry gets an answer in your voice within minutes, day or night, with the full history of that contact behind it.',
    },
    {
      title: 'Sphere nurture that never lapses',
      body: 'Past clients and neighbors get consistent, personal-feeling touchpoints by email and SMS — so the referral calls you instead of the agent who posted last.',
    },
    {
      title: 'Showings and calls booked for you',
      body: 'Back-and-forth scheduling handled straight onto your calendar, so a hot lead never waits on your drive time.',
    },
    {
      title: 'Every conversation remembered',
      body: 'The vault holds every client’s history — homes, dates, threads — so no follow-up drops and every message lands personal. You approve how it runs.',
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
  metaTitle: 'Real Estate AI & Marketing in Saginaw & the Tri-Cities',
  metaDescription:
    'A Second Brain for real estate agents, teams, and owners across Saginaw, Midland & Bay City, MI — instant lead reply day or night, sphere nurture that never lapses, and daily content in your voice, built and run by AI.',
  areaServed: TRI_CITIES_AREA,
  faqs: [
    {
      q: 'Do you help real estate agents in the Tri-Cities?',
      a: 'Yes — solo agents, teams, and brokers across Saginaw, Midland, Bay City, and nearby markets. We keep your sphere warm, your leads answered, and your name in front of local sellers.',
    },
    {
      q: 'Can it really reply to my leads at night?',
      a: 'Yes — that is the point of the operations lane. Every inquiry gets a personal reply in your voice within minutes, 24/7, with scheduling handled straight onto your calendar. You set the rules and can take over any conversation.',
    },
    {
      q: 'Will clients know it’s AI?',
      a: 'It writes in your voice from your own vault — your listings, your neighborhoods, your history with that contact. You approve how it runs, and anything sensitive waits for you. No pretending: you take over any thread the moment it matters.',
    },
    {
      q: 'Can you help me get listings, not just buyer leads?',
      a: 'That is the focus — brand, sphere nurture, and seller-focused funnels aimed at your target neighborhoods, because listings come from staying top of mind and trusted.',
    },
    {
      q: 'Will the content actually sound like me?',
      a: 'Yes — everything is produced in your voice and brand from your own vault, so you look like the obvious local professional without sounding like everyone else.',
    },
  ],
};

export const MEDICAL_OFFICES: NicheContent = {
  slug: 'medical-offices',
  category: 'Medical Offices',
  eyebrow: 'For medical & dental practices',
  heroHeadline: 'A Second Brain for your practice.',
  heroSub:
    'Private practices, dental, med-spa, specialty clinics. Intake, reminders, recall, and the marketing that fills the schedule — run by agents that respect the line: nothing patient-facing without your sign-off, and patient records stay out of scope.',
  realityHeading: 'You know this week.',
  reality: [
    {
      title: 'The front desk is doing three jobs',
      body: 'Running the office, answering phones, chasing follow-up. Something slips every day — and it’s usually the follow-up.',
    },
    {
      title: 'No-shows and gaps you never see coming',
      body: 'A handful of empty slots a week quietly costs more than any ad budget — and nobody has time to work the schedule to fill them.',
    },
    {
      title: 'New inquiries wait. Existing patients drift.',
      body: 'The new-patient form sits until someone gets to it; recall lapses until the patient finds another office.',
    },
    {
      title: 'Your reviews lag your care',
      body: 'Your happiest patients never post; the one frustrated one does. Your online reputation trails your actual quality.',
    },
  ],
  runsHeading: 'One brain. Careful hands.',
  runsSub:
    'The vault holds your services, your schedule rules, your practice voice — never patient records. Agents run both lanes, and a human signs off on everything patient-facing.',
  marketingLane: [
    {
      title: 'Targeted patient acquisition',
      body: 'Meta, TikTok, Google, and Snapchat campaigns aimed at your highest-value services, with landing pages and intake built to turn a click into a booked appointment.',
    },
    {
      title: 'Found on Google — and in AI answers',
      body: 'Local SEO and AEO for your practice and services, so the right local patients find you first.',
    },
    {
      title: 'Automated review workflows',
      body: 'Patients get a gentle, well-timed nudge to leave a review after good visits — so your reputation catches up with your care.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'New patients, booked appointments, review growth, what’s next — plain English, written by an agent.',
    },
  ],
  opsLane: [
    {
      title: 'Intake answered before the desk opens',
      body: 'New inquiries get a same-hour response in your practice voice — questions answered, forms sent, appointment requested — instead of waiting in a voicemail queue.',
    },
    {
      title: 'Reminders and recall, on time, every time',
      body: 'Appointment reminders and recall sequences run without front-desk effort, in your voice, on your schedule rules.',
    },
    {
      title: 'Gaps worked the moment they open',
      body: 'A cancellation triggers reschedule nudges immediately — so an empty 2pm slot has a chance of being filled by noon.',
    },
    {
      title: 'The privacy line, engineered in',
      body: 'Patient records stay out of scope. Every action is logged, and nothing patient-facing goes out without your approval. The system runs your operations — not your medical data.',
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
  metaTitle: 'Medical Office AI & Marketing in Saginaw & the Tri-Cities',
  metaDescription:
    'A Second Brain for medical, dental, and specialty practices across Saginaw, Midland & Bay City, MI — patient acquisition, intake, reminders, recall, and reviews, run by AI with human sign-off and patient records out of scope.',
  areaServed: TRI_CITIES_AREA,
  faqs: [
    {
      q: 'Do you work with practices in Saginaw, Midland, and Bay City?',
      a: 'Yes — private practices, dental, med-spa, and specialty clinics across the Great Lakes Bay Region. Anything patient-facing always goes out with your sign-off.',
    },
    {
      q: 'Does the AI see patient records?',
      a: 'No. Patient records and medical data stay out of scope by design. The system works from your services, schedule rules, and practice voice — it runs your marketing, intake, reminders, and recall, not your charts.',
    },
    {
      q: 'Can it actually reduce no-shows?',
      a: 'The levers that move no-shows are timing and persistence: reminders that go out on time, every time, and reschedule nudges the moment a gap opens. The agents run both without front-desk effort — with your approval on the wording.',
    },
    {
      q: 'How do you bring in new patients without being pushy?',
      a: 'Targeted local campaigns for your highest-value services, plus well-timed review and recall workflows — so the right local patients find you and existing ones come back.',
    },
    {
      q: 'Is this compliant for a medical practice?',
      a: 'Nothing patient-facing goes out without your approval, every action is logged, and patient records stay out of scope — the system runs your marketing and office operations, not your medical data.',
    },
  ],
};

export const ECOMMERCE_BRANDS: NicheContent = {
  slug: 'ecommerce-brands',
  category: 'Ecommerce',
  eyebrow: 'For ecommerce & DTC brands',
  heroHeadline: 'A Second Brain for your brand.',
  heroSub:
    'DTC and ecommerce on Shopify and beyond. The creative volume, the ad management, the customer questions — at a scale no small team keeps up with by hand. One vault holds your brand; agents run both lanes.',
  realityHeading: 'You know this week.',
  reality: [
    {
      title: 'The creative treadmill never stops',
      body: 'Reels, UGC, statics, emails — every week, forever. The brands that win ship relentlessly, and you can’t keep that pace by hand.',
    },
    {
      title: 'Customer questions scale faster than the team',
      body: '"Where’s my order," sizing, returns — the same twenty answers, all day, in every channel. Every slow reply costs a review or a refund.',
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
  runsHeading: 'One brain. Both lanes.',
  runsSub:
    'The vault holds your catalog, margins, and brand voice. Agents built on it ship the creative and carry the customer work — with your approval on what ships.',
  marketingLane: [
    {
      title: 'Always-on creative engine',
      body: 'A steady stream of scroll-stopping video, UGC-style content, and product posts for Meta, TikTok, and your feed — made for you, on brand.',
    },
    {
      title: 'Managed paid acquisition',
      body: 'Meta, TikTok, and Snapchat campaigns built and managed around your real margins and best-sellers.',
    },
    {
      title: 'Email & SMS lifecycle flows',
      body: 'Welcome, abandoned-cart, and win-back flows in your voice — so the second purchase stops being an accident.',
    },
    {
      title: 'A weekly report you actually read',
      body: 'Revenue, ROAS, repeat rate, what’s working, what’s next — plain English from an agent, not five dashboards.',
    },
  ],
  opsLane: [
    {
      title: 'Support drafts, ready to send',
      body: 'The common questions — order status, sizing, returns — drafted in your brand voice for one-tap approval, so response time stops costing you reviews.',
    },
    {
      title: 'A vault that knows your catalog',
      body: 'Every product, offer, and campaign lives in one memory — so the agents never quote a dead SKU or go off-brand.',
    },
    {
      title: 'The numbers read for you',
      body: 'Store, ads, and email rolled into one plain-English brief with a recommended next move — not another dashboard to decode.',
    },
    {
      title: 'Promos coordinated across channels',
      body: 'When an offer changes, every lane knows — ads, emails, and support answers stay in sync automatically.',
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
    'Chart your Gold Map — a free, custom plan for your creative engine and the operations behind it. We bring it to the call.',
  metaTitle: 'Ecommerce AI Systems: Creative, Ads & Operations',
  metaDescription:
    'A Second Brain for DTC and ecommerce brands — an always-on creative engine, managed paid acquisition, lifecycle flows, and support drafts in your brand voice, built and run by AI with your approval on what ships.',
  faqs: [
    {
      q: 'What does the system actually produce each week?',
      a: 'A steady stream of on-brand video, UGC-style content, and product posts, plus managed campaigns on Meta, TikTok, and Snapchat, lifecycle email and SMS flows, and a plain-English weekly brief on revenue, ROAS, and repeat rate.',
    },
    {
      q: 'Can it answer customer questions too?',
      a: 'It drafts the answers — order status, sizing, returns — in your brand voice from your own catalog vault, ready for one-tap approval. Your team stays in control of what actually sends.',
    },
    {
      q: 'Does it work with Shopify?',
      a: 'Yes — the system plugs into Shopify and the ad and email platforms you already sell on. Your store and customer data stay where they are; the vault holds your brand, catalog, and campaign memory.',
    },
    {
      q: 'How is this different from hiring a content agency?',
      a: 'An agency ships content. This installs a system that remembers — your catalog, margins, offers, and results live in one vault, so the creative, the ads, the flows, and the support answers all pull from the same brain and get sharper every month.',
    },
  ],
};

export const MULTI_LOCATION: NicheContent = {
  slug: 'multi-location',
  category: 'Multi-Location',
  eyebrow: 'For multi-location & franchise operators',
  heroHeadline: 'One Second Brain. Every location.',
  heroSub:
    'Franchises, groups, and multi-location operators. One vault holds the brand; agents keep every location on-brand, locally relevant, and answered in minutes — while you see the whole board from one seat.',
  realityHeading: 'You know this board.',
  reality: [
    {
      title: 'Every location markets differently',
      body: 'One posts daily, another went dark months ago. The brand looks inconsistent and the laggards drag the group down.',
    },
    {
      title: 'Local presence is a mess at scale',
      body: 'Dozens of Google Business Profiles, listings, and review streams — and no one has time to keep them all accurate and active.',
    },
    {
      title: 'Response time depends on who’s at the counter',
      body: 'A lead at your best location gets a call back in five minutes. The same lead at another waits two days. Same brand, different business.',
    },
    {
      title: 'Rolling up results by hand is impossible',
      body: 'Each location reports differently, so you are flying blind on where to push and what to fix.',
    },
  ],
  runsHeading: 'One brain. Every storefront.',
  runsSub:
    'The vault holds the brand, the offers, and what’s working. Agents push it to every location with local relevance — and pull the whole board back to you.',
  marketingLane: [
    {
      title: 'Central brand, local relevance',
      body: 'One content and offer engine adapts to each location and market automatically, so every storefront stays on-brand and locally specific.',
    },
    {
      title: 'Local presence at scale',
      body: 'Google Business Profiles, local listings, and reviews managed across every location, so each profile stays accurate, active, and findable.',
    },
    {
      title: 'Campaigns tuned per market',
      body: 'Paid campaigns built centrally, adjusted to each location’s market and season — no location left running last year’s offer.',
    },
    {
      title: 'A roll-up report you actually read',
      body: 'Group and per-location performance side by side, in plain English — so you know exactly where to push next.',
    },
  ],
  opsLane: [
    {
      title: 'Every location’s leads answered in minutes',
      body: 'Inquiries route to the right location and get an on-brand reply immediately — so response time stops depending on who’s at the counter.',
    },
    {
      title: 'One playbook, current everywhere',
      body: 'When an offer or policy changes at HQ, every location’s agents know the same hour — no stale promos, no off-script answers.',
    },
    {
      title: 'Wins that travel',
      body: 'The vault remembers what worked at one location and rolls it out to the rest — the group finally learns as a group.',
    },
    {
      title: 'The whole board on one page',
      body: 'Every action logged, every location visible, human approval on anything outward. Central control without micromanaging.',
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
    'Chart your Gold Map — a free, custom plan for one brain across every location. We bring it to the call.',
  metaTitle: 'Multi-Location AI Systems in the Great Lakes Bay Region',
  metaDescription:
    'One Second Brain across every location — central brand control, local relevance, leads answered in minutes, and a roll-up view for multi-location and franchise operators in Saginaw, Midland, Bay City, and beyond.',
  areaServed: TRI_CITIES_AREA,
  faqs: [
    {
      q: 'Do you handle multi-location businesses in the Tri-Cities and beyond?',
      a: 'Yes — local groups and franchises across Saginaw, Midland, and Bay City, and multi-location operators beyond the region. One central brain keeps every location on-brand and locally relevant.',
    },
    {
      q: 'Can you manage Google Business Profiles for all our locations?',
      a: 'Yes — profiles, local listings, and reviews managed across every location, so each one stays accurate, active, and findable in its own market.',
    },
    {
      q: 'How do the agents keep every location consistent?',
      a: 'One vault holds the brand, offers, and playbook. Every location’s agents work from it, so when something changes at HQ, every storefront knows the same hour — and wins at one location roll out to all of them.',
    },
    {
      q: 'Can it answer leads for each location separately?',
      a: 'Yes — inquiries route to the right location and get an immediate on-brand reply with that location’s details. Every action is logged, and anything outward-facing carries human approval.',
    },
  ],
};

/** All funnel niches, keyed by slug (for sitemap, JSON-LD, etc.). */
export const ALL_NICHES: NicheContent[] = [
  HOME_SERVICES,
  REAL_ESTATE,
  MEDICAL_OFFICES,
  ECOMMERCE_BRANDS,
  MULTI_LOCATION,
];
