import { FadeUp } from '@/components/motion/FadeUp';

const ROWS = [
  ['Text RLHF + Physical AI in one platform', 'Zero competitors', '✓ Both in one'],
  ['India quality concentration', 'Global spread (Mercor, Scale)', '✓ India-first supply'],
  ['Self-serve entry', 'Surge: referral-only · Scale: $500K+ min', '✓ Free Test Kit + self-serve'],
  ['Transparent quality metrics', 'Black box (Mercor)', '✓ Live quality dashboard'],
  ['UK/EU registered entity', 'All US-based', '✓ OFORO LTD, Milton Keynes'],
  ['No Meta conflict', 'Scale: 49% owned by Meta', '✓ Independent, neutral'],
  ['Physical AI from India', 'Claru: US-based, 10× cost', '✓ India-based, 90% cheaper'],
  ['5-level skill taxonomy', 'No platform classifies this way', '✓ Level 1-5 complexity system'],
];

export function TrustBar() {
  return (
    <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
      <div className="container-site">
        <FadeUp className="mb-12 max-w-3xl">
          <div className="text-label mb-5">Why Nxted wins</div>
          <h2 className="text-h2">
            Eight differences that <span className="text-[var(--expert)]">cannot be matched</span> by any single competitor.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="surface overflow-hidden">
            <div className="hidden md:grid grid-cols-[1.2fr_1.5fr_1.3fr] border-b border-[var(--border-default)] bg-[var(--bg-card-hover)]">
              <Th>What clients need</Th>
              <Th>All competitors</Th>
              <Th accent>nxted.ai</Th>
            </div>
            <ul className="divide-y divide-[var(--border-dim)]">
              {ROWS.map((row, i) => (
                <li key={i} className="grid md:grid-cols-[1.2fr_1.5fr_1.3fr] gap-2 md:gap-0 px-5 md:px-0 py-4 md:py-0">
                  <Cell className="md:py-5 md:px-6 text-[var(--text-primary)] font-medium">{row[0]}</Cell>
                  <Cell className="md:py-5 md:px-6 text-[var(--text-tertiary)]">{row[1]}</Cell>
                  <Cell className="md:py-5 md:px-6 text-[var(--text-primary)] font-medium">{row[2]}</Cell>
                </li>
              ))}
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function Th({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div className={`py-4 px-6 text-[11px] tracking-[0.14em] uppercase ${accent ? 'text-[var(--expert)]' : 'text-[var(--text-tertiary)]'}`}>
      {children}
    </div>
  );
}

function Cell({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-sm ${className}`}>{children}</div>;
}
