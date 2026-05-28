'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Logo } from '@/components/layout/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

function LoginInner() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get('callbackUrl') || '/portal/dashboard';
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    const res = await signIn('credentials', {
      email: fd.get('email'),
      password: fd.get('password'),
      redirect: false,
    });
    setSubmitting(false);
    if (res?.error) {
      toast.error('Wrong email or password');
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-8 space-y-5">
      <h1 className="text-h2 mb-2">Sign in</h1>
      <p className="text-sm text-[var(--text-secondary)] mb-2">Access your portal.</p>
      <Input name="email" type="email" label="Email" required autoComplete="email" />
      <Input name="password" type="password" label="Password" required autoComplete="current-password" />
      <Button type="submit" variant="expert" fullWidth disabled={submitting}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </Button>
      <p className="text-sm text-center text-[var(--text-secondary)]">
        New here?{' '}
        <Link href="/auth/register" className="text-[var(--expert)] hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[var(--bg-surface)]">
      <div className="mb-8">
        <Logo />
      </div>
      <Suspense fallback={<div className="text-[var(--text-secondary)]">Loading…</div>}>
        <LoginInner />
      </Suspense>
    </main>
  );
}
