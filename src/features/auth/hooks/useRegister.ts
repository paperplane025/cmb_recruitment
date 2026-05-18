import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { authService } from '@/services/authService.ts'
import { useAuthStore } from '../store/authStore.ts'
import { APP_ROUTES } from '@/shared/constants/index.ts'
import type { RegisterCredentials } from '../types.ts'

export function useRegister() {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) =>
      authService.register(credentials),
    onSuccess: (session) => {
      setSession(session)
      navigate(APP_ROUTES.jobs, { replace: true })
    },
  })
}
