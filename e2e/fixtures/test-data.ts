/**
 * AI Creator Bootcamp - Test Data Fixtures
 *
 * Centralized test data for E2E tests.
 * These fixtures provide consistent data across all tests.
 */

// Creator types available on landing page
export const CREATOR_TYPES = {
  entertainer: {
    id: 'entertainer',
    label: 'Entertainer',
    description: 'I make people laugh and feel',
  },
  educator: {
    id: 'educator',
    label: 'Educator',
    description: 'I teach and explain things',
  },
  storyteller: {
    id: 'storyteller',
    label: 'Storyteller',
    description: 'I share experiences and stories',
  },
} as const

// Demo mode credentials (must match src/lib/demo.ts)
export const DEMO_CREDENTIALS = {
  email: 'demo@aicreatorbootcamp.test',
  password: 'demo123456',
  name: 'Demo User',
}

// Demo class info
export const DEMO_CLASS = {
  code: 'DEMO-2024',
  name: 'Demo Class',
}

// Test user for signup flows
export const TEST_USER = {
  email: `test-${Date.now()}@aicreatorbootcamp.test`,
  password: 'TestPassword123!',
  name: 'Test Creator',
}

// Invalid credentials for error testing
export const INVALID_CREDENTIALS = {
  email: 'invalid@test.com',
  password: 'wrongpassword',
}

// Invalid class code for error testing
export const INVALID_CLASS_CODE = 'INVALID-CODE'

// Valid class code format for testing
export const VALID_CLASS_CODE_FORMAT = 'ABC-123-XYZ'

// Sample hook text for start page exercise
export const SAMPLE_HOOKS = {
  entertainer: 'understand why your alarm clock hates you',
  educator: 'learn this one trick that changes everything',
  storyteller: 'discover the secret behind my journey',
}

// Navigation routes for testing
export const APP_ROUTES = {
  landing: '/',
  start: '/start',
  join: '/join',
  login: '/login',
  home: '/home',
  learn: '/learn',
  create: '/create',
  gallery: '/gallery',
  challenges: '/challenges',
  profile: '/profile',
  profileSettings: '/profile/settings',
  onboarding: '/onboarding',
}

// Expected page titles/headings
export const PAGE_TITLES = {
  landing: 'AI Creator Bootcamp',
  login: 'Welcome back',
  join: 'Join AI Creator Bootcamp',
  home: 'Hey',
  learn: 'Learn',
  create: 'Create',
  gallery: 'Gallery',
  challenges: 'Weekly Challenges',
  profile: 'Profile',
}

// Week data for curriculum testing
export const CURRICULUM_WEEKS = [
  { week: 1, title: 'Video That Stops the Scroll' },
  { week: 2, title: 'Voice & Audio That Vibes' },
  { week: 3, title: 'AI Image Generation' },
  { week: 4, title: 'Storytelling That Sticks' },
  { week: 5, title: 'Building Your Brand' },
  { week: 6, title: 'Content Strategy' },
  { week: 7, title: 'Advanced AI Tools' },
  { week: 8, title: 'Collaboration & Community' },
  { week: 9, title: 'Monetization Basics' },
  { week: 10, title: 'Final Showcase' },
]

// Challenge data for challenges page testing
export const WEEKLY_CHALLENGES = [
  { week: 1, title: '60-Second Banger', xp: 150 },
  { week: 2, title: 'Audio Story', xp: 150 },
  { week: 3, title: 'AI Visual Story', xp: 175 },
  { week: 4, title: 'Mini Documentary', xp: 200 },
  { week: 5, title: 'Brand Kit', xp: 150 },
  { week: 6, title: 'Content Calendar', xp: 125 },
  { week: 7, title: 'AI Mashup', xp: 200 },
  { week: 8, title: 'Collab Project', xp: 200 },
  { week: 9, title: 'Brand Pitch', xp: 175 },
  { week: 10, title: 'Capstone Project', xp: 500 },
]

// Project types for create page testing
export const PROJECT_TYPES = [
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'image', label: 'Image', icon: '🖼️' },
  { id: 'audio', label: 'Audio', icon: '🎵' },
  { id: 'other', label: 'Other', icon: '✨' },
]

// Sample project data for create flow testing
export const SAMPLE_PROJECT = {
  title: 'My Test Project',
  description: 'This is a test project created during E2E testing.',
  contentUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  type: 'video',
}

// Timeouts for various operations
export const TIMEOUTS = {
  navigation: 10000,
  animation: 1000,
  networkRequest: 15000,
  formSubmit: 5000,
}

// Selectors for common elements
export const SELECTORS = {
  // Landing page
  creatorTypeButton: (type: string) => `button:has-text("${type}")`,
  sparklesLogo: '[data-testid="logo"], .rounded-2xl:has(svg)',

  // Auth forms
  emailInput: 'input[type="email"], input[placeholder*="email" i]',
  passwordInput: 'input[type="password"]',
  nameInput: 'input[placeholder*="name" i]',
  classCodeInput: 'input[placeholder*="ABC" i], input[placeholder*="code" i]',
  submitButton: 'button[type="submit"], button:has-text("Sign in"), button:has-text("Continue"), button:has-text("Create Account")',

  // Navigation
  sidebar: 'aside',
  bottomNav: 'nav',
  navLink: (label: string) => `a:has-text("${label}")`,

  // Cards and content
  card: '[class*="glass"], [class*="rounded-2xl"]',
  progressBar: '[role="progressbar"], [class*="progress"]',

  // Modals and dialogs
  errorMessage: '[class*="error"], [class*="red"], [role="alert"]',
}
