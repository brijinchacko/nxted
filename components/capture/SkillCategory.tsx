import { Card, CardTitle, CardBody } from '@/components/ui/Card';

export function SkillCategory({
  title,
  examples,
  count,
}: {
  title: string;
  examples: string[];
  count: string;
}) {
  return (
    <Card hoverable accent="capture">
      <div className="flex items-baseline justify-between mb-3">
        <CardTitle>{title}</CardTitle>
        <span className="text-xs text-[var(--text-muted)]">{count}</span>
      </div>
      <CardBody>
        <p>{examples.join(' · ')}</p>
      </CardBody>
    </Card>
  );
}
