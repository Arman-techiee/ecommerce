import React from 'react'
import WelcomeBanner from '../components/home/WelcomeBanner'
import ProductCard from '../components/products/ProductCard'
import { products } from '../data/productsData'

function Homepage() {
  return (
    <div className="min-h-screen bg-white">
      <WelcomeBanner user="Arman" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Featured Products</h2>
          <p className="text-gray-600 text-lg">Check out our bestsellers</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

      {/* Simple CTA Section */}
      <div className="bg-gray-100 py-12 mt-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Want to see more?</h3>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition">
            View All Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default Homepage