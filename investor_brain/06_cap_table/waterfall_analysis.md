# Waterfall Analysis — Liquidation Preference and Exit Proceeds Distribution

## The Waterfall as Exit Economics Blueprint

A waterfall analysis models how exit proceeds are distributed among shareholders based on the company's capital structure, liquidation preferences, and participation rights. The term "waterfall" describes how money flows down through layers of preferred stock before reaching common stockholders. Understanding the waterfall is essential for founders (to know what they actually receive at exit), investors (to model returns), and employees (to understand what their equity is worth in different exit scenarios).

---

## 1. Liquidation Preference Fundamentals

### What Is Liquidation Preference?

Liquidation preference gives preferred stockholders the right to receive their investment back (or a multiple of it) before any proceeds are distributed to common stockholders. It is the single most important economic term in a venture financing.

### Preference Types

**1x Non-Participating Preferred (Standard / Founder-Friendly)**

The investor receives the greater of:
- (a) Their investment amount back (1x), OR
- (b) Their pro-rata share of proceeds as if converted to common

```
Example: Investor owns 25% on converted basis, invested $5M

Exit at $30M:
  Option (a): $5M liquidation preference
  Option (b): 25% × $30M = $7.5M ← Higher
  Investor takes: $7.5M (converts to common)

Exit at $15M:
  Option (a): $5M liquidation preference ← Higher
  Option (b): 25% × $15M = $3.75M
  Investor takes: $5M (takes preference)
```

**1x Participating Preferred (Investor-Friendly)**

The investor receives:
- Their investment amount back (1x), PLUS
- Their pro-rata share of remaining proceeds

```
Example: Investor owns 25% on converted basis, invested $5M

Exit at $30M:
  Step 1: Investor receives $5M preference
  Step 2: Remaining $25M distributed pro-rata
  Step 3: Investor's share of remainder: 25% × $25M = $6.25M
  Investor total: $5M + $6.25M = $11.25M

  vs. Non-participating: $7.5M
  Participating premium: $3.75M (50% more)
```

**Participating Preferred with Cap**

Participation is capped at a multiple (typically 3x). The investor receives preference + participation up to the cap, then converts if conversion yields more.

```
Example: 1x participating with 3x cap, $5M invested, 25% ownership

Exit at $30M:
  Step 1: $5M preference
  Step 2: 25% × $25M = $6.25M participation
  Step 3: Total: $11.25M — check against cap
  Cap: 3x × $5M = $15M
  $11.25M < $15M, so investor takes $11.25M

Exit at $100M:
  Step 1: $5M preference
  Step 2: 25% × $95M = $23.75M participation
  Step 3: Total: $28.75M — check against cap
  Cap: 3× × $5M = $15M
  $28.75M > $15M, cap applies
  But check conversion: 25% × $100M = $25M > $15M cap
  Investor converts, takes $25M
```

---

## 2. Multi-Round Waterfall Mechanics

### The Stacking Problem

Most companies raise multiple rounds of preferred stock. Each round's liquidation preference "stacks" on top of earlier rounds. The order of priority (called "seniority") determines who gets paid first.

**Seniority Structures:**

| Structure | Description | Founder Impact |
|-----------|-------------|----------------|
| Standard seniority (LIFO) | Last money in, first money out. Series C paid before B, B before A | Most common. Later rounds protected first |
| Pari passu | All preferred shareholders paid simultaneously, pro-rata to investment | More founder-friendly; spreads preference evenly |
| Blended | Some rounds pari passu, some senior | Negotiated case-by-case |

### Multi-Round Waterfall Example

```
Company Capital Structure:
  Series A: $3M invested, 1x non-participating, 20% ownership
  Series B: $10M invested, 1x non-participating, 25% ownership
  Series C: $25M invested, 1x non-participating, 20% ownership
  Option pool: 10% (common)
  Founders: 25% (common)
  Total preferred liquidation preferences: $38M

Seniority: Standard (LIFO — C > B > A)
```

---

## 3. Scenario Modeling: $10M / $50M / $100M / $500M Exit

Using the capital structure above, model proceeds distribution at four exit valuations:

### $10M Exit (Below Total Preferences)

```
Total preferences: $38M
Available proceeds: $10M

Step 1: Series C preference ($25M entitled, only $10M available)
  Series C receives: $10M (all available proceeds)
  Series B receives: $0
  Series A receives: $0
  Common (founders + pool): $0

Result: Series C recovers 40 cents on the dollar.
        Everyone else gets nothing.
```

### $50M Exit (Above Total Preferences)

```
Step 1: Series C preference: $25M
Remaining: $25M

Step 2: Series B preference: $10M
Remaining: $15M

Step 3: Series A preference: $3M
Remaining: $12M

Step 4: Check conversion (non-participating)
  Series C: Preference ($25M) vs. conversion (20% × $50M = $10M) → Takes preference
  Series B: Preference ($10M) vs. conversion (25% × $50M = $12.5M) → Converts ($12.5M)
  Series A: Preference ($3M) vs. conversion (20% × $50M = $10M) → Converts ($10M)

Recalculate with B and C converting:
  Series C takes preference: $25M (does not convert)
  Remaining $25M distributed to converting shareholders:
  Series B: 25% / (25% + 20% + 10% + 25%) × $25M = ~$7.8M + would they convert?

[Note: In practice, each series independently decides whether to convert.
 The math becomes iterative — use software or spreadsheet for precision.]

Approximate distribution:
  Series C: $25M (50%) — preference
  Series B: $12.5M (25%) — converts
  Series A: $3M-$10M (6-20%) — evaluates conversion
  Common: $2.5M-$12M (5-24%) — residual
```

### $100M Exit

```
At $100M, all series convert to common (conversion value exceeds preference for all):

Series C: 20% × $100M = $20M (< $25M preference... stays with preference)
Series B: 25% × $100M = $25M (> $10M preference — converts)
Series A: 20% × $100M = $20M (> $3M preference — converts)

Series C prefers to NOT convert at $100M:
  Takes $25M preference
  Remaining: $75M to converting shareholders + common
  Series B: 25/75 × $75M = $25M
  Series A: 20/75 × $75M = $20M
  Founders: 25/75 × $75M = $25M
  Pool: 10/75 × $75M = $10M

  Series C breakeven (converts when): 20% × X > $25M → X > $125M
```

### $500M Exit

```
At $500M, all series convert (conversion value far exceeds preference):

Series C: 20% × $500M = $100M ✓ (vs. $25M preference)
Series A: 20% × $500M = $100M ✓
Series B: 25% × $500M = $125M ✓
Founders: 25% × $500M = $125M
Pool: 10% × $500M = $50M

Everyone converts. Distribution follows ownership percentages.
Liquidation preferences become irrelevant at large exits.
```

---

## 4. Key Insights from Waterfall Analysis

### The Breakpoints

Every waterfall has critical breakpoints where the economics shift:

| Breakpoint | Definition | Importance |
|-----------|-----------|------------|
| Zero-common point | Exit value below which common gets $0 | Founders and employees earn nothing below this |
| Preference-clearing point | Exit value at which all preferences are paid | Above this, common starts receiving proceeds |
| Conversion points | Exit values at which each series converts | Above these, preferences become irrelevant |
| Participation cap points | Exit values at which participation caps bite | Changes economic split between preferred and common |

### Waterfall Implications for Founders

| Scenario | Implication |
|----------|------------|
| Low exit ($10-30M) | Preferences dominate; common may receive little or nothing |
| Medium exit ($50-100M) | Preferences matter but conversion starts happening |
| Large exit ($200M+) | Preferences irrelevant; ownership percentages determine everything |
| Massive exit ($1B+) | Fully proportional to ownership; best scenario for common |

**The fundamental insight:** Liquidation preferences create a "dead zone" for common stockholders between $0 and the preference-clearing point. This is why founders should minimize the total amount of liquidation preference on the cap table (raise less money, or negotiate lower preferences).

---

## 5. Pay-to-Play Provisions

### What Is Pay-to-Play?

Pay-to-play provisions require existing investors to participate in future financing rounds (at their pro-rata allocation) or face consequences — typically conversion of their preferred stock to common stock.

**Impact on Waterfall:**
- Investors who do not participate lose their liquidation preferences
- Their shares convert to common, reducing the preference stack
- This benefits founders and participating investors

**Types:**
| Type | Consequence for Non-Participation |
|------|----------------------------------|
| Full ratchet | Preferred converts to common at 1:1 |
| Partial conversion | Preferred converts to shadow preferred (reduced rights) |
| Loss of anti-dilution | Preferred retains shares but loses anti-dilution protection |

---

## 6. Waterfall Modeling Tools and Practices

### Tools

| Tool | Capability |
|------|-----------|
| Carta | Automated waterfall analysis based on cap table data |
| Pulley | Scenario modeling with exit waterfall visualization |
| Custom spreadsheet | Flexible but error-prone; necessary for complex structures |
| AngelCalc | Free online basic waterfall calculator |

### Best Practices

1. **Model at every round:** Before signing a term sheet, model the waterfall at realistic exit scenarios
2. **Include all instruments:** SAFEs, convertible notes, preferred, common, warrants, options
3. **Test edge cases:** What happens at low exits ($5M, $10M)? Who gets wiped out?
4. **Share with employees:** Provide scenario-based equity value estimates during hiring
5. **Update quarterly:** As the cap table changes, update the waterfall model
6. **Board presentation:** Include waterfall scenarios in board materials for strategic planning

### Common Waterfall Mistakes

| Mistake | Impact |
|---------|--------|
| Forgetting to stack preferences | Understates preference protection for later rounds |
| Ignoring participation rights | Dramatically underestimates investor take in mid-range exits |
| Not modeling SAFE conversion | SAFEs convert before common; changes common payout |
| Assuming proportional distribution | Without conversion analysis, payout estimates are wildly wrong |
| Ignoring escrowed or held-back amounts | In M&A, 5-15% is typically held in escrow for indemnification |
| Not accounting for transaction costs | Banker fees (2-5%), legal costs reduce distributable proceeds |

---

## References

- Feld, B. & Mendelson, J. (2019). *Venture Deals* (4th ed.). Wiley.
- NVCA. (2023). *Model Legal Documents — Certificate of Incorporation*.
- Metrick, A. & Yasuda, A. (2021). *Venture Capital and the Finance of Innovation* (3rd ed.). Wiley.
- Carta. (2024). *Waterfall Analysis and Exit Modeling Guide*.
- Wilson Sonsini. (2024). *Term Sheet Generator and Guide*.
