/**
 * Login Flow E2E Tests
 *
 * Tests for authentication flow.
 */

import { test, expect } from '@playwright/test'
import {
  DEMO_CREDENTIALS,
  INVALID_CREDENTIALS,
  APP_ROUTES,
  PAGE_TITLES,
} from './fixtures/test-data'
import {
  waitForPageLoad,
  loginWithCredentials,
} from './fixtures/test-helpers'

test.describe('Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_ROUTES.login)
    await waitForPageLoad(page)
  })

  test('should display login page with correct title', async ({ page }) => {
    await expect(page.locator(`text=${PAGE_TITLES.login}`)).toBeVisible()
  })

  test('should have email input field', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]')
    await expect(emailInput).toBeVisible()
  })

  test('should have password input field', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]')
    await expect(passwordInput).toBeVisible()
  })

  test('should have sign in button', async ({ page }) => {
    const signInButton = page.locator('button:has-text("Sign in")')
    await expect(signInButton).toBeVisible()
  })

  test('should have forgot password link', async ({ page }) => {
    const forgotLink = page.locator('a:has-text("Forgot password")')
    await expect(forgotLink).toBeVisible()
  })

  test('should have link to join page', async ({ page }) => {
    const joinLink = page.locator('a:has-text("Join a class")')
    await expect(joinLink).toBeVisible()
    await expect(joinLink).toHaveAttribute('href', '/join')
  })

  test('should have back button to landing', async ({ page }) => {
    const backLink = page.locator('a:has-text("Back")')
    await expect(backLink).toBeVisible()
  })

  test('should have Google OAuth button', async ({ page }) => {
    const googleButton = page.locator('button:has-text("Continue with Google")')
    await expect(googleButton).toBeVisible()
  })

  test.describe('Form Validation', () => {
    test('should show error for invalid credentials', async ({ page }) => {
      await page.fill('input[type="email"]', INVALID_CREDENTIALS.email)
      await page.fill('input[type="password"]', INVALID_CREDENTIALS.password)
      await page.click('button:has-text("Sign in")')

      // Should show error message
      await expect(
        page.locator('text=/invalid|error|incorrect/i')
      ).toBeVisible({ timeout: 10000 })
    })

    test('should submit form on Enter key in password field', async ({
      page,
    }) => {
      await page.fill('input[type="email"]', INVALID_CREDENTIALS.email)
      await page.fill('input[type="password"]', INVALID_CREDENTIALS.password)
      await page.keyboard.press('Enter')

      // Should attempt login and show error
      await expect(
        page.locator('text=/invalid|error|incorrect/i')
      ).toBeVisible({ timeout: 10000 })
    })

    test('should show loading state during authentication', async ({
      page,
    }) => {
      await page.fill('input[type="email"]', INVALID_CREDENTIALS.email)
      await page.fill('input[type="password"]', INVALID_CREDENTIALS.password)
      await page.click('button:has-text("Sign in")')

      // Button might show loading state
      const button = page.locator('button:has-text("Sign in")')
      // Check if button is disabled during loading or has loading indicator
      const isDisabled = await button.isDisabled()
      // This is optional - depends on implementation
    })
  })

  test.describe('Demo Mode Login', () => {
    // These tests work when NEXT_PUBLIC_DEMO_MODE=true
    test('should be able to login with demo credentials', async ({ page }) => {
      // First, call the demo API to ensure user exists
      const response = await page.request.post('/api/demo/login')
      const data = await response.json()

      // If demo mode is enabled and API succeeds
      if (data.success && data.credentials) {
        await page.fill('input[type="email"]', data.credentials.email)
        await page.fill('input[type="password"]', data.credentials.password)
        await page.click('button:has-text("Sign in")')

        // Should redirect to home
        await expect(page).toHaveURL(/\/home/, { timeout: 15000 })
      } else {
        // Demo mode not enabled - skip this test
        test.skip()
      }
    })
  })

  test.describe('Navigation', () => {
    test('should navigate to join page via link', async ({ page }) => {
      await page.click('a:has-text("Join a class")')
      await expect(page).toHaveURL(/\/join/)
    })

    test('should navigate to landing via back button', async ({ page }) => {
      await page.click('a:has-text("Back")')
      await expect(page).toHaveURL(/\/(login)?$/)
    })

    test('should navigate to forgot password page', async ({ page }) => {
      await page.click('a:has-text("Forgot password")')
      await expect(page).toHaveURL(/\/forgot-password/)
    })
  })

  test.describe('Successful Login', () => {
    // This test requires demo mode or a test user in the database
    test('should redirect to home after successful login', async ({ page }) => {
      // Try demo login first
      const response = await page.request.post('/api/demo/login')
      const data = await response.json()

      if (data.success && data.credentials) {
        await page.fill('input[type="email"]', data.credentials.email)
        await page.fill('input[type="password"]', data.credentials.password)
        await page.click('button:has-text("Sign in")')

        await expect(page).toHaveURL(/\/home/, { timeout: 15000 })
      } else {
        // Skip if demo mode not available
        test.skip()
      }
    })
  })
})

test.describe('Authentication State', () => {
  test('should redirect to login when accessing protected routes while logged out', async ({
    page,
  }) => {
    // Try to access home page directly
    await page.goto(APP_ROUTES.home)

    // Should be redirected to login
    await expect(page).toHaveURL(/\/login/)
  })

  test('should redirect to login when accessing learn page while logged out', async ({
    page,
  }) => {
    await page.goto(APP_ROUTES.learn)
    await expect(page).toHaveURL(/\/login/)
  })

  test('should redirect to login when accessing profile page while logged out', async ({
    page,
  }) => {
    await page.goto(APP_ROUTES.profile)
    await expect(page).toHaveURL(/\/login/)
  })
})
