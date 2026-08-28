/**
 * Application Environment Configuration
 * Centralized and safe access to Vite environment variables
 */

export interface AppConfig {
  env: string;
  appTitle: string;
  apiBaseUrl: string;
  enableMockFallback: boolean;
  isDemoMode: boolean;
  isProduction: boolean;
  isDevelopment: boolean;
}

const env = (import.meta as any).env || {};

export const config: AppConfig = {
  env: env.VITE_APP_ENV || env.MODE || 'development',
  appTitle: env.VITE_APP_TITLE || 'SkillMatrix AI - Employee Skill Mapping & Risk Analysis Platform',
  apiBaseUrl: env.VITE_API_BASE_URL || '',
  enableMockFallback: env.VITE_ENABLE_MOCK_FALLBACK !== 'false',
  isDemoMode: env.VITE_DEMO_MODE !== 'false',
  isProduction: env.PROD || env.VITE_APP_ENV === 'production',
  isDevelopment: env.DEV || env.VITE_APP_ENV === 'development',
};

export default config;
