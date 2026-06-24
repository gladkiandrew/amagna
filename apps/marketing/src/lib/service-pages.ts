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

export const PLUMBING_MARKETING: ServicePageContent = {
  slug: 'plumbing-marketing',
  metaTitle: 'Plumbing Marketing Company | Amagna AI',
  metaDescription:
    'Plumbing marketing company that fills your schedule — managed local ads, AI video, local SEO, and automated follow-up for plumbers. Get your free Gold Map.',
  eyebrow: 'Plumbing Marketing',
  h1: 'Plumbing Marketing Company — A Full Schedule Without Referrals',
  intro:
    'Most plumbers wait on referrals and emergency calls. We build an owned pipeline — local ads, AI video, and instant follow-up that bring in plumbing jobs and book them before a competitor picks up.',
  whatWeDo: [
    {
      title: 'Local lead funnels',
      body: 'Meta, Google, TikTok, and Snapchat campaigns aimed at your most profitable plumbing jobs, with landing pages built to book the call.',
    },
    {
      title: 'Get found on Google',
      body: "Google Business Profile, local SEO, and reviews so you rank for “plumber near me” and “emergency plumber” in your area.",
    },
    {
      title: 'Instant follow-up',
      body: 'Automated text + email to every lead in your voice, so no job slips because nobody answered fast enough.',
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
      q: 'How much does plumbing marketing cost?',
      a: 'Plumbing marketing typically runs $1,000–$3,000/month depending on ads and SEO. At Amagna, the Growth plan is $1,250/mo plus ad spend (about $25/day minimum) — covering ads, AI video, local SEO, and follow-up for plumbers.',
    },
    {
      q: 'How do I get more plumbing leads?',
      a: 'Build an owned pipeline: local ads to your service area, a Google Business Profile that ranks for “plumber near me,” and automated follow-up so leads are booked, not lost.',
    },
    {
      q: 'How do I get more emergency plumbing calls?',
      a: 'Rank in the local map for “emergency plumber near me” with an optimized Google Business Profile and reviews, run always-on local ads, and answer every lead instantly with automated follow-up.',
    },
    {
      q: 'Do online ads work for plumbers?',
      a: 'Yes, when the lead is followed up fast. The ad creates the call; an automated text and email sequence books it before the homeowner phones the next plumber.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with plumbers across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with plumbing companies in surrounding states.',
  related: [
    { href: '/hvac-marketing', label: 'HVAC marketing' },
    { href: '/roofing-marketing', label: 'Roofing marketing' },
    { href: '/home-services', label: 'All home services' },
  ],
  serviceType: 'Plumbing marketing',
};

export const ELECTRICIAN_MARKETING: ServicePageContent = {
  slug: 'electrician-marketing',
  metaTitle: 'Electrician Marketing Agency | Amagna AI',
  metaDescription:
    'Electrician marketing that gets the phone ringing — managed local ads, AI video, local SEO, and automated follow-up for electricians. Get your free Gold Map.',
  eyebrow: 'Electrician Marketing',
  h1: 'Electrician Marketing — Advertising That Actually Gets Calls',
  intro:
    'Word-of-mouth only goes so far. We build electricians an owned marketing system — local ads, AI video, and automated follow-up — so the phone rings with the jobs you want.',
  whatWeDo: [
    {
      title: 'Local lead funnels',
      body: 'Meta, Google, TikTok, and Snapchat campaigns aimed at your best electrical jobs, with landing pages built to book the call.',
    },
    {
      title: 'Get found on Google',
      body: "Google Business Profile, local SEO, and reviews so you show up for “electrician near me” across your service area.",
    },
    {
      title: 'Instant follow-up',
      body: 'Automated text + email to every lead in your voice, so quotes get scheduled instead of going cold.',
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
      q: 'What are good electrician advertising ideas that get calls?',
      a: 'The ideas that actually book work: an optimized Google Business Profile with steady reviews, local ads to your service area, short video showing real jobs, and fast automated follow-up so no lead is missed.',
    },
    {
      q: 'How much does electrician marketing cost?',
      a: 'Most electricians spend $1,000–$3,000/month on marketing. Our Growth plan is $1,250/mo plus ad spend (about $25/day minimum), covering ads, AI video, local SEO, reviews, and follow-up.',
    },
    {
      q: 'How do electricians get more calls?',
      a: 'Rank for “electrician near me” with a strong Google Business Profile and reviews, run local ads in your area, and follow up every lead instantly — the three levers that move local demand first.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with electricians across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with electrical contractors in surrounding states.',
  related: [
    { href: '/hvac-marketing', label: 'HVAC marketing' },
    { href: '/roofing-marketing', label: 'Roofing marketing' },
    { href: '/home-services', label: 'All home services' },
  ],
  serviceType: 'Electrician marketing',
};

export const FACEBOOK_ADS_CONTRACTORS: ServicePageContent = {
  slug: 'facebook-ads-contractors',
  metaTitle: 'Facebook Ads for Contractors | Amagna AI',
  metaDescription:
    'Facebook ads for contractors that actually book jobs — targeted local campaigns, AI video creative, and instant follow-up, fully managed. See how it works.',
  eyebrow: 'Facebook Ads for Contractors',
  h1: 'Facebook Ads for Contractors That Book Jobs',
  intro:
    "Boosting a post doesn't book jobs. We run real Facebook and Instagram ad campaigns for contractors — targeted to homeowners in your area, with AI video creative and automated follow-up that turns clicks into booked work.",
  whatWeDo: [
    {
      title: 'Targeted local campaigns',
      body: 'Real campaign structure aimed at homeowners in your service area and your best jobs — not a boosted post.',
    },
    {
      title: 'AI video creative',
      body: 'Scroll-stopping video and image ads built for you, rendered for every Facebook and Instagram placement.',
    },
    {
      title: 'Instant follow-up',
      body: 'Every lead gets automated text + email in your voice, so the job is booked before a competitor calls back.',
    },
  ],
  whatYouGet: [
    'Managed Facebook & Instagram ad campaigns',
    'AI video + image ad creative made for you',
    'Local targeting tuned to your service area',
    'Automated lead follow-up by text + email',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'Do Facebook ads work for contractors?',
      a: "Yes, when they're a real campaign targeted to homeowners in your service area and paired with fast follow-up. The ad gets the lead; an automated sequence books the job before a competitor responds.",
    },
    {
      q: 'How much should a contractor spend on Facebook ads?',
      a: 'Plan for about $25/day minimum in ad spend to start, paid directly to the platform. That is separate from management — our Growth plan ($1,250/mo) builds, runs, and optimizes the campaigns.',
    },
    {
      q: 'Why are my Facebook ads not getting leads?',
      a: 'Usually one of three things: boosting posts instead of running a real campaign, weak creative, or no follow-up on the leads. We fix all three — proper campaign structure, AI video creative, and instant automated follow-up.',
    },
  ],
  localSignal:
    "We're a Saginaw, Michigan agency running contractor ad campaigns across the Great Lakes Bay Region and surrounding states — local targeting works the same wherever your jobs are.",
  related: [
    { href: '/google-ads-home-services', label: 'Google Ads for home services' },
    { href: '/roofing-marketing', label: 'Roofing marketing' },
    { href: '/home-services', label: 'All home services' },
  ],
  serviceType: 'Facebook advertising for contractors',
};

export const GOOGLE_ADS_HOME_SERVICES: ServicePageContent = {
  slug: 'google-ads-home-services',
  metaTitle: 'Google Ads for Home Services | Amagna AI',
  metaDescription:
    'Google Ads for home services that capture ready-to-buy searches — managed search + Local Services Ads, with follow-up that books the call. See how it works.',
  eyebrow: 'Google Ads for Home Services',
  h1: 'Google Ads for Home Services',
  intro:
    'When someone searches “plumber near me,” they are ready to book. We run managed Google Ads — and Local Services Ads where they fit — for home-services businesses, with follow-up that turns the click into a booked job.',
  whatWeDo: [
    {
      title: 'Search campaigns',
      body: 'Google Search ads on the high-intent keywords your customers type when they are ready to hire.',
    },
    {
      title: 'Local Services Ads',
      body: 'Where your trade qualifies, we set up the “Google Guaranteed” pay-per-lead ads that sit at the very top of local results.',
    },
    {
      title: 'Follow-up that books',
      body: 'Every lead gets automated text + email in your voice, so high-intent clicks become booked jobs.',
    },
  ],
  whatYouGet: [
    'Managed Google Search ad campaigns',
    'Local Services Ads setup where eligible',
    'Conversion tracking + call tracking',
    'Automated lead follow-up by text + email',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'Do Google Ads work for home services?',
      a: 'Yes — home-services searches are high intent, so a well-run Search campaign reaches people ready to hire. Pairing it with fast follow-up is what turns the click into a booked job.',
    },
    {
      q: 'How much do Google Ads cost for home services?',
      a: 'Cost per click varies by trade and area, so budget around $25/day minimum to start, paid directly to Google. Management is separate — our Growth plan is $1,250/mo to build, run, and optimize the campaigns.',
    },
    {
      q: 'What are Google Local Services Ads?',
      a: 'They are the “Google Guaranteed” pay-per-lead ads at the top of local search, where you only pay for real leads. We set them up for home-services businesses whose trade qualifies.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we run Google Ads for home-services businesses across the Great Lakes Bay Region and surrounding states.',
  related: [
    { href: '/facebook-ads-contractors', label: 'Facebook ads for contractors' },
    { href: '/hvac-marketing', label: 'HVAC marketing' },
    { href: '/home-services', label: 'All home services' },
  ],
  serviceType: 'Google Ads for home services',
};

// ── Medical cluster ─────────────────────────────────────────────────────────
// Spokes under the /medical-offices hub. HIPAA-aware: we run marketing, not
// patient records; anything patient-facing is approved by the practice; no PHI.

export const DENTAL_MARKETING: ServicePageContent = {
  slug: 'dental-marketing',
  metaTitle: 'Dental Marketing Agency | Amagna AI',
  metaDescription:
    'Dental marketing agency that fills the schedule — new-patient ads, AI video, local SEO, reviews, and automated recall, run for your practice. Get your free Gold Map.',
  eyebrow: 'Dental Marketing',
  h1: 'Dental Marketing Agency — A Fuller Schedule, Run For You',
  intro:
    'Empty chairs and last-minute cancellations quietly cost more than any ad budget. We build dental practices a new-patient system — targeted ads, AI video, local SEO, reviews, and automated recall — run for you, with anything patient-facing approved by your team.',
  whatWeDo: [
    {
      title: 'New-patient acquisition',
      body: 'Targeted Meta and Google campaigns for your highest-value services — implants, ortho, cosmetic — with intake built to book the appointment.',
    },
    {
      title: 'Get found and trusted',
      body: "Google Business Profile, local SEO, and automated review requests so you rank for “dentist near me” and your reputation matches your care.",
    },
    {
      title: 'Reminders + recall',
      body: 'Automated appointment reminders and recall sequences in your practice voice — run without front-desk effort.',
    },
  ],
  whatYouGet: [
    'Targeted new-patient ad campaigns (Meta + Google)',
    'AI video for ads, reels & shorts',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation',
    'Automated reminders + recall sequences',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'How much does dental marketing cost?',
      a: 'Dental marketing typically runs $1,000–$5,000/month depending on ads and services. At Amagna, the Growth plan is $1,250/mo plus ad spend — covering ads, AI video, local SEO, reviews, and recall for your practice.',
    },
    {
      q: 'How do dentists get more new patients?',
      a: 'Rank in the local map for “dentist near me,” run targeted ads for your high-value services, generate steady reviews, and automate recall so existing patients keep coming back.',
    },
    {
      q: 'Is dental marketing HIPAA-compliant?',
      a: 'Yes — we handle marketing, not patient records. Nothing patient-facing goes out without your approval, and protected health information stays out of scope.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with dental practices across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with practices in surrounding states.',
  related: [
    { href: '/medical-offices', label: 'All medical practices' },
    { href: '/med-spa-marketing', label: 'Med spa marketing' },
    { href: '/chiropractor-marketing', label: 'Chiropractor marketing' },
  ],
  serviceType: 'Dental marketing',
};

export const MED_SPA_MARKETING: ServicePageContent = {
  slug: 'med-spa-marketing',
  metaTitle: 'Med Spa Marketing Agency | Amagna AI',
  metaDescription:
    'Med spa marketing agency that books treatments — targeted ads, on-brand AI video, local SEO, and automated follow-up for medical spas. Get your free Gold Map.',
  eyebrow: 'Med Spa Marketing',
  h1: 'Med Spa Marketing Agency — Booked Treatments, On Autopilot',
  intro:
    'Med spa growth lives on a steady flow of new clients and rebookings. We build an always-on system — high-converting ads, on-brand AI video, local SEO, and automated follow-up — that books treatments and brings clients back.',
  whatWeDo: [
    {
      title: 'Client acquisition',
      body: 'Meta, TikTok, and Google campaigns for your highest-margin treatments — injectables, laser, skin — with offers built to book.',
    },
    {
      title: 'Always-on creative',
      body: 'On-brand AI video and social content (compliant, no false claims) that stops the scroll on Instagram and TikTok.',
    },
    {
      title: 'Follow-up + rebooking',
      body: "Automated sequences that nurture leads and prompt rebookings, in your spa's voice.",
    },
  ],
  whatYouGet: [
    'Targeted treatment-focused ad campaigns',
    'On-brand AI video, reels & shorts',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation',
    'Automated lead follow-up + rebooking sequences',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'How do I get more clients for my med spa?',
      a: 'Run local ads for your high-margin treatments, post on-brand video on Instagram and TikTok, build steady reviews, and automate follow-up and rebooking so client value compounds.',
    },
    {
      q: 'How much does med spa marketing cost?',
      a: 'Most med spas spend $1,500–$5,000/month on marketing. Our Growth plan is $1,250/mo plus ad spend, covering ads, AI video, local SEO, reviews, and rebooking.',
    },
    {
      q: 'What is the best marketing for a med spa?',
      a: 'A mix: paid social and Google for demand, a strong Google Business Profile and reviews for trust, and automated rebooking so each new client is worth more over time.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with med spas across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with medical spas in surrounding states.',
  related: [
    { href: '/medical-offices', label: 'All medical practices' },
    { href: '/dermatology-marketing', label: 'Dermatology marketing' },
    { href: '/dental-marketing', label: 'Dental marketing' },
  ],
  serviceType: 'Med spa marketing',
};

export const CHIROPRACTOR_MARKETING: ServicePageContent = {
  slug: 'chiropractor-marketing',
  metaTitle: 'Chiropractor Marketing Agency | Amagna AI',
  metaDescription:
    'Chiropractic marketing that brings in new patients — targeted local ads, AI video, local SEO, reviews, and automated follow-up. Get your free Gold Map.',
  eyebrow: 'Chiropractic Marketing',
  h1: 'Chiropractor Marketing — A Steady Flow of New Patients',
  intro:
    'New-patient flow is the lifeblood of a chiropractic practice. We build the system that keeps it full — local ads, AI video, a Google profile that ranks, reviews, and automated follow-up that turns inquiries into appointments.',
  whatWeDo: [
    {
      title: 'New-patient funnels',
      body: 'Local Meta and Google campaigns with new-patient offers, built to book the first visit.',
    },
    {
      title: 'Rank locally',
      body: "Google Business Profile, local SEO, and reviews so you show up for “chiropractor near me.”",
    },
    {
      title: 'Follow-up + reactivation',
      body: 'Automated sequences that book inquiries and re-engage past patients.',
    },
  ],
  whatYouGet: [
    'New-patient ad campaigns (Meta + Google)',
    'AI video for ads, reels & shorts',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation',
    'Automated follow-up + reactivation sequences',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'How do chiropractors get more patients?',
      a: 'Run local ads with a clear new-patient offer, rank for “chiropractor near me” with a strong Google Business Profile and reviews, and follow up every inquiry fast so it becomes an appointment.',
    },
    {
      q: 'How much does chiropractic marketing cost?',
      a: 'Most chiropractors spend $1,000–$3,000/month on marketing. Our Growth plan is $1,250/mo plus ad spend, covering ads, AI video, local SEO, reviews, and follow-up.',
    },
    {
      q: 'Do online ads work for chiropractors?',
      a: 'Yes, when they lead with a clear new-patient offer and are paired with fast follow-up. The ad creates the inquiry; an automated sequence books the first visit.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with chiropractors across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with practices in surrounding states.',
  related: [
    { href: '/medical-offices', label: 'All medical practices' },
    { href: '/physical-therapy-marketing', label: 'Physical therapy marketing' },
    { href: '/dental-marketing', label: 'Dental marketing' },
  ],
  serviceType: 'Chiropractic marketing',
};

export const PHYSICAL_THERAPY_MARKETING: ServicePageContent = {
  slug: 'physical-therapy-marketing',
  metaTitle: 'Physical Therapy Marketing Agency | Amagna AI',
  metaDescription:
    'Physical therapy marketing that grows your caseload — local ads, AI video, local SEO, reviews, and referral nurture. Get your free Gold Map.',
  eyebrow: 'Physical Therapy Marketing',
  h1: 'Physical Therapy Marketing — Grow Your Caseload',
  intro:
    'PT clinics grow on local visibility and referral relationships. We build a system that strengthens both — local ads and SEO that win direct-access patients, plus content and follow-up that keep referrers and patients engaged.',
  whatWeDo: [
    {
      title: 'Direct-access patients',
      body: "Local ads and SEO for “physical therapy near me” and condition-specific searches, built to book evaluations.",
    },
    {
      title: 'Reputation + reach',
      body: 'Google Business Profile, reviews, and AI video that build trust with patients and referrers alike.',
    },
    {
      title: 'Follow-up + reactivation',
      body: 'Automated sequences that book inquiries and re-engage past patients.',
    },
  ],
  whatYouGet: [
    'Local ad campaigns (Meta + Google)',
    'AI video for ads, reels & shorts',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation',
    'Automated follow-up + reactivation sequences',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'How do physical therapy clinics get more patients?',
      a: 'Rank locally for “physical therapy near me,” run local ads for your services, build steady reviews, and nurture both referrers and past patients with automated follow-up.',
    },
    {
      q: 'How much does physical therapy marketing cost?',
      a: 'Most PT clinics spend $1,000–$3,000/month on marketing. Our Growth plan is $1,250/mo plus ad spend, covering ads, AI video, local SEO, reviews, and follow-up.',
    },
    {
      q: 'Does digital marketing work for PT clinics?',
      a: 'Yes — direct-access laws mean patients search for physical therapy themselves, so local SEO, ads, and reviews capture demand that used to depend only on referrals.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with physical therapy clinics across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and with clinics in surrounding states.',
  related: [
    { href: '/medical-offices', label: 'All medical practices' },
    { href: '/chiropractor-marketing', label: 'Chiropractor marketing' },
    { href: '/optometry-marketing', label: 'Optometry marketing' },
  ],
  serviceType: 'Physical therapy marketing',
};

export const OPTOMETRY_MARKETING: ServicePageContent = {
  slug: 'optometry-marketing',
  metaTitle: 'Optometry Marketing Agency | Amagna AI',
  metaDescription:
    'Optometry marketing that fills exam slots and grows optical — local ads, AI video, local SEO, reviews, and automated recall. Get your free Gold Map.',
  eyebrow: 'Optometry Marketing',
  h1: 'Optometry Marketing — Full Exam Slots, Growing Optical',
  intro:
    'Eye-care practices grow two ways: more exams and more optical. We build a system that drives both — local ads and SEO for new patients, plus automated recall and follow-up that brings them back for exams and frames.',
  whatWeDo: [
    {
      title: 'New-patient exams',
      body: "Local ads and SEO for “optometrist / eye doctor near me,” built to book exams.",
    },
    {
      title: 'Optical + recall',
      body: 'Automated recall and promotions that drive annual exams and optical sales.',
    },
    {
      title: 'Reputation',
      body: 'Google Business Profile and steady reviews so you stand out locally.',
    },
  ],
  whatYouGet: [
    'New-patient ad campaigns (Meta + Google)',
    'AI video for ads, reels & shorts',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation',
    'Automated recall + follow-up sequences',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'How do optometrists get more patients?',
      a: 'Rank for “optometrist near me” with a strong Google Business Profile, run local ads for new exams, build reviews, and automate recall so patients return every year.',
    },
    {
      q: 'How much does optometry marketing cost?',
      a: 'Most eye-care practices spend $1,000–$3,000/month on marketing. Our Growth plan is $1,250/mo plus ad spend, covering ads, AI video, local SEO, reviews, and recall.',
    },
    {
      q: 'What is the best marketing for an eye care practice?',
      a: 'Local SEO and a strong Google Business Profile for discovery, ads for new patients, and automated recall to maximize annual exams and optical sales.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with optometry and eye-care practices across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and in surrounding states.',
  related: [
    { href: '/medical-offices', label: 'All medical practices' },
    { href: '/physical-therapy-marketing', label: 'Physical therapy marketing' },
    { href: '/dental-marketing', label: 'Dental marketing' },
  ],
  serviceType: 'Optometry marketing',
};

export const DERMATOLOGY_MARKETING: ServicePageContent = {
  slug: 'dermatology-marketing',
  metaTitle: 'Dermatology Marketing Agency | Amagna AI',
  metaDescription:
    'Dermatology marketing that books medical and cosmetic visits — targeted ads, AI video, local SEO, reviews, and automated follow-up. Get your free Gold Map.',
  eyebrow: 'Dermatology Marketing',
  h1: 'Dermatology Marketing — Medical and Cosmetic, Booked',
  intro:
    'Dermatology spans medical and cosmetic — and the cosmetic side is fiercely marketed. We build a system that books both: targeted ads for your highest-value services, local SEO and reviews for trust, and follow-up that fills the schedule.',
  whatWeDo: [
    {
      title: 'Targeted acquisition',
      body: 'Meta and Google campaigns for your highest-value services — cosmetic, surgical, and medical dermatology — built to book.',
    },
    {
      title: 'Trust + visibility',
      body: 'Google Business Profile, local SEO, and reviews so patients choose you for both medical and cosmetic care.',
    },
    {
      title: 'Follow-up + rebooking',
      body: 'Automated sequences that nurture leads and prompt cosmetic rebookings, compliantly.',
    },
  ],
  whatYouGet: [
    'Targeted ad campaigns (Meta + Google)',
    'On-brand AI video, reels & shorts',
    'Google Business Profile + local SEO + AI-search visibility (AEO)',
    'Automated review generation',
    'Automated lead follow-up + rebooking sequences',
    'A weekly plain-English report',
  ],
  faqs: [
    {
      q: 'How do dermatology practices get new patients?',
      a: 'Run targeted ads for your high-value medical and cosmetic services, rank locally with a strong Google Business Profile and reviews, and follow up every inquiry automatically.',
    },
    {
      q: 'How much does dermatology marketing cost?',
      a: 'Most dermatology practices spend $1,500–$5,000/month on marketing. Our Growth plan is $1,250/mo plus ad spend, covering ads, AI video, local SEO, reviews, and follow-up.',
    },
    {
      q: 'Is dermatology marketing HIPAA-compliant?',
      a: 'Yes — we run marketing, not patient records. Anything patient-facing goes out with your approval, and protected health information stays out of scope.',
    },
  ],
  localSignal:
    'Based in Saginaw, Michigan, we work with dermatology practices across Saginaw, Midland, Bay City, and the Great Lakes Bay Region — and in surrounding states.',
  related: [
    { href: '/medical-offices', label: 'All medical practices' },
    { href: '/med-spa-marketing', label: 'Med spa marketing' },
    { href: '/dental-marketing', label: 'Dental marketing' },
  ],
  serviceType: 'Dermatology marketing',
};

/** All service pages, keyed by slug (for sitemap / iteration). */
export const ALL_SERVICE_PAGES: ServicePageContent[] = [
  ROOFING_MARKETING,
  HVAC_MARKETING,
  AI_VIDEO_ADS,
  MICHIGAN,
  PLUMBING_MARKETING,
  ELECTRICIAN_MARKETING,
  FACEBOOK_ADS_CONTRACTORS,
  GOOGLE_ADS_HOME_SERVICES,
  DENTAL_MARKETING,
  MED_SPA_MARKETING,
  CHIROPRACTOR_MARKETING,
  PHYSICAL_THERAPY_MARKETING,
  OPTOMETRY_MARKETING,
  DERMATOLOGY_MARKETING,
];
