# Learnings Log: VoiceFly Deep-Dive

**Date:** 2026-03-09
**Project:** voicefly-app

---

## Learning 1: UI-Only Features Are Common

**Observation:** Multiple frontend components existed without backend support
- Billing page called non-existent endpoint
- AgentCustomization needed business API that didn't exist
- Test call button was UI-only

**Root Cause:** Frontend development often outpaces backend in rapid prototyping

**Application:** When auditing apps, specifically check if UI actions have working backend endpoints

---

## Learning 2: Onboarding Wizards Often Disconnect

**Observation:** The 5-step onboarding wizard collected:
- Use case selection
- Voice preference
- CRM integration choice
- Campaign details

But NONE of this was saved or used.

**Root Cause:** Wizards are built incrementally — UI first, persistence later (and "later" gets forgotten)

**Application:** For any wizard/form, verify:
1. Where does data go on submit?
2. Is there an API call?
3. Does the data persist?
4. Does it affect the system?

---

## Learning 3: Parallel Audits Find More

**Observation:** 5 parallel agents found issues a single pass would miss
- Backend agent found API gaps
- Database agent found schema issues
- Frontend agent found UI-only features
- Integration agent found hardcoded URLs
- QA agent found test coverage gaps

**Application:** For deep-dive audits, spawn specialist agents in parallel rather than reviewing sequentially

---

## Learning 4: Legacy Code Accumulates Silently

**Observation:** Found 3 completely unused files:
- `email-service-new.ts` — Different email provider than app uses
- `vapi-integration.js` — Old architecture approach
- `vapi-phone-service.js` — Old architecture approach

**Root Cause:** When building v2 of something, v1 files often remain

**Application:** When building new service implementations, explicitly deprecate/delete old ones

---

## Learning 5: Environment Variables Drift

**Observation:** `.env.example` was missing 15+ variables that code expected:
- Twilio credentials
- SendGrid credentials
- VAPI webhook secrets
- Stripe price IDs

**Root Cause:** Developers add env vars to local .env but forget .env.example

**Application:** After adding any process.env reference, immediately update .env.example

---

## Learning 6: Hardcoded URLs in Production

**Observation:** ngrok URLs were hardcoded:
```javascript
serverUrl: 'https://fbb8dc638db6.ngrok-free.app/webhook/vapi'
```

**Root Cause:** Local development URLs committed and never updated

**Application:** Search for "ngrok", "localhost", hardcoded domains before any release

---

## Learning 7: Build Verification Catches Issues

**Observation:** Running `npm run build` caught:
- 5 import errors (wrong function names)
- 1 Suspense boundary issue

These would have been runtime errors in production.

**Application:** Always run production build before claiming "done"
