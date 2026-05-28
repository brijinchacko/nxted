import Link from 'next/link';
import { COMPANY } from '@/lib/constants';

const NAV = [
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/cookies', label: 'Cookie Policy' },
  { href: '/legal/dpa', label: 'Data Processing Agreement' },
  { href: '/legal/aup', label: 'Acceptable Use Policy' },
  { href: '/legal/contributor-agreement', label: 'Contributor Agreement' },
  { href: '/legal/refund', label: 'Refund & Cancellation' },
  { href: '/legal/ai-act', label: 'EU AI Act Position' },
  { href: '/legal/accessibility', label: 'Accessibility' },
  { href: '/legal/dmca', label: 'DMCA' },
  { href: '/legal/modern-slavery', label: 'Modern Slavery Statement' },
  { href: '/legal/bribery', label: 'Anti-Bribery Policy' },
  { href: '/legal/security', label: 'Security Whitepaper' },
  { href: '/legal/whistleblowing', label: 'Whistleblowing Policy' },
];

export function LegalShell({
  title,
  intro,
  effectiveDate,
  children,
  currentSlug,
}: {
  title: string;
  intro?: string;
  effectiveDate: string;
  children: React.ReactNode;
  currentSlug: string;
}) {
  return (
    <section className="page-pad">
      <div className="container-site grid lg:grid-cols-12 gap-12 max-w-6xl">
        <aside className="lg:col-span-3 lg:sticky lg:top-28 self-start">
          <div className="text-label mb-5">Legal</div>
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-sm rounded px-3 py-2 transition-colors ${
                    item.href === `/legal/${currentSlug}`
                      ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border-l-2 border-[var(--expert)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <article className="lg:col-span-9 max-w-3xl">
          <h1 className="text-h1 mb-4">{title}</h1>
          {intro && <p className="text-body text-[var(--text-secondary)] mb-6 max-w-[60ch]">{intro}</p>}
          <div className="text-xs text-[var(--text-tertiary)] tracking-wider uppercase mb-10">
            Effective {effectiveDate} · {COMPANY.name} · Company No. {COMPANY.number}
          </div>
          <div className="legal-prose text-[var(--text-secondary)] leading-relaxed space-y-6">
            {children}
          </div>
          <div className="mt-16 pt-8 border-t border-[var(--border-dim)] text-xs text-[var(--text-tertiary)]">
            <p>
              {COMPANY.name} · Registered in England & Wales · Company No. {COMPANY.number} · {COMPANY.address}
            </p>
            <p className="mt-2">
              Questions: <a href="mailto:legal@nxted.ai" className="text-[var(--expert)] underline">legal@nxted.ai</a> · DPO: <a href="mailto:dpo@nxted.ai" className="text-[var(--expert)] underline">dpo@nxted.ai</a>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-h3 text-[var(--text-primary)] mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

export function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="text-h4 text-[var(--text-primary)] mb-2">{title}</h3>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
