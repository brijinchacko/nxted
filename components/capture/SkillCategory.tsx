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
    <article className="surface surface-hover p-7 flex flex-col gap-4 h-full">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-h4">{title}</h3>
        <span className="text-[10px] uppercase tracking-wider text-[var(--text-tertiary)]">{count}</span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{examples.join(' · ')}</p>
    </article>
  );
}
