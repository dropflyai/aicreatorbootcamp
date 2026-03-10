# Mobile Profiling and Performance Measurement

## Foundational Reference

This module codifies the tools and methodologies for profiling mobile
application performance. Profiling is the practice of measuring actual
runtime behavior to identify bottlenecks, validate optimizations, and
establish performance budgets. Optimization without measurement is
guessing. Measurement without methodology is noise.

References: Apple Instruments documentation, Android Studio Profiler
documentation, Flipper documentation, React Native performance
documentation, Google Android Vitals.

---

## iOS Profiling: Instruments

Instruments is Apple's profiling suite, built into Xcode. It provides
hardware-level measurement of CPU, memory, disk, network, and GPU activity.

### Essential Instruments Templates

| Template | Measures | When to Use |
|----------|---------|-------------|
| Time Profiler | CPU usage by function | Startup optimization, identifying hot paths |
| Allocations | Memory allocations over time | Finding memory leaks, excessive allocation |
| Leaks | Memory leak detection | Verifying no retain cycles exist |
| Network | HTTP request timing/size | API optimization, caching validation |
| Core Animation | Frame rate, offscreen rendering | Scroll performance, animation jank |
| System Trace | Thread scheduling, syscalls | Deep performance investigation |
| Energy Log | Battery consumption by subsystem | Battery optimization |
| App Launch | Startup time breakdown | Cold/warm start optimization |

### Using Time Profiler

```
1. Open Instruments (Xcode → Open Developer Tool → Instruments)
2. Select "Time Profiler" template
3. Select target device (ALWAYS profile on real device, not simulator)
4. Click Record, perform the action you want to measure
5. Stop recording
6. Analyze the call tree:
   - Sort by "Self Weight" to find expensive functions
   - Use "Invert Call Tree" to see leaf functions first
   - Use "Hide System Libraries" to focus on your code
   - Look for functions taking >5% of total time
```

### Key Profiling Rules (iOS)

1. **Always profile on a real device**: Simulators run on Mac hardware and
   do not represent actual device performance. An iPhone SE has dramatically
   different characteristics than a Mac.

2. **Profile Release builds**: Debug builds include debugging overhead,
   assertions, and unoptimized code. Profile with the Release scheme
   and Xcode's "Profile" action (Cmd+I).

3. **Profile the oldest supported device**: If you support iPhone SE 2nd gen,
   profile on that device. Performance that is acceptable on iPhone 15 Pro
   may be unacceptable on older hardware.

4. **Measure before optimizing**: Record a baseline measurement before
   making changes. Measure again after. Compare quantitatively.

### MetricKit for Production Monitoring

```swift
import MetricKit

class PerformanceMonitor: NSObject, MXMetricManagerSubscriber {
    static let shared = PerformanceMonitor()

    func startMonitoring() {
        MXMetricManager.shared.add(self)
    }

    func didReceive(_ payloads: [MXMetricPayload]) {
        for payload in payloads {
            // App launch time
            if let launchMetric = payload.applicationLaunchMetrics {
                let coldLaunch = launchMetric.histogrammedTimeToFirstDraw
                    .bucketEnumerator
                // Send to analytics
                analytics.track("launch_time", properties: [
                    "p50": coldLaunch.percentile(50),
                    "p95": coldLaunch.percentile(95)
                ])
            }

            // Hang rate (main thread blocks >250ms)
            if let hangMetric = payload.applicationResponsivenessMetrics {
                let hangRate = hangMetric.applicationHangTime
                analytics.track("hang_rate", properties: [
                    "total_hang_time": hangRate.totalDuration
                ])
            }

            // Memory usage
            if let memoryMetric = payload.memoryMetrics {
                analytics.track("memory_peak", properties: [
                    "peak": memoryMetric.peakMemoryUsage.value
                ])
            }
        }
    }

    func didReceive(_ payloads: [MXDiagnosticPayload]) {
        for payload in payloads {
            // Crash diagnostics
            if let crashes = payload.crashDiagnostics {
                for crash in crashes {
                    // Send crash report to your service
                }
            }

            // Hang diagnostics (detailed call stacks)
            if let hangs = payload.hangDiagnostics {
                for hang in hangs {
                    // Analyze what caused the hang
                }
            }
        }
    }
}
```

---

## Android Profiling: Android Studio Profiler

Android Studio's built-in profiler provides real-time CPU, memory, network,
and energy measurement.

### Profiler Views

| Profiler | Measures | Key Metrics |
|----------|---------|-------------|
| CPU Profiler | Method traces, system traces | Method duration, thread activity |
| Memory Profiler | Heap allocations, GC events | Allocation count, heap size, leaks |
| Network Profiler | HTTP requests, payload size | Request count, latency, size |
| Energy Profiler | Battery consumption estimate | CPU, network, location impact |

### CPU Profiling with System Trace

```
1. Open Android Studio Profiler (View → Tool Windows → Profiler)
2. Select the running app process
3. Click CPU timeline, then "Record" with "System Trace" selected
4. Perform the action to measure
5. Stop recording
6. Analyze:
   - Display section: Look for frame drops (red/yellow indicators)
   - Threads section: Identify main thread blocking
   - Sort by "Wall Duration" to find slow methods
```

### Baseline Profiles for Production Performance

Baseline Profiles tell ART (Android Runtime) which methods to compile
ahead of time, dramatically improving startup and scroll performance:

```kotlin
// benchmark/src/main/java/BaselineProfileGenerator.kt
@OptIn(ExperimentalBaselineProfilesApi::class)
class BaselineProfileGenerator {
    @get:Rule
    val rule = BaselineProfileRule()

    @Test
    fun generateBaselineProfile() {
        rule.collect(packageName = "com.myapp") {
            // Critical user journey: startup
            startActivityAndWait()

            // Critical user journey: scroll main list
            device.findObject(By.res("task_list"))
                .also { it.setGestureMargin(device.displayWidth / 5) }
                .fling(Direction.DOWN)

            // Critical user journey: navigate to detail
            device.findObject(By.res("task_item")).click()
            device.waitForIdle()
        }
    }
}
```

### Android Vitals (Production Monitoring)

Google Play Console provides Android Vitals metrics from production users:

| Metric | Bad Threshold | Impact |
|--------|--------------|--------|
| ANR rate | >0.47% | Play Store ranking penalty |
| Crash rate | >1.09% | Play Store ranking penalty |
| Excessive wakeups | >10/hour | Battery drain warning |
| Stuck partial wake locks | >0.10% | Battery drain warning |
| Excessive background WiFi | >0.10% | Battery drain warning |
| Cold startup time (p99) | >5 seconds | User experience |
| Warm startup time (p99) | >2 seconds | User experience |

---

## React Native Profiling: Flipper and More

### Flipper (Meta's Debugging Platform)

Flipper provides React Native-specific debugging tools:

| Plugin | Purpose |
|--------|---------|
| React DevTools | Component tree, props, state inspection |
| Network | HTTP request inspection and modification |
| Databases | SQLite/AsyncStorage inspection |
| Layout Inspector | View hierarchy visualization |
| Hermes Debugger | JavaScript debugging and profiling |
| Performance | Frame rate monitoring |

### React Native Performance Monitor

```typescript
// Enable in development
import { PerformanceObserver, performance } from 'perf_hooks';

// Custom performance marks
function measureScreenLoad(screenName: string) {
  performance.mark(`${screenName}-start`);

  return () => {
    performance.mark(`${screenName}-end`);
    performance.measure(
      `${screenName}-load`,
      `${screenName}-start`,
      `${screenName}-end`
    );

    const measure = performance.getEntriesByName(`${screenName}-load`)[0];
    console.log(`${screenName} loaded in ${measure.duration.toFixed(2)}ms`);

    // Send to analytics in production
    if (!__DEV__) {
      analytics.track('screen_load_time', {
        screen: screenName,
        duration: measure.duration,
      });
    }
  };
}

// Usage in screen component
function TaskListScreen() {
  useEffect(() => {
    const endMeasure = measureScreenLoad('TaskList');
    return endMeasure;
  }, []);
}
```

### React Native JS Thread Profiling

```
1. In development, enable "Start/Stop JS Profiling" from dev menu
2. Perform the action to profile
3. Stop profiling → generates Chrome trace file
4. Open in Chrome DevTools (chrome://tracing)
5. Analyze:
   - Look for long tasks on JS thread (>16ms blocks)
   - Identify expensive re-renders
   - Find synchronous operations that should be async
```

---

## Performance Budget System

### Defining Budgets

```yaml
# performance-budget.yaml
startup:
  cold_start_p50: 800ms
  cold_start_p95: 1500ms
  cold_start_p99: 2500ms

frames:
  fps_target: 60
  max_dropped_frames_per_second: 3
  scroll_jank_threshold: 16.67ms

memory:
  peak_foreground: 200MB
  peak_background: 50MB
  growth_per_minute: 0MB  # No memory growth = no leaks

network:
  initial_data_load: 500KB
  api_response_p50: 300ms
  api_response_p95: 1000ms

bundle:
  ios_download_size: 30MB
  android_download_size: 25MB
  js_bundle_size: 5MB  # React Native only
```

### Budget Enforcement

```
CI/CD Pipeline Integration:
1. Build the app
2. Run performance tests on CI
3. Compare against budgets
4. FAIL the build if any budget is exceeded
5. Alert the team with specific violations

Tools:
- iOS: XCTest performance tests (measure blocks)
- Android: Macrobenchmark library
- RN: Custom performance test scripts
```

### Performance Regression Detection

```kotlin
// Android Macrobenchmark for CI
@LargeTest
@RunWith(AndroidJUnit4::class)
class StartupBenchmark {
    @get:Rule
    val benchmarkRule = MacrobenchmarkRule()

    @Test
    fun coldStartup() = benchmarkRule.measureRepeated(
        packageName = "com.myapp",
        metrics = listOf(StartupTimingMetric()),
        iterations = 5,
        startupMode = StartupMode.COLD
    ) {
        startActivityAndWait()
    }

    @Test
    fun scrollPerformance() = benchmarkRule.measureRepeated(
        packageName = "com.myapp",
        metrics = listOf(FrameTimingMetric()),
        iterations = 5
    ) {
        startActivityAndWait()
        device.findObject(By.res("task_list")).fling(Direction.DOWN)
    }
}
```

---

## Profiling Workflow

```
Step 1: Establish baseline
  → Profile the current state
  → Record metrics for all five dimensions
  → Document the numbers

Step 2: Identify the bottleneck
  → Use appropriate profiler for the dimension
  → Find the specific function/operation causing the issue
  → Quantify the impact

Step 3: Hypothesize a fix
  → Design the optimization
  → Estimate expected improvement

Step 4: Implement and measure
  → Apply the fix
  → Re-profile with identical conditions
  → Compare against baseline

Step 5: Validate in production
  → Ship the optimization
  → Monitor production metrics
  → Confirm improvement at scale

CRITICAL: Never skip Step 1. You cannot prove improvement without a baseline.
```

---

**If you cannot measure it, you cannot optimize it. Profile first. Always.**
