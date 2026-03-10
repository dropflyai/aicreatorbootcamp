# AI Creator Bootcamp — Platform Design

## Overview

A web-based learning platform for the 10-week AI Content Creation course. Designed for Gen Z high schoolers on laptops, Chromebooks, iPads, and phones.

**Design Philosophy**: "Their Space, Not Your School"

---

## Documentation

| Document | Purpose |
|----------|---------|
| [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Colors, typography, components, animations |
| [FEATURE_SPEC.md](./FEATURE_SPEC.md) | Complete feature specifications |
| [UX_FLOWS.md](./UX_FLOWS.md) | Screen designs and user flows |

---

## Key Design Decisions

### Visual Identity
- **Dark mode first** (70%+ Gen Z preference)
- **Cyber Lime (#BFFF00)** accent for achievements/progress
- **Anti-corporate aesthetic** — raw, authentic, owned
- **Pixel art badges** — gaming nostalgia for achievements

### Engagement System
- **Weekly streaks** (not daily) — 3 active days maintains streak
- **XP tied to learning** — meaningful actions, not clicks
- **10-level progression** — unlocks real features
- **No public leaderboards** — contribution boards instead

### Social Features
- **Gallery not rankings** — randomized display, everyone featured
- **Structured feedback** — warm/cool prompts, not free-form
- **5 reaction types** — meaningful signals, not just likes
- **Remix system** — build on others' work with attribution

### Technical Approach
- **PWA for Chromebooks** — installable, offline-capable
- **Mobile-first responsive** — bottom nav, thumb-zone optimization
- **< 200MB memory** — runs on budget Chromebooks
- **Container queries** — components adapt to context

---

## Tech Stack

```
Frontend: Next.js 15, React 19, Tailwind CSS v4
Backend:  Supabase (auth, database, storage, realtime)
Media:    Mux (video), Cloudflare R2 (storage)
Hosting:  Vercel
```

---

## Research Foundation

This design is based on extensive research across:
- Gen Z design preferences (50+ sources)
- EdTech platform analysis (Duolingo, Khan Academy, Brilliant)
- Gamification psychology (SDT, feedback loops, streaks)
- Mobile-first responsive patterns
- Teen safety and community features

---

## Implementation Phases

1. **Foundation** — Auth, content, basic submissions
2. **Social** — Feedback, gallery, reactions
3. **Gamification** — XP, badges, streaks, levels
4. **Collaboration** — Remix, teams, challenges
5. **Polish** — Portfolio, instructor tools, analytics

---

## Quick Reference

### Color Palette
```
Background: #0D0D0D (dark), #161616 (cards)
Accent 1:   #BFFF00 (lime - achievements)
Accent 2:   #A855F7 (purple - social)
Accent 3:   #FF6B9D (pink - alerts)
```

### Typography
```
Display:  Space Grotesk
Body:     Inter
Pixel:    Press Start 2P (badges only)
```

### XP Values
```
Session complete:     50 XP
Project submitted:    100-300 XP
Quality feedback:     50 XP
Weekly challenge:     150 XP
```

### Level Progression
```
L1 Spark:     0 XP     → Profile
L5 Blaze:     1,400 XP → Premium tools
L10 Legend:   5,700 XP → Alumni showcase
```

---

**Created by**: prototype_x1000 brain system
**Brains used**: Design, Product, Content, Engineering, Research
**Research depth**: 5 parallel department heads, 50+ sources
