'use client'

import { useEffect, useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface GalleryImage {
	_id: string
	title: string
	description?: string
	src: string
	alt?: string
	status: 'Draft' | 'Published'
}

export function Gallery() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: galleryRef, isVisible: galleryVisible } = useScrollAnimation()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation()

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    let isMounted = true
    const load = async () => {
      try {
        const res = await fetch('/api/gallery', { cache: 'no-store' })
        const data = await res.json()
        if (isMounted) setGalleryImages(data.images || [])
      } catch {
        if (isMounted) setGalleryImages([])
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
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
            Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Scenes</span>
          </h2>
          <p className="text-mobile-lg text-brand-800 max-w-3xl mx-auto font-jost">
                <span className="hidden sm:inline">A glimpse into my world as an author - from quiet moments of creation to exciting book events and everything in between.</span>
            <span className="sm:hidden">Behind the scenes of my writing journey.</span>
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 scroll-animate ${galleryVisible ? 'animate-in' : ''}`}
        >
          {galleryImages.map((image) => (
            <div key={image._id} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white/80 backdrop-blur-sm border border-brand-200/50">
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt || image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-serif font-bold mb-2">{image.title}</h3>
                    <p className="text-brand-200 text-sm">{image.description}</p>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-brand-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaRef}
          className={`text-center mt-16 scroll-animate scroll-animate-delay-300 ${ctaVisible ? 'animate-in' : ''}`}
        >
          <div className="bg-white/70 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-10 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif text-brand-900 mb-4">
              Follow My Journey
            </h3>
            <p className="text-brand-800 text-lg leading-relaxed mb-6">
              <span className="hidden sm:inline">Stay connected for more behind-the-scenes content, writing updates, and exclusive glimpses into my creative process.</span>
              <span className="sm:hidden">Follow for more writing updates and behind-the-scenes content.</span>
            </p>
            <button className="text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600">
              Follow on Social Media
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}