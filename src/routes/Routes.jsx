import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
// import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
// import AddPlant from '../pages/Dashboard/Moderator/ManageMadicine'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Moderator/MyInventory'
import ManageOrders from '../pages/Dashboard/Moderator/ManageOrders'
import MyApplication from '../pages/Dashboard/Customer/MyApplication'
import Managescholarship from '../pages/Dashboard/Moderator/ManageScholarship'
// import ScholarDetails from '../pages/ScholarDetails/ScholarDetails'
// import AllScholarship from '../pages/AllScholarship/AllScholarship'
import ScholarDetails from '../pages/ScholarDetails/ScholarDetails'
import AllScholarship from '../pages/AllScholarship/AllScholarship'
import AddScholarship from '../pages/Dashboard/Moderator/AddScholarship'
import Payment from '../pages/Dashboard/Payment/Payment'
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory'
import ApplicationModal from '../components/Modal/ApplicationInModal'
import ApplicationInModal from '../components/Modal/ApplicationInModal'
// import ApplicationModal from '../components/Modal/ApplicationModal'

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
        path:`/payment/:id`,
        element:<Payment></Payment>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/checkout/${params.id}`)
       },
      {
        path:`/payment-history`,
        element:  <PaymentHistory></PaymentHistory>
       

       },
      {
        path:`/application-modal`,
        element: <ApplicationInModal></ApplicationInModal>,

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
        path: 'add-scholarship',
        element: (
          <PrivateRoute>
            <AddScholarship></AddScholarship>
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
        path: 'my-application',
        element: (
          <PrivateRoute>
            <MyApplication />
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
