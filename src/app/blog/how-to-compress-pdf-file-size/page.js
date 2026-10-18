import Link from 'next/link';
import { siteName, siteUrl, buildMetadata } from '../../../lib/siteConfig';

export const metadata = buildMetadata({
  title: 'How to Compress a PDF to Under 200KB or 100KB',
  description:
    'Meet strict portal limits: compress PDF to 200KB or 100KB for job applications and visa forms. Works on scanned and digital documents.',
  path: '/blog/how-to-compress-pdf-file-size',
  type: 'article',
  publishedTime: '2026-10-14',
  modifiedTime: '2026-10-17',
});

export default function CompressPdfFileSizePage() {
  const guideUrl = `${siteUrl}/blog/how-to-compress-pdf-file-size`;
  const guideTitle = 'How to Compress a PDF to Under 200KB or 100KB for Upload Portals';
  const guideDescription =
    'Practical engineer guide on reducing PDF files to under 200 KB or 100 KB. Covers vector vs. scanned documents, DPI adjustments, and grayscale scanning techniques.';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: guideTitle,
    description: guideDescription,
    image: `${siteUrl}/og-image.png`,
    datePublished: '2026-10-14',
    dateModified: '2026-10-17',
    author: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': guideUrl,
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
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Compress Under 200KB or 100KB',
        item: guideUrl,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:py-14 text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
          <li>
            <Link href="/blog" className="hover:text-green-700 transition-colors">
              Guides
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">/</li>
          <li className="font-semibold text-slate-800" aria-current="page">
            Under 200KB or 100KB
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          How to Compress a PDF to Under 200KB or 100KB for Upload Portals
        </h1>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <time dateTime="2026-10-17" className="tabular-nums">Updated October 17, 2026</time>
          <span aria-hidden="true">•</span>
          <span>4 min read</span>
          <span aria-hidden="true">•</span>
          <span className="text-green-700 font-medium">Portal Guidelines</span>
        </div>
      </header>

      {/* Direct Functional Callout */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-1">
          Need to hit 200 KB or 100 KB right now?
        </p>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          Drop your document into our{' '}
          <Link href="/" className="font-bold text-green-700 underline hover:text-green-800">
            free in-browser PDF compressor
          </Link>{' '}
          and select the <strong>Extreme</strong> preset. It iteratively shrinks image dimensions and enables smart fallback rebuilds to squeeze stubborn files below strict portal cutoffs.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[38px] items-center rounded-lg bg-green-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
        >
          Compress to Under 200KB Now &rarr;
        </Link>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
        <p>
          Job application platforms (such as Workday and Taleo), government visa portals, university admission forms, and passport offices frequently enforce strict upload caps—most commonly <strong>200 KB</strong>, <strong>300 KB</strong>, or even <strong>100 KB</strong>.
        </p>
        <p>
          Uploading a file just 2 KB over the threshold results in a rejection error: <em>&quot;File size exceeds the maximum allowed limit of 200 KB.&quot;</em> To get your document below the cap without making the text illegible, you need to understand where the file weight comes from.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          Vector Text vs. Scanned Images: Why PDF Sizes Vary
        </h2>
        <p>
          PDFs fall into two distinct structural categories:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-1">1. Digital Vector Documents</h3>
            <p className="text-slate-600 leading-relaxed">
              Created directly in Microsoft Word, Google Docs, or Canva and exported as PDF. Text characters are stored as mathematical glyph vectors. A 5-page resume with digital text naturally weighs only <strong>40 KB to 90 KB</strong> unless high-res decorative photos are embedded.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-1">2. Camera &amp; Flatbed Scans</h3>
            <p className="text-slate-600 leading-relaxed">
              Physical paper documents photographed with a smartphone or scanned on an office photocopier. These do not contain digital text; they are massive 12-megapixel color photos wrapped inside a PDF wrapper, frequently ballooning to <strong>5 MB to 15 MB</strong> per page.
            </p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          Step-by-Step Strategy to Reach Under 200 KB
        </h2>
        <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700">
          <li>
            <strong>Use the Extreme Preset:</strong> On <Link href="/" className="text-green-700 font-semibold underline">compresspdf.online</Link>, select <strong>Extreme</strong>. Our engine runs an iterative resampling algorithm that steps down image dimensions (from 2800px down to 1100px, 850px, and 650px) until the compressed output hits under 200 KB or image quality drops below readable thresholds.
          </li>
          <li>
            <strong>Let the Automatic Fallback Run:</strong> No extra setting is needed. If stubborn embedded fonts or non-standard color profiles keep the vector pass above 200 KB, Extreme mode automatically switches to a fallback pass that rebuilds each page as a web-optimized image. Because the pages become images, text is no longer vector-sharp when you zoom in, so try <strong>Recommended</strong> first if your portal limit allows it.
          </li>
          <li>
            <strong>Delete Unnecessary Blank Pages:</strong> Scanners often append blank pages or terms pages to the end of a document. Even a blank scanned page with background paper grain can add 400 KB. Remove it before compressing.
          </li>
        </ol>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          How to Squeeze Files Under 100 KB
        </h2>
        <p>
          Meeting a 100 KB limit for a multi-page document requires aggressive optimization:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Convert Color Scans to 8-Bit Grayscale:</strong> Color information represents approximately 66% of the raw byte data in a digital image. Converting a color scan to clean grayscale immediately sheds over half the file weight without affecting text readability.
          </li>
          <li>
            <strong>Export CVs Directly from Word / Google Docs:</strong> Never print your resume on paper and scan it back into your computer with a phone camera. Export directly from your word processor via <em>File &gt; Download &gt; PDF Document (.pdf)</em>. Clean vector text naturally complies with sub-100 KB ceilings.
          </li>
          <li>
            <strong>Downscale to 150 DPI:</strong> While commercial printing demands 300 DPI, human reviewers viewing job applications on standard computer monitors only require 150 DPI.
          </li>
        </ul>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Target Size Benchmark by Document Type
          </h3>
          <div className="overflow-x-auto -mx-1 sm:mx-0">
            <table className="min-w-[500px] w-full text-left text-xs sm:text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 text-slate-800">
                  <th className="pb-2 font-bold">Document Type</th>
                  <th className="pb-2 font-bold">Uncompressed Size</th>
                  <th className="pb-2 font-bold">Recommended Mode</th>
                  <th className="pb-2 font-bold text-green-700">Extreme Mode Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">1–2 Page CV (Digital Text)</td>
                  <td className="py-2.5 tabular-nums">150 KB – 800 KB</td>
                  <td className="py-2.5 tabular-nums">&lt; 80 KB</td>
                  <td className="py-2.5 tabular-nums font-bold text-green-700">&lt; 50 KB</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Passport / ID Card Phone Scan</td>
                  <td className="py-2.5 tabular-nums">3 MB – 8 MB</td>
                  <td className="py-2.5 tabular-nums">400 KB – 900 KB</td>
                  <td className="py-2.5 tabular-nums font-bold text-green-700">&lt; 180 KB</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Multi-page Bank Statement</td>
                  <td className="py-2.5 tabular-nums">2 MB – 5 MB</td>
                  <td className="py-2.5 tabular-nums">350 KB – 600 KB</td>
                  <td className="py-2.5 tabular-nums font-bold text-green-700">&lt; 195 KB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related Guides Section */}
      <section className="mt-12 pt-8 border-t border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Related Optimization Guides</h2>
        <div className="grid gap-4 sm:grid-cols-3 text-xs sm:text-sm">
          <Link
            href="/blog/how-to-compress-a-pdf-on-mac"
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-green-600 transition-colors"
          >
            <p className="font-bold text-slate-900 mb-1">Compress on Mac</p>
            <p className="text-xs text-slate-500">Fix Preview blur when shrinking files.</p>
          </Link>
          <Link
            href="/blog/how-to-compress-pdf-on-iphone"
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-green-600 transition-colors"
          >
            <p className="font-bold text-slate-900 mb-1">Compress on iPhone</p>
            <p className="text-xs text-slate-500">Free mobile downsizing methods.</p>
          </Link>
          <Link
            href="/blog/compress-pdf-without-adobe-acrobat"
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-green-600 transition-colors"
          >
            <p className="font-bold text-slate-900 mb-1">Compress Without Adobe</p>
            <p className="text-xs text-slate-500">Skip monthly Adobe subscriptions.</p>
          </Link>
        </div>
      </section>
    </article>
  );
}