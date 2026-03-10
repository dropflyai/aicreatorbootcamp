# Kotlin and Jetpack Compose

## Foundational Reference

This module codifies modern Kotlin and Jetpack Compose development at the
principal engineer level. Kotlin is Android's primary language. Jetpack
Compose is Android's modern declarative UI toolkit and the recommended
approach for all new Android UI development.

References: Android Developer documentation, Kotlin documentation, Google
I/O sessions on Compose, Android Architecture Components guide, Kotlin
coroutines design document.

---

## Modern Kotlin Patterns

### Kotlin Idioms for Android

Kotlin provides language features that eliminate entire categories of bugs
common in Java-based Android development:

```kotlin
// Null safety eliminates NullPointerException
fun processUser(user: User?): String {
    // Safe call + Elvis operator
    val displayName = user?.name ?: "Anonymous"

    // Smart cast after null check
    if (user != null) {
        // user is automatically cast to non-null User here
        updateProfile(user.id, user.name)
    }

    // let for scoped null handling
    user?.let { nonNullUser ->
        analytics.trackUser(nonNullUser.id)
    }

    return displayName
}

// Sealed classes for exhaustive state modeling
sealed interface UiState<out T> {
    data object Loading : UiState<Nothing>
    data class Success<T>(val data: T) : UiState<T>
    data class Error(val exception: Throwable) : UiState<Nothing>
}

// when is exhaustive with sealed types — compiler enforces all cases
fun <T> renderState(state: UiState<T>) = when (state) {
    is UiState.Loading -> showLoading()
    is UiState.Success -> showData(state.data)
    is UiState.Error -> showError(state.exception)
    // No else needed — compiler verifies exhaustiveness
}

// Data classes for immutable state
data class TaskUiState(
    val tasks: List<Task> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null,
    val selectedFilter: TaskFilter = TaskFilter.All,
    val searchQuery: String = ""
)

// Extension functions for domain-specific operations
fun List<Task>.sortedByPriority(): List<Task> =
    sortedByDescending { it.priority.ordinal }

fun Task.isOverdue(): Boolean =
    !isComplete && dueDate?.isBefore(LocalDate.now()) == true
```

### Kotlin Coroutines

Coroutines are Kotlin's structured concurrency framework. They are the
foundation of all asynchronous programming on modern Android:

```kotlin
// Structured concurrency with CoroutineScope
class TaskRepository(
    private val api: TaskApi,
    private val db: TaskDao,
    private val dispatcher: CoroutineDispatcher = Dispatchers.IO
) {
    // Suspend function — can only be called from a coroutine
    suspend fun fetchTasks(): List<Task> = withContext(dispatcher) {
        try {
            // Fetch from network
            val remoteTasks = api.getTasks()
            // Cache in database
            db.insertAll(remoteTasks.map { it.toEntity() })
            remoteTasks
        } catch (e: IOException) {
            // Fallback to cached data
            db.getAllTasks().map { it.toDomain() }
        }
    }

    // Parallel execution with async
    suspend fun fetchDashboard(): Dashboard = coroutineScope {
        val tasks = async { api.getTasks() }
        val categories = async { api.getCategories() }
        val stats = async { api.getStats() }

        Dashboard(
            tasks = tasks.await(),
            categories = categories.await(),
            stats = stats.await()
        )
    }
}

// ViewModel with viewModelScope
class TaskListViewModel(
    private val repository: TaskRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(TaskUiState())
    val uiState: StateFlow<TaskUiState> = _uiState.asStateFlow()

    init {
        loadTasks()
    }

    fun loadTasks() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            try {
                val tasks = repository.fetchTasks()
                _uiState.update { it.copy(tasks = tasks, isLoading = false) }
            } catch (e: Exception) {
                _uiState.update { it.copy(error = e.message, isLoading = false) }
            }
        }
    }

    // Cancellation is automatic when ViewModel is cleared
}
```

### Kotlin Flow

Flow is Kotlin's cold asynchronous stream API. `StateFlow` and `SharedFlow`
are the primary types for UI state in modern Android:

```kotlin
// Repository emitting a Flow of data
class TaskRepository(private val db: TaskDao) {
    // Flow from Room — emits new data whenever DB changes
    fun observeTasks(): Flow<List<Task>> =
        db.observeAllTasks()
            .map { entities -> entities.map { it.toDomain() } }
            .catch { emit(emptyList()) }

    // Flow with transformation pipeline
    fun observeFilteredTasks(
        filterFlow: Flow<TaskFilter>,
        queryFlow: Flow<String>
    ): Flow<List<Task>> = combine(
        observeTasks(),
        filterFlow,
        queryFlow.debounce(300)
    ) { tasks, filter, query ->
        tasks
            .filter { task -> filter.matches(task) }
            .filter { task ->
                query.isBlank() || task.title.contains(query, ignoreCase = true)
            }
    }
}

// ViewModel combining multiple flows
class TaskListViewModel(
    private val repository: TaskRepository
) : ViewModel() {

    private val _filter = MutableStateFlow(TaskFilter.All)
    private val _searchQuery = MutableStateFlow("")

    val uiState: StateFlow<TaskUiState> = combine(
        repository.observeFilteredTasks(_filter, _searchQuery),
        _filter,
        _searchQuery
    ) { tasks, filter, query ->
        TaskUiState(
            tasks = tasks,
            selectedFilter = filter,
            searchQuery = query,
            isLoading = false
        )
    }.stateIn(
        scope = viewModelScope,
        started = SharingStarted.WhileSubscribed(5_000),
        initialValue = TaskUiState(isLoading = true)
    )

    fun setFilter(filter: TaskFilter) { _filter.value = filter }
    fun setSearchQuery(query: String) { _searchQuery.value = query }
}
```

**Critical: `SharingStarted.WhileSubscribed(5000)`** — This keeps the Flow
active for 5 seconds after the last subscriber disconnects (e.g., during
configuration change). Prevents unnecessary re-fetching while avoiding
leaks.

---

## Jetpack Compose

### Composable Functions

Compose uses `@Composable` functions that describe UI as a function of state.
The Compose compiler plugin handles efficient recomposition — only re-executing
functions whose inputs have changed.

```kotlin
@Composable
fun TaskListScreen(
    viewModel: TaskListViewModel = hiltViewModel(),
    onNavigateToDetail: (String) -> Unit
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Scaffold(
        topBar = {
            TaskListTopBar(
                searchQuery = uiState.searchQuery,
                onSearchChange = viewModel::setSearchQuery
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { /* show add dialog */ }) {
                Icon(Icons.Default.Add, contentDescription = "Add Task")
            }
        }
    ) { paddingValues ->
        when {
            uiState.isLoading -> {
                TaskListSkeleton(modifier = Modifier.padding(paddingValues))
            }
            uiState.error != null -> {
                ErrorContent(
                    message = uiState.error!!,
                    onRetry = viewModel::loadTasks,
                    modifier = Modifier.padding(paddingValues)
                )
            }
            uiState.tasks.isEmpty -> {
                EmptyTasksContent(modifier = Modifier.padding(paddingValues))
            }
            else -> {
                TaskList(
                    tasks = uiState.tasks,
                    onTaskClick = { onNavigateToDetail(it.id) },
                    onTaskComplete = viewModel::toggleComplete,
                    modifier = Modifier.padding(paddingValues)
                )
            }
        }
    }
}

@Composable
private fun TaskList(
    tasks: List<Task>,
    onTaskClick: (Task) -> Unit,
    onTaskComplete: (Task) -> Unit,
    modifier: Modifier = Modifier
) {
    LazyColumn(
        modifier = modifier,
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(
            items = tasks,
            key = { it.id } // Stable keys for efficient recomposition
        ) { task ->
            TaskCard(
                task = task,
                onClick = { onTaskClick(task) },
                onComplete = { onTaskComplete(task) }
            )
        }
    }
}
```

### State in Compose

Compose provides multiple levels of state management:

```kotlin
// remember: survives recomposition only
@Composable
fun ExpandableCard(title: String, content: String) {
    var isExpanded by remember { mutableStateOf(false) }
    // isExpanded resets on configuration change
    Card(onClick = { isExpanded = !isExpanded }) {
        Text(title)
        AnimatedVisibility(visible = isExpanded) {
            Text(content)
        }
    }
}

// rememberSaveable: survives configuration changes AND process death
@Composable
fun SearchBar(onQueryChange: (String) -> Unit) {
    var query by rememberSaveable { mutableStateOf("") }
    TextField(
        value = query,
        onValueChange = {
            query = it
            onQueryChange(it)
        },
        placeholder = { Text("Search tasks...") }
    )
}

// collectAsStateWithLifecycle: lifecycle-aware Flow collection
@Composable
fun TaskListScreen(viewModel: TaskListViewModel = hiltViewModel()) {
    // Stops collecting when lifecycle falls below STARTED
    // Prevents UI updates when app is in background
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
}
```

### Side Effects

Compose provides structured side effect APIs for operations that should
happen outside of composition:

```kotlin
@Composable
fun TaskDetailScreen(taskId: String, viewModel: TaskDetailViewModel = hiltViewModel()) {
    // LaunchedEffect: runs when key changes, cancels on leave
    LaunchedEffect(taskId) {
        viewModel.loadTask(taskId)
    }

    // DisposableEffect: cleanup when leaving composition
    DisposableEffect(Unit) {
        val listener = SensorManager.registerListener(/* ... */)
        onDispose { SensorManager.unregisterListener(listener) }
    }

    // SideEffect: runs after every successful recomposition
    val analyticsTracker = LocalAnalytics.current
    SideEffect {
        analyticsTracker.trackScreenView("TaskDetail")
    }

    // snapshotFlow: convert Compose state to Flow
    val listState = rememberLazyListState()
    LaunchedEffect(listState) {
        snapshotFlow { listState.firstVisibleItemIndex }
            .distinctUntilChanged()
            .collect { index ->
                if (index > 0) viewModel.onScrolled()
            }
    }
}
```

---

## Material 3 Theming

```kotlin
// Custom Material 3 theme
@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context)
            else dynamicLightColorScheme(context)
        }
        darkTheme -> darkColorScheme(
            primary = Color(0xFFBB86FC),
            secondary = Color(0xFF03DAC5),
            tertiary = Color(0xFF3700B3)
        )
        else -> lightColorScheme(
            primary = Color(0xFF6200EE),
            secondary = Color(0xFF03DAC5),
            tertiary = Color(0xFF3700B3)
        )
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = AppTypography,
        shapes = AppShapes,
        content = content
    )
}
```

---

## Compose Performance Rules

1. **Stable keys in LazyColumn/LazyRow**: Always provide `key` parameter
   with stable, unique identifiers. Without keys, Compose cannot efficiently
   diff the list.

2. **Defer reads with lambda**: Use `Modifier.offset { IntOffset(x, y) }`
   instead of `Modifier.offset(x.dp, y.dp)` for animated values. Lambda
   defers the read to the layout phase, avoiding recomposition.

3. **Avoid allocations in composition**: Do not create new objects (lists,
   maps, lambdas with captures) during recomposition. Use `remember` to
   cache computed values.

4. **Use derivedStateOf for computed state**: When state is derived from
   other state, use `derivedStateOf` to avoid unnecessary recomposition:
   ```kotlin
   val filteredTasks by remember(tasks, filter) {
       derivedStateOf { tasks.filter { filter.matches(it) } }
   }
   ```

5. **Profile with Layout Inspector**: Use Android Studio's Layout Inspector
   to identify unnecessary recompositions. Recomposition counts are visible
   for each Composable.

6. **Stability annotations**: Mark data classes as `@Stable` or `@Immutable`
   when the Compose compiler cannot infer stability (e.g., classes using
   external library types).

---

## Testing Compose

```kotlin
@Test
fun taskList_displaysAllTasks() {
    val tasks = listOf(
        Task(id = "1", title = "Buy groceries"),
        Task(id = "2", title = "Walk the dog")
    )

    composeTestRule.setContent {
        TaskList(tasks = tasks, onTaskClick = {}, onTaskComplete = {})
    }

    composeTestRule.onNodeWithText("Buy groceries").assertIsDisplayed()
    composeTestRule.onNodeWithText("Walk the dog").assertIsDisplayed()
}

@Test
fun taskList_clickTask_callsCallback() {
    var clickedId: String? = null
    val tasks = listOf(Task(id = "1", title = "Test Task"))

    composeTestRule.setContent {
        TaskList(
            tasks = tasks,
            onTaskClick = { clickedId = it.id },
            onTaskComplete = {}
        )
    }

    composeTestRule.onNodeWithText("Test Task").performClick()
    assertThat(clickedId).isEqualTo("1")
}
```

---

**Kotlin is expressive. Compose is declarative. Together they define modern Android.**
