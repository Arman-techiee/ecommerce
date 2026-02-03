import React from 'react'
import { createContext, useContext, useState } from 'react'
export const CartContext = createContext();

function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
    
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

    const addToCart = (product) => {
      const exists = cartItems.find(item => item.id === product.id);
      if(exists) return;
      const updatedCart = [...cartItems, product];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } 
    function removeFromCart(productId) {
      const updatedItems = cartItems.filter(item => item.id !== productId);
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
    function isInCart(productId) {
      return cartItems.some(item => item.id === productId);
    }

    const cartCount = cartItems.length;

  return (
    <CartContext.Provider value={{cartItems, addToCart, removeFromCart, cartCount, isInCart}}>
        {children}
    </CartContext.Provider>
  )
}


export default CartProvider
