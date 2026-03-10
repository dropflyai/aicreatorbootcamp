# Mobile Review Checklist -- Pre-Release Gate (Authoritative)

This checklist must be completed before any mobile app release reaches the app stores.
Every item must be explicitly marked PASS, FAIL, or N/A with justification.
A single unjustified FAIL in a critical section blocks release.

---

## HOW TO USE THIS CHECKLIST

1. Copy the checklist for each release
2. Every item must be reviewed by the responsible person
3. Mark each item: PASS / FAIL / N/A
4. N/A requires written justification (why does this not apply?)
5. Any FAIL must include remediation plan and timeline
6. Checklist must be signed off by: developer, QA, and product owner
7. Archive completed checklists for audit trail and App Store review responses

---

## SECTION 1: PERFORMANCE REVIEW

### 1.1 Startup Performance

- [ ] Cold start time measured on low-end target device: ___ms (target: < 2000ms)
- [ ] Warm start time measured: ___ms (target: < 500ms)
- [ ] Startup trace reviewed (no unnecessary work on main thread)
- [ ] Splash screen / launch screen configured correctly (no blank flash)
- [ ] Time to interactive (TTI) measured: ___ms
- [ ] No network requests blocking initial render

### 1.2 Runtime Performance

- [ ] Scroll performance profiled: ___fps (target: 60fps on mid-range device)
- [ ] Screen transition performance profiled: ___fps
- [ ] No dropped frames during common user flows
- [ ] Animations run at 60fps without CPU spikes
- [ ] Main thread not blocked by disk I/O, network, or heavy computation
- [ ] Background threads used for all non-UI work

### 1.3 Memory

- [ ] Baseline memory usage: ___MB (target: < 200MB)
- [ ] Peak memory usage: ___MB (target: < 350MB)
- [ ] No memory leaks detected over 30-minute session
- [ ] Image memory managed (downsampling, recycling, caching limits)
- [ ] Large data sets use pagination (not loaded entirely into memory)
- [ ] View controller / fragment lifecycle verified (no retain cycles)

### 1.4 Network

- [ ] API response sizes reasonable (< 100KB for list endpoints)
- [ ] Image sizes optimized (WebP/AVIF, appropriate resolution)
- [ ] Gzip/Brotli compression enabled for API requests
- [ ] Caching headers utilized (ETag, Cache-Control)
- [ ] No redundant API calls (duplicate requests on screen load)
- [ ] Pagination implemented for large data sets
- [ ] Timeout configured for all network requests (30s max)

### 1.5 Battery

- [ ] No unnecessary location tracking (background location justified)
- [ ] No excessive wake locks / background activity
- [ ] Background work uses appropriate APIs (WorkManager, BGTaskScheduler)
- [ ] Battery profiling completed during 1-hour typical use session

---

## SECTION 2: UX AND DESIGN REVIEW

### 2.1 Platform Compliance

- [ ] iOS: Human Interface Guidelines compliance verified
- [ ] Android: Material Design guidelines compliance verified
- [ ] Navigation pattern appropriate for platform
- [ ] System back button works correctly (Android)
- [ ] Swipe-to-go-back works (iOS)
- [ ] Status bar style correct (light/dark based on content)
- [ ] Home indicator / navigation bar handled correctly
- [ ] Notch / punch-hole / Dynamic Island handled correctly

### 2.2 Input Handling

- [ ] Keyboard avoidance works on all input screens
- [ ] Keyboard type appropriate for each field (email, number, phone, etc.)
- [ ] Return key action correct (next field, submit, done)
- [ ] Keyboard dismisses on tap outside input area
- [ ] Paste support works correctly
- [ ] Autofill supported where appropriate (passwords, addresses)
- [ ] Text selection and copy works on relevant content
- [ ] Input validation provides inline feedback (not just on submit)

### 2.3 States and Error Handling

- [ ] Loading states: skeleton screens or shimmer (not just spinners)
- [ ] Empty states: helpful message + action (not just "no data")
- [ ] Error states: human-readable message + retry action
- [ ] Offline state: clear indication + available actions
- [ ] Timeout state: retry option
- [ ] Pull-to-refresh on appropriate screens
- [ ] State restoration after app killed and relaunched

### 2.4 Accessibility

- [ ] VoiceOver (iOS) / TalkBack (Android) tested on all screens
- [ ] All interactive elements have accessibility labels
- [ ] Custom components have proper accessibility traits / roles
- [ ] Accessibility actions defined where needed (custom swipe actions)
- [ ] Focus order logical (left-to-right, top-to-bottom reading order)
- [ ] Minimum touch target size: 44x44pt (iOS) / 48x48dp (Android)
- [ ] Color contrast ratio >= 4.5:1 for text, >= 3:1 for large text
- [ ] No information conveyed by color alone
- [ ] Dynamic type / font scaling supported up to xxxLarge
- [ ] Reduce motion preference respected
- [ ] Bold text preference respected (iOS)
- [ ] Screen reader can complete all critical user flows without sighted assistance

### 2.5 Visual Quality

- [ ] All images are @2x and @3x (iOS) or appropriate density buckets (Android)
- [ ] No pixelated or stretched images
- [ ] Dark mode renders correctly on all screens
- [ ] No hardcoded colors (all from design tokens / theme)
- [ ] Consistent spacing throughout the app
- [ ] Typography scale consistent throughout the app
- [ ] Icons consistent in style and weight
- [ ] No layout overflow or clipping on any screen size

---

## SECTION 3: FUNCTIONALITY REVIEW

### 3.1 Core User Flows

- [ ] Primary user flow tested end-to-end
- [ ] Secondary user flows tested
- [ ] Edge cases tested (empty inputs, maximum lengths, special characters)
- [ ] User flow works after app kill and restart (state restoration)
- [ ] User flow works after background/foreground cycle
- [ ] User flow works on airplane mode (graceful degradation)
- [ ] User flow works on poor connectivity (3G simulation)

### 3.2 Authentication

- [ ] Login flow works correctly
- [ ] Logout clears all sensitive data
- [ ] Session expiry handled gracefully (re-authenticate, not crash)
- [ ] Token refresh works silently (user not kicked out unexpectedly)
- [ ] Biometric login works (Face ID, Touch ID, fingerprint)
- [ ] Password manager / autofill integration works
- [ ] Account deletion flow works (GDPR, app store requirement)
- [ ] Multi-device session handling defined

### 3.3 Data Handling

- [ ] Data persistence works across app restarts
- [ ] Cache invalidation works correctly
- [ ] Data sync between devices works (if applicable)
- [ ] Conflict resolution tested (offline edits on multiple devices)
- [ ] Data export works (if applicable)
- [ ] Data deletion works completely (no orphaned data)
- [ ] Large data sets handled without crashes or excessive memory

### 3.4 Push Notifications

- [ ] Permission prompt appears at appropriate time (not first launch)
- [ ] Notifications display correctly (title, body, image)
- [ ] Notification tap navigates to correct screen
- [ ] Background notification processing works
- [ ] Notification grouping/channels configured (Android)
- [ ] Silent notifications work for background data sync
- [ ] Notification settings screen allows granular control

---

## SECTION 4: SECURITY REVIEW

### 4.1 Network Security

- [ ] All traffic over HTTPS (no HTTP fallback)
- [ ] Certificate pinning configured for API endpoints
- [ ] Certificate pinning has backup pins for rotation
- [ ] No sensitive data in URL query parameters
- [ ] API keys not in client binary (use server-mediated access)

### 4.2 Data Security

- [ ] Sensitive data in Keychain (iOS) / Keystore (Android)
- [ ] No sensitive data in UserDefaults / SharedPreferences
- [ ] No sensitive data in application logs
- [ ] No sensitive data visible in app switcher (screenshot protection)
- [ ] Clipboard cleared of sensitive data on app background
- [ ] Local database encrypted (if contains sensitive data)
- [ ] Temporary files cleaned up

### 4.3 Binary Security

- [ ] Code obfuscation enabled (ProGuard/R8, bitcode)
- [ ] No hardcoded secrets in source code or binary
- [ ] Debugging disabled in release builds
- [ ] Root/jailbreak detection implemented (proportional response)
- [ ] Anti-tampering measures in place for critical flows (payments)

### 4.4 Authentication Security

- [ ] Biometric authentication uses platform APIs correctly
- [ ] Session tokens stored securely (not in plain text)
- [ ] Token rotation on sensitive operations
- [ ] Brute-force protection (rate limiting on login attempts)
- [ ] OAuth flow uses PKCE (not implicit grant)

---

## SECTION 5: PLATFORM INTEGRATION REVIEW

### 5.1 Deep Links

- [ ] Universal links (iOS) verified with apple-app-site-association
- [ ] App Links (Android) verified with assetlinks.json
- [ ] Deep links handle unauthenticated state (redirect to login, then deep link target)
- [ ] Deep links handle missing content (item deleted)
- [ ] Deep links tested from: email, SMS, browser, other apps
- [ ] Deep link parameter injection tested and prevented

### 5.2 Widgets (if applicable)

- [ ] Widget displays current data
- [ ] Widget refresh schedule appropriate
- [ ] Widget handles no-data state
- [ ] Widget tap navigates to correct screen in app
- [ ] Widget supports different sizes
- [ ] Widget configuration works (if configurable)

### 5.3 Extensions (if applicable)

- [ ] Share extension works for target content types
- [ ] Today widget / complications display correctly
- [ ] App Clip / Instant App loads quickly (< 10MB)
- [ ] Extension data shared correctly with main app (app groups)

---

## SECTION 6: RELEASE PROCESS REVIEW

### 6.1 Build Verification

- [ ] Release build tested (not debug build)
- [ ] Version number incremented correctly
- [ ] Build number incremented correctly
- [ ] Minimum OS version set correctly
- [ ] Target architectures correct (arm64, x86_64 for simulator)
- [ ] Code signing valid (distribution certificate, provisioning profile)
- [ ] Entitlements correct (push notifications, associated domains, etc.)

### 6.2 Store Submission

- [ ] App Store screenshots updated (if UI changed)
- [ ] Play Store screenshots updated (if UI changed)
- [ ] App description current
- [ ] What's New / Release Notes written
- [ ] Privacy policy URL valid and current
- [ ] App privacy details (iOS) / Data safety (Android) updated
- [ ] Content rating questionnaire completed
- [ ] Required export compliance declarations completed
- [ ] Age rating appropriate

### 6.3 Rollout Strategy

- [ ] Staged rollout configured (not 100% immediate)
- [ ] Rollout monitoring dashboard ready
- [ ] Crash rate monitoring configured
- [ ] ANR / hang rate monitoring configured
- [ ] User feedback monitoring configured (reviews, support tickets)
- [ ] Rollback plan documented (halt rollout, revert version)
- [ ] Success criteria defined (what metrics confirm release is healthy)
- [ ] Soak period defined before going to 100%

### 6.4 Device Coverage

- [ ] Tested on smallest supported screen size
- [ ] Tested on largest supported screen size
- [ ] Tested on oldest supported OS version
- [ ] Tested on latest OS version
- [ ] Tested on low-end device (2 year old mid-range)
- [ ] Tested on at least one tablet (if tablet supported)
- [ ] Tested on both notched and non-notched devices

---

## SECTION 7: REGRESSION VERIFICATION

### 7.1 Automated Tests

- [ ] Unit test suite passed (100%)
- [ ] UI test suite passed (100% or known flaky tests documented)
- [ ] Integration test suite passed
- [ ] No new test failures introduced
- [ ] Test coverage >= 80% for business logic

### 7.2 Manual Regression

- [ ] Top 10 user flows manually verified
- [ ] Payment flow verified (if applicable)
- [ ] Onboarding flow verified
- [ ] Settings and preferences verified
- [ ] Notification handling verified
- [ ] Background/foreground transition verified
- [ ] Low memory scenario tested (did not crash)

---

## SIGN-OFF

```
## Release Review: [App Name] v[X.Y.Z]
## Date: YYYY-MM-DD
## Platform: [iOS / Android / Both]

### Results Summary
- Total items reviewed: [X]
- PASS: [X]
- FAIL: [X]
- N/A (with justification): [X]

### Blocking Failures
1. [Item -- severity -- remediation -- deadline]

### Non-Blocking Issues (tracked in backlog)
1. [Item -- severity -- ticket number]

### Device Testing Summary
| Device | OS | Result | Tester |
|--------|-----|--------|--------|
| | | | |

### Reviewers
- Developer: [Name] -- Date: YYYY-MM-DD
- QA: [Name] -- Date: YYYY-MM-DD
- Product: [Name] -- Date: YYYY-MM-DD
- Design: [Name] -- Date: YYYY-MM-DD

### Decision
- [ ] APPROVED for store submission
- [ ] APPROVED with conditions (list conditions)
- [ ] BLOCKED (list blocking items)
```

---

**No app store submission without a completed checklist. The stores will reject what we do not catch.**
