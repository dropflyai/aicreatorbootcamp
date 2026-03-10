# Credentials Reference

> This file tells you WHERE credentials are stored. Never put actual secrets here.

## Supabase (Brain Memory System)

**Status**: FULLY CONFIGURED (2026-03-06)
- URL: Configured
- Anon Key: Configured
- Service Key: Configured
- Database Tables: CREATED
- Supabase CLI: LINKED

**Project:** Brain System
**Project ID:** swvferahilyuquqjpzwn
**URL:** https://swvferahilyuquqjpzwn.supabase.co

**Stored at:**
- `/prototype_x1000/credentials/.env`
- `/prototype_x1000/agents/.env`

**Tables Created:**
- shared_experiences, shared_patterns, shared_failures (Universal)
- design_dna, design_references, design_ux_scores, design_style_decisions (Design Brain)
- eng_architecture_decisions, eng_tech_debt (Engineering Brain)
- product_features, product_user_research (Product Brain)
- trading_strategies, trading_signals (Options Trading Brain)
- mba_strategic_decisions, mba_competitor_analysis (MBA Brain)
- ceo_task_delegations, ceo_brain_collaborations (CEO Brain)
- agent_runs, brain_builds (Agent System)

**All credentials configured. System fully operational.**

---

## Other Project Credentials (Reference)

These exist and can be referenced if needed:

| Project | Location | Has Supabase |
|---------|----------|--------------|
| VoiceFly | `/DropFly-PROJECTS/voicefly-app/credentials/.env` | Yes |
| FitFly | `/DropFly-PROJECTS/FitFly/credentials/.env` | Yes |
| SoulSync | `/DropFly-PROJECTS/soulsync/server/.env` | Yes |
| TradeFly | `/DropFly-PROJECTS/TradeFly-Backend/credentials/.env` | Yes |
| TipFly | `/DropFly-PROJECTS/tipfly-ai/credentials/.env` | Yes |

---

## Credential Protocol

**When user provides credentials:**

1. Identify which project they belong to
2. Create `.env` file at correct location
3. If Supabase, also copy to `/agents/.env` if agent code needs it
4. Run any required migrations
5. Update this file to show "CONFIGURED"
6. Log the action to `memory/sessions/YYYY-MM-DD.md`

**NEVER:**
- Put actual secrets in this file
- Put secrets in CLAUDE.md
- Commit .env files to git
