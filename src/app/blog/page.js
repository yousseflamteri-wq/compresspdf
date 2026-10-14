import Link from 'next/link';
import { siteName, siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: {
    absolute: `PDF Optimization Guides & Tutorials – ${siteName}`,
  },
  description:
    'Practical, engineering-focused guides on reducing PDF file sizes across macOS, iOS, Windows, and web browsers without paying for expensive subscriptions.',
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
};

const guides = [
  {
    slug: 'how-to-compress-pdf-file-size',
    title: 'How to Compress a PDF to Under 200KB or 100KB for Upload Portals',
    desc: 'Government, job, and visa portals enforce strict file size caps. Learn how vector text versus scanned pages affect file weight, and how to reach under 200 KB safely.',
    date: '2026-10-14',
    readTime: '4 min read',
    topic: 'File Size Targets',
  },
  {
    slug: 'how-to-compress-a-pdf-on-mac',
    title: 'How to Compress a PDF on Mac Without Preview Blurring Text',
    desc: 'Why macOS Preview’s Quartz "Reduce File Size" filter degrades typography and produces fuzzy text, and how to downscale documents cleanly in Safari or Pages.',
    date: '2026-10-14',
    readTime: '4 min read',
    topic: 'macOS & Safari',
  },
  {
    slug: 'how-to-compress-pdf-on-iphone',
    title: 'How to Shrink a PDF on iPhone and iPad Free (No App Store Subscriptions)',
    desc: 'Avoid predatory weekly subscription apps in the App Store. Use the native iOS Files app Quick Actions or local in-browser memory compression directly in mobile Safari.',
    date: '2026-10-14',
    readTime: '3 min read',
    topic: 'iOS & iPadOS',
  },
  {
    slug: 'compress-pdf-without-adobe-acrobat',
    title: 'How to Compress a PDF Without Adobe Acrobat Pro',
    desc: 'A breakdown of why Adobe charges $20/month for basic document resampling, how cloud sign-in walls work, and how modern browser WebAssembly tools perform identical tasks locally.',
    date: '2026-10-14',
    readTime: '5 min read',
    topic: 'Tools & Cost Savings',
  },
];

export default function BlogHubPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'PDF Compression & Document Optimization Guides',
    description:
      'Engineering and practical guides on shrinking PDF documents locally without server uploads.',
    url: `${siteUrl}/blog`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: guides.map((g, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/blog/${g.slug}`,
        name: g.title,
      })),
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Guides',
        item: `${siteUrl}/blog`,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-500">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-green-700 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">/</li>
          <li className="font-semibold text-slate-800" aria-current="page">
            Guides
          </li>
        </ol>
      </nav>

      <div className="mb-10 pb-6 border-b border-slate-200">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          PDF Compression &amp; Format Guides
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
          Technical breakdowns and pragmatic instructions on shrinking document file sizes, meeting portal upload thresholds, and preserving typography without paid subscriptions.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-slate-300 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
                <span className="font-semibold text-green-700">{guide.topic}</span>
                <span className="tabular-nums">{guide.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-snug mb-2">
                <Link
                  href={`/blog/${guide.slug}`}
                  className="hover:text-green-700 transition-colors"
                >
                  {guide.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {guide.desc}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 tabular-nums">
                Updated {guide.date}
              </span>
              <Link
                href={`/blog/${guide.slug}`}
                className="inline-flex items-center text-xs font-bold text-green-700 hover:text-green-800 transition-colors"
              >
                Read Guide &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>

      <aside className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
        <h2 className="text-base font-bold text-slate-900 mb-1">
          Need to compress a PDF right now?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-md mx-auto">
          Our in-browser compression utility runs 100% locally on your device. Zero server uploads, no sign-ups, and completely free.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
        >
          Open PDF Compressor Tool
        </Link>
      </aside>
    </main>
  );
}