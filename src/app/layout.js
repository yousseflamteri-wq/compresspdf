import './globals.css';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import {
  siteUrl,
  siteName,
  mainSiteUrl,
  mainSiteName,
  defaultTitle,
  defaultDescription,
} from '../lib/siteConfig';
import CookieConsent from '../components/CookieConsent';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  applicationName: siteName,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: defaultTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/opengraph-image`],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteName,
  alternateName: 'compresspdf.online',
  url: siteUrl,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col overflow-x-hidden bg-white text-slate-900 antialiased selection:bg-emerald-100 selection:text-emerald-900`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Responsive Header (Zero Mobile Overflow) */}
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xs">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3">
            {/* Brand Mark */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 min-h-[40px] group"
              aria-label="Compress PDF Online Home"
            >
              <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-md bg-slate-950 text-[10px] font-bold tracking-tight text-white transition group-hover:bg-emerald-600">
                PDF
              </span>
              <span className="text-[13px] sm:text-[15px] font-bold tracking-tight text-slate-950 whitespace-nowrap">
                compresspdf.online
              </span>
            </Link>

            {/* Right Navigation */}
            <nav className="flex items-center gap-0.5 sm:gap-5 text-xs sm:text-[13px] font-medium text-slate-700 shrink-0">
              <Link
                href="/blog"
                className="inline-flex items-center min-h-[40px] px-2 hover:text-slate-950 transition-colors"
              >
                Guides
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center min-h-[40px] px-2 hover:text-slate-950 transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center min-h-[40px] px-2 hover:text-slate-950 transition-colors"
              >
                Contact
              </Link>
              <a
                href={mainSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center min-h-[36px] ml-1 rounded-full bg-slate-950 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                All Tools &rarr;
              </a>
            </nav>
          </div>
        </header>

        <div className="flex-1">{children}</div>

        {/* 4-Column Square-Grid Footer */}
        <footer className="border-t border-slate-200 bg-footer-grid mt-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-14 pb-10">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-slate-200/80">
              <div className="md:col-span-4 space-y-3.5">
                <Link href="/" className="inline-block text-sm font-bold tracking-tight text-slate-950">
                  compresspdf.online
                </Link>
                <p className="text-xs text-slate-500 max-w-[240px] leading-relaxed">
                  Free online PDF compression tool that reduces file size while keeping your documents crisp and professional.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <Link
                    href="/about"
                    aria-label="Privacy & Security Architecture"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-slate-400 transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <Link
                    href="/contact"
                    aria-label="Contact Support"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-slate-400 transition-colors"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
                <div>
                  <h3 className="font-bold text-slate-950 mb-3.5">Product</h3>
                  <ul className="space-y-2.5 text-slate-500">
                    <li>
                      <a href={mainSiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">
                        All Tools
                      </a>
                    </li>
                    <li>
                      <Link href="/" className="hover:text-slate-950 transition-colors">
                        Compress PDF
                      </Link>
                    </li>
                    <li>
                      <a href={mainSiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">
                        Merge PDF
                      </a>
                    </li>
                    <li>
                      <a href={mainSiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">
                        Split PDF
                      </a>
                    </li>
                    <li>
                      <a href={mainSiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-slate-950 transition-colors">
                        PDF to Image
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950 mb-3.5">Resources</h3>
                  <ul className="space-y-2.5 text-slate-500">
                    <li>
                      <Link href="/blog" className="hover:text-slate-950 transition-colors">
                        Guides
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/how-to-compress-pdf-file-size" className="hover:text-slate-950 transition-colors">
                        Compress Under 200KB
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/how-to-compress-a-pdf-on-mac" className="hover:text-slate-950 transition-colors">
                        Compress on Mac
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/how-to-compress-pdf-on-iphone" className="hover:text-slate-950 transition-colors">
                        Compress on iPhone
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog/compress-pdf-without-adobe-acrobat" className="hover:text-slate-950 transition-colors">
                        No-Acrobat Guide
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950 mb-3.5">Company</h3>
                  <ul className="space-y-2.5 text-slate-500">
                    <li>
                      <Link href="/about" className="hover:text-slate-950 transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-slate-950 transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy" className="hover:text-slate-950 transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-slate-950 transition-colors">
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>&copy; 2026 {siteName}. All rights reserved.</p>
              <div className="flex items-center gap-3">
                <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-slate-300">&bull;</span>
                <Link href="/terms" className="hover:text-slate-900 transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>

        <CookieConsent />
      </body>
    </html>
  );
}