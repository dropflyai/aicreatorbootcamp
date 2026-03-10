# Term Sheet Anatomy -- Clause-by-Clause Analysis

## Overview

The term sheet is the blueprint for the economic and governance relationship between
founders and investors. Every clause has implications that compound over the life of
the company. This module provides a detailed analysis of every standard term sheet
provision, drawing directly from NVCA model documents and Brad Feld's "Venture Deals."

Per Feld: "There are only two things that matter in a term sheet: economics and control.
Everything else is noise."

Primary references: NVCA Model Term Sheet (2024), Feld "Venture Deals" 4th Edition,
Yokum Taku (Wilson Sonsini) term sheet series, Cooley GO startup documents.

---

## Term Sheet Structure

### Document Overview

```
TERM SHEET COMPONENTS

ECONOMIC TERMS (who gets what):
  - Valuation (pre-money / post-money)
  - Liquidation preference
  - Anti-dilution protection
  - Dividends
  - Redemption rights
  - Pay-to-play

CONTROL TERMS (who decides what):
  - Board composition
  - Protective provisions
  - Drag-along rights
  - Conversion rights
  - Information rights

OTHER TERMS:
  - Founder vesting
  - Employee option pool
  - Right of first refusal / co-sale
  - Registration rights
  - No-shop / exclusivity
  - Conditions to closing

BINDING vs. NON-BINDING:
  Most term sheet provisions are NON-BINDING (intent, not contract).
  BINDING provisions (enforceable):
  - No-shop / exclusivity clause
  - Confidentiality
  - Expense reimbursement (sometimes)
```

---

## Economic Terms

### Valuation

```
VALUATION CLAUSE ANALYSIS

STANDARD LANGUAGE:
"The pre-money valuation of the Company is $[X] million,
on a fully-diluted basis, including a [Y]% unallocated
option pool."

KEY ELEMENTS:

1. PRE-MONEY vs. POST-MONEY
   Pre-money: company value before investment
   Post-money: pre-money + investment amount
   Investor ownership: investment / post-money

2. FULLY-DILUTED BASIS
   Includes: common, preferred (as-converted), ALL options
   (vested and unvested), warrants, convertible instruments
   TRAP: If option pool is "post-money," it dilutes existing
   holders before investment. (See option pool shuffle in
   01_foundations/valuation_theory.md)

3. OPTION POOL ALLOCATION
   Standard: 10-20% post-money option pool
   WHO BEARS THE DILUTION: Pre-money holders (founders/early investors)
   NEGOTIATION: Size pool to actual 12-18 month hiring plan,
   not arbitrary 20%

VALUATION NEGOTIATION LEVERS:
  - Valuation number itself
  - Option pool size (smaller = higher effective pre-money)
  - Option pool source (pre-money vs. post-money allocation)
  - Convertible instrument treatment (where SAFEs convert)
  - Milestone-based valuation adjustments (rare, complex)

EXAMPLE:
Term Sheet says: $10M pre-money, $2M investment, 15% option pool (post-money)
  Post-money: $12M
  Investor: $2M / $12M = 16.67%
  Option pool: 15%
  Existing holders: 100% - 16.67% - 15% = 68.33%
  Effective pre-money to existing holders: 68.33% * $12M = $8.2M (not $10M)
```

### Liquidation Preference

```
LIQUIDATION PREFERENCE CLAUSE ANALYSIS

STANDARD LANGUAGE:
"In the event of a Liquidation Event, holders of Series [X]
Preferred shall be entitled to receive, prior to any distribution
to holders of Common Stock, an amount equal to [1]x the Original
Purchase Price per share, plus any declared but unpaid dividends."

TYPES AND ANALYSIS:

1x NON-PARTICIPATING PREFERRED (founder-friendly, market standard):
  Investor gets EITHER:
    (a) 1x their investment back, OR
    (b) Converts to common and shares pro-rata
  Investor will convert when pro-rata share > preference

1x PARTICIPATING PREFERRED (investor-friendly):
  Investor gets BOTH:
    (a) 1x their investment back, AND
    (b) Pro-rata share of remaining proceeds
  "Double-dip" -- investors get preferred treatment AND equity upside

PARTICIPATING WITH CAP (compromise):
  Same as participating, but total return capped at [X]x
  Example: 3x cap means investor receives maximum of 3x their investment
  When uncapped participation exceeds cap, investor converts to common

MULTIPLE PREFERENCES (2x, 3x -- unfavorable):
  Investor gets 2x or 3x their investment before common participates
  At 2x: $10M invested → must return $20M before common gets anything
  RARELY JUSTIFIED except in down rounds or rescue financing

SENIORITY STRUCTURE:
  Standard: Last-in-first-out (later rounds paid first)
  Alternative: Pari passu (all preferred paid equally)
  Complex: Tiered (some senior, some pari passu)

LIQUIDATION EVENT DEFINITION:
  Typically includes:
  - Acquisition or merger
  - Sale of substantially all assets
  - IPO (sometimes triggers automatic conversion instead)
  - Deemed liquidation events (can be contentious)

  WATCH FOR: Overly broad deemed liquidation definitions
  that include licensing deals or large contracts

NEGOTIATION GUIDANCE:
  ✓ 1x non-participating is market standard for Series A
  ✗ Participating preferred should be pushed back on
  ✗ Multiples > 1x should be pushed back on
  If investor insists on participating: negotiate a reasonable cap (2-3x)
```

### Anti-Dilution Protection

```
ANTI-DILUTION CLAUSE ANALYSIS

STANDARD LANGUAGE:
"The conversion price of the Series [X] Preferred shall be
subject to [broad-based weighted average] anti-dilution adjustment
in the event the Company issues equity securities at a price per
share less than the then-applicable conversion price."

TYPES:

BROAD-BASED WEIGHTED AVERAGE (standard, founder-acceptable):
  Adjusts conversion price using formula that accounts for
  the size of the down round relative to total shares.
  (See full formula in 00_readme/glossary.md)
  Impact: Moderate additional dilution to founders in down round

NARROW-BASED WEIGHTED AVERAGE (less common, less favorable):
  Same formula but uses smaller denominator
  (excludes common stock and/or option pool)
  Impact: More dilution than broad-based

FULL RATCHET (aggressive, push back hard):
  ALL previous preferred shares repriced to new lower price
  regardless of how small the down round is.
  Impact: Devastating dilution to founders

  EXAMPLE (Full Ratchet):
  Series A: 2M shares at $5.00/share ($10M invested)
  Down Round: 500K shares at $2.00/share ($1M raised)
  Full ratchet: Series A conversion price drops from $5.00 to $2.00
  Series A now converts to 5M shares (from 2M)
  Founders lose 3M shares worth of ownership

EXCEPTIONS (carved out from anti-dilution trigger):
  Standard carve-outs:
  - Employee option grants
  - Shares for acquisitions (board-approved)
  - Shares for strategic partnerships
  - Shares for equipment financing
  - Shares issued to banks/lessors

PAY-TO-PLAY INTERACTION:
  Pay-to-play: investors must participate in down round
  or lose anti-dilution protection (converted to common)
  FOUNDER-FRIENDLY: Encourages investors to support company in down rounds
  NEGOTIATE FOR THIS: Balances anti-dilution with investor commitment

NEGOTIATION:
  ✓ Broad-based weighted average = market standard
  ✗ Full ratchet = walk away unless truly distressed situation
  ✗ Narrow-based = push for broad-based
  + Pay-to-play = always negotiate for this alongside anti-dilution
```

---

## Control Terms

### Board Composition

```
BOARD COMPOSITION CLAUSE ANALYSIS

STANDARD LANGUAGE:
"The Board of Directors shall consist of [X] members:
[Y] designated by holders of Series [X] Preferred,
[Z] designated by holders of Common Stock, and
[W] mutually agreed upon Independent Director(s)."

COMMON STRUCTURES:

Seed (3-person board):
  1 Founder seat
  1 Investor seat
  1 Independent (mutually agreed)
  NOTE: Many seed rounds don't take board seats

Series A (5-person board):
  2 Founder/Common seats
  1 Investor seat (lead investor)
  2 Independent seats (mutually agreed)
  ALTERNATIVE: 2 Common, 2 Preferred, 1 Independent

Series B+ (5-7 person board):
  2 Common seats
  2 Preferred seats (Series A + B leads)
  1-3 Independent seats

CRITICAL CONSIDERATIONS:
  - Odd number prevents deadlocks
  - Independent directors are the swing votes
  - "Mutually agreed" means both sides must approve
  - Board observer seats (non-voting) as alternative to full seats

FOUNDER CONTROL MATH:
  3-person board: Founder + Independent = 2/3 control
  5-person board: 2 Founder + 1 Independent = 3/5 control
  5-person board: 2 Common + 2 Preferred + 1 Independent = swing vote decides

NEGOTIATION:
  ✓ Maintain founder majority (or tied with friendly independent)
  ✓ Independent director should be genuinely independent
  ✗ Avoid investor majority at Series A (premature control transfer)
  ✗ Avoid even-numbered boards (deadlock risk)
```

### Protective Provisions

```
PROTECTIVE PROVISIONS CLAUSE ANALYSIS

STANDARD LANGUAGE:
"The Company shall not, without the consent of holders of
[majority/supermajority] of the Series [X] Preferred, take
any of the following actions..."

STANDARD PROVISIONS (generally acceptable):

  1. Issue senior or pari passu preferred stock
  2. Change rights of preferred stock
  3. Increase authorized shares
  4. Declare dividends
  5. Redeem or repurchase shares
  6. Approve liquidation event (sale/merger)
  7. Change certificate of incorporation / bylaws
  8. Create debt above threshold
  9. Change board size

AGGRESSIVE PROVISIONS (push back):

  10. Approve annual budget (gives investor operational control)
  11. Hire/fire CEO (founders should control this initially)
  12. Enter new business lines
  13. Approve any expenditure above $[X]
  14. Change company strategy

NEGOTIATION APPROACH:
  Items 1-9: Generally standard and acceptable
  Items 10-13: Negotiate removal or higher thresholds
  Item 14: Too vague; remove or define precisely

THRESHOLD:
  "Majority" = 50%+ of preferred class
  "Supermajority" = 66.7% or 75% of preferred class
  Higher thresholds give more protection to minority preferred holders
```

### Drag-Along Rights

```
DRAG-ALONG CLAUSE ANALYSIS

PURPOSE: Prevents minority shareholders from blocking an acquisition

STANDARD LANGUAGE:
"If holders of [X]% of Common Stock and [Y]% of Preferred Stock
approve a Liquidation Event, all other shareholders shall be
required to approve and participate in such transaction."

KEY VARIABLES:
  Threshold: What % must approve to trigger drag-along?
  Standard: Majority of Common + Majority of Preferred
  Aggressive: Just majority of Preferred (investors can force sale)

FOUNDER CONCERN:
  If investors can drag founders, investors can force a sale
  that's good for investor returns but bad for founders.

  Example: Investor has $10M liquidation preference.
  Company offered $15M acquisition.
  Investor gets $10M (1x) + some common participation = good return.
  Founders get $5M minus all other common = mediocre outcome.
  But investors have drag-along → founders cannot block.

NEGOTIATION:
  ✓ Require majority of BOTH common and preferred (not just preferred)
  ✓ Include minimum price threshold below which drag-along doesn't apply
  ✓ Require that drag triggers same per-share price for all holders
  ✗ Never allow preferred-only drag-along without common consent
```

---

## Other Key Terms

### Founder Vesting

```
FOUNDER VESTING CLAUSE ANALYSIS

PURPOSE: Ensures founders earn their equity over time

STANDARD: 4-year vest, 1-year cliff
  Year 0: 0% vested
  Year 1 (cliff): 25% vests
  Years 2-4: Monthly vesting (1/48 per month)
  Year 4: 100% vested

CREDIT FOR TIME SERVED:
  If founders have been working for 18 months pre-funding,
  negotiate credit for time served.
  Result: 4-year vest with 18 months credited = 2.5 years remaining

ACCELERATION:
  Single-trigger: All shares vest on acquisition
  Double-trigger: Shares vest on acquisition + termination/demotion
  Standard: Double-trigger is more common and more balanced

  NEGOTIATE FOR: Double-trigger acceleration (100% or at least 50%)
  AVOID: No acceleration at all (company can be acquired and
  founder terminated with unvested shares forfeited)

VESTING RESETS:
  Investors sometimes request full vesting reset at funding.
  This is aggressive. Counter with partial reset or credit.

SPECIAL CASES:
  - Solo founder: Vesting is still standard (protects investor)
  - Multiple co-founders: Individual vesting schedules
  - Departing co-founder: Vesting stops, unvested shares return to pool
```

### No-Shop / Exclusivity

```
NO-SHOP CLAUSE ANALYSIS

STANDARD LANGUAGE:
"For a period of [X] days from execution of this term sheet,
the Company shall not solicit, encourage, or accept any
proposals relating to the sale or issuance of equity securities."

STANDARD PERIOD: 30-45 days
AGGRESSIVE: 60-90 days
ACCEPTABLE: 30 days

THIS IS BINDING (unlike most term sheet provisions)

NEGOTIATION:
  ✓ 30 days is standard and acceptable
  ✓ Include carve-out for existing conversations in progress
  ✗ 60+ days is too long; negotiate down
  ✓ Automatic expiration if closing conditions not met by date
  ✓ Fiduciary out (board can accept unsolicited superior offers)

STRATEGIC CONSIDERATION:
  Signing a no-shop means you cannot shop the term sheet.
  Get all other term sheets BEFORE signing the no-shop.
  Use the no-shop period to close, not to negotiate alternatives.
```

---

## Term Sheet Red Flags

```
CLAUSES THAT REQUIRE PUSHBACK OR WALKAWAY

RED FLAGS (Potential deal-breakers):
  ✗ Full ratchet anti-dilution
  ✗ Participating preferred without cap
  ✗ Multiple (2x+) liquidation preference
  ✗ Investor majority on board at Series A
  ✗ Cumulative dividends (8%+ compounding)
  ✗ Redemption rights with short timeline (< 5 years)
  ✗ No-shop > 60 days
  ✗ Broad drag-along without common consent
  ✗ Founder vesting reset to zero (no credit for time served)

YELLOW FLAGS (Negotiate but not necessarily deal-breaking):
  ! Participating preferred (negotiate cap)
  ! Narrow-based weighted average (push for broad-based)
  ! Cumulative dividends at low rate
  ! No acceleration provisions
  ! Aggressive protective provisions (budget control, etc.)
  ! Large option pool (>20% post-money)

GREEN FLAGS (Founder-friendly indicators):
  ✓ 1x non-participating preferred
  ✓ Broad-based weighted average anti-dilution
  ✓ Pay-to-play provision
  ✓ Founder-friendly board composition
  ✓ Double-trigger acceleration
  ✓ Reasonable option pool (10-15%)
  ✓ Pro-rata rights (standard, acceptable)
  ✓ Information rights (standard, acceptable)
```

---

**This module provides the definitive clause-by-clause analysis of venture term sheets.
Every term sheet received by the company must be evaluated against these frameworks.
Understanding terms is as important as understanding valuation -- often more so.**
