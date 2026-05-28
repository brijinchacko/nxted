'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { Input, TextArea } from '@/components/ui/Input';

export default function ExpertApplyPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch('/api/contributor/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setDone(true);
      toast.success('Application received');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="pt-[140px] pb-[120px] min-h-screen bg-[#0A1616]">
      <div className="container-site max-w-2xl">
        <div className="text-label text-[var(--expert)] mb-4">Expert contributors</div>
        <h1 className="text-h1 mb-4">Apply to <span className="text-[var(--expert)]">evaluate AI</span></h1>
        <p className="text-body text-[var(--text-secondary)] mb-10 max-w-xl">
          We pay UK rates to India-based domain experts. Average earnings: £15–£40 per hour. Most evaluators come from IIT, AIIMS, IIM, NLU and ICAI backgrounds.
        </p>

        {done ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-8 text-center">
            <h2 className="text-h3 mb-2">Application received</h2>
            <p className="text-[var(--text-secondary)]">We review applications within 3 business days. You'll hear from us at the email you provided.</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-8 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input name="firstName" label="First name" required />
              <Input name="lastName" label="Last name" required />
            </div>
            <Input name="email" type="email" label="Email" required />
            <Input name="password" type="password" label="Password" required minLength={8} hint="Minimum 8 characters" />
            <Input name="linkedinUrl" label="LinkedIn (or portfolio URL)" type="url" />
            <Input
              name="expertise"
              label="Expertise"
              placeholder="e.g. Industrial Engineering, PLC/SCADA, Manufacturing"
              hint="Comma-separated"
              required
            />
            <TextArea name="credentials" label="Qualifications" placeholder="Degree, institution, years of experience, certifications" required />
            <TextArea name="bio" label="Short bio" placeholder="What domains can you evaluate confidently?" rows={4} />
            <Button type="submit" variant="expert" fullWidth disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit application'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
