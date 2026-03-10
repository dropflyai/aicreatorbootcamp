/**
 * Start Page E2E Tests
 *
 * Tests for the hook exercise page where users get their first win.
 * The experience should be personalized based on creator type.
 */

import { test, expect } from '@playwright/test'
import { CREATOR_TYPES, SAMPLE_HOOKS, APP_ROUTES } from './fixtures/test-data'
import {
  waitForPageLoad,
  selectCreatorType,
  completeHookExercise,
} from './fixtures/test-helpers'

test.describe('Start Page - Hook Exercise', () => {
  test.describe('Entertainer Experience', () => {
    test.beforeEach(async ({ page }) => {
      await selectCreatorType(page, 'entertainer')
      await waitForPageLoad(page)
    })

    test('should display personalized message for entertainers', async ({
      page,
    }) => {
      await expect(
        page.locator('text=Entertainers make people stop scrolling')
      ).toBeVisible()
    })

    test('should show hook exercise prompt', async ({ page }) => {
      await expect(
        page.locator('text=Let\'s try your first hook')
      ).toBeVisible()
    })

    test('should have POV hook format', async ({ page }) => {
      await expect(page.locator('text="POV: You finally')).toBeVisible()
    })

    test('should have input field for hook text', async ({ page }) => {
      const input = page.locator('input[placeholder*="understand"]')
      await expect(input).toBeVisible()
    })

    test('should disable submit button when input is empty', async ({
      page,
    }) => {
      const submitButton = page.locator('button:has-text("See the magic")')
      await expect(submitButton).toBeDisabled()
    })

    test('should enable submit button when input has text', async ({
      page,
    }) => {
      await page.fill(
        'input[placeholder*="understand"]',
        SAMPLE_HOOKS.entertainer
      )
      const submitButton = page.locator('button:has-text("See the magic")')
      await expect(submitButton).toBeEnabled()
    })

    test('should submit hook on Enter key', async ({ page }) => {
      await page.fill(
        'input[placeholder*="understand"]',
        SAMPLE_HOOKS.entertainer
      )
      await page.keyboard.press('Enter')

      // Should show feedback
      await expect(
        page.locator('text=Not bad for your first hook')
      ).toBeVisible()
    })
  })

  test.describe('Educator Experience', () => {
    test.beforeEach(async ({ page }) => {
      await selectCreatorType(page, 'educator')
      await waitForPageLoad(page)
    })

    test('should display hook exercise for educators', async ({ page }) => {
      await expect(
        page.locator('text=/your first teaching hook/i')
      ).toBeVisible()
    })

    test('should complete hook exercise successfully', async ({ page }) => {
      await page.fill('input[placeholder*="compound"]', SAMPLE_HOOKS.educator)
      await page.click('button:has-text("See the magic")')

      await expect(
        page.locator('text=/powerful knowledge hook/i')
      ).toBeVisible()
    })
  })

  test.describe('Storyteller Experience', () => {
    test.beforeEach(async ({ page }) => {
      await selectCreatorType(page, 'storyteller')
      await waitForPageLoad(page)
    })

    test('should display hook exercise for storytellers', async ({ page }) => {
      await expect(
        page.locator('text=/your first story hook/i')
      ).toBeVisible()
    })

    test('should complete hook exercise successfully', async ({ page }) => {
      await page.fill(
        'input[placeholder*="stranger"]',
        SAMPLE_HOOKS.storyteller
      )
      await page.click('button:has-text("See the magic")')

      await expect(
        page.locator('text=/captivating story opener/i')
      ).toBeVisible()
    })
  })

  test.describe('Feedback Step', () => {
    test.beforeEach(async ({ page }) => {
      await selectCreatorType(page, 'entertainer')
      await waitForPageLoad(page)
      await completeHookExercise(page, SAMPLE_HOOKS.entertainer)
    })

    test('should display user\'s hook in feedback', async ({ page }) => {
      await expect(
        page.locator(`text=POV: You finally ${SAMPLE_HOOKS.entertainer}`)
      ).toBeVisible()
    })

    test('should show positive feedback indicators', async ({ page }) => {
      // Check for green checkmarks
      await expect(page.locator('text=Relatable situation')).toBeVisible()
      await expect(page.locator('text=POV format')).toBeVisible()
    })

    test('should show improvement suggestion', async ({ page }) => {
      await expect(
        page.locator('text=Try: Add a time pressure')
      ).toBeVisible()
    })

    test('should have call to action to continue', async ({ page }) => {
      await expect(
        page.locator('text=Want to save your progress')
      ).toBeVisible()
    })

    test('should have button to create account', async ({ page }) => {
      const continueButton = page.locator(
        'button:has-text("Create account & continue")'
      )
      await expect(continueButton).toBeVisible()
    })

    test('should navigate to join page on continue', async ({ page }) => {
      await page.click('button:has-text("Create account & continue")')
      await expect(page).toHaveURL(/\/join/)
    })
  })

  test.describe('Direct URL Access', () => {
    test('should handle direct access to start page', async ({ page }) => {
      await page.goto(APP_ROUTES.start)
      await waitForPageLoad(page)

      // Page should still work without type param
      await expect(
        page.locator('text=Let\'s try your first hook')
      ).toBeVisible()
    })

    test('should handle start page with type query param', async ({ page }) => {
      await page.goto(`${APP_ROUTES.start}?type=educator`)
      await waitForPageLoad(page)

      await expect(
        page.locator('text=/your first teaching hook/i')
      ).toBeVisible()
    })
  })

  test.describe('Animation and UX', () => {
    test('should animate step transitions', async ({ page }) => {
      await selectCreatorType(page, 'entertainer')
      await waitForPageLoad(page)

      // Fill in hook
      await page.fill(
        'input[placeholder*="understand"]',
        SAMPLE_HOOKS.entertainer
      )
      await page.click('button:has-text("See the magic")')

      // Content should animate in
      const feedbackContent = page.locator('text=Not bad for your first hook')
      await expect(feedbackContent).toBeVisible()
    })
  })
})
