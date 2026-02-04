# Fundraising — Venture Capital Economics and Term Sheet Mechanics

## What This Enables

**Decisions it helps make:**
- When and how much to raise
- How to evaluate term sheets
- How to model dilution and cap table impacts
- How to understand VC fund economics and incentives

---

## 1. Venture Capital Fund Economics

### 1.1 The Power Law of Returns

*Citation: Kupor, S. (2019). Secrets of Sand Hill Road. Portfolio/Penguin.*

VC returns follow a power law distribution, not a normal distribution:
- A small number of investments generate the majority of returns
- The best deal in a fund often returns more than all other deals combined
- Most investments return 0-1x; a few return 10-100x+

**Fund math example (hypothetical $100M fund):**

```
Investment  Amount    Outcome    Return    Multiple
Company A   $5M       $0         -$5M      0x
Company B   $5M       $2M        -$3M      0.4x
Company C   $5M       $5M        $0        1x
Company D   $5M       $10M       $5M       2x
Company E   $5M       $25M       $20M      5x
Company F   $5M       $150M      $145M     30x
...         $70M      $28M       -$42M     0.4x avg
──────────────────────────────────────────────────
Total       $100M     $220M      $120M     2.2x gross
```

Company F (5% of capital) generates 68% of total fund returns.

### 1.2 Fund Structure and Incentives

**GP (General Partners):** Fund managers who invest and make decisions.
**LP (Limited Partners):** Institutional investors who provide capital (pensions, endowments, family offices).

**Economics:**
- **Management fee:** 2% of committed capital annually (pays salaries, operations)
- **Carried interest:** 20% of profits above a hurdle rate (typically 8%)
- **Fund life:** 10 years (3-5 years investment, 5-7 years harvesting)

**GP incentive alignment:**
- Carry incentivizes outsized returns (power law thinking)
- Management fees incentivize larger funds (not always aligned with LP interests)
- GPs often co-invest personal capital (1-5% of fund)

### 1.3 What VCs Optimize For

Understanding VC incentives is critical for founders:

1. **Fund-returning investments:** VCs need individual deals that can return the entire fund. For a $200M fund, each investment must have a path to returning $200M+.
2. **Ownership targets:** Early-stage VCs typically target 15-25% ownership. Growth-stage: 5-15%.
3. **Follow-on reserves:** Funds reserve 40-60% of capital for follow-on investments in winning companies.
4. **Portfolio construction:** Diversification across 20-30 investments (early stage) or 10-15 (growth stage).

---

## 2. Term Sheet Mechanics

### 2.1 Economic Terms

**Pre-money valuation:** Company value before new investment.
**Post-money valuation:** Pre-money + new investment.
**Price per share:** Post-money valuation / fully diluted shares outstanding.

```
Post-money = Pre-money + Investment
Investor ownership = Investment / Post-money
```

**Example:**
- Pre-money: $10M
- Investment: $2.5M
- Post-money: $12.5M
- Investor ownership: $2.5M / $12.5M = 20%

### 2.2 Liquidation Preferences

The most important economic term after valuation.

**Non-participating preferred (standard):**
Investor gets the GREATER of:
- Their investment back (1x liquidation preference), OR
- Their pro-rata share of proceeds as if converted to common

```
Example: $5M invested for 20% ownership. Company sells for $30M.
Option A: $5M (1x preference)
Option B: 20% x $30M = $6M (conversion)
Investor takes $6M (conversion is better)

But if company sells for $15M:
Option A: $5M (1x preference)
Option B: 20% x $15M = $3M (conversion)
Investor takes $5M (preference is better)
```

**Participating preferred (investor-favorable):**
Investor gets BOTH their preference AND their pro-rata share of remaining proceeds.

```
Same example: $5M for 20%, company sells for $30M.
Step 1: $5M back (preference)
Step 2: 20% x ($30M - $5M) = $5M (participation)
Total: $10M (vs. $6M with non-participating)
```

**Cap on participation:** Some participating preferred has a cap (e.g., 3x), after which it converts to common.

### 2.3 Anti-Dilution Protection

Protects investors if the company raises a subsequent round at a lower valuation ("down round").

**Full ratchet:** Conversion price is adjusted to the new lower price. Most investor-favorable; rare in practice.

```
Original: $10/share for 1M shares ($10M investment)
Down round: $5/share
Full ratchet: Conversion price becomes $5, so investor now has 2M shares
```

**Broad-based weighted average (standard):**

```
New Price = Old Price x [(Outstanding + New Money / Old Price) / (Outstanding + New Shares Issued)]
```

This is less punitive than full ratchet, adjusting proportionally to the size of the down round.

### 2.4 Pro-Rata Rights

The right (not obligation) for existing investors to maintain their ownership percentage in future rounds by investing their proportional share.

**Why it matters:** If you own 20% and don't exercise pro-rata in the next round, you get diluted. Pro-rata rights protect ownership stake for investors who want to continue investing.

### 2.5 Board Composition

Common structures:
- **Seed/Series A:** 3 seats (1 founder, 1 investor, 1 independent)
- **Series B+:** 5 seats (2 founders, 2 investors, 1 independent)

**Protective provisions:** Certain actions require investor board consent (selling the company, raising senior debt, changing the charter, issuing new share classes).

---

## 3. Cap Table Modeling

### 3.1 Fully Diluted Shares

The cap table must account for all potential claims on equity:

```
Fully Diluted Shares = Common + Preferred (as-converted) + Options Outstanding
                       + Options Available (pool) + Warrants + Convertible Securities
```

### 3.2 Option Pool

VCs typically require an option pool (10-20% of post-money shares) created BEFORE their investment. This dilutes existing shareholders, not the new investor.

**The option pool shuffle:**

```
Scenario A: No option pool created before round
  Pre-money: $10M, Investment: $2.5M
  Founder ownership: $10M / $12.5M = 80%

Scenario B: 15% option pool created before round
  Effective pre-money to founders: $10M - (15% x $12.5M) = $8.125M
  Founder ownership: $8.125M / $12.5M = 65%
```

The option pool comes out of the pre-money, effectively lowering the founders' valuation.

### 3.3 Dilution Across Rounds

**Typical dilution by round:**

```
Round         Dilution    Founder Ownership (cumulative)
Seed          15-25%      75-85%
Series A      20-30%      50-65%
Series B      15-25%      35-50%
Series C      10-20%      28-42%
Option pool   15-20%      23-35%
IPO           10-15%      20-30%
```

**Key insight:** Dilution is acceptable if the value of your smaller percentage exceeds the value of the larger percentage before fundraising.

```
If you own 100% of a $1M company = $1M
If you own 80% of a $5M company = $4M (better despite dilution)
```

---

## 4. Convertible Instruments

### 4.1 SAFE (Simple Agreement for Future Equity)

*Source: Y Combinator (2013)*

- No interest rate, no maturity date
- Converts to equity at the next priced round
- Terms: valuation cap AND/OR discount rate

**Conversion mechanics:**

```
With valuation cap ($10M cap) and discount (20%):
If next round pre-money = $15M at $1.50/share:

Cap price: $10M / fully diluted shares = $1.00/share
Discount price: $1.50 x (1 - 0.20) = $1.20/share

SAFE converts at the LOWER price = $1.00/share
```

### 4.2 Convertible Notes

- Debt instrument with interest (typically 4-8%)
- Has maturity date (12-24 months)
- Converts to equity at next round
- May have valuation cap and/or discount
- If maturity is reached without conversion: negotiate extension or repay

### 4.3 SAFE vs. Convertible Note

| Feature | SAFE | Convertible Note |
|---------|------|-----------------|
| Interest | No | Yes (accrues, converts) |
| Maturity | No | Yes (creates pressure) |
| Legal complexity | Minimal | Moderate |
| Creditor claim in bankruptcy | No (equity-like) | Yes (debt) |
| Founder-friendliness | Higher | Lower |

---

## 5. Fundraising Timing and Strategy

### 5.1 When to Raise

**Raise when:**
- You have demonstrated meaningful traction or milestones
- You have 6+ months of runway remaining (raise from strength)
- Market conditions are favorable
- You have a clear plan for how the capital accelerates growth

**Do not raise when:**
- You're almost out of cash (desperate position = bad terms)
- You cannot articulate how more capital changes outcomes
- Unit economics are broken (more capital = more losses)

### 5.2 How Much to Raise

**Target 18-24 months of runway** to reach the next meaningful milestone.

```
Amount = Monthly Burn Rate x Months of Runway Desired x Safety Margin (1.2-1.5x)
```

**Raise enough to achieve clear milestones** that de-risk the business and justify a higher valuation for the next round.

### 5.3 Default Alive vs. Default Dead

*Source: Graham, P. (2015). "Default Alive or Default Dead?"*

```
If current_revenue_growth_rate and current_expenses remain constant:
  Will the company reach profitability before running out of cash?

  Yes -> Default alive (negotiating leverage)
  No  -> Default dead (urgency to raise or cut costs)
```

---

## Key Citations

- Feld, B., & Mendelson, J. (2019). *Venture Deals* (4th ed.). Wiley.
- Gompers, P. A., & Lerner, J. (2004). *The Venture Capital Cycle* (2nd ed.). MIT Press.
- Kupor, S. (2019). *Secrets of Sand Hill Road*. Portfolio/Penguin.
- Metrick, A., & Yasuda, A. (2021). *Venture Capital and the Finance of Innovation* (3rd ed.). Wiley.
- Myers, S. C., & Majluf, N. S. (1984). Corporate financing and investment decisions. *Journal of Financial Economics*, 13(2), 187-221.
