# iOS Platform Capabilities

## Foundational Reference

This module codifies iOS-specific platform capabilities that differentiate
native iOS development from cross-platform approaches. These APIs represent
deep platform integration that users expect from high-quality iOS apps.

References: Apple Developer Documentation, WWDC sessions on WidgetKit,
App Intents, App Clips, Push Notifications, HealthKit, and StoreKit.

---

## Push Notifications (APNs)

### Architecture

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Your    │───►│  APNs    │───►│  Device  │───►│  Your   │
│  Server  │    │  (Apple) │    │          │    │   App    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
  Sends push     Routes to       Delivers to     Handles
  via HTTP/2     device          notification     payload
                                 center
```

### Registration and Handling

```swift
// App delegate for push registration
class AppDelegate: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        UNUserNotificationCenter.current().delegate = self
        registerForPushNotifications()
        return true
    }

    func registerForPushNotifications() {
        UNUserNotificationCenter.current().requestAuthorization(
            options: [.alert, .badge, .sound, .provisional]
        ) { granted, error in
            guard granted else { return }
            DispatchQueue.main.async {
                UIApplication.shared.registerForRemoteNotifications()
            }
        }
    }

    func application(
        _ application: UIApplication,
        didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data
    ) {
        let token = deviceToken.map { String(format: "%02.2hhx", $0) }.joined()
        // Send token to your server
        Task { await PushService.shared.registerToken(token) }
    }

    // Foreground notification handling
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification
    ) async -> UNNotificationPresentationOptions {
        let userInfo = notification.request.content.userInfo
        // Process notification data
        await NotificationHandler.shared.process(userInfo)
        return [.banner, .badge, .sound]
    }

    // Notification tap handling
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        didReceive response: UNNotificationResponse
    ) async {
        let userInfo = response.notification.request.content.userInfo
        let action = response.actionIdentifier

        switch action {
        case UNNotificationDefaultActionIdentifier:
            await DeepLinkHandler.shared.handle(userInfo)
        case "MARK_COMPLETE":
            if let taskId = userInfo["taskId"] as? String {
                await TaskService.shared.markComplete(taskId)
            }
        default:
            break
        }
    }
}
```

### Rich Notifications with Notification Service Extension

```swift
// NotificationServiceExtension target
class NotificationService: UNNotificationServiceExtension {
    override func didReceive(
        _ request: UNNotificationRequest,
        withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void
    ) {
        guard let mutableContent = request.content.mutableCopy() as? UNMutableNotificationContent,
              let imageURLString = mutableContent.userInfo["imageURL"] as? String,
              let imageURL = URL(string: imageURLString) else {
            contentHandler(request.content)
            return
        }

        // Download and attach image
        Task {
            do {
                let (data, _) = try await URLSession.shared.data(from: imageURL)
                let tempURL = FileManager.default.temporaryDirectory
                    .appendingPathComponent(UUID().uuidString + ".jpg")
                try data.write(to: tempURL)
                let attachment = try UNNotificationAttachment(identifier: "image", url: tempURL)
                mutableContent.attachments = [attachment]
            } catch {
                // Deliver without image on failure
            }
            contentHandler(mutableContent)
        }
    }
}
```

### Notification Categories and Actions

```swift
func configureNotificationCategories() {
    let completeAction = UNNotificationAction(
        identifier: "MARK_COMPLETE",
        title: "Mark Complete",
        options: [.authenticationRequired]
    )
    let snoozeAction = UNNotificationAction(
        identifier: "SNOOZE",
        title: "Snooze 1 Hour",
        options: []
    )
    let taskCategory = UNNotificationCategory(
        identifier: "TASK_REMINDER",
        actions: [completeAction, snoozeAction],
        intentIdentifiers: [],
        options: [.customDismissAction]
    )
    UNUserNotificationCenter.current().setNotificationCategories([taskCategory])
}
```

---

## WidgetKit

### Widget Architecture

Widgets are timeline-based. Your app provides a timeline of entries, and the
system renders them at the appropriate time. Widgets are NOT live views —
they are snapshots that refresh on a schedule.

```swift
// Timeline entry
struct TaskWidgetEntry: TimelineEntry {
    let date: Date
    let tasks: [TaskSummary]
    let configuration: ConfigurationAppIntent
}

// Timeline provider
struct TaskWidgetProvider: AppIntentTimelineProvider {
    func placeholder(in context: Context) -> TaskWidgetEntry {
        TaskWidgetEntry(date: .now, tasks: TaskSummary.placeholders, configuration: .init())
    }

    func snapshot(for configuration: ConfigurationAppIntent, in context: Context) async -> TaskWidgetEntry {
        let tasks = await fetchTopTasks(count: context.family.maxItems)
        return TaskWidgetEntry(date: .now, tasks: tasks, configuration: configuration)
    }

    func timeline(for configuration: ConfigurationAppIntent, in context: Context) async -> Timeline<TaskWidgetEntry> {
        let tasks = await fetchTopTasks(count: context.family.maxItems)
        let entry = TaskWidgetEntry(date: .now, tasks: tasks, configuration: configuration)
        // Refresh every 30 minutes
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 30, to: .now)!
        return Timeline(entries: [entry], policy: .after(nextUpdate))
    }
}

// Widget view
struct TaskWidgetView: View {
    var entry: TaskWidgetEntry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .systemSmall:
            SmallTaskWidget(tasks: entry.tasks)
        case .systemMedium:
            MediumTaskWidget(tasks: entry.tasks)
        case .systemLarge:
            LargeTaskWidget(tasks: entry.tasks)
        case .accessoryCircular:
            AccessoryCircularTaskWidget(count: entry.tasks.count)
        case .accessoryRectangular:
            AccessoryRectangularTaskWidget(task: entry.tasks.first)
        default:
            SmallTaskWidget(tasks: entry.tasks)
        }
    }
}

// Widget definition
struct TaskWidget: Widget {
    let kind = "TaskWidget"

    var body: some WidgetConfiguration {
        AppIntentConfiguration(
            kind: kind,
            intent: ConfigurationAppIntent.self,
            provider: TaskWidgetProvider()
        ) { entry in
            TaskWidgetView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Tasks")
        .description("See your upcoming tasks at a glance.")
        .supportedFamilies([
            .systemSmall, .systemMedium, .systemLarge,
            .accessoryCircular, .accessoryRectangular
        ])
    }
}
```

### Widget Data Sharing

Widgets run in a separate process. Share data via App Groups:

```swift
// In main app — write data
let sharedDefaults = UserDefaults(suiteName: "group.com.app.shared")
let encoder = JSONEncoder()
if let data = try? encoder.encode(taskSummaries) {
    sharedDefaults?.set(data, forKey: "widgetTasks")
}
// Trigger widget refresh
WidgetCenter.shared.reloadAllTimelines()

// In widget — read data
func fetchTopTasks(count: Int) async -> [TaskSummary] {
    let sharedDefaults = UserDefaults(suiteName: "group.com.app.shared")
    guard let data = sharedDefaults?.data(forKey: "widgetTasks"),
          let tasks = try? JSONDecoder().decode([TaskSummary].self, from: data) else {
        return []
    }
    return Array(tasks.prefix(count))
}
```

---

## App Clips

### Architecture Requirements
- Maximum 15MB uncompressed (measured after App Thinning)
- Must provide immediate value without onboarding
- Limited framework access (no background modes, no CallKit, etc.)
- Must offer full app installation prompt
- Invoked via NFC, QR code, App Clip Code, Safari banner, or Maps

```swift
// App Clip entry point
@main
struct MyAppClip: App {
    var body: some Scene {
        WindowGroup {
            AppClipContentView()
                .onContinueUserActivity(
                    NSUserActivityTypeBrowsingWeb
                ) { activity in
                    guard let url = activity.webpageURL else { return }
                    handleInvocation(url: url)
                }
        }
    }
}
```

---

## App Intents (Siri & Shortcuts)

App Intents enable Siri integration, Shortcuts actions, and Spotlight:

```swift
struct AddTaskIntent: AppIntent {
    static var title: LocalizedStringResource = "Add Task"
    static var description = IntentDescription("Create a new task")

    @Parameter(title: "Title")
    var title: String

    @Parameter(title: "Priority", default: .medium)
    var priority: TaskPriority

    @Parameter(title: "Due Date")
    var dueDate: Date?

    static var parameterSummary: some ParameterSummary {
        Summary("Add \(\.$title) with \(\.$priority) priority") {
            \.$dueDate
        }
    }

    func perform() async throws -> some IntentResult & ProvidesDialog {
        let task = try await TaskService.shared.createTask(
            title: title,
            priority: priority.toDomain(),
            dueDate: dueDate
        )
        return .result(dialog: "Created task: \(task.title)")
    }
}

// Register as Shortcut
struct MyAppShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AddTaskIntent(),
            phrases: [
                "Add a task in \(.applicationName)",
                "Create a new task with \(.applicationName)"
            ],
            shortTitle: "Add Task",
            systemImageName: "plus.circle"
        )
    }
}
```

---

## HealthKit Integration

```swift
class HealthKitManager {
    private let healthStore = HKHealthStore()

    func requestAuthorization() async throws {
        guard HKHealthStore.isHealthDataAvailable() else {
            throw HealthError.notAvailable
        }

        let readTypes: Set<HKObjectType> = [
            HKQuantityType(.stepCount),
            HKQuantityType(.heartRate),
            HKQuantityType(.activeEnergyBurned),
            HKCategoryType(.sleepAnalysis)
        ]

        let writeTypes: Set<HKSampleType> = [
            HKQuantityType(.stepCount)
        ]

        try await healthStore.requestAuthorization(toShare: writeTypes, read: readTypes)
    }

    func fetchStepCount(for date: Date) async throws -> Int {
        let startOfDay = Calendar.current.startOfDay(for: date)
        let endOfDay = Calendar.current.date(byAdding: .day, value: 1, to: startOfDay)!

        let predicate = HKQuery.predicateForSamples(
            withStart: startOfDay,
            end: endOfDay,
            options: .strictStartDate
        )

        let stepType = HKQuantityType(.stepCount)

        return try await withCheckedThrowingContinuation { continuation in
            let query = HKStatisticsQuery(
                quantityType: stepType,
                quantitySamplePredicate: predicate,
                options: .cumulativeSum
            ) { _, result, error in
                if let error = error {
                    continuation.resume(throwing: error)
                    return
                }
                let steps = result?.sumQuantity()?.doubleValue(for: .count()) ?? 0
                continuation.resume(returning: Int(steps))
            }
            healthStore.execute(query)
        }
    }
}
```

---

## Extensions

### Share Extension

```swift
// Share extension principal class
class ShareViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()

        guard let extensionItem = extensionContext?.inputItems.first as? NSExtensionItem,
              let attachments = extensionItem.attachments else {
            close()
            return
        }

        for attachment in attachments {
            if attachment.hasItemConformingToTypeIdentifier(UTType.url.identifier) {
                attachment.loadItem(forTypeIdentifier: UTType.url.identifier) { [weak self] item, error in
                    guard let url = item as? URL else { return }
                    DispatchQueue.main.async {
                        self?.handleSharedURL(url)
                    }
                }
            }
        }
    }

    private func handleSharedURL(_ url: URL) {
        // Save to shared App Group container
        let sharedDefaults = UserDefaults(suiteName: "group.com.app.shared")
        var pendingShares = sharedDefaults?.stringArray(forKey: "pendingShares") ?? []
        pendingShares.append(url.absoluteString)
        sharedDefaults?.set(pendingShares, forKey: "pendingShares")
        close()
    }

    private func close() {
        extensionContext?.completeRequest(returningItems: nil)
    }
}
```

---

## Platform Capability Matrix

| Capability | Min iOS | Framework | App Store Review |
|------------|---------|-----------|-----------------|
| Push Notifications | 10 | UserNotifications | Required entitlement |
| Widgets (Home Screen) | 14 | WidgetKit | Standard review |
| Lock Screen Widgets | 16 | WidgetKit | Standard review |
| Live Activities | 16.1 | ActivityKit | Standard review |
| App Clips | 14 | App Clip target | Separate review |
| App Intents / Siri | 16 | AppIntents | Standard review |
| HealthKit | 8 | HealthKit | Requires justification |
| StoreKit 2 | 15 | StoreKit | IAP review |
| SharePlay | 15 | GroupActivities | Standard review |
| Focus Filters | 16 | AppIntents | Standard review |
| Interactive Widgets | 17 | WidgetKit + AppIntents | Standard review |
| TipKit | 17 | TipKit | Standard review |

---

**Platform capabilities are competitive advantages. Use them deliberately.**
