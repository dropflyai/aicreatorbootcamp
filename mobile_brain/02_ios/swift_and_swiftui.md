# Swift and SwiftUI

## Foundational Reference

This module codifies modern Swift and SwiftUI development at the principal
engineer level. Swift is Apple's primary language for all platforms. SwiftUI
is Apple's declarative UI framework that has become the recommended approach
for all new Apple platform development.

References: Stanford CS193p (Paul Hegarty), Apple SwiftUI documentation,
Swift Evolution proposals, WWDC SwiftUI sessions (2019-2025), "Swift
Programming Language" book (apple/swift-book).

---

## Modern Swift Patterns

### Value Types as Default

Swift's type system distinguishes value types (struct, enum) from reference
types (class). The Mobile Brain mandates value types as the default choice:

```swift
// CORRECT: Value type for data models
struct User: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var email: String
    var avatar: URL?
}

// CORRECT: Enum for finite states
enum LoadingState<T> {
    case idle
    case loading
    case success(T)
    case failure(Error)
}

// Reference type ONLY when identity semantics are required
// (observable objects, interop, shared mutable state)
```

**When to use classes:**
- Observable objects (`@Observable` macro requires class)
- Interoperability with Objective-C APIs
- When identity (===) matters more than equality (==)
- Inheritance hierarchies (rare in modern Swift)

### Swift Concurrency (async/await)

Swift's structured concurrency model is mandatory for all asynchronous work
in new code. Combine is acceptable for UIKit interop but should not be the
primary async pattern in SwiftUI applications.

```swift
// Actor for thread-safe shared state
actor ImageCache {
    private var cache: [URL: UIImage] = [:]

    func image(for url: URL) async throws -> UIImage {
        if let cached = cache[url] { return cached }

        let (data, _) = try await URLSession.shared.data(from: url)
        guard let image = UIImage(data: data) else {
            throw ImageError.decodingFailed
        }
        cache[url] = image
        return image
    }

    func clear() { cache.removeAll() }
}

// TaskGroup for parallel execution
func loadDashboard() async throws -> Dashboard {
    async let profile = profileService.fetch()
    async let notifications = notificationService.fetch()
    async let analytics = analyticsService.fetch()

    return Dashboard(
        profile: try await profile,
        notifications: try await notifications,
        analytics: try await analytics
    )
}

// Task cancellation handling
func fetchItems() async throws -> [Item] {
    var items: [Item] = []
    for page in 1...totalPages {
        try Task.checkCancellation() // Cooperative cancellation
        let pageItems = try await api.fetchItems(page: page)
        items.append(contentsOf: pageItems)
    }
    return items
}
```

### Error Handling

Swift's typed error handling provides compile-time safety:

```swift
// Domain-specific errors
enum NetworkError: LocalizedError {
    case noConnection
    case timeout(TimeInterval)
    case serverError(statusCode: Int, message: String)
    case decodingFailed(DecodingError)

    var errorDescription: String? {
        switch self {
        case .noConnection: return "No internet connection"
        case .timeout(let duration): return "Request timed out after \(duration)s"
        case .serverError(let code, let msg): return "Server error \(code): \(msg)"
        case .decodingFailed(let error): return "Data parsing failed: \(error)"
        }
    }
}

// Result type for explicit error handling
func fetchUser(id: String) async -> Result<User, NetworkError> {
    do {
        let user = try await api.getUser(id: id)
        return .success(user)
    } catch let error as NetworkError {
        return .failure(error)
    } catch {
        return .failure(.serverError(statusCode: 0, message: error.localizedDescription))
    }
}
```

### Protocol-Oriented Design

Swift favors protocol composition over class inheritance:

```swift
// Protocol for repository abstraction
protocol TaskRepository: Sendable {
    func fetchTasks() async throws -> [Task]
    func saveTask(_ task: Task) async throws
    func deleteTask(id: UUID) async throws
}

// Protocol with associated type for generic data sources
protocol DataSource {
    associatedtype Model: Identifiable
    func fetch(id: Model.ID) async throws -> Model
    func fetchAll() async throws -> [Model]
    func save(_ model: Model) async throws
    func delete(id: Model.ID) async throws
}

// Protocol extensions for default behavior
extension DataSource {
    func fetchAll(where predicate: (Model) -> Bool) async throws -> [Model] {
        try await fetchAll().filter(predicate)
    }
}
```

---

## SwiftUI Architecture

### View Composition

SwiftUI views are lightweight value types. The framework encourages deep
composition — small, focused views combined to build complex interfaces:

```swift
struct TaskListView: View {
    @State private var viewModel: TaskListViewModel

    init(repository: TaskRepository) {
        _viewModel = State(initialValue: TaskListViewModel(repository: repository))
    }

    var body: some View {
        NavigationStack {
            Group {
                switch viewModel.loadingState {
                case .idle:
                    Color.clear.onAppear { Task { await viewModel.load() } }
                case .loading:
                    TaskListSkeleton()
                case .success(let tasks):
                    TaskListContent(tasks: tasks, onDelete: viewModel.delete)
                case .failure(let error):
                    ErrorView(error: error, onRetry: { Task { await viewModel.load() } })
                }
            }
            .navigationTitle("Tasks")
            .refreshable { await viewModel.load() }
        }
    }
}

// Small, focused subviews
struct TaskListContent: View {
    let tasks: [Task]
    let onDelete: (Task) async -> Void

    var body: some View {
        List {
            ForEach(tasks) { task in
                TaskRow(task: task)
            }
            .onDelete { indexSet in
                for index in indexSet {
                    Task { await onDelete(tasks[index]) }
                }
            }
        }
    }
}
```

### State Management Hierarchy

SwiftUI provides a hierarchy of state management tools. Using the wrong
level causes either unnecessary complexity or re-render performance issues:

```
┌─────────────────────────────────────────────────────┐
│  @State                                              │
│  View-local state. Owned by the view. Private.       │
│  Use for: toggles, text field values, sheet state    │
├─────────────────────────────────────────────────────┤
│  @Binding                                            │
│  Two-way connection to parent's @State.              │
│  Use for: child views that modify parent state       │
├─────────────────────────────────────────────────────┤
│  @Observable (iOS 17+) / @ObservableObject           │
│  Screen-level state via ViewModel.                   │
│  Use for: business logic, API calls, complex state   │
├─────────────────────────────────────────────────────┤
│  @Environment / @EnvironmentObject                   │
│  App-wide or subtree-wide shared state.              │
│  Use for: auth state, theme, feature flags           │
├─────────────────────────────────────────────────────┤
│  @SceneStorage                                       │
│  Persists across process termination per scene.      │
│  Use for: scroll position, selected tab, draft text  │
├─────────────────────────────────────────────────────┤
│  @AppStorage                                         │
│  UserDefaults-backed. Persists across launches.      │
│  Use for: user preferences, onboarding state         │
└─────────────────────────────────────────────────────┘
```

### The @Observable Macro (iOS 17+)

The `@Observable` macro replaces `ObservableObject` with a simpler, more
performant observation system:

```swift
@Observable
class AuthViewModel {
    var currentUser: User?
    var isAuthenticated: Bool { currentUser != nil }
    var isLoading = false
    var error: AuthError?

    private let authService: AuthService

    init(authService: AuthService) {
        self.authService = authService
    }

    func signIn(email: String, password: String) async {
        isLoading = true
        defer { isLoading = false }
        do {
            currentUser = try await authService.signIn(email: email, password: password)
        } catch {
            self.error = .signInFailed(error)
        }
    }

    func signOut() async {
        try? await authService.signOut()
        currentUser = nil
    }
}

// Usage — no @ObservedObject needed, just @State or @Environment
struct ProfileView: View {
    @Environment(AuthViewModel.self) private var auth

    var body: some View {
        if let user = auth.currentUser {
            UserProfileContent(user: user)
        } else {
            SignInView()
        }
    }
}
```

### Navigation (NavigationStack)

Modern SwiftUI navigation uses `NavigationStack` with type-safe navigation
paths:

```swift
// Navigation state
@Observable
class NavigationRouter {
    var path = NavigationPath()

    func navigateToTask(_ task: Task) {
        path.append(task)
    }

    func navigateToSettings() {
        path.append(Route.settings)
    }

    func popToRoot() {
        path.removeLast(path.count)
    }
}

enum Route: Hashable {
    case settings
    case profile(userId: String)
    case taskDetail(taskId: UUID)
}

struct AppRootView: View {
    @State private var router = NavigationRouter()

    var body: some View {
        NavigationStack(path: $router.path) {
            HomeView()
                .navigationDestination(for: Task.self) { task in
                    TaskDetailView(task: task)
                }
                .navigationDestination(for: Route.self) { route in
                    switch route {
                    case .settings: SettingsView()
                    case .profile(let id): ProfileView(userId: id)
                    case .taskDetail(let id): TaskDetailView(taskId: id)
                    }
                }
        }
        .environment(router)
    }
}
```

---

## Combine Framework

While async/await is preferred for new code, Combine remains essential for
certain patterns:

### When Combine is Still Needed
- **UIKit interop**: Bridging UIKit delegates and callbacks to reactive streams
- **Debouncing/throttling**: Search-as-you-type with `debounce` operator
- **Merging multiple publishers**: Combining multiple data sources reactively
- **KVO observation**: Observing UIKit/Foundation properties

```swift
// Search with debounce — Combine is ideal here
class SearchViewModel: ObservableObject {
    @Published var query = ""
    @Published var results: [SearchResult] = []

    private var cancellables = Set<AnyCancellable>()

    init(searchService: SearchService) {
        $query
            .debounce(for: .milliseconds(300), scheduler: RunLoop.main)
            .removeDuplicates()
            .filter { !$0.isEmpty }
            .sink { [weak self] query in
                Task { [weak self] in
                    self?.results = try await searchService.search(query)
                }
            }
            .store(in: &cancellables)
    }
}
```

---

## SwiftUI Performance Rules

1. **Minimize view body complexity**: The `body` property is called on every
   state change. Keep it focused. Extract subviews for complex layouts.

2. **Use `@Observable` over `@ObservableObject`**: The `@Observable` macro
   tracks property-level access, so views only re-render when properties
   they actually read change. `@ObservableObject` re-renders on any
   `@Published` change.

3. **Lazy containers for large lists**: Use `LazyVStack`, `LazyHStack`, and
   `List` (which is lazy by default) for scrollable content. Never use
   `VStack` with `ForEach` over large data sets.

4. **Stable identifiers in ForEach**: Use stable, unique IDs. Changing IDs
   causes view recreation rather than update. Implement `Identifiable`
   with meaningful IDs, not array indices.

5. **Avoid heavy work in body**: No network calls, no file I/O, no complex
   computation in the `body` property. Use `.task` modifier or ViewModel
   methods for async work.

6. **Equatable conformance**: For complex views, conform to `Equatable` and
   use `.equatable()` modifier to skip unnecessary re-renders.

---

## Testing SwiftUI ViewModels

```swift
@Test("TaskListViewModel loads tasks successfully")
func testLoadTasks() async {
    let mockRepo = MockTaskRepository(tasks: [
        Task(id: UUID(), title: "Test Task", isComplete: false)
    ])
    let viewModel = TaskListViewModel(repository: mockRepo)

    await viewModel.load()

    #expect(viewModel.tasks.count == 1)
    #expect(viewModel.tasks.first?.title == "Test Task")
    #expect(viewModel.loadingState == .success)
}

@Test("TaskListViewModel handles errors")
func testLoadTasksError() async {
    let mockRepo = MockTaskRepository(error: .noConnection)
    let viewModel = TaskListViewModel(repository: mockRepo)

    await viewModel.load()

    #expect(viewModel.tasks.isEmpty)
    if case .failure(let error) = viewModel.loadingState {
        #expect(error == .noConnection)
    } else {
        Issue.record("Expected failure state")
    }
}
```

---

**Swift is the language. SwiftUI is the framework. This module is the standard.**
