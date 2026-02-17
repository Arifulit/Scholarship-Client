import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Wait for authentication check to complete
  if (loading) {
    console.log('🔄 PrivateRoute: Checking authentication...', location.pathname)
    return <LoadingSpinner />
  }
  
  // User is authenticated, allow access
  if (user) {
    console.log('✅ PrivateRoute: User authenticated -', user.email)
    return children
  }
  
  // No user found, redirect to login with return path
  console.log('🚨 PrivateRoute: No user, redirecting to login from', location.pathname)
  return <Navigate to='/login' state={{ from: location }} replace />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute
