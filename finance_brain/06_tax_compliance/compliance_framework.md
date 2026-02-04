# Compliance Framework — SOC 2, Revenue Recognition, and Internal Controls

## Overview

Financial compliance encompasses the accounting standards, audit requirements,
and internal controls that ensure a company's financial reporting is accurate
and trustworthy. For startups scaling toward an IPO or enterprise sales, compliance
is both a regulatory requirement and a competitive advantage (enterprise customers
require SOC 2; public markets require SOX-level controls). This module covers
SOC 2, ASC 606 revenue recognition, ASC 842 leases, ASC 718 stock compensation,
COSO internal controls, and SOX readiness.

References: AICPA SOC 2 guide, FASB ASC 606/842/718, COSO Internal Control
Framework (2013), PCAOB Auditing Standards, Deloitte/PwC/EY implementation guides.

---

## SOC 2 (Service Organization Control)

### What Is SOC 2?

SOC 2 is an auditing framework developed by AICPA that evaluates how a
service organization manages data based on five Trust Services Criteria (TSC).

### Trust Services Criteria

| Criterion | Description | Required? |
|-----------|-----------|-----------|
| Security | Protection against unauthorized access | Always (common criteria) |
| Availability | System uptime and accessibility | If SLA-committed |
| Processing Integrity | Data processed completely and accurately | If data processing |
| Confidentiality | Protection of confidential information | If handling sensitive data |
| Privacy | Collection, use, retention of personal info | If handling PII |

### SOC 2 Types

```
Type I:  Point-in-time assessment
  - "As of [date], controls are suitably designed"
  - Faster to obtain (2-3 months)
  - Less convincing (snapshot, not proven operation)

Type II: Period-of-time assessment
  - "During [6-12 month period], controls operated effectively"
  - More rigorous (3-12 months observation)
  - Required by most enterprise customers
  - Observation period typically 6 months minimum
```

### SOC 2 Implementation Roadmap

```
Phase 1: Gap Assessment (Months 1-2)
  - Map current controls to SOC 2 criteria
  - Identify gaps
  - Prioritize remediation

Phase 2: Remediation (Months 2-4)
  - Implement missing controls
  - Document policies and procedures
  - Deploy monitoring tools

Phase 3: Readiness Assessment (Month 5)
  - Internal audit / mock audit
  - Fix remaining gaps

Phase 4: Type I Audit (Month 6)
  - External auditor performs point-in-time evaluation
  - Report issued

Phase 5: Type II Observation (Months 7-12)
  - Controls operate during observation window
  - Evidence collected continuously

Phase 6: Type II Audit (Month 13)
  - External auditor evaluates operating effectiveness
  - Report issued
```

### Key Controls

| Area | Control | Evidence |
|------|---------|---------|
| Access management | RBAC with quarterly access reviews | Access review logs |
| Change management | All code changes require PR review | Git history, CI/CD logs |
| Incident response | Documented IR plan, tested annually | IR plan, tabletop exercise |
| Encryption | Data encrypted at rest and in transit | TLS config, KMS logs |
| Monitoring | Security alerts, log aggregation | SIEM dashboard, alert config |
| Vendor management | Third-party risk assessments | Vendor questionnaires |
| Business continuity | DR plan tested annually | DR test results |

---

## ASC 606 — Revenue Recognition

### Five-Step Model

```
Step 1: Identify the contract with the customer
  - Agreement between parties, commercial substance
  - Can be written, oral, or implied

Step 2: Identify performance obligations
  - Distinct promises to deliver goods/services
  - Distinct if: customer benefits independently AND separately identifiable

Step 3: Determine the transaction price
  - Fixed amount + variable consideration (discounts, rebates, refunds)
  - Allocate variable consideration using expected value or most likely amount

Step 4: Allocate transaction price to performance obligations
  - Based on relative standalone selling prices (SSP)
  - Methods: adjusted market, expected cost + margin, or residual approach

Step 5: Recognize revenue when/as obligations are satisfied
  - Over time: customer simultaneously receives and consumes (SaaS subscription)
  - Point in time: control transfers at a moment (perpetual license)
```

### SaaS Revenue Recognition

```
Typical SaaS contract:
  - 12-month subscription: $120,000 ($10,000/month)
  - Implementation services: $20,000 (3 months)
  - Question: are these distinct performance obligations?

If implementation is distinct (standard setup):
  - Subscription revenue: $10,000/month over 12 months
  - Implementation revenue: recognize over 3-month service period

If implementation is NOT distinct (significant customization):
  - Combined single obligation: $140,000 over 12 months ($11,667/month)
  - Implementation recognized ratably with subscription
```

### Variable Consideration

```
Usage-based pricing:
  Estimate: expected value method (probability-weighted outcomes)
  Constraint: only include amounts highly probable of not reversing

Discounts and concessions:
  If discount is expected: reduce transaction price
  If contingent on future performance: variable consideration

SaaS example with usage tiers:
  Base: $1,000/month (fixed)
  API calls over 1M: $0.01 per call (variable)
  Estimate calls: 1.5M (based on historical usage)
  Monthly revenue: $1,000 + $5,000 = $6,000
  Constrained estimate if uncertain: use lower bound
```

---

## ASC 842 — Leases

### Classification

```
Finance Lease (formerly Capital Lease) if ANY:
  1. Ownership transfers at end of lease
  2. Purchase option that lessee is reasonably certain to exercise
  3. Lease term is for major part (>75% rule of thumb) of asset's life
  4. PV of payments >= substantially all (>90% rule of thumb) of fair value
  5. Asset is specialized with no alternative use to lessor

Operating Lease: everything else
```

### Accounting Treatment

```
Both Finance and Operating leases recognized on balance sheet:

Right-of-Use (ROU) Asset = PV of lease payments
Lease Liability = PV of lease payments

Operating lease:
  Single lease expense (straight-line) on income statement
  Asset and liability decrease over lease term

Finance lease:
  Amortization of ROU asset + interest on liability
  Front-loaded expense pattern (like debt)

Discount rate:
  Implicit rate in the lease (if determinable)
  Otherwise: lessee's incremental borrowing rate
```

### SaaS Company Impact

```
Common leases for startups:
  - Office space: operating lease, 1-5 year term
  - Equipment: often short-term (exempt if < 12 months)
  - Co-working: may not qualify as lease (depends on control)

Practical expedients:
  - Short-term lease exemption: leases < 12 months (no B/S recognition)
  - Low-value asset exemption: under IFRS only, not US GAAP
  - Portfolio approach: group similar leases
```

---

## ASC 718 — Stock Compensation

### Expense Recognition

Stock options and RSUs are non-cash expenses recognized over the vesting period.

```
Stock Option Fair Value: Black-Scholes Model

C = S * N(d1) - K * e^(-rT) * N(d2)

where:
  S = current stock price (409A FMV for private companies)
  K = exercise price (strike price)
  r = risk-free rate (Treasury yield)
  T = expected term (years)
  N() = cumulative normal distribution
  sigma = expected volatility (use comparable public companies)

d1 = [ln(S/K) + (r + sigma^2/2) * T] / (sigma * sqrt(T))
d2 = d1 - sigma * sqrt(T)

Example:
  FMV (409A): $2.00
  Strike: $2.00 (at-the-money)
  Volatility: 60% (comparable companies)
  Risk-free rate: 4.5%
  Expected term: 6 years (SAB 110 simplified method)

  Black-Scholes value: ~$1.12 per option

Expense = $1.12 * 100,000 options = $112,000
Recognized: straight-line over 4-year vesting period = $28,000/year
```

### RSU Accounting

```
RSU fair value = FMV at grant date (no Black-Scholes needed)
Expense = FMV * number of RSUs, recognized over vesting period

Example:
  RSU grant: 10,000 shares at $10 FMV = $100,000
  4-year vesting with 1-year cliff
  Year 1: $25,000 expense
  Year 2: $25,000 expense
  Year 3: $25,000 expense
  Year 4: $25,000 expense
```

---

## COSO Internal Control Framework

### Five Components

```
┌─────────────────────────────────────────────┐
│           COSO Internal Control              │
├─────────────────────────────────────────────┤
│ 1. Control Environment                       │
│    - Tone at the top                         │
│    - Ethical values and integrity             │
│    - Board oversight                          │
│    - Organizational structure                 │
│                                              │
│ 2. Risk Assessment                           │
│    - Identify risks to financial reporting    │
│    - Assess likelihood and impact             │
│    - Consider fraud risk                      │
│                                              │
│ 3. Control Activities                        │
│    - Policies and procedures                  │
│    - Segregation of duties                    │
│    - IT general controls                      │
│    - Authorization and approval limits        │
│                                              │
│ 4. Information and Communication             │
│    - Relevant, quality information flows      │
│    - Internal and external communication      │
│                                              │
│ 5. Monitoring                                │
│    - Ongoing evaluations                      │
│    - Separate evaluations (internal audit)    │
│    - Deficiency reporting                     │
└─────────────────────────────────────────────┘
```

### Segregation of Duties

```
Key segregations:
  - Person who approves invoices ≠ person who issues payments
  - Person who reconciles bank statements ≠ person who handles cash
  - Person who creates vendors in AP ≠ person who approves invoices
  - Developer who writes code ≠ person who deploys to production

For small startups (limited staff):
  - Compensating controls: dual authorization, regular audits
  - CEO or board approval for transactions above threshold
  - Third-party payroll processing
```

---

## SOX Readiness (Pre-IPO)

### Sarbanes-Oxley Requirements

Public companies must comply with SOX, particularly:

**Section 302**: CEO and CFO certify financial statements
**Section 404**: Annual assessment of internal controls over financial reporting

### Pre-IPO Readiness Timeline

```
T-24 months: SOX readiness assessment
  - Gap analysis against COSO framework
  - Remediation planning

T-18 months: Control implementation
  - Design and implement controls
  - Document process narratives and control matrices
  - Implement IT general controls (ITGC)

T-12 months: Testing and remediation
  - Internal testing of control effectiveness
  - Remediate deficiencies
  - Begin external auditor familiarity

T-6 months: External audit preparation
  - Engage external auditor for SOX attestation
  - Provide process documentation
  - Facilitate walkthroughs and testing

T-0: IPO filing
  - Section 302 certification in S-1
  - Section 404 exemption available for first year (emerging growth company)
```

---

## Production Checklist

- [ ] SOC 2 Type I obtained (minimum for enterprise sales)
- [ ] SOC 2 Type II audit period started
- [ ] ASC 606 revenue recognition policy documented and implemented
- [ ] Deferred revenue schedule reconciled monthly
- [ ] ASC 842 leases recognized on balance sheet with ROU assets
- [ ] ASC 718 stock compensation expense calculated and recorded
- [ ] COSO internal controls documented with risk assessment
- [ ] Segregation of duties implemented (or compensating controls)
- [ ] SOX readiness timeline defined (if IPO path)
- [ ] External audit firm engaged for annual financial statements
