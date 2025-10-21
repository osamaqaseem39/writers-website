'use client'

import { PageShell } from '@/components/PageShell'

export default function ContactPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="mb-10">
        <div className="rounded-3xl border border-brand-200/50 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-2xl p-8 lg:p-12 text-center">
          <h1 className="text-4xl font-serif text-brand-900 mb-3">Get in Touch</h1>
          <p className="text-brand-700 max-w-2xl mx-auto mb-6">Have a question, a collaboration idea, or just want to say hello?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:connect@nawasohail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 text-brand-800 border border-brand-200">
              <span>connect@nawasohail.com</span>
            </a>
            <a href="https://www.instagram.com/read_at_nawa" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 text-brand-800 border border-brand-200">
              <span>Instagram</span>
            </a>
            <a href="https://www.linkedin.com/in/nawa-sohail-838a5a28a" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 text-brand-800 border border-brand-200">
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-brand-900 font-medium mb-2">Name *</label>
                <input id="name" className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-brand-900 font-medium mb-2">Email *</label>
                <input id="email" type="email" className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="your.email@example.com" />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-brand-900 font-medium mb-2">Subject</label>
              <input id="subject" className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="How can I help you?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-brand-900 font-medium mb-2">Message *</label>
              <textarea id="message" rows={6} className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Tell me what's on your mind..." />
            </div>
            <button className="w-full text-white px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-brand-500 to-brand-600">Send Message</button>
          </form>
        </div>
        <aside className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold text-brand-900 mb-4">Office Hours</h3>
          <ul className="text-brand-700 text-sm space-y-2 mb-6">
            <li>Mon - Fri: 10:00 AM - 6:00 PM</li>
            <li>Sat: 11:00 AM - 3:00 PM</li>
            <li>Sun: Closed</li>
          </ul>
          <h3 className="text-lg font-semibold text-brand-900 mb-4">Quick Links</h3>
          <ul className="text-brand-700 text-sm space-y-2">
            <li><a className="hover:text-brand-900" href="/books">Browse Books</a></li>
            <li><a className="hover:text-brand-900" href="/blog">Visit Blog</a></li>
            <li><a className="hover:text-brand-900" href="/about">About Nawa</a></li>
          </ul>
        </aside>
      </section>
    </PageShell>
  )
}

