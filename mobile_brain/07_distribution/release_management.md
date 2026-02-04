# Release Management

## Foundational Reference

Mobile release management encompasses the entire pipeline from code commit
to app store availability — including CI/CD configuration, code signing,
beta testing, staged rollouts, and hotfix procedures. Unlike web deployment
where rollbacks are instant, mobile releases require app store review and
user-side updates, making release discipline critical.

References: Apple App Store Review Guidelines, Google Play Developer
Policy, Fastlane documentation, Expo EAS documentation, Bitrise/CircleCI
mobile CI guides.

---

## Mobile CI/CD Pipeline

### Pipeline Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    MOBILE CI/CD PIPELINE                      │
│                                                              │
│  Code Push                                                   │
│  │                                                           │
│  ├── Lint & Static Analysis                                 │
│  │   ├── SwiftLint (iOS)                                    │
│  │   ├── Detekt / ktlint (Android)                          │
│  │   ├── ESLint + TypeScript (React Native)                 │
│  │   └── Danger for PR checks                               │
│  │                                                           │
│  ├── Unit Tests                                             │
│  │   ├── XCTest / Swift Testing (iOS)                       │
│  │   ├── JUnit + Compose Testing (Android)                  │
│  │   └── Jest (React Native)                                │
│  │                                                           │
│  ├── Build                                                   │
│  │   ├── Xcode Build (iOS)                                  │
│  │   ├── Gradle Build (Android)                             │
│  │   └── EAS Build (React Native)                           │
│  │                                                           │
│  ├── Integration / UI Tests                                 │
│  │   ├── XCUITest (iOS)                                     │
│  │   ├── Espresso / Compose Testing (Android)               │
│  │   └── Detox / Maestro (React Native)                     │
│  │                                                           │
│  ├── Beta Distribution                                      │
│  │   ├── TestFlight (iOS)                                   │
│  │   ├── Play Console Internal/Closed Testing (Android)     │
│  │   └── EAS Internal Distribution (React Native)           │
│  │                                                           │
│  └── Production Release                                     │
│      ├── App Store submission + review                      │
│      ├── Play Store submission + review                     │
│      └── Staged rollout (1% → 10% → 50% → 100%)           │
└──────────────────────────────────────────────────────────────┘
```

### GitHub Actions Example (iOS)

```yaml
name: iOS CI
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4

      - name: Select Xcode
        run: sudo xcode-select -s /Applications/Xcode_15.2.app

      - name: Resolve dependencies
        run: xcodebuild -resolvePackageDependencies

      - name: Run tests
        run: |
          xcodebuild test \
            -scheme MyApp \
            -destination 'platform=iOS Simulator,name=iPhone 15' \
            -resultBundlePath TestResults.xcresult \
            | xcbeautify

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: TestResults.xcresult

  build:
    needs: test
    runs-on: macos-14
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Install certificates
        env:
          P12_CERT: ${{ secrets.P12_CERTIFICATE_BASE64 }}
          P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
          PROVISION_PROFILE: ${{ secrets.PROVISIONING_PROFILE_BASE64 }}
        run: |
          # Decode and install certificate and provisioning profile
          echo "$P12_CERT" | base64 --decode > certificate.p12
          security create-keychain -p "" build.keychain
          security import certificate.p12 -k build.keychain -P "$P12_PASSWORD"

      - name: Build archive
        run: |
          xcodebuild archive \
            -scheme MyApp \
            -archivePath MyApp.xcarchive \
            -allowProvisioningUpdates

      - name: Upload to TestFlight
        run: |
          xcodebuild -exportArchive \
            -archivePath MyApp.xcarchive \
            -exportOptionsPlist ExportOptions.plist \
            -exportPath build/
          xcrun altool --upload-app -f build/MyApp.ipa \
            --apiKey ${{ secrets.APP_STORE_KEY_ID }} \
            --apiIssuer ${{ secrets.APP_STORE_ISSUER_ID }}
```

---

## Code Signing

### iOS Code Signing

```
Certificate Types:
├── Development: For running on test devices during development
├── Distribution (App Store): For App Store and TestFlight
└── Distribution (Ad Hoc): For internal distribution outside App Store

Provisioning Profiles:
├── Development: Ties development cert to specific device UDIDs
├── App Store: Ties distribution cert to app bundle ID
├── Ad Hoc: Ties distribution cert to specific device UDIDs (up to 100)
└── Enterprise: For in-house distribution (Enterprise Program only)

Flow:
1. Apple issues Certificate (tied to your signing key)
2. Provisioning Profile bundles:
   - Certificate reference
   - App ID (bundle identifier)
   - Device UDIDs (dev/ad hoc only)
   - Entitlements (push, iCloud, HealthKit, etc.)
3. Xcode signs the binary with the certificate
4. Device/App Store validates the signature
```

### Android Code Signing

```
Keystore:
├── Debug keystore: Auto-generated, for development only
└── Release keystore: YOU generate, guards app identity FOREVER
    ├── Key alias: Identifier within the keystore
    ├── Key password: Protects the specific key
    └── Keystore password: Protects the keystore file

CRITICAL: If you lose the release keystore, you CANNOT update the app.
Keep the keystore in a secure vault (1Password, AWS Secrets Manager).

Google Play App Signing:
- Google manages the app signing key
- You upload with an upload key
- Google re-signs with the app signing key
- If you lose your upload key, Google can reset it
- RECOMMENDED: Always opt into Play App Signing
```

---

## Beta Testing

### TestFlight (iOS)

| Testing Type | Limit | Review Required | Expiration |
|-------------|-------|----------------|-----------|
| Internal | 100 testers | No | 90 days |
| External | 10,000 testers | Yes (Beta Review) | 90 days |

### Play Console Testing Tracks

| Track | Limit | Review Required | Rollout |
|-------|-------|----------------|---------|
| Internal | 100 testers | No | Immediate |
| Closed | Unlimited (by list) | No | Immediate |
| Open | Unlimited (public link) | Yes | Immediate |
| Production | All users | Yes | Staged |

### Beta Testing Workflow

```
1. Feature complete → merge to release branch
2. CI builds release candidate
3. Deploy to Internal Testing (TestFlight / Play Internal)
4. QA team verifies on real devices (minimum: 3 iOS + 3 Android devices)
5. Fix critical bugs, re-deploy if needed
6. Deploy to External Testing for wider beta
7. Collect feedback for 3-7 days
8. Fix issues, prepare release notes
9. Submit to App Store / Play Store review
10. After approval, staged rollout
```

---

## Staged Rollout Strategy

### Google Play Staged Rollout

```
Day 0: Release to 1% of users
  → Monitor crash rate, ANR rate, ratings
  → 24-hour observation period

Day 1: If metrics stable, increase to 5%
  → Continue monitoring

Day 2: Increase to 10%
  → Check for edge-case crashes

Day 3-4: Increase to 25%
  → Monitor user feedback and reviews

Day 5-6: Increase to 50%
  → Final validation

Day 7: Full rollout (100%)

HALT CONDITIONS (stop rollout immediately):
- Crash rate exceeds 2x baseline
- ANR rate exceeds 0.5%
- Average rating drops below 4.0
- Critical bug reports from users
```

### iOS Phased Release

Apple supports automatic phased release over 7 days:

| Day | Percentage |
|-----|-----------|
| 1 | 1% |
| 2 | 2% |
| 3 | 5% |
| 4 | 10% |
| 5 | 20% |
| 6 | 50% |
| 7 | 100% |

You can pause and resume the phased release from App Store Connect.
Users who search for the app explicitly always get the latest version.

---

## Hotfix Procedure

```
SEVERITY ASSESSMENT:
├── P0 (Critical): Crash on launch, data loss, security vulnerability
│   → Immediate hotfix, expedite review
│
├── P1 (High): Crash in core flow, major feature broken
│   → Hotfix within 24 hours, request expedited review
│
├── P2 (Medium): Non-core feature broken, workaround exists
│   → Fix in next scheduled release
│
└── P3 (Low): Visual bug, minor inconvenience
    → Fix in next scheduled release

P0/P1 HOTFIX PROCESS:
1. Branch from latest release tag (not from develop)
2. Apply minimal fix (do NOT include other changes)
3. Test fix on affected devices/OS versions
4. Expedite internal QA (1-2 hours, not full regression)
5. Submit for review
   - iOS: Request expedited review (App Store Connect)
   - Android: Request expedited review (Play Console)
   - React Native: Push OTA update (if JS-only fix)
6. Monitor after release
```

### OTA Hotfix (React Native / Expo)

For JavaScript-only bugs in React Native apps, OTA updates bypass the
app store review entirely:

```bash
# Emergency OTA fix
git checkout production
git cherry-pick <fix-commit>
eas update --channel production --message "Hotfix: Fix crash in task list"

# The fix is available to users within minutes
# No app store review required
# No user action required (update applies automatically)
```

**OTA limitations:**
- Cannot fix native code bugs (Swift/Kotlin/Objective-C)
- Cannot add new native modules or permissions
- Cannot change the app's native configuration
- Must match the runtime version of the installed binary

---

## Version Strategy

### Semantic Versioning for Mobile

```
Major.Minor.Patch (e.g., 2.3.1)

Major: Breaking changes, major redesigns
  → Triggers full regression testing
  → May require data migration

Minor: New features, enhancements
  → Standard release process
  → Regular release cadence (bi-weekly or monthly)

Patch: Bug fixes, performance improvements
  → Accelerated release process
  → Can be hotfixed

Build number: Monotonically increasing integer
  → iOS: CFBundleVersion (must increase for each TestFlight build)
  → Android: versionCode (must increase for each Play Store upload)
```

---

## Release Checklist (Summary)

- [ ] All CI checks pass (lint, tests, build)
- [ ] No P0/P1 bugs open for this release
- [ ] Release notes written (user-facing, not technical)
- [ ] Screenshots updated if UI changed
- [ ] Privacy policy updated if data collection changed
- [ ] Internal testing completed on minimum 3 device types
- [ ] Performance metrics within budgets
- [ ] Crash-free rate above 99%
- [ ] Analytics events verified for new features
- [ ] Deep links tested for new screens
- [ ] Staged rollout plan documented

---

**Releases are irreversible. Be disciplined. Be measured. Be prepared.**
