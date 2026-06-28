import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

const DESCRIPTION =
  'How Amagna AI collects, uses, and protects your information when you visit our site, contact us, or book a call.';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: DESCRIPTION,
  alternates: { canonical: '/privacy' },
};

const LAST_UPDATED = 'June 27, 2026';

function Section({ heading, children }: { heading: string; children: React.ReactNode }): JSX.Element {
  return (
    <section className="border-t border-brand-gold/20 pt-8">
      <h2 className="font-display text-xl font-semibold leading-snug text-brand-charcoal sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 space-y-3 leading-[1.7] text-brand-slate">{children}</div>
    </section>
  );
}

function MailLink(): JSX.Element {
  return (
    <a
      href={`mailto:${SITE.email}`}
      className="font-medium text-brand-purple underline underline-offset-2 hover:text-brand-purple/80"
    >
      {SITE.email}
    </a>
  );
}

export default function PrivacyPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-[760px] px-6 py-20 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Legal
        </p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3rem]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-brand-slate/80">Last updated: {LAST_UPDATED}</p>

        <p className="mt-8 leading-[1.7] text-brand-slate">
          Amagna AI (&ldquo;Amagna,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) respects your privacy.
          This policy explains what we collect when you visit {SITE.domain} or one of our landing
          pages, contact us, or book a call — and how we use and protect it.
        </p>

        <div className="mt-12 space-y-8">
          <Section heading="Information you provide">
            <p>
              When you submit a form (including the Gold Map intake), book a call, or email us, we
              collect the details you choose to share — typically your name, email, phone number,
              business name, information about your business, and the contents of your messages.
            </p>
          </Section>

          <Section heading="Information collected automatically">
            <p>
              Like most websites, we automatically collect usage and device data — such as your IP
              address, browser type, pages viewed, and referring URLs — through cookies and similar
              technologies.
            </p>
          </Section>

          <Section heading="Cookies & tracking">
            <p>
              We use cookies and pixels for analytics and advertising, including the Meta (Facebook)
              Pixel, which helps us measure and target our ads. You can control cookies through your
              browser settings and your ad preferences on the relevant platforms.
            </p>
          </Section>

          <Section heading="Tools & service providers">
            <p>We share limited data with trusted providers that help us operate, only as needed:</p>
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Cal.com — appointment scheduling</li>
              <li>Supabase — secure data storage</li>
              <li>Meta Platforms — advertising and conversion measurement</li>
              <li>Sapt — analytics and customer-relationship tooling</li>
              <li>Stripe — payment processing (if you make a purchase)</li>
              <li>Cloudflare — hosting, security, and email routing</li>
            </ul>
            <p>Each provider processes data under its own privacy terms.</p>
          </Section>

          <Section heading="How we use your information">
            <ul className="ml-5 list-disc space-y-1.5">
              <li>Respond to your inquiries and provide the services you request</li>
              <li>Schedule and conduct consultations</li>
              <li>Operate, secure, and improve our website</li>
              <li>Measure and improve our marketing, including our ads</li>
              <li>Send relevant follow-up about your inquiry — you can opt out anytime</li>
            </ul>
          </Section>

          <Section heading="How we share information">
            <p>
              We share data only with the service providers above, when required by law, or to
              protect our rights. We do not sell your personal information for money. We do use
              advertising cookies (such as the Meta Pixel) that may share limited data with ad
              platforms to measure and target ads; you can opt out through your browser and
              ad-platform settings.
            </p>
          </Section>

          <Section heading="Your choices & rights">
            <p>
              You can request access to, correction of, or deletion of your personal information, and
              you can opt out of marketing emails at any time. To make a request, email <MailLink />.
            </p>
          </Section>

          <Section heading="Data retention">
            <p>
              We keep personal information only as long as needed for the purposes described above or
              as required by law.
            </p>
          </Section>

          <Section heading="Security">
            <p>
              We use reasonable safeguards to protect your information. No method of transmission or
              storage is completely secure, so we cannot guarantee absolute security.
            </p>
          </Section>

          <Section heading="Children's privacy">
            <p>
              Our site is intended for business owners and is not directed to children under 16. We do
              not knowingly collect their personal information.
            </p>
          </Section>

          <Section heading="Changes to this policy">
            <p>
              We may update this policy from time to time. When we do, we will revise the &ldquo;Last
              updated&rdquo; date above.
            </p>
          </Section>

          <Section heading="Contact">
            <p>
              Questions about this policy? Email <MailLink />. Amagna AI is based in Saginaw,
              Michigan, USA.
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}
