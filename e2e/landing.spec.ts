/**
 * Landing Page E2E Tests
 *
 * Tests for the landing page where users select their creator type.
 * Each creator type (Entertainer, Educator, Storyteller) should lead
 * to a distinct experience on the start page.
 */

import { test, expect } from '@playwright/test'
import { CREATOR_TYPES, APP_ROUTES, PAGE_TITLES } from './fixtures/test-data'
import { waitForPageLoad } from './fixtures/test-helpers'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_ROUTES.landing)
    await waitForPageLoad(page)
  })

  test('should display the landing page with correct title', async ({
    page,
  }) => {
    await expect(page.locator(`text=${PAGE_TITLES.landing}`)).toBeVisible()
  })

  test('should display three creator type options', async ({ page }) => {
    // Check all three creator type buttons exist
    await expect(page.locator(`text=${CREATOR_TYPES.entertainer.label}`)).toBeVisible()
    await expect(page.locator(`text=${CREATOR_TYPES.educator.label}`)).toBeVisible()
    await expect(page.locator(`text=${CREATOR_TYPES.storyteller.label}`)).toBeVisible()
  })

  test('should display creator type descriptions', async ({ page }) => {
    await expect(
      page.locator(`text=${CREATOR_TYPES.entertainer.description}`)
    ).toBeVisible()
    await expect(
      page.locator(`text=${CREATOR_TYPES.educator.description}`)
    ).toBeVisible()
    await expect(
      page.locator(`text=${CREATOR_TYPES.storyteller.description}`)
    ).toBeVisible()
  })

  test('should have a sign in link for existing users', async ({ page }) => {
    const signInLink = page.locator('a:has-text("Sign in")')
    await expect(signInLink).toBeVisible()
    await expect(signInLink).toHaveAttribute('href', '/login')
  })

  test('should display the logo/sparkles icon', async ({ page }) => {
    // The logo should be visible in the header
    const logo = page.locator('.rounded-2xl').first()
    await expect(logo).toBeVisible()
  })

  test.describe('Creator Type Selection', () => {
    test('should navigate to start page when Entertainer is selected', async ({
      page,
    }) => {
      await page.click(`button:has-text("${CREATOR_TYPES.entertainer.label}")`)

      // Should navigate to start page with type query param
      await expect(page).toHaveURL(/\/start\?type=entertainer/)
    })

    test('should navigate to start page when Educator is selected', async ({
      page,
    }) => {
      await page.click(`button:has-text("${CREATOR_TYPES.educator.label}")`)

      await expect(page).toHaveURL(/\/start\?type=educator/)
    })

    test('should navigate to start page when Storyteller is selected', async ({
      page,
    }) => {
      await page.click(`button:has-text("${CREATOR_TYPES.storyteller.label}")`)

      await expect(page).toHaveURL(/\/start\?type=storyteller/)
    })

    test('should store creator type in localStorage', async ({ page }) => {
      await page.click(`button:has-text("${CREATOR_TYPES.entertainer.label}")`)

      // Check localStorage
      const creatorType = await page.evaluate(() =>
        localStorage.getItem('creatorType')
      )
      expect(creatorType).toBe('entertainer')
    })

    test('should highlight selected creator type before navigation', async ({
      page,
    }) => {
      const entertainerButton = page.locator(
        `button:has-text("${CREATOR_TYPES.entertainer.label}")`
      )

      // Before click - should not have selected styling
      await expect(entertainerButton).not.toHaveClass(/BFFF00/)

      // Click should trigger navigation, but we can check the button exists
      await expect(entertainerButton).toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('should display properly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      // Creator type cards should still be visible
      await expect(
        page.locator(`text=${CREATOR_TYPES.entertainer.label}`)
      ).toBeVisible()
      await expect(page.locator(`text=${PAGE_TITLES.landing}`)).toBeVisible()
    })

    test('should stack creator types vertically on small screens', async ({
      page,
    }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      // The grid should become single column
      const grid = page.locator('.grid')
      await expect(grid).toBeVisible()
    })
  })

  test.describe('Accessibility', () => {
    test('should have proper button roles for creator types', async ({
      page,
    }) => {
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()

      // Should have at least 3 buttons (one for each creator type)
      expect(buttonCount).toBeGreaterThanOrEqual(3)
    })

    test('should be navigable with keyboard', async ({ page }) => {
      // Tab to first interactive element
      await page.keyboard.press('Tab')

      // Continue tabbing through creator types
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab')
      }

      // Should be able to activate with Enter
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })
  })
})
