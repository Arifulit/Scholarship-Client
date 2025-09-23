import { Outlet } from 'react-router-dom'
import Navbar from '../components/Shared/Navbar/Navbar'
import Footer from '../components/Shared/Footer/Footer'
import useTheme from '../hooks/useTheme'
import { useEffect } from 'react'

const MainLayout = () => {
  const { theme } = useTheme()

  useEffect(() => {
    // Apply theme class to html element for consistent theming
    document.documentElement.className = theme
  }, [theme])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300'>
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className='pt-16 min-h-[calc(100vh-128px)] relative'>
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-30 dark:opacity-10'>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_theme(colors.lime.100),transparent_50%)] dark:bg-[radial-gradient(circle_at_20%_80%,_theme(colors.lime.900/20),transparent_50%)]'></div>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_theme(colors.emerald.100),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_20%,_theme(colors.emerald.900/20),transparent_50%)]'></div>
        </div>
        
        {/* Page Content */}
        <div className='relative z-10'>
          <Outlet />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
