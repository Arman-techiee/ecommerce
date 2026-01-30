import React from 'react'
import { createContext, useContext, useState } from 'react'
export const CartContext = createContext();

function CartProvider({ children }) {
    const[items, setItems] = useState([])

    function addToCart(product){
        setItems(prev => [...prev, product])
    }
    const cartCount = items.length;

  return (
    <CartContext.Provider value={{items, addToCart, cartCount}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider
