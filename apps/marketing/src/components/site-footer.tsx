import Link from 'next/link';
import { Wordmark } from '@/components/wordmark';
import { NAV_LINKS, BOOK_A_CALL_HREF, SITE } from '@/lib/site';

/**
 * Site footer — wordmark, the two niches, primary nav, contact, and the legal row.
 * Dark surface (royal purple) so it closes the page with brand weight.
 */
export function SiteFooter(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-royal-purple text-white/80">
      <div className="mx-auto w-full max-w-[1100px] px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand + tagline */}
          <div className="md:col-span-2">
            <Link href="/" aria-label="Amagna AI — home">
              <Wordmark variant="onDark" className="h-8" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              {SITE.tagline}
            </p>
            <Link
              href={BOOK_A_CALL_HREF}
              className="mt-6 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-medium text-royal-purple transition-colors hover:bg-white/90"
            >
              Book a call
            </Link>
          </div>

          {/* Nav */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Amagna AI. All rights reserved.</p>
          <p>Home services &amp; real estate growth, run by AI.</p>
        </div>
      </div>
    </footer>
  );
}
