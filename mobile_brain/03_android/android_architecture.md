# Android Application Architecture

## Foundational Reference

This module codifies the architecture of production Android applications
following Google's Guide to App Architecture. It covers architecture
components, dependency injection, data persistence, navigation, and
modularization patterns used by teams at scale.

References: Google Guide to App Architecture, Android Jetpack documentation,
"Now in Android" open-source reference app, Google I/O architecture sessions.

---

## Recommended Architecture

Google's recommended architecture follows a three-layer design:

```
┌─────────────────────────────────────────────┐
│                  UI Layer                     │
│  Composables + ViewModels                    │
│  Renders state, sends user events            │
├─────────────────────────────────────────────┤
│                Domain Layer                   │
│  Use Cases (optional, for complex logic)     │
│  Combines data from multiple repositories    │
├─────────────────────────────────────────────┤
│                 Data Layer                    │
│  Repositories + Data Sources                 │
│  Single source of truth for each data type   │
└─────────────────────────────────────────────┘

Dependency direction: UI → Domain → Data
```

### UI Layer

The UI layer consists of Composables (UI elements) and ViewModels (state
holders). The ViewModel exposes UI state as a `StateFlow` and handles
user events:

```kotlin
// UI State — immutable data class
data class BookmarksUiState(
    val bookmarks: List<Bookmark> = emptyList(),
    val isLoading: Boolean = false,
    val errorMessage: String? = null
)

// ViewModel — state holder and event handler
@HiltViewModel
class BookmarksViewModel @Inject constructor(
    private val bookmarkRepository: BookmarkRepository
) : ViewModel() {

    val uiState: StateFlow<BookmarksUiState> =
        bookmarkRepository.observeBookmarks()
            .map { bookmarks ->
                BookmarksUiState(bookmarks = bookmarks)
            }
            .catch { error ->
                emit(BookmarksUiState(errorMessage = error.message))
            }
            .stateIn(
                scope = viewModelScope,
                started = SharingStarted.WhileSubscribed(5_000),
                initialValue = BookmarksUiState(isLoading = true)
            )

    fun removeBookmark(id: String) {
        viewModelScope.launch {
            bookmarkRepository.removeBookmark(id)
        }
    }
}
```

### Domain Layer (Optional)

Use cases encapsulate complex business logic that combines multiple
repositories or requires reuse across ViewModels:

```kotlin
// Use case combining multiple data sources
class GetHomeScreenDataUseCase @Inject constructor(
    private val taskRepository: TaskRepository,
    private val userRepository: UserRepository,
    private val analyticsRepository: AnalyticsRepository
) {
    operator fun invoke(): Flow<HomeScreenData> = combine(
        taskRepository.observeUpcomingTasks(limit = 5),
        userRepository.observeCurrentUser(),
        analyticsRepository.observeWeeklyStats()
    ) { tasks, user, stats ->
        HomeScreenData(
            greeting = "Hello, ${user.firstName}",
            upcomingTasks = tasks,
            weeklyStats = stats,
            showOnboarding = !user.hasCompletedOnboarding
        )
    }
}

// Use case with business logic
class ToggleTaskCompleteUseCase @Inject constructor(
    private val taskRepository: TaskRepository,
    private val notificationScheduler: NotificationScheduler,
    private val analyticsTracker: AnalyticsTracker
) {
    suspend operator fun invoke(taskId: String) {
        val task = taskRepository.getTask(taskId) ?: throw TaskNotFoundException(taskId)
        val updatedTask = task.copy(isComplete = !task.isComplete)

        taskRepository.updateTask(updatedTask)

        if (updatedTask.isComplete) {
            notificationScheduler.cancelReminder(taskId)
            analyticsTracker.trackTaskCompleted(taskId)
        } else {
            task.dueDate?.let { notificationScheduler.scheduleReminder(taskId, it) }
        }
    }
}
```

### Data Layer

Repositories are the single source of truth for each data type. They
coordinate between remote and local data sources:

```kotlin
// Repository interface (in domain layer if using Clean Architecture)
interface TaskRepository {
    fun observeTasks(): Flow<List<Task>>
    suspend fun getTask(id: String): Task?
    suspend fun createTask(task: Task)
    suspend fun updateTask(task: Task)
    suspend fun deleteTask(id: String)
    suspend fun syncWithRemote()
}

// Repository implementation (in data layer)
class TaskRepositoryImpl @Inject constructor(
    private val remoteDataSource: TaskRemoteDataSource,
    private val localDataSource: TaskLocalDataSource,
    private val networkMonitor: NetworkMonitor
) : TaskRepository {

    // Local database is the single source of truth
    override fun observeTasks(): Flow<List<Task>> =
        localDataSource.observeAll()
            .map { entities -> entities.map { it.toDomain() } }

    override suspend fun syncWithRemote() {
        if (!networkMonitor.isConnected()) return
        try {
            val remoteTasks = remoteDataSource.fetchAll()
            localDataSource.upsertAll(remoteTasks.map { it.toEntity() })
        } catch (e: IOException) {
            // Sync failure is not fatal — local data remains available
            Timber.w(e, "Task sync failed")
        }
    }

    override suspend fun createTask(task: Task) {
        val entity = task.toEntity()
        localDataSource.insert(entity)
        // Optimistic: save locally first, sync to remote in background
        try {
            remoteDataSource.create(task.toDto())
        } catch (e: IOException) {
            localDataSource.markPendingSync(entity.id)
        }
    }
}
```

---

## Dependency Injection with Hilt

Hilt is Android's recommended DI framework. It generates Dagger components
at compile time, providing type-safe, zero-reflection dependency injection:

```kotlin
// Application-level module
@Module
@InstallIn(SingletonComponent::class)
object AppModule {
    @Provides
    @Singleton
    fun provideOkHttpClient(
        authInterceptor: AuthInterceptor,
        loggingInterceptor: HttpLoggingInterceptor
    ): OkHttpClient = OkHttpClient.Builder()
        .addInterceptor(authInterceptor)
        .addInterceptor(loggingInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .build()

    @Provides
    @Singleton
    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit =
        Retrofit.Builder()
            .baseUrl(BuildConfig.API_BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(MoshiConverterFactory.create())
            .build()

    @Provides
    @Singleton
    fun provideTaskApi(retrofit: Retrofit): TaskApi =
        retrofit.create(TaskApi::class.java)
}

// Database module
@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase =
        Room.databaseBuilder(context, AppDatabase::class.java, "app.db")
            .addMigrations(MIGRATION_1_2, MIGRATION_2_3)
            .build()

    @Provides
    fun provideTaskDao(database: AppDatabase): TaskDao = database.taskDao()
}

// Repository binding module
@Module
@InstallIn(SingletonComponent::class)
abstract class RepositoryModule {
    @Binds
    @Singleton
    abstract fun bindTaskRepository(impl: TaskRepositoryImpl): TaskRepository
}
```

---

## Room Database

Room provides a compile-time verified SQLite abstraction:

```kotlin
// Entity
@Entity(tableName = "tasks")
data class TaskEntity(
    @PrimaryKey val id: String,
    val title: String,
    val description: String,
    @ColumnInfo(name = "is_complete") val isComplete: Boolean,
    @ColumnInfo(name = "due_date") val dueDate: Long?,
    val priority: Int,
    @ColumnInfo(name = "created_at") val createdAt: Long,
    @ColumnInfo(name = "updated_at") val updatedAt: Long,
    @ColumnInfo(name = "pending_sync") val pendingSync: Boolean = false
)

// DAO with Flow support
@Dao
interface TaskDao {
    @Query("SELECT * FROM tasks ORDER BY due_date ASC, priority DESC")
    fun observeAll(): Flow<List<TaskEntity>>

    @Query("SELECT * FROM tasks WHERE id = :id")
    suspend fun getById(id: String): TaskEntity?

    @Query("SELECT * FROM tasks WHERE pending_sync = 1")
    suspend fun getPendingSync(): List<TaskEntity>

    @Upsert
    suspend fun upsert(task: TaskEntity)

    @Upsert
    suspend fun upsertAll(tasks: List<TaskEntity>)

    @Query("DELETE FROM tasks WHERE id = :id")
    suspend fun deleteById(id: String)

    @Query("UPDATE tasks SET pending_sync = 1 WHERE id = :id")
    suspend fun markPendingSync(id: String)

    @Transaction
    suspend fun replaceAll(tasks: List<TaskEntity>) {
        deleteAll()
        upsertAll(tasks)
    }

    @Query("DELETE FROM tasks")
    suspend fun deleteAll()
}

// Database with migration support
@Database(
    entities = [TaskEntity::class, CategoryEntity::class],
    version = 3,
    autoMigrations = [
        AutoMigration(from = 1, to = 2),
        AutoMigration(from = 2, to = 3, spec = Migration2To3::class)
    ]
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun taskDao(): TaskDao
    abstract fun categoryDao(): CategoryDao
}

@RenameColumn(tableName = "tasks", fromColumnName = "desc", toColumnName = "description")
class Migration2To3 : AutoMigrationSpec
```

---

## Navigation with Compose

### Type-Safe Navigation (Kotlin Serialization)

```kotlin
// Route definitions using Kotlin Serialization
@Serializable
object HomeRoute

@Serializable
data class TaskDetailRoute(val taskId: String)

@Serializable
object SettingsRoute

@Serializable
data class CategoryRoute(val categoryId: String, val categoryName: String)

// NavHost setup
@Composable
fun AppNavHost(
    navController: NavHostController = rememberNavController(),
    modifier: Modifier = Modifier
) {
    NavHost(
        navController = navController,
        startDestination = HomeRoute,
        modifier = modifier
    ) {
        composable<HomeRoute> {
            HomeScreen(
                onNavigateToTask = { taskId ->
                    navController.navigate(TaskDetailRoute(taskId))
                },
                onNavigateToSettings = {
                    navController.navigate(SettingsRoute)
                }
            )
        }

        composable<TaskDetailRoute> { backStackEntry ->
            val route = backStackEntry.toRoute<TaskDetailRoute>()
            TaskDetailScreen(
                taskId = route.taskId,
                onBack = { navController.popBackStack() }
            )
        }

        composable<SettingsRoute> {
            SettingsScreen(onBack = { navController.popBackStack() })
        }
    }
}
```

### Deep Link Handling

```kotlin
composable<TaskDetailRoute>(
    deepLinks = listOf(
        navDeepLink {
            uriPattern = "https://myapp.com/task/{taskId}"
        },
        navDeepLink {
            uriPattern = "myapp://task/{taskId}"
        }
    )
) { backStackEntry ->
    val route = backStackEntry.toRoute<TaskDetailRoute>()
    TaskDetailScreen(taskId = route.taskId)
}
```

---

## Modularization

### Multi-Module Architecture

```
app/                          (Application shell, DI wiring)
├── feature/
│   ├── home/                 (Home feature module)
│   ├── task-detail/          (Task detail feature module)
│   ├── settings/             (Settings feature module)
│   └── onboarding/           (Onboarding feature module)
├── core/
│   ├── data/                 (Repositories, data sources)
│   ├── database/             (Room database, DAOs)
│   ├── network/              (Retrofit, API definitions)
│   ├── domain/               (Use cases, domain models)
│   ├── ui/                   (Shared composables, theme)
│   ├── common/               (Utilities, extensions)
│   └── testing/              (Test utilities, fakes)
└── build-logic/              (Convention plugins)
```

### Convention Plugins

```kotlin
// build-logic/convention/src/main/kotlin/AndroidFeatureConventionPlugin.kt
class AndroidFeatureConventionPlugin : Plugin<Project> {
    override fun apply(target: Project) {
        with(target) {
            pluginManager.apply {
                apply("com.android.library")
                apply("org.jetbrains.kotlin.android")
                apply("com.google.dagger.hilt.android")
                apply("org.jetbrains.kotlin.plugin.compose")
            }
            dependencies {
                add("implementation", project(":core:domain"))
                add("implementation", project(":core:ui"))
                add("implementation", libs.findLibrary("hilt.android").get())
                add("ksp", libs.findLibrary("hilt.compiler").get())
                add("testImplementation", project(":core:testing"))
            }
        }
    }
}
```

---

## Testing Strategy

### Test Doubles with Hilt

```kotlin
// Fake repository for testing
class FakeTaskRepository : TaskRepository {
    private val tasks = MutableStateFlow<List<Task>>(emptyList())

    fun emit(newTasks: List<Task>) { tasks.value = newTasks }

    override fun observeTasks(): Flow<List<Task>> = tasks
    override suspend fun getTask(id: String): Task? = tasks.value.find { it.id == id }
    override suspend fun createTask(task: Task) { tasks.update { it + task } }
    override suspend fun updateTask(task: Task) {
        tasks.update { list -> list.map { if (it.id == task.id) task else it } }
    }
    override suspend fun deleteTask(id: String) {
        tasks.update { list -> list.filter { it.id != id } }
    }
    override suspend fun syncWithRemote() { /* no-op */ }
}

// ViewModel test
class TaskListViewModelTest {
    private val fakeRepository = FakeTaskRepository()
    private lateinit var viewModel: TaskListViewModel

    @Before
    fun setup() {
        viewModel = TaskListViewModel(fakeRepository)
    }

    @Test
    fun `uiState emits tasks when repository has data`() = runTest {
        val tasks = listOf(Task(id = "1", title = "Test"))
        fakeRepository.emit(tasks)

        val state = viewModel.uiState.first { !it.isLoading }
        assertThat(state.tasks).hasSize(1)
        assertThat(state.tasks.first().title).isEqualTo("Test")
    }
}
```

---

**Architecture is discipline. Follow the layers. Respect the boundaries.**
