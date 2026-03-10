# AI Creator Bootcamp — Feature Specification

## Platform Overview

A web-based learning platform for the 10-week AI Content Creation course. Designed for in-person classes with digital enhancement — the platform extends the classroom, it doesn't replace it.

---

## Core Experience

### The Creator Journey Narrative

The entire 10 weeks are framed as a "Creator Journey" — students aren't taking a class, they're leveling up as creators.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   WEEK 1-2: THE SPARK                                          │
│   "Discover your voice"                                        │
│   └─ Unlock: Basic toolkit, profile customization              │
│                                                                 │
│   WEEK 3-4: THE CRAFT                                          │
│   "Master the fundamentals"                                    │
│   └─ Unlock: Advanced tools, first badges                      │
│                                                                 │
│   WEEK 5-6: THE COMMUNITY                                       │
│   "Find your people"                                           │
│   └─ Unlock: Collaboration features, team challenges           │
│                                                                 │
│   WEEK 7-8: THE CHALLENGE                                       │
│   "Create for real stakes"                                     │
│   └─ Unlock: Client briefs, industry exposure                  │
│                                                                 │
│   WEEK 9-10: THE LAUNCH                                         │
│   "Go public"                                                  │
│   └─ Unlock: Portfolio showcase, alumni status                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature 1: Onboarding

### Philosophy
Value before signup. Students should create something within 60 seconds of landing on the platform.

### Flow

```
1. LANDING
   ├─ "What kind of creator are you?"
   ├─ [3 visual options: Entertainer / Educator / Storyteller]
   └─ Tap to continue (no signup yet)

2. FIRST WIN
   ├─ Simple interactive: "Write your first hook"
   ├─ AI gives instant feedback
   └─ "Not bad for your first try. Let's save this."

3. SIGNUP (Minimal)
   ├─ Email/password only (or Google SSO)
   ├─ Join class code from instructor
   └─ No marketing questions, no surveys

4. PROFILE SETUP
   ├─ Choose avatar style (upload or generate)
   ├─ Pick accent color (from palette)
   ├─ Write one-line bio
   └─ Choose 3 content interests

5. CLASS ENTRY
   ├─ See classmates who've joined
   ├─ Instructor welcome message
   └─ "Your journey begins →"
```

### Key Principles
- **Maximum 3 clicks to first value**
- **Personalization feels meaningful**, not like data harvesting
- **Class code creates instant community** — you're joining something

---

## Feature 2: Home / Dashboard

### What Students See

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
│  [Avatar] Hey [Name] 👋    [Streak: 7 🔥] [XP: 1,450]          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  THIS WEEK: "Video That Stops the Scroll"                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ NEXT UP                                                  │   │
│  │ Session 2: Filming & Editing                             │   │
│  │ [Start →]                                                │   │
│  │ 3/5 classmates have started                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  WEEKLY CHALLENGE                                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ "60-Second Banger"                                       │   │
│  │ Create a short-form video with scroll-stopping hook     │   │
│  │ [12/25 submitted] [View Gallery →]                       │   │
│  │ Due: Friday                                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ACTIVITY                                                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🟢 Sarah just hit Level 4                                │   │
│  │ 💬 Marcus gave you feedback on "Morning Routine"        │   │
│  │ ✨ New badge unlocked: "Lighting Pro"                    │   │
│  │ 🎯 Class goal: 45/100 projects this month                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  RECENT WORK                                                    │
│  [Project Card] [Project Card] [Project Card] →                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Elements

| Element | Purpose |
|---------|---------|
| **Streak + XP header** | Always visible motivation |
| **This Week's Focus** | Clear current objective |
| **Weekly Challenge** | Primary CTA |
| **Activity Feed** | Social proof, connection |
| **Recent Work** | Quick access to portfolio |

---

## Feature 3: Course Content

### Lesson Structure

Each week's content is broken into:
1. **Sessions** (the in-person class content)
2. **Activities** (hands-on tasks)
3. **Resources** (tools, templates, references)
4. **Project** (weekly deliverable)

### Session View

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Week 4                                               │
│                                                                 │
│  SESSION 2: Filming & Editing                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 60% complete         │
│                                                                 │
│  [VIDEO PLAYER - Vertical format, like TikTok]                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                         │   │
│  │              Instructor Demo Video                       │   │
│  │              "Lighting Basics"                           │   │
│  │                                                         │   │
│  │                    [▶]                                   │   │
│  │                                                         │   │
│  │  [Previous] [Next]                 3/7 clips            │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  KEY TAKEAWAYS                                                  │
│  • Light source in FRONT, slightly to one side                 │
│  • Window = best free lighting                                 │
│  • Avoid backlit scenes                                        │
│                                                                 │
│  TRY IT                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Record a 10-second clip using window lighting           │   │
│  │ [Upload Video] or [Record Now]                          │   │
│  │                                                         │   │
│  │ +25 XP for completing                                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Content Design Principles

1. **Video-first** — Short, vertical clips (2-5 minutes max)
2. **Interactive checkpoints** — Do something after each concept
3. **Progress persistence** — Resume exactly where you left off
4. **Offline available** — Core content cached for no-wifi situations

---

## Feature 4: Project Submissions

### Submission Flow

```
1. CREATE
   ├─ Upload video/image OR
   ├─ Record directly in browser OR
   ├─ Link external (TikTok, Instagram)
   └─ Supported: MP4, MOV, PNG, JPG

2. ENHANCE
   ├─ Add title
   ├─ Write description (what was your goal?)
   ├─ Tag techniques used (from this week's content)
   └─ Optional: Add behind-the-scenes notes

3. SELF-ASSESS
   ├─ "Rate your hook" (1-5)
   ├─ "Rate your pacing" (1-5)
   ├─ "What would you improve?"
   └─ Required before submission

4. SUBMIT
   ├─ Choose visibility: Class only / Public gallery
   ├─ Confirm
   └─ Instant XP award + confetti-free celebration

5. FEEDBACK PHASE
   ├─ Auto-assigned 2-3 peer reviewers
   ├─ Receive structured feedback
   └─ Option to iterate and resubmit
```

### Project Card Design

```
┌─────────────────────────────────────────────────────────────────┐
│  [VIDEO THUMBNAIL - 9:16 preview]                               │
│                                                                 │
│  "Morning Routine Vlog"                                        │
│  by @sarah_creates                                             │
│                                                                 │
│  [💡 12] [✨ 8] [💬 3]                                         │
│                                                                 │
│  #lighting #hook #pacing                                       │
│                                                                 │
│  Week 4 • 2 days ago                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature 5: Peer Feedback System

### Feedback Structure

Replace unstructured comments with scaffolded feedback:

```
┌─────────────────────────────────────────────────────────────────┐
│  GIVE FEEDBACK                                                  │
│  for "Morning Routine Vlog" by @sarah_creates                  │
│                                                                 │
│  WARM FEEDBACK (Required)                                       │
│  What's working well?                                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ I noticed the [lighting / pacing / hook / audio ▼]      │   │
│  │ was [really effective / creative / clear ▼]             │   │
│  │ because ____________________________________________     │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  COOL FEEDBACK (Optional)                                       │
│  What could be explored further?                               │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ One thing to try: __________________________________     │   │
│  │ (max 140 characters)                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  QUICK REACTIONS                                                │
│  [💡 Learned] [✨ Inspired] [📈 Progress] [⚡ Bold] [✓ Clean]  │
│                                                                 │
│  [Submit Feedback] → +50 XP                                    │
└─────────────────────────────────────────────────────────────────┘
```

### Reaction Types

| Reaction | Icon | Meaning |
|----------|------|---------|
| **Learned Something** | 💡 | This taught me a technique |
| **Inspired Me** | ✨ | Sparked an idea for my work |
| **Great Progress** | 📈 | I can see your improvement |
| **Bold Choice** | ⚡ | This took creative risk |
| **Clean Execution** | ✓ | Technical quality is high |

### Feedback Queue

Students must give 2 feedbacks to unlock receiving feedback on their own work. This ensures everyone participates.

---

## Feature 6: XP & Leveling System

### XP Sources

| Activity | XP | Why |
|----------|---|-----|
| Complete a session | 50 | Course progress |
| Submit a project | 100-300 | Core deliverable (varies by complexity) |
| Give quality peer feedback | 50 | Builds community + critical thinking |
| Receive positive reaction | 10 | Social validation |
| Apply feedback and iterate | 75 | Growth mindset |
| Help a classmate | 40 | Community building |
| Complete weekly challenge | 150 | Primary engagement driver |
| Attempt creative risk | 60 | Encourages experimentation |
| Instructor recognition | 200 | Expert validation |

### Level Structure

```
Level 1:  "Spark"          0 XP      → Profile unlocked
Level 2:  "Kindling"       200 XP    → Avatar customization
Level 3:  "Flame"          500 XP    → Advanced templates
Level 4:  "Fire"           900 XP    → Can mentor others
Level 5:  "Blaze"          1,400 XP  → Premium editing tools
Level 6:  "Inferno"        2,000 XP  → Custom profile themes
Level 7:  "Wildfire"       2,700 XP  → Guest speaker Q&A access
Level 8:  "Beacon"         3,500 XP  → Industry mentor pairing
Level 9:  "Torch"          4,500 XP  → Featured creator spotlight
Level 10: "Legend"         5,700 XP  → Alumni showcase permanent
```

### Level Up Experience

When leveling up:
1. Full-screen celebration (subtle, not confetti)
2. Unlock revealed with explanation
3. Badge added to profile
4. Activity feed notification

---

## Feature 7: Streaks

### Weekly Streak (Not Daily)

To maintain a streak, complete **3 active days per week**:
- Active = Submit work, give feedback, or complete a session
- Weekly resets Sunday midnight
- Streak freezes available (1 per course)

### Streak Display

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│               🔥 7 WEEK STREAK                                  │
│                                                                 │
│   [●] [●] [●] [●] [●] [●] [●] [○] [○] [○]                     │
│    1   2   3   4   5   6   7   8   9  10                       │
│                                                                 │
│   You're on fire! Keep it going.                               │
│   Longest streak: 7 weeks                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Streak Psychology

- **Week 2 streak** = small bonus (50 XP)
- **Week 5 streak** = profile badge
- **Week 8 streak** = featured in class
- **Full course streak** = permanent "Dedicated Creator" badge

---

## Feature 8: Badges & Achievements

### Badge Categories

**Skill Badges** (Competence)
| Badge | Requirement | Icon Style |
|-------|-------------|------------|
| Lighting Pro | Instructor-approved lighting in 3 projects | Pixel lightbulb |
| Audio Master | Clean audio rated by 3 peers | Pixel waveform |
| Hook Expert | High engagement on 3 hooks | Pixel magnet |
| Edit Wizard | Technical editing recognized | Pixel wand |
| Story Architect | Narrative structure praised | Pixel blueprint |

**Character Badges** (Relatedness)
| Badge | Requirement | Icon Style |
|-------|-------------|------------|
| Helpful Hand | Helped 5 classmates | Pixel handshake |
| Feedback Guru | Gave 10+ quality reviews | Pixel speech bubble |
| Collab Champion | Led successful team project | Pixel people |
| Encourager | 20+ positive reactions given | Pixel heart |

**Milestone Badges** (Progress)
| Badge | Requirement | Icon Style |
|-------|-------------|------------|
| First Frame | Completed first project | Pixel film strip |
| Halfway There | Week 5 complete | Pixel flag |
| Centurion | 100 total content pieces | Pixel medal |
| Dedicated Creator | Full course streak | Pixel flame |

**Hidden Badges** (Delight)
Discovered organically:
- **Night Owl**: Submitted after midnight
- **Early Bird**: Submitted before 7am
- **Remixer**: Built on 3 others' work
- **Trendsetter**: Used technique before taught

---

## Feature 9: Gallery & Portfolio

### Class Gallery

Randomized, non-ranked display of student work:

```
┌─────────────────────────────────────────────────────────────────┐
│  CLASS GALLERY                                                  │
│                                                                 │
│  [Filter: All | This Week | Most Reactions | Following]        │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │          │ │          │ │          │ │          │          │
│  │  [vid]   │ │  [vid]   │ │  [vid]   │ │  [vid]   │          │
│  │          │ │          │ │          │ │          │          │
│  │ @sarah   │ │ @marcus  │ │ @alex    │ │ @jordan  │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │          │ │          │ │          │ │          │          │
│  │  [vid]   │ │  [vid]   │ │  [vid]   │ │  [vid]   │          │
│  │          │ │          │ │          │ │          │          │
│  │ @taylor  │ │ @casey   │ │ @drew    │ │ @pat     │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                 │
│  [Load More]                                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Design Decisions

- **Randomized order** — No ranking, everyone gets visibility
- **No view counts visible** — Prevents comparison anxiety
- **No follower counts** — This isn't about popularity
- **Reactions visible but not ranked** — Celebrate without competition

### Personal Portfolio

```
┌─────────────────────────────────────────────────────────────────┐
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  [COVER IMAGE - Customizable]                            │  │
│  │                                                          │  │
│  │  [Avatar]                                                │  │
│  │  Sarah Chen                                              │  │
│  │  @sarah_creates                                          │  │
│  │                                                          │  │
│  │  "I make study content that doesn't suck"               │  │
│  │                                                          │  │
│  │  Level 6: Inferno 🔥                                     │  │
│  │  [Lighting Pro] [Edit Wizard] [Helpful Hand]            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  FEATURED PROJECTS                                              │
│  [Project] [Project] [Project] [Project] [Project]             │
│                                                                 │
│  MY JOURNEY                                                     │
│  Week 1 ─●──●──●──●──●──●──●──●──●──○─ Week 10                │
│                   ▲ You are here                                │
│                                                                 │
│  STATS                                                          │
│  12 Projects • 47 Feedbacks Given • 8 Week Streak              │
│                                                                 │
│  [Share Portfolio] [Export PDF]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature 10: Collaboration

### Remix System

Build on others' work with automatic attribution:

```
┌─────────────────────────────────────────────────────────────────┐
│  REMIX PROJECT                                                  │
│                                                                 │
│  You're building on:                                           │
│  "Morning Routine Vlog" by @sarah_creates                      │
│  [Preview original →]                                          │
│                                                                 │
│  What will you add?                                            │
│  ○ New perspective on same topic                               │
│  ○ Different technique applied                                 │
│  ○ Response / reaction                                         │
│  ○ Continuation of the story                                   │
│                                                                 │
│  [Start Remixing]                                              │
│                                                                 │
│  Your remix will automatically credit the original.            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Team Projects

For Week 8's collaboration focus:

```
┌─────────────────────────────────────────────────────────────────┐
│  TEAM: Creative Chaos                                          │
│                                                                 │
│  Members: @sarah @marcus @alex                                 │
│                                                                 │
│  CURRENT PROJECT                                                │
│  "Split Perspective Challenge"                                 │
│  Due: Friday                                                   │
│                                                                 │
│  TEAM WORKSPACE                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ [Chat thread between team members]                       │   │
│  │ [Shared files and assets]                               │   │
│  │ [Task checklist]                                        │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Instructor can see this workspace                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature 11: Weekly Challenges

### Challenge Types

| Type | Description | Frequency |
|------|-------------|-----------|
| **Theme Challenge** | Everyone creates on same topic | Weekly |
| **Technique Challenge** | Practice specific skill | Weekly |
| **Speed Challenge** | Create in limited time (in class) | Monthly |
| **Remix Challenge** | Build on a starter project | Bi-weekly |
| **Class Goal** | Collective target | Ongoing |

### Challenge Interface

```
┌─────────────────────────────────────────────────────────────────┐
│  THIS WEEK'S CHALLENGE                                          │
│                                                                 │
│  "60-Second Banger"                                            │
│  Create a short-form video with a scroll-stopping hook         │
│                                                                 │
│  REQUIREMENTS                                                   │
│  ✓ 30-60 seconds                                               │
│  ✓ Hook in first 3 seconds                                     │
│  ✓ Captions throughout                                         │
│  ✓ At least 3 pattern interrupts                               │
│                                                                 │
│  REWARDS                                                        │
│  • Completion: +150 XP                                         │
│  • Featured pick: +200 XP + showcase spot                      │
│                                                                 │
│  SUBMISSIONS [12/25]                                           │
│  [View Gallery] [Submit Yours]                                 │
│                                                                 │
│  ⏱ 3 days remaining                                            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Class Goals (Non-Competitive)

```
CLASS GOAL: March Creator Month

As a class, let's hit 100 projects this month!

███████████████░░░░░░░░░░░░░░░░ 47/100

Everyone who contributes gets the "Team Player" badge.
```

---

## Feature 12: Instructor Dashboard

### What the Instructor Sees

```
┌─────────────────────────────────────────────────────────────────┐
│  INSTRUCTOR DASHBOARD                                           │
│                                                                 │
│  Class: AI Creator Bootcamp - Spring 2026                      │
│  Week 4 of 10 • 25 students                                    │
│                                                                 │
│  ENGAGEMENT SNAPSHOT                                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Active this week: 23/25                                 │   │
│  │ Projects submitted: 18/25                               │   │
│  │ Feedback given: 42 total                                │   │
│  │ Average XP earned: 340                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ⚠️ ATTENTION NEEDED                                            │
│  • @student1 - No activity in 5 days                           │
│  • @student2 - Behind on weekly challenge                      │
│                                                                 │
│  RECENT SUBMISSIONS (Review Queue)                              │
│  [Project] [Project] [Project] [Mark all as reviewed]          │
│                                                                 │
│  QUICK ACTIONS                                                  │
│  [Create Challenge] [Send Announcement] [Award XP]             │
│  [Export Grades] [View All Students]                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Instructor Tools

| Tool | Purpose |
|------|---------|
| **Quick Feedback** | Voice note or video response |
| **Award XP** | Recognize in-class contributions |
| **Feature Work** | Highlight projects in gallery |
| **Challenge Creator** | Design custom challenges |
| **Engagement Alerts** | Automatic flags for disengaged students |
| **Grade Export** | Map XP/completion to grades |
| **Announcement** | Push notification to class |

---

## Feature 13: Notifications

### Notification Types

| Type | Channel | Frequency |
|------|---------|-----------|
| **Feedback received** | In-app + optional push | Immediate |
| **Level up** | In-app + optional push | When earned |
| **Badge earned** | In-app | When earned |
| **Streak reminder** | Push (opt-in) | 1x per week |
| **Challenge deadline** | In-app + push | 24hrs before |
| **Instructor announcement** | In-app + push | As sent |
| **Weekly digest** | Email | Sunday evening |

### Notification Design

```
┌─────────────────────────────────────────────────────────────────┐
│  [Avatar] Marcus gave you feedback                              │
│  "The lighting in your hook is 🔥"                              │
│  2 hours ago • [View Project]                                  │
├─────────────────────────────────────────────────────────────────┤
│  ⚡ New badge unlocked!                                         │
│  "Lighting Pro" - You've mastered three-point lighting         │
│  Today • [View Badge]                                          │
├─────────────────────────────────────────────────────────────────┤
│  🔥 Your 7-week streak is at risk!                              │
│  Complete one activity before Sunday to keep it alive          │
│  Today • [Quick Activity]                                      │
└─────────────────────────────────────────────────────────────────┘
```

### Notification Controls

Students can:
- Mute all notifications
- Mute specific types
- Set quiet hours
- Choose push vs. in-app only

---

## Feature 14: Offline Support

### What Works Offline

| Feature | Offline Capability |
|---------|-------------------|
| **Course content** | Fully available (pre-cached) |
| **Video lessons** | Downloadable per week |
| **Draft projects** | Create and save locally |
| **View gallery** | Cached last viewed |
| **Give feedback** | Queued for sync |
| **Real-time activity** | Not available |

### Sync Behavior

```
┌─────────────────────────────────────────────────────────────────┐
│  📴 You're offline                                              │
│                                                                 │
│  Don't worry — you can still:                                  │
│  ✓ Watch downloaded lessons                                    │
│  ✓ Work on projects (saved locally)                           │
│  ✓ Write feedback (will sync later)                           │
│                                                                 │
│  When you're back online, we'll sync everything.               │
│                                                                 │
│  [3 items waiting to sync]                                     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Feature 15: Safety & Moderation

### Content Moderation

| Layer | Mechanism |
|-------|-----------|
| **Pre-upload** | Image/video scanning for inappropriate content |
| **Text filter** | Profanity and harassment keyword detection |
| **Peer flagging** | Easy "report" button on all content |
| **Instructor review** | Queue for flagged content |
| **AI moderation** | Automated detection assist |

### Communication Safety

- All comments visible to instructor
- No private 1:1 messaging
- Team chats logged and reviewable
- 30-second delay before comments post (cool-off)

### Reporting Flow

```
1. Student clicks [Flag] on content
2. Chooses reason: [Inappropriate | Mean/Bullying | Other]
3. Optional: Add details
4. Instructor notified immediately
5. Content hidden pending review (for serious flags)
6. Resolution logged for audit
```

---

## Technical Architecture

### Stack

```
Frontend
├── Next.js 15 (App Router)
├── React 19
├── Tailwind CSS v4
├── Framer Motion
├── next-pwa
└── React Query

Backend
├── Supabase
│   ├── Auth (email, Google SSO)
│   ├── Database (PostgreSQL)
│   ├── Storage (videos, images)
│   ├── Realtime (activity feed)
│   └── Edge Functions
└── Vercel (hosting)

Media
├── Mux (video processing)
├── Cloudflare R2 (storage)
└── Sharp (image optimization)
```

### Database Schema (Core Tables)

```sql
-- Users
users (id, email, name, avatar_url, bio, accent_color, level, xp, streak)

-- Classes
classes (id, name, instructor_id, code, start_date, end_date)
class_members (class_id, user_id, role)

-- Content
projects (id, user_id, class_id, week, title, description, media_url, status)
project_tags (project_id, tag)
project_reactions (project_id, user_id, reaction_type)

-- Feedback
feedback (id, project_id, author_id, warm_text, cool_text, created_at)

-- Progress
lesson_progress (user_id, lesson_id, completed_at)
badges (id, name, description, icon, criteria)
user_badges (user_id, badge_id, earned_at)
xp_transactions (user_id, amount, reason, created_at)

-- Challenges
challenges (id, class_id, title, description, start_date, end_date)
challenge_submissions (challenge_id, project_id)
```

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Time to Interactive | < 3s |
| Memory footprint | < 200MB |
| Offline startup | < 2s |

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- Auth + onboarding
- Course content display
- Basic project submission
- XP system

### Phase 2: Social (Weeks 3-4)
- Feedback system
- Gallery view
- Activity feed
- Reactions

### Phase 3: Gamification (Weeks 5-6)
- Full leveling system
- Badges
- Streaks
- Leaderboard alternatives

### Phase 4: Collaboration (Weeks 7-8)
- Remix system
- Team workspaces
- Challenges

### Phase 5: Polish (Weeks 9-10)
- Portfolio export
- Instructor dashboard
- Analytics
- Performance optimization

---

**Created by**: prototype_x1000 brain system
**Research basis**: EdTech analysis, Gen Z psychology, gamification studies
**Last updated**: March 2026
