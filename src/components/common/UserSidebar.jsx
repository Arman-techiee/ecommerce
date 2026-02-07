import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function UserSidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'CU'

  return (
    <aside className="w-full lg:w-72 rounded-[28px] border border-[#e5dccb] bg-white/90 p-6 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.35)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-semibold shadow-[0_14px_30px_-18px_rgba(15,23,42,0.8)] dark:bg-white dark:text-slate-900">
          {initials}
        </div>
        <div>
          <p className="text-lg font-semibold text-[#1f1e1b] dark:text-white">
            {user?.name || 'Customer'}
          </p>
          <p className="text-sm text-[#6b645a] dark:text-slate-300">{user?.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Link
          to="/profile"
          className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
            isActive('/profile')
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          Profile Overview
        </Link>
        <Link
          to="/orders"
          className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
            isActive('/orders')
              ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          Orders
        </Link>
        <Link
          to="/settings"
          className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-700"
        >
          Settings (coming soon)
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-[#e5dccb] bg-[#fff7e6] px-4 py-4 text-sm text-[#6b645a] dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
        Member since <span className="font-semibold">2024</span>
      </div>

      <button
        onClick={logout}
        className="mt-6 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
      >
        Logout
      </button>
    </aside>
  )
}

export default UserSidebar
