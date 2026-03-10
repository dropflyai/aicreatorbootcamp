/**
 * AI Creator Bootcamp - Test Helpers
 *
 * Reusable helper functions for E2E tests.
 */

import { Page, expect } from '@playwright/test'
import { DEMO_CREDENTIALS, APP_ROUTES, TIMEOUTS } from './test-data'

/**
 * Wait for page to be fully loaded and stable
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('domcontentloaded')
}

/**
 * Login with demo credentials
 * Uses the demo API endpoint for authentication
 */
export async function loginWithDemoUser(page: Page) {
  // First, call the demo login API to ensure user exists
  const response = await page.request.post('/api/demo/login')
  const data = await response.json()

  if (!data.success && !data.credentials) {
    throw new Error('Demo login API failed')
  }

  // Navigate to login page
  await page.goto(APP_ROUTES.login)
  await waitForPageLoad(page)

  // Fill in credentials
  const creds = data.credentials || DEMO_CREDENTIALS
  await page.fill('input[type="email"]', creds.email)
  await page.fill('input[type="password"]', creds.password)

  // Submit form
  await page.click('button:has-text("Sign in")')

  // Wait for navigation to home
  await page.waitForURL(/\/home/, { timeout: TIMEOUTS.navigation })
}

/**
 * Login with credentials manually (for testing login flow)
 */
export async function loginWithCredentials(
  page: Page,
  email: string,
  password: string
) {
  await page.goto(APP_ROUTES.login)
  await waitForPageLoad(page)

  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)

  await page.click('button:has-text("Sign in")')
}

/**
 * Select a creator type on the landing page
 */
export async function selectCreatorType(
  page: Page,
  type: 'entertainer' | 'educator' | 'storyteller'
) {
  await page.goto(APP_ROUTES.landing)
  await waitForPageLoad(page)

  const typeLabels = {
    entertainer: 'Entertainer',
    educator: 'Educator',
    storyteller: 'Storyteller',
  }

  await page.click(`button:has-text("${typeLabels[type]}")`)

  // Wait for navigation to complete
  await page.waitForURL(/\/start/, { timeout: TIMEOUTS.navigation })
  await waitForPageLoad(page)
}

/**
 * Complete the hook exercise on start page
 */
export async function completeHookExercise(page: Page, hookText: string) {
  await page.fill('input[placeholder*="understand"]', hookText)
  await page.click('button:has-text("See the magic")')

  // Wait for feedback step
  await expect(page.locator('text=Not bad for your first hook')).toBeVisible({
    timeout: TIMEOUTS.animation,
  })
}

/**
 * Enter a class code on join page
 */
export async function enterClassCode(page: Page, code: string) {
  await page.goto(APP_ROUTES.join)
  await waitForPageLoad(page)

  await page.fill('input[placeholder*="ABC"]', code)
  await page.click('button:has-text("Continue")')
}

/**
 * Navigate to a specific app route and verify
 */
export async function navigateToRoute(page: Page, route: string) {
  await page.goto(route)
  await waitForPageLoad(page)
  await expect(page).toHaveURL(new RegExp(route.replace(/\//g, '\\/')))
}

/**
 * Check if user is authenticated by looking for auth-specific elements
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    // Check for sidebar (only visible when logged in)
    const sidebar = page.locator('aside')
    return await sidebar.isVisible()
  } catch {
    return false
  }
}

/**
 * Logout from the app
 */
export async function logout(page: Page) {
  // Navigate to profile page
  await page.goto(APP_ROUTES.profile)
  await waitForPageLoad(page)

  // Click sign out button
  const signOutButton = page.locator('button:has-text("Sign Out")')
  if (await signOutButton.isVisible()) {
    await signOutButton.click()
    await page.waitForURL(/\/(login)?$/, { timeout: TIMEOUTS.navigation })
  }
}

/**
 * Fill signup form on join page (after class code step)
 */
export async function fillSignupForm(
  page: Page,
  name: string,
  email: string,
  password: string
) {
  await page.fill('input[placeholder*="name" i]', name)
  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)
}

/**
 * Create a project on the create page
 */
export async function createProject(
  page: Page,
  projectType: string,
  title: string,
  description: string,
  contentUrl: string
) {
  await page.goto(APP_ROUTES.create)
  await waitForPageLoad(page)

  // Step 1: Select project type
  await page.click(`button:has-text("${projectType}")`)
  await page.click('button:has-text("Continue")')

  // Step 2: Enter details
  await page.fill('input[placeholder*="awesome"]', title)
  await page.fill('textarea', description)
  await page.click('button:has-text("Continue")')

  // Step 3: Add content URL
  await page.fill('input[placeholder*="https"]', contentUrl)
}

/**
 * Check for error message on page
 */
export async function expectError(page: Page, errorText?: string) {
  const errorSelector = '[class*="error"], [class*="red"], [role="alert"]'
  await expect(page.locator(errorSelector)).toBeVisible()

  if (errorText) {
    await expect(page.locator(`text=${errorText}`)).toBeVisible()
  }
}

/**
 * Take a screenshot with timestamp
 */
export async function takeScreenshot(page: Page, name: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  await page.screenshot({ path: `test-results/${name}-${timestamp}.png` })
}

/**
 * Wait for animation to complete
 */
export async function waitForAnimation(page: Page, selector: string) {
  await page.locator(selector).waitFor({ state: 'visible' })
  await page.waitForTimeout(TIMEOUTS.animation)
}

/**
 * Get the current user's XP from the page
 */
export async function getCurrentXP(page: Page): Promise<number | null> {
  const xpElement = page.locator('text=/\\d+\\s*XP/')
  if (await xpElement.isVisible()) {
    const text = await xpElement.textContent()
    const match = text?.match(/(\d+)\s*XP/)
    return match ? parseInt(match[1], 10) : null
  }
  return null
}

/**
 * Verify navigation menu contains expected links
 */
export async function verifyNavigation(page: Page) {
  const navItems = ['Home', 'Learn', 'Create', 'Gallery', 'Challenges']

  for (const item of navItems) {
    const link = page.locator(`a:has-text("${item}")`)
    await expect(link).toBeVisible()
  }
}
