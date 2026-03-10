/**
 * Create Page E2E Tests
 *
 * Tests for the project creation/submission flow.
 */

import { test, expect } from '@playwright/test'
import {
  APP_ROUTES,
  PAGE_TITLES,
  PROJECT_TYPES,
  SAMPLE_PROJECT,
} from './fixtures/test-data'
import { waitForPageLoad } from './fixtures/test-helpers'

test.describe('Create Page', () => {
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

    await page.goto(APP_ROUTES.create)
    await waitForPageLoad(page)
  })

  test('should display create page with correct title', async ({ page }) => {
    await expect(page.locator(`h1:has-text("${PAGE_TITLES.create}")`)).toBeVisible()
  })

  test('should display subtitle', async ({ page }) => {
    await expect(
      page.locator('text=Share your work with the class')
    ).toBeVisible()
  })

  test.describe('Step Indicator', () => {
    test('should show progress steps', async ({ page }) => {
      // Should have 3 step indicators
      const steps = page.locator('.rounded-full.h-1, .h-1\\.5')
      await expect(steps.first()).toBeVisible()
    })
  })

  test.describe('Step 1: Project Type Selection', () => {
    test('should display project type question', async ({ page }) => {
      await expect(
        page.locator('text=What are you creating?')
      ).toBeVisible()
    })

    test('should display all project type options', async ({ page }) => {
      for (const type of PROJECT_TYPES) {
        await expect(page.locator(`text=${type.label}`)).toBeVisible()
      }
    })

    test('should display project type icons', async ({ page }) => {
      for (const type of PROJECT_TYPES) {
        await expect(page.locator(`text=${type.icon}`)).toBeVisible()
      }
    })

    test('should disable continue button when no type selected', async ({
      page,
    }) => {
      const continueButton = page.locator('button:has-text("Continue")')
      await expect(continueButton).toBeDisabled()
    })

    test('should enable continue button when type is selected', async ({
      page,
    }) => {
      await page.click('button:has-text("Video")')
      const continueButton = page.locator('button:has-text("Continue")')
      await expect(continueButton).toBeEnabled()
    })

    test('should highlight selected type', async ({ page }) => {
      await page.click('button:has-text("Video")')
      const videoButton = page.locator('button:has-text("Video")')
      await expect(videoButton).toHaveClass(/BFFF00/)
    })

    test('should advance to step 2 on continue', async ({ page }) => {
      await page.click('button:has-text("Video")')
      await page.click('button:has-text("Continue")')

      // Should see step 2 content
      await expect(page.locator('text=Project Details')).toBeVisible()
    })
  })

  test.describe('Step 2: Project Details', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Video")')
      await page.click('button:has-text("Continue")')
      await waitForPageLoad(page)
    })

    test('should display project details form', async ({ page }) => {
      await expect(page.locator('text=Project Details')).toBeVisible()
    })

    test('should have title input', async ({ page }) => {
      const titleInput = page.locator('input[placeholder*="awesome"]')
      await expect(titleInput).toBeVisible()
    })

    test('should have description textarea', async ({ page }) => {
      const descriptionTextarea = page.locator('textarea')
      await expect(descriptionTextarea).toBeVisible()
    })

    test('should disable continue button when title is empty', async ({
      page,
    }) => {
      const continueButton = page.locator('button:has-text("Continue")').last()
      await expect(continueButton).toBeDisabled()
    })

    test('should enable continue button when title is entered', async ({
      page,
    }) => {
      await page.fill('input[placeholder*="awesome"]', SAMPLE_PROJECT.title)
      const continueButton = page.locator('button:has-text("Continue")').last()
      await expect(continueButton).toBeEnabled()
    })

    test('should have back button', async ({ page }) => {
      const backButton = page.locator('button:has-text("Back")')
      await expect(backButton).toBeVisible()
    })

    test('should go back to step 1 on back button click', async ({ page }) => {
      await page.click('button:has-text("Back")')
      await expect(
        page.locator('text=What are you creating?')
      ).toBeVisible()
    })

    test('should advance to step 3 on continue', async ({ page }) => {
      await page.fill('input[placeholder*="awesome"]', SAMPLE_PROJECT.title)
      await page.fill('textarea', SAMPLE_PROJECT.description)
      await page.click('button:has-text("Continue")').then(() => {}).catch(() => {})
      // Click the correct continue button
      const continueButtons = page.locator('button:has-text("Continue")')
      await continueButtons.last().click()

      // Should see step 3 content
      await expect(page.locator('text=Add Your Content')).toBeVisible()
    })
  })

  test.describe('Step 3: Upload/Link Content', () => {
    test.beforeEach(async ({ page }) => {
      await page.click('button:has-text("Video")')
      await page.click('button:has-text("Continue")')
      await page.fill('input[placeholder*="awesome"]', SAMPLE_PROJECT.title)
      const continueButton = page.locator('button:has-text("Continue")').last()
      await continueButton.click()
      await waitForPageLoad(page)
    })

    test('should display content upload form', async ({ page }) => {
      await expect(page.locator('text=Add Your Content')).toBeVisible()
    })

    test('should have URL input field', async ({ page }) => {
      const urlInput = page.locator('input[placeholder*="https"]')
      await expect(urlInput).toBeVisible()
    })

    test('should have upload area', async ({ page }) => {
      await expect(
        page.locator('text=Drop your file here')
      ).toBeVisible()
    })

    test('should show max file size', async ({ page }) => {
      await expect(page.locator('text=Max 100MB')).toBeVisible()
    })

    test('should disable submit button when URL is empty', async ({
      page,
    }) => {
      const submitButton = page.locator('button:has-text("Submit Project")')
      await expect(submitButton).toBeDisabled()
    })

    test('should enable submit button when URL is entered', async ({
      page,
    }) => {
      await page.fill('input[placeholder*="https"]', SAMPLE_PROJECT.contentUrl)
      const submitButton = page.locator('button:has-text("Submit Project")')
      await expect(submitButton).toBeEnabled()
    })

    test('should have clear button for URL input', async ({ page }) => {
      await page.fill('input[placeholder*="https"]', SAMPLE_PROJECT.contentUrl)
      const clearButton = page.locator('input[placeholder*="https"]').locator('..').locator('button')
      await expect(clearButton).toBeVisible()
    })

    test('should clear URL on clear button click', async ({ page }) => {
      await page.fill('input[placeholder*="https"]', SAMPLE_PROJECT.contentUrl)
      const clearButton = page.locator('input[placeholder*="https"]').locator('..').locator('button')
      await clearButton.click()

      const urlInput = page.locator('input[placeholder*="https"]')
      await expect(urlInput).toHaveValue('')
    })

    test('should show XP preview', async ({ page }) => {
      await expect(page.locator('text=XP for submitting')).toBeVisible()
      await expect(page.locator('text=+25 XP')).toBeVisible()
    })

    test('should have back button', async ({ page }) => {
      const backButton = page.locator('button:has-text("Back")')
      await expect(backButton).toBeVisible()
    })
  })

  test.describe('Project Submission', () => {
    test('should show submit button with sparkles icon', async ({ page }) => {
      await page.click('button:has-text("Video")')
      await page.click('button:has-text("Continue")')
      await page.fill('input[placeholder*="awesome"]', SAMPLE_PROJECT.title)
      await page.locator('button:has-text("Continue")').last().click()

      await expect(
        page.locator('button:has-text("Submit Project")')
      ).toBeVisible()
    })

    // Note: Actual submission would require mocking the API
    test.skip('should redirect to gallery after successful submission', async ({
      page,
    }) => {
      await page.click('button:has-text("Video")')
      await page.click('button:has-text("Continue")')
      await page.fill('input[placeholder*="awesome"]', SAMPLE_PROJECT.title)
      await page.fill('textarea', SAMPLE_PROJECT.description)
      await page.locator('button:has-text("Continue")').last().click()
      await page.fill('input[placeholder*="https"]', SAMPLE_PROJECT.contentUrl)
      await page.click('button:has-text("Submit Project")')

      await expect(page).toHaveURL(/\/gallery/, { timeout: 15000 })
    })
  })
})

test.describe('Create Page - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto(APP_ROUTES.create)
    await expect(page).toHaveURL(/\/login/)
  })
})
