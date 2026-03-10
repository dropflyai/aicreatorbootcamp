/**
 * Demo Mode Configuration
 *
 * When NEXT_PUBLIC_DEMO_MODE=true, users can access the app
 * without going through the full signup flow.
 *
 * Demo credentials:
 * - Email: demo@aicreatorbootcamp.test
 * - Password: demo123456
 */

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export const DEMO_CREDENTIALS = {
  email: 'demo@aicreatorbootcamp.test',
  password: 'demo123456',
  name: 'Demo User',
}

export const DEMO_CLASS = {
  code: 'DEMO-2024',
  name: 'Demo Class',
}

/**
 * Check if demo mode is enabled
 */
export function isDemoMode(): boolean {
  return DEMO_MODE
}

/**
 * Get demo user credentials for auto-fill or testing
 */
export function getDemoCredentials() {
  if (!DEMO_MODE) {
    return null
  }
  return DEMO_CREDENTIALS
}
