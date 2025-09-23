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
  const { logOut } = useAuth()
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        console.log('✅ API Response Success:', {
          status: res.status,
          url: res.config.url,
          dataLength: res.data?.length || 'N/A',
          data: res.data
        })
        return res
      },
      async error => {
        console.log('Error caught from axios interceptor-->', error.response)
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          logOut()
          // navigate to login
          navigate('/login')
        }
        return Promise.reject(error)
      }
    )
  }, [logOut, navigate])
  return axiosSecure
}

export default useAxiosSecure
