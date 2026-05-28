import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function ExpertProjectsList() {
  const session = await auth();
  const client = session?.user.id
    ? await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
        include: {
          expertProjects: {
            orderBy: { createdAt: 'desc' },
            include: { qualityReport: true, _count: { select: { outputs: true } } },
          },
        },
      })
    : null;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-h2">Expert projects</h1>
        <Button href="/portal/expert/new" variant="expert">+ New project</Button>
      </div>

      <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--bg-card)] border-b border-[var(--border-default)]">
            <tr className="text-left">
              <th className="p-4 font-medium text-[var(--text-secondary)]">Project</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Outputs</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Status</th>
              <th className="p-4 font-medium text-[var(--text-secondary)]">Score</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {client?.expertProjects.length ? (
              client.expertProjects.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border-dim)] last:border-0">
                  <td className="p-4">
                    <div className="text-[var(--text-primary)] font-medium">{p.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{p.projectCode} · {p.aiDomain}</div>
                  </td>
                  <td className="p-4 text-[var(--text-secondary)]">{p._count.outputs}</td>
                  <td className="p-4"><Badge tone="expert">{p.status.replace(/_/g, ' ')}</Badge></td>
                  <td className="p-4">{p.qualityReport ? `${p.qualityReport.overallScore.toFixed(0)} / 100` : '—'}</td>
                  <td className="p-4 text-right">
                    <Link href={`/portal/expert/${p.id}`} className="text-[var(--expert)] hover:underline text-sm">Open →</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">No projects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
