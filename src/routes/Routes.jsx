import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
// import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
// import AddPlant from '../pages/Dashboard/Seller/ManageMadicine'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyInventory'
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import Managescholarship from '../pages/Dashboard/Seller/Managescholarship'
// import ScholarDetails from '../pages/ScholarDetails/ScholarDetails'
// import AllScholarship from '../pages/AllScholarship/AllScholarship'
import ScholarDetails from '../pages/ScholarDetails/ScholarDetails'
import AllScholarship from '../pages/AllScholarship/AllScholarship'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      // {
      //   path: '/plant/:id',
      //   element: <PlantDetails />,
      // },
      {
        path:'/scholar/:id' ,
        element:<ScholarDetails></ScholarDetails>
      },
      {
        path:'/all-scholarship' ,
        element:<AllScholarship/>
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-scholarship',
        element: (
          <PrivateRoute>
            <Managescholarship/>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <MyInventory />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <ManageOrders />,
      },
    ],
  },
])
