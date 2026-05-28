import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-dynamic';

export default async function AdminProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.expertProject.findUnique({
    where: { id },
    include: {
      clientProfile: { include: { user: true } },
      outputs: { include: { evaluations: true } },
      tasks: { include: { contributor: { include: { user: true } } } },
      qualityReport: true,
    },
  });
  if (!project) notFound();

  const contributors = await prisma.contributorProfile.findMany({
    where: { isVerified: true, isActive: true },
    include: { user: true },
  });

  const allEvaluated = project.outputs.every((o) => o.evaluations.length > 0) && project.outputs.length > 0;

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">{project.projectCode}</div>
        <h1 className="text-h2">{project.title}</h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
          <Badge tone="expert">{project.status.replace(/_/g, ' ')}</Badge>
          <span>{project.clientProfile.companyName}</span>
          <span>·</span>
          <span>{project.aiDomain}</span>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Assign contributors</CardTitle></CardHeader>
        <CardBody>
          <form action={`/api/admin/expert-projects/${project.id}/assign`} method="POST" className="space-y-4">
            <select name="contributorId" required className="w-full h-11 px-4 rounded-md bg-[var(--bg-input)] border border-[var(--border-default)] text-[var(--text-primary)]">
              <option value="">Select a contributor…</option>
              {contributors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.user.firstName} {c.user.lastName} · {c.expertise.slice(0, 2).join(', ')}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-3">
              <input name="payoutAmount" type="number" step="0.01" placeholder="Payout (£)" required className="w-40 h-11 px-4 rounded-md bg-[var(--bg-input)] border border-[var(--border-default)] text-[var(--text-primary)]" />
              <Button type="submit" variant="expert" size="sm">Assign</Button>
            </div>
          </form>
          {project.tasks.length > 0 && (
            <div className="mt-6">
              <div className="text-label text-[var(--text-muted)] mb-2">Assigned ({project.tasks.length})</div>
              <ul className="flex flex-wrap gap-2">
                {project.tasks.map((t) => (
                  <li key={t.id} className="px-3 py-1.5 bg-[var(--bg-card-hover)] rounded-md text-sm">
                    {t.contributor.user.firstName} {t.contributor.user.lastName} · <Badge tone={t.status === 'COMPLETED' ? 'success' : 'warning'}>{t.status}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Outputs ({project.outputs.length})</CardTitle>
            {allEvaluated && !project.qualityReport && (
              <form action={`/api/admin/expert-projects/${project.id}/generate-report`} method="POST">
                <Button type="submit" variant="expert">Generate quality report</Button>
              </form>
            )}
            {project.qualityReport && (
              <form action={`/api/admin/expert-projects/${project.id}/deliver`} method="POST">
                <Button type="submit" variant="expert">Deliver to client</Button>
              </form>
            )}
          </div>
        </CardHeader>
        <CardBody>
          <ul className="divide-y divide-[var(--border-dim)]">
            {project.outputs.map((o) => (
              <li key={o.id} className="py-3 flex items-center justify-between text-sm">
                <span className="truncate max-w-md text-[var(--text-primary)]">{o.outputIndex + 1}. {o.prompt}</span>
                <span className="text-[var(--text-muted)]">{o.evaluations.length} evaluation{o.evaluations.length === 1 ? '' : 's'}</span>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
