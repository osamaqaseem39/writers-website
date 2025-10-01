'use client'

import { useState } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function Contact() {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation()
  const { ref: infoRef, isVisible: infoVisible } = useScrollAnimation()
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-40 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
        <div className="absolute bottom-40 left-40 w-64 h-64 bg-brand-400 rounded-full mix-blend-multiply filter blur-xl opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-16 scroll-animate ${titleVisible ? 'animate-in' : ''}`}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-brand-900 mb-6">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600">Touch</span>
          </h2>
          <p className="text-xl text-brand-700 max-w-3xl mx-auto">
            Have a question, want to collaborate, or just want to say hello? 
            I'd love to hear from you. Let's start a conversation.
          </p>
          <div className="w-24 h-1 mx-auto rounded-full mt-6 bg-gradient-to-r from-brand-500 to-brand-600"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div 
            ref={infoRef}
            className={`space-y-8 scroll-animate-left scroll-animate-delay-200 ${infoVisible ? 'animate-in' : ''}`}
          >
            <div>
              <h3 className="text-2xl font-bold text-brand-900 mb-6">Let's Connect</h3>
              <p className="text-brand-700 text-lg leading-relaxed mb-8">
                I'm always interested in hearing from readers, fellow authors, and anyone 
                who shares a passion for storytelling. Whether you have feedback on my work, 
                want to discuss a potential collaboration, or simply want to share your thoughts, 
                I'm here to listen.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-brand-500 to-brand-600">
                  <span className="text-2xl">📧</span>
                </div>
                <div>
                  <h4 className="text-brand-900 font-semibold">Email</h4>
                  <p className="text-brand-700">hello@nawasohail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-brand-500 to-brand-600">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <h4 className="text-brand-900 font-semibold">Social Media</h4>
                  <p className="text-brand-700">@nawasohail</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-brand-500 to-brand-600">
                  <span className="text-2xl">📍</span>
                </div>
                <div>
                  <h4 className="text-brand-900 font-semibold">Location</h4>
                  <p className="text-brand-700">Available Worldwide</p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-2xl p-6 border border-brand-200 shadow">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-900 mb-2">24-48</div>
                <div className="text-brand-600 font-medium">Hours Response Time</div>
                <p className="text-brand-500 text-sm mt-2">
                  I typically respond to all messages within 24-48 hours
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            ref={formRef}
            className={`scroll-animate-right scroll-animate-delay-300 ${formVisible ? 'animate-in' : ''}`}
          >
            <div className="bg-white rounded-3xl p-8 border border-brand-200 shadow-2xl">
              <h3 className="text-2xl font-bold text-brand-900 mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-brand-900 font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-brand-900 font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-brand-900 font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="feedback">Book Feedback</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-brand-900 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white border border-brand-300 rounded-xl text-brand-900 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-brand-500 to-brand-600"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 