import React from 'react'

function WelcomeBanner({ user }) {
  return (
    <div className="bg-slate-950 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome, {user}! 👋</h1>
        <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">Discover curated products with refined quality</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-slate-900 font-semibold py-3 px-8 rounded-lg hover:bg-slate-100 transition">
            Shop Now
          </button>
          <button className="border border-white/30 text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-slate-900 transition">
            View Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner
