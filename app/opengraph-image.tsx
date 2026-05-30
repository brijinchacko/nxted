import { ImageResponse } from 'next/og';

export const alt = 'nxted.ai - Physical AI training data & RLHF evaluation, from India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0B0B0C',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: '#5CE1E6',
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 800, color: '#F5F5F7', letterSpacing: -1 }}>
            nxted.ai
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: '#F5F5F7',
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Physical AI training data & expert RLHF, from India.
          </div>
          <div style={{ fontSize: 30, color: '#A0A0B0', maxWidth: 940 }}>
            Egocentric, consented, robotics-ready - delivered with a Data Trust Pack.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14 }}>
          {['Egocentric capture', 'RLHF evaluation', 'DPDP & GDPR-aligned'].map((t) => (
            <div
              key={t}
              style={{
                fontSize: 24,
                color: '#5CE1E6',
                border: '1px solid #2A2A33',
                borderRadius: 999,
                padding: '10px 22px',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
