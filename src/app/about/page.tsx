'use client'

import { PageShell } from '@/components/PageShell'

export default function AboutPage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="mb-12">
        <div className="relative overflow-hidden rounded-3xl border border-brand-200/50 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-2xl">
          <div className="absolute inset-0 pointer-events-none [background-image:radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.12),transparent_50%)]" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 lg:p-12 relative">
            <div className="lg:col-span-2 flex flex-col justify-center text-center lg:text-left">
              <span className="inline-block text-xs tracking-widest text-brand-600 uppercase mb-3">About</span>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-4">Stories from a Heart that Writes</h1>
              <p className="text-lg text-brand-700 max-w-2xl mx-auto lg:mx-0">
                I write contemporary romance with a touch of mystery—tales for rainy nights and quiet hearts.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="px-4 py-3 rounded-2xl bg-brand-50 border border-brand-200 text-brand-800">
                  <span className="block text-sm">Books Published</span>
                  <span className="block text-2xl font-bold">3+</span>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-brand-50 border border-brand-200 text-brand-800">
                  <span className="block text-sm">Readers</span>
                  <span className="block text-2xl font-bold">10k+</span>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-brand-50 border border-brand-200 text-brand-800">
                  <span className="block text-sm">Years Writing</span>
                  <span className="block text-2xl font-bold">7</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-3xl overflow-hidden ring-4 ring-white/60 shadow-xl bg-brand-100 flex items-center justify-center">
                <img src="/aboutme.jpg" alt="Nawa Sohail" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio card */}
      <section className="mb-12">
        <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
          <div className="prose max-w-none text-brand-800">
            <p>
              Hi, I'm Nawa Sohail. I have always been in love with words, first as a student of English
              Literature, then as a teacher, and now as a storyteller. I hold an MPhil in English Literature
              and have taught English language and literature at several universities in Pakistan.
            </p>
            <p>
              My writing blends contemporary romance with a touch of thriller, often set against rainy nights
              and cold skies. These stories are pieces of my heart, and I am so glad you have found your way here.
            </p>
          </div>
        </div>
      </section>

      {/* Personal Favorites */}
      <section className="mb-12">
        <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-serif text-brand-900 mb-8 text-center">My Personal Favorites</h2>
          <p className="text-lg text-brand-700 text-center mb-8 max-w-3xl mx-auto">
            As an author and literature enthusiast, these are some of the books that have shaped my perspective and inspired my own storytelling journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Favorite Book 1 */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6 border border-brand-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gradient-to-br from-brand-200 to-brand-300 rounded-lg flex items-center justify-center text-brand-600 font-bold text-sm">
                  Book
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-900 mb-1">Pride and Prejudice</h3>
                  <p className="text-sm text-brand-600 mb-2">by Jane Austen</p>
                  <p className="text-sm text-brand-700">A timeless exploration of love, class, and personal growth that continues to inspire my romantic writing.</p>
                </div>
              </div>
            </div>

            {/* Favorite Book 2 */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6 border border-brand-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gradient-to-br from-brand-200 to-brand-300 rounded-lg flex items-center justify-center text-brand-600 font-bold text-sm">
                  Book
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-900 mb-1">The Great Gatsby</h3>
                  <p className="text-sm text-brand-600 mb-2">by F. Scott Fitzgerald</p>
                  <p className="text-sm text-brand-700">The atmospheric prose and complex characters taught me the power of setting and mood in storytelling.</p>
                </div>
              </div>
            </div>

            {/* Favorite Book 3 */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6 border border-brand-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gradient-to-br from-brand-200 to-brand-300 rounded-lg flex items-center justify-center text-brand-600 font-bold text-sm">
                  Book
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-900 mb-1">The Night Circus</h3>
                  <p className="text-sm text-brand-600 mb-2">by Erin Morgenstern</p>
                  <p className="text-sm text-brand-700">A magical tale that showed me how to weave mystery and romance into an enchanting narrative.</p>
                </div>
              </div>
            </div>

            {/* Favorite Book 4 */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6 border border-brand-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gradient-to-br from-brand-200 to-brand-300 rounded-lg flex items-center justify-center text-brand-600 font-bold text-sm">
                  Book
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-900 mb-1">The Seven Husbands of Evelyn Hugo</h3>
                  <p className="text-sm text-brand-600 mb-2">by Taylor Jenkins Reid</p>
                  <p className="text-sm text-brand-700">A masterclass in character development and the art of revealing secrets through storytelling.</p>
                </div>
              </div>
            </div>

            {/* Favorite Book 5 */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6 border border-brand-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gradient-to-br from-brand-200 to-brand-300 rounded-lg flex items-center justify-center text-brand-600 font-bold text-sm">
                  Book
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-900 mb-1">The Book Thief</h3>
                  <p className="text-sm text-brand-600 mb-2">by Markus Zusak</p>
                  <p className="text-sm text-brand-700">A beautiful reminder of how words can heal, comfort, and transform even in the darkest times.</p>
                </div>
              </div>
            </div>

            {/* Favorite Book 6 */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-6 border border-brand-200/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-20 bg-gradient-to-br from-brand-200 to-brand-300 rounded-lg flex items-center justify-center text-brand-600 font-bold text-sm">
                  Book
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-brand-900 mb-1">The Midnight Library</h3>
                  <p className="text-sm text-brand-600 mb-2">by Matt Haig</p>
                  <p className="text-sm text-brand-700">A profound exploration of life's possibilities that resonates with my own themes of second chances and hope.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-brand-600 italic">
              "These books have been my teachers, my companions, and my inspiration. They remind me why I fell in love with storytelling in the first place."
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-4">
        <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-brand-900 mb-6">Milestones</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-brand-200" />
            <ul className="space-y-6">
              <li className="pl-10">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 absolute left-3 top-2" />
                <h3 className="text-brand-900 font-semibold">First Short Story Published</h3>
                <p className="text-sm text-brand-700">A small beginning that taught me the courage to share.</p>
              </li>
              <li className="pl-10">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 absolute left-3 top-2" />
                <h3 className="text-brand-900 font-semibold">Debut Novel Release</h3>
                <p className="text-sm text-brand-700">A love letter to rainy nights and quiet roads.</p>
              </li>
              <li className="pl-10">
                <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 absolute left-3 top-2" />
                <h3 className="text-brand-900 font-semibold">Speaking and Workshops</h3>
                <p className="text-sm text-brand-700">Helping authors find their voice and rhythm.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  )
}

