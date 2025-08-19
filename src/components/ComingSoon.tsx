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
    // Set a target date (you can adjust this)
    const targetDate = new Date('2024-12-31T00:00:00')
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-primary-800 mb-6 font-serif">
            Nawa Sohail
          </h1>
          <p className="text-2xl md:text-3xl text-primary-600 font-medium mb-4">
            Writer & Author
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-primary-600 mx-auto rounded-full"></div>
        </div>

        {/* Coming Soon Message */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Something Wonderful is
            <span className="text-gradient block">Coming Soon</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A new chapter is being written. Stay tuned for literary adventures, 
            thought-provoking stories, and the magic of words that will transport 
            you to new worlds.
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              {timeLeft.days}
            </div>
            <div className="text-gray-600 font-medium">Days</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              {timeLeft.hours}
            </div>
            <div className="text-gray-600 font-medium">Hours</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              {timeLeft.minutes}
            </div>
            <div className="text-gray-600 font-medium">Minutes</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
              {timeLeft.seconds}
            </div>
            <div className="text-gray-600 font-medium">Seconds</div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-md mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Be the First to Know
          </h3>
          <p className="text-gray-600 mb-6">
            Get notified when the website launches and receive updates about new releases.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-gray-500">
          <p className="text-sm">
            © 2024 Nawa Sohail. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
} 