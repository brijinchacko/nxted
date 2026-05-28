'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const ITEMS = [
  { href: '/me/dashboard', label: 'Dashboard' },
  { href: '/me/tasks', label: 'Tasks' },
  { href: '/me/earnings', label: 'Earnings' },
  { href: '/me/profile', label: 'Profile' },
];

export function ContributorSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[240px] shrink-0 bg-[var(--bg-surface)] border-r border-[var(--border-dim)] min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <Logo />
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'px-3 py-2 rounded-md text-sm transition-colors',
                active
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-l-2 border-[var(--expert)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]',
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="mt-6 text-left text-sm text-[var(--text-secondary)] hover:text-[var(--danger)] px-3 py-2 transition-colors"
      >
        Sign out
      </button>
    </aside>
  );
}
