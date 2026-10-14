import { ImageResponse } from 'next/og';

export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          borderRadius: '10px',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Folded Document Base */}
          <path d="M7 4 H19 L25 10 V28 H7 Z" fill="#ffffff" />
          <path d="M19 4 V10 H25 Z" fill="#cbd5e1" />

          {/* Zipper Teeth */}
          <rect x="11" y="8" width="4" height="2" rx="0.5" fill="#475569" />
          <rect x="13" y="11" width="4" height="2" rx="0.5" fill="#475569" />
          <rect x="11" y="14" width="4" height="2" rx="0.5" fill="#475569" />
          <rect x="13" y="17" width="4" height="2" rx="0.5" fill="#475569" />

          {/* Zipper Pull Slider */}
          <rect x="11" y="19" width="6" height="6" rx="1.5" fill="#16a34a" />
          <circle cx="14" cy="22" r="1.2" fill="#0f172a" />
        </svg>
      </div>
    ),
    { ...size }
  );
}