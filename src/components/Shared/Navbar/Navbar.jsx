



import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import logo from "../../../assets/images/logo-flat.png";
import { Sun, Moon } from "lucide-react";
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
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : "text-white hover:text-gray-300"}>Home</NavLink>
            <NavLink to="/all-scholarship" className={({ isActive }) => isActive ? activeLinkClass : "text-white hover:text-gray-300"}>All Scholarship</NavLink>
            
            {!user ? (
              <>
                <NavLink to="/login" className={({ isActive }) => isActive ? activeLinkClass : "text-white hover:text-gray-300"}>Login</NavLink>
                <NavLink to="/signup" className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all">Sign Up</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeLinkClass : "text-white hover:text-gray-300"}>Dashboard</NavLink>
                <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? activeLinkClass : "text-white hover:text-gray-300"}>Profile</NavLink>
                
                {/* Theme Toggle */}
                {/* <button onClick={handleToggleTheme} className="p-2 rounded-full focus:outline-none">
                  {theme === "dark" ? (
                    <span className="text-yellow-400 text-xl">🌞</span>
                  ) : (
                    <span className="text-gray-300 text-xl">🌙</span>
                  )}
                </button> */}

<button onClick={handleToggleTheme} className="p-2 rounded-full focus:outline-none">
  {theme === "light" ? (
    <Sun className="text-yellow-500 w-6 h-6" />
  ) : (
    <Moon className="text-gray-300 w-6 h-6" />
  )}
</button>

                {/* Logout Button */}
                <button onClick={handleLogout} className="text-white hover:text-gray-300">Logout</button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden relative">
            <div className="flex items-center gap-3">
              {/* Mobile Theme Toggle */}
              {/* <button onClick={handleToggleTheme} className="text-xl focus:outline-none">
                {theme === "dark" ? "🌞" : "🌙"}
              </button> */}

<button onClick={handleToggleTheme} className="p-2 rounded-full focus:outline-none">
  {theme === "light" ? (
    <Sun className="text-yellow-500 w-6 h-6" />
  ) : (
    <Moon className="text-gray-300 w-6 h-6" />
  )}
</button>
              
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 border border-white rounded-full cursor-pointer hover:shadow-md">
                <AiOutlineMenu size={24} />
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute top-12 right-0 bg-white text-black shadow-md rounded-md w-[60vw] p-4">
                <Link to="/" className="block px-4 py-3 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/all-scholarship" className="block px-4 py-3 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>All Scholarship</Link>
                
                {user ? (
                  <>
                    <Link to="/dashboard" className="block px-4 py-3 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    <Link to="/dashboard/profile" className="block px-4 py-3 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-gray-100">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="block px-4 py-3 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    <Link to="/signup" className="block px-4 py-3 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
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

