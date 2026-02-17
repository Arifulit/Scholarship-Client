import PropTypes from 'prop-types';

const ActionButton = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  onClick, 
  disabled = false, 
  icon, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2'
  };
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border border-transparent focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400',
    success: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white border border-transparent focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-400',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border border-transparent focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-400',
    warning: 'bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white border border-transparent focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-400',
    secondary: 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-900 border border-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-500 dark:text-gray-200 dark:border-gray-600 dark:focus:ring-gray-400',
    outline: 'bg-transparent hover:bg-gray-50 active:bg-gray-100 text-gray-700 border border-gray-300 focus:ring-gray-500 dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-gray-400',
    ghost: 'bg-transparent hover:bg-gray-100 active:bg-gray-200 text-gray-700 border border-transparent focus:ring-gray-500 dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-400'
  };
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

ActionButton.propTypes = {
  variant: PropTypes.oneOf(['primary', 'success', 'danger', 'warning', 'secondary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default ActionButton;