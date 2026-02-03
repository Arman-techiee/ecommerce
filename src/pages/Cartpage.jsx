import React from 'react'
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/products/ProductCard';

function CartPage() {
  const { cartItems = [] } = useCart()

  return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cartItems.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
            />
          ))}
        </div>
  )
}

export default CartPage