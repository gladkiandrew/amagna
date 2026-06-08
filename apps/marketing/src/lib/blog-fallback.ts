import type { BlogPost } from './blog-types';

/**
 * Local fallback posts so `/blog` is populated and demonstrable BEFORE the Sapt
 * API key is set. Once `SAPT_API_KEY` + `SAPT_PROJECT_ID` are configured on the
 * Worker, `sapt-blog.ts` reads the live CMS and these are no longer shown —
 * **Sapt is the source of truth.** These two reproduce the topics of the two
 * posts already published in Sapt (`what-is-an-autonomous-marketing-system`,
 * `more-booked-jobs-without-chasing-leads`); reconcile wording with Sapt when keyed.
 *
 * No fabricated client results or testimonials (per project rules) — claims are
 * general, not specific outcomes.
 */
export const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: 'what-is-an-autonomous-marketing-system',
    title: 'What Is an Autonomous Marketing System?',
    excerpt:
      'Most marketing breaks the moment you stop pushing it. An autonomous marketing system is the machine that keeps running — and the content that fuels it — so growth does not depend on you finding spare hours.',
    author: 'Andrew Gladki',
    publishedAt: '2026-05-28',
    category: 'Foundations',
    seoTitle: 'What Is an Autonomous Marketing System? | Amagna AI',
    seoDescription:
      'An autonomous marketing system is a machine that runs your marketing for you — content, ads, follow-up, and memory working together. Here is what that actually means.',
    targetKeywords: [
      'autonomous marketing system',
      'AI marketing agency',
      'marketing automation for small business',
    ],
    tags: ['foundations', 'ai-marketing'],
    body: `Most marketing is a treadmill. You post for a week, the calls tick up, then a job runs long, you miss a few days, and it all goes quiet. The problem was never effort. The problem is that the system stops the moment you stop pushing it.

An **autonomous marketing system** is the fix: a machine that runs your marketing whether or not you have a spare hour. Not a pile of tools you have to operate — one system that operates itself, with a human watching the wheel.

## The four parts

A real autonomous system has four moving parts that work together:

1. **Content that gets made for you.** Posts, short videos, and emails in your voice, on a schedule, without you writing a word.
2. **Distribution that runs itself.** The content goes where your customers actually are — Meta, TikTok, Google, Snapchat, your inbox — and the ads get tuned without you babysitting a dashboard.
3. **Follow-up that never forgets.** New leads get answered, nurtured, and booked automatically, around the clock.
4. **A memory layer underneath all of it.** One brain that remembers your brand, your customers, and what is working — so nothing repeats, goes off-message, or gets dropped.

## Why "autonomous" matters

Plenty of agencies will sell you content. Plenty of tools will sell you automation. The difference is whether the pieces *know about each other*. When your content, your ads, and your follow-up all share one memory, the system compounds: every week it knows a little more about what makes your phone ring, and it leans into it.

That is the part you cannot get from a freelancer and a folder of templates. It is also the part that lets the whole thing keep running when you are on a roof, in a showing, or asleep.

## What it is *not*

It is not "set it and forget it" with no human. Anything that goes to a real person — an ad, a reply, a published post — has a human approval step. Autonomous means the busywork runs itself, not that judgment disappears.

## Where to start

You do not need all four parts on day one. Most operators start with content and follow-up, because that is where the leak usually is, then add paid distribution once the machine is humming.

If you want to see what your specific version would look like, the [Gold Map](/audit) walks you through it and hands you a real plan at the end — free.`,
  },
  {
    slug: 'more-booked-jobs-without-chasing-leads',
    title: 'More Booked Jobs Without Chasing Leads',
    excerpt:
      'The fastest way to more booked jobs is not more leads — it is losing fewer of the ones you already get. Here is the follow-up system that does the chasing for you.',
    author: 'Andrew Gladki',
    publishedAt: '2026-06-02',
    category: 'Playbooks',
    seoTitle: 'More Booked Jobs Without Chasing Leads | Amagna AI',
    seoDescription:
      'Stop losing leads to slow follow-up. A simple automated system that responds in seconds, nurtures the maybes, and fills your calendar without you chasing anyone.',
    targetKeywords: [
      'get more booked jobs',
      'home services lead follow-up',
      'stop chasing leads',
      'contractor marketing',
    ],
    tags: ['playbooks', 'home-services', 'lead-follow-up'],
    body: `Ask most owners how to get more jobs and they say the same thing: more leads. But when we look at the numbers, the leak is almost never at the top. It is in the middle — the leads you already paid for, sitting unanswered while you are on a job.

The fastest path to a fuller calendar is not more leads. It is **losing fewer of the ones you already get.**

## Speed is the whole game

A lead that gets a reply in five minutes is worth many times one that waits an hour. By the next morning, most have already called someone else. You cannot win that race by hand when you are under a sink at 9am — but a system can answer every single time, instantly, day or night.

## The follow-up system, in plain English

Here is what "the system does the chasing" actually looks like:

- **Instant response.** Every new lead — form, call, DM, ad — gets a friendly reply in seconds, not hours.
- **The nurture.** The "maybes" do not get dropped. They get a short, human sequence over the next days that keeps you top of mind until they are ready.
- **The booking.** When they are ready, they book straight onto your calendar. No phone tag.
- **The nudge.** No-shows and stalled quotes get a gentle automatic follow-up — the messages you always mean to send and never do.

None of that requires you to remember anything. It runs on its own, and you just see booked jobs show up.

## Where the owner still matters

The system handles the speed and the repetition. You handle the work and the judgment calls. Anything that needs a real human — a tricky quote, a sensitive reply — still comes to you. The goal is to delete the busywork, not the relationship.

## The honest part

This will not turn a bad offer into a good one, and it will not save you if the work is not there. What it does is stop you from quietly losing jobs you already earned — which, for most operators, is the cheapest growth available.

Want to see what this would look like for your business? The [Gold Map](/audit) builds you a specific plan, free — including exactly where your follow-up is leaking today.`,
  },
];
