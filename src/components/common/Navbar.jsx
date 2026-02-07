import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useTheme } from '../../hooks/useTheme'
import { useAuth } from '../../hooks/useAuth'
import { Moon, Sun, ShoppingBag } from 'lucide-react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white dark:bg-slate-950 shadow-[0_12px_50px_-35px_rgba(15,23,42,0.7)] border-b border-slate-200 dark:border-slate-800 md:bg-white/95 md:dark:bg-slate-950/95 md:backdrop-blur-lg md:border-slate-200/70 md:dark:border-slate-800/80' 
        : 'bg-white dark:bg-slate-950 md:bg-white/80 md:dark:bg-slate-950/80 md:backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-center space-x-3">
            <div className="relative">
              <div className="bg-slate-900 dark:bg-white p-2.5 rounded-2xl group-hover:shadow-[0_16px_30px_-16px_rgba(15,23,42,0.5)] transition-all duration-300 transform group-hover:scale-[1.04] ring-1 ring-slate-900/10 dark:ring-white/10">
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
              {isAuthenticated ? (
                <div className="hidden lg:flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <Link
                    to="/profile"
                    className="rounded-full border border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-3 py-1 shadow-sm hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
                  >
                    Hi, {user?.name || 'Customer'}
                  </Link>
                  <button
                    onClick={logout}
                    className="rounded-full border border-slate-200/80 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-md transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_-18px_rgba(15,23,42,0.9)] hover:shadow-[0_18px_40px_-20px_rgba(15,23,42,0.9)] hover:scale-[1.02] transition-all duration-200"
                >
                  Login
                </Link>
              )}
              <Link to="/cart" className="group relative">
                <button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-[1.03] hover:shadow-[0_16px_30px_-18px_rgba(15,23,42,0.8)] shadow-slate-900/10 flex items-center space-x-2">
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
                className="inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 h-10 w-10 text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-md transition-all duration-200"
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
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`md:hidden fixed inset-0 z-50 transition ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Close menu overlay"
          />
          <div
            className={`absolute right-0 top-0 h-full w-[88%] max-w-sm bg-white dark:bg-slate-950 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.8)] border-l border-slate-200/80 dark:border-slate-800 transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="px-6 py-6 flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800 bg-gradient-to-r from-white via-white to-amber-50/80 dark:from-slate-950 dark:via-slate-950 dark:to-amber-500/10">
              <div>
                <span className="text-lg font-semibold text-slate-900 dark:text-white">Menu</span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">NepalCart mobile</p>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-6 space-y-6">
              <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-white to-amber-50/70 dark:from-slate-950 dark:via-slate-950 dark:to-amber-500/10 px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-sm font-semibold shadow-[0_14px_30px_-18px_rgba(15,23,42,0.8)] dark:bg-white dark:text-slate-900">
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : 'NC'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {isAuthenticated ? user?.name || 'Customer' : 'Guest'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isAuthenticated ? user?.email : 'Sign in to continue'}
                    </p>
                  </div>
                </div>
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xs font-semibold text-amber-700 dark:text-amber-300"
                  >
                    View
                  </Link>
                ) : null}
              </div>
              <div className="space-y-2">
                <Link 
                  to="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    isActive('/') ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold transition ${
                    isActive('/products') ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition"
                >
                  <span>Cart</span>
                  <span className="text-xs font-semibold rounded-full bg-amber-100 text-amber-700 px-2.5 py-1 dark:bg-amber-500/20 dark:text-amber-200">
                    {cartCount}
                  </span>
                </Link>
                {isAuthenticated ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition"
                  >
                    Profile
                  </Link>
                ) : null}
                {isAuthenticated ? (
                  <Link
                    to="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900/60 transition"
                  >
                    Orders
                  </Link>
                ) : null}
              </div>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 hover:shadow-md transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-3 text-sm font-semibold text-white text-center shadow-[0_16px_36px_-22px_rgba(15,23,42,0.9)]"
                >
                  Login
                </Link>
              )}
              <button
                onClick={() => {
                  toggleTheme()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
