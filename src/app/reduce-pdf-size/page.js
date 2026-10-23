import Link from 'next/link';
import CompressPdfTool from '../../components/CompressPdfTool';
import { siteUrl, buildMetadata } from '../../lib/siteConfig';

export const metadata = buildMetadata({
  title: 'Reduce PDF Size Without Losing Quality – Free Online Tool',
  description:
    'Reduce PDF size without losing quality: keep vector text sharp while shrinking heavy photos. Free, no sign-up, and your file never leaves your browser.',
  path: '/reduce-pdf-size',
});

const faqs = [
  {
    q: 'Can you really reduce a PDF size without losing quality?',
    a: 'For most digital documents, yes — almost. Text in a PDF is usually vector data, which is tiny and stays perfectly sharp at any zoom. The bulk of the file is embedded photos. Shrinking those photos to normal screen or print resolution removes megabytes without changing how the text reads. Quality loss only becomes visible when photos are pushed far below screen resolution, which is what the Extreme preset does for strict portal limits.',
  },
  {
    q: 'Which preset keeps quality highest?',
    a: 'Low Compression. It is labelled “High quality for print” in the tool and lightly recompresses images while leaving text fonts and vector lines untouched. Use Low for portfolios, printouts, and documents with fine detail. Recommended is the balance point for email and sharing, and Extreme trades the most quality for the smallest file.',
  },
  {
    q: 'Why did my PDF go blurry in another compressor?',
    a: 'The usual cause is rasterisation: some tools rebuild every page as a flat image, so text that was once sharp vector data becomes pixels. That is also what happens with Apple Preview’s built-in Reduce File Size filter on Mac. This tool avoids that on Low and Recommended — vector text stays vector — and only uses an image fallback on Extreme when a hard size target cannot be reached any other way.',
  },
  {
    q: 'Does compressing a PDF twice damage it further?',
    a: 'Yes, repeated compression can. Each pass recompresses the photos that are already compressed, so quality drops a little more every time while the size saving gets smaller. Always compress from your original file, not from an already-compressed copy, and compare the result at 100% zoom before you download.',
  },
];

export default function ReducePdfSizePage() {
  const pageUrl = `${siteUrl}/reduce-pdf-size`;

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Reduce PDF Size Without Losing Quality',
    description:
      'Shrink a PDF by reducing heavy embedded photos while keeping vector text sharp, without uploading the file to a server.',
    image: `${siteUrl}/og-image.png`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload your PDF',
        text: 'Drag and drop your PDF into the tool above, or click to browse for it on your computer or phone.',
      },
      {
        '@type': 'HowToStep',
        name: 'Start with Low or Recommended, not Extreme',
        text: 'Choose Low Compression for print quality, or Recommended for email and sharing. Both keep text fonts and vector lines untouched and only reduce embedded photos.',
      },
      {
        '@type': 'HowToStep',
        name: 'Check the result at 100% zoom and download',
        text: 'Compare the original and compressed sizes, zoom to 100% to check that text and fine detail still read clearly, then download the smaller file.',
      },
    ],
  };

  const faqJsonLd = {
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
        name: 'Reduce PDF Size',
        item: pageUrl,
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 sm:pt-12 pb-8 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-500">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-emerald-700 transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-slate-400">/</li>
          <li className="text-slate-800 font-medium">Reduce PDF Size</li>
        </ol>
      </nav>

      <div className="text-center mb-7 sm:mb-9">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          Reduce PDF Size Without Losing Quality
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">Most of a PDF&apos;s weight is not its text — it is its photos. Shrink those, keep the text untouched, and you get a much smaller file that still reads and prints clearly. Free, no sign-up, and your file never leaves your browser.</p>
      </div>

      <CompressPdfTool />

      <p className="mt-4 text-center text-xs sm:text-sm text-slate-500">For quality, start with <strong className="text-slate-800">Low</strong> or{' '} <strong className="text-slate-800">Recommended</strong>. Only use{' '} <strong className="text-slate-800">Extreme</strong> when a portal forces a hard size limit — it trades quality for size.</p>

      <section className="mt-16 sm:mt-20 max-w-4xl mx-auto border-t border-slate-200/80 pt-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-5">
          Where PDF size actually comes from
        </h2>
        <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-600">
          <p>A PDF holds two very different kinds of content. Text, fonts, and lines drawn by Word, Google Docs, or design software are vector data: instructions for drawing letters, not pictures of them. Vector data is tiny, and it stays perfectly sharp whether you view it at 50% or 300%. The second kind is embedded photos — scanned pages, camera pictures, logos, and screenshots. A single high-resolution photo can be several megabytes, and a scanned document is effectively a photo of every page.</p>
          <p>That is why good compression feels almost free, and bad compression feels destructive. A good compressor leaves the vector layer alone and only resizes the photos to a sensible resolution for screen or print. A bad one flattens everything into images, so even plain text becomes pixels and goes soft the moment you zoom in. If a PDF you compressed elsewhere looked blurry, flattening is almost certainly what happened.</p>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            Reduce PDF size without losing quality in 3 steps
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Upload your PDF using the tool at the top of this page.</li>
            <li>Choose Low for print quality, or Recommended for email and sharing. Both preserve vector text and only reduce embedded photos.</li>
            <li>Check the compressed size, zoom to 100% to confirm text, signatures, and fine detail still read clearly, then download.</li>
          </ol>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            Which preset should you use?
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-slate-900">Low — highest quality.</strong>{' '} Best for print, portfolios, and documents with small print, stamps, or signatures. The file gets smaller, but photos stay close to their original resolution.</li>
            <li><strong className="text-slate-900">Recommended — the balance.</strong>{' '} Best for email, messaging, and general sharing. Photos drop to normal screen resolution, text stays vector and sharp, and the saving is usually large.</li>
            <li><strong className="text-slate-900">Extreme — smallest file, most trade-off.</strong>{' '} Only for a hard portal limit, such as under 200KB. It steps image sizes down aggressively and may rebuild pages as images as a fallback, so text may no longer be selectable. Use it when size matters more than quality.</li>
          </ul>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            Three habits that protect quality
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-slate-900">Always start from the original.</strong>{' '} Compressing an already-compressed file recompresses photos that are already degraded, so quality falls faster than size.</li>
            <li><strong className="text-slate-900">Check at 100%, not in a thumbnail.</strong>{' '} A thumbnail hides softness. Open the result, zoom to normal reading size, and check the smallest text on the page.</li>
            <li><strong className="text-slate-900">Do not over-compress scanned documents.</strong>{' '} Scans have no vector text to protect, so every reduction costs image detail directly. For scans, Recommended is usually the sweet spot; Extreme is a last resort for a strict limit.</li>
          </ul>
          <p>If you do have a strict limit, use the dedicated pages instead of forcing this one: see{' '} <Link href="/compress-pdf-to-200kb" className="font-semibold text-emerald-700 hover:underline">compress a PDF to 200KB for job applications</Link>{' '}or{' '} <Link href="/compress-pdf-to-100kb" className="font-semibold text-emerald-700 hover:underline">compress a PDF to 100KB for visa and government forms</Link>. And if a Mac tool blurred your text before, our guide on{' '} <Link href="/blog/how-to-compress-a-pdf-on-mac" className="font-semibold text-emerald-700 hover:underline">how to compress a PDF on Mac without blurry text</Link>{' '}explains why that happens.</p>
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
        <p className="mt-6 text-center text-sm text-slate-500">Back to the main tool?{' '} <Link href="/" className="font-semibold text-emerald-700 hover:underline">Compress a PDF online</Link>.</p>
      </section>
    </main>
  );
}
