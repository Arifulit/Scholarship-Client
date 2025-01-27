

import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/Shared/LoadingSpinner"
import useRole from "../hooks/useRole"
import PropTypes from "prop-types"

const ModeratorRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'moderator') return children
  return <Navigate to='/dashboard' replace='true' />
}

ModeratorRoute.propTypes = {
  children: PropTypes.element,
}

export default ModeratorRoute
