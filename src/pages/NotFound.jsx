import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10 text-center shadow-lg">
        <div className="mx-auto mb-6 h-14 w-14 rounded-2xl bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xl font-semibold">
          404
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          The page you’re looking for doesn’t exist or may have been moved. Try searching our products or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold px-6 py-3 rounded-full transition">
            Back to Home
          </Link>
          <Link to="/products" className="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-300 font-semibold px-6 py-3 rounded-full transition">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
