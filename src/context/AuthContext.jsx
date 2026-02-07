import { useMemo, useState } from 'react'
import { AuthContext } from '../hooks/authContext'

const STORAGE_KEY = 'auth_user'

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.error('Failed to read auth user', error)
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)

  const login = ({ email, password }) => {
    const trimmedEmail = email?.trim().toLowerCase()
    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      return { ok: false, error: 'Enter a valid email address.' }
    }
    if (!password || password.length < 6) {
      return { ok: false, error: 'Password must be at least 6 characters.' }
    }

    const nextUser = {
      email: trimmedEmail,
      name: trimmedEmail.split('@')[0] || 'Customer',
      phone: '',
      city: '',
      address: '',
      lastLogin: new Date().toISOString(),
    }

    setUser(nextUser)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
    } catch (error) {
      console.error('Failed to persist auth user', error)
    }

    return { ok: true }
  }

  const updateProfile = (updates) => {
    setUser((prev) => {
      const nextUser = { ...(prev || {}), ...updates }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser))
      } catch (error) {
        console.error('Failed to persist auth user', error)
      }
      return nextUser
    })
  }

  const logout = () => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear auth user', error)
    }
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      updateProfile,
      logout,
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
