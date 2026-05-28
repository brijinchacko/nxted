import { notFound } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardTitle, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatGBP } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function CaptureOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const client = session?.user.id
    ? await prisma.clientProfile.findUnique({ where: { userId: session.user.id }, select: { id: true } })
    : null;
  if (!client) notFound();

  const order = await prisma.captureOrder.findFirst({ where: { id, clientProfileId: client.id } });
  if (!order) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2">{order.orderCode}</div>
        <h1 className="text-h2">{order.skillCategory} · {order.level.replace('L', '').split('_')[0]}</h1>
        <Badge tone="capture" className="mt-3">{order.status.replace(/_/g, ' ')}</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Specification</CardTitle></CardHeader>
        <CardBody>
          <dl className="grid grid-cols-2 gap-y-4 text-sm">
            <dt className="text-[var(--text-muted)]">Hours requested</dt><dd>{order.hoursRequested}</dd>
            <dt className="text-[var(--text-muted)]">Environment</dt><dd>{order.environmentType}</dd>
            <dt className="text-[var(--text-muted)]">Output format</dt><dd>{order.outputFormat}</dd>
            <dt className="text-[var(--text-muted)]">Annotation level</dt><dd>{order.annotationLevel}</dd>
            <dt className="text-[var(--text-muted)]">Depth maps</dt><dd>{order.needsDepthMap ? 'Yes' : 'No'}</dd>
            <dt className="text-[var(--text-muted)]">Pose skeleton</dt><dd>{order.needsPoseSkeleton ? 'Yes' : 'No'}</dd>
            <dt className="text-[var(--text-muted)]">Action labels</dt><dd>{order.needsActionLabels ? 'Yes' : 'No'}</dd>
          </dl>
          <div className="mt-6 pt-6 border-t border-[var(--border-dim)]">
            <div className="text-label text-[var(--text-muted)] mb-2">Task specification</div>
            <p className="text-[var(--text-primary)] whitespace-pre-line">{order.taskSpecification}</p>
          </div>
        </CardBody>
      </Card>

      {order.quotedPriceGBP && (
        <Card>
          <CardHeader><CardTitle>Quote</CardTitle></CardHeader>
          <CardBody>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[var(--text-secondary)]">Quoted price</span>
              <span className="text-h3">{formatGBP(order.quotedPriceGBP)}</span>
            </div>
            {order.status === 'QUOTED' && (
              <Button href={`/api/capture/orders/${order.id}/accept`} variant="capture" fullWidth>
                Accept quote · pay 50% deposit
              </Button>
            )}
          </CardBody>
        </Card>
      )}

      {order.deliveryUrl && (
        <Card>
          <CardHeader><CardTitle>Delivery</CardTitle></CardHeader>
          <CardBody>
            <p className="mb-3 text-[var(--text-secondary)]">Your dataset is ready.</p>
            <Button href={order.deliveryUrl} variant="expert" target="_blank" rel="noopener noreferrer">
              Download dataset →
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
