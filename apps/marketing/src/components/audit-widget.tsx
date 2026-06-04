'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Check, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitAudit } from '@/app/audit/actions';
import {
  QUICK_FILL_CHIPS,
  NICHE_OPTIONS,
  INITIAL_AUDIT_STATE,
  type Audit,
  type AuditState,
} from '@/lib/audit-shared';
import { trackLead } from '@/lib/meta-pixel-events';
import { BOOK_A_CALL_HREF } from '@/lib/site';

/** Sequence shown during audit generation — each line ~4s. */
const LOADING_MESSAGES = [
  'Analyzing your current online presence…',
  'Checking how you rank on Google…',
  'Looking at your competitors…',
  'Drafting your 30-day plan…',
  'Calculating opportunity…',
] as const;

const SELECT_CLASS =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

function FieldError({ message }: { message?: string }): JSX.Element | null {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function LoadingOverlay(): JSX.Element {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => Math.min(i + 1, LOADING_MESSAGES.length - 1)),
      4000,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/95 backdrop-blur">
      <Loader2 className="h-8 w-8 animate-spin text-brand-purple" aria-hidden="true" />
      <p className="mt-4 text-sm font-medium text-brand-charcoal">{LOADING_MESSAGES[idx]}</p>
      <p className="mt-1 text-xs text-brand-slate">This usually takes 60 seconds.</p>
    </div>
  );
}

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-brand-purple text-white hover:bg-brand-purple/90 sm:w-auto"
    >
      {pending ? 'Generating…' : 'Get my free audit'}
    </Button>
  );
}

function AuditResult({ audit }: { audit: Audit }): JSX.Element {
  // After 7 seconds, surface an honest soft-prompt nudging the call.
  const [showSoftPrompt, setShowSoftPrompt] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowSoftPrompt(true), 7000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-brand-gold/20 bg-white p-6 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)] sm:p-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Your audit
        </div>

        {/* Where you stand */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-brand-charcoal">Where you stand now</h2>
          <ul className="mt-3 space-y-2.5">
            {audit.whereYouStand.map((item, i) => (
              <li key={`stand-${i}`} className="flex gap-2.5 text-sm leading-relaxed text-brand-slate">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What's missing */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-brand-charcoal">What&apos;s missing</h2>
          <ul className="mt-3 space-y-2.5">
            {audit.whatsMissing.map((item, i) => (
              <li key={`gap-${i}`} className="flex gap-2.5 text-sm leading-relaxed text-brand-slate">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 30-day plan */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-brand-charcoal">Your 30-day plan</h2>
          <ol className="mt-3 space-y-3">
            {audit.thirtyDayPlan.map((step, i) => (
              <li key={`plan-${i}`} className="flex gap-3 text-sm leading-relaxed text-brand-slate">
                <span className="font-mono text-xs font-semibold text-brand-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-brand-charcoal">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Opportunity */}
        <section className="mt-8 rounded-xl bg-brand-cream p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-purple">
            The opportunity
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-charcoal">{audit.opportunity}</p>
        </section>

        {/* Next step — two clear paths: scope it on a call, or see what it costs. */}
        <section className="mt-8 border-t border-brand-gold/20 pt-6">
          <h2 className="text-base font-semibold text-brand-charcoal">
            Want us to execute this for you?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brand-slate">
            Book a 20-minute call to scope it, or see exactly what it costs first. Andrew
            reviews every inquiry personally.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={BOOK_A_CALL_HREF}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-purple/90"
            >
              Book a 20-minute call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-purple/35 px-5 py-2.5 text-sm font-semibold text-brand-purple transition-colors hover:bg-brand-purple/5"
            >
              See pricing
            </Link>
          </div>
        </section>
      </div>

      {/* Soft prompt — appears after 7 seconds. Honest nudge, no false urgency. */}
      {showSoftPrompt && (
        <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/10 p-5 text-sm leading-relaxed text-brand-charcoal">
          <p>
            <strong className="font-semibold">A note from Andrew:</strong> read your plan, then
            keep it — it&apos;s yours either way. If you&apos;d rather we run it for you, grab a
            time and I&apos;ll have it scoped before we talk.
          </p>
          <Link
            href={BOOK_A_CALL_HREF}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple hover:text-brand-purple/80"
          >
            Grab a time
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}

/** The /audit qualification widget. */
export function AuditWidget(): JSX.Element {
  const [state, formAction] = useFormState<AuditState, FormData>(
    submitAudit,
    INITIAL_AUDIT_STATE,
  );
  const [situationDraft, setSituationDraft] = useState('');

  // Fire Meta pixel Lead when the audit lands. submissionId memoizes the fire
  // so React-strict-mode double-mount doesn't double-fire.
  useEffect(() => {
    if (state.status === 'success' && state.submissionId) {
      trackLead({});
    }
  }, [state.status, state.submissionId]);

  if (state.status === 'success' && state.audit) {
    return <AuditResult audit={state.audit} />;
  }

  return (
    <form action={formAction} className="relative">
      <FormShell
        state={state}
        situationDraft={situationDraft}
        setSituationDraft={setSituationDraft}
      />
    </form>
  );
}

function FormShell({
  state,
  situationDraft,
  setSituationDraft,
}: {
  state: AuditState;
  situationDraft: string;
  setSituationDraft: (v: string) => void;
}): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <div className="relative">
      {pending && <LoadingOverlay />}

      <div className="rounded-2xl border border-brand-gold/20 bg-white p-6 shadow-[0_1px_30px_-12px_rgba(93,46,140,0.25)] sm:p-8">
        {state.status === 'error' && state.message && (
          <p className="mb-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {state.message}
          </p>
        )}

        <div>
          <Label htmlFor="situationText" className="text-base font-semibold text-brand-charcoal">
            Tell us about your business and your #1 growth goal.
          </Label>
          <Textarea
            id="situationText"
            name="situationText"
            rows={4}
            placeholder="e.g. I run a 15-person HVAC company in Saginaw — summer is packed, winter is dead. I want a steady phone year-round."
            value={situationDraft}
            onChange={(e) => setSituationDraft(e.target.value)}
            className="mt-3"
          />
          <FieldError message={state.fieldErrors.situationText} />

          <div className="mt-4 flex flex-wrap gap-2">
            {QUICK_FILL_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setSituationDraft(chip)}
                className="rounded-full border border-brand-purple/30 bg-brand-purple/5 px-3 py-1.5 text-xs font-medium text-brand-purple transition-colors hover:bg-brand-purple/10"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 border-t border-brand-gold/15 pt-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="email-gate-intro" className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
              We&apos;ll email your audit + plan as a PDF
            </Label>
            <p id="email-gate-intro" className="mt-1.5 text-xs leading-relaxed text-brand-slate">
              No newsletter spam — one email with your audit, that&apos;s it.
            </p>
          </div>

          <div>
            <Label htmlFor="name">Your name</Label>
            <Input id="name" name="name" className="mt-1.5" />
            <FieldError message={state.fieldErrors.name} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" className="mt-1.5" />
            <FieldError message={state.fieldErrors.email} />
          </div>

          <div>
            <Label htmlFor="businessName">Business name</Label>
            <Input id="businessName" name="businessName" className="mt-1.5" />
            <FieldError message={state.fieldErrors.businessName} />
          </div>

          <div>
            <Label htmlFor="niche">Niche</Label>
            <select id="niche" name="niche" className={`${SELECT_CLASS} mt-1.5`} defaultValue="">
              <option value="">Select one…</option>
              {NICHE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8">
          <SubmitButton />
          <p className="mt-3 text-xs leading-relaxed text-brand-slate">
            <Check className="mr-1 inline h-3.5 w-3.5 text-brand-gold" aria-hidden="true" />
            60-second audit · real value upfront · no card needed
          </p>
        </div>
      </div>
    </div>
  );
}
