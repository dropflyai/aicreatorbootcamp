# AI Creator Bootcamp - System Context

> **READ THIS FIRST.** This file contains critical context for every Claude session.

## What Is This?

AI Creator Bootcamp is a **10-week course** teaching high school students AI-powered content creation. The web app supports the course with gamification, class collaboration, and project showcasing.

## Current State

- **Status**: IN DEVELOPMENT
- **Framework**: Next.js 15, TypeScript, Tailwind CSS v4
- **Database**: Supabase (mtjotwydkdefgpcybgvc)
- **Auth**: Supabase Auth
- **Last Updated**: 2026-03-10

### Key Features Built
- Landing page with creator type selection (Entertainer/Educator/Storyteller)
- First-win experience with personalized hooks based on creator type
- Demo mode for testing without signup
- 10-week curriculum display
- Project gallery with reactions
- Profile with XP/badges
- Weekly challenges
- E2E test suite (Playwright)

### Supabase Connection
- Project ID: mtjotwydkdefgpcybgvc
- URL: https://mtjotwydkdefgpcybgvc.supabase.co
- Demo Class Code: DEMO-2024

## Location

```
/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/aicreatorbootcamp/
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `.claude/` | Bootstrap memory (READ FIRST) |
| `src/app/` | Next.js App Router pages |
| `src/components/` | Reusable UI components |
| `src/lib/` | Utilities, Supabase clients |
| `supabase/` | Schema, migrations |
| `e2e/` | Playwright E2E tests |

## Target Audience

- **Primary**: High school students (Gen Z)
- **Devices**: Laptops, Chromebooks, iPads, phones
- **Design**: Dark mode, gamification, engaging

## Brain System Integration

This project uses prototype_x1000 brain system:
- Engineering Brain: Code, testing, DevOps
- Design Brain: UI/UX decisions
- QA Brain: E2E testing, verification
- Product Brain: Feature requirements

## What To Do When Starting A Session

1. Read `.claude/context.md` (this file)
2. Read `.claude/recent.md` for what happened recently
3. Read `.claude/critical.md` for things to never forget
4. Read `.claude/TODO.md` for outstanding tasks
5. Route through CEO Brain for any work

## What To Do When Ending A Session

1. Update `.claude/TODO.md` with progress
2. If you learned something critical, add to `.claude/critical.md`
3. Update `.claude/recent.md` with summary
