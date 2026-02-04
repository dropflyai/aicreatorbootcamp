# Vendor Management -- Strategic Sourcing and Supplier Lifecycle

## Overview

Vendor management is the discipline of selecting, contracting, managing,
and optimizing external suppliers who provide goods, services, or capabilities
that the organization requires but does not produce internally. The vendor
management function sits at the intersection of procurement, operations,
finance, and legal -- it is fundamentally a relationship management discipline
backed by data, contracts, and governance.

Done well, vendor management creates competitive advantage through access to
best-in-class capabilities at optimal cost. Done poorly, it creates dependency,
risk, and margin erosion.

This module covers the complete vendor lifecycle from identification through
exit, including the formal sourcing process (RFI/RFP/RFQ/POC), evaluation
criteria, SLA design, scorecards, contract management, and renegotiation.

---

## The Vendor Lifecycle

```
VENDOR LIFECYCLE:
+----------------------------------------------------------+
|                                                          |
|  IDENTIFY --> EVALUATE --> SELECT --> CONTRACT -->        |
|                                                          |
|  --> ONBOARD --> MANAGE --> REVIEW --> RENEW/EXIT        |
|                                                          |
+----------------------------------------------------------+

Each stage has specific activities, deliverables, and decision gates.
```

### Stage Details

| Stage | Activities | Deliverables | Decision Gate |
|-------|-----------|--------------|---------------|
| Identify | Market scan, longlist creation, peer references | Longlist of 8-15 vendors | Longlist approved |
| Evaluate | RFI, RFP, RFQ, demos, POC, reference checks | Evaluation matrix, shortlist of 2-3 | Shortlist approved |
| Select | Final scoring, negotiation, risk assessment | Selection recommendation | Selection approved |
| Contract | Legal review, SLA definition, pricing, T&Cs | Signed contract | Contract executed |
| Onboard | Integration, training, access provisioning | Operational readiness | Go-live approved |
| Manage | Day-to-day operations, issue resolution | Ongoing performance data | Continuous |
| Review | Quarterly scorecard, annual business review | Scorecard, action plan | Review complete |
| Renew/Exit | Renewal negotiation or transition plan | New contract or exit plan | Renewal/exit approved |

---

## The Sourcing Process

### RFI -- Request for Information

```
PURPOSE: Gather preliminary information from potential vendors.
         Not a commitment. Used to build a shortlist.

RFI STRUCTURE:
+--------------------------------------------------+
| SECTION 1: Company Information                    |
| - Company name, size, revenue, ownership          |
| - Years in business, geographic presence          |
| - Financial stability (references, Dun & Bradstreet)|
|                                                  |
| SECTION 2: Capability Overview                    |
| - Products/services relevant to our needs        |
| - Customer references in our industry            |
| - Technology stack and integration capabilities   |
|                                                  |
| SECTION 3: Security and Compliance               |
| - Certifications (SOC 2, ISO 27001, GDPR)       |
| - Data handling and privacy practices            |
| - Business continuity and disaster recovery      |
|                                                  |
| SECTION 4: Pricing Model Overview                |
| - General pricing structure (not detailed quotes)|
| - Licensing model (per-seat, usage, flat fee)    |
+--------------------------------------------------+

TIMELINE: Allow 2-3 weeks for vendor response.
OUTPUT: Shortlist of 4-6 vendors for RFP stage.
```

### RFP -- Request for Proposal

```
PURPOSE: Solicit detailed proposals from shortlisted vendors.
         Includes requirements, evaluation criteria, timeline.

RFP STRUCTURE:
+--------------------------------------------------+
| SECTION 1: Background and Objectives             |
| - Who we are, what we need, why we need it       |
| - Business context and strategic goals           |
|                                                  |
| SECTION 2: Scope of Work                         |
| - Detailed requirements (functional, technical)  |
| - Must-have vs. nice-to-have (MoSCoW)          |
| - Integration requirements                       |
| - Data migration requirements                    |
|                                                  |
| SECTION 3: Technical Requirements                |
| - Architecture, scalability, security            |
| - API specifications, data formats               |
| - Performance requirements (latency, throughput) |
|                                                  |
| SECTION 4: Service Level Requirements            |
| - Uptime, response time, resolution time         |
| - Support hours and escalation paths             |
| - Reporting and communication cadence            |
|                                                  |
| SECTION 5: Commercial Requirements               |
| - Pricing structure (detailed breakdown)         |
| - Payment terms                                  |
| - Contract duration and renewal terms            |
|                                                  |
| SECTION 6: Evaluation Criteria                   |
| - How proposals will be scored (with weights)    |
| - Timeline for decision                          |
|                                                  |
| SECTION 7: Submission Instructions               |
| - Format, deadline, contact for questions        |
+--------------------------------------------------+

TIMELINE: Allow 3-4 weeks for vendor response.
OUTPUT: Scored proposals, shortlist of 2-3 for demos/POC.
```

### RFQ -- Request for Quotation

```
PURPOSE: Obtain detailed pricing for a well-defined scope.
         Used when requirements are clear and comparison
         is primarily on price and terms.

RFQ CONTENT:
- Exact specifications of what is being purchased
- Volume and duration
- Delivery requirements
- Payment terms
- Required format for pricing breakdown

TIMELINE: Allow 1-2 weeks for vendor response.
OUTPUT: Comparable pricing from multiple vendors.
```

### POC -- Proof of Concept

```
PURPOSE: Validate that the vendor's solution actually works
         in our environment with our data and our workflows
         before committing to a contract.

POC DESIGN:
+--------------------------------------------------+
| SCOPE: Limited, time-boxed test (2-4 weeks)      |
|                                                  |
| SUCCESS CRITERIA (defined BEFORE POC starts):    |
| 1. [Technical criterion -- measurable]           |
| 2. [Performance criterion -- measurable]         |
| 3. [Integration criterion -- measurable]         |
| 4. [Usability criterion -- measurable]           |
|                                                  |
| EVALUATION:                                      |
| - Each criterion: Pass / Fail / Partial          |
| - Overall: Proceed / Do Not Proceed              |
|                                                  |
| RULES:                                           |
| - POC scope agreed in writing before start       |
| - Vendor provides support during POC             |
| - POC does NOT commit us to purchase             |
| - POC is evaluated against pre-defined criteria  |
+--------------------------------------------------+
```

---

## Vendor Evaluation Criteria

### The Evaluation Framework

```
VENDOR EVALUATION SCORECARD:
+--------------------+--------+-------+-------+-------+
| Category           | Weight | V1    | V2    | V3    |
+--------------------+--------+-------+-------+-------+
| Functionality      | 30%    | [/10] | [/10] | [/10] |
| Technical fit      | 20%    | [/10] | [/10] | [/10] |
| Price/TCO          | 20%    | [/10] | [/10] | [/10] |
| Vendor viability   | 10%    | [/10] | [/10] | [/10] |
| Support/service    | 10%    | [/10] | [/10] | [/10] |
| Security/compliance| 10%    | [/10] | [/10] | [/10] |
+--------------------+--------+-------+-------+-------+
| WEIGHTED TOTAL     | 100%   | [X]   | [X]   | [X]   |
+--------------------+--------+-------+-------+-------+
```

### Scoring Guidelines

| Score | Meaning |
|-------|---------|
| 9-10 | Exceeds requirements, best-in-class |
| 7-8 | Fully meets requirements |
| 5-6 | Partially meets requirements, gaps exist |
| 3-4 | Significant gaps, workarounds needed |
| 1-2 | Does not meet requirements |

### Total Cost of Ownership (TCO)

```
TCO CALCULATION:
+--------------------------------------------------+
| DIRECT COSTS:                                    |
| License/subscription fees: $[X]/year             |
| Implementation/setup fees: $[X] (one-time)       |
| Integration development: $[X] (one-time)         |
| Training costs: $[X] (one-time + ongoing)        |
|                                                  |
| INDIRECT COSTS:                                  |
| Internal staff time for management: $[X]/year    |
| Customization/configuration: $[X]               |
| Data migration: $[X] (one-time)                 |
| Downtime/disruption during transition: $[X]      |
|                                                  |
| ONGOING COSTS:                                   |
| Annual maintenance/support: $[X]/year            |
| Upgrades/version migrations: $[X]/year           |
| Internal support burden: $[X]/year               |
|                                                  |
| EXIT COSTS:                                      |
| Data extraction: $[X]                            |
| Contract termination fees: $[X]                  |
| Transition to replacement: $[X]                  |
|                                                  |
| 3-YEAR TCO: Sum of all costs over 3 years       |
+--------------------------------------------------+
```

---

## SLA Design

### SLA Components

```
SERVICE LEVEL AGREEMENT STRUCTURE:
+--------------------------------------------------+
| 1. SERVICE DESCRIPTION                           |
|    What the vendor will deliver                   |
|                                                  |
| 2. PERFORMANCE METRICS                           |
|    Measurable standards the vendor must meet      |
|    - Availability (e.g., 99.9% uptime)           |
|    - Response time (e.g., <200ms p95)            |
|    - Resolution time (e.g., P1: 4 hours)         |
|    - Throughput (e.g., 10,000 requests/sec)      |
|                                                  |
| 3. MEASUREMENT METHOD                            |
|    How metrics are measured and reported           |
|    - Monitoring tools and data sources            |
|    - Reporting frequency and format               |
|    - Dispute resolution for measurement           |
|                                                  |
| 4. REMEDIES AND PENALTIES                        |
|    Consequences for missing SLAs                  |
|    - Service credits (e.g., 10% for each 0.1%    |
|      below target)                               |
|    - Right to terminate for chronic failure       |
|    - Escalation triggers                          |
|                                                  |
| 5. EXCLUSIONS                                    |
|    What does NOT count against the SLA            |
|    - Scheduled maintenance windows                |
|    - Force majeure events                         |
|    - Issues caused by customer actions            |
|                                                  |
| 6. REVIEW CADENCE                                |
|    When and how SLAs are reviewed and updated     |
+--------------------------------------------------+
```

### SLA Tiers

| Tier | Availability | Response Time | Use Case |
|------|-------------|---------------|----------|
| Platinum | 99.99% (52 min/year downtime) | <100ms p99 | Mission-critical systems |
| Gold | 99.9% (8.7 hr/year downtime) | <200ms p95 | Business-critical systems |
| Silver | 99.5% (43.8 hr/year downtime) | <500ms p95 | Important but not critical |
| Bronze | 99.0% (87.6 hr/year downtime) | <1s p95 | Non-critical, best effort |

---

## Vendor Scorecards

### Quarterly Vendor Scorecard

```
VENDOR SCORECARD
+--------------------------------------------------+
| VENDOR: [Name]           PERIOD: Q[X] [Year]     |
| OWNER: [Internal owner]  TIER: [Strategic/        |
|                                  Tactical/         |
|                                  Commodity]        |
+--------------------------------------------------+
| CATEGORY        | Weight | Score | Weighted Score |
+-----------------+--------+-------+----------------+
| SLA compliance  | 30%    | [/10] | [X]            |
| Quality         | 25%    | [/10] | [X]            |
| Responsiveness  | 15%    | [/10] | [X]            |
| Innovation      | 10%    | [/10] | [X]            |
| Cost management | 10%    | [/10] | [X]            |
| Relationship    | 10%    | [/10] | [X]            |
+-----------------+--------+-------+----------------+
| TOTAL           | 100%   |       | [X/10]         |
+--------------------------------------------------+
| TREND: [Improving / Stable / Declining]           |
| STATUS: [GREEN / YELLOW / RED]                    |
| ACTION ITEMS:                                     |
| 1. [Action -- Owner -- Due date]                 |
| 2. [Action -- Owner -- Due date]                 |
+--------------------------------------------------+
```

### Scorecard Thresholds

| Score | Status | Action |
|-------|--------|--------|
| 8.0-10.0 | GREEN | Maintain, explore expansion |
| 6.0-7.9 | YELLOW | Improvement plan, monthly check-in |
| 4.0-5.9 | RED | Formal remediation, explore alternatives |
| Below 4.0 | CRITICAL | Initiate exit planning |

---

## Contract Management

### Key Contract Terms

```
ESSENTIAL CONTRACT TERMS CHECKLIST:
[ ] Scope of services (detailed, unambiguous)
[ ] Pricing and payment terms
[ ] Service levels and remedies
[ ] Term and renewal conditions
[ ] Termination rights (for cause and convenience)
[ ] Intellectual property ownership
[ ] Data ownership, portability, and deletion
[ ] Confidentiality and non-disclosure
[ ] Liability caps and indemnification
[ ] Insurance requirements
[ ] Subcontracting restrictions
[ ] Change management process
[ ] Dispute resolution mechanism
[ ] Governing law and jurisdiction
[ ] Force majeure clause
[ ] Audit rights
```

### Contract Renewal and Renegotiation

```
RENEWAL DECISION FRAMEWORK:
+--------------------------------------------------+
| 6 MONTHS BEFORE EXPIRY:                          |
| 1. Review vendor scorecard history                |
| 2. Assess market alternatives                     |
| 3. Calculate switching costs                      |
| 4. Identify renegotiation leverage                |
|                                                  |
| 3 MONTHS BEFORE EXPIRY:                          |
| 5. Begin renegotiation or alternative selection   |
| 6. Prepare best alternative (BATNA)              |
|                                                  |
| RENEGOTIATION LEVERAGE POINTS:                   |
| - Competitor quotes (real, not fabricated)        |
| - Volume commitments (for better pricing)         |
| - Multi-year terms (for discounts)               |
| - Documented performance issues (for credits)     |
| - Market benchmarking data                        |
|                                                  |
| DECISION:                                        |
| Score > 7.0 + competitive pricing --> RENEW      |
| Score 5.0-7.0 --> RENEW WITH CONDITIONS          |
| Score < 5.0 or uncompetitive --> TRANSITION OUT  |
+--------------------------------------------------+
```

---

## Vendor Segmentation

### The Kraljic Matrix for Vendor Classification

```
KRALJIC MATRIX:
              HIGH SUPPLY RISK
                    |
    BOTTLENECK      |      STRATEGIC
    (high risk,     |      (high risk,
     low profit     |       high profit
     impact)        |       impact)
                    |
LOW PROFIT ---------+---------- HIGH PROFIT
IMPACT              |           IMPACT
                    |
    NON-CRITICAL    |      LEVERAGE
    (low risk,      |      (low risk,
     low profit     |       high profit
     impact)        |       impact)
                    |
              LOW SUPPLY RISK

MANAGEMENT APPROACH BY QUADRANT:
Strategic:    Partnership, joint development, long-term contracts
Leverage:     Competitive bidding, maximize bargaining power
Bottleneck:   Secure supply, develop alternatives, safety stock
Non-critical: Simplify, automate procurement, reduce effort
```

---

## Vendor Risk Management

```
VENDOR RISK ASSESSMENT:
+--------------------------------------------------+
| RISK CATEGORY      | ASSESSMENT | MITIGATION      |
+--------------------+------------+-----------------+
| Financial risk     | [H/M/L]   | Credit monitoring|
| Operational risk   | [H/M/L]   | SLA + penalties |
| Security risk      | [H/M/L]   | Audits, SOC 2   |
| Concentration risk | [H/M/L]   | Dual sourcing   |
| Compliance risk    | [H/M/L]   | Contract terms  |
| Reputational risk  | [H/M/L]   | Due diligence   |
| Transition risk    | [H/M/L]   | Exit planning   |
+--------------------+------------+-----------------+

RULE: Every strategic vendor has a documented risk assessment.
      Every HIGH risk has a documented mitigation plan.
      Risk assessments are reviewed annually.
```

---

**Vendor management transforms external relationships from transactional
purchasing into strategic partnerships. The Operations Brain selects vendors
through rigorous evaluation, governs them through SLAs and scorecards,
manages risk through diversification and monitoring, and optimizes value
through lifecycle management and strategic renegotiation.**
