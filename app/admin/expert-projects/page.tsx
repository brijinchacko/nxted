import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function ExpertAdminList() {
  const projects = await prisma.expertProject.findMany({
    include: { clientProfile: true, _count: { select: { outputs: true, tasks: true } } },
    orderBy: { createdAt: 'desc' },
  }).catch(() => []);

  return (
    <div className="max-w-6xl">
      <h1 className="text-h2 mb-8">Expert projects</h1>
      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)] text-left">
            <tr>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Code</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Client</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Title</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Outputs</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Assigned</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {projects.length ? projects.map((p) => (
              <tr key={p.id} className="border-b border-[var(--border-dim)] last:border-0">
                <td className="p-4 text-[var(--text-primary)] font-mono text-xs">{p.projectCode}</td>
                <td className="p-4 text-[var(--text-secondary)]">{p.clientProfile.companyName}</td>
                <td className="p-4 text-[var(--text-primary)]">{p.title}</td>
                <td className="p-4 text-[var(--text-secondary)]">{p._count.outputs}</td>
                <td className="p-4 text-[var(--text-secondary)]">{p._count.tasks}</td>
                <td className="p-4"><Badge tone="expert">{p.status.replace(/_/g, ' ')}</Badge></td>
                <td className="p-4 text-right">
                  <Link href={`/admin/expert-projects/${p.id}`} className="text-[var(--expert)] hover:underline text-sm">Open →</Link>
                </td>
              </tr>
            )) : (<tr><td colSpan={7} className="p-8 text-center text-[var(--text-muted)]">No projects yet.</td></tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
