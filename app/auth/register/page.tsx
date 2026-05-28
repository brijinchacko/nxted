'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Logo } from '@/components/layout/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      toast.success('Account created');
      router.push('/portal/dashboard');
      router.refresh();
    } catch (err) {
      toast.error((err as Error).message || 'Could not create account');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--bg-surface)]">
      <div className="mb-8">
        <Logo />
      </div>
      <form onSubmit={onSubmit} className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-8 space-y-5">
        <h1 className="text-h2 mb-2">Create your client account</h1>
        <p className="text-sm text-[var(--text-secondary)] mb-2">For contributors, <Link className="text-[var(--expert)] underline" href="/expert/apply">apply here</Link>.</p>
        <div className="grid grid-cols-2 gap-4">
          <Input name="firstName" label="First name" required />
          <Input name="lastName" label="Last name" required />
        </div>
        <Input name="email" type="email" label="Email" required autoComplete="email" />
        <Input name="password" type="password" label="Password" required minLength={8} hint="Minimum 8 characters" autoComplete="new-password" />
        <Input name="companyName" label="Company" required />
        <Button type="submit" variant="expert" fullWidth disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
        <p className="text-sm text-center text-[var(--text-secondary)]">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[var(--expert)] hover:underline">Sign in</Link>
        </p>
      </form>
    </main>
  );
}
