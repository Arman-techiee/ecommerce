import React, { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/products/ProductCard'
import categoryData from '../data/categories'
import SearchProduct from '../components/products/SearchProduct';
import ProductRange from '../components/products/ProductRange'
import FilterByRating from '../components/products/FilterByRating'
import { useLocation } from 'react-router-dom'

// Additional mock products to supplement the API
const additionalProducts = [
  {
    id: 101,
    title: "Premium Wireless Headphones",
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: { rate: 4.8, count: 320 }
  },
  {
    id: 102,
    title: "Smart Fitness Watch",
    price: 299.99,
    description: "Advanced fitness tracking with heart rate monitor",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: { rate: 4.6, count: 180 }
  },
  {
    id: 103,
    title: "Designer Leather Jacket",
    price: 249.99,
    description: "Premium leather jacket for men",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    rating: { rate: 4.7, count: 95 }
  },
  {
    id: 104,
    title: "Elegant Pearl Necklace",
    price: 159.99,
    description: "Beautiful pearl necklace for special occasions",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    rating: { rate: 4.9, count: 67 }
  },
  {
    id: 105,
    title: "Casual Summer Dress",
    price: 79.99,
    description: "Light and comfortable summer dress",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
    rating: { rate: 4.5, count: 142 }
  },
  {
    id: 106,
    title: "Professional Laptop Bag",
    price: 89.99,
    description: "Durable laptop bag for professionals",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: { rate: 4.4, count: 203 }
  },
  {
    id: 107,
    title: "Bluetooth Speaker",
    price: 129.99,
    description: "Portable wireless speaker with excellent sound quality",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
    rating: { rate: 4.6, count: 156 }
  },
  {
    id: 108,
    title: "Gold Chain Bracelet",
    price: 199.99,
    description: "Elegant gold-plated chain bracelet",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
    rating: { rate: 4.8, count: 89 }
  },
  {
    id: 109,
    title: "Gaming Mechanical Keyboard",
    price: 149.99,
    description: "RGB backlit mechanical keyboard for gaming",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
    rating: { rate: 4.7, count: 245 }
  },
  {
    id: 110,
    title: "Vintage Denim Jacket",
    price: 119.99,
    description: "Classic vintage-style denim jacket",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
    rating: { rate: 4.3, count: 128 }
  },
  {
    id: 111,
    title: "Silk Scarf Collection",
    price: 69.99,
    description: "Luxurious silk scarf with elegant patterns",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=500",
    rating: { rate: 4.6, count: 87 }
  },
  {
    id: 112,
    title: "Diamond Stud Earrings",
    price: 399.99,
    description: "Brilliant cut diamond earrings in white gold",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
    rating: { rate: 4.9, count: 156 }
  },
  {
    id: 113,
    title: "Wireless Gaming Mouse",
    price: 79.99,
    description: "High-precision wireless gaming mouse",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
    rating: { rate: 4.5, count: 312 }
  },
  {
    id: 114,
    title: "Formal Business Suit",
    price: 449.99,
    description: "Premium wool business suit for men",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    rating: { rate: 4.8, count: 73 }
  },
  {
    id: 115,
    title: "Bohemian Maxi Dress",
    price: 129.99,
    description: "Flowy bohemian-style maxi dress",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?w=500",
    rating: { rate: 4.4, count: 198 }
  },
  {
    id: 116,
    title: "Silver Watch Collection",
    price: 279.99,
    description: "Elegant silver watch with leather strap",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
    rating: { rate: 4.7, count: 134 }
  },
  {
    id: 117,
    title: "4K Webcam",
    price: 189.99,
    description: "Ultra HD webcam for streaming and video calls",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
    rating: { rate: 4.6, count: 267 }
  },
  {
    id: 118,
    title: "Casual Polo Shirt",
    price: 49.99,
    description: "Comfortable cotton polo shirt",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500",
    rating: { rate: 4.2, count: 289 }
  },
  {
    id: 119,
    title: "Designer Handbag",
    price: 329.99,
    description: "Luxury leather handbag with gold accents",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
    rating: { rate: 4.8, count: 145 }
  },
  {
    id: 120,
    title: "Rose Gold Ring Set",
    price: 249.99,
    description: "Beautiful rose gold ring set with crystals",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
    rating: { rate: 4.7, count: 92 }
  },
  {
    id: 121,
    title: "Minimalist Desk Lamp",
    price: 59.99,
    description: "Warm LED desk lamp with adjustable arm",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=500",
    rating: { rate: 4.4, count: 210 }
  },
  {
    id: 122,
    title: "Premium Leather Tote",
    price: 199.99,
    description: "Full-grain leather tote for everyday use",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
    rating: { rate: 4.8, count: 184 }
  },
  {
    id: 123,
    title: "Classic Analog Watch",
    price: 179.99,
    description: "Stainless steel watch with leather strap",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
    rating: { rate: 4.6, count: 143 }
  },
  {
    id: 124,
    title: "Wireless Earbuds Pro",
    price: 129.99,
    description: "Noise-isolating earbuds with long battery life",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1585386959984-a41552231692?w=500",
    rating: { rate: 4.5, count: 265 }
  },
  {
    id: 125,
    title: "Cashmere Knit Sweater",
    price: 149.99,
    description: "Soft cashmere sweater with a tailored fit",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: { rate: 4.7, count: 98 }
  },
  {
    id: 126,
    title: "Scented Candle Set",
    price: 39.99,
    description: "Luxury candles with calming aromas",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
    rating: { rate: 4.3, count: 77 }
  },
  {
    id: 127,
    title: "Silk Sleep Set",
    price: 89.99,
    description: "Silk pillowcase and sleep mask set",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=500",
    rating: { rate: 4.5, count: 122 }
  },
  {
    id: 128,
    title: "Ribbed Cotton Tee",
    price: 29.99,
    description: "Breathable cotton tee with a relaxed fit",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: { rate: 4.2, count: 156 }
  },
  {
    id: 129,
    title: "Gold Pendant Necklace",
    price: 139.99,
    description: "Delicate pendant necklace in gold tone",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    rating: { rate: 4.6, count: 88 }
  },
  {
    id: 130,
    title: "Ergonomic Office Chair",
    price: 249.99,
    description: "Comfortable chair with lumbar support",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500",
    rating: { rate: 4.4, count: 134 }
  },
  {
    id: 131,
    title: "Compact Bluetooth Soundbar",
    price: 159.99,
    description: "Slim soundbar with rich, room-filling sound",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=500",
    rating: { rate: 4.5, count: 196 }
  },
  {
    id: 132,
    title: "Noise-Isolating Earbuds",
    price: 79.99,
    description: "Comfort-fit earbuds with crisp audio",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1518441902110-6df3c17b0b65?w=500",
    rating: { rate: 4.3, count: 214 }
  },
  {
    id: 133,
    title: "Smart Home Hub",
    price: 129.99,
    description: "Voice-enabled hub for connected devices",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    rating: { rate: 4.4, count: 172 }
  },
  {
    id: 134,
    title: "Portable Power Bank",
    price: 49.99,
    description: "10,000mAh fast-charging power bank",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500",
    rating: { rate: 4.2, count: 301 }
  },
  {
    id: 135,
    title: "Minimal Travel Backpack",
    price: 119.99,
    description: "Water-resistant backpack with laptop sleeve",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500",
    rating: { rate: 4.6, count: 189 }
  },
  {
    id: 136,
    title: "Relaxed Linen Shirt",
    price: 69.99,
    description: "Breathable linen shirt for warm days",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: { rate: 4.3, count: 143 }
  },
  {
    id: 137,
    title: "Tailored Chino Pants",
    price: 79.99,
    description: "Slim fit chinos with stretch comfort",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500",
    rating: { rate: 4.4, count: 167 }
  },
  {
    id: 138,
    title: "Classic Oxford Shoes",
    price: 149.99,
    description: "Polished leather shoes for formal wear",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500",
    rating: { rate: 4.5, count: 98 }
  },
  {
    id: 139,
    title: "Silk Wrap Blouse",
    price: 89.99,
    description: "Elegant blouse with soft drape",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500",
    rating: { rate: 4.6, count: 154 }
  },
  {
    id: 140,
    title: "Structured Blazer",
    price: 179.99,
    description: "Tailored blazer with clean lines",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: { rate: 4.7, count: 121 }
  },
  {
    id: 141,
    title: "Flowy Pleated Skirt",
    price: 74.99,
    description: "Lightweight skirt with elegant movement",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500",
    rating: { rate: 4.4, count: 137 }
  },
  {
    id: 142,
    title: "Cashmere Scarf",
    price: 59.99,
    description: "Soft cashmere scarf for all seasons",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500",
    rating: { rate: 4.5, count: 116 }
  },
  {
    id: 143,
    title: "Pearl Drop Earrings",
    price: 119.99,
    description: "Elegant pearl drops with gold accents",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500",
    rating: { rate: 4.7, count: 92 }
  },
  {
    id: 144,
    title: "Minimal Gold Bangle",
    price: 89.99,
    description: "Sleek bangle with a refined finish",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500",
    rating: { rate: 4.5, count: 104 }
  },
  {
    id: 145,
    title: "Gemstone Ring Set",
    price: 149.99,
    description: "Stackable rings with subtle gemstones",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500",
    rating: { rate: 4.6, count: 88 }
  },
  {
    id: 146,
    title: "Silver Charm Bracelet",
    price: 109.99,
    description: "Delicate bracelet with charm details",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500",
    rating: { rate: 4.4, count: 73 }
  }
];

export default function Productspage() {
  const location = useLocation()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const[search, setSearch]=useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 })
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 })
  const [priceTouched, setPriceTouched] = useState(false)
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get('search') || ''
    const category = params.get('category') || 'all'
    setSearch(q)
    setSelectedCategory(category)
  }, [location.search])

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // Combine API products with additional mock products
        setProducts([...data, ...additionalProducts]);
      }
      catch(error) {
        console.error('Error fetching products', error);
        // If API fails, use only additional products
        setProducts(additionalProducts);
        setError('Some products may not be available. Showing available items.');
      }
      finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return
    const prices = products.map((product) => Number(product.price) || 0)
    const min = Math.floor(Math.min(...prices))
    const max = Math.ceil(Math.max(...prices))
    setPriceBounds({ min, max })
    if (!priceTouched) {
      setPriceRange({ min, max })
    }
  }, [products, priceTouched])

  const filteredProducts = useMemo(() => {
    const hasRange = priceBounds.max > priceBounds.min
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesSearch = search === '' ||
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      const price = Number(product.price) || 0
      const matchesPrice = !hasRange || (price >= priceRange.min && price <= priceRange.max)
      const rating = Number(product.rating?.rate) || 0
      const matchesRating = minRating === 0 || rating >= minRating
      return matchesCategory && matchesSearch && matchesPrice && matchesRating
    })
  }, [products, selectedCategory, search, priceRange, priceBounds, minRating])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 dark:bg-slate-700 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 animate-pulse">
                <div className="bg-gray-200 dark:bg-slate-700 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-[#0b0b0c] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-[120px] dark:bg-amber-500/10"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-neutral-200/50 blur-[140px] dark:bg-slate-800/60"></div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/70 to-transparent dark:from-white/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d5b66f] bg-[#fff4d6] px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#8a6a2d] shadow-sm dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
            Maison collection
          </div>
          <h1 className="text-4xl sm:text-6xl font-semibold text-[#1b1b1f] dark:text-white mt-4 mb-3 tracking-tight">
            All Products
          </h1>
          <p className="text-[#4b4a44] dark:text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Discover our carefully curated collection of premium products
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#caa65b]"></div>
            <div className="h-2 w-2 rounded-full bg-[#caa65b]"></div>
            <div className="h-px w-12 bg-[#caa65b]"></div>
          </div>
        </div>
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          <aside className="lg:sticky lg:top-6">
            <div className="rounded-[32px] border border-[#e5dccb] bg-gradient-to-br from-white/95 via-white/90 to-[#fff7e6]/80 shadow-[0_28px_80px_-50px_rgba(0,0,0,0.45)] backdrop-blur dark:border-slate-800 dark:from-slate-950/80 dark:via-slate-950/70 dark:to-slate-900/70">
              <div className="px-6 pt-6">
                <div className="flex flex-col gap-2">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#a18b5a]">Find your piece</p>
                  <h2 className="text-lg font-semibold text-[#1f1e1b] dark:text-white">Search & refine</h2>
                  <div className="text-xs text-[#8a8174] dark:text-slate-400">
                    {filteredProducts.length} items available
                  </div>
                </div>
              </div>
              <div className="px-6 pt-4">
                <SearchProduct search={search} setSearch={setSearch} />
              </div>

              {/* Filters */}
              <div className="px-6 pb-6">
                <div className="mt-4 grid gap-5">
                  <div className="flex flex-wrap items-center justify-start gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${
                        selectedCategory === 'all'
                          ? 'bg-[#1b1b1f] text-white dark:bg-white dark:text-slate-900'
                          : 'bg-[#f1ede6] text-[#5a554a] hover:bg-[#e6dfd3] dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800'
                      }`}
                    >
                      All
                    </button>
                    {categoryData.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm capitalize ${
                          selectedCategory === category
                            ? 'bg-[#1b1b1f] text-white dark:bg-white dark:text-slate-900'
                            : 'bg-[#f1ede6] text-[#5a554a] hover:bg-[#e6dfd3] dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <div className="grid gap-3 rounded-2xl border border-[#e5dccb] bg-[#fffaf2] p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
                    <ProductRange
                      min={priceBounds.min}
                      max={priceBounds.max}
                      value={priceRange}
                      compact
                      onChange={(nextRange) => {
                        setPriceTouched(true)
                        setPriceRange(nextRange)
                      }}
                    />
                    <FilterByRating value={minRating} onChange={setMinRating} />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section>
            {/* Products Count */}
            <div className="mb-6">
              <p className="text-slate-500 dark:text-slate-400 text-center lg:text-left">
                Showing <span className="font-semibold text-[#2b2a26] dark:text-slate-200">
                  {filteredProducts.length}
                </span> products
                {search && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400">
                    for "{search}"
                  </span>
                )}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredProducts.length === 0 && (
              <div className="py-12">
                <div className="mx-auto max-w-xl rounded-[28px] border border-[#e5dccb] bg-white/90 p-10 text-center shadow-[0_18px_40px_-30px_rgba(0,0,0,0.3)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
                  <div className="text-[#b8b1a6] text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    No products found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">
                    {search ? `No results for "${search}"` : 'No products in this category'}
                  </p>
                  <button
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory('all');
                      setPriceTouched(false)
                      setPriceRange(priceBounds)
                      setMinRating(0)
                    }}
                    className="bg-[#1b1b1f] hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-16 pt-8 border-t border-[#e5dccb] dark:border-slate-800">
          <p className="text-[#4b4a44] dark:text-slate-400">
            Can't find what you're looking for? 
            <span className="text-amber-600 dark:text-amber-400 font-semibold cursor-pointer hover:underline ml-1">
              Contact us
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
