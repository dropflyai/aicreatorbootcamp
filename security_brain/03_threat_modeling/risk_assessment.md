# Risk Assessment — Quantitative and Qualitative Risk Analysis

## Overview

Risk assessment transforms threat intelligence and vulnerability data into actionable business decisions. Without risk quantification, security teams operate on intuition and fear — producing either excessive spending on low-risk issues or catastrophic underinvestment in critical areas. This module codifies both qualitative and quantitative risk assessment methodologies, with emphasis on the FAIR model for financial quantification, CVSS for vulnerability scoring, and practical risk register management.

Risk is not a binary (safe/unsafe). It is a continuous function of threat probability, vulnerability exploitability, and business impact. Security engineers must communicate risk in the language of business: dollars, probability, and time.

---

## FAIR Model — Factor Analysis of Information Risk

### Theoretical Foundation

FAIR (developed by Jack Jones, now an Open Group standard: O-RT-2) is the only internationally recognized quantitative model for information risk. Unlike qualitative approaches (high/medium/low), FAIR produces probabilistic financial estimates that enable cost-benefit analysis of security investments.

### FAIR Ontology

```
Risk (Annual Loss Expectancy)
├── Loss Event Frequency (LEF)
│   ├── Threat Event Frequency (TEF)
│   │   ├── Contact Frequency — How often does the threat agent encounter the asset?
│   │   └── Probability of Action — Given contact, how likely is an attack?
│   └── Vulnerability (Vuln)
│       ├── Threat Capability — Skill/resources of the threat agent
│       └── Resistance Strength — Effectiveness of existing controls
└── Loss Magnitude (LM)
    ├── Primary Loss
    │   ├── Productivity loss
    │   ├── Response cost
    │   ├── Replacement cost
    │   └── Fines and penalties
    └── Secondary Loss
        ├── Reputation damage
        ├── Customer churn
        ├── Competitive disadvantage
        └── Legal liability
```

### FAIR Analysis Process

**Step 1: Scope the Risk Scenario**
Define precisely: Asset, Threat Actor, Threat Type, Effect. Example: "External cybercriminal (threat actor) conducts SQL injection (threat type) against customer database (asset) resulting in PII exfiltration (effect)."

**Step 2: Estimate Loss Event Frequency**
Use calibrated estimation (Douglas Hubbard's "How to Measure Anything" methodology):
- Gather subject matter expert estimates as confidence intervals (90% CI)
- Decompose into TEF and Vulnerability
- Express as annualized frequency (e.g., "between 0.1 and 2.0 times per year with 90% confidence")

**Step 3: Estimate Loss Magnitude**
For each loss form, estimate ranges:
- Productivity: Hours lost * fully-loaded labor rate
- Response: IR team hours, forensic investigation, legal counsel
- Fines: Regulatory penalty schedules (GDPR: up to 4% annual revenue or EUR 20M)
- Reputation: Customer churn rate * customer lifetime value * affected customers

**Step 4: Monte Carlo Simulation**
Run 10,000+ iterations sampling from the probability distributions. This produces:
- Expected annual loss (mean of distribution)
- Value at Risk (VaR) at various confidence levels (95th percentile, 99th percentile)
- Loss exceedance curve showing probability of exceeding specific dollar thresholds

**Step 5: Decision Support**
Compare mitigation costs against risk reduction. A control costing $500K/year that reduces a $2M expected annual loss to $200K produces $1.3M net value.

### FAIR Tools

- **RiskLens** — Commercial FAIR platform with calibrated databases and Monte Carlo engine
- **FAIR-U** — Free simplified FAIR tool from the FAIR Institute
- **OpenFAIR** — Open Group reference implementation
- **Custom Monte Carlo** — Python with numpy/scipy for custom FAIR simulations

---

## Qualitative Risk Assessment Matrices

### Standard Risk Matrix

When FAIR quantification is impractical (insufficient data, time constraints, or for initial triage), use a qualitative risk matrix:

| | Negligible Impact | Minor Impact | Moderate Impact | Major Impact | Catastrophic Impact |
|---|---|---|---|---|---|
| **Almost Certain (>90%)** | Medium | High | Critical | Critical | Critical |
| **Likely (60-90%)** | Low | Medium | High | Critical | Critical |
| **Possible (30-60%)** | Low | Medium | Medium | High | Critical |
| **Unlikely (10-30%)** | Low | Low | Medium | Medium | High |
| **Rare (<10%)** | Low | Low | Low | Medium | Medium |

### Impact Calibration

Qualitative labels must be anchored to organizational context to be meaningful:

| Impact Level | Financial | Operational | Reputational | Regulatory |
|-------------|-----------|-------------|-------------|------------|
| Negligible | <$10K | <1 hour downtime | No external awareness | No regulatory interest |
| Minor | $10K-$100K | 1-4 hours downtime | Local media, limited | Regulatory inquiry |
| Moderate | $100K-$1M | 4-24 hours downtime | National media, contained | Formal investigation |
| Major | $1M-$10M | 1-7 days downtime | Sustained national coverage | Enforcement action, fines |
| Catastrophic | >$10M | >7 days / permanent loss | International, lasting damage | License revocation, criminal |

### Limitations of Qualitative Assessment

- Ambiguity: "Medium" risk means different things to different stakeholders
- Anchoring bias: First estimate disproportionately influences subsequent assessments
- Range compression: Analysts cluster around "Medium" to avoid extremes
- Non-composable: Cannot aggregate qualitative risks mathematically
- Decision paralysis: "High" risk does not tell you how much to spend on mitigation

Always prefer FAIR quantification for risks exceeding $100K potential impact. Use qualitative matrices only for initial screening and triage.

---

## CVSS v3.1 — Common Vulnerability Scoring System

### Score Composition

CVSS provides a standardized method for rating vulnerability severity on a 0.0-10.0 scale:

**Base Score Metrics:**

| Metric Group | Metrics | Values |
|-------------|---------|--------|
| Exploitability | Attack Vector (AV) | Network / Adjacent / Local / Physical |
| | Attack Complexity (AC) | Low / High |
| | Privileges Required (PR) | None / Low / High |
| | User Interaction (UI) | None / Required |
| Impact | Confidentiality (C) | None / Low / High |
| | Integrity (I) | None / Low / High |
| | Availability (A) | None / Low / High |
| Scope | Scope (S) | Unchanged / Changed |

**Severity Ratings:**

| Score | Rating | SLA (Recommended) |
|-------|--------|-------------------|
| 9.0-10.0 | Critical | Patch within 24 hours |
| 7.0-8.9 | High | Patch within 7 days |
| 4.0-6.9 | Medium | Patch within 30 days |
| 0.1-3.9 | Low | Patch within 90 days |

### CVSS Limitations and Contextual Scoring

CVSS Base Score measures intrinsic vulnerability severity — it does not consider:
- Whether the vulnerability is actively exploited (use EPSS: Exploit Prediction Scoring System)
- Whether compensating controls exist in your environment
- The business criticality of the affected asset
- Whether the vulnerable component is internet-facing or internal

**Temporal Metrics** adjust for exploit maturity and remediation availability.
**Environmental Metrics** adjust for your specific deployment context.

Always use Environmental scoring when available. A CVSS 9.8 vulnerability in an air-gapped test environment is not equivalent to the same vulnerability on an internet-facing production system.

---

## Risk Register — Operational Risk Management

### Risk Register Structure

| Field | Description |
|-------|-------------|
| Risk ID | Unique identifier (e.g., SEC-2024-042) |
| Title | Concise risk description |
| Category | Threat type (application, infrastructure, compliance, operational) |
| Asset | Affected system, data, or process |
| Threat Actor | Who exploits this risk |
| Vulnerability | What weakness enables the risk |
| Likelihood | Probability rating (1-5) or FAIR estimate |
| Impact | Business impact rating (1-5) or FAIR estimate |
| Inherent Risk | Risk score before controls |
| Controls | Existing mitigations |
| Residual Risk | Risk score after controls |
| Risk Owner | Accountable individual |
| Treatment | Accept / Mitigate / Transfer / Avoid |
| Status | Open / In Treatment / Monitored / Closed |
| Review Date | Next scheduled review |

### Risk Treatment Strategies

**Mitigate:** Implement controls to reduce likelihood or impact. Most common treatment. Must be cost-justified: mitigation cost < (risk reduction * time horizon).

**Accept:** Acknowledge the risk without additional controls. Requires explicit documented approval from an authorized risk owner. Risk acceptance is not risk ignorance — it is a deliberate business decision.

**Transfer:** Shift financial impact to a third party (cyber insurance, contractual liability transfer). Does not eliminate the risk — only transfers financial consequences. Reputational damage and regulatory penalties often cannot be transferred.

**Avoid:** Eliminate the risk by removing the vulnerable asset, process, or capability. Example: Discontinuing a legacy application rather than securing it. Often the most effective but may sacrifice business capability.

### Risk Register Governance

- Review all Critical and High risks monthly
- Review Medium risks quarterly
- Review Low risks annually
- Trigger ad-hoc review when: new threat intelligence, vulnerability disclosure, incident occurs, architecture changes
- Risk owners must revalidate risk ratings and control effectiveness at each review
- Escalate risks that have been "In Treatment" for more than two review cycles without progress

---

## Vulnerability Prioritization — Beyond CVSS

### Stakeholder-Specific Vulnerability Categorization (SSVC)

CISA's SSVC framework (developed with Carnegie Mellon SEI) provides a decision-tree approach to vulnerability prioritization that accounts for context:

**Decision Points:**
1. **Exploitation:** None / PoC / Active
2. **Automatable:** No (requires human interaction) / Yes (wormable)
3. **Technical Impact:** Partial / Total
4. **Mission Prevalence:** Minimal / Support / Essential

**Decision Outcomes:**
- **Track:** Monitor, patch in normal cycle
- **Track*:** Closer monitoring, patch within standard SLA
- **Attend:** Priority attention, patch ahead of schedule
- **Act:** Immediate action required, emergency patching

### EPSS — Exploit Prediction Scoring System

EPSS uses machine learning to predict the probability that a vulnerability will be exploited in the wild within 30 days. It provides a 0.0-1.0 probability score that complements CVSS severity.

**Combining CVSS and EPSS:**
- High CVSS + High EPSS = Immediate remediation (actively exploited critical vulnerability)
- High CVSS + Low EPSS = Scheduled remediation (severe but unlikely to be exploited soon)
- Low CVSS + High EPSS = Investigate (minor vulnerability but actively targeted — may indicate attack chain)
- Low CVSS + Low EPSS = Normal patch cycle

---

## Risk Communication

### Executive Risk Reporting

Communicate risk in business terms, not security jargon:
- "We have a 15% probability of a data breach costing between $2M-$8M in the next 12 months"
- NOT: "We have 47 critical CVEs and our CVSS average is 7.2"

### Risk Appetite Statement

The organization must define explicit risk appetite:
- Maximum acceptable single-loss event
- Maximum acceptable annual aggregate loss
- Risk categories where zero tolerance applies (e.g., customer PII breach)
- Risk categories where higher tolerance is acceptable (e.g., internal tool availability)

### Risk Dashboard Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Critical vulns unpatched >24h | 0 | Daily scan |
| High vulns unpatched >7d | <5 | Weekly report |
| Mean time to remediate (Critical) | <24h | Per-vulnerability tracking |
| Risk register review currency | 100% on schedule | Monthly audit |
| Risk acceptance documentation | 100% documented | Quarterly review |
| Threat model coverage | 100% of production services | Per-service tracking |

---

## Cross-References

- `03_threat_modeling/threat_modeling_methods.md` — Methods that feed risk assessment
- `03_threat_modeling/threat_landscape.md` — Threat intelligence informing likelihood estimates
- `06_operations/vulnerability_management.md` — Operationalizing vulnerability prioritization
- `05_compliance/compliance_frameworks.md` — Regulatory risk requirements
- `Templates/threat_model_template.md` — Risk documentation template
