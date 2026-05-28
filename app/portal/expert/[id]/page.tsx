import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { QualityReport } from '@/components/expert/QualityReport';
import { safeJson } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ExpertProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const client = session?.user.id
    ? await prisma.clientProfile.findUnique({ where: { userId: session.user.id }, select: { id: true } })
    : null;
  if (!client) notFound();

  const project = await prisma.expertProject.findFirst({
    where: { id, clientProfileId: client.id },
    include: {
      outputs: { include: { evaluations: true } },
      qualityReport: true,
      tasks: { include: { contributor: { include: { user: true } } } },
    },
  });
  if (!project) notFound();

  const evaluated = project.outputs.filter((o) => o.evaluations.length > 0).length;

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">{project.projectCode}</div>
        <h1 className="text-h2">{project.title}</h1>
        <div className="mt-3 flex items-center gap-3">
          <Badge tone="expert">{project.status.replace(/_/g, ' ')}</Badge>
          <span className="text-sm text-[var(--text-muted)]">{project.aiDomain}</span>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Brief</CardTitle></CardHeader>
        <CardBody>
          <dl className="space-y-4">
            <div>
              <dt className="text-label text-[var(--text-muted)] mb-1">AI use case</dt>
              <dd className="text-[var(--text-primary)]">{project.aiUseCase}</dd>
            </div>
            <div>
              <dt className="text-label text-[var(--text-muted)] mb-1">What "correct" means</dt>
              <dd className="text-[var(--text-primary)]">{project.whatCorrectMeans}</dd>
            </div>
          </dl>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Evaluation progress</CardTitle>
            <span className="text-sm text-[var(--text-secondary)]">{evaluated} / {project.outputs.length} evaluated</span>
          </div>
        </CardHeader>
        <CardBody>
          <Progress value={evaluated} max={project.outputs.length || 1} />
          {project.tasks.length > 0 && (
            <div className="mt-6">
              <div className="text-label text-[var(--text-muted)] mb-3">Contributors</div>
              <ul className="flex flex-wrap gap-2">
                {project.tasks.map((t) => (
                  <li key={t.id} className="px-3 py-1.5 bg-[var(--bg-card-hover)] rounded-md text-sm">
                    {t.contributor.user.firstName} {t.contributor.user.lastName.charAt(0)}.
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardBody>
      </Card>

      {project.qualityReport ? (
        <QualityReport
          data={{
            overallScore: project.qualityReport.overallScore,
            accuracyRate: project.qualityReport.accuracyRate,
            interRaterAgreement: project.qualityReport.interRaterAgreement,
            criticalFailureCount: project.qualityReport.criticalFailureCount,
            errorBreakdown: safeJson(project.qualityReport.errorBreakdown, {} as Record<string, number>),
            executiveSummary: project.qualityReport.executiveSummary,
            keyFindings: safeJson(project.qualityReport.keyFindings, [] as Array<{ title: string; detail: string; severity: string }>),
            recommendations: safeJson(project.qualityReport.recommendations, [] as Array<{ title: string; detail: string; priority: string }>),
            expertCredentials: safeJson(project.qualityReport.expertCredentials, [] as Array<{ name: string; credentials: string }>),
          }}
        />
      ) : (
        <Card>
          <CardBody>
            <p className="text-[var(--text-secondary)]">
              Quality report will appear here once all evaluations are complete and reviewed by admin.
            </p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
