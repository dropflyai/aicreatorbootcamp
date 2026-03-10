# Cross-Platform Strategy

## Foundational Reference

The native-vs-cross-platform decision is the highest-stakes architectural
choice in mobile development. It determines hiring strategy, development
velocity, user experience quality, platform API access, and maintenance
cost for years. This module provides the decision framework.

References: React Native documentation, Expo documentation, Flutter
documentation, Kotlin Multiplatform documentation, Airbnb's "Sunsetting
React Native" analysis, Discord's migration to React Native, Shopify's
React Native adoption case study.

---

## The Decision Framework

The choice is not binary. There are five distinct strategies, each with
different trade-off profiles:

```
┌──────────────────────────────────────────────────────────────────┐
│                    PLATFORM STRATEGY SPECTRUM                     │
│                                                                   │
│  Full Native ◄──── Shared Logic ──── Shared UI ────► Full XP    │
│                                                                   │
│  iOS: Swift       KMP              React Native      Flutter     │
│  Android: Kotlin  (shared biz      Expo              (custom     │
│                    logic, native    (shared JS UI     rendering   │
│                    UI per platform) + native modules) engine)     │
└──────────────────────────────────────────────────────────────────┘
```

---

## Strategy 1: Full Native

### Description
Separate codebases for each platform. iOS in Swift/SwiftUI, Android in
Kotlin/Compose. Zero code sharing between platforms.

### Architecture
```
┌──────────────────┐     ┌──────────────────┐
│    iOS App       │     │   Android App    │
│  Swift/SwiftUI   │     │  Kotlin/Compose  │
│                  │     │                  │
│  ┌────────────┐  │     │  ┌────────────┐  │
│  │    UI      │  │     │  │    UI      │  │
│  ├────────────┤  │     │  ├────────────┤  │
│  │ ViewModels │  │     │  │ ViewModels │  │
│  ├────────────┤  │     │  ├────────────┤  │
│  │  Domain    │  │     │  │  Domain    │  │
│  ├────────────┤  │     │  ├────────────┤  │
│  │   Data     │  │     │  │   Data     │  │
│  └────────────┘  │     │  └────────────┘  │
└──────────────────┘     └──────────────────┘
    Fully independent       Fully independent
```

### Advantages
- **Best platform fidelity**: Apps feel perfectly native on each platform.
  Navigation, animations, haptics, and interactions match platform
  conventions exactly.
- **Full API access**: Immediate access to new platform features on launch
  day. No waiting for framework wrapper support.
- **Best performance**: No bridge overhead, no intermediate rendering layer.
  Direct access to platform rendering pipeline.
- **Platform-specific talent**: iOS and Android engineers work in their
  primary language and toolchain.
- **Independent release cycles**: Each platform can ship independently
  based on platform-specific priorities.

### Disadvantages
- **Double development cost**: Every feature is implemented twice. Every bug
  may need to be fixed twice.
- **Divergent behavior**: Without careful coordination, platforms develop
  different behaviors, different bugs, and different feature sets.
- **Larger team required**: Need at minimum one iOS and one Android engineer.
  At scale, need two platform teams.
- **Synchronization overhead**: Keeping feature parity requires deliberate
  coordination and shared specifications.

### When to Choose Full Native
- Performance-critical applications (games, video editing, AR)
- Applications deeply integrated with platform APIs (HealthKit, ARKit, etc.)
- Organizations with established platform teams
- Consumer apps where platform UX quality is a competitive differentiator
- Apps requiring day-one support for new OS features

---

## Strategy 2: Kotlin Multiplatform (KMP)

### Description
Share business logic, networking, and data layers in Kotlin across iOS and
Android. UI remains fully native (SwiftUI on iOS, Compose on Android).

### Architecture
```
┌──────────────────┐     ┌──────────────────┐
│    iOS App       │     │   Android App    │
│    SwiftUI       │     │  Jetpack Compose │
│  ┌────────────┐  │     │  ┌────────────┐  │
│  │  iOS UI    │  │     │  │ Android UI │  │
│  └──────┬─────┘  │     │  └──────┬─────┘  │
│         │        │     │         │        │
└─────────┼────────┘     └─────────┼────────┘
          │                        │
    ┌─────┴────────────────────────┴─────┐
    │        Shared Kotlin Module        │
    │                                    │
    │  ┌────────────────────────────┐   │
    │  │     Domain / Use Cases     │   │
    │  ├────────────────────────────┤   │
    │  │   Repository Interfaces    │   │
    │  ├────────────────────────────┤   │
    │  │    Networking (Ktor)       │   │
    │  ├────────────────────────────┤   │
    │  │   Database (SQLDelight)    │   │
    │  └────────────────────────────┘   │
    └────────────────────────────────────┘
```

### Advantages
- **Native UI on both platforms**: UI layer is fully platform-native with
  zero compromise on look, feel, or behavior.
- **Shared business logic**: Domain rules, validation, networking, and data
  mapping are implemented once and tested once.
- **Gradual adoption**: Can introduce KMP into existing native projects
  one module at a time. No rewrite required.
- **Kotlin expertise transfers**: Android developers already know Kotlin.
  iOS developers can learn Kotlin relatively quickly.

### Disadvantages
- **iOS interop complexity**: Kotlin/Native has limitations: no generics
  in exported Objective-C headers (improving with SKIE), custom memory
  model considerations, Swift interop still evolving.
- **Smaller ecosystem**: Fewer multiplatform libraries than React Native
  or Flutter. Some common needs require expect/actual implementations.
- **Build complexity**: Gradle multiplatform builds are slower and more
  complex than single-platform builds.
- **Debugging across platforms**: Debugging shared code when called from
  Swift requires additional tooling (Xcode-Kotlin plugin).

### When to Choose KMP
- Teams with strong native platform engineers who want code sharing
- Applications where UI must be pixel-perfect native on both platforms
- Projects that already have native codebases and want to reduce duplication
- Business logic-heavy applications (banking, logistics, enterprise)

---

## Strategy 3: React Native / Expo

### Description
Single JavaScript/TypeScript codebase renders platform-native UI components
on both iOS and Android. Expo provides a managed development experience
with cloud build services.

### Architecture
```
┌────────────────────────────────────────────────┐
│              React Native App                   │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │          TypeScript / React               │  │
│  │  Components, Hooks, State Management      │  │
│  └────────────────────┬─────────────────────┘  │
│                       │                         │
│  ┌────────────────────┼─────────────────────┐  │
│  │           New Architecture                │  │
│  │  ┌─────────┐  ┌────────┐  ┌───────────┐ │  │
│  │  │  Fabric │  │  JSI   │  │ Turbo     │ │  │
│  │  │Renderer │  │(bridge)│  │ Modules   │ │  │
│  │  └────┬────┘  └────┬───┘  └─────┬─────┘ │  │
│  └───────┼────────────┼────────────┼────────┘  │
│          │            │            │            │
│  ┌───────┴────────────┴────────────┴────────┐  │
│  │     iOS Native        Android Native      │  │
│  │  UIKit/SwiftUI       View/Compose         │  │
│  └──────────────────────────────────────────┘  │
└────────────────────────────────────────────────┘
```

### Advantages
- **Single codebase**: One team, one codebase, simultaneous platform delivery.
  Typically 85-95% code sharing in practice.
- **Web technology familiarity**: React/TypeScript developers can build mobile
  apps. Largest potential hiring pool.
- **Hot reloading**: Instant development feedback loop. Change code, see
  results immediately without recompilation.
- **OTA updates**: Push JavaScript bundle updates without app store review
  (via Expo EAS Update or CodePush). Critical for fast iteration.
- **Expo ecosystem**: Managed workflow eliminates native build complexity.
  EAS Build handles code signing, provisioning, and compilation.

### Disadvantages
- **Performance ceiling**: JavaScript execution and bridge communication add
  overhead. Not suitable for 60fps animations with complex state updates
  (New Architecture mitigates this significantly).
- **Platform API lag**: New iOS/Android features require React Native or
  community module support. Typically weeks to months after platform launch.
- **Native debugging complexity**: Debugging issues that span JS and native
  layers requires expertise in both worlds.
- **Large app size**: React Native adds ~7-15MB to the base app bundle
  for the JavaScript engine and runtime.
- **Uncanny valley risk**: Without careful platform-specific styling,
  apps can feel "not quite native" on both platforms.

### When to Choose React Native / Expo
- Startups and small teams that need to ship on both platforms fast
- Content-driven apps (social media, e-commerce, news, messaging)
- Teams with strong React/TypeScript expertise
- Products where iteration speed matters more than platform perfection
- Apps that benefit from OTA updates for rapid deployment

---

## Strategy 4: Flutter

### Description
Google's UI toolkit that renders directly to a canvas using its own Skia/
Impeller rendering engine. Widgets are not native platform components —
they are custom-drawn to match platform conventions.

### Advantages
- **Pixel-perfect consistency**: Same rendering on both platforms because
  Flutter draws every pixel itself.
- **High performance**: Dart compiles to native ARM code. Rendering engine
  bypasses platform UI framework overhead.
- **Rich widget library**: Material and Cupertino widget sets included.
  Extensive customization capabilities.
- **Hot reload**: Sub-second development feedback loop.

### Disadvantages
- **Not truly native**: Widgets are drawn by Flutter's engine, not by the
  platform's native UI framework. Subtle differences from native apps
  in scrolling physics, text selection, and accessibility.
- **Dart language**: Smaller developer pool than JavaScript/TypeScript or
  Kotlin/Swift. Dart is not widely used outside Flutter.
- **Platform integration complexity**: Accessing platform APIs requires
  platform channels (async communication between Dart and native code).
- **Large initial bundle**: Flutter engine adds ~5-8MB to the app.
- **iOS/Android updates**: New platform features require Flutter engine
  updates, which may lag behind platform releases.

### When to Choose Flutter
- Applications requiring consistent UI across platforms (brand apps, kiosks)
- Teams willing to invest in Dart expertise
- Visually rich applications with custom rendering needs
- Projects where platform-native feel is less important than visual
  consistency

---

## Decision Matrix

| Factor | Native | KMP | React Native/Expo | Flutter |
|--------|--------|-----|-------------------|---------|
| **Performance** | Best | Best (native UI) | Good (New Arch) | Very Good |
| **Platform fidelity** | Perfect | Perfect | Good | Fair |
| **Code sharing** | 0% | 50-70% | 85-95% | 95%+ |
| **Development speed** | Slow (2x) | Medium | Fast | Fast |
| **Team size needed** | 2+ per platform | 2+ (shared + native) | 1-3 full-stack | 1-3 Dart devs |
| **New API access** | Day 1 | Day 1 (UI layer) | Weeks-months | Weeks-months |
| **OTA updates** | No | No | Yes (Expo) | No (Shorebird) |
| **Hiring pool** | Large per platform | Medium (Kotlin) | Largest (JS/TS) | Small (Dart) |
| **App size overhead** | 0 | ~2-3MB | ~7-15MB | ~5-8MB |
| **Maintenance cost** | High (2 codebases) | Medium | Low-Medium | Low-Medium |
| **Testing** | Platform-specific | Shared + platform | Mostly shared | Mostly shared |
| **Maturity** | Decades | Growing (since 2023) | Mature (since 2015) | Mature (since 2018) |

---

## Decision Algorithm

Use this flowchart to determine the recommended strategy:

```
START
  │
  ├── Does the app require heavy platform-specific APIs?
  │   (AR, HealthKit, advanced camera, Bluetooth LE, Widgets)
  │   │
  │   ├── YES ──► Is the budget for 2 native teams available?
  │   │           │
  │   │           ├── YES ──► FULL NATIVE
  │   │           └── NO ───► KMP (shared logic, native UI)
  │   │
  │   └── NO ──► Is platform-perfect UX a competitive requirement?
  │               │
  │               ├── YES ──► Is the team Kotlin/Swift-skilled?
  │               │           │
  │               │           ├── YES ──► KMP
  │               │           └── NO ───► REACT NATIVE (with care)
  │               │
  │               └── NO ──► Is the team React/TypeScript-skilled?
  │                           │
  │                           ├── YES ──► REACT NATIVE / EXPO
  │                           └── NO ───► Is visual consistency paramount?
  │                                       │
  │                                       ├── YES ──► FLUTTER
  │                                       └── NO ───► REACT NATIVE / EXPO
```

---

## Migration Strategies

### Moving FROM Cross-Platform TO Native
1. **Identify platform-specific pain points**: Which features suffer most
   from the cross-platform abstraction?
2. **Migrate feature-by-feature**: Use native modules/screens within the
   cross-platform shell. Gradually replace cross-platform screens.
3. **Shared API layer**: Keep backend API contracts stable during migration.
4. **Timeline**: Plan 6-12 months for a full migration. Airbnb's RN
   sunsetting took approximately one year.

### Moving FROM Native TO Cross-Platform
1. **Start with a new feature**: Build the next major feature in the target
   framework within the existing native app.
2. **Shared data layer first**: Migrate networking, caching, and data models
   before touching UI.
3. **Screen-by-screen migration**: Replace native screens one at a time.
4. **Maintain native escape hatches**: Keep the ability to drop into native
   code for platform-specific needs.

---

## Cost Model

### Year 1 Development Cost (Relative)
| Strategy | Engineering Cost | Infrastructure Cost | Total |
|----------|-----------------|-------------------|-------|
| Full Native | 2.0x | 1.0x | 2.0x |
| KMP | 1.4x | 1.1x | 1.4x |
| React Native/Expo | 1.0x | 1.0x | 1.0x (baseline) |
| Flutter | 1.0x | 1.0x | 1.0x |

### Year 2-5 Maintenance Cost (Relative)
| Strategy | Ongoing Dev | Platform Updates | Dependency Risk | Total |
|----------|------------|-----------------|-----------------|-------|
| Full Native | 2.0x | Low risk | Low | 1.8x |
| KMP | 1.3x | Low risk | Medium | 1.3x |
| React Native | 1.0x | Medium risk | Medium | 1.1x |
| Flutter | 1.0x | Medium risk | Low-Medium | 1.0x |

---

## The Mobile Brain's Recommendation Protocol

When asked to recommend a platform strategy, the Mobile Brain:

1. **Gathers constraints**: Platform API needs, performance requirements,
   team skills, timeline, budget, expected app lifetime.
2. **Runs the decision algorithm**: Follows the flowchart above.
3. **Documents trade-offs**: Explicitly states what is gained and what is
   lost with the recommendation.
4. **Provides escape hatches**: Identifies how to migrate if the choice
   proves wrong.
5. **Logs the decision**: Records in `Memory/README.md` for future reference.

---

**The platform decision shapes years of work. Decide with data, not dogma.**
