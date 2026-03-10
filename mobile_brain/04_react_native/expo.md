# Expo Platform

## Foundational Reference

This module codifies the Expo platform — a comprehensive development
platform built on React Native that provides managed build services,
over-the-air updates, file-based routing, and a curated module ecosystem.
Expo has become the recommended way to build React Native applications.

References: Expo documentation, Expo blog, EAS documentation, Expo Router
documentation, Expo SDK reference.

---

## Expo Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    EXPO PLATFORM                         │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Expo SDK    │  │  EAS Build   │  │  EAS Update  │  │
│  │  Cross-plat  │  │  Cloud native│  │  OTA JS      │  │
│  │  modules     │  │  builds      │  │  updates     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Expo Router  │  │ EAS Submit   │  │  Expo Dev    │  │
│  │ File-based   │  │ App Store    │  │  Client      │  │
│  │ navigation   │  │ submission   │  │  Testing     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Expo Modules API                     │   │
│  │  Swift/Kotlin native module authoring             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Project Setup

### Creating a New Expo Project

```bash
# Create with Expo Router template (recommended)
npx create-expo-app@latest my-app --template tabs

# Project structure
my-app/
├── app/                    (Expo Router — file-based routing)
│   ├── _layout.tsx         (Root layout with providers)
│   ├── index.tsx           (Home screen → /  )
│   ├── (tabs)/             (Tab group)
│   │   ├── _layout.tsx     (Tab bar configuration)
│   │   ├── index.tsx       (First tab)
│   │   ├── search.tsx      (Search tab)
│   │   └── profile.tsx     (Profile tab)
│   ├── task/
│   │   └── [id].tsx        (Dynamic route → /task/123)
│   ├── (auth)/             (Auth group — no tab bar)
│   │   ├── _layout.tsx     (Stack layout)
│   │   ├── login.tsx       (Login screen)
│   │   └── register.tsx    (Register screen)
│   └── +not-found.tsx      (404 screen)
│
├── components/             (Shared components)
├── hooks/                  (Shared hooks)
├── services/               (API, storage, etc.)
├── constants/              (Theme, config)
├── assets/                 (Static assets)
├── app.json                (Expo configuration)
├── eas.json                (EAS Build/Update config)
└── tsconfig.json
```

### app.json / app.config.ts Configuration

```typescript
// app.config.ts — dynamic configuration
import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'My App',
  slug: 'my-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'myapp',  // Deep linking scheme
  userInterfaceStyle: 'automatic',

  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.company.myapp',
    buildNumber: '1',
    infoPlist: {
      NSCameraUsageDescription: 'Used to scan documents',
      NSLocationWhenInUseUsageDescription: 'Used to find nearby services',
    },
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.company.myapp',
    versionCode: 1,
    permissions: ['CAMERA', 'ACCESS_FINE_LOCATION'],
  },

  plugins: [
    'expo-router',
    ['expo-camera', { cameraPermission: 'Allow camera access for scanning' }],
    ['expo-location', { locationAlwaysAndWhenInUsePermission: 'Allow location access' }],
    'expo-secure-store',
  ],

  extra: {
    eas: { projectId: 'your-project-id' },
    apiUrl: process.env.API_URL ?? 'https://api.myapp.com',
  },

  updates: {
    url: 'https://u.expo.dev/your-project-id',
  },

  runtimeVersion: {
    policy: 'appVersion',
  },
});
```

---

## Expo Router

Expo Router provides file-system based routing, similar to Next.js:

### Route Conventions

| File | Route | Description |
|------|-------|-------------|
| `app/index.tsx` | `/` | Home screen |
| `app/about.tsx` | `/about` | Static route |
| `app/task/[id].tsx` | `/task/123` | Dynamic segment |
| `app/task/[...rest].tsx` | `/task/a/b/c` | Catch-all route |
| `app/(tabs)/_layout.tsx` | — | Tab navigator group |
| `app/(auth)/_layout.tsx` | — | Auth stack group |
| `app/+not-found.tsx` | — | 404 fallback |

### Layout System

```typescript
// app/_layout.tsx — Root layout
import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/services/auth';
import { ThemeProvider } from '@/services/theme';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="task/[id]"
              options={{ presentation: 'modal', title: 'Task Detail' }}
            />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

// app/(tabs)/_layout.tsx — Tab layout
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### Type-Safe Navigation

```typescript
// Typed navigation with Expo Router
import { router, useLocalSearchParams } from 'expo-router';

// Navigate with type safety
function navigateToTask(taskId: string) {
  router.push(`/task/${taskId}`);
}

// With params object
router.push({
  pathname: '/task/[id]',
  params: { id: taskId },
});

// Read params in destination
function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // id is typed as string
}

// Replace (no back)
router.replace('/login');

// Go back
router.back();

// Navigate and clear stack
router.dismissAll();
router.push('/');
```

---

## EAS Build

EAS Build compiles native iOS and Android binaries in the cloud:

### eas.json Configuration

```json
{
  "cli": { "version": ">= 12.0.0" },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "env": {
        "API_URL": "https://dev-api.myapp.com"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release"
      },
      "env": {
        "API_URL": "https://staging-api.myapp.com"
      }
    },
    "production": {
      "autoIncrement": true,
      "env": {
        "API_URL": "https://api.myapp.com"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your@email.com",
        "ascAppId": "1234567890"
      },
      "android": {
        "serviceAccountKeyPath": "./google-credentials.json",
        "track": "internal"
      }
    }
  }
}
```

### Build Commands

```bash
# Development build (with dev client for debugging)
eas build --profile development --platform ios

# Preview build (for internal testing)
eas build --profile preview --platform all

# Production build
eas build --profile production --platform all

# Submit to stores
eas submit --profile production --platform ios
eas submit --profile production --platform android
```

---

## EAS Update (Over-the-Air Updates)

EAS Update pushes JavaScript bundle updates without app store review.
This is one of the most powerful advantages of React Native/Expo:

```bash
# Publish an update to the preview channel
eas update --channel preview --message "Fix task sorting bug"

# Publish to production
eas update --channel production --message "Add new filter options"

# Roll back to previous update
eas update:rollback --channel production
```

### Update Strategy in Code

```typescript
import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';

export function useOTAUpdates() {
  useEffect(() => {
    if (__DEV__) return; // Skip in development

    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          // Optionally show a prompt before reloading
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.warn('OTA update check failed:', error);
      }
    };

    // Check on app foreground
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkForUpdates();
      }
    });

    // Also check on mount
    checkForUpdates();

    return () => subscription.remove();
  }, []);
}
```

### Update Channels and Branching

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  development│     │   preview   │     │  production │
│   channel   │     │   channel   │     │   channel   │
│             │     │             │     │             │
│  Dev builds │     │  Preview    │     │  Production │
│  with dev   │     │  builds for │     │  builds in  │
│  client     │     │  QA/testing │     │  app stores │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       ▼                   ▼                   ▼
  eas update          eas update          eas update
  --channel dev       --channel preview   --channel production
```

---

## Expo SDK Modules

Key Expo SDK modules for common mobile needs:

| Module | Purpose | Installation |
|--------|---------|-------------|
| `expo-camera` | Camera access | `npx expo install expo-camera` |
| `expo-file-system` | File operations | `npx expo install expo-file-system` |
| `expo-image` | Performant images | `npx expo install expo-image` |
| `expo-location` | GPS location | `npx expo install expo-location` |
| `expo-notifications` | Push notifications | `npx expo install expo-notifications` |
| `expo-secure-store` | Encrypted storage | `npx expo install expo-secure-store` |
| `expo-haptics` | Haptic feedback | `npx expo install expo-haptics` |
| `expo-local-authentication` | Biometrics | `npx expo install expo-local-authentication` |
| `expo-av` | Audio/video | `npx expo install expo-av` |
| `expo-linking` | Deep links | `npx expo install expo-linking` |
| `expo-splash-screen` | Splash screen | `npx expo install expo-splash-screen` |

### Secure Storage Example

```typescript
import * as SecureStore from 'expo-secure-store';

class TokenStorage {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  static async saveTokens(access: string, refresh: string): Promise<void> {
    await Promise.all([
      SecureStore.setItemAsync(this.ACCESS_TOKEN_KEY, access, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      }),
      SecureStore.setItemAsync(this.REFRESH_TOKEN_KEY, refresh, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      }),
    ]);
  }

  static async getAccessToken(): Promise<string | null> {
    return SecureStore.getItemAsync(this.ACCESS_TOKEN_KEY);
  }

  static async clearTokens(): Promise<void> {
    await Promise.all([
      SecureStore.deleteItemAsync(this.ACCESS_TOKEN_KEY),
      SecureStore.deleteItemAsync(this.REFRESH_TOKEN_KEY),
    ]);
  }
}
```

---

## Development Workflow

```
1. Local Development
   npx expo start         → Dev server with hot reload
   npx expo start --ios   → Open in iOS Simulator
   npx expo start --android → Open in Android Emulator

2. Development Build
   eas build --profile development → Custom dev client
   → Install on device for testing native modules

3. Preview Build
   eas build --profile preview → Internal distribution
   → QA testing with staging API

4. OTA Update
   eas update --channel preview → Push JS changes instantly

5. Production Build
   eas build --profile production → Store-ready binary

6. Submission
   eas submit --platform all → Submit to App Store + Play Store
```

---

**Expo removes friction. EAS provides infrastructure. Ship faster, iterate sooner.**
