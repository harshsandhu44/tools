import { ImageResponse } from 'next/og'

export const alt = 'Tools — Developer utilities that respect your data'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#fdfcf9',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 32, color: '#8a3d1f', fontWeight: 700 }}>
          tools.harshsandhu.com
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 150,
              fontWeight: 800,
              color: '#1a1a17',
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            Tools<span style={{ color: '#c1502e' }}>.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: '#57534e', marginTop: 24, maxWidth: 900 }}>
            Developer utilities that run entirely in your browser.
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#57534e', fontWeight: 600 }}>
          No account · No uploads · No tracking
        </div>
      </div>
    ),
    { ...size },
  )
}
