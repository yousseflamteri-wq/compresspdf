'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';

function subscribe(callback) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  try {
    return localStorage.getItem('pdf_cookie_consent') || 'unanswered';
  } catch {
    return 'dismissed';
  }
}

function getServerSnapshot() {
  return 'dismissed';
}

export default function CookieConsent() {
  const status = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleChoice = (val) => {
    try {
      localStorage.setItem('pdf_cookie_consent', val);
      window.dispatchEvent(new Event('storage'));
    } catch {}
  };

  if (status !== 'unanswered') return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-0 inset-x-0 z-50 p-3 sm:p-4 pointer-events-none"
    >
      <div className="mx-auto max-w-4xl rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-lg pointer-events-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
            <p>
              We process all PDF files locally in your browser without server uploads. We and third-party partners like Google use cookies for basic site metrics and advertising to keep this utility free. See our{' '}
              <Link href="/privacy-policy" className="font-semibold text-slate-800 underline hover:text-green-700">
                Privacy Policy
              </Link>{' '}
              for details.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => handleChoice('declined')}
              className="min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Essential Only
            </button>
            <button
              type="button"
              onClick={() => handleChoice('accepted')}
              className="min-h-[44px] px-4 py-2 rounded-lg bg-green-600 text-xs sm:text-sm font-semibold text-white hover:bg-green-700 transition-colors shadow-sm"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
