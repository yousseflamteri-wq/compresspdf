import Link from 'next/link';
import { siteName, mainSiteName, mainSiteUrl, buildMetadata } from '../../lib/siteConfig';

export const metadata = buildMetadata({
  title: `About Us – ${siteName}`,
  description: `Why we built ${siteName}: a fast, client-side in-browser PDF compressor that runs completely on your own device hardware.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14 text-slate-800">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-6">About {siteName}</h1>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
        <p>
          Most online PDF utilities require you to upload personal documents to their cloud servers. Even when services promise automatic deletion within an hour, sending financial statements, medical records, or signed legal agreements across the internet introduces unnecessary exposure.
        </p>

        <p>
          We built <strong>{siteName}</strong> as an engineering alternative. Instead of transferring data across remote networks, our compressor executes directly inside your web browser’s memory sandbox using WebAssembly and client-side JavaScript.
        </p>

        <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 mb-3">Core Engineering Principles:</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            <li><strong>Zero Server Uploads:</strong> Files are read, decompressed, and rewritten in your browser tab memory. Your documents never touch our hosting infrastructure.</li>
            <li><strong>Dual-Engine Optimization:</strong> Digital text PDFs undergo a vector-preserving smart pass (`pdf-lib`) so text stays sharp at any zoom. Scanned documents utilize canvas-assisted resampling (`pdf.js`) to hit strict portal size limits.</li>
            <li><strong>Zero Artificial Limits:</strong> No account registration, no daily usage limits, and no watermarks stamped onto your pages.</li>
          </ul>
        </div>

        <p>
          Need to merge, split, or convert documents with the exact same privacy model? Explore our companion toolbox at{' '}
          <a
            href={mainSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-700 underline hover:text-green-800"
          >
            {mainSiteName}
          </a>.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-green-700 shadow-sm"
          >
            Open PDF Compressor &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}