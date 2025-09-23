import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Dashboard/Sidebar/Sidebar'
import { useState, useEffect, useRef } from 'react'
import { 
  FiMenu, 
  FiBell, 
  FiSearch, 
  FiSettings, 
  FiLogOut, 
  FiUser, 
  FiChevronDown, 
  FiSun, 
  FiMoon,
  FiActivity,
  FiClock,
  FiTrendingUp,
  FiShield,
  FiGlobe,
  FiMail,
  FiHelpCircle,
  FiMaximize2
} from 'react-icons/fi'
import { HiSparkles, HiLightBulb, HiChat } from 'react-icons/hi'
import useAuth from '../hooks/useAuth'
import useTheme from '../hooks/useTheme'
import useRole from '../hooks/useRole'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notifications] = useState([
    {
      id: 1,
      title: 'New scholarship application received',
      message: 'John Doe has applied for Computer Science Scholarship',
      time: '2 minutes ago',
      type: 'success',
      read: false
    },
    {
      id: 2,
      title: 'Application status updated',
      message: 'Your application for Engineering Scholarship has been approved',
      time: '1 hour ago',
      type: 'info',
      read: false
    },
    {
      id: 3,
      title: 'New message from moderator',
      message: 'Please provide additional documents for your application',
      time: '3 hours ago',
      type: 'warning',
      read: true
    },
    {
      id: 4,
      title: 'Scholarship deadline reminder',
      message: 'Medical Scholarship application closes in 3 days',
      time: '5 hours ago',
      type: 'error',
      read: false
    }
  ])
  
  const { user, logOut } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const [role] = useRole()
  const location = useLocation()
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Get unread notification count
  const unreadCount = notifications.filter(n => !n.read).length

  // Get page title and icon from current route
  const getPageInfo = () => {
    const path = location.pathname
    if (path.includes('profile')) return { title: 'Profile', icon: FiUser, description: 'Manage your personal information' }
    if (path.includes('statistics')) return { title: 'Statistics', icon: FiTrendingUp, description: 'Analytics and insights' }
    if (path.includes('add-scholarship')) return { title: 'Add Scholarship', icon: HiSparkles, description: 'Create new scholarship opportunities' }
    if (path.includes('manage-scholarship')) return { title: 'Manage Scholarships', icon: FiSettings, description: 'Oversee scholarship programs' }
    if (path.includes('applied-scholarship')) return { title: 'Applied Scholarships', icon: FiActivity, description: 'Review scholarship applications' }
    if (path.includes('manage-users')) return { title: 'Manage Users', icon: FiShield, description: 'User administration and roles' }
    if (path.includes('my-application')) return { title: 'My Applications', icon: FiMail, description: 'Track your scholarship applications' }
    if (path.includes('payment-history')) return { title: 'Payment History', icon: FiClock, description: 'View transaction history' }
    if (path.includes('cart')) return { title: 'Cart', icon: FiGlobe, description: 'Review selected items' }
    return { title: 'Dashboard', icon: FiActivity, description: 'Welcome to your scholarship portal' }
  }

  const pageInfo = getPageInfo()

  // Get notification type styling
  const getNotificationStyle = (type) => {
    switch (type) {
      case 'success': return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
      case 'info': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
      case 'warning': return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
      case 'error': return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
      default: return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200'
    }
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Get role-specific greeting
  const getRoleGreeting = () => {
    const hour = new Date().getHours()
    let timeGreeting = 'Good morning'
    if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon'
    if (hour >= 17) timeGreeting = 'Good evening'
    
    switch (role) {
      case 'admin': return `${timeGreeting}, Administrator`
      case 'moderator': return `${timeGreeting}, Moderator`
      case 'customer': return `${timeGreeting}, Scholar`
      default: return `${timeGreeting}, Welcome back`
    }
  }

  const handleLogout = async () => {
    try {
      await logOut()
      setProfileDropdownOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false)
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Enhanced search functionality
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    // Add search logic here
  }

  // Enhanced search with enter key
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Searching for:', searchQuery)
      // Implement search logic
    }
  }

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-all duration-500'>
      {/* Enhanced Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-300'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-h-screen transition-all duration-300'>
        {/* Enhanced Top Navigation Bar */}
        <div className='sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/20'>
          <div className='flex items-center justify-between px-4 lg:px-8 py-4'>
            {/* Enhanced Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className='md:hidden group p-3 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 text-white hover:from-lime-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 shadow-lg'
            >
              <FiMenu className='w-5 h-5 transition-transform group-hover:rotate-180' />
            </button>

            {/* Enhanced Search Bar */}
            <div className='hidden md:flex flex-1 max-w-2xl mx-6'>
              <div className='relative w-full group'>
                <FiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-lime-500 transition-colors' />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchSubmit}
                  placeholder='Search scholarships, users, applications, or anything...'
                  className='w-full pl-12 pr-6 py-3 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm shadow-inner hover:bg-gray-100/80 dark:hover:bg-gray-700/80'
                />
                <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                  <kbd className='px-2 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600'>⌘K</kbd>
                </div>
              </div>
            </div>

            {/* Enhanced Right side actions */}
            <div className='flex items-center gap-2'>
              {/* Enhanced Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className='p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md backdrop-blur-sm group'
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <FiSun className='w-5 h-5 group-hover:rotate-180 transition-transform duration-500' />
                ) : (
                  <FiMoon className='w-5 h-5 group-hover:-rotate-12 transition-transform duration-300' />
                )}
              </button>

              {/* Enhanced Fullscreen Toggle */}
              <button 
                onClick={toggleFullscreen}
                className='hidden lg:block p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md backdrop-blur-sm'
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <FiMaximize2 className='w-5 h-5' />
              </button>

              {/* Enhanced Help/Support */}
              <button className='hidden lg:block p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md backdrop-blur-sm group'>
                <FiHelpCircle className='w-5 h-5 group-hover:rotate-12 transition-transform duration-300' />
              </button>

              {/* Enhanced Notifications */}
              <div className='relative' ref={notificationRef}>
                <button 
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className='relative p-3 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md backdrop-blur-sm group'
                >
                  <FiBell className={`w-5 h-5 transition-transform duration-300 ${notificationDropdownOpen ? 'rotate-12' : 'group-hover:animate-pulse'}`} />
                  {unreadCount > 0 && (
                    <span className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse shadow-lg'>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Enhanced Notification Dropdown */}
                {notificationDropdownOpen && (
                  <div className='absolute right-0 mt-3 w-96 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 transform transition-all duration-300 opacity-100 scale-100'>
                    <div className='p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-lime-50 to-emerald-50 dark:from-lime-900/20 dark:to-emerald-900/20 rounded-t-2xl'>
                      <div className='flex items-center justify-between'>
                        <h3 className='text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2'>
                          <HiSparkles className='w-5 h-5 text-lime-500' />
                          Notifications
                        </h3>
                        <span className='px-3 py-1 bg-lime-500 text-white text-sm font-semibold rounded-full'>
                          {unreadCount} new
                        </span>
                      </div>
                    </div>
                    <div className='max-h-80 overflow-y-auto'>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-all duration-200 cursor-pointer ${
                            !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                          }`}
                        >
                          <div className='flex items-start gap-3'>
                            <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${getNotificationStyle(notification.type)}`}></div>
                            <div className='flex-1 min-w-0'>
                              <p className={`text-sm font-semibold text-gray-900 dark:text-white mb-1 ${!notification.read ? 'font-bold' : ''}`}>
                                {notification.title}
                              </p>
                              <p className='text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2'>
                                {notification.message}
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1'>
                                <FiClock className='w-3 h-3' />
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className='w-2 h-2 bg-lime-500 rounded-full animate-pulse'></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='p-4 bg-gray-50/80 dark:bg-gray-800/80 rounded-b-2xl border-t border-gray-200/50 dark:border-gray-700/50'>
                      <div className='flex items-center justify-between gap-3'>
                        <button className='flex-1 text-sm text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-lime-50 dark:hover:bg-lime-900/20'>
                          Mark all as read
                        </button>
                        <button className='flex-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700'>
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced User Profile Dropdown */}
              <div className='relative' ref={dropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className='flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-lime-500/10 to-emerald-500/10 hover:from-lime-500/20 hover:to-emerald-500/20 border border-lime-200 dark:border-lime-800 transition-all duration-300 transform hover:scale-105 shadow-md backdrop-blur-sm group'
                >
                  <div className='relative'>
                    <img
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=10b981&color=fff&size=40`}
                      alt='Profile'
                      className='w-10 h-10 rounded-full object-cover ring-2 ring-lime-300 dark:ring-lime-700 group-hover:ring-lime-400 dark:group-hover:ring-lime-600 transition-all duration-300'
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=10b981&color=fff&size=40`;
                      }}
                    />
                    <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse'></div>
                  </div>
                  <div className='hidden md:flex items-center gap-2'>
                    <div className='text-left'>
                      <p className='text-sm font-bold text-gray-900 dark:text-white truncate max-w-32 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors'>
                        {user?.displayName || 'User'}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400 capitalize font-medium'>
                        {role || 'member'}
                      </p>
                    </div>
                    <FiChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {/* Enhanced Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className='absolute right-0 mt-3 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 transform transition-all duration-300 opacity-100 scale-100'>
                    {/* User Info Header */}
                    <div className='p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-lime-50 to-emerald-50 dark:from-lime-900/20 dark:to-emerald-900/20 rounded-t-2xl'>
                      <div className='flex items-center gap-4'>
                        <div className='relative'>
                          <img
                            src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=10b981&color=fff&size=60`}
                            alt='Profile'
                            className='w-16 h-16 rounded-full object-cover ring-4 ring-lime-200 dark:ring-lime-800 shadow-lg'
                          />
                          <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-3 border-white dark:border-gray-900 rounded-full'></div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-bold text-gray-900 dark:text-white text-lg truncate'>
                            {user?.displayName || 'User Name'}
                          </p>
                          <p className='text-sm text-gray-600 dark:text-gray-400 truncate mb-2'>
                            {user?.email || 'user@example.com'}
                          </p>
                          <div className='flex items-center gap-2'>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full ${
                              role === 'admin' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200' :
                              role === 'moderator' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200' :
                              'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                            }`}>
                              <FiShield className='w-3 h-3' />
                              {role || 'member'}
                            </span>
                            <span className='text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className='p-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200/50 dark:border-gray-700/50'>
                      <div className='grid grid-cols-3 gap-4 text-center'>
                        <div className='p-2'>
                          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Applications</p>
                          <p className='text-lg font-bold text-gray-900 dark:text-white'>5</p>
                        </div>
                        <div className='p-2'>
                          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Approved</p>
                          <p className='text-lg font-bold text-green-600 dark:text-green-400'>3</p>
                        </div>
                        <div className='p-2'>
                          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Pending</p>
                          <p className='text-lg font-bold text-yellow-600 dark:text-yellow-400'>2</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className='p-3'>
                      <button 
                        onClick={() => setProfileDropdownOpen(false)}
                        className='w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-lime-50 dark:hover:bg-lime-900/20 hover:text-lime-700 dark:hover:text-lime-300 rounded-xl transition-all duration-200 group'
                      >
                        <FiUser className='w-5 h-5 group-hover:scale-110 transition-transform' />
                        <div>
                          <p className='font-medium'>View Profile</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>Manage your account</p>
                        </div>
                      </button>
                      <button className='w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-xl transition-all duration-200 group'>
                        <FiSettings className='w-5 h-5 group-hover:rotate-90 transition-transform duration-300' />
                        <div>
                          <p className='font-medium'>Settings</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>Preferences & privacy</p>
                        </div>
                      </button>
                      <button className='w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 rounded-xl transition-all duration-200 group'>
                        <HiLightBulb className='w-5 h-5 group-hover:animate-pulse' />
                        <div>
                          <p className='font-medium'>Help & Support</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>Get assistance</p>
                        </div>
                      </button>
                      <hr className='my-3 border-gray-200 dark:border-gray-600' />
                      <button 
                        onClick={handleLogout}
                        className='w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 group'
                      >
                        <FiLogOut className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                        <div>
                          <p className='font-medium'>Logout</p>
                          <p className='text-xs text-red-500 dark:text-red-400'>Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Time & Weather Widget */}
              <div className='hidden xl:flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm'>
                <div className='text-center'>
                  <p className='text-xs font-medium opacity-90'>
                    {currentTime.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className='text-sm font-bold'>
                    {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className='w-px h-8 bg-white/30'></div>
                <div className='text-center'>
                  <p className='text-xs font-medium opacity-90'>Time</p>
                  <p className='text-sm font-bold'>
                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Search Bar */}
        <div className='md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3 shadow-sm'>
          <div className='relative group'>
            <FiSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-lime-500 transition-colors' />
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
              placeholder='Search scholarships, users, applications...'
              className='w-full pl-12 pr-4 py-3 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-lime-500/20 focus:border-lime-500 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm'
            />
          </div>
        </div>

        {/* Enhanced Content Container */}
        <div className='flex-1 p-4 lg:p-8 overflow-auto bg-gradient-to-br from-gray-50/30 via-white/50 to-blue-50/30 dark:from-gray-900/30 dark:via-gray-800/50 dark:to-indigo-950/30'>
          {/* Enhanced Page Header */}
          <div className='mb-8'>
            <div className='bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 relative overflow-hidden'>
              {/* Background decoration */}
              <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-500/10 to-emerald-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32'></div>
              <div className='absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl translate-y-24 -translate-x-24'></div>
              
              <div className='relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'>
                <div className='flex-1'>
                  {/* Enhanced Breadcrumb */}
                  <nav className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4'>
                    <div className='flex items-center gap-2 px-3 py-1 bg-gray-100/80 dark:bg-gray-800/80 rounded-lg backdrop-blur-sm'>
                      <FiActivity className='w-4 h-4' />
                      <span className='font-medium'>Dashboard</span>
                    </div>
                    {location.pathname !== '/dashboard' && (
                      <>
                        <FiChevronDown className='w-4 h-4 rotate-[-90deg] text-gray-300 dark:text-gray-600' />
                        <div className='flex items-center gap-2 px-3 py-1 bg-lime-100/80 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 rounded-lg backdrop-blur-sm'>
                          <pageInfo.icon className='w-4 h-4' />
                          <span className='font-semibold'>{pageInfo.title}</span>
                        </div>
                      </>
                    )}
                  </nav>
                  
                  {/* Enhanced Title */}
                  <div className='flex items-start gap-4 mb-4'>
                    <div className='p-3 bg-gradient-to-br from-lime-500 to-emerald-600 rounded-2xl shadow-lg'>
                      <pageInfo.icon className='w-8 h-8 text-white' />
                    </div>
                    <div>
                      <h1 className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-2'>
                        {pageInfo.title}
                      </h1>
                      <p className='text-gray-600 dark:text-gray-300 text-lg font-medium'>
                        {getRoleGreeting()}
                      </p>
                      <p className='text-gray-500 dark:text-gray-400 mt-1'>
                        {pageInfo.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Quick Actions & Stats */}
                <div className='flex flex-col lg:flex-row items-stretch lg:items-center gap-4'>
                  {/* Live Stats Cards */}
                  <div className='flex items-center gap-4'>
                    <div className='group p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm'>
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-blue-500 rounded-lg'>
                          <FiTrendingUp className='w-5 h-5 text-white' />
                        </div>
                        <div>
                          <p className='text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider'>Status</p>
                          <p className='text-lg font-bold text-blue-700 dark:text-blue-300'>Active</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className='group p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-800/50 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 hover:scale-105 backdrop-blur-sm'>
                      <div className='flex items-center gap-3'>
                        <div className='p-2 bg-green-500 rounded-lg'>
                          <HiChat className='w-5 h-5 text-white' />
                        </div>
                        <div>
                          <p className='text-xs text-green-600 dark:text-green-400 font-semibold uppercase tracking-wider'>Messages</p>
                          <p className='text-lg font-bold text-green-700 dark:text-green-300'>12</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Date & Time Display */}
                  <div className='p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50 backdrop-blur-sm min-w-0'>
                    <div className='text-center'>
                      <p className='text-xs text-purple-600 dark:text-purple-400 font-semibold uppercase tracking-wider mb-1'>Today</p>
                      <p className='text-sm font-bold text-purple-700 dark:text-purple-300 truncate'>
                        {currentTime.toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <p className='text-xs text-purple-500 dark:text-purple-400 font-medium mt-1'>
                        {currentTime.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Dynamic Content */}
          <div className='space-y-8'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
