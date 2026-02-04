# Android Platform Capabilities

## Foundational Reference

This module codifies Android-specific platform capabilities — Services,
BroadcastReceivers, ContentProviders, WorkManager, and the Android component
model. These are the building blocks that differentiate Android's application
model from iOS and enable powerful background processing, inter-app
communication, and system integration.

References: Android Developer documentation, Android Architecture Components
guide, Google I/O sessions on background processing, WorkManager, and
Foreground Services.

---

## Android Application Components

Android applications are composed of four fundamental component types,
each with a distinct lifecycle and purpose:

```
┌─────────────────────────────────────────────────────────────┐
│                   Android App Components                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   Activity   │  │   Service    │  │ BroadcastReceiver│  │
│  │              │  │              │  │                  │  │
│  │ UI screens   │  │ Background   │  │ System event     │  │
│  │ User inter-  │  │ processing   │  │ listeners        │  │
│  │ action       │  │ Long-running │  │ (boot, network,  │  │
│  │              │  │ operations   │  │  battery, etc.)  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              ContentProvider                          │   │
│  │  Structured data sharing between apps                 │   │
│  │  (contacts, media, calendar, custom data)             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Services

### Foreground Services

Foreground services perform operations that are noticeable to the user.
They must display a persistent notification. Starting with Android 14,
foreground services must declare a specific type:

```kotlin
// Manifest declaration
// <service
//     android:name=".service.LocationTrackingService"
//     android:foregroundServiceType="location"
//     android:exported="false" />

class LocationTrackingService : Service() {
    private val binder = LocalBinder()
    private lateinit var fusedLocationClient: FusedLocationProviderClient

    inner class LocalBinder : Binder() {
        fun getService(): LocationTrackingService = this@LocationTrackingService
    }

    override fun onBind(intent: Intent): IBinder = binder

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(
            NOTIFICATION_ID,
            createNotification(),
            ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION
        )
        startLocationUpdates()
        return START_STICKY
    }

    private fun createNotification(): Notification {
        val channel = NotificationChannel(
            CHANNEL_ID, "Location Tracking",
            NotificationManager.IMPORTANCE_LOW
        )
        getSystemService(NotificationManager::class.java)
            .createNotificationChannel(channel)

        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Tracking location")
            .setContentText("Your location is being recorded")
            .setSmallIcon(R.drawable.ic_location)
            .setOngoing(true)
            .build()
    }

    companion object {
        private const val NOTIFICATION_ID = 1
        private const val CHANNEL_ID = "location_tracking"
    }
}
```

### Foreground Service Types (Android 14+)

| Type | Use Case | Required Permission |
|------|----------|-------------------|
| `camera` | Camera access in background | FOREGROUND_SERVICE_CAMERA |
| `connectedDevice` | Bluetooth, USB, companion | FOREGROUND_SERVICE_CONNECTED_DEVICE |
| `dataSync` | Data upload/download | FOREGROUND_SERVICE_DATA_SYNC |
| `health` | Fitness tracking | FOREGROUND_SERVICE_HEALTH |
| `location` | GPS tracking | FOREGROUND_SERVICE_LOCATION |
| `mediaPlayback` | Audio/video playback | FOREGROUND_SERVICE_MEDIA_PLAYBACK |
| `mediaProjection` | Screen capture | FOREGROUND_SERVICE_MEDIA_PROJECTION |
| `microphone` | Audio recording | FOREGROUND_SERVICE_MICROPHONE |
| `phoneCall` | VoIP or call management | FOREGROUND_SERVICE_PHONE_CALL |
| `remoteMessaging` | Messaging for other device | FOREGROUND_SERVICE_REMOTE_MESSAGING |
| `shortService` | Quick tasks (< 3 min) | None |
| `specialUse` | Other justified uses | FOREGROUND_SERVICE_SPECIAL_USE |

---

## Broadcast Receivers

BroadcastReceivers respond to system-wide or app-local events. Modern Android
restricts implicit broadcasts for battery efficiency:

```kotlin
// Manifest-declared receiver (limited broadcasts only)
// <receiver android:name=".receiver.BootCompletedReceiver"
//     android:exported="false">
//     <intent-filter>
//         <action android:name="android.intent.action.BOOT_COMPLETED" />
//     </intent-filter>
// </receiver>

class BootCompletedReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED) {
            // Re-schedule pending work after device reboot
            val workManager = WorkManager.getInstance(context)
            SyncScheduler.schedulePeriodicSync(workManager)
        }
    }
}

// Runtime-registered receiver (for dynamic events)
class ConnectivityObserver(private val context: Context) {
    private val connectivityManager =
        context.getSystemService<ConnectivityManager>()

    val isConnected: Flow<Boolean> = callbackFlow {
        val callback = object : ConnectivityManager.NetworkCallback() {
            override fun onAvailable(network: Network) { trySend(true) }
            override fun onLost(network: Network) { trySend(false) }
            override fun onUnavailable() { trySend(false) }
        }

        val request = NetworkRequest.Builder()
            .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
            .build()

        connectivityManager?.registerNetworkCallback(request, callback)

        // Emit current state
        val currentState = connectivityManager?.activeNetwork != null
        trySend(currentState)

        awaitClose {
            connectivityManager?.unregisterNetworkCallback(callback)
        }
    }.distinctUntilChanged()
}
```

---

## Content Providers

Content Providers expose structured data to other apps. While less common
in modern app development, they remain essential for system integration:

```kotlin
// FileProvider for secure file sharing
// AndroidManifest.xml:
// <provider
//     android:name="androidx.core.content.FileProvider"
//     android:authorities="${applicationId}.fileprovider"
//     android:exported="false"
//     android:grantUriPermissions="true">
//     <meta-data
//         android:name="android.support.FILE_PROVIDER_PATHS"
//         android:resource="@xml/file_paths" />
// </provider>

// Sharing a file with another app
fun shareFile(context: Context, file: File) {
    val uri = FileProvider.getUriForFile(
        context,
        "${context.packageName}.fileprovider",
        file
    )
    val shareIntent = Intent(Intent.ACTION_SEND).apply {
        type = "application/pdf"
        putExtra(Intent.EXTRA_STREAM, uri)
        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
    }
    context.startActivity(Intent.createChooser(shareIntent, "Share via"))
}
```

---

## WorkManager (Recommended Background Processing)

WorkManager is the **only recommended API** for deferrable, guaranteed
background work on Android. It handles OS version differences, battery
optimization, and process death automatically.

### Work Types

```kotlin
// OneTimeWork — runs once with optional constraints
class DataSyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        return try {
            val repository = EntryPointAccessors
                .fromApplication<WorkerEntryPoint>(applicationContext)
                .taskRepository()

            repository.syncWithRemote()

            // Report progress
            setProgress(workDataOf("synced" to true))

            Result.success()
        } catch (e: IOException) {
            if (runAttemptCount < 3) {
                Result.retry()
            } else {
                Result.failure(workDataOf("error" to e.message))
            }
        }
    }

    // Hilt entry point for DI in Worker
    @EntryPoint
    @InstallIn(SingletonComponent::class)
    interface WorkerEntryPoint {
        fun taskRepository(): TaskRepository
    }
}

// Enqueue with constraints
fun scheduleSyncWork(workManager: WorkManager) {
    val constraints = Constraints.Builder()
        .setRequiredNetworkType(NetworkType.CONNECTED)
        .setRequiresBatteryNotLow(true)
        .build()

    val syncRequest = OneTimeWorkRequestBuilder<DataSyncWorker>()
        .setConstraints(constraints)
        .setBackoffCriteria(
            BackoffPolicy.EXPONENTIAL,
            WorkRequest.MIN_BACKOFF_MILLIS,
            TimeUnit.MILLISECONDS
        )
        .addTag("data_sync")
        .build()

    workManager.enqueueUniqueWork(
        "data_sync",
        ExistingWorkPolicy.REPLACE,
        syncRequest
    )
}
```

### Periodic Work

```kotlin
// PeriodicWork — repeats on a schedule
fun schedulePeriodicSync(workManager: WorkManager) {
    val periodicSync = PeriodicWorkRequestBuilder<DataSyncWorker>(
        repeatInterval = 1,
        repeatIntervalTimeUnit = TimeUnit.HOURS,
        flexTimeInterval = 15,
        flexTimeIntervalUnit = TimeUnit.MINUTES
    )
        .setConstraints(
            Constraints.Builder()
                .setRequiredNetworkType(NetworkType.CONNECTED)
                .build()
        )
        .build()

    workManager.enqueueUniquePeriodicWork(
        "periodic_sync",
        ExistingPeriodicWorkPolicy.KEEP,
        periodicSync
    )
}
```

### Chained Work

```kotlin
// Sequential chain: download → process → upload
fun scheduleExportPipeline(workManager: WorkManager) {
    val download = OneTimeWorkRequestBuilder<DownloadWorker>().build()
    val process = OneTimeWorkRequestBuilder<ProcessWorker>().build()
    val upload = OneTimeWorkRequestBuilder<UploadWorker>()
        .setConstraints(
            Constraints.Builder()
                .setRequiredNetworkType(NetworkType.UNMETERED) // Wi-Fi only
                .build()
        )
        .build()

    workManager
        .beginUniqueWork("export", ExistingWorkPolicy.REPLACE, download)
        .then(process)
        .then(upload)
        .enqueue()
}

// Observing work status from Compose
@Composable
fun SyncStatusIndicator() {
    val context = LocalContext.current
    val workManager = remember { WorkManager.getInstance(context) }

    val syncStatus by workManager
        .getWorkInfosForUniqueWorkFlow("data_sync")
        .collectAsStateWithLifecycle(initialValue = emptyList())

    val isRunning = syncStatus.any { it.state == WorkInfo.State.RUNNING }
    val lastFailed = syncStatus.any { it.state == WorkInfo.State.FAILED }

    Row(verticalAlignment = Alignment.CenterVertically) {
        if (isRunning) {
            CircularProgressIndicator(modifier = Modifier.size(16.dp))
            Spacer(modifier = Modifier.width(8.dp))
            Text("Syncing...")
        } else if (lastFailed) {
            Icon(Icons.Default.Warning, contentDescription = null, tint = MaterialTheme.colorScheme.error)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Sync failed", color = MaterialTheme.colorScheme.error)
        }
    }
}
```

---

## Permissions

Modern Android uses runtime permissions with a progressive disclosure
approach:

```kotlin
@Composable
fun LocationFeature() {
    val context = LocalContext.current

    val locationPermissionState = rememberMultiplePermissionsState(
        permissions = listOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        )
    )

    when {
        locationPermissionState.allPermissionsGranted -> {
            // Show location-dependent UI
            MapContent()
        }
        locationPermissionState.shouldShowRationale -> {
            // Explain why permission is needed
            PermissionRationale(
                message = "Location is needed to find nearby services",
                onRequestPermission = { locationPermissionState.launchMultiplePermissionRequest() }
            )
        }
        else -> {
            // First-time request or permanently denied
            PermissionRequest(
                message = "Enable location to discover nearby services",
                onRequest = { locationPermissionState.launchMultiplePermissionRequest() },
                onDismiss = { /* Show degraded experience */ }
            )
        }
    }
}
```

---

## Background Processing Decision Tree

```
What kind of work do you need to do?
│
├── User-initiated, visible, long-running?
│   └── Foreground Service (with notification)
│       Example: music playback, GPS tracking, file download
│
├── Deferrable, must complete eventually?
│   └── WorkManager
│       Example: data sync, log upload, image processing
│
├── Exact timing required?
│   └── AlarmManager (setExactAndAllowWhileIdle)
│       Example: medication reminders, calendar alerts
│       Note: Subject to battery restrictions
│
├── Triggered by push notification?
│   └── FCM + WorkManager
│       Example: new message sync, content update
│
└── Short async operation within UI lifecycle?
    └── Coroutine in viewModelScope/lifecycleScope
        Example: API call, local DB query, computation
```

---

## Android-Specific Security

```kotlin
// EncryptedSharedPreferences for sensitive data
private fun getEncryptedPrefs(context: Context): SharedPreferences {
    val mainKey = MasterKey.Builder(context)
        .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
        .build()

    return EncryptedSharedPreferences.create(
        context,
        "secure_prefs",
        mainKey,
        EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
        EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
    )
}

// BiometricPrompt for authentication
fun showBiometricPrompt(
    activity: FragmentActivity,
    onSuccess: (BiometricPrompt.AuthenticationResult) -> Unit,
    onError: (Int, String) -> Unit
) {
    val promptInfo = BiometricPrompt.PromptInfo.Builder()
        .setTitle("Authenticate")
        .setSubtitle("Verify your identity to continue")
        .setAllowedAuthenticators(
            BiometricManager.Authenticators.BIOMETRIC_STRONG or
            BiometricManager.Authenticators.DEVICE_CREDENTIAL
        )
        .build()

    val biometricPrompt = BiometricPrompt(
        activity,
        ContextCompat.getMainExecutor(activity),
        object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                onSuccess(result)
            }
            override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                onError(errorCode, errString.toString())
            }
        }
    )

    biometricPrompt.authenticate(promptInfo)
}
```

---

**Android's component model is powerful. Use the right component for the job.**
