// Client Configuration Loader
const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  appName: import.meta.env.VITE_APP_NAME || 'NxtBuild',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',

  // Feature Flags
  features: {
    analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    errorTracking: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
    pwa: import.meta.env.VITE_ENABLE_PWA === 'true',
  },

  // Firebase Configuration
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  },

  // Theme
  defaultTheme: import.meta.env.VITE_DEFAULT_THEME || 'dark',

  // Build Configuration
  sourceMap: import.meta.env.VITE_SOURCE_MAP === 'true',
  isDevelopment: import.meta.env.MODE === 'development',
  isProduction: import.meta.env.MODE === 'production',
};

export default config;
