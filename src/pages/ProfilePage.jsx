import React from 'react'
import UserSidebar from '../components/common/UserSidebar'
import { useAuth } from '../hooks/useAuth'

function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = React.useState(false)
  const [formState, setFormState] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    city: user?.city || '',
    address: user?.address || '',
  })

  React.useEffect(() => {
    setFormState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      city: user?.city || '',
      address: user?.address || '',
    })
  }, [user])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    updateProfile({
      name: formState.name.trim() || 'Customer',
      email: formState.email.trim().toLowerCase(),
      phone: formState.phone.trim(),
      city: formState.city.trim(),
      address: formState.address.trim(),
    })
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-[#0b0b0c] relative overflow-hidden">
      <div className="pointer-events-none absolute -top-28 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-[120px] dark:bg-amber-500/10"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-neutral-200/50 blur-[140px] dark:bg-slate-800/60"></div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d5b66f] bg-[#fff4d6] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8a6a2d] dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200">
            Customer Profile
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-semibold text-[#1f1e1b] dark:text-white">
            Account Overview
          </h1>
          <p className="mt-3 text-[#4b4a44] dark:text-slate-300 text-lg">
            Manage your personal details and keep your shopping experience smooth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          <UserSidebar />

          <div className="rounded-[28px] border border-[#e5dccb] bg-white/90 p-8 shadow-[0_22px_60px_-40px_rgba(0,0,0,0.4)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-[#1f1e1b] dark:text-white">
                  Profile details
                </h2>
                <p className="text-sm text-[#6b645a] dark:text-slate-300 mt-2">
                  Keep your details accurate for faster checkout.
                </p>
              </div>
              {isEditing ? (
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleSave}
                    className="rounded-full bg-slate-900 text-white px-5 py-2 text-sm font-semibold hover:bg-black transition"
                  >
                    Save changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-full border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-full border border-slate-200 dark:border-slate-700 px-5 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200"
                >
                  Edit profile
                </button>
              )}
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                  Full name
                </p>
                {isEditing ? (
                  <input
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Your name"
                  />
                ) : (
                  <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                    {user?.name || 'Customer'}
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                  Email
                </p>
                {isEditing ? (
                  <input
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="you@email.com"
                  />
                ) : (
                  <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                    {user?.email}
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                  Membership
                </p>
                <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                  Gold Customer
                </p>
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                  Last login
                </p>
                <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                  {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Today'}
                </p>
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                  Phone
                </p>
                {isEditing ? (
                  <input
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="98X-XXXX-XXX"
                  />
                ) : (
                  <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                    {user?.phone || 'Not set'}
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                  City
                </p>
                {isEditing ? (
                  <input
                    name="city"
                    value={formState.city}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Kathmandu"
                  />
                ) : (
                  <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                    {user?.city || 'Not set'}
                  </p>
                )}
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-[#fffaf2] px-5 py-4 dark:border-slate-800 dark:bg-slate-950/60 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-[#9a9387] dark:text-slate-400">
                  Address
                </p>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formState.address}
                    onChange={handleChange}
                    rows={3}
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/70 px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Street, area, landmark"
                  />
                ) : (
                  <p className="mt-2 text-lg font-semibold text-[#1f1e1b] dark:text-white">
                    {user?.address || 'Not set'}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e5dccb] bg-white/80 px-6 py-6 dark:border-slate-800 dark:bg-slate-950/50">
                <h3 className="text-lg font-semibold text-[#1f1e1b] dark:text-white">Saved addresses</h3>
                <p className="mt-2 text-sm text-[#6b645a] dark:text-slate-300">
                  Add a preferred delivery location for quick checkout.
                </p>
                <button className="mt-4 rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-black transition">
                  Add address
                </button>
              </div>
              <div className="rounded-2xl border border-[#e5dccb] bg-white/80 px-6 py-6 dark:border-slate-800 dark:bg-slate-950/50">
                <h3 className="text-lg font-semibold text-[#1f1e1b] dark:text-white">Payment methods</h3>
                <p className="mt-2 text-sm text-[#6b645a] dark:text-slate-300">
                  Store your preferred payment options securely.
                </p>
                <button className="mt-4 rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-200">
                  Add payment method
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
