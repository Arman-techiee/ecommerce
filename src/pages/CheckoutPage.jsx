import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import { useAuth } from '../hooks/useAuth'
import { useOrders } from '../hooks/useOrders'

function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems = [], clearCart } = useCart()
  const { user } = useAuth()
  const { addOrder } = useOrders()

  const [formState, setFormState] = React.useState({
    name: user?.name || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
    notes: '',
  })
  const [paymentMethod, setPaymentMethod] = React.useState('COD')
  const [error, setError] = React.useState('')

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (cartItems.length === 0) {
      setError('Your cart is empty.')
      return
    }

    if (!formState.name.trim() || !formState.phone.trim() || !formState.city.trim() || !formState.address.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    const order = {
      id: `NC-${Date.now().toString().slice(-6)}`,
      items: cartItems,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
      status: 'Order placed',
      shippingAddress: {
        name: formState.name.trim(),
        phone: formState.phone.trim(),
        city: formState.city.trim(),
        address: formState.address.trim(),
        notes: formState.notes.trim(),
      },
      createdAt: new Date().toISOString(),
    }

    addOrder(order)
    clearCart()
    navigate('/orders', { replace: true })
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-[#0b0b0c] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-[120px] dark:bg-amber-500/10"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-neutral-200/50 blur-[140px] dark:bg-slate-800/60"></div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d5b66f] bg-[#fff4d6] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a2d] dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
            Checkout
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-[#1f1e1b] dark:text-white">
            Complete your order
          </h1>
          <p className="mt-3 text-[#4b4a44] dark:text-slate-300 text-lg">
            Choose payment method and confirm delivery details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <form
            onSubmit={handleSubmit}
            className="rounded-[28px] border border-[#e5dccb] bg-white/90 p-8 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="text-2xl font-semibold text-[#1f1e1b] dark:text-white">
              Delivery details
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Full name"
                required
              />
              <input
                name="phone"
                value={formState.phone}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Phone number"
                required
              />
              <input
                name="city"
                value={formState.city}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="City"
                required
              />
              <input
                name="address"
                value={formState.address}
                onChange={handleChange}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-2"
                placeholder="Street address"
                required
              />
              <textarea
                name="notes"
                value={formState.notes}
                onChange={handleChange}
                rows={3}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-2"
                placeholder="Delivery notes (optional)"
              />
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-[#1f1e1b] dark:text-white">
                Payment method
              </h3>
              <div className="mt-4 space-y-3">
                <label className="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 px-4 py-4">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="h-4 w-4 text-amber-500 focus:ring-amber-400"
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Cash on delivery</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Pay when your order arrives.</p>
                  </div>
                </label>
                <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 px-4 py-4 text-sm text-slate-400">
                  <span>Card payments</span>
                  <span className="text-xs uppercase tracking-[0.2em]">Coming soon</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 px-4 py-4 text-sm text-slate-400">
                  <span>Wallets</span>
                  <span className="text-xs uppercase tracking-[0.2em]">Coming soon</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-slate-900 text-white px-4 py-4 text-sm font-semibold hover:bg-black transition"
            >
              Place order
            </button>
          </form>

          <div className="rounded-[28px] border border-[#e5dccb] bg-white/90 p-8 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-2xl font-semibold text-[#1f1e1b] dark:text-white">
              Order summary
            </h2>
            <div className="mt-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/70 p-2">
                    <img src={item.image} alt={item.title || item.name} className="h-full w-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#1f1e1b] dark:text-white line-clamp-1">
                      {item.title || item.name}
                    </p>
                    <p className="text-xs text-[#6b645a] dark:text-slate-400">
                      Qty {item.quantity || 1}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-[#1f1e1b] dark:text-white">
                    Rs {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-sm text-[#6b645a] dark:text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `Rs ${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>Rs {tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-[#1f1e1b] dark:text-white">
                <span>Total</span>
                <span>Rs {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
