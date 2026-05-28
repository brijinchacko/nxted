import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { safeJson } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function QualityDashboard() {
  const session = await auth();
  const client = session?.user.id
    ? await prisma.clientProfile.findUnique({
        where: { userId: session.user.id },
        include: {
          expertProjects: {
            include: { qualityReport: true },
            orderBy: { createdAt: 'asc' },
          },
        },
      })
    : null;

  const reports = client?.expertProjects.filter((p) => p.qualityReport) || [];
  const avgScore = reports.length
    ? reports.reduce((acc, p) => acc + (p.qualityReport!.overallScore || 0), 0) / reports.length
    : 0;
  const errorAgg: Record<string, number> = {};
  reports.forEach((p) => {
    const eb = safeJson(p.qualityReport!.errorBreakdown, {} as Record<string, number>);
    Object.entries(eb).forEach(([k, v]) => {
      errorAgg[k] = (errorAgg[k] || 0) + (v as number);
    });
  });
  const maxErr = Math.max(1, ...Object.values(errorAgg));

  return (
    <div className="max-w-6xl space-y-8">
      <h1 className="text-h2">Quality dashboard</h1>

      <Card>
        <CardHeader><CardTitle>Average score across all projects</CardTitle></CardHeader>
        <CardBody>
          <div className="text-[64px] font-bold text-[var(--expert)]">{avgScore.toFixed(0)}</div>
          <Progress value={avgScore} accent="expert" className="mt-3" />
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Score over time</CardTitle></CardHeader>
        <CardBody>
          {reports.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No reports yet.</p>
          ) : (
            <div className="flex items-end gap-3 h-[180px]">
              {reports.map((p) => {
                const h = ((p.qualityReport!.overallScore || 0) / 100) * 160;
                return (
                  <div key={p.id} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full bg-[var(--expert)] rounded-t" style={{ height: `${h}px` }} title={`${p.title}: ${p.qualityReport!.overallScore.toFixed(0)}`} />
                    <div className="text-[10px] text-[var(--text-muted)] truncate w-full text-center">{p.projectCode}</div>
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader><CardTitle>Error taxonomy (aggregate)</CardTitle></CardHeader>
        <CardBody>
          {Object.keys(errorAgg).length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No error data yet.</p>
          ) : (
            <ul className="space-y-3">
              {Object.entries(errorAgg).sort((a, b) => b[1] - a[1]).map(([k, v]) => (
                <li key={k}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{k.replace(/_/g, ' ').toLowerCase()}</span>
                    <span className="text-[var(--text-muted)]">{v}</span>
                  </div>
                  <Progress value={v} max={maxErr} accent="capture" />
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
