# Equity Compensation -- Stock Options, RSUs, and Employee Ownership

## Purpose

This module defines the framework for equity compensation design, administration, and employee education. Equity compensation aligns employee incentives with long-term company value creation and is a critical component of total rewards, particularly in technology, startups, and high-growth organizations. Equity decisions involve complex tax, legal, and financial implications; this module provides the strategic framework while flagging areas requiring legal and tax counsel.

---

## 1. Equity Vehicle Types

### 1.1 Incentive Stock Options (ISOs)

**Definition**: The right to purchase company stock at a predetermined price (exercise/strike price) set at fair market value on the grant date.

**Key characteristics:**

| Attribute | ISO Rules |
|-----------|----------|
| Eligibility | Employees only (not consultants, board members, or contractors) |
| Grant limit | $100,000 in value (based on exercise price) vesting in any calendar year |
| Exercise price | Must be at or above FMV on grant date |
| Tax at grant | No taxable event |
| Tax at exercise | No regular income tax (but AMT preference item on spread) |
| Tax at sale (qualifying disposition) | Long-term capital gains on total gain (sale price - exercise price) |
| Qualifying disposition | Hold 2+ years from grant AND 1+ year from exercise |
| Tax at sale (disqualifying disposition) | Ordinary income on spread at exercise; capital gains on remainder |
| Expiration | 10 years from grant (5 years for 10%+ shareholders) |
| Post-termination exercise | 90 days to maintain ISO status (company may extend, but triggers conversion to NSO after 90 days) |

### 1.2 Non-Qualified Stock Options (NSOs)

**Definition**: Same mechanics as ISOs but without the preferential tax treatment.

| Attribute | NSO Rules |
|-----------|----------|
| Eligibility | Employees, contractors, board members, advisors |
| Grant limit | No statutory limit |
| Exercise price | Typically at FMV, but not legally required (below FMV triggers 409A issues) |
| Tax at grant | No taxable event (if at FMV) |
| Tax at exercise | Ordinary income on spread (FMV at exercise - exercise price) |
| Employer obligation | Withhold income and payroll taxes at exercise |
| Tax at sale | Capital gains (short-term or long-term depending on hold period) on gain above FMV at exercise |
| Post-termination exercise | Per plan terms (commonly 90 days; trend toward longer windows) |

### 1.3 Restricted Stock Units (RSUs)

**Definition**: A promise to deliver shares of company stock upon vesting. No exercise required; no upfront cost to employee.

| Attribute | RSU Rules |
|-----------|----------|
| Eligibility | Anyone (employees, consultants, board members) |
| Cost to employee | $0 (no exercise price) |
| Tax at grant | No taxable event |
| Tax at vest | Ordinary income on full FMV of shares at vesting |
| Employer obligation | Withhold income and payroll taxes at vest (commonly via "sell to cover") |
| Tax at sale | Capital gains on appreciation above FMV at vest |
| Forfeiture | Unvested RSUs forfeited upon termination (per plan terms) |
| Value in down market | Always has value (unlike underwater options) |
| 409A implications | Minimal (settlement occurs at vesting by default) |

### 1.4 When to Use Each Vehicle

| Vehicle | Best For | Stage | Key Advantage |
|---------|---------|-------|---------------|
| ISOs | Early employees at startups | Pre-IPO | Tax-advantaged for employees (LTCG treatment) |
| NSOs | Broad-based grants, consultants, international | Any | Flexibility, no $100K limit, simpler administration |
| RSUs | Public companies, late-stage private | Post-Series B or public | No exercise cost, guaranteed value, simpler for employees |
| Restricted stock | Co-founders, very early employees | Seed/inception | 83(b) election enables LTCG on total appreciation |

---

## 2. Vesting Schedules

### 2.1 Standard Vesting Structures

**Four-year vest with one-year cliff (industry standard):**
```
Year 0-1:   0% vested (cliff period)
Year 1:     25% vests on 1-year anniversary
Year 1-4:   Remaining 75% vests monthly (2.083%/month) or quarterly (6.25%/quarter)
Year 4:     100% vested

Timeline:
├─── Cliff ───┤─── Monthly/Quarterly Vesting ───────────────────────┤
0             12                                                   48 months
```

**Alternative vesting structures:**

| Structure | Description | When Used |
|-----------|-----------|-----------|
| 3-year vest, 1-year cliff | Faster full vesting | Competitive markets, senior hires |
| 4-year vest, no cliff | Immediate monthly vesting | Retention-focused, experienced hires |
| Back-weighted (e.g., Amazon 5/15/40/40) | More vesting in later years | Maximum retention incentive |
| Front-weighted (e.g., 40/30/20/10) | More vesting in early years | Attraction-focused; matches employee time horizon |
| Performance-based | Vesting contingent on milestones | Executive grants, performance alignment |

### 2.2 Acceleration Provisions

**Single-trigger acceleration:**
- Vesting accelerates upon a change of control (acquisition) event
- Provides certainty for employees in M&A scenarios
- Less favorable for acquirers (all equity costs accelerate)
- Most common for executives and key contributors

**Double-trigger acceleration:**
- Vesting accelerates only upon change of control AND involuntary termination (or constructive termination) within 12-24 months
- Industry standard for broad-based grants
- Protects employees from being acquired and immediately terminated
- More acquirer-friendly than single-trigger

**Recommended policy:**
- IC employees: Double-trigger, 100% acceleration
- Directors and VPs: Double-trigger, 100% acceleration, 12-month window
- C-suite: Negotiate individually; single-trigger common for select executives

---

## 3. Section 409A Compliance

### 3.1 Overview

Section 409A of the Internal Revenue Code governs "nonqualified deferred compensation." Stock options and RSUs can trigger 409A penalties if improperly structured.

**409A applies when:**
- Stock options are granted below fair market value
- RSU settlement is deferred beyond vesting without compliant deferral election
- Any arrangement constitutes deferred compensation

**Penalties for 409A violation:**
- Immediate income inclusion of all deferred amounts
- 20% additional tax penalty
- Premium interest tax on underpayment
- Penalties apply to the EMPLOYEE, not the company (but company faces litigation risk)

### 3.2 409A Valuation (FMV Determination)

For private companies, fair market value must be determined by a "reasonable application of a reasonable valuation method." In practice, this means:

**Independent 409A valuation (safe harbor):**
- Performed by qualified independent appraiser
- Updated at least every 12 months, or after a material event (new funding round, significant revenue change, M&A activity)
- Uses income approach (DCF), market approach (comparable companies/transactions), and/or asset approach
- Safe harbor: Creates presumption of reasonableness; IRS must prove value was "grossly unreasonable"

**Common methodology:**

| Approach | Method | When Primary |
|----------|--------|-------------|
| Income approach | Discounted cash flow (DCF) | Revenue-generating companies |
| Market approach | Comparable public company multiples | Companies with public comparables |
| Market approach | Comparable transaction multiples | Recent M&A in sector |
| Asset approach | Net asset value | Asset-heavy or pre-revenue companies |
| OPM backsolve | Option pricing model using recent funding round | Post-funding, pre-revenue |

### 3.3 Practical Implications

- **NEVER grant options below the current 409A valuation**
- Schedule 409A valuations proactively (not retrospectively)
- Update the 409A valuation after any material event (funding round, revenue milestone, restructuring)
- Document the valuation process and board approval
- Allow adequate time between 409A completion and grant date

---

## 4. Equity Refresh Programs

### 4.1 Purpose

Initial equity grants lose retention power as they vest. By year 3-4, an employee's unvested equity may be insufficient to prevent departure. Refresh grants replenish unvested equity to maintain the "golden handcuffs" effect.

### 4.2 Refresh Grant Design

**Annual refresh approach (most common for public companies):**
```
Each year, grant additional equity based on:
- Level/role (target annual equity value by level)
- Performance (multiplier based on performance rating)
- Retention risk (additional grants for flight-risk employees)
- Market adjustment (if total compensation is below target)

Refresh vesting: Typically 4-year vest, no cliff (adds to existing vesting waterfall)
```

**Refresh grant sizing:**

| Level | Annual Refresh Target (% of initial grant) | Performance Multiplier Range |
|-------|:---:|:---:|
| IC (junior) | 15-25% | 0x - 1.5x |
| IC (senior) | 20-30% | 0x - 2.0x |
| Manager | 25-35% | 0x - 2.0x |
| Director | 30-40% | 0x - 2.5x |
| VP+ | 40-60% | 0x - 3.0x |

### 4.3 Vesting Waterfall Visualization

```
Year:        1      2      3      4      5      6      7

Initial:   ████   ████   ████   ████
Refresh 1:        ████   ████   ████   ████
Refresh 2:               ████   ████   ████   ████
Refresh 3:                      ████   ████   ████   ████

Unvested:  ████   ████████████████████████████████████████
           LOW                                        HIGH
           (Flight risk year 3-4 without refresh)

With annual refreshes, unvested equity remains substantial,
maintaining retention incentive indefinitely.
```

---

## 5. Equity Pool Management

### 5.1 Option Pool Sizing

The option pool (or equity incentive plan reserve) determines total shares available for employee grants. Key considerations:

**Initial pool sizing (seed/Series A):**
- Typical: 10-20% of fully diluted shares
- Pre-money pool expansion: Investors typically require the pool to be expanded before investment (dilutes founders, not investors)
- Budget the pool against a hiring plan for 18-24 months post-funding

**Pool consumption tracking:**
```
Total pool:           2,000,000 shares (15% of fully diluted)
Granted (unvested):     800,000 shares
Granted (vested):       400,000 shares
Exercised:              100,000 shares
Forfeited/returned:     150,000 shares
Available for grant:    850,000 shares (42.5% of pool remaining)

Burn rate = Shares granted annually / Total shares outstanding
Target burn rate: 2-4% annually (higher for high-growth, lower for mature)
```

### 5.2 Dilution Management

| Metric | Formula | Target |
|--------|---------|--------|
| Total dilution | All outstanding equity awards / Fully diluted shares | <20% total |
| Annual burn rate | New grants in year / Weighted avg shares outstanding | 2-4% |
| Overhang | (Unexercised options + available pool) / Fully diluted shares | <15% |
| Run rate | Available pool / Annual grant pace | >2 years of runway |

---

## 6. Employee Equity Education

### 6.1 The Education Imperative

Equity compensation is poorly understood by most employees. Research from the NCEO (National Center for Employee Ownership) shows that employees who understand their equity are significantly more engaged and less likely to make costly mistakes (early exercise timing, tax planning failures, concentration risk).

### 6.2 Education Program Components

**At hire (mandatory):**
- What are stock options/RSUs and how do they work?
- Vesting schedule and what happens if you leave
- Tax implications overview (with disclaimer to consult tax advisor)
- How to read your equity agreement
- Current 409A valuation / stock price context

**Ongoing (quarterly):**
- Company valuation update (appropriate level of detail)
- Vesting milestone reminders
- Exercise window reminders (for departing employees)
- Tax planning considerations (year-end)
- Liquidity event education (if applicable)

**Pre-liquidity event (IPO or acquisition):**
- Lock-up period explanation
- Trading window and insider trading policy
- Tax planning for anticipated liquidity
- Diversification strategy basics
- Connection to financial advisors

### 6.3 Common Employee Equity Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|-----------|
| Failing to exercise within 90-day post-termination window | Forfeit vested options | Automated reminders 60/30/14/7 days before expiration |
| Not filing 83(b) election within 30 days (restricted stock) | Taxed on full FMV at vesting instead of grant | Education at grant; reminder system; pre-filled form |
| Not planning for AMT on ISO exercise | Unexpected tax liability | Tax planning workshops; AMT calculator tools |
| Holding concentrated position post-IPO | Portfolio risk; potential losses | Diversification education; 10b5-1 plan information |
| Misunderstanding vesting vs. ownership | Counting unvested equity as net worth | Clear communication about vesting schedule and forfeiture |

---

## 7. Equity Administration

### 7.1 Grant Process

```
1. Compensation team determines grant size (level-based, with performance input)
2. Legal confirms available pool and plan compliance
3. Board or compensation committee approves grants (typically via consent)
4. Grant date established (date of board approval or specified future date)
5. Equity admin platform updated (Carta, Shareworks, Pulley)
6. Grant agreement sent to employee for acceptance
7. Employee education materials provided
8. Vesting schedule begins
```

### 7.2 Equity Administration Platform Requirements

- Grant management (ISOs, NSOs, RSUs, restricted stock, SARs)
- 409A valuation tracking and cap table integration
- Automated vesting calculations and schedules
- Tax withholding calculation (federal, state, local, FICA)
- Exercise processing (for options)
- Employee self-service portal (view grants, vesting, estimated value)
- Reporting (ASC 718 expense, dilution, pool utilization)
- Termination processing (forfeiture, post-termination exercise tracking)
- Audit trail and SOC 2 compliance

### 7.3 Termination and Equity

| Termination Type | Unvested Equity | Vested Options | Vested RSUs |
|-----------------|----------------|---------------|-------------|
| Voluntary resignation | Forfeited | Exercise within post-termination window (typically 90 days) | Already settled at vesting; employee owns shares |
| Involuntary (without cause) | Forfeited (unless acceleration clause) | Exercise within post-termination window | Already settled |
| For cause | Forfeited | Typically forfeited (per plan terms) | Already settled; some plans have clawback |
| Death or disability | Often accelerated (per plan terms) | Extended exercise period (typically 12 months) | Accelerated vesting common |
| Change of control | Per acceleration provisions (single/double trigger) | Per acceleration provisions | Per acceleration provisions |

---

## 8. International Equity Considerations

### 8.1 Key Challenges

- Tax treatment varies dramatically by country
- Securities law registration requirements differ
- Foreign exchange risk on equity denominated in non-local currency
- Data privacy regulations (GDPR) affect equity plan administration
- Social charges and employer tax obligations vary

### 8.2 Common International Approaches

| Country | Preferred Vehicle | Key Consideration |
|---------|------------------|-------------------|
| US | ISOs (early), RSUs (public) | AMT for ISOs; ordinary income at vest for RSUs |
| UK | EMI options (qualifying) | Favorable CGT treatment; 250-employee limit |
| Canada | Stock options | 50% inclusion rate for qualifying options |
| Germany | RSUs (virtual stock options common) | Taxed at vest; employer social charges |
| India | RSUs | Taxed at vest; TDS withholding required |
| Australia | ESS (Employee Share Scheme) | Deferral possible under ESS rules |

---

## References

- IRC Section 409A and Treasury Regulations thereunder
- IRC Section 422 (Incentive Stock Options)
- IRC Section 83 (Property Transferred in Connection with Performance of Services)
- NCEO. (2023). *Understanding Employee Ownership for Employees*.
- PwC. (2023). *Stock-Based Compensation: A Comprehensive Analysis*.
- Carta. (2023). *Equity Benchmarking Report*.
- FASB ASC 718 (Stock-Based Compensation accounting standard)
- Wilson Sonsini. (2023). *Equity Compensation Handbook*.

---

**This module governs all equity compensation decisions. Tax and legal counsel required for implementation.**
