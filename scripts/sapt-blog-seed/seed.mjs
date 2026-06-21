/**
 * One-off seed script: publish the industry blog posts into the Sapt CMS via the
 * REST API so every Who-We-Serve sub-page has 2 related posts.
 *
 * Auth: reads SAPT_API_KEY from the environment (source .env.local first; the
 * key is NEVER hard-coded or printed). Project ID + base are non-secret.
 *
 * Usage:
 *   node seed.mjs --stage                 # write out/<slug>.json only (no network)
 *   node seed.mjs --post --only=<slug>    # POST a single post (the write test)
 *   node seed.mjs --post --rest           # POST every post not already present
 *   node seed.mjs --list                  # print the planned posts
 *
 * Idempotent-ish: --rest GETs existing slugs first and skips any that exist.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_ID = '799ad3ab-fd21-4017-a45a-05b8e6f3cf75';
const BASE = process.env.SAPT_API_URL || 'https://api.sapt.ai';
const CONTENT_TYPE = 'blog-post';
const PUBLISHED_DATE = '2026-06-08';
const PUBLISHED_ISO = '2026-06-08T16:00:00.000Z';
const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), 'out');

/** @type {{title:string,slug:string,category:string,excerpt:string,seoTitle:string,seoDescription:string,targetKeywords:string,tags:string[],body:string}[]} */
const POSTS = [
  {
    title: 'Your Google Business Profile Is the Cheapest Lead Source You Are Ignoring',
    slug: 'google-business-profile-cheapest-lead-source',
    category: 'Home Services',
    excerpt:
      'For home service businesses, a well-run Google Business Profile quietly out-earns most paid ads. Here is why it works and how an automated system keeps it active.',
    seoTitle: 'Google Business Profile: The Cheapest Lead Source for Home Services',
    seoDescription:
      'Why a maintained Google Business Profile is the highest-ROI lead source for HVAC, plumbing, roofing, and home service businesses — and how to keep it active automatically.',
    targetKeywords:
      'google business profile for contractors, local seo home services, rank in google map pack, get more local leads contractor, home services local seo',
    tags: ['home-services', 'local-seo', 'automation'],
    body: `When a homeowner needs a plumber, an HVAC tech, or a roofer, they do one thing first: they search. And what they see isn't your website — it's the map. Three businesses, with stars, photos, and a "call" button. That little box decides who gets the job, and most home service owners barely touch it.

Your Google Business Profile is the cheapest, highest-intent lead source you have. Someone searching "water heater repair near me" is ready to book right now. Showing up there costs nothing but attention — and almost nobody gives it any.

## Why the profile beats the website

Your website is where people go after they've decided to consider you. The map pack is where they decide. When someone searches a service near them, Google shows the local results first, above the ads and the blue links. If you're in that box with real photos and recent reviews, you get the call. If you're not, the competitor who showed up gets it — even if your work is better.

The frustrating part: ranking in that box isn't about who's best. It's about who's most clearly described, most active, and most consistently reviewed. That's a game you can win without being the biggest shop in town.

## What actually moves the needle

A profile that earns calls comes down to a few unglamorous habits:

- **Right categories, full details.** Your primary category, every service you offer, your service area, and accurate hours. Most profiles are half-filled. Completeness is a ranking signal and a trust signal at once.
- **Real, recent photos.** Job sites, your trucks, your team, before-and-afters. Fresh images tell Google you're active and tell customers you're real.
- **Steady reviews.** Not a pile of reviews from two years ago — a steady trickle. Review velocity, the rhythm of new reviews coming in, matters more than a frozen five-star average.
- **Regular posts and Q&A.** Treating the profile like a channel — service highlights, seasonal reminders — keeps it active in Google's eyes.

None of this is hard. All of it is easy to stop doing the second you get busy on a job. That's the catch.

## Why this is a job for a system

Here's the honest problem: you will not keep this up by hand. You'll optimize the profile once, feel good about it, and never touch it again — because you're on a roof, not at a keyboard. And a profile that goes stale slowly slides down the rankings while a competitor who stays active climbs past you.

That's exactly the kind of repetitive, never-finished work an autonomous marketing system is built for. The system keeps the profile complete, posts to it on a schedule, requests a review after every job, and routes the calls and messages it generates straight to you — without you remembering to do any of it. A human still approves anything customer-facing; the machine just makes sure it actually happens, week after week.

## Where to start

If you do one thing this week, claim and fully complete your Google Business Profile, then text your last ten happy customers a one-tap review link. That alone tends to lift your local visibility before you spend a dollar on ads.

If you'd rather have the whole thing run for you — the profile kept active, reviews requested automatically, and the leads followed up — that's what we build at Amagna. Chart your free [Gold Map](/audit) and we'll hand you a step-by-step plan for owning your local map, built around your service area.`,
  },
  {
    title: 'The Follow-Up System That Turns Real Estate Leads Into Listings',
    slug: 'real-estate-follow-up-system-leads-into-listings',
    category: 'Real Estate',
    excerpt:
      'Most real estate leads are lost to slow, inconsistent follow-up — not bad leads. Here is the system that keeps every lead and past client warm until they are ready.',
    seoTitle: 'The Real Estate Follow-Up System That Turns Leads Into Listings',
    seoDescription:
      'Why real estate leads go cold and how an automated follow-up system keeps your sphere and new leads warm until they are ready to list — without living on your phone.',
    targetKeywords:
      'real estate lead follow up, real estate crm automation, convert real estate leads, realtor follow up system, real estate lead nurture',
    tags: ['real-estate', 'automation', 'lead-nurture'],
    body: `Ask an agent about their leads and you'll usually hear some version of "they were tire-kickers." Sometimes that's true. More often, the lead was fine — the follow-up wasn't. A seller who's "thinking about next spring" isn't a bad lead. They're a six-month lead, and almost nobody works a six-month lead well.

Real estate is a timing business. The person isn't ready when they fill out the form; they're ready months later, and they list with whoever stayed in touch in the meantime. The whole game is being the agent still in their inbox when the timing finally clicks.

## Why follow-up breaks down

You start strong. New lead comes in, you call, you text, maybe you add them to a list. Then a deal heats up, you go heads-down for three weeks, and the lead quietly goes cold. It's not a discipline problem — it's a capacity problem. You can't run active deals and manually nurture two hundred slow-burn contacts at the same time. Something has to give, and it's always the follow-up.

The result: you pay for leads (in money or time), work them for a week, and let the long ones evaporate. The money is in the long ones.

## What a real follow-up system does

A system fixes the part you can't do by hand: showing up consistently over months without you remembering.

- **Instant first response.** A new lead gets a reply in minutes, not hours — even when you're at a showing. Speed-to-lead is the single biggest difference between a booked appointment and a dead form.
- **A long, patient nurture.** Every lead and past client drops into an automated rhythm of useful, personal-feeling touches — a market note, a check-in, a relevant listing — spaced out over months, in your voice.
- **Smart re-engagement.** When someone said "spring," the system loops back in spring. Nothing falls through because a date passed while you were busy.
- **A hand-off when it's hot.** The moment a contact replies or raises a hand, it surfaces to you to take over personally. Automation keeps them warm; you close.

The point isn't to replace the human relationship. It's to make sure the relationship is still alive when it's time to act.

## Your database is the asset

Most agents chase new leads while sitting on a goldmine they ignore: their past clients and sphere. Those people already trust you. A consistent monthly touch to that list quietly produces more repeat-and-referral business than any cold lead source — and it's the cheapest marketing you'll ever do, if you actually do it.

That's the problem an autonomous marketing system solves. It keeps the whole database warm — new leads and old clients alike — with content, follow-up, and re-engagement running every day, while you stay the final word on anything personal. You approve; the machine keeps the rhythm.

## Where to start

This week, put every past client and lead into one place and turn on a single automated welcome-and-monthly touch. Even that small step recovers business you're currently leaving on the table.

If you want the full system — instant response, long-term nurture, and re-engagement, all run for you in your voice — that's what we build at Amagna. Chart your free [Gold Map](/audit) and we'll hand you a plan for turning the leads you already have into listings.`,
  },
  {
    title: 'How Medical Practices Fill the Schedule Without the Marketing Headache',
    slug: 'medical-practices-fill-schedule-without-headache',
    category: 'Medical Offices',
    excerpt:
      'Empty slots and the wrong patients cost practices more than any ad budget. Here is how an automated, compliant marketing system keeps the right patients booking.',
    seoTitle: 'How Medical Practices Fill the Schedule Without the Marketing Headache',
    seoDescription:
      'How medical, dental, and specialty practices attract the right patients and keep the schedule full with an automated, compliant marketing system — without front-desk burnout.',
    targetKeywords:
      'medical practice marketing, patient acquisition, dental practice marketing, healthcare marketing automation, fill the schedule new patients',
    tags: ['medical-offices', 'automation', 'patient-acquisition'],
    body: `A few empty slots a week doesn't feel like an emergency. It feels like a slow afternoon. But across a month, those gaps and last-minute cancellations quietly cost more than almost anything else in the practice — and nobody on the team has time to chase them down. The front desk is running the office, not running marketing.

Most practices don't have an awareness problem. They have a consistency problem: the marketing that fills the schedule only happens when someone remembers, and someone rarely remembers. Here's how to make it happen on its own.

## The two problems underneath an empty schedule

First, the right patients don't know you exist yet. When someone searches for a specific service — an implant, a consultation, a specialist near them — they're high-intent and ready to book. If you're not visible and easy to choose at that moment, they pick whoever was.

Second, the patients you do attract leak out. An inquiry comes in and waits a day for a callback. A patient who's due for a recall never gets reminded. A no-show is never re-booked. None of that is anyone's fault — it's what happens when a busy team has to do follow-up by hand.

## What an automated practice marketing system handles

The fix isn't more hustle from the front desk. It's a system that does the repetitive work reliably and keeps a human in the loop for anything that touches a patient.

- **Targeted acquisition.** Campaigns aimed at the specific, high-value services you want more of — not generic "we're a dentist" awareness — with intake built to turn a click into a booked appointment.
- **Local visibility.** A maintained Google Business Profile and local search presence so you show up when someone searches your service nearby, plus getting recommended by AI assistants when patients ask who to see.
- **Reminders and recall that run themselves.** Automated appointment reminders and recall sequences that keep the schedule full and quietly reduce the gaps, without the desk making calls.
- **Reviews on autopilot.** A well-timed, automated nudge after good visits so your reputation online finally reflects the care you actually give.

## Compliant by design

Healthcare marketing has rules, and "automated" can't mean "careless." A system built for practices keeps everything patient-facing under human approval and avoids anything that touches protected information in the wrong place. The machine drafts and schedules; your team signs off. You get the consistency of software without handing patient trust to a black box.

That balance — always-on marketing, always human-approved — is the whole point. The repetitive work happens every day; the judgment stays with you.

## Where to start

This week, fully complete your Google Business Profile, choose the one service you'd most like more of, and set up a simple automated reminder for upcoming appointments. Those three moves tend to tighten the schedule before you scale anything.

If you'd rather have the whole system built and run for you — acquisition, reminders, recall, and reviews, all compliant and human-approved — that's what we do at Amagna. Chart your free [Gold Map](/audit) and we'll hand you a plan for filling your schedule with the right patients.`,
  },
  {
    title: 'Turn Happy Patients Into Reviews — Automatically and Compliantly',
    slug: 'turn-patients-into-reviews-automatically',
    category: 'Medical Offices',
    excerpt:
      'Your happiest patients rarely post; the one frustrated one does. Here is how an automated, compliant system makes your online reputation match your real care.',
    seoTitle: 'Turn Happy Patients Into Reviews — Automatically and Compliantly',
    seoDescription:
      'How medical and dental practices generate a steady stream of patient reviews with an automated, compliant system — so your online reputation matches the care you give.',
    targetKeywords:
      'medical practice reviews, get more patient reviews, dental review generation, healthcare reputation management, automated review requests',
    tags: ['medical-offices', 'reviews', 'automation'],
    body: `Here's a quiet unfairness most practices live with: your happiest patients almost never leave a review, and the one frustrated person does. So your rating online drifts lower than the care you actually deliver — and new patients, who read those reviews before they ever call, judge you by it.

Reviews aren't vanity. For a local practice they're one of the biggest factors in whether a searching patient picks you, and a real signal to Google and AI assistants when they decide who to recommend. The good news: the gap between your real reputation and your online one is fixable, and it's fixable on autopilot.

## Why great practices have mediocre review profiles

It's not the care. It's the ask. A delighted patient walks out, life resumes, and they never think to post. Meanwhile the team is too busy running the office to ask every patient, every day, at the right moment. So the only people motivated enough to post unprompted are the occasional unhappy ones.

The entire problem is timing and consistency — exactly the kind of thing humans are bad at maintaining and systems are good at.

## What an automated review system does

The goal is simple: ask the right patient, at the right moment, every time, in a way that's easy to act on.

- **Well-timed requests.** A gentle, automated nudge goes out shortly after a good visit — when satisfaction is highest — by text or email, with a one-tap link to the right place.
- **Steady velocity.** Instead of a frozen pile of old reviews, you get a consistent trickle of fresh ones, which matters more for ranking and trust than a single number.
- **The right routing.** Patients are pointed to where it helps most, and any private concern has a path to reach the office directly so it can be handled like a relationship, not a public fight.
- **No fabrication, ever.** A real system only ever asks real patients for honest feedback. There are no fake reviews, no incentives that cross a line — just the asks you should have been making all along.

## Keeping it compliant

In healthcare, even review requests have to be handled carefully — no protected information in the wrong channel, nothing patient-facing without sign-off. A system built for practices keeps a human approving the templates and the flow, and keeps the mechanics clean. Automated doesn't mean unsupervised; it means the right ask happens every time, within the lines.

That's the difference between hoping for reviews and having a reputation engine: one depends on someone remembering, the other just runs.

## Where to start

This week, pick the single moment in your visit when patients are happiest, and start asking — even manually — for a review right then, with a one-tap link. You'll feel the difference in a few weeks.

If you'd rather make it automatic and consistent across every patient, that's part of what we build at Amagna. Chart your free [Gold Map](/audit) and we'll show you how to make your online reputation finally match your care.`,
  },
  {
    title: 'The Always-On Ad Creative System Every Ecommerce Brand Needs',
    slug: 'always-on-ad-creative-system-ecommerce',
    category: 'Ecommerce',
    excerpt:
      'Winning ecommerce brands do not run better ads — they ship more creative, faster. Here is how an automated system keeps fresh ad creative flowing without burning you out.',
    seoTitle: 'The Always-On Ad Creative System Every Ecommerce Brand Needs',
    seoDescription:
      'Why creative volume beats clever targeting for ecommerce brands, and how an automated system keeps a steady stream of fresh Meta and TikTok ad creative flowing.',
    targetKeywords:
      'ecommerce ad creative, meta ads for ecommerce, tiktok ads dtc, ugc ad creative, creative testing ecommerce',
    tags: ['ecommerce', 'ads', 'creative'],
    body: `Most ecommerce brands think their ad problem is targeting. They tweak audiences, fiddle with bids, and wonder why results keep sliding. On Meta and TikTok today, the algorithm handles most of the targeting for you. The real lever — the one separating brands that scale from brands that stall — is creative. Specifically, how much of it you can make, test, and refresh.

Ads don't fail because the targeting got worse. They fail because the creative got tired. The audience has seen it. And the brand that keeps shipping new angles keeps winning while the one running the same three videos quietly decays.

## Why volume beats brilliance

You can't predict the winner. The ad you're sure will crush often flops, and the throwaway clip becomes your best performer. The only reliable way to find winners is to put a lot of shots on goal — different hooks, formats, angles, and proof points — and let the results pick.

That's "creative testing velocity": how fast you can produce, launch, and learn from new variations. Brands that ship a steady stream find winners faster, dodge fatigue, and hold performance even as auctions get more competitive. Brands that make one video a month get stuck.

The catch is obvious — that's a punishing amount of content to produce by hand, every week, forever.

## What an always-on creative system does

This is where an automated system earns its place. Instead of you scrambling for the next batch, the machine keeps the pipeline full:

- **A steady stream of variations.** New hooks, formats, and angles produced on a schedule and rendered in every dimension to fit each placement — feed, Stories, Reels, TikTok — so nothing has to be reformatted by hand.
- **UGC-style and product creative.** The scroll-stopping, native-feeling content that actually performs on social, made for you on brand.
- **Built-in refresh.** As ads fatigue, fresh creative is already queued to replace them, so performance doesn't fall off a cliff while you "get around to" new content.
- **Managed campaigns.** The ads are launched and tuned around your real margins and best-sellers, not vanity metrics.

A human still approves what represents the brand. The system just makes sure there's always a next batch — which is the part brands almost never sustain alone.

## Creative is one layer

Even the best creative system works better as part of a whole. Acquisition ads bring people in; email and SMS bring them back; happy customers create the next round of content and proof. When those reinforce each other, every dollar of ad spend works harder. Creative volume is the engine, but the engine runs inside a system.

## Where to start

This week, pull your three best-performing pieces of content and make five new variations on each — different hooks, same offer. Run them. You'll learn more in two weeks than in a month of audience tweaking.

If you'd rather have the whole creative engine run for you — produced, formatted, launched, and refreshed on a schedule — that's what we build at Amagna. Chart your free [Gold Map](/audit) and we'll hand you a plan for keeping fresh creative in market without the burnout.`,
  },
  {
    title: 'Stop Losing One-Time Buyers: Email and SMS Flows That Bring Them Back',
    slug: 'ecommerce-email-sms-flows-bring-buyers-back',
    category: 'Ecommerce',
    excerpt:
      'You pay to acquire a customer once and never email them again. Here is how automated email and SMS flows turn first-time buyers into a base that comes back.',
    seoTitle: 'Email and SMS Flows That Turn One-Time Buyers Into Repeat Customers',
    seoDescription:
      'How automated email and SMS flows — welcome, abandoned cart, post-purchase, and winback — turn one-time ecommerce buyers into repeat customers and lift retention.',
    targetKeywords:
      'ecommerce email marketing, abandoned cart flow, ecommerce sms marketing, customer retention ecommerce, repeat purchase rate',
    tags: ['ecommerce', 'email', 'retention'],
    body: `Most ecommerce brands pour everything into acquisition — more ads, more traffic, more first orders — and then let those hard-won customers walk out the door and never speak to them again. The buyer you paid to acquire is the cheapest next sale you'll ever make, and it's the one most brands ignore.

Retention isn't glamorous. It doesn't have the dopamine of a viral ad. But the brands that quietly win are the ones turning first-time buyers into repeat buyers — and almost all of that happens through email and SMS flows that run on their own.

## Why the second purchase matters most

The first sale often barely breaks even after ad costs. The profit lives in the second, third, and fourth orders — the ones you don't pay to acquire. A customer who comes back is pure margin compared to a stranger you have to convince.

So the question that decides whether a brand is healthy isn't "how many new customers" — it's "how many come back." And bringing them back is a job for automated lifecycle flows, not one-off campaign blasts.

## The flows that do the work

A handful of automated sequences quietly carry most of the retention load:

- **Welcome flow.** The moment someone joins or buys, a short series introduces the brand, sets expectations, and earns the next click. First impressions, automated.
- **Abandoned cart and browse.** People add to cart and leave constantly. A timely, well-written reminder recovers a meaningful share of those almost-sales — money that's otherwise just gone.
- **Post-purchase.** After the order: shipping clarity, how to get the most from the product, and a natural nudge toward the next one. This is also where you earn reviews and referrals.
- **Winback.** When a customer goes quiet, a sequence reaches out to pull them back before they're gone for good.

Set up once, these run forever in the background, working every contact at the right moment — something no team does reliably by hand.

## Why automation is the whole point

You could write and send all of this manually. You won't, not consistently — you're running a brand. The value isn't a clever one-off email; it's that the right message reaches the right customer at the right moment, every time, without anyone remembering to hit send.

An autonomous marketing system builds these flows in your voice and keeps them running, while you stay in control of the brand and the offers. It also closes the loop: repeat buyers leave reviews and create content that feeds your ads, so retention and acquisition strengthen each other instead of competing for attention.

## Where to start

This week, turn on three flows if you haven't: welcome, abandoned cart, and a simple post-purchase sequence. Those three alone tend to recover revenue you're currently losing silently.

If you'd rather have the full lifecycle built and run for you — flows, segmentation, and the content that feeds them — that's what we do at Amagna. Chart your free [Gold Map](/audit) and we'll hand you a plan for turning one-time buyers into a base that comes back.`,
  },
  {
    title: 'How Multi-Location Brands Keep Every Location On-Brand and Full',
    slug: 'multi-location-brands-on-brand-and-full',
    category: 'Multi-Location',
    excerpt:
      'One location thrives while another goes dark. Here is how an automated system keeps every location on-brand and busy — central control with local relevance.',
    seoTitle: 'How Multi-Location Brands Keep Every Location On-Brand and Full',
    seoDescription:
      'How multi-location and franchise brands keep every location consistent and busy with an automated system — central brand control plus local relevance, run from one place.',
    targetKeywords:
      'multi location marketing, franchise marketing, local marketing at scale, multi location social media, brand consistency across locations',
    tags: ['multi-location', 'franchise', 'automation'],
    body: `Run more than a few locations and you know the pattern. One manager is a natural marketer and their location hums. Another went dark months ago. The brand looks like three different companies, the laggards drag down the average, and there's no realistic way for headquarters to ride herd on all of it by hand.

Multi-location marketing has a built-in tension: you want every location consistent and on-brand, but you also want each one locally relevant — actually speaking to its own market. Do it all from the center and it feels generic. Leave it to each location and it falls apart. The answer is a system that does both at once.

## Why the usual fixes fail

Hand each location a brand kit and hope? The motivated ones use it; the rest don't. Run everything from corporate? It's consistent but generic, and it ignores that a location in one city has different customers than another. Hire a marketer per location? It doesn't scale and the quality swings wildly.

The real problem is that consistency at scale is repetitive, never-finished work — exactly what gets dropped when humans are busy, and exactly what a system is built to carry.

## What a multi-location system does

The model is "central brain, local relevance": one engine that holds the brand and adapts it to each location automatically.

- **Central brand, local detail.** One content and offer engine produces on-brand material and tailors it to each location and market — so every storefront looks like the same company while still speaking locally.
- **Every location active.** Posting, profiles, and follow-up run for all locations on schedule, so no location quietly goes dark because its manager got busy.
- **One source of truth.** A shared memory holds brand, offers, and what's working, so a win at one location can roll out to all of them instead of being reinvented.
- **One roll-up view.** Group and per-location performance side by side, so you can see exactly where to push instead of flying blind.

A human still approves what matters. The system makes sure the work actually happens everywhere, every week — the part that breaks down the moment you rely on each location's willpower.

## Consistency is a growth lever, not just tidiness

When every location is active and on-brand, the whole group compounds: stronger local presence everywhere, a brand that reads as one trustworthy company, and lessons that spread instead of staying stuck in one store. Inconsistency isn't just untidy — it's lost revenue at every location that's coasting.

## Where to start

This week, audit every location's Google Business Profile and social presence in one spreadsheet. You'll immediately see which ones have gone dark — and that gap is usually the fastest money to recover.

If you'd rather have the whole thing run from one place — consistent, local, and active across every location — that's what we build at Amagna. Chart your free [Gold Map](/audit) and we'll hand you a plan for keeping every location on-brand and full.`,
  },
  {
    title: 'Local SEO at Scale: Managing Google Business Profiles Across Every Location',
    slug: 'local-seo-at-scale-multi-location-google-profiles',
    category: 'Multi-Location',
    excerpt:
      'Dozens of Google Business Profiles, listings, and review streams — and no time to keep them accurate. Here is how to run local SEO at scale with a system.',
    seoTitle: 'Local SEO at Scale: Managing Google Business Profiles for Every Location',
    seoDescription:
      'How multi-location and franchise brands run local SEO at scale — keeping dozens of Google Business Profiles, listings, and reviews accurate and active with an automated system.',
    targetKeywords:
      'multi location local seo, manage multiple google business profiles, franchise local seo, multi location listings management, local seo at scale',
    tags: ['multi-location', 'local-seo', 'automation'],
    body: `For a single business, local SEO is a manageable chore: keep the Google Business Profile complete, gather reviews, stay active. For a brand with twenty, fifty, or two hundred locations, the same chore becomes a monster — dozens of profiles, listings across directories, and review streams, all needing to stay accurate and active at once. Nobody has time, so it quietly rots, and every stale profile is lost local visibility.

Yet local search is exactly where multi-location brands should dominate. Each location is a chance to own its own "near me" results. The brands that run local SEO at scale turn that into a real advantage; the ones that don't leave money on the table in every market.

## Why it breaks at scale

The work itself isn't hard — it's the multiplication. Hours change at one location and the profile isn't updated, so customers show up to a closed door and leave a bad review. A new location launches with a half-built profile. Reviews pile up unanswered across fifty inboxes. Listings drift out of sync across directories. Each issue is small; multiplied across every location, it's a constant, losing battle for any human team.

Inconsistent information is the real killer. When your name, address, hours, and categories don't match across the web, search engines lose confidence and rank you lower — everywhere.

## What running local SEO at scale looks like

The fix is a system that treats all your locations as one managed set instead of dozens of separate fires.

- **Profiles managed centrally.** Every location's Google Business Profile kept complete, accurate, and consistent — categories, services, hours, photos — from one place.
- **Listings in sync.** Name, address, and details kept consistent across the directories that matter, so the signals reinforce instead of conflict.
- **Reviews handled everywhere.** Requests going out after service at every location and responses managed centrally, so no location's reputation is left to fend for itself.
- **Posts and updates on schedule.** Each profile kept active rather than frozen, because active profiles win local rankings.

A human still approves the templates and anything sensitive. The system carries the repetitive, multiplied work that no team can keep up with by hand.

## Accuracy is the foundation

Before anything clever, the boring fundamentals win local SEO at scale: consistent information, complete profiles, active management. Get those right across every location and you've already beaten most multi-location competitors, who let it drift. The flashy tactics matter far less than simply keeping every location accurate and alive.

## Where to start

This week, pull every location's profile into one list and check three things on each: correct hours, correct primary category, and recent photos. You'll find gaps — and fixing them is the fastest local-visibility win you have.

If you'd rather have every location's local presence managed for you — profiles, listings, and reviews kept accurate and active at scale — that's what we build at Amagna. Chart your free [Gold Map](/audit) and we'll hand you a plan for owning local search across all your locations.`,
  },
];

function buildBody(p) {
  return {
    slug: p.slug,
    name: p.title,
    status: 'published',
    publishedAt: PUBLISHED_ISO,
    tags: p.tags,
    content: {
      slug: p.slug,
      title: p.title,
      body: p.body,
      excerpt: p.excerpt,
      author: 'The Amagna Crew',
      category: p.category,
      seoTitle: p.seoTitle,
      seoDescription: p.seoDescription,
      targetKeywords: p.targetKeywords,
      publishedAt: PUBLISHED_DATE,
      publishStatus: 'published',
    },
  };
}

function stageAll() {
  mkdirSync(OUT_DIR, { recursive: true });
  for (const p of POSTS) {
    writeFileSync(join(OUT_DIR, `${p.slug}.json`), JSON.stringify(buildBody(p), null, 2));
  }
  console.log(`staged ${POSTS.length} posts -> ${OUT_DIR}`);
}

async function existingSlugs() {
  const key = process.env.SAPT_API_KEY;
  if (!key) throw new Error('SAPT_API_KEY not in env (source .env.local first)');
  const res = await fetch(
    `${BASE}/projects/${PROJECT_ID}/cms/content/${CONTENT_TYPE}?limit=100`,
    { headers: { Authorization: `ApiKey ${key}`, Accept: 'application/json' } },
  );
  if (!res.ok) throw new Error(`GET existing failed: HTTP ${res.status}`);
  const json = await res.json();
  const items = Array.isArray(json.items) ? json.items : [];
  return new Set(items.map((it) => (it.content && it.content.slug) || it.slug).filter(Boolean));
}

async function postOne(p) {
  const key = process.env.SAPT_API_KEY;
  if (!key) throw new Error('SAPT_API_KEY not in env (source .env.local first)');
  const res = await fetch(`${BASE}/projects/${PROJECT_ID}/cms/content/${CONTENT_TYPE}`, {
    method: 'POST',
    headers: {
      Authorization: `ApiKey ${key}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildBody(p)),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, slug: p.slug, body: text.slice(0, 300) };
}

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1];

if (args.includes('--list')) {
  for (const p of POSTS) console.log(`${p.category.padEnd(16)} ${p.slug}`);
} else if (args.includes('--stage')) {
  stageAll();
} else if (args.includes('--post')) {
  stageAll();
  const existing = await existingSlugs();
  let targets = POSTS.filter((p) => !existing.has(p.slug));
  if (only) targets = targets.filter((p) => p.slug === only);
  if (targets.length === 0) {
    console.log(only ? `nothing to post (${only} exists or unknown)` : 'all posts already exist');
  }
  for (const p of targets) {
    const r = await postOne(p);
    console.log(`${r.ok ? 'OK ' : 'FAIL'} ${r.status} ${r.slug}${r.ok ? '' : ' :: ' + r.body}`);
    if (!r.ok && only) break;
  }
} else {
  console.log('usage: --list | --stage | --post [--only=<slug>]');
}
