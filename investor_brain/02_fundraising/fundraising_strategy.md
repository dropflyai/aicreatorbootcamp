# Fundraising Strategy -- Timing, Targeting, and Process Design

## Overview

Fundraising strategy is the architecture that determines whether a capital raise succeeds
or fails. The best pitch deck in the world cannot compensate for poor timing, wrong
investor targeting, or a mismanaged process. This module covers the strategic layer
that sits above pitch execution.

Primary references: YC Startup School (fundraising lectures), First Round Capital
"State of Startups" data, a16z fundraising guides, Kupor "Secrets of Sand Hill Road".

---

## When to Raise: Timing Framework

### The Four Timing Signals

```
RAISE WHEN ALL FOUR ALIGN:

1. MILESTONE SIGNAL (strongest)
   - Just hit a key milestone that changes the narrative
   - Examples: $1M ARR, 10x user growth, major partnership, key hire
   - "Raise when you have good news to sell"

2. RUNWAY SIGNAL (urgency)
   - 6-9 months of runway remaining
   - Fundraising takes 3-6 months (longer in bear markets)
   - NEVER start with < 3 months runway (desperation kills leverage)

3. MARKET SIGNAL (environment)
   - VC deployment pace (up = good, down = harder)
   - Sector sentiment (in-favor vs. out-of-favor)
   - Macro conditions (interest rates, public markets)
   - Seasonal patterns (avoid Dec-Jan, summer doldrums)

4. STRATEGIC SIGNAL (opportunity)
   - Capital enables a specific opportunity (hiring, expansion, M&A)
   - Competitor raised (market pressure)
   - Customer demand exceeding capacity
   - Partnership requiring investment to activate

TIMING MATRIX:
┌─────────────┬─────────────────────────────┐
│ Strong       │ Raise aggressively          │
│ Milestone +  │ (you have leverage)         │
│ Good Market  │                             │
├─────────────┼─────────────────────────────┤
│ Strong       │ Raise but manage timeline   │
│ Milestone +  │ (milestone carries you)     │
│ Weak Market  │                             │
├─────────────┼─────────────────────────────┤
│ Weak         │ Fix milestone first, then   │
│ Milestone +  │ raise (or bridge)           │
│ Good Market  │                             │
├─────────────┼─────────────────────────────┤
│ Weak         │ Cut burn, bridge if possible │
│ Milestone +  │ Do NOT raise primary round  │
│ Weak Market  │                             │
└─────────────┴─────────────────────────────┘
```

### Default Alive / Default Dead Analysis

```
PAUL GRAHAM'S FRAMEWORK (adapted)

Monthly Revenue Growth Rate: G
Monthly Expenses: E
Monthly Revenue: R

If R * (1 + G)^N > E for some reasonable N:
  → DEFAULT ALIVE (profitable before cash runs out)
  → Raise from position of strength

If NOT:
  → DEFAULT DEAD
  → Must raise or cut to survive

EXAMPLE:
Revenue: $50K/month, growing 15% MoM
Expenses: $150K/month
Months of runway: 12

Revenue in 12 months: $50K * (1.15)^12 = $267K
Expenses in 12 months: $150K (assumed flat)

$267K > $150K → DEFAULT ALIVE at month ~8
Raise to ACCELERATE, not to SURVIVE
This is the strongest fundraising position.
```

---

## Target Raise Amount

### Sizing the Round

```
ROUND SIZING FRAMEWORK

INPUT VARIABLES:
  Current monthly burn: B_current
  Planned monthly burn (12 months out): B_planned
  Average burn over period: B_avg = (B_current + B_planned) / 2
  Target runway: T months (18-24 standard)
  Revenue offset: R_projected (conservative)
  Specific capital needs: C (hiring, equipment, marketing)

FORMULA:
  Minimum Raise = (B_avg * T) - R_projected + C
  Target Raise = Minimum * 1.2 (20% buffer)
  Maximum Raise = Target * 1.5 (if market allows)

EXAMPLE:
  B_current: $80K/month
  B_planned: $200K/month (team doubling)
  B_avg: $140K/month
  T: 24 months
  R_projected: $500K (conservative)
  C: $200K (infrastructure)

  Minimum: ($140K * 24) - $500K + $200K = $3.06M
  Target: $3.06M * 1.2 = $3.67M → Round to $4M
  Maximum: $4M * 1.5 = $6M

  RECOMMENDATION: Raise $4M seed round
```

### Dilution Budget

```
DILUTION PLANNING ACROSS COMPANY LIFECYCLE

Target total dilution across all rounds: 50-65%
(Founder(s) retain 35-50% through Series C)

DILUTION BUDGET:
  Pre-Seed: 5-10%
  Seed: 15-20%
  Series A: 15-25% (including option pool refresh)
  Series B: 10-20%
  Series C: 8-15%
  Option pools (cumulative): 15-20%

EXAMPLE (two co-founders, 50/50 split):
  Start: 50% each
  Pre-Seed (10%): 45% each
  Seed (20%): 36% each
  Option Pool (10% refresh): 32.4% each
  Series A (20%): 25.9% each
  Series B (15%): 22.0% each

  Combined founders at Series B: 44.0%
  This is within the normal range for well-executed fundraising.

IF DILUTION EXCEEDS BUDGET:
  - Negotiate harder on valuation in current round
  - Defer raise and hit milestone to command higher valuation
  - Reduce round size
  - Use non-dilutive capital (grants, revenue-based financing)
  - Accept and plan for catch-up through option grants
```

---

## Investor Targeting

### Building the Target List

```
INVESTOR TARGETING FRAMEWORK

LAYER 1: THESIS FIT (eliminates 70% of VCs)
  Does this investor invest in:
  □ Our stage? (seed, A, B, etc.)
  □ Our sector? (SaaS, healthcare, fintech, etc.)
  □ Our geography? (or geo-agnostic?)
  □ Our check size range?
  □ Our business model type? (B2B, B2C, marketplace)

LAYER 2: PORTFOLIO FIT (eliminates another 15%)
  □ No competitive portfolio company?
  □ Complementary portfolio (potential synergies)?
  □ Recent activity in our space (actively deploying)?
  □ Fund vintage allows new investments (not fully deployed)?

LAYER 3: RELATIONSHIP ACCESS (determines priority)
  □ Warm intro available (1st or 2nd degree)?
  □ Partner-level connection identified?
  □ Previous interaction or awareness?
  □ Active in relevant communities (conferences, Twitter)?

LAYER 4: VALUE-ADD ASSESSMENT (differentiates among options)
  □ Relevant operating experience?
  □ Strong network in our customer segment?
  □ Helpful portfolio companies for partnerships?
  □ Reputation for founder support?
  □ Follow-on reserve strategy?

TARGET LIST SIZE:
  Seed: 30-50 investors (higher volume, smaller checks)
  Series A: 25-40 investors (focused, need lead)
  Series B+: 15-25 investors (targeted, relationship-driven)
```

### Investor Tiering

```
TIERED OUTREACH STRATEGY

TIER 1: DREAM INVESTORS (5-8 firms)
  - Perfect thesis, stage, and portfolio fit
  - Strong warm introduction available
  - Known for being founder-friendly
  - Approach LAST (after pitch is refined from Tier 2-3)

TIER 2: STRONG FIT (10-15 firms)
  - Good thesis and stage fit
  - Warm intro available or attainable
  - Solid reputation
  - Approach SECOND (use to refine pitch)

TIER 3: GOOD FIT (15-25 firms)
  - Reasonable thesis fit
  - May require cold or lukewarm outreach
  - Less well-known or newer funds
  - Approach FIRST (practice pitch, generate early momentum)

TIMING:
  Week 1-2: Tier 3 meetings (practice and iterate)
  Week 2-3: Tier 2 meetings (refine with better audiences)
  Week 3-4: Tier 1 meetings (polished pitch, maximum impact)
  Week 4-6: Follow-ups, partner meetings, term sheets

WHY THIS ORDER:
  - Practice on lower-stakes investors first
  - Learn common objections before facing dream investors
  - Build momentum and social proof
  - Create competitive tension by Week 3-4
```

---

## Process Design

### Compressed vs. Extended Process

```
COMPRESSED PROCESS (3-6 weeks)
Best for: Strong traction, hot market, competitive deal

Week 1: Launch - send deck to all targets simultaneously
Week 2: First meetings (3-4 per day)
Week 3: Partner meetings and deep dives
Week 4: Term sheets due
Week 5: Negotiate and select
Week 6: Close

ADVANTAGE: Creates urgency and FOMO
RISK: Less time for relationship building

EXTENDED PROCESS (8-16 weeks)
Best for: Complex story, relationship-driven investors, bear market

Weeks 1-4: Coffee meetings, relationship building, soft sharing
Weeks 5-8: Formal pitch meetings
Weeks 9-12: Partner meetings, due diligence
Weeks 13-16: Term sheet negotiation and close

ADVANTAGE: Deeper relationships, more investor conviction
RISK: Momentum loss, signal risk if process drags
```

### FOMO Engineering

```
CREATING COMPETITIVE TENSION (ethical approaches)

1. PARALLEL PROCESS
   Meet with 15-20 investors in the same 2-week window
   This is standard and expected; not manipulative

2. TRANSPARENT SIGNALING
   "We're in active conversations with several firms"
   (Only say this if true -- lying destroys reputation)

3. MILESTONE DROPS
   Release new positive data during the process
   "Since we last spoke, we hit $100K MRR"

4. TIMELINE ANCHORING
   "We plan to close by [date]"
   Creates urgency for decision-making

5. SOCIAL PROOF
   When a credible investor shows interest, others follow
   "We have strong interest from [reputable firm]"
   (With permission; never name investors without consent)

WHAT NOT TO DO:
  ✗ Fabricate competing term sheets
  ✗ Name investors without permission
  ✗ Create artificial deadlines you won't enforce
  ✗ Play investors against each other destructively
  ✗ Lie about traction, revenue, or pipeline
```

---

## Fundraising Mechanics

### The Information Cascade

```
INFORMATION RELEASE STRATEGY

Phase 1: TEASER (Pre-meeting)
  - One-pager or teaser deck (2-3 slides)
  - Enough to get a meeting, not enough to decide
  - Sent with warm intro email

Phase 2: FIRST MEETING (30-60 min)
  - Full pitch deck (10-15 slides)
  - Tell the story, build excitement
  - DO NOT leave behind detailed financials

Phase 3: FOLLOW-UP (Post first meeting)
  - Send deck (if not shared in meeting)
  - Provide specific data points requested
  - Answer questions promptly (within 24 hours)

Phase 4: DEEP DIVE (Partner meeting)
  - Detailed financial model
  - Customer references
  - Technical architecture overview
  - Market research / competitive analysis

Phase 5: DUE DILIGENCE (Post term sheet)
  - Full data room access
  - Management presentations
  - Customer calls
  - Background checks

RATIONALE:
Information asymmetry is your leverage.
Release information progressively to maintain engagement
and ensure investors are qualified before they see sensitive data.
```

### Rejection Management

```
HANDLING INVESTOR PASSES

TYPES OF PASSES:
1. "Not our stage" → Wrong targeting, learn for next time
2. "Not our sector" → Wrong targeting
3. "Too early for us" → Come back later (track relationship)
4. "Competitive conflict" → Cannot invest (respect this)
5. "Valuation too high" → Potential negotiation
6. "Not enough traction" → Come back with metrics
7. "Team concerns" → Hardest to overcome, most honest feedback

RESPONSE TO EVERY PASS:
1. Thank them genuinely
2. Ask: "What would need to change for you to invest?"
3. Ask: "Is there anyone you'd recommend we speak with?"
4. Add to "come back later" list for future rounds
5. Continue sending quarterly updates (stay top of mind)

PASS RATE BENCHMARKS:
  Seed: 90-95% pass rate is normal
  Series A: 85-90% pass rate is normal
  Even hot deals get rejected by 70%+ of investors approached

DO NOT take passes personally. It's a numbers game with
selection criteria that often have nothing to do with your quality.
```

---

## Non-Dilutive Capital Alternatives

### When to Consider Alternatives

```
NON-DILUTIVE CAPITAL OPTIONS

Revenue-Based Financing (RBF):
  - Repay as % of revenue (typically 5-10%)
  - No equity dilution
  - Best for: companies with predictable revenue
  - Providers: Clearco, Pipe, Lighter Capital

Government Grants:
  - SBIR/STTR (US): $150K-$1.5M for R&D
  - NSF I-Corps: $50K for customer discovery
  - State-level innovation grants
  - No dilution, no repayment
  - Best for: deep tech, healthcare, defense

Venture Debt:
  - Debt from specialty lenders (SVB, WTI, Hercules)
  - Typically 25-50% of last equity round
  - Includes warrants (small dilution: 0.5-2%)
  - Best for: extending runway between equity rounds
  - RISK: Must be repaid; default = company death

Crowdfunding:
  - Regulation CF: Raise up to $5M from public
  - Republic, Wefunder, StartEngine platforms
  - Marketing benefit + capital
  - Complex compliance requirements

Customer Prepayments:
  - Annual contracts paid upfront
  - Strategic customer investments
  - Development partnerships
  - Best form of financing: validates product AND provides capital
```

---

## Fundraising Metrics and Tracking

### Process KPIs

```
FUNDRAISING FUNNEL METRICS

Track weekly during active fundraise:

Outreach Sent:        ___    (target: 10-15/week)
Meetings Scheduled:   ___    (target: 30-50% of outreach)
Meetings Completed:   ___
Partner Meetings:     ___    (target: 10-20% of first meetings)
Term Sheets:          ___    (target: 1-3 per process)
Conversion Rate:      ___    (meetings → term sheet)
Average Time to Pass: ___    (days from first meeting)
Average Time to TS:   ___    (days from first meeting)
Pipeline Value:       ___    (total possible investment)

RED FLAGS:
  0 partner meetings after 20 first meetings → pitch problem
  0 term sheets after 5 partner meetings → terms/fit problem
  Avg time to pass > 4 weeks → being strung along
  Pipeline < 3x target raise → need more top-of-funnel
```

---

**This module provides the strategic framework for fundraising campaigns. Every raise
must begin with a clear strategy covering timing, sizing, targeting, and process design.
Execution without strategy is the primary cause of failed fundraises.**
