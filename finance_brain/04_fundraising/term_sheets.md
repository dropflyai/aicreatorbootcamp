# Term Sheets — Economic Terms, Control Terms, and Instrument Structures

## Overview

A term sheet is the non-binding agreement that outlines the key economic and
governance terms of a venture investment. Understanding term sheet mechanics is
critical because these terms determine how value is distributed in every
scenario -- from massive exits to acqui-hires. This module covers economic terms
(valuation, liquidation preferences, participation), control terms (board
composition, protective provisions), and the instrument structures (SAFE,
convertible notes, priced rounds) used at each stage.

References: Feld & Mendelson (Venture Deals, 4th ed.), YC SAFE documentation,
NVCA model legal documents, Wilson (MBA Mondays), Kupor (Secrets of Sand Hill Road).

---

## Economic Terms

### Valuation

```
Pre-Money Valuation = company value BEFORE new investment
Post-Money Valuation = Pre-Money + New Investment

Price Per Share = Pre-Money Valuation / Fully Diluted Shares Outstanding

Fully Diluted = Common + Preferred + Options Granted + Option Pool (ungranted)

Example:
  Pre-money: $30M
  Fully diluted shares: 10,000,000
  Price per share: $3.00
  New investment: $10M
  New shares issued: $10M / $3.00 = 3,333,333
  Post-money: $40M
  Investor ownership: 3,333,333 / 13,333,333 = 25%
```

### Liquidation Preference

Determines the payout order in a liquidity event (acquisition, IPO, wind-down).

**Non-Participating Preferred (Standard)**
```
Investor gets the GREATER of:
  a) Their liquidation preference (typically 1x invested capital)
  b) Their pro-rata share of total proceeds (as-if-converted to common)

Example ($10M invested at $40M post-money = 25%):
  Exit at $30M: Investor gets $10M (preference), founders get $20M
  Exit at $60M: Investor gets $15M (25% of $60M > $10M pref), converts
  Exit at $20M: Investor gets $10M (preference), founders get $10M
  Exit at $5M:  Investor gets $5M (all proceeds up to 1x preference)
```

**Participating Preferred (Investor-Favorable)**
```
Investor gets BOTH:
  a) Their liquidation preference (1x)
  b) PLUS their pro-rata share of remaining proceeds

Example ($10M invested at $40M post-money = 25%):
  Exit at $60M: Investor gets $10M + 25% of ($60M - $10M) = $10M + $12.5M = $22.5M
  Exit at $30M: Investor gets $10M + 25% of ($30M - $10M) = $10M + $5M = $15M

Impact: participation dramatically favors investors in moderate exits.
```

**Participating with Cap**
```
Investor gets the LESSER of:
  a) Preference + pro-rata of remainder
  b) Cap * investment amount (typically 3x)

This is a compromise between participating and non-participating.
```

### Liquidation Preference Multiples

| Multiple | Meaning | Frequency |
|----------|---------|-----------|
| 1x non-participating | Standard, founder-friendly | 90%+ of deals |
| 1x participating | Double-dip, investor-favorable | Declining, avoid |
| 2x+ non-participating | Investor protection, down rounds | Distressed deals |
| Participation with 3x cap | Compromise | Negotiated |

### Anti-Dilution Protection

Protects investors if the company raises at a lower valuation in the future.

**Full Ratchet (Aggressive)**
```
Conversion price = new lower price, regardless of shares issued
If Series A at $5/share, Series B at $3/share:
  Series A conversion price adjusts to $3/share
  Series A effectively gets 67% more shares

Impact: devastating dilution to founders and earlier investors.
Rarely used. Strongly resist.
```

**Weighted Average (Standard)**
```
Broad-Based Weighted Average:
NCP = OCP * (CSO + ($/NCP_new)) / (CSO + NSI)

where:
  NCP = new conversion price
  OCP = old conversion price
  CSO = common shares outstanding (fully diluted, broad-based)
  NSI = new shares issued in down round

Example:
  Series A at $5/share, 10M shares outstanding
  Series B at $3/share, 2M new shares, raising $6M
  NCP = $5 * (10M + ($6M/$5)) / (10M + 2M)
  NCP = $5 * (10M + 1.2M) / 12M
  NCP = $5 * 0.933 = $4.67

Impact: moderate adjustment, standard in VC deals.
```

### Dividends

| Type | Description | Frequency |
|------|------------|-----------|
| Non-cumulative | Board declares if/when to pay | Most common |
| Cumulative | Accrues regardless of declaration | Aggressive |
| PIK (paid in kind) | Accrues as additional shares | Aggressive |

Standard practice: non-cumulative, 6-8% annual, rarely actually paid.
Cumulative dividends compound and add to liquidation preference -- avoid.

---

## Control Terms

### Board Composition

```
Early Stage (Seed/A):
  3-person board: 1 founder, 1 investor, 1 independent

Growth Stage (B/C):
  5-person board: 2 founders/management, 2 investors, 1 independent

Late Stage:
  7-person board: 2-3 management, 2-3 investors, 1-2 independent
```

### Protective Provisions

Rights that give preferred shareholders a veto over specific actions:

**Standard (Reasonable)**
- Issuing shares senior to or on par with existing preferred
- Changing the certificate of incorporation
- Increasing authorized shares
- Selling/merging the company
- Incurring debt above a threshold
- Changing board size

**Aggressive (Negotiate Against)**
- Veto on annual budget or spending above a threshold
- Veto on hiring/firing key executives
- Veto on entering new business lines
- Requiring investor approval for operational decisions

### Information Rights

Typical requirements:
- Annual audited financial statements
- Quarterly unaudited financial statements
- Monthly management reports (revenue, burn, headcount)
- Annual budget and operating plan
- Cap table access

### Pro-Rata Rights (Participation Rights)

Right to invest in future rounds to maintain ownership percentage.

```
If investor owns 20% and the company raises a new round:
  Pro-rata right = right to invest up to 20% of new round
  Ensures investor can avoid dilution if they choose to invest
```

Significance: signals investor confidence. If a major investor does NOT
exercise pro-rata, it is a red flag to new investors.

### Drag-Along Rights

Majority shareholders can force all shareholders to approve a sale.

```
Typical threshold: approval by board + majority of preferred + majority of common
Effect: prevents minority shareholders from blocking a beneficial exit
```

### Tag-Along (Co-Sale) Rights

If a founder sells shares, investors can sell a proportional amount at the
same terms. Prevents founders from achieving liquidity while investors cannot.

---

## SAFE (Simple Agreement for Future Equity)

### YC SAFE Mechanics

A SAFE is not debt. It is a contractual right to receive equity in a future
priced round.

**Key Parameters:**
- Valuation Cap: maximum valuation at which the SAFE converts
- Discount Rate: percentage discount to the next round's price
- Most Favored Nation (MFN): earliest SAFE gets best terms of later SAFEs

**Post-Money SAFE (Current YC Standard)**

```
Investor ownership at conversion = SAFE Amount / Post-Money Valuation Cap

Example:
  SAFE Amount: $500K
  Post-Money Valuation Cap: $10M
  Investor gets: $500K / $10M = 5.0% at conversion

Key: post-money cap includes ALL SAFEs in the cap.
If $2M total SAFEs at $10M post-money cap:
  SAFE investors collectively own: $2M / $10M = 20%
  Each $500K SAFE: 5%
```

**Pre-Money SAFE (Original YC)**

```
Conversion price = Cap / (Pre-money shares outstanding)
New shares = SAFE Amount / Conversion Price

Dilution is harder to calculate because it depends on the
number of shares at conversion time. Post-money SAFE is simpler.
```

### SAFE vs Convertible Note

| Feature | SAFE | Convertible Note |
|---------|------|-----------------|
| Legal form | Equity instrument | Debt instrument |
| Maturity date | None | Typically 18-24 months |
| Interest | None | 2-8% annual |
| Repayment | Not repayable | Technically repayable at maturity |
| Valuation cap | Yes | Yes |
| Discount | Optional | Typical (15-25%) |
| Conversion trigger | Priced equity round | Priced equity round or maturity |
| Legal cost | $0-$5K | $5-$15K |
| Complexity | Simple | Moderate |

### Convertible Note Conversion

```
Conversion price = MIN(
    (Valuation Cap / Fully Diluted Shares),
    (Price Per Share in New Round * (1 - Discount))
)

Example:
  Note: $500K, $8M cap, 20% discount
  Series A: $12M pre-money, $4/share

  Cap price: $8M / 2M shares = $4.00
  Discount price: $4.00 * (1 - 0.20) = $3.20

  Conversion price = MIN($4.00, $3.20) = $3.20
  Shares issued: $500K / $3.20 = 156,250 shares
  (vs 125,000 shares at $4.00 = 25% more shares from discount)
```

---

## Priced Round Mechanics

### What Makes It "Priced"

- Explicit price per share is set
- New class of preferred stock is created (Series A Preferred, etc.)
- Full set of legal documents (SPA, IRA, ROFR, Voting Agreement)
- Board governance terms established

### Key Documents

| Document | Purpose |
|----------|---------|
| Term Sheet | Non-binding outline of key terms |
| Stock Purchase Agreement (SPA) | Legal agreement to purchase shares |
| Investor Rights Agreement (IRA) | Information rights, registration rights, pro-rata |
| Right of First Refusal (ROFR) | Company/investor right to purchase shares before third parties |
| Voting Agreement | Board composition, drag-along |
| Certificate of Incorporation | Charter amendments for new class of stock |

### Negotiation Priorities

| Term | Founder Priority | Investor Priority |
|------|-----------------|-------------------|
| Valuation | Highest possible | Reasonable to generate returns |
| Liquidation preference | 1x non-participating | Participating or higher multiple |
| Board seats | Maintain control | Governance influence |
| Anti-dilution | Broad-based weighted average | Full ratchet (in distress) |
| Option pool | Smallest possible pre-money | Larger pool pre-money |
| Protective provisions | Minimal | Comprehensive |

---

## Special Situations

### Down Rounds

When a company raises at a lower valuation than the previous round:

```
Impact:
  - Anti-dilution kicks in for prior investors
  - Employee option values may be underwater
  - Signaling risk to market

Mitigations:
  - Pay-to-play: investors must participate or lose preferences
  - Structured round: add warrants or liquidation pref instead of lower price
  - Inside round: existing investors fund the round
```

### Bridge Financing

Short-term capital to reach the next milestone:

```
Instruments: convertible note, SAFE, or small extension of last round
Typical terms: 20-25% discount or cap at last round valuation
Red flags: multiple bridges suggest inability to raise a proper round
Best practice: bridges should last 3-6 months maximum
```

---

## Production Checklist

- [ ] Term sheet terms fully understood (economic + control)
- [ ] Dilution modeled across multiple scenarios (exit values)
- [ ] Liquidation preference waterfall built in spreadsheet
- [ ] Anti-dilution protection type confirmed (broad-based weighted average)
- [ ] Board composition acceptable (founder control where appropriate)
- [ ] Protective provisions reviewed and unreasonable terms pushed back
- [ ] Pro-rata rights negotiated for key investors
- [ ] Legal counsel engaged (experienced startup attorney)
- [ ] All SAFE/note conversions modeled in cap table
- [ ] Option pool sized and impact on effective valuation understood
