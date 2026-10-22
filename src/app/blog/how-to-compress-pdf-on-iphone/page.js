import Link from 'next/link';
import { siteName, siteUrl, buildMetadata } from '../../../lib/siteConfig';

export const metadata = buildMetadata({
  title: 'How to Compress a PDF on iPhone and iPad for Free',
  description:
    'Compress a PDF on iPhone or iPad for free, with no App Store subscription. Use mobile Safari or the Files app to shrink PDFs in seconds.',
  path: '/blog/how-to-compress-pdf-on-iphone',
  type: 'article',
  publishedTime: '2026-10-14',
  modifiedTime: '2026-10-14',
});

export default function CompressPdfOnIPhonePage() {
  const guideUrl = `${siteUrl}/blog/how-to-compress-pdf-on-iphone`;
  const guideTitle = 'How to Shrink a PDF on iPhone and iPad Free (No App Store Subscriptions)';
  const guideDescription =
    'Practical instructions on reducing PDF file sizes on iOS and iPadOS. Uses client-side Safari processing and Apple Files Quick Actions.';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: guideTitle,
    description: guideDescription,
    image: `${siteUrl}/og-image.png`,
    datePublished: '2026-10-14',
    dateModified: '2026-10-14',
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
        name: 'Compress PDF on iPhone',
        item: guideUrl,
      },
    ],
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compress a PDF on iPhone and iPad for Free',
    description: guideDescription,
    image: `${siteUrl}/og-image.png`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Method 1: Local In-Browser Processing in Mobile Safari (Recommended)',
        text: 'Open Safari and visit compresspdf.online, tap the upload area and choose a file from On My iPhone or iCloud Drive, select the Recommended preset (or Extreme for a strict portal cap like 200 KB), tap Compress PDF, wait 2-4 seconds for local processing, then tap Download Compressed PDF.',
      },
      {
        '@type': 'HowToStep',
        name: 'Method 2: Native iOS Files App Quick Actions',
        text: 'Open the Files app, navigate to the folder containing your PDF, long-press the PDF thumbnail, tap Quick Actions, then tap Optimize File Size. iOS generates a second, downscaled version of the PDF alongside the original.',
      },
      {
        '@type': 'HowToStep',
        name: 'How to Check Exact PDF File Size on iOS',
        text: 'In the Files app, long-press the compressed document, tap Get Info, and look at the Size field near the top. If the file is still above the required limit, re-run it through compresspdf.online with the Extreme preset.',
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
            iPhone &amp; iPad
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          How to Shrink a PDF on iPhone and iPad Free (No App Store Subscriptions)
        </h1>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <time dateTime="2026-10-14" className="tabular-nums">Updated October 14, 2026</time>
          <span aria-hidden="true">•</span>
          <span>3 min read</span>
          <span aria-hidden="true">•</span>
          <span className="text-green-700 font-medium">iOS &amp; iPadOS</span>
        </div>
      </header>

      {/* Direct Functional Callout */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-1">
          Compressing a mobile file right now?
        </p>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          You do not need to install anything from the App Store. Tap into our{' '}
          <Link href="/" className="font-bold text-green-700 underline hover:text-green-800">
            free mobile PDF compressor
          </Link>
          . It runs directly inside Safari on iOS using your phone&apos;s RAM without uploading your documents to remote servers.
        </p>
        <Link
          href="/"
          className="inline-flex min-h-[38px] items-center rounded-lg bg-green-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-green-700 transition-colors shadow-sm"
        >
          Open iPhone Compressor Tool &rarr;
        </Link>
      </div>

      <div className="space-y-6 text-sm sm:text-base leading-relaxed text-slate-700">
        <p>
          Searching the iOS App Store for &quot;compress PDF&quot; reveals dozens of utility apps. Nearly all of them employ the same predatory monetization tactic: they gate basic file downsizing behind a &quot;3-day free trial&quot; that auto-renews at $4.99 to $9.99 per week.
        </p>
        <p>
          Paying an ongoing subscription simply to shrink an occasional tax form, lease agreement, or resume on your phone is completely unnecessary. Modern iOS versions provide built-in system tools and support browser-based execution that can downscale documents safely for free.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          Method 1: Local In-Browser Processing in Mobile Safari (Recommended)
        </h2>
        <p>
          Mobile Safari on iOS 16 and later includes robust WebAssembly and HTML5 canvas APIs. This allows web applications to process documents entirely in local phone memory:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Open Safari and visit <Link href="/" className="text-green-700 font-semibold underline">compresspdf.online</Link>.</li>
          <li>Tap the upload area and select <strong>Choose File</strong>.</li>
          <li>Tap <strong>Browse</strong> to access files stored in your <em>On My iPhone</em> or <em>iCloud Drive</em> folder (or select a scanned PDF from your Photos app if saved as a document).</li>
          <li>Select the <strong>Recommended</strong> compression level (or <strong>Extreme</strong> if you must meet a strict portal cap like 200 KB).</li>
          <li>Tap <strong>Compress PDF</strong>, wait 2–4 seconds for local processing, then tap <strong>Download Compressed PDF</strong> to save it back to your device.</li>
        </ol>
        <p className="text-xs text-slate-500 bg-slate-100 rounded-lg p-3">
          <strong>Security note:</strong> Because processing executes in Safari tab memory, confidential records—such as bank slips or medical forms—never travel across cellular networks or Wi-Fi to a remote server.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          Method 2: Native iOS Files App Quick Actions
        </h2>
        <p>
          Apple added a native quick-compression feature directly inside the iOS <strong>Files</strong> app on modern iOS versions:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Open the <strong>Files</strong> app on your iPhone or iPad.</li>
          <li>Navigate to the folder containing your PDF.</li>
          <li>Press and hold (long-press) the PDF thumbnail until the context menu appears.</li>
          <li>Tap <strong>Quick Actions</strong>.</li>
          <li>Tap <strong>Optimize File Size</strong>.</li>
        </ol>
        <p>
          iOS will generate a second, downscaled version of the PDF alongside your original file.
        </p>

        <h3 className="text-base font-bold text-slate-900 mt-4 mb-2">
          Limitations of the Native Files App Method
        </h3>
        <p>
          While convenient, Apple’s native Quick Action has two drawbacks:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
          <li><strong>No Preset Controls:</strong> You cannot choose target quality or image dimensions. If the native optimization drops a 12 MB file down to 1.8 MB, but your upload portal has a 200 KB ceiling, the native tool cannot compress further.</li>
          <li><strong>Potential Text Softening on Scanned Forms:</strong> On paper documents captured with the iPhone camera, the Quick Action applies fixed JPEG compression that can make fine printed disclaimers slightly blurry.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
          How to Check Exact PDF File Size on iOS
        </h2>
        <p>
          Before uploading a PDF to an email or government form, verify the exact file weight on your device:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
          <li>In the <strong>Files</strong> app, long-press the compressed document.</li>
          <li>Tap <strong>Get Info</strong>.</li>
          <li>Look at the <strong>Size</strong> field near the top. It displays the exact size in KB or MB (e.g., <em>184 KB on disk</em>).</li>
        </ol>
        <p>
          If your file is still above the required limit, re-run it through <Link href="/" className="text-green-700 font-semibold underline">compresspdf.online</Link> with the <em>Extreme</em> preset enabled to force stubborn images below the cutoff threshold.
        </p>
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
            <p className="text-xs text-slate-500">Why Apple Preview blurs text and how to avoid it.</p>
          </Link>
          <Link
            href="/blog/how-to-compress-pdf-file-size"
            className="rounded-lg border border-slate-200 bg-white p-4 hover:border-green-600 transition-colors"
          >
            <p className="font-bold text-slate-900 mb-1">Target Under 200KB or 100KB</p>
            <p className="text-xs text-slate-500">Meet strict upload cutoffs on mobile.</p>
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
