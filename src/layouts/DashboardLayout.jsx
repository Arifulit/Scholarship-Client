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
  const [role, roleLoading] = useRole()
  const location = useLocation()
  const dropdownRef = useRef(null)
  const notificationRef = useRef(null)

  // Debug logging
  useEffect(() => {
    console.log('🏠 DashboardLayout - User:', user?.email, 'Role:', role, 'Loading:', roleLoading)
  }, [user, role, roleLoading])

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
      case 'student': return `${timeGreeting}, Scholar`
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
    <div className='flex min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/80 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 transition-all duration-700'>
      {/* Enhanced Background Elements */}
      <div className='fixed inset-0 z-0 pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-indigo-400/15 to-purple-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tr from-emerald-400/20 via-teal-400/15 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-0 w-64 h-64 bg-gradient-to-br from-pink-400/15 via-rose-400/10 to-red-500/5 rounded-full blur-2xl animate-pulse delay-2000'></div>
        <div className='absolute top-1/4 right-0 w-72 h-72 bg-gradient-to-bl from-yellow-400/15 via-orange-400/10 to-amber-500/5 rounded-full blur-2xl animate-pulse delay-3000'></div>
      </div>

      {/* Enhanced Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className='fixed inset-0 z-40 bg-gradient-to-br from-black/70 via-black/60 to-black/50 backdrop-blur-md md:hidden transition-all duration-500'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content Area - Enhanced */}
      <div className='flex-1 flex flex-col min-h-screen relative z-10 transition-all duration-500'>
        {/* Professional Top Navigation Bar */}
        <div className='sticky top-0 z-30 bg-gradient-to-r from-white/95 via-white/98 to-white/95 dark:from-gray-900/95 dark:via-gray-900/98 dark:to-gray-900/95 backdrop-blur-2xl border-b border-white/60 dark:border-gray-700/60 shadow-2xl shadow-blue-200/10 dark:shadow-gray-900/30'>
          {/* Decorative top border */}
          <div className='absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'></div>
          <div className='flex items-center justify-between px-4 lg:px-8 py-4 relative'>
            {/* Professional Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className='md:hidden group relative p-3 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 transition-all duration-500 transform hover:scale-110 hover:rotate-3 shadow-2xl hover:shadow-blue-500/25'
            >
              <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl'></div>
              <FiMenu className='relative w-5 h-5 transition-transform duration-500 group-hover:rotate-180' />
              <div className='absolute inset-0 rounded-2xl ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300'></div>
            </button>

            {/* Professional Search Bar */}
            <div className='hidden md:flex flex-1 max-w-3xl mx-8'>
              <div className='relative w-full group'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500'></div>
                <FiSearch className='absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-all duration-300 z-10' />
                <input
                  type='text'
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchSubmit}
                  placeholder='Search scholarships, users, applications, or anything...'
                  className='relative w-full pl-14 pr-20 py-4 bg-white/70 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700/60 rounded-3xl focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 focus:border-blue-500/50 dark:focus:border-blue-400/50 transition-all duration-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-xl shadow-xl hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-2xl font-medium'
                />
                <div className='absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2'>
                  <kbd className='px-3 py-1.5 text-xs font-bold text-gray-500 dark:text-gray-400 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm'>⌘K</kbd>
                </div>
                <div className='absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/5'></div>
              </div>
            </div>

            {/* Enhanced Right side actions */}
            <div className='flex items-center gap-2'>
              {/* Professional Theme Toggle */}
              <button 
                onClick={toggleTheme}
                className='relative p-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-yellow-400 hover:via-orange-500 hover:to-red-500 hover:text-white transition-all duration-500 transform hover:scale-110 hover:rotate-6 shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 backdrop-blur-xl group border border-white/40 dark:border-gray-700/40'
                title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl'></div>
                {isDarkMode ? (
                  <FiSun className='relative w-5 h-5 group-hover:rotate-180 transition-transform duration-700' />
                ) : (
                  <FiMoon className='relative w-5 h-5 group-hover:-rotate-45 transition-transform duration-500' />
                )}
              </button>

              {/* Professional Fullscreen Toggle */}
              <button 
                onClick={toggleFullscreen}
                className='hidden lg:block relative p-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-blue-500 hover:via-indigo-500 hover:to-purple-600 hover:text-white transition-all duration-500 transform hover:scale-110 hover:-rotate-3 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 group'
                title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl'></div>
                <FiMaximize2 className='relative w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
              </button>

              {/* Professional Help/Support */}
              <button className='hidden lg:block relative p-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-rose-600 hover:text-white transition-all duration-500 transform hover:scale-110 hover:rotate-6 shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 group'>
                <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl'></div>
                <FiHelpCircle className='relative w-5 h-5 group-hover:rotate-45 transition-transform duration-500' />
              </button>

              {/* Professional Notifications */}
              <div className='relative' ref={notificationRef}>
                <button 
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className='relative p-3 rounded-2xl bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-red-500 hover:via-pink-500 hover:to-rose-600 hover:text-white transition-all duration-500 transform hover:scale-110 hover:-rotate-6 shadow-xl hover:shadow-2xl hover:shadow-red-500/25 backdrop-blur-xl border border-white/40 dark:border-gray-700/40 group'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-2xl'></div>
                  <FiBell className={`relative w-5 h-5 transition-transform duration-500 ${notificationDropdownOpen ? 'rotate-45' : 'group-hover:animate-bounce'}`} />
                  {unreadCount > 0 && (
                    <span className='absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse shadow-2xl ring-2 ring-white dark:ring-gray-900 border border-white/50'>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Professional Notification Dropdown */}
                {notificationDropdownOpen && (
                  <div className='absolute right-0 mt-4 w-[28rem] bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-700/60 z-50 transform transition-all duration-500 opacity-100 scale-100 ring-1 ring-black/5 dark:ring-white/10'>
                    <div className='p-8 border-b border-white/50 dark:border-gray-700/50 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/30 rounded-t-3xl relative overflow-hidden'>
                      <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl'></div>
                      <div className='relative flex items-center justify-between'>
                        <h3 className='text-xl font-black text-gray-900 dark:text-white flex items-center gap-3'>
                          <div className='p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg'>
                            <HiSparkles className='w-5 h-5 text-white' />
                          </div>
                          Notifications
                        </h3>
                        <span className='px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg'>
                          {unreadCount} new
                        </span>
                      </div>
                    </div>
                    <div className='max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent'>
                      {notifications.map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`group p-6 border-b border-white/30 dark:border-gray-800/30 last:border-0 hover:bg-gradient-to-r hover:from-blue-50/80 hover:to-indigo-50/80 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-300 cursor-pointer ${
                            !notification.read ? 'bg-gradient-to-r from-blue-50/60 to-indigo-50/60 dark:from-blue-900/15 dark:to-indigo-900/15' : ''
                          }`}
                        >
                          <div className='flex items-start gap-4'>
                            <div className={`w-4 h-4 rounded-full mt-2 flex-shrink-0 shadow-lg ring-2 ring-white dark:ring-gray-900 ${getNotificationStyle(notification.type)}`}></div>
                            <div className='flex-1 min-w-0'>
                              <p className={`text-sm font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${!notification.read ? 'font-black' : ''}`}>
                                {notification.title}
                              </p>
                              <p className='text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed'>
                                {notification.message}
                              </p>
                              <p className='text-xs text-gray-500 dark:text-gray-500 flex items-center gap-2 font-medium'>
                                <FiClock className='w-3 h-3' />
                                {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className='w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse shadow-lg ring-2 ring-blue-200 dark:ring-blue-800'></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className='p-6 bg-gradient-to-br from-gray-50/90 via-white/70 to-gray-50/90 dark:from-gray-800/90 dark:via-gray-800/70 dark:to-gray-800/90 rounded-b-3xl border-t border-white/50 dark:border-gray-700/50'>
                      <div className='flex items-center justify-center gap-4'>
                        <button className='flex-1 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 py-3 px-6 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md'>
                          Mark all as read
                        </button>
                        <button className='flex-1 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-300 py-3 px-6 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 shadow-sm hover:shadow-md'>
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional User Profile Dropdown */}
              <div className='relative' ref={dropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className='flex items-center gap-4 p-3 rounded-3xl bg-gradient-to-br from-white/80 via-white/60 to-white/80 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/80 hover:from-blue-50 hover:via-indigo-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:via-indigo-900/20 dark:hover:to-purple-900/30 border border-white/60 dark:border-gray-700/60 hover:border-blue-300/50 dark:hover:border-blue-600/50 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-xl group ring-1 ring-black/5 dark:ring-white/10'
                >
                  <div className='relative'>
                    <img
                      src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=3b82f6&color=fff&size=44`}
                      alt='Profile'
                      className='w-11 h-11 rounded-full object-cover ring-3 ring-blue-300/50 dark:ring-blue-600/50 group-hover:ring-blue-400 dark:group-hover:ring-blue-500 transition-all duration-500 shadow-lg'
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=3b82f6&color=fff&size=44`;
                      }}
                    />
                    <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse shadow-lg ring-2 ring-green-200 dark:ring-green-800'></div>
                  </div>
                  <div className='hidden md:flex items-center gap-3'>
                    <div className='text-left'>
                      <p className='text-sm font-black text-gray-900 dark:text-white truncate max-w-36 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                        {user?.displayName || 'User'}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400 capitalize font-bold tracking-wider'>
                        {role || 'member'}
                      </p>
                    </div>
                    <FiChevronDown className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-500 ${profileDropdownOpen ? 'rotate-180 text-blue-500 dark:text-blue-400' : ''}`} />
                  </div>
                </button>

                {/* Professional Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className='absolute right-0 mt-4 w-96 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 dark:border-gray-700/60 z-50 transform transition-all duration-500 opacity-100 scale-100 ring-1 ring-black/5 dark:ring-white/10'>
                    {/* Professional User Info Header */}
                    <div className='p-8 border-b border-white/50 dark:border-gray-700/50 bg-gradient-to-br from-blue-50/80 via-indigo-50/60 to-purple-50/80 dark:from-blue-900/30 dark:via-indigo-900/20 dark:to-purple-900/30 rounded-t-3xl relative overflow-hidden'>
                      <div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-2xl'></div>
                      <div className='relative flex items-center gap-5'>
                        <div className='relative'>
                          <img
                            src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=3b82f6&color=fff&size=80`}
                            alt='Profile'
                            className='w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-200/80 dark:ring-blue-700/80 shadow-2xl'
                          />
                          <div className='absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 border-4 border-white dark:border-gray-900 rounded-full shadow-lg'></div>
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-black text-gray-900 dark:text-white text-xl truncate mb-1'>
                            {user?.displayName || 'User Name'}
                          </p>
                          <p className='text-sm text-gray-600 dark:text-gray-400 truncate mb-4 font-medium'>
                            {user?.email || 'user@example.com'}
                          </p>
                          <div className='flex items-center gap-3'>
                            <span className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-black rounded-2xl shadow-lg ${
                              role === 'admin' ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' :
                              role === 'moderator' ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' :
                              'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                            }`}>
                              <FiShield className='w-4 h-4' />
                              {role || 'member'}
                            </span>
                            <span className='text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 font-bold px-3 py-2 bg-green-100/80 dark:bg-green-900/30 rounded-xl'>
                              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                              Online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Professional Quick Stats */}
                    <div className='p-6 bg-gradient-to-br from-gray-50/80 via-white/60 to-gray-50/80 dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/80 border-b border-white/50 dark:border-gray-700/50'>
                      <div className='grid grid-cols-3 gap-4'>
                        <div className='text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/40 rounded-2xl border border-blue-200/50 dark:border-blue-800/50'>
                          <p className='text-xs text-blue-600 dark:text-blue-400 font-black uppercase tracking-wider mb-1'>Applications</p>
                          <p className='text-2xl font-black text-blue-700 dark:text-blue-300'>5</p>
                        </div>
                        <div className='text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/40 rounded-2xl border border-green-200/50 dark:border-green-800/50'>
                          <p className='text-xs text-green-600 dark:text-green-400 font-black uppercase tracking-wider mb-1'>Approved</p>
                          <p className='text-2xl font-black text-green-700 dark:text-green-300'>3</p>
                        </div>
                        <div className='text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/40 rounded-2xl border border-yellow-200/50 dark:border-yellow-800/50'>
                          <p className='text-xs text-yellow-600 dark:text-yellow-400 font-black uppercase tracking-wider mb-1'>Pending</p>
                          <p className='text-2xl font-black text-yellow-700 dark:text-yellow-300'>2</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Professional Menu Items */}
                    <div className='p-4 space-y-2'>
                      <button 
                        onClick={() => setProfileDropdownOpen(false)}
                        className='w-full flex items-center gap-4 px-5 py-4 text-left text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 hover:text-blue-700 dark:hover:text-blue-300 rounded-2xl transition-all duration-300 group border border-transparent hover:border-blue-200/50 dark:hover:border-blue-800/50 hover:shadow-lg'
                      >
                        <div className='p-2 bg-blue-100 dark:bg-blue-900/50 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors'>
                          <FiUser className='w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform' />
                        </div>
                        <div>
                          <p className='font-bold'>View Profile</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Manage your account</p>
                        </div>
                      </button>
                      <button className='w-full flex items-center gap-4 px-5 py-4 text-left text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 hover:text-indigo-700 dark:hover:text-indigo-300 rounded-2xl transition-all duration-300 group border border-transparent hover:border-indigo-200/50 dark:hover:border-indigo-800/50 hover:shadow-lg'>
                        <div className='p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 transition-colors'>
                          <FiSettings className='w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:rotate-180 transition-transform duration-500' />
                        </div>
                        <div>
                          <p className='font-bold'>Settings</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Preferences & privacy</p>
                        </div>
                      </button>
                      <button className='w-full flex items-center gap-4 px-5 py-4 text-left text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:text-purple-700 dark:hover:text-purple-300 rounded-2xl transition-all duration-300 group border border-transparent hover:border-purple-200/50 dark:hover:border-purple-800/50 hover:shadow-lg'>
                        <div className='p-2 bg-purple-100 dark:bg-purple-900/50 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-800 transition-colors'>
                          <HiLightBulb className='w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:animate-bounce' />
                        </div>
                        <div>
                          <p className='font-bold'>Help & Support</p>
                          <p className='text-xs text-gray-500 dark:text-gray-400 font-medium'>Get assistance</p>
                        </div>
                      </button>
                      <hr className='my-4 border-gray-200/60 dark:border-gray-600/60' />
                      <button 
                        onClick={handleLogout}
                        className='w-full flex items-center gap-4 px-5 py-4 text-left text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 hover:text-red-700 dark:hover:text-red-300 rounded-2xl transition-all duration-300 group border border-transparent hover:border-red-200/50 dark:hover:border-red-800/50 hover:shadow-lg'
                      >
                        <div className='p-2 bg-red-100 dark:bg-red-900/50 rounded-xl group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors'>
                          <FiLogOut className='w-5 h-5 text-red-600 dark:text-red-400 group-hover:translate-x-2 transition-transform duration-300' />
                        </div>
                        <div>
                          <p className='font-bold'>Logout</p>
                          <p className='text-xs text-red-500 dark:text-red-400 font-medium'>Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Time & Date Widget */}
              <div className='hidden xl:flex items-center gap-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600 text-white px-6 py-4 rounded-3xl shadow-2xl backdrop-blur-sm relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent'></div>
                <div className='relative text-center'>
                  <p className='text-xs font-black opacity-90 uppercase tracking-wider'>
                    {currentTime.toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  <p className='text-lg font-black'>
                    {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className='w-px h-10 bg-white/40'></div>
                <div className='relative text-center'>
                  <p className='text-xs font-black opacity-90 uppercase tracking-wider'>Time</p>
                  <p className='text-lg font-black'>
                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className='absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl'></div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Mobile Search Bar */}
        <div className='md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl border-b border-white/60 dark:border-gray-700/60 px-4 py-4 shadow-xl'>
          <div className='relative group'>
            <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500'></div>
            <FiSearch className='absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400 transition-all duration-300 z-10' />
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={handleSearchSubmit}
              placeholder='Search scholarships, users, applications...'
              className='relative w-full pl-14 pr-6 py-4 bg-white/70 dark:bg-gray-800/70 border border-white/60 dark:border-gray-700/60 rounded-3xl focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 focus:border-blue-500/50 dark:focus:border-blue-400/50 transition-all duration-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-xl shadow-xl hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-2xl font-medium'
            />
            <div className='absolute inset-0 rounded-3xl ring-1 ring-black/5 dark:ring-white/5'></div>
          </div>
        </div>

        {/* Professional Content Container */}
        <div className='flex-1 p-4 lg:p-8 overflow-auto bg-gradient-to-br from-gray-50/40 via-white/60 to-blue-50/40 dark:from-gray-900/40 dark:via-gray-800/60 dark:to-indigo-950/40 relative'>
          {/* Professional Page Header */}
          <div className='mb-10'>
            <div className='bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/60 dark:border-gray-700/60 p-10 relative overflow-hidden ring-1 ring-black/5 dark:ring-white/10'>
              {/* Enhanced Background decoration */}
              <div className='absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-purple-500/5 rounded-full blur-3xl -translate-y-40 translate-x-40'></div>
              <div className='absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-cyan-500/5 rounded-full blur-3xl translate-y-32 -translate-x-32'></div>
              <div className='absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-rose-500/5 rounded-full blur-2xl animate-pulse delay-1000'></div>
              
              <div className='relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'>
                <div className='flex-1'>
                  {/* Professional Breadcrumb */}
                  <nav className='flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6'>
                    <div className='flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-100/90 to-gray-200/90 dark:from-gray-800/90 dark:to-gray-700/90 rounded-2xl backdrop-blur-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50'>
                      <FiActivity className='w-4 h-4 text-blue-500 dark:text-blue-400' />
                      <span className='font-black'>Dashboard</span>
                    </div>
                    {location.pathname !== '/dashboard' && (
                      <>
                        <FiChevronDown className='w-5 h-5 rotate-[-90deg] text-gray-300 dark:text-gray-600' />
                        <div className='flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-100/90 to-indigo-100/90 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-700 dark:text-blue-300 rounded-2xl backdrop-blur-xl shadow-lg border border-blue-200/50 dark:border-blue-800/50'>
                          <pageInfo.icon className='w-4 h-4' />
                          <span className='font-black'>{pageInfo.title}</span>
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
