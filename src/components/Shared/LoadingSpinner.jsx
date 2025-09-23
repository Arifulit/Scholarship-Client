import PropTypes from 'prop-types'
import { ScaleLoader } from 'react-spinners'

const LoadingSpinner = ({ 
  smallHeight = false, 
  size = 'medium',
  message = 'Loading...',
  color = 'indigo',
  overlay = false 
}) => {
  const getSizeConfig = () => {
    const configs = {
      small: { scale: 40, height: 'h-32' },
      medium: { scale: 100, height: smallHeight ? 'h-[250px]' : 'h-[70vh]' },
      large: { scale: 150, height: 'h-screen' }
    }
    return configs[size] || configs.medium
  }

  const getColor = () => {
    const colors = {
      indigo: '#6366f1',
      lime: '#84cc16',
      blue: '#3b82f6',
      purple: '#8b5cf6',
      green: '#10b981',
      red: '#ef4444'
    }
    return colors[color] || colors.indigo
  }

  const config = getSizeConfig()

  const LoaderContent = () => (
    <div className={`${config.height} flex flex-col justify-center items-center space-y-4`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white dark:via-gray-800 to-transparent opacity-20 animate-pulse"></div>
        <ScaleLoader 
          height={35}
          width={4}
          radius={2}
          margin={2}
          color={getColor()}
          loading={true}
        />
      </div>
      
      {message && (
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 animate-pulse">
            {message}
          </p>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      )}
    </div>
  )

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
          <LoaderContent />
        </div>
      </div>
    )
  }

  return <LoaderContent />
}

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  message: PropTypes.string,
  color: PropTypes.oneOf(['indigo', 'lime', 'blue', 'purple', 'green', 'red']),
  overlay: PropTypes.bool,
}

export default LoadingSpinner
