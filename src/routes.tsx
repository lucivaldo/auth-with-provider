import { createBrowserRouter } from 'react-router-dom'

import { Home } from './pages/Home'
import { Signin } from './pages/Signin'

export const router = createBrowserRouter([
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/',
    element: <Home />,
  },
])
