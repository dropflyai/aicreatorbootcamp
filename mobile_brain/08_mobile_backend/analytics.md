# Mobile Analytics

## Foundational Reference

Mobile analytics encompasses event tracking, crash reporting, performance
monitoring, feature flags, and A/B testing. Together, these systems provide
the data infrastructure that enables evidence-based product decisions.
Without analytics, product development is guesswork.

References: Firebase Analytics documentation, Amplitude documentation,
Mixpanel documentation, Sentry documentation, LaunchDarkly documentation,
Statsig documentation.

---

## Analytics Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                 MOBILE ANALYTICS STACK                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Event Collection                    │   │
│  │  User actions, screen views, conversions, errors      │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────────────────┼───────────────────────────────┐   │
│  │               Event Pipeline                          │   │
│  │  Batching, deduplication, enrichment, transmission    │   │
│  └──────────────────────┬───────────────────────────────┘   │
│                         │                                    │
│  ┌──────────┬───────────┼───────────┬───────────────────┐   │
│  │          │           │           │                    │   │
│  ▼          ▼           ▼           ▼                    │   │
│  Product    Crash      Performance  Experiment           │   │
│  Analytics  Reporting  Monitoring   Platform             │   │
│  (Amplitude,(Sentry,   (Firebase   (LaunchDarkly,       │   │
│  Mixpanel)  Crashlytics)Perf Mon)  Statsig)             │   │
└──────────────────────────────────────────────────────────────┘
```

---

## Event Tracking

### Event Taxonomy

A well-structured event taxonomy is critical. Without consistent naming,
analytics data becomes unusable:

```typescript
// Event naming convention: object_action
// Examples:
// task_created, task_completed, task_deleted
// screen_viewed, button_tapped, search_performed
// subscription_started, subscription_cancelled
// onboarding_step_completed, onboarding_skipped

// Type-safe event definitions
interface AnalyticsEvents {
  // Screen events
  screen_viewed: {
    screen_name: string;
    previous_screen?: string;
    source?: 'deep_link' | 'notification' | 'navigation';
  };

  // Task events
  task_created: {
    task_id: string;
    has_due_date: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    source: 'fab' | 'inline' | 'voice' | 'siri';
  };

  task_completed: {
    task_id: string;
    time_to_complete_hours: number;
    was_overdue: boolean;
  };

  // Conversion events
  paywall_viewed: {
    source: string;
    variant?: string;
  };

  subscription_started: {
    plan: 'monthly' | 'yearly';
    trial: boolean;
    source: string;
  };

  // Error events
  error_occurred: {
    error_code: string;
    error_message: string;
    screen: string;
    user_action?: string;
  };
}
```

### Analytics Service Implementation

```typescript
// Abstraction layer over analytics providers
class AnalyticsService {
  private providers: AnalyticsProvider[] = [];

  constructor(providers: AnalyticsProvider[]) {
    this.providers = providers;
  }

  // Track event to all providers
  track<K extends keyof AnalyticsEvents>(
    event: K,
    properties: AnalyticsEvents[K]
  ): void {
    const enrichedProperties = {
      ...properties,
      timestamp: Date.now(),
      app_version: Application.nativeApplicationVersion,
      platform: Platform.OS,
      os_version: Platform.Version,
      device_model: Device.modelName,
      session_id: SessionManager.currentSessionId,
    };

    for (const provider of this.providers) {
      try {
        provider.track(event, enrichedProperties);
      } catch (error) {
        console.warn(`Analytics provider ${provider.name} failed:`, error);
      }
    }
  }

  // Identify user across providers
  identify(userId: string, traits: UserTraits): void {
    for (const provider of this.providers) {
      provider.identify(userId, traits);
    }
  }

  // Screen tracking
  trackScreen(screenName: string, properties?: Record<string, unknown>): void {
    this.track('screen_viewed', {
      screen_name: screenName,
      ...properties,
    } as AnalyticsEvents['screen_viewed']);
  }

  // Flush pending events (call before app backgrounds)
  async flush(): Promise<void> {
    await Promise.all(
      this.providers.map((p) => p.flush().catch(() => {}))
    );
  }
}

// Provider interface
interface AnalyticsProvider {
  name: string;
  track(event: string, properties: Record<string, unknown>): void;
  identify(userId: string, traits: Record<string, unknown>): void;
  flush(): Promise<void>;
}
```

### Automatic Screen Tracking

```typescript
// React Navigation screen tracking
import { useNavigationContainerRef } from '@react-navigation/native';

function App() {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string | undefined>();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute()?.name;
      }}
      onStateChange={() => {
        const previousScreen = routeNameRef.current;
        const currentScreen = navigationRef.getCurrentRoute()?.name;

        if (previousScreen !== currentScreen && currentScreen) {
          analytics.trackScreen(currentScreen, {
            previous_screen: previousScreen,
          });
        }

        routeNameRef.current = currentScreen;
      }}
    >
      {/* App content */}
    </NavigationContainer>
  );
}
```

---

## Crash Reporting

### Sentry Integration

```typescript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://your-dsn@sentry.io/project-id',
  environment: __DEV__ ? 'development' : 'production',
  tracesSampleRate: __DEV__ ? 1.0 : 0.2,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 30000,

  beforeSend(event) {
    // Scrub sensitive data
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },

  integrations: [
    new Sentry.ReactNativeTracing({
      tracingOrigins: ['api.myapp.com'],
      routingInstrumentation: Sentry.reactNavigationIntegration,
    }),
  ],
});

// Manual error capture with context
function handleError(error: Error, context: Record<string, unknown>) {
  Sentry.withScope((scope) => {
    scope.setContext('app_state', context);
    scope.setTag('feature', context.feature as string);
    Sentry.captureException(error);
  });
}

// Error boundary for React components
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtra('componentStack', errorInfo.componentStack);
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

### Crash Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Crash-free users | >99.5% | <99% |
| Crash-free sessions | >99.9% | <99.5% |
| ANR-free (Android) | >99.5% | <99% |
| New crash types per release | <5 | >10 |
| P0 crash resolution time | <24 hours | >48 hours |

---

## Feature Flags

Feature flags enable decoupled deployment from feature release, gradual
rollouts, and instant kill switches:

```typescript
// Feature flag service
import { statsig } from 'statsig-react-native';

// Initialize on app start
await statsig.initialize(
  'client-sdk-key',
  { userID: currentUser.id, email: currentUser.email }
);

// Check feature flag
function useFeatureFlag(flagName: string): boolean {
  return statsig.checkGate(flagName);
}

// Get experiment variant
function useExperiment(experimentName: string) {
  const config = statsig.getExperiment(experimentName);
  return {
    variant: config.get('variant', 'control') as string,
    config: config,
  };
}

// Usage in component
function TaskListScreen() {
  const showNewFilter = useFeatureFlag('new_task_filter');
  const { variant } = useExperiment('task_sort_experiment');

  return (
    <View>
      {showNewFilter && <NewFilterBar />}
      <TaskList sortOrder={variant === 'test' ? 'smart' : 'date'} />
    </View>
  );
}
```

### Feature Flag Best Practices

1. **Every new feature behind a flag**: Enables instant rollback without
   code deployment.
2. **Clean up flags**: Remove flags within 30 days of 100% rollout.
   Stale flags accumulate technical debt.
3. **Flag naming convention**: `feature_name_description`, e.g.,
   `task_list_smart_sort`, `paywall_annual_discount`.
4. **Gradual rollout**: 1% -> 10% -> 50% -> 100%, monitoring metrics
   at each stage.
5. **Kill switch pattern**: Critical features should have a kill switch
   flag that can be disabled instantly if issues are detected.

---

## A/B Testing

### Experiment Design

```
HYPOTHESIS: Showing task count in the tab bar badge will increase
daily task completion rate.

METRIC (primary): Tasks completed per day per user
METRIC (guardrail): App uninstall rate (must not increase)

VARIANTS:
- Control (50%): No badge on Tasks tab
- Test (50%): Badge showing incomplete task count

SAMPLE SIZE: Minimum 10,000 users per variant
DURATION: 14 days minimum (to capture weekly patterns)

SUCCESS CRITERIA: >5% lift in primary metric with p<0.05
                  No degradation in guardrail metrics
```

### Experiment Analytics

```typescript
// Track experiment exposure
function TaskTab({ experimentVariant }: { experimentVariant: string }) {
  useEffect(() => {
    analytics.track('experiment_exposed', {
      experiment: 'task_tab_badge',
      variant: experimentVariant,
    });
  }, []);

  return experimentVariant === 'test' ? (
    <TabBarWithBadge />
  ) : (
    <TabBarWithoutBadge />
  );
}

// Track conversion events
function completeTask(taskId: string) {
  analytics.track('task_completed', {
    task_id: taskId,
    experiment_variant: getCurrentVariant('task_tab_badge'),
  });
}
```

---

## Privacy and Compliance

### Data Minimization

1. **Collect only what you need**: If you do not use a data point for
   decisions, do not collect it.
2. **Anonymize when possible**: Use anonymous IDs before authentication.
   Only link to user identity when necessary.
3. **Respect platform privacy**: Honor iOS App Tracking Transparency (ATT)
   and Android privacy settings.
4. **Document data collection**: Maintain a data dictionary of every
   event and property. Required for privacy policy and App Store
   privacy labels.

### App Tracking Transparency (iOS)

```swift
import AppTrackingTransparency

func requestTrackingPermission() async -> ATTrackingManager.AuthorizationStatus {
    return await ATTrackingManager.requestTrackingAuthorization()
}

// Only use IDFA if user has opted in
func getAdvertisingIdentifier() -> String? {
    guard ATTrackingManager.trackingAuthorizationStatus == .authorized else {
        return nil
    }
    return ASIdentifierManager.shared().advertisingIdentifier.uuidString
}
```

### App Store Privacy Labels

Document ALL data collected by your app and third-party SDKs:

| Data Type | Collection Purpose | Linked to Identity | Tracking |
|-----------|-------------------|-------------------|----------|
| User ID | App functionality | Yes | No |
| Crash logs | App functionality | No | No |
| Performance data | Analytics | No | No |
| Purchase history | App functionality | Yes | No |
| Search queries | Analytics | No | No |

---

**Analytics without action is overhead. Measure what matters. Act on what you measure.**
