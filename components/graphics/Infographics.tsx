/* Animated, unique SVG infographics in the nxted palette.
   Teal = Expert (#5CE1E6), Amber = Capture (#FF8C42), saffron = India.
   Animation is CSS-driven (see globals .nxt-* classes) and reduced-motion safe.
   Every graphic is a distinct composition - no two placements repeat. */

const TEAL = '#5CE1E6';
const AMBER = '#FF8C42';
const SAFFRON = '#FF9933';
const GREEN = '#34D399';
const GRID = 'rgba(255,255,255,0.06)';
const DIM = '#2A2A34';
const FAINT = '#3E3E4C';
const MONO = 'monospace';

function Svg({ vb, children }: { vb: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox={vb}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
      className="nxt-svg"
      style={{ display: 'block' }}
    >
      {children}
    </svg>
  );
}

function GridBg({ w, h, step = 50 }: { w: number; h: number; step?: number }) {
  const v = [];
  for (let x = step; x < w; x += step) v.push(<line key={`v${x}`} x1={x} y1="0" x2={x} y2={h} stroke={GRID} />);
  for (let y = step; y < h; y += step) v.push(<line key={`h${y}`} x1="0" y1={y} x2={w} y2={y} stroke={GRID} />);
  return <>{v}</>;
}

const d = (s: number): React.CSSProperties => ({ animationDelay: `${s}s` });

/* ════════════════════════ HOME HERO ════════════════════════ */
export function DualPipelineGraphic() {
  return (
    <Svg vb="0 0 440 540">
      <GridBg w={440} h={540} step={55} />
      <text x="32" y="44" fill={TEAL} fontSize="12" letterSpacing="3" fontFamily={MONO}>EXPERT</text>
      <rect x="32" y="60" width="120" height="56" rx="10" fill="#0D1A1A" stroke={DIM} className="nxt-rise" />
      <line x1="48" y1="80" x2="124" y2="80" stroke={FAINT} strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-draw" style={d(0.2)} />
      <line x1="48" y1="92" x2="108" y2="92" stroke={FAINT} strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-draw" style={d(0.4)} />
      <line x1="48" y1="104" x2="120" y2="104" stroke={FAINT} strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-draw" style={d(0.6)} />
      <path d="M152 88 H214" stroke={TEAL} strokeWidth="1.5" opacity="0.3" />
      <path d="M152 88 H214" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      {[64, 104, 144].map((y, i) => (
        <g key={i}>
          <path d={`M214 88 L248 ${y + 12}`} stroke={TEAL} strokeWidth="1.5" opacity="0.3" />
          <circle cx="262" cy={y + 12} r="13" fill="#0D1A1A" stroke={TEAL} strokeWidth="1.5" />
          <g className="nxt-pulse" style={{ ...d(i * 0.4), transformOrigin: `262px ${y + 12}px` }}>
            <circle cx="262" cy={y + 7} r="3.5" fill={TEAL} />
            <path d={`M255 ${y + 20} a7 7 0 0 1 14 0`} fill={TEAL} />
          </g>
        </g>
      ))}
      <path d="M288 116 H338" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" style={d(0.6)} />
      <circle cx="372" cy="116" r="34" stroke={DIM} strokeWidth="7" />
      <circle cx="372" cy="116" r="34" stroke={TEAL} strokeWidth="7" strokeLinecap="round" pathLength="1"
        strokeDasharray="0.62 1" transform="rotate(-90 372 116)" className="nxt-draw" style={d(0.8)} />
      <text x="372" y="123" fill="#F5F5F7" fontSize="22" fontWeight="700" textAnchor="middle" fontFamily={MONO}>73</text>

      <line x1="32" y1="270" x2="408" y2="270" stroke={DIM} pathLength="1" className="nxt-draw" style={d(0.3)} />
      <text x="220" y="266" fill="#6E6E80" fontSize="10" letterSpacing="4" textAnchor="middle" fontFamily={MONO}>EXPERT / CAPTURE</text>

      <text x="32" y="318" fill={AMBER} fontSize="12" letterSpacing="3" fontFamily={MONO}>CAPTURE</text>
      <circle cx="84" cy="396" r="34" fill="#1A100A" stroke={AMBER} strokeWidth="1.5" />
      <g className="nxt-pulse" style={{ transformOrigin: '84px 396px' }}>
        <circle cx="84" cy="396" r="10" fill="none" stroke={AMBER} strokeWidth="2" />
        <circle cx="84" cy="396" r="3.5" fill={AMBER} />
      </g>
      <path d="M114 380 L188 352 L188 440 L114 412 Z" fill={AMBER} fillOpacity="0.08" stroke={AMBER} strokeWidth="1" strokeOpacity="0.3" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={206 + i * 26} y={372 + i * 6} width="36" height="48" rx="6" fill="#1A100A" stroke={AMBER} strokeWidth="1.5" className="nxt-rise" style={d(0.5 + i * 0.2)} />
      ))}
      <path d="M300 396 H338" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" style={d(0.4)} />
      <g stroke={AMBER} strokeWidth="1.5" fill="#1A100A" className="nxt-float">
        <ellipse cx="378" cy="372" rx="30" ry="9" />
        <path d="M348 372 V416 a30 9 0 0 0 60 0 V372" fill="#1A100A" />
        <ellipse cx="378" cy="394" rx="30" ry="9" opacity="0.6" />
      </g>
      {[['RGB', 150], ['DEPTH', 230], ['POSE', 320]].map(([t, x], i) => (
        <g key={t as string}>
          <circle cx={x as number} cy="482" r="3" fill={AMBER} className="nxt-blink" style={d(i * 0.5)} />
          <text x={(x as number) + 10} y="486" fill="#8A8A9A" fontSize="11" fontFamily={MONO}>{t}</text>
        </g>
      ))}
    </Svg>
  );
}

/* ════════════════════════ CAPTURE HERO ════════════════════════ */
export function EgocentricGraphic() {
  return (
    <Svg vb="0 0 460 560">
      <GridBg w={460} h={560} step={50} />
      <text x="40" y="60" fill={AMBER} fontSize="13" letterSpacing="3" fontFamily={MONO}>EGOCENTRIC CAPTURE</text>
      <circle cx="130" cy="220" r="74" fill="#1A100A" stroke={AMBER} strokeWidth="2" />
      <circle cx="130" cy="220" r="74" stroke={AMBER} strokeWidth="1" className="nxt-pulse" style={{ transformOrigin: '130px 220px' }} />
      <circle cx="150" cy="200" r="20" fill="#0B0B0C" stroke={TEAL} strokeWidth="2" />
      <g className="nxt-pulse" style={{ transformOrigin: '150px 200px' }}>
        <circle cx="150" cy="200" r="8" fill="none" stroke={TEAL} strokeWidth="2.5" />
        <circle cx="150" cy="200" r="3" fill={TEAL} />
      </g>
      <path d="M168 188 L360 120 L360 300 L168 214 Z" fill={AMBER} fillOpacity="0.08" />
      <line x1="168" y1="188" x2="360" y2="120" stroke={AMBER} strokeWidth="1.5" opacity="0.5" pathLength="1" className="nxt-draw" />
      <line x1="168" y1="214" x2="360" y2="300" stroke={AMBER} strokeWidth="1.5" opacity="0.5" pathLength="1" className="nxt-draw" style={d(0.2)} />
      {[0, 1, 2].map((i) => (
        <g key={i} className="nxt-rise" style={d(0.4 + i * 0.25)}>
          <rect x={300} y={140 + i * 60} width="100" height="56" rx="8" fill="#16161D" stroke={i === 0 ? AMBER : DIM} strokeWidth="1.5" />
          <circle cx={320} cy={160 + i * 60} r="6" fill={AMBER} opacity={0.7 - i * 0.2} />
          <line x1="334" y1={158 + i * 60} x2="388" y2={158 + i * 60} stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
          <line x1="334" y1={170 + i * 60} x2="372" y2={170 + i * 60} stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
        </g>
      ))}
      <line x1="40" y1="380" x2="420" y2="380" stroke={DIM} strokeWidth="2" />
      <line x1="40" y1="380" x2="420" y2="380" stroke={AMBER} strokeWidth="2" className="nxt-march" opacity="0.6" />
      {[60, 150, 240, 330].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="374" x2={x} y2="386" stroke={AMBER} strokeWidth="2" />
          <rect x={x} y="392" width={i === 1 ? 84 : 64} height="14" rx="4" fill="#1A100A" stroke={AMBER} strokeWidth="1" className="nxt-wide" style={{ ...d(0.3 + i * 0.15), transformOrigin: `${x}px 399px` }} />
        </g>
      ))}
      <text x="40" y="430" fill="#8A8A9A" fontSize="11" fontFamily={MONO}>ACTION SEGMENTATION / 6DoF / HAND POSE</text>
      {[['LeRobot', 40], ['RLDS', 150], ['HDF5', 235], ['MP4 4K', 315]].map(([t, x], i) => (
        <g key={t as string} className="nxt-pop" style={d(0.6 + i * 0.15)}>
          <rect x={x as number} y="470" width={(t as string).length * 9 + 22} height="30" rx="8" fill="#16161D" stroke={TEAL} strokeWidth="1.2" />
          <text x={(x as number) + 14} y="490" fill={TEAL} fontSize="12" fontFamily={MONO}>{t}</text>
        </g>
      ))}
    </Svg>
  );
}

/* ════════════════════════ INDIA WORKFORCE ════════════════════════ */
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
    <Svg vb="0 0 420 300">
      <GridBg w={420} h={300} step={52} />
      <text x="16" y="28" fill={SAFFRON} fontSize="12" letterSpacing="3" fontFamily={MONO}>INDIA / SKILLED WORKFORCE</text>
      {rows.map((r, i) => {
        const y = 56 + i * 38;
        return (
          <g key={i}>
            <rect x="16" y={y} width="404" height="20" rx="6" fill="none" stroke={GRID} />
            <rect x="16" y={y} width={r.w} height="20" rx="6" fill={r.c} opacity={r.c === SAFFRON ? 0.9 : 0.7}
              className={r.c === SAFFRON ? 'nxt-wide nxt-pulse' : 'nxt-wide'} style={{ ...d(0.15 + i * 0.12), transformOrigin: `16px ${y + 10}px` }} />
            <text x={r.w + 28} y={y + 15} fill="#8A8A9A" fontSize="12" fontFamily={MONO}>{r.label}</text>
          </g>
        );
      })}
    </Svg>
  );
}

/* ════════════════════════ 5 UNIQUE LEVEL GRAPHICS ════════════════════════ */
function LevelFrame({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <Svg vb="0 0 320 200">
      <GridBg w={320} h={200} step={53} />
      <text x={236} y={172} fill={AMBER} opacity="0.10" fontSize="180" fontWeight="800" textAnchor="middle" fontFamily={MONO}>{n}</text>
      <text x="20" y="32" fill={AMBER} fontSize="11" letterSpacing="2" fontFamily={MONO}>L{n} / {label}</text>
      {children}
    </Svg>
  );
}

function FoundationGraphic() {
  return (
    <LevelFrame n="01" label="FOUNDATION">
      {[0, 1, 2].map((b) => (
        <rect key={b} x={28 + b * 56} y={130} width="44" height="40" rx="5" fill="none" stroke={AMBER} strokeWidth="1.6" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={36 + (i % 3) * 56 + (i > 2 ? 14 : 0)} y={136 + (i > 2 ? 0 : 14)} width="14" height="14" rx="3"
          fill={AMBER} opacity={0.85} className="nxt-rise" style={d(0.2 + i * 0.18)} />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={50 + i * 56} cy={70} r="5" fill={AMBER} className="nxt-blink" style={d(i * 0.3)} />
      ))}
      <path d="M50 84 V120 M106 84 V120 M162 84 V120" stroke={AMBER} strokeWidth="1.4" opacity="0.4" pathLength="1" className="nxt-flow" />
    </LevelFrame>
  );
}

function TradesGraphic() {
  const stitch = 'M30 150 L60 110 L90 150 L120 110 L150 150 L180 110 L210 150';
  return (
    <LevelFrame n="02" label="SKILLED TRADES">
      <path d={stitch} stroke={DIM} strokeWidth="2" />
      <path d={stitch} stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="nxt-draw" />
      <path d={stitch} stroke="#FFD7B0" strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      {[[30,150],[60,110],[90,150],[120,110],[150,150],[180,110],[210,150]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="3.5" fill={AMBER} className="nxt-pop" style={d(0.2 + i * 0.12)} />
      ))}
      <g className="nxt-float">
        <line x1="232" y1="60" x2="210" y2="150" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="232" cy="58" r="4" fill="none" stroke={TEAL} strokeWidth="2" />
      </g>
    </LevelFrame>
  );
}

function TechnicalGraphic() {
  const gear = (cx: number, cy: number, r: number, teeth: number) => {
    const t = [];
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      t.push(<line key={i} x1={cx + Math.cos(a) * r} y1={cy + Math.sin(a) * r} x2={cx + Math.cos(a) * (r + 6)} y2={cy + Math.sin(a) * (r + 6)} stroke={AMBER} strokeWidth="3" strokeLinecap="round" />);
    }
    return t;
  };
  return (
    <LevelFrame n="03" label="TECHNICAL">
      <g className="nxt-spin" style={{ transformOrigin: '96px 112px' }}>
        <circle cx="96" cy="112" r="30" fill="none" stroke={AMBER} strokeWidth="3" />
        <circle cx="96" cy="112" r="9" fill={AMBER} />
        {gear(96, 112, 30, 10)}
      </g>
      <g className="nxt-spin-rev" style={{ transformOrigin: '152px 150px' }}>
        <circle cx="152" cy="150" r="18" fill="none" stroke={AMBER} strokeWidth="2.5" opacity="0.8" />
        <circle cx="152" cy="150" r="5" fill={AMBER} opacity="0.8" />
        {gear(152, 150, 18, 8)}
      </g>
      <path d="M150 70 H250" stroke={TEAL} strokeWidth="2" strokeLinecap="round" pathLength="1" className="nxt-draw" style={d(0.4)} />
      <path d="M150 70 H250" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      <circle cx="250" cy="70" r="4" fill={TEAL} className="nxt-pulse" style={{ transformOrigin: '250px 70px' }} />
    </LevelFrame>
  );
}

function ProfessionalGraphic() {
  const ecg = 'M20 120 H70 L82 120 L92 88 L102 150 L112 120 L130 120 L142 120 L150 105 L160 120 H210 L222 120 L232 96 L242 150 L252 120 H300';
  return (
    <LevelFrame n="04" label="PROFESSIONAL">
      <path d={ecg} stroke={DIM} strokeWidth="2" />
      <path d={ecg} stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="nxt-draw" />
      <path d={ecg} stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      <g className="nxt-pulse" style={{ transformOrigin: '60px 60px' }}>
        <rect x="52" y="46" width="16" height="28" rx="3" fill={AMBER} />
        <rect x="46" y="52" width="28" height="16" rx="3" fill={AMBER} />
      </g>
    </LevelFrame>
  );
}

function SpecialistGraphic() {
  return (
    <LevelFrame n="05" label="SPECIALIST">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={`w${i}`} x1={36 + i * 26} y1="60" x2={36 + i * 26} y2="160" stroke={AMBER} strokeWidth="2" opacity="0.7" pathLength="1" className="nxt-draw" style={d(i * 0.1)} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line key={`f${i}`} x1="30" y1={74 + i * 26} x2="222" y2={74 + i * 26} stroke="#FFD7B0" strokeWidth="2" opacity="0.55" pathLength="1" className="nxt-draw" style={d(0.4 + i * 0.12)} />
      ))}
      <g className="nxt-float">
        <path d="M250 80 L268 104 L250 150 L232 104 Z" fill={TEAL} fillOpacity="0.15" stroke={TEAL} strokeWidth="1.8" />
        <path d="M232 104 H268 M250 80 V150" stroke={TEAL} strokeWidth="1" opacity="0.6" />
      </g>
    </LevelFrame>
  );
}

const LEVEL_MAP: Record<string, () => React.ReactElement> = {
  '01': FoundationGraphic,
  '02': TradesGraphic,
  '03': TechnicalGraphic,
  '04': ProfessionalGraphic,
  '05': SpecialistGraphic,
};

export function LevelGraphic({ number }: { number: string }) {
  const G = LEVEL_MAP[number] || FoundationGraphic;
  return <G />;
}

/* ════════════════════════ MARKET GROWTH ════════════════════════ */
export function MarketGrowthGraphic() {
  const line = 'M30 250 L110 232 L190 196 L270 150 L350 96 L410 58';
  const heights = [18, 54, 100, 154, 192];
  return (
    <Svg vb="0 0 440 290">
      <GridBg w={440} h={290} step={55} />
      <text x="28" y="34" fill={TEAL} fontSize="12" letterSpacing="3" fontFamily={MONO}>HUMANOID MARKET / TO 2034</text>
      {[110, 190, 270, 350, 410].map((x, i) => (
        <rect key={i} x={x - 12} y={250 - heights[i]} width="24" height={heights[i]} rx="4"
          fill={TEAL} opacity="0.12" className="nxt-grow" style={{ ...d(0.15 + i * 0.12), transformOrigin: `${x}px 250px` }} />
      ))}
      <path d={`${line} L410 250 L30 250 Z`} fill={TEAL} fillOpacity="0.06" />
      <path d={line} stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="nxt-draw" />
      <path d={line} stroke="#BFF5F7" strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      {[[30,250],[110,232],[190,196],[270,150],[350,96],[410,58]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4.5" fill="#0B0B0C" stroke={TEAL} strokeWidth="2.5" className="nxt-pop" style={d(0.3 + i * 0.12)} />
      ))}
      <text x="410" y="46" fill={TEAL} fontSize="15" fontWeight="700" textAnchor="end" fontFamily={MONO}>$38B</text>
    </Svg>
  );
}

/* ════════════════════════ FORMAT PIPELINE ════════════════════════ */
export function FormatPipelineGraphic() {
  return (
    <Svg vb="0 0 440 220">
      <GridBg w={440} h={220} step={55} />
      <text x="28" y="32" fill={AMBER} fontSize="12" letterSpacing="3" fontFamily={MONO}>CAPTURE / ANNOTATE / DELIVER</text>
      <rect x="28" y="80" width="84" height="60" rx="8" fill="#1A100A" stroke={AMBER} strokeWidth="1.6" className="nxt-rise" />
      <circle cx="50" cy="100" r="6" fill={AMBER} className="nxt-blink" />
      <text x="40" y="160" fill="#8A8A9A" fontSize="10" fontFamily={MONO}>RAW 4K</text>
      <path d="M120 110 H180" stroke={AMBER} strokeWidth="2" strokeLinecap="round" className="nxt-march" />
      <circle cx="220" cy="110" r="32" fill="#1A100A" stroke={TEAL} strokeWidth="1.8" />
      <g className="nxt-spin" style={{ transformOrigin: '220px 110px' }}>
        <circle cx="220" cy="110" r="20" fill="none" stroke={TEAL} strokeWidth="1.4" strokeDasharray="4 6" />
      </g>
      <circle cx="220" cy="110" r="6" fill={TEAL} className="nxt-pulse" style={{ transformOrigin: '220px 110px' }} />
      <text x="196" y="166" fill="#8A8A9A" fontSize="10" fontFamily={MONO}>ANNOTATE</text>
      <path d="M260 110 H300" stroke={TEAL} strokeWidth="2" strokeLinecap="round" className="nxt-march" />
      {[['LeRobot', 64], ['RLDS', 96], ['HDF5', 128]].map(([t, y], i) => (
        <g key={t as string} className="nxt-pop" style={d(0.4 + i * 0.2)}>
          <rect x="312" y={y as number} width="100" height="26" rx="7" fill="#16161D" stroke={AMBER} strokeWidth="1.2" />
          <text x="326" y={(y as number) + 17} fill={AMBER} fontSize="12" fontFamily={MONO}>{t}</text>
        </g>
      ))}
    </Svg>
  );
}

/* ════════════════════════ PRODUCT SPLIT MINIS ════════════════════════ */
export function ExpertMiniGraphic() {
  return (
    <Svg vb="0 0 360 120">
      <text x="0" y="14" fill={TEAL} fontSize="10" letterSpacing="2" fontFamily={MONO}>RLHF FLOW</text>
      <rect x="0" y="40" width="60" height="40" rx="8" fill="#0D1A1A" stroke={DIM} className="nxt-rise" />
      <line x1="14" y1="56" x2="46" y2="56" stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
      <line x1="14" y1="66" x2="38" y2="66" stroke={FAINT} strokeWidth="3" strokeLinecap="round" />
      <path d="M60 60 H120" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="140" cy={44 + i * 16} r="9" fill="#0D1A1A" stroke={TEAL} strokeWidth="1.5" className="nxt-pulse" style={{ ...d(i * 0.4), transformOrigin: `140px ${44 + i * 16}px` }} />
      ))}
      <path d="M156 60 H210" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" pathLength="1" className="nxt-flow" style={d(0.5)} />
      <circle cx="248" cy="60" r="26" stroke={DIM} strokeWidth="6" />
      <circle cx="248" cy="60" r="26" stroke={TEAL} strokeWidth="6" strokeLinecap="round" pathLength="1" strokeDasharray="0.68 1" transform="rotate(-90 248 60)" className="nxt-draw" style={d(0.4)} />
      <text x="248" y="65" fill="#F5F5F7" fontSize="16" fontWeight="700" textAnchor="middle" fontFamily={MONO}>91</text>
      <text x="296" y="64" fill={TEAL} fontSize="11" fontFamily={MONO}>score</text>
    </Svg>
  );
}

export function CaptureMiniGraphic() {
  return (
    <Svg vb="0 0 360 120">
      <text x="0" y="14" fill={AMBER} fontSize="10" letterSpacing="2" fontFamily={MONO}>EGOCENTRIC FRAMES</text>
      <circle cx="34" cy="62" r="26" fill="#1A100A" stroke={AMBER} strokeWidth="1.6" />
      <g className="nxt-pulse" style={{ transformOrigin: '34px 62px' }}>
        <circle cx="44" cy="56" r="7" fill="none" stroke={TEAL} strokeWidth="2" />
        <circle cx="44" cy="56" r="2.5" fill={TEAL} />
      </g>
      <path d="M58 52 L120 36 L120 92 L58 76 Z" fill={AMBER} fillOpacity="0.08" stroke={AMBER} strokeWidth="1" strokeOpacity="0.4" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={130 + i * 44} y={40 + i * 3} width="36" height="44" rx="6" fill="#1A100A" stroke={i === 0 ? AMBER : DIM} strokeWidth="1.5" className="nxt-rise" style={d(0.2 + i * 0.18)} />
      ))}
      <line x1="130" y1="100" x2="320" y2="100" stroke={AMBER} strokeWidth="1.6" className="nxt-march" opacity="0.6" />
    </Svg>
  );
}

/* ════════════════════════ CASE STUDIES (detailed - page) ════════════════════════ */
export function CaseStudyGraphic({ variant }: { variant: 'expert' | 'capture' | 'both' }) {
  if (variant === 'expert') {
    const line = '40,210 140,200 240,150 340,96 400,64';
    return (
      <Svg vb="0 0 440 280">
        <GridBg w={440} h={280} step={55} />
        <text x="28" y="40" fill={TEAL} fontSize="12" letterSpacing="3" fontFamily={MONO}>ACCURACY / 8 WEEKS</text>
        <polygon points={`${line} 400,250 40,250`} fill={TEAL} fillOpacity="0.07" />
        <polyline points={line} fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="nxt-draw" />
        <polyline points={line} fill="none" stroke="#BFF5F7" strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-flow" />
        {[[40,210],[140,200],[240,150],[340,96],[400,64]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="4.5" fill="#0B0B0C" stroke={TEAL} strokeWidth="2.5" className="nxt-pop" style={d(0.3 + i * 0.14)} />
        ))}
        <text x="40" y="234" fill="#8A8A9A" fontSize="13" fontFamily={MONO}>68%</text>
        <text x="372" y="52" fill={TEAL} fontSize="15" fontWeight="700" fontFamily={MONO}>91%</text>
      </Svg>
    );
  }
  if (variant === 'capture') {
    const heights = [120, 180, 230, 250];
    return (
      <Svg vb="0 0 440 280">
        <GridBg w={440} h={280} step={55} />
        <text x="28" y="40" fill={AMBER} fontSize="12" letterSpacing="3" fontFamily={MONO}>HOURS DELIVERED</text>
        {heights.map((h, i) => (
          <rect key={i} x={50 + i * 92} y={250 - h} width="56" height={h} rx="7" fill={AMBER} opacity={0.45 + i * 0.18}
            className="nxt-grow" style={{ ...d(0.15 + i * 0.15), transformOrigin: `${78 + i * 92}px 250px` }} />
        ))}
        <text x="372" y="40" fill={AMBER} fontSize="15" fontWeight="700" textAnchor="end" fontFamily={MONO}>1,000h</text>
        <text x="50" y="272" fill="#8A8A9A" fontSize="11" fontFamily={MONO}>-82% vs US cost</text>
      </Svg>
    );
  }
  return (
    <Svg vb="0 0 440 280">
      <GridBg w={440} h={280} step={55} />
      <text x="28" y="40" fill="#F5F5F7" fontSize="12" letterSpacing="3" fontFamily={MONO}>TEXT + PHYSICAL</text>
      <path d="M40 90 C 180 90, 200 140, 360 140" fill="none" stroke={TEAL} strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-draw" />
      <path d="M40 210 C 180 210, 200 140, 360 140" fill="none" stroke={AMBER} strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-draw" style={d(0.25)} />
      <path d="M40 90 C 180 90, 200 140, 360 140" fill="none" stroke="#BFF5F7" strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      <path d="M40 210 C 180 210, 200 140, 360 140" fill="none" stroke="#FFD7B0" strokeWidth="3" strokeLinecap="round" pathLength="1" className="nxt-flow" style={d(0.6)} />
      <circle cx="40" cy="90" r="6" fill={TEAL} className="nxt-pulse" style={{ transformOrigin: '40px 90px' }} />
      <circle cx="40" cy="210" r="6" fill={AMBER} className="nxt-pulse" style={{ transformOrigin: '40px 210px' }} />
      <circle cx="372" cy="140" r="16" fill="#16161D" stroke="#F5F5F7" strokeWidth="2" className="nxt-float" />
      <circle cx="372" cy="140" r="5" fill="#F5F5F7" />
      <text x="56" y="84" fill={TEAL} fontSize="12" fontFamily={MONO}>Expert</text>
      <text x="56" y="226" fill={AMBER} fontSize="12" fontFamily={MONO}>Capture</text>
      <text x="372" y="180" fill="#8A8A9A" fontSize="11" textAnchor="middle" fontFamily={MONO}>one pipeline</text>
    </Svg>
  );
}

/* ════════════════════════ CASE STUDY MINIS (compact - home, distinct) ════════════════════════ */
export function CaseStudyMini({ variant }: { variant: 'expert' | 'capture' | 'both' }) {
  if (variant === 'expert') {
    return (
      <Svg vb="0 0 360 150">
        <GridBg w={360} h={150} step={45} />
        <circle cx="180" cy="92" r="54" stroke={DIM} strokeWidth="9" />
        <circle cx="180" cy="92" r="54" stroke={TEAL} strokeWidth="9" strokeLinecap="round" pathLength="1" strokeDasharray="0.91 1" transform="rotate(-90 180 92)" className="nxt-draw" />
        <text x="180" y="86" fill="#F5F5F7" fontSize="30" fontWeight="700" textAnchor="middle" fontFamily={MONO}>91%</text>
        <text x="180" y="108" fill="#8A8A9A" fontSize="11" textAnchor="middle" fontFamily={MONO}>accuracy</text>
        {[0,1,2,3].map(i=>(<circle key={i} cx={300} cy={40 + i*24} r="4" fill={TEAL} className="nxt-blink" style={d(i*0.3)} />))}
      </Svg>
    );
  }
  if (variant === 'capture') {
    return (
      <Svg vb="0 0 360 150">
        <GridBg w={360} h={150} step={45} />
        {[0,1,2,3,4].map(i=>(
          <rect key={i} x={20 + i*68} y={48} width="56" height="56" rx="8" fill="#1A100A" stroke={i===4?AMBER:DIM} strokeWidth="1.6" className="nxt-pop" style={d(0.15 + i*0.14)} />
        ))}
        <line x1="20" y1="120" x2="340" y2="120" stroke={AMBER} strokeWidth="2" className="nxt-march" opacity="0.7" />
        <text x="20" y="30" fill={AMBER} fontSize="11" letterSpacing="2" fontFamily={MONO}>1,000 HOURS</text>
      </Svg>
    );
  }
  return (
    <Svg vb="0 0 360 150">
      <GridBg w={360} h={150} step={45} />
      <text x="14" y="28" fill="#F5F5F7" fontSize="11" letterSpacing="2" fontFamily={MONO}>ONE PIPELINE</text>
      <circle cx="40" cy="60" r="7" fill={TEAL} className="nxt-pulse" style={{ transformOrigin: '40px 60px' }} />
      <circle cx="40" cy="110" r="7" fill={AMBER} className="nxt-pulse" style={{ transformOrigin: '40px 110px' }} />
      <path d="M47 60 C 150 60, 170 85, 300 85" stroke={TEAL} strokeWidth="2.5" fill="none" strokeLinecap="round" pathLength="1" className="nxt-flow" />
      <path d="M47 110 C 150 110, 170 85, 300 85" stroke={AMBER} strokeWidth="2.5" fill="none" strokeLinecap="round" pathLength="1" className="nxt-flow" style={d(0.5)} />
      <circle cx="316" cy="85" r="14" fill="#16161D" stroke="#F5F5F7" strokeWidth="2" className="nxt-float" />
      <circle cx="316" cy="85" r="4" fill="#F5F5F7" />
    </Svg>
  );
}
