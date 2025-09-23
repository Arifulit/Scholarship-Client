

import { useState } from "react";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import PropTypes from "prop-types";

import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useTheme from "../../../hooks/useTheme";
import AdminMenu from "./Menu/AdminMenu";
import ModeratorMenu from "./Menu/ModeratorMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import logo from "../../../assets/images/logo-flat.png";

const Sidebar = ({ isOpen, onClose }) => {
  const { logOut, user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [role, isLoading] = useRole();
  const { isDarkMode, toggleTheme } = useTheme();

  // Toggle sidebar menu - use external state if provided
  const handleToggleSidebar = () => {
    if (onClose) {
      onClose();
    } else {
      setIsActive(!isActive);
    }
  };

  // Use external isOpen state if provided, otherwise use internal state
  const sidebarIsOpen = isOpen !== undefined ? isOpen : isActive;

  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin": return "bg-red-500";
      case "moderator": return "bg-blue-500";
      default: return "bg-green-500";
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="flex justify-between items-center md:hidden bg-white dark:bg-gray-800 shadow-lg p-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="ScholarHub" className="w-10 h-10 rounded-full" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">ScholarHub</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isDarkMode ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>
          
          {/* Sidebar Toggle */}
          <button 
            onClick={handleToggleSidebar} 
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {isActive ? <AiOutlineClose className="w-5 h-5" /> : <AiOutlineBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {sidebarIsOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={handleToggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-2xl z-30 transform transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 flex flex-col border-r border-gray-200 dark:border-gray-700`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="ScholarHub" 
                className="w-12 h-12 rounded-full ring-2 ring-lime-200 dark:ring-lime-700 group-hover:ring-lime-300 dark:group-hover:ring-lime-600 transition-all duration-300" 
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-lime-500 rounded-full flex items-center justify-center">
                <HiAcademicCap className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors duration-300">
                ScholarHub
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard Portal</p>
            </div>
          </Link>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="relative">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-600"
                />
              ) : (
                <div className="w-12 h-12 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <FiUser className="w-6 h-6 text-white" />
                </div>
              )}
              
              {/* Role Badge */}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getRoleBadgeColor()} rounded-full border-2 border-white dark:border-gray-800`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {user?.displayName || 'User'}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role || 'Loading...'}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {!isLoading && (
              <>
                {role === "customer" && <CustomerMenu />}
                {role === "moderator" && <ModeratorMenu />}
                {role === "admin" && <AdminMenu />}
              </>
            )}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            {/* Profile Link */}
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 group"
              onClick={() => setIsActive(false)}
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-lime-100 dark:group-hover:bg-lime-900/30 transition-colors duration-200">
                <FcSettings className="w-5 h-5" />
              </div>
              <span className="font-medium">Profile Settings</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 w-full group"
            >
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg group-hover:bg-lime-100 dark:group-hover:bg-lime-900/30 transition-colors duration-200">
                {isDarkMode ? (
                  <FiSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
              </div>
              <span className="font-medium">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logOut}
              className="flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 w-full group"
            >
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors duration-200">
                <GrLogout className="w-5 h-5" />
              </div>
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Sidebar;
