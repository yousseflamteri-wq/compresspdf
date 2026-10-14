'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-green-200 bg-green-50 p-6 text-center text-slate-800"
      >
        <CheckCircle2 className="mx-auto h-7 w-7 text-green-600 mb-2" />
        <h2 className="text-base font-bold text-slate-900">Message Received</h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-md mx-auto">
          Thanks for reaching out! We read all technical feedback, bug reports, and file format inquiries. We will reply to your email address shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 sm:p-7 shadow-sm"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
        />
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue or feedback (e.g. specific PDF version, browser, or compression result)..."
          className="w-full rounded-lg border border-slate-200 px-3.5 py-2.5 text-sm focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
        />
      </div>

      <button
        type="submit"
        className="w-full min-h-[44px] rounded-lg bg-green-600 py-3 text-sm font-bold text-white transition hover:bg-green-700 shadow-sm"
      >
        Send Message
      </button>
    </form>
  );
}
