# prototype_x1000 - System Context

> **READ THIS FIRST.** This file contains critical context for every Claude session.

## What Is This?

prototype_x1000 is a **37-brain AI orchestration system** that builds complete businesses. The CEO Brain coordinates all specialist brains (Engineering, Design, MBA, Marketing, etc.).

## Current State

- **Status**: OPERATIONAL
- **Layer 1 (File-based)**: Active - `.claude/` directory with context, credentials, recent, critical, actions
- **Layer 2 (Supabase)**: Active - Brain System database with 20+ tables
- **Last Updated**: 2026-03-06

### Supabase Connection
- Project: Brain System
- URL: https://swvferahilyuquqjpzwn.supabase.co
- CLI: Linked

## Location

```
/Users/rioallen/Documents/DropFly-OS-App-Builder/DropFly-PROJECTS/prototype_x1000/
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `.claude/` | Bootstrap memory (READ FIRST) |
| `ceo_brain/` | Master orchestrator |
| `memory/` | Detailed logs and patterns |
| `credentials/` | Environment files (.env) |
| `agents/` | Python agent code |
| `*_brain/` | 37 specialist brains |

## Active Projects Using This System

- SoulSync (dating app)
- FitFly (fitness app)
- TradeFly (trading)
- VoiceFly (voice AI)

## What To Do When Starting A Session

1. Read `.claude/context.md` (this file)
2. Read `.claude/recent.md` for what happened recently
3. Read `.claude/critical.md` for things to never forget
4. Check `.claude/credentials.md` if you need API keys
5. THEN proceed with the task

## What To Do When Ending A Session

1. Log significant work to `memory/sessions/YYYY-MM-DD.md`
2. If you learned something critical, add to `.claude/critical.md`
3. Update `.claude/recent.md` with summary
