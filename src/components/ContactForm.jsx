'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');

    const formData = new FormData(e.target);
    formData.append('access_key', '7da759e2-e31a-4afe-9cc0-8bb37025bcbd');
    formData.append('subject', 'New Contact Message - Compress PDF Online');
    formData.append('from_name', 'Compress PDF Online Contact Form');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Your full name"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={5}
          required
          placeholder="Describe your issue or feedback (e.g. specific PDF version, browser, or compression result)..."
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full py-3.5 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <p className="text-sm font-medium text-emerald-600 text-center">
          Thank you! Your message has been sent successfully.
        </p>
      )}

      {status === 'error' && (
        <p className="text-sm font-medium text-rose-600 text-center">
          Something went wrong while sending your message. Please try again.
        </p>
      )}
    </form>
  );
}
