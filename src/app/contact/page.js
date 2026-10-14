import ContactForm from '../../components/ContactForm';
import { siteName, siteUrl } from '../../lib/siteConfig';

export const metadata = {
  title: {
    absolute: `Contact Us – ${siteName}`,
  },
  description: `Contact the team behind ${siteName}. Reach out for technical support, error reports on specific PDF files, or business inquiries.`,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 sm:py-14 text-slate-800">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Contact Us</h1>
      <p className="text-sm text-slate-600 mb-8 leading-relaxed">
        Ran into an issue with a stubborn PDF, have feedback on our local compression engine, or want to suggest a feature? Send us a note below.
      </p>

      <ContactForm />

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 text-xs text-slate-600">
        <p className="font-semibold text-slate-800 mb-2">Direct Email Inquiries:</p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div>
            General: <strong className="text-slate-800 font-mono">contact@compresspdf.online</strong>
          </div>
          <div>
            Technical Support: <strong className="text-slate-800 font-mono">support@compresspdf.online</strong>
          </div>
        </div>
      </div>
    </main>
  );
}