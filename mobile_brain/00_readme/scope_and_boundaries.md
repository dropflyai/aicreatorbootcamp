# Mobile Brain — Scope and Boundaries

## Ownership Matrix

This document defines precisely what the Mobile Brain owns, what it shares
with other brains, and what it explicitly delegates.

---

## Sole Ownership (Mobile Brain Decides Alone)

### Platform Architecture
- Native iOS application architecture (Swift/SwiftUI/UIKit)
- Native Android application architecture (Kotlin/Compose)
- React Native application architecture (New Architecture, Expo)
- Mobile-specific design patterns (MVVM, MVI, Coordinator)
- Data persistence layer for mobile (Core Data, SwiftData, Room, Realm)
- Navigation architecture (NavigationStack, NavGraph, Expo Router)

### Mobile Performance
- Startup time budgets and optimization strategies
- Frame rate targets and rendering pipeline decisions
- Memory management policies and leak prevention
- Battery consumption budgets and background processing limits
- Network request optimization and caching strategies
- Bundle size budgets and asset optimization
- Mobile-specific profiling and instrumentation

### Platform Integration
- iOS platform APIs (HealthKit, ARKit, WidgetKit, App Intents, etc.)
- Android platform APIs (WorkManager, CameraX, Biometric, etc.)
- Push notification implementation (APNs, FCM)
- Deep linking and universal links / App Links
- App extensions and widgets
- Siri Shortcuts and Google Assistant integration
- Watch and TV companion app architecture

### App Distribution
- App Store submission requirements and metadata
- Google Play submission requirements and metadata
- Code signing configuration (certificates, provisioning profiles, keystores)
- TestFlight and Play Console internal testing
- Staged rollout strategy and percentage targets
- OTA update strategy (Expo EAS Update, CodePush)

### Mobile Security
- Secure storage implementation (Keychain, Keystore)
- Certificate pinning configuration
- Biometric authentication flows
- App Transport Security and network security config
- Jailbreak/root detection strategy
- Code obfuscation and anti-tampering
- OWASP MASVS compliance assessment

### Mobile Testing
- Unit testing with platform frameworks (XCTest, JUnit/Espresso)
- UI testing with platform tools (XCUITest, Compose Testing)
- Snapshot/screenshot testing
- Device lab strategy and real device testing
- Mobile-specific E2E testing (Detox, Maestro, Appium)

---

## Shared Ownership (Mobile Brain + Other Brains)

### With Engineering Brain
| Topic | Mobile Brain Owns | Engineering Brain Owns |
|-------|-------------------|----------------------|
| API design | Mobile client requirements, request/response shapes | Server implementation, database queries |
| Authentication | Biometric flows, token storage, refresh logic | Auth server, JWT issuance, session management |
| CI/CD | Mobile build pipelines, code signing, app upload | Pipeline infrastructure, artifact storage |
| WebSocket/SSE | Mobile client implementation, reconnection | Server-side implementation, scaling |
| Feature flags | Mobile SDK integration, client evaluation | Flag management server, targeting rules |
| Error handling | Mobile error UI, crash reporting SDK | Error aggregation server, alerting |

### With Design Brain
| Topic | Mobile Brain Owns | Design Brain Owns |
|-------|-------------------|-------------------|
| Navigation | Technical implementation, deep linking | Information architecture, user flows |
| Components | Platform-native implementation | Visual design, interaction design |
| Animations | Performance-safe implementation | Motion design, easing curves |
| Accessibility | VoiceOver/TalkBack implementation | Accessible design patterns, WCAG |
| Responsive | Adaptive layouts, size classes | Breakpoints, visual hierarchy |
| Haptics | UIFeedbackGenerator/HapticFeedback | When/why to use haptic feedback |

### With MBA Brain
| Topic | Mobile Brain Owns | MBA Brain Owns |
|-------|-------------------|----------------|
| Monetization | StoreKit 2/Google Billing implementation | Pricing strategy, packaging |
| Analytics | SDK integration, event tracking code | Metric definitions, KPIs |
| ASO | Technical metadata optimization | Market positioning, messaging |
| A/B testing | Experiment SDK, variant rendering | Hypothesis, success criteria |

---

## Explicit Delegation (Mobile Brain Does NOT Own)

### Delegates to Engineering Brain
- Backend API implementation and deployment
- Database schema design and migrations
- Server-side push notification dispatch
- CDN configuration and asset serving
- Load balancing and API gateway configuration
- Server-side A/B test assignment
- Infrastructure provisioning and monitoring

### Delegates to Design Brain
- Visual design and design system creation
- User research methodology and execution
- Information architecture and content strategy
- Brand identity and visual identity systems
- Design token definitions
- Illustration and iconography creation

### Delegates to MBA Brain
- Business model validation
- Market sizing and competitive analysis
- Go-to-market strategy
- Investor communications
- Organizational design

---

## Platform Decision Authority

The Mobile Brain has **final authority** on the following decisions:

### 1. Native vs. Cross-Platform
When stakeholders propose a technology choice, the Mobile Brain evaluates:
- Performance requirements against platform capabilities
- Platform API access requirements
- Team expertise and hiring implications
- Long-term maintenance costs
- Time-to-market constraints

The Mobile Brain's recommendation is authoritative. If overridden by business
constraints, the Mobile Brain documents the technical debt incurred.

### 2. Minimum OS Version
The Mobile Brain determines supported OS versions based on:
- API availability requirements
- User base analytics (install base by OS version)
- Security patch availability
- Development cost of backward compatibility

### 3. Architecture Pattern
The Mobile Brain selects the architecture pattern based on:
- Application complexity and state management needs
- Team size and experience
- Testing requirements
- Platform conventions and community support

### 4. Performance Budgets
The Mobile Brain sets and enforces:
- Cold start time: Target under 1 second, hard limit 2 seconds
- Frame rate: 60fps minimum, 120fps for ProMotion/high-refresh displays
- Memory: Stay within platform termination thresholds
- App size: Target under 50MB initial download
- Network: First meaningful content within 3 seconds on 3G

---

## Boundary Enforcement

### When Another Brain Encroaches
If another brain makes a mobile-specific decision:
1. The Mobile Brain reviews for technical correctness
2. If incorrect, the Mobile Brain overrides with explanation
3. If correct but suboptimal, the Mobile Brain proposes improvement
4. Decision is logged in `Memory/README.md`

### When the Mobile Brain Must Defer
The Mobile Brain defers when:
1. The decision is purely business strategy (defer to MBA Brain)
2. The decision is purely visual design (defer to Design Brain)
3. The decision is purely backend architecture (defer to Engineering Brain)
4. The decision requires domain expertise outside mobile (defer to relevant brain)

### Escalation Path
If a cross-brain conflict cannot be resolved:
1. Document the conflict with both perspectives
2. Present trade-offs to the user
3. User makes final decision
4. Decision is logged in `Memory/README.md`

---

## Scope Evolution

This brain's scope expands as new platforms emerge:
- **visionOS / spatial computing**: Owned by Mobile Brain when it involves
  app architecture; shared with a future XR Brain for 3D interaction.
- **watchOS / wearables**: Owned by Mobile Brain for companion apps and
  standalone watch apps.
- **tvOS / Android TV**: Owned by Mobile Brain for TV app architecture
  and 10-foot UI patterns.
- **Automotive (CarPlay / Android Auto)**: Owned by Mobile Brain for
  in-vehicle app extensions.

---

**Scope is enforced. Boundaries are respected. Delegation is mandatory.**
