import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/data/blog';

export const runtime = 'edge';
export const alt = 'London Sports Community blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? 'London Sports Community Blog';
  const tag = post?.tags?.[0] ?? 'Guide';

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
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            color: 'white',
            fontSize: 22,
            fontWeight: 600,
            padding: '8px 20px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.15)',
            marginBottom: 32,
            textTransform: 'capitalize',
          }}
        >
          {tag}
        </div>
        <div
          style={{
            display: 'flex',
            color: 'white',
            fontSize: 54,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: 950,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            color: 'rgba(255,255,255,0.85)',
            fontSize: 24,
            fontWeight: 500,
            marginTop: 40,
          }}
        >
          London Sports Community
        </div>
      </div>
    ),
    { ...size }
  );
}
