import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, isAdmin } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !isAdmin) {
    return <div className="card"><h2>אין לך גישה</h2><p>הדף מיועד למנהל בלבד.</p></div>
  }

  return children
}

export default ProtectedRoute
