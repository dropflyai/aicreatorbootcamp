# Investor Brain -- Glossary

## Purpose

This glossary defines the precise terminology used throughout the Investor Brain.
Terms are organized by domain. All definitions align with NVCA model documents,
Brad Feld's "Venture Deals", and standard Silicon Valley usage.

---

## Fundraising Fundamentals

### Valuation Terms

| Term | Definition | Formula/Example |
|------|-----------|-----------------|
| **Pre-Money Valuation** | Company value before new investment | Negotiated between founder and investor |
| **Post-Money Valuation** | Company value after new investment | Post-Money = Pre-Money + Investment Amount |
| **Fully Diluted Shares** | Total shares including all options, warrants, convertibles | Outstanding + Option Pool + Convertible Shares |
| **Price Per Share (PPS)** | Price of one share in a priced round | PPS = Pre-Money Valuation / Fully Diluted Shares |
| **409A Valuation** | Independent fair market value of common stock | Typically 25-35% of latest preferred PPS |
| **Enterprise Value** | Total company value including debt | Market Cap + Debt - Cash |

### Round Terminology

| Term | Definition | Context |
|------|-----------|---------|
| **Pre-Seed** | First institutional/angel capital, typically $50K-$1M | Idea to early prototype stage |
| **Seed** | First significant fundraise, typically $1M-$4M | Product-market fit exploration |
| **Series A** | First priced institutional round, typically $5M-$15M | Proven PMF, scaling go-to-market |
| **Series B** | Growth round, typically $15M-$50M | Scaling proven model |
| **Series C+** | Late-stage growth, typically $50M+ | Market expansion, path to exit |
| **Bridge Round** | Interim financing between major rounds | Extends runway to next milestone |
| **Extension Round** | Additional capital at same terms as previous round | Existing investors provide more capital |
| **Down Round** | Round at lower valuation than previous | Triggers anti-dilution provisions |
| **Flat Round** | Round at same valuation as previous | Neither up nor down |
| **Inside Round** | Round led by existing investors only | No new external validation |

---

## Term Sheet Economics

### Liquidation Preferences

| Term | Definition | Impact |
|------|-----------|--------|
| **Liquidation Preference** | Priority payment to preferred shareholders in exit | Determines payout order |
| **1x Non-Participating** | Investor gets back investment OR converts to common (not both) | Most founder-friendly preferred structure |
| **1x Participating** | Investor gets back investment AND shares in remaining proceeds | Double-dip; unfavorable for founders |
| **Participating with Cap** | Participating preference with maximum return cap | Middle ground; cap limits double-dip |
| **Multiple (2x, 3x)** | Investor gets 2x or 3x investment before common participates | Highly unfavorable for founders |
| **Seniority** | Later rounds paid before earlier rounds in liquidation | Standard in multi-round companies |
| **Pari Passu** | All preferred shares have equal liquidation priority | Less common; flattens the stack |

**Liquidation Waterfall Example (1x Non-Participating):**

```
Company sold for $50M
Series A invested $5M for 20% (1x non-participating preferred)

Option 1: Take liquidation preference → $5M
Option 2: Convert to common → 20% of $50M = $10M

Rational choice: Convert to common ($10M > $5M)
Common shareholders receive: $50M - $0 preference = $50M pro rata
```

**Liquidation Waterfall Example (1x Participating):**

```
Company sold for $50M
Series A invested $5M for 20% (1x participating preferred)

Step 1: Series A gets $5M liquidation preference
Step 2: Remaining $45M distributed pro rata to all (including Series A)
Step 3: Series A additional: 20% of $45M = $9M
Total to Series A: $5M + $9M = $14M (28% of exit, despite owning 20%)
```

### Anti-Dilution Provisions

| Term | Definition | Impact on Founders |
|------|-----------|-------------------|
| **Full Ratchet** | Reprices ALL prior preferred shares to new lower price | Devastating dilution to founders |
| **Broad-Based Weighted Average** | Adjusts conversion price using weighted formula | Standard, most common, least punitive |
| **Narrow-Based Weighted Average** | Same formula but excludes some share classes | More punitive than broad-based |
| **Pay-to-Play** | Investors must participate in down round or lose anti-dilution | Protects founders; encourages investor follow-on |

**Broad-Based Weighted Average Formula:**

```
NCP = OCP * (CSO + CSP) / (CSO + CSA)

Where:
NCP = New Conversion Price
OCP = Old Conversion Price
CSO = Common Stock Outstanding (fully diluted)
CSP = Common Stock Purchasable at OCP with new money
CSA = Common Stock Actually purchased with new money

EXAMPLE:
Series A at $1.00/share, 10M shares outstanding
Down round: $0.50/share for $1M (2M new shares)

CSP = $1M / $1.00 = 1M shares
CSA = $1M / $0.50 = 2M shares

NCP = $1.00 * (10M + 1M) / (10M + 2M)
NCP = $1.00 * 11M / 12M
NCP = $0.917/share (vs $0.50 under full ratchet)
```

---

## Control and Governance

### Board Terms

| Term | Definition | Significance |
|------|-----------|--------------|
| **Board Seat** | Voting position on board of directors | Controls major company decisions |
| **Board Observer** | Non-voting attendee at board meetings | Information rights without control |
| **Independent Director** | Board member not affiliated with founders or investors | Tiebreaker in deadlocked boards |
| **Protective Provisions** | Veto rights held by preferred shareholders | Can block specific company actions |
| **Drag-Along Rights** | Majority can force minority to accept acquisition | Prevents minority hold-up in exits |
| **Tag-Along Rights** | Minority can join majority in share sale | Protects minority from being left out |
| **ROFR** | Right of First Refusal -- right to match third-party offers | Controls secondary share transfers |
| **Co-Sale Rights** | Right to sell alongside founders in secondary sales | Ensures pro-rata participation |

### Voting and Approval

| Term | Definition | Typical Threshold |
|------|-----------|------------------|
| **Supermajority** | Requiring more than simple majority to approve | Usually 66.7% or 75% |
| **Consent Rights** | Actions requiring specific shareholder class approval | Protective provisions |
| **Founder Vesting** | Founders earn equity over time | Standard: 4-year vest, 1-year cliff |
| **Acceleration** | Vesting speeds up on trigger events | Single-trigger or double-trigger |
| **Single-Trigger** | Full vesting on acquisition alone | Investor-unfriendly; uncommon |
| **Double-Trigger** | Full vesting on acquisition + termination | Standard for founder protection |

---

## Convertible Instruments

### SAFEs (Simple Agreement for Future Equity)

| Term | Definition | Standard Value |
|------|-----------|---------------|
| **SAFE** | Y Combinator instrument; right to future equity | Not debt; no interest or maturity |
| **Valuation Cap** | Maximum valuation for conversion to equity | Sets best-case price for SAFE holder |
| **Discount** | Percentage discount to next round price | Typically 15-25% |
| **MFN** | Most Favored Nation -- gets best terms of any SAFE | Protects early SAFE investors |
| **Pro-Rata Right** | Right to invest in future rounds to maintain ownership | Standard in YC post-money SAFEs |
| **Post-Money SAFE** | Cap includes SAFE amount in post-money calculation | YC standard since 2018; clearer dilution |
| **Pre-Money SAFE** | Cap does not include SAFE amount | Original SAFE; harder to model dilution |

**SAFE Conversion Example (Post-Money SAFE):**

```
SAFE: $500K on $5M post-money cap
Series A: $10M pre-money, $2M raise, $12M post-money

SAFE Conversion Price = $5M cap / fully diluted shares at cap
If 10M shares outstanding: $5M / 10M = $0.50/share
SAFE gets: $500K / $0.50 = 1,000,000 shares

Series A Price: $10M / 10M existing + 1M SAFE shares = $0.909/share
Series A gets: $2M / $0.909 = 2,200,000 shares

SAFE holder ownership: 1M / 13.2M total = 7.58%
```

### Convertible Notes

| Term | Definition | Standard Value |
|------|-----------|---------------|
| **Convertible Note** | Debt that converts to equity | Has interest rate and maturity date |
| **Interest Rate** | Annual interest accruing on principal | Typically 4-8% |
| **Maturity Date** | Date when note must be repaid or converted | Typically 18-24 months |
| **Qualified Financing** | Minimum raise that triggers automatic conversion | Typically $1M+ |
| **Conversion Discount** | Discount to qualified financing price | Typically 15-25% |
| **Valuation Cap** | Maximum valuation for conversion | Same concept as SAFE cap |

---

## Fund Economics

### VC Fund Structure

| Term | Definition | Typical Value |
|------|-----------|---------------|
| **LP** | Limited Partner -- fund investor | Pension funds, endowments, family offices |
| **GP** | General Partner -- fund manager (the VC) | Makes investment decisions |
| **Management Fee** | Annual fee paid to GP for operations | 2% of committed capital |
| **Carried Interest (Carry)** | GP share of fund profits | 20% of profits above hurdle |
| **Hurdle Rate** | Minimum return before carry kicks in | Typically 8% IRR |
| **DPI** | Distributions to Paid-In capital | Cash returned / cash invested |
| **TVPI** | Total Value to Paid-In capital | (Distributions + NAV) / cash invested |
| **MOIC** | Multiple on Invested Capital | Total return / total invested |
| **Vintage Year** | Year fund began investing | Used for benchmarking |
| **Fund Lifecycle** | Total life of the fund | Typically 10 years + 2 extensions |
| **Recycling** | Reinvesting early returns into new deals | Increases effective fund size |
| **Capital Call** | Request from GP to LPs to send committed capital | Drawn down over 3-5 years |

---

## Exit and Liquidity

| Term | Definition | Context |
|------|-----------|---------|
| **IPO** | Initial Public Offering | Company sells shares on public exchange |
| **Direct Listing** | Shares listed without new capital raise | No dilution; existing shares trade |
| **SPAC** | Special Purpose Acquisition Company | Blank check company merges with target |
| **M&A** | Merger and Acquisition | Company acquired by another entity |
| **Acqui-hire** | Acquisition primarily for team/talent | Low exit value for investors |
| **Secondary Sale** | Sale of existing shares (no new capital to company) | Founder/employee liquidity |
| **Tender Offer** | Structured share buyback program | Company or third party buys shares |
| **Lock-up Period** | Post-IPO period when insiders cannot sell | Typically 90-180 days |
| **Registration Rights** | Right to have shares included in public offering | Demand registration vs. piggyback |

---

## Metrics Investors Track

| Metric | Definition | Good Benchmark (Seed/A) |
|--------|-----------|------------------------|
| **MRR** | Monthly Recurring Revenue | >$50K for Series A |
| **ARR** | Annual Recurring Revenue | >$1M for Series A |
| **MoM Growth** | Month-over-month revenue growth | >15% for seed, >10% for A |
| **Net Revenue Retention** | Revenue from existing cohorts over time | >120% = exceptional |
| **CAC** | Customer Acquisition Cost | Varies by model |
| **LTV** | Lifetime Value of customer | LTV/CAC > 3x |
| **Burn Multiple** | Net burn / net new ARR | <2x = efficient |
| **Rule of 40** | Growth rate + profit margin | >40% for growth-stage |
| **Gross Margin** | (Revenue - COGS) / Revenue | >70% for SaaS |
| **Payback Period** | Months to recover CAC | <18 months |
| **DAU/MAU** | Daily/Monthly Active Users | Ratio >25% = strong engagement |

---

## Legal Entities and Structures

| Term | Definition | When Used |
|------|-----------|-----------|
| **C-Corp** | Standard corporation for VC-backed companies | Required by most VCs (Delaware) |
| **Delaware C-Corp** | C-Corp incorporated in Delaware | Gold standard for VC-backed startups |
| **LLC** | Limited Liability Company | Not VC-compatible (pass-through issues) |
| **Stock Purchase Agreement (SPA)** | Definitive agreement for priced round | Replaces term sheet at closing |
| **Investor Rights Agreement (IRA)** | Agreement granting investor information/registration rights | Standard closing document |
| **Voting Agreement** | Agreement on board composition and voting | Standard closing document |
| **ROFR/Co-Sale Agreement** | Agreement on share transfer restrictions | Standard closing document |

---

**This glossary is the definitive reference for terminology within the Investor Brain.
All modules use these terms consistently. When external sources use variant terminology,
this glossary governs.**
