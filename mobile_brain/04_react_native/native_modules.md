# Native Modules and Platform-Specific Code

## Foundational Reference

This module codifies the patterns for bridging JavaScript and native code
in React Native. Even with Expo's extensive module ecosystem, production
apps frequently need custom native functionality — accessing platform APIs
not yet wrapped, integrating third-party native SDKs, or optimizing
performance-critical code paths.

References: React Native Native Modules guide, Expo Modules API
documentation, TurboModules specification, React Native New Architecture
working group discussions.

---

## When to Write Native Code

Before writing native modules, verify that no existing solution satisfies
the requirement:

```
Decision: Do I need a custom native module?
│
├── Does an Expo SDK module exist?
│   └── YES → Use the Expo module. STOP.
│
├── Does a community library exist (expo-community, react-native-*)?
│   ├── YES, maintained → Use it. STOP.
│   └── YES, unmaintained → Evaluate forking vs. writing custom.
│
├── Can the functionality be achieved in JavaScript?
│   └── YES → Implement in JS. STOP.
│
└── NO existing solution → Write a native module.
    ├── Using Expo Modules API (recommended for Expo projects)
    └── Using TurboModules (recommended for bare RN projects)
```

---

## Expo Modules API

The Expo Modules API provides a Swift-first and Kotlin-first approach to
writing native modules. It integrates seamlessly with the Expo ecosystem:

### Creating an Expo Module

```bash
# Generate module scaffold
npx create-expo-module my-native-feature

# Structure
modules/my-native-feature/
├── src/
│   └── MyNativeFeatureModule.ts     (TypeScript API)
├── ios/
│   └── MyNativeFeatureModule.swift  (Swift implementation)
├── android/
│   └── src/main/java/.../
│       └── MyNativeFeatureModule.kt (Kotlin implementation)
├── expo-module.config.json
└── package.json
```

### iOS Implementation (Swift)

```swift
import ExpoModulesCore

public class MyNativeFeatureModule: Module {
    public func definition() -> ModuleDefinition {
        Name("MyNativeFeature")

        // Constants exposed to JavaScript
        Constants([
            "PI": Double.pi,
            "platform": "ios"
        ])

        // Synchronous function
        Function("multiply") { (a: Double, b: Double) -> Double in
            return a * b
        }

        // Async function returning a Promise
        AsyncFunction("fetchDeviceInfo") { () -> [String: Any] in
            let device = UIDevice.current
            return [
                "name": device.name,
                "model": device.model,
                "systemVersion": device.systemVersion,
                "batteryLevel": device.batteryLevel
            ]
        }

        // Function that throws errors
        AsyncFunction("readSecureData") { (key: String) -> String in
            guard let data = KeychainHelper.read(key: key) else {
                throw MyNativeFeatureException("Key not found: \(key)")
            }
            return data
        }

        // Event emitter
        Events("onDataChanged", "onError")

        // Start observing
        Function("startObserving") {
            DataObserver.shared.onChange = { [weak self] data in
                self?.sendEvent("onDataChanged", [
                    "value": data.value,
                    "timestamp": data.timestamp
                ])
            }
        }

        // Native view component
        View(MyNativeView.self) {
            Prop("title") { (view: MyNativeView, title: String) in
                view.titleLabel.text = title
            }

            Prop("color") { (view: MyNativeView, color: UIColor) in
                view.backgroundColor = color
            }

            Events("onTap")
        }
    }
}

// Custom exception
class MyNativeFeatureException: GenericException<String> {
    override var reason: String {
        "MyNativeFeature error: \(param)"
    }
}
```

### Android Implementation (Kotlin)

```kotlin
package com.myapp.mynativefeature

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise
import android.os.Build

class MyNativeFeatureModule : Module() {
    override fun definition() = ModuleDefinition {
        Name("MyNativeFeature")

        Constants(
            "PI" to Math.PI,
            "platform" to "android"
        )

        Function("multiply") { a: Double, b: Double ->
            a * b
        }

        AsyncFunction("fetchDeviceInfo") { promise: Promise ->
            val info = mapOf(
                "manufacturer" to Build.MANUFACTURER,
                "model" to Build.MODEL,
                "sdkVersion" to Build.VERSION.SDK_INT,
                "release" to Build.VERSION.RELEASE
            )
            promise.resolve(info)
        }

        AsyncFunction("readSecureData") { key: String, promise: Promise ->
            try {
                val data = EncryptedPrefsHelper.read(appContext.reactContext!!, key)
                if (data != null) {
                    promise.resolve(data)
                } else {
                    promise.reject("NOT_FOUND", "Key not found: $key", null)
                }
            } catch (e: Exception) {
                promise.reject("ERROR", e.message, e)
            }
        }

        Events("onDataChanged", "onError")

        Function("startObserving") {
            DataObserver.instance.setListener { data ->
                sendEvent("onDataChanged", mapOf(
                    "value" to data.value,
                    "timestamp" to data.timestamp
                ))
            }
        }
    }
}
```

### TypeScript API

```typescript
// src/MyNativeFeatureModule.ts
import { NativeModule, requireNativeModule } from 'expo-modules-core';

interface DeviceInfo {
  name?: string;
  model: string;
  systemVersion?: string;
  manufacturer?: string;
  sdkVersion?: number;
}

interface DataChangeEvent {
  value: string;
  timestamp: number;
}

declare class MyNativeFeatureModuleType extends NativeModule<{
  onDataChanged: (event: DataChangeEvent) => void;
  onError: (event: { message: string }) => void;
}> {
  PI: number;
  platform: string;
  multiply(a: number, b: number): number;
  fetchDeviceInfo(): Promise<DeviceInfo>;
  readSecureData(key: string): Promise<string>;
  startObserving(): void;
}

export default requireNativeModule<MyNativeFeatureModuleType>('MyNativeFeature');
```

### Usage in React Components

```typescript
import MyNativeFeature from './MyNativeFeatureModule';
import { useEffect, useState } from 'react';

function DeviceInfoScreen() {
  const [info, setInfo] = useState<DeviceInfo | null>(null);

  // Synchronous call
  const result = MyNativeFeature.multiply(3, 7); // 21

  // Async call
  useEffect(() => {
    MyNativeFeature.fetchDeviceInfo().then(setInfo);
  }, []);

  // Event listener
  useEffect(() => {
    const subscription = MyNativeFeature.addListener('onDataChanged', (event) => {
      console.log('Data changed:', event.value);
    });

    MyNativeFeature.startObserving();

    return () => subscription.remove();
  }, []);

  return (
    <View>
      <Text>Platform: {MyNativeFeature.platform}</Text>
      <Text>Model: {info?.model}</Text>
    </View>
  );
}
```

---

## Platform-Specific Code (No Native Module)

For simple platform differences, React Native provides built-in mechanisms:

### Platform Module

```typescript
import { Platform } from 'react-native';

// Simple conditional
const fontSize = Platform.OS === 'ios' ? 17 : 16;

// Platform.select for cleaner multi-platform values
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
      android: { elevation: 4 },
      default: { borderWidth: 1 },
    }),
  },
});

// Platform version check
if (Platform.OS === 'android' && Platform.Version >= 33) {
  // Android 13+ specific behavior
}
```

### Platform-Specific File Extensions

```
components/
├── Button.tsx           (shared logic)
├── Button.ios.tsx       (iOS-specific implementation)
├── Button.android.tsx   (Android-specific implementation)
└── Button.web.tsx       (Web-specific implementation)

// Import resolves to platform-specific file automatically:
import { Button } from './components/Button';
// On iOS → loads Button.ios.tsx
// On Android → loads Button.android.tsx
```

---

## TurboModules (Bare React Native)

For bare React Native projects not using Expo, TurboModules provide the
modern native module system:

```typescript
// specs/NativeDeviceInfoSpec.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getDeviceModel(): string;  // Synchronous
  getBatteryLevel(): Promise<number>;  // Asynchronous
  getConstants(): {
    platform: string;
    osVersion: string;
  };
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceInfo');
```

### CodeGen

React Native's CodeGen processes TypeScript/Flow specs and generates:
- C++ JSI bindings (the bridge between JS and native)
- Objective-C++ protocols (iOS)
- Java interfaces (Android)

```bash
# CodeGen runs automatically during build, or manually:
npx react-native codegen
```

---

## Native View Components

For wrapping native platform views (maps, video players, custom UI):

### Expo Modules API (Recommended)

```swift
// iOS
import ExpoModulesCore
import MapKit

class ExpoMapView: ExpoView {
    let mapView = MKMapView()

    required init(appContext: AppContext? = nil) {
        super.init(appContext: appContext)
        addSubview(mapView)
        mapView.delegate = self
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        mapView.frame = bounds
    }
}

// In Module definition:
View(ExpoMapView.self) {
    Prop("region") { (view: ExpoMapView, region: MapRegion) in
        let coordinate = CLLocationCoordinate2D(
            latitude: region.latitude,
            longitude: region.longitude
        )
        let span = MKCoordinateSpan(
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta
        )
        view.mapView.setRegion(
            MKCoordinateRegion(center: coordinate, span: span),
            animated: true
        )
    }

    Events("onRegionChange", "onMarkerPress")
}
```

---

## Integration Patterns

### Wrapping Third-Party Native SDKs

```swift
// Example: Wrapping a native analytics SDK
import ExpoModulesCore
import ThirdPartyAnalyticsSDK

class AnalyticsBridgeModule: Module {
    override func definition() -> ModuleDefinition {
        Name("AnalyticsBridge")

        AsyncFunction("initialize") { (apiKey: String) in
            ThirdPartyAnalytics.configure(withKey: apiKey)
        }

        Function("trackEvent") { (name: String, properties: [String: Any]?) in
            ThirdPartyAnalytics.track(event: name, properties: properties ?? [:])
        }

        Function("identifyUser") { (userId: String, traits: [String: Any]?) in
            ThirdPartyAnalytics.identify(userId: userId, traits: traits ?? [:])
        }

        Function("reset") {
            ThirdPartyAnalytics.reset()
        }
    }
}
```

---

## Performance Considerations

| Approach | Overhead | Use Case |
|----------|----------|----------|
| Platform.OS check | Zero (compile-time) | Simple conditionals |
| Platform-specific files | Zero (bundler resolves) | Different implementations |
| Expo Modules sync | Minimal (JSI) | Frequent native calls |
| Expo Modules async | Promise overhead | I/O, long operations |
| TurboModules sync | Minimal (JSI) | Frequent native calls |
| Native Views | View hierarchy cost | Custom native rendering |

---

**Bridge wisely. Every native boundary is a complexity boundary.**
