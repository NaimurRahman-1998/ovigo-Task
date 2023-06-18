import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Login from '../Pages/Registration/Login'
import Signup from '../Pages/Registration/Signup'
import Stays from '../Pages/Home/Stays'
import Dashboard from '../layouts/Dashboard'
import AddRoom from '../Pages/Dashboard/AddRoom'
import Rooms from '../Pages/Rooms/Rooms'
import ReserveRoom from '../Pages/Rooms/ReserveRoom'
import PrivateRoute from './PrivateRoute'
import CancelBookings from '../Pages/Dashboard/CancelBookings'
import EditRoom from '../Pages/Dashboard/EditRoom'
import ManageUsers from '../Pages/Dashboard/ManageUsers'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children : [
      {
        path : '/',
        element : <Stays></Stays>
      }
    ]
  },
  {
    path : '/login',
    element : <Login></Login>
  },
  {
    path :'/signup',
    element: <Signup></Signup>
  },
  {
    path : '/rooms/:region',
    element : <Rooms></Rooms>
  },
  {
    path: '/reserve/:id',
    element : <PrivateRoute><ReserveRoom></ReserveRoom></PrivateRoute>
  },
  {
    path : '/dashboard',
    element : <Dashboard></Dashboard>,
    children : [
      {
        path : '/dashboard/addroom',
        element : <AddRoom></AddRoom>
      },
      {
        path : '/dashboard/bookings',
        element : <CancelBookings></CancelBookings>
      },
      {
        path : '/dashboard/editRoom',
        element :<EditRoom></EditRoom>
      },
      {
        path: '/dashboard/users',
        element : <ManageUsers></ManageUsers>
      }
    ]
  }
])
