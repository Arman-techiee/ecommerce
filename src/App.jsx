import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/Homepage'
import Productspage from './pages/Productspage'
import NotFound from './pages/NotFound'
import CartProvider from './context/CartContext'
import CartPage from './pages/CartPage'
import SingleProductPage from './pages/SingleProductPage'

function App() {
  return (
    <CartProvider>
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path='products' element={<Productspage />} />
        <Route path='products/:id' element={<SingleProductPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='*' element={<NotFound />} />
        
      </Route>

    </Routes>
    </CartProvider>
  )
}

export default App