import React from 'react'
import { createContext, useContext, useState } from 'react'
export const CartContext = createContext();

function CartProvider({ children }) {
  const normalizeCart = (items) =>
    items.map((item) => ({
      ...item,
      quantity: item.quantity && item.quantity > 0 ? item.quantity : 1,
    }))

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? normalizeCart(JSON.parse(savedCart)) : []
  })

  const persistCart = (items) => {
    setCartItems(items)
    localStorage.setItem('cart', JSON.stringify(items))
  }

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id)
    if (exists) return
    const updatedCart = [...cartItems, { ...product, quantity: 1 }]
    persistCart(updatedCart)
  }

  const updateQuantity = (productId, nextQuantity) => {
    const quantity = Math.max(1, nextQuantity)
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
    persistCart(updatedCart)
  }

  const removeFromCart = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId)
    persistCart(updatedItems)
  }

  const clearCart = () => {
    persistCart([])
  }

  const isInCart = (productId) => cartItems.some((item) => item.id === productId)

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isInCart,
      }}
    >
        {children}
    </CartContext.Provider>
  )
}


export default CartProvider
