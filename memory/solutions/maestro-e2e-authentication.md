# Solution: Maestro E2E Authentication & Testing

**Problem ID:** MAESTRO-AUTH-001
**Date Solved:** 2026-03-07
**Project:** FitFly (applies to all mobile projects)

## Problem Statement

Maestro E2E tests fail to authenticate users. Tests time out looking for elements that should appear after login.

## Root Causes

| Cause | Impact |
|-------|--------|
| No test user in Supabase | Login fails with "invalid credentials" |
| Wrong selectors (text vs testID) | Elements not found reliably |
| Multiple simulators booted | Maestro captures from wrong simulator |
| No onboarding flow handling | Test stuck after login |
| Credentials not in standard location | Scripts can't auto-load keys |

## Solution

### 1. Create Test User Setup Script

```javascript
// scripts/e2e/setup-test-user.js
// Auto-loads from credentials/.env (per credential protocol)
// Creates user via Supabase Admin API with email_confirm: true
```

**Test User Credentials:**
- Email: `e2e.test@fitfly.app`
- Password: `FitFlyE2E_2026!`

### 2. Use testID Selectors

```yaml
# BAD - text matching is fragile
- tapOn:
    text: "Email"

# GOOD - testID is reliable
- tapOn:
    id: "email-input"
```

### 3. Single Simulator Rule

Maestro's `--device` flag has a bug with multiple booted simulators. **Only boot one simulator when running Maestro tests.**

```bash
# Stop other simulators first
xcrun simctl shutdown <other-simulator-id>

# Then run test
maestro test .maestro/test-swipe-features.yaml
```

### 4. Handle Onboarding with Mock Data

```yaml
# Each step is a conditional flow
- runFlow:
    when:
      visible: "What's your name?"
    commands:
      - tapOn:
          id: "name-input"
      - inputText: "TestUser"
      # ... continue through all steps
```

**Mock Data:**
- Name: TestUser
- Goal: Build Strength (goal-strength)
- Experience: Intermediate (experience-intermediate)
- Frequency: 4 days/week (frequency-4)
- Quick Start: Tap at point 50%,55%

### 5. Credential Protocol

Always check `credentials/.env` first - NEVER ask user for credentials.

```javascript
// Load from standard location
const credentialsPath = path.join(projectRoot, 'credentials', '.env');
const serviceKey = loadFromFile(credentialsPath);
```

## Files to Create

```
scripts/e2e/
├── setup-test-user.js     # Creates test user via Admin API
├── README.md              # Setup instructions
└── GET_SUPABASE_SERVICE_KEY.md  # (optional) Key retrieval guide

.maestro/
├── config.yaml            # Test credentials as env vars
├── test-swipe-features.yaml  # Main test with onboarding
└── flows/shared/
    └── login.yaml         # Reusable login flow
```

## Verification

```bash
# 1. Create test user (one-time)
node scripts/e2e/setup-test-user.js

# 2. Run app
npx expo run:ios

# 3. Stop other simulators
xcrun simctl shutdown <other-id>

# 4. Run test
maestro test .maestro/test-swipe-features.yaml
```

## Applies To

- FitFly
- Any React Native + Supabase project using Maestro
- Any project with onboarding flows

## Tags

`maestro` `e2e` `authentication` `supabase` `testing` `onboarding` `simulator`
