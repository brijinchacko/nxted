/**
 * A question-style heading with a self-contained 40-60 word answer directly
 * beneath it - the unit AI answer engines lift verbatim. Place near the top of
 * a page or section. Renders an <h2> so it sits in the heading outline.
 */
export function DirectAnswer({
  question,
  children,
  accent = 'expert',
}: {
  question: string;
  children: React.ReactNode;
  accent?: 'expert' | 'capture';
}) {
  const accentVar = accent === 'capture' ? 'var(--capture)' : 'var(--expert)';
  return (
    <div
      className="surface p-6 md:p-7 border-l-2"
      style={{ borderLeftColor: accentVar }}
    >
      <h2 className="text-h4 mb-3">{question}</h2>
      <p className="text-body text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}
