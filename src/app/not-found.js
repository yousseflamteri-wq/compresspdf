import Link from 'next/link';

export const metadata = {
  title: {
    absolute: 'Page Not Found – Compress PDF Online',
  },
  description:
    'This page does not exist on Compress PDF Online. Go back to the free PDF compressor, or browse the PDF compression guides.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-20 pb-16 text-center text-slate-900">
      <p className="text-sm font-bold tracking-tight text-emerald-700">404</p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
        Sorry, this page does not exist or may have moved. You can compress a PDF
        for free right now, or browse the guides below.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center min-h-[44px] rounded-full bg-slate-950 px-6 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          Compress a PDF
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center min-h-[44px] rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 hover:border-slate-400 transition-colors"
        >
          Browse guides
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
        <Link href="/about" className="hover:text-slate-950 transition-colors">
          About
        </Link>
        <Link href="/contact" className="hover:text-slate-950 transition-colors">
          Contact
        </Link>
        <Link href="/privacy-policy" className="hover:text-slate-950 transition-colors">
          Privacy Policy
        </Link>
        <Link href="/terms" className="hover:text-slate-950 transition-colors">
          Terms of Service
        </Link>
      </div>
    </main>
  );
}
