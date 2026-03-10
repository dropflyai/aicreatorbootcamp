# Mobile Architecture Patterns

## Foundational Reference

This module codifies mobile architecture patterns drawn from Robert C. Martin's
Clean Architecture, Google's Guide to App Architecture, Apple's SwiftUI
application design guidance, and production systems at scale. Architecture
is the most consequential decision in a mobile project — it determines
testability, maintainability, team scalability, and long-term velocity.

---

## The Architecture Decision Framework

Selecting an architecture pattern is not a matter of preference. It is an
engineering decision driven by measurable constraints:

```
┌─────────────────────────────────────────────────────────┐
│                ARCHITECTURE SELECTION                     │
│                                                          │
│  Inputs:                                                │
│  ├── Application complexity (screens, state, features)  │
│  ├── Team size and experience                           │
│  ├── Testing requirements                               │
│  ├── Platform (iOS, Android, Cross-Platform)            │
│  ├── Expected lifetime (MVP vs long-lived product)      │
│  └── Performance constraints                            │
│                                                          │
│  Output: Architecture Pattern + Layer Definitions        │
└─────────────────────────────────────────────────────────┘
```

---

## Pattern 1: MVC (Model-View-Controller)

### Origin and Context
MVC is Apple's original recommended pattern for Cocoa and UIKit applications.
The Controller acts as the mediator between the Model (data and business logic)
and the View (UIKit views and visual elements).

### Structure
```
┌─────────┐     ┌──────────────┐     ┌─────────┐
│  Model  │◄────│  Controller  │────►│  View   │
│         │────►│              │◄────│         │
└─────────┘     └──────────────┘     └─────────┘
   (data)       (mediator/logic)      (display)
```

### The "Massive View Controller" Problem
In practice, UIKit's `UIViewController` inherits view lifecycle methods,
navigation logic, delegate callbacks, and data source conformances. Without
discipline, controllers accumulate hundreds of lines, violating Single
Responsibility. This is not a flaw in MVC theory but in its UIKit
implementation where the controller is tightly coupled to the view lifecycle.

### When MVC is Appropriate
- Simple, single-screen utilities
- Rapid prototyping with UIKit
- Apps with minimal state management
- Teams transitioning from web MVC frameworks

### When MVC is Inappropriate
- Applications with complex shared state
- Projects requiring high test coverage (controllers are hard to unit test)
- Teams larger than 2-3 engineers working on the same codebase
- Any SwiftUI or Compose project (these frameworks are inherently MVVM)

---

## Pattern 2: MVVM (Model-View-ViewModel)

### Origin and Context
MVVM was formalized by Microsoft for WPF/XAML and has become the dominant
pattern for declarative UI frameworks. SwiftUI and Jetpack Compose are
inherently MVVM — the View is a function of state exposed by the ViewModel.

### Structure
```
┌─────────┐     ┌─────────────┐     ┌─────────────┐
│  Model  │◄────│  ViewModel  │◄────│    View     │
│         │────►│  (state +   │────►│  (renders   │
│ (domain │     │   logic)    │     │   state)    │
│  data)  │     └─────────────┘     └─────────────┘
└─────────┘      Publishes state     Observes state
                  via reactive       and sends user
                  primitives         actions/intents
```

### iOS Implementation (SwiftUI)
```swift
// ViewModel using @Observable (iOS 17+)
@Observable
class TaskListViewModel {
    private let repository: TaskRepository

    var tasks: [Task] = []
    var isLoading = false
    var error: TaskError?

    init(repository: TaskRepository) {
        self.repository = repository
    }

    func loadTasks() async {
        isLoading = true
        defer { isLoading = false }
        do {
            tasks = try await repository.fetchTasks()
        } catch {
            self.error = .fetchFailed(error)
        }
    }
}

// View observes ViewModel state
struct TaskListView: View {
    @State private var viewModel: TaskListViewModel

    var body: some View {
        List(viewModel.tasks) { task in
            TaskRow(task: task)
        }
        .overlay { if viewModel.isLoading { ProgressView() } }
        .task { await viewModel.loadTasks() }
    }
}
```

### Android Implementation (Compose)
```kotlin
// ViewModel using StateFlow
class TaskListViewModel(
    private val repository: TaskRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(TaskListUiState())
    val uiState: StateFlow<TaskListUiState> = _uiState.asStateFlow()

    fun loadTasks() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            repository.fetchTasks()
                .onSuccess { tasks ->
                    _uiState.update { it.copy(tasks = tasks, isLoading = false) }
                }
                .onFailure { error ->
                    _uiState.update { it.copy(error = error, isLoading = false) }
                }
        }
    }
}

// Composable observes ViewModel state
@Composable
fun TaskListScreen(viewModel: TaskListViewModel = hiltViewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    LazyColumn {
        items(uiState.tasks) { task -> TaskRow(task) }
    }
    if (uiState.isLoading) { CircularProgressIndicator() }

    LaunchedEffect(Unit) { viewModel.loadTasks() }
}
```

### MVVM Rules of Engagement
1. **ViewModel MUST NOT import UI frameworks** — No `import SwiftUI`,
   no `import android.view.*`. The ViewModel is a pure Kotlin/Swift class.
2. **View MUST NOT contain business logic** — Conditional logic for display
   (e.g., "show error banner if error != nil") is allowed. Business rules
   (e.g., "retry if error is transient") belong in ViewModel or lower.
3. **State flows one direction** — ViewModel publishes state, View observes.
   View sends user actions to ViewModel. State never flows upward.
4. **ViewModel is the testability boundary** — You test business logic by
   testing ViewModels with mock repositories. No UI test framework needed.

### When MVVM is Appropriate
- All SwiftUI applications (it is the native pattern)
- All Jetpack Compose applications (it is the native pattern)
- React Native apps with moderate complexity
- Teams of any size (clear separation enables parallel work)

---

## Pattern 3: MVI (Model-View-Intent)

### Origin and Context
MVI enforces strict unidirectional data flow. Inspired by Cycle.js and Redux,
it models user interactions as Intents that are processed by a reducer to
produce new State. The View renders State and emits Intents.

### Structure
```
┌────────┐  Intent   ┌──────────┐  State   ┌────────┐
│  View  │──────────►│ Reducer/ │─────────►│  View  │
│        │           │ Store    │          │(render)│
│ (emit  │           │          │          │        │
│  user  │           │ Process  │          │        │
│ intent)│           │ intent,  │          │        │
│        │           │ produce  │          │        │
│        │           │ new state│          │        │
└────────┘           └──────────┘          └────────┘
     ▲                                         │
     └─────────────────────────────────────────┘
              (single state of truth)
```

### Key Properties
- **Single source of truth**: One state object represents the entire screen.
- **Deterministic**: Given the same state and intent, the reducer always
  produces the same new state. This makes debugging trivial — log the
  state transitions and replay them.
- **Time-travel debugging**: Because all state changes are recorded as
  intent-state pairs, you can step forward and backward through the state
  history.

### Implementation (Kotlin)
```kotlin
// State
data class TaskListState(
    val tasks: List<Task> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

// Intent (user actions)
sealed interface TaskListIntent {
    data object LoadTasks : TaskListIntent
    data class DeleteTask(val id: String) : TaskListIntent
    data class ToggleComplete(val id: String) : TaskListIntent
}

// Side Effect (one-shot events)
sealed interface TaskListEffect {
    data class ShowSnackbar(val message: String) : TaskListEffect
    data class NavigateToDetail(val taskId: String) : TaskListEffect
}

// Reducer in ViewModel
class TaskListViewModel(
    private val repository: TaskRepository
) : ViewModel() {
    private val _state = MutableStateFlow(TaskListState())
    val state: StateFlow<TaskListState> = _state.asStateFlow()

    private val _effects = Channel<TaskListEffect>()
    val effects: Flow<TaskListEffect> = _effects.receiveAsFlow()

    fun handleIntent(intent: TaskListIntent) {
        when (intent) {
            is TaskListIntent.LoadTasks -> loadTasks()
            is TaskListIntent.DeleteTask -> deleteTask(intent.id)
            is TaskListIntent.ToggleComplete -> toggleComplete(intent.id)
        }
    }
}
```

### When MVI is Appropriate
- Complex screens with many user interactions and state transitions
- Applications requiring deterministic state management
- Teams adopting Redux-like patterns from web development
- Applications where debugging state is critical (financial, medical)

### When MVI is Excessive
- Simple CRUD screens with little state complexity
- Prototypes and MVPs where development speed matters
- Small teams unfamiliar with reactive/functional patterns

---

## Pattern 4: Clean Architecture (Mobile)

### Origin and Context
Robert C. Martin's Clean Architecture adapted for mobile. The key insight
is that the mobile framework (UIKit, Android SDK, React Native) is a detail —
the business logic should be independent of it.

### Layer Structure
```
┌─────────────────────────────────────────────────────────┐
│                    Framework Layer                        │
│   SwiftUI Views, Compose Screens, React Components       │
│   Platform APIs, Navigation, DI Container                │
├─────────────────────────────────────────────────────────┤
│                  Presentation Layer                       │
│   ViewModels, Presenters, UI State mapping               │
│   Maps domain models to UI models                        │
├─────────────────────────────────────────────────────────┤
│                    Domain Layer                           │
│   Use Cases (Interactors), Domain Models, Repository     │
│   Interfaces. ZERO framework dependencies.               │
│   This layer defines the business rules.                 │
├─────────────────────────────────────────────────────────┤
│                     Data Layer                            │
│   Repository Implementations, API Clients, Local DB,     │
│   Data Transfer Objects (DTOs), Mappers                  │
└─────────────────────────────────────────────────────────┘

  Dependencies point INWARD only:
  Framework → Presentation → Domain ← Data
```

### The Dependency Rule
- The Domain layer depends on NOTHING external
- The Data layer depends on the Domain layer (implements its interfaces)
- The Presentation layer depends on the Domain layer (calls its use cases)
- The Framework layer depends on the Presentation layer

### Mobile-Specific Adaptations
1. **Use Cases are often thin on mobile**: Unlike server applications with
   complex business orchestration, mobile use cases sometimes just delegate
   to repositories. This is acceptable — the value is in the boundary, not
   the complexity.
2. **The repository abstraction is essential**: Mobile apps must seamlessly
   switch between network, database, and cache. The repository pattern from
   Clean Architecture provides this naturally.
3. **Framework isolation enables platform migration**: Business logic in
   the domain layer can survive a UIKit-to-SwiftUI migration or a View
   system rewrite without any changes.

### When Clean Architecture is Appropriate
- Applications expected to live 3+ years
- Teams of 5+ mobile engineers
- Applications with complex business logic (finance, healthcare, logistics)
- Projects requiring domain logic sharing across platforms (via KMP)

### When Clean Architecture is Excessive
- MVPs and prototypes (over-engineering slows iteration)
- Simple apps with 3-5 screens
- Solo developer projects with tight deadlines

---

## Architecture Decision Matrix

| Factor | MVC | MVVM | MVI | Clean Architecture |
|--------|-----|------|-----|-------------------|
| Complexity ceiling | Low | High | Very High | Very High |
| Learning curve | Low | Medium | High | High |
| Testability | Poor | Good | Excellent | Excellent |
| Team scalability | Poor | Good | Good | Excellent |
| Boilerplate | Low | Medium | High | High |
| State management | Ad hoc | Reactive | Deterministic | Varies by layer |
| SwiftUI fit | Poor | Native | Good | Good |
| Compose fit | Poor | Native | Good | Good |
| RN fit | Poor | Good | Excellent | Good |
| Recommended for MVP | Yes* | Yes | No | No |
| Recommended for scale | No | Yes | Yes | Yes |

*MVC only recommended for UIKit MVPs, not for SwiftUI/Compose.

---

## Platform-Specific Architecture Conventions

### iOS (SwiftUI era)
- **Default**: MVVM with `@Observable` (iOS 17+) or `@ObservableObject`
- **State management**: `@State` for view-local, ViewModel for screen-level,
  Environment for app-wide
- **Navigation**: `NavigationStack` with `NavigationPath` for programmatic
  navigation; Coordinator pattern for complex flows
- **Data**: SwiftData for new projects, Core Data for legacy compatibility

### Android (Compose era)
- **Default**: MVVM with `StateFlow` and `collectAsStateWithLifecycle()`
- **State management**: `remember`/`rememberSaveable` for view-local,
  ViewModel for screen-level, CompositionLocal for tree-scoped
- **Navigation**: Navigation Compose with type-safe routes (Kotlin 2.0+)
- **DI**: Hilt as the default; Koin for multiplatform projects
- **Data**: Room for structured data, DataStore for preferences

### React Native
- **Default**: MVVM or MVI depending on complexity
- **State management**: React Context for simple apps, Zustand or Redux
  Toolkit for complex state
- **Navigation**: Expo Router (file-based) or React Navigation
- **Data**: AsyncStorage for simple persistence, WatermelonDB for
  offline-first, MMKV for high-performance key-value

---

## Anti-Patterns (MUST AVOID)

1. **God ViewModel**: A ViewModel that manages state for an entire feature
   instead of a single screen. Split into screen-level ViewModels.

2. **Business logic in Views**: Conditional rendering is fine; business rules
   (validation, transformation, decision logic) must live in ViewModel
   or domain layer.

3. **Direct framework access in domain**: Domain models that import UIKit,
   Android SDK, or React Native modules are architectural violations.

4. **Network calls in ViewModel**: Network access belongs in the data layer
   (repositories/data sources). ViewModel calls use cases or repositories.

5. **Ignoring platform conventions**: Writing Android-style architecture on
   iOS or vice versa creates friction. Respect platform idioms.

6. **Premature abstraction**: Do not introduce Clean Architecture layers
   for a 3-screen MVP. Start with MVVM. Introduce layers when complexity
   justifies them.

---

**Architecture is a decision, not a default. Choose deliberately. Document why.**
