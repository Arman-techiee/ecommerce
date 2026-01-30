import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartCount } = useCart()

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-xl backdrop-blur bg-opacity-95' 
        : 'bg-white bg-opacity-90 shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group flex items-center space-x-3">
            <div className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-2.5 rounded-lg group-hover:shadow-lg transition-all transform group-hover:scale-110">
              <span className="text-white font-black text-2xl">E</span>
            </div>
            <span className="text-2xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent hidden sm:block">
              Commerce
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors duration-200 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors duration-200 relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-linear-to-r from-indigo-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/cart" 
              className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors duration-200 relative group"
            >
              <button className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:scale-110 transition-all duration-300 relative">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar