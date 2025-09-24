/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { HiAcademicCap, HiUser, HiLogout, HiChevronDown } from "react-icons/hi";
import { FiSun, FiMoon, FiBell, FiSearch } from "react-icons/fi";
import { MdDashboard, MdSchool } from "react-icons/md";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import Container from "../Container";
import logo from "../../../assets/images/logo-flat.png";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowUserDropdown(false);
      setShowSearch(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Logout Handler
  const handleLogout = () => {
    logOut();
    setIsMenuOpen(false);
    setShowUserDropdown(false);
  };

  // Toggle user dropdown
  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
  };

  // Toggle search
  const toggleSearch = (e) => {
    e.stopPropagation();
    setShowSearch(!showSearch);
  };

  // Navigation link component
  const NavLinkItem = ({ to, children, mobile = false }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative transition-all duration-300 ${
          mobile
            ? `block px-4 py-3 rounded-lg ${
                isActive
                  ? "bg-lime-500 text-white font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            : `px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "text-lime-200 bg-white/20 shadow-lg"
                  : "text-white/95 hover:text-white hover:bg-white/15 hover:shadow-lg"
              }`
        }`
      }
      onClick={mobile ? () => setIsMenuOpen(false) : undefined}
    >
      {children}
    </NavLink>
  );

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gradient-to-r from-lime-600/95 to-emerald-700/95 backdrop-blur-md shadow-2xl border-b border-emerald-500/20"
          : "bg-gradient-to-r from-lime-500 to-emerald-600"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src={logo}
                alt="Scholarship Platform"
                className="w-10 h-10 rounded-full ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lime-400 rounded-full flex items-center justify-center">
                <HiAcademicCap className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled ? "text-white drop-shadow-lg" : "text-white"
                }`}
              >
                ScholarHub
              </h1>
              <p
                className={`text-xs transition-colors duration-300 ${
                  isScrolled ? "text-lime-100 drop-shadow-md" : "text-lime-100"
                }`}
              >
                Your Future Awaits
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <NavLinkItem to="/">
              <div className="flex items-center gap-2">
                <span>Home</span>
              </div>
            </NavLinkItem>
            <NavLinkItem to="/all-scholarship">
              <div className="flex items-center gap-2">
                <MdSchool className="w-4 h-4" />
                <span>All Scholarships</span>
              </div>
            </NavLinkItem>
            
            {!user ? (
              <div className="flex items-center gap-3 ml-6">
                <NavLinkItem to="/login">Login</NavLinkItem>
                <NavLink
                  to="/signup"
                  className="px-6 py-2.5 bg-white text-lime-600 font-semibold rounded-lg hover:bg-lime-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-white/20"
                >
                  Get Started
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-6">
                {/* Search Button */}
                <div className="relative">
                  <button
                    onClick={toggleSearch}
                    className={`p-2.5 rounded-lg transition-all duration-300 ${
                      isScrolled
                        ? "text-white/90 hover:bg-white/20 shadow-lg"
                        : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    <FiSearch className="w-5 h-5" />
                  </button>
                  
                  {/* Search Dropdown */}
                  {showSearch && (
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                      <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="Search scholarships..."
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications */}
                <button
                  className={`relative p-2.5 rounded-lg transition-all duration-300 ${
                    isScrolled
                      ? "text-white/90 hover:bg-white/20 shadow-lg"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  <FiBell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs shadow-lg"></span>
                </button>

                <NavLinkItem to="/dashboard">
                  <div className="flex items-center gap-2">
                    <MdDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </div>
                </NavLinkItem>
                
                {/* Enhanced User Profile Dropdown */}
                <div className="relative">
                  <button 
                    onClick={toggleUserDropdown}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 group ${
                      isScrolled 
                        ? "bg-white/15 hover:bg-white/25 shadow-lg" 
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white/30 group-hover:ring-white/50 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-9 h-9 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center ring-2 ring-white/30">
                        <HiUser className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="text-left hidden xl:block">
                      <p className="text-white font-medium text-sm leading-none">
                        {user?.displayName?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-white/70 text-xs mt-0.5">
                        {user?.email?.split('@')[0]?.slice(0, 12)}...
                      </p>
                    </div>
                    <HiChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-200 ${showUserDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {/* Enhanced Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-full mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-lime-50 to-emerald-50 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          {user?.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt={user.displayName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center">
                              <HiUser className="w-6 h-6 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{user?.displayName || 'User'}</p>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-2">
                        <NavLink
                          to="/dashboard/profile"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <HiUser className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">Profile</p>
                            <p className="text-xs text-gray-500">Manage your account</p>
                          </div>
                        </NavLink>
                        <NavLink
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setShowUserDropdown(false)}
                        >
                          <MdDashboard className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="font-medium">Dashboard</p>
                            <p className="text-xs text-gray-500">View your overview</p>
                          </div>
                        </NavLink>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left"
                          >
                            <HiLogout className="w-5 h-5" />
                            <div>
                              <p className="font-medium">Sign Out</p>
                              <p className="text-xs text-red-500">Log out of your account</p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "text-white/90 hover:bg-white/20 shadow-lg"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              {theme === "light" ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                isScrolled
                  ? "text-white hover:bg-white/20 shadow-lg"
                  : "text-white hover:bg-white/10"
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
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white/96 backdrop-blur-md shadow-2xl border-t border-emerald-200 animate-in slide-in-from-top-2 duration-300">
            <div className="p-6 space-y-3">
              {/* Mobile Search */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search scholarships..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent bg-white"
                />
              </div>

              <NavLinkItem to="/" mobile>
                <div className="flex items-center gap-3">
                  <span>🏠</span>
                  <span>Home</span>
                </div>
              </NavLinkItem>
              
              <NavLinkItem to="/all-scholarship" mobile>
                <div className="flex items-center gap-3">
                  <MdSchool className="w-5 h-5" />
                  <span>All Scholarships</span>
                </div>
              </NavLinkItem>
              
              {user ? (
                <>
                  {/* User Info in Mobile */}
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-lime-50 to-emerald-50 rounded-lg border border-lime-200">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center">
                        <HiUser className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{user?.displayName || 'User'}</p>
                      <p className="text-xs text-gray-600">{user?.email}</p>
                    </div>
                  </div>

                  <NavLinkItem to="/dashboard" mobile>
                    <div className="flex items-center gap-3">
                      <MdDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </div>
                  </NavLinkItem>
                  
                  <NavLinkItem to="/dashboard/profile" mobile>
                    <div className="flex items-center gap-3">
                      <HiUser className="w-5 h-5" />
                      <span>Profile</span>
                    </div>
                  </NavLinkItem>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200"
                  >
                    <HiLogout className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLinkItem to="/login" mobile>
                    <div className="flex items-center gap-3">
                      <span>🔑</span>
                      <span>Login</span>
                    </div>
                  </NavLinkItem>
                  
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-gradient-to-r from-lime-500 to-emerald-600 text-white font-semibold rounded-lg text-center hover:from-lime-600 hover:to-emerald-700 transition-all duration-300 shadow-lg"
                  >
                    🚀 Get Started
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

