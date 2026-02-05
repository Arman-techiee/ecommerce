import React, { useState } from 'react'

export default function FilterByRating({ value = 0, onChange = () => {} }) {
  const [hoverValue, setHoverValue] = useState(null)
  const options = [
    { label: 'All ratings', value: 0 },
    { label: '4.5 & up', value: 4.5 },
    { label: '4.0 & up', value: 4.0 },
    { label: '3.5 & up', value: 3.5 },
    { label: '3.0 & up', value: 3.0 }
  ]

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Rating</h3>
        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
          {value === 0 ? 'All' : `${value.toFixed(1)}+`}
        </span>
      </div>
      <div className="grid gap-2">
        {options.map((option) => {
          const active = value === option.value
          const displayValue = hoverValue === option.value ? hoverValue : option.value
          const starCount = option.value === 0 ? 0 : Math.floor(displayValue)
          const hasHalf = option.value !== 0 && displayValue % 1 >= 0.5
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              onMouseEnter={() => setHoverValue(option.value)}
              onMouseLeave={() => setHoverValue(null)}
              className={`flex w-full items-center justify-between rounded-full border px-3 py-2 text-sm font-semibold transition-all ${
                active
                  ? 'border-[#1b1b1f] bg-[#1b1b1f] text-white dark:border-white dark:bg-white dark:text-slate-900'
                  : 'border-[#e5dccb] bg-white/90 text-[#5a554a] hover:bg-[#f1ede6] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <span className="flex items-center gap-1">
                {option.value === 0 ? (
                  <span className="text-xs uppercase tracking-wider">All</span>
                ) : (
                  <>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="relative inline-flex h-4 w-4">
                        <svg
                          className={`h-4 w-4 ${
                            active
                              ? 'text-amber-100/50'
                              : 'text-[#d8d0c3]'
                          }`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.159c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.175 0l-3.366 2.445c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.17 9.382c-.783-.57-.38-1.81.588-1.81h4.159a1 1 0 00.95-.69l1.286-3.955z" />
                        </svg>
                        {(i < starCount || (i === starCount && hasHalf)) && (
                          <span
                            className="absolute inset-0 overflow-hidden"
                            style={{ width: i < starCount ? '100%' : '50%' }}
                          >
                            <svg
                              className={`h-4 w-4 ${
                                active
                                  ? 'text-amber-300'
                                  : 'text-[#caa65b]'
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.159c.969 0 1.371 1.24.588 1.81l-3.366 2.445a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.366-2.445a1 1 0 00-1.175 0l-3.366 2.445c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.17 9.382c-.783-.57-.38-1.81.588-1.81h4.159a1 1 0 00.95-.69l1.286-3.955z" />
                            </svg>
                          </span>
                        )}
                      </span>
                    ))}
                    <span className="ml-2 text-xs font-semibold">{option.value.toFixed(1)}+</span>
                  </>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
