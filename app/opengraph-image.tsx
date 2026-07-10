import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'DeskHub — デスクセットアップ検索・比較サイト'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1c1917',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 背景グリッドライン */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(251,191,36,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* アクセントライン */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)',
          }}
        />

        {/* コンテンツ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            padding: '0 80px',
            textAlign: 'center',
          }}
        >
          {/* ロゴ */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                background: '#f59e0b',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
              }}
            >
              🖥️
            </div>
            <span
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: '#fafaf9',
                letterSpacing: '-1px',
              }}
            >
              DeskHub
            </span>
          </div>

          {/* タグライン */}
          <div
            style={{
              fontSize: '28px',
              color: '#d6d3d1',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            デスクセットアップを予算・用途で検索
          </div>

          {/* フィーチャーバッジ */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            {['予算で絞り込み', '互換性チェック', '予算シミュレーター'].map((label) => (
              <div
                key={label}
                style={{
                  background: 'rgba(245,158,11,0.15)',
                  border: '1px solid rgba(245,158,11,0.4)',
                  borderRadius: '99px',
                  padding: '8px 20px',
                  fontSize: '18px',
                  color: '#fbbf24',
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ドメイン */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '16px',
            color: '#78716c',
          }}
        >
          devtools-hub.vercel.app
        </div>
      </div>
    ),
    { ...size },
  )
}
