# Cap Table Management — Equity Structure and Administration

## The Cap Table as Financial Source of Truth

The capitalization table is the definitive record of a company's equity ownership structure. It documents every share of stock — authorized, issued, and outstanding — every option grant, every convertible instrument, and the resulting ownership percentages. A clean, accurate cap table is foundational to every subsequent financial decision: fundraising, hiring, M&A, and exits. Errors in cap table management compound over time and can become existentially expensive to unravel during due diligence.

---

## 1. Fundamental Concepts

### Share Classes and Authorization

**Authorized Shares:** The maximum number of shares the company may issue, set in the Certificate of Incorporation. Typical early-stage: 10,000,000 shares authorized.

**Issued and Outstanding:** Shares that have been actually issued to shareholders. Always fewer than or equal to authorized.

**Fully Diluted Shares:** All issued shares plus all shares that could be issued through the exercise of options, warrants, and conversion of convertible instruments. This is the denominator used in most ownership calculations.

```
Cap Table Structure:
┌──────────────────────────────────────────────────────┐
│                AUTHORIZED SHARES                      │
│                (10,000,000)                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ISSUED & OUTSTANDING          RESERVED/UNISSUED     │
│  ┌──────────────────────┐     ┌────────────────────┐ │
│  │ Common Stock          │     │ Option Pool        │ │
│  │ (Founders, employees, │     │ (Available for     │ │
│  │  early investors)     │     │  future grants)    │ │
│  │                      │     │                    │ │
│  │ Preferred Stock       │     │ Authorized but     │ │
│  │ (Series Seed, A, B)  │     │ Unissued           │ │
│  └──────────────────────┘     └────────────────────┘ │
│                                                      │
│  CONVERTIBLE INSTRUMENTS (off cap table until convert)│
│  ┌──────────────────────────────────────────────────┐│
│  │ SAFEs, Convertible Notes                         ││
│  │ (Convert to shares at next priced round)         ││
│  └──────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────┘
```

### Fully Diluted Ownership Calculation

```
Fully Diluted Shares =
  Common shares outstanding +
  Preferred shares outstanding (on as-converted basis) +
  All vested and unvested options granted +
  Shares reserved in option pool (issued + unissued) +
  Shares from SAFE/note conversion (estimated)

Ownership % = Shares held / Fully Diluted Shares * 100
```

---

## 2. Option Pool

### What Is the Option Pool?

The option pool is a block of shares reserved for future employee equity grants. It is typically created or expanded at each fundraising round, at the insistence of investors, and is sized as a percentage of the fully diluted cap table.

**Typical Pool Sizes:**

| Stage | Pool Size (% of Fully Diluted) | Purpose |
|-------|-------------------------------|---------|
| Pre-Seed/Seed | 10-15% | First 10-20 hires |
| Series A | 15-20% (refreshed) | Scale team to 50+ |
| Series B | 10-15% (refreshed) | Continued hiring + retention |
| Pre-IPO | 5-10% (refreshed) | IPO readiness, retention |

### Pool Mechanics

- Pool is created from authorized but unissued shares
- Pool expansion dilutes existing shareholders (primarily founders)
- Investors typically require the pool be created/expanded BEFORE their investment (pre-money)
- This means founders bear the dilution of the pool, not the new investors

**Pre-Money vs. Post-Money Pool Impact:**

```
Example: $5M investment at $20M pre-money valuation

Pre-Money Pool (Standard — Investor Friendly):
  Pool created at $20M pre-money
  Founder dilution: Pool comes from founders' share
  Investor owns: $5M / $25M post = 20.0%

Post-Money Pool (Founder Friendly — Rare):
  Pool created at $25M post-money
  Dilution shared between founders and investors
  Investor effective ownership slightly lower
```

---

## 3. SAFEs on the Cap Table

### SAFE Mechanics

A SAFE (Simple Agreement for Future Equity) is a contractual right to receive equity in a future priced round. SAFEs do not represent current ownership — they convert to shares when a trigger event occurs (typically the next equity financing).

**SAFE Types (Y Combinator Standard):**

| Type | Valuation Cap | Discount | Converts At |
|------|--------------|----------|-------------|
| Cap only | Yes | No | Lower of cap price or round price |
| Discount only | No | Yes (typically 20%) | Discounted round price |
| Cap + Discount | Yes | Yes | Best (lowest) of cap price or discounted price |
| MFN (Most Favored Nation) | No | No | Matches best terms given to subsequent SAFEs |

### SAFE Conversion Calculations

**Post-Money SAFE (Current Y Combinator Standard):**

The post-money SAFE sets the ownership percentage at the time of investment:

```
SAFE Investment: $500K
Post-Money Valuation Cap: $5M
SAFE Ownership at Conversion: $500K / $5M = 10%

Multiple SAFEs stack:
SAFE 1: $500K at $5M cap = 10%
SAFE 2: $250K at $5M cap = 5%
Total SAFE dilution at conversion: 15%
```

**Pre-Money SAFE (Older Standard):**

```
SAFE Investment: $500K
Pre-Money Valuation Cap: $5M
Share price at conversion: $5M / Pre-money fully diluted shares
Shares issued: $500K / Share price
```

### Modeling SAFEs on the Cap Table

SAFEs should be tracked on a "shadow" cap table showing estimated conversion:

| Instrument | Amount | Cap | Discount | Est. Conversion Shares | Est. % Ownership |
|-----------|--------|-----|----------|----------------------|-----------------|
| SAFE 1 | $500K | $5M post | None | [Calculate at conversion] | ~10% |
| SAFE 2 | $250K | $5M post | None | [Calculate at conversion] | ~5% |
| SAFE 3 | $100K | $8M post | 20% | [Calculate at conversion] | ~1.25% |

---

## 4. Pro-Forma Modeling

### What Is a Pro-Forma Cap Table?

A pro-forma cap table models the ownership structure after a hypothetical event: a new funding round, option pool expansion, SAFE conversion, or exit. Pro-forma modeling is essential for:

- Fundraising: What will ownership look like post-investment?
- Option grants: How much dilution does each grant cause?
- Exit scenarios: Who gets what at different exit valuations?

### Pro-Forma Round Modeling

```
Example: Series A at $10M pre-money, $3M investment

CURRENT (PRE-ROUND):
Founders: 8,000,000 shares (80%)
Option Pool: 2,000,000 shares (20%)
Total: 10,000,000 shares

SAFEs Outstanding: $750K at $5M post-money cap

STEP 1: SAFE Conversion
SAFE ownership: $750K / $5M = 15%
SAFE shares: 15% / 85% * 10,000,000 = 1,764,706 new shares
New total: 11,764,706 shares

STEP 2: New Option Pool (20% post-money target)
Post-money = $10M pre + $3M = $13M
Pool target: 20% of fully diluted post-money
Pool math: Iterative calculation to hit 20% target

STEP 3: Series A Investment
Price per share: $10M pre / fully diluted pre-money shares
New shares to investor: $3M / price per share

PRO-FORMA POST-ROUND:
Founders: X shares (Y%)
SAFE Investors: X shares (Y%)
Option Pool: X shares (20%)
Series A: X shares (Z%)
Total: X shares (100%)
```

---

## 5. 409A Valuation

### What Is 409A?

Section 409A of the Internal Revenue Code requires that stock options be granted at fair market value (FMV). The 409A valuation is an independent appraisal that determines the FMV of common stock. Without a current 409A, the company and option holders face severe tax penalties.

**409A Requirements:**

| Requirement | Specification |
|-------------|--------------|
| Independence | Must be performed by a qualified independent appraiser |
| Frequency | New valuation required at least every 12 months, or after a "material event" |
| Material events | Fundraising round, significant revenue change, M&A, major contract, pivot |
| Safe harbor | Following IRS-approved methodologies provides "reasonable" presumption of FMV |
| Timing | Must be obtained BEFORE granting options at that strike price |

**Typical 409A Values:**

| Stage | 409A as % of Last Preferred Price |
|-------|----------------------------------|
| Pre-revenue startup | 10-25% of preferred price |
| Post-revenue, pre-profit | 25-40% of preferred price |
| Growth stage | 40-60% of preferred price |
| Late stage / pre-IPO | 60-90% of preferred price |

### 409A Valuation Methods

| Method | Description | When Used |
|--------|-----------|-----------|
| Market approach | Comparable company analysis, recent transaction comparables | Most common for VC-backed startups |
| Income approach | Discounted cash flow (DCF) of projected future earnings | Revenue-stage companies |
| Asset approach | Net asset value of company | Rarely used for tech companies |
| Option pricing method (OPM) | Black-Scholes model to allocate value between preferred and common | Standard for multi-class cap tables |
| Probability-weighted expected return (PWERM) | Weighted scenarios of possible outcomes | Near-exit companies |

---

## 6. Cap Table Management Tools

### Tool Comparison

| Tool | Best For | Pricing | Key Features |
|------|----------|---------|-------------|
| Carta | Standard for VC-backed startups | $$$$ (scales with company) | Cap table, 409A, equity plans, fund admin |
| Pulley | Cost-conscious startups | $-$$ | Cap table, scenario modeling, clean UX |
| Shareworks (Morgan Stanley) | Large companies, pre-IPO | $$$$ | Complex equity plans, global compliance |
| AngelList Stack | AngelList ecosystem companies | $ | SAFE management, rolling funds, banking |
| Spreadsheets | Very early stage (temporary only) | Free | Flexible but error-prone and not auditable |

### When to Move from Spreadsheets to Software

Move to dedicated cap table software when ANY of these triggers occur:
- More than 5 shareholders
- First priced equity round (Series Seed or later)
- First employee option grants
- Multiple SAFE/note holders
- Board or investor requests for cap table access
- 409A valuation needed

### Cap Table Hygiene Best Practices

1. **Single source of truth:** One system of record, not multiple spreadsheets
2. **Real-time accuracy:** Update immediately when equity events occur
3. **Audit trail:** Every change documented with timestamp and reason
4. **Access control:** Only authorized personnel can modify; investors get read-only
5. **Regular reconciliation:** Quarterly reconciliation against legal documents
6. **Document linkage:** Every cap table entry linked to its legal document (stock purchase agreement, option grant, SAFE)
7. **Scenario modeling:** Always model before executing equity events

---

## 7. Common Cap Table Mistakes

| Mistake | Consequence | Prevention |
|---------|------------|-----------|
| Not tracking SAFEs on the cap table | Surprise dilution at conversion | Shadow cap table with SAFE conversion estimates |
| Granting options without current 409A | Tax penalties for company and employees | Maintain current 409A at all times |
| Incorrect fully diluted calculation | Misleading ownership percentages | Include all instruments in denominator |
| Not updating after each equity event | Stale data leads to bad decisions | Update within 48 hours of any equity event |
| Insufficient authorized shares | Cannot issue shares; requires board/shareholder approval | Authorize 2-3x expected need |
| Promise equity verbally without documentation | Legal disputes, unrecorded liabilities | All equity promises in writing, on cap table |
| Cap table on spreadsheet past seed stage | Errors, version control issues, audit failures | Migrate to Carta/Pulley by Series A |

---

## References

- Feld, B. & Mendelson, J. (2019). *Venture Deals* (4th ed.). Wiley.
- Y Combinator. (2023). *SAFE: Simple Agreement for Future Equity* (Post-Money).
- NVCA. (2023). *Model Legal Documents*.
- IRS. (2024). *Section 409A: Nonqualified Deferred Compensation Plans*.
- Carta. (2024). *Cap Table Management Best Practices Guide*.
