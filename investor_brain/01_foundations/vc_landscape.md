# VC Landscape -- Fund Structure, Economics, and Ecosystem

## Overview

Understanding the venture capital ecosystem from the inside is a prerequisite for
effective fundraising. This module maps the complete VC fund structure, economics,
incentives, and lifecycle. Every fundraising strategy must account for how VCs operate,
what drives their decisions, and how their fund economics constrain their behavior.

Primary references: Kupor "Secrets of Sand Hill Road", Ramsinghani "The Business of
Venture Capital", a16z fund economics writing, NVCA data.

---

## VC Fund Structure

### The Limited Partnership Model

Venture capital funds are structured as limited partnerships (LPs). This is not arbitrary --
it is driven by tax law, liability requirements, and regulatory frameworks.

```
┌──────────────────────────────────────────────┐
│              VENTURE FUND (LP)               │
│                                              │
│  ┌────────────┐         ┌────────────────┐   │
│  │ General    │ manages  │  Fund Capital  │   │
│  │ Partner(s) │────────→│  ($100M+)      │   │
│  │ (GP)       │         │                │   │
│  └────────────┘         └────────────────┘   │
│       ↑                        ↑             │
│       │ 2% mgmt fee            │ capital     │
│       │ 20% carry              │ commitments │
│       │                        │             │
│  ┌────────────────────────────────────────┐  │
│  │         Limited Partners (LPs)         │  │
│  │                                        │  │
│  │  - University endowments (Yale, MIT)   │  │
│  │  - Pension funds (CalPERS, CalSTRS)    │  │
│  │  - Family offices                      │  │
│  │  - Sovereign wealth funds              │  │
│  │  - Fund of funds                       │  │
│  │  - Insurance companies                 │  │
│  │  - High-net-worth individuals          │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

### GP vs. LP Roles

**General Partner (GP):**
- Makes all investment decisions
- Sits on portfolio company boards
- Provides operational support
- Bears unlimited liability for fund operations
- Commits 1-5% of fund capital (GP commit)
- Receives management fee and carried interest

**Limited Partner (LP):**
- Provides capital (99%+ of fund)
- Has no say in individual investment decisions
- Receives distributions from profitable exits
- Bears liability only up to committed capital
- Has information rights and reporting requirements
- Often have advisory committee representation

### Fund Size and Strategy Implications

Fund size dictates behavior. This is the single most important thing founders must
understand about VC incentives.

```
OWNERSHIP REQUIREMENT MATH

A $500M fund needs to return $1.5B (3x) to be top-quartile.
With 20-30 investments, each "winner" must return $100M+.
At 20% ownership, that requires $500M+ exit per winner.

IMPLICATION: A $500M fund CANNOT invest in companies
targeting <$1B outcomes. The math does not work.

FUND SIZE → MINIMUM CHECK → MINIMUM OWNERSHIP → MINIMUM EXIT

$50M fund   → $1-3M check  → 10-20% ownership → $50M+ exits viable
$200M fund  → $5-15M check → 15-20% ownership → $200M+ exits needed
$500M fund  → $15-30M check → 15-20% ownership → $500M+ exits needed
$1B+ fund   → $30-50M check → 10-15% ownership → $1B+ exits needed
```

**Why this matters to founders:**
- Do not pitch a $200M fund on a company with a $100M TAM ceiling
- Fund size determines whether an investor can lead your round
- Larger funds have different time horizons and expectations
- Misaligned fund size is the #1 reason for investor pass

---

## Fund Economics

### Management Fee Structure

The management fee funds the VC firm's operations:

```
STANDARD MANAGEMENT FEE STRUCTURE

Investment Period (Years 1-5):
  Fee = 2% of committed capital per year
  On $200M fund = $4M/year = $20M over investment period

Harvest Period (Years 6-10+):
  Fee = 2% of invested capital (declining base)
  Or: Steps down 0.25% per year
  On $200M fund with $160M invested = $3.2M/year (declining)

TOTAL FEES OVER FUND LIFE (10 years):
  Approximately 15-20% of committed capital
  On $200M fund ≈ $30-40M total in fees

WHAT FEES PAY FOR:
  - Partner compensation (base salary)
  - Associate and analyst salaries
  - Office space and operations
  - Travel and deal sourcing
  - Legal and accounting
  - LP reporting and compliance
```

### Carried Interest (Carry)

Carry is the GP's share of profits and the primary economic incentive:

```
CARRIED INTEREST CALCULATION

Standard: 20% of profits above hurdle rate

Example: $200M fund returns $600M
  Total profit: $600M - $200M = $400M
  GP carry (20%): $400M * 0.20 = $80M
  LP returns: $400M * 0.80 = $320M + $200M principal = $520M

HURDLE RATE (PREFERRED RETURN):
  Typically 8% annual IRR
  LPs must receive 8% return before carry kicks in
  Catch-up provision: GP may receive accelerated carry
  after hurdle is met until reaching 20% of total profits

DISTRIBUTION WATERFALL:
  1. Return of capital to LPs ($200M)
  2. Preferred return to LPs (8% IRR)
  3. GP catch-up (varies by fund agreement)
  4. 80/20 split of remaining profits

CARRY DISTRIBUTION WITHIN GP:
  - Managing Partners: 40-60% of carry pool
  - Junior Partners: 15-25% of carry pool
  - Principals/VPs: 5-15% of carry pool
  - Associates: 0-5% of carry pool
```

### The J-Curve Effect

VC fund returns follow a predictable pattern:

```
Returns
  ↑
  │                                    ╱
  │                                 ╱
  │                              ╱
  │                           ╱
  │                        ╱
  │                     ╱
  0├──────────────────╱───────────────→ Time
  │              ╱
  │           ╱
  │        ╱
  │     ╱  ← Fees + write-downs
  │  ╱       pull returns negative
  ↓

Years 1-3: Negative returns (fees charged, investments at cost)
Years 3-5: Flat to slightly positive (early markups, some write-offs)
Years 5-7: Acceleration (winners emerge, markups increase)
Years 7-10: Harvest (exits generate distributions)
Years 10+: Tail (final exits of remaining portfolio)
```

---

## Fund Lifecycle

### Phase 1: Fundraising (6-18 months before investing)

- GP raises capital from LPs with a PPM (Private Placement Memorandum)
- First close: enough capital to begin investing (usually 50%+ of target)
- Final close: all capital committed (typically 12-18 months after first close)
- GP markets track record, strategy, team, and differentiation

### Phase 2: Investment Period (Years 1-5)

- Deploy capital into 20-30 portfolio companies
- Initial investments: 60-70% of fund
- Reserves for follow-on: 30-40% of fund
- Board seats, operational support, governance

**Reserve strategy is critical for founders to understand:**

```
RESERVE ALLOCATION

$200M Fund:
  Initial investments: $120-140M (60-70%)
  Follow-on reserves: $60-80M (30-40%)

Reserves are used for:
  - Pro-rata rights in future rounds (maintaining ownership)
  - Bridge loans to struggling portfolio companies
  - Doubling down on winners

IMPLICATION FOR FOUNDERS:
  If a VC's fund is late in investment period with depleted reserves,
  they may not be able to support future rounds. Ask about reserve position.
```

### Phase 3: Harvest Period (Years 5-10)

- Focus shifts from deploying to returning capital
- Active management of portfolio for exits
- Board-level push toward liquidity events
- No new investments (exceptions: follow-on only)

### Phase 4: Extension and Wind-Down (Years 10-12+)

- Most funds allow 2x one-year extensions
- Remaining portfolio companies pushed toward exit
- GP may sell remaining positions on secondary market
- Final distributions to LPs

---

## Investor Taxonomy

### By Stage

| Investor Type | Stage | Check Size | Key Characteristics |
|---------------|-------|------------|-------------------|
| Angel Investors | Pre-seed/Seed | $10K-$250K | Individuals, often ex-founders |
| Angel Groups/Syndicates | Seed | $100K-$1M | Organized angel collectives |
| Pre-Seed Funds | Pre-seed | $250K-$1M | Specialized micro-VCs |
| Seed Funds | Seed | $500K-$3M | Seed-focused VCs |
| Multi-Stage VCs | Seed-Growth | $1M-$100M+ | Invest across stages |
| Growth Equity | Series B+ | $20M-$200M+ | Scaling proven businesses |
| Crossover Funds | Late Stage/IPO | $50M-$500M+ | Public + private market investors |
| Corporate VC (CVC) | All stages | Varies | Strategic investors from corporates |
| Sovereign Wealth | Late stage | $50M+ | Government-owned investment funds |

### By Investment Thesis

Understanding thesis fit is as important as stage fit:

**Sector-Focused Funds:**
- Healthcare: OrbiMed, Flagship Pioneering, ARCH Venture Partners
- Fintech: Ribbit Capital, QED Investors, Nyca Partners
- Enterprise: Bessemer, Insight Partners, Battery Ventures
- Consumer: Forerunner, Maveron, Thrive Capital
- Deep Tech: Lux Capital, DCVC, Eclipse Ventures
- Climate: Breakthrough Energy Ventures, Congruent, Lowercarbon

**Stage-Focused Funds:**
- Pre-Seed: Precursor, Hustle Fund, Contrary
- Seed: First Round, Floodgate, Homebrew
- Series A: Benchmark, USV, Greylock
- Growth: Tiger Global, Coatue, General Atlantic

**Geography-Focused Funds:**
- NYC: Lerer Hippeau, BoxGroup, Primary
- SF/Valley: Sequoia, a16z, Kleiner Perkins
- LA: Upfront Ventures, Greycroft, Wonder Ventures
- International: Accel (multi-geo), Index Ventures, Balderton

---

## VC Decision-Making Process

### Internal Fund Dynamics

Understanding how VCs make decisions internally is critical for founders:

```
TYPICAL VC DECISION FUNNEL

Inbound/Sourced Deals: 1000/year
  ↓ (Partner screen)
First Meetings: 200/year
  ↓ (Partner champion identified)
Partner Meetings: 50/year
  ↓ (Full partnership review)
Deep Dives: 20/year
  ↓ (Reference checks, market work)
Term Sheets Issued: 5-8/year
  ↓ (Negotiation, due diligence)
Investments Closed: 4-6/year

CONVERSION: 0.4-0.6% of top-of-funnel
```

**The Partner Champion Model:**
- Most VC firms require one partner to champion the deal
- That partner's reputation is on the line
- Without a champion, no deal moves forward
- Your job is to identify and activate a champion

**Partnership Meeting Dynamics:**
- Unanimous consent (Benchmark model) vs. majority vote vs. single-partner authority
- Monday morning partner meetings are the decision point at most firms
- Partner dynamics: junior partners need senior backing
- "Anti-portfolio" fear: the deal that got away motivates risky bets

### What VCs Actually Evaluate

Per a16z's published framework and HBS research:

```
EVALUATION HIERARCHY (approximate weighting)

1. Market (30-40%)
   - TAM/SAM/SOM size and growth
   - Market timing and tailwinds
   - Regulatory environment
   - Winner-take-most dynamics

2. Team (25-35%)
   - Founder-market fit
   - Technical capability
   - Sales/GTM capability
   - Resilience and adaptability
   - Unique insight / "idea maze" navigation

3. Product/Traction (15-25%)
   - Product quality and differentiation
   - User engagement metrics
   - Revenue growth trajectory
   - Retention and expansion

4. Business Model (10-15%)
   - Unit economics (current or projected)
   - Gross margins
   - Scalability of model
   - Defensibility and moats

5. Deal Terms (5-10%)
   - Valuation relative to metrics
   - Round structure
   - Existing cap table cleanliness
   - Competitive dynamic (FOMO)
```

---

## Power Law Returns

### Why This Matters for Fundraising

VC returns follow a power law distribution, not a normal distribution.
This fundamental mathematical reality shapes every VC behavior:

```
POWER LAW IN PRACTICE

Typical $200M fund (25 investments):
  - 10-12 companies: Write off (0-0.5x)
  - 5-7 companies: Return capital (1-2x)
  - 3-5 companies: Solid returns (3-5x)
  - 1-2 companies: Fund returners (10-50x+)
  - 0-1 company: Fund maker (50-100x+)

The top 1-2 investments return MORE than all others combined.
This is the defining feature of venture capital.

IMPLICATION FOR FUNDRAISING:
VCs are not looking for "safe" investments that return 3-5x.
They are looking for companies that could return 50-100x.
If your pitch ceiling is 5x, most VCs will pass.
```

### How Power Law Affects VC Behavior

1. **Loss tolerance is high**: VCs expect most investments to fail
2. **Upside matters more than downside**: Binary thinking (0 or 100x)
3. **Follow-on is concentrated**: VCs double down on winners, abandon losers
4. **Board behavior shifts**: Losing companies get pushed to sell; winning companies get pushed to grow
5. **Time horizon is long**: Power law outcomes take 7-10 years to materialize

---

## Current Market Dynamics

### Fundraising Environment Indicators

Founders should monitor these signals to time fundraising:

| Signal | Bull Market | Bear Market |
|--------|-------------|-------------|
| Time to close | 2-4 weeks | 3-6 months |
| Valuation multiples | 20-50x ARR | 5-15x ARR |
| Due diligence depth | Light | Extensive |
| Term aggressiveness | Founder-friendly | Investor-friendly |
| Bridge frequency | Rare (easy to raise) | Common (gap financing) |
| Down round frequency | Very rare | Common |
| SAFE usage | Very common | Still common but more scrutiny |
| Board seat requirements | Flexible | Mandatory |

### Cyclical Patterns

```
VC MARKET CYCLE (roughly 7-10 year periods)

Expansion → Peak → Contraction → Trough → Expansion

2009-2014: Recovery and expansion post-GFC
2014-2019: Extended bull market, mega-rounds emerge
2020-2021: Peak (ZIRP-fueled, record valuations)
2022-2023: Contraction (rate hikes, down rounds, layoffs)
2024-2025: Stabilization and selective recovery

FOUNDER STRATEGY BY CYCLE:
Bull market: Raise more, higher valuation, less dilution, move fast
Bear market: Raise enough for 24+ months, accept lower valuation,
             focus on fundamentals, extend runway
```

---

**This module provides the foundational understanding of how VC works from the inside.
Every subsequent module builds on this knowledge. Founders who understand fund economics
can reverse-engineer investor behavior and optimize their fundraising accordingly.**
