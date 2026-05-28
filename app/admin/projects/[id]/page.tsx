import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.marketplaceProject.findUnique({
    where: { id },
    include: {
      applications: {
        include: { contributor: { include: { user: true } } },
        orderBy: { appliedAt: 'desc' },
      },
      assignedTo: { include: { user: true } },
    },
  });
  if (!project) notFound();

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <div className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider mb-2">{project.projectCode}</div>
        <h1 className="text-h2">{project.title}</h1>
        <div className="mt-3 flex items-center gap-3">
          <Badge tone="expert">{project.track.replace(/_/g, ' ')}</Badge>
          <Badge tone={project.status === 'OPEN' ? 'expert' : 'neutral'}>{project.status.replace(/_/g, ' ')}</Badge>
          <span className="text-sm text-[var(--text-tertiary)]">{formatGBP(project.hourlyRateGBP)} / hr · {project.estimatedHours}h</span>
        </div>
      </div>

      <section className="surface p-7">
        <h2 className="text-label mb-3">Summary</h2>
        <p className="text-[var(--text-primary)] whitespace-pre-line mb-5">{project.summary}</p>
        <h2 className="text-label mb-3">Scope</h2>
        <p className="text-[var(--text-secondary)] whitespace-pre-line">{project.scopeDetails}</p>
      </section>

      <section className="surface p-7">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-h4">Applications ({project.applications.length})</h2>
          <span className="text-sm text-[var(--text-tertiary)]">{project.seatsFilled} / {project.seatsAvailable} seats filled</span>
        </div>
        {project.applications.length === 0 ? (
          <p className="text-sm text-[var(--text-tertiary)]">No applications yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--border-dim)]">
              <tr className="text-left">
                <th className="py-3 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Contributor</th>
                <th className="py-3 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Expertise</th>
                <th className="py-3 text-xs uppercase tracking-wider text-[var(--text-tertiary)]">Status</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {project.applications.map((a) => (
                <tr key={a.id} className="border-b border-[var(--border-dim)] last:border-0">
                  <td className="py-3">
                    <div className="text-[var(--text-primary)] font-medium">{a.contributor.user.firstName} {a.contributor.user.lastName}</div>
                    <div className="text-xs text-[var(--text-tertiary)]">{a.contributor.user.email}</div>
                  </td>
                  <td className="py-3 text-[var(--text-secondary)]">{a.contributor.expertise.slice(0, 2).join(' · ') || '—'}</td>
                  <td className="py-3"><Badge tone={
                    a.status === 'OFFER_SENT' ? 'expert'
                    : a.status === 'OFFER_ACCEPTED' ? 'success'
                    : a.status === 'REJECTED' || a.status === 'OFFER_DECLINED' ? 'danger'
                    : 'warning'
                  }>{a.status.replace(/_/g, ' ')}</Badge></td>
                  <td className="py-3 text-right">
                    {a.status === 'APPLIED' && (
                      <div className="inline-flex gap-2">
                        <form action={`/api/admin/projects/${project.id}/applications/${a.id}/offer`} method="POST">
                          <Button type="submit" size="sm" variant="expert">Send offer</Button>
                        </form>
                        <form action={`/api/admin/projects/${project.id}/applications/${a.id}/reject`} method="POST">
                          <Button type="submit" size="sm" variant="outline">Reject</Button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
