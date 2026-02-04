import React, { useEffect, useState } from 'react'
import WelcomeBanner from '../components/home/WelcomeBanner'
import ProductCard from '../components/products/ProductCard'
import PracticeState from '../components/common/PracticeState'
import { Link } from 'react-router-dom'

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        const data = await response.json();
        setProducts(data);
      } catch(error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Shop the
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Future
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Discover premium products that blend innovation with style. Your perfect shopping experience starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="group">
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    Explore Products
                  </button>
                </Link>
                <button className="border-2 border-white text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white hover:text-black">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">1000+</h3>
                    <p className="text-blue-100">Products</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">50k+</h3>
                    <p className="text-green-100">Customers</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">4.9★</h3>
                    <p className="text-orange-100">Rating</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">24/7</h3>
                    <p className="text-purple-100">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", icon: "📱", color: "from-blue-500 to-cyan-500" },
              { name: "Fashion", icon: "👕", color: "from-pink-500 to-rose-500" },
              { name: "Jewelry", icon: "💎", color: "from-yellow-500 to-orange-500" },
              { name: "Books", icon: "📚", color: "from-green-500 to-emerald-500" }
            ].map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-center text-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Handpicked favorites just for you</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl p-6 animate-pulse">
                  <div className="bg-gray-200 h-64 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : (
              products.map((product, index) => (
                <div key={product.id} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group-hover:scale-105">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
            <p className="text-gray-400 text-lg">Real reviews from real customers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", rating: 5, text: "Amazing quality and fast shipping! Will definitely order again." },
              { name: "Mike Chen", rating: 5, text: "Best online shopping experience I've ever had. Highly recommended!" },
              { name: "Emma Davis", rating: 5, text: "Great customer service and beautiful products. Love this store!" }
            ].map((review, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
                <p className="text-white font-semibold">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 text-lg mb-8">Get the latest deals and product updates delivered to your inbox</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-4 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-gray-100 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage