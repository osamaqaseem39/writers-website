'use client'

import { Header } from '@/components/Header'
import { useRouter } from 'next/navigation'

export default function OrderConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-brand-700 mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>

            <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-serif text-brand-900 mb-6">Order Details</h2>
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-brand-600">Order Number:</span>
                  <span className="text-brand-900 font-medium">#12345</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Order Date:</span>
                  <span className="text-brand-900">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Total Amount:</span>
                  <span className="text-brand-900 font-medium">$24.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-600">Status:</span>
                  <span className="text-green-600 font-medium">Processing</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-lg mr-4"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-white/80 hover:bg-white text-brand-800 px-8 py-3 rounded-lg font-semibold border-2 border-brand-200 hover:border-brand-300 transition-all duration-300 backdrop-blur-sm shadow-lg"
              >
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}