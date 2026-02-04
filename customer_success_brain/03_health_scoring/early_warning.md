# Early Warning Systems

## The Principle of Early Intervention

By the time a customer requests cancellation, the intervention window has
typically closed. Gartner research (2022) shows that 80% of customers who
churn had resolved their decision 60-90 days before the contract expired.
The purpose of an early warning system is to detect churn signals weeks or
months before the customer acts, creating an intervention window where rescue
is still possible.

---

## Churn Signal Taxonomy

### Category 1: Usage Signals (Strongest Predictors)

Usage signals are the earliest and most reliable indicators of churn risk.
They are objective, measurable, and available in real-time.

```
USAGE-BASED CHURN SIGNALS
══════════════════════════

Signal                          | Severity | Detection Method
────────────────────────────────|──────────|─────────────────────
Login frequency drop >30%       | High     | 14-day rolling average vs. baseline
Zero logins for 14+ days        | Critical | Daily login monitoring
Key feature abandonment         | High     | Feature usage tracking (weekly)
Usage trend declining 3+ weeks  | Medium   | Trend analysis algorithm
Active user count declining     | High     | WAU tracking, user churn within account
Integration disconnected        | High     | Integration health monitoring
Data export spike               | Critical | Export activity monitoring
Admin disables user accounts    | High     | Account management tracking
```

#### Usage Decay Curves

Research from Gainsight and Mixpanel shows that churn-destined customers
exhibit a characteristic usage decay curve:

```
Usage Level
    │
100%├── ● ● ● ● ●
    │              ● ●
 75%├──                ●
    │                    ●
 50%├──                    ●
    │                        ●
 25%├──                        ●
    │                            ● ●
  0%├── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─●─ ─ CHURN
    └───┬───┬───┬───┬───┬───┬───┬───┬───
       W1  W4  W8  W12 W16 W20 W24 W28
                                    │
                                  Renewal
                                   Date

Key Insight: The inflection point (where decline accelerates) typically
occurs 12-16 weeks before churn. This is the optimal intervention window.
```

### Category 2: Engagement Signals

Engagement signals measure the quality of the relationship between CS and
the customer's stakeholders.

```
ENGAGEMENT-BASED CHURN SIGNALS
═══════════════════════════════

Signal                          | Severity | Detection Method
────────────────────────────────|──────────|─────────────────────
Missed QBR (no-show or cancel)  | High     | Calendar tracking
Declining response rates        | Medium   | Email/message response tracking
Champion leaves the company     | Critical | LinkedIn alerts, CRM contact updates
New executive stakeholder       | Medium   | Org change detection
Customer stops attending events | Medium   | Event attendance tracking
"Going dark" — no response 21+ | Critical | Last-touch date monitoring
Customer declines meeting       | High     | Meeting request tracking
NPS score drops >20 points      | High     | NPS survey comparison
```

#### Champion Departure Protocol

Champion departure is the single highest-risk engagement event. TSIA research
shows that 25% of all churn is directly attributable to champion changes.

```
CHAMPION DEPARTURE RESPONSE (Immediate)
────────────────────────────────────────
Hour 0-24:
  ├── Verify departure (LinkedIn, CRM, direct contact attempt)
  ├── Identify interim contact at customer
  ├── Review multi-threading depth (do we have other relationships?)
  └── Alert CS manager and account team

Day 1-7:
  ├── Reach out to interim/replacement contact
  ├── Offer "re-onboarding" for new stakeholder
  ├── Prepare value summary for new stakeholder
  ├── Assess risk: Does the replacement know/value the product?
  └── Increase touchpoint frequency for 30 days

Day 7-30:
  ├── Schedule introductory meeting with replacement
  ├── Present value realization report
  ├── Re-establish success plan with new stakeholder
  ├── Identify and nurture new champion candidates
  └── Update health score to reflect relationship change

Day 30-90:
  ├── Monitor for continued engagement
  ├── Assess whether new stakeholder is a champion or neutral
  ├── Build multi-threaded relationships to prevent recurrence
  └── If no replacement engaged: Escalate to at-risk protocol
```

### Category 3: Support Signals

Support interactions reveal frustration, product gaps, and satisfaction
levels.

```
SUPPORT-BASED CHURN SIGNALS
════════════════════════════

Signal                          | Severity | Detection Method
────────────────────────────────|──────────|─────────────────────
Open P1/critical ticket >48 hrs | Critical | Ticket severity monitoring
Ticket volume spike (>2x)       | High     | Rolling average comparison
Repeated tickets on same issue  | High     | Ticket clustering analysis
Low CSAT on recent tickets      | Medium   | Post-ticket survey tracking
Customer mentions competitors   | High     | Ticket text analysis / NLP
"Frustrated" or "unacceptable"  | High     | Sentiment analysis on tickets
Executive files support ticket  | Critical | Contact role-based alerting
Ticket about data export/delete | Critical | Keyword monitoring
```

### Category 4: Commercial Signals

Commercial signals emerge from contract, billing, and financial interactions.

```
COMMERCIAL CHURN SIGNALS
════════════════════════

Signal                          | Severity | Detection Method
────────────────────────────────|──────────|─────────────────────
Late payment (30+ days)         | Medium   | AR aging report
Requests contract terms review  | Medium   | CS/Legal coordination
Asks about cancellation policy  | Critical | CRM/support flagging
Declines price increase         | High     | Renewal conversation tracking
Requests downgrade              | High     | Account change requests
Budget freeze mentioned         | Medium   | CSM conversation notes
Procurement involvement early   | Medium   | New contacts from procurement
RFP for competitive product     | Critical | Market intelligence / CSM notes
```

### Category 5: External Signals

External factors outside the customer relationship that indicate risk.

```
EXTERNAL CHURN SIGNALS
══════════════════════

Signal                          | Severity | Detection Method
────────────────────────────────|──────────|─────────────────────
Customer layoffs announced      | High     | News monitoring, LinkedIn
Customer acquired or merged     | High     | News monitoring, SEC filings
Customer's industry downturn    | Medium   | Industry news, macro data
Key competitor raises funding   | Low      | Crunchbase, news monitoring
Customer CEO/CRO change         | Medium   | News monitoring, LinkedIn
Customer funding round (positive)| Low     | Crunchbase (may signal expansion)
```

---

## Risk Scoring Model

### Signal Weighting

Not all signals carry equal weight. Assign severity multipliers:

```
RISK SIGNAL SCORING
═══════════════════

Severity  | Weight Multiplier | Examples
──────────|──────────────────|────────────────────
Critical  | 5x               | Zero usage, champion left, data export
High      | 3x               | Usage decline >30%, missed QBR, open P1
Medium    | 2x               | Declining engagement, budget concerns
Low       | 1x               | Minor usage fluctuation, industry news

Risk Score Calculation:
Risk Score = Σ (Signal Weight x Recency Factor)

Recency Factor:
  Signal detected this week:   1.0
  Signal detected 2-4 weeks:   0.8
  Signal detected 1-3 months:  0.5
  Signal detected 3-6 months:  0.3
  Signal detected 6+ months:   0.1
```

### Risk Level Classification

```
RISK CLASSIFICATION
═══════════════════

Risk Score    | Classification | Response
──────────────|───────────────|──────────────────────
0-10          | Healthy       | Standard monitoring
11-25         | Watch         | Increased monitoring frequency
26-50         | Elevated      | Proactive outreach, review engagement plan
51-75         | High Risk     | Intervention playbook activated
76-100        | Critical      | Executive escalation, rescue protocol
```

---

## Escalation Protocols

### Escalation Matrix

```
ESCALATION RESPONSE MATRIX
═══════════════════════════

Risk Level  | First Responder  | Escalation To      | Timeline
────────────|─────────────────|────────────────────|──────────
Watch       | CSM             | —                   | Monitor weekly
Elevated    | CSM             | CS Manager          | 48 hours
High Risk   | CS Manager      | VP CS + AE          | 24 hours
Critical    | VP CS           | CRO/CEO + Exec Team | Same day
```

### Escalation Communication Template

```
RISK ESCALATION ALERT
═════════════════════

Account: [Customer Name]
ARR: $[Amount]
Renewal Date: [Date]
Risk Level: [Watch / Elevated / High Risk / Critical]

Risk Signals Detected:
1. [Signal] — [Date detected] — [Severity]
2. [Signal] — [Date detected] — [Severity]
3. [Signal] — [Date detected] — [Severity]

Health Score Trend:
  30 days ago: [Score]
  Current:     [Score]
  Delta:       [Change]

Recommended Actions:
1. [Action] — [Owner] — [By When]
2. [Action] — [Owner] — [By When]

Requested Support:
- [What is needed from leadership]
```

---

## Automated Alert Configuration

### Alert Rules Engine

```
AUTOMATED ALERT RULES
═════════════════════

Rule 1: Usage Decline Alert
  IF usage_score drops > 20 points in 14 days
  THEN create CTA for CSM, severity = High
  AND send Slack notification to CS Manager

Rule 2: Zero Login Alert
  IF account has zero logins for 14+ days
  AND account is not in scheduled maintenance window
  THEN create CTA for CSM, severity = Critical
  AND send email alert to CSM + CS Manager

Rule 3: Champion Change Alert
  IF primary contact email bounces
  OR primary contact LinkedIn shows new company
  THEN create CTA for CSM, severity = Critical
  AND trigger Champion Departure playbook

Rule 4: NPS Detractor Alert
  IF NPS survey response = Detractor (0-6)
  THEN create CTA for CSM, severity = High
  AND send alert to CS Manager within 1 hour
  AND trigger Detractor Recovery playbook

Rule 5: Composite Health Decline Alert
  IF health_score drops from Green to Yellow
  OR health_score drops from Yellow to Orange
  THEN create CTA for CSM
  AND schedule health review meeting within 7 days

Rule 6: Multi-Signal Convergence Alert
  IF 3+ risk signals detected within 30 days
  THEN escalate to CS Manager regardless of individual severity
  AND trigger comprehensive account review
```

---

## Early Warning Dashboard

### Required Dashboard Views

```
EARLY WARNING DASHBOARD
═══════════════════════

View 1: Portfolio Risk Heatmap
  ├── All accounts plotted by health score and ARR
  ├── Color-coded by risk level
  └── Filterable by segment, CSM, region

View 2: Risk Trend (30/60/90 day)
  ├── Accounts moving from Green → Yellow (watch list)
  ├── Accounts moving from Yellow → Red (intervention needed)
  └── Accounts moving from Red → Green (recovery success)

View 3: Active Alerts
  ├── All unresolved risk alerts sorted by severity
  ├── Age of each alert (time since detection)
  └── Assigned owner and status

View 4: Upcoming Renewals + Risk
  ├── Renewals in next 90 days with health scores
  ├── Risk-weighted renewal forecast
  └── At-risk revenue total
```

---

## References

1. Gainsight. (2024). *Early Warning System Design*. Gainsight Academy.
2. TSIA. (2023). *Proactive Customer Risk Management*.
3. Murphy, L. (2020). "Churn Signals You're Missing." Sixteen Ventures.
4. Gartner. (2022). *Customer Retention and Churn Prediction Research*.
5. ChurnZero. (2023). *Churn Signal Taxonomy Report*.

---

**The best time to prevent churn was three months ago. The second best time
is today. Build early warning systems that give you those three months back.**
