# Pricing Governance — Committee, Authority, Compliance, and Audit

## Overview

Pricing governance is the organizational framework that ensures pricing decisions are made
consistently, transparently, and in alignment with business strategy. Without governance,
pricing devolves into ad hoc decisions made by individual sales reps, resulting in margin
erosion, customer inequity, brand damage, and legal risk. This module covers pricing
committee structure and charter, the authority matrix for pricing decisions, exception and
escalation processes, pricing audit methodology, competitive monitoring cadence, and
legal compliance including anti-trust, price discrimination laws, and international
regulatory considerations. Governance is what separates professional pricing from chaos.

---

## 1. Pricing Committee

### Committee Charter

```
PRICING COMMITTEE PURPOSE:
  Centralized decision-making body for all significant pricing changes.
  Ensures pricing decisions are data-driven, strategically aligned,
  and cross-functionally vetted before implementation.

COMMITTEE COMPOSITION:
  Chair:              VP of Pricing / Head of Pricing (or CFO if no pricing team)
  Core Members:
    - Head of Product (feature value perspective)
    - VP of Sales (field reality, deal dynamics)
    - VP of Marketing (positioning, competitive)
    - CFO / Head of Finance (margin, revenue impact)
    - Head of Customer Success (retention impact)
  Rotating Members:
    - Legal (when compliance/regulatory items on agenda)
    - Engineering (when billing/system changes required)
    - Data/Analytics (when research is presented)

MEETING CADENCE:
  Standing meeting:   Monthly (2 hours)
  Ad hoc:             As needed for urgent pricing decisions
  Annual:             Full-day pricing strategy review (annually)

QUORUM:
  Minimum 4 core members present for decisions
  Chair has tie-breaking vote
  Absent members can submit written position
```

### Committee Responsibilities

```
WHAT THE PRICING COMMITTEE DECIDES:

  MUST APPROVE:
    - New product/plan pricing (any new SKU)
    - Price increases or decreases (any change to list price)
    - New discount programs or policies
    - Pricing model changes (e.g., per-seat to usage-based)
    - International pricing adjustments
    - Enterprise pricing floor changes
    - Promotional pricing programs
    - Free tier scope changes

  INFORMED BUT NOT APPROVING:
    - Individual deal discounts (within authority matrix)
    - Seasonal promotions within approved framework
    - Currency exchange rate adjustments (mechanical)
    - Minor feature repackaging within existing tiers

  NOT IN SCOPE:
    - Individual customer negotiations (deal desk handles)
    - Billing system configuration (ops handles)
    - Pricing page design (design/marketing handles)
    - Competitive intelligence gathering (marketing handles)
```

### Committee Decision Process

```
DECISION WORKFLOW:

  STEP 1: PROPOSAL SUBMISSION (2 weeks before meeting)
    Proposer submits pricing change request:
      - What is changing and why
      - Data supporting the change (WTP, competitive, financial)
      - Expected revenue/margin impact (modeled)
      - Customer impact assessment
      - Recommended implementation timeline
      - Risk assessment and mitigation

  STEP 2: PRE-READ DISTRIBUTION (1 week before)
    Committee members receive proposal packet
    Members submit questions or concerns asynchronously

  STEP 3: COMMITTEE DISCUSSION
    Proposer presents (15 min)
    Q&A and debate (30 min)
    Vote: Approve / Approve with modifications / Reject / Table

  STEP 4: DECISION DOCUMENTATION
    Decision recorded with:
      - What was decided
      - Rationale
      - Conditions or modifications
      - Implementation owner and timeline
      - Review date (when to assess impact)

  STEP 5: IMPLEMENTATION
    Owner executes per approved plan
    Reports back to committee at next meeting

DECISION CRITERIA:
  Every pricing decision is evaluated against:
    1. Strategic alignment (does this support our pricing strategy?)
    2. Revenue impact (modeled with sensitivity analysis)
    3. Customer impact (churn risk, satisfaction)
    4. Competitive position (does this strengthen or weaken us?)
    5. Operational feasibility (can billing/systems support this?)
    6. Legal/compliance (any regulatory concerns?)
```

---

## 2. Authority Matrix

### Decision Rights by Level

```
PRICING AUTHORITY MATRIX:

  Decision Type                       Authority Level
  ─────────────────────────────────────────────────────────
  Set new product list prices         Pricing Committee
  Change existing list prices         Pricing Committee
  Change pricing model/structure      Pricing Committee + CEO
  Launch promotional campaign         VP Marketing + Pricing Committee
  Approve standard discount (0-10%)   Sales Rep
  Approve discount (11-20%)           Sales Manager
  Approve discount (21-30%)           VP Sales + Deal Desk
  Approve discount (31-40%)           CRO + CFO
  Approve discount (>40%)             CEO (exceptional only)
  Set international PPP rates         Pricing Committee
  Approve custom enterprise terms     Deal Desk + Legal
  Change free tier scope              Pricing Committee
  Approve partner/channel pricing     VP Partnerships + Pricing Committee
  Emergency pricing action            CEO (ratified by committee within 48h)
```

### Escalation Protocol

```
ESCALATION PATHS:

  SALES DISCOUNT ESCALATION:
    Rep → Manager → Director → VP Sales → CRO → CEO
    Each level adds 10% discount authority
    No level-skipping; each must review and forward

  PRICING EXCEPTION ESCALATION:
    Requestor → Deal Desk → Pricing Committee Chair → Full Committee
    For non-standard pricing structures, custom models, etc.

  EMERGENCY ESCALATION:
    Anyone → CEO (direct)
    Examples: Competitor makes dramatic pricing move,
    billing system error causing incorrect charges,
    regulatory change requiring immediate action
    CEO decides; committee ratifies within 48 hours

  CONFLICT RESOLUTION:
    If Sales and Finance disagree on a deal:
      → Deal Desk mediates
      → If unresolved: VP Sales + CFO discuss
      → If still unresolved: CEO decides
    All conflicts documented for committee review
```

---

## 3. Exception Process

### When Exceptions Are Warranted

```
VALID EXCEPTION REASONS:

  STRATEGIC ACCOUNT:
    Fortune 500 logo that opens a new market segment
    Must document: Expected logo value, expansion potential
    Approval: CRO + Pricing Committee Chair

  COMPETITIVE DISPLACEMENT:
    Winning a customer from a named competitor
    Must document: Competitor, their pricing, strategic value
    Approval: VP Sales + Deal Desk

  MARKET ENTRY:
    First customer in a new geography or vertical
    Must document: Market opportunity, reference value
    Approval: Pricing Committee

  CUSTOMER RECOVERY:
    Retaining a customer at risk of churning
    Must document: Churn signals, customer value, root cause
    Approval: VP Customer Success + Deal Desk

INVALID EXCEPTION REASONS:
  - "Customer asked for a bigger discount" (not strategic)
  - "End of quarter and we need the deal" (time pressure)
  - "Competitor is cheaper" (without verified competitive intel)
  - "Rep promised a price before checking" (process failure)
```

### Exception Documentation

```
EXCEPTION REQUEST FORM:

  REQUESTOR: [Name, Role]
  CUSTOMER: [Company, Size, Industry]
  DEAL VALUE: [ACV at list price] → [ACV at requested price]
  DISCOUNT REQUESTED: [%] — exceeds authority by [%]

  JUSTIFICATION:
    Category: [ ] Strategic Account  [ ] Competitive  [ ] Market Entry  [ ] Recovery
    Narrative: [Why this exception is warranted — 3-5 sentences]
    Supporting data: [Competitive intel, customer data, market analysis]

  FINANCIAL IMPACT:
    Revenue at list:     $[X]
    Revenue at exception: $[Y]
    Margin at exception:  [Z]%
    LTV projection:       $[W]
    Payback period:       [N] months

  CONDITIONS:
    Duration: [How long does the exception pricing last?]
    Sunset:   [When does it revert to standard pricing?]
    Quid pro quo: [What does the customer commit in return?]
      e.g., case study, annual commitment, reference call

  APPROVAL: [Approver name, date, conditions]

  EVERY exception is logged in the Exception Register (spreadsheet/DB)
  Exceptions are reviewed quarterly by Pricing Committee
```

---

## 4. Pricing Audit

### Audit Framework

```
PRICING AUDIT PURPOSE:
  Verify that pricing is being executed as designed.
  Identify revenue leakage, policy violations, and optimization opportunities.

AUDIT CADENCE:
  Mini-audit:   Monthly (automated checks)
  Full audit:    Quarterly (manual + automated)
  Deep audit:    Annually (comprehensive review)

MONTHLY MINI-AUDIT (Automated):
  - Discount compliance: % of deals within authority matrix
  - Average discount depth vs. target
  - Exception count and approval rate
  - Invoice accuracy (pricing matches contracted rate)
  - Dunning recovery rate
  - Revenue recognition accuracy

QUARTERLY FULL AUDIT:
  1. DISCOUNT ANALYSIS
     Pull all deals closed in quarter
     Calculate: Average discount, median, distribution
     Flag: Deals above authority without proper approval
     Compare: Discount trends quarter-over-quarter

  2. PRICE REALIZATION
     List price vs. invoice price vs. pocket price
     Where is revenue leaking? (discounts, credits, terms)
     Revenue waterfall analysis (see 07_analytics)

  3. CUSTOMER EQUITY
     Are similar customers paying similar prices?
     Identify: Outliers paying significantly above/below peers
     Assess: Is price disparity justified by value/volume?

  4. COMPETITIVE ALIGNMENT
     Compare current pricing to competitive landscape
     Identify: Are we over/under-priced vs. alternatives?
     Update: Competitive price map

  5. POLICY COMPLIANCE
     Verify: All exceptions properly documented and approved
     Verify: Promotional pricing has valid start/end dates
     Verify: International pricing reflects current PPP data
     Verify: Grandfathered pricing is tracked and managed

ANNUAL DEEP AUDIT:
  All quarterly items PLUS:
  - Full pricing strategy review
  - WTP research (survey or conjoint)
  - Packaging effectiveness analysis
  - Enterprise deal structure review
  - Revenue recognition compliance
  - Legal/regulatory compliance review
```

### Revenue Leakage Identification

```
REVENUE LEAKAGE SOURCES:

  SOURCE 1: UNAPPROVED DISCOUNTS
    Sales rep gives discount without proper approval
    Detection: Compare CRM discount field to approval records
    Fix: Enforce CPQ workflow; disable manual price overrides

  SOURCE 2: EXPIRED PROMOTIONS
    Customer still on promotional price past expiration
    Detection: Audit billing records for expired coupon codes
    Fix: Auto-expire promotions in billing system

  SOURCE 3: GRANDFATHERED PRICING
    Long-tenured customers on old pricing (never migrated)
    Detection: Compare customer price to current list price
    Fix: Planned migration with communication (see 05_experimentation)

  SOURCE 4: BILLING ERRORS
    Customer charged less than contracted rate
    Detection: Reconcile contract terms to billing records
    Fix: Billing system audit; automated reconciliation

  SOURCE 5: FREE/TRIAL OVERRUNS
    Customer on free trial that was never converted or expired
    Detection: Audit trial accounts past expiration date
    Fix: Auto-expire trials; convert or downgrade

  SOURCE 6: SEAT UNDERCOUNT
    Customer has more active users than seats billed
    Detection: Compare active user count to licensed seats
    Fix: Auto-billing for seat overages; usage alerts

LEAKAGE QUANTIFICATION:
  For each source, calculate:
    Annual revenue lost = (List price - Actual price) * affected customers * 12
  Total leakage typically: 5-15% of theoretical maximum revenue
```

---

## 5. Competitive Monitoring

### Competitive Intelligence Program

```
COMPETITIVE PRICING MONITORING:

  DAILY (Automated):
    - Competitor pricing page scraping (web monitoring tools)
    - Alert on any detected pricing changes
    - Social media monitoring for pricing announcements
    - Tools: Klue, Crayon, Kompyte, custom scrapers

  WEEKLY:
    - Review competitor pricing alerts from automated system
    - Check competitor blog/changelog for new tiers or packaging
    - Review lost deal analysis for pricing-related losses
    - Update competitive price comparison spreadsheet

  MONTHLY:
    - Competitive pricing brief to sales team
    - Update battle cards with current pricing data
    - Analyze win/loss by competitor and price delta
    - Review competitor positioning changes

  QUARTERLY:
    - Full competitive pricing map update
    - Present findings to Pricing Committee
    - Assess if competitive changes warrant response
    - Update pricing strategy if market has shifted

COMPETITIVE RESPONSE DECISION TREE:

  Competitor lowers prices:
    → Impact on our win rate? (check data for 30 days)
      → Win rate unchanged: No action (monitor)
      → Win rate declined 5-10%: Update battle cards; value selling
      → Win rate declined >10%: Pricing Committee evaluates response

  Competitor raises prices:
    → Opportunity? (check if we can capture share)
      → Maintain current pricing (relative value improves)
      → Consider own price increase if market supports it

  Competitor changes model (e.g., to usage-based):
    → Monitor customer sentiment
    → Evaluate if model change is market trend
    → If trend: Consider similar model shift (long-term)
    → If isolated: Communicate advantages of our model
```

---

## 6. Legal and Regulatory Compliance

### Anti-Trust and Price Discrimination

```
LEGAL FRAMEWORK FOR PRICING:

  ANTI-TRUST (Sherman Act, Clayton Act — US):
    PROHIBITED:
      - Price fixing: Agreement with competitors on prices
      - Bid rigging: Coordinating bids on contracts
      - Market allocation: Dividing markets with competitors
    ALLOWED:
      - Independent pricing decisions (even if similar to competitors)
      - Responding to competitive pricing changes
      - Volume discounts (if cost-justified)

  ROBINSON-PATMAN ACT (US — Price Discrimination):
    PROHIBITED:
      - Charging different prices to competing customers for same product
        IF: It substantially lessens competition
    ALLOWED:
      - Different prices based on cost differences (volume, delivery)
      - Different prices for different products (tiers, versions)
      - Meeting competition (matching a competitor's lower price)
      - PPP adjustments (different markets, different economics)
    NOTE: Primarily applies to goods; weaker application to services/SaaS
          but still relevant for enterprise deals

  GDPR/DATA PROTECTION (EU):
    - Price personalization using personal data requires consent
    - Algorithmic pricing must be explainable if challenged
    - "Right to explanation" may apply to dynamic pricing
    - Document the basis for any personalized pricing

  CONSUMER PROTECTION:
    - Prices must be clearly displayed before purchase
    - "Drip pricing" (revealing fees at checkout) is increasingly regulated
    - Automatic renewal must be clearly disclosed
    - Cancellation must be as easy as sign-up (FTC "click-to-cancel" rule)

PRICING COMPLIANCE CHECKLIST:
  [ ] No communication with competitors about pricing
  [ ] Price differences between customers are documented and justified
  [ ] Promotional pricing has clear terms, start/end dates
  [ ] Automatic renewals are clearly disclosed in signup flow
  [ ] Cancellation process is easy and accessible
  [ ] International pricing complies with local consumer protection laws
  [ ] Dynamic/personalized pricing is transparent if questioned
  [ ] Privacy policy covers use of data in pricing decisions
```

### International Regulatory Considerations

```
JURISDICTION-SPECIFIC RULES:

  UNITED STATES:
    - No general price control (market-based)
    - FTC enforces deceptive pricing practices
    - State-level consumer protection varies
    - Sales tax varies by state (use tax automation: Avalara)

  EUROPEAN UNION:
    - GDPR applies to pricing personalization
    - Consumer Rights Directive: 14-day withdrawal right for digital
    - VAT required (reverse charge for B2B; standard for B2C)
    - EU Geo-blocking Regulation: Cannot discriminate by EU country for digital

  UNITED KINGDOM:
    - Consumer Rights Act 2015
    - Similar to EU but post-Brexit divergence
    - VAT at 20% standard rate for digital services

  AUSTRALIA:
    - Australian Consumer Law (ACL)
    - GST at 10% for digital services to AU consumers
    - "Drip pricing" specifically prohibited

  INDIA:
    - GST at 18% for SaaS services
    - Foreign company may need GST registration
    - MRP (Maximum Retail Price) concept does not apply to services

  IMPLEMENTATION:
    - Tax automation platform (Avalara, TaxJar) handles calculations
    - Legal review for each new market entry
    - Annual compliance review by jurisdiction
```

---

## 7. Governance Metrics

### Governance Health Dashboard

```
GOVERNANCE EFFECTIVENESS METRICS:

  COMPLIANCE:
    Discount authority compliance rate:     Target >95%
    Exception documentation rate:           Target 100%
    Pricing committee attendance rate:      Target >80%
    Audit finding resolution rate:          Target >90% within 30 days

  PROCESS EFFICIENCY:
    Deal desk review turnaround:            Target <4 hours
    Pricing committee decision turnaround:  Target <2 weeks
    Exception approval turnaround:          Target <24 hours
    New product pricing setup time:         Target <2 weeks

  FINANCIAL HEALTH:
    Revenue leakage rate:                   Target <5% of theoretical
    Average discount depth trend:           Target stable or declining
    Price realization rate:                 Target >85%
    Grandfathered pricing percentage:       Target declining quarter over quarter

  STRATEGIC ALIGNMENT:
    % of pricing decisions backed by data:  Target >80%
    Competitive response time:              Target <30 days
    Pricing strategy review compliance:     Target annual minimum
```

---

## References

1. Simon, H. (2015). "Confessions of the Pricing Man."
2. Nagle, T., & Muller, G. (2017). "The Strategy and Tactics of Pricing."
3. Baker, W., Marn, M., & Zawada, C. (2010). "The Price Advantage." McKinsey.
4. Federal Trade Commission (2023). "Guides Against Deceptive Pricing."
5. FASB ASC 606 (2014). "Revenue from Contracts with Customers."
6. EU Consumer Rights Directive 2011/83/EU.

---

**This document is authoritative for pricing governance within the Pricing Brain.**
