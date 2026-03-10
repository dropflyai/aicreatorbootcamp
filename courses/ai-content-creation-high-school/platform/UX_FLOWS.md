# AI Creator Bootcamp — UX Flows & Screens

## Screen Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  /                     → Landing (pre-auth)                    │
│  /join                 → Class code entry + signup             │
│  /onboarding           → First-time setup                      │
│                                                                 │
│  /home                 → Dashboard (main entry point)          │
│  /learn                → Course content browser                │
│  /learn/week/[n]       → Week overview                         │
│  /learn/session/[id]   → Lesson content                        │
│                                                                 │
│  /create               → New project flow                      │
│  /create/[id]/edit     → Edit existing project                 │
│                                                                 │
│  /gallery              → Class gallery                         │
│  /gallery/[id]         → Single project view                   │
│                                                                 │
│  /profile              → My profile + portfolio                │
│  /profile/[username]   → Other student's profile               │
│  /profile/settings     → Account settings                      │
│                                                                 │
│  /challenges           → Active + past challenges              │
│  /challenges/[id]      → Single challenge                      │
│                                                                 │
│  /instructor           → Instructor dashboard (role-gated)     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flow 1: First-Time User Journey

### Step 1: Landing Page

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    AI CREATOR BOOTCAMP                          │
│                                                                 │
│         [Animated background: subtle gradient shift]           │
│                                                                 │
│                                                                 │
│              🎬 10 weeks to creator mastery                    │
│                                                                 │
│                                                                 │
│           ┌────────────────────────────────────┐               │
│           │                                    │               │
│           │    What kind of creator are you?   │               │
│           │                                    │               │
│           │  ┌──────┐ ┌──────┐ ┌──────┐       │               │
│           │  │  🎭  │ │  📚  │ │  📖  │       │               │
│           │  │      │ │      │ │      │       │               │
│           │  │Enter-│ │Educa-│ │Story-│       │               │
│           │  │tainer│ │ tor  │ │teller│       │               │
│           │  └──────┘ └──────┘ └──────┘       │               │
│           │                                    │               │
│           └────────────────────────────────────┘               │
│                                                                 │
│                                                                 │
│           Already have an account? [Sign in]                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: First Win (Pre-Signup)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Nice! Entertainers make people stop scrolling.                │
│                                                                 │
│  Let's try your first hook. What would make someone stop       │
│  and watch YOUR video?                                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  "POV: You finally _______________________"             │   │
│  │                                                         │   │
│  │  [User types: understand why your alarm clock hates     │   │
│  │   you]                                                  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                    [See the magic →]                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3: AI Feedback

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ✨ Not bad for your first hook!                                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  "POV: You finally understand why your alarm clock     │   │
│  │   hates you"                                            │   │
│  │                                                         │   │
│  │  ───────────────────────────────────────────────────── │   │
│  │                                                         │   │
│  │  ✓ Relatable situation                                 │   │
│  │  ✓ POV format (proven performer)                       │   │
│  │  💡 Try: Add a time pressure ("at 6 AM")               │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  This is just the beginning. Want to save your progress       │
│  and join your class?                                          │
│                                                                 │
│              [Create account & continue →]                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 4: Minimal Signup

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ← Back                                                        │
│                                                                 │
│                    Join AI Creator Bootcamp                    │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  Class Code (from your instructor)                     │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ ABC-123-XYZ                                     │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  Email                                                  │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ student@school.edu                              │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  Password                                               │   │
│  │  ┌─────────────────────────────────────────────────┐   │   │
│  │  │ ••••••••••••                                    │   │   │
│  │  └─────────────────────────────────────────────────┘   │   │
│  │                                                         │   │
│  │  [Create Account]                                      │   │
│  │                                                         │   │
│  │  ─────────── or ───────────                            │   │
│  │                                                         │   │
│  │  [Continue with Google]                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 5: Profile Setup

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    Make it yours                                │
│                                                                 │
│                    ┌──────────┐                                │
│                    │          │                                │
│                    │  [Tap    │                                │
│                    │   to     │                                │
│                    │  upload] │                                │
│                    │          │                                │
│                    └──────────┘                                │
│                    [Generate AI avatar instead]                │
│                                                                 │
│  What should we call you?                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Sarah                                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Pick your vibe (accent color)                                 │
│  [🟢] [🟣] [🔵] [🟡] [🔴] [Custom]                              │
│                                                                 │
│  One-liner about you                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Making study content that doesn't suck                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                    [Let's go →]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 6: Class Entry

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    Welcome to your class! 🎉                   │
│                                                                 │
│  AI Creator Bootcamp - Spring 2026                             │
│  Instructor: Mr. Johnson                                       │
│                                                                 │
│  Your classmates                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  [👤] [👤] [👤] [👤] [👤] [👤] [+19 more]              │   │
│  │                                                         │   │
│  │  23 of 25 have joined                                   │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  📹 Welcome message from Mr. Johnson                   │   │
│  │  [Play video thumbnail]                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                    [Start your journey →]                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flow 2: Weekly Learning Flow

### Week Overview

```
┌─────────────────────────────────────────────────────────────────┐
│  ← All Weeks                                   🔥 7   ⚡ 1,450  │
│                                                                 │
│  WEEK 4                                                         │
│  "Video That Stops the Scroll"                                 │
│                                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 40%              │
│                                                                 │
│  SESSIONS                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ✓ Session 1: The Hook Is Everything    90 min   [Done] │   │
│  └─────────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ Session 2: Filming & Editing          90 min [Start] │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  THIS WEEK'S PROJECT                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🎬 "60-Second Banger"                                   │   │
│  │                                                         │   │
│  │ Create one polished short-form video ready              │   │
│  │ for publishing.                                         │   │
│  │                                                         │   │
│  │ Requirements:                                           │   │
│  │ • 30-60 seconds                                        │   │
│  │ • Clear hook in first 3 seconds                        │   │
│  │ • Captions throughout                                  │   │
│  │ • At least 3 pattern interrupts                        │   │
│  │                                                         │   │
│  │ [View Full Brief] [Start Project]                      │   │
│  │                                                         │   │
│  │ Due: Friday • 12/25 submitted                          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  RESOURCES                                                      │
│  [📥 Platform Specs Cheatsheet]                                │
│  [📥 Hook Formulas PDF]                                        │
│  [📥 CapCut Shortcuts]                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Lesson View (Mobile-Optimized)

```
┌───────────────────────────────┐
│ ← Week 4         Session 2   │
│ ━━━━━━━━━━━━━━━━━━━ 3/7      │
├───────────────────────────────┤
│                               │
│  ┌─────────────────────────┐ │
│  │                         │ │
│  │                         │ │
│  │    [VERTICAL VIDEO]     │ │
│  │                         │ │
│  │    "Lighting Basics"    │ │
│  │                         │ │
│  │         [▶]             │ │
│  │                         │ │
│  │                         │ │
│  │                         │ │
│  └─────────────────────────┘ │
│                               │
│  [◀ Previous]  [Next ▶]      │
│                               │
├───────────────────────────────┤
│                               │
│  KEY TAKEAWAYS               │
│                               │
│  • Light in FRONT, not back  │
│  • Window = free pro light   │
│  • Avoid backlit scenes      │
│                               │
├───────────────────────────────┤
│                               │
│  TRY IT NOW (+25 XP)         │
│                               │
│  Record a 10-second clip     │
│  using window lighting       │
│                               │
│  [📷 Record]  [📤 Upload]    │
│                               │
└───────────────────────────────┘
```

---

## Flow 3: Project Creation

### Step 1: Start Creating

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                                        │
│                                                                 │
│                    NEW PROJECT                                  │
│                                                                 │
│  What are you submitting?                                      │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                       │
│  │          │ │          │ │          │                       │
│  │   📤     │ │   📷     │ │   🔗     │                       │
│  │          │ │          │ │          │                       │
│  │  Upload  │ │  Record  │ │   Link   │                       │
│  │  a file  │ │   now    │ │ external │                       │
│  │          │ │          │ │          │                       │
│  └──────────┘ └──────────┘ └──────────┘                       │
│                                                                 │
│  Supported: MP4, MOV, PNG, JPG (max 500MB)                    │
│                                                                 │
│                                                                 │
│  Submitting for:                                               │
│  [Week 4: 60-Second Banger ▼]                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Add Details

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                           [Next →]     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │              [VIDEO THUMBNAIL PREVIEW]                  │   │
│  │                                                         │   │
│  │                      0:47                               │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Title                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Morning Routine That Actually Works                     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  What was your goal for this piece?                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ I wanted to show my actual routine with good lighting   │   │
│  │ and practice using pattern interrupts every 5 seconds.  │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Techniques used (select all that apply)                      │
│  [✓ Hook] [✓ Lighting] [ ] Audio] [✓ Pacing] [ ] B-roll]     │
│  [ ] Captions] [ ] Transitions] [ ] Loop design]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 3: Self-Assessment

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                        [Submit →]      │
│                                                                 │
│                    SELF-ASSESSMENT                             │
│                                                                 │
│  Be honest — this helps you and your instructor know where    │
│  to focus feedback.                                            │
│                                                                 │
│  Rate your hook (first 3 seconds)                             │
│  [1] [2] [3] [4] [5]                                          │
│   😬      😐      🔥                                           │
│                                                                 │
│  Rate your pacing                                              │
│  [1] [2] [3] [4] [5]                                          │
│   😬      😐      🔥                                           │
│                                                                 │
│  Rate your technical quality                                   │
│  [1] [2] [3] [4] [5]                                          │
│   😬      😐      🔥                                           │
│                                                                 │
│  What would you improve if you had more time?                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ The audio could be cleaner - I was near a fan.         │   │
│  │ Also the ending is abrupt, I'd add a proper CTA.       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Visibility                                                    │
│  ○ Class only                                                  │
│  ● Public gallery (can be featured)                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Step 4: Submission Confirmation

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                         ✨                                      │
│                                                                 │
│                    Project submitted!                          │
│                                                                 │
│                    +150 XP earned                              │
│                                                                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  "Morning Routine That Actually Works"                  │   │
│  │                                                         │   │
│  │  You'll receive peer feedback within 48 hours.         │   │
│  │                                                         │   │
│  │  To unlock feedback on your work, give feedback        │   │
│  │  to 2 classmates first.                                │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [View in Gallery]    [Give Feedback Now]                     │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flow 4: Giving Feedback

### Feedback Queue

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                                        │
│                                                                 │
│                    FEEDBACK QUEUE                              │
│                                                                 │
│  Help your classmates grow. Each quality feedback = +50 XP    │
│                                                                 │
│  Your feedback given this week: 2/2 ✓                         │
│  (You've unlocked feedback on your projects!)                 │
│                                                                 │
│  PROJECTS NEEDING FEEDBACK                                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Thumbnail]  "Study With Me ASMR"                       │   │
│  │              by @marcus_m • Week 4                      │   │
│  │              0 feedback received         [Give Feedback]│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Thumbnail]  "3 Apps You Need"                          │   │
│  │              by @alex_creates • Week 4                  │   │
│  │              1 feedback received         [Give Feedback]│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Thumbnail]  "POV: Finals Week"                         │   │
│  │              by @jordan_j • Week 4                      │   │
│  │              2 feedback received         [Give Feedback]│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Feedback Form

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                                        [Submit →]      │
│                                                                 │
│  GIVE FEEDBACK                                                 │
│  "Study With Me ASMR" by @marcus_m                            │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │              [VIDEO PLAYER]                             │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  WARM FEEDBACK (required)                                      │
│  What's working well?                                          │
│                                                                 │
│  I noticed the [lighting               ▼] was                 │
│  [really effective  ▼] because                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ the window light gives a cozy vibe that matches        │   │
│  │ the ASMR mood perfectly                                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  COOL FEEDBACK (optional)                                      │
│  What could be explored further?                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Maybe add captions so people can watch without sound   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  QUICK REACTIONS                                               │
│  [💡 Learned] [✨ Inspired] [📈 Progress] [⚡ Bold] [✓ Clean] │
│                                                                 │
│                         +50 XP for quality feedback           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flow 5: Level Up Moment

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                                                                 │
│                         ⚡                                      │
│                                                                 │
│                    LEVEL UP                                    │
│                                                                 │
│              You're now Level 5: BLAZE                         │
│                                                                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │  🔓 UNLOCKED                                            │   │
│  │                                                         │   │
│  │  Premium Editing Tools                                  │   │
│  │  Access advanced templates, effects, and presets       │   │
│  │  in the Resource Library.                              │   │
│  │                                                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                                                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━                      │
│  Level 5: 1,400 XP          Next: 2,000 XP                    │
│                                                                 │
│                                                                 │
│                    [Continue →]                                │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Flow 6: Badge Earned

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                                                                 │
│                    NEW BADGE UNLOCKED                          │
│                                                                 │
│                                                                 │
│                    ┌──────────────┐                            │
│                    │              │                            │
│                    │   💡        │                            │
│                    │   [Pixel    │                            │
│                    │    Art]     │                            │
│                    │              │                            │
│                    └──────────────┘                            │
│                                                                 │
│                    LIGHTING PRO                                │
│                                                                 │
│         You've demonstrated mastery of lighting               │
│         techniques in 3+ projects.                            │
│                                                                 │
│                                                                 │
│  "Your work literally glows. Keep it up."                     │
│  — Instructor feedback                                        │
│                                                                 │
│                                                                 │
│       [Share to Profile]        [Continue]                    │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Navigation Patterns

### Mobile Bottom Navigation

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│                      [Content Area]                           │
│                                                               │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│   🏠          📚          ✨           👤                     │
│  Home       Learn      Create      Profile                   │
│   ●                                                           │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Desktop Sidebar

```
┌────────────────┬──────────────────────────────────────────────┐
│                │                                              │
│  [Logo]        │                                              │
│                │                                              │
│  ────────────  │              [Content Area]                  │
│                │                                              │
│  🏠 Home       │                                              │
│  📚 Learn      │                                              │
│  ✨ Create     │                                              │
│  🖼 Gallery    │                                              │
│  🏆 Challenges │                                              │
│                │                                              │
│  ────────────  │                                              │
│                │                                              │
│  [Avatar]      │                                              │
│  Sarah         │                                              │
│  Level 5 🔥7   │                                              │
│                │                                              │
│  ⚙️ Settings   │                                              │
│                │                                              │
└────────────────┴──────────────────────────────────────────────┘
```

---

## Responsive Behavior

### Breakpoint Strategy

| Width | Layout | Navigation |
|-------|--------|------------|
| < 640px | Single column, full width | Bottom nav |
| 640-1023px | 2 columns where appropriate | Bottom nav |
| 1024px+ | Multi-column, sidebar | Sidebar nav |

### Touch vs Pointer

```css
/* All interactions work with touch */
/* Hover states only enhance for pointer devices */

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-2px);
  }
}

/* All devices get active states */
.card:active {
  transform: scale(0.98);
}
```

---

## Microinteractions

### XP Gain Animation

```
User completes action
    ↓
+50 XP floats up from button
    ↓
XP counter in header pulses
    ↓
Progress bar smoothly fills
```

### Streak Fire Animation

```
Streak badge pulses gently on hover
    ↓
Flame icon does subtle dance
    ↓
On streak increase: flame grows briefly
    ↓
On streak at risk: flame flickers
```

### Reaction Selection

```
Tap reaction icon
    ↓
Icon scales up 1.2x
    ↓
Ripple effect from tap point
    ↓
Icon bounces into place
    ↓
Count increments with slide-up
```

---

## Loading States

### Skeleton Loading

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ████████████████████████                                      │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ████████████  ████████████████████████                   │  │
│  │              ████████████████████                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ ███████ │ │ ███████ │ │ ███████ │ │ ███████ │              │
│  │ ██████  │ │ ██████  │ │ ██████  │ │ ██████  │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Skeleton blocks have subtle shimmer animation
```

### Empty States

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                                                                 │
│                         📭                                      │
│                                                                 │
│                Your gallery is waiting                         │
│                                                                 │
│         Your first project will show up here.                 │
│         Ready to create something?                             │
│                                                                 │
│                   [Start Creating]                             │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Error States

### Network Error

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         📡                                      │
│                                                                 │
│              Looks like you're offline                         │
│                                                                 │
│         Don't worry — your progress is saved.                 │
│         We'll sync when you're back online.                   │
│                                                                 │
│         [Continue in Offline Mode]                             │
│                                                                 │
│         Good news: Downloaded lessons still work!              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Upload Error

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         ⚠️                                      │
│                                                                 │
│              That file didn't upload                           │
│                                                                 │
│         The file might be too large (max 500MB)               │
│         or in an unsupported format.                          │
│                                                                 │
│         Supported: MP4, MOV, PNG, JPG                         │
│                                                                 │
│         [Try Different File]    [Get Help]                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

**Created by**: prototype_x1000 brain system
**Last updated**: March 2026
