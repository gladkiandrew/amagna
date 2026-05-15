import Link from 'next/link';

export function V2Footer(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-gold/10 bg-navy-deep">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-6 py-10 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
        <div className="font-serif text-lg text-gold-bright">Amagna · AI</div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/audit" className="hover:text-white">
            Free audit
          </Link>
          <Link href="/checkout" className="hover:text-white">
            Subscribe
          </Link>
          <Link href="/book" className="hover:text-white">
            Book a call
          </Link>
          <a href="mailto:andrew@amagna.co" className="hover:text-white">
            andrew@amagna.co
          </a>
        </div>
        <p className="text-white/30">&copy; {year} Amagna AI</p>
      </div>
    </footer>
  );
}
