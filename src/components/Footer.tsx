export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy via-teal to-skyblue border-t border-skyblue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src="/logo-white.webp" 
              alt="Nawa Sohail Logo" 
              className="h-16 w-auto"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://www.instagram.com/read_at_nawa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/nawa-sohail-838a5a28a" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://www.threads.com/@read_at_nawa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 19.44 1.5 17.586 1.5 15.068V8.932c0-2.518.85-4.372 2.495-5.423C5.844 2.205 8.597 1.024 12.186 1h.007c3.581.024 6.334 1.205 8.184 3.509C22.65 4.56 23.5 6.414 23.5 8.932v6.136c0 2.518-.85 4.372-2.495 5.423C19.156 22.795 16.403 23.976 12.186 24zM12.194 2.5c-3.08.02-5.427 1.1-6.913 2.99-1.528 1.93-1.528 4.182-1.528 5.578v6.864c0 1.396 0 3.648 1.528 5.578 1.486 1.89 3.833 2.97 6.913 2.99h.012c3.08-.02 5.427-1.1 6.913-2.99 1.528-1.93 1.528-4.182 1.528-5.578V8.932c0-1.396 0-3.648-1.528-5.578C17.633 3.6 15.286 2.52 12.206 2.5zm-.01 4.545a4.545 4.545 0 110 9.09 4.545 4.545 0 010-9.09zm0 1.818a2.727 2.727 0 100 5.454 2.727 2.727 0 000-5.454zm5.727-1.818a1.364 1.364 0 110 2.728 1.364 1.364 0 010-2.728z"/>
            </svg>
          </a>
          <a href="https://www.goodreads.com/user/show/49872673-nawa-sohail" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
            <img 
              src="/goodreads.png" 
              alt="Goodreads" 
              className="w-5 h-5"
            />
          </a>
          <a href="mailto:connect@nawasohail.com" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>

        {/* Newsletter Subscription */}
        <div className="text-center mb-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-white text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-white/80 text-sm mb-4">Get the latest updates on new books and releases</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-white/20 to-white/30 text-white rounded-lg font-semibold hover:from-white/30 hover:to-white/40 transition-all duration-300 transform hover:scale-105 border border-white/30">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-white/20 pt-8">
          <p className="text-white/80 text-sm">
            © 2025 Nawa Sohail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 