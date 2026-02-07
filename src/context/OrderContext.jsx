import { createContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'orders'

const getStoredOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Failed to read orders', error)
    return []
  }
}

export const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(getStoredOrders)

  const persistOrders = (nextOrders) => {
    setOrders(nextOrders)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextOrders))
    } catch (error) {
      console.error('Failed to persist orders', error)
    }
  }

  const addOrder = (order) => {
    persistOrders([order, ...orders])
  }

  const clearOrders = () => {
    persistOrders([])
  }

  const value = useMemo(
    () => ({
      orders,
      addOrder,
      clearOrders,
    }),
    [orders]
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
