# Game UX Design

## User Experience Design for Interactive Entertainment

Game UX design applies user experience principles to the unique context of interactive entertainment. Unlike productivity software UX (which minimizes friction), game UX strategically manages friction --- some friction is desirable (challenge), while unnecessary friction (confusing menus, unclear feedback) must be eliminated.

---

## 1. Game UX vs Traditional UX

### Fundamental Differences

| Dimension | Traditional UX | Game UX |
|-----------|---------------|---------|
| Goal | Minimize effort to complete tasks | Maximize enjoyment of the experience |
| Friction | Always bad | Sometimes intentional (challenge) |
| Learning curve | Minimize; instant productivity | Managed; mastery is the reward |
| Failure | System error; avoid | Gameplay feature; manage |
| Emotion | Neutral/positive efficiency | Full spectrum (fear, joy, frustration, triumph) |
| Session length | Minimize (efficiency) | Optimize (engagement, not addiction) |
| User research | Task completion, error rates | Emotion, engagement, flow state |

### The Two Domains of Game UX

**System UX**: Menus, settings, navigation, account management, shop, social features. These follow traditional UX principles --- minimize friction, maximize clarity.

**Gameplay UX**: HUD, controls, feedback, tutorials, difficulty. These require game-specific UX thinking --- friction serves design intent.

---

## 2. HUD Design

### HUD Information Architecture

The HUD (Heads-Up Display) communicates game state to the player. Information must be prioritized by urgency and frequency of need.

**Priority 1 (Always Visible):** Critical, constantly changing state.
- Health/shields
- Ammo/ability cooldowns
- Minimap/compass
- Crosshair/cursor

**Priority 2 (Contextually Visible):** Important but not constant.
- Interaction prompts ("Press E to open")
- Objective waypoints
- Status effects
- Alert indicators

**Priority 3 (On Demand):** Available when requested.
- Full map
- Inventory
- Quest log
- Stats/character sheet

### HUD Classification (Fagerholt & Lorentzon)

| Type | Definition | Example |
|------|-----------|---------|
| Diegetic | Exists within the game world | Dead Space health spine, phone in GTA |
| Non-diegetic | Traditional overlay on screen | Health bar, minimap, ammo counter |
| Spatial | Exists in game space but not in fiction | Floating name tags, waypoint markers |
| Meta | Screen effect that represents game state | Blood splatter on screen for damage, Chromatic aberration for disorientation |

### Diegetic vs Non-Diegetic Trade-offs

**Diegetic HUD** (Dead Space, Metro Exodus):
- Pros: Immersive, no screen clutter, world-integrated
- Cons: Can be hard to read, limited information density, constrained by fiction

**Non-diegetic HUD** (most games):
- Pros: Clear, information-dense, always readable
- Cons: Breaks immersion, screen clutter risk, generic feeling

**Best practice**: Use diegetic elements for immersive games; use non-diegetic for competitive/information-intensive games. Hybrid approaches (some diegetic, some overlay) often work best.

---

## 3. HUD Layout Principles

### Screen Real Estate Management

```
┌─────────────────────────────────────────────┐
│ Health/Shields          Score/Timer    Mini- │
│ ████████░░░░           12,450 / 3:24  map   │
│                                       ┌───┐ │
│                                       │   │ │
│                                       └───┘ │
│              GAMEPLAY AREA                  │
│         (maximum clear space)               │
│                                             │
│                    ╋ (crosshair)            │
│                                             │
│                                             │
│ Ability 1  Ability 2  Ability 3  Ultimate  │
│ [Q]        [W]        [E]       [R]████   │
│                               Ammo: 24/120 │
└─────────────────────────────────────────────┘
```

### Layout Principles

1. **Corners for persistent info**: Place always-visible elements in corners (peripheral vision)
2. **Center for action**: Keep the center of the screen clear for gameplay
3. **Bottom for controls**: Action bindings and resources near natural gaze when looking at character
4. **Top for status**: Scores, timers, and global state at top
5. **Scaling**: HUD must scale for different resolutions and aspect ratios
6. **Customization**: Allow players to move, resize, and toggle HUD elements

---

## 4. Menu Design for Games

### Menu Hierarchy

```
Main Menu
├── Play / Continue
├── Settings
│   ├── Video
│   ├── Audio
│   ├── Controls
│   ├── Gameplay
│   └── Accessibility
├── Multiplayer / Social
├── Store / Shop
├── Profile / Collection
└── Exit / Quit
```

### Menu Design Principles

1. **One-press to gameplay**: Minimize clicks from launch to playing
2. **Clear hierarchy**: Most important actions are most prominent
3. **Consistent navigation**: Back button always works, breadcrumbs visible
4. **Controller-friendly**: All menus navigable with controller (no mouse-dependent elements)
5. **Loading disguise**: Menus during loading (Assassin's Creed walking)
6. **State preservation**: Menu remembers where player was when they return
7. **Previews**: Show the effect of settings changes in real time

### Pause Menu Essentials

Pause menus serve critical mid-game functions:
- Resume (always first option, always same button to pause/unpause)
- Settings (quick access to audio, sensitivity)
- Map (if applicable)
- Inventory/equipment
- Quest log/objectives
- Photo mode (increasingly common)
- Restart checkpoint
- Quit to menu

---

## 5. Tutorial Design

### Tutorial Design Philosophy

The goal of a tutorial is to teach the player to play the game, then get out of the way. The best tutorials are invisible --- players learn by playing, not by reading.

### Tutorial Approaches

**Contextual (just-in-time)**: Teach a mechanic the moment it becomes relevant.
- "Press X to jump" appears only when the player reaches a gap
- Minimizes information overload
- Requires careful level/encounter design

**Gated**: Structured tutorial section that must be completed.
- Dedicated tutorial level or mission
- Ensures all players learn fundamentals
- Risk: Boring for experienced players; should be skippable

**Environmental**: Level design teaches mechanics without explicit instruction.
- Nintendo's World 1-1 approach
- Requires sophisticated level design
- Cannot teach complex or non-obvious mechanics

**Progressive disclosure**: Introduce mechanics gradually over the first few hours.
- New mechanics introduced one at a time
- Each mechanic fully learned before the next is introduced
- Works well for complex games (strategy, RPG)

### Tutorial Anti-Patterns

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| Text wall | Players don't read | Use images/animations |
| Unskippable tutorial | Frustrates experienced players | Always allow skip |
| Front-loaded | Too much information at once | Spread over first hour |
| No practice | Taught but never tested | Immediate application |
| Contradicts gameplay | Tutorial is easier than real game | Tutorial reflects real difficulty |
| No re-reference | Player forgets tutorial info | Controls screen, help system |

---

## 6. Onboarding Flow (FTUE)

### First Time User Experience

FTUE (First Time User Experience) is the sequence from app launch to "core loop comprehension." For F2P games, FTUE optimization is critical because most churn happens here.

### FTUE Stages

```
Install → Launch → First Screen → Tutorial → Core Loop → First Session End → Return
100%      90%      85%             70%        55%         45%               35%
         (10% drop) (5%)          (15%)      (15%)       (10%)            (10%)
```

### FTUE Design Principles

1. **Fast to fun**: Get the player into gameplay within 60 seconds
2. **Show, don't tell**: Demonstrate mechanics through guided play
3. **Minimal creation**: Defer character creation, name selection, etc. until after the hook
4. **Celebrate success**: First victories should feel amazing (generous feedback)
5. **Simplify**: Hide advanced features until after FTUE
6. **Set expectations**: Communicate what the game is about (genre, tone, play style)
7. **Save state**: If player quits during FTUE, resume where they left off
8. **A/B test**: FTUE is the highest-impact area for optimization through testing

---

## 7. Accessibility in Games

### Why Accessibility Matters

- 15-20% of the global population has some form of disability
- Accessibility features benefit all players (subtitles, remappable controls)
- Major platforms and publishers now have accessibility standards
- Accessibility is increasingly a review criterion and marketing differentiator

### Xbox Accessibility Guidelines (XAG)

Microsoft's XAG provides comprehensive accessibility guidelines:

| Category | Key Requirements |
|----------|-----------------|
| Text and UI | Resizable text, high contrast mode, screen reader support |
| Audio | Subtitles with speaker identification, visual cues for audio events |
| Input | Remappable controls, one-handed mode, adaptive controller support |
| Difficulty | Adjustable difficulty, assist modes, invincibility options |
| Visual | Colorblind modes (protanopia, deuteranopia, tritanopia), high contrast |
| Cognitive | Simplified mode, content warnings, adjustable game speed |
| Communication | Text-to-speech, speech-to-text, ping systems |
| Photosensitivity | Option to reduce/disable screen shake, flashing, motion blur |

### Accessibility Implementation Priorities

**Tier 1 (Essential):**
- Subtitles (with speaker ID and sizing options)
- Remappable controls
- Colorblind modes
- Adjustable text size
- Difficulty options

**Tier 2 (Important):**
- Audio descriptions for key visual events
- One-handed control schemes
- Screen reader support for menus
- Adjustable game speed
- High-contrast mode

**Tier 3 (Comprehensive):**
- Cochlear implant audio profiles
- Eye-tracking input support
- Full motor accessibility (switch control, mouth control)
- Cognitive load reduction options
- Sign language interpreter for cutscenes

### Accessibility as Design

The Last of Us Part II set the industry standard with 60+ accessibility features, including:
- Full audio cues for all visual gameplay elements
- Navigation assistance (auto-aim, auto-dodge)
- High-contrast mode rendering enemies/allies/items in solid colors
- Per-character subtitle colors
- Text-to-speech for all UI elements

---

## 8. Information Design in Games

### Communicating Complex Systems

Games often contain complex interacting systems. Information design makes these systems comprehensible:

**Stat Presentation:**
- Raw numbers vs relative comparisons (DMG: 150 vs "Strong")
- Graphs and charts for progression (damage curves, efficiency graphs)
- Color-coding for quality tiers (white/green/blue/purple/gold)
- Comparison views (current equipment vs potential upgrade)

**Inventory Design:**
- Grid-based (Diablo, Resident Evil 4): Spatial management, Tetris satisfaction
- List-based (Mass Effect): Efficient browsing, sortable
- Paper doll (most RPGs): Visual equipment placement
- Radial/wheel (Breath of the Wild): Quick access during gameplay

### Tooltip Design

Tooltips are critical for communicating game mechanics:
- **Layered information**: Brief description visible; detailed stats on hover/hold
- **Consistent formatting**: Same structure across all tooltips
- **Comparison**: Show differences from current equipment
- **Contextual**: Show relevant information based on player level/progress
- **Keyword highlighting**: Important terms linked to glossary/explanation

---

## 9. UX Research Methods for Games

### Quantitative Methods

| Method | Data | Application |
|--------|------|-------------|
| A/B testing | Behavioral data | Feature comparison, FTUE optimization |
| Funnel analysis | Conversion data | Drop-off identification |
| Heatmaps | Position data | Navigation, combat, and exploration patterns |
| Session analytics | Time data | Session length, frequency, timing |
| Survey (scaled) | Opinion data | Satisfaction, NPS, feature ratings |

### Qualitative Methods

| Method | Data | Application |
|--------|------|-------------|
| Playtest observation | Behavioral + verbal | Identifying confusion, delight, frustration |
| Think-aloud protocol | Verbal reasoning | Understanding decision-making process |
| Post-play interview | Reflective opinion | Emotional experience, suggestions |
| Diary study | Longitudinal experience | Long-term engagement patterns |
| Focus group | Group discussion | Concept testing, feature prioritization |

---

## 10. Summary

Game UX is the discipline of ensuring that the player's interface with the game serves the design intent --- removing unwanted friction while preserving desired challenge. The best game UX is invisible: players focus entirely on the experience, never struggling with the interface. Accessibility ensures this experience is available to the widest possible audience.

---

*Game Design Brain | Module 06 | UX*
*DropFly OS --- PhD-Level Game Design Knowledge System*
