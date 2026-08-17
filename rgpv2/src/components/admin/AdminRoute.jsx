import { Navigate, useLocation } from 'react-router-dom'
import { useAdminStatus } from '../../lib/AdminAuth.js'

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAdminStatus()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f1f1f1' }}>
        <p style={{ color: '#777' }}>Checking access…</p>
      </div>
    )
  }

  // Not signed in at all → send to the existing student/admin login page,
  // remembering where they were trying to go.
  if (!user) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
  }

  // Signed in, but not in the `admins` Firestore collection.
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f1f1f1' }}>
        <div className="text-center">
          <h1 className="font-bold text-xl mb-2" style={{ color: '#282A35' }}>
            Not Authorized
          </h1>
          <p className="text-sm" style={{ color: '#777' }}>
            Signed in as {user.email}, but this account doesn't have admin access.
          </p>
        </div>
      </div>
    )
  }

  return children
}
