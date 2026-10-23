import Link from 'next/link';
import CompressPdfTool from '../../components/CompressPdfTool';
import { siteUrl, buildMetadata } from '../../lib/siteConfig';

export const metadata = buildMetadata({
  title: 'Compress PDF to 200KB for Job Applications – Free Online Tool',
  description:
    'Compress a PDF to under 200KB for job portals, resume uploads, and application forms. Free, no sign-up, and your file never leaves your browser.',
  path: '/compress-pdf-to-200kb',
});

const faqs = [
  {
    q: 'Will compressing my resume to under 200KB make it unreadable?',
    a: 'Not if you use the right preset. A resume exported from Word or Google Docs is mostly vector text, so it usually drops well under 200KB with no visible change. For a scanned resume, use the Extreme preset and check the preview: text should still read clearly at normal zoom, even if fine print looks slightly softer.',
  },
  {
    q: 'What if my PDF is still over 200KB after compressing?',
    a: 'First, remove any blank or duplicate pages before you compress — a blank scanned page can add hundreds of kilobytes on its own. Then try the Extreme preset again. If the file is a long multi-page scan, splitting it into just the pages the portal asks for is often the fastest fix.',
  },
  {
    q: 'Is it safe to compress a resume, ID, or certificate here?',
    a: 'Yes. This tool runs entirely in your browser, so your resume, ID scan, or certificate is never uploaded to a server. Nothing is stored, and there is no account to create.',
  },
  {
    q: 'Do job portals count 200KB as 200,000 or 204,800 bytes?',
    a: 'It varies by portal, which is why you should aim a little below the limit — around 190KB or less — rather than exactly 200KB. That small margin covers the difference between decimal and binary counting.',
  },
];

export default function CompressPdfTo200kbPage() {
  const pageUrl = `${siteUrl}/compress-pdf-to-200kb`;

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compress a PDF to 200KB for a Job Application',
    description:
      'Reduce a resume or application PDF to under 200KB for job portals, without uploading it to a server.',
    image: `${siteUrl}/og-image.png`,
    step: [
      {
        '@type': 'HowToStep',
        name: 'Upload your resume or application PDF',
        text: 'Drag and drop your PDF into the tool above, or click to browse for it on your computer or phone.',
      },
      {
        '@type': 'HowToStep',
        name: 'Choose the Extreme preset',
        text: 'Select Extreme <200KB. It steps image sizes down until the output tries to hit under 200KB, and falls back to rebuilding pages as images if vector compression alone cannot reach the target.',
      },
      {
        '@type': 'HowToStep',
        name: 'Check the size and download',
        text: 'Compare the original and compressed sizes shown by the tool, confirm the text still reads clearly, then download the smaller file and upload it to the job portal.',
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
        name: 'Compress PDF to 200KB',
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
          <li className="text-slate-800 font-medium">Compress PDF to 200KB</li>
        </ol>
      </nav>

      <div className="text-center mb-7 sm:mb-9">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
          Compress PDF to 200KB for Job Applications
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
          Your resume is ready, but the portal says the file is too large.
          Shrink it to under 200KB in your browser — free, no sign-up, and
          your document never leaves your device.
        </p>
      </div>

      <CompressPdfTool />

      <p className="mt-4 text-center text-xs sm:text-sm text-slate-500">
        Tip: choose the <strong className="text-slate-800">Extreme &lt;200KB</strong> preset
        for strict portal limits. If your portal allows more, Recommended is
        usually enough and keeps text sharper.
      </p>

      <section className="mt-16 sm:mt-20 max-w-4xl mx-auto border-t border-slate-200/80 pt-12">
        <h2 className="text-lg sm:text-xl font-bold text-slate-950 tracking-tight mb-5">
          Why job portals reject PDFs over 200KB
        </h2>
        <div className="space-y-5 text-sm sm:text-base leading-relaxed text-slate-600">
          <p>
            A 200KB limit is not about your resume being too long. It is about
            storage and speed: a hiring system may hold millions of
            applications, and a single 10MB phone scan takes fifty times the
            space of a 200KB file. Portals therefore set a hard cap and reject
            anything over it, often with no explanation beyond “file too
            large.” The frustrating part is that the content is rarely the
            problem — a one-page resume should never need several megabytes.
          </p>
          <p>
            The extra weight almost always comes from images. A resume
            exported as a PDF from Word or Google Docs is mostly text, which
            is light. A resume photographed or scanned with a phone, on the
            other hand, is a set of high-resolution pictures wrapped in a PDF,
            and a single page can easily be 3MB to 5MB before you do anything
            to it. Compressing does not change what you wrote; it reduces the
            resolution of those pictures to a level that still reads perfectly
            on screen.
          </p>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            Compress a PDF to 200KB in 3 steps
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Upload your resume, CV, cover letter, or certificate PDF using
              the tool at the top of this page.
            </li>
            <li>
              Select the Extreme &lt;200KB preset. It works down through image
              sizes until the file tries to hit under 200KB.
            </li>
            <li>
              Check the compressed size, make sure the text still reads
              clearly, then download and upload it to the portal.
            </li>
          </ol>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            What to do if your file is still over 200KB
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-slate-900">Remove blank and duplicate pages.</strong>{' '}
              Scanners often add a blank back page, and even a blank page with
              paper grain can add hundreds of kilobytes.
            </li>
            <li>
              <strong className="text-slate-900">Upload only the pages asked for.</strong>{' '}
              If the portal wants a resume only, leave out extra certificates
              and reference letters and upload those separately if requested.
            </li>
            <li>
              <strong className="text-slate-900">Rescan in grayscale if you must rescan.</strong>{' '}
              Colour scans are much larger than grayscale ones, and most
              portals print or view resumes in black and white anyway.
            </li>
            <li>
              <strong className="text-slate-900">Aim for about 190KB, not exactly 200KB.</strong>{' '}
              Some portals count a kilobyte as 1,000 bytes and others as 1,024,
              so a small margin avoids a rejection over a few kilobytes.
            </li>
          </ul>

          <h3 className="text-base sm:text-lg font-bold text-slate-950 pt-2">
            Which documents does this work for?
          </h3>
          <p>
            This page is aimed at job applications, but the same limit shows up
            on visa forms, university admissions, and government portals. The
            approach is identical for a resume, a cover letter, a degree
            certificate, or an ID scan: use Extreme for a hard 200KB cap, and
            check the result before submitting. Because the tool runs locally
            in your browser, it is also a safer choice for documents that
            contain personal details — nothing is uploaded to a server, stored,
            or shared.
          </p>
          <p>
            If your file started life as a phone scan, read our guide on{' '}
            <Link href="/blog/how-to-compress-pdf-file-size" className="font-semibold text-emerald-700 hover:underline">
              how to compress a PDF to under 200KB or 100KB
            </Link>
            , which explains scanned versus digital PDFs in more detail. And
            if you do not have Adobe Acrobat, you do not need it — see{' '}
            <Link href="/blog/compress-pdf-without-adobe-acrobat" className="font-semibold text-emerald-700 hover:underline">
              how to compress a PDF without Adobe Acrobat
            </Link>
            .
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
