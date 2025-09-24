import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductionDebug = () => {
  const [envData, setEnvData] = useState({});
  const [apiTest, setApiTest] = useState({ status: 'idle', data: null, error: null });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setEnvData({
      NODE_ENV: import.meta.env.MODE,
      VITE_API_URL: import.meta.env.VITE_API_URL,
      VITE_IMGBB_API_KEY: import.meta.env.VITE_IMGBB_API_KEY ? '✓ Set' : '✗ Not Set',
      VITE_apiKey: import.meta.env.VITE_apiKey ? '✓ Set' : '✗ Not Set',
      VITE_authDomain: import.meta.env.VITE_authDomain ? '✓ Set' : '✗ Not Set',
      VITE_projectId: import.meta.env.VITE_projectId ? '✓ Set' : '✗ Not Set',
    });
  }, []);

  const testApiConnection = async () => {
    setApiTest({ status: 'testing', data: null, error: null });
    
    try {
      console.log('🧪 Testing API connection...');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/scholarship`);
      console.log('✅ API Test Success:', response.data);
      
      setApiTest({
        status: 'success',
        data: {
          count: response.data?.length || 0,
          sample: response.data?.[0]?.scholarshipName || 'No data'
        },
        error: null
      });
    } catch (error) {
      console.error('❌ API Test Failed:', error);
      setApiTest({
        status: 'error',
        data: null,
        error: error.message
      });
    }
  };

  // Only show in production or when explicitly enabled
  const shouldShow = import.meta.env.MODE === 'production' || import.meta.env.DEV;

  if (!shouldShow) return null;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg z-50 transition-all duration-300"
        title="Debug Environment Variables"
      >
        🐛 ENV
      </button>

      
      {isVisible && (
        <div className="fixed top-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border max-w-sm z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              🔧 Production Debug
            </h3>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {Object.entries(envData).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400 font-mono">
                  {key}:
                </span>
                <span className={`font-mono ${
                  value === '✗ Not Set' ? 'text-red-500' : 
                  value === '✓ Set' ? 'text-green-500' : 
                  'text-blue-600'
                }`}>
                  {typeof value === 'string' && value.length > 20 
                    ? `${value.substring(0, 20)}...` 
                    : value
                  }
                </span>
              </div>
            ))}
          </div>

          {/* API Test Section */}
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">API Test:</span>
              <button 
                onClick={testApiConnection}
                disabled={apiTest.status === 'testing'}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:opacity-50"
              >
                {apiTest.status === 'testing' ? '⏳' : '🧪'} Test
              </button>
            </div>
            
            {apiTest.status === 'success' && (
              <div className="text-xs text-green-600">
                ✅ Success: {apiTest.data.count} scholarships found
                <br />
                Sample: {apiTest.data.sample}
              </div>
            )}
            
            {apiTest.status === 'error' && (
              <div className="text-xs text-red-600">
                ❌ Failed: {apiTest.error}
              </div>
            )}
          </div>

          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
            <div className="font-medium text-yellow-700 dark:text-yellow-400">
              💡 If ENV vars are missing:
            </div>
            <div className="text-yellow-600 dark:text-yellow-300 mt-1">
              1. Add them in Vercel Dashboard<br/>
              2. Settings → Environment Variables<br/>
              3. Redeploy your app
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductionDebug;