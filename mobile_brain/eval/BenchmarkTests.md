# Mobile Brain -- Benchmark Tests (Authoritative)

These benchmark scenarios test the Mobile Brain's ability to design, build, optimize,
and troubleshoot mobile applications at production quality. Each scenario must be
approached with the rigor of a senior mobile architect.

Mobile is not web. The constraints are harder. The users are less patient.
The platforms are opinionated. Demonstrate that you understand this.

---

## HOW TO USE THESE BENCHMARKS

1. Each scenario presents a realistic mobile development challenge
2. The Mobile Brain must produce a complete, actionable response
3. Responses are scored against the criteria listed with each scenario
4. Minimum passing score: meet ALL required criteria for the scenario
5. Scenarios are grouped by domain -- complete at least 3 from each group

---

## GROUP A: PERFORMANCE OPTIMIZATION

### Scenario A1: Scroll Performance Degradation

**Context:** An e-commerce app's product listing screen drops to 30fps when scrolling.
The list contains product image, title, price, rating (stars), and "Add to Cart" button.
Each cell has a drop shadow and rounded corners. The issue occurs on both iOS and Android
but is worse on Android mid-range devices.

**Challenge:** Diagnose the root cause and fix across both platforms.

**Required in response:**
- [ ] Systematic profiling approach (which tools, what to measure)
- [ ] Top 5 most likely causes ranked by probability
- [ ] Image loading analysis (size, format, caching, downsampling)
- [ ] View hierarchy analysis (overdraw, layer count, shadow rendering)
- [ ] Cell recycling verification (are cells being reused correctly?)
- [ ] iOS-specific fixes (diffable data sources, prefetching, layer rasterization)
- [ ] Android-specific fixes (RecyclerView optimization, ViewHolder pattern, DiffUtil)
- [ ] Before/after performance measurements to verify fix
- [ ] Prevention strategy (how to catch this in CI/testing)

---

### Scenario A2: Cold Start Optimization

**Context:** App cold start takes 4.2 seconds on a mid-range Android device and 3.1 seconds
on an iPhone 12. Startup involves: SDK initialization (analytics, crash reporting, push),
authentication token validation, API call for user profile, API call for home screen data,
and theme configuration. Users are abandoning during the splash screen.

**Challenge:** Reduce cold start to under 2 seconds on both platforms.

**Required in response:**
- [ ] Startup trace analysis approach
- [ ] Classification of each startup task (critical path vs deferrable)
- [ ] Parallelization strategy for independent startup tasks
- [ ] Lazy initialization plan for non-critical SDKs
- [ ] Network call optimization (can any be deferred or cached?)
- [ ] Android-specific: App Startup library, avoiding ContentProvider abuse
- [ ] iOS-specific: pre-main time optimization, dylib loading
- [ ] Measurement methodology (how to verify improvement is real)
- [ ] Target budget allocation (how the 2000ms is divided)

---

### Scenario A3: App Size Reduction

**Context:** App is 150MB (download size). Contains: 40MB of image assets, 30MB of
embedded ML model for on-device text recognition, 25MB from native libraries,
20MB from bundled fonts, and 35MB from the application binary and frameworks.
Store data shows users with < 256GB storage are not installing.

**Challenge:** Reduce app size to under 50MB without removing features.

**Required in response:**
- [ ] Analysis of each size category with specific reduction strategies
- [ ] Image optimization (format conversion, resolution strategy, on-demand download)
- [ ] ML model strategy (on-demand download, quantization, Core ML / TFLite optimization)
- [ ] Native library audit (do you need all of them? Strip debug symbols?)
- [ ] Font strategy (subset, system fonts, on-demand download)
- [ ] App Thinning (iOS) / App Bundle (Android) configuration
- [ ] On-demand resources / dynamic feature modules strategy
- [ ] Asset delivery strategy (what ships with the app vs downloads later)
- [ ] Size budget for each category in the target 50MB
- [ ] Validation approach (how to measure download size accurately)

---

### Scenario A4: Memory Leak Investigation

**Context:** After 15 minutes of normal use, the app's memory grows from 120MB to 400MB
and eventually receives a memory warning / OOM kill. The app has a chat feature with
real-time updates, an image gallery with full-screen viewing, and a map with custom
annotations. Problem reproduces on both platforms.

**Challenge:** Find and fix the memory leaks.

**Required in response:**
- [ ] Memory profiling methodology (Instruments, Android Profiler, LeakCanary)
- [ ] Common leak patterns to investigate (closures, delegates, observers, timers)
- [ ] Chat feature investigation (WebSocket reference, message accumulation, cell reuse)
- [ ] Image gallery investigation (full-res images retained, transition snapshots)
- [ ] Map investigation (annotation views, overlay renderers, location updates)
- [ ] iOS-specific: Instruments Allocations and Leaks workflow
- [ ] Android-specific: Memory Profiler heap dump analysis workflow
- [ ] Fix for each identified leak with code-level solution
- [ ] Prevention: tooling and CI checks to catch leaks early

---

### Scenario A5: Battery Drain Investigation

**Context:** Users report 15% battery drain per hour while the app is in use. App features:
real-time location tracking for a delivery driver app, background sync every 5 minutes,
WebSocket connection for live order updates, and map rendering with frequent location updates.

**Challenge:** Reduce battery drain to < 5% per hour during active use.

**Required in response:**
- [ ] Battery profiling approach (Energy Impact gauge, Battery Historian)
- [ ] Location tracking optimization (accuracy vs battery trade-off, batching, significant change)
- [ ] Background sync optimization (push vs pull, adaptive intervals)
- [ ] WebSocket management (heartbeat frequency, reconnection strategy, disconnect when idle)
- [ ] Map rendering optimization (reduce location update frequency, batch annotations)
- [ ] Network request batching and compression
- [ ] CPU utilization audit (any polling, busy loops, expensive computations on timer)
- [ ] Power budget allocation (how 5%/hour is distributed across features)

---

## GROUP B: ARCHITECTURE AND DESIGN

### Scenario B1: Offline-First Architecture for Field Service

**Context:** Field service technicians use a mobile app in areas with poor or no connectivity.
They need to: view assigned work orders, update work order status, take photos and attach
to work orders, collect customer signatures, record parts used from inventory.
Data must sync bidirectionally when connectivity returns. Multiple technicians might
update the same work order (e.g., during shift handoff).

**Challenge:** Design the complete offline-first architecture.

**Required in response:**
- [ ] Local database strategy (SQLite, Realm, Core Data, Room)
- [ ] Data model design (what is stored locally, schema)
- [ ] Sync engine architecture (queue-based, CRDT-based, or custom)
- [ ] Conflict resolution strategy for each data type (last write wins, merge, user choice)
- [ ] Photo/binary data sync strategy (separate from metadata, background upload)
- [ ] Queue management (ordering, retry, failure handling)
- [ ] Signature capture and storage approach
- [ ] Sync status UI (what the user sees about their data state)
- [ ] Data integrity verification (checksums, reconciliation)
- [ ] Testing strategy for offline scenarios (how to simulate in QA)

---

### Scenario B2: Cross-Platform Architecture Decision

**Context:** Startup building a social media app. Team of 4 mobile developers (2 iOS, 2 Android).
App features: feed with images/video, stories, messaging, camera with filters, push notifications.
Timeline: MVP in 3 months, feature parity in 6 months. Budget is limited.

**Challenge:** Recommend and justify the technology choice: native (Swift + Kotlin),
React Native, Flutter, or KMP (Kotlin Multiplatform).

**Required in response:**
- [ ] Evaluation matrix with weighted criteria
- [ ] Performance comparison for the specific features (camera, video, animations)
- [ ] Developer productivity analysis (team skill, hiring, onboarding)
- [ ] Code sharing potential vs platform-specific code ratio
- [ ] Third-party library ecosystem comparison
- [ ] Platform feature access (camera filters, ARKit/ARCore, push)
- [ ] Long-term maintenance cost projection
- [ ] Risk assessment for each option
- [ ] Clear recommendation with primary and fallback option
- [ ] Migration path if initial choice does not work out

---

### Scenario B3: Modular Architecture for Large App

**Context:** Monolithic mobile app has grown to 200+ screens, 500K lines of code, and
50+ developers across 8 feature teams. Build time is 25 minutes. Merge conflicts are
daily. Teams cannot release independently. Onboarding a new developer takes 2 weeks
just to understand the codebase.

**Challenge:** Design the modularization strategy.

**Required in response:**
- [ ] Module boundary strategy (by feature, by layer, or hybrid)
- [ ] Module dependency graph (what depends on what)
- [ ] Shared module design (networking, auth, design system, analytics)
- [ ] Navigation between modules (deep link router, coordinator pattern)
- [ ] Data sharing between modules (dependency injection, event bus, shared store)
- [ ] Build system configuration (Gradle modules, SPM packages, Xcode projects)
- [ ] Build time improvement projection
- [ ] Independent release capability (feature flags, module versioning)
- [ ] Migration plan from monolith (big bang vs incremental strangler)
- [ ] Team ownership model (which team owns which modules)

---

### Scenario B4: Real-Time Feature Architecture

**Context:** Building a ride-sharing app feature where passengers see the driver's
real-time location on a map. Requirements: location updates every 2 seconds,
smooth animation between location points, works on poor connectivity, battery
efficient for driver app, handles 10,000 concurrent rides in a region.

**Challenge:** Design the real-time location architecture from driver device to passenger screen.

**Required in response:**
- [ ] Driver-side: location capture, batching, and transmission strategy
- [ ] Transport protocol (WebSocket, MQTT, Server-Sent Events)
- [ ] Server-side: routing updates to the correct passenger
- [ ] Passenger-side: receiving and rendering updates
- [ ] Map animation (interpolation between location points for smooth movement)
- [ ] Poor connectivity handling (both driver and passenger side)
- [ ] Battery optimization for driver device (GPS accuracy, update frequency)
- [ ] Scalability considerations (10K concurrent rides)
- [ ] Failover behavior (what does passenger see if updates stop?)
- [ ] Testing approach (how to test real-time location in QA and CI)

---

### Scenario B5: Secure Mobile Architecture for Banking

**Context:** Building a mobile banking app. Requirements: account balance view,
fund transfers, bill payments, check deposit (camera), biometric login,
push notifications for transactions. Must meet FFIEC cybersecurity guidelines.

**Challenge:** Design the security architecture.

**Required in response:**
- [ ] Authentication architecture (biometric, PIN, MFA, session management)
- [ ] Secure communication (certificate pinning, mutual TLS)
- [ ] Local data encryption strategy (what is stored, how encrypted)
- [ ] Secure enclave / hardware-backed key usage
- [ ] Anti-fraud measures (device fingerprinting, behavioral analysis)
- [ ] Jailbreak/root detection and response strategy
- [ ] Secure coding practices specific to financial apps
- [ ] Screenshot / screen recording prevention
- [ ] Audit logging approach (client-side)
- [ ] Incident response for compromised devices
- [ ] Third-party SDK vetting process (data minimization)
- [ ] App Store distribution security (code signing, app attestation)

---

## GROUP C: PLATFORM-SPECIFIC CHALLENGES

### Scenario C1: iOS Widget Development

**Context:** News app wants to provide widgets showing top 3 headlines with images.
Widget should: update every 15 minutes, support small/medium/large sizes,
handle deep links to specific articles, work offline with cached data,
and match the app's visual design including dark mode.

**Challenge:** Design and plan the widget implementation.

**Required in response:**
- [ ] WidgetKit architecture (timeline provider, entry, view)
- [ ] Timeline strategy (how often to refresh, snapshot vs timeline)
- [ ] Data sharing between app and widget (App Groups, shared container)
- [ ] Image handling (pre-render vs load in widget, size constraints)
- [ ] Deep link design (URL scheme for each article)
- [ ] Offline behavior (cached data display, freshness indicator)
- [ ] Layout strategy for each widget size (what content at each size)
- [ ] Dark mode and Dynamic Type support
- [ ] Performance considerations (budget for timeline generation)
- [ ] Testing strategy (how to test widget in isolation)

---

### Scenario C2: Android Background Processing

**Context:** Photo backup app needs to upload user photos to the cloud in the background.
Requirements: upload continues when app is backgrounded, resume after device restart,
handle poor connectivity (pause and resume), show progress notification, respect
battery saver mode, work on Android 10+ with background restrictions.

**Challenge:** Design the background upload architecture that works within Android's restrictions.

**Required in response:**
- [ ] WorkManager implementation strategy (constraints, backoff, chaining)
- [ ] Foreground service for long-running uploads (notification requirement)
- [ ] Chunked upload with resume capability
- [ ] Connectivity change handling (pause on loss, resume on restore)
- [ ] Battery saver / Doze mode behavior
- [ ] Notification design (progress, pause/resume actions, completion)
- [ ] Photo selection strategy (what to upload, deduplication)
- [ ] Quota management (storage limits, user preferences)
- [ ] Error handling (server errors, storage full, permission revoked)
- [ ] Testing strategy for background scenarios

---

### Scenario C3: In-App Purchase Implementation

**Context:** Productivity app needs: monthly subscription ($9.99), annual subscription
($79.99), lifetime purchase ($199.99), and consumable credit packs.
Must handle: free trial (7 days for monthly, 30 days for annual), family sharing (iOS),
grace period for failed renewals, upgrade/downgrade between plans, and restore purchases.

**Challenge:** Design the complete IAP architecture.

**Required in response:**
- [ ] StoreKit 2 (iOS) implementation approach
- [ ] Google Play Billing Library implementation approach
- [ ] Server-side receipt validation architecture
- [ ] Subscription status management (active, expired, grace period, billing retry)
- [ ] Free trial implementation and abuse prevention
- [ ] Upgrade/downgrade proration handling
- [ ] Restore purchases flow
- [ ] Entitlement management (what the user has access to)
- [ ] UI/UX for paywall (pricing display, trial callout, comparison)
- [ ] Edge cases: refunds, chargebacks, family sharing, promotional offers
- [ ] Analytics: conversion funnel, trial conversion rate, churn
- [ ] Testing with sandbox/test accounts

---

### Scenario C4: Camera Feature with AR

**Context:** Furniture shopping app needs AR feature: user points camera at room,
selects furniture piece, places it in the room, can walk around to see from different
angles. Must work on devices without LiDAR (fallback experience). Include screenshot
and share capability.

**Challenge:** Design the AR placement feature.

**Required in response:**
- [ ] ARKit (iOS) / ARCore (Android) architecture
- [ ] Plane detection and surface classification
- [ ] 3D model format and loading strategy (USDZ, glTF)
- [ ] Model placement and anchor management
- [ ] LiDAR vs non-LiDAR experience (what changes, fallback behavior)
- [ ] Scale accuracy (furniture must look correct size)
- [ ] Lighting estimation for realistic rendering
- [ ] Performance management (frame rate, thermal throttling)
- [ ] Screenshot capture with AR content
- [ ] Share functionality (image with AR overlay, deep link to product)
- [ ] Device compatibility matrix and fallback for unsupported devices
- [ ] User onboarding for AR (coaching overlay, prompts)

---

### Scenario C5: Push Notification Strategy

**Context:** Food delivery app sends: order status updates, promotional offers,
driver approaching alerts, and daily lunch recommendations. Users complain about
too many notifications. Opt-out rate is 40%. iOS notification delivery rate is 60%.
Android notification delivery rate is 85%.

**Challenge:** Fix the notification strategy to improve engagement and delivery.

**Required in response:**
- [ ] Notification categorization (transactional vs promotional vs real-time)
- [ ] Per-category priority and delivery strategy
- [ ] iOS notification delivery optimization (priority, push type, relevance score)
- [ ] Android notification channel design (names, importance levels, defaults)
- [ ] Notification grouping strategy (when to bundle, when to send individually)
- [ ] Timing optimization (when to send promotional notifications)
- [ ] Rich notification design (images, action buttons, expandable)
- [ ] In-app notification preferences UI design
- [ ] Server-side notification throttling and deduplication
- [ ] A/B testing framework for notification content
- [ ] Metrics to track (delivery rate, open rate, opt-out rate, conversion)
- [ ] Re-engagement strategy for users who disabled notifications

---

## GROUP D: TESTING AND QUALITY

### Scenario D1: E2E Test Framework Setup

**Context:** App has no automated UI tests. 50 critical user flows. Release cycle is
biweekly. Manual regression takes 3 days with 2 QA engineers. Regressions ship
every other release. Team wants automated E2E tests.

**Challenge:** Design and plan the E2E test framework.

**Required in response:**
- [ ] Framework selection (XCTest UI, Espresso, Detox, Maestro, Appium) with justification
- [ ] Test architecture (page objects, screen robots, test fixtures)
- [ ] Test data strategy (seeded data, API mocking, isolated environments)
- [ ] Which flows to automate first (risk-based prioritization)
- [ ] CI/CD integration (when tests run, parallelization, device farms)
- [ ] Flaky test mitigation strategy
- [ ] Test reporting and failure triage process
- [ ] Maintenance strategy (who updates tests when UI changes)
- [ ] Timeline to cover all 50 critical flows
- [ ] Cost analysis (device farm costs, CI time)

---

### Scenario D2: Crash Investigation and Resolution

**Context:** After latest release, crash rate jumped from 0.1% to 2.5%.
Top crash: NSInternalInconsistencyException / IllegalStateException in the feed screen.
Crash happens when user scrolls the feed and receives a push notification simultaneously.
Cannot reproduce locally.

**Challenge:** Diagnose and resolve without being able to reproduce locally.

**Required in response:**
- [ ] Crash report analysis methodology (symbolication, stack trace reading)
- [ ] Hypothesis formation from crash signature
- [ ] Thread safety analysis (is data being accessed from multiple threads?)
- [ ] Push notification handler + UI update race condition investigation
- [ ] Collection mutation during enumeration investigation
- [ ] Logging strategy to gather more data (without another release)
- [ ] Fix approach (thread safety, dispatch to main, synchronization)
- [ ] Verification strategy (how to confirm fix without local reproduction)
- [ ] Hotfix release plan (can we expedite?)
- [ ] Prevention: static analysis and threading tools to catch this class of bug

---

### Scenario D3: Accessibility Audit

**Context:** App has never been audited for accessibility. Legal has raised concerns
about ADA compliance. App has 30 screens with various interactive components:
custom chart views, swipeable cards, draggable items, video player with custom controls.

**Challenge:** Conduct the accessibility audit and create a remediation plan.

**Required in response:**
- [ ] Audit methodology (manual + automated, which tools)
- [ ] Screen reader testing workflow (VoiceOver, TalkBack)
- [ ] Common issues to check per component type
- [ ] Custom view accessibility implementation (charts, swipeable, draggable)
- [ ] Video player accessibility (captions, audio descriptions, controls)
- [ ] Prioritization framework for fixes (legal risk, user impact, effort)
- [ ] Remediation timeline (quick wins, medium effort, hard problems)
- [ ] Testing verification (how to confirm fixes work)
- [ ] Ongoing accessibility testing integration (CI, PR review checklist)
- [ ] WCAG 2.1 AA compliance gap analysis

---

## GROUP E: RELEASE AND OPERATIONS

### Scenario E1: App Store Rejection Resolution

**Context:** iOS app rejected for: "Guideline 4.0 - Design: Your app's name displayed
on the App Store and visible on the device differs from the app bundle name." and
"Guideline 2.1 - Information Needed: We were unable to locate the account credentials
needed to review your app." Third submission attempt. Review time is 48 hours.
Marketing launch is in 5 days.

**Challenge:** Resolve the rejection and get approved within the timeline.

**Required in response:**
- [ ] Root cause for each rejection reason
- [ ] Specific fix for naming discrepancy (Info.plist, App Store Connect)
- [ ] Demo account preparation (what to include, how to present)
- [ ] App Review information field optimization
- [ ] Resolution Center response strategy (what to write)
- [ ] Expedited review request approach (when appropriate)
- [ ] Pre-submission checklist to prevent future rejections
- [ ] Timeline with buffer for potential second rejection

---

### Scenario E2: Production Monitoring Setup

**Context:** App is launching in 2 weeks. No production monitoring exists.
App is cross-platform (React Native) with a Node.js backend. Need: crash reporting,
performance monitoring, user analytics, and alerting.

**Challenge:** Set up complete production monitoring before launch.

**Required in response:**
- [ ] Crash reporting tool selection and setup (Firebase Crashlytics, Sentry, Bugsnag)
- [ ] Performance monitoring setup (startup, network, rendering)
- [ ] User analytics setup (screens, events, funnels, retention)
- [ ] Real-time dashboard design (what to show on launch day)
- [ ] Alert configuration (crash rate spike, performance degradation, error rate)
- [ ] Release health monitoring (compare to previous version)
- [ ] User session replay (if appropriate for the app)
- [ ] Backend monitoring integration (correlate client issues with server issues)
- [ ] Privacy compliance (what data is collected, GDPR/CCPA)
- [ ] Launch day war room plan (who watches what, escalation)

---

### Scenario E3: React Native to Native Migration

**Context:** React Native app has grown to 100 screens. Performance issues on complex
screens (chart dashboard, video editing). Bundle size is 45MB (JavaScript bundle alone).
Hiring React Native developers is difficult in the company's location.
Decision made to incrementally migrate to native.

**Challenge:** Design the incremental migration strategy.

**Required in response:**
- [ ] Migration approach (strangler fig, module by module, screen by screen)
- [ ] Brownfield architecture (React Native + native coexistence)
- [ ] Navigation bridge (how native and RN screens navigate to each other)
- [ ] Data sharing between native and RN modules (shared state, event bridge)
- [ ] Migration priority (which screens/features first, based on what criteria)
- [ ] Team restructuring plan (upskilling, hiring, knowledge transfer)
- [ ] Testing strategy during migration (both RN and native tests)
- [ ] Timeline and milestones (realistic, with validation gates)
- [ ] Risk mitigation (what if migration stalls? Rollback plan?)
- [ ] Success metrics (performance improvement, developer velocity, crash rate)

---

## SCORING GUIDE

### Per-Scenario Scoring

| Criteria | Points |
|----------|--------|
| All required items addressed | 40 |
| Technical accuracy and platform awareness | 20 |
| Specificity (named APIs, real measurements, actual code patterns) | 15 |
| Trade-off analysis (why this approach over alternatives) | 10 |
| User impact awareness (how does this affect the end user) | 10 |
| Testing and validation approach | 5 |

### Passing Threshold

- Individual scenario: >= 70 points
- Overall benchmark: >= 75% of scenarios passed
- No GROUP with 0 passes

### Disqualifying Responses

- Web-centric solutions that ignore mobile constraints
- Ignoring platform differences (treating iOS and Android as identical)
- No mention of performance implications
- No mention of battery impact for background features
- Recommending deprecated APIs
- Solutions that violate app store guidelines

---

**Mobile development is not web development on a smaller screen. These benchmarks verify you understand the difference.**
