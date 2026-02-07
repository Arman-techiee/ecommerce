import React from 'react'
import { useLocation } from 'react-router-dom'
import LoginForm from '../components/login/LoginForm'

function LoginPage() {
  const location = useLocation()
  const from = location.state?.from?.pathname

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-[#0b0b0c] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-80 w-80 rounded-full bg-amber-200/40 blur-[120px] dark:bg-amber-500/10"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-neutral-200/50 blur-[140px] dark:bg-slate-800/60"></div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d5b66f] bg-[#fff4d6] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a2d] dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
              Customer Login
            </span>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#1f1e1b] dark:text-white leading-tight">
              Welcome back to NepalCart.
            </h1>
            <p className="text-[#4b4a44] dark:text-slate-300 text-lg leading-relaxed">
              Sign in to unlock single product details, exclusive offers, and a smoother checkout experience.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 text-sm text-[#6b645a] dark:text-slate-300">
              <div className="rounded-2xl border border-[#e5dccb] bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                Curated premium catalog access
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                Faster product checkout
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                Exclusive customer offers
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-white/80 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                Personalized product picks
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#e5dccb] bg-white/90 p-8 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#1f1e1b] dark:text-white">Sign in</h2>
              <p className="text-sm text-[#6b645a] dark:text-slate-300 mt-2">
                {from ? `Continue to ${from}` : 'Access your customer dashboard.'}
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
