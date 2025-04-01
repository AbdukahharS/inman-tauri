import { Navigate, Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useAuthStore } from '@/store/authStore'

type ProtectedRouteProps = {
  redirectPath?: string
}

function ProtectedRoute({ redirectPath = '/login' }: ProtectedRouteProps) {
  const { loading, isAuthenticated } = useAuthStore()
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
