# iOS Application Architecture

## Foundational Reference

This module codifies the architecture of production iOS applications —
from project structure and dependency management to navigation, data
persistence, and modularization. It represents the decisions a Principal
iOS Engineer makes when setting up a codebase that will be maintained
by a team for years.

References: Apple App Architecture Guide, Stanford CS193p, WWDC sessions
on SwiftData, Core Data, Navigation, and App Structure.

---

## Project Structure

### Recommended Feature-Based Structure

Organize by feature, not by layer. A feature module contains everything
needed for that feature — views, view models, models, and services.

```
MyApp/
├── App/
│   ├── MyApp.swift              (App entry point, @main)
│   ├── AppDelegate.swift        (UIKit lifecycle bridge if needed)
│   └── ContentView.swift        (Root view with tab/navigation)
│
├── Core/
│   ├── Networking/
│   │   ├── APIClient.swift      (URLSession wrapper, request building)
│   │   ├── Endpoint.swift       (Type-safe endpoint definitions)
│   │   └── NetworkMonitor.swift (NWPathMonitor wrapper)
│   ├── Persistence/
│   │   ├── ModelContainer+Ext.swift
│   │   └── MigrationPlan.swift
│   ├── Auth/
│   │   ├── AuthService.swift
│   │   ├── KeychainManager.swift
│   │   └── BiometricAuth.swift
│   └── Common/
│       ├── Extensions/
│       ├── Utilities/
│       └── Constants.swift
│
├── Features/
│   ├── TaskList/
│   │   ├── TaskListView.swift
│   │   ├── TaskListViewModel.swift
│   │   ├── TaskRow.swift
│   │   └── TaskListSkeleton.swift
│   ├── TaskDetail/
│   │   ├── TaskDetailView.swift
│   │   ├── TaskDetailViewModel.swift
│   │   └── TaskDetailComponents/
│   ├── Settings/
│   │   ├── SettingsView.swift
│   │   └── SettingsViewModel.swift
│   └── Onboarding/
│       ├── OnboardingView.swift
│       └── OnboardingPages/
│
├── Design/
│   ├── Components/              (Reusable UI components)
│   ├── Theme/                   (Colors, typography, spacing)
│   └── Modifiers/              (Custom view modifiers)
│
├── Resources/
│   ├── Assets.xcassets
│   ├── Localizable.xcstrings
│   └── Info.plist
│
└── Tests/
    ├── UnitTests/
    │   ├── ViewModelTests/
    │   └── ServiceTests/
    ├── IntegrationTests/
    └── UITests/
```

### Why Feature-Based Over Layer-Based

Layer-based organization (Models/, Views/, ViewModels/) forces engineers to
navigate multiple directories for a single feature change. Feature-based
organization keeps related code co-located. When a feature is deleted, its
entire directory is removed cleanly.

---

## Dependency Management

### Swift Package Manager (SPM) — Recommended Default

SPM is Apple's first-party dependency manager, integrated into Xcode:

```swift
// Package.swift for a modular app
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyApp",
    platforms: [.iOS(.v17)],
    products: [
        .library(name: "Core", targets: ["Core"]),
        .library(name: "Features", targets: ["Features"]),
    ],
    dependencies: [
        .package(url: "https://github.com/pointfreeco/swift-dependencies", from: "1.0.0"),
        .package(url: "https://github.com/kishikawakatsumi/KeychainAccess", from: "4.2.2"),
    ],
    targets: [
        .target(name: "Core", dependencies: [
            .product(name: "Dependencies", package: "swift-dependencies"),
            "KeychainAccess",
        ]),
        .target(name: "Features", dependencies: ["Core"]),
        .testTarget(name: "CoreTests", dependencies: ["Core"]),
    ]
)
```

### Dependency Vetting Criteria

Before adding any third-party dependency, evaluate:

| Criterion | Threshold | Rationale |
|-----------|-----------|-----------|
| GitHub stars | >500 | Community validation |
| Last commit | <3 months | Active maintenance |
| Open issues ratio | <30% unresolved | Responsive maintainers |
| Swift version | Current or current-1 | Compatibility |
| License | MIT, Apache 2.0, BSD | Business-safe |
| Binary size impact | <1MB | Bundle size budget |
| Alternatives | No Apple-native option | Avoid unnecessary deps |

---

## Navigation Architecture

### NavigationStack (iOS 16+)

The standard navigation approach for new projects:

```swift
// Centralized navigation state
@Observable
class AppRouter {
    var tabSelection: Tab = .home
    var homePath = NavigationPath()
    var searchPath = NavigationPath()
    var profilePath = NavigationPath()

    enum Tab: Hashable {
        case home, search, profile
    }

    // Type-safe route definitions
    enum HomeRoute: Hashable {
        case taskDetail(id: UUID)
        case taskEdit(id: UUID)
        case categoryList
        case settings
    }

    func navigate(to route: HomeRoute) {
        homePath.append(route)
    }

    func popToRoot() {
        homePath = NavigationPath()
    }
}

// Root tab view
struct AppTabView: View {
    @State private var router = AppRouter()

    var body: some View {
        TabView(selection: $router.tabSelection) {
            NavigationStack(path: $router.homePath) {
                HomeView()
                    .navigationDestination(for: AppRouter.HomeRoute.self) {
                        route in
                        switch route {
                        case .taskDetail(let id): TaskDetailView(taskId: id)
                        case .taskEdit(let id): TaskEditView(taskId: id)
                        case .categoryList: CategoryListView()
                        case .settings: SettingsView()
                        }
                    }
            }
            .tabItem { Label("Home", systemImage: "house") }
            .tag(AppRouter.Tab.home)

            NavigationStack(path: $router.searchPath) {
                SearchView()
            }
            .tabItem { Label("Search", systemImage: "magnifyingglass") }
            .tag(AppRouter.Tab.search)
        }
        .environment(router)
    }
}
```

### Deep Linking Integration

```swift
struct AppTabView: View {
    @State private var router = AppRouter()

    var body: some View {
        TabView(selection: $router.tabSelection) { /* ... */ }
        .onOpenURL { url in
            handleDeepLink(url)
        }
    }

    private func handleDeepLink(_ url: URL) {
        guard let components = URLComponents(url: url, resolvingAgainstBaseURL: true),
              let host = components.host else { return }

        switch host {
        case "task":
            if let id = components.queryItems?.first(where: { $0.name == "id" })?.value,
               let uuid = UUID(uuidString: id) {
                router.tabSelection = .home
                router.navigate(to: .taskDetail(id: uuid))
            }
        case "settings":
            router.tabSelection = .home
            router.navigate(to: .settings)
        default:
            break
        }
    }
}
```

---

## Data Persistence

### SwiftData (iOS 17+) — Recommended for New Projects

SwiftData uses Swift macros for schema definition and provides a modern,
SwiftUI-integrated persistence layer:

```swift
// Model definition
@Model
class TaskItem {
    var title: String
    var notes: String
    var isComplete: Bool
    var dueDate: Date?
    var priority: Priority
    var createdAt: Date
    var category: Category?

    @Relationship(deleteRule: .cascade, inverse: \Subtask.parent)
    var subtasks: [Subtask]

    enum Priority: Int, Codable, CaseIterable {
        case low = 0, medium = 1, high = 2, urgent = 3
    }

    init(title: String, priority: Priority = .medium) {
        self.title = title
        self.notes = ""
        self.isComplete = false
        self.priority = priority
        self.createdAt = Date()
        self.subtasks = []
    }
}

// Model container configuration
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [TaskItem.self, Category.self, Subtask.self])
    }
}

// Querying with @Query
struct TaskListView: View {
    @Query(
        filter: #Predicate<TaskItem> { !$0.isComplete },
        sort: [SortDescriptor(\.dueDate), SortDescriptor(\.priority, order: .reverse)]
    )
    private var tasks: [TaskItem]

    @Environment(\.modelContext) private var modelContext

    var body: some View {
        List(tasks) { task in
            TaskRow(task: task)
                .swipeActions(edge: .trailing) {
                    Button("Delete", role: .destructive) {
                        modelContext.delete(task)
                    }
                }
        }
    }

    func addTask(title: String) {
        let task = TaskItem(title: title)
        modelContext.insert(task)
        // SwiftData auto-saves; explicit save for critical operations:
        // try? modelContext.save()
    }
}
```

### Core Data (Legacy Projects)

For projects targeting pre-iOS 17 or migrating from existing Core Data:

```swift
// Modern Core Data with async fetch
class CoreDataTaskRepository: TaskRepository {
    private let container: NSPersistentContainer

    func fetchTasks() async throws -> [Task] {
        try await container.viewContext.perform {
            let request = TaskEntity.fetchRequest()
            request.sortDescriptors = [NSSortDescriptor(keyPath: \TaskEntity.dueDate, ascending: true)]
            request.predicate = NSPredicate(format: "isComplete == NO")
            let entities = try self.container.viewContext.fetch(request)
            return entities.map { $0.toDomain() }
        }
    }
}
```

### Persistence Decision Matrix

| Factor | SwiftData | Core Data | UserDefaults | Keychain | Files |
|--------|-----------|-----------|-------------|----------|-------|
| Structured data | Best | Good | Poor | N/A | Fair |
| Simple key-value | Overkill | Overkill | Best | Secrets only | Poor |
| Credentials | No | No | No | ONLY option | No |
| Large files | No | No | No | No | Best |
| CloudKit sync | Built-in | Built-in | No | iCloud KS | iCloud Drive |
| Query capability | Predicate | NSPredicate | None | None | None |
| Min iOS | 17 | 10 | 2 | 2 | 2 |

---

## Modularization Strategy

### When to Modularize

| Team Size | App Complexity | Strategy |
|-----------|---------------|----------|
| 1-2 | Simple (< 10 screens) | Single target, feature folders |
| 3-5 | Medium (10-30 screens) | SPM local packages per feature |
| 5+ | Complex (30+ screens) | Full modular architecture |

### SPM Local Package Architecture

```
MyApp.xcodeproj
├── MyApp/                    (thin app shell)
│   ├── MyApp.swift
│   └── AppDelegate.swift
│
└── Packages/
    ├── Core/                 (networking, auth, persistence)
    │   ├── Sources/Core/
    │   ├── Tests/CoreTests/
    │   └── Package.swift
    │
    ├── DesignSystem/         (components, theme, modifiers)
    │   ├── Sources/DesignSystem/
    │   └── Package.swift
    │
    ├── FeatureHome/          (home feature module)
    │   ├── Sources/FeatureHome/
    │   ├── Tests/FeatureHomeTests/
    │   └── Package.swift
    │
    └── FeatureSettings/
        ├── Sources/FeatureSettings/
        └── Package.swift
```

Benefits of SPM local packages:
- **Build parallelism**: Xcode compiles independent modules in parallel
- **Access control**: `internal` by default prevents cross-module leaks
- **Faster incremental builds**: Only recompile changed modules
- **Enforced boundaries**: Modules declare explicit dependencies

---

## Networking Layer

### Type-Safe API Client

```swift
// Endpoint definition
protocol Endpoint {
    var path: String { get }
    var method: HTTPMethod { get }
    var headers: [String: String] { get }
    var body: Encodable? { get }
    associatedtype Response: Decodable
}

// Generic API client
actor APIClient {
    private let session: URLSession
    private let baseURL: URL
    private let decoder: JSONDecoder
    private let authProvider: AuthTokenProvider

    func request<E: Endpoint>(_ endpoint: E) async throws -> E.Response {
        var request = URLRequest(url: baseURL.appendingPathComponent(endpoint.path))
        request.httpMethod = endpoint.method.rawValue

        // Auth token injection
        let token = try await authProvider.currentToken()
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")

        // Body encoding
        if let body = endpoint.body {
            request.httpBody = try JSONEncoder().encode(body)
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        }

        let (data, response) = try await session.data(for: request)

        guard let httpResponse = response as? HTTPURLResponse else {
            throw NetworkError.invalidResponse
        }

        guard (200...299).contains(httpResponse.statusCode) else {
            throw NetworkError.serverError(
                statusCode: httpResponse.statusCode,
                message: String(data: data, encoding: .utf8) ?? ""
            )
        }

        return try decoder.decode(E.Response.self, from: data)
    }
}
```

---

## Testing Strategy

### Test Pyramid for iOS

```
        ┌──────────┐
        │  UI Tests │  (XCUITest, 10-15% of tests)
        │  Slow,    │  End-to-end flows, critical paths
        │  brittle  │
        ├──────────┤
        │Integration│  (XCTest, 20-30%)
        │  Tests    │  Repository + real DB, API + mock server
        ├──────────┤
        │ Unit Tests│  (Swift Testing / XCTest, 60-70%)
        │  Fast,    │  ViewModels, services, domain logic
        │  stable   │
        └──────────┘
```

### Swift Testing Framework (Xcode 16+)

```swift
import Testing

@Suite("TaskListViewModel Tests")
struct TaskListViewModelTests {
    let mockRepository = MockTaskRepository()

    @Test("loads tasks on initialization")
    func loadTasks() async {
        mockRepository.stubbedTasks = [Task.sample, Task.sample]
        let vm = TaskListViewModel(repository: mockRepository)

        await vm.load()

        #expect(vm.tasks.count == 2)
        #expect(!vm.isLoading)
    }

    @Test("handles empty state")
    func emptyState() async {
        mockRepository.stubbedTasks = []
        let vm = TaskListViewModel(repository: mockRepository)

        await vm.load()

        #expect(vm.tasks.isEmpty)
        #expect(vm.showsEmptyState)
    }

    @Test("filters by priority", arguments: Task.Priority.allCases)
    func filterByPriority(priority: Task.Priority) async {
        mockRepository.stubbedTasks = Task.Priority.allCases.map { Task.sample(priority: $0) }
        let vm = TaskListViewModel(repository: mockRepository)
        await vm.load()

        vm.selectedPriority = priority

        #expect(vm.filteredTasks.allSatisfy { $0.priority == priority })
    }
}
```

---

**Architecture is investment. Good structure pays dividends for years.**
