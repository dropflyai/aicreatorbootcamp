/**
 * Demo Mode E2E Tests
 *
 * Tests for demo user functionality.
 * These tests verify that the demo mode allows users to access the app
 * without going through the full signup flow.
 */

import { test, expect } from '@playwright/test'
import { DEMO_CREDENTIALS, APP_ROUTES } from './fixtures/test-data'
import { waitForPageLoad, loginWithDemoUser } from './fixtures/test-helpers'

test.describe('Demo Mode', () => {
  test.describe('Demo API', () => {
    test('should have demo login API endpoint', async ({ request }) => {
      const response = await request.post('/api/demo/login')
      expect(response.status()).toBeLessThan(500) // Should not error
    })

    test('should return credentials when demo mode is enabled', async ({
      request,
    }) => {
      const response = await request.post('/api/demo/login')
      const data = await response.json()

      // If demo mode is enabled
      if (data.success) {
        expect(data.credentials).toBeDefined()
        expect(data.credentials.email).toBe(DEMO_CREDENTIALS.email)
        expect(data.credentials.password).toBe(DEMO_CREDENTIALS.password)
      } else if (data.error === 'Demo mode is not enabled') {
        // Demo mode is disabled - this is expected in production
        test.skip()
      }
    })
  })

  test.describe('Demo User Access', () => {
    test('should allow demo user to login successfully', async ({ page }) => {
      // First, call the demo API
      const response = await page.request.post('/api/demo/login')
      const data = await response.json()

      if (!data.success) {
        test.skip()
        return
      }

      // Navigate to login
      await page.goto(APP_ROUTES.login)
      await waitForPageLoad(page)

      // Fill in demo credentials
      await page.fill('input[type="email"]', data.credentials.email)
      await page.fill('input[type="password"]', data.credentials.password)

      // Submit
      await page.click('button:has-text("Sign in")')

      // Should redirect to home
      await expect(page).toHaveURL(/\/home/, { timeout: 15000 })
    })

    test('should show demo user profile after login', async ({ page }) => {
      const response = await page.request.post('/api/demo/login')
      const data = await response.json()

      if (!data.success) {
        test.skip()
        return
      }

      // Login
      await page.goto(APP_ROUTES.login)
      await page.fill('input[type="email"]', data.credentials.email)
      await page.fill('input[type="password"]', data.credentials.password)
      await page.click('button:has-text("Sign in")')

      await expect(page).toHaveURL(/\/home/, { timeout: 15000 })

      // Navigate to profile
      await page.goto(APP_ROUTES.profile)
      await waitForPageLoad(page)

      // Should see demo user name or profile elements
      await expect(page.locator('text=Profile')).toBeVisible()
    })

    test('should allow demo user to access all app features', async ({
      page,
    }) => {
      const response = await page.request.post('/api/demo/login')
      const data = await response.json()

      if (!data.success) {
        test.skip()
        return
      }

      // Login
      await page.goto(APP_ROUTES.login)
      await page.fill('input[type="email"]', data.credentials.email)
      await page.fill('input[type="password"]', data.credentials.password)
      await page.click('button:has-text("Sign in")')

      await expect(page).toHaveURL(/\/home/, { timeout: 15000 })

      // Test accessing various pages
      const pages = [
        { route: APP_ROUTES.learn, expected: 'Learn' },
        { route: APP_ROUTES.gallery, expected: 'Gallery' },
        { route: APP_ROUTES.challenges, expected: 'Challenges' },
        { route: APP_ROUTES.create, expected: 'Create' },
        { route: APP_ROUTES.profile, expected: 'Profile' },
      ]

      for (const { route, expected } of pages) {
        await page.goto(route)
        await waitForPageLoad(page)
        await expect(page.locator(`text=${expected}`)).toBeVisible()
      }
    })
  })

  test.describe('Demo Mode Disabled', () => {
    test('should return error when demo mode is disabled', async ({
      request,
    }) => {
      const response = await request.post('/api/demo/login')
      const data = await response.json()

      // Either succeeds (demo enabled) or returns appropriate error
      if (!data.success) {
        expect(data.error).toBeDefined()
      }
    })
  })

  test.describe('Demo User State', () => {
    test('should persist demo user session', async ({ page, context }) => {
      const response = await page.request.post('/api/demo/login')
      const data = await response.json()

      if (!data.success) {
        test.skip()
        return
      }

      // Login
      await page.goto(APP_ROUTES.login)
      await page.fill('input[type="email"]', data.credentials.email)
      await page.fill('input[type="password"]', data.credentials.password)
      await page.click('button:has-text("Sign in")')

      await expect(page).toHaveURL(/\/home/, { timeout: 15000 })

      // Open new page in same context
      const newPage = await context.newPage()
      await newPage.goto(APP_ROUTES.home)

      // Should still be logged in
      await expect(newPage).toHaveURL(/\/home/)
      await newPage.close()
    })
  })
})
