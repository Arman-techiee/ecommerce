import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Homepage from './pages/Homepage'
import Productspage from './pages/Productspage'
import NotFound from './pages/NotFound'
import CartProvider from './context/CartContext'
import CartPage from './pages/CartPage'
import SingleProductPage from './pages/SingleProductPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import OrdersPage from './pages/OrdersPage'
import CheckoutPage from './pages/CheckoutPage'
import { OrderProvider } from './context/OrderContext'

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <Routes>
            <Route path='/' element={<MainLayout />}>
              <Route index element={<Homepage />} />
              <Route path='products' element={<Productspage />} />
              <Route
                path='products/:id'
                element={
                  <ProtectedRoute>
                    <SingleProductPage />
                  </ProtectedRoute>
                }
              />
              <Route path='cart' element={<CartPage />} />
              <Route path='login' element={<LoginPage />} />
              <Route
                path='profile'
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='orders'
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path='checkout'
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  )
}

export default App
