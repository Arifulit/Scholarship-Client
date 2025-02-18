import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Theme Toggle Handler
  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Apply Theme Change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Logout Handler
  const handleLogout = () => {
    logOut();
    setIsMenuOpen(false);
  };

  // Active link class
  const activeLinkClass = "text-green-500 font-semibold";

  return (
    <nav className="fixed top-0 w-full bg-blue-600 text-white shadow-lg z-10">
      <Container>
        <div className="flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" width="50" height="50" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? activeLinkClass : "text-white hover:text-gray-300"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-scholarship"
              className={({ isActive }) =>
                isActive ? activeLinkClass : "text-white hover:text-gray-300"
              }
            >
              All Scholarship
            </NavLink>

            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : "text-white hover:text-gray-300"
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
                >
                  Sign Up
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : "text-white hover:text-gray-300"
                  }
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive ? activeLinkClass : "text-white hover:text-gray-300"
                  }
                >
                  Update Profile
                </NavLink>

                {/* Theme Toggle */}
                <button
                  onClick={handleToggleTheme}
                  className="p-2 rounded-full focus:outline-none"
                >
                  {theme === "dark" ? (
                    <svg
                      className="h-6 w-6 fill-current text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64 13a1 1 0 00-1.05-.14 8.05 8.05 0 01-3.37.73A8.15 8.15 0 019.08 5.49a8.59 8.59 0 01.25-2A1 1 0 008 2.36 10.14 10.14 0 1022 14.05a1 1 0 00-.36-1.05z" />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 fill-current text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 5a1 1 0 001-1V3a1 1 0 00-2 0V4a1 1 0 001 1zM5.64 7.05a1 1 0 001.41 0l.71-.71a1 1 0 10-1.41-1.41l-.71.71A1 1 0 005.64 7.05zM4 13H3a1 1 0 100 2h1a1 1 0 100-2zM12 19a1 1 0 00-1 1v1a1 1 0 002 0V20A1 1 0 0012 19z" />
                    </svg>
                  )}
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 border border-white rounded-full cursor-pointer hover:shadow-md"
            >
              <AiOutlineMenu size={24} />
            </button>

            {isMenuOpen && (
              <div className="absolute top-12 right-0 bg-white text-black shadow-md rounded-md w-[60vw] p-4">
                <Link
                  to="/"
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/all-scholarship"
                  className="block px-4 py-3 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Scholarship
                </Link>

                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Update Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
