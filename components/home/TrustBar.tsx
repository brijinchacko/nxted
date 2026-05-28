import { FadeUp } from '@/components/motion/FadeUp';

const ROWS = [
  ['Text RLHF + Physical AI in one platform', 'Zero competitors', '✓ Both in one'],
  ['India quality concentration', 'Global spread (Mercor, Scale)', '✓ India-first supply'],
  ['Self-serve entry', 'Surge: referral-only · Scale: $500K+ min', '✓ Free Test Kit + self-serve'],
  ['Transparent quality metrics', 'Black box (Mercor)', '✓ Live quality dashboard'],
  ['UK/EU registered entity', 'All US-based', '✓ OFORO LTD, Milton Keynes'],
  ['No Meta conflict', 'Scale: 49% owned by Meta', '✓ Independent, neutral'],
  ['Physical AI from India', 'Claru: US-based, 10× cost', '✓ India-based, 90% cheaper'],
  ['5-level skill taxonomy', 'No platform classifies this way', '✓ Level 1–5 complexity system'],
];

export function TrustBar() {
  return (
    <section className="section-pad bg-[var(--bg-surface)] border-y border-[var(--border-dim)]">
      <div className="container-site">
        <FadeUp className="mb-12 max-w-3xl">
          <div className="text-label text-[var(--text-secondary)] mb-4">Why Nxted wins</div>
          <h2 className="text-h2">
            Eight differences that <span className="text-[var(--expert)]">cannot be matched</span> by any single competitor.
          </h2>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="border border-[var(--border-default)] rounded-[12px] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg-card)] border-b border-[var(--border-default)]">
                  <th className="text-left p-4 font-medium text-[var(--text-secondary)]">What clients need</th>
                  <th className="text-left p-4 font-medium text-[var(--text-secondary)] hidden md:table-cell">All competitors</th>
                  <th className="text-left p-4 font-medium text-[var(--expert)]">nxted.ai</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--border-dim)] last:border-0">
                    <td className="p-4 text-[var(--text-primary)]">{row[0]}</td>
                    <td className="p-4 text-[var(--text-muted)] hidden md:table-cell">{row[1]}</td>
                    <td className="p-4 text-[var(--text-primary)] font-medium">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
