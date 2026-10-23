import Link from 'next/link';
import CompressPdfTool from '../../components/CompressPdfTool';
import { siteUrl, buildMetadata } from '../../lib/siteConfig';

export const metadata = buildMetadata({
  title: 'Compress PDF to 100KB for Visa & Government Forms – Free Online Tool',
  description:
    'Try to get a PDF under 100KB for visa, government, and university portals. Free, no sign-up, and your file never leaves your browser.',
  path: '/compress-pdf-to-100kb',
});

const faqs = [
  {
    q: 'Can this tool guarantee a PDF under 100KB?',
    a: 'No tool can guarantee that for every file, and you should be wary of any site that claims otherwise. A short digital document usually drops well under 100KB. A long, colour, multi-page scan may not reach 100KB without losing readability, even on the strongest preset. This page shows you how to get as close as possible and what to trim if you are still over.',
  },
  {
    q: 'Is there a dedicated 100KB button in the tool?',
    a: 'No. Use the Extreme <200KB preset: it steps image sizes down and tries to hit under 200KB, and many digital files end up well under 100KB on that pass. Check the compressed size the tool shows you — if it is still over 100KB, use the trimming steps below and run it again.',
  },
  {
    q: 'Will a PDF under 100KB still be accepted if the text looks softer?',
    a: 'Usually yes, as long as the text is still legible and the file opens normally. Portals check file size and format, not print quality. Do not shrink a document so far that names, dates, or stamps become unreadable — if that happens, remove pages or rescan in grayscale instead of pushing compression further.',
  },
  {
    q: 'Is it safe to compress a passport scan or visa document here?',
    a: 'Yes. This tool runs entirely in your browser, so a passport scan, visa form, or certificate is never uploaded to a server. Nothing is stored, and there is no account to create.',
  },
];

export default function CompressPdfTo100kbPage() {
  const pageUrl = `${siteUrl}/compress-pdf-to-100kb`;

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compress a PDF to 100KB for a Visa or Government Form',
    description:
      'Reduce a PDF toward under 100KB for strict visa, government, and university portals, without uploading it to a server.',
    image: `${siteUrl}/og-image.png`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload your PDF',
        text: 'Drag and drop your PDF into the tool above, or click to browse for it on your computer or phone.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose the Extreme preset',
        text: 'Select Extreme <200KB. It steps image sizes down and falls back to rebuilding pages as images if vector compression alone cannot reach its target. Many digital files land well under 100KB on this pass.',
      },
      {
        '@type': 'HowToStep',
        name: 'Check the size, trim if needed, and download',
        text: 'Compare the original and compressed sizes shown by the tool. If the result is still over 100KB, remove blank or unneeded pages and run it again, then download the smaller file.',
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
        name: 'Compress PDF to 100KB',
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
          <li className="text-slate-800 font-medium">Compress PDF to 100KB</li>
        </ol>
      </nav>

      <div className="text-center mb-7 sm:mb-9">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          Compress PDF to 100KB for Visa &amp; Government Forms
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
          Some portals will not accept a file even one kilobyte over 100KB.
          Use the tool below to shrink your document as far as it will
          reasonably go — free, no sign-up, and your file never leaves
          your device.
        </p>
      </div>

      <CompressPdfTool />

      <p className="mt-4 text-center text-xs sm:text-sm text-slate-500">
        Honest note: there is no separate 100KB button. Use{' '}
        <strong className="text-slate-800">Extreme &lt;200KB</strong> — it is
        the strongest preset, and many digital files land well under 100KB
        on that pass. Aim for about 90KB, not exactly 100KB, to leave a margin.
      </p>

      <section className="mt-16 sm:mt-20 max-w-4xl mx-auto border-t border-slate-200/80 pt-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-5">
          Why some portals set a 100KB limit
        </h2>
        <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-600">
          <p>
            A 100KB cap is stricter than the 200KB limit used by many job
            portals, and it shows up most often on government, visa, and
            university systems that were built to handle huge numbers of
            small uploads. The limit is rarely about the length of your
            document. A one-page form should be tiny — it only becomes large
            when it is a high-resolution colour scan, with every page stored
            as a photograph.
          </p>
          <p>
            That distinction decides how realistic 100KB is for your file. A
            document exported from Word, Google Docs, or a government form
            site is mostly vector text, so it often compresses to 30KB to
            80KB without any visible change. A phone scan of the same
            document starts at several megabytes per page, so reaching 100KB
            may mean accepting softer images, or removing pages that the
            portal did not ask for. Either way, check the result yourself
            before you submit: names, dates, and stamps must stay readable.
          </p>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            Compress a PDF toward 100KB in 3 steps
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Upload your visa form, passport scan, certificate, or
              application PDF using the tool at the top of this page.
            </li>
            <li>
              Select the Extreme &lt;200KB preset and compress. Note the
              compressed size the tool reports.
            </li>
            <li>
              If you are still over 100KB, trim the file using the steps
              below and compress again, then download only when the text
              still reads clearly.
            </li>
          </ol>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            If your file is still over 100KB, try these in order
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-slate-900">Remove blank and duplicate pages.</strong>{' '}
              A blank scanned back page can add hundreds of kilobytes on its
              own, and duplicate pages double the problem.
            </li>
            <li>
              <strong className="text-slate-900">Upload only the pages requested.</strong>{' '}
              If the portal asks for one page of a passport or one
              certificate, do not upload the whole booklet or transcript in
              the same file.
            </li>
            <li>
              <strong className="text-slate-900">Rescan in grayscale, not colour.</strong>{' '}
              Colour scans are far larger than grayscale ones, and most
              official portals view and print documents in black and white
              anyway.
            </li>
            <li>
              <strong className="text-slate-900">Do not destroy readability to hit a number.</strong>{' '}
              If text becomes unreadable, stop. A rejected upload for being
              over size can be fixed; a submitted document that cannot be
              read can cause a much longer delay.
            </li>
          </ul>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            Which documents does a 100KB limit usually apply to?
          </h3>
          <p>
            The strictest caps tend to apply to single documents rather than
            whole applications: a passport page, a photo ID, a single
            certificate, a signed form, or a one-page declaration. Longer
            files such as full transcripts usually get a higher limit, or
            are split across several uploads. If your portal gives different
            limits for different documents, compress each one to its own
            limit instead of forcing everything to 100KB.
          </p>
          <p>
            For the general technique behind scanned versus digital PDFs,
            read our guide on{' '}
            <Link href="/blog/how-to-compress-pdf-file-size" className="font-semibold text-emerald-700 hover:underline">
              how to compress a PDF to under 200KB or 100KB
            </Link>
            . If your limit is 200KB rather than 100KB, use the dedicated
            page for{' '}
            <Link href="/compress-pdf-to-200kb" className="font-semibold text-emerald-700 hover:underline">
              compressing a PDF to 200KB for job applications
            </Link>
            , where the Extreme preset&apos;s target matches the limit
            exactly.
          </p>
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
        <p className="mt-6 text-center text-sm text-slate-500">
          Back to the main tool?{' '}
          <Link href="/" className="font-semibold text-emerald-700 hover:underline">
            Compress a PDF online
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
