import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useTheme } from '../../hooks/useTheme'
import { Moon, Sun, ShoppingBag } from 'lucide-react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg shadow-sm border-b border-slate-100 dark:border-slate-800' 
        : 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="bg-slate-900 dark:bg-white p-2.5 rounded-xl group-hover:shadow-md transition-all duration-300 transform group-hover:scale-105">
                <div className="w-6 h-6 rounded-lg bg-white text-slate-900 dark:bg-slate-900 dark:text-white font-bold text-sm flex items-center justify-center">
                  <ShoppingBag className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                NepalCart
              </span>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium -mt-0.5">Premium Store</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative font-semibold transition-all duration-300 group ${
                isActive('/') 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              Home
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <Link 
              to="/products" 
              className={`relative font-semibold transition-all duration-300 group ${
                isActive('/products') 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              Products
              <span className={`absolute -bottom-2 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${
                isActive('/products') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Link to="/cart" className="group relative">
                <button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-sm shadow-slate-900/10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                  </svg>
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </Link>
              <button
                onClick={toggleTheme}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 h-10 w-10 text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
                aria-label="Toggle theme"
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            <svg className="w-6 h-6 text-slate-700 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-64 pb-6' : 'max-h-0'
        }`}>
          <div className="pt-4 space-y-4">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block font-semibold transition-colors duration-200 ${
                isActive('/') ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block font-semibold transition-colors duration-200 ${
                isActive('/products') ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400'
              }`}
            >
              Products
            </Link>
            <button
              onClick={() => {
                toggleTheme()
                setIsMobileMenuOpen(false)
              }}
              className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
            <Link 
              to="/cart" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-full font-semibold w-full flex items-center justify-center space-x-2 relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
                <span>Cart ({cartCount})</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
