# Learned Rules

Rules extracted from repeated experiences. These are MANDATORY to follow.

---

## API & External Services

### RULE-001: Always Commit Service Configuration Changes
**Source:** FitFly AI Coach failure (2026-01-28)

When fixing API/service issues (model names, endpoints, keys), the fix MUST be:
1. Committed to git
2. Pushed to remote
3. Deployed (TestFlight build for mobile, deploy for web)

**Reason:** TestFlight/production runs committed code, not local changes. Testing locally doesn't verify the production fix.

### RULE-002: Use Latest Model Aliases for AI APIs
**Source:** FitFly AI Coach failure (2026-01-28)

When using Anthropic Claude API:
- Prefer `-latest` suffix: `claude-3-5-haiku-latest`
- Or use current dated model IDs
- Old model IDs get deprecated and stop working

**Current Working Models (Jan 2026):**
- Sonnet: `claude-sonnet-4-20250514`
- Haiku: `claude-3-5-haiku-latest`

**Check quarterly** for model name updates.

---
