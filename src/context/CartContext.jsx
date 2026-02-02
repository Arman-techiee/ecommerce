import React from 'react'
import { createContext, useContext, useState } from 'react'
export const CartContext = createContext();

function CartProvider({ children }) {
    const[items, setItems] = useState([])

    const addToCart = (product) => {
      const exists = items.find(item => item.id === product.id);
      if(exists) return;
        setItems(prev => [...prev, product])
    }
    const removeFromCart = (productId) => {
      setItems(prev => prev.filter(item => item.id !== productId));
    }
    function isInCart(productId) {
      return items.some(item => item.id === productId);
    }

    const cartCount = items.length;

  return (
    <CartContext.Provider value={{items, addToCart, removeFromCart, cartCount, isInCart}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider
