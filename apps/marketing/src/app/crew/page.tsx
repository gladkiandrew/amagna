import { permanentRedirect } from 'next/navigation';

/**
 * /crew is retired (run 7) — the crew now lives in an /about section. Permanent
 * (308) redirect to the crew anchor so old links keep working.
 */
export default function CrewRedirect(): never {
  permanentRedirect('/about#crew');
}
