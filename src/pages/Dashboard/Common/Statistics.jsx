import { Navigate } from "react-router-dom"
import LoadingSpinner from "../../../components/Shared/LoadingSpinner"
import useRole from "../../../hooks/useRole"
import { Helmet } from "react-helmet-async"
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics"
import { FaChartLine, FaDatabase, FaClock, FaEye, FaBolt, FaSignal } from "react-icons/fa"
import { HiOutlineRefresh, HiOutlineTrendingUp, HiOutlineSparkles } from "react-icons/hi"
import { useState, useEffect } from "react"

const Statistics = () => {
  const [role, isLoading] = useRole()
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Real-time update simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLastUpdated(new Date())
    setIsRefreshing(false)
  }

  console.log('📊 Statistics - User role:', role, 'Loading:', isLoading)
  
  if (isLoading) return <LoadingSpinner />
  
  // Admin sees statistics
  if (role === 'admin') {
    console.log('✅ Admin user - showing statistics')
    // Continue rendering statistics page
  } else {
    // Non-admin users get redirected
    console.log('➡️ Non-admin user, redirecting to my-application')
    return <Navigate to='/dashboard/my-application' replace />
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 transition-all duration-500">
      <Helmet>
        <title>Dashboard Statistics | Scholarship Platform</title>
      </Helmet>
      
      {/* Enhanced Header Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-repeat bg-[length:60px_60px]" 
               style={{backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23667eea' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}>
          </div>
        </div>
        
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {/* Animated Icon */}
                <div className="relative">
                  <div className="p-4 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    <FaChartLine className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <FaBolt className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Dashboard Statistics
                  </h1>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-lg flex items-center gap-2">
                    <HiOutlineSparkles className="w-5 h-5 text-indigo-500" />
                    Monitor your platform performance and real-time analytics
                  </p>
                </div>
              </div>
              
              {/* Enhanced Live Data Section */}
              <div className="hidden lg:flex items-center space-x-6">
                {/* Real-time Indicators */}
                <div className="flex items-center space-x-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-md rounded-2xl px-6 py-4 border border-gray-200/50 dark:border-gray-600/50">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Data</span>
                  </div>
                  
                  <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                  
                  <div className="flex items-center space-x-2">
                    <FaSignal className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      Updated {lastUpdated.toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 ${
                    isRefreshing ? 'scale-95 opacity-75' : 'hover:scale-105'
                  }`}
                >
                  <HiOutlineRefresh className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Bar */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Active Sessions</p>
                    <p className="text-2xl font-bold">247</p>
                  </div>
                  <FaEye className="w-8 h-8 text-blue-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Data Points</p>
                    <p className="text-2xl font-bold">1.2K</p>
                  </div>
                  <FaDatabase className="w-8 h-8 text-green-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Response Time</p>
                    <p className="text-2xl font-bold">12ms</p>
                  </div>
                  <FaClock className="w-8 h-8 text-purple-200" />
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Growth</p>
                    <p className="text-2xl font-bold">+23%</p>
                  </div>
                  <HiOutlineTrendingUp className="w-8 h-8 text-orange-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="relative p-8">
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative">
          {role === 'admin' && (
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
              <div className="p-8">
                <AdminStatistics />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Statistics