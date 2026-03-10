# Decision Log: FitFly Maestro Authentication Fix

**Date:** 2026-03-07
**Project:** FitFly
**Brains Used:** CEO Brain, Engineering Brain, QA Brain

## Problem Statement

Maestro E2E tests were failing to authenticate. Previous memory logged this as "Maestro can't authenticate" which was incorrect. The actual problem was a missing test infrastructure setup.

## Root Cause Analysis

| Issue | Details |
|-------|---------|
| No test user in Supabase | Tests assumed users existed but none were created |
| Inconsistent credentials | 3+ different email/password combos across test files |
| Wrong selectors | Tests used `text: "Email"` instead of `testID: "email-input"` |
| No config file | No standardized env vars for credentials |
| No setup script | No pre-test hook to ensure test user exists |

## Solution Implemented

### 1. Created Maestro Config (`config.yaml`)
- Standardized test credentials as environment variables
- Set app ID and default timeouts

### 2. Created Test User Setup Script (`scripts/e2e/setup-test-user.js`)
- Uses Supabase Admin API with service role key
- Creates/updates user with known credentials
- Sets onboarding_completed=true to skip onboarding in tests
- Creates user profile with realistic data

### 3. Created Canonical Login Flow (`flows/shared/login.yaml`)
- Uses testID selectors for reliability
- Handles modal dismissal
- Reusable across all tests

### 4. Updated Test File (`test-swipe-features.yaml`)
- Uses the standardized credentials
- Uses testID selectors
- Tests the swipe-to-reveal functionality

## Files Created

```
scripts/e2e/
├── setup-test-user.js           # Creates test user via Supabase Admin API
├── README.md                     # Setup instructions
└── GET_SUPABASE_SERVICE_KEY.md  # How to get the service key

.maestro/
├── config.yaml                   # Global config with test credentials
├── test-swipe-features.yaml      # Updated swipe test
└── flows/
    └── shared/
        └── login.yaml            # Reusable login flow
```

## Test Credentials (Standardized)

| Field | Value |
|-------|-------|
| Email | `e2e.test@fitfly.app` |
| Password | `FitFlyE2E_2026!` |
| User Name | `E2E Test User` |

## Usage

```bash
# One-time setup (requires Supabase service role key)
export SUPABASE_SERVICE_ROLE_KEY="your-key"
node scripts/e2e/setup-test-user.js

# Run tests
npx expo run:ios  # Start app
maestro test .maestro/test-swipe-features.yaml
```

## Lessons Learned

1. **Maestro CAN handle authentication** - it's just Playwright for mobile
2. **Test infrastructure is required** - can't just write tests and expect them to work
3. **testID selectors are essential** - text matching is fragile
4. **Pre-test setup scripts matter** - like Playwright's globalSetup
5. **Standardize credentials** - one source of truth, not scattered across files

## Pattern for Future Projects

When setting up Maestro for any app:

1. Create a `config.yaml` with test credentials as env vars
2. Create a setup script to provision test user via Admin API
3. Use `testID` props on all interactive elements
4. Create reusable flows in `flows/shared/`
5. Skip onboarding for test users to speed up tests

## Verification Status

| Item | Status |
|------|--------|
| Config created | Complete |
| Setup script created | Complete |
| Login flow created | Complete |
| Test updated | Complete |
| Test user created | **Requires user action** (run setup script) |
| Tests passing | **Pending verification** |

## Next Steps

1. User runs `scripts/e2e/setup-test-user.js` with their service role key
2. Run `maestro test .maestro/test-swipe-features.yaml`
3. If tests pass, mark Maestro auth issue as resolved
