import type { DailyPoint } from '@/lib/analytics';

type Accent = 'expert' | 'capture' | 'neutral';
const accentVar = (a: Accent) =>
  a === 'capture' ? 'var(--capture)' : a === 'neutral' ? 'var(--text-primary)' : 'var(--expert)';

export function Kpi({
  label,
  value,
  sub,
  trend,
  accent = 'expert',
}: {
  label: string;
  value: string;
  sub?: string;
  trend?: number | null;
  accent?: Accent;
}) {
  const up = (trend ?? 0) >= 0;
  return (
    <div className="surface p-5 h-full">
      <div className="text-label text-[var(--text-tertiary)] mb-2">{label}</div>
      <div className="text-h2 leading-none" style={{ color: accentVar(accent) }}>
        {value}
      </div>
      <div className="flex items-center gap-2 mt-2 text-xs min-h-[18px]">
        {trend != null && (
          <span style={{ color: up ? '#34D399' : '#F87171' }}>
            {up ? '▲' : '▼'} {Math.abs(trend)}%
          </span>
        )}
        {sub && <span className="text-[var(--text-tertiary)]">{sub}</span>}
      </div>
    </div>
  );
}

/** Responsive SVG area chart of daily page views (+ visitors line). */
export function TrafficChart({ daily }: { daily: DailyPoint[] }) {
  const W = 720;
  const H = 170;
  const pad = 6;
  const n = Math.max(1, daily.length);
  const max = Math.max(1, ...daily.map((d) => d.views));
  const bw = (W - pad * 2) / n;

  const coords = daily.map((d, i) => {
    const x = pad + i * bw + bw / 2;
    const y = H - pad - (d.views / max) * (H - pad * 2);
    return [x, y] as const;
  });
  const visCoords = daily.map((d, i) => {
    const x = pad + i * bw + bw / 2;
    const y = H - pad - (d.visitors / max) * (H - pad * 2);
    return [x, y] as const;
  });
  const toPath = (c: readonly (readonly [number, number])[]) =>
    c.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const line = toPath(coords);
  const area = coords.length
    ? `${line} L${(pad + (n - 1) * bw + bw / 2).toFixed(1)},${H - pad} L${(pad + bw / 2).toFixed(1)},${H - pad} Z`
    : '';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 'auto', display: 'block' }} role="img" aria-label="Daily page views over time">
      <defs>
        <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--expert)" stopOpacity="0.30" />
          <stop offset="100%" stopColor="var(--expert)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {area && <path d={area} fill="url(#trafficGrad)" />}
      {line && <path d={line} fill="none" stroke="var(--expert)" strokeWidth="2" strokeLinejoin="round" />}
      {visCoords.length > 0 && (
        <path d={toPath(visCoords)} fill="none" stroke="var(--capture)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
      )}
    </svg>
  );
}

export function BarList({
  items,
  total,
  accent = 'expert',
  mode = 'count',
}: {
  items: { label: string; value: number }[];
  total: number;
  accent?: Accent;
  mode?: 'count' | 'pct';
}) {
  const color = accentVar(accent);
  const max = Math.max(1, ...items.map((i) => i.value));
  if (items.length === 0) return <p className="text-sm text-[var(--text-tertiary)]">No data yet.</p>;
  return (
    <div className="space-y-3">
      {items.map((it) => (
        <div key={it.label}>
          <div className="flex justify-between text-sm mb-1 gap-3">
            <span className="text-[var(--text-secondary)] truncate">{it.label}</span>
            <span className="text-[var(--text-primary)] tabular-nums shrink-0">
              {mode === 'pct'
                ? `${Math.round((it.value / Math.max(1, total)) * 100)}%`
                : it.value.toLocaleString()}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--bg-base)] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(it.value / max) * 100}%`, background: color }} />
          </div>
        </div>
      ))}
    </div>
  );
}
