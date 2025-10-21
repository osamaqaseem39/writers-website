export function Hero() {
  return (
    <section id="home" className="h-screen min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:min-h-[940px] bg-gradient-to-br from-skyblue via-beige to-white relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-teal/20 to-navy/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-skyblue/20 to-beige/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-navy/10 to-teal/10 rounded-full blur-2xl"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-7xl">
          {/* Desktop Layout - Classic Grid */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="space-y-8">
             

                <div className="space-y-6">
                  <p className="text-mobile-4xl lg:text-5xl xl:text-7xl 2xl:text-9xl font-light text-navy/90 animate-slide-in-left font-jost" 
                     >
                    I am
                  </p>
                  <h1 className="text-mobile-5xl lg:text-6xl xl:text-8xl 2xl:text-[10rem] font-serif text-navy leading-tight animate-slide-in-up font-jost">
                    Nawa Sohail
                  </h1>
                </div>

                {/* Classic Stats */}
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-white/60 backdrop-blur-sm border border-skyblue/50 rounded-2xl p-6 shadow-lg animate-fade-in">
                    <div className="text-mobile-2xl lg:text-3xl font-bold text-navy font-jost">5+</div>
                    <div className="text-mobile-sm text-teal font-medium font-jost">Books Published</div>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm border border-skyblue/50 rounded-2xl p-6 shadow-lg animate-fade-in">
                    <div className="text-mobile-2xl lg:text-3xl font-bold text-navy font-jost">10K+</div>
                    <div className="text-mobile-sm text-teal font-medium font-jost">Readers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column - Image */}
            <div className="lg:col-span-4 xl:col-span-4 flex justify-center">
              <div className="relative group">
                {/* Elegant Frame */}
                <div className="absolute -inset-6 bg-gradient-to-br from-navy via-teal to-skyblue rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute -inset-3 bg-white rounded-2xl shadow-2xl"></div>
                
                <img 
                  src="/heroimage.jpg" 
                  alt="Hero Image" 
                  className="relative w-full max-w-lg xl:max-w-xl 2xl:max-w-2xl rounded-2xl shadow-2xl drop-shadow-2xl animate-slide-in-up z-10"
                />
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-navy rounded-full shadow-lg animate-bounce"></div>
                <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-gradient-to-br from-teal to-skyblue rounded-full shadow-lg animate-bounce" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="lg:col-span-3 xl:col-span-3">
              <div className="space-y-8 animate-slide-in-right">
                {/* Classic Header */}
                <div className="bg-white/70 backdrop-blur-sm border border-skyblue/50 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-4 h-4 bg-teal rounded-full mr-4"></div>
                    <h3 className="text-2xl font-serif text-navy">Author</h3>
                  </div>
                  
                  <div className="w-20 h-1 rounded-full mb-6 bg-gradient-to-r from-navy to-teal"></div>
                  
                  <p className="text-base xl:text-lg text-navy leading-relaxed font-light">
                  Every story matters. And so does every voice. This is my little corner for telling mine.</p>
                </div>

                {/* Classic Buttons */}
                <div className="space-y-4">
                  <button className="w-full text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 group bg-gradient-to-r from-navy to-teal">
                    <span className="flex items-center justify-center">
                      <span className="mr-2">Explore My Work</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  
                  <button className="w-full bg-white/80 hover:bg-white text-navy px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-teal hover:border-navy transition-all duration-300 backdrop-blur-sm shadow-lg">
                    Read Latest Book
                  </button>
                </div>

                {/* Classic Progress */}
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-teal font-medium">
                    <span>Current Project</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-beige rounded-full h-3">
                    <div className="h-3 rounded-full transition-all duration-1000 bg-gradient-to-r from-navy to-teal" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Layout - Classic Stack */}
          <div className="lg:hidden flex flex-col items-center pt-20 pb-8 text-center space-y-6 px-4">
          
            {/* Image with Classic Frame */}
            <div className="w-full max-w-sm sm:max-w-md md:max-w-lg relative group mb-4">
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-navy via-teal to-skyblue rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute -inset-2 sm:-inset-3 bg-white rounded-2xl shadow-2xl"></div>
              
              <img 
                src="/heroimagemobile.jpg" 
                alt="Hero Image Mobile" 
                className="relative w-full rounded-2xl shadow-2xl drop-shadow-2xl animate-slide-in-up z-10"
              />
              
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-8 h-8 sm:w-12 sm:h-12 bg-navy rounded-full shadow-lg animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-teal to-skyblue rounded-full shadow-lg animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Text Content */}
            <div className="space-y-6 w-full max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-navy animate-slide-in-up font-jost leading-tight">
                I am <span className="font-light">Nawa Sohail</span>
              </h1>
              
              <div className="bg-white/70 backdrop-blur-sm border border-skyblue/50 rounded-2xl p-6 sm:p-8 shadow-lg space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-teal rounded-full mr-3 sm:mr-4"></div>
                    <h3 className="text-lg sm:text-xl font-serif text-navy font-jost">AUTHOR</h3>
                </div>
                
                <div className="w-20 sm:w-24 h-1 mx-auto rounded-full bg-gradient-to-r from-navy to-teal"></div>
                
                <p className="text-sm sm:text-base text-navy leading-relaxed font-light font-jost">
                  Every story matters. And so does every voice. This is my little corner for telling mine.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button className="w-full text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-300 hover:scale-105 font-jost bg-gradient-to-r from-navy to-teal mobile-button">
                  Explore My Work
                </button>
                
                <button className="w-full bg-white/80 hover:bg-white text-navy px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg border-2 border-teal hover:border-navy transition-all duration-300 backdrop-blur-sm shadow-lg font-jost mobile-button">
                  Read Latest Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}