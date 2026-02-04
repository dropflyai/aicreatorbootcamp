# App Store Optimization (ASO)

## Foundational Reference

App Store Optimization is the discipline of maximizing an app's visibility
and conversion rate within the Apple App Store and Google Play Store. ASO
is the mobile equivalent of SEO — without it, even excellent apps remain
undiscoverable. ASO combines keyword research, creative optimization, ratings
management, and iterative testing.

References: Apple App Store Connect documentation, Google Play Console
documentation, Sensor Tower ASO research, AppTweak ASO guides, StoreMaven
conversion optimization studies.

---

## ASO Fundamentals

### The ASO Funnel

```
Impressions (app appears in search/browse)
    │
    ├── Conversion Rate 1: Impression → Product Page View
    │   Factors: Icon, title, subtitle, screenshots (first 2)
    │
    ▼
Product Page Views (user taps to see full listing)
    │
    ├── Conversion Rate 2: Page View → Install
    │   Factors: Screenshots, description, ratings, reviews, size
    │
    ▼
Installs
    │
    ├── Retention: Day 1, Day 7, Day 30
    │   Factors: App quality, onboarding, value delivery
    │
    ▼
Revenue / Engagement
```

### ASO Factors by Impact

| Factor | App Store Impact | Play Store Impact |
|--------|-----------------|-------------------|
| App name/title | Very High | Very High |
| Subtitle (iOS) / Short description (Android) | High | High |
| Keywords field (iOS only) | Very High | N/A |
| Long description | Low (not indexed) | High (indexed for search) |
| Icon | Very High (conversion) | Very High (conversion) |
| Screenshots | Very High (conversion) | Very High (conversion) |
| Video preview | Medium (conversion) | Medium (conversion) |
| Ratings & reviews | Very High (both) | Very High (both) |
| Update frequency | Medium | Medium |
| Download volume | High (ranking) | High (ranking) |
| Retention rate | High (ranking) | Very High (ranking) |
| Crash rate | Medium (ranking) | High (Android Vitals) |

---

## Keyword Optimization

### iOS Keyword Strategy

Apple provides a 100-character keyword field (hidden from users). Combined
with the app name (30 characters) and subtitle (30 characters), you have
160 characters for keyword targeting.

**Rules:**
1. **No duplicates**: Words in the title and subtitle are automatically
   indexed. Do not repeat them in the keyword field.
2. **Comma-separated, no spaces after commas**: Maximize character usage.
   `task,manager,todo,list` not `task, manager, todo, list`.
3. **Singular forms only**: Apple indexes both singular and plural. Use
   "task" not "tasks" to save characters.
4. **No prepositions or articles**: Apple ignores "the," "a," "and," etc.
   Do not waste characters on them.
5. **Competitor names are prohibited**: Apple rejects keyword stuffing with
   competitor brand names.

**Keyword research process:**
1. Brainstorm 50-100 relevant keywords.
2. Check search volume using App Store Connect search ads or third-party
   tools (Sensor Tower, AppTweak).
3. Assess competition difficulty for each keyword.
4. Prioritize: high volume + low competition = best targets.
5. Distribute across title, subtitle, and keyword field.
6. Test and iterate monthly based on rankings and impressions.

### Google Play Keyword Strategy

Google Play indexes the full description, title, and short description.
The algorithm is closer to web search:

**Rules:**
1. **Title (30 chars)**: Include the most important keyword naturally.
2. **Short description (80 chars)**: Include 2-3 target keywords.
3. **Long description (4000 chars)**: Use target keywords naturally
   throughout. Aim for 3-5 mentions of primary keywords without stuffing.
4. **Keyword density matters**: Unlike iOS, Google indexes the description.
   Natural repetition improves ranking.
5. **Backend keywords**: Google also considers the app's category,
   developer name, and package name for ranking.

---

## Creative Optimization

### App Icon Design

The icon is the most important visual asset. It determines whether users
tap on your listing from search results:

| Guideline | Rationale |
|-----------|-----------|
| Single focal element | Icons are 60x60pt on screen. Complexity is invisible. |
| No text in icon | Text is unreadable at display size. App name is shown below. |
| Bold, simple shapes | Recognizable at a glance in a grid of icons. |
| Distinctive color | Stand out from competitors. Research competitor icon colors. |
| No photos | Photos lose detail at icon size. Use illustrated or abstract style. |
| Platform-appropriate | iOS: rounded rectangle, no border. Android: adaptive icon. |
| Test variations | A/B test icon variants. Small changes impact conversion. |

### Screenshots

Screenshots are the highest-impact creative asset for conversion:

```
┌─────────────────────────────────────────┐
│  Screenshot Strategy (iOS Example)       │
│                                          │
│  Screen 1: Hero shot                    │
│  "Organize your tasks effortlessly"      │
│  Shows the main value proposition        │
│                                          │
│  Screen 2: Key feature #1               │
│  "Smart reminders that work for you"     │
│  Shows the most differentiating feature  │
│                                          │
│  Screen 3: Key feature #2               │
│  "Collaborate with your team"            │
│  Shows social/collaboration features     │
│                                          │
│  Screen 4: Key feature #3               │
│  "Beautiful insights at a glance"        │
│  Shows analytics/dashboard features      │
│                                          │
│  Screen 5: Social proof                 │
│  "Loved by 1M+ users"                   │
│  Shows ratings, testimonials, awards     │
│                                          │
│  iOS: Up to 10 screenshots              │
│  Android: Up to 8 screenshots           │
│  First 2-3 are most critical            │
│  (visible without scrolling)             │
└─────────────────────────────────────────┘
```

**Screenshot rules:**
1. Lead with the benefit, not the feature. "Save 2 hours a week" > "Task manager."
2. Show real app UI with context (captions, device frames optional).
3. First screenshot should communicate the core value in 3 seconds.
4. Use captions with large, readable text. Users scan, not read.
5. Maintain visual consistency (color palette, typography, style).
6. Size correctly: iPhone 6.7" (1290x2796) is the mandatory size.
7. Localize screenshots for each market.

---

## Ratings and Reviews Management

### Impact of Ratings

| Average Rating | Conversion Impact |
|---------------|-------------------|
| 4.5+ stars | Maximum conversion rate |
| 4.0-4.4 | Slight decrease (~5-10%) |
| 3.5-3.9 | Significant decrease (~20-30%) |
| Below 3.5 | Severe decrease (~50%+), potential delisting risk |

### Rating Prompt Strategy

```swift
// iOS: SKStoreReviewController (system prompt)
import StoreKit

class ReviewManager {
    private let defaults = UserDefaults.standard

    func requestReviewIfAppropriate() {
        let launchCount = defaults.integer(forKey: "launchCount") + 1
        defaults.set(launchCount, forKey: "launchCount")

        let hasCompletedAction = defaults.bool(forKey: "hasCompletedCoreAction")
        let lastReviewRequest = defaults.object(forKey: "lastReviewRequest") as? Date

        // Only ask if:
        // 1. User has launched 5+ times
        // 2. User has completed a core action (task completion, etc.)
        // 3. Not asked in the last 120 days
        let daysSinceLastRequest = lastReviewRequest.map {
            Calendar.current.dateComponents([.day], from: $0, to: Date()).day ?? 0
        } ?? 999

        if launchCount >= 5 && hasCompletedAction && daysSinceLastRequest > 120 {
            // System prompt — Apple controls frequency (max 3/year)
            if let scene = UIApplication.shared.connectedScenes
                .first(where: { $0.activationState == .foregroundActive }) as? UIWindowScene {
                SKStoreReviewController.requestReview(in: scene)
                defaults.set(Date(), forKey: "lastReviewRequest")
            }
        }
    }
}
```

**Review prompt rules:**
1. Ask after a positive moment (task completed, goal achieved).
2. Never ask during onboarding or first session.
3. Never ask after an error or frustrating experience.
4. Use Apple's `SKStoreReviewController` (iOS) — custom prompts are
   rejected by App Review.
5. On Android, use the Google Play In-App Review API.
6. Respect user's choice — do not nag.

### Responding to Reviews

1. Respond to ALL negative reviews (1-3 stars) within 24 hours.
2. Acknowledge the issue, apologize, and provide a solution or timeline.
3. After fixing the issue, update the response mentioning the fix.
4. Positive reviews (4-5 stars): Respond selectively to build community.
5. Never argue with reviewers. Be professional and empathetic.

---

## Localization for ASO

| Element | Localizable | Impact |
|---------|------------|--------|
| App name | Yes | Very High |
| Subtitle | Yes | High |
| Keywords (iOS) | Yes | Very High |
| Description | Yes | Medium-High (Play Store) |
| Screenshots | Yes | Very High |
| Video preview | Yes | Medium |

**Prioritize localization for markets with significant potential users.**
Localized listings see 25-40% higher conversion in non-English markets.

---

## ASO Testing and Iteration

### A/B Testing

**Apple:** Custom Product Pages (up to 35 variants). Test icon, screenshots,
and app preview. Requires App Store Connect setup.

**Google Play:** Store Listing Experiments (up to 5 variants). Test icon,
feature graphic, screenshots, short description, long description.

### ASO Review Cadence

| Frequency | Action |
|-----------|--------|
| Weekly | Monitor keyword rankings and impression trends |
| Bi-weekly | Respond to reviews, update review responses |
| Monthly | Update keywords based on ranking/impression data |
| Quarterly | Refresh screenshots and creative assets |
| Per release | Update "What's New" with compelling release notes |

---

**ASO is not set-and-forget. It is a continuous optimization discipline.**
