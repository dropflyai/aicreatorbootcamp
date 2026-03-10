/**
 * Profile Page E2E Tests
 *
 * Tests for the user profile page.
 */

import { test, expect } from '@playwright/test'
import { APP_ROUTES, PAGE_TITLES } from './fixtures/test-data'
import { waitForPageLoad } from './fixtures/test-helpers'

test.describe('Profile Page', () => {
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

    await page.goto(APP_ROUTES.profile)
    await waitForPageLoad(page)
  })

  test('should display profile page with correct title', async ({ page }) => {
    await expect(page.locator(`h1:has-text("${PAGE_TITLES.profile}")`)).toBeVisible()
  })

  test('should have settings button in header', async ({ page }) => {
    const settingsLink = page.locator('a[href*="settings"]')
    await expect(settingsLink).toBeVisible()
  })

  test.describe('Profile Card', () => {
    test('should display user avatar or placeholder', async ({ page }) => {
      const avatar = page.locator('.rounded-full').first()
      await expect(avatar).toBeVisible()
    })

    test('should display user name', async ({ page }) => {
      // Should have user name in profile
      await expect(page.locator('h2')).toBeVisible()
    })

    test('should display creator type', async ({ page }) => {
      await expect(page.locator('text=/The \\w+/')).toBeVisible()
    })

    test('should display level badge', async ({ page }) => {
      await expect(page.locator('text=/Level \\d+/')).toBeVisible()
    })

    test('should show XP progress bar', async ({ page }) => {
      await expect(
        page.locator('text=/\\d+,?\\d* \\/ \\d+,?\\d* XP/')
      ).toBeVisible()
    })
  })

  test.describe('Stats Grid', () => {
    test('should display total XP', async ({ page }) => {
      await expect(page.locator('text=Total XP')).toBeVisible()
    })

    test('should display week streak', async ({ page }) => {
      await expect(page.locator('text=Week Streak')).toBeVisible()
    })

    test('should display projects count', async ({ page }) => {
      await expect(page.locator('text=Projects')).toBeVisible()
    })

    test('should show numeric values in stats', async ({ page }) => {
      const statsGrid = page.locator('.grid-cols-3')
      await expect(statsGrid).toBeVisible()
    })
  })

  test.describe('Badges Section', () => {
    test('should display badges section', async ({ page }) => {
      await expect(page.locator('text=Badges')).toBeVisible()
    })

    test('should show earned badge count', async ({ page }) => {
      await expect(page.locator('text=/\\d+ earned/')).toBeVisible()
    })

    test('should show badges or empty state message', async ({ page }) => {
      const hasBadges = await page
        .locator('.flex.flex-wrap.gap-3 > div')
        .count()
        .then((c) => c > 0)
      const hasEmptyState = await page
        .locator('text=Complete challenges to earn badges')
        .isVisible()
        .catch(() => false)

      expect(hasBadges || hasEmptyState).toBeTruthy()
    })
  })

  test.describe('Recent XP Section', () => {
    test('should display recent XP section', async ({ page }) => {
      await expect(page.locator('text=Recent XP')).toBeVisible()
    })

    test('should show XP transactions or empty state', async ({ page }) => {
      const hasTransactions = await page
        .locator('text=/\\+\\d+ XP/')
        .count()
        .then((c) => c > 0)
      const hasEmptyState = await page
        .locator('text=Start earning XP by completing lessons')
        .isVisible()
        .catch(() => false)

      expect(hasTransactions || hasEmptyState).toBeTruthy()
    })
  })

  test.describe('Menu Items', () => {
    test('should have settings link', async ({ page }) => {
      const settingsLink = page.locator('a:has-text("Settings")')
      await expect(settingsLink).toBeVisible()
    })

    test('should have sign out button', async ({ page }) => {
      const signOutButton = page.locator('button:has-text("Sign Out")')
      await expect(signOutButton).toBeVisible()
    })

    test('should navigate to settings on click', async ({ page }) => {
      await page.click('a:has-text("Settings")')
      await expect(page).toHaveURL(/\/profile\/settings/)
    })
  })

  test.describe('Sign Out', () => {
    test('should have sign out with red styling', async ({ page }) => {
      const signOutButton = page.locator('button:has-text("Sign Out")')
      await expect(signOutButton).toHaveClass(/FF6B6B|red/)
    })

    test('should log out user when sign out is clicked', async ({ page }) => {
      await page.click('button:has-text("Sign Out")')

      // Should redirect to login or landing
      await expect(page).toHaveURL(/\/(login)?$/, { timeout: 15000 })
    })
  })

  test.describe('Responsive Design', () => {
    test('should display properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      await expect(page.locator('text=Profile')).toBeVisible()
      await expect(page.locator('text=Total XP')).toBeVisible()
    })
  })
})

test.describe('Profile Page - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto(APP_ROUTES.profile)
    await expect(page).toHaveURL(/\/login/)
  })
})
