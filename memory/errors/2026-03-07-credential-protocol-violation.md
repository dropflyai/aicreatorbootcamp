# Error Log: Credential Protocol Violation

**Date:** 2026-03-07
**Project:** FitFly (but applies to ALL projects)
**Severity:** HIGH (security liability)

## What Happened

When setting up Maestro E2E tests, I:
1. Asked the user to provide the Supabase service role key
2. Created documentation telling user how to get the key
3. Did NOT check the existing `credentials/.env` file first
4. Violated the established credential protocol

## Root Cause

**Failed to follow established protocol.**

The credential protocol is documented at:
- `/prototype_x1000/.claude/credentials.md`
- `/prototype_x1000/credentials/README.md`

The protocol clearly states:
```
Each project has credentials/.env:
- FitFly: /DropFly-PROJECTS/FitFly/credentials/.env
- VoiceFly: /DropFly-PROJECTS/voicefly-app/credentials/.env
- SoulSync: /DropFly-PROJECTS/soulsync/server/.env
- TradeFly: /DropFly-PROJECTS/TradeFly-Backend/credentials/.env
- TipFly: /DropFly-PROJECTS/tipfly-ai/credentials/.env
```

## Why This Is A Problem

1. **Security liability** - Asking user to paste credentials creates exposure risk
2. **Wasted time** - User has to stop and find credentials that already exist
3. **Inconsistency** - Different scripts loading credentials from different places
4. **Frustration** - User has specified this protocol multiple times

## Correct Protocol

**BEFORE asking user for credentials:**

1. Check `credentials/.env` in the project folder
2. Check `credentials/` directory exists
3. If found, USE IT
4. If NOT found, ask user where they want to store it (likely `credentials/.env`)
5. NEVER ask user to paste credentials in chat

**When writing scripts that need credentials:**

1. Load from `credentials/.env` FIRST (source of truth)
2. Fall back to environment variables
3. Log where credentials were loaded from
4. Document the expected location

## Fix Applied

Updated `scripts/e2e/setup-test-user.js`:
- Now reads from `credentials/.env` automatically
- Falls back to env var only if file not found
- Logs where key was loaded from

## Prevention

Before ANY work involving credentials:

```
1. CHECK: Does credentials/.env exist in this project?
2. CHECK: What credentials are already stored there?
3. USE existing credentials - DO NOT ask user
4. If new credential needed, ADD to existing credentials/.env
5. NEVER create alternate credential storage locations
```

## Pattern to Remember

```
PROJECT_ROOT/
├── credentials/
│   ├── .env          ← SOURCE OF TRUTH for all project credentials
│   └── .env.template ← Template (no actual secrets)
├── src/
└── ...
```

**Every project. Same structure. Same location. No exceptions.**
