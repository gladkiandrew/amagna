import Link from 'next/link';
import Image from 'next/image';
import { Wordmark } from '@/components/wordmark';
import {
  NAV_LINKS,
  GOLD_MAP_CTA,
  FIELD_NOTES_HREF,
  SITE,
  SOCIAL_LINKS,
} from '@/lib/site';

/** Best-effort human label for a social URL (host keyword → name). */
function socialLabel(url: string): string {
  const u = url.toLowerCase();
  if (u.includes('instagram')) return 'Instagram';
  if (u.includes('linkedin')) return 'LinkedIn';
  if (u.includes('facebook')) return 'Facebook';
  if (u.includes('youtube')) return 'YouTube';
  if (u.includes('tiktok')) return 'TikTok';
  if (u.includes('x.com') || u.includes('twitter')) return 'X';
  return 'Social';
}

/**
 * Site footer — leads with the logo (mark + "Amagna AI", same as the nav), then
 * an Explore column (nav + Gold Map + Field Notes), a Contact column (email +
 * location + socials), and a legal/disclaimer row. Field Notes lives here (it was
 * removed from the top nav in run 7). Royal-purple surface; mobile-clean.
 */
export function SiteFooter(): JSX.Element {
  const year = new Date().getFullYear();

  const exploreLinks = [
    ...NAV_LINKS,
    { href: GOLD_MAP_CTA.href, label: 'Gold Map' },
    { href: FIELD_NOTES_HREF, label: 'Field Notes' },
  ];

  return (
    <footer className="bg-royal-purple text-white/80">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-[1.6fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              aria-label="Amagna AI — home"
              className="flex items-center gap-2.5"
            >
              <Image
                src="/brand/amagna-logo-mark.svg"
                alt=""
                aria-hidden
                width={360}
                height={300}
                className="h-8 w-auto brightness-0 invert"
              />
              <Wordmark variant="onDark" className="h-7" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{SITE.tagline}</p>
            <Link
              href={GOLD_MAP_CTA.href}
              className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-royal-purple transition-colors hover:bg-white/90"
            >
              {GOLD_MAP_CTA.label}
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-sm text-white/60">Saginaw, Michigan</li>
            </ul>
            {SOCIAL_LINKS.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {SOCIAL_LINKS.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
                    >
                      {socialLabel(url)}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Amagna AI. All rights reserved.</p>
          <p>Marketing that runs itself — built by AI, captained by humans.</p>
        </div>
      </div>
    </footer>
  );
}
