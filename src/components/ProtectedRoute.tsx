import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Navbar from './Navbar'

type ProtectedRouteProps = {
  redirectPath?: string
}

function ProtectedRoute({ redirectPath = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  if (!isAuthenticated && !loading) {
    return <Navigate to={redirectPath} replace />
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default ProtectedRoute
