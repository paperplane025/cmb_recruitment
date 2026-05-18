import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router'
import { authService } from '@/services/authService.ts'
import { useAuthStore } from '../store/authStore.ts'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import type { LoginCredentials } from '../types.ts'

export function useLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (session) => {
      setSession(session)
      const redirectTo =
        (location.state as { from?: string } | null)?.from ?? APP_ROUTES.jobs
      navigate(redirectTo, { replace: true })
    },
  })
}
