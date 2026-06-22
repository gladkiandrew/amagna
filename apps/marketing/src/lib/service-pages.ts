/**
 * Data for the SEO keyword/service pages (roofing, HVAC, AI video, local hub,
 * etc.). One shared template renders them (components/service-page.tsx) so copy
 * lives here and pages stay thin. Collision-proof: these are NEW keyword routes
 * that don't duplicate the existing /home-services and /real-estate hubs.
 *
 * Pricing references use the LOCKED 2026-06-22 numbers (Growth $1,250/mo).
 */

export type ServiceFaq = { q: string; a: string };
export type ServiceLink = { href: string; label: string };

export type ServicePageContent = {
  slug: string;
  /** Absolute <title> (rendered via title.absolute so the "%s · Amagna AI"
   *  layout template does NOT double-append). Keep ~60 chars. */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  whatWeDo: { title: string; body: string }[];
  whatYouGet: string[];
  faqs: ServiceFaq[];
  localSignal: string;
  /** On-page internal cross-links (in addition to global nav + CTA). */
  related: ServiceLink[];
  /** schema.org Service serviceType. */
  serviceType: string;
};

export const ROOFING_MARKETING: ServicePageContent = {
  slug: 'roofing-marketing',
  metaTitle: 'Roofing Marketing Agency | Amagna AI',
  metaDescription:
    'Roofing marketing agency that fills your schedule — managed ads, AI video, local SEO, and automated follow-up for roofers. Get your free Gold Map.',
  eyebrow: 'Roofing Marketing',
  h1: 'Roofing Marketing Agency — More Jobs, Less Chasing',
  intro:
    'Most roofers live on referrals and lead-resellers that sell the same call to three competitors. We build you an owned pipeline — ads, AI video, and follow-up that bring in roofing jobs and book them without you chasing.',
  whatWeDo: [
    {
      title: 'Local lead funnels',
      body: 'Meta, Google, TikTok, and Snapchat campaigns aimed at your best roofing jobs, with landing pages built to turn a click into a booked inspection.',
    },
    {
      title: 'Get found on Google',
      body: "Google Business Profile, local SEO, and review generation so you rank for “roofer near me” in your service area.",
    },
    {
      title: 'Instant follow-up',
      body: 'Every lead gets an automated text + email in your voice, so no roofing job slips because nobody called back fast enough.',
    },
  ],
  whatYouGet: [
    'Managed ad campaigns across Meta, Google, TikTok & Snapchat',
    'AI video ads, reels, and shorts made for you',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation after every job',
    'Automated lead follow-up by text + email',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'How much does roofing marketing cost?',
      a: 'Roofing marketing typically runs $1,000–$3,000/month depending on whether you run ads, SEO, or both. At Amagna, the Growth plan is $1,250/mo plus ad spend (about $25/day minimum) — covering ads, AI video, local SEO, and follow-up for roofers.',
    },
    {
      q: 'Do Facebook ads work for roofers?',
      a: "Yes, when they're targeted to homeowners in your service area and paired with fast follow-up. The ad gets the lead; an automated text and email sequence books the inspection before a competitor calls them back.",
    },
    {
      q: 'How do I get more roofing leads without buying shared leads?',
      a: "Build an owned pipeline: local ads to your area, a Google Business Profile that ranks for “roofer near me,” and automated follow-up. Unlike lead-resellers, these leads are yours and aren't sold to three other roofers.",
    },
    {
      q: 'How long until roofing marketing works?',
      a: 'Ads can produce calls in the first weeks; local SEO and reviews compound over a few months. We review real numbers with you on a weekly call, so you always know what is working.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with roofers across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with roofing companies in surrounding states who want marketing that runs itself.',
  related: [
    { href: '/hvac-marketing', label: 'HVAC marketing' },
    { href: '/home-services', label: 'All home services' },
    { href: '/ai-video-ads', label: 'AI video ads' },
  ],
  serviceType: 'Roofing marketing',
};

export const HVAC_MARKETING: ServicePageContent = {
  slug: 'hvac-marketing',
  metaTitle: 'HVAC Marketing Agency | Amagna AI',
  metaDescription:
    'HVAC marketing agency that keeps calls coming year-round — managed ads, AI video, local SEO, and automated follow-up for HVAC companies. Get your free Gold Map.',
  eyebrow: 'HVAC Marketing',
  h1: 'HVAC Marketing Agency — A Pipeline That Survives the Slow Season',
  intro:
    'HVAC revenue rides the season — slammed in summer, quiet in spring and fall. We build an owned marketing system that keeps calls coming year-round: managed ads, AI video, local SEO, and follow-up that books the job.',
  whatWeDo: [
    {
      title: 'Local lead funnels',
      body: 'Meta, Google, TikTok, and Snapchat campaigns tuned to your highest-value HVAC services, with landing pages built to book the call.',
    },
    {
      title: 'Get found on Google',
      body: "Google Business Profile, local SEO, and reviews so you show up for “HVAC near me” across your service area.",
    },
    {
      title: 'Instant follow-up',
      body: 'Automated text + email to every lead in your voice, so the pipeline never goes cold between seasons.',
    },
  ],
  whatYouGet: [
    'Managed ad campaigns across Meta, Google, TikTok & Snapchat',
    'AI video ads, reels, and shorts made for you',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation after every job',
    'Automated lead follow-up by text + email',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'What is the best marketing for HVAC companies?',
      a: "A mix: managed local ads for demand now, a Google Business Profile and reviews for “HVAC near me” searches, and automated follow-up so no lead goes cold. At Amagna that's the Growth plan — $1,250/mo plus ad spend.",
    },
    {
      q: 'How much does HVAC marketing cost?',
      a: 'Most HVAC companies spend $1,000–$3,000/month on marketing. Our Growth plan is $1,250/mo plus ad spend (about $25/day minimum), covering ads, AI video, local SEO, reviews, and follow-up.',
    },
    {
      q: 'How do I get more HVAC leads in the slow season?',
      a: 'Run always-on local ads around maintenance and tune-up offers, keep your Google Business Profile active, and follow up every lead automatically — so the pipeline does not go dark between summer and winter.',
    },
    {
      q: 'Do online ads actually book HVAC jobs?',
      a: 'Yes, when the lead is followed up fast. The ad creates the call; an automated text and email sequence books it before the homeowner phones the next company.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with HVAC companies across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with HVAC operators in surrounding states.',
  related: [
    { href: '/roofing-marketing', label: 'Roofing marketing' },
    { href: '/home-services', label: 'All home services' },
    { href: '/ai-video-ads', label: 'AI video ads' },
  ],
  serviceType: 'HVAC marketing',
};

export const AI_VIDEO_ADS: ServicePageContent = {
  slug: 'ai-video-ads',
  metaTitle: 'AI Video Ads for Small Business | Amagna AI',
  metaDescription:
    'AI video ads built for your business — scroll-stopping reels, shorts, and ad creative without a film crew, run as managed campaigns. See how AI video works.',
  eyebrow: 'AI Video Ads',
  h1: 'AI Video Ads Built For Your Business',
  intro:
    'Video is what stops the scroll — but a film crew is slow and expensive. We generate on-brand AI video ads, reels, and shorts tuned to your business and market, then run them as managed campaigns.',
  whatWeDo: [
    {
      title: 'What AI video actually is',
      body: 'AI-generated video creative built from your brand, market, and offers. No camera crew, no studio day — a steady stream of ad-ready video.',
    },
    {
      title: 'What we build',
      body: 'Hooks, reels, shorts, and paid ad creative rendered in every dimension to fit Meta, TikTok, and YouTube placements.',
    },
    {
      title: 'Managed end to end',
      body: "We don't just make the video — we run it as a managed campaign and report what's converting, every week.",
    },
  ],
  whatYouGet: [
    'On-brand AI video ads, reels & shorts',
    'Creative rendered for every placement and dimension',
    'Managed Meta / TikTok / Snapchat / Google campaigns',
    'Weekly creative testing + plain-English reporting',
    'Built on your brand, voice, and offers',
  ],
  faqs: [
    {
      q: 'Is AI video worth it for small business?',
      a: 'For most small businesses, yes — it gives you the volume of video that modern ad platforms reward without the cost of a film crew. The key is pairing good AI creative with managed targeting and fast follow-up.',
    },
    {
      q: 'How does AI video advertising work?',
      a: 'We generate video creative from your brand, market, and offers, render it for each platform, run it as paid ads, and test what converts — refreshing the creative as performance data comes in.',
    },
    {
      q: 'How much do AI video ads cost?',
      a: 'AI video creation is included in our Growth plan ($1,250/mo plus ad spend). You are not paying per-video production fees — creative is produced and managed as part of the system.',
    },
  ],
  localSignal:
    "We're a Saginaw, Michigan agency working with home-services and real-estate businesses across the Great Lakes Bay Region and beyond — AI video works the same whether your buyers are local or national.",
  related: [
    { href: '/home-services', label: 'Home services marketing' },
    { href: '/real-estate', label: 'Real estate marketing' },
    { href: '/roofing-marketing', label: 'Roofing marketing' },
  ],
  serviceType: 'AI video advertising',
};

export const MICHIGAN: ServicePageContent = {
  slug: 'michigan',
  metaTitle: 'AI Marketing Agency in Saginaw, Michigan | Amagna AI',
  metaDescription:
    'Amagna AI is an AI marketing agency in Saginaw, Michigan, serving home services and real estate across Midland, Bay City & the Tri-Cities. Get your free Gold Map.',
  eyebrow: 'Saginaw · Mid-Michigan',
  h1: 'AI Marketing Agency — Saginaw, Michigan',
  intro:
    'Amagna is an AI-powered marketing agency based in Saginaw, serving businesses across Midland, Bay City, and the Great Lakes Bay Region. We build a marketing system that runs itself — ads, content, local SEO, and follow-up — and run it for you.',
  whatWeDo: [
    {
      title: 'Serving Mid-Michigan',
      body: 'Home-services and real-estate operators across Saginaw, Midland, Bay City, and the surrounding Tri-Cities.',
    },
    {
      title: 'Local-first',
      body: 'Google Business Profile, local SEO, and review generation so you show up when nearby customers search.',
    },
    {
      title: 'Run for you',
      body: 'Managed ads, AI video, and automated follow-up — built once for your business, improved every week.',
    },
  ],
  whatYouGet: [
    'Managed local ad campaigns (Meta, Google, TikTok, Snapchat)',
    'Google Business Profile + local SEO + AI-search visibility',
    'AI video ads, reels & shorts',
    'Automated review generation + lead follow-up',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'Do you work with businesses in Saginaw and Mid-Michigan?',
      a: 'Yes — Amagna is based in Saginaw and works with home-services and real-estate businesses across Saginaw, Midland, Bay City, and the Great Lakes Bay Region.',
    },
    {
      q: 'How much does a marketing agency cost in Mid-Michigan?',
      a: 'Our plans start with a one-time $1,000 Foundation build, then $50/mo for infrastructure. The full done-for-you system (Growth) is $1,250/mo plus ad spend.',
    },
    {
      q: 'What kinds of businesses do you focus on?',
      a: 'Home services (roofing, HVAC, plumbing, electrical, landscaping) and real estate agents and teams — though the system adapts to most local operators.',
    },
  ],
  localSignal:
    'Local matters: we map your service area, optimize your Google Business Profile, and build content that names your market — so nearby customers and AI assistants both find you.',
  related: [
    { href: '/home-services', label: 'Home services marketing' },
    { href: '/real-estate', label: 'Real estate marketing' },
    { href: '/pricing', label: 'Pricing' },
  ],
  serviceType: 'AI marketing agency',
};

/** All service pages, keyed by slug (for sitemap / iteration). */
export const ALL_SERVICE_PAGES: ServicePageContent[] = [
  ROOFING_MARKETING,
  HVAC_MARKETING,
  AI_VIDEO_ADS,
  MICHIGAN,
];
