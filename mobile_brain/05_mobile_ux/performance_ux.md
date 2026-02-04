# Performance UX

## Foundational Reference

This module codifies the user experience of performance — the patterns that
make applications feel fast even when operations take time. Perceived
performance is often more important than actual performance. A well-designed
loading experience at 2 seconds feels faster than a spinner at 1.5 seconds.

References: Apple HIG loading guidance, Material Design progress indicators,
Nielsen Norman Group response time research, Luke Wroblewski's mobile
performance research, Google RAIL performance model.

---

## Response Time Thresholds

Research establishes three critical thresholds for user perception of speed:

| Duration | Perception | Required UX Response |
|----------|-----------|---------------------|
| 0-100ms | Instantaneous | No feedback needed. Direct manipulation feels real-time. |
| 100-300ms | Slight delay | Acceptable for most interactions. No loading indicator needed. |
| 300ms-1s | Noticeable delay | Show activity indicator. User loses flow if no feedback. |
| 1-5s | Interruption | Show progress with content. Skeleton screens. User waits if invested. |
| 5-10s | Abandonment risk | Show progress percentage/steps. Explain why. Offer cancellation. |
| >10s | Unacceptable | Redesign the interaction. Move to background processing. |

**The RAIL Model (Google):**
- **Response**: Handle input in <100ms
- **Animation**: Produce frames in <16ms (60fps)
- **Idle**: Maximize idle time for deferred work
- **Load**: Deliver interactive content in <5 seconds on 3G

---

## Skeleton Screens

Skeleton screens show the layout structure of content before data arrives.
They communicate "content is coming" without the anxiety of a blank screen
or the monotony of a spinner.

```
Loading state (skeleton):           Loaded state:
┌──────────────────────┐           ┌──────────────────────┐
│ ████████████████      │          │ John's Tasks          │
│ ████████              │          │ 12 tasks today        │
├──────────────────────┤          ├──────────────────────┤
│ ┌──┐ ████████████     │         │ ┌──┐ Buy groceries    │
│ │▓▓│ ████████         │         │ │✓ │ 2:00 PM          │
│ └──┘                  │         │ └──┘                  │
├──────────────────────┤          ├──────────────────────┤
│ ┌──┐ ████████████     │         │ ┌──┐ Team standup     │
│ │▓▓│ ████████         │         │ │  │ 3:00 PM          │
│ └──┘                  │         │ └──┘                  │
├──────────────────────┤          ├──────────────────────┤
│ ┌──┐ ████████████     │         │ ┌──┐ Review PR #42    │
│ │▓▓│ ████████         │         │ │  │ 4:30 PM          │
│ └──┘                  │         │ └──┘                  │
└──────────────────────┘          └──────────────────────┘
```

### Implementation Principles

1. **Match the layout**: Skeleton shapes must match the actual content
   layout exactly. Mismatched skeletons create a jarring transition.

2. **Animate subtly**: Apply a shimmer animation (gradient sweep from
   left to right) to indicate activity. Static gray rectangles look broken.

3. **Show realistic proportions**: Title placeholders should be wider than
   subtitle placeholders. Avatar placeholders should be circular if the
   actual avatar is circular.

4. **Transition smoothly**: Fade from skeleton to real content. Do not
   show skeleton → blank → content.

5. **Show correct count**: If you know the number of items (from cache
   or previous load), show that many skeleton items. Otherwise, show
   3-5 items to fill the viewport.

### SwiftUI Skeleton

```swift
struct TaskListSkeleton: View {
    var body: some View {
        List {
            ForEach(0..<5, id: \.self) { _ in
                HStack(spacing: 12) {
                    RoundedRectangle(cornerRadius: 4)
                        .fill(Color.gray.opacity(0.3))
                        .frame(width: 24, height: 24)
                    VStack(alignment: .leading, spacing: 6) {
                        RoundedRectangle(cornerRadius: 4)
                            .fill(Color.gray.opacity(0.3))
                            .frame(width: 200, height: 16)
                        RoundedRectangle(cornerRadius: 4)
                            .fill(Color.gray.opacity(0.3))
                            .frame(width: 120, height: 12)
                    }
                }
                .redacted(reason: .placeholder) // iOS 15+ built-in
                .shimmering() // Custom shimmer modifier
            }
        }
    }
}
```

---

## Optimistic UI

Optimistic UI updates the interface immediately as if the operation
succeeded, then reconciles with the server response. This eliminates
perceived latency for common operations.

### When to Use Optimistic UI

| Operation | Optimistic? | Rationale |
|-----------|-------------|-----------|
| Like/favorite | Yes | High success rate, easy to undo |
| Toggle complete | Yes | High success rate, user expects instant |
| Delete (with undo) | Yes | Undo available if fails |
| Create new item | Maybe | Show locally, confirm with server |
| Payment | NO | Irreversible, must confirm success |
| Send message | Yes | Show sent, retry/flag if fails |
| Update profile | No | Need server validation |

### Implementation Pattern

```typescript
// React Query optimistic update
const toggleComplete = useMutation({
  mutationFn: (taskId: string) => api.toggleComplete(taskId),
  onMutate: async (taskId) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['tasks'] });

    // Snapshot previous value
    const previous = queryClient.getQueryData(['tasks']);

    // Optimistically update
    queryClient.setQueryData(['tasks'], (old: Task[]) =>
      old.map(task =>
        task.id === taskId
          ? { ...task, isComplete: !task.isComplete }
          : task
      )
    );

    // Return snapshot for rollback
    return { previous };
  },
  onError: (err, taskId, context) => {
    // Rollback on error
    queryClient.setQueryData(['tasks'], context?.previous);
    // Show error to user
    showToast('Failed to update task. Please try again.');
  },
  onSettled: () => {
    // Refetch to ensure consistency
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  },
});
```

### Optimistic UI Rules

1. **Only for reversible, high-success-rate operations**: Do not use
   optimistic updates for payments, irreversible actions, or operations
   that frequently fail.
2. **Always implement rollback**: If the server operation fails, the UI
   must revert to the previous state and inform the user.
3. **Show failure clearly**: When an optimistic update fails, use a
   toast/snackbar with a retry option. Do not silently revert.
4. **Reconcile with server truth**: After the operation completes,
   refetch or reconcile to ensure the UI matches the server state.

---

## Offline UX

### Offline State Communication

```
Online:
┌──────────────────────────────────┐
│ Tasks                        🔵  │  ← Subtle online indicator (optional)
├──────────────────────────────────┤
│  Task 1                         │
│  Task 2                         │
└──────────────────────────────────┘

Offline (data available):
┌──────────────────────────────────┐
│ Tasks                        📴  │  ← Offline indicator
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │  ← "Working offline" banner
├──────────────────────────────────┤
│  Task 1 (cached)                │
│  Task 2 (cached)                │
│  Task 3 (pending sync) ↑        │  ← Sync pending indicator
└──────────────────────────────────┘

Offline (no data):
┌──────────────────────────────────┐
│         [Offline icon]           │
│                                   │
│    You're offline                 │
│    Connect to the internet to     │
│    see your tasks                 │
│                                   │
│    ┌──────────────────┐          │
│    │  Open Settings   │          │
│    └──────────────────┘          │
└──────────────────────────────────┘
```

### Offline UX Principles

1. **Never block the user unnecessarily**: If cached data exists, show it.
   Add a subtle indicator that data may be stale.

2. **Allow offline actions**: Queue operations (create, edit, complete)
   and sync when connectivity returns. Show pending sync indicators.

3. **Communicate state clearly**: The user must always know whether they
   are online, offline, or syncing. Use banner bars, status icons, or
   last-updated timestamps.

4. **Prioritize sync intelligently**: When connectivity returns, sync
   the most recent user actions first, then refresh background data.

5. **Handle conflicts gracefully**: When offline edits conflict with
   server changes, present clear resolution options rather than silently
   choosing.

---

## Loading Patterns Hierarchy

Use the most appropriate loading pattern based on context:

```
1. Optimistic Update (no visible loading)
   → For: toggles, likes, deletes with undo
   → User sees: Immediate change

2. Skeleton Screen
   → For: initial screen load, navigation to new screen
   → User sees: Layout preview with shimmer

3. Inline Loading
   → For: loading more items, refreshing section
   → User sees: Small indicator within existing content

4. Pull-to-Refresh
   → For: user-initiated content refresh
   → User sees: Native refresh indicator at top

5. Progress Indicator (determinate)
   → For: file upload/download, multi-step processes
   → User sees: Progress bar with percentage

6. Full-Screen Loading
   → For: ABSOLUTELY LAST RESORT
   → User sees: Centered spinner (no content)
   → This pattern should be minimized aggressively
```

---

## Perceived Performance Techniques

### Preloading and Prefetching

```
User is on Screen A, likely to go to Screen B:
- Prefetch Screen B's data while on Screen A
- When user navigates, data is already available

Triggers for prefetch:
- User hovers over / focuses on a link
- User scrolls to an item in a list
- Predictive: most users go to Screen B from Screen A
```

### Instant Transitions

```
Navigation should feel instantaneous:
- Target screen renders immediately with cached/prefetched data
- If no data available, show skeleton (not blank, not spinner)
- Use hero transitions / shared element transitions for continuity
```

### Progressive Loading

```
Load content in priority order:
1. Above-the-fold text content (fastest to render)
2. Above-the-fold images (progressive JPEG, thumbnail → full)
3. Below-the-fold content (lazy loaded as user scrolls)
4. Non-essential data (analytics, recommendations)
```

---

**Speed is an experience. Design the waiting, not just the result.**
