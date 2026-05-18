import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuthStore } from '@/features/auth/store/authStore.ts'
import { APP_ROUTES } from '@/shared/constants/index.ts'

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => Boolean(state.token))
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={APP_ROUTES.login}
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <Outlet />
}
