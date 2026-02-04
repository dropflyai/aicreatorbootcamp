# Mobile Score -- Quality Enforcement (Authoritative)

This document defines how mobile application quality is evaluated.
Every screen, feature, and release must be scored before it ships to users.

Mobile is unforgiving. Users uninstall in seconds. Stores reject silently.
If quality is not measured ruthlessly, it will not exist.

---

## SCORING RULES (MANDATORY)

Each mobile deliverable must be scored across all eight dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = release blocked:
- **Performance**
- **Release Quality**
- **Security**
- **UX Quality**

A hard fail on ANY of these blocks submission to app stores.

### Passing Criteria

- Average score across all eight dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 (even non-hard-fail)
- Platform-specific violations reviewed even if average passes

### Escalation Rule

If a deliverable scores < 3.0 average, the Mobile Brain MUST:
1. Stop all forward feature work
2. Document every deficiency with reproduction steps
3. Create a stabilization sprint plan
4. Re-score after stabilization before resuming features

---

## 1. PERFORMANCE

**Question:**
Does this app feel instant, smooth, and lightweight to the user?

### Scoring Guide

- **5** -- Cold start < 1.5s. Warm start < 500ms. Consistent 60fps scrolling under all conditions. Memory usage < 150MB steady state. No jank under load. Battery drain < 5%/hour active use. Network requests optimized with caching and compression.
- **4** -- Cold start < 2s. Warm start < 800ms. 60fps in normal conditions, minor drops under heavy load. Memory < 200MB. Occasional jank on older devices only. Battery drain < 7%/hour.
- **3** -- Cold start < 3s. 60fps in ideal conditions but noticeable jank during scrolling or transitions. Memory < 250MB but some leaks over extended use. Battery drain noticeable.
- **2** -- Cold start 3-5s. Frame drops visible during normal use. Memory > 250MB or grows unbounded. Visible jank. Battery drain is a user complaint.
- **1** -- Cold start > 5s. Frequent freezes. Memory crashes. Constant jank. Users complain about battery.

### Performance Metrics Checklist

- [ ] Cold start time measured on target low-end device (not just flagship)
- [ ] Warm start time measured
- [ ] FPS profiled during scrolling with real data (not empty states)
- [ ] FPS profiled during screen transitions and animations
- [ ] Memory usage profiled over 30-minute session
- [ ] Memory leak detection run (no unbounded growth)
- [ ] Network payload sizes measured (API responses, images, assets)
- [ ] Image loading optimized (progressive, appropriate resolution, caching)
- [ ] No main thread blocking operations (network, disk, heavy computation)
- [ ] Bundle size measured and compared to budget
- [ ] Battery impact profiled during typical use session
- [ ] Startup trace analyzed (what is happening in those milliseconds)

### Performance Budgets

| Metric | Target | Hard Limit | Measurement Device |
|--------|--------|------------|-------------------|
| Cold start | < 2s | < 5s | Mid-range device (2 years old) |
| Warm start | < 500ms | < 1.5s | Mid-range device |
| Scroll FPS | 60fps | > 45fps | Mid-range device |
| Transition FPS | 60fps | > 50fps | Mid-range device |
| Memory (steady) | < 200MB | < 300MB | After 10 minutes of use |
| Memory (peak) | < 350MB | < 500MB | During heaviest operation |
| App size (iOS) | < 50MB | < 100MB | IPA download size |
| App size (Android) | < 30MB | < 80MB | APK/AAB download size |
| API response | < 200ms | < 2s | P95 latency |
| Image load | < 500ms | < 2s | On 4G network |

### Failure Conditions

- Startup > 5s on target device = CANNOT RELEASE (automatic score 1)
- Consistent frame drops below 30fps = score capped at 2
- Memory leak detected (unbounded growth) = score capped at 2
- Main thread blocked > 500ms = score capped at 3
- App size exceeds store optimization threshold = score capped at 3
- No performance profiling performed = score capped at 3

Score < 4 --> Performance optimization sprint before next feature.

---

## 2. UX QUALITY

**Question:**
Does this app feel native, intuitive, and delightful on each platform?

### Scoring Guide

- **5** -- Follows platform conventions precisely (HIG for iOS, Material for Android). Custom components feel native. Gesture support comprehensive (swipe, long press, pull to refresh). Haptic feedback where appropriate. Animation timing matches platform standards. Keyboard handling flawless. Dark mode complete and tested.
- **4** -- Platform conventions followed for primary interactions. Gestures work correctly. Animations smooth and purposeful. Keyboard handling works. Dark mode supported.
- **3** -- Mostly follows conventions but some non-native patterns. Gestures partially supported. Animations exist but timing feels off. Keyboard handling has edge cases. Dark mode has issues.
- **2** -- Feels like a web app in a native wrapper. Platform conventions ignored. Limited gesture support. Animations janky or missing. Keyboard handling broken in some screens.
- **1** -- Completely non-native feel. No gesture support. No animations. Keyboard obscures content. No dark mode.

### UX Quality Checklist

- [ ] iOS: follows Human Interface Guidelines (navigation, typography, iconography)
- [ ] Android: follows Material Design guidelines (navigation, elevation, motion)
- [ ] Navigation pattern is platform-appropriate (tab bar iOS, bottom nav Android)
- [ ] Back button behavior correct on Android (hardware and software)
- [ ] Swipe-to-go-back works on iOS
- [ ] Pull-to-refresh on scrollable content
- [ ] Swipe-to-delete / swipe actions on list items
- [ ] Long press menus where contextually appropriate
- [ ] Haptic feedback on significant interactions
- [ ] Keyboard avoidance (content not hidden behind keyboard)
- [ ] Keyboard dismissal (tap outside, scroll, swipe)
- [ ] Input field focus management (next field, done button)
- [ ] Dark mode renders correctly on all screens
- [ ] Dynamic type / font scaling supported (iOS)
- [ ] Font size preferences respected (Android)
- [ ] Safe area insets handled (notch, home indicator, system bars)
- [ ] Landscape orientation handled or explicitly locked with justification
- [ ] Tablet layout optimized (if tablet is a target)
- [ ] Loading states are skeleton screens or shimmer (not spinners)
- [ ] Empty states are helpful (illustration + action, not just "no data")
- [ ] Error states provide recovery actions (not just error messages)

### Failure Conditions

- Navigation pattern violates platform conventions = score capped at 3
- No dark mode when system is in dark mode = score capped at 3
- Keyboard obscures input fields = score capped at 2
- Content hidden behind notch or system bars = score capped at 2
- No loading states (blank screen during data fetch) = score capped at 2

Score < 4 --> UX audit required. Platform compliance review.

---

## 3. OFFLINE CAPABILITY

**Question:**
Does the app remain functional and trustworthy when connectivity is poor or absent?

### Scoring Guide

- **5** -- Full offline-first architecture. All critical features work offline. Data syncs automatically when connectivity returns. Conflict resolution handles all edge cases. User always knows their data state (synced, pending, failed). Optimistic UI with rollback on sync failure.
- **4** -- Core features work offline. Read operations cached. Write operations queued. Sync happens automatically. Conflicts handled for common cases. Sync status visible to user.
- **3** -- Some offline support. Cached data displayed when offline. Write operations fail gracefully with clear messaging. Manual sync required. Basic conflict handling.
- **2** -- Minimal offline support. App shows error screens when offline. Some cached data visible but stale. No write capability offline. No conflict resolution.
- **1** -- App is unusable offline. Crashes or shows blank screens. No caching. No offline indication.

### Offline Capability Checklist

- [ ] App detects connectivity state and adapts UI accordingly
- [ ] Network status indicator visible when offline or on poor connection
- [ ] Critical data cached locally for offline access
- [ ] Cache invalidation strategy defined (TTL, version-based, or server-driven)
- [ ] Write operations queued when offline
- [ ] Queue persists across app restarts
- [ ] Automatic sync when connectivity returns
- [ ] Sync conflict resolution strategy defined and implemented
- [ ] User can see sync status (synced, pending, failed)
- [ ] Failed sync operations have retry and manual resolution options
- [ ] Optimistic UI updates with rollback on server rejection
- [ ] Offline data storage encrypted at rest
- [ ] Edge cases tested: airplane mode, poor connectivity, mid-request disconnection
- [ ] Background sync when app is backgrounded (where platform allows)
- [ ] Data freshness indicators (when was this data last updated)

### Failure Conditions

- No offline handling at all = UX FAILURE (automatic score 1)
- App crashes when losing connectivity = automatic score 1
- Blank screens when offline = score capped at 2
- Data loss during sync = automatic score 1
- No indication of offline state to user = score capped at 3

Score < 3 --> Offline architecture review. This is table stakes for mobile.

---

## 4. RELEASE QUALITY

**Question:**
Is this app stable, well-reviewed, and meeting store quality standards?

### Scoring Guide

- **5** -- Crash-free rate > 99.95%. ANR rate < 0.01%. Store rating > 4.7. No critical bugs in last 3 releases. Automated crash reporting with grouping and alerts. Size optimized. All store guidelines met. Staged rollout with monitoring. User feedback loop active.
- **4** -- Crash-free rate > 99.9%. ANR rate < 0.05%. Store rating > 4.5. No critical bugs in last release. Crash reporting configured. Size within budget. Store guidelines met.
- **3** -- Crash-free rate > 99.5%. ANR rate < 0.1%. Store rating > 4.0. Occasional critical bugs. Crash reporting exists but not actively monitored. Size slightly over budget.
- **2** -- Crash-free rate 98-99.5%. ANR rate > 0.1%. Store rating 3.0-4.0. Frequent bugs. Crash reports piling up. Store rejection risk.
- **1** -- Crash-free rate < 98%. ANR frequent. Store rating < 3.0. Store rejection likely. Users leaving negative reviews about stability.

### Release Quality Checklist

- [ ] Crash-free rate measured on current release (target: > 99.9%)
- [ ] ANR rate measured (Android, target: < 0.05%)
- [ ] Hang rate measured (iOS, target: < 0.1%)
- [ ] No P0/P1 bugs open at time of release
- [ ] Regression test suite passed (automated)
- [ ] Manual smoke test completed on physical devices
- [ ] Staged rollout configured (1% -> 10% -> 50% -> 100%)
- [ ] Rollout monitoring dashboard ready
- [ ] Rollback plan documented (how to halt rollout, revert to previous version)
- [ ] Store listing updated (screenshots, description, what's new)
- [ ] App size measured and compared to previous release
- [ ] ProGuard/R8 (Android) and bitcode (iOS) enabled
- [ ] No new permissions requested without justification
- [ ] Deep link testing completed
- [ ] Push notification testing completed
- [ ] Background task testing completed
- [ ] Widget testing completed (if applicable)
- [ ] App Clip / Instant App testing completed (if applicable)

### Release Metrics

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| Crash-free rate | > 99.9% | 99-99.9% | < 99% |
| ANR rate (Android) | < 0.05% | 0.05-0.2% | > 0.2% |
| Store rating | > 4.5 | 4.0-4.5 | < 4.0 |
| 1-star reviews (last 7 days) | < 5% | 5-15% | > 15% |
| Uninstall rate (7-day) | < 10% | 10-20% | > 20% |
| App size delta (vs previous) | < 5% growth | 5-15% growth | > 15% growth |

### Failure Conditions

- Crash rate > 1% = HOTFIX REQUIRED (automatic score 1, all hands on deck)
- Startup > 5s = CANNOT RELEASE (score capped at 1)
- ANR rate > 0.2% = score capped at 2
- Store rating < 3.5 = score capped at 2, recovery plan required
- P0 bug open at release = release blocked
- No staged rollout = score capped at 3

Score < 4 --> Stabilization sprint. No new features until release quality improves.

---

## 5. SECURITY

**Question:**
Does this app protect user data, resist attacks, and follow platform security best practices?

### Scoring Guide

- **5** -- Certificate pinning implemented and tested. All local data encrypted (Keychain/Keystore). Biometric authentication for sensitive operations. No sensitive data in logs. Code obfuscation enabled. Jailbreak/root detection with appropriate response. HTTPS only with TLS 1.3. Input validation on all user inputs. Penetration tested annually.
- **4** -- Certificate pinning implemented. Local sensitive data encrypted. Biometric available. Logs cleaned of sensitive data. Obfuscation enabled. HTTPS only. Input validation present.
- **3** -- HTTPS only. Some local data encrypted. No certificate pinning. Logs may contain sensitive data. Basic obfuscation. Input validation inconsistent.
- **2** -- HTTPS used but not enforced. Local data partially encrypted. No obfuscation. Sensitive data in logs. No certificate pinning.
- **1** -- HTTP used. Data stored in plaintext. No obfuscation. Sensitive data everywhere. Trivially reversible.

### Security Checklist

- [ ] All network communication over HTTPS (no HTTP exceptions)
- [ ] TLS 1.2 minimum, TLS 1.3 preferred
- [ ] Certificate pinning implemented for API endpoints
- [ ] Certificate pinning has rotation plan (backup pins)
- [ ] Sensitive data stored in Keychain (iOS) or Keystore (Android)
- [ ] No sensitive data in UserDefaults/SharedPreferences
- [ ] No sensitive data in application logs
- [ ] No sensitive data in crash reports
- [ ] Code obfuscation enabled (ProGuard/R8 Android, bitcode iOS)
- [ ] Anti-tampering measures in place
- [ ] Jailbreak/root detection implemented (proportional response)
- [ ] Biometric authentication for sensitive operations
- [ ] Session management secure (token refresh, expiry, revocation)
- [ ] Deep links validated to prevent injection attacks
- [ ] WebView (if used) configured securely (no JavaScript bridge abuse)
- [ ] Clipboard cleared of sensitive data on app background
- [ ] Screenshot protection for sensitive screens (FLAG_SECURE, prevent capture)
- [ ] No hardcoded secrets, API keys, or credentials in the binary
- [ ] Binary scanned for exposed strings and secrets
- [ ] Third-party SDK security reviewed (what data do they collect?)

### Failure Conditions

- Hardcoded secrets in binary = automatic score 1 (critical vulnerability)
- Sensitive data in plaintext local storage = score capped at 2
- No HTTPS enforcement = automatic score 1
- Sensitive data in logs shipped to analytics = score capped at 2
- No code obfuscation = score capped at 3
- Third-party SDK collecting data without user consent = score capped at 2

Score < 4 --> Security audit before next release. Fix all critical findings.

---

## 6. CODE QUALITY

**Question:**
Is the codebase maintainable, testable, well-architected, and free of dangerous patterns?

### Scoring Guide

- **5** -- Architecture pattern consistent throughout (MVVM, Clean Architecture, etc.). Test coverage > 80%. Zero force unwraps (Swift) / non-null assertions (Kotlin). CI/CD pipeline with automated testing. Code review required for all merges. Linting enforced. Documentation for complex modules. Dependency injection used consistently.
- **4** -- Architecture pattern consistent. Test coverage > 60%. Minimal force unwraps with justification. CI/CD with basic testing. Code review culture. Linting configured.
- **3** -- Architecture pattern exists but inconsistently applied. Test coverage 30-60%. Some force unwraps. CI exists but testing gaps. Code review for most changes.
- **2** -- Architecture is inconsistent. Test coverage < 30%. Force unwraps common. No CI/CD. Code review ad-hoc.
- **1** -- No architecture. No tests. Force unwraps everywhere. No CI/CD. No code review.

### Code Quality Checklist

- [ ] Architecture pattern defined and documented (MVVM, MVI, Clean Architecture, etc.)
- [ ] Architecture pattern consistently applied across all modules
- [ ] Dependency injection framework used (no service locator anti-pattern)
- [ ] Unit test coverage > 80% for business logic
- [ ] UI test coverage for critical user flows
- [ ] Integration tests for API communication
- [ ] No force unwraps (Swift) without documented justification
- [ ] No non-null assertions (Kotlin) without documented justification
- [ ] No retain cycles / memory leaks in closures
- [ ] Linting configured and enforced in CI (SwiftLint, ktlint/detekt)
- [ ] Code formatting automated and consistent
- [ ] All warnings resolved (zero-warning policy)
- [ ] Deprecated API usage flagged and migration planned
- [ ] Third-party dependencies audited for maintenance and security
- [ ] Dependency versions pinned (no floating versions)
- [ ] Modular architecture (feature modules, clean boundaries)
- [ ] Build time measured and optimized (< 5 minutes for incremental)

### Failure Conditions

- No unit tests = score capped at 2
- Force unwraps / non-null assertions without justification = score capped at 3
- No architectural pattern = score capped at 2
- Build time > 15 minutes = score capped at 3
- Linting disabled or ignored = score capped at 3
- No code review process = score capped at 2

Score < 4 --> Technical debt sprint. Establish architecture and testing baseline.

---

## 7. PLATFORM INTEGRATION

**Question:**
Does this app take advantage of platform capabilities to provide a rich, integrated experience?

### Scoring Guide

- **5** -- Push notifications with rich content and actions. Deep links for all shareable content. Widgets for key information. Share extensions for relevant content types. Spotlight/App Indexing for searchable content. Shortcuts/Quick Actions for common tasks. Background refresh for fresh content. Watch/TV companion app if applicable.
- **4** -- Push notifications configured and working. Deep links for primary content. At least one widget. Share extension for primary content type. Background refresh configured.
- **3** -- Push notifications basic. Deep links for some content. No widgets. No share extensions. No background refresh.
- **2** -- Push notifications with issues (not arriving, wrong content). Deep links broken or missing. No platform integrations.
- **1** -- No push notifications. No deep links. No platform integration.

### Platform Integration Checklist

- [ ] Push notification permission flow is respectful (not on first launch)
- [ ] Push notifications display correctly (title, body, image, actions)
- [ ] Push notification deep linking works (tapping opens correct screen)
- [ ] Silent push for background data sync
- [ ] Universal links (iOS) / App Links (Android) configured and verified
- [ ] Deep links handle edge cases (not logged in, content deleted, etc.)
- [ ] Widget(s) display relevant, timely information
- [ ] Widget refresh strategy defined (timeline, background)
- [ ] Share extension for primary content type
- [ ] Spotlight indexing (iOS) / App Indexing (Android) for searchable content
- [ ] Home screen quick actions / shortcuts for common tasks
- [ ] Handoff / Continuity support (if multi-device)
- [ ] CarPlay / Android Auto support (if applicable)
- [ ] Apple Watch / Wear OS companion (if applicable)
- [ ] Background app refresh configured appropriately
- [ ] Location services used correctly (appropriate authorization level)
- [ ] Camera/photo library permission handled gracefully
- [ ] In-app purchases / subscriptions follow store guidelines exactly

### Failure Conditions

- Push notifications not working = score capped at 2
- Deep links crash or show wrong content = score capped at 2
- Widget crashes or shows stale data = score capped at 3
- Background activity drains battery excessively = score capped at 2
- Permission requests without context = score capped at 3

Score < 3 --> Platform integration is basic functionality. Fix before focusing on features.

---

## 8. CROSS-PLATFORM CONSISTENCY

**Question:**
Do iOS and Android apps provide equivalent functionality with platform-appropriate patterns?

### Scoring Guide

- **5** -- Full feature parity between platforms. Each platform uses native patterns (no forced iOS patterns on Android or vice versa). Consistent data model and business logic. Platform-specific features leveraged (e.g., Material You theming on Android, SF Symbols on iOS). Release cadence synchronized. Bug parity maintained.
- **4** -- Feature parity for all core features. Platform patterns mostly followed. Minor features may differ by platform. Release cadence within 1 sprint of each other.
- **3** -- Most features available on both platforms. Some platform pattern violations. Release cadence differs by 2+ sprints. Some bugs platform-specific.
- **2** -- Significant feature gaps between platforms. One platform clearly favored. Non-native patterns common. Release cadence very different.
- **1** -- Major feature gaps. One platform is clearly an afterthought. Non-native feel on at least one platform.

### Cross-Platform Consistency Checklist

- [ ] Feature matrix maintained (what is available on each platform)
- [ ] Feature parity for all tier-1 features
- [ ] Navigation pattern appropriate per platform (not forced)
- [ ] Typography uses platform system fonts (SF Pro / Roboto) or has strong justification
- [ ] Iconography matches platform style (SF Symbols / Material Icons)
- [ ] Date/time/number formatting uses platform locale
- [ ] Shared business logic (if cross-platform framework) properly separated from UI
- [ ] Platform-specific UI layer uses native components where possible
- [ ] Back button / navigation gesture behavior correct per platform
- [ ] System settings respected (text size, reduce motion, bold text)
- [ ] Store listing quality equivalent on both platforms
- [ ] Crash-free rate comparable across platforms
- [ ] Performance comparable across platforms (adjusted for device tier)
- [ ] Automated tests cover both platforms
- [ ] Release notes maintained per platform

### Failure Conditions

- Major feature missing on one platform without timeline = score capped at 2
- iOS navigation patterns forced onto Android (or vice versa) = score capped at 3
- Release cadence difference > 1 month = score capped at 3
- Crash rate 2x higher on one platform = score capped at 2
- Performance 2x worse on one platform = score capped at 2

Score < 3 --> Platform parity review. Equalize feature set and quality.

---

## COMPOSITE SCORING

### Score Calculation

| Dimension | Weight | Hard Fail? |
|-----------|--------|------------|
| Performance | 15% | YES |
| UX Quality | 15% | YES |
| Offline Capability | 10% | No |
| Release Quality | 15% | YES |
| Security | 15% | YES |
| Code Quality | 10% | No |
| Platform Integration | 10% | No |
| Cross-Platform Consistency | 10% | No |

### Grade Thresholds

| Grade | Score Range | Meaning |
|-------|------------|---------|
| A | 4.5 - 5.0 | Ship with confidence. Exemplary mobile quality. |
| B | 4.0 - 4.4 | Ship. Minor improvements tracked in backlog. |
| C | 3.0 - 3.9 | Conditional. Ship only with signed-off improvement plan. |
| D | 2.0 - 2.9 | Do not ship. Stabilization required. |
| F | < 2.0 | Critical. Major rework required. |

### Blocking Rules

- Any hard-fail dimension < 3 = cannot submit to app stores regardless of average
- Average < 3.5 = cannot submit to app stores
- Grade C = submit only with VP sign-off and remediation timeline
- Grade D or F = no submission until stabilization complete

---

## SCORING TEMPLATE

```
## Mobile Score: [App Name]
## Date: YYYY-MM-DD
## Scored By: [Name]
## Platform: [iOS / Android / Both]
## Version: [X.Y.Z]

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Performance | | |
| UX Quality | | |
| Offline Capability | | |
| Release Quality | | |
| Security | | |
| Code Quality | | |
| Platform Integration | | |
| Cross-Platform Consistency | | |

**Weighted Average:** X.X
**Grade:** [A/B/C/D/F]
**Hard Fail Triggered:** [Yes/No -- which dimension]

### Top 3 Issues
1. [Issue -- severity -- owner -- deadline]
2. [Issue -- severity -- owner -- deadline]
3. [Issue -- severity -- owner -- deadline]

### Device Testing Matrix
| Device | OS Version | Result |
|--------|-----------|--------|
| [Low-end target] | | |
| [Mid-range target] | | |
| [Flagship] | | |

### Sign-off
- [ ] Developer reviewed
- [ ] QA reviewed
- [ ] Design reviewed
```

---

## WHEN TO SCORE

- Before every app store submission
- After major feature additions
- After architecture changes
- After performance optimization work
- Monthly for live apps (using production metrics)
- After any crash rate spike

---

**Mobile quality is binary in the user's mind: the app either works or it does not.**
**This scoring system ensures it works. No exceptions.**
