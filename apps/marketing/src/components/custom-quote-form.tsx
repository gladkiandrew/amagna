'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { submitCustomQuote } from '@/app/custom-quote/actions';
import {
  COMPANY_SIZES,
  SPEND_RANGES,
  NICHE_OPTIONS,
  INITIAL_CUSTOM_QUOTE_STATE,
  type CustomQuoteState,
} from '@/lib/custom-quote';

const SELECT_CLASS =
  'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

function FieldError({ message }: { message?: string }): JSX.Element | null {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-royal-purple text-white hover:bg-royal-purple/90 sm:w-auto"
    >
      {pending ? 'Sending…' : 'Request a custom quote'}
    </Button>
  );
}

/** The /custom-quote intake form. Submits via the submitCustomQuote server action. */
export function CustomQuoteForm(): JSX.Element {
  const [state, formAction] = useFormState<CustomQuoteState, FormData>(
    submitCustomQuote,
    INITIAL_CUSTOM_QUOTE_STATE,
  );

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-royal-purple" aria-hidden="true" />
        <h2 className="mt-4 text-xl font-semibold text-ink">Inquiry received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
      {state.message && (
        <p className="mb-6 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="companyName">Company name</Label>
          <Input id="companyName" name="companyName" className="mt-1.5" />
          <FieldError message={state.fieldErrors.companyName} />
        </div>

        <div>
          <Label htmlFor="contactName">Your name</Label>
          <Input id="contactName" name="contactName" className="mt-1.5" />
          <FieldError message={state.fieldErrors.contactName} />
        </div>

        <div>
          <Label htmlFor="contactEmail">Email</Label>
          <Input id="contactEmail" name="contactEmail" type="email" className="mt-1.5" />
          <FieldError message={state.fieldErrors.contactEmail} />
        </div>

        <div>
          <Label htmlFor="contactPhone">Phone (optional)</Label>
          <Input id="contactPhone" name="contactPhone" type="tel" className="mt-1.5" />
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

        <div>
          <Label htmlFor="companySize">Company size</Label>
          <select
            id="companySize"
            name="companySize"
            className={`${SELECT_CLASS} mt-1.5`}
            defaultValue=""
          >
            <option value="">Select one…</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <FieldError message={state.fieldErrors.companySize} />
        </div>

        <div>
          <Label htmlFor="locationsCount">Locations / properties</Label>
          <Input
            id="locationsCount"
            name="locationsCount"
            inputMode="numeric"
            placeholder="e.g. 5"
            className="mt-1.5"
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="currentSpend">Current marketing spend</Label>
          <select
            id="currentSpend"
            name="currentSpend"
            className={`${SELECT_CLASS} mt-1.5`}
            defaultValue=""
          >
            <option value="">Select a range…</option>
            {SPEND_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="primaryGoal">What do you want to happen?</Label>
          <Textarea
            id="primaryGoal"
            name="primaryGoal"
            rows={4}
            placeholder="The outcome you are after — more listings across your communities, ranking every location, one unified system for your agents…"
            className="mt-1.5"
          />
          <FieldError message={state.fieldErrors.primaryGoal} />
        </div>
      </div>

      <div className="mt-6">
        <SubmitButton />
        <p className="mt-3 text-xs text-ink-muted">
          Goes straight to Andrew. No sales team, no auto-responder — a real reply within one
          business day.
        </p>
      </div>
    </form>
  );
}
