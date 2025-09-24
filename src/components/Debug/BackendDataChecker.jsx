import { useState } from 'react';
import axios from 'axios';

const BackendDataChecker = () => {
  const [checking, setChecking] = useState(false);
  const [results, setResults] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const checkBackendData = async () => {
    setChecking(true);
    setResults(null);

    const backendUrl = 'https://assignment-scholarship-server.vercel.app';
    const endpoints = [
      '',
      '/scholarship',
      '/scholarships', 
      '/api/scholarship',
      '/api/scholarships',
      '/scholar',
      '/data',
      '/health'
    ];

    const testResults = [];

    // Test server health first
    try {
      const healthResponse = await fetch(backendUrl);
      const healthText = await healthResponse.text();
      
      testResults.push({
        endpoint: 'Server Health',
        status: healthResponse.status,
        success: healthResponse.ok,
        data: healthText.substring(0, 100) + '...'
      });
    } catch (error) {
      testResults.push({
        endpoint: 'Server Health',
        status: 'Error',
        success: false,
        error: error.message
      });
    }

    // Test each endpoint
    for (const endpoint of endpoints) {
      try {
        const url = `${backendUrl}${endpoint}`;
        console.log(`🧪 Testing: ${url}`);
        
        const response = await axios.get(url);
        const data = response.data;
        
        testResults.push({
          endpoint: endpoint || 'Root',
          status: response.status,
          success: true,
          dataType: Array.isArray(data) ? 'Array' : typeof data,
          dataLength: Array.isArray(data) ? data.length : 'N/A',
          sample: Array.isArray(data) && data.length > 0 ? data[0] : data
        });
        
        console.log(`✅ ${endpoint}: ${response.status} - ${Array.isArray(data) ? data.length + ' items' : typeof data}`);
        
      } catch (error) {
        testResults.push({
          endpoint: endpoint || 'Root',
          status: error.response?.status || 'Network Error',
          success: false,
          error: error.message
        });
        
        console.log(`❌ ${endpoint}: ${error.message}`);
      }
    }

    setResults(testResults);
    setChecking(false);
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-16 right-4 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg z-50"
        title="Check Backend Data"
      >
        🔍 Backend
      </button>
    );
  }

  return (
    <div className="fixed top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border max-w-md z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          🔍 Backend Data Checker
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={checkBackendData}
            disabled={checking}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
          >
            {checking ? '⏳' : '🔄'} Check
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </div>

      {checking && (
        <div className="text-center text-sm text-blue-600">
          🔍 Checking backend endpoints...
        </div>
      )}

      {results && (
        <div className="space-y-2 text-xs">
          {results.map((result, index) => (
            <div key={index} className={`p-2 rounded border ${
              result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-medium">
                  {result.endpoint}
                </span>
                <div className="flex items-center gap-1">
                  <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                    {result.success ? '✅' : '❌'}
                  </span>
                  <span className="text-gray-500">{result.status}</span>
                </div>
              </div>
              
              {result.success && result.dataType === 'Array' && (
                <div className="text-green-600">
                  📊 Found: {result.dataLength} items
                  {result.sample && (
                    <div className="text-xs text-gray-600 mt-1 truncate">
                      Sample: {result.sample.scholarshipName || result.sample.name || 'Unnamed'}
                    </div>
                  )}
                </div>
              )}
              
              {result.success && result.dataType !== 'Array' && (
                <div className="text-blue-600">
                  📄 Type: {result.dataType}
                </div>
              )}
              
              {!result.success && (
                <div className="text-red-600">
                  ❌ {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {results && (
        <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
          <div className="font-medium text-yellow-700 mb-1">
            💡 Solutions:
          </div>
          <div className="text-yellow-600 space-y-1">
            {results.some(r => r.success && r.dataLength > 0) ? (
              <div>✅ Found working endpoint with data!</div>
            ) : (
              <>
                <div>• Backend has no data in database</div>
                <div>• Check if backend seeded with sample data</div>
                <div>• Verify database connection</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackendDataChecker;