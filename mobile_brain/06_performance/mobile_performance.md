# Mobile Performance Engineering

## Foundational Reference

Mobile performance engineering is the discipline of measuring, understanding,
and optimizing the runtime behavior of mobile applications across five
dimensions: startup time, frame rate, memory, battery, and network. Unlike
web performance where the server can compensate for client limitations,
mobile performance is constrained by the device in the user's hand.

References: Apple WWDC performance sessions, Android Vitals documentation,
Google RAIL model, "High Performance Mobile Web" (Maximiliano Firtman),
React Native performance documentation.

---

## The Five Dimensions of Mobile Performance

```
┌─────────────────────────────────────────────────────────────┐
│                MOBILE PERFORMANCE MODEL                      │
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐              │
│  │  STARTUP  │  │   FRAME   │  │  MEMORY   │              │
│  │   TIME    │  │   RATE    │  │           │              │
│  │           │  │           │  │           │              │
│  │ Cold <1s  │  │ 60fps min │  │ Stay under│              │
│  │ Warm <0.5s│  │ 120fps on │  │ platform  │              │
│  │ Hot <0.2s │  │ ProMotion │  │ limits    │              │
│  └───────────┘  └───────────┘  └───────────┘              │
│                                                              │
│  ┌───────────┐  ┌───────────┐                              │
│  │  BATTERY  │  │  NETWORK  │                              │
│  │           │  │           │                              │
│  │ Minimize  │  │ Minimize  │                              │
│  │ drain in  │  │ data &    │                              │
│  │ background│  │ latency   │                              │
│  └───────────┘  └───────────┘                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Dimension 1: Startup Time

### Definitions

| Type | Definition | Target |
|------|-----------|--------|
| Cold start | App process not in memory. Full initialization. | <1 second |
| Warm start | Process alive but Activity/VC destroyed. | <0.5 seconds |
| Hot start | App returns from background. | <0.2 seconds |

### Cold Start Breakdown

```
Process creation (OS)        ~100ms (cannot optimize)
├── Runtime initialization   ~50-200ms
│   ├── Dylib loading (iOS)  (minimize dynamic frameworks)
│   ├── DEX loading (Android) (minimize classes.dex)
│   └── JS engine init (RN)  (Hermes bytecode helps)
├── Application init         ~50-500ms (YOUR CODE)
│   ├── DI container setup
│   ├── Database initialization
│   ├── SDK initialization
│   └── Analytics setup
├── First screen render      ~50-200ms
│   ├── Layout calculation
│   ├── View hierarchy creation
│   └── Initial data fetch
└── Interactive              TOTAL: <1 second target
```

### Startup Optimization Strategies

**iOS:**
1. **Reduce dynamic frameworks**: Each dynamic framework adds ~10-30ms to
   launch. Merge small frameworks. Use static linking where possible.
2. **Defer non-essential initialization**: Use `@MainActor` and Task to
   defer analytics, crash reporting, and feature flag SDK init.
3. **Pre-main optimization**: Reduce Objective-C class count, minimize
   static initializers (`+load` methods are startup killers).
4. **SwiftUI scene-phase awareness**: Use `.task` modifier for async
   initialization rather than blocking in `init()`.

**Android:**
1. **Reduce main thread work in Application.onCreate**: Move SDK init to
   background threads or use `App Startup` library for lazy initialization.
2. **Avoid ContentProvider init overhead**: Many libraries initialize via
   ContentProvider. Use App Startup to control initialization order.
3. **Baseline Profiles**: Generate and include baseline profiles that
   precompile critical code paths with ART.
4. **Minimize Hilt module scanning**: Use `@EarlyEntryPoints` only when
   necessary. Large Hilt graphs slow initialization.

**React Native:**
1. **Hermes bytecode compilation**: Hermes precompiles JS to bytecode,
   eliminating parse/compile time at startup.
2. **Lazy TurboModule loading**: TurboModules load on first use, not at
   startup. Ensure no module is eagerly accessed during initialization.
3. **Reduce initial bundle**: Use code splitting and lazy imports for
   screens not shown at startup.
4. **Inline requires**: Enable `inlineRequires` in Metro to defer module
   initialization.

---

## Dimension 2: Frame Rate

### Frame Budget

| Refresh Rate | Frame Budget | Platforms |
|-------------|-------------|-----------|
| 60Hz | 16.67ms per frame | Most Android, older iOS |
| 90Hz | 11.11ms per frame | Some Android flagships |
| 120Hz | 8.33ms per frame | ProMotion iPhones, flagship Android |

Any frame that exceeds the budget is a **dropped frame** (jank). Users
notice jank at 3+ dropped frames in sequence.

### Main Thread Work Budget

The main thread must handle both UI rendering and user input. If any
single frame requires more than the budget:

```
┌──────────────────────────────────────┐
│           16.67ms Frame Budget        │
│                                      │
│  ┌────────┐ ┌────────┐ ┌──────────┐│
│  │ Input  │ │ Layout │ │  Render  ││
│  │ Events │ │ Calc   │ │  (draw)  ││
│  │ ~2ms   │ │ ~4ms   │ │  ~6ms    ││
│  └────────┘ └────────┘ └──────────┘│
│                                      │
│  Remaining: ~4ms for your code       │
│                                      │
│  If exceeded: FRAME DROPPED          │
└──────────────────────────────────────┘
```

### Common Jank Sources

| Source | Impact | Solution |
|--------|--------|----------|
| JSON parsing on main thread | 50-500ms blocks | Parse on background thread |
| Image decoding on main thread | 10-100ms per image | Decode on background, cache decoded |
| Complex layout calculation | 5-50ms | Simplify view hierarchy, use lazy |
| Database queries on main thread | 10-1000ms | Always use async/background |
| Regex on main thread | 1-100ms | Pre-compile, move to background |
| Large list re-render | 16ms+ | Use stable keys, memoize items |

### Frame Rate Optimization

```swift
// iOS: Avoid heavy work during scrolling
class HighPerformanceImageCell: UICollectionViewCell {
    override func prepareForReuse() {
        super.prepareForReuse()
        imageView.image = nil // Release memory immediately
        downloadTask?.cancel() // Cancel pending download
    }

    func configure(with url: URL) {
        // Decode image on background queue
        downloadTask = ImageLoader.shared.load(url) { [weak self] image in
            // Return to main thread for display
            DispatchQueue.main.async {
                self?.imageView.image = image
            }
        }
    }
}
```

---

## Dimension 3: Memory

### Platform Memory Limits

Mobile devices terminate apps that exceed memory thresholds. These limits
are not fixed — they vary by device model and system memory pressure:

| Device | Approximate Limit | Behavior |
|--------|------------------|----------|
| iPhone (1GB RAM) | ~120-180MB | Jetsam termination |
| iPhone (4-6GB) | ~600-1400MB | Jetsam termination |
| Android (2GB) | ~256-384MB per app | OOM kill |
| Android (8GB+) | ~512-1024MB per app | OOM kill |

**Rule: Stay well below these limits.** Background apps are terminated
first when memory pressure rises.

### Memory Leak Detection

Common leak patterns:

1. **Closure capture cycles (iOS)**:
   ```swift
   // LEAK: self retained in closure
   timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) {
       self.updateUI() // Strong reference cycle
   }
   // FIX: Use [weak self]
   timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { [weak self] _ in
       self?.updateUI()
   }
   ```

2. **Context leaks (Android)**:
   ```kotlin
   // LEAK: Activity context in singleton
   object Analytics {
       lateinit var context: Context // Activity context = leak!
   }
   // FIX: Use Application context
   object Analytics {
       lateinit var context: Context // Application context = safe
       fun init(app: Application) { context = app.applicationContext }
   }
   ```

3. **Event listener leaks (React Native)**:
   ```typescript
   // LEAK: No cleanup
   useEffect(() => {
       const sub = EventEmitter.addListener('event', handler);
       // Missing: return () => sub.remove();
   }, []);
   ```

### Image Memory Management

Images are the largest memory consumers in most mobile apps:

| Image Size | Decoded Memory (RGBA) |
|-----------|---------------------|
| 1080x1920 (phone screenshot) | ~8MB |
| 4032x3024 (12MP photo) | ~48MB |
| 8064x6048 (48MP photo) | ~195MB |

**Rules:**
- Never load full-resolution images when displaying thumbnails
- Use downsampling to load images at display size
- Release decoded images when off-screen
- Use image caching libraries that manage memory automatically

---

## Dimension 4: Battery

### Battery Drain Sources

| Source | Impact | Mitigation |
|--------|--------|-----------|
| GPS (continuous) | ~300-500mW | Use significant-location-change |
| Network (cellular) | ~200-400mW per request | Batch requests, use WiFi when possible |
| CPU (sustained) | ~500-2000mW | Offload to background, optimize algorithms |
| Screen (max brightness) | ~500-1500mW | Respect system brightness |
| Bluetooth (continuous) | ~50-100mW | Use background modes appropriately |
| Push notifications | ~5-20mW per notification | Consolidate, use silent push |

### Battery Optimization Strategies

1. **Batch network requests**: Coalesce multiple small requests into fewer
   larger requests. iOS NSURLSession discretionary requests help.

2. **Use push instead of poll**: Push notifications consume orders of
   magnitude less battery than periodic polling.

3. **Respect system signals**: When Low Power Mode is active, reduce
   background activity, animation complexity, and refresh frequency.

4. **Location efficiency**: Use `significantLocationChange` instead of
   continuous GPS. Reduce location accuracy when high precision is not needed.

---

## Dimension 5: Network

### Network Optimization

| Technique | Impact | Implementation |
|-----------|--------|----------------|
| HTTP caching | Eliminates repeat requests | Set Cache-Control headers |
| Image compression | 50-90% size reduction | WebP/AVIF format, quality 80% |
| Request coalescing | Fewer connections | Batch API calls |
| Delta sync | Transfer only changes | Last-modified/ETag headers |
| Compression | 60-80% payload reduction | gzip/brotli content encoding |
| Prefetching | Zero perceived latency | Predict next screen data |

### Performance Budgets

| Metric | Budget | Measurement |
|--------|--------|-------------|
| Cold start | <1 second | Time to first frame |
| Time to interactive | <2 seconds | Time to first input response |
| Frame rate | 60fps (16.67ms) | Dropped frame count |
| App size (initial) | <50MB | IPA/AAB download size |
| Memory (typical) | <200MB | Resident memory |
| API response (p50) | <300ms | Network round trip |
| API response (p95) | <1 second | Network round trip |
| Battery (1hr use) | <10% drain | Battery profiler |

---

**Performance is not an optimization. It is an architecture decision.**
