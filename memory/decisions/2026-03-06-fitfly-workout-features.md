# Decision Log: FitFly Workout Features

**Date:** 2026-03-06
**Project:** FitFly

## Changes Made

### 1. SwipeableExerciseCard Connected
- **File:** `src/components/workout/WorkoutOverview.tsx`
- **Change:** Replaced ExerciseCard with SwipeableExerciseCard
- **Fix:** Removed Pressable wrapper that blocked swipe gestures
- **Drag behavior:** Now tied to menu button (3-dots) instead of whole card

### 2. WorkoutSettingsChips Connected
- **File:** `src/components/workout/WorkoutOverview.tsx`
- **Change:** Added WorkoutSettingsChips component to list header
- **State:** Added workoutSettings state with Duration/Location/Difficulty/MuscleFocus
- **Display:** Only shows in preview mode (not active workout)

### 3. Warmup Sets Added to LiveWorkout
- **File:** `src/screens/v2/LiveWorkout.tsx`
- **Change:** Added isWarmup property to Set interface
- **Feature:** "Add Warmup Sets" button generates 3 warmup sets at 50%, 70%, 85% of working weight
- **UI:** Warmup sets show "W" label with yellow/warning styling

## Verification Status

| Feature | Code Done | Device Verified |
|---------|-----------|-----------------|
| SwipeableExerciseCard | ✅ | ❌ (blocked by login) |
| WorkoutSettingsChips | ✅ | ❌ (blocked by login) |
| Warmup Sets | ✅ | ❌ (blocked by login) |
| Add/Delete Sets | ✅ | ❌ (blocked by login) |
| Drag-drop reorder | ✅ | ❌ (blocked by login) |

## Blocking Issue

Maestro tests fail to reach workout features because:
- App launches to login screen
- No logged-in user state
- Maestro can't authenticate

## Next Steps

1. Either manual device verification with logged-in user
2. Or create Maestro test that handles authentication
3. Or use TestFlight build for user testing
