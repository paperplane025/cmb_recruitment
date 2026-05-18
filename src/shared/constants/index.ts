export const APP_ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  jobs: '/jobs',
  jobDetail: '/jobs/:id',
} as const

export const STORAGE_KEYS = {
  authToken: 'cmb_auth_token',
  authUser: 'cmb_auth_user',
} as const

export function jobDetailPath(id: string): string {
  return `/jobs/${id}`
}
