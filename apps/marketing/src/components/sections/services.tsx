import { Megaphone, PenLine, Star, MapPin, Mail, BarChart3 } from 'lucide-react';

const SERVICES = [
  {
    icon: Megaphone,
    title: 'Lead generation',
    body: 'Meta and Google ad campaigns tuned per niche, landing pages tied to every ad set, and lead capture routed straight into your CRM.',
  },
  {
    icon: PenLine,
    title: 'Content production',
    body: 'Five to seven posts a week across your channels, written in your voice, scheduled and posted for you. You never open Canva.',
  },
  {
    icon: Star,
    title: 'Reputation & reviews',
    body: 'Google Business Profile management, automated review requests after every job, and in-voice responses that sound like you.',
  },
  {
    icon: MapPin,
    title: 'Local SEO',
    body: 'Keyword tracking, on-page execution, citation building, and visibility in AI search — ChatGPT, Perplexity, Gemini.',
  },
  {
    icon: Mail,
    title: 'Email & SMS',
    body: 'List building, nurture sequences, and broadcasts — with 10DLC compliance handled so your messages actually land.',
  },
  {
    icon: BarChart3,
    title: 'Reporting',
    body: 'A weekly report in plain English, plus a live dashboard. You see what worked, what is next, and where the money went.',
  },
] as const;

/** Home page — the productized service offering, six cards. */
export function Services(): JSX.Element {
  return (
    <section id="services" className="border-t border-black/5 bg-white">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-antique-gold">
          What you get
        </p>
        <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Everything a growing operator needs — handled
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
          One retainer. Built once for your business, then improved every week. You stay in the
          field; we keep the phone ringing and the calendar full.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-black/5 bg-cream p-6 transition-shadow hover:shadow-sm"
            >
              <service.icon className="h-6 w-6 text-royal-purple" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
