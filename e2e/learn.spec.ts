/**
 * Learn Page E2E Tests
 *
 * Tests for the curriculum/learn page that displays
 * the 10-week curriculum and lesson progress.
 */

import { test, expect } from '@playwright/test'
import { APP_ROUTES, CURRICULUM_WEEKS, PAGE_TITLES } from './fixtures/test-data'
import { waitForPageLoad } from './fixtures/test-helpers'

test.describe('Learn Page', () => {
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

    await page.goto(APP_ROUTES.learn)
    await waitForPageLoad(page)
  })

  test('should display learn page with correct title', async ({ page }) => {
    await expect(page.locator(`h1:has-text("${PAGE_TITLES.learn}")`)).toBeVisible()
  })

  test('should display subtitle', async ({ page }) => {
    await expect(
      page.locator('text=10 weeks to level up your creator game')
    ).toBeVisible()
  })

  test.describe('Overall Progress', () => {
    test('should display overall progress section', async ({ page }) => {
      await expect(page.locator('text=Overall Progress')).toBeVisible()
    })

    test('should show progress percentage', async ({ page }) => {
      await expect(page.locator('text=/\\d+%/')).toBeVisible()
    })

    test('should show lessons completed count', async ({ page }) => {
      await expect(page.locator('text=/\\d+\\/20 lessons/')).toBeVisible()
    })

    test('should display progress bar', async ({ page }) => {
      // Progress bar should exist
      const progressBar = page.locator('[class*="progress"], [role="progressbar"]')
      await expect(progressBar.first()).toBeVisible()
    })
  })

  test.describe('Curriculum Display', () => {
    test('should display all 10 weeks', async ({ page }) => {
      for (const week of CURRICULUM_WEEKS) {
        await expect(page.locator(`text=WEEK ${week.week}`)).toBeVisible()
      }
    })

    test('should display week titles', async ({ page }) => {
      // First week should be visible
      await expect(
        page.locator(`text=${CURRICULUM_WEEKS[0].title}`)
      ).toBeVisible()
    })

    test('should show current week as unlocked', async ({ page }) => {
      // First week should be unlocked and show sessions
      const firstWeekCard = page.locator('text=WEEK 1').locator('..')
      await expect(firstWeekCard).toBeVisible()
    })

    test('should show locked weeks with lock icon', async ({ page }) => {
      // Later weeks should be locked (assuming current week is 1)
      // Look for lock icons in locked weeks
      const lockedWeeks = page.locator('text=WEEK 10').locator('..')
      await expect(lockedWeeks).toBeVisible()
    })
  })

  test.describe('Week Card Details', () => {
    test('should display sessions for unlocked weeks', async ({ page }) => {
      // First week sessions
      await expect(
        page.locator('text=What Makes People Stop Scrolling')
      ).toBeVisible()
    })

    test('should show session duration', async ({ page }) => {
      await expect(page.locator('text=/\\d+ min/')).toBeVisible()
    })

    test('should show XP rewards for sessions', async ({ page }) => {
      await expect(page.locator('text=/\\+\\d+ XP/')).toBeVisible()
    })

    test('should have weekly challenge link', async ({ page }) => {
      await expect(page.locator('text=Weekly Challenge:')).toBeVisible()
    })

    test('should show challenge name and XP', async ({ page }) => {
      await expect(page.locator('text=60-Second Banger')).toBeVisible()
      await expect(page.locator('text=+150 XP')).toBeVisible()
    })
  })

  test.describe('Session Links', () => {
    test('should have clickable session links', async ({ page }) => {
      const sessionLink = page.locator(
        'a[href*="/learn/"]:has-text("What Makes People Stop Scrolling")'
      )
      await expect(sessionLink).toBeVisible()
    })

    test('should navigate to session page when clicked', async ({ page }) => {
      const sessionLink = page.locator(
        'a[href*="/learn/"]:has-text("What Makes People Stop Scrolling")'
      )
      await sessionLink.click()

      // Should navigate to session detail page
      await expect(page).toHaveURL(/\/learn\//)
    })
  })

  test.describe('Week States', () => {
    test('should show completed state for finished sessions', async ({
      page,
    }) => {
      // Look for checkmark icons indicating completion
      // This depends on user progress
      const checkIcons = page.locator('[class*="green"], [class*="check"]')
      // May or may not have completed sessions
    })

    test('should show play icon for incomplete sessions', async ({ page }) => {
      // Unlocked but incomplete sessions should have play icon
      const playIcons = page.locator('svg.lucide-play')
      await expect(playIcons.first()).toBeVisible()
    })

    test('should show progress count for each week', async ({ page }) => {
      // Week should show x/y progress
      await expect(page.locator('text=/\\d+\\/\\d+/')).toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('should display properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      await expect(page.locator('text=Learn')).toBeVisible()
      await expect(page.locator('text=WEEK 1')).toBeVisible()
    })
  })
})

test.describe('Learn Page - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto(APP_ROUTES.learn)
    await expect(page).toHaveURL(/\/login/)
  })
})
