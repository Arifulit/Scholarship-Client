/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { HiAcademicCap, HiUser, HiLogout, HiChevronDown } from "react-icons/hi";
import { FiSun, FiMoon, FiHome, FiBookOpen, FiGrid, FiSettings } from "react-icons/fi";
import { MdDashboard, MdNotifications } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import useRole from "../../../hooks/useRole";
import Container from "../Container";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [role] = useRole();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Handle scroll effect with debounce
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 20);
      }, 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsNotificationOpen(false);
  }, [location.pathname]);

  // Logout Handler
  const handleLogout = async () => {
    try {
      await logOut();
      setIsMenuOpen(false);
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get role badge color
  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin": return "bg-gradient-to-r from-red-500 to-pink-500";
      case "moderator": return "bg-gradient-to-r from-blue-500 to-indigo-500";
      case "customer": return "bg-gradient-to-r from-green-500 to-emerald-500";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  // Enhanced Navigation link component
  const NavLinkItem = ({ to, children, icon: Icon, mobile = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative group transition-all duration-300 ${
          mobile
            ? `flex items-center gap-3 px-4 py-3 rounded-xl ${
                isActive
                  ? "bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-medium shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`
            : `flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${
                isActive
                  ? "text-lime-400 bg-white/20 shadow-lg backdrop-blur-sm"
                  : "text-white/90 hover:text-white hover:bg-white/15 backdrop-blur-sm"
              }`
        }`
      }
      onClick={mobile ? () => setIsMenuOpen(false) : undefined}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
      {/* Active indicator */}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-lime-400 to-emerald-500 transition-all duration-300 ${mobile ? 'hidden' : ''}`} 
            style={{ transform: mobile ? 'none' : 'scaleX(0)', transformOrigin: 'left' }} />
    </NavLink>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-200 dark:border-gray-700"
          : "bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-600"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4 px-4 md:px-8">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt="Scholarship Platform"
                className="w-12 h-12 rounded-2xl ring-2 ring-white/40 group-hover:ring-white/60 transition-all duration-300 transform group-hover:scale-105 shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <HiAcademicCap className="w-3 h-3 text-white" />
              </div>
              {/* Pulse animation */}
              <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-xl font-bold transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-900 dark:text-white" 
                    : "text-white drop-shadow-md"
                }`}
              >
                ScholarHub
              </h1>
              <p
                className={`text-xs font-medium transition-all duration-300 ${
                  isScrolled 
                    ? "text-gray-600 dark:text-gray-400" 
                    : "text-lime-100 drop-shadow-sm"
                }`}
              >
                Your Future Awaits
              </p>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLinkItem to="/" icon={FiHome}>Home</NavLinkItem>
            <NavLinkItem to="/all-scholarship" icon={FiBookOpen}>Scholarships</NavLinkItem>
            
            {!user ? (
              <div className="flex items-center gap-3 ml-6">
                <NavLink
                  to="/login"
                  className={`px-6 py-2 font-medium rounded-xl transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      : "text-white/90 hover:bg-white/15 backdrop-blur-sm"
                  }`}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-6 py-2 bg-white text-lime-600 font-bold rounded-xl hover:bg-lime-50 hover:text-lime-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 backdrop-blur-sm"
                >
                  Get Started
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-6">
                <NavLinkItem to="/dashboard" icon={MdDashboard}>Dashboard</NavLinkItem>
                
                {/* Notification Bell */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className={`relative p-3 rounded-xl transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "text-white/90 hover:bg-white/15 backdrop-blur-sm"
                    }`}
                  >
                    <MdNotifications className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  {/* Notification Dropdown */}
                  {isNotificationOpen && (
                    <div className="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 opacity-100 scale-100">
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">You have 3 new notifications</p>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-50 dark:border-gray-700 last:border-0">
                            <div className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">New scholarship available</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">2 minutes ago</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
                        <button className="w-full text-center text-sm text-lime-600 dark:text-lime-400 hover:text-lime-700 dark:hover:text-lime-300 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Enhanced User Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                      isScrolled
                        ? "hover:bg-gray-100 dark:hover:bg-gray-700"
                        : "hover:bg-white/15 backdrop-blur-sm"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=6366f1&color=fff&size=40`}
                        alt={user?.displayName || 'User'}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white/40 shadow-lg"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=6366f1&color=fff&size=40`;
                        }}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className={`font-semibold text-sm ${isScrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
                        {user?.displayName || 'User'}
                      </p>
                      <p className={`text-xs ${isScrolled ? "text-gray-500 dark:text-gray-400" : "text-lime-100"} capitalize`}>
                        {role || 'Member'}
                      </p>
                    </div>
                    <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''} ${isScrolled ? "text-gray-500 dark:text-gray-400" : "text-white/70"}`} />
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 transform transition-all duration-300 opacity-100 scale-100">
                      {/* User Info Header */}
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <img
                            src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=6366f1&color=fff&size=48`}
                            alt={user?.displayName || 'User'}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 dark:text-white truncate">
                              {user?.displayName || 'User Name'}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {user?.email || 'user@example.com'}
                            </p>
                            <span className={`inline-block px-2 py-1 text-xs font-medium text-white rounded-full mt-1 ${getRoleBadgeColor()}`}>
                              {role || 'Member'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="p-2">
                        <NavLink
                          to="/dashboard/profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                        >
                          <HiUser className="w-5 h-5 text-gray-400" />
                          View Profile
                        </NavLink>
                        <NavLink
                          to="/dashboard"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                        >
                          <MdDashboard className="w-5 h-5 text-gray-400" />
                          Dashboard
                        </NavLink>
                        <button className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 w-full text-left">
                          <FiSettings className="w-5 h-5 text-gray-400" />
                          Settings
                        </button>
                        <hr className="my-2 border-gray-200 dark:border-gray-600" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 w-full text-left"
                        >
                          <HiLogout className="w-5 h-5" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  : "text-white/90 hover:bg-white/15 backdrop-blur-sm"
              }`}
              title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? (
                <FiMoon className="w-5 h-5" />
              ) : (
                <FiSun className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  : "text-white hover:bg-white/15 backdrop-blur-sm"
              }`}
            >
              {isMenuOpen ? (
                <AiOutlineClose className="w-6 h-6" />
              ) : (
                <AiOutlineMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-300">
            <div className="p-6 space-y-3">
              <NavLinkItem to="/" icon={FiHome} mobile>Home</NavLinkItem>
              <NavLinkItem to="/all-scholarship" icon={FiBookOpen} mobile>All Scholarships</NavLinkItem>
              
              {user ? (
                <>
                  <NavLinkItem to="/dashboard" icon={MdDashboard} mobile>Dashboard</NavLinkItem>
                  <NavLinkItem to="/dashboard/profile" icon={HiUser} mobile>Profile</NavLinkItem>
                  
                  {/* User Info in Mobile */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <img
                        src={user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || 'User')}&background=6366f1&color=fff&size=48`}
                        alt={user?.displayName || 'User'}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {user?.displayName || 'User Name'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user?.email || 'user@example.com'}
                        </p>
                        <span className={`inline-block px-2 py-1 text-xs font-medium text-white rounded-full mt-1 ${getRoleBadgeColor()}`}>
                          {role || 'Member'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                  >
                    <HiLogout className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLinkItem to="/login" mobile>Login</NavLinkItem>
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-bold rounded-xl text-center hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;