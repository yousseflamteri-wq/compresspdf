import Link from 'next/link';
import { siteName, buildMetadata } from '../../lib/siteConfig';

export const metadata = buildMetadata({
  title: `Privacy Policy – ${siteName}`,
  description: `Privacy policy for ${siteName}. Plain English explanation of how our local file tool works and how cookies are handled.`,
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14 text-slate-800">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Privacy Policy</h1>
      <p className="text-xs text-slate-400 mb-8 tabular-nums">Last updated: October 17, 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">The Short Version</h2>
          <p>
            We do not want your documents, we cannot see them, and we never save them. Everything you compress on {siteName} stays inside your web browser.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Your Files and Documents</h2>
          <p>
            When you select or drop a PDF into {siteName}, the file is read and processed entirely by your browser using local client-side scripts. No files are transmitted to our servers or any third-party storage. Once you close or refresh the tab, the working copy in your browser memory disappears.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Advertising and Third-Party Services</h2>
          <p>
            This website does not currently show advertising. We may add ads in the future, for example through <strong>Google AdSense</strong>. If we do, we will update this policy before the ads go live.
          </p>
          <p className="mt-2">
            Google and its partners may use cookies (such as the DoubleClick cookie) to show ads based on your visits to this site and other websites. These cookies never give them access to your PDF files, which stay in your browser.
          </p>
          <p className="mt-2">
            You can turn off personalized advertising at any time by visiting{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 font-medium underline"
            >
              Google Ad Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Website Analytics</h2>
          <p>
            Like almost every website, our hosting server logs basic non-personal information when you load a page (such as your browser type, operating system, and the date/time of your visit). This helps us keep the site fast and fix technical bugs. None of this data is ever tied to your files.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Questions?</h2>
          <p>
            If you want to know more about how our in-browser scripts work or have questions about this policy, send us a note through our{' '}
            <Link href="/contact" className="text-green-700 font-medium underline">
              contact form
            </Link>.
          </p>
        </section>
      </div>
    </main>
  );
}