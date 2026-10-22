import Link from 'next/link';
import CompressPdfTool from '../components/CompressPdfTool';
import { siteUrl } from '../lib/siteConfig';

export const metadata = {
  title: {
    absolute: 'Compress PDF Online Free – Reduce PDF Size to 200KB or Less',
  },
  description:
    'Compress PDF files in your browser. Get under 200KB or 100KB for job portals, visa applications, and email with no server uploads.',
  alternates: {
    canonical: siteUrl,
  },
};

const guides = [
  {
    slug: 'how-to-compress-pdf-file-size',
    title: 'How to Compress a PDF Under 200KB or 100KB',
    desc: 'Why phone camera scans are so large, and how to shrink them for job and visa portals.',
  },
  {
    slug: 'how-to-compress-a-pdf-on-mac',
    title: 'How to Compress a PDF on Mac Without Blurry Text',
    desc: 'Why Apple Preview’s Reduce File Size filter makes text fuzzy, and how to shrink files cleanly.',
  },
  {
    slug: 'how-to-compress-pdf-on-iphone',
    title: 'How to Shrink a PDF on iPhone & iPad for Free',
    desc: 'Skip paid App Store subscriptions using Safari or the built-in iOS Files app.',
  },
  {
    slug: 'compress-pdf-without-adobe-acrobat',
    title: 'How to Compress a PDF Without Adobe Acrobat',
    desc: 'Reduce document file size in your browser without paying for monthly software plans.',
  },
];

const faqs = [
  {
    q: 'How can I compress a PDF to under 200KB or 100KB for application portals?',
    a: 'Select the Extreme <200KB preset. Resumes and text documents exported from Word or Google Docs easily drop below 100 KB while keeping text sharp. If your file is a phone scan or photo PDF, our tool automatically converts the pages into lightweight images so you can pass strict portal limits.',
  },
  {
    q: 'Does compressing a PDF make the text blurry?',
    a: 'No. On Low and Recommended modes, text fonts and vector lines are not touched at all, so letters stay sharp at any zoom level. Only heavy embedded photos are resized to normal screen and print resolution.',
  },
  {
    q: 'Is it safe to compress private documents like bank statements or IDs?',
    a: 'Yes. Most PDF websites upload your files to their cloud servers. Our tool runs locally inside your web browser—your documents never leave your computer or phone.',
  },
  {
    q: 'Why did my PDF size barely change?',
    a: 'If a PDF only contains plain text or images that are already compressed, there is very little extra weight left to remove. Rather than ruining the quality of your file, we keep your original intact.',
  },
  {
    q: 'Does this work on iPhone and Android phones?',
    a: 'Yes. You can compress files directly in mobile Safari or Chrome without installing any apps.',
  },
];

export default function HomePage() {
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Compress PDF Online',
    url: siteUrl,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList:
      'Compress PDF to under 200KB, preserve vector text, process files locally in browser',
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 pb-8 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />

      {/* Hero Header Matching Mockup */}
      <div className="text-center mb-7 sm:mb-9">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          Compress PDF Online
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-500">
          Reduce PDF file size while keeping it crisp and professional.
        </p>
      </div>

      {/* Main Compressor Tool */}
      <CompressPdfTool />

      {/* =====================================================================
          BENTO GRID SECTION (Matches Mockup A, B, C Cards)
      ===================================================================== */}
      <section className="mt-16 sm:mt-20 max-w-4xl mx-auto">
        {/* Split Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
            Smart Compression. Clear Results.
          </h2>
          <p className="text-xs text-slate-500">
            Smaller files, same quality. Built for speed and clarity.
          </p>
        </div>

        {/* Top Row: Card A + Card B */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* CARD A: Massive Size Reduction */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden grid grid-cols-1 sm:grid-cols-12 shadow-2xs">
            {/* Left Visual Area (7 Cols) */}
            <div className="sm:col-span-7 p-6 flex flex-col justify-between bg-white">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Original
                  </span>
                  <span className="text-[9px] text-slate-400 block">Example: scanned phone PDF</span>
                  <div className="text-xl sm:text-2xl font-extrabold text-slate-950 tabular-nums mt-0.5">
                    14.2 <span className="text-xs font-bold">MB</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-medium text-slate-500 block">
                    Compressed
                  </span>
                  <div className="flex items-center justify-end gap-1.5 mt-0.5">
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-600 tabular-nums">
                      184 KB
                    </span>
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 tabular-nums">
                      (-98%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Curved Dashed Wave Arrow */}
              <div className="my-4 flex items-center justify-center">
                <svg className="w-40 h-10" viewBox="0 0 160 40" fill="none">
                  <path
                    d="M 10 20 Q 45 2, 80 22 T 145 18"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    fill="none"
                  />
                  <polygon points="142,14 150,17 144,23" fill="#16a34a" />
                </svg>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/60">
                  <div className="h-full w-[38%] rounded-full bg-emerald-600" />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>0%</span>
                  <span>Complete</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            {/* Right Hatch Sidebar (5 Cols) */}
            <div className="sm:col-span-5 border-t sm:border-t-0 sm:border-l border-slate-200/80 bg-hatch p-5 flex flex-col justify-center">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-[11px] font-bold text-emerald-700 mb-3">
                A
              </span>
              <h3 className="font-bold text-slate-950 text-sm leading-snug mb-1.5">
                Massive Size Reduction
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Shrink PDFs by up to 98% without compromising readability.
              </p>
            </div>
          </div>

          {/* CARD B: Quality Preserved */}
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden grid grid-cols-1 sm:grid-cols-12 shadow-2xs">
            {/* Left Radar Visual Area (7 Cols) */}
            <div className="sm:col-span-7 p-5 relative flex items-center justify-center min-h-[210px] bg-white overflow-hidden">
              {/* Concentric Dashed Rings */}
              <div className="absolute h-40 w-40 rounded-full border border-dashed border-slate-200" />
              <div className="absolute h-28 w-28 rounded-full border border-slate-200/90" />
              <div className="absolute h-16 w-16 rounded-full border border-slate-200" />

              {/* Orbit Green Dots */}
              <span className="absolute top-12 right-12 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="absolute bottom-12 left-12 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="absolute top-1/2 right-7 h-1.5 w-1.5 rounded-full bg-emerald-500" />

              {/* Center Black Circle with Inward Arrows */}
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-slate-950 text-white shadow-md">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v6m0 0-2.5-2.5M12 9l2.5-2.5M12 21v-6m0 0-2.5 2.5M12 15l2.5 2.5M3 12h6m0 0-2.5-2.5M9 12 6.5 14.5M21 12h-6m0 0 2.5-2.5M15 12l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Floating Pill: 100% Vector */}
              <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 rounded-full border-2 border-slate-800" />
                <span>100% Vector (Low &amp; Recommended)</span>
              </div>

              {/* Floating Pill: 150 DPI */}
              <div className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold text-slate-800 shadow-2xs">
                <span className="h-2 w-2 border border-dashed border-slate-600" />
                <span>150 DPI target</span>
              </div>
            </div>

            {/* Right Hatch Sidebar (5 Cols) */}
            <div className="sm:col-span-5 border-t sm:border-t-0 sm:border-l border-slate-200/80 bg-hatch p-5 flex flex-col justify-center">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-[11px] font-bold text-emerald-700 mb-3">
                B
              </span>
              <h3 className="font-bold text-slate-950 text-sm leading-snug mb-1.5">
                Quality Preserved
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Advanced vector preservation and smart downsampling maintain clarity.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row: Card C (Clean Workflow) */}
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xs">
          {/* Left 3-Step Diagram (9 Cols) */}
          <div className="md:col-span-9 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-around gap-6 bg-white">
            {/* Step 1: Input Scan */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full border border-slate-200 bg-slate-50/60 flex items-center justify-center mb-3 shadow-2xs">
                <svg className="h-7 w-7 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="8" y1="14" x2="16" y2="14" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-950">Input Scan</div>
              <div className="text-[11px] text-slate-500 mt-0.5">High-resolution PDF</div>
            </div>

            {/* Dashed Arrow 1 */}
            <div className="hidden sm:flex items-center text-slate-300">
              <div className="w-12 border-t border-dashed border-slate-300" />
              <span className="text-slate-400 text-xs -ml-1">&#9656;</span>
            </div>

            {/* Step 2: Canvas Rebuild */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full border border-slate-200 bg-slate-50/60 flex items-center justify-center mb-3 shadow-2xs">
                <div className="h-7 w-7 border-2 border-dashed border-emerald-600 rounded-xs flex items-center justify-center">
                  <div className="h-3.5 w-3.5 border border-slate-300" />
                </div>
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-950">Canvas Rebuild</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Optimize &amp; Compress</div>
            </div>

            {/* Dashed Arrow 2 */}
            <div className="hidden sm:flex items-center text-slate-300">
              <div className="w-12 border-t border-dashed border-slate-300" />
              <span className="text-slate-400 text-xs -ml-1">&#9656;</span>
            </div>

            {/* Step 3: 178 KB Output */}
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-full border border-slate-200 bg-slate-50/60 flex items-center justify-center mb-3 shadow-2xs">
                <div className="relative flex flex-col items-center">
                  <svg className="h-7 w-7 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="-mt-2.5 rounded bg-emerald-600 px-1.5 py-0.2 text-[8px] font-bold text-white">
                    178KB
                  </span>
                </div>
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-950">178 KB Output</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Ready to download</div>
            </div>
          </div>

          {/* Right Hatch Sidebar (3 Cols) */}
          <div className="md:col-span-3 border-t md:border-t-0 md:border-l border-slate-200/80 bg-hatch p-5 flex flex-col justify-center">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-[11px] font-bold text-emerald-700 mb-3">
              C
            </span>
            <h3 className="font-bold text-slate-950 text-sm leading-snug mb-1.5">
              Clean Workflow
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              From scan to optimized output in three precise steps.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          GUIDES & FAQ SECTIONS (Preserves Internal Links & SEO Equity)
      ===================================================================== */}
      <section className="mt-16 sm:mt-20 max-w-4xl mx-auto border-t border-slate-200/80 pt-12">
        <div className="flex items-center justify-between gap-2 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight">
            PDF Compression Guides
          </h2>
          <Link
            href="/blog"
            className="text-xs font-semibold text-emerald-700 hover:underline shrink-0"
          >
            All guides &rarr;
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/blog/${g.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-400 transition-colors flex flex-col justify-between shadow-2xs"
            >
              <div>
                <h3 className="font-bold text-slate-950 text-sm sm:text-base mb-1 group-hover:text-emerald-700 transition-colors">
                  {g.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{g.desc}</p>
              </div>
              <span className="mt-3 text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                Read guide &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-4xl mx-auto border-t border-slate-200/80 pt-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-5">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-slate-200/80 rounded-2xl border border-slate-200 bg-white px-5 shadow-2xs">
          {faqs.map((f) => (
            <div key={f.q} className="py-4 sm:py-5">
              <h3 className="font-bold text-slate-950 text-sm sm:text-base">
                {f.q}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
