export const APP_ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  jobs: '/jobs',
  jobDetail: '/jobs/:id',
  blog: '/blog',
  blogDetail: '/blog/:id',
  contact: '/contact',
} as const

export const STORAGE_KEYS = {
  authToken: 'cmb_auth_token',
  authUser: 'cmb_auth_user',
} as const

export function jobDetailPath(id: string): string {
  return `/jobs/${id}`
}

export function blogDetailPath(id: string): string {
  return `/blog/${id}`
}
