import { prisma } from '@/lib/prisma';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const STAGES = ['LEAD', 'CONTACTED', 'CALL_BOOKED', 'PROPOSAL', 'PILOT', 'ACTIVE', 'CHURNED'] as const;

export const dynamic = 'force-dynamic';

export default async function PipelinePage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => []);
  const byStage = STAGES.reduce<Record<string, typeof leads>>((acc, s) => {
    acc[s] = leads.filter((l) => l.stage === s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h1 className="text-h2">Pipeline</h1>
      <div className="grid grid-cols-7 gap-3 overflow-x-auto min-w-[1200px]">
        {STAGES.map((stage) => (
          <div key={stage}>
            <div className="text-label text-[var(--text-secondary)] mb-3 px-1">
              {stage.replace(/_/g, ' ')} <span className="text-[var(--text-muted)]">· {byStage[stage].length}</span>
            </div>
            <div className="space-y-2">
              {byStage[stage].map((lead) => (
                <Card key={lead.id} className="p-3">
                  <CardBody className="!text-sm">
                    <div className="text-[var(--text-primary)] font-medium">{lead.companyName}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">{lead.contactName}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge tone={lead.productInterest === 'EXPERT' ? 'expert' : 'capture'}>
                        {lead.productInterest}
                      </Badge>
                      {lead.estimatedValue && (
                        <span className="text-xs text-[var(--text-muted)]">£{Math.round(lead.estimatedValue / 1000)}k</span>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
