import { permanentRedirect } from 'next/navigation';

/**
 * /custom-quote is retired (run 7). The Gold Map (/audit) is now the single
 * intake funnel — custom scope is handled there. Permanent (308) redirect so
 * old links and any indexed URL pass through to the Gold Map.
 */
export default function CustomQuoteRedirect(): never {
  permanentRedirect('/audit');
}
