import type { Metadata } from 'next';
import { SITE } from '@/lib/site';

const DESCRIPTION =
  'The terms that govern your use of the Amagna AI website and landing pages.';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: DESCRIPTION,
  alternates: { canonical: '/terms' },
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

export default function TermsPage(): JSX.Element {
  return (
    <main className="bg-brand-cream">
      <section className="mx-auto w-full max-w-[760px] px-6 py-20 sm:py-28">
        <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-gold">
          <span aria-hidden className="h-px w-7 bg-brand-gold/60" />
          Legal
        </p>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-brand-charcoal sm:text-[3rem]">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-brand-slate/80">Last updated: {LAST_UPDATED}</p>

        <p className="mt-8 leading-[1.7] text-brand-slate">
          These Terms govern your use of {SITE.domain} and our related landing pages (the
          &ldquo;Site&rdquo;), operated by Amagna AI (&ldquo;Amagna,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us&rdquo;). By using the Site, you agree to these Terms.
        </p>

        <div className="mt-12 space-y-8">
          <Section heading="Use of the site">
            <p>
              You may use the Site for lawful purposes only. Do not misuse it, attempt to disrupt it,
              or access it in any unauthorized way.
            </p>
          </Section>

          <Section heading="Our services">
            <p>
              The Site describes Amagna&rsquo;s AI and marketing services. Any engagement is governed
              by a separate written agreement between you and Amagna. Nothing on the Site is itself an
              offer or a binding commitment to provide services, and booking a call does not create a
              contract.
            </p>
          </Section>

          <Section heading="No guarantees">
            <p>
              Information on the Site is provided for general purposes. We do not guarantee specific
              results, outcomes, or revenue from any service or strategy described.
            </p>
          </Section>

          <Section heading="Intellectual property">
            <p>
              The Site&rsquo;s content, design, brand, and the &ldquo;Amagna&rdquo; name are owned by
              Amagna AI and may not be copied or reused without our permission.
            </p>
          </Section>

          <Section heading="Third-party links & tools">
            <p>
              The Site may link to third-party services, such as our scheduling tool. We are not
              responsible for the content or privacy practices of those services.
            </p>
          </Section>

          <Section heading="Disclaimers">
            <p>
              The Site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
              warranties of any kind, to the fullest extent permitted by law.
            </p>
          </Section>

          <Section heading="Limitation of liability">
            <p>
              To the fullest extent permitted by law, Amagna AI is not liable for any indirect,
              incidental, or consequential damages arising from your use of the Site.
            </p>
          </Section>

          <Section heading="Governing law">
            <p>
              These Terms are governed by the laws of the State of Michigan, USA, without regard to
              its conflict-of-laws rules.
            </p>
          </Section>

          <Section heading="Changes">
            <p>
              We may update these Terms from time to time. Continued use of the Site means you accept
              the current version.
            </p>
          </Section>

          <Section heading="Contact">
            <p>
              Questions about these Terms? Email{' '}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-brand-purple underline underline-offset-2 hover:text-brand-purple/80"
              >
                {SITE.email}
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}
