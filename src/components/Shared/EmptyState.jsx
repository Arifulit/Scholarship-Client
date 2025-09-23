import PropTypes from 'prop-types'
import Button from '../../components/Shared/Button/Button'
import { Link } from 'react-router-dom'
import { 
  FaSearch, 
  FaFileAlt, 
  FaGraduationCap, 
  FaExclamationTriangle,
  FaPlus,
  FaHome
} from 'react-icons/fa'

const EmptyState = ({ 
  message = "No items found", 
  address = "/", 
  label = "Go Home",
  icon = "search",
  title,
  description,
  variant = "default"
}) => {
  const getIcon = () => {
    const icons = {
      search: FaSearch,
      file: FaFileAlt,
      scholarship: FaGraduationCap,
      warning: FaExclamationTriangle,
      add: FaPlus,
      home: FaHome
    }
    const IconComponent = icons[icon] || icons.search
    return IconComponent
  }

  const getVariantStyles = () => {
    const variants = {
      default: {
        bg: "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900",
        iconBg: "bg-gradient-to-br from-gray-400 to-gray-500",
        iconColor: "text-white"
      },
      info: {
        bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
        iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        iconColor: "text-white"
      },
      success: {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
        iconBg: "bg-gradient-to-br from-green-500 to-emerald-600",
        iconColor: "text-white"
      },
      warning: {
        bg: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
        iconBg: "bg-gradient-to-br from-yellow-500 to-orange-600",
        iconColor: "text-white"
      }
    }
    return variants[variant] || variants.default
  }

  const Icon = getIcon()
  const styles = getVariantStyles()

  return (
    <div className={`min-h-[60vh] flex flex-col justify-center items-center px-4 py-16 ${styles.bg} transition-colors duration-300`}>
      <div className="text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="relative mb-8">
          <div className={`inline-flex items-center justify-center w-24 h-24 ${styles.iconBg} rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-12 h-12 ${styles.iconColor}`} />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-6 h-6 bg-white dark:bg-gray-700 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-4 right-2 w-4 h-4 bg-white dark:bg-gray-700 rounded-full opacity-30 animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="absolute bottom-2 left-4 w-3 h-3 bg-white dark:bg-gray-700 rounded-full opacity-25 animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-8">
          {title && (
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            {message}
          </p>
          
          {description && (
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-500 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="space-y-4">
          <Link to={address}>
            <Button 
              label={label}
              variant="primary"
              icon={getIcon()}
              className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              fullWidth={false}
            />
          </Link>
          
          {/* Additional help text */}
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Need help? Contact our support team
          </p>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white dark:bg-gray-700 rounded-full opacity-5 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white dark:bg-gray-700 rounded-full opacity-3 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white dark:bg-gray-700 rounded-full opacity-4 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  )
}

EmptyState.propTypes = {
  message: PropTypes.string,
  address: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.oneOf(['search', 'file', 'scholarship', 'warning', 'add', 'home']),
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'info', 'success', 'warning']),
}

export default EmptyState
