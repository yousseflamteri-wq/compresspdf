import { siteName, buildMetadata } from '../../lib/siteConfig';

export const metadata = buildMetadata({
  title: `Terms of Service – ${siteName}`,
  description: `Terms of service for ${siteName}, our free in-browser PDF compressor. No server uploads, no account needed. Read the usage terms.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-800">
      <h1 className="text-3xl font-black text-slate-900 mb-4">Terms of Service</h1>
      <p className="text-xs text-slate-400 mb-8">Effective date: October 2026</p>

      <div className="space-y-6 text-sm leading-relaxed text-slate-700">
        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">1. Using Our Service</h2>
          <p>
            {siteName} is a free web tool provided to help you compress and optimize PDF documents directly in your browser. You are free to use it for personal or business purposes without creating an account.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">2. Your Content</h2>
          <p>
            You retain 100% ownership of your documents. Because our tools process everything locally on your device and never store copies on our servers, we hold no rights, claims, or access to your files.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">3. No Guarantees</h2>
          <p>
            We build and test our compression engine carefully, but we provide this tool &quot;as is&quot; without warranties. While errors are rare, always keep a backup copy of your original documents before compressing or replacing them.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-900 mb-2">4. Acceptable Use</h2>
          <p>
            Please use this site fairly. Do not attempt to overload our hosting infrastructure or run automated scrapers against our web pages.
          </p>
        </section>
      </div>
    </div>
  );
}