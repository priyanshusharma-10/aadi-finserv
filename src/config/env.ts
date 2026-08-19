/**
 * Environment configuration
 * All public env vars must be prefixed with VITE_
 * Never store secrets here — anything prefixed VITE_ is visible in the browser bundle
 */

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://api.aadifinserve.in/v1',
  appName: import.meta.env.VITE_APP_NAME ?? 'Aadi Finserv',
  environment: import.meta.env.VITE_ENVIRONMENT ?? 'development',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
