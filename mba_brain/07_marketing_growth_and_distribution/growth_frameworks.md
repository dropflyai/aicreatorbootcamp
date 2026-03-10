# Growth Frameworks — Quantitative Models and Loops

## What This Enables

**Decisions it helps make:**
- How to measure and optimize growth systematically
- How to design growth loops that compound
- How to mathematically model viral growth
- How to identify product-market fit

---

## 1. AARRR Pirate Metrics

*Citation: McClure, D. (2007). "Startup Metrics for Pirates." 500 Startups.*

### 1.1 The Framework

```
Acquisition  ->  Activation  ->  Retention  ->  Revenue  ->  Referral
(How users      (First         (Users come    (Users pay)   (Users refer
find you)       great          back)                        others)
                experience)
```

### 1.2 Metrics by Stage

| Stage | Key Metric | Example Benchmark |
|-------|-----------|-------------------|
| Acquisition | CAC, cost per click, signup rate | Varies by channel |
| Activation | % completing core action within first session | 25-60% |
| Retention | D1, D7, D30 retention; monthly active rate | D1: 40%+, D30: 15%+ (consumer) |
| Revenue | ARPU, LTV, conversion to paid | Varies by model |
| Referral | Viral coefficient, % of users who refer | K > 0.5 for viral growth |

### 1.3 Finding the Bottleneck

Map your funnel and identify the weakest stage:

```
Visitors: 100,000/mo
Signups (Acquisition): 5,000 (5% conversion)
Activated (Activation): 2,000 (40% activation)
Retained D30 (Retention): 400 (20% D30 retention)
Paying (Revenue): 120 (30% conversion to paid)
Referred (Referral): 24 (20% referral rate, avg 1 referral each)
```

In this example, retention is the bottleneck. Improving D30 retention from 20% to 40% doubles paying customers.

---

## 2. Growth Loops

*Citation: Balfour, B. & Chen, A. (2019). Reforge Growth Series.*

### 2.1 Loops vs. Funnels

Traditional funnels are linear: acquire -> activate -> retain -> monetize.

Growth loops are circular: the output of one cycle becomes the input of the next.

```
New User -> Uses Product -> Creates Content/Data/Invitation -> Attracts New User -> ...
```

### 2.2 Types of Growth Loops

**Viral loops:** Users directly invite other users.
- Example: Dropbox referral program (give storage, get storage)
- Driver: Product utility increases with sharing

**Content loops:** Users create content that attracts new users via search/social.
- Example: Pinterest (users pin -> content indexed by Google -> new users find pins)
- Driver: User-generated content creates organic distribution

**Paid loops:** Revenue from acquired users funds acquisition of new users.
- Example: Performance marketing where LTV > CAC
- Driver: Positive unit economics with reinvestment

**Sales loops:** Customer success leads to referrals and case studies that drive new sales.
- Example: Enterprise SaaS reference selling
- Driver: Customer outcomes generate social proof

### 2.3 Loop Economics

A loop is sustainable when:

```
Output value per cycle > Input cost per cycle
```

For paid loops:
```
LTV of acquired cohort > CAC of acquired cohort
LTV:CAC > 1 (sustainable), > 3:1 (healthy), > 5:1 (consider investing more)
```

---

## 3. Viral Coefficient Mathematics

### 3.1 Basic Viral Model

**Viral coefficient (K):**

```
K = i x c
```

where:
- i = number of invitations per user
- c = conversion rate per invitation

**Viral growth dynamics:**

```
N(t) = N(0) x (1 + K + K^2 + K^3 + ... + K^t)
```

For K < 1: N converges to N(0) / (1 - K) (amplification but not self-sustaining)
For K = 1: N grows linearly (each user brings exactly one more)
For K > 1: N grows exponentially (truly viral)

### 3.2 Viral Cycle Time

The speed of the viral loop matters as much as the coefficient:

```
Effective growth rate = K^(1/t_cycle)
```

where t_cycle is the time for one complete viral cycle.

**Example:** K = 0.8 with 2-day cycle grows faster than K = 1.2 with 30-day cycle in the short term.

### 3.3 Amplification Factor

Even with K < 1, virality amplifies other growth channels:

```
Amplification = 1 / (1 - K)

K = 0.5:  2x amplification (every acquired user brings 1 more)
K = 0.7:  3.3x amplification
K = 0.9:  10x amplification
K = 1.0:  infinite (self-sustaining)
```

---

## 4. Retention Curves

### 4.1 Retention Curve Shapes

**Flattening curve (healthy):** Retention declines initially but stabilizes at a meaningful level. Indicates a retained cohort of engaged users.

```
D1: 50% -> D7: 30% -> D30: 20% -> D90: 18% -> D180: 17%
```

**Declining curve (problematic):** Retention continues to decline without stabilizing. Eventually all users churn.

```
D1: 40% -> D7: 20% -> D30: 8% -> D90: 3% -> D180: 1%
```

**Smiling curve (exceptional):** Retention increases over time as the product becomes more valuable with usage (rare, but indicates powerful engagement).

### 4.2 Cohort Retention Analysis

Track each cohort (signup month) separately:

```
         Month 0  Month 1  Month 2  Month 3  Month 4
Jan '25  1000     500      350      300      290
Feb '25  1200     650      470      410      --
Mar '25  1100     620      460      --       --
Apr '25  1300     720      --       --       --
```

**Diagonal reading:** If newer cohorts have better retention at the same age, product is improving.

---

## 5. Product-Market Fit Frameworks

### 5.1 Sean Ellis PMF Survey

*Citation: Ellis, S. (2010). "Using Survey.io to Measure Product/Market Fit."*

**The question:** "How would you feel if you could no longer use [product]?"
- Very disappointed
- Somewhat disappointed
- Not disappointed
- N/A (no longer use)

**Benchmark:** If >40% of surveyed users say "very disappointed," you have PMF.

### 5.2 Superhuman PMF Engine

*Citation: Rahul Vohra, "How Superhuman Built an Engine to Find Product-Market Fit" (2019)*

1. Survey users with the Sean Ellis question
2. Segment by "very disappointed" percentage
3. Identify the characteristics of "very disappointed" users
4. Understand what they love most
5. Build more of what they love, address what holds back others
6. Track the PMF score over time (target: >40%)

### 5.3 Quantitative PMF Indicators

| Signal | Pre-PMF | Post-PMF |
|--------|---------|----------|
| Retention | Declining curves | Flattening curves |
| NPS | < 20 | > 40 |
| Organic growth | Minimal | Meaningful (>30% of new users) |
| Sean Ellis score | < 40% | > 40% |
| Sales cycle | Long, educational | Shorter, pull-based |
| Word of mouth | Absent | Present |

---

## 6. Growth Accounting

### 6.1 Quick Ratio

```
Growth Quick Ratio = (New + Reactivated + Expansion) / (Churned + Contracted)
```

Measures the efficiency of growth — how many dollars of growth for each dollar lost.

### 6.2 Growth Decomposition

```
Net Growth = New Customer Growth + Expansion Growth - Churn Loss - Contraction Loss

Revenue this month = Revenue last month x (1 + net growth rate)
```

**Sustainable growth test:** Can you maintain growth rate if you cut acquisition spending by 50%? If not, growth is acquisition-dependent and potentially fragile.

---

## Key Citations

- Balfour, B. (2019). Reforge Growth Series. Reforge.
- Chen, A. (2019). *The Cold Start Problem*. Harper Business. [Published 2021]
- Croll, A., & Yoskovitz, B. (2013). *Lean Analytics*. O'Reilly.
- Ellis, S., & Brown, M. (2017). *Hacking Growth*. Currency.
- McClure, D. (2007). Startup Metrics for Pirates. 500 Startups.
