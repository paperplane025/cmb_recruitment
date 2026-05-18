import { env } from '@/configs/env.ts'
import { delay } from '@/shared/lib/delay.ts'
import { apiClient } from './client.ts'
import type {
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
} from '@/features/auth/types.ts'

const MOCK_DELAY_MS = 400

function mockSession(email: string, fullName: string): AuthSession {
  return {
    token: `mock-token-${Date.now()}`,
    user: {
      id: 'mock-user-1',
      email,
      fullName,
    },
  }
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthSession> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      if (!credentials.email || !credentials.password) {
        throw new Error('Email và mật khẩu là bắt buộc.')
      }
      const name = credentials.email.split('@')[0] ?? credentials.email
      return mockSession(credentials.email, name)
    }

    const { data } = await apiClient.post<AuthSession>(
      '/auth/login',
      credentials,
    )
    return data
  },

  register: async (
    credentials: RegisterCredentials,
  ): Promise<AuthSession> => {
    if (env.enableMockApi) {
      await delay(MOCK_DELAY_MS)
      if (
        !credentials.fullName ||
        !credentials.email ||
        !credentials.password
      ) {
        throw new Error('Vui lòng điền đầy đủ thông tin.')
      }
      return mockSession(credentials.email, credentials.fullName)
    }

    const { data } = await apiClient.post<AuthSession>(
      '/auth/register',
      credentials,
    )
    return data
  },
}
