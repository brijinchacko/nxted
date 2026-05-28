import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';

interface ReportData {
  overallScore: number;
  accuracyRate: number;
  interRaterAgreement: number;
  criticalFailureCount: number;
  errorBreakdown: Record<string, number>;
  executiveSummary: string;
  keyFindings: Array<{ title: string; detail: string; severity: string }>;
  recommendations: Array<{ title: string; detail: string; priority: string }>;
  expertCredentials: Array<{ name: string; credentials: string }>;
}

function scoreTone(score: number) {
  if (score >= 85) return 'success' as const;
  if (score >= 65) return 'warning' as const;
  return 'danger' as const;
}

export function QualityReport({ data }: { data: ReportData }) {
  const errorEntries = Object.entries(data.errorBreakdown).sort((a, b) => b[1] - a[1]);
  const maxError = Math.max(1, ...errorEntries.map((e) => e[1]));

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overall Score</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="flex items-baseline gap-2">
              <span className="text-[48px] font-bold tracking-tight text-[var(--text-primary)]">
                {data.overallScore.toFixed(0)}
              </span>
              <span className="text-[var(--text-muted)]">/ 100</span>
            </div>
            <Badge tone={scoreTone(data.overallScore)} className="mt-2">
              {data.overallScore >= 85 ? 'Strong' : data.overallScore >= 65 ? 'Needs work' : 'At risk'}
            </Badge>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Accuracy</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="text-[48px] font-bold tracking-tight text-[var(--text-primary)]">
              {data.accuracyRate.toFixed(0)}%
            </div>
            <Progress value={data.accuracyRate} className="mt-2" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inter-rater agreement</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="text-[48px] font-bold tracking-tight text-[var(--text-primary)]">
              {data.interRaterAgreement.toFixed(0)}%
            </div>
            <Progress value={data.interRaterAgreement} accent="success" className="mt-2" />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Critical failures</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="text-[48px] font-bold tracking-tight text-[var(--danger)]">
              {data.criticalFailureCount}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">Severity 4–5 outputs</p>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Executive summary</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="whitespace-pre-line text-[var(--text-primary)]">{data.executiveSummary}</p>
        </CardBody>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Error breakdown</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="space-y-3">
              {errorEntries.map(([cat, count]) => (
                <li key={cat}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--text-primary)]">{cat.replace(/_/g, ' ').toLowerCase()}</span>
                    <span className="text-[var(--text-muted)]">{count}</span>
                  </div>
                  <Progress value={count} max={maxError} accent="capture" />
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expert panel</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="space-y-3">
              {data.expertCredentials.map((e, i) => (
                <li key={i} className="border-b border-[var(--border-dim)] pb-3 last:border-0">
                  <div className="text-[var(--text-primary)] font-medium">{e.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{e.credentials}</div>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key findings</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="space-y-4">
              {data.keyFindings.map((f, i) => (
                <li key={i}>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge tone={f.severity === 'high' ? 'danger' : f.severity === 'medium' ? 'warning' : 'neutral'}>
                      {f.severity}
                    </Badge>
                    <span className="font-medium text-[var(--text-primary)]">{f.title}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{f.detail}</p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="space-y-4">
              {data.recommendations.map((r, i) => (
                <li key={i}>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge tone={r.priority === 'immediate' ? 'danger' : 'expert'}>{r.priority}</Badge>
                    <span className="font-medium text-[var(--text-primary)]">{r.title}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{r.detail}</p>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
