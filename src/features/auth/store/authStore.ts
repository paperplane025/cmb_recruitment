import { create } from 'zustand'
import { STORAGE_KEYS } from '@/shared/constants/index.ts'
import {
  getStorageItem,
  removeStorageItem,
  setStorageItem,
} from '@/shared/lib/localStorage.ts'
import type { AuthSession, User } from '../types.ts'

type AuthState = {
  token: string | null
  user: User | null
  setSession: (session: AuthSession) => void
  clearSession: () => void
}

function readStoredUser(): User | null {
  const raw = getStorageItem(STORAGE_KEYS.authUser)
  if (!raw) return null
  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: getStorageItem(STORAGE_KEYS.authToken),
  user: readStoredUser(),
  setSession: ({ token, user }) => {
    setStorageItem(STORAGE_KEYS.authToken, token)
    setStorageItem(STORAGE_KEYS.authUser, JSON.stringify(user))
    set({ token, user })
  },
  clearSession: () => {
    removeStorageItem(STORAGE_KEYS.authToken)
    removeStorageItem(STORAGE_KEYS.authUser)
    set({ token: null, user: null })
  },
}))
