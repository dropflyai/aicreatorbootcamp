# Mobile Optimization Techniques

## Foundational Reference

This module provides actionable optimization techniques for the most
common performance bottlenecks in mobile applications: images, data
loading, caching, and bundle size. Each technique includes platform-specific
implementation guidance and measurable impact expectations.

References: Apple WWDC image optimization sessions, Android developer
performance guides, React Native performance optimization, Shopify
performance case studies.

---

## Image Optimization

Images are the single largest contributor to both network bandwidth and
memory consumption in most mobile applications.

### Image Format Selection

| Format | Use Case | Compression | Animation | Transparency |
|--------|----------|-------------|-----------|-------------|
| WebP | General purpose (recommended) | Lossy + Lossless | Yes | Yes |
| AVIF | Next-gen (where supported) | Best compression | Yes | Yes |
| HEIF/HEIC | iOS photos | Excellent | Yes (Live Photo) | Yes |
| JPEG | Legacy fallback | Lossy only | No | No |
| PNG | Icons, logos, UI elements | Lossless | No | Yes |
| SVG | Vector icons, illustrations | N/A (vector) | Limited | Yes |

**Rule:** Use WebP as the default format for all raster images. Serve
AVIF where supported (iOS 16+, Android 12+). Use SVG for icons.

### Image Sizing

Never load images larger than the display size. Calculate the required
pixel dimensions and request appropriately sized images:

```swift
// iOS: Downsampling large images to display size
func downsample(imageAt url: URL, to pointSize: CGSize, scale: CGFloat) -> UIImage? {
    let maxDimension = max(pointSize.width, pointSize.height) * scale
    let options: [CFString: Any] = [
        kCGImageSourceCreateThumbnailFromImageAlways: true,
        kCGImageSourceShouldCacheImmediately: true,
        kCGImageSourceCreateThumbnailWithTransform: true,
        kCGImageSourceThumbnailMaxPixelSize: maxDimension
    ]

    guard let source = CGImageSourceCreateWithURL(url as CFURL, nil),
          let cgImage = CGImageSourceCreateThumbnailAtIndex(source, 0, options as CFDictionary)
    else { return nil }

    return UIImage(cgImage: cgImage)
}
```

```kotlin
// Android: BitmapFactory with inSampleSize
fun decodeSampledBitmap(path: String, reqWidth: Int, reqHeight: Int): Bitmap {
    val options = BitmapFactory.Options().apply {
        inJustDecodeBounds = true
    }
    BitmapFactory.decodeFile(path, options)

    options.inSampleSize = calculateInSampleSize(options, reqWidth, reqHeight)
    options.inJustDecodeBounds = false

    return BitmapFactory.decodeFile(path, options)
}

fun calculateInSampleSize(options: BitmapFactory.Options, reqW: Int, reqH: Int): Int {
    val (height, width) = options.outHeight to options.outWidth
    var inSampleSize = 1
    if (height > reqH || width > reqW) {
        val halfHeight = height / 2
        val halfWidth = width / 2
        while (halfHeight / inSampleSize >= reqH && halfWidth / inSampleSize >= reqW) {
            inSampleSize *= 2
        }
    }
    return inSampleSize
}
```

### Image Caching Strategy

```
┌─────────────────────────────────────────────────┐
│              IMAGE CACHING PIPELINE               │
│                                                   │
│  Request Image                                    │
│  │                                                │
│  ├── L1: Memory Cache (LRU, decoded bitmaps)     │
│  │   Hit: <1ms, return immediately               │
│  │                                                │
│  ├── L2: Disk Cache (compressed files)           │
│  │   Hit: 5-50ms, decode and return              │
│  │   (also populate L1)                          │
│  │                                                │
│  └── L3: Network                                 │
│      Fetch, decode, cache to L2 and L1           │
│      50-5000ms depending on network              │
└─────────────────────────────────────────────────┘
```

**Recommended libraries:**
- **iOS**: SDWebImage, Kingfisher, or Nuke
- **Android**: Coil (Kotlin-first, Compose-native)
- **React Native**: expo-image (recommended), react-native-fast-image

```typescript
// React Native with expo-image (recommended)
import { Image } from 'expo-image';

function TaskImage({ url }: { url: string }) {
  return (
    <Image
      source={{ uri: url }}
      style={{ width: 80, height: 80, borderRadius: 8 }}
      placeholder={blurhash}          // Show blurhash while loading
      contentFit="cover"
      transition={200}                 // Fade-in transition
      cachePolicy="memory-disk"        // Cache in memory and disk
      recyclingKey={url}               // Optimize list recycling
    />
  );
}
```

---

## Lazy Loading

### Screen-Level Lazy Loading

Only load screen content when the user navigates to it:

```typescript
// React Native: Lazy screen loading
import { lazy, Suspense } from 'react';

const SettingsScreen = lazy(() => import('./features/settings/SettingsScreen'));
const ProfileScreen = lazy(() => import('./features/profile/ProfileScreen'));

// In navigation setup
function TabNavigator() {
  return (
    <Tabs>
      <Tabs.Screen name="home" component={HomeScreen} />
      <Tabs.Screen
        name="settings"
        component={() => (
          <Suspense fallback={<ScreenSkeleton />}>
            <SettingsScreen />
          </Suspense>
        )}
      />
    </Tabs>
  );
}
```

### List-Level Lazy Loading

```swift
// SwiftUI: LazyVStack for efficient list rendering
ScrollView {
    LazyVStack(spacing: 8) {  // Only renders visible items
        ForEach(items) { item in
            ItemRow(item: item)
                .onAppear {
                    // Prefetch next page when near end
                    if item.id == items[items.count - 5].id {
                        viewModel.loadNextPage()
                    }
                }
        }
    }
}
```

---

## Caching Strategies

### Cache Hierarchy

| Layer | Storage | Lifetime | Size | Use Case |
|-------|---------|----------|------|----------|
| In-memory | RAM | Session | 50-200MB | Decoded images, computed data |
| Disk (structured) | SQLite/Room | Persistent | Configurable | API responses, user data |
| Disk (file) | File system | Persistent | 100-500MB | Images, media, documents |
| HTTP cache | URLCache/OkHttp | Header-driven | 50-200MB | API responses |

### API Response Caching

```kotlin
// Android: OkHttp cache with stale-while-revalidate pattern
val client = OkHttpClient.Builder()
    .cache(Cache(
        directory = context.cacheDir.resolve("http_cache"),
        maxSize = 50L * 1024 * 1024 // 50MB
    ))
    .addInterceptor { chain ->
        val request = chain.request()
        if (!networkMonitor.isConnected()) {
            // Force cache when offline
            request.newBuilder()
                .cacheControl(CacheControl.FORCE_CACHE)
                .build()
                .let { chain.proceed(it) }
        } else {
            chain.proceed(request)
        }
    }
    .build()
```

### Stale-While-Revalidate Pattern

```
Request data
│
├── Is data in cache?
│   ├── YES, and fresh → Return cached data. Done.
│   ├── YES, but stale → Return cached data immediately.
│   │                     Background: fetch fresh data, update cache.
│   └── NO → Fetch from network, cache, return.
│
Result: Users almost always see instant content.
Freshness is maintained in the background.
```

---

## Bundle Size Optimization

### iOS App Thinning

Apple automatically optimizes app delivery:
- **Slicing**: Only device-specific resources are downloaded
- **On-Demand Resources (ODR)**: Assets downloaded when needed, not at install

```swift
// On-Demand Resources
let request = NSBundleResourceRequest(tags: ["level-5-assets"])
request.beginAccessingResources { error in
    if let error = error {
        // Handle: download failed
        return
    }
    // Assets available at Bundle.main paths
    let image = UIImage(named: "level5_background")
}

// Release when done
request.endAccessingResources()
```

### Android App Bundle

```kotlin
// build.gradle.kts
android {
    bundle {
        language { enableSplit = true }     // Split by language
        density { enableSplit = true }      // Split by screen density
        abi { enableSplit = true }          // Split by CPU architecture
    }

    buildTypes {
        release {
            isMinifyEnabled = true          // R8 code shrinking
            isShrinkResources = true        // Remove unused resources
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"))
        }
    }
}
```

### React Native Bundle Analysis

```bash
# Analyze bundle size
npx react-native-bundle-visualizer

# Or with source-map-explorer
npx source-map-explorer dist/main.js
```

### Size Reduction Techniques

| Technique | Platform | Typical Savings |
|-----------|----------|----------------|
| Enable R8/ProGuard | Android | 20-40% code |
| Enable Bitcode | iOS | 10-20% binary |
| WebP images | All | 25-35% over JPEG |
| Remove unused imports | All | 5-15% bundle |
| Tree shaking | RN | 10-30% JS bundle |
| Hermes bytecode | RN | ~50% JS parse time |
| Dynamic frameworks → static | iOS | 5-15% launch time |
| Split APK | Android | 30-50% download |

---

## Database Query Optimization

```kotlin
// Room: Use proper indices
@Entity(
    tableName = "tasks",
    indices = [
        Index(value = ["due_date"]),           // Common sort/filter
        Index(value = ["is_complete"]),         // Common filter
        Index(value = ["category_id"]),         // Foreign key lookup
        Index(value = ["created_at"])           // Common sort
    ]
)
data class TaskEntity(/* ... */)

// Room: Use projections for list views
@Query("""
    SELECT id, title, is_complete, due_date, priority
    FROM tasks
    WHERE is_complete = 0
    ORDER BY due_date ASC
    LIMIT :limit OFFSET :offset
""")
fun getTaskSummaries(limit: Int, offset: Int): Flow<List<TaskSummary>>
// Don't SELECT * when you only need 5 of 15 columns
```

---

## Optimization Decision Priority

When optimizing, attack the highest-impact items first:

```
Priority 1: Startup time
  → Users who wait >3 seconds abandon the app
  → Impact: Retention

Priority 2: Scroll performance (jank)
  → Users notice dropped frames immediately
  → Impact: Perceived quality

Priority 3: Network efficiency
  → Reduces data usage, improves battery life
  → Impact: Cost to user, battery

Priority 4: Memory
  → Prevents background termination
  → Impact: State preservation

Priority 5: Bundle size
  → Affects initial download conversion
  → Impact: Acquisition
```

---

**Optimize what matters. Measure before and after. Do not guess.**
