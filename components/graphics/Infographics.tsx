/* Schematic infographics in the nxted palette.
   Teal = Expert (#5CE1E6), Amber = Capture (#FF8C42), saffron = India.
   All decorative (aria-hidden), responsive (viewBox + 100% sizing). */

const TEAL = '#5CE1E6';
const AMBER = '#FF8C42';
const SAFFRON = '#FF9933';
const GRID = 'rgba(255,255,255,0.06)';
const DIM = '#2A2A34';
const FAINT = '#3E3E4C';

function Frame({ children, vb }: { children: React.ReactNode; vb: string }) {
  return (
    <svg
      viewBox={vb}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {children}
    </svg>
  );
}

function Dots({ from, to, color, n = 4 }: { from: [number, number]; to: [number, number]; color: string; n?: number }) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 1) / (n + 1);
    out.push(
      <circle key={i} cx={from[0] + (to[0] - from[0]) * t} cy={from[1] + (to[1] - from[1]) * t} r="2" fill={color} opacity={0.5} />,
    );
  }
  return <>{out}</>;
}

/* ─── Home hero: dual pipeline (Expert teal / Capture amber) ─────────── */
export function DualPipelineGraphic() {
  return (
    <Frame vb="0 0 440 540">
      {/* bg grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="540" stroke={GRID} />
      ))}
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 55} x2="440" y2={i * 55} stroke={GRID} />
      ))}

      {/* ── EXPERT zone (top) ── */}
      <text x="32" y="44" fill={TEAL} fontSize="12" letterSpacing="3" fontFamily="monospace">EXPERT</text>
      {/* prompt card */}
      <rect x="32" y="60" width="120" height="56" rx="10" fill="#0D1A1A" stroke={DIM} />
      <line x1="48" y1="80" x2="124" y2="80" stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="92" x2="108" y2="92" stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="104" x2="120" y2="104" stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
      {/* flow to reviewers */}
      <line x1="152" y1="88" x2="214" y2="88" stroke={TEAL} strokeWidth="1.5" opacity="0.4" />
      <Dots from={[152, 88]} to={[214, 88]} color={TEAL} n={3} />
      {/* reviewer nodes */}
      {[64, 104, 144].map((y, i) => (
        <g key={i}>
          <line x1="214" y1="88" x2="248" y2={y + 12} stroke={TEAL} strokeWidth="1.5" opacity="0.35" />
          <circle cx="262" cy={y + 12} r="13" fill="#0D1A1A" stroke={TEAL} strokeWidth="1.5" />
          <circle cx="262" cy={y + 7} r="3.5" fill={TEAL} />
          <path d={`M255 ${y + 20} a7 7 0 0 1 14 0`} fill={TEAL} />
        </g>
      ))}
      {/* score donut */}
      <line x1="288" y1="116" x2="338" y2="116" stroke={TEAL} strokeWidth="1.5" opacity="0.4" />
      <circle cx="372" cy="116" r="34" stroke={DIM} strokeWidth="7" />
      <circle cx="372" cy="116" r="34" stroke={TEAL} strokeWidth="7" strokeLinecap="round"
        strokeDasharray="156 214" transform="rotate(-90 372 116)" />
      <text x="372" y="121" fill="#F5F5F7" fontSize="22" fontWeight="700" textAnchor="middle" fontFamily="monospace">73</text>

      {/* divider */}
      <line x1="32" y1="270" x2="408" y2="270" stroke={DIM} />
      <text x="220" y="266" fill="#6E6E80" fontSize="10" letterSpacing="4" textAnchor="middle" fontFamily="monospace">EXPERT · CAPTURE</text>

      {/* ── CAPTURE zone (bottom) ── */}
      <text x="32" y="318" fill={AMBER} fontSize="12" letterSpacing="3" fontFamily="monospace">CAPTURE</text>
      {/* head + camera cone */}
      <circle cx="84" cy="396" r="34" fill="#1A100A" stroke={AMBER} strokeWidth="1.5" />
      <circle cx="84" cy="396" r="10" fill="none" stroke={AMBER} strokeWidth="2" />
      <circle cx="84" cy="396" r="3.5" fill={AMBER} />
      <path d="M114 380 L188 352 L188 440 L114 412 Z" fill={AMBER} fillOpacity="0.08" stroke={AMBER} strokeWidth="1" strokeOpacity="0.3" />
      {/* frames streaming */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={206 + i * 26} y={372 + i * 6} width="36" height="48" rx="6" fill="#1A100A" stroke={AMBER} strokeWidth="1.5" opacity={1 - i * 0.22} />
      ))}
      {/* dataset stack */}
      <line x1="300" y1="396" x2="338" y2="396" stroke={AMBER} strokeWidth="1.5" opacity="0.4" />
      <g stroke={AMBER} strokeWidth="1.5" fill="#1A100A">
        <ellipse cx="378" cy="372" rx="30" ry="9" />
        <path d="M348 372 V416 a30 9 0 0 0 60 0 V372" fill="#1A100A" />
        <ellipse cx="378" cy="394" rx="30" ry="9" opacity="0.6" />
      </g>

      {/* modality tags */}
      {[['RGB', 150], ['DEPTH', 230], ['POSE', 320]].map(([t, x]) => (
        <g key={t as string}>
          <circle cx={x as number} cy="482" r="3" fill={AMBER} />
          <text x={(x as number) + 10} y="486" fill="#8A8A9A" fontSize="11" fontFamily="monospace">{t}</text>
        </g>
      ))}
    </Frame>
  );
}

/* ─── Capture hero: egocentric capture ───────────────────────────────── */
export function EgocentricGraphic() {
  return (
    <Frame vb="0 0 460 560">
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="560" stroke={GRID} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="460" y2={i * 50} stroke={GRID} />
      ))}

      <text x="40" y="60" fill={AMBER} fontSize="13" letterSpacing="3" fontFamily="monospace">EGOCENTRIC CAPTURE</text>

      {/* head profile */}
      <circle cx="130" cy="220" r="74" fill="#1A100A" stroke={AMBER} strokeWidth="2" />
      <circle cx="130" cy="220" r="74" stroke={AMBER} strokeWidth="1" opacity="0.25" />
      {/* camera (eye) */}
      <circle cx="150" cy="200" r="20" fill="#0B0B0C" stroke={TEAL} strokeWidth="2" />
      <circle cx="150" cy="200" r="8" fill="none" stroke={TEAL} strokeWidth="2.5" />
      <circle cx="150" cy="200" r="3" fill={TEAL} />
      {/* FOV cone */}
      <path d="M168 188 L360 120 L360 300 L168 214 Z" fill={AMBER} opacity="0.08" />
      <line x1="168" y1="188" x2="360" y2="120" stroke={AMBER} strokeWidth="1.5" opacity="0.5" />
      <line x1="168" y1="214" x2="360" y2="300" stroke={AMBER} strokeWidth="1.5" opacity="0.5" />

      {/* captured frames */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={300} y={140 + i * 60} width="100" height="56" rx="8" fill="#16161D" stroke={i === 0 ? AMBER : DIM} strokeWidth="1.5" />
          <circle cx={320} cy={160 + i * 60} r="6" fill={AMBER} opacity={0.7 - i * 0.2} />
          <line x1="334" y1={158 + i * 60} x2="388" y2={158 + i * 60} stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
          <line x1="334" y1={170 + i * 60} x2="372" y2={170 + i * 60} stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}

      {/* timeline / action labels */}
      <line x1="40" y1="380" x2="420" y2="380" stroke={DIM} strokeWidth="2" />
      {[60, 150, 240, 330].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="374" x2={x} y2="386" stroke={AMBER} strokeWidth="2" />
          <rect x={x} y="392" width={i === 1 ? 84 : 64} height="14" rx="4" fill="#1A100A" stroke={AMBER} strokeWidth="1" opacity="0.6" />
        </g>
      ))}
      <text x="40" y="430" fill="#8A8A9A" fontSize="11" fontFamily="monospace">ACTION SEGMENTATION · 6DoF · HAND POSE</text>

      {/* output formats */}
      {[['LeRobot', 40], ['RLDS', 150], ['HDF5', 235], ['MP4 4K', 315]].map(([t, x]) => (
        <g key={t as string}>
          <rect x={x as number} y="470" width={(t as string).length * 9 + 22} height="30" rx="8" fill="#16161D" stroke={TEAL} strokeWidth="1.2" />
          <text x={(x as number) + 14} y="490" fill={TEAL} fontSize="12" fontFamily="monospace">{t}</text>
        </g>
      ))}
    </Frame>
  );
}

/* ─── Level meter (replaces level photos) ────────────────────────────── */
export function LevelMeter({
  number,
  complexity,
  accent = 'capture',
}: {
  number: string;
  complexity: number;
  accent?: 'expert' | 'capture';
}) {
  const color = accent === 'capture' ? AMBER : TEAL;
  return (
    <Frame vb="0 0 320 200">
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={i * 53} y1="0" x2={i * 53} y2="200" stroke={GRID} />
      ))}
      {/* big translucent number */}
      <text x="232" y="170" fill={color} opacity="0.12" fontSize="190" fontWeight="800" textAnchor="middle" fontFamily="monospace">{number}</text>
      {/* ascending complexity bars */}
      {[0, 1, 2, 3, 4].map((i) => {
        const h = 36 + i * 26;
        const on = i < complexity;
        return (
          <g key={i}>
            <rect x={36 + i * 32} y={170 - h} width="20" height={h} rx="5"
              fill={on ? color : 'transparent'} stroke={on ? color : FAINT} strokeWidth="1.5" opacity={on ? 0.92 : 0.5} />
          </g>
        );
      })}
      <text x="38" y="36" fill={color} fontSize="12" letterSpacing="2" fontFamily="monospace">L{number}</text>
    </Frame>
  );
}

/* ─── Workforce bars (India advantage) ───────────────────────────────── */
export function WorkforceGraphic() {
  const rows = [
    { label: '45M garment', w: 300, c: SAFFRON },
    { label: '15M carpenters', w: 210, c: TEAL },
    { label: '12M construction', w: 188, c: TEAL },
    { label: '1.5M STEM', w: 120, c: TEAL },
    { label: '500K doctors', w: 92, c: TEAL },
    { label: '300K CAs', w: 70, c: TEAL },
  ];
  return (
    <Frame vb="0 0 420 300">
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={i * 52} y1="0" x2={i * 52} y2="300" stroke={GRID} />
      ))}
      <text x="16" y="28" fill={SAFFRON} fontSize="12" letterSpacing="3" fontFamily="monospace">INDIA · SKILLED WORKFORCE</text>
      {rows.map((r, i) => {
        const y = 56 + i * 38;
        return (
          <g key={i}>
            <rect x="16" y={y} width={r.w} height="20" rx="6" fill={r.c} opacity={r.c === SAFFRON ? 0.9 : 0.7} />
            <rect x="16" y={y} width="404" height="20" rx="6" fill="none" stroke={GRID} />
            <text x={r.w + 28} y={y + 15} fill="#8A8A9A" fontSize="12" fontFamily="monospace">{r.label}</text>
          </g>
        );
      })}
    </Frame>
  );
}

/* ─── Case study graphics ────────────────────────────────────────────── */
export function CaseStudyGraphic({ variant }: { variant: 'expert' | 'capture' | 'both' }) {
  if (variant === 'expert') {
    // accuracy uptrend 68 -> 91
    return (
      <Frame vb="0 0 440 280">
        <Grid />
        <text x="28" y="40" fill={TEAL} fontSize="12" letterSpacing="3" fontFamily="monospace">ACCURACY</text>
        <polyline points="40,210 140,200 240,150 340,96 400,64" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="40,210 140,200 240,150 340,96 400,64 400,250 40,250" fill={TEAL} opacity="0.07" />
        {[[40,210],[140,200],[240,150],[340,96],[400,64]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4.5" fill="#0B0B0C" stroke={TEAL} strokeWidth="2.5" />
        ))}
        <text x="40" y="234" fill="#8A8A9A" fontSize="13" fontFamily="monospace">68%</text>
        <text x="372" y="52" fill={TEAL} fontSize="15" fontWeight="700" fontFamily="monospace">91%</text>
      </Frame>
    );
  }
  if (variant === 'capture') {
    // hours bars / cost down
    return (
      <Frame vb="0 0 440 280">
        <Grid />
        <text x="28" y="40" fill={AMBER} fontSize="12" letterSpacing="3" fontFamily="monospace">HOURS DELIVERED</text>
        {[120, 180, 230, 250].map((h, i) => (
          <rect key={i} x={50 + i * 92} y={250 - h} width="56" height={h} rx="7" fill={AMBER} opacity={0.45 + i * 0.18} />
        ))}
        <text x="372" y="40" fill={AMBER} fontSize="15" fontWeight="700" textAnchor="end" fontFamily="monospace">1,000h</text>
        <text x="50" y="272" fill="#8A8A9A" fontSize="11" fontFamily="monospace">-82% vs US cost</text>
      </Frame>
    );
  }
  // both - two rails converging (variant === 'both')
  return (
    <Frame vb="0 0 440 280">
      <Grid />
      <text x="28" y="40" fill="#F5F5F7" fontSize="12" letterSpacing="3" fontFamily="monospace">TEXT + PHYSICAL</text>
      <path d="M40 90 C 180 90, 200 140, 360 140" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
      <path d="M40 210 C 180 210, 200 140, 360 140" fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" />
      <circle cx="40" cy="90" r="6" fill={TEAL} />
      <circle cx="40" cy="210" r="6" fill={AMBER} />
      <circle cx="372" cy="140" r="16" fill="#16161D" stroke="#F5F5F7" strokeWidth="2" />
      <circle cx="372" cy="140" r="5" fill="#F5F5F7" />
      <text x="56" y="84" fill={TEAL} fontSize="12" fontFamily="monospace">Expert</text>
      <text x="56" y="226" fill={AMBER} fontSize="12" fontFamily="monospace">Capture</text>
      <text x="372" y="180" fill="#8A8A9A" fontSize="11" textAnchor="middle" fontFamily="monospace">one pipeline</text>
    </Frame>
  );
}

function Grid() {
  return (
    <>
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="280" stroke={GRID} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 55} x2="440" y2={i * 55} stroke={GRID} />
      ))}
    </>
  );
}
