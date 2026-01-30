import React from 'react'

function WelcomeBanner({ user }) {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome, {user}! 👋</h1>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">Discover amazing products at great prices</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
            Shop Now
          </button>
          <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition">
            View Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeBanner