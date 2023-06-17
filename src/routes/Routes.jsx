import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Login from '../Pages/Registration/Login'
import Signup from '../Pages/Registration/Signup'
import Stays from '../Pages/Home/Stays'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children : [
      {
        path : '/stays',
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
  }
])
