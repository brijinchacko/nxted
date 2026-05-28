'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const SECTIONS = [
  {
    title: null,
    items: [{ href: '/portal/dashboard', label: 'Dashboard' }],
  },
  {
    title: 'Expert',
    items: [
      { href: '/portal/expert/projects', label: 'Projects' },
      { href: '/portal/expert/new', label: 'New Project' },
      { href: '/portal/quality', label: 'Quality Dashboard' },
    ],
  },
  {
    title: 'Capture',
    items: [
      { href: '/portal/capture/orders', label: 'Dataset Orders' },
      { href: '/portal/capture/new', label: 'Request Capture' },
    ],
  },
  {
    title: 'Account',
    items: [
      { href: '/portal/messages', label: 'Messages' },
      { href: '/portal/invoices', label: 'Invoices' },
      { href: '/portal/settings', label: 'Settings' },
    ],
  },
];

export function PortalSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[240px] shrink-0 bg-[var(--bg-surface)] border-r border-[var(--border-dim)] min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <Logo />
      </div>
      <nav className="flex-1 flex flex-col gap-6">
        {SECTIONS.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            {section.title && (
              <div className="text-label text-[var(--text-muted)] mb-2 px-3">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
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
          </div>
        ))}
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
