import { ImageResponse } from 'next/og';
import { GROUPS } from '@/data/groups';
import { BOROUGHS } from '@/data/boroughs';

export const runtime = 'edge';
export const alt = 'London Sports Community — Find people to play sport with in London';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const groupCount = GROUPS.length;
  const groupCountLabel = `${Math.floor(groupCount / 10) * 10}+`;
  const boroughCount = BOROUGHS.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.15)',
              fontSize: 32,
            }}
          >
            🏃
          </div>
          <div style={{ display: 'flex', color: 'white', fontSize: 28, fontWeight: 600, opacity: 0.9 }}>
            London Sports Community
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            color: 'white',
            fontSize: 64,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.15,
            maxWidth: 900,
            marginBottom: 28,
          }}
        >
          Find people to play sport with in London
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {[
            `${groupCountLabel} groups`,
            `${boroughCount} boroughs`,
            'Free, no sign-up',
          ].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                color: 'white',
                fontSize: 22,
                fontWeight: 500,
                padding: '10px 22px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.15)',
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
