import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    remember: true,
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = location.state?.from?.pathname || '/'

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const result = login({
      email: formState.email,
      password: formState.password,
      remember: formState.remember,
    })

    if (!result.ok) {
      setError(result.error)
      setIsSubmitting(false)
      return
    }

    navigate(from, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formState.email}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="customer@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formState.password}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
          placeholder="At least 6 characters"
          required
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
          <input
            type="checkbox"
            name="remember"
            checked={formState.remember}
            onChange={handleChange}
            className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-400"
          />
          Remember me
        </label>
        <span className="text-slate-400">Forgot password?</span>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </button>

      <p className="text-xs text-slate-500 dark:text-slate-400">
        Demo: use any email and a password with 6+ characters.
      </p>
    </form>
  )
}

export default LoginForm
