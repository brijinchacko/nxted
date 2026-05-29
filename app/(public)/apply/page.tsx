'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { CheckCircle, CaretRight, GraduationCap, Briefcase, Sparkle, ShieldCheck } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { FadeUp } from '@/components/motion/FadeUp';

const TOTAL_STEPS = 4;

interface Step1 {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  city: string;
  country: string;
}

interface Step2 {
  headline: string;
  bio: string;
  credentials: string;
  linkedinUrl: string;
}

interface Step3 {
  expertise: string;
  coreSkills: string;
  toolSkills: string;
  languages: string;
  weeklyCapacityHours: number;
  hourlyRateGBP: number;
}

interface Step4 {
  track: string;
  agreeContributor: boolean;
  agreePrivacy: boolean;
}

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [s1, setS1] = useState<Step1>({ firstName: '', lastName: '', email: '', password: '', phone: '', city: '', country: 'India' });
  const [s2, setS2] = useState<Step2>({ headline: '', bio: '', credentials: '', linkedinUrl: '' });
  const [s3, setS3] = useState<Step3>({ expertise: '', coreSkills: '', toolSkills: '', languages: 'English, Hindi', weeklyCapacityHours: 20, hourlyRateGBP: 25 });
  const [s4, setS4] = useState<Step4>({ track: 'EXPERT_EVAL', agreeContributor: false, agreePrivacy: false });

  function next() { setStep((s) => Math.min(TOTAL_STEPS, s + 1)); }
  function back() { setStep((s) => Math.max(1, s - 1)); }

  async function submit() {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contributor/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...s1,
          ...s2,
          expertise: s3.expertise,
          coreSkills: s3.coreSkills,
          toolSkills: s3.toolSkills,
          languages: s3.languages,
          weeklyCapacityHours: s3.weeklyCapacityHours,
          hourlyRateGBP: s3.hourlyRateGBP,
          preferredTrack: s4.track,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Application submitted — check your email');
      router.push('/apply/success');
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page-pad bg-[#0A1616] min-h-screen">
      <div className="container-narrow">
        <FadeUp>
          <div className="text-label mb-4" style={{ color: 'var(--expert)' }}>Contributor application</div>
          <h1 className="text-h1 mb-3">
            Apply to <span className="text-[var(--expert)]">train the world's AI</span>.
          </h1>
          <p className="text-body text-[var(--text-secondary)] max-w-[58ch] mb-10">
            We pay UK rates to India-based domain experts. Average earnings: £15–£40 per hour. Most contributors come from IIT, AIIMS, IIM, NLU and ICAI backgrounds. Apply once — qualify for every role that matches your skills.
          </p>
        </FadeUp>

        <Stepper step={step} />

        <div className="mt-10 surface p-8 md:p-10">
          {step === 1 && <StepAccount s={s1} setS={setS1} />}
          {step === 2 && <StepProfile s={s2} setS={setS2} />}
          {step === 3 && <StepSkills s={s3} setS={setS3} />}
          {step === 4 && <StepConsent s={s4} setS={setS4} />}

          <div className="flex justify-between items-center mt-10 pt-6 border-t border-[var(--border-dim)]">
            <Button variant="outline" onClick={back} disabled={step === 1}>← Back</Button>
            {step < TOTAL_STEPS ? (
              <Button variant="expert" onClick={() => { if (validate(step, s1, s2, s3, s4)) next(); }}>
                Continue <CaretRight size={16} weight="bold" />
              </Button>
            ) : (
              <Button
                variant="expert"
                onClick={submit}
                disabled={submitting || !s4.agreeContributor || !s4.agreePrivacy}
              >
                {submitting ? 'Submitting…' : 'Submit application'}
              </Button>
            )}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-5">
          <Benefit icon={GraduationCap} title="Apply once" body="One application qualifies you for every role matching your skills." />
          <Benefit icon={Briefcase} title="Weekly payouts" body="Wednesday payouts in INR via UPI/NEFT, or GBP via Wise." />
          <Benefit icon={ShieldCheck} title="No screenshot monitoring" body="We never monitor your screen. Self-declared hours, activity audits." />
        </div>
      </div>
    </section>
  );
}

function validate(step: number, s1: Step1, s2: Step2, s3: Step3, s4: Step4): boolean {
  if (step === 1) {
    if (!s1.firstName || !s1.lastName || !s1.email || !s1.password || !s1.city) {
      toast.error('Please fill in all required fields');
      return false;
    }
    if (s1.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }
  }
  if (step === 2) {
    if (!s2.credentials) {
      toast.error('Please describe your qualifications');
      return false;
    }
  }
  if (step === 3) {
    if (!s3.expertise || !s3.coreSkills) {
      toast.error('Please add at least your expertise and core skills');
      return false;
    }
  }
  return true;
}

function Stepper({ step }: { step: number }) {
  const labels = ['Account', 'Profile', 'Skills', 'Consent'];
  return (
    <div className="grid grid-cols-4 gap-3">
      {labels.map((label, i) => {
        const idx = i + 1;
        const active = idx === step;
        const done = idx < step;
        return (
          <div key={label} className="flex flex-col gap-2">
            <div className={`h-1 rounded-full ${done || active ? 'bg-[var(--expert)]' : 'bg-[var(--border-default)]'}`} />
            <div className="flex items-center gap-2">
              {done ? (
                <CheckCircle size={16} weight="fill" style={{ color: 'var(--expert)' }} />
              ) : (
                <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${active ? 'bg-[var(--expert)] text-[#001416] font-bold' : 'border border-[var(--border-bright)] text-[var(--text-tertiary)]'}`}>
                  {idx}
                </span>
              )}
              <span className={`text-xs uppercase tracking-wider ${active ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'}`}>{label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StepAccount({ s, setS }: { s: Step1; setS: (s: Step1) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="text-h3 mb-1">Create your account</h2>
      <p className="text-sm text-[var(--text-secondary)]">We'll use this to send assignments and weekly payout notifications.</p>
      <div className="grid grid-cols-2 gap-4">
        <Input label="First name" value={s.firstName} onChange={(e) => setS({ ...s, firstName: e.target.value })} required />
        <Input label="Last name" value={s.lastName} onChange={(e) => setS({ ...s, lastName: e.target.value })} required />
      </div>
      <Input label="Email" type="email" value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} required />
      <Input label="Password" type="password" minLength={8} value={s.password} onChange={(e) => setS({ ...s, password: e.target.value })} hint="Minimum 8 characters" required />
      <div className="grid grid-cols-2 gap-4">
        <Input label="Phone (WhatsApp)" value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} placeholder="+91 …" />
        <Input label="City" value={s.city} onChange={(e) => setS({ ...s, city: e.target.value })} placeholder="Bengaluru" required />
      </div>
      <Select
        label="Country"
        value={s.country}
        onChange={(e) => setS({ ...s, country: e.target.value })}
        options={['India', 'United Kingdom', 'United States', 'United Arab Emirates', 'Singapore', 'Other']}
      />
    </div>
  );
}

function StepProfile({ s, setS }: { s: Step2; setS: (s: Step2) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="text-h3 mb-1">Your profile</h2>
      <p className="text-sm text-[var(--text-secondary)]">A short pitch and your credentials. This is what hiring managers see when matching.</p>
      <Input
        label="Headline"
        value={s.headline}
        onChange={(e) => setS({ ...s, headline: e.target.value })}
        placeholder="Senior PLC engineer · L&T heavy industries (8 yrs)"
      />
      <TextArea
        label="Short bio"
        value={s.bio}
        onChange={(e) => setS({ ...s, bio: e.target.value })}
        placeholder="What domains can you evaluate confidently? What kind of work do you want?"
        rows={4}
      />
      <TextArea
        label="Qualifications & credentials"
        value={s.credentials}
        onChange={(e) => setS({ ...s, credentials: e.target.value })}
        placeholder="Degree, institution, years of experience, certifications, registration numbers"
        rows={4}
        required
      />
      <Input
        label="LinkedIn (or portfolio URL)"
        type="url"
        value={s.linkedinUrl}
        onChange={(e) => setS({ ...s, linkedinUrl: e.target.value })}
        placeholder="https://linkedin.com/in/…"
      />
    </div>
  );
}

function StepSkills({ s, setS }: { s: Step3; setS: (s: Step3) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="text-h3 mb-1">Skills & availability</h2>
      <p className="text-sm text-[var(--text-secondary)]">Comma-separated. Be specific — "vibration analysis" not "engineering".</p>
      <Input
        label="Expertise domains"
        value={s.expertise}
        onChange={(e) => setS({ ...s, expertise: e.target.value })}
        placeholder="Industrial automation, Predictive maintenance, PLC/SCADA"
        required
      />
      <Input
        label="Core skills (daily use)"
        value={s.coreSkills}
        onChange={(e) => setS({ ...s, coreSkills: e.target.value })}
        placeholder="Bearing failure analysis, Vibration spectra, ISO 10816, Failure-mode rubrics"
        required
      />
      <Input
        label="Tools / software"
        value={s.toolSkills}
        onChange={(e) => setS({ ...s, toolSkills: e.target.value })}
        placeholder="Allen-Bradley RSLogix, Siemens TIA, MATLAB"
      />
      <Input
        label="Languages"
        value={s.languages}
        onChange={(e) => setS({ ...s, languages: e.target.value })}
        placeholder="English, Hindi, Tamil"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Weekly capacity (hours)"
          type="number"
          min={5}
          max={60}
          value={String(s.weeklyCapacityHours)}
          onChange={(e) => setS({ ...s, weeklyCapacityHours: Number(e.target.value) })}
        />
        <Input
          label="Indicative rate (£/hr)"
          type="number"
          min={5}
          max={500}
          value={String(s.hourlyRateGBP)}
          onChange={(e) => setS({ ...s, hourlyRateGBP: Number(e.target.value) })}
          hint="Project-by-project rates may differ"
        />
      </div>
    </div>
  );
}

function StepConsent({ s, setS }: { s: Step4; setS: (s: Step4) => void }) {
  const tracks = [
    { value: 'EXPERT_EVAL', label: 'Expert evaluation (RLHF)', desc: 'Score AI outputs against domain rubrics.' },
    { value: 'RED_TEAM', label: 'Red-team', desc: 'Craft adversarial prompts in your domain.' },
    { value: 'COMPLIANCE', label: 'EU AI Act compliance', desc: 'Structured documentation work.' },
    { value: 'WRITTEN_EVAL', label: 'Written evaluation only', desc: 'Async, written-first contributors (no video).' },
  ];
  return (
    <div className="space-y-5">
      <h2 className="text-h3 mb-1">Preferred track & consent</h2>
      <p className="text-sm text-[var(--text-secondary)]">You can change this later from your profile.</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {tracks.map((t) => {
          const active = s.track === t.value;
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => setS({ ...s, track: t.value })}
              className={`text-left p-4 rounded-lg border transition-colors ${active ? 'border-[var(--expert)] bg-[var(--expert-dim)]' : 'border-[var(--border-default)] hover:border-[var(--border-bright)]'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkle size={16} weight="fill" style={{ color: active ? 'var(--expert)' : 'var(--text-tertiary)' }} />
                <span className="font-medium text-[var(--text-primary)]">{t.label}</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{t.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="space-y-3 pt-6 border-t border-[var(--border-dim)]">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={s.agreeContributor}
            onChange={(e) => setS({ ...s, agreeContributor: e.target.checked })}
            className="mt-1"
          />
          <span className="text-sm text-[var(--text-secondary)]">
            I have read and accept the{' '}
            <a className="text-[var(--expert)] underline" href="/legal/contributor-agreement" target="_blank" rel="noopener">Contributor Agreement</a>
            {' '}— I understand I am an independent contractor, paid in INR, with full IP assignment for evaluation work.
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={s.agreePrivacy}
            onChange={(e) => setS({ ...s, agreePrivacy: e.target.checked })}
            className="mt-1"
          />
          <span className="text-sm text-[var(--text-secondary)]">
            I consent to my data being processed per the{' '}
            <a className="text-[var(--expert)] underline" href="/legal/privacy" target="_blank" rel="noopener">Privacy Policy</a>
            {' '}and (for Capture work) the additional consent terms in the{' '}
            <a className="text-[var(--expert)] underline" href="/legal/dpa" target="_blank" rel="noopener">Data Processing Agreement</a>.
          </span>
        </label>
      </div>
    </div>
  );
}

function Benefit({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="surface p-6">
      <div className="w-10 h-10 rounded-lg bg-[var(--expert-dim)] flex items-center justify-center mb-4">
        <Icon size={20} weight="duotone" style={{ color: 'var(--expert)' }} />
      </div>
      <h3 className="text-h4 mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)]">{body}</p>
    </div>
  );
}
