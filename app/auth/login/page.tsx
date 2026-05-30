'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { Logo } from '@/components/layout/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const SHOW_DEMO = process.env.NEXT_PUBLIC_SHOW_DEMO_LOGINS !== 'false';

const DEMO_ACCOUNTS = [
  { role: 'Super Admin', email: 'admin@nxted.ai', password: 'Admin@NXTED2026!', dest: '/admin/dashboard', color: 'var(--capture)' },
  { role: 'Client', email: 'client@example.co.uk', password: 'Client@2026!', dest: '/portal/dashboard', color: 'var(--expert)' },
  { role: 'Contributor', email: 'priya.rao@example.com', password: 'Contributor@2026!', dest: '/me/dashboard', color: 'var(--expert)' },
];

function LoginInner() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get('callbackUrl') || '/portal/dashboard';
  const [submitting, setSubmitting] = useState(false);
  const [demoLoading, setDemoLoading] = useState<string | null>(null);

  async function doLogin(email: string, password: string, dest: string): Promise<boolean> {
    const res = await signIn('credentials', { email, password, redirect: false });
    if (res?.error) {
      toast.error('Wrong email or password');
      return false;
    }
    router.push(dest);
    router.refresh();
    return true;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    await doLogin(String(fd.get('email') || ''), String(fd.get('password') || ''), callbackUrl);
    setSubmitting(false);
  }

  async function onDemo(acc: (typeof DEMO_ACCOUNTS)[number]) {
    setDemoLoading(acc.role);
    const ok = await doLogin(acc.email, acc.password, acc.dest);
    if (!ok) setDemoLoading(null);
  }

  return (
    <div className="w-full max-w-md space-y-4">
      <form onSubmit={onSubmit} className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-8 space-y-5">
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

      {SHOW_DEMO && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-[12px] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-label text-[var(--text-tertiary)]">Demo logins</span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">one click</span>
          </div>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.role}
                type="button"
                onClick={() => onDemo(acc)}
                disabled={!!demoLoading}
                className="w-full flex items-center justify-between rounded-lg border border-[var(--border-default)] px-3.5 py-2.5 text-left transition hover:border-[var(--text-tertiary)] disabled:opacity-50"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-semibold" style={{ color: acc.color }}>{acc.role}</span>
                  <span className="block text-xs text-[var(--text-tertiary)] truncate">{acc.email}</span>
                </span>
                <span className="text-xs text-[var(--text-secondary)] shrink-0">
                  {demoLoading === acc.role ? 'Signing in…' : 'Enter →'}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-[var(--text-tertiary)] mt-3">
            For evaluation. The Super Admin account can see full site metrics and customer data.
          </p>
        </div>
      )}
    </div>
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
