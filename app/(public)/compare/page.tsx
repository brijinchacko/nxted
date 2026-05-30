import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { Badge } from '@/components/ui/Badge';

export const metadata = pageMeta({
  title: 'Compare Physical-AI Data Providers | nxted',
  description: 'Neutral comparisons to help you choose a physical-AI and robotics data provider.',
  path: '/compare',
  keywords: ['compare robotics data providers', 'egocentric data providers'],
});

const COMPARISONS = [
  {
    href: '/compare/egocentric-data-providers',
    title: 'Egocentric Data Providers for Robotics, Compared',
    desc: 'The four categories of provider - annotation vendors, expert-evaluation networks, gig-scale collectors and specialist capture - and how to choose.',
  },
];

export default function CompareIndexPage() {
  return (
    <section className="page-pad">
      <div className="container-site max-w-4xl">
        <div className="mb-12">
          <div className="text-label mb-4">Compare</div>
          <h1 className="text-h1">Comparisons</h1>
          <p className="text-body text-[var(--text-secondary)] mt-5 max-w-[60ch]">
            Neutral, honest comparisons for buyers evaluating physical-AI data providers. See also our{' '}
            <Link href="/alternatives" className="text-[var(--expert)] underline">alternatives</Link> pages.
          </p>
        </div>
        <div className="space-y-4">
          {COMPARISONS.map((c) => (
            <Link key={c.href} href={c.href} className="surface surface-hover p-6 block">
              <Badge tone="expert">Comparison</Badge>
              <h2 className="text-h4 mt-3">{c.title}</h2>
              <p className="text-sm text-[var(--text-secondary)] mt-2">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
