# Mobile API Design

## Foundational Reference

Mobile API design differs fundamentally from web API design due to
constraints unique to mobile: unreliable networks, battery consumption,
bandwidth costs, offline requirements, and the inability to force-update
clients. This module codifies API design patterns optimized for mobile
consumption.

References: Google API design guidelines, GraphQL documentation, gRPC
documentation, "REST API Design Rulebook" (Mark Masse), "Designing
Data-Intensive Applications" (Martin Kleppmann) for sync patterns.

---

## REST vs GraphQL for Mobile

### Decision Matrix

| Factor | REST | GraphQL |
|--------|------|---------|
| Over-fetching | Common (fixed response shapes) | Eliminated (client specifies fields) |
| Under-fetching | Common (multiple requests) | Eliminated (single query) |
| Network requests per screen | Multiple (1 per resource) | Single (compose in one query) |
| Caching | HTTP caching (ETag, Cache-Control) | Complex (normalized cache) |
| File upload | Native (multipart/form-data) | Complex (separate endpoint) |
| Real-time | WebSocket or SSE (separate) | Subscriptions (built-in) |
| Versioning | URL or header versioning | Schema evolution (no versions) |
| Tooling maturity | Excellent | Good (Apollo, Relay) |
| Learning curve | Low | Medium |
| Backend complexity | Lower | Higher |
| Mobile bandwidth | Higher (over-fetching) | Lower (exact data) |
| Offline support | Simpler (resource-based cache) | Complex (normalized cache) |

### Recommendation

```
Is network bandwidth a critical concern?
├── YES → GraphQL (fetch exactly what the screen needs)
│
└── NO → Do screens require data from multiple resources?
         ├── YES → GraphQL (single request per screen)
         │         OR Backend-for-Frontend REST endpoints
         └── NO → REST (simpler, better caching, easier offline)
```

### REST Best Practices for Mobile

```
# Screen-optimized endpoints (BFF pattern)
# Instead of: GET /users/123 + GET /users/123/tasks + GET /tasks/stats
# Provide:    GET /home?include=user,tasks,stats

GET /api/v1/home
Response:
{
  "user": { "id": "123", "name": "Alice", "avatar_url": "..." },
  "upcoming_tasks": [
    { "id": "1", "title": "Buy groceries", "due": "2024-01-15" }
  ],
  "stats": { "completed_today": 5, "streak": 12 }
}
```

### GraphQL for Mobile

```graphql
# Single query for home screen
query HomeScreen {
  currentUser {
    id
    name
    avatarUrl
  }
  upcomingTasks(first: 5) {
    edges {
      node {
        id
        title
        dueDate
        priority
        isComplete
      }
    }
  }
  taskStats {
    completedToday
    streak
  }
}
```

---

## Pagination

Mobile pagination must handle three scenarios: initial load, load more
(infinite scroll), and refresh (pull-to-refresh).

### Cursor-Based Pagination (Recommended)

```
# Request
GET /api/v1/tasks?limit=20&after=cursor_abc123

# Response
{
  "data": [...20 items...],
  "pagination": {
    "has_next": true,
    "next_cursor": "cursor_def456",
    "has_previous": true,
    "previous_cursor": "cursor_xyz789"
  }
}
```

**Why cursor-based over offset-based:**
- **Stable results**: New items inserted between pages do not cause
  duplicates or missing items (offset pagination breaks on inserts).
- **Efficient queries**: Database can use index seeks instead of counting
  offsets (O(1) vs O(n) for large offsets).
- **Natural infinite scroll**: "Give me items after this one" matches
  the UX mental model perfectly.

### Pagination Implementation

```typescript
// React Native with TanStack Query
function useInfiniteTasks(filter: TaskFilter) {
  return useInfiniteQuery({
    queryKey: ['tasks', filter],
    queryFn: ({ pageParam }) =>
      api.fetchTasks({ filter, cursor: pageParam, limit: 20 }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNext ? lastPage.pagination.nextCursor : undefined,
    staleTime: 5 * 60 * 1000,
  });
}

// Usage in component
function TaskListScreen() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useInfiniteTasks(selectedFilter);

  const tasks = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <FlashList
      data={tasks}
      renderItem={({ item }) => <TaskCard task={item} />}
      estimatedItemSize={80}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      onEndReachedThreshold={0.5}
      refreshing={isRefetching}
      onRefresh={refetch}
      ListFooterComponent={
        isFetchingNextPage ? <ActivityIndicator /> : null
      }
    />
  );
}
```

---

## Offline Sync Architecture

### Sync Strategies

| Strategy | Complexity | Conflict Risk | Best For |
|----------|-----------|---------------|----------|
| Pull-only (read cache) | Low | None | Read-heavy apps |
| Push-then-pull | Medium | Low | Single-user apps |
| Queue-based sync | Medium-High | Medium | Multi-device apps |
| CRDT-based sync | High | None (automatic) | Collaborative apps |
| Event sourcing | High | Low | Audit-required apps |

### Queue-Based Offline Sync

```
┌─────────────────────────────────────────────────────────┐
│                OFFLINE SYNC ARCHITECTURE                  │
│                                                          │
│  User Action                                             │
│  │                                                       │
│  ├── Save to local database (source of truth)           │
│  │                                                       │
│  ├── Add to operation queue                             │
│  │   { id, type, payload, timestamp, retries }          │
│  │                                                       │
│  ├── Is network available?                              │
│  │   ├── YES → Process queue immediately                │
│  │   └── NO → Queue persists, process when online       │
│  │                                                       │
│  └── Network restored → Process queue (FIFO)            │
│      ├── Success → Remove from queue, update local      │
│      ├── Conflict → Apply resolution strategy           │
│      └── Failure → Retry with backoff                   │
└─────────────────────────────────────────────────────────┘
```

### Conflict Resolution Strategies

| Strategy | Description | Pros | Cons |
|----------|-------------|------|------|
| Last-write-wins | Most recent timestamp wins | Simple | Data loss possible |
| Server-wins | Server version always wins | Predictable | May discard user work |
| Client-wins | Client version always wins | User changes preserved | May overwrite others |
| Manual merge | Present conflict to user | Most accurate | Poor UX |
| Field-level merge | Merge non-conflicting fields | Best of both worlds | Complex implementation |

---

## API Authentication for Mobile

### Token-Based Authentication Flow

```
┌──────────┐                        ┌──────────┐
│  Mobile  │                        │  Server  │
│   App    │                        │          │
└────┬─────┘                        └────┬─────┘
     │  POST /auth/login                 │
     │  { email, password }              │
     │──────────────────────────────────►│
     │                                   │
     │  { access_token, refresh_token,   │
     │    expires_in }                   │
     │◄──────────────────────────────────│
     │                                   │
     │  Store tokens in Keychain/        │
     │  Keystore (NEVER in UserDefaults/ │
     │  SharedPreferences)               │
     │                                   │
     │  GET /api/tasks                   │
     │  Authorization: Bearer <access>   │
     │──────────────────────────────────►│
     │                                   │
     │  (When access token expires)      │
     │  POST /auth/refresh               │
     │  { refresh_token }                │
     │──────────────────────────────────►│
     │                                   │
     │  { new_access_token,              │
     │    new_refresh_token }            │
     │◄──────────────────────────────────│
```

### Token Refresh Implementation

```swift
// iOS: Thread-safe token refresh with Actor
actor TokenManager {
    private let keychain: KeychainManager
    private let api: AuthAPI
    private var refreshTask: Task<String, Error>?

    func validAccessToken() async throws -> String {
        // Check if current token is valid
        if let token = try? keychain.getAccessToken(),
           !isExpired(token) {
            return token
        }

        // If refresh is already in progress, await it
        if let existingTask = refreshTask {
            return try await existingTask.value
        }

        // Start refresh
        let task = Task {
            defer { refreshTask = nil }
            let refreshToken = try keychain.getRefreshToken()
            let response = try await api.refreshToken(refreshToken)
            try keychain.saveTokens(
                access: response.accessToken,
                refresh: response.refreshToken
            )
            return response.accessToken
        }

        refreshTask = task
        return try await task.value
    }
}
```

---

## API Versioning Strategy

### Header-Based Versioning (Recommended for Mobile)

```
GET /api/tasks
Accept: application/json
X-API-Version: 2024-01-15

Benefits:
- Same URL structure regardless of version
- Server can support multiple versions simultaneously
- Client can be updated to new version via feature flag
- Gradual migration (not all endpoints at once)
```

### Backward Compatibility Rules

1. **Never remove a field** from a response. Deprecated fields should
   return null/default values.
2. **Never change a field's type** (string → number). Add a new field.
3. **New fields must be optional** in requests.
4. **New endpoints are fine** — old clients simply do not call them.
5. **Sunset deprecated fields** only after 95%+ of clients have updated.

---

## Response Format Standards

```json
{
  "data": {
    "id": "task_123",
    "title": "Buy groceries",
    "is_complete": false,
    "due_date": "2024-01-15T14:00:00Z"
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2024-01-14T10:30:00Z"
  }
}

// Error response
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Due date must be in the future",
    "details": [
      { "field": "due_date", "message": "Must be after current date" }
    ]
  },
  "meta": {
    "request_id": "req_def456"
  }
}
```

---

**Design APIs for the worst network, not the best. Mobile is not the web.**
