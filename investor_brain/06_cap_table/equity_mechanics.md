# Equity Mechanics — Stock Options, Vesting, and Employee Equity

## Equity as Compensation Strategy

Employee equity is the primary mechanism by which startups attract talent that they cannot afford at market-rate cash compensation. Understanding equity mechanics — the types of equity instruments, vesting schedules, tax implications, and exercise strategies — is essential for both founders issuing equity and employees receiving it. Misunderstanding equity mechanics leads to misaligned incentives, tax disasters, and talent attrition.

---

## 1. ISO vs. NSO: Incentive Stock Options vs. Non-Qualified Stock Options

### Comparison Matrix

| Feature | ISO (Incentive Stock Option) | NSO (Non-Qualified Stock Option) |
|---------|------------------------------|----------------------------------|
| Eligible recipients | Employees only | Employees, contractors, advisors, board members |
| Tax at grant | None | None |
| Tax at exercise | No ordinary income tax (but AMT risk) | Ordinary income tax on spread (FMV - strike price) |
| Tax at sale | Long-term capital gains (if holding requirements met) | Capital gains on appreciation above FMV at exercise |
| Holding requirements | Must hold 2 years from grant + 1 year from exercise | None |
| Company tax deduction | None (if ISO treatment maintained) | Yes, at time of employee's exercise |
| AMT exposure | Yes — spread at exercise is AMT preference item | No AMT impact |
| $100K annual limit | Yes — ISOs vesting in any year limited to $100K in value | No limit |
| Post-termination exercise | Typically 90 days (must be to retain ISO treatment) | Flexible (company determines) |

### When to Grant ISOs vs. NSOs

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| Full-time employees, early stage | ISO | Tax advantage if holding requirements met |
| Full-time employees, high 409A | Consider NSO | AMT risk may exceed ISO benefit |
| Contractors and advisors | NSO (required) | ISOs not available to non-employees |
| Board members | NSO (required) | ISOs require employment relationship |
| Grants exceeding $100K/year vesting | NSO for excess | ISO limit exceeded; excess auto-converts to NSO |

---

## 2. Vesting Schedules

### Standard 4-Year Vesting with 1-Year Cliff

The industry standard vesting schedule:

```
Year 0-1: Cliff period — 0% vested
Year 1 (cliff): 25% vests immediately
Year 1-4: Remaining 75% vests monthly (1/48 of total per month)
Year 4: 100% vested

Example: 100,000 share grant
Month 1-11:  0 shares vested
Month 12:    25,000 shares vest (cliff)
Month 13-48: ~2,083 shares vest per month
Month 48:    100,000 shares fully vested
```

### Vesting Variations

| Schedule | Structure | When Used |
|----------|-----------|-----------|
| Standard 4/1 | 4-year vest, 1-year cliff, monthly thereafter | Default for most employees |
| 3-year vest | 3-year vest, 1-year cliff | Competitive markets, senior hires |
| 5-year vest | 5-year vest, 1-year cliff | Less common, used for retention |
| No cliff | Immediate monthly vesting from day 1 | Executives, acqui-hires, co-founders (after probation) |
| Back-weighted | More shares vest in later years (e.g., 10/20/30/40) | Amazon-style, incentivizes longer tenure |
| Front-weighted | More shares vest in early years (e.g., 40/30/20/10) | Competitive offers, signing incentive |
| Milestone-based | Vesting tied to specific achievements | Performance-linked, executive grants |

### Founder Vesting

Founders should impose vesting on themselves, even if it feels unnecessary:

**Why Founder Vesting Matters:**
- Protects all co-founders if one leaves early
- Investors require it (no VC will fund a company where founders can walk away with all equity)
- Typical: 4-year vesting, sometimes with credit for time already worked (e.g., 1 year credited)

---

## 3. Acceleration

### Single-Trigger Acceleration

All unvested shares accelerate upon a single trigger event, typically a change of control (acquisition).

- **Pro:** Protects employees if acquirer would otherwise terminate them
- **Con:** Acquirers dislike it (reduces retention leverage); may reduce acquisition price
- **Common for:** Founders, C-suite executives

### Double-Trigger Acceleration

Unvested shares accelerate only if BOTH triggers occur:
1. Change of control (acquisition), AND
2. Employee is terminated without cause or resigns for good reason within 12-24 months

- **Pro:** Balanced — protects employees while preserving acquirer's retention ability
- **Con:** Requires termination, which may not happen
- **Industry standard:** Most common for employees at VC-backed startups

### Acceleration Amounts

| Level | Single-Trigger | Double-Trigger |
|-------|---------------|----------------|
| Founder/CEO | 50-100% | 100% |
| C-Suite | 25-50% | 50-100% |
| VP/Director | 0-25% | 25-50% |
| IC/Manager | None (rare) | 0-25% (less common) |

---

## 4. RSUs (Restricted Stock Units)

### RSU Mechanics

RSUs are a promise to deliver shares at a future date, subject to vesting conditions. Unlike stock options, RSUs have no strike price — they always have value as long as the stock has value.

| Feature | Stock Options | RSUs |
|---------|--------------|------|
| Strike price | Yes (pay to exercise) | No (shares delivered free) |
| Value if stock declines | Can become worthless (underwater) | Always have value above $0 |
| Tax timing | At exercise (NSO) or sale (ISO) | At vesting (delivery of shares) |
| Tax amount | Spread at exercise | Full FMV at vesting |
| Employee cost | Must pay strike price to exercise | No out-of-pocket cost |
| Dilution | Shares issued when options exercised | Shares issued when RSUs vest |
| Common at | Startups (pre-IPO) | Late-stage and public companies |

### Why Companies Transition from Options to RSUs

As 409A values increase (approaching IPO), stock options become less attractive:
- High strike prices reduce upside
- Exercise cost becomes prohibitive for employees
- AMT risk increases with ISOs
- RSUs guarantee value and require no employee investment
- Most companies transition to RSUs at Series C/D or when 409A exceeds ~$5/share

---

## 5. Employee Equity Education

### The Knowledge Gap

Most employees do not understand their equity. Studies show that 70%+ of startup employees cannot accurately describe their equity package. This leads to:
- Undervaluing equity in compensation negotiation
- Failing to exercise options before expiration
- Tax surprises (AMT, ordinary income at exercise)
- Leaving money on the table at exit events

### Essential Equity Education Topics

| Topic | What to Explain | Common Misconception |
|-------|----------------|---------------------|
| Share count | Number of shares means nothing without context (total shares, price) | "I have 10,000 shares so I'm rich" |
| Ownership percentage | Shares / fully diluted * 100 = your ownership | "My % won't change" (it will — dilution) |
| Vesting | You don't own unvested shares | "I was granted 100K shares so I own them" |
| Strike price | The price you pay to buy (exercise) your shares | "Exercise is free" |
| 409A value | Current fair market value (what shares are worth today for tax purposes) | "409A price = what I can sell for" |
| Preferred vs. common | Investors hold preferred (with protections); employees hold common | "My shares equal investor shares" |
| Dilution | Future fundraising will reduce your ownership percentage | "My 1% will always be 1%" |
| Exercise | The act of purchasing your shares at the strike price | "Exercising = selling" |
| Liquidity | Private company shares cannot be easily sold | "I can sell my shares whenever I want" |

---

## 6. Secondary Sales

### What Are Secondary Sales?

Secondary sales allow shareholders (typically employees and early investors) to sell shares to third-party buyers before an IPO or acquisition. These transactions provide liquidity without requiring a company exit.

**Types of Secondary Transactions:**

| Type | Description | Typical Pricing |
|------|-------------|----------------|
| Company-sponsored tender offer | Company facilitates a structured buyback, often with a new investor | Last round price or negotiated |
| Direct secondary sale | Shareholder sells directly to an accredited investor | Negotiated (often 10-30% discount to last round) |
| Fund-facilitated secondary | VC fund or secondary fund purchases from multiple shareholders | Negotiated, often at discount |
| Platform-mediated | Marketplace (CartaX, Forge, EquityZen) matches buyers and sellers | Market-driven pricing |

### Secondary Sale Considerations

| Factor | Detail |
|--------|--------|
| ROFR (Right of First Refusal) | Company typically has right to match any third-party offer |
| Board approval | Most sales require board approval per shareholder agreement |
| Information asymmetry | Buyers may lack access to company financials; pricing is imperfect |
| Transfer restrictions | Company bylaws and shareholder agreements may restrict transfers |
| Tax implications | Seller realizes capital gains; taxed based on holding period |
| Signal risk | Large secondary sales may signal insider pessimism to potential investors |

---

## 7. Exercise Windows and Post-Termination Exercise

### Standard Exercise Windows

| Situation | Standard Window | Extended Window (if offered) |
|-----------|----------------|------------------------------|
| Voluntary resignation | 90 days | 6 months to 10 years |
| Termination without cause | 90 days | 3-12 months |
| Termination for cause | 0 days (immediate forfeiture) | 0 days |
| Death or disability | 12 months | 12 months |
| Retirement | Varies | Varies |

### Extended Post-Termination Exercise Periods (PTEPs)

Many startups now offer extended PTEPs (1-10 years) as a competitive benefit:

**Arguments For Extended PTEPs:**
- Employees should not lose equity because they cannot afford to exercise
- 90-day windows force expensive exercise decisions during unemployment
- Extended windows are an employee-friendly retention and recruiting signal

**Arguments Against:**
- ISOs convert to NSOs after 90 days post-termination (tax impact)
- Extended option holders on cap table create administrative complexity
- May reduce urgency to exercise, leading to tax complications later

---

## 8. 83(b) Election

### What Is an 83(b) Election?

Section 83(b) of the IRC allows a taxpayer who receives restricted stock to elect to be taxed on the stock's value at the time of grant rather than at the time of vesting. This is critical for founders and very early employees who receive restricted stock (not options).

**When to File 83(b):**
- MUST be filed within 30 days of receiving restricted stock
- Most relevant when stock has very low value (early-stage, low 409A)
- Converts future ordinary income (at vesting, when value is higher) to capital gains (at sale)

**Example:**

```
WITHOUT 83(b):
Receive 1M shares at $0.001/share, 4-year vest
Year 1: 250K shares vest, 409A now $1.00
Tax: 250K * ($1.00 - $0.001) = $249,750 ordinary income tax event
Repeat each year at increasing 409A

WITH 83(b):
File within 30 days of grant
Tax at filing: 1M * $0.001 = $1,000 (ordinary income — trivial)
At vesting: No tax event
At sale: Capital gains on full appreciation from $0.001
```

### 83(b) Election Checklist

- [ ] File IRS Form 83(b) within 30 days of stock receipt (NO EXCEPTIONS — this deadline cannot be extended)
- [ ] Send to IRS via certified mail with return receipt
- [ ] Provide copy to the company
- [ ] Attach copy to personal tax return for the year
- [ ] Keep proof of filing permanently

---

## References

- IRS. (2024). *Section 83(b) Election Guidance*.
- IRS. (2024). *Section 422: Incentive Stock Options*.
- Feld, B. & Mendelson, J. (2019). *Venture Deals* (4th ed.). Wiley.
- NVCA. (2023). *Model Legal Documents — Stock Option Plan*.
- Holloway. (2024). *Holloway Guide to Equity Compensation*.
- Carta. (2024). *Equity Management and Education Resources*.
