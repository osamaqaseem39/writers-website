'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageShell } from '@/components/PageShell'
import { useAuth } from '@/contexts/AuthContext'

export default function SignupPage() {
  const { register, isLoading } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; password?: boolean; confirmPassword?: boolean }>({})

  const nameError = useMemo(() => {
    if (!touched.name) return ''
    return name ? '' : 'Name is required'
  }, [name, touched.name])

  const emailError = useMemo(() => {
    if (!touched.email) return ''
    if (!email) return 'Email is required'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email) ? '' : 'Enter a valid email'
  }, [email, touched.email])

  const passwordError = useMemo(() => {
    if (!touched.password) return ''
    if (!password) return 'Password is required'
    return password.length >= 6 ? '' : 'Password must be at least 6 characters'
  }, [password, touched.password])

  const confirmPasswordError = useMemo(() => {
    if (!touched.confirmPassword) return ''
    if (!confirmPassword) return 'Confirm your password'
    return confirmPassword === password ? '' : 'Passwords do not match'
  }, [confirmPassword, password, touched.confirmPassword])

  const isFormInvalid = !!nameError || !!emailError || !!passwordError || !!confirmPasswordError || !name || !email || !password || !confirmPassword

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    if (isFormInvalid) return
    const result = await register(name, email, password)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.message || 'Could not sign up. Please check your details.')
    }
  }

  return (
    <PageShell>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-semibold mb-6 text-brand-900">Create account</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-brand-700 mb-1">Name</label>
              <input 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                onBlur={() => setTouched(v => ({ ...v, name: true }))}
                type="text" 
                className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 ${nameError ? 'border-red-400' : 'border-brand-200'}`} 
                aria-invalid={!!nameError}
                aria-describedby={nameError ? 'signup-name-error' : undefined}
              />
              {nameError && <p id="signup-name-error" className="text-red-600 text-xs mt-1">{nameError}</p>}
            </div>
            <div>
              <label className="block text-sm text-brand-700 mb-1">Email</label>
              <input 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                onBlur={() => setTouched(v => ({ ...v, email: true }))}
                type="email" 
                className={`w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 ${emailError ? 'border-red-400' : 'border-brand-200'}`} 
                aria-invalid={!!emailError}
                aria-describedby={emailError ? 'signup-email-error' : undefined}
              />
              {emailError && <p id="signup-email-error" className="text-red-600 text-xs mt-1">{emailError}</p>}
            </div>
            <div>
              <label className="block text-sm text-brand-700 mb-1">Password</label>
              <div className="relative">
                <input 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  onBlur={() => setTouched(v => ({ ...v, password: true }))}
                  type={showPassword ? 'text' : 'password'} 
                  className={`w-full border rounded-xl px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-500 ${passwordError ? 'border-red-400' : 'border-brand-200'}`} 
                  aria-invalid={!!passwordError}
                  aria-describedby={passwordError ? 'signup-password-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-700 hover:text-brand-900"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {passwordError && <p id="signup-password-error" className="text-red-600 text-xs mt-1">{passwordError}</p>}
            </div>
            <div>
              <label className="block text-sm text-brand-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input 
                  value={confirmPassword} 
                  onChange={e=>setConfirmPassword(e.target.value)} 
                  onBlur={() => setTouched(v => ({ ...v, confirmPassword: true }))}
                  type={showConfirmPassword ? 'text' : 'password'} 
                  className={`w-full border rounded-xl px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-500 ${confirmPasswordError ? 'border-red-400' : 'border-brand-200'}`} 
                  aria-invalid={!!confirmPasswordError}
                  aria-describedby={confirmPasswordError ? 'signup-confirm-error' : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(s => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-700 hover:text-brand-900"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {confirmPasswordError && <p id="signup-confirm-error" className="text-red-600 text-xs mt-1">{confirmPasswordError}</p>}
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button disabled={isLoading || isFormInvalid} type="submit" className={`w-full text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg bg-gradient-to-r from-brand-500 to-brand-600 ${isLoading || isFormInvalid ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
            <p className="text-sm text-brand-700 text-center">
              Already have an account? <a href="/login" className="text-brand-600 underline">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </PageShell>
  )
}

