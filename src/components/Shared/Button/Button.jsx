import PropTypes from 'prop-types'
import { TbFidgetSpinner } from 'react-icons/tb'

const Button = ({ 
  label, 
  onClick, 
  disabled, 
  outline, 
  small, 
  large,
  icon: Icon,
  type = 'button',
  variant = 'primary',
  loading = false,
  className = '',
  fullWidth = true
}) => {
  
  const getVariantStyles = () => {
    const variants = {
      primary: {
        bg: 'bg-gradient-to-r from-lime-500 to-emerald-600',
        hover: 'hover:from-lime-600 hover:to-emerald-700',
        text: 'text-white',
        border: 'border-transparent',
        shadow: 'shadow-md hover:shadow-lg'
      },
      secondary: {
        bg: 'bg-white',
        hover: 'hover:bg-gray-50',
        text: 'text-gray-700',
        border: 'border-gray-300',
        shadow: 'shadow-sm hover:shadow-md'
      },
      danger: {
        bg: 'bg-gradient-to-r from-red-500 to-red-600',
        hover: 'hover:from-red-600 hover:to-red-700',
        text: 'text-white',
        border: 'border-transparent',
        shadow: 'shadow-md hover:shadow-lg'
      },
      success: {
        bg: 'bg-gradient-to-r from-green-500 to-green-600',
        hover: 'hover:from-green-600 hover:to-green-700',
        text: 'text-white',
        border: 'border-transparent',
        shadow: 'shadow-md hover:shadow-lg'
      },
      outline: {
        bg: 'bg-transparent',
        hover: 'hover:bg-lime-50',
        text: 'text-lime-600',
        border: 'border-lime-500',
        shadow: 'shadow-sm hover:shadow-md'
      }
    }
    
    return outline ? variants.outline : variants[variant] || variants.primary
  }

  const getSizeStyles = () => {
    if (large) return 'px-8 py-4 text-lg font-semibold'
    if (small) return 'px-4 py-2 text-sm font-medium'
    return 'px-6 py-3 text-base font-semibold'
  }

  const styles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  const iconSize = large ? 24 : small ? 16 : 20

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        relative
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        transition-all
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-lime-500
        focus:ring-offset-2
        transform
        hover:scale-105
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:transform-none
        ${styles.bg}
        ${styles.hover}
        ${styles.text}
        border
        ${styles.border}
        ${styles.shadow}
        ${sizeStyles}
        ${fullWidth ? 'w-full' : 'w-auto'}
        ${className}
      `}
    >
      {loading ? (
        <TbFidgetSpinner className={`animate-spin w-${iconSize/4} h-${iconSize/4}`} />
      ) : Icon ? (
        <Icon className={`w-${iconSize/4} h-${iconSize/4}`} />
      ) : null}
      
      <span className={loading ? 'opacity-75' : ''}>
        {loading ? 'Loading...' : label}
      </span>
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  icon: PropTypes.elementType,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success']),
  loading: PropTypes.bool,
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
}

export default Button
