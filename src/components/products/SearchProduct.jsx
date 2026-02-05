import React from 'react'

function SearchProduct({ search, setSearch }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <input 
          type="text"
          value={search}
          placeholder="Search products, brands, and categories..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-[#e5dccb] bg-white/90 px-5 py-4 pl-12 text-[15px] text-[#2b2a26] shadow-sm placeholder:text-[#9a9387] focus:outline-none focus:ring-2 focus:ring-[#caa65b]/40 focus:border-[#caa65b] dark:border-slate-800 dark:bg-slate-950/70 dark:text-white"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <svg className="w-5 h-5 text-[#b6ad9f] dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold uppercase tracking-wider text-[#9a9387] hover:text-[#5a554a] dark:text-slate-400"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchProduct
