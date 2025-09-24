import { useState } from 'react';

const ApiEndpointTester = () => {
  const [results, setResults] = useState({});
  const [testing, setTesting] = useState(false);

  const testEndpoints = async () => {
    setTesting(true);
    setResults({});
    
    const baseUrl = 'https://assignment-scholarship-server.vercel.app';
    const endpoints = [
      '',                    // Root
      '/api',               // API prefix
      '/scholarship',       // Direct scholarship
      '/api/scholarship',   // API + scholarship
      '/scholarships',      // Plural
      '/api/scholarships',  // API + plural
      '/scholar',           // Short form
      '/api/scholar',       // API + short form
    ];

    const testResults = {};

    for (const endpoint of endpoints) {
      try {
        console.log(`🧪 Testing: ${baseUrl}${endpoint}`);
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        testResults[endpoint || 'root'] = {
          status: response.status,
          ok: response.ok,
          statusText: response.statusText
        };

        if (response.ok) {
          try {
            const data = await response.json();
            testResults[endpoint || 'root'].hasData = Array.isArray(data);
            testResults[endpoint || 'root'].dataLength = Array.isArray(data) ? data.length : 'Object';
          } catch {
            testResults[endpoint || 'root'].hasData = false;
          }
        }

        console.log(`${response.ok ? '✅' : '❌'} ${endpoint || 'root'}: ${response.status}`);
        
      } catch (error) {
        testResults[endpoint || 'root'] = {
          status: 'Network Error',
          ok: false,
          error: error.message
        };
        console.log(`❌ ${endpoint || 'root'}: ${error.message}`);
      }
    }

    setResults(testResults);
    setTesting(false);
  };

  const getStatusColor = (result) => {
    if (result.ok) return 'text-green-600 bg-green-50 border-green-200';
    if (result.status === 404) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getStatusIcon = (result) => {
    if (result.ok) return '✅';
    if (result.status === 404) return '⚠️';
    return '❌';
  };

  return (
    <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border max-w-lg z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          🔍 API Endpoint Tester
        </h3>
        <button 
          onClick={testEndpoints}
          disabled={testing}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
        >
          {testing ? '⏳ Testing...' : '🧪 Test All'}
        </button>
      </div>

      <div className="space-y-2 text-sm">
        {Object.entries(results).map(([endpoint, result]) => (
          <div key={endpoint} className={`p-3 rounded border ${getStatusColor(result)}`}>
            <div className="flex items-center justify-between mb-1">
              <div className="font-mono text-xs">
                {endpoint === 'root' ? '/' : endpoint}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{getStatusIcon(result)}</span>
                <span className="text-xs font-medium">{result.status}</span>
              </div>
            </div>
            
            {result.hasData && (
              <div className="text-xs text-green-600">
                📊 Data: {result.dataLength} items
              </div>
            )}
            
            {result.error && (
              <div className="text-xs text-red-600">
                ❌ {result.error}
              </div>
            )}
          </div>
        ))}
      </div>

      {Object.keys(results).length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <div className="font-medium text-blue-700 text-sm mb-2">📋 Working Endpoints:</div>
          <div className="text-xs space-y-1">
            {Object.entries(results)
              .filter(([, result]) => result.ok && result.hasData)
              .map(([endpoint, result]) => (
                <div key={endpoint} className="text-green-600 font-mono">
                  ✅ {endpoint === 'root' ? '/' : endpoint} ({result.dataLength} items)
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-600">
        💡 Check console (F12) for detailed logs
      </div>
    </div>
  );
};

export default ApiEndpointTester;