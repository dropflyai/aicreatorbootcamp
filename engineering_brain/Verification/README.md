# VERIFICATION PROTOCOLS
**Engineering Brain Verification System**

---

## Overview

Verification is the enforcement mechanism that ensures engineering claims are
backed by evidence, not assumptions. The Verification directory contains the
protocols, frameworks, and automation specifications that govern how the
Engineering Brain proves correctness.

No work is considered complete until verification passes. No claim is valid
without evidence. These are constitutional principles (Constitution.md
Sections 8 and 9).

---

## Protocols

| Protocol | File | When Applied | Key Concepts |
|----------|------|-------------|--------------|
| Triple Verification | `TripleVerification.md` | All changes under GEAR: BUILD and GEAR: SHIP | Three independent layers: automated tests, evidence artifacts, human/agent review. Reduced protocols for EXPLORE and HOTFIX. Formal completeness theorem. |
| Evidence | `Evidence.md` | All changes requiring proof of correctness | Evidence taxonomy (test reports, screenshots, benchmarks, security scans, accessibility audits). Collection automation. Storage conventions. Sufficiency matrix. Retention policy. Chain of custody. |
| UI Automation | `UIAutomation.md` | All UI-facing changes | Playwright setup. Page Object pattern. Visual regression testing. axe-core accessibility testing. Cross-browser strategy. Mobile viewport testing. Flaky test management. CI integration. Performance testing. |
| Zero Copy-Paste | `ZeroCopyPaste.md` | All agent interactions | Programmatic retrieval over manual data transfer. Automated log/error/state retrieval. Tool Authority integration. Acceptable exceptions. Common workflow patterns. |

---

## Applicability Guide

### By Execution Gear

| Execution Gear | Triple Verification | Evidence | UI Automation | Zero Copy-Paste |
|---------------|:-------------------:|:--------:|:-------------:|:---------------:|
| GEAR: EXPLORE | Reduced (Section 6.1) | Optional | Recommended | Recommended |
| GEAR: BUILD | Full | Required | Required (UI changes) | Required |
| GEAR: SHIP | Full + strict | Required + complete | Required + cross-browser | Required |
| GEAR: HOTFIX | Reduced (Section 6.2) | Deferred | Manual permitted | Required |

### By Change Type

| Change Type | Verification Level | Primary Evidence | UI Automation |
|-------------|-------------------|-----------------|---------------|
| Backend logic | Full Triple Verification | Test report, coverage | Not applicable |
| API endpoint | Full Triple Verification | Test report, security scan | Not applicable |
| UI component | Full Triple Verification | Screenshot, accessibility audit | Required |
| UI layout | Full Triple Verification | Before/after screenshot | Required |
| Database migration | Full Triple Verification | Migration log, schema diff | Not applicable |
| Performance change | Full Triple Verification | Benchmark with baseline | If UI-facing |
| Security fix | Full Triple Verification | Security scan (before/after) | If UI-facing |
| Dependency update | Full Triple Verification | Audit report, test report | If UI-facing |
| Configuration | Full Triple Verification | Diff, verification log | Not applicable |
| Documentation only | Trivial (lint + diff) | Diff only | Not applicable |

---

## Cross-References

- **Lifecycle verification phase**: `Lifecycle/Verification.md`
- **Testing patterns and strategy**: `Patterns/Testing.md`
- **Engineering Score (verification dimension)**: `Score.md` Section 2
- **Constitution (evidence and tool authority)**: `Constitution.md` Sections 8-9
- **Tool Authority**: `Solutions/ToolAuthority.md`
- **Playwright recipes**: `Automations/Recipes/Playwright.md`
- **Chromium configuration**: `Automations/Recipes/Chromium.md`
- **UI test failure runbook**: `Solutions/Runbooks/UITestFailure.md`
- **Flaky test runbook**: `Automations/Runbooks/PlaywrightFlaky.md`

---

**Verification is mandatory. Claims without proof are governance failures.**
