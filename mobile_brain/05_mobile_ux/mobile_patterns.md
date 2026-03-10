# Mobile UX Patterns

## Foundational Reference

This module codifies the interaction patterns that define how users navigate,
interact with, and consume content in mobile applications. These patterns
are derived from Apple Human Interface Guidelines (HIG), Material Design
guidelines, and established mobile UX research.

References: Apple HIG, Material Design, "Mobile Design Pattern Gallery"
(Theresa Neil), "Designing Interfaces" (Jenifer Tidwell), Nielsen Norman
Group mobile usability research.

---

## Navigation Patterns

### Tab Bar Navigation

The most common navigation pattern for apps with 3-5 top-level sections.

```
┌─────────────────────────────────────────┐
│                                          │
│          Screen Content                  │
│                                          │
│                                          │
│                                          │
├──────────────────────────────────────────┤
│  🏠 Home  │  🔍 Search  │  👤 Profile   │
│  (active) │             │              │
└──────────────────────────────────────────┘

iOS: Bottom tab bar (UITabBarController / TabView)
Android: Bottom navigation (NavigationBar / BottomNavigation)
RN: Bottom tabs (createBottomTabNavigator / Expo Router Tabs)
```

**Rules:**
- Maximum 5 tabs. More than 5 requires a "More" tab or different pattern.
- Each tab maintains its own navigation stack.
- Tapping an already-selected tab scrolls to top (iOS convention) or
  returns to the tab's root screen.
- Tab bar remains visible during in-tab navigation unless explicitly hidden
  (e.g., immersive content, video playback).
- Badge indicators for unread counts or attention-needed states.

### Stack Navigation

Hierarchical navigation where screens push onto a stack:

```
Screen A  →  Screen B  →  Screen C
           (push)       (push)
Screen A  ←  Screen B  ←  Screen C
           (pop/back)   (pop/back)
```

**Rules:**
- Always provide a back button or swipe-back gesture.
- iOS: Back swipe from left edge (UINavigationController default).
- Android: System back button/gesture handles navigation automatically.
- Deep stacks (>4 levels) indicate information architecture problems.

### Drawer Navigation

Side panel for extensive navigation options. Less common in modern apps:

```
┌────┬──────────────────────────────────┐
│    │                                   │
│ D  │       Screen Content              │
│ R  │                                   │
│ A  │                                   │
│ W  │                                   │
│ E  │                                   │
│ R  │                                   │
│    │                                   │
└────┴──────────────────────────────────┘
```

**When to use:** Apps with 6+ top-level sections, admin/enterprise apps,
apps where not all sections need equal visibility.

**When NOT to use:** Consumer apps where discoverability matters. Drawers
hide navigation options, reducing feature discovery.

### Modal Presentation

Temporary screens presented over the current context:

```
iOS patterns:
- Sheet (pageSheet): Slides up, covers most of screen
- Full screen: Covers entire screen
- Popover: Floating panel (iPad)

Android patterns:
- Bottom sheet: Slides up from bottom
- Dialog: Centered floating panel
- Full screen dialog: Covers screen with close button
```

**Rules:**
- Modals are for focused tasks: compose message, apply filter, confirm action.
- Always provide a way to dismiss: close button, swipe down, or cancel.
- Avoid deep navigation within modals. If needed, convert to full screen.
- Modals should not present other modals (maximum: 1 level deep).

---

## Interaction Patterns

### Pull-to-Refresh

The universal gesture for refreshing content in scrollable views:

```
  ↓ Pull down
┌──────────────┐
│  ↻ Loading   │  ← Refresh indicator appears
├──────────────┤
│  Item 1      │
│  Item 2      │
│  Item 3      │
└──────────────┘
```

**Implementation rules:**
- Only on vertically scrollable content.
- Refresh indicator must be clearly visible during the refresh operation.
- Content should update in-place without full screen loading states.
- If refresh fails, show an error inline (snackbar/toast), do not replace
  existing content with an error screen.
- Debounce: Ignore rapid repeated pulls.

### Infinite Scroll (Pagination)

Loading more content as the user scrolls to the end:

```
│  Item 1      │
│  Item 2      │
│  ...         │
│  Item 18     │
│  Item 19     │  ← Trigger: user approaches end
│  Item 20     │
│  ↻ Loading   │  ← Loading indicator at bottom
│  Item 21     │  ← New items appended seamlessly
│  Item 22     │
```

**Implementation rules:**
- Prefetch: Trigger loading when the user is 3-5 items from the end,
  not at the absolute bottom. This prevents visible loading pauses.
- Loading indicator at the bottom of the list, not replacing content.
- Handle end of data gracefully — hide the loading indicator, optionally
  show "No more items" message.
- Maintain scroll position when new items load.
- Provide pull-to-refresh to return to the beginning.

### Swipe Actions

Contextual actions revealed by swiping a list item:

```
Swipe left:                    Swipe right:
┌──────────────────────┐      ┌──────────────────────┐
│  Item 1    ◄── [Delete]│    │[Complete] ──►  Item 1│
│                        │    │                      │
└──────────────────────┘      └──────────────────────┘
```

**Rules:**
- Leading swipe (right): Primary positive action (complete, archive, pin).
- Trailing swipe (left): Destructive or secondary actions (delete, flag).
- Destructive actions (delete) should require confirmation or provide
  undo capability.
- Maximum 3 actions per side. More requires a context menu.
- Actions should be discoverable through other means (long press, edit mode).

### Long Press / Context Menu

Extended press reveals a context menu with additional options:

```
┌──────────────┐
│  Item 1      │
│  ┌────────────────────┐
│  │ Copy              │
│  │ Share             │
│  │ Edit              │
│  │ Delete            │
│  └────────────────────┘
│  Item 3      │
```

**iOS:** Use `.contextMenu` modifier in SwiftUI. Provides haptic feedback
and preview of the item.

**Android:** Use `DropdownMenu` in Compose triggered by long press.

### Gestures

| Gesture | Use Case | Platform |
|---------|----------|----------|
| Tap | Primary action | Both |
| Long press | Context menu, selection mode | Both |
| Swipe horizontal | List actions, page navigation | Both |
| Swipe vertical | Scroll, pull-to-refresh | Both |
| Pinch | Zoom in/out (maps, images) | Both |
| Double tap | Zoom toggle, like (social) | Both |
| Edge swipe (left) | Navigate back | iOS primarily |
| Two-finger scroll | Scroll within nested scrollable | Both |

**Gesture conflict resolution:**
- Vertical scroll takes priority over horizontal in vertical lists.
- Edge swipe for back navigation takes priority over content swipes.
- Always provide non-gesture alternatives for accessibility.

---

## Content Patterns

### Search

```
┌──────────────────────────────────┐
│ 🔍 Search tasks...              │  ← Search bar
├──────────────────────────────────┤
│ Recent Searches                  │  ← Shown when focused, no query
│   task planning                  │
│   weekly review                  │
├──────────────────────────────────┤
│ Suggestions (as-you-type)        │  ← Shown while typing
│   📋 Task: Plan sprint           │
│   📋 Task: Planning document     │
│   🏷️ Tag: planning               │
├──────────────────────────────────┤
│ Results                          │  ← Shown after search
│   Task 1 matching query          │
│   Task 2 matching query          │
│   No more results                │
└──────────────────────────────────┘
```

**Rules:**
- Debounce search input (300ms typical).
- Show recent searches when the search field is focused but empty.
- Show suggestions as the user types.
- Persist search results when navigating to a result and returning.
- Provide clear button (X) in the search field.
- Support search filters (type, date, category) via chips or filter sheet.

### Empty States

Every screen that can have zero content must have a designed empty state:

```
┌──────────────────────────────────┐
│                                   │
│         [Illustration]            │
│                                   │
│    No tasks yet                   │
│    Create your first task to      │
│    get started organizing         │
│                                   │
│    ┌────────────────────────┐    │
│    │   + Create Task        │    │
│    └────────────────────────┘    │
│                                   │
└──────────────────────────────────┘
```

**Rules:**
- Clear explanation of what would be here.
- Actionable CTA to create the first item.
- Illustration or icon for visual interest.
- Differentiate between "empty because new" and "empty because filtered."

### Error States

```
Network error:
┌──────────────────────────────┐
│     [Connection icon]         │
│  Unable to connect            │
│  Check your internet and      │
│  try again                    │
│                               │
│  ┌────────────┐              │
│  │   Retry    │              │
│  └────────────┘              │
└──────────────────────────────┘

Inline error (preserves existing content):
┌──────────────────────────────┐
│ ⚠️ Couldn't refresh. Tap to  │
│    retry.                    │
├──────────────────────────────┤
│  Item 1 (cached)             │
│  Item 2 (cached)             │
└──────────────────────────────┘
```

**Rules:**
- Never show raw error messages or stack traces to users.
- Preserve existing content when possible; show errors inline.
- Always provide a retry action.
- Differentiate between recoverable errors (network) and permanent
  errors (unauthorized, deleted content).

---

## Form Patterns

### Input Validation

- Validate on blur (field loses focus), not on every keystroke.
- Show errors below the field, not in alerts/toasts.
- Highlight the field border in error color.
- Clear the error when the user begins editing again.
- Validate the entire form on submit attempt.

### Keyboard Management

- Fields should not be obscured by the keyboard. Use `KeyboardAvoidingView`
  (RN), automatic avoidance (SwiftUI), or `WindowInsets` (Compose).
- Show appropriate keyboard type: `.emailAddress`, `.numberPad`, `.URL`.
- Set return key: "Next" to advance to next field, "Done" to dismiss.
- Dismiss keyboard on scroll or tap outside.

---

## Touch Target Requirements

| Platform | Minimum Size | Recommended Size |
|----------|-------------|-----------------|
| iOS (Apple HIG) | 44x44 pt | 44x44 pt or larger |
| Android (Material) | 48x48 dp | 48x48 dp or larger |
| WCAG 2.1 AAA | 44x44 CSS px | 44x44 CSS px |

Small touch targets are the single most common mobile usability issue.
Every interactive element must meet minimum size requirements, even if
the visual element is smaller (use padding to expand the hit area).

---

**Patterns are expectations. Users know them. Violate them at your peril.**
