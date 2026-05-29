'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'contact-form' }),
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
      toast.success("We'll be in touch within one business day");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page-pad">
      <div className="container-narrow">
        <div className="text-label mb-5 text-center">Contact</div>
        <h1 className="text-h1 text-center mb-12">
          Let's <span className="text-[var(--expert)]">talk</span>.
        </h1>

        {done ? (
          <div className="surface p-10 md:p-12 text-center">
            <h2 className="text-h3 mb-3">Thanks - we'll be in touch.</h2>
            <p className="text-[var(--text-secondary)]">A coordinator will reach out at the email you provided.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="surface p-8 md:p-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input name="contactName" label="Your name" required />
              <Input name="companyName" label="Company" required />
            </div>
            <Input name="email" type="email" label="Work email" required />
            <Input name="industry" label="Industry" placeholder="e.g. Humanoid robotics" />
            <Select name="productInterest" label="Interested in" options={[
              { value: 'EXPERT', label: 'Nxted Expert (text RLHF, evaluation)' },
              { value: 'CAPTURE', label: 'Nxted Capture (physical AI data)' },
              { value: 'BOTH', label: 'Both' },
            ]} />
            <TextArea name="notes" label="Tell us about the project" rows={5} placeholder="Domain, volume, timeline, format" />
            <Button type="submit" variant="expert" size="lg" fullWidth disabled={submitting}>
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
