import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/features/auth/store/authStore.ts'
import { APP_ROUTES } from '@/shared/constants/index.ts'

export function GuestRoute() {
  const isAuthenticated = useAuthStore((state) => Boolean(state.token))

  if (isAuthenticated) {
    return <Navigate to={APP_ROUTES.jobs} replace />
  }

  return <Outlet />
}
