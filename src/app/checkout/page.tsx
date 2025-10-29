'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { useRouter } from 'next/navigation'
import { useCart } from '@/contexts/CartContext'
import { useAuth } from '@/contexts/AuthContext'
import { formatCurrency } from '@/utils/currency'

interface CartItem {
  id: string
  title: string
  author: string
  price: number
  quantity: number
  format: string
  coverImage: string
}

// Calculate shipping charges based on country
function calculateShippingCharges(country: string, subtotal: number): number {
  // Pakistan: Free shipping for orders above 2500, otherwise 500
  if (country === 'PK' || country === 'Pakistan') {
    return subtotal > 2500 ? 0 : 500
  }
  // International: Add shipping charges (2000 PKR)
  return country ? 2000 : 0
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart()
  const { autoRegister, user, token } = useAuth()
  const [step, setStep] = useState(1)
  const [isAutoRegistering, setIsAutoRegistering] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [autoRegisterMessage, setAutoRegisterMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = calculateShippingCharges(formData.country, subtotal)
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = async () => {
    if (step === 1) {
      // Auto-register user when completing first form
      if (!user && formData.email && formData.firstName && formData.lastName && formData.phone) {
        setIsAutoRegistering(true)
        setAutoRegisterMessage('')
        
        try {
          const result = await autoRegister(
            formData.email,
            formData.firstName,
            formData.lastName,
            formData.phone
          )
          
          if (result.success) {
            setAutoRegisterMessage(result.message || 'Account created successfully!')
            // Proceed to next step after successful registration
            setStep(2)
          } else {
            setAutoRegisterMessage(result.message || 'Registration failed. Please try again.')
            return // Don't proceed if registration failed
          }
        } catch (error) {
          setAutoRegisterMessage('Registration failed. Please try again.')
          return
        } finally {
          setIsAutoRegistering(false)
        }
      } else if (step < 2) {
        setStep(step + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        book: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }))

      // Prepare order data
      const orderData = {
        items: orderItems,
        totalAmount: total,
        shippingCharges: shipping,
        paymentMethod: 'COD',
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        }
      }

      // Get auth token
      const authToken = token || localStorage.getItem('token')
      
      if (!authToken) {
        setSubmitError('Authentication required. Please try again.')
        return
      }

      // Create order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(orderData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create order')
      }

      // Clear cart and redirect
      clearCart()
      router.push(`/order-confirmation?orderId=${data.order._id}`)
    } catch (error: any) {
      console.error('Error creating order:', error)
      setSubmitError(error.message || 'Failed to create order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-brand-900 mb-4">Checkout</h1>
            <div className="flex justify-center space-x-4">
              {[1, 2].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber 
                      ? 'bg-brand-500 text-white' 
                      : 'bg-brand-200 text-brand-600'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 2 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNumber ? 'bg-brand-500' : 'bg-brand-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-16 mt-4">
              <span className={`text-sm ${step >= 1 ? 'text-brand-600' : 'text-brand-400'}`}>Shipping</span>
              <span className={`text-sm ${step >= 2 ? 'text-brand-600' : 'text-brand-400'}`}>Review</span>
            </div>
            
            {/* Auto-registration message */}
            {autoRegisterMessage && (
              <div className={`mt-4 p-4 rounded-lg ${
                autoRegisterMessage.includes('successfully') || autoRegisterMessage.includes('Welcome back')
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                <div className="flex items-center justify-center">
                  {isAutoRegistering ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-500"></div>
                      <span>Creating your account...</span>
                    </div>
                  ) : (
                    <span>{autoRegisterMessage}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-serif text-brand-900 mb-6">Shipping Information</h2>
                    
                    {/* Auto-registration notice */}
                    {!user && (
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-blue-800">Account Creation</h3>
                            <p className="text-sm text-blue-700 mt-1">
                              We'll automatically create an account for you using your email and phone number. 
                              This will help you track your order and make future purchases easier.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-brand-700 mb-2">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-brand-700 mb-2">Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-brand-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="PK">Pakistan</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="IN">India</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="GB">United Kingdom</option>
                        </select>
                        {formData.country && (
                          <p className="text-sm text-brand-600 mt-2">
                            {formData.country === 'PK' || formData.country === 'Pakistan' 
                              ? (subtotal > 2500 
                                  ? 'Free shipping for orders above 2500 PKR' 
                                  : 'Shipping charges: 500 PKR')
                              : 'International shipping charges: 2000 PKR (will be added at checkout)'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Review Order */}
                {step === 2 && (
                  <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-serif text-brand-900 mb-6">Review Your Order</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-brand-800 mb-3">Shipping Address</h3>
                        <p className="text-brand-700">
                          {formData.firstName} {formData.lastName}<br />
                          {formData.address}<br />
                          {formData.city}, {formData.state} {formData.zipCode}<br />
                          {formData.country}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-brand-800 mb-3">Payment Method</h3>
                        <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="font-semibold text-brand-900">Cash on Delivery (COD)</p>
                              <p className="text-sm text-brand-600">
                                {formData.country === 'PK' || formData.country === 'Pakistan'
                                  ? 'Pay when you receive your order'
                                  : 'Pay when you receive your order (International orders may have additional charges)'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {submitError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                          {submitError}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={step === 1}
                    className="px-6 py-3 border border-brand-300 text-brand-700 rounded-lg hover:bg-brand-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={isAutoRegistering}
                      className={`px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                        isAutoRegistering
                          ? 'bg-brand-300 text-white cursor-not-allowed'
                          : 'bg-brand-500 text-white hover:bg-brand-600'
                      }`}
                    >
                      {isAutoRegistering ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <span>Review Order</span>
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-lg hover:from-brand-600 hover:to-brand-700 transition-all duration-300 shadow-lg flex items-center space-x-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Placing Order...</span>
                        </>
                      ) : (
                        <span>Place Order</span>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm border border-brand-200/50 rounded-2xl p-8 sticky top-24">
                <h3 className="text-xl font-serif text-brand-900 mb-6">Order Summary</h3>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-brand-600">Your cart is empty</p>
                      <a href="/books" className="text-brand-500 hover:text-brand-600 underline mt-2 inline-block">
                        Continue Shopping
                      </a>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={`${item.id}-${item.format}`} className="flex items-center space-x-4">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="w-16 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-brand-900">{item.title}</h4>
                          <p className="text-sm text-brand-600">by {item.author}</p>
                          <p className="text-sm text-brand-600">{item.format}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center text-brand-600"
                            >
                              -
                            </button>
                            <span className="text-sm text-brand-600 min-w-[20px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-brand-100 hover:bg-brand-200 flex items-center justify-center text-brand-600"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="ml-2 text-red-500 hover:text-red-700 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="text-brand-800 font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 border-t border-brand-200 pt-4">
                  <div className="flex justify-between text-brand-700">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-brand-700">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                      {formData.country && formData.country !== 'PK' && formData.country !== 'Pakistan' && (
                        <span className="text-xs text-brand-500 block">(International)</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-brand-900 border-t border-brand-200 pt-3">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  {formData.country && formData.country !== 'PK' && formData.country !== 'Pakistan' && (
                    <p className="text-xs text-brand-600 mt-2">
                      * International shipping charges included
                    </p>
                  )}
                  {formData.country === 'PK' || formData.country === 'Pakistan' ? (
                    <p className="text-xs text-brand-600 mt-2">
                      * Cash on Delivery available
                    </p>
                  ) : (
                    <p className="text-xs text-brand-600 mt-2">
                      * Cash on Delivery available (charges apply for international)
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}