import Button from '../components/Shared/Button/Button'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FiAlertCircle, FiHome, FiArrowLeft } from 'react-icons/fi'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Page Not Found | ScholarHub</title>
      </Helmet>
      <section className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center px-6 py-12 transition-all duration-300'>
        <div className='container mx-auto'>
          <div className='flex flex-col items-center max-w-2xl mx-auto text-center'>
            {/* Animated 404 Icon */}
            <div className='relative mb-8'>
              <div className='absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full blur-2xl opacity-20 animate-pulse'></div>
              <div className='relative p-6 bg-gradient-to-br from-lime-100 to-emerald-100 dark:from-lime-900/30 dark:to-emerald-900/30 rounded-full backdrop-blur-sm border border-lime-200 dark:border-lime-800 shadow-2xl'>
                <FiAlertCircle className='w-20 h-20 text-lime-600 dark:text-lime-400' />
              </div>
            </div>

            {/* 404 Text */}
            <h1 className='text-8xl font-black bg-gradient-to-r from-lime-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 animate-pulse'>
              404
            </h1>

            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Oops! Page Not Found
            </h2>

            <p className='text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md'>
              The page you&apos;re looking for seems to have gone on a scholarship adventure. 
              Let&apos;s get you back on track!
            </p>

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'>
              <button
                onClick={() => navigate(-1)}
                className='group flex items-center justify-center w-full sm:w-auto px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:border-lime-500 dark:hover:border-lime-500 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5'
              >
                <FiArrowLeft className='w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300' />
                <span className='font-semibold'>Go Back</span>
              </button>

              <button
                onClick={() => navigate('/')}
                className='group flex items-center justify-center w-full sm:w-auto px-6 py-3 text-white bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-0.5'
              >
                <FiHome className='w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300' />
                <span className='font-semibold'>Back to Home</span>
              </button>
            </div>

            {/* Helpful Links */}
            <div className='mt-12 p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 w-full max-w-md'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Quick Links
              </h3>
              <div className='grid grid-cols-2 gap-3'>
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Scholarships', path: '/all-scholarship' },
                  { name: 'Dashboard', path: '/dashboard' },
                  { name: 'Login', path: '/login' }
                ].map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigate(link.path)}
                    className='px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-lime-100 dark:hover:bg-lime-900/30 hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-200'
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ErrorPage
