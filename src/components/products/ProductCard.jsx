import React, { useState, useEffect } from 'react'
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

function ProductCard({product}) {
  const [isAdded, setIsAdded] = useState(false)
  const [isRemoved, setIsRemoved] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, isInCart, removeFromCart } = useCart();
  const isCart = isInCart(product.id);
  const handleView = () => {
    try {
      const key = 'recently_viewed'
      const current = JSON.parse(localStorage.getItem(key) || '[]')
      const next = [product.id, ...current.filter((id) => id !== product.id)].slice(0, 8)
      localStorage.setItem(key, JSON.stringify(next))
    } catch (error) {
      console.error('Failed to update recently viewed', error)
    }
  }

  // Reset animation states when cart status changes
  useEffect(() => {
    if (isCart) {
      setIsRemoved(false)
    } else {
      setIsAdded(false)
    }
  }, [isCart])

  function addProductToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  function removeProductFromCart(e) {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(product.id);
    setIsRemoved(true)
    setTimeout(() => setIsRemoved(false), 2000)
  }

  const discountPercentage = Math.round(((product.price * 1.2 - product.price) / (product.price * 1.2)) * 100);

  return (
    <div 
      className="group relative bg-white dark:bg-slate-900 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 dark:border-slate-800 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block" onClick={handleView}>
        {/* Image Container */}
        <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 h-64 rounded-t-3xl">
          <img 
            src={product.image} 
            alt={product.title || product.name} 
            className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              -{discountPercentage}%
            </span>
          </div>
          
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          
          {/* Quick View Overlay */}
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <span className="bg-white text-slate-900 px-4 py-2 rounded-full font-semibold text-sm shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className="mb-2">
            <span className="text-xs font-medium text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-300 px-2 py-1 rounded-full">
              {product.category || 'Premium'}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-300">
            {product.title || product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className={`w-4 h-4 ${
                  i < Math.floor(product.rating?.rate || 4.5) ? 'text-amber-400' : 'text-slate-200 dark:text-slate-700'
                }`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">
              {product.rating?.rate || '4.5'} ({product.rating?.count || '128'})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                Rs {product.price}
              </span>
              <span className="text-lg text-slate-400 dark:text-slate-500 line-through">
                Rs {Math.round(product.price * 1.2)}
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400">Free Shipping</div>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Button */}
      <div className="px-6 pb-6">
        {isCart ? (
          <button 
            onClick={removeProductFromCart} 
            disabled={isRemoved}
            className={`w-full font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
              isRemoved 
                ? 'bg-amber-500 text-white' 
                : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200'
            }`}
          >
            {isRemoved ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Removed!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Remove from Cart</span>
              </>
            )}
          </button>
        ) : (
          <button 
            onClick={addProductToCart}
            disabled={isAdded}
            className={`w-full font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
              isAdded 
                ? 'bg-amber-500 text-white' 
                : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200'
            }`}
          >
            {isAdded ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Added to Cart!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
  const placeholderImage =
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop'
  const getSafeImage = (url) => {
    try {
      const parsed = new URL(url)
      if (parsed.protocol !== 'https:') return placeholderImage
      if (!parsed.hostname.includes('images.unsplash.com')) return placeholderImage
      return url
    } catch (error) {
      return placeholderImage
    }
  }
