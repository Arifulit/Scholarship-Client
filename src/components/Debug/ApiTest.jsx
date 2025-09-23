import { useState, useEffect } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ApiTest = () => {
  const [apiStatus, setApiStatus] = useState('testing...');
  const [apiUrl, setApiUrl] = useState('');
  const [scholarshipData, setScholarshipData] = useState(null);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    // Environment variable check
    const url = import.meta.env.VITE_API_URL;
    setApiUrl(url);
    
    // Test API connection
    testApiConnection();
  }, []);

  const testApiConnection = async () => {
    try {
      console.log('🔍 Testing API connection...');
      console.log('📡 API URL:', import.meta.env.VITE_API_URL);
      
      // Test 1: Basic connectivity
      setApiStatus('Testing basic connection...');
      const response = await fetch(import.meta.env.VITE_API_URL);
      console.log('✅ Basic connection status:', response.status);
      
      // Test 2: API endpoint test
      setApiStatus('Testing scholarship endpoint...');
      const scholarshipResponse = await axiosSecure.get('/scholarship');
      console.log('✅ Scholarship data:', scholarshipResponse.data);
      setScholarshipData(scholarshipResponse.data);
      setApiStatus('✅ Connection successful!');
      
    } catch (err) {
      console.error('❌ API Error:', err);
      setError(err.message);
      setApiStatus('❌ Connection failed!');
      
      // Additional error details
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      }
    }
  };

  const testDifferentEndpoints = async () => {
    const endpoints = [
      '/scholarship',
      '/scholarship/applied',
      '/users',
      '/api/scholarship',
      '/api/users'
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔍 Testing endpoint: ${endpoint}`);
        const response = await axiosSecure.get(endpoint);
        console.log(`✅ ${endpoint}:`, response.status, response.data?.length || 'No length');
      } catch (err) {
        console.log(`❌ ${endpoint}:`, err.response?.status || 'Network Error');
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-md z-50">
      <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">🔧 API Debug Panel</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>API URL:</strong> 
          <div className="text-xs text-blue-600 break-all">{apiUrl || 'Not found'}</div>
        </div>
        
        <div>
          <strong>Status:</strong> 
          <div className={`text-xs ${apiStatus.includes('✅') ? 'text-green-600' : apiStatus.includes('❌') ? 'text-red-600' : 'text-yellow-600'}`}>
            {apiStatus}
          </div>
        </div>

        {error && (
          <div>
            <strong className="text-red-600">Error:</strong>
            <div className="text-xs text-red-600 break-all">{error}</div>
          </div>
        )}

        {scholarshipData && (
          <div>
            <strong className="text-green-600">Data Count:</strong>
            <div className="text-xs text-green-600">
              {Array.isArray(scholarshipData) ? scholarshipData.length : 'Object received'}
            </div>
          </div>
        )}

        <div className="flex gap-2 mt-3">
          <button 
            onClick={testApiConnection}
            className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          >
            Retry
          </button>
          <button 
            onClick={testDifferentEndpoints}
            className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
          >
            Test All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;