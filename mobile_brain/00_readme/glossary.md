# Mobile Brain — Glossary

## Canonical Mobile Terminology

This glossary defines terms as used within the Mobile Brain. When a term
appears in any Mobile Brain document, its meaning is exactly as defined here.
Ambiguity is not tolerated.

---

## Architecture Terms

**Clean Architecture**
: An architectural pattern (Robert C. Martin) organizing code into concentric
  layers: Entities, Use Cases, Interface Adapters, and Frameworks/Drivers.
  Dependencies point inward. The domain layer has zero knowledge of UI or
  platform frameworks. In mobile, this means ViewModels never import UIKit
  or Android framework classes directly.

**MVC (Model-View-Controller)**
: Apple's original recommended pattern for UIKit. The Controller mediates
  between Model and View. In practice, leads to "Massive View Controller"
  unless carefully decomposed. SwiftUI has largely obsoleted this pattern
  on iOS. Android never formally adopted MVC.

**MVVM (Model-View-ViewModel)**
: The dominant architecture for declarative UI frameworks (SwiftUI, Compose).
  The ViewModel exposes observable state that the View binds to. The View
  is a pure function of state. The Model encapsulates business logic and
  data. MVVM enables testable, preview-friendly code.

**MVI (Model-View-Intent)**
: A unidirectional data flow pattern where user actions (Intents) are
  processed by a reducer to produce new State, which the View renders.
  Similar to Redux. Provides deterministic state management. Common in
  complex Android apps using Kotlin Flow or in React Native with Redux.

**Repository Pattern**
: An abstraction layer between the domain/business logic and the data
  source(s). The repository decides whether to fetch from network, local
  database, or in-memory cache. Consumers of the repository are agnostic
  to data origin. Critical for offline-first architectures.

**Coordinator Pattern**
: (Also: Router, Navigator) A pattern that extracts navigation logic from
  ViewControllers/Composables into dedicated coordinator objects. Prevents
  tight coupling between screens. Enables deep linking by allowing any
  coordinator to be activated programmatically.

**Dependency Injection (DI)**
: The practice of providing dependencies to objects rather than having them
  create their own. On iOS: typically constructor injection or environment
  objects in SwiftUI. On Android: Hilt/Dagger (compile-time) or Koin
  (runtime). In React Native: React Context or module-level injection.

---

## iOS-Specific Terms

**SwiftUI**
: Apple's declarative UI framework (introduced 2019). Views are structs
  conforming to the `View` protocol. State drives UI through property
  wrappers (`@State`, `@Binding`, `@ObservedObject`, `@StateObject`,
  `@EnvironmentObject`, `@Observable`). The framework handles diffing
  and re-rendering.

**UIKit**
: Apple's imperative UI framework. Based on `UIViewController` and `UIView`
  class hierarchies. Still required for certain advanced use cases
  (custom transitions, complex collection view layouts) and when supporting
  pre-SwiftUI deployment targets.

**Combine**
: Apple's reactive programming framework. Provides `Publisher` and
  `Subscriber` protocols for asynchronous event streams. Being gradually
  superseded by Swift's native async/await and AsyncSequence, but still
  essential for UIKit interop and certain SwiftUI bindings.

**async/await (Swift Concurrency)**
: Swift's structured concurrency model (introduced Swift 5.5). Provides
  `async` functions, `await` suspension points, `Task` for unstructured
  concurrency, `TaskGroup` for parallel execution, and `Actor` for
  thread-safe state isolation. The recommended approach for all new
  asynchronous code in Swift.

**Core Data**
: Apple's object graph and persistence framework. Provides managed object
  model, fetch requests, relationships, migrations, and iCloud sync via
  NSPersistentCloudKitContainer. Mature but complex.

**SwiftData**
: Apple's modern persistence framework (introduced 2023). Uses Swift macros
  (`@Model`) for schema definition. Simpler API than Core Data with
  automatic CloudKit sync. Recommended for new projects targeting iOS 17+.

**App Clips**
: Lightweight portions of an app (max 15MB) discoverable via NFC, QR codes,
  or Safari. Provide instant functionality without full app installation.
  Built with the App Clip target in Xcode.

**WidgetKit**
: Framework for building Home Screen, Lock Screen, and StandBy widgets.
  Widgets are timeline-based: the app provides a timeline of entries, and
  the system renders them at appropriate times. Built with SwiftUI.

**StoreKit 2**
: Apple's modern in-app purchase framework. Uses Swift concurrency with
  `Product`, `Transaction`, and `SubscriptionInfo` types. Handles purchase
  verification client-side with JWS. Replaces the original StoreKit API.

---

## Android-Specific Terms

**Jetpack Compose**
: Android's modern declarative UI toolkit (stable 2021). Composable
  functions annotated with `@Composable` describe UI as a function of state.
  Uses a custom Kotlin compiler plugin for efficient recomposition. The
  recommended approach for all new Android UI development.

**Kotlin Coroutines**
: Kotlin's structured concurrency framework. Provides `suspend` functions,
  `CoroutineScope`, `Dispatchers`, and `Job` for lifecycle-aware async
  work. `viewModelScope` and `lifecycleScope` provide Android-specific
  scopes that cancel automatically.

**Kotlin Flow**
: Kotlin's cold asynchronous stream API built on coroutines. `StateFlow`
  (hot, single value) and `SharedFlow` (hot, multiple values) are the
  primary types for UI state in Android. `collectAsState()` bridges
  Flow to Compose.

**Room**
: Android's SQLite abstraction layer from Jetpack. Uses annotations
  (`@Entity`, `@Dao`, `@Database`) to generate SQL at compile time.
  Supports Flow return types for reactive queries. Migration support
  with `AutoMigration` and manual `Migration` objects.

**ViewModel (Android)**
: Jetpack component that survives configuration changes (rotation, etc.).
  Holds UI state and business logic. Scoped to a `ViewModelStoreOwner`
  (Activity, Fragment, or NavBackStackEntry). Created via
  `viewModel()` composable or `ViewModelProvider`.

**WorkManager**
: Jetpack library for deferrable, guaranteed background work. Handles
  constraints (network, battery, storage), retry policies, and chaining.
  Uses JobScheduler, AlarmManager, or Firebase JobDispatcher depending
  on API level. The only recommended API for reliable background work.

**Hilt**
: Android's recommended dependency injection framework. Built on Dagger.
  Uses annotations (`@HiltAndroidApp`, `@AndroidEntryPoint`, `@Inject`,
  `@Module`, `@Provides`) for compile-time DI. Integrates with ViewModel,
  WorkManager, and Compose navigation.

**DataStore**
: Jetpack replacement for SharedPreferences. Two implementations:
  Preferences DataStore (key-value, like SharedPreferences) and Proto
  DataStore (typed objects via Protocol Buffers). Both use Kotlin
  coroutines and Flow for async, transactional data access.

---

## Cross-Platform Terms

**React Native New Architecture**
: The modern React Native runtime (enabled by default from RN 0.76+).
  Three components: JSI (JavaScript Interface) for synchronous native
  calls, Fabric for concurrent rendering, and TurboModules for lazy-loaded
  native modules. Replaces the async bridge.

**JSI (JavaScript Interface)**
: A C++ API enabling JavaScript to hold references to native C++ objects
  and invoke methods synchronously. Eliminates the JSON serialization
  overhead of the old bridge. Foundation of the New Architecture.

**Fabric**
: React Native's new rendering system. Enables concurrent rendering,
  synchronous layout (for gestures/animations), and direct C++ access to
  the shadow tree. Replaces the old async renderer.

**TurboModules**
: React Native's new native module system. Modules are lazily loaded and
  type-safe (via CodeGen from TypeScript/Flow specs). Supports synchronous
  and asynchronous calls via JSI. Replaces the old NativeModules bridge.

**Expo**
: A platform built on React Native providing managed and bare workflows.
  Expo SDK provides cross-platform modules (Camera, FileSystem, Notifications).
  EAS (Expo Application Services) provides cloud builds, OTA updates, and
  submission services.

**EAS Build**
: Expo's cloud build service. Compiles native iOS and Android binaries
  without requiring local Xcode or Android Studio. Supports custom native
  code, environment variables, and build profiles.

**EAS Update**
: Expo's over-the-air update service. Pushes JavaScript bundle updates
  to deployed apps without app store review. Supports channels, branches,
  and rollback. Critical for rapid iteration.

**Expo Router**
: File-system based routing for React Native (similar to Next.js). Provides
  deep linking, typed routes, and nested navigation from file structure.
  Built on React Navigation.

**Kotlin Multiplatform (KMP)**
: JetBrains technology for sharing Kotlin code across platforms. Compiles
  to JVM (Android), Native (iOS via Kotlin/Native), and JavaScript.
  Typically shares business logic and data layers while keeping UI native.

---

## Performance Terms

**Cold Start**
: App launch from a terminated state. The OS loads the process, initializes
  the runtime, and the app creates its initial UI. Target: under 1 second.
  Measured from process creation to first frame rendered.

**Warm Start**
: App launch when the process exists but the Activity/ViewController was
  destroyed. Faster than cold start because the runtime is already loaded.

**Hot Start**
: App returns to foreground from background. Fastest launch type. The app
  only needs to resume and update UI.

**Jank**
: Visible stutter or frame drops during scrolling or animation. Caused by
  main thread work exceeding the frame budget (16.67ms at 60fps, 8.33ms
  at 120fps). Measured in dropped frames or frozen frames.

**Time to Interactive (TTI)**
: The time from app launch until the user can meaningfully interact with
  the app. Includes not just first frame but also data loading and UI
  responsiveness.

**Bundle Size**
: The size of the compiled application binary. On iOS, measured as the
  IPA size and the App Store download size (which uses App Thinning).
  On Android, measured as APK size or AAB size (with Play Feature Delivery).

**App Thinning**
: Apple's technology for delivering optimized app variants. Includes
  slicing (device-specific resources), bitcode (server-side optimization),
  and on-demand resources (lazy-loaded assets).

---

## Security Terms

**Keychain (iOS)**
: Apple's secure credential storage. Encrypted, hardware-backed on devices
  with Secure Enclave. Supports access control policies (biometric,
  passcode, device unlock). The ONLY acceptable storage for tokens,
  passwords, and cryptographic keys on iOS.

**Keystore (Android)**
: Android's hardware-backed key storage. Generates and stores cryptographic
  keys in the Trusted Execution Environment (TEE) or StrongBox. Keys
  never leave the secure hardware. Used with EncryptedSharedPreferences
  for secure credential storage.

**Certificate Pinning**
: Validating that the server's TLS certificate matches a known certificate
  or public key embedded in the app. Prevents man-in-the-middle attacks
  even when the device's trust store is compromised. Implemented via
  URLSession delegate (iOS) or OkHttp CertificatePinner (Android).

**OWASP MASVS**
: Mobile Application Security Verification Standard. Defines security
  requirements at three levels: L1 (standard security), L2 (defense in
  depth for sensitive data), R (resilience against reverse engineering).

**Biometric Authentication**
: Authentication using Face ID, Touch ID (iOS) or fingerprint, face,
  iris (Android). On iOS, use `LAContext` from LocalAuthentication. On
  Android, use `BiometricPrompt` from Jetpack Biometric library.

---

## Distribution Terms

**ASO (App Store Optimization)**
: The process of optimizing an app's App Store/Play Store listing to
  maximize visibility and conversion rate. Includes keyword optimization,
  screenshot design, description copy, and ratings management.

**TestFlight**
: Apple's beta testing platform. Supports internal testing (up to 100
  testers, no review required) and external testing (up to 10,000
  testers, requires Beta App Review). Builds expire after 90 days.

**Staged Rollout**
: Releasing an app update to a percentage of users, increasing gradually.
  Google Play supports percentage-based staged rollouts natively. iOS
  supports phased release over 7 days. Critical for detecting issues
  before full deployment.

**Feature Flag**
: A runtime toggle that enables or disables functionality without
  deploying new code. Essential for staged feature rollouts, A/B testing,
  and kill switches. Implemented via remote config services (Firebase,
  LaunchDarkly, Statsig) or custom solutions.

---

**Terms are canonical. Usage is mandatory. Ambiguity is not tolerated.**
