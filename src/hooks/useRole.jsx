
import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"

const useRole = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading } = useAuth()

  const { data: role, isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        const { data } = await axiosSecure(`/users/role/${user?.email}`)
        console.log('✅ User role fetched:', data.role)
        // Map old "customer" role to "student"
        const mappedRole = data.role === 'customer' ? 'student' : data.role
        return mappedRole
      } catch (error) {
        console.log('⚠️ Error fetching role:', error?.response?.status)
        // If user not found in DB, default to student
        if (error?.response?.status === 404) {
          console.log('ℹ️ User not in DB, defaulting to student role')
          return 'student'
        }
        throw error
      }
    },
    retry: 1,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.error('❌ Role query error:', error?.response?.status)
    }
  })
  
  return [role || 'student', isLoading]
}

export default useRole