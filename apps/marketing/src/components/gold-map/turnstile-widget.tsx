'use client';

import { useEffect, useId, useRef, useState } from 'react';

/**
 * Cloudflare Turnstile widget (no npm dependency — script tag + explicit
 * render). Sits at the "turn the key" moment; the token it produces is verified
 * server-side before any plan generation. Voyage-styled (dark theme), labeled
 * for screen readers, and degrades gracefully: if the site key is absent the
 * widget renders nothing (no gate), and if the script fails to load it offers a
 * keyboard-accessible "Try again".
 */

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '';
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

/** Bot protection is configured (site key inlined at build time). */
export const TURNSTILE_ENABLED = SITE_KEY.length > 0;

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';
let scriptStatus: ScriptStatus = 'idle';
const waiters: Array<(ok: boolean) => void> = [];

/** Load the Turnstile script once; resolve false if it fails or hangs. */
function loadTurnstileScript(): Promise<boolean> {
  if (scriptStatus === 'ready') return Promise.resolve(true);
  if (scriptStatus === 'error') return Promise.resolve(false);
  return new Promise((resolve) => {
    waiters.push(resolve);
    if (scriptStatus === 'loading') return;
    scriptStatus = 'loading';

    const settle = (ok: boolean) => {
      scriptStatus = ok ? 'ready' : 'error';
      waiters.splice(0).forEach((w) => w(ok));
    };

    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.defer = true;
    s.onload = () => settle(true);
    s.onerror = () => settle(false);
    document.head.appendChild(s);
    // Don't leave the lead stuck behind a hung script.
    window.setTimeout(() => {
      if (scriptStatus === 'loading') settle(false);
    }, 8000);
  });
}

type Props = {
  /** Called with the token on success, or null when it expires / errors. */
  onToken: (token: string | null) => void;
};

export function TurnstileWidget({ onToken }: Props): JSX.Element | null {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const labelId = useId();

  useEffect(() => {
    if (!TURNSTILE_ENABLED) return;
    let cancelled = false;
    setFailed(false);

    loadTurnstileScript().then((ok) => {
      if (cancelled) return;
      const api = window.turnstile;
      if (!ok || !api || !containerRef.current) {
        setFailed(true);
        return;
      }
      try {
        containerRef.current.innerHTML = '';
        widgetIdRef.current = api.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
          action: 'gold-map-generate',
          callback: (token: string) => onTokenRef.current(token),
          'expired-callback': () => onTokenRef.current(null),
          'error-callback': () => {
            onTokenRef.current(null);
            setFailed(true);
          },
        });
      } catch {
        setFailed(true);
      }
    });

    return () => {
      cancelled = true;
      const api = window.turnstile;
      if (widgetIdRef.current && api) {
        try {
          api.remove(widgetIdRef.current);
        } catch {
          /* widget already gone */
        }
        widgetIdRef.current = null;
      }
    };
  }, [attempt]);

  if (!TURNSTILE_ENABLED) return null;

  return (
    <div className="mt-6">
      <p id={labelId} className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-warmgold/80">
        One quick check — prove you&apos;re crew, not a bot
      </p>
      <div ref={containerRef} aria-labelledby={labelId} className="min-h-[65px]" />
      {failed && (
        <p className="mt-2 text-sm text-brand-cream/70">
          The check didn&apos;t load.{' '}
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setAttempt((a) => a + 1);
            }}
            className="font-semibold text-brand-warmgold underline underline-offset-4 transition hover:text-brand-warmgold/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-warmgold/60"
          >
            Try again
          </button>
        </p>
      )}
    </div>
  );
}
