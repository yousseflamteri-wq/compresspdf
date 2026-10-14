import { ImageResponse } from 'next/og';

export const alt = 'Compress PDF Online – Zero-Upload In-Browser PDF Compression';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#0f172a',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: 900,
              padding: '8px 18px',
              borderRadius: '8px',
              marginRight: '16px',
              display: 'flex',
            }}
          >
            PDF
          </div>
          <div style={{ display: 'flex', fontSize: '36px', fontWeight: 800, color: '#f8fafc' }}>
            <span>compresspdf</span>
            <span style={{ color: '#16a34a' }}>.online</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '56px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.15,
              marginBottom: '20px',
              maxWidth: '900px',
            }}
          >
            Compress PDF Files Privately in Your Browser
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '26px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '850px',
            }}
          >
            Zero server uploads. Reduce document size to under 200 KB while keeping vector text sharp.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '20px',
            color: '#64748b',
          }}
        >
          100% Client-Side Memory • No File Limits • Free and Confidential
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
