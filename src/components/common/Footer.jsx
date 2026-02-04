import React from 'react'

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
      <div className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <h3 className="text-lg font-bold mb-3">ShopHub</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Thoughtfully curated essentials with fast delivery and friendly support.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              Trusted by 10k+ customers
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Shop</h3>
            <ul className="text-slate-400 text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">Products</a></li>
              <li><a href="/" className="hover:text-white transition">Categories</a></li>
              <li><a href="/" className="hover:text-white transition">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Support</h3>
            <ul className="text-slate-400 text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">Contact</a></li>
              <li><a href="/" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/" className="hover:text-white transition">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-3">Company</h3>
            <ul className="text-slate-400 text-sm space-y-2">
              <li><a href="/" className="hover:text-white transition">About</a></li>
              <li><a href="/" className="hover:text-white transition">Privacy</a></li>
              <li><a href="/" className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; 2026 NepalCart. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  )
}

export default Footer
