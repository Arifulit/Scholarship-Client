

import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/Shared/LoadingSpinner"
import useRole from "../hooks/useRole"
import useAuth from "../hooks/useAuth"
import PropTypes from "prop-types"

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth()
  const [role, roleLoading] = useRole()

  // Show loading while checking auth or role
  if (authLoading || roleLoading) {
    console.log('🔄 AdminRoute: Loading...', { authLoading, roleLoading })
    return <LoadingSpinner />
  }

  // If no user, PrivateRoute will handle redirect to login
  if (!user) {
    console.log('⚠️ AdminRoute: No user detected')
    return <Navigate to='/login' replace />
  }

  // If user has admin role, allow access
  if (role === 'admin') {
    console.log('✅ AdminRoute: Admin access granted')
    return children
  }

  // If not admin, redirect to dashboard (not login)
  console.log('⚠️ AdminRoute: User role is', role, '- redirecting to dashboard')
  return <Navigate to='/dashboard' replace />
}

AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute
