# Mobile Accessibility

## Foundational Reference

This module codifies mobile accessibility as a first-class engineering
requirement. 15% of the global population — over 1 billion people — live
with some form of disability. Accessible mobile apps are not optional;
they are a legal requirement in many jurisdictions and a moral imperative
everywhere. Accessible design also improves usability for all users.

References: Apple Accessibility Programming Guide, Android Accessibility
documentation, WCAG 2.1/2.2 guidelines, Section 508 requirements, EN
301 549 (European accessibility standard), Apple HIG Accessibility section,
Material Design Accessibility guidelines.

---

## Screen Readers

### VoiceOver (iOS)

VoiceOver is Apple's screen reader. It fundamentally changes how users
interact with the app — instead of visual scanning and tapping, users
swipe sequentially through elements and hear descriptions.

```swift
// SwiftUI accessibility
struct TaskRow: View {
    let task: Task

    var body: some View {
        HStack {
            Image(systemName: task.isComplete ? "checkmark.circle.fill" : "circle")
                .foregroundColor(task.isComplete ? .green : .gray)
            VStack(alignment: .leading) {
                Text(task.title)
                    .font(.headline)
                if let dueDate = task.dueDate {
                    Text(dueDate, style: .date)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            Spacer()
            priorityIndicator(task.priority)
        }
        // Combine child elements into single accessible element
        .accessibilityElement(children: .combine)
        // Custom label for VoiceOver
        .accessibilityLabel(taskAccessibilityLabel)
        // Custom hint for action
        .accessibilityHint("Double tap to view details")
        // Custom actions
        .accessibilityAction(named: "Toggle Complete") {
            toggleComplete(task)
        }
        .accessibilityAction(named: "Delete") {
            deleteTask(task)
        }
        // Traits
        .accessibilityAddTraits(task.isComplete ? .isSelected : [])
    }

    private var taskAccessibilityLabel: String {
        var label = task.title
        if task.isComplete {
            label += ", completed"
        }
        if let dueDate = task.dueDate {
            label += ", due \(dueDate.formatted(date: .abbreviated, time: .omitted))"
        }
        label += ", \(task.priority.rawValue) priority"
        return label
    }
}
```

### TalkBack (Android)

TalkBack is Android's screen reader. Compose provides first-class
accessibility support through semantics:

```kotlin
@Composable
fun TaskRow(
    task: Task,
    onToggleComplete: () -> Unit,
    onDelete: () -> Unit,
    onClick: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick)
            // Merge child semantics into one accessible element
            .semantics(mergeDescendants = true) {
                // Custom content description
                contentDescription = buildString {
                    append(task.title)
                    if (task.isComplete) append(", completed")
                    task.dueDate?.let { append(", due ${formatDate(it)}") }
                    append(", ${task.priority.name} priority")
                }
                // State description
                stateDescription = if (task.isComplete) "Completed" else "Not completed"
                // Custom actions
                customActions = listOf(
                    CustomAccessibilityAction("Toggle complete") {
                        onToggleComplete()
                        true
                    },
                    CustomAccessibilityAction("Delete task") {
                        onDelete()
                        true
                    }
                )
            }
            .padding(16.dp)
    ) {
        // Visual content (merged into parent's semantics)
        Checkbox(
            checked = task.isComplete,
            onCheckedChange = null, // Handled by parent
            modifier = Modifier.clearAndSetSemantics { } // Remove from TalkBack
        )
        Column(modifier = Modifier.weight(1f)) {
            Text(task.title, style = MaterialTheme.typography.titleMedium)
            task.dueDate?.let {
                Text(
                    formatDate(it),
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}
```

### React Native Accessibility

```typescript
function TaskRow({ task, onPress, onToggle }: TaskRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${task.title}${task.isComplete ? ', completed' : ''}${
        task.dueDate ? `, due ${formatDate(task.dueDate)}` : ''
      }, ${task.priority} priority`}
      accessibilityHint="Double tap to view details"
      accessibilityState={{
        checked: task.isComplete,
      }}
      accessibilityActions={[
        { name: 'activate', label: 'View details' },
        { name: 'toggleComplete', label: 'Toggle complete' },
        { name: 'delete', label: 'Delete task' },
      ]}
      onAccessibilityAction={(event) => {
        switch (event.nativeEvent.actionName) {
          case 'toggleComplete':
            onToggle(task.id);
            break;
          case 'delete':
            onDelete(task.id);
            break;
        }
      }}
    >
      {/* Visual content */}
    </Pressable>
  );
}
```

---

## Dynamic Type / Font Scaling

Users configure system-wide font size preferences. Apps MUST respect
these settings:

### iOS Dynamic Type

```swift
// SwiftUI automatically supports Dynamic Type with system fonts
Text("Task Title")
    .font(.headline)  // Automatically scales with system settings

Text("Due date")
    .font(.caption)   // Automatically scales

// Custom fonts with Dynamic Type support
Text("Custom")
    .font(.custom("Helvetica", size: 17, relativeTo: .body))

// Layout must accommodate larger text
// Use flexible layouts, not fixed heights
VStack {
    Text(task.title)
        .font(.headline)
        .lineLimit(nil) // Allow wrapping at large sizes
    Text(task.dueDate)
        .font(.caption)
}
.dynamicTypeSize(...DynamicTypeSize.accessibility3) // Cap at accessibility3 if needed
```

### Android Font Scaling

```kotlin
// Compose automatically scales sp-based text sizes
Text(
    text = "Task Title",
    style = MaterialTheme.typography.titleMedium // Uses sp, scales automatically
)

// For layouts that break at large font sizes:
// 1. Use weight-based layouts instead of fixed sizes
// 2. Allow text wrapping
// 3. Test at 200% font scale (developer options)
```

### Dynamic Type Testing

| Scale | iOS Setting | Android Setting |
|-------|------------|----------------|
| Small | Smaller text sizes | Font size: Small |
| Default | Default | Font size: Default |
| Large | Larger text sizes | Font size: Large |
| XL | Accessibility sizes | Font size: Largest |
| XXL | Max accessibility | Display size: Large + Font size: Largest |

**Every screen must be usable at the largest Dynamic Type / font size.**

---

## Color and Contrast

### Minimum Contrast Ratios (WCAG 2.1)

| Content Type | Level AA | Level AAA |
|-------------|----------|-----------|
| Normal text (<18pt) | 4.5:1 | 7:1 |
| Large text (>=18pt or >=14pt bold) | 3:1 | 4.5:1 |
| UI components / graphical objects | 3:1 | Not defined |

### Color Independence

Never use color as the sole means of conveying information:

```
BAD:  🔴 Error    🟢 Success    🟡 Warning
      (red only)  (green only)  (yellow only)

GOOD: ❌ Error    ✓ Success     ⚠️ Warning
      Red + icon  Green + icon  Yellow + icon + text
      + text      + text
```

### Dark Mode Support

```swift
// SwiftUI: Use semantic colors that adapt
Text("Title")
    .foregroundColor(.primary)    // Adapts to dark mode
Text("Subtitle")
    .foregroundColor(.secondary)  // Adapts to dark mode

// Custom colors with dark mode variants
Color("BrandPrimary") // Defined in Assets with light + dark variants
```

---

## Touch Targets

### Minimum Size Requirements

```
┌────────────────────────────────────────┐
│                                        │
│  Visual element: 24x24                 │
│  ┌────────────────────────┐           │
│  │  ┌──────────────┐     │           │
│  │  │   Icon 24pt  │     │           │
│  │  └──────────────┘     │           │
│  │  Hit area: 44x44 pt   │           │
│  └────────────────────────┘           │
│                                        │
│  The hit area (touch target) must      │
│  be at least 44x44 pt (iOS) or        │
│  48x48 dp (Android) even if the       │
│  visual element is smaller.            │
└────────────────────────────────────────┘
```

### Spacing Between Targets

Adjacent touch targets must have at least 8pt/8dp spacing to prevent
accidental activation. This is especially critical for:
- List action buttons
- Navigation bar buttons
- Form elements (radio buttons, checkboxes)
- Tab bar items

---

## Motion and Vestibular Considerations

### Reduce Motion

Some users experience motion sickness from animations. Both platforms
provide a "Reduce Motion" setting:

```swift
// SwiftUI
@Environment(\.accessibilityReduceMotion) var reduceMotion

var body: some View {
    content
        .animation(reduceMotion ? nil : .spring(), value: isExpanded)
}
```

```kotlin
// Compose — check system animation scale
val reduceMotion = LocalDensity.current.let {
    Settings.Global.getFloat(
        context.contentResolver,
        Settings.Global.ANIMATOR_DURATION_SCALE, 1f
    ) == 0f
}
```

---

## Accessibility Testing Checklist

| Test | Tool | Platform |
|------|------|----------|
| Screen reader navigation | VoiceOver | iOS |
| Screen reader navigation | TalkBack | Android |
| Font scaling (200%) | Settings > Display | Both |
| Color contrast | Accessibility Inspector | iOS |
| Color contrast | Scanner app | Android |
| Reduce motion | Settings > Accessibility | Both |
| Switch control | Settings > Accessibility | iOS |
| Switch Access | Settings > Accessibility | Android |
| Voice Control | Settings > Accessibility | iOS |
| Voice Access | Play Store | Android |
| Bold text | Settings > Display | iOS |
| High contrast | Settings > Accessibility | Android |
| Color filters | Settings > Accessibility | Both |

### Automated Testing

```swift
// XCUITest accessibility audit (Xcode 15+)
func testAccessibility() throws {
    let app = XCUIApplication()
    app.launch()
    try app.performAccessibilityAudit()
}
```

---

## Common Accessibility Failures

1. **Missing labels**: Images and icons without `accessibilityLabel`.
   Screen reader announces "button" instead of "Add task button."

2. **Non-semantic elements**: Using `Image` with `onTapGesture` instead of
   `Button`. Screen readers cannot identify it as interactive.

3. **Broken focus order**: Tab/swipe order does not match visual layout.
   Screen reader users navigate in a confusing sequence.

4. **Fixed-height containers**: Text containers with fixed height cause
   content to be clipped at large Dynamic Type sizes.

5. **Color-only information**: Using only red/green to indicate
   error/success without text or icon alternatives.

6. **Missing state announcements**: Toggling a checkbox without announcing
   the new state. User cannot confirm their action succeeded.

7. **Time-limited interactions**: Toast messages that disappear before
   screen reader can announce them. Use minimum 5-second display time
   for screen reader users.

---

**Accessibility is not a feature. It is a requirement. Build it in from day one.**
