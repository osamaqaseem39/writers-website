'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function Books() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: bookCardRef, isVisible: bookCardVisible } = useScrollAnimation()
  const { ref: bookImageRef, isVisible: bookImageVisible } = useScrollAnimation()
  const { ref: bookDetailsRef, isVisible: bookDetailsVisible } = useScrollAnimation()
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation()

  const book = {
    title: "You Never Cried",
    genre: "Fiction",
    description: "Pace Town is a place of quiet nights, rustling leaves, and stories waiting to be told. Dan, a gentle bookseller and devoted father, has long kept his heart closed. When Rose arrives, carrying secrets of her own, everything begins to change. Together, they find comfort in starlit walks, whispered conversations, and the fragile beauty of second chances.",
    fullDescription: "Yet the past is never far behind. When old wounds resurface, their love is tested in ways they never imagined. You Never Cried is a tender, atmospheric novel about love, vulnerability, and the courage it takes to finally let go.",
    year: "2024",
    pages: 329,
    status: "Available Now",
    isbn: "978-969-696-969-3",
    language: "English",
    readingTime: "7 hours",
    publisher: "Daastan",
    publishDate: "08 Oct 2024"
  }

  return (
    <section id="books" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-brand-200/20 to-brand-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-brand-300/20 to-brand-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-brand-200/10 to-brand-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate-in' : ''}`}
        >
          <h2 className="text-mobile-4xl md:text-5xl lg:text-6xl font-bold text-brand-900 mb-6 font-jost">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Book</span>
          </h2>
          <p className="text-mobile-lg text-brand-800 max-w-3xl mx-auto font-jost">
            <span className="hidden sm:inline">Discover my debut novel, a heartfelt journey through love, loss, and the beautiful complexity of human emotions.</span>
            <span className="sm:hidden">My debut novel about love, loss, and human emotions.</span>
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        {/* Single Book Display */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={bookCardRef}
            className={`bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-3xl p-12 shadow-2xl scroll-animate ${bookCardVisible ? 'animate-in' : ''}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Book Cover/Visual */}
              <div 
                ref={bookImageRef}
                className={`text-center lg:text-left scroll-animate-scale scroll-animate-delay-200 ${bookImageVisible ? 'animate-in' : ''}`}
              >
                <div className="relative inline-block group">
                  {/* Elegant book frame */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-brand-200 via-brand-300 to-brand-400 rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute -inset-4 bg-white rounded-2xl shadow-xl"></div>
                  
                  {/* Book Cover Image */}
                  <img 
                    src="/bookhomepage.jpeg" 
                    alt="You Never Cried Book Cover" 
                    className="relative w-80 h-full mx-auto lg:mx-0 rounded-2xl shadow-2xl object-cover z-10 group-hover:scale-105 transition-transform duration-500 filter sepia-20 brightness-110 contrast-105 saturate-110"
                  />
                  
                  {/* Floating decorative elements */}
                  <div className="absolute -top-6 -right-6 w-12 h-12 bg-brand-500 rounded-full shadow-lg animate-bounce"></div>
                  <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-500 rounded-full shadow-lg animate-bounce" style={{animationDelay: '1s'}}></div>
                </div>
              </div>

              {/* Book Details */}
              <div 
                ref={bookDetailsRef}
                className={`space-y-8 scroll-animate-left scroll-animate-delay-300 ${bookDetailsVisible ? 'animate-in' : ''}`}
              >
                <div>
                  <h3 className="text-4xl font-serif text-brand-900 mb-4">{book.title}</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-brand-600 bg-brand-100 px-4 py-2 rounded-full text-sm font-medium">
                      {book.genre}
                    </span>
                    <span className="text-brand-600 bg-green-100 px-4 py-2 rounded-full text-sm font-medium">
                      {book.status}
                    </span>
                  </div>
                  <p className="text-lg text-brand-800 leading-relaxed mb-4">
                    <span className="hidden sm:inline">{book.description}</span>
                    <span className="sm:hidden">Pace Town is a place of quiet nights and stories waiting to be told. Dan, a gentle bookseller, finds his heart opening when Rose arrives with secrets of her own.</span>
                  </p>
                  <p className="text-lg text-brand-800 leading-relaxed mb-6">
                    <span className="hidden sm:inline">{book.fullDescription}</span>
                    <span className="sm:hidden">When old wounds resurface, their love is tested. A tender novel about love, vulnerability, and the courage to let go.</span>
                  </p>
                </div>


                {/* Action Buttons */}
                <div 
                  ref={buttonsRef}
                  className={`space-y-4 scroll-animate scroll-animate-delay-500 ${buttonsVisible ? 'animate-in' : ''}`}
                >
                  <a href="/book/1" className="block w-full text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600 text-center">
                    Buy Now
                  </a>
                  <a href="/book/1" className="block w-full bg-white/80 hover:bg-white text-brand-800 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-brand-200 hover:border-brand-300 transition-all duration-300 backdrop-blur-sm shadow-lg text-center">
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
} 