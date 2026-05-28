import Link from 'next/link';
import { Logo } from './Logo';
import { COMPANY } from '@/lib/constants';

const COLUMNS = [
  {
    title: 'Products',
    links: [
      { href: '/expert', label: 'Nxted Expert' },
      { href: '/capture', label: 'Nxted Capture' },
      { href: '/capture/levels', label: '5-Level Taxonomy' },
      { href: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About OFORO LTD' },
      { href: '/contact', label: 'Contact' },
      { href: '/research', label: 'Research' },
      { href: '/how-it-works', label: 'How It Works' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/legal/terms', label: 'Terms' },
      { href: '/legal/privacy', label: 'Privacy' },
      { href: '/legal/gdpr', label: 'GDPR & Data' },
      { href: '/privacy/cookies', label: 'Cookies' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-dim)] bg-[var(--bg-surface)]">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo withParent={false} />
            <p className="text-[var(--text-secondary)] text-sm mt-4 max-w-sm">
              Human Intelligence. Machine Scale.
            </p>
            <div className="text-xs text-[var(--text-muted)] mt-6 space-y-1">
              <p>{COMPANY.name} · Company No. {COMPANY.number}</p>
              <p>{COMPANY.address}</p>
            </div>
            <div className="flex gap-2 mt-6">
              <span className="inline-flex items-center gap-1 h-6 px-2 rounded border border-[var(--border-default)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                GDPR Compliant
              </span>
              <span className="inline-flex items-center gap-1 h-6 px-2 rounded border border-[var(--border-default)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                UK Registered
              </span>
              <span className="inline-flex items-center gap-1 h-6 px-2 rounded border border-[var(--border-default)] text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                ISO 9001 ref
              </span>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-label text-[var(--text-secondary)] mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[var(--text-primary)] hover:text-[var(--expert)] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--border-dim)] flex flex-col md:flex-row gap-4 justify-between text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Made in India. Registered in the UK.</p>
        </div>
      </div>
    </footer>
  );
}
