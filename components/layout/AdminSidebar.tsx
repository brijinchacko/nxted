'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const SECTIONS = [
  {
    items: [{ href: '/admin/dashboard', label: 'Dashboard' }],
  },
  {
    title: 'Sales',
    items: [
      { href: '/admin/pipeline', label: 'Pipeline' },
      { href: '/admin/clients', label: 'Clients' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { href: '/admin/expert-projects', label: 'Expert Projects' },
      { href: '/admin/capture-orders', label: 'Capture Orders' },
      { href: '/admin/contributors', label: 'Contributors' },
      { href: '/admin/payouts', label: 'Payouts' },
    ],
  },
  {
    title: 'Content',
    items: [{ href: '/admin/research', label: 'Research CMS' }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[240px] shrink-0 bg-[var(--bg-surface)] border-r border-[var(--border-dim)] min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <Logo />
        <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--capture)] mt-2">Admin</div>
      </div>
      <nav className="flex-1 flex flex-col gap-5">
        {SECTIONS.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-1">
            {section.title && (
              <div className="text-label text-[var(--text-muted)] mb-2 px-3">{section.title}</div>
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
                      ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-l-2 border-[var(--capture)]'
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
