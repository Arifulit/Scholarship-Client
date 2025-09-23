import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiUpload, FiMoon, FiSun, FiUserPlus } from 'react-icons/fi'
import { useState } from 'react'
import useTheme from '../../hooks/useTheme'

import { imageUpload, saveUser } from '../../api/utils'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]

    //1. send img data to imgbb

    const photoURL = await imageUpload(image)


    try {
      //2. User Registration
      const result = await createUser(email, password)

      //3. Save username & profile photo
      await updateUserProfile(
        name,
        photoURL
      )
      console.log(result)
       //save user in in db user is new 
     await saveUser({...result?.user,displayName:name,photoURL})

      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      //User Registration using google
     const data = await signInWithGoogle()
     
      //save user in in db user is new 
      await saveUser(data?.user)
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-lime-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300'>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
      >
        {isDarkMode ? (
          <FiSun className="text-yellow-500 text-xl" />
        ) : (
          <FiMoon className="text-gray-600 text-xl" />
        )}
      </button>

      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full mb-4 shadow-lg'>
            <FiUserPlus className='text-white text-2xl' />
          </div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Create Account</h1>
          <p className='text-gray-600 dark:text-gray-300'>Join our scholarship platform today</p>
        </div>

        {/* Form Container */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm'>
          <form
            onSubmit={handleSubmit}
            className='space-y-6'
          >
            {/* Profile Image Upload */}
            <div className='flex flex-col items-center mb-6'>
              <div className='relative'>
                <div className='w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 border-4 border-white dark:border-gray-600 shadow-lg overflow-hidden'>
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className='w-full h-full object-cover' />
                  ) : (
                    <div className='flex items-center justify-center h-full text-gray-400 dark:text-gray-500'>
                      <FiUpload className='text-2xl' />
                    </div>
                  )}
                </div>
                <label htmlFor='image' className='absolute bottom-0 right-0 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full p-2 cursor-pointer shadow-lg hover:from-lime-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-110'>
                  <FiUpload className='text-white text-sm' />
                </label>
              </div>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
              <p className='text-sm text-gray-500 dark:text-gray-400 mt-2'>Upload your profile picture</p>
            </div>

            {/* Name Field */}
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Full Name
              </label>
              <div className='relative'>
                <FiUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500' />
                <input
                  type='text'
                  name='name'
                  id='name'
                  required
                  placeholder='Enter your full name'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                />
              </div>
            </div>

            {/* Email Field */}
            <div className='space-y-2'>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Email Address
              </label>
              <div className='relative'>
                <FiMail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500' />
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  placeholder='Enter your email address'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                />
              </div>
            </div>

            {/* Password Field */}
            <div className='space-y-2'>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                Password
              </label>
              <div className='relative'>
                <FiLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  id='password'
                  required
                  placeholder='Create a strong password'
                  className='w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200'
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className='text-xs text-gray-500 dark:text-gray-400 space-y-1'>
              <p className='flex items-center gap-2'>
                <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                At least 8 characters long
              </p>
              <p className='flex items-center gap-2'>
                <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                Include uppercase and lowercase letters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-lime-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105'
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <TbFidgetSpinner className='animate-spin mr-2' />
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className='flex items-center my-6'>
            <div className='flex-1 h-px bg-gray-200 dark:bg-gray-600'></div>
            <span className='px-4 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800'>or</span>
            <div className='flex-1 h-px bg-gray-200 dark:bg-gray-600'></div>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignIn}
            className='w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium text-gray-700 dark:text-gray-300 transform hover:scale-105'
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Login Link */}
          <p className='text-center text-sm text-gray-600 dark:text-gray-400 mt-6'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-lime-600 dark:text-lime-400 hover:text-lime-500 dark:hover:text-lime-300 transition-colors duration-200'
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-gray-500 dark:text-gray-400 mt-8'>
          By creating an account, you agree to our{' '}
          <a href="#" className='text-lime-600 dark:text-lime-400 hover:underline'>Terms of Service</a> and{' '}
          <a href="#" className='text-lime-600 dark:text-lime-400 hover:underline'>Privacy Policy</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
