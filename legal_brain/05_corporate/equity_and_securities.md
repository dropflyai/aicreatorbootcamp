# Equity and Securities -- Securities Law, SAFEs, Convertible Notes, and Section 409A

> Module: `05_corporate/equity_and_securities.md`
> Brain: Legal Brain
> Authority: Domain-specific (corporate)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Securities Law Fundamentals

### 1.1 What Is a Security?

The Securities Act of 1933 and Securities Exchange Act of 1934 regulate the offer and sale of "securities." The *Howey* test (*SEC v. W.J. Howey Co.*, 328 U.S. 293 (1946)) defines an "investment contract" (and thus a security) as:

1. An investment of money
2. In a common enterprise
3. With an expectation of profits
4. Derived from the efforts of others

**Securities in the Startup Context:**
| Instrument | Security? | Notes |
|-----------|----------|-------|
| Common stock | Yes | Clearly a security |
| Preferred stock | Yes | Clearly a security |
| Stock options | Yes | Security upon issuance |
| SAFE | Yes | Investment contract under Howey |
| Convertible note | Yes | Both a debt security and investment contract |
| Revenue share agreement | Likely yes | Depends on structure |
| Cryptocurrency/token | Maybe | Depends on facts; SEC has been aggressive in classifying tokens as securities |

### 1.2 Registration Requirement

All offers and sales of securities must be registered with the SEC UNLESS an exemption applies. Registration (S-1 filing) is extremely expensive and time-consuming -- startups always rely on exemptions.

### 1.3 Key Exemptions

**Section 4(a)(2) -- Private Placement:**
- Exempts transactions "not involving any public offering"
- No specific rules; based on facts and circumstances
- Generally requires: sophisticated investors, limited number of offerees, no general solicitation, access to information
- Rarely relied on directly; Regulation D provides safe harbors

**Regulation D -- Safe Harbor for Private Placements:**

| Rule | Max Raise | Investor Requirements | General Solicitation | SEC Filing |
|------|-----------|---------------------|---------------------|-----------|
| 506(b) | Unlimited | Unlimited accredited; up to 35 sophisticated non-accredited | Prohibited | Form D (within 15 days) |
| 506(c) | Unlimited | All accredited (must verify) | Permitted | Form D (within 15 days) |
| 504 | $10M in 12 months | No restrictions (but state law may impose) | Depends on state law | Form D |

**Rule 506(b) -- Most Common for Startups:**
- No limit on amount raised
- Up to 35 non-accredited but "sophisticated" investors (but practically, investors are almost always accredited)
- No general solicitation or general advertising (cannot tweet about your round, post on social media, or use public platforms to find investors)
- No SEC review of offering documents
- Federal preemption of state blue sky registration (but must file notice in states where securities are sold)

**Rule 506(c) -- Permits General Solicitation:**
- Same as 506(b) but ALL investors must be accredited
- Must take "reasonable steps" to verify accredited status (tax returns, bank statements, broker-dealer confirmation, third-party verification services)
- Used for: crowdfunding platforms, public fundraising, AngelList syndicates
- Verification burden makes this less popular for traditional VC rounds

### 1.4 Accredited Investor Definition (SEC Rule 501(a))

**Individuals (any one of the following):**
- Net worth exceeding $1M (excluding primary residence), individually or with spouse/partner
- Income exceeding $200K in each of the two most recent years (or $300K joint with spouse/partner), with reasonable expectation of reaching same in current year
- Holders of Series 7, 65, or 82 licenses in good standing
- "Knowledgeable employees" of a private fund (for investments in that fund)

**Entities:**
- Bank, insurance company, registered investment company, registered broker-dealer
- Business development company
- Organization with total assets exceeding $5M (not formed for the specific purpose of acquiring the securities)
- Entity in which all equity owners are accredited investors (family trusts, LLCs)
- SEC and state-registered investment advisers (and their advised funds)

### 1.5 Form D Filing

- Must be filed with the SEC within 15 days of the first sale of securities under Regulation D
- Filed electronically via EDGAR
- Contains: company information, offering amount, exemption claimed, use of proceeds, investor types
- Public document (investors, competitors, and journalists can see it)
- Failure to file timely does not invalidate the exemption (under current SEC guidance) but may trigger state consequences

### 1.6 Blue Sky Laws

- State securities laws that supplement federal law
- Rule 506 offerings are preempted from state registration requirements (National Securities Markets Improvement Act)
- BUT: States can require notice filings and collect fees (and they do)
- Must file in each state where a purchaser resides
- Typical cost: $100-500 per state
- Some states (e.g., California) have aggressive enforcement of notice filing requirements

---

## 2. SAFE Mechanics

### 2.1 What Is a SAFE?

A SAFE (Simple Agreement for Future Equity), created by Y Combinator in 2013, is an agreement to issue equity in a future priced round. It is NOT debt (no interest rate, no maturity date, no repayment obligation).

### 2.2 Key Terms

**Valuation Cap:**
- Maximum valuation at which the SAFE converts to equity
- Example: $10M cap means if Series A is priced at $20M pre-money, the SAFE investor converts at $10M (getting 2x as many shares per dollar invested)

**Discount Rate:**
- Percentage discount to the Series A price
- Example: 20% discount means SAFE investor pays 80% of the Series A price per share
- If both cap and discount apply, investor gets the more favorable conversion rate

**Post-Money vs. Pre-Money SAFEs:**
- **Post-Money SAFE (current Y Combinator standard):** Valuation cap includes the SAFE investment amount. Founder dilution is more predictable.
- **Pre-Money SAFE (older version):** Valuation cap does not include the SAFE amount. Founder dilution depends on total SAFE amount (less predictable).

### 2.3 Conversion Mechanics

**Equity Financing (Priced Round):**
The SAFE converts into shares of the preferred stock issued in the next qualifying equity financing.

**Conversion Price = Lower of:**
1. Valuation Cap / Company Capitalization (post-money SAFE)
2. Price per Share of new round x (1 - Discount)

**Liquidity Event (Before Conversion):**
If the company is acquired before a priced round:
- Investor can choose: (a) cash payment equal to investment amount, or (b) convert into common stock at cap valuation

**Dissolution Event:**
- Investor receives cash payment equal to investment amount (first priority after creditors, before common stockholders)

### 2.4 SAFE Stacking Problem

**Risk:** Raising too much on SAFEs at various caps creates unpredictable dilution when SAFEs convert in the Series A.

**Example:**
- $500K SAFE at $5M post-money cap
- $1M SAFE at $8M post-money cap
- $500K SAFE at $10M post-money cap
- Series A at $15M pre-money

All SAFEs convert at their respective caps, creating significant dilution for founders that may not be apparent until the Series A cap table is modeled.

**Best Practice:**
- Model the cap table with all SAFEs converting before agreeing to the next raise
- Keep total SAFE amount reasonable relative to expected Series A
- Use consistent terms (same cap) across a round of SAFE financing if possible
- Use post-money SAFEs (dilution is more transparent)

---

## 3. Convertible Notes

### 3.1 Key Terms

| Term | Description | Typical Range |
|------|------------|--------------|
| Principal | Investment amount | Varies |
| Interest Rate | Annual interest on principal | 2-8% (typically 5-6%) |
| Maturity Date | When note becomes due if not converted | 18-24 months |
| Valuation Cap | Maximum conversion valuation | Negotiated |
| Discount | Discount to qualified financing price | 15-25% (typically 20%) |
| Qualified Financing | Minimum raise triggering mandatory conversion | $1M-5M |

### 3.2 Convertible Note vs. SAFE

| Feature | Convertible Note | SAFE |
|---------|-----------------|------|
| Debt? | Yes (on balance sheet) | No |
| Interest | Yes (accrues) | No |
| Maturity date | Yes (creates leverage for investors) | No |
| Complexity | Higher | Lower |
| Negotiation points | More (interest, maturity, conversion events) | Fewer (cap, discount) |
| Standard documents | Varies | Y Combinator standardized |
| Tax treatment | Debt (interest deduction for company) | Not debt; unclear tax treatment |
| Bankruptcy priority | Creditor (above equity) | Not a creditor (arguably) |

### 3.3 Maturity Date Dynamics

When a convertible note matures without a conversion event:
- **Technically:** The investor can demand repayment of principal + accrued interest
- **Practically:** Most investors extend the maturity date because demanding repayment could bankrupt the company
- **Risk:** Aggressive investors could use maturity as leverage for better terms
- **Mitigation:** Include automatic extension provisions, or conversion at cap at maturity

---

## 4. Priced Round Mechanics

### 4.1 Term Sheet Key Terms

**Economic Terms:**
| Term | Description |
|------|------------|
| Pre-money valuation | Company value before the investment |
| Post-money valuation | Pre-money + investment amount |
| Price per share | Pre-money / fully-diluted shares |
| Investment amount | Total dollars invested |
| Option pool | Shares reserved for employee equity grants (typically 10-20%, expanded pre-money) |
| Liquidation preference | Amount preferred stockholders receive before common in a liquidation event |
| Participation | Whether preferred participate in remaining proceeds after receiving liquidation preference |
| Anti-dilution | Protection against future down rounds (weighted average vs. full ratchet) |

**Control Terms:**
| Term | Description |
|------|------------|
| Board composition | Number and nomination rights for board seats |
| Protective provisions | Veto rights for preferred stockholders |
| Drag-along | Right to force sale if specified majority approves |
| Information rights | Financial reporting, cap table access |
| Pro rata rights | Right to invest in future rounds to maintain ownership % |
| ROFR | Company and/or investor right to purchase shares before third-party transfers |

### 4.2 Option Pool Shuffle

**What It Is:**
Investors typically require the option pool to be established or expanded BEFORE the investment (pre-money), meaning the dilution from the option pool falls on existing stockholders, not on the new investors.

**Example:**
- Pre-money valuation: $10M
- New investment: $5M
- Option pool: 15% post-money
- Effective pre-money valuation for founders: $10M - $2.25M (option pool expansion) = $7.75M
- This is the "option pool shuffle" -- investors get 33.3% for $5M, but founders' effective valuation is lower than the headline $10M

### 4.3 Liquidation Preferences

**1x Non-Participating Preferred (Standard/Preferred by Founders):**
- In a liquidation event, preferred gets the greater of: (a) 1x their investment back, or (b) their pro rata share as if converted to common
- This is the market standard and most founder-friendly preference

**1x Participating Preferred (Investor-Friendly; "Double Dip"):**
- Preferred gets 1x their investment back FIRST, then participates pro rata in remaining proceeds
- Rarely justified at seed/Series A; may appear in later rounds or down rounds
- May have a cap on participation (e.g., 3x)

**Multiple Liquidation Preference (>1x):**
- Preferred gets 2x or 3x their investment before common receives anything
- Only seen in distressed situations, down rounds, or bridge financings with punitive terms
- Strongly resist; restructuring > accepting multiples

---

## 5. Section 409A Compliance

### 5.1 What Is 409A?

IRC Section 409A governs deferred compensation, including stock options. Stock options must be granted at fair market value (FMV) as of the grant date. If the exercise price is below FMV, the option is treated as deferred compensation, triggering:
- Immediate income recognition (even if option not yet exercised)
- 20% additional tax penalty
- Interest penalty from the date the option vested

### 5.2 409A Valuation Requirements

**Safe Harbor:** An independent 409A valuation provides a presumption that the exercise price equals FMV.

**Valuation Methods:**
- **Independent appraisal:** Most common for VC-backed startups. Conducted by qualified valuation firms (Carta 409A, Shareworks, Eqvista, independent appraisers).
- **Startup safe harbor:** For startups <10 years old with no publicly traded securities, a valuation by a person with relevant knowledge and experience can qualify.
- **Formula-based:** If consistently used and applied; less common for tech startups.

**When to Update:**
- After each funding round (new valuation baseline)
- After a material event (significant revenue change, pivoting, major customer win/loss, IP milestone)
- At least annually (12-month shelf life maximum; many companies refresh every 6-12 months)
- Before any option grants

### 5.3 Practical Implications

- Do NOT grant options between a funding round and the completion of the 409A valuation
- Do NOT backdate option grants to take advantage of a lower strike price
- Document the valuation process and the board's reliance on it
- If the company's actual performance significantly exceeds the 409A valuation, consider whether the valuation is still defensible

---

## 6. Rule 701 -- Compensatory Securities

### 6.1 Overview

Rule 701 under the Securities Act exempts securities issued pursuant to written compensatory benefit plans (stock option plans, RSU plans) from registration requirements.

**Requirements:**
- Must be issued under a written compensatory plan or written contract
- Must be issued to employees, directors, consultants, or advisors
- Limited to natural persons (not entities, with limited exceptions)
- Total amount sold in any 12-month period must not exceed the greater of: (a) $1M, (b) 15% of total assets, or (c) 15% of outstanding securities of that class

**Disclosure Requirements (if >$10M in 12-month period):**
- Must provide plan summary
- Risk factors
- Financial statements (audited if available)

### 6.2 Practical Considerations

- Rule 701 is critical for startup equity programs (without it, every option grant would require securities registration)
- Track aggregate Rule 701 issuances to ensure compliance with limits
- As the company grows, the $10M disclosure threshold may be triggered
- Upon IPO, Rule 701 shares become subject to registration or Rule 144 resale limitations

---

## 7. Cap Table Management

### 7.1 Cap Table Best Practices

- Use cap table management software (Carta, Pulley, Shareworks, AngelList Stack)
- Model fully-diluted cap table including: outstanding shares, unexercised options, option pool remainder, SAFEs/notes (as if converted), warrants
- Keep cap table current (update within 24 hours of any equity event)
- Reconcile cap table with transfer agent records regularly
- Model different scenarios (next round pricing, exit scenarios, option pool expansion)

### 7.2 Common Cap Table Mistakes

| Mistake | Consequence | Prevention |
|---------|------------|------------|
| Using spreadsheets instead of purpose-built tools | Errors, version confusion, formula mistakes | Use Carta, Pulley, or equivalent |
| Not modeling SAFE/note conversion | Surprise dilution at next round | Model all outstanding convertible instruments |
| Forgetting to account for option pool expansion | Overestimating founder ownership | Include expanded pool in fully-diluted count |
| Issuing shares without board approval | Potentially void issuance; securities violation | Always obtain board resolution before issuance |
| Not tracking 83(b) elections | Tax compliance gaps | Maintain filing records for all founders/early employees |
| Losing stock certificates | Complicates transfers and M&A | Use electronic records; consider uncertificated shares |

---

*Reference: Securities Act of 1933; Securities Exchange Act of 1934; Regulation D (17 CFR 230.501-506); SEC v. W.J. Howey Co., 328 U.S. 293 (1946); IRC Section 409A; IRC Section 701; Y Combinator SAFE documents; NVCA Model Legal Documents; Feld & Mendelson, Venture Deals (4th ed.).*
