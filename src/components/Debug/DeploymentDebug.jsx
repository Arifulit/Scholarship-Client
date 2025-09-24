import { useState, useEffect, useCallback } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const DeploymentDebug = () => {
  const [tests, setTests] = useState({
    envCheck: null,
    directFetch: null,
    axiosTest: null,
    corsTest: null,
    authTest: null
  });
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  
  const axiosSecure = useAxiosSecure();

  const runDeploymentTests = useCallback(async () => {
    setLoading(true);
    console.log('🚀 Starting deployment debugging tests...');

    // Test 1: Environment Variables
    console.log('🔍 Test 1: Environment Variables');
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log('VITE_API_URL:', apiUrl);
    
    if (apiUrl) {
      setTests(prev => ({ ...prev, envCheck: 'success' }));
      setDetails(prev => ({ ...prev, apiUrl }));
    } else {
      setTests(prev => ({ ...prev, envCheck: 'failed' }));
    }

    // Test 2: Direct Fetch Test
    console.log('🔍 Test 2: Direct Fetch Test');
    try {
      const response = await fetch(`${apiUrl}/scholarship`);
      console.log('Direct fetch response:', response.status, response.statusText);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Direct fetch data:', data.length, 'items');
        setTests(prev => ({ ...prev, directFetch: 'success' }));
        setDetails(prev => ({ ...prev, directFetchCount: data.length }));
      } else {
        throw new Error(`Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Direct fetch error:', error);
      setTests(prev => ({ ...prev, directFetch: 'failed' }));
      setDetails(prev => ({ ...prev, directFetchError: error.message }));
    }

    // Test 3: AxiosSecure Test
    console.log('🔍 Test 3: AxiosSecure Test');
    try {
      const response = await axiosSecure.get('/scholarship');
      console.log('AxiosSecure response:', response.status, response.data?.length);
      setTests(prev => ({ ...prev, axiosTest: 'success' }));
      setDetails(prev => ({ ...prev, axiosCount: response.data?.length }));
    } catch (error) {
      console.error('AxiosSecure error:', error);
      setTests(prev => ({ ...prev, axiosTest: 'failed' }));
      setDetails(prev => ({ ...prev, axiosError: error.message }));
    }

    // Test 4: CORS Test
    console.log('🔍 Test 4: CORS Test');
    try {
      const response = await fetch(`${apiUrl}/scholarship`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        setTests(prev => ({ ...prev, corsTest: 'success' }));
      } else {
        throw new Error(`CORS failed: ${response.status}`);
      }
    } catch (error) {
      console.error('CORS test error:', error);
      setTests(prev => ({ ...prev, corsTest: 'failed' }));
      setDetails(prev => ({ ...prev, corsError: error.message }));
    }

    // Test 5: Alternative Endpoints
    console.log('🔍 Test 5: Alternative Endpoints Test');
    const endpoints = ['/scholarship', '/scholarships', '/api/scholarship'];
    
    for (const endpoint of endpoints) {
      try {
        const fullUrl = `${apiUrl}${endpoint}`;
        console.log(`Testing: ${fullUrl}`);
        const response = await fetch(fullUrl);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ ${endpoint}:`, data.length, 'items');
          setDetails(prev => ({ 
            ...prev, 
            workingEndpoint: endpoint,
            workingEndpointCount: data.length 
          }));
          break;
        }
      } catch (error) {
        console.log(`❌ ${endpoint}:`, error.message);
      }
    }

    setLoading(false);
  }, [axiosSecure]);

  useEffect(() => {
    runDeploymentTests();
  }, [runDeploymentTests]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅';
      case 'failed': return '❌';
      default: return '⏳';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'failed': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  return (
    <div className="fixed top-4 left-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border max-w-md z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          🚀 Deployment Debug Panel
        </h3>
        <button 
          onClick={runDeploymentTests}
          disabled={loading}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? '⏳' : '🔄'} Retry
        </button>
      </div>

      <div className="space-y-3 text-sm">
        {/* Environment Check */}
        <div className={`p-3 rounded border ${getStatusColor(tests.envCheck)}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">Environment Variables</span>
            <span className="text-lg">{getStatusIcon(tests.envCheck)}</span>
          </div>
          {details.apiUrl && (
            <div className="text-xs mt-1 break-all">
              API URL: {details.apiUrl}
            </div>
          )}
        </div>

        {/* Direct Fetch Test */}
        <div className={`p-3 rounded border ${getStatusColor(tests.directFetch)}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">Direct Fetch</span>
            <span className="text-lg">{getStatusIcon(tests.directFetch)}</span>
          </div>
          {details.directFetchCount && (
            <div className="text-xs mt-1 text-green-600">
              ✓ Found {details.directFetchCount} items
            </div>
          )}
          {details.directFetchError && (
            <div className="text-xs mt-1 text-red-600">
              ✗ Error: {details.directFetchError}
            </div>
          )}
        </div>

        {/* Axios Test */}
        <div className={`p-3 rounded border ${getStatusColor(tests.axiosTest)}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">Axios Secure</span>
            <span className="text-lg">{getStatusIcon(tests.axiosTest)}</span>
          </div>
          {details.axiosCount && (
            <div className="text-xs mt-1 text-green-600">
              ✓ Found {details.axiosCount} items
            </div>
          )}
          {details.axiosError && (
            <div className="text-xs mt-1 text-red-600">
              ✗ Error: {details.axiosError}
            </div>
          )}
        </div>

        {/* CORS Test */}
        <div className={`p-3 rounded border ${getStatusColor(tests.corsTest)}`}>
          <div className="flex items-center justify-between">
            <span className="font-medium">CORS Policy</span>
            <span className="text-lg">{getStatusIcon(tests.corsTest)}</span>
          </div>
          {details.corsError && (
            <div className="text-xs mt-1 text-red-600">
              ✗ Error: {details.corsError}
            </div>
          )}
        </div>

        {/* Working Endpoint */}
        {details.workingEndpoint && (
          <div className="p-3 rounded border border-green-200 bg-green-50">
            <div className="font-medium text-green-700">✅ Working Endpoint Found</div>
            <div className="text-xs mt-1">
              <div className="text-green-600">Endpoint: {details.workingEndpoint}</div>
              <div className="text-green-600">Data: {details.workingEndpointCount} items</div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Fix Suggestions */}
      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
        <div className="font-medium text-blue-700 text-sm mb-2">💡 Quick Fixes:</div>
        <div className="text-xs space-y-1">
          <div className="text-blue-600">1. Restart dev server: <code>npm run dev</code></div>
          <div className="text-blue-600">2. Check backend CORS settings</div>
          <div className="text-blue-600">3. Verify API URL in .env.local</div>
          <div className="text-blue-600">4. Clear browser cache</div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentDebug;