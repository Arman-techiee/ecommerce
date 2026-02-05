import React from 'react'

export default function ProductRange({
  min = 0,
  max = 1000,
  value = { min: 0, max: 1000 },
  onChange = () => {},
  compact = false
}) {
  const safeMin = Math.max(min, Math.min(value.min, value.max))
  const safeMax = Math.min(max, Math.max(value.max, value.min))

  const handleMinChange = (event) => {
    const nextMin = Math.max(min, Math.min(Number(event.target.value), safeMax))
    onChange({ min: nextMin, max: safeMax })
  }

  const handleMaxChange = (event) => {
    const nextMax = Math.min(max, Math.max(Number(event.target.value), safeMin))
    onChange({ min: safeMin, max: nextMax })
  }

  return (
    <div className="w-full">
      <div className={`flex items-center justify-between ${compact ? 'mb-2' : 'mb-3'}`}>
        <div>
          <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-semibold text-slate-900 dark:text-white`}>
            Price {compact ? '' : 'Range'}
          </h3>
          {!compact && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Select a range between Rs {min.toFixed(0)} and Rs {max.toFixed(0)}
            </p>
          )}
        </div>
        <div className={`${compact ? 'text-xs' : 'text-sm'} font-semibold text-amber-600 dark:text-amber-400`}>
          Rs {safeMin.toFixed(0)} - Rs {safeMax.toFixed(0)}
        </div>
      </div>
      <div className={`grid ${compact ? 'grid-cols-2 gap-3 mb-3' : 'grid-cols-1 md:grid-cols-2 gap-4 mb-4'}`}>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Min</span>
          <input
            type="number"
            min={min}
            max={safeMax}
            value={safeMin}
            onChange={handleMinChange}
            className={`${compact ? 'py-1.5 text-sm' : 'py-2'} w-full rounded-lg border border-[#e5dccb] bg-white/90 px-3 text-[#2b2a26] shadow-sm focus:border-[#caa65b] focus:ring-2 focus:ring-[#caa65b]/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white`}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Max</span>
          <input
            type="number"
            min={safeMin}
            max={max}
            value={safeMax}
            onChange={handleMaxChange}
            className={`${compact ? 'py-1.5 text-sm' : 'py-2'} w-full rounded-lg border border-[#e5dccb] bg-white/90 px-3 text-[#2b2a26] shadow-sm focus:border-[#caa65b] focus:ring-2 focus:ring-[#caa65b]/30 dark:border-slate-700 dark:bg-slate-950 dark:text-white`}
          />
        </label>
      </div>
      <div className={`grid ${compact ? 'grid-cols-2 gap-3' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
        <label className="flex flex-col gap-2">
          {!compact && (
            <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Min Slider</span>
          )}
          <input
            type="range"
            min={min}
            max={max}
            value={safeMin}
            onChange={handleMinChange}
            className="w-full accent-[#caa65b]"
          />
        </label>
        <label className="flex flex-col gap-2">
          {!compact && (
            <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Max Slider</span>
          )}
          <input
            type="range"
            min={min}
            max={max}
            value={safeMax}
            onChange={handleMaxChange}
            className="w-full accent-[#caa65b]"
          />
        </label>
      </div>
    </div>
  )
}
