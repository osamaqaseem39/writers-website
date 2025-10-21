'use client'

import { useState, useEffect } from 'react'

export function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Set a target date for 2 weeks from now
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 14)
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Header */}
          <div className="mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl">
              <span className="text-4xl">✍️</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 leading-tight">
              Nawa Sohail
            </h1>
            <p className="text-3xl md:text-4xl text-purple-200 font-light mb-6 tracking-wide">
                Author
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full shadow-lg"></div>
          </div>

          {/* Coming Soon Message */}
          <div className="mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
                Extraordinary
              </span>
              is Coming
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              A new chapter is being written in the digital age. Stay tuned for literary adventures, 
              thought-provoking stories, and the magic of words that will transport you to new worlds.
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 group-hover:shadow-purple-500/25">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 font-mono">
                  {timeLeft.days.toString().padStart(2, '0')}
                </div>
                <div className="text-purple-200 font-medium text-lg uppercase tracking-wider">Days</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 group-hover:shadow-blue-500/25">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 font-mono">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </div>
                <div className="text-blue-200 font-medium text-lg uppercase tracking-wider">Hours</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 group-hover:shadow-pink-500/25">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 font-mono">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-pink-200 font-medium text-lg uppercase tracking-wider">Minutes</div>
              </div>
            </div>
            <div className="group">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl transition-all duration-300 group-hover:bg-white/20 group-hover:scale-105 group-hover:shadow-purple-500/25">
                <div className="text-5xl md:text-6xl font-black text-white mb-3 font-mono">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-purple-200 font-medium text-lg uppercase tracking-wider">Seconds</div>
              </div>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 shadow-2xl max-w-2xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Be the First to Know
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Get notified when the website launches and receive updates about new releases, 
                exclusive content, and literary insights.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent backdrop-blur-sm transition-all duration-300"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-4">
              © 2025 Nawa Sohail. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 