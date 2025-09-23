import { useState, useEffect, useCallback } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const BackendTest = () => {
  const [testResults, setTestResults] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const axiosSecure = useAxiosSecure()

  const endpoints = [
    { name: 'Scholarships', endpoint: '/scholarships', method: 'GET' },
    { name: 'Applications', endpoint: '/applications', method: 'GET' },
    { name: 'Users', endpoint: '/users', method: 'GET' },
    { name: 'Reviews', endpoint: '/reviews', method: 'GET' },
    { name: 'Health Check', endpoint: '/health', method: 'GET' },
    { name: 'Test Route', endpoint: '/test', method: 'GET' }
  ]

  const testAllEndpoints = useCallback(async () => {
    setIsLoading(true)
    console.log('🚀 Starting comprehensive backend endpoint tests...')
    
    const endpoints = [
      { name: 'Scholarships', endpoint: '/scholarships', method: 'GET' },
      { name: 'Applications', endpoint: '/applications', method: 'GET' },
      { name: 'Users', endpoint: '/users', method: 'GET' },
      { name: 'Reviews', endpoint: '/reviews', method: 'GET' },
      { name: 'Health Check', endpoint: '/health', method: 'GET' },
      { name: 'Test Route', endpoint: '/test', method: 'GET' }
    ]
    
    const testEndpointLocal = async (endpoint, method = 'GET') => {
      try {
        console.log(`🧪 Testing ${method} ${endpoint}...`)
        
        let response
        if (method === 'GET') {
          response = await axiosSecure.get(endpoint)
        }
        
        console.log(`✅ ${endpoint} success:`, response.data)
        
        return {
          status: 'success',
          statusCode: response.status,
          dataLength: response.data?.length || (response.data ? 1 : 0),
          responseTime: response.config?.metadata?.endTime - response.config?.metadata?.startTime || 'N/A'
        }
      } catch (error) {
        console.log(`❌ ${endpoint} failed:`, error)
        
        return {
          status: 'failed',
          statusCode: error.response?.status || 'Network Error',
          error: error.message,
          details: error.response?.data || 'No response data'
        }
      }
    }
    
    const results = {}
    
    for (const { name, endpoint, method } of endpoints) {
      const result = await testEndpointLocal(endpoint, method)
      results[name] = result
      setTestResults(prev => ({ ...prev, [name]: result }))
    }
    
    setIsLoading(false)
    console.log('🎯 All endpoint tests completed:', results)
  }, [axiosSecure])

  useEffect(() => {
    testAllEndpoints()
  }, [testAllEndpoints])

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50'
      case 'failed': return 'text-red-600 bg-red-50'
      default: return 'text-yellow-600 bg-yellow-50'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅'
      case 'failed': return '❌'
      default: return '⏳'
    }
  }

  return (
    <div className="fixed top-4 right-4 w-96 max-h-[80vh] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-xl p-4 z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">🔬 Backend Tests</h3>
        <button 
          onClick={testAllEndpoints}
          disabled={isLoading}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? '⏳ Testing...' : '🔄 Retest'}
        </button>
      </div>

      <div className="space-y-3">
        {endpoints.map(({ name, endpoint }) => {
          const result = testResults[name]
          const status = result?.status || 'testing'
          
          return (
            <div key={name} className={`p-3 rounded-lg border ${getStatusColor(status)}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getStatusIcon(status)}</span>
                  <span className="font-medium">{name}</span>
                </div>
                {result?.statusCode && (
                  <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                    {result.statusCode}
                  </span>
                )}
              </div>
              
              <div className="text-xs text-gray-600 mb-1">
                <code>{endpoint}</code>
              </div>
              
              {result?.status === 'success' && (
                <div className="text-xs">
                  <span className="text-green-600">
                    ✓ Data: {result.dataLength} items
                  </span>
                </div>
              )}
              
              {result?.status === 'failed' && (
                <div className="text-xs">
                  <div className="text-red-600 mb-1">
                    ✗ Error: {result.error}
                  </div>
                  {result.details && (
                    <div className="text-gray-500 truncate">
                      Details: {JSON.stringify(result.details).substring(0, 50)}...
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
        <div className="font-medium mb-1">API Configuration:</div>
        <div>Base URL: {import.meta.env.VITE_API_URL}</div>
        <div>With Credentials: ✓</div>
        <div className="mt-2 text-gray-600">
          Check console (F12) for detailed request/response logs
        </div>
      </div>
    </div>
  )
}

export default BackendTest