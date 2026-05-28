import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatGBP } from '@/lib/utils';

export function ExpertTaskCard({
  id,
  title,
  domain,
  outputsTotal,
  estMinutes,
  rate,
  deadline,
  status,
}: {
  id: string;
  title: string;
  domain: string;
  outputsTotal: number;
  estMinutes: number;
  rate: number;
  deadline?: Date | null;
  status: 'available' | 'in-progress';
}) {
  return (
    <Card hoverable accent="expert">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="text-label text-[var(--text-muted)] mb-1">{domain}</div>
          <h3 className="text-h4">{title}</h3>
        </div>
        <Badge tone={status === 'available' ? 'expert' : 'warning'}>
          {status === 'available' ? 'Open' : 'In progress'}
        </Badge>
      </div>
      <div className="grid grid-cols-3 gap-4 my-5 text-sm">
        <div>
          <div className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Outputs</div>
          <div className="text-[var(--text-primary)] font-medium">{outputsTotal}</div>
        </div>
        <div>
          <div className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Est. time</div>
          <div className="text-[var(--text-primary)] font-medium">~{estMinutes} min</div>
        </div>
        <div>
          <div className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-1">Rate</div>
          <div className="text-[var(--text-primary)] font-medium">{formatGBP(rate)}</div>
        </div>
      </div>
      {deadline && (
        <p className="text-xs text-[var(--text-muted)] mb-4">
          Deadline: {deadline.toLocaleDateString('en-GB')}
        </p>
      )}
      <Button href={`/me/tasks/${id}`} variant={status === 'available' ? 'expert' : 'outline'} size="sm" fullWidth>
        {status === 'available' ? 'Accept task' : 'Continue evaluating'}
      </Button>
    </Card>
  );
}
