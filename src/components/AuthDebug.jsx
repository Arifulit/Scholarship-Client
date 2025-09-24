import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase/firebase.config';

const AuthDebug = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);

  const checkFirebaseConfig = () => {
    const auth = getAuth(app);
    const config = app.options;
    
    setDebugInfo({
      firebaseConfig: {
        apiKey: config.apiKey ? '✅ Set' : '❌ Missing',
        authDomain: config.authDomain || '❌ Missing',
        projectId: config.projectId ? '✅ Set' : '❌ Missing',
        storageBucket: config.storageBucket ? '✅ Set' : '❌ Missing',
        messagingSenderId: config.messagingSenderId ? '✅ Set' : '❌ Missing',
        appId: config.appId ? '✅ Set' : '❌ Missing',
      },
      authState: {
        currentUser: auth.currentUser ? '✅ Logged In' : '❌ Not Logged In',
        domain: window.location.hostname,
        protocol: window.location.protocol,
        fullUrl: window.location.href
      },
      environment: {
        mode: import.meta.env.MODE,
        dev: import.meta.env.DEV,
        prod: import.meta.env.PROD
      }
    });
  };

  // Only show in development or when there's an auth issue
  if (import.meta.env.PROD && !window.location.search.includes('debug=auth')) {
    return null;
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-20 right-4 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded-full text-xs font-bold shadow-lg z-50"
        title="Firebase Auth Debug"
      >
        🔥 AUTH
      </button>

      {/* Debug Panel */}
      {isVisible && (
        <div className="fixed top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border max-w-md z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              🔥 Firebase Auth Debug
            </h3>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 text-lg"
            >
              ×
            </button>
          </div>

          <button
            onClick={checkFirebaseConfig}
            className="w-full mb-4 bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm"
          >
            🔍 Check Firebase Config
          </button>

          {debugInfo && (
            <div className="space-y-4 text-xs">
              {/* Firebase Config */}
              <div>
                <div className="font-bold text-gray-700 dark:text-gray-300 mb-2">Firebase Config:</div>
                {Object.entries(debugInfo.firebaseConfig).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 dark:text-gray-400 font-mono">{key}:</span>
                    <span className={`font-mono ${
                      typeof value === 'string' && value.includes('❌') ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {typeof value === 'string' && value.length > 30 
                        ? `${value.substring(0, 30)}...` 
                        : value
                      }
                    </span>
                  </div>
                ))}
              </div>

              {/* Auth State */}
              <div>
                <div className="font-bold text-gray-700 dark:text-gray-300 mb-2">Auth State:</div>
                {Object.entries(debugInfo.authState).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 dark:text-gray-400 font-mono">{key}:</span>
                    <span className={`font-mono ${
                      typeof value === 'string' && value.includes('❌') ? 'text-red-500' : 'text-blue-600'
                    }`}>
                      {typeof value === 'string' && value.length > 20 
                        ? `${value.substring(0, 20)}...` 
                        : value
                      }
                    </span>
                  </div>
                ))}
              </div>

              {/* Environment */}
              <div>
                <div className="font-bold text-gray-700 dark:text-gray-300 mb-2">Environment:</div>
                {Object.entries(debugInfo.environment).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center mb-1">
                    <span className="text-gray-600 dark:text-gray-400 font-mono">{key}:</span>
                    <span className="font-mono text-blue-600">{String(value)}</span>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
                <div className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">
                  💡 Firebase Auth Issues:
                </div>
                <div className="text-yellow-600 dark:text-yellow-300 space-y-1">
                  <div>1. Check if domain is authorized in Firebase Console</div>
                  <div>2. Go to Firebase → Authentication → Settings</div>
                  <div>3. Add your Vercel domain to authorized domains</div>
                  <div>4. Domain: <code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{debugInfo.authState.domain}</code></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AuthDebug;