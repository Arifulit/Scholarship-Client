
// import Container from '../Container';
// // eslint-disable-next-line no-unused-vars
// import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
// import { useState } from 'react';
// import { Link, NavLink } from 'react-router-dom';
// import useAuth from '../../../hooks/useAuth';
// import avatarImg from '../../../assets/images/placeholder.jpg';
// import logo from '../../../assets/images/logo-flat.png';

// const Navbar = () => {
//   const { user, logOut } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logOut();
//     setIsMenuOpen(false);
//   };

//   const activeLinkClass = "text-green-500 font-semibold";
  
//   return (
//     <div className="fixed w-full bg-white z-10 shadow-lg">
//       <div className="py-4 border-b-2">
//         <Container>
//           <div className="flex items-center justify-between">
//             {/* Logo and Website Name */}
//             <Link to="/" className="flex items-center gap-2">
//               <img src={logo} alt="logo" width="50" height="50" />
//             </Link>

//             {/* Desktop Navigation Links */}
//             <div className="hidden md:flex items-center gap-8">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) => 
//                   isActive ? activeLinkClass : "text-gray-700 hover:text-gray-900"
//                 }
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/all-scholarship"
//                 className={({ isActive }) => 
//                   isActive ? activeLinkClass : "text-gray-700 hover:text-gray-900"
//                 }
//               >
//                 All Scholarship
//               </NavLink>

//               {!user && (
//                 <Link
//                   to="/signup"
//                   className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
//                 >
//                   SignUp
//                 </Link>
//               )}
//             </div>

//             {/* Mobile Dropdown Menu */}
//             <div className="md:hidden relative">
//               <div
//                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 className="p-3 border-[1px] border-neutral-200 rounded-full cursor-pointer hover:shadow-md"
//               >
//                 <AiOutlineMenu size={24} />
//               </div>
//               {isMenuOpen && (
//                 <div className="absolute top-12 right-0 bg-white shadow-md rounded-md w-[60vw] p-4">
//                   <Link
//                     to="/"
//                     className="block px-4 py-3 hover:bg-gray-100"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Home
//                   </Link>
//                   <Link
//                     to="/all-scholarship"
//                     className="block px-4 py-3 hover:bg-gray-100"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     All Scholarship
//                   </Link>
//                   {user ? (
//                     <>
//                       <Link
//                         to="/dashboard"
//                         className="block px-4 py-3 hover:bg-gray-100"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Dashboard
//                       </Link>
//                       <NavLink
//                         to="/profile"
//                         className="block px-4 py-3 hover:bg-gray-100"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Update Profile
//                       </NavLink>
//                       <div
//                         onClick={handleLogout}
//                         className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                       >
//                         Logout
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <Link
//                         to="/login"
//                         className="block px-4 py-3 hover:bg-gray-100"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Login
//                       </Link>
//                       <Link
//                         to="/signup"
//                         className="block px-4 py-3 hover:bg-gray-100"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         Sign Up
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Profile Picture Dropdown */}
//             {user && (
//               <div className="relative hidden md:block">
//                 <div
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                   className="cursor-pointer flex items-center gap-2"
//                 >
//                   <img
//                     className="rounded-full"
//                     referrerPolicy="no-referrer"
//                     src={user.photoURL || avatarImg}
//                     alt="profile"
//                     width="40"
//                     height="40"
//                   />
//                 </div>
//                 {isMenuOpen && (
//                   <div className="absolute right-0 top-12 bg-white shadow-md rounded-md w-[14vw] p-2">
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-3 hover:bg-gray-100"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Update Profile
//                     </Link>
//                     <Link
//                       to="/dashboard"
//                       className="block px-4 py-3 hover:bg-gray-100"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Dashboard
//                     </Link>
//                     <div
//                       onClick={handleLogout}
//                       className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
//                     >
//                       Logout
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Navbar;




import Container from "../Container";
// eslint-disable-next-line no-unused-vars
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    setIsMenuOpen(false);
  };

  const activeLinkClass = "text-green-500 font-semibold";

  return (
    <div className="fixed top-0 w-full bg-blue-600 text-white shadow-lg z-10">
      <div className="w-full">
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
                    SignUp
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
                    to="dashboard/profile"
                    className={({ isActive }) =>
                      isActive ? activeLinkClass : "text-white hover:text-gray-300"
                    }
                  >
                    Update Profile
                  </NavLink>
                  <div
                    onClick={handleLogout}
                    className="cursor-pointer text-white hover:text-gray-300"
                  >
                    Logout
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden relative">
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 border border-white rounded-full cursor-pointer hover:shadow-md"
              >
                <AiOutlineMenu size={24} />
              </div>
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
                      <NavLink
                        to="dashboard/profile"
                        className="block px-4 py-3 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Update Profile
                      </NavLink>
                      <div
                        onClick={handleLogout}
                        className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        Logout
                      </div>
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

            {/* Profile Picture Dropdown */}
            {user && (
              <div className="relative hidden md:block">
                <div
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <img
                    className="rounded-full"
                    referrerPolicy="no-referrer"
                    src={user.photoURL || avatarImg}
                    alt="profile"
                    width="40"
                    height="40"
                  />
                </div>
                {isMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white text-black shadow-md rounded-md w-[14vw] p-2">
                    <Link
                      to="dashboard/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Update Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="block px-4 py-3 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
