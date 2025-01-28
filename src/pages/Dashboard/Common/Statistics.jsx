// import { Helmet } from 'react-helmet-async'

import { Navigate } from "react-router-dom"
import LoadingSpinner from "../../../components/Shared/LoadingSpinner"
import useRole from "../../../hooks/useRole"
import { Helmet } from "react-helmet-async"
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics"

const Statistics = () => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'customer') return <Navigate to='/dashboard/my-application' />
  if (role === 'moderator') return <Navigate to='/dashboard' />
  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === 'admin' && <AdminStatistics/>}
    </div>
  )
}

export default Statistics