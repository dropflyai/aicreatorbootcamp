# Session Log: FitFly Maestro E2E Tests - SUCCESS

**Date:** 2026-03-07
**Project:** FitFly
**Duration:** Extended debugging session
**Outcome:** SUCCESS - All E2E tests passing

## Summary

Successfully debugged and fixed Maestro E2E testing infrastructure for FitFly. The swipe-to-reveal workout feature is now device-verified.

## Problems Solved

### 1. Missing Test User
- **Issue:** Test files referenced users that didn't exist in Supabase
- **Fix:** Created `scripts/e2e/setup-test-user.js` that uses Supabase Admin API

### 2. Credential Protocol Violation
- **Issue:** I asked user for credentials instead of checking `credentials/.env`
- **Fix:** Updated script to auto-load from `credentials/.env`
- **Lesson:** Always check `credentials/.env` first - NEVER ask for credentials

### 3. Wrong Selectors
- **Issue:** Tests used text matching ("Email") instead of testID
- **Fix:** Updated to use `id: "email-input"`, `id: "password-input"`, etc.

### 4. Multiple Simulator Bug
- **Issue:** Maestro's `--device` flag doesn't work when multiple simulators booted
- **Symptom:** Test said "Running on FitFly" but captured SoulSync screenshots
- **Fix:** Temporarily stop other simulators when running Maestro tests
- **Root Cause:** Maestro bug with XCTest driver selection

### 5. Onboarding Flow
- **Issue:** Test didn't handle 4-step onboarding flow
- **Fix:** Added conditional flows for each step with mock data:
  - Name: "TestUser"
  - Goal: Build Strength (testID: goal-strength)
  - Experience: Intermediate (testID: experience-intermediate)
  - Frequency: 4 days/week (testID: frequency-4)

### 6. VIEW WORKOUT Selector
- **Issue:** Exact text match failed due to arrow character
- **Fix:** Used regex pattern `".*VIEW WORKOUT.*"`

## Files Created/Modified

### Created
- `scripts/e2e/setup-test-user.js` - Creates test user via Supabase Admin API
- `scripts/e2e/README.md` - E2E setup documentation
- `scripts/e2e/GET_SUPABASE_SERVICE_KEY.md` - Key retrieval instructions
- `.maestro/config.yaml` - Maestro configuration
- `.maestro/flows/shared/login.yaml` - Reusable login flow

### Modified
- `.maestro/test-swipe-features.yaml` - Complete test with onboarding handling
- `CLAUDE.md` - Added simulator rule (FitFly only)

## Test Results

```
✓ Login handling (skipped if already logged in)
✓ Onboarding Step 1: Name
✓ Onboarding Step 2: Goal
✓ Onboarding Step 3: Experience
✓ Onboarding Step 4: Frequency
✓ Quick Start Complete
✓ Home screen "Today" visible
✓ VIEW WORKOUT tapped
✓ Exercise cards scrolled
✓ Swipe left to reveal
✓ "Replace" button visible
✓ "Delete" button visible
✓ Swipe right to close
✓ TEST PASSED
```

## Brains Used

- **CEO Brain:** Orchestrated task decomposition
- **Engineering Brain:** Implemented setup scripts and test fixes
- **QA Brain:** Designed test architecture and selector strategy

## Key Learnings

1. **Maestro multi-simulator bug** - Only boot one simulator at a time
2. **testID selectors are essential** - Text matching is fragile
3. **Credentials in `credentials/.env`** - Never ask, always check
4. **Onboarding needs mock data** - Full flow with realistic selections
5. **Regex patterns for buttons** - `".*TEXT.*"` handles special characters

## Pattern for Future

When setting up Maestro E2E:
1. Create dedicated test user via Admin API
2. Use testID selectors exclusively
3. Handle all conditional flows (login, onboarding)
4. Document mock data in test comments
5. Only run with single simulator booted
