// import { useState } from 'react'
// import { GrLogout } from 'react-icons/gr'
// import { FcSettings } from 'react-icons/fc'
// import { AiOutlineBars } from 'react-icons/ai'

// import MenuItem from './Menu/MenuItem'

// import useAuth from '../../../hooks/useAuth'

// import AdminMenu from './Menu/AdminMenu'
// import { Link } from 'react-router-dom'
// import ModeratorMenu from './Menu/ModeratorMenu'
// import CustomerMenu from './Menu/CustomerMenu'
// // import SellerMenu from './Menu/SellerMenu'
// import logo from '../../../assets/images/logo-flat.png'
// import useRole from '../../../hooks/useRole'
// const Sidebar = () => {
//   const { logOut } = useAuth()
//   const [isActive, setActive] = useState(false)

//   // eslint-disable-next-line no-unused-vars
//   const [role,isLoading] =useRole()
//   // Sidebar Responsive Handler
//   const handleToggle = () => {
//     setActive(!isActive)
//   }
//   return (
//     <>
//       {/* Small Screen Navbar */}
//       <div className='  flex justify-between md:hidden'>
//         <div>
//           <div className='block cursor-pointer p-4 font-bold'>
//             <Link to='/'>
//               <img
//                 // className='hidden md:block'
//                 src='https://i.ibb.co.com/cKz1BWhs/images.png'
//                 alt='logo'
//                 width='100'
//                 height='100'
//               />
//             </Link>
//           </div>
//         </div>

//         <button
//           onClick={handleToggle}
//           className='mobile-menu-button p-4 focus:outline-none '
//         >
//           <AiOutlineBars className='h-5 w-5' />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`z-10 md:fixed flex flex-col justify-between bg-gray-200 overflow-x-hidden  w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
//           isActive && '-translate-x-full'
//         }  md:translate-x-0  transition duration-200 ease-in-out`}
//       >
//         <div>
//           <div>
//             <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto'>
//               <Link to='/'>
//                 <img
//                   // className='hidden md:block'
//                   src={logo}
//                   alt='logo'
//                   width='100'
//                   height='100'
//                 />
//               </Link>
//             </div>
//           </div>

//           {/* Nav Items */}
//           <div className='flex flex-col justify-between flex-1 mt-6'>
//             <nav>
//               {/*  Menu Items */}
              
//               {(role==='customer') && <CustomerMenu />}
//               {(role==='moderator') && <ModeratorMenu />}
//               {(role==='admin') &&  <AdminMenu />}
             

             
            
//             </nav>
//           </div>
//         </div>

//         <div>
//           <hr />

//           <MenuItem
//             icon={FcSettings}
//             label=' My Profile'
//             address='/dashboard/profile'
//           />
//           <button
//             onClick={logOut}
//             className='flex w-full items-center px-4 py-2 mt-5   transition-colors duration-300 transform'
//           >
//             <GrLogout className='w-5 h-5' />

//             <span className='mx-4 font-medium'>Logout</span>
//           </button>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Sidebar


import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars, AiOutlineClose } from "react-icons/ai";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";

import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AdminMenu from "./Menu/AdminMenu";
import ModeratorMenu from "./Menu/ModeratorMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import logo from "../../../assets/images/logo-flat.png";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [role, isLoading] = useRole();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle sidebar menu
  const handleToggleSidebar = () => setIsActive(!isActive);

  // Toggle theme mode
  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      {/* Mobile Header with Theme & Sidebar Toggle */}
      <div className="flex justify-between md:hidden bg-blue-200  p-4">
        <Link to="/">
          <img src={logo} alt="logo" width="100" height="100" />
        </Link>
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button onClick={handleToggleTheme} className="p-2 rounded-full focus:outline-none">
            {theme === "dark" ? (
              <MdOutlineLightMode className="h-6 w-6 text-yellow-400" />
            ) : (
              <MdDarkMode className="h-6 w-6 text-gray-200" />
            )}
          </button>
          {/* Sidebar Toggle */}
          <button onClick={handleToggleSidebar} className="p-3">
            {isActive ? <AiOutlineClose className="h-5 w-5" /> : <AiOutlineBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between bg-gray-200  dark:text-white overflow-x-hidden w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 dark:bg-gray-700 mx-auto">
          <Link to="/">
            <img src={logo} alt="logo" width="100" height="100" />
          </Link>
        </div>

        {/* Role-Based Navigation */}
        <nav className="flex flex-col mt-6">
          {!isLoading && (
            <>
              {role === "customer" && <CustomerMenu />}
              {role === "moderator" && <ModeratorMenu />}
              {role === "admin" && <AdminMenu />}
            </>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div>
          <hr className="border-gray-400 dark:border-gray-600" />
          <Link
            to="/dashboard/profile"
            className="flex items-center px-4 py-2 mt-5 transition duration-300 transform hover:bg-gray-300  rounded-md"
          >
            <FcSettings className="w-5 h-5" />
            <span className="mx-4 font-medium">My Profile</span>
          </Link>
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 transition duration-300 transform hover:bg-red-500 dark:hover:bg-red-700 rounded-md"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
