import { useState, useEffect, useCallback } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import axios from 'axios'

const NetworkTest = () => {
  const [tests, setTests] = useState({
    envVariable: null,
    directConnection: null,
    axiosSecureConnection: null,
    corsTest: null,
    serverHealth: null
  })
  
  const axiosSecure = useAxiosSecure()

  const runAllTests = useCallback(async () => {
    console.log('🧪 Starting comprehensive network tests...')
    
    // Test 1: Environment Variable
    const apiUrl = import.meta.env.VITE_API_URL
    console.log('🔍 API URL from env:', apiUrl)
    setTests(prev => ({ 
      ...prev, 
      envVariable: apiUrl ? 'success' : 'failed' 
    }))

    // Test 2: Direct Axios Connection (without credentials)
    try {
      const directResponse = await axios.get(`${apiUrl}/test`)
      console.log('✅ Direct connection success:', directResponse)
      setTests(prev => ({ ...prev, directConnection: 'success' }))
    } catch (error) {
      console.log('❌ Direct connection failed:', error)
      setTests(prev => ({ ...prev, directConnection: 'failed' }))
    }

    // Test 3: AxiosSecure Connection
    try {
      const secureResponse = await axiosSecure.get('/test')
      console.log('✅ AxiosSecure connection success:', secureResponse)
      setTests(prev => ({ ...prev, axiosSecureConnection: 'success' }))
    } catch (error) {
      console.log('❌ AxiosSecure connection failed:', error)
      setTests(prev => ({ ...prev, axiosSecureConnection: 'failed' }))
    }

    // Test 4: CORS Test
    try {
      const corsResponse = await fetch(`${apiUrl}/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('✅ CORS test success:', corsResponse)
      setTests(prev => ({ ...prev, corsTest: 'success' }))
    } catch (error) {
      console.log('❌ CORS test failed:', error)
      setTests(prev => ({ ...prev, corsTest: 'failed' }))
    }

    // Test 5: Server Health Check
    try {
      const healthResponse = await axios.get(`${apiUrl}/health`)
      console.log('✅ Server health check success:', healthResponse)
      setTests(prev => ({ ...prev, serverHealth: 'success' }))
    } catch (error) {
      console.log('❌ Server health check failed:', error)
      setTests(prev => ({ ...prev, serverHealth: 'failed' }))
    }
  }, [axiosSecure])

  useEffect(() => {
    runAllTests()
  }, [runAllTests])

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'bg-green-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-yellow-500'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'success': return '✅ Success'
      case 'failed': return '❌ Failed'
      default: return '⏳ Testing...'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
      <h3 className="text-lg font-bold text-gray-800 mb-3">🧪 Network Tests</h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Environment Variable:</span>
          <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(tests.envVariable)}`}>
            {getStatusText(tests.envVariable)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Direct Connection:</span>
          <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(tests.directConnection)}`}>
            {getStatusText(tests.directConnection)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">AxiosSecure Connection:</span>
          <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(tests.axiosSecureConnection)}`}>
            {getStatusText(tests.axiosSecureConnection)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">CORS Test:</span>
          <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(tests.corsTest)}`}>
            {getStatusText(tests.corsTest)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm">Server Health:</span>
          <span className={`px-2 py-1 rounded text-white text-xs ${getStatusColor(tests.serverHealth)}`}>
            {getStatusText(tests.serverHealth)}
          </span>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-600">
        <p>API URL: {import.meta.env.VITE_API_URL}</p>
        <p>Check console for detailed logs</p>
      </div>

      <button 
        onClick={runAllTests}
        className="mt-2 w-full bg-blue-500 text-white py-1 px-2 rounded text-sm hover:bg-blue-600"
      >
        🔄 Re-run Tests
      </button>
    </div>
  )
}

export default NetworkTest