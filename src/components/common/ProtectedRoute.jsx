import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    return children
  }

  return <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute
