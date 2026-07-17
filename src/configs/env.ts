const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const env = {
  apiBaseUrl,
  appName: import.meta.env.VITE_APP_NAME ?? 'CMB Recruitment',
  isDev: import.meta.env.DEV,
  enableMockApi:
    import.meta.env.VITE_ENABLE_MOCK_API !== 'false',
  wordpressSiteUrl:
    import.meta.env.VITE_WORDPRESS_SITE_URL ?? apiBaseUrl.replace(/\/wp-json.*$/, ''),
} as const
