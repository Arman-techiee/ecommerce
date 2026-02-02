import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart';

function ProductCard({product}) {
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart, isInCart, removeFromCart } = useCart();
  const isCart = isInCart(product.id);
  console.log("isCart:", isCart);

  function addProductToCart() {
    addToCart(product);
    handleAddCart();
  }

  function removeProductFromCart() {
    removeFromCart(product.id);
  }

  const handleAddCart = () => {
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-200 h-48 rounded-lg mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
          New
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
      
      <div className="flex items-center gap-1 mb-2">
        <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
        <span className="text-sm text-gray-600">(128)</span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <p className="text-2xl font-bold text-blue-600">${product.price}</p>
        <p className="text-lg text-gray-400 line-through">${Math.round(product.price * 1.2)}</p>
      </div>

      {/* Button */}
      {isCart ? (
        <button onClick={removeProductFromCart} className="w-full font-semibold py-2 px-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
          Remove from cart
        </button>
      ) : (
        <button 
        onClick={addProductToCart}
        className={`w-full font-semibold py-2 px-4 rounded-lg transition ${
          isAdded 
            ? 'bg-green-500 text-white' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isAdded ? '✓ Added!' : 'Add to Cart'}
      </button>
      )}
      
    </div>
  )
}

export default ProductCard
