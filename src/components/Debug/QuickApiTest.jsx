import { useState } from 'react';

const QuickApiTest = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      // Test 1: Basic server health
      console.log('🔍 Testing server health...');
      const healthResponse = await fetch('https://assignment-scholarship-server.vercel.app');
      const healthText = await healthResponse.text();
      console.log('Server response:', healthResponse.status, healthText);
      
      // Test 2: Check different endpoints
      const endpoints = [
        '/scholarship',
        '/scholar/moderator', 
        '/api/scholarship',
        '/api/scholar/moderator',
        '/scholarships',
        '/applied-scholarships'
      ];
      
      let results = `Server Status: ${healthResponse.status}\n\n`;
      
      for (const endpoint of endpoints) {
        try {
          const url = `https://assignment-scholarship-server.vercel.app${endpoint}`;
          const response = await fetch(url);
          const responseText = await response.text();
          
          results += `✅ ${endpoint}: ${response.status}\n`;
          if (response.status === 200) {
            try {
              const json = JSON.parse(responseText);
              results += `   Data: ${Array.isArray(json) ? json.length + ' items' : 'Object'}\n`;
            } catch {
              results += `   Response: ${responseText.substring(0, 50)}...\n`;
            }
          }
          console.log(`${endpoint}:`, response.status, responseText.substring(0, 100));
        } catch (err) {
          results += `❌ ${endpoint}: ${err.message}\n`;
          console.error(`${endpoint} error:`, err);
        }
      }
      
      setResult(results);
    } catch (error) {
      console.error('API Test Error:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border max-w-lg z-50">
      <h3 className="text-lg font-bold mb-2">🔧 Quick API Test</h3>
      
      <button 
        onClick={testApi}
        disabled={loading}
        className="mb-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API Endpoints'}
      </button>
      
      {result && (
        <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto max-h-64 whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </div>
  );
};

export default QuickApiTest;