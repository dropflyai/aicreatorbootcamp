# Mobile Application Lifecycle

## Foundational Reference

This module codifies the application lifecycle for iOS and Android platforms.
Understanding the lifecycle is not optional — mishandling lifecycle events
is the root cause of data loss, crashes, battery drain, and poor user
experience. Every mobile engineer must internalize these state machines.

References: Apple UIKit App Lifecycle, SwiftUI Scene Lifecycle, Android
Activity Lifecycle, Android Process Lifecycle, WWDC sessions on background
execution, Android Background Processing guide.

---

## iOS Application Lifecycle

### Scene-Based Lifecycle (iOS 13+)

Modern iOS apps use a scene-based lifecycle where each `UIWindowScene`
has its own state. A single app process can have multiple scenes (iPad
multitasking, multiple windows).

```
                    ┌───────────────┐
                    │  Unattached   │
                    │  (no scene)   │
                    └───────┬───────┘
                            │ scene(_:willConnectTo:)
                            ▼
                    ┌───────────────┐
         ┌─────────│   Foreground  │──────────┐
         │         │   Inactive    │          │
         │         └───────┬───────┘          │
         │                 │                  │
         │    sceneDidBecomeActive            │
         │                 │      sceneWillResignActive
         │                 ▼                  │
         │         ┌───────────────┐          │
         │         │   Foreground  │          │
         │         │    Active     │──────────┘
         │         └───────┬───────┘
         │                 │ sceneDidEnterBackground
         │                 ▼
         │         ┌───────────────┐
         └─────────│  Background   │
                   │               │
                   └───────┬───────┘
                           │ (system suspends)
                           ▼
                   ┌───────────────┐
                   │   Suspended   │
                   │ (in memory,   │
                   │  not running) │
                   └───────────────┘
```

### SwiftUI Lifecycle

SwiftUI abstracts the scene lifecycle through the `App` protocol and
`@Environment(\.scenePhase)`:

```swift
@main
struct MyApp: App {
    @Environment(\.scenePhase) private var scenePhase

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .onChange(of: scenePhase) { oldPhase, newPhase in
            switch newPhase {
            case .active:
                // App is in the foreground and interactive
                // Resume real-time updates, start animations
            case .inactive:
                // App is visible but not interactive
                // Pause timers, save transient state
            case .background:
                // App is not visible
                // Save state, release resources, schedule tasks
            @unknown default:
                break
            }
        }
    }
}
```

### Critical iOS Lifecycle Rules

1. **Save state in `sceneDidEnterBackground`**: The system may terminate the
   app at any time after backgrounding. There is no "will terminate" guarantee.
   All critical state must be persisted before background transition completes.

2. **Background execution is limited**: iOS grants approximately 30 seconds
   of background execution time. Request more with
   `UIApplication.beginBackgroundTask`. Long-running background modes
   (audio, location, VoIP) require explicit entitlement and App Store review.

3. **State restoration is your responsibility**: When the system terminates
   a backgrounded app, users expect to return to their previous state.
   Use `NSUserActivity`, scene configuration userInfo, or SwiftUI's
   `@SceneStorage` for state restoration.

4. **Memory pressure terminates background apps**: iOS terminates background
   apps to reclaim memory without notification. Design for stateless
   resurrection.

---

## Android Application Lifecycle

### Activity Lifecycle

Android's Activity lifecycle is more complex than iOS due to configuration
changes (rotation, locale, dark mode) that destroy and recreate the Activity.

```
                    ┌───────────────┐
                    │   onCreate()  │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   onStart()   │◄──────┐
                    └───────┬───────┘       │
                            │               │ onRestart()
                            ▼               │
                    ┌───────────────┐       │
           ┌───────│  onResume()   │       │
           │       └───────┬───────┘       │
           │               │               │
           │    ┌──────────┘               │
           │    │  (Activity running)      │
           │    └──────────┐               │
           │               │               │
           │               ▼               │
           │       ┌───────────────┐       │
           │       │  onPause()    │       │
           │       └───────┬───────┘       │
           │               │               │
           │               ▼               │
           │       ┌───────────────┐       │
           │       │   onStop()    │───────┘
           │       └───────┬───────┘
           │               │
           │               ▼
           │       ┌───────────────┐
           └──────►│  onDestroy() │
                   └───────────────┘
```

### Configuration Changes

Configuration changes (rotation, language, dark mode) destroy and recreate
the Activity by default. This is the most misunderstood aspect of Android
development.

**What survives configuration changes:**
- ViewModel instances (scoped to ViewModelStoreOwner)
- Saved instance state (Bundle, limited to ~1MB)
- Navigation back stack
- Fragment arguments

**What does NOT survive:**
- Activity instance variables
- View references
- Running coroutines in Activity scope
- Dialog references

**Modern approach with Compose:**
```kotlin
@Composable
fun TaskScreen(viewModel: TaskViewModel = hiltViewModel()) {
    // ViewModel survives configuration changes automatically
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    // rememberSaveable survives config changes AND process death
    var searchQuery by rememberSaveable { mutableStateOf("") }

    // remember only survives recomposition, NOT config changes
    val listState = rememberLazyListState()
}
```

### Process Death and Restoration

Android aggressively kills background processes to reclaim memory. When the
user returns, the system recreates the process and restores the Activity stack.

**SavedStateHandle in ViewModel:**
```kotlin
class TaskViewModel(
    private val savedStateHandle: SavedStateHandle,
    private val repository: TaskRepository
) : ViewModel() {
    // Survives process death via SavedStateHandle
    val searchQuery = savedStateHandle.getStateFlow("query", "")

    fun updateQuery(query: String) {
        savedStateHandle["query"] = query
    }
}
```

### Critical Android Lifecycle Rules

1. **Never store data in Activity fields**: Use ViewModel for UI state,
   SavedStateHandle for state that must survive process death, and
   persistent storage (Room, DataStore) for user data.

2. **Scope coroutines to lifecycle**: Use `viewModelScope` (survives config
   changes) or `lifecycleScope` (tied to Activity/Fragment). Never use
   `GlobalScope` — it leaks.

3. **Handle configuration changes**: Test with "Don't Keep Activities"
   developer option enabled. Every screen must survive process death.

4. **onStop is not guaranteed**: On pre-API-28, `onStop` may not be called
   if the process is killed. Save critical state in `onPause`.

---

## Background Processing

### iOS Background Modes

| Mode | Use Case | Duration | Entitlement |
|------|----------|----------|-------------|
| Background fetch | Periodic content refresh | ~30 seconds | Yes |
| Background processing | Maintenance tasks | Minutes (system decides) | Yes |
| Remote notifications | Silent push to wake app | ~30 seconds | Yes |
| Audio | Music/podcast playback | Unlimited while playing | Yes |
| Location | GPS tracking | Unlimited while tracking | Yes |
| VoIP | Internet telephony | Event-driven | Yes |
| Bluetooth | BLE communication | Event-driven | Yes |

**BGTaskScheduler (iOS 13+):**
```swift
// Register in application(_:didFinishLaunchingWithOptions:)
BGTaskScheduler.shared.register(
    forTaskWithIdentifier: "com.app.refresh",
    using: nil
) { task in
    guard let task = task as? BGAppRefreshTask else { return }
    self.handleAppRefresh(task: task)
}

// Schedule
func scheduleAppRefresh() {
    let request = BGAppRefreshTaskRequest(identifier: "com.app.refresh")
    request.earliestBeginDate = Date(timeIntervalSinceNow: 15 * 60)
    try? BGTaskScheduler.shared.submit(request)
}
```

### Android Background Processing

| API | Use Case | Constraints | Survival |
|-----|----------|-------------|----------|
| WorkManager | Deferrable, guaranteed | Network, battery, storage | Process death |
| Foreground Service | User-visible ongoing | Must show notification | Process priority |
| AlarmManager | Exact timing | Battery restrictions | Process death |
| JobScheduler | System-managed scheduling | API 21+ | Process death |
| Coroutines | Short async work | Lifecycle-scoped | Config change only |

**WorkManager (recommended default):**
```kotlin
class SyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            repository.syncPendingChanges()
            Result.success()
        } catch (e: Exception) {
            if (runAttemptCount < 3) Result.retry()
            else Result.failure()
        }
    }
}

// Enqueue with constraints
val syncRequest = OneTimeWorkRequestBuilder<SyncWorker>()
    .setConstraints(
        Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .setRequiresBatteryNotLow(true)
            .build()
    )
    .setBackoffCriteria(BackoffPolicy.EXPONENTIAL, 30, TimeUnit.SECONDS)
    .build()

WorkManager.getInstance(context).enqueueUniqueWork(
    "sync", ExistingWorkPolicy.REPLACE, syncRequest
)
```

---

## State Preservation Strategies

### Strategy Matrix

| Data Type | iOS Solution | Android Solution | Survives |
|-----------|-------------|-----------------|----------|
| View-local state | `@State` | `remember` | Recomposition only |
| Screen-level state | ViewModel | ViewModel | Config changes |
| Cross-session state | `@SceneStorage` | `SavedStateHandle` | Process death |
| User data | SwiftData/Core Data | Room/DataStore | App deletion* |
| Credentials | Keychain | EncryptedSharedPrefs | App deletion* |
| Ephemeral cache | `NSCache` | `LruCache` | Nothing |

*With iCloud Keychain sync or Android backup, some data survives reinstall.

### State Restoration Best Practices

1. **Layer your state preservation**: Volatile state in memory, important
   state in SavedState, persistent state in database.

2. **Test with process death**: On Android, enable "Don't Keep Activities."
   On iOS, simulate memory pressure in Xcode. Every screen must restore
   correctly.

3. **Minimize saved state size**: Android's saved instance state Bundle has
   a ~1MB limit (TransactionTooLargeException). Save identifiers and
   reload data, not entire data sets.

4. **Use stable identifiers**: When restoring scroll position or selection,
   reference items by stable ID, not by index position (which may change
   if data is reloaded).

5. **Handle stale state**: After process death, saved state may be minutes
   or hours old. Always validate and refresh data after restoration.

---

## Lifecycle-Aware Components

### iOS: Combine + SwiftUI Lifecycle
```swift
struct LocationTrackingView: View {
    @StateObject private var locationManager = LocationManager()

    var body: some View {
        Map(coordinateRegion: $locationManager.region)
            .onAppear { locationManager.startTracking() }
            .onDisappear { locationManager.stopTracking() }
    }
}
```

### Android: Lifecycle-Aware Components
```kotlin
class LocationObserver(
    private val locationClient: FusedLocationProviderClient
) : DefaultLifecycleObserver {

    override fun onStart(owner: LifecycleOwner) {
        // Start tracking when lifecycle reaches STARTED
        locationClient.requestLocationUpdates(request, callback, Looper.getMainLooper())
    }

    override fun onStop(owner: LifecycleOwner) {
        // Stop tracking when lifecycle falls below STARTED
        locationClient.removeLocationUpdates(callback)
    }
}

// Usage in Compose
@Composable
fun LocationScreen() {
    val lifecycleOwner = LocalLifecycleOwner.current
    DisposableEffect(lifecycleOwner) {
        val observer = LocationObserver(locationClient)
        lifecycleOwner.lifecycle.addObserver(observer)
        onDispose { lifecycleOwner.lifecycle.removeObserver(observer) }
    }
}
```

---

## Common Lifecycle Pitfalls

1. **Leaking contexts on Android**: Holding a reference to an Activity
   context in a ViewModel or singleton causes memory leaks. Use
   Application context for long-lived operations.

2. **Network requests in onResume**: Firing network requests every time
   the app resumes (e.g., returning from another app) causes excessive
   network usage. Use caching and staleness checks.

3. **Ignoring the inactive state on iOS**: `scenePhase == .inactive`
   occurs during app switcher, notification center, and system dialogs.
   Do not treat inactive as background.

4. **Blocking the main thread during lifecycle**: Saving large amounts of
   data synchronously in onPause/onStop blocks the UI thread and causes
   jank. Use async persistence with completion callbacks.

5. **Not testing background-to-foreground transitions**: Many bugs only
   manifest when the app returns from background with stale tokens,
   expired sessions, or changed system state (time zone, locale).

---

**The lifecycle is the heartbeat of your app. Respect it or fail silently.**
