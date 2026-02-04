import React from 'react'

function SearchProduct({ search, setSearch }) {
  return (
    <div className="mb-8 max-w-md mx-auto">
      <div className="relative">
        <input 
          type="text"
          value={search}
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-4 text-slate-700 dark:text-gray-100 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default SearchProduct
