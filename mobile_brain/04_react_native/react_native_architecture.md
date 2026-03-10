# React Native Architecture

## Foundational Reference

This module codifies React Native's architecture at the principal engineer
level, with emphasis on the New Architecture that fundamentally changes how
JavaScript communicates with native code. Understanding this architecture
is essential for performance optimization, native module development, and
architectural decision-making.

References: React Native documentation, React Native New Architecture guide,
Meta engineering blog posts, React Native Community discussions, Callstack
engineering articles.

---

## The New Architecture

React Native's New Architecture replaces the asynchronous bridge with three
pillars: JSI (JavaScript Interface), Fabric (new renderer), and TurboModules
(new native module system). This architecture is enabled by default starting
with React Native 0.76+.

### Old Architecture vs New Architecture

```
OLD ARCHITECTURE (Bridge-based)
┌──────────────┐                      ┌──────────────┐
│  JavaScript  │  ── JSON Bridge ──►  │    Native    │
│   Thread     │  ◄── (async, ────    │    Thread    │
│              │      serialized)     │              │
└──────────────┘                      └──────────────┘
  Problems: Async-only, JSON serialization overhead,
  no synchronous access, bridge congestion

NEW ARCHITECTURE (JSI-based)
┌──────────────┐                      ┌──────────────┐
│  JavaScript  │  ── JSI (C++) ────►  │    Native    │
│   Thread     │  ◄── (sync/async,    │   Modules    │
│              │      zero-copy)      │              │
│              │                      │              │
│  Fabric      │  ── C++ Shadow ──►   │   Native     │
│  Renderer    │     Tree (direct)    │   Views      │
└──────────────┘                      └──────────────┘
  Benefits: Synchronous calls, no serialization,
  concurrent rendering, lazy module loading
```

### JSI (JavaScript Interface)

JSI is a C++ API that allows JavaScript to hold references to C++ Host
Objects and invoke their methods directly, without JSON serialization:

```
JavaScript                    C++/Native
─────────                    ──────────
const module =               // C++ HostObject exposed to JS
  global.__turbo             // Direct reference, no bridge
    .TaskModule;             // No JSON serialization

module.getTask("123");       // Synchronous call possible
                             // Returns result directly
await module.fetchTasks();   // Async also supported
                             // Promise-based
```

**Key properties of JSI:**
- **Synchronous and asynchronous**: Methods can return values synchronously
  or return Promises for async operations
- **Zero-copy data sharing**: Large data (images, buffers) can be shared
  between JS and native without copying
- **Type-safe codegen**: TypeScript/Flow specs generate C++ interfaces at
  build time via CodeGen
- **Engine-agnostic**: JSI works with any JS engine (Hermes, V8, JSC)

### Fabric Renderer

Fabric is React Native's new rendering system that replaces the old
asynchronous renderer:

```
┌─────────────────────────────────────────────────────┐
│                  Fabric Rendering Pipeline            │
│                                                      │
│  React Tree     Shadow Tree      Native Views        │
│  (JS)           (C++)            (Platform)          │
│                                                      │
│  <View>    ──►  ShadowNode  ──►  UIView (iOS)       │
│   <Text>   ──►  ShadowNode  ──►  TextView (Android)  │
│   <Image>  ──►  ShadowNode  ──►  UIImageView        │
│  </View>                                             │
│                                                      │
│  Features:                                           │
│  - Synchronous layout (Yoga engine in C++)           │
│  - Concurrent rendering (React 18 features)          │
│  - Priority-based updates                            │
│  - Direct C++ access to shadow tree                  │
└─────────────────────────────────────────────────────┘
```

**Fabric benefits:**
- **Concurrent rendering**: React 18 features (Suspense, Transitions,
  useTransition) work on mobile, enabling responsive UI during heavy updates
- **Synchronous layout**: Layout calculations happen synchronously in C++,
  enabling gestures and animations to read layout values without async delays
- **Reduced memory**: Shadow tree is managed in C++ with efficient memory
- **Interruptible rendering**: High-priority updates (gestures, input) can
  interrupt lower-priority rendering

### TurboModules

TurboModules replace the old NativeModules system with lazy loading and
type-safe code generation:

```typescript
// TypeScript spec file (generates C++ interface via CodeGen)
// specs/NativeTaskModule.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Synchronous method
  getConstants(): {
    maxTasks: number;
    supportedPriorities: string[];
  };

  // Asynchronous method
  fetchTasks(filter: string): Promise<Task[]>;

  // Method with callback
  observeTaskChanges(callback: (tasks: Task[]) => void): void;

  // Void method
  markTaskComplete(taskId: string): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('TaskModule');
```

**TurboModule properties:**
- **Lazy loading**: Modules are loaded on first access, not at startup.
  Dramatically improves cold start time for apps with many native modules.
- **Type-safe CodeGen**: TypeScript/Flow specs generate C++ interfaces.
  Type mismatches are caught at build time, not runtime.
- **Synchronous access**: Unlike old NativeModules (always async),
  TurboModules support synchronous method calls via JSI.

---

## Application Architecture Patterns

### Recommended: Feature-Based Architecture

```
src/
├── app/
│   ├── App.tsx                (Root component, providers)
│   ├── navigation/
│   │   ├── RootNavigator.tsx  (Stack/Tab structure)
│   │   ├── AuthNavigator.tsx  (Auth flow screens)
│   │   └── linking.ts         (Deep link configuration)
│   └── providers/
│       ├── AuthProvider.tsx
│       ├── ThemeProvider.tsx
│       └── QueryProvider.tsx
│
├── features/
│   ├── tasks/
│   │   ├── screens/
│   │   │   ├── TaskListScreen.tsx
│   │   │   └── TaskDetailScreen.tsx
│   │   ├── components/
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskFilter.tsx
│   │   │   └── TaskForm.tsx
│   │   ├── hooks/
│   │   │   ├── useTasks.ts
│   │   │   └── useTaskMutations.ts
│   │   ├── api/
│   │   │   └── taskApi.ts
│   │   └── types.ts
│   │
│   ├── auth/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   │
│   └── settings/
│       ├── screens/
│       ├── components/
│       └── hooks/
│
├── shared/
│   ├── components/            (Reusable UI components)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── LoadingState.tsx
│   ├── hooks/                 (Shared hooks)
│   │   ├── useDebounce.ts
│   │   ├── useNetworkStatus.ts
│   │   └── usePlatform.ts
│   ├── utils/                 (Pure utility functions)
│   ├── theme/                 (Design tokens, theme config)
│   └── types/                 (Shared TypeScript types)
│
└── services/
    ├── api/                   (API client, interceptors)
    ├── storage/               (AsyncStorage, MMKV wrappers)
    ├── analytics/             (Analytics service)
    └── notifications/         (Push notification handling)
```

### State Management

```typescript
// React Query (TanStack Query) for server state — RECOMMENDED
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function useTasks(filter: TaskFilter) {
  return useQuery({
    queryKey: ['tasks', filter],
    queryFn: () => taskApi.fetchTasks(filter),
    staleTime: 5 * 60 * 1000,  // 5 minutes
    gcTime: 30 * 60 * 1000,    // 30 minutes cache
  });
}

function useToggleTaskComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => taskApi.toggleComplete(taskId),
    // Optimistic update
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previous = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old: Task[]) =>
        old.map(t => t.id === taskId ? { ...t, isComplete: !t.isComplete } : t)
      );
      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['tasks'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

// Zustand for client-side state
import { create } from 'zustand';

interface AppState {
  selectedFilter: TaskFilter;
  setFilter: (filter: TaskFilter) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const useAppStore = create<AppState>((set) => ({
  selectedFilter: 'all',
  setFilter: (filter) => set({ selectedFilter: filter }),
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));
```

---

## Performance Optimization

### Hermes JavaScript Engine

Hermes is Meta's JavaScript engine optimized for React Native. It is the
default engine and provides significant performance improvements:

- **Bytecode precompilation**: JavaScript is compiled to bytecode at build
  time, eliminating parse/compile time at runtime
- **Reduced memory usage**: ~30-50% less memory than JSC
- **Faster startup**: Bytecode loads faster than parsing JavaScript source
- **Garbage collection**: Concurrent, generational GC optimized for mobile

### Performance Best Practices

```typescript
// 1. Memoize expensive components
const TaskCard = React.memo(({ task, onPress }: TaskCardProps) => {
  return (
    <Pressable onPress={() => onPress(task.id)}>
      <Text>{task.title}</Text>
    </Pressable>
  );
});

// 2. useCallback for stable references
function TaskListScreen() {
  const handleTaskPress = useCallback((taskId: string) => {
    navigation.navigate('TaskDetail', { taskId });
  }, [navigation]);

  return <TaskList onTaskPress={handleTaskPress} />;
}

// 3. FlashList instead of FlatList for large lists
import { FlashList } from '@shopify/flash-list';

function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <FlashList
      data={tasks}
      renderItem={({ item }) => <TaskCard task={item} />}
      estimatedItemSize={80}  // Required for FlashList
      keyExtractor={(item) => item.id}
    />
  );
}

// 4. Avoid anonymous functions in render
// BAD: Creates new function every render
<Button onPress={() => handlePress(item.id)} />

// GOOD: Stable reference
const handlePress = useCallback(() => {/* ... */}, [item.id]);
<Button onPress={handlePress} />
```

---

## Hermes Debugging

```
// Enable Hermes debugging in metro.config.js
module.exports = {
  transformer: {
    hermesCommand: './node_modules/react-native/sdks/hermesc/osx-bin/hermesc',
  },
};

// Chrome DevTools connection
// 1. Open chrome://inspect in Chrome
// 2. Connect to Hermes device
// 3. Full debugging: breakpoints, profiling, memory
```

---

## React Native Performance Checklist

| Check | Impact | Implementation |
|-------|--------|----------------|
| Hermes enabled | Startup, memory | Default in RN 0.70+ |
| FlashList for large lists | Scroll performance | Replace FlatList |
| Image caching | Network, memory | expo-image or fast-image |
| Reduce re-renders | Frame rate | React.memo, useMemo, useCallback |
| Avoid bridge traffic | Frame rate | New Architecture / JSI |
| Lazy screens | Startup time | React.lazy + Suspense |
| Bundle splitting | Download size | Re.pack or Metro splitting |
| Proguard/R8 (Android) | APK size | Enable in release builds |
| Hermes bytecode | Startup time | Default with Hermes |

---

**Understand the architecture. Respect the boundaries. Optimize deliberately.**
