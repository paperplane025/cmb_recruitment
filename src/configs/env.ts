export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '/api',
  appName: import.meta.env.VITE_APP_NAME ?? 'CMB Recruitment',
  isDev: import.meta.env.DEV,
  enableMockApi:
    import.meta.env.VITE_ENABLE_MOCK_API === 'true' ||
    (import.meta.env.DEV &&
      import.meta.env.VITE_ENABLE_MOCK_API !== 'false'),
} as const
