import React, { useEffect, useMemo, useRef, useState } from 'react'
import ProductCard from '../components/products/ProductCard'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

function Homepage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const trendingRef = useRef(null)
  const [recentIds, setRecentIds] = useState([])
  const navigate = useNavigate()
  const { addToCart, isInCart } = useCart()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=30')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('recently_viewed') || '[]')
      setRecentIds(Array.isArray(stored) ? stored : [])
    } catch (error) {
      console.error('Failed to read recently viewed', error)
    }
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const scrollToTrending = () => {
    if (trendingRef.current) {
      trendingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const applySearch = (e) => {
    e.preventDefault()
    const q = searchInput.trim()
    if (!q) return
    navigate(`/products?search=${encodeURIComponent(q)}`)
  }

  const selectCategory = (category) => {
    setActiveCategory(category)
    setSearchQuery('')
    setSearchInput('')
    setTimeout(scrollToTrending, 100)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory
      const q = searchQuery.toLowerCase().trim()
      const matchesQuery =
        q === '' ||
        product.title?.toLowerCase().includes(q) ||
        product.description?.toLowerCase().includes(q) ||
        product.category?.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [products, searchQuery, activeCategory])

  const trendingProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0))
      .slice(0, 4)
  }, [products])

  const bestSellerProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      .slice(0, 4)
  }, [products])

  const dealProducts = useMemo(() => {
    return products.slice(0, 4).map((product, index) => {
      const discount = 15 + (index % 4) * 5
      const discountedPrice = Number((product.price * (1 - discount / 100)).toFixed(2))
      return { ...product, discount, discountedPrice }
    })
  }, [products])

  const recentlyViewedProducts = useMemo(() => {
    return recentIds
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean)
      .slice(0, 4)
  }, [products, recentIds])

  const categories = [
    { label: 'All', value: 'all', icon: '✨' },
    { label: 'Electronics', value: 'electronics', icon: '📱' },
    { label: 'Jewelry', value: 'jewelery', icon: '💎' },
    { label: 'Men', value: "men's clothing", icon: '🧥' },
    { label: 'Women', value: "women's clothing", icon: '👗' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[calc(100vh-80px)] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-amber-200/90 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-amber-300"></span>
                Big-store selection, luxury-minimal experience
              </span>
              <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Everything you need,
                <span className="block bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
                  curated and refined
                </span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed">
                Discover premium essentials, trending tech, and everyday favorites with fast delivery and trusted quality.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="group">
                  <button className="bg-white text-slate-900 hover:bg-slate-100 font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-black/20">
                    Shop now
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </Link>
                <button className="border border-white/20 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:bg-white/10">
                  Browse categories
                </button>
              </div>

              <form onSubmit={applySearch} className="mt-8 max-w-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search products, brands, and categories"
                        className="w-full rounded-full bg-white/10 border border-white/15 px-5 py-4 pr-14 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="rounded-full bg-amber-400 text-slate-900 font-semibold px-6 py-4 hover:bg-amber-300 transition">
                    Search
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                  <span className="rounded-full border border-white/10 px-3 py-1">Electronics</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Fashion</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Home</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">Accessories</span>
                </div>
              </form>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-amber-300/20 to-white/10 blur-2xl"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="col-span-2 bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-amber-200/80">Featured deal</div>
                      <div className="text-lg font-semibold">Heritage Leather Bag</div>
                    </div>
                    <div className="text-amber-200 font-semibold">Rs 249</div>
                  </div>
                  <div className="mt-4 h-44 rounded-2xl bg-white/10 border border-white/10 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=900&auto=format&fit=crop"
                      alt="Heritage leather bag"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-3xl p-5 border border-white/10">
                  <div className="text-xs text-slate-300">New arrival</div>
                  <div className="mt-2 text-base font-semibold">Smart Watch</div>
                  <div className="mt-4 h-28 rounded-2xl bg-white/10 border border-white/10 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop"
                      alt="Smart watch"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur rounded-3xl p-5 border border-white/10">
                  <div className="text-xs text-slate-300">Bestseller</div>
                  <div className="mt-2 text-base font-semibold">Noise Canceling</div>
                  <div className="mt-4 h-28 rounded-2xl bg-white/10 border border-white/10 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&auto=format&fit=crop"
                      alt="Noise canceling headphones"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Shop by Category</h2>
            <Link to="/products" className="text-amber-600 dark:text-amber-400 font-semibold">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => selectCategory(category.value)}
                className={`rounded-3xl p-5 border transition-all duration-300 text-left ${
                  activeCategory === category.value
                    ? 'border-amber-300 bg-amber-50 dark:bg-amber-500/10'
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-white dark:hover:bg-slate-950'
                }`}
              >
                <div className="text-2xl">{category.icon}</div>
                <div className="mt-2 text-base font-semibold text-slate-900 dark:text-white">{category.label}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Tap to filter</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Collections */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Curated Collections</h2>
            <Link to="/products" className="text-amber-600 dark:text-amber-400 font-semibold">
              Explore
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Modern Work',
                subtitle: 'Lifestyle desks and tech',
                img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop'
              },
              {
                title: 'Everyday Carry',
                subtitle: 'Studio-crafted leather goods',
                img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&auto=format&fit=crop'
              },
              {
                title: 'Wellness Edit',
                subtitle: 'Lifestyle and self-care',
                img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop'
              }
            ].map((c, i) => (
              <div key={i} className="relative overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
                <img src={c.img} alt={c.title} className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-5">
                  <div className="text-sm text-slate-500 dark:text-slate-400">{c.subtitle}</div>
                  <div className="text-lg font-semibold text-slate-900 dark:text-white">{c.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Slider */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Popular Right Now</h2>
            <Link to="/products" className="text-amber-600 dark:text-amber-400 font-semibold">
              Explore all
            </Link>
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {loading
                ? [...Array(8)].map((_, i) => (
                    <div key={`sk-${i}`} className="w-64 shrink-0 bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 animate-pulse">
                      <div className="h-36 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                    </div>
                  ))
                : [...products, ...products].map((product, i) => (
                    <div key={`${product.id}-${i}`} className="w-64 shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Flash Deals</h2>
            <Link to="/products" className="text-amber-600 dark:text-amber-400 font-semibold">
              Shop deals
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? [...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-950 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 animate-pulse">
                    <div className="h-40 bg-slate-200 dark:bg-slate-700 rounded-2xl mb-4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                ))
              : dealProducts.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-slate-950 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                    <div className="h-40 bg-slate-50 dark:bg-slate-900 rounded-2xl mb-4 overflow-hidden">
                      <img src={product.image} alt={product.title} className="h-full w-full object-contain p-4" loading="lazy" />
                    </div>
                    <div className="text-sm text-amber-600 dark:text-amber-400 font-semibold">-{product.discount}%</div>
                    <div className="mt-1 text-base font-semibold text-slate-900 dark:text-white line-clamp-2">{product.title}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900 dark:text-white">Rs {product.discountedPrice}</span>
                      <span className="text-sm text-slate-400 line-through">Rs {product.price}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (isInCart(product.id)) return
                        addToCart({ ...product, price: product.discountedPrice })
                      }}
                      className="mt-4 w-full rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold py-2.5 transition"
                    >
                      {isInCart(product.id) ? 'In Cart' : 'Add Deal'}
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Recently Viewed</h2>
            <Link to="/products" className="text-amber-600 dark:text-amber-400 font-semibold">
              View all
            </Link>
          </div>
          {recentlyViewedProducts.length === 0 ? (
            <div className="rounded-3xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-8 text-center text-slate-600 dark:text-slate-300">
              Browse products to see your recently viewed items here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentlyViewedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Editorial */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&auto=format&fit=crop"
                alt="Editorial"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <div className="text-amber-600 dark:text-amber-400 font-semibold text-sm">Editorial</div>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">Design-forward choices for everyday life</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-4">
                From workspace essentials to modern accessories, our editorial highlights products that blend form, function, and lasting quality.
              </p>
              <Link to="/products" className="inline-block mt-6 text-slate-900 dark:text-white font-semibold">
                Read the edit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Best Sellers</h2>
            <Link to="/products" className="text-amber-600 dark:text-amber-400 font-semibold">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 shadow-lg animate-pulse">
                  <div className="bg-slate-200 dark:bg-slate-700 h-40 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
              ))
            ) : (
              bestSellerProducts.map((product) => <ProductCard key={product.id} product={product} />)
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { title: 'Fast Delivery', desc: '2-day shipping on most orders' },
              { title: 'Secure Payments', desc: 'Encrypted checkout and protection' },
              { title: 'Easy Returns', desc: '30-day no-questions return policy' },
              { title: 'Quality Promise', desc: 'Curated brands and verified reviews' }
            ].map((b, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                <div className="text-lg font-semibold text-slate-900 dark:text-white">{b.title}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Customer Reviews</h2>
            <p className="text-slate-300 mt-2">Trusted by thousands of shoppers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah Johnson', role: 'Fashion Enthusiast', text: 'Beautiful products and fast delivery. The quality feels premium.', rating: 5 },
              { name: 'Mike Chen', role: 'Tech Professional', text: 'Great selection and smooth checkout. My go-to for essentials.', rating: 5 },
              { name: 'Emma Davis', role: 'Designer', text: 'Thoughtful curation and elegant packaging. Highly recommend.', rating: 5 }
            ].map((review, index) => (
              <div key={index} className="bg-white/5 rounded-3xl p-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm text-slate-300">{review.role}</div>
                  </div>
                  <div className="text-amber-400">{'★'.repeat(review.rating)}</div>
                </div>
                <p className="mt-4 text-slate-200">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="bg-white dark:bg-slate-950 rounded-3xl p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Stay in the Loop</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-2 mb-8">Get exclusive deals, new arrivals, and insider updates.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-200/60 transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Subscribe
              </button>
            </form>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Homepage
