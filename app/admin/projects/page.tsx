import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const TRACK_LABEL: Record<string, string> = {
  EXPERT_EVAL: 'Expert eval',
  RED_TEAM: 'Red-team',
  COMPLIANCE: 'Compliance',
  WRITTEN_EVAL: 'Written',
  CAPTURE: 'Capture',
};

const STATUS_TONE: Record<string, 'success' | 'warning' | 'danger' | 'neutral' | 'expert'> = {
  OPEN: 'expert',
  CLOSED: 'neutral',
  IN_DELIVERY: 'warning',
  COMPLETED: 'success',
  ARCHIVED: 'neutral',
};

export default async function AdminProjectsPage() {
  const projects = await prisma.marketplaceProject.findMany({
    orderBy: { createdAt: 'desc' },
    include: { applications: true },
  }).catch(() => []);

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h2">Marketplace projects</h1>
          <p className="text-[var(--text-secondary)] mt-1">Posted projects open to contributors. Contributors apply, admins approve.</p>
        </div>
        <Button href="/admin/projects/new" variant="expert">+ New project</Button>
      </div>

      <div className="surface overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card-hover)] border-b border-[var(--border-default)]">
            <tr className="text-left">
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Code</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Track</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Rate</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Apps</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Seats</th>
              <th className="px-6 py-4 text-[var(--text-tertiary)] text-xs uppercase tracking-wider">Status</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {projects.length ? projects.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border-dim)] last:border-0">
                <td className="px-6 py-4 font-mono text-xs">{p.projectCode}</td>
                <td className="px-6 py-4 text-[var(--text-primary)]">{p.title}</td>
                <td className="px-6 py-4"><Badge tone="expert">{TRACK_LABEL[p.track] || p.track}</Badge></td>
                <td className="px-6 py-4 text-[var(--text-secondary)]">{formatGBP(p.hourlyRateGBP)}/hr</td>
                <td className="px-6 py-4 text-[var(--text-secondary)]">{p.applications.length}</td>
                <td className="px-6 py-4 text-[var(--text-secondary)]">{p.seatsFilled} / {p.seatsAvailable}</td>
                <td className="px-6 py-4"><Badge tone={STATUS_TONE[p.status] || 'neutral'}>{p.status.replace(/_/g, ' ')}</Badge></td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/projects/${p.id}`} className="text-[var(--expert)] hover:underline text-sm">Manage →</Link>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={8} className="p-10 text-center text-[var(--text-tertiary)]">No projects posted yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
