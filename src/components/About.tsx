'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function About() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation()
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation()

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-200/20 to-brand-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-brand-300/20 to-brand-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-200/10 to-brand-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate-in' : ''}`}
        >
          <h2 className="text-mobile-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 font-jost">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Me</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={contentRef}
            className={`bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-12 shadow-2xl scroll-animate ${contentVisible ? 'animate-in' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Story Section */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-6">
                  <p className={`text-mobile-lg text-brand-800 leading-relaxed font-jost scroll-animate scroll-animate-delay-100 ${contentVisible ? 'animate-in' : ''}`}>
                    <span className="hidden sm:inline">Hi, I'm Nawa Sohail. I have always been in love with words, first as a student of English Literature, 
                    then as a teacher, and now as a storyteller. I hold an MPhil in English Literature and have taught 
                    English language and literature at several universities in Pakistan.</span>
                    <span className="sm:hidden">Hi, I'm Nawa Sohail. An author who loves words, holds an MPhil in English Literature, and teaches at universities in Pakistan.</span>
                  </p>
                  
                  <p className={`text-mobile-lg text-brand-800 leading-relaxed font-jost scroll-animate scroll-animate-delay-200 ${contentVisible ? 'animate-in' : ''}`}>
                    <span className="hidden sm:inline">My debut novel, <em className="font-semibold text-brand-900">You Never Cried</em>, is a story about love, loss, and the difficult art of letting go. 
                    Along the way, I have published short stories including <em className="font-semibold text-brand-900">What Was My Fault?</em>, 
                    <em className="font-semibold text-brand-900"> Cookie Jar</em>, and <em className="font-semibold text-brand-900">Who Baked Those Cookies?</em>, 
                    as well as a poem titled <em className="font-semibold text-brand-900">Lost in the Moonlight</em>.</span>
                    <span className="sm:hidden">My debut novel <em className="font-semibold text-brand-900">You Never Cried</em> explores love, loss, and letting go. I've also published short stories and poetry.</span>
                  </p>

                  <p className={`text-mobile-lg text-brand-800 leading-relaxed font-jost scroll-animate scroll-animate-delay-300 ${contentVisible ? 'animate-in' : ''}`}>
                    <span className="hidden sm:inline">My writing blends contemporary romance with a touch of thriller, often set against rainy nights, 
                    cold skies, and of course, cookies. These stories are pieces of my heart, and I am so glad you 
                    have found your way here.</span>
                    <span className="sm:hidden">My writing blends romance with thriller elements, set against rainy nights and cold skies. Welcome to my world of stories.</span>
                  </p>
                </div>
              </div>

              {/* Right Column with Image */}
              <div className="flex justify-center lg:justify-start">
                {/* Author Image */}
                <div 
                  ref={imageRef}
                  className={`text-center scroll-animate-scale scroll-animate-delay-400 ${imageVisible ? 'animate-in' : ''}`}
                >
                  <div className="relative inline-block group">
                    {/* Elegant multi-layer frame */}
                    <div className="absolute -inset-8 bg-gradient-to-br from-brand-200 via-brand-300 to-brand-400 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <div className="absolute -inset-6 bg-gradient-to-br from-brand-100 to-brand-200 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute -inset-4 bg-white rounded-full shadow-xl"></div>
                    
                    <img 
                      src="/aboutme.jpg" 
                      alt="Nawa Sohail" 
                      className="relative w-64 h-64 mx-auto rounded-full shadow-2xl drop-shadow-2xl object-cover z-10 group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Elegant floating elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-500 rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full shadow-lg animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 -left-6 w-4 h-4 bg-gradient-to-br from-brand-300 to-brand-400 rounded-full shadow-lg animate-pulse" style={{animationDelay: '2s'}}></div>
                  </div>
                  
                  <div className={`mt-8 scroll-animate scroll-animate-delay-500 ${imageVisible ? 'animate-in' : ''}`}>
                    <h3 className="text-3xl font-serif text-brand-900 mb-2">Nawa Sohail</h3>
                    <p className="text-xl text-brand-700 font-medium mb-4">Author & Storyteller</p>
                    <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-brand-500 to-brand-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
} 