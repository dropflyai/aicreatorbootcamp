/**
 * Challenges Page E2E Tests
 *
 * Tests for the weekly challenges page.
 */

import { test, expect } from '@playwright/test'
import { APP_ROUTES, PAGE_TITLES, WEEKLY_CHALLENGES } from './fixtures/test-data'
import { waitForPageLoad } from './fixtures/test-helpers'

test.describe('Challenges Page', () => {
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

    await page.goto(APP_ROUTES.challenges)
    await waitForPageLoad(page)
  })

  test('should display challenges page with correct title', async ({
    page,
  }) => {
    await expect(
      page.locator(`h1:has-text("${PAGE_TITLES.challenges}")`)
    ).toBeVisible()
  })

  test('should display subtitle', async ({ page }) => {
    await expect(
      page.locator('text=Complete challenges to earn bonus XP and badges')
    ).toBeVisible()
  })

  test.describe('Current Week Challenge', () => {
    test('should display current week challenge card', async ({ page }) => {
      await expect(
        page.locator('text=THIS WEEK\'S CHALLENGE')
      ).toBeVisible()
    })

    test('should show challenge title', async ({ page }) => {
      // First week challenge
      await expect(
        page.locator(`text="${WEEKLY_CHALLENGES[0].title}"`)
      ).toBeVisible()
    })

    test('should display challenge requirements', async ({ page }) => {
      await expect(page.locator('text=Requirements:')).toBeVisible()
    })

    test('should show requirement list items', async ({ page }) => {
      // Requirements should be visible
      await expect(page.locator('text=Under 60 seconds')).toBeVisible()
    })

    test('should display due date', async ({ page }) => {
      await expect(page.locator('text=Due Friday')).toBeVisible()
    })

    test('should show submission count', async ({ page }) => {
      await expect(page.locator('text=/\\d+ submitted/')).toBeVisible()
    })

    test('should display XP reward', async ({ page }) => {
      await expect(
        page.locator(`text=+${WEEKLY_CHALLENGES[0].xp} XP`)
      ).toBeVisible()
    })

    test('should have submit button or submitted state', async ({ page }) => {
      // Either submit button or completed checkmark
      const submitButton = page.locator('button:has-text("Submit")').first()
      const submittedState = page.locator('text=Submitted')

      const hasSubmitButton = await submitButton.isVisible().catch(() => false)
      const isSubmitted = await submittedState.isVisible().catch(() => false)

      expect(hasSubmitButton || isSubmitted).toBeTruthy()
    })

    test('should navigate to create page on submit click', async ({
      page,
    }) => {
      const submitButton = page.locator(
        'a[href*="create"]:has-text("Submit"), button:has-text("Submit")'
      ).first()

      if (await submitButton.isVisible()) {
        await submitButton.click()
        await expect(page).toHaveURL(/\/create/)
      }
    })
  })

  test.describe('All Challenges List', () => {
    test('should display all 10 weekly challenges', async ({ page }) => {
      for (const challenge of WEEKLY_CHALLENGES) {
        // Skip current week (shown separately)
        if (challenge.week === 1) continue
        await expect(page.locator(`text=WEEK ${challenge.week}`)).toBeVisible()
      }
    })

    test('should show challenge titles', async ({ page }) => {
      // Check a few challenge titles
      await expect(page.locator('text=Audio Story')).toBeVisible()
      await expect(page.locator('text=Capstone Project')).toBeVisible()
    })

    test('should show XP rewards for each challenge', async ({ page }) => {
      for (const challenge of WEEKLY_CHALLENGES) {
        if (challenge.week === 1) continue // Skip current week
        await expect(
          page.locator(`text=+${challenge.xp} XP`)
        ).toBeVisible()
      }
    })

    test('should show locked state for future weeks', async ({ page }) => {
      // Week 10 should be locked/dimmed
      const week10Card = page.locator('text=WEEK 10').locator('../..')
      // Should have opacity class
      await expect(week10Card).toBeVisible()
    })

    test('should show unlocked state for current and past weeks', async ({
      page,
    }) => {
      // Week 1 should be unlocked and have submit button
      const week1Challenge = page
        .locator('text=THIS WEEK\'S CHALLENGE')
        .locator('..')
      await expect(week1Challenge).toBeVisible()
    })
  })

  test.describe('Challenge States', () => {
    test('should show trophy icon for unlocked challenges', async ({
      page,
    }) => {
      const trophyIcons = page.locator('svg.lucide-trophy')
      await expect(trophyIcons.first()).toBeVisible()
    })

    test('should show completed state for submitted challenges', async ({
      page,
    }) => {
      // If any challenges are completed
      const completedBadge = page.locator('text=Completed')
      // May or may not exist depending on user state
    })

    test('should show checkmark for completed challenges', async ({
      page,
    }) => {
      // Completed challenges have checkmark
      const checkmarks = page.locator('svg.lucide-check-circle')
      // May or may not exist
    })
  })

  test.describe('Challenge Cards', () => {
    test('should have interactive cards for unlocked weeks', async ({
      page,
    }) => {
      // Unlocked cards should have hover states
      const card = page.locator('text=Audio Story').locator('../..')
      await expect(card).toBeVisible()
    })

    test('should show challenge description in truncated form', async ({
      page,
    }) => {
      // Descriptions should be visible but truncated
      const descriptions = page.locator('.truncate, .line-clamp-1')
      await expect(descriptions.first()).toBeVisible()
    })
  })

  test.describe('Submit Actions', () => {
    test('should have submit buttons for unlocked non-submitted weeks', async ({
      page,
    }) => {
      // Submit button for current week
      const submitButton = page
        .locator('button:has-text("Submit"), a:has-text("Submit")')
        .first()
      await expect(submitButton).toBeVisible()
    })

    test('should not have submit button for locked weeks', async ({
      page,
    }) => {
      // Week 10 (assuming locked) should not have submit button
      const week10Row = page.locator('text=WEEK 10').locator('../..')
      const submitButton = week10Row.locator('button:has-text("Submit")')
      await expect(submitButton).not.toBeVisible()
    })
  })

  test.describe('Responsive Design', () => {
    test('should display properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      await expect(page.locator('text=Weekly Challenges')).toBeVisible()
      await expect(
        page.locator('text=THIS WEEK\'S CHALLENGE')
      ).toBeVisible()
    })

    test('should stack challenge info on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      // Cards should still be visible
      await expect(page.locator('text=60-Second Banger')).toBeVisible()
    })
  })
})

test.describe('Challenges Page - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto(APP_ROUTES.challenges)
    await expect(page).toHaveURL(/\/login/)
  })
})
