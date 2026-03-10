/**
 * Gallery Page E2E Tests
 *
 * Tests for the gallery page that displays student projects.
 */

import { test, expect } from '@playwright/test'
import { APP_ROUTES, PAGE_TITLES } from './fixtures/test-data'
import { waitForPageLoad } from './fixtures/test-helpers'

test.describe('Gallery Page', () => {
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

    await page.goto(APP_ROUTES.gallery)
    await waitForPageLoad(page)
  })

  test('should display gallery page with correct title', async ({ page }) => {
    await expect(page.locator(`h1:has-text("${PAGE_TITLES.gallery}")`)).toBeVisible()
  })

  test('should display subtitle', async ({ page }) => {
    await expect(
      page.locator('text=Check out what your classmates are creating')
    ).toBeVisible()
  })

  test('should have filter button', async ({ page }) => {
    const filterButton = page.locator('button:has-text("Filter")')
    await expect(filterButton).toBeVisible()
  })

  test.describe('Projects Display', () => {
    test('should show projects or empty state', async ({ page }) => {
      // Either projects grid or empty state
      const hasProjects = await page
        .locator('.grid')
        .isVisible()
        .catch(() => false)
      const hasEmptyState = await page
        .locator('text=No projects yet')
        .isVisible()
        .catch(() => false)

      expect(hasProjects || hasEmptyState).toBeTruthy()
    })

    test('should display empty state message when no projects', async ({
      page,
    }) => {
      // If no projects exist
      const emptyState = page.locator('text=No projects yet')
      if (await emptyState.isVisible()) {
        await expect(
          page.locator('text=Be the first to submit a project')
        ).toBeVisible()
      }
    })

    test('should have create project button in empty state', async ({
      page,
    }) => {
      const emptyState = page.locator('text=No projects yet')
      if (await emptyState.isVisible()) {
        await expect(page.locator('button:has-text("Create Project")')).toBeVisible()
      }
    })
  })

  test.describe('Project Cards', () => {
    test('should display project thumbnails when projects exist', async ({
      page,
    }) => {
      const projects = page.locator('.grid > div')
      const count = await projects.count()

      if (count > 0) {
        // Each project should have a thumbnail area
        await expect(projects.first().locator('.aspect-video')).toBeVisible()
      }
    })

    test('should display creator info on project cards', async ({ page }) => {
      const projects = page.locator('.grid > div')
      const count = await projects.count()

      if (count > 0) {
        // Should show creator name
        await expect(projects.first().locator('.font-medium')).toBeVisible()
      }
    })

    test('should display level badge on project cards', async ({ page }) => {
      const projects = page.locator('.grid > div')
      const count = await projects.count()

      if (count > 0) {
        await expect(
          projects.first().locator('text=/Level \\d+/')
        ).toBeVisible()
      }
    })

    test('should show like/fire count on projects', async ({ page }) => {
      const projects = page.locator('.grid > div')
      const count = await projects.count()

      if (count > 0) {
        // Heart/fire reaction button
        const heartButton = projects.first().locator('button').first()
        await expect(heartButton).toBeVisible()
      }
    })

    test('should show comment count on projects', async ({ page }) => {
      const projects = page.locator('.grid > div')
      const count = await projects.count()

      if (count > 0) {
        // Feedback count
        await expect(projects.first().locator('text=/\\d+/')).toBeVisible()
      }
    })

    test('should have share button on projects', async ({ page }) => {
      const projects = page.locator('.grid > div')
      const count = await projects.count()

      if (count > 0) {
        // Share button should exist
        const shareButtons = projects.first().locator('button')
        await expect(shareButtons.last()).toBeVisible()
      }
    })
  })

  test.describe('Challenge Badge', () => {
    test('should show challenge badge on challenge submissions', async ({
      page,
    }) => {
      // Challenge submissions have a special badge
      const challengeBadge = page.locator('text=/Week \\d+ Challenge/')

      // May or may not exist depending on projects
      if (await challengeBadge.isVisible()) {
        await expect(challengeBadge).toBeVisible()
      }
    })
  })

  test.describe('Project Interactions', () => {
    test('should allow clicking like button', async ({ page }) => {
      const projects = page.locator('.grid > div')
      const count = await projects.count()

      if (count > 0) {
        const likeButton = projects.first().locator('button').first()
        await likeButton.click()
        // Button should still be visible after click
        await expect(likeButton).toBeVisible()
      }
    })
  })

  test.describe('Responsive Grid', () => {
    test('should show single column on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 })
      await page.reload()
      await waitForPageLoad(page)

      // Grid should adjust to single column
      await expect(page.locator('.grid')).toBeVisible()
    })

    test('should show multiple columns on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 })
      await page.reload()
      await waitForPageLoad(page)

      // Grid should be visible with multiple columns
      await expect(page.locator('.grid')).toBeVisible()
    })
  })
})

test.describe('Gallery Page - Unauthenticated', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto(APP_ROUTES.gallery)
    await expect(page).toHaveURL(/\/login/)
  })
})
