import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-3">About</h3>
            <p className="text-gray-400 text-sm">Your trusted online shopping destination.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Shop</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">Products</a></li>
              <li><a href="/" className="hover:text-white transition">Categories</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Support</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">Contact</a></li>
              <li><a href="/" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Legal</h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">Privacy</a></li>
              <li><a href="/" className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 Ecommerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer