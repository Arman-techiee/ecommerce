import React from 'react'
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems = [], removeFromCart, updateQuantity, clearCart, cartCount } = useCart()

  // Calculate totals manually
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-12 border border-slate-100 dark:border-slate-800">
          <div className="w-32 h-32 mx-auto mb-8 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800">
            <svg className="w-16 h-16 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Cart is Empty</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/products">
            <button className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Shopping Cart</h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="self-start sm:self-auto rounded-full border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-300 transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-slate-50 dark:bg-slate-950 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                        <img 
                          src={item.image} 
                          alt={item.title || item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            {item.title || item.name}
                          </h3>
                          <p className="text-sm text-amber-700 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-300 px-2 py-1 rounded-full inline-block">
                            {item.category || 'Premium'}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Quantity Display */}
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Quantity:</span>
                          <div className="flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="h-8 w-8 rounded-full text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="px-3 font-semibold text-slate-900 dark:text-white">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="h-8 w-8 rounded-full text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900 dark:text-white">
                            Rs {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            Rs {item.price} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-8 sticky top-24 border border-slate-100 dark:border-slate-800">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Subtotal ({cartCount} items)</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}>
                    {shipping === 0 ? 'FREE' : `Rs ${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-300">
                  <span>Tax</span>
                  <span>Rs {tax.toFixed(2)}</span>
                </div>
                <hr className="border-slate-200 dark:border-slate-700" />
                <div className="flex justify-between text-xl font-bold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span>Rs {total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 dark:bg-amber-500/10 dark:border-amber-500/20">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-amber-800 dark:text-amber-200">
                      Add Rs {(50 - subtotal).toFixed(2)} more for free shipping!
                    </span>
                  </div>
                </div>
              )}

              <Link to="/checkout">
                <button className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold py-4 px-6 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
                  Proceed to Checkout
                </button>
              </Link>
              
              <Link to="/products">
                <button className="w-full border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-300 font-semibold py-3 px-6 rounded-2xl transition-all duration-300">
                  Continue Shopping
                </button>
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
