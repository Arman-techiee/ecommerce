import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

function SingleProductPage() {
    const params = useParams();
    const { addToCart, isInCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
          try {
            const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
            const data = await response.json();
            setProduct(data);
          }
          catch(error) {
            console.error('Error fetching product', error);
          }
          finally {
            setLoading(false);
          }
        }
        if (params?.id) fetchProduct();
      }, [params]);

    console.log("item", product)
    console.log("loading", loading)

    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
      )
    }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex justify-center bg-gray-50 rounded-xl p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-[500px] object-contain rounded-lg"
          />
        </div>
        <div className="py-4">
          <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-400 text-xl">★★★★☆</span>
            <span className="text-gray-500 text-sm">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          <div className="text-4xl font-bold text-green-600 mb-6">
            ${product.price}
          </div>
          <p className="text-gray-700 leading-relaxed mb-8 text-base">
            {product.description}
          </p>
          <button 
            onClick={() => {
              if (!isInCart(product.id)) {
                addToCart(product);
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 2000);
              }
            }}
            disabled={isInCart(product.id)}
            className={`w-full max-w-sm px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ${
              isInCart(product.id)
                ? 'bg-gray-400 cursor-not-allowed'
                : isAdded 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}>
            {isInCart(product.id) ? 'Already in Cart' : isAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage