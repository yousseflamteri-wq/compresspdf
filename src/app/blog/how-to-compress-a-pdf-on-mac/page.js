import Link from 'next/link';
import { siteName, siteUrl, buildMetadata } from '../../../lib/siteConfig';

export const metadata = buildMetadata({
  title: 'How to Compress a PDF on Mac Without Preview Blurring Text',
  description:
    "Compress a PDF on Mac without blurry text. Learn why Preview's Quartz filter hurts fonts and how to shrink files cleanly in Safari or Pages.",
  path: '/blog/how-to-compress-a-pdf-on-mac',
  type: 'article',
  publishedTime: '2026-10-14',
  modifiedTime: '2026-10-17',
});

export default function CompressPdfOnMacPage() {
  const guideUrl = `${siteUrl}/blog/how-to-compress-a-pdf-on-mac`;
  const guideTitle = 'How to Compress a PDF on Mac Without Preview Blurring Text';
  const guideDescription =
    'Detailed guide on reducing PDF file sizes on macOS. Explains Apple Preview Quartz filter limitations and practical solutions for sharp vector retention.';

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
        name: 'Compress PDF on Mac',
        item: guideUrl,
      },
    ],
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compress a PDF on Mac Without Preview Blurring Text',
    description: guideDescription,
    image: `${siteUrl}/og-image.png`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Method 1: Modern Client-Side In-Browser Compression (Recommended)',
        text: 'Visit compresspdf.online in Safari, drop your document, choose the Recommended preset, and click Compress. The document is processed locally on your Mac without transferring data across the network.',
      },
      {
        '@type': 'HowToStep',
        name: 'Method 2: Export Cleanly from Pages or Keynote',
        text: 'Open your document in Pages, go to File > Export To > PDF, and set Image Quality to Good instead of Best. The Good setting applies standard JPEG encoding to photos while leaving text vectors pristine.',
      },
      {
        '@type': 'HowToStep',
        name: 'Method 3: Creating a Custom Quartz Filter via ColorSync Utility',
        text: 'Open ColorSync Utility, click the Filters tab, create a new filter, add an Image Sampling component, and set Resolution to 150 DPI and Quality to Mid or High.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
            Mac Guide
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          How to Compress a PDF on Mac Without Preview Blurring Text
        </h1>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <time dateTime="2026-10-17" className="tabular-nums">Updated October 17, 2026</time>
          <span aria-hidden="true">•</span>
          <span>4 min read</span>
          <span aria-hidden="true">•</span>
          <span className="text-green-700 font-medium">macOS &amp; Preview</span>
        </div>
      </header>

      {/* Direct Functional Callout */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-1">
          Need to reduce a Mac PDF right now?
        </p>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          You can use our{' '}
          <Link href="/" className="font-bold text-green-700 underline hover:text-green-800">
            free in-browser PDF compressor
          </Link>
          . It runs directly inside Safari or Chrome on macOS via client-side WebAssembly, keeping text razor sharp while stripping heavy image bloat without server uploads.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[38px] items-center rounded-lg bg-green-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
        >
          Compress PDF on Mac Now &rarr;
        </Link>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
        <p>
          If you have ever tried to shrink a PDF document on macOS using the built-in <strong>Preview</strong> application, you have likely encountered its most frustrating flaw: the <em>Reduce File Size</em> Quartz filter destroys typography readability.
        </p>
        <p>
          While Apple Preview is one of the fastest native document viewers on any desktop operating system, its default compression profile is an artifact of early 2000s web standards. Understanding why this happens allows you to optimize documents cleanly without sacrificing readability.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          The Technical Reason Preview’s Quartz Filter Blurs Text
        </h2>
        <p>
          When you open a PDF in Preview and choose <em>File &gt; Export &gt; Quartz Filter &gt; Reduce File Size</em>, macOS applies a fixed system configuration stored deep within the CoreGraphics graphics framework. This filter enforces two destructive modifications:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>
            <strong>Aggressive JPEG Re-encoding at 72 DPI:</strong> It forces all raster images down to a maximum resolution of 72 dots per inch with heavy JPEG compression artifacts. On modern 4K and 5K Retina displays, 72 DPI appears pixelated and grainy.
          </li>
          <li>
            <strong>Font Flattening &amp; Antialiasing Loss:</strong> If a document contains transparent overlays or vector text placed over subtle background fills, Preview’s export engine frequently rasterizes whole sections into low-resolution bitmap tiles instead of retaining independent vector glyph streams.
          </li>
        </ol>
        <p>
          On already-compact files (such as digital invoices or contracts exported from Word or Pages), Preview’s filter can ironically result in a file that is <em>larger</em> than the original because it wraps low-efficiency JPEG streams around clean text.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          Method 1: Modern Client-Side In-Browser Compression (Recommended)
        </h2>
        <p>
          Modern WebAssembly and JavaScript engines in Safari and Chrome execute PDF optimization routines directly inside your computer’s RAM. This approach separates embedded photographs from text streams:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
          <li><strong>Text vectors remain intact:</strong> Font outlines stay mathematical Bézier curves. They stay sharp whether viewed at 100% or 400% zoom.</li>
          <li><strong>Images are intelligently downsampled:</strong> High-resolution photos are adjusted to 150–200 DPI—the sweet spot for crisp Retina viewing and office printing.</li>
          <li><strong>Metadata is stripped:</strong> Unused XML tags, Adobe editing histories, and unreferenced cross-reference tables are dropped.</li>
        </ul>
        <p className="text-xs text-slate-500 bg-slate-100 rounded-lg p-3">
          <strong>Steps:</strong> Visit <Link href="/" className="text-green-700 font-semibold underline">compresspdf.online</Link> in Safari, drop your document, choose the <em>Recommended</em> preset, and click Compress. The document is processed locally on your Mac without transferring data across the network.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          Method 2: Export Cleanly from Pages or Keynote
        </h2>
        <p>
          If you created the document yourself on macOS using Apple Pages or Keynote, you can prevent excessive file weight before the PDF is compiled:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Open your document in Pages.</li>
          <li>Navigate to <strong>File &gt; Export To &gt; PDF...</strong></li>
          <li>In the export dialog, click the <strong>Image Quality</strong> dropdown.</li>
          <li>Select <strong>Good</strong> instead of <em>Best</em>.</li>
        </ol>
        <p>
          The <em>Best</em> setting embeds raw, uncompressed camera files (often 8 MB to 15 MB per photo). The <em>Good</em> setting applies standard JPEG encoding to photos while leaving text vectors pristine, typically slashing the resulting PDF size by 70%.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          Method 3: Creating a Custom Quartz Filter via ColorSync Utility
        </h2>
        <p>
          If you strictly require offline macOS native utilities without opening a browser, you can construct your own custom Quartz filter:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Press <kbd className="rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-xs">Cmd + Space</kbd>, type <strong>ColorSync Utility</strong>, and press Enter.</li>
          <li>Click the <strong>Filters</strong> tab in the toolbar.</li>
          <li>Click the <strong>+</strong> icon at the bottom left to create a new filter (name it <em>Clean PDF Compression</em>).</li>
          <li>Click the disclosure arrow next to your new filter, click <strong>Add Component &gt; Image Sampling</strong>.</li>
          <li>Set Resolution to <strong>150 DPI</strong> and Quality to <strong>Mid</strong> or <strong>High</strong>.</li>
        </ol>
        <p>
          This custom filter will now appear inside Preview’s Quartz Filter dropdown during export, avoiding the extreme 72 DPI blur of Apple’s factory preset.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Summary: Choosing the Right Mac Compression Approach
          </h3>
          <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
            <table className="min-w-[500px] w-full text-left text-xs sm:text-sm text-slate-600">
              <thead>
                <tr className="border-b border-slate-200 text-slate-800">
                  <th className="pb-2 font-bold">Method</th>
                  <th className="pb-2 font-bold">Text Quality</th>
                  <th className="pb-2 font-bold">Typical Size Reduction</th>
                  <th className="pb-2 font-bold">Ease of Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Preview (Default Filter)</td>
                  <td className="py-2.5 text-red-600">Fuzzy / 72 DPI</td>
                  <td className="py-2.5 tabular-nums">70% – 90%</td>
                  <td className="py-2.5">Built-in (destructive)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">In-Browser Engine</td>
                  <td className="py-2.5 text-green-700 font-semibold">Vector crisp (Recommended mode)</td>
                  <td className="py-2.5 tabular-nums">50% – 85%</td>
                  <td className="py-2.5">Instant, zero-install</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-medium text-slate-800">Pages Export (Good)</td>
                  <td className="py-2.5 text-green-700 font-semibold">100% Vector Crisp</td>
                  <td className="py-2.5 tabular-nums">60% – 75%</td>
                  <td className="py-2.5">Native authoring only</td>
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
            href="/blog/how-to-compress-pdf-on-iphone"
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-green-600 transition-colors"
          >
            <p className="font-bold text-slate-900 mb-1">Compress on iPhone &amp; iPad</p>
            <p className="text-xs text-slate-500">Shrink documents on iOS without App Store fees.</p>
          </Link>
          <Link
            href="/blog/how-to-compress-pdf-file-size"
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-green-600 transition-colors"
          >
            <p className="font-bold text-slate-900 mb-1">Target Under 200KB or 100KB</p>
            <p className="text-xs text-slate-500">Meet strict government and job application caps.</p>
          </Link>
          <Link
            href="/blog/compress-pdf-without-adobe-acrobat"
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-green-600 transition-colors"
          >
            <p className="font-bold text-slate-900 mb-1">Compress Without Adobe Acrobat</p>
            <p className="text-xs text-slate-500">Avoid monthly subscription paywalls.</p>
          </Link>
        </div>
      </section>
    </article>
  );
}
