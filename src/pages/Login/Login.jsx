

import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { TbFidgetSpinner } from "react-icons/tb";
import { FiEye, FiEyeOff, FiMail, FiLock, FiLogIn, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { saveUser, getToken } from "../../api/utils";
import useTheme from "../../hooks/useTheme";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/dashboard";
  const [showPassword, setShowPassword] = useState(false);

  if (user) {
    console.log('✅ User already logged in, redirecting to:', from);
    return <Navigate to={from} replace />;
  }
  if (loading) return <LoadingSpinner />;

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      console.log('✅ Login successful:', result?.user?.email);
      
      // Get JWT token
      await getToken(result?.user?.email);
      
      // Wait for Firebase auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error('❌ Login error:', err);
      toast.error(err?.message || 'Login failed');
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      console.log('✅ Google login successful:', data?.user?.email);
      await saveUser(data?.user);
      
      // Get JWT token
      await getToken(data?.user?.email);
      
      // Wait for Firebase auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Login Successful");
      navigate(from, { replace: true });
    } catch (err) {
      console.error('❌ Google login error:', err);
      toast.error(err?.message || 'Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
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

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-lime-500 to-emerald-500 rounded-full mb-4 shadow-lg">
            <FiLogIn className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-300">Sign in to access your scholarship platform</p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 bg-gray-50 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button 
                type="button"
                className="text-sm text-lime-600 dark:text-lime-400 hover:text-lime-500 dark:hover:text-lime-300 transition-colors duration-200"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-lime-500 to-emerald-500 text-white py-3 px-4 rounded-lg font-medium hover:from-lime-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <TbFidgetSpinner className="animate-spin mr-2" />
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
            <span className="px-4 text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800">or</span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium text-gray-700 dark:text-gray-300 transform hover:scale-105"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Don&apos;t have an account yet?{' '}
            <Link
              to="/signup"
              className="font-medium text-lime-600 dark:text-lime-400 hover:text-lime-500 dark:hover:text-lime-300 transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-8">
          Protected by industry-standard security measures
        </p>
      </div>
    </div>
  );
};

export default Login;