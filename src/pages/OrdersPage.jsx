import React from 'react'
import { Link } from 'react-router-dom'
import UserSidebar from '../components/common/UserSidebar'
import { useOrders } from '../hooks/useOrders'

function OrdersPage() {
  const { orders } = useOrders()

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-[#0b0b0c] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-[120px] dark:bg-amber-500/10"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-neutral-200/50 blur-[140px] dark:bg-slate-800/60"></div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d5b66f] bg-[#fff4d6] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a2d] dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
            Order History
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-[#1f1e1b] dark:text-white">
            Your Orders
          </h1>
          <p className="mt-3 text-[#4b4a44] dark:text-slate-300 text-lg">
            Track purchases, payment status, and delivery progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          <UserSidebar />

          <div className="rounded-[28px] border border-[#e5dccb] bg-white/90 p-8 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-[#1f1e1b] dark:text-white">
                  No orders yet
                </h2>
                <p className="mt-3 text-[#6b645a] dark:text-slate-300">
                  Once you place an order, it will appear here.
                </p>
                <Link to="/products" className="inline-flex mt-6">
                  <span className="rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-semibold hover:bg-black transition">
                    Browse products
                  </span>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-6 py-5 dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                          Order #{order.id}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                          {order.items.length} items • Rs {order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-[#6b645a] dark:text-slate-300 mt-1">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                        {order.status}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-[#6b645a] dark:text-slate-300">
                      Payment: {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {order.items.slice(0, 4).map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-2">
                            <img src={item.image} alt={item.title || item.name} className="h-full w-full object-contain" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1f1e1b] dark:text-white line-clamp-1">
                              {item.title || item.name}
                            </p>
                            <p className="text-xs text-[#6b645a] dark:text-slate-400">
                              Qty {item.quantity || 1}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage
