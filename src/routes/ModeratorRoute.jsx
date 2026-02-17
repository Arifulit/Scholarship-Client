

import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/Shared/LoadingSpinner"
import useRole from "../hooks/useRole"
import useAuth from "../hooks/useAuth"
import PropTypes from "prop-types"

const ModeratorRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth()
  const [role, roleLoading] = useRole()

  // Show loading while checking auth or role
  if (authLoading || roleLoading) {
    console.log('🔄 ModeratorRoute: Loading...', { authLoading, roleLoading })
    return <LoadingSpinner />
  }

  // If no user, PrivateRoute will handle redirect to login
  if (!user) {
    console.log('⚠️ ModeratorRoute: No user detected')
    return <Navigate to='/login' replace />
  }

  // If user has moderator role, allow access
  if (role === 'moderator') {
    console.log('✅ ModeratorRoute: Moderator access granted')
    return children
  }

  // If not moderator, redirect to dashboard (not login)
  console.log('⚠️ ModeratorRoute: User role is', role, '- redirecting to dashboard')
  return <Navigate to='/dashboard' replace />
}

ModeratorRoute.propTypes = {
  children: PropTypes.element,
}

export default ModeratorRoute
