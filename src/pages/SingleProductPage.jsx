import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../hooks/useCart'

// Additional mock products to match ProductsPage
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
]

function SingleProductPage() {
  const params = useParams()
  const { addToCart, isInCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdded, setIsAdded] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productId = parseInt(params.id)

        // Check if it's one of our additional products first
        const additionalProduct = additionalProducts.find((p) => p.id === productId)
        if (additionalProduct) {
          setProduct(additionalProduct)
          setLoading(false)
          return
        }

        // Otherwise fetch from API
        const response = await fetch(`https://fakestoreapi.com/products/${params.id}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const text = await response.text()
        if (!text) {
          throw new Error('Empty response')
        }
        const data = JSON.parse(text)
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product', error)
      } finally {
        setLoading(false)
      }
    }
    if (params?.id) fetchProduct()
  }, [params])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-amber-400 rounded-full animate-spin"></div>
        <p className="text-slate-600 text-lg">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="text-red-600 text-lg">Product not found</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="flex justify-center bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800">
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-[500px] object-contain rounded-lg"
          />
        </div>
        <div className="py-4">
          <div className="text-sm text-slate-500 uppercase tracking-wide mb-2">{product.category}</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-amber-400 text-xl">★★★★☆</span>
            <span className="text-slate-500 text-sm">
              {product.rating?.rate || '4.5'} ({product.rating?.count || '128'} reviews)
            </span>
          </div>
          <div className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Rs {product.price}</div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-8 text-base">
            {product.description}
          </p>
          <button
            onClick={() => {
              if (!isInCart(product.id)) {
                addToCart(product)
                setIsAdded(true)
                setTimeout(() => setIsAdded(false), 2000)
              }
            }}
            disabled={isInCart(product.id)}
            className={`w-full max-w-sm px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 ${
              isInCart(product.id)
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed text-slate-600 dark:text-slate-300'
                : isAdded
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 text-white'
            }`}
          >
            {isInCart(product.id) ? 'Already in Cart' : isAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage
