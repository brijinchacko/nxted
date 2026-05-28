import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Cookie policy' };

export default function CookiesPage() {
  return (
    <section className="pt-[140px] pb-[120px]">
      <div className="container-site max-w-3xl prose-content text-[var(--text-secondary)] space-y-5">
        <div className="text-label text-[var(--text-secondary)] mb-4">Legal</div>
        <h1 className="text-h1 text-[var(--text-primary)]">Cookie policy</h1>
        <p>nxted.ai uses three categories of cookies.</p>
        <h2 className="text-h3 text-[var(--text-primary)] pt-4">Essential</h2>
        <p>Required for authentication, session continuity, and security. These cannot be disabled.</p>
        <h2 className="text-h3 text-[var(--text-primary)] pt-4">Analytics</h2>
        <p>Used to understand how visitors use the site (Google Analytics). Disabled until you opt in.</p>
        <h2 className="text-h3 text-[var(--text-primary)] pt-4">Marketing</h2>
        <p>We do not currently use marketing cookies. If we add any, we will update this page and re-prompt for consent.</p>
        <p className="pt-6 text-sm text-[var(--text-muted)]">Last updated: {new Date().toLocaleDateString('en-GB', { dateStyle: 'long' })}</p>
      </div>
    </section>
  );
}
