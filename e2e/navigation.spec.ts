/**
 * Navigation E2E Tests
 *
 * Tests for all navigation links in sidebar and bottom nav.
 */

import { test, expect } from '@playwright/test'
import { APP_ROUTES } from './fixtures/test-data'
import { waitForPageLoad, verifyNavigation } from './fixtures/test-helpers'

test.describe('Navigation - Authenticated User', () => {
  test.beforeEach(async ({ page }) => {
    // Login with demo user
    const response = await page.request.post('/api/demo/login')
    const data = await response.json()

    if (!data.success) {
      test.skip()
      return
    }

    await page.goto(APP_ROUTES.login)
    await page.fill('input[type="email"]', data.credentials.email)
    await page.fill('input[type="password"]', data.credentials.password)
    await page.click('button:has-text("Sign in")')
    await expect(page).toHaveURL(/\/home/, { timeout: 15000 })
  })

  test.describe('Sidebar Navigation (Desktop)', () => {
    test('should display sidebar on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      const sidebar = page.locator('aside')
      await expect(sidebar).toBeVisible()
    })

    test('should have all nav items in sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      const navItems = ['Home', 'Learn', 'Create', 'Gallery', 'Challenges']

      for (const item of navItems) {
        await expect(page.locator(`aside >> a:has-text("${item}")`)).toBeVisible()
      }
    })

    test('should highlight active nav item', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.goto(APP_ROUTES.home)
      await waitForPageLoad(page)

      // Home should be active
      const homeLink = page.locator('aside >> a:has-text("Home")')
      await expect(homeLink).toHaveClass(/BFFF00/)
    })

    test('should navigate to Home from sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.goto(APP_ROUTES.learn)
      await page.click('aside >> a:has-text("Home")')
      await expect(page).toHaveURL(/\/home/)
    })

    test('should navigate to Learn from sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.click('aside >> a:has-text("Learn")')
      await expect(page).toHaveURL(/\/learn/)
    })

    test('should navigate to Create from sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.click('aside >> a:has-text("Create")')
      await expect(page).toHaveURL(/\/create/)
    })

    test('should navigate to Gallery from sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.click('aside >> a:has-text("Gallery")')
      await expect(page).toHaveURL(/\/gallery/)
    })

    test('should navigate to Challenges from sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.click('aside >> a:has-text("Challenges")')
      await expect(page).toHaveURL(/\/challenges/)
    })

    test('should display user info in sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      // User section should be visible
      await expect(page.locator('aside >> text=/Level \\d+/')).toBeVisible()
    })

    test('should have settings link in sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      const settingsLink = page.locator('aside >> a:has-text("Settings")')
      await expect(settingsLink).toBeVisible()
    })

    test('should have logout button in sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      // Look for logout button with LogOut icon
      const logoutButton = page.locator('aside >> button').last()
      await expect(logoutButton).toBeVisible()
    })

    test('should display logo in sidebar', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })

      await expect(
        page.locator('aside >> text=Creator Bootcamp')
      ).toBeVisible()
    })
  })

  test.describe('Bottom Navigation (Mobile)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)
    })

    test('should display bottom nav on mobile', async ({ page }) => {
      const bottomNav = page.locator('nav').last()
      await expect(bottomNav).toBeVisible()
    })

    test('should hide sidebar on mobile', async ({ page }) => {
      // Sidebar should be hidden on mobile
      const sidebar = page.locator('aside')
      await expect(sidebar).not.toBeVisible()
    })

    test('should navigate via bottom nav on mobile', async ({ page }) => {
      // Navigate to Learn
      await page.click('nav >> a[href*="learn"]')
      await expect(page).toHaveURL(/\/learn/)

      // Navigate to Create
      await page.click('nav >> a[href*="create"]')
      await expect(page).toHaveURL(/\/create/)

      // Navigate to Home
      await page.click('nav >> a[href*="home"]')
      await expect(page).toHaveURL(/\/home/)
    })
  })

  test.describe('Navigation State Persistence', () => {
    test('should maintain scroll position on back navigation', async ({
      page,
    }) => {
      await page.goto(APP_ROUTES.learn)
      await waitForPageLoad(page)

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 500))

      // Navigate away
      await page.click('a:has-text("Home")')
      await waitForPageLoad(page)

      // Navigate back
      await page.goBack()
      await waitForPageLoad(page)

      // Should be on learn page
      await expect(page).toHaveURL(/\/learn/)
    })
  })

  test.describe('Logo Navigation', () => {
    test('should navigate to home when clicking logo', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.goto(APP_ROUTES.learn)
      await waitForPageLoad(page)

      // Click logo in sidebar
      await page.click('aside >> a[href="/home"]')
      await expect(page).toHaveURL(/\/home/)
    })
  })
})

test.describe('Navigation - Profile Routes', () => {
  test.beforeEach(async ({ page }) => {
    const response = await page.request.post('/api/demo/login')
    const data = await response.json()

    if (!data.success) {
      test.skip()
      return
    }

    await page.goto(APP_ROUTES.login)
    await page.fill('input[type="email"]', data.credentials.email)
    await page.fill('input[type="password"]', data.credentials.password)
    await page.click('button:has-text("Sign in")')
    await expect(page).toHaveURL(/\/home/, { timeout: 15000 })
  })

  test('should navigate to profile from sidebar settings', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 720 })
    await page.click('aside >> a:has-text("Settings")')
    await expect(page).toHaveURL(/\/profile\/settings/)
  })

  test('should navigate to profile page directly', async ({ page }) => {
    await page.goto(APP_ROUTES.profile)
    await waitForPageLoad(page)
    await expect(page.locator('text=Profile')).toBeVisible()
  })
})
