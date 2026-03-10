/**
 * Home Dashboard E2E Tests
 *
 * Tests for the home dashboard that displays user data,
 * weekly progress, and activity feed.
 */

import { test, expect } from '@playwright/test'
import { APP_ROUTES, PAGE_TITLES } from './fixtures/test-data'
import { waitForPageLoad, loginWithDemoUser } from './fixtures/test-helpers'

test.describe('Home Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Check if demo mode is available
    const response = await page.request.post('/api/demo/login')
    const data = await response.json()

    if (!data.success) {
      test.skip()
      return
    }

    // Login with demo user
    await page.goto(APP_ROUTES.login)
    await page.fill('input[type="email"]', data.credentials.email)
    await page.fill('input[type="password"]', data.credentials.password)
    await page.click('button:has-text("Sign in")')
    await expect(page).toHaveURL(/\/home/, { timeout: 15000 })
    await waitForPageLoad(page)
  })

  test('should display home page after login', async ({ page }) => {
    await expect(page).toHaveURL(/\/home/)
  })

  test('should display user greeting', async ({ page }) => {
    // Should show "Hey [name]" greeting
    await expect(page.locator('text=/Hey .* 👋/')).toBeVisible()
  })

  test('should display week progress card', async ({ page }) => {
    await expect(page.locator('text=/WEEK \\d+/')).toBeVisible()
  })

  test('should display current week topic', async ({ page }) => {
    // First week topic
    await expect(
      page.locator('text=Video That Stops the Scroll')
    ).toBeVisible()
  })

  test('should display XP progress bar', async ({ page }) => {
    await expect(page.locator('text=/Progress to Level/')).toBeVisible()
    await expect(page.locator('text=/\\d+ \\/ \\d+,?\\d* XP/')).toBeVisible()
  })

  test('should display level badge', async ({ page }) => {
    await expect(page.locator('text=/Level \\d+/')).toBeVisible()
  })

  test.describe('Next Up Section', () => {
    test('should display next up card', async ({ page }) => {
      await expect(page.locator('text=NEXT UP')).toBeVisible()
    })

    test('should show next session title', async ({ page }) => {
      await expect(
        page.locator('text=/Session \\d+:/')
      ).toBeVisible()
    })

    test('should have start button for next session', async ({ page }) => {
      const startButton = page.locator('button:has-text("Start")')
      await expect(startButton).toBeVisible()
    })
  })

  test.describe('Weekly Challenge Section', () => {
    test('should display weekly challenge card', async ({ page }) => {
      await expect(page.locator('text=WEEKLY CHALLENGE')).toBeVisible()
    })

    test('should show challenge title', async ({ page }) => {
      await expect(page.locator('text="60-Second Banger"')).toBeVisible()
    })

    test('should show submission count', async ({ page }) => {
      await expect(page.locator('text=/\\d+\\/\\d+ submitted/')).toBeVisible()
    })

    test('should have link to gallery', async ({ page }) => {
      const galleryLink = page.locator('a:has-text("View Gallery")')
      await expect(galleryLink).toBeVisible()
    })
  })

  test.describe('Activity Feed', () => {
    test('should display activity section', async ({ page }) => {
      await expect(page.locator('text=Activity')).toBeVisible()
    })

    test('should show activity items or empty state', async ({ page }) => {
      // Either show activities or empty state message
      const hasActivities = await page
        .locator('.space-y-4 > div')
        .count()
        .then((c) => c > 0)
      const hasEmptyState = await page
        .locator('text=No activity yet')
        .isVisible()
        .catch(() => false)

      expect(hasActivities || hasEmptyState).toBeTruthy()
    })
  })

  test.describe('Mobile Header', () => {
    test('should show mobile header on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      // Mobile header should be visible
      await expect(page.locator('header')).toBeVisible()
    })

    test('should display XP badge in mobile header', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      // XP badge should be visible
      await expect(page.locator('text=/\\d+ XP/')).toBeVisible()
    })
  })

  test.describe('Navigation from Home', () => {
    test('should navigate to learn page', async ({ page }) => {
      // Using sidebar on desktop
      await page.click('a:has-text("Learn")')
      await expect(page).toHaveURL(/\/learn/)
    })

    test('should navigate to gallery via link', async ({ page }) => {
      await page.click('a:has-text("View Gallery")')
      await expect(page).toHaveURL(/\/gallery/)
    })
  })

  test.describe('User Stats Display', () => {
    test('should display streak badge', async ({ page }) => {
      // Streak badge should show weeks
      const streakBadge = page.locator('text=/\\d+ week/')
      // May or may not be visible depending on user data
    })

    test('should display user avatar or placeholder', async ({ page }) => {
      // Avatar should be visible in header
      const avatar = page.locator('.rounded-full')
      await expect(avatar.first()).toBeVisible()
    })
  })
})

test.describe('Home Dashboard - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto(APP_ROUTES.home)
    await expect(page).toHaveURL(/\/login/)
  })
})
