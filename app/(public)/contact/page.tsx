'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { FadeUp } from '@/components/motion/FadeUp';

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
      toast.success('We\'ll be in touch within one business day');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="pt-[140px] pb-[120px]">
      <div className="container-site grid lg:grid-cols-12 gap-12 max-w-5xl">
        <FadeUp className="lg:col-span-5">
          <div className="text-label text-[var(--text-secondary)] mb-4">Contact</div>
          <h1 className="text-h1 mb-6">
            Let's <span className="text-[var(--expert)]">talk</span>.
          </h1>
          <p className="text-body text-[var(--text-secondary)] mb-8">
            We respond to every inbound within one business day. For procurement, partnerships or press, the form is the fastest route. For Expert sprints, self-serve checkout is faster still.
          </p>
          <div className="space-y-2 text-sm text-[var(--text-muted)]">
            <p>OFORO LTD — Milton Keynes, England</p>
            <p>hello@nxted.ai</p>
          </div>
        </FadeUp>

        <div className="lg:col-span-7">
          {done ? (
            <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-10 text-center">
              <h2 className="text-h3 mb-3">Thanks — we'll be in touch.</h2>
              <p className="text-[var(--text-secondary)]">A coordinator will reach out at the email you provided.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
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
              <Button type="submit" variant="expert" fullWidth disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
