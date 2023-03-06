import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthProvider'

import { Home } from './pages/Home'
import { Signin } from './pages/Signin'

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />
  }

  return children
}

export const router = createBrowserRouter([
  {
    path: '/signin',
    element: <Signin />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
])
