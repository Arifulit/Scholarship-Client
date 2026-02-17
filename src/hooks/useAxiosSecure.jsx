import axios from 'axios'
import useAuth from './useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Debug: Log the API URL being used
console.log('🔗 API URL from env:', import.meta.env.VITE_API_URL)

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

// Add request interceptor for debugging
axiosSecure.interceptors.request.use(
  (config) => {
    console.log('📤 API Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}${config.url}`
    })
    return config
  },
  (error) => {
    console.log('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut, user } = useAuth()
  
  useEffect(() => {
    // Store the interceptor ID so we can eject it later
    const responseInterceptor = axiosSecure.interceptors.response.use(
      res => {
        console.log('✅ API Response Success:', {
          status: res.status,
          url: res.config.url,
          dataLength: res.data?.length || 'N/A'
        })
        return res
      },
      async error => {
        const status = error?.response?.status
        const url = error?.config?.url
        
        console.log('⚠️ API Error:', {
          status,
          url,
          message: error?.message,
          hasResponse: !!error?.response
        })

        // Skip logout if no response (network error, server down)
        if (!error?.response) {
          console.log('🌐 Network error - not logging out')
          return Promise.reject(error)
        }

        // Don't logout for data fetching endpoints - let component handle errors
        const isDataEndpoint = url?.includes('/users/role') || 
                              url?.includes('/user') || 
                              url?.includes('/all-users') ||
                              url?.includes('/student-orders') ||
                              url?.includes('/scholar/moderator') ||
                              url?.includes('/scholarship') ||
                              url?.includes('/orders') ||
                              url?.includes('/carts') ||
                              url?.includes('/checkout') ||
                              url?.includes('/payments') ||
                              url?.includes('/create-payment-intent') ||
                              url?.includes('/order')
        
        if (status === 401) {
          if (isDataEndpoint) {
            console.log('ℹ️ Data endpoint returned 401 - user may not have access or not in DB')
            // Don't logout, let the component handle it
          } else if (user) {
            console.log('🚪 Logging out due to 401 on authentication endpoint')
            await logOut()
            navigate('/login')
          }
        } else if (status === 403) {
          console.log('🔒 Access forbidden (403) - user authenticated but not authorized')
          // Don't logout, just show the error
        }
        
        return Promise.reject(error)
      }
    )

    // Cleanup: eject the interceptor when component unmounts
    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor)
    }
  }, [logOut, navigate, user])
  
  return axiosSecure
}

export default useAxiosSecure
