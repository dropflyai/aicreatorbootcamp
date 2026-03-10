# Corporate Formation -- Entity Selection, Incorporation, and Founder Agreements

> Module: `05_corporate/corporate_formation.md`
> Brain: Legal Brain
> Authority: Domain-specific (corporate)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Entity Selection

### 1.1 Entity Types Compared

| Feature | C-Corporation | S-Corporation | LLC | Sole Proprietorship |
|---------|-------------|-------------|-----|-------------------|
| Liability protection | Yes | Yes | Yes | No |
| Separate tax entity | Yes (double taxation) | No (pass-through) | Flexible (default pass-through) | No |
| VC compatible | Yes | No (one class of stock) | Rarely | No |
| Number of shareholders | Unlimited | Max 100; US persons only | Unlimited; any entity type | 1 |
| Classes of stock | Multiple (common, preferred) | One class only | Flexible membership interests | N/A |
| Self-employment tax | Salary subject to FICA; dividends not | Salary subject to FICA; distributions not | Members may owe SE tax on all income | Yes, all income |
| 83(b) election | Yes (critical for founders) | Yes | N/A (different mechanism) | N/A |
| Qualified Small Business Stock (QSBS) | Yes (Section 1202 -- up to $10M or 10x basis exclusion) | No | No | No |
| State of formation | Delaware (standard) | Any state | Any state (Delaware or home state) | Home state |

### 1.2 Why Delaware C-Corp Is the Default for Venture-Backed Startups

1. **Investor expectation:** VCs require C-Corps. Preferred stock (the instrument of VC investment) requires multiple classes of stock, which S-Corps cannot issue and LLCs handle awkwardly.
2. **Delaware law advantages:** Well-developed corporate law (DGCL); Court of Chancery with expert judges and no juries; predictable precedent; corporate-friendly statutes.
3. **QSBS eligibility:** Section 1202 allows shareholders to exclude up to $10M (or 10x cost basis) of gain on sale of qualified small business stock held for 5+ years. This is one of the most valuable tax benefits available to founders and early employees.
4. **Standardized documents:** NVCA model documents, Y Combinator SAFEs, and most startup legal templates assume Delaware C-Corp.
5. **Stock option plans:** C-Corp structure enables ISOs (Incentive Stock Options) with favorable tax treatment for employees.

### 1.3 When LLC Is Appropriate

- **Bootstrapped business** with no intent to raise institutional VC
- **Real estate** holdings (pass-through taxation; liability isolation)
- **Holding company** for IP, real estate, or other assets
- **Service business** where pass-through taxation is beneficial
- **Multi-entity structures** (subsidiary LLCs under parent C-Corp)
- **Lifestyle business** where simplicity and tax efficiency matter more than VC compatibility

### 1.4 When S-Corp Is Appropriate

- **Small business** with US-person shareholders (no foreign shareholders, no entity shareholders)
- **Professional services** (consulting, law firm, medical practice) -- self-employment tax savings through reasonable salary + distributions
- **Limitation:** Cannot convert to C-Corp and issue preferred stock without tax consequences; must convert before raising VC

---

## 2. Formation Process (Delaware C-Corp)

### 2.1 Steps to Incorporate

**Step 1: Name Availability**
- Check Delaware Division of Corporations for name availability
- Check USPTO for trademark conflicts
- Check domain name availability
- Reserve name if needed (60-day reservation for $75 in Delaware)

**Step 2: File Certificate of Incorporation**
- File with Delaware Secretary of State
- Required contents: Corporate name, registered agent, purpose (general: "any lawful act or activity"), authorized shares (common + blank check preferred), incorporator name and address
- Filing fee: $89 (minimum franchise tax method) + registered agent fee ($50-300/year)
- Use authorized share structure: 10,000,000 shares of Common Stock ($0.0001 par value) + 10,000,000 shares of blank check Preferred Stock ($0.0001 par value)

**Step 3: Initial Board Actions (Organizational Resolutions)**
- Adopt bylaws
- Elect officers (CEO, Secretary, Treasurer at minimum)
- Authorize issuance of founder shares
- Adopt stock incentive plan (typically 10-15% of fully diluted shares)
- Authorize bank account
- Adopt initial fiscal year
- Ratify incorporator's actions

**Step 4: Founder Stock Issuance**
- Execute Stock Purchase Agreements between company and each founder
- Issue stock at par value ($0.0001/share) or nominal value
- Founder stock MUST be subject to vesting (see Section 3 below)
- Each founder files 83(b) election with IRS within 30 days

**Step 5: Qualify in Operating State(s)**
- If operating outside Delaware, file for foreign qualification in each operating state
- File annual franchise tax returns in Delaware and each qualified state
- Obtain EIN (Employer Identification Number) from IRS
- Register for state tax accounts as needed

### 2.2 Registered Agent

- Delaware requires a registered agent with a physical address in Delaware
- Service providers: CT Corporation, Cogency Global, Northwest Registered Agent, Legalinc, Clerky
- Annual cost: $50-300
- Purpose: Receive legal service of process and official state correspondence

### 2.3 Post-Formation Compliance

| Requirement | Frequency | Due Date |
|------------|-----------|----------|
| Delaware franchise tax | Annual | March 1 (file by Feb 28) |
| Delaware annual report | Annual | March 1 |
| Foreign qualification annual reports | Annual | Varies by state |
| Federal tax return (Form 1120) | Annual | April 15 (or extension) |
| State tax returns | Annual | Varies by state |
| Board meeting minutes | At least annually | Document all board actions |
| Stock ledger maintenance | Ongoing | Update with every issuance/transfer |

---

## 3. Founder Agreements

### 3.1 Standard Vesting Schedule

**Industry Standard: 4 years, 1-year cliff**

```
Year 1 (Cliff):  0% vested → 25% vests on 1-year anniversary
Year 2:          Monthly vesting (1/48 per month)
Year 3:          Monthly vesting (1/48 per month)
Year 4:          Monthly vesting (1/48 per month) → 100% vested
```

**Why Vesting Is Non-Negotiable:**
- Protects the company and co-founders if one founder leaves early
- Investors REQUIRE vesting (will impose it retroactively if not already in place)
- Prevents free-riding (founder leaves after 6 months with full equity)
- Can include acceleration provisions (single-trigger or double-trigger on change of control)

**Acceleration Provisions:**
- **Single-trigger:** Equity accelerates upon change of control (acquisition). Common: 25-50% acceleration.
- **Double-trigger:** Equity accelerates only if founder is terminated or constructively terminated within 12-24 months AFTER change of control. Industry standard; preferred by investors.

### 3.2 83(b) Elections

**What It Is:**
An election under IRC Section 83(b) that allows a founder to pay tax on stock at the time of grant (when value is near zero) rather than at the time of vesting (when value may be much higher).

**Why It Is Critical:**
- At incorporation, founder stock is worth fractions of a penny
- Without 83(b), each vesting increment is taxable at the then-current fair market value as ordinary income
- If the company succeeds, this could mean millions in ordinary income tax on vesting events
- With 83(b), founder pays tax on the full grant at the time of grant (near zero value), and all future appreciation is capital gain (taxed at lower rate)

**Filing Requirements:**
- Must be filed with the IRS within 30 days of the stock grant (NO EXCEPTIONS; this deadline is absolute)
- Send to IRS service center for taxpayer's jurisdiction
- Include a copy with that year's tax return
- Keep proof of filing (certified mail receipt, delivery confirmation)
- Founders have lost millions by missing this deadline

**83(b) Election Template (Core Content):**
The taxpayer elects under Section 83(b) to include in gross income the excess of the fair market value of the property over the amount paid:
- Taxpayer name, address, SSN
- Description of property (e.g., "X shares of Common Stock of [Company]")
- Date of transfer
- Taxable year of election
- Fair market value at time of transfer
- Amount paid for property
- Nature of restrictions (vesting schedule)

### 3.3 Founder IP Assignment

**Pre-Incorporation IP:**
- Any IP created by founders before incorporation that is related to the company's business must be assigned to the company
- Document in the Stock Purchase Agreement or separate IP Assignment Agreement
- Failure to assign pre-incorporation IP is a critical due diligence deficiency that can delay or kill fundraising/M&A

**Assignment Provisions:**
- "Hereby assigns" (present tense, self-executing) all right, title, and interest
- Covers: inventions, patents, copyrights, trade secrets, trademarks, know-how
- Includes obligation to execute further documents as needed (confirmatory assignments)
- Includes waiver of moral rights (where applicable)

### 3.4 Founder Restrictive Covenants

**Non-Compete:**
- Duration: Typically during employment/service + 12-24 months
- Scope: Activities competitive with the company's business
- Geography: Relevant market (or worldwide for internet businesses)
- Enforceability: Varies dramatically by state (see `03_intellectual_property/trade_secrets.md`)
- California: Void and unenforceable (do not include for CA-based founders, but include for founders in enforceable states)

**Non-Solicitation:**
- Employees: Cannot recruit company employees for 12-24 months after departure
- Customers: Cannot solicit company customers for 12-24 months after departure
- More enforceable than non-competes in most jurisdictions

**Confidentiality:**
- Indefinite for trade secrets; 2-5 years for general confidential information
- Survives termination of founder's relationship with company
- Covers: technical information, business plans, financials, customer lists, employee information

---

## 4. Multi-Entity Structures

### 4.1 Common Multi-Entity Structures

**Parent-Subsidiary:**
```
Delaware C-Corp (Parent)
├── Operating LLC (for liability isolation)
├── IP Holding LLC (for IP asset protection)
├── International Subsidiary Ltd (for local market operations)
└── SPV LLC (for specific project/funding)
```

**When to Use Multi-Entity Structures:**
- Liability isolation (separate high-risk operations from core assets)
- Tax optimization (IP holding company in favorable jurisdiction)
- International operations (local entity required or advantageous)
- Joint ventures (separate entity for shared ventures)
- Regulatory requirements (licensed entity in regulated industry)

### 4.2 Transfer Pricing

When related entities transact with each other (e.g., IP holding company licenses IP to operating company), the transfer price must be at arm's length per IRC Section 482 and OECD Transfer Pricing Guidelines.

**Relevance for Startups:**
- Usually not an issue until international entities exist
- Becomes critical during expansion (IP, management fees, intercompany services)
- Penalties for non-compliance are severe (20-40% of underpayment)
- Documentation requirements: contemporaneous transfer pricing documentation

---

## 5. Conversion Mechanics

### 5.1 LLC to C-Corp Conversion

**When This Happens:**
- Bootstrapped company initially formed as LLC now wants to raise VC funding
- Must convert to C-Corp before raising institutional capital

**Methods:**
1. **Statutory conversion:** Most states allow direct conversion by filing (simplest)
2. **Merger:** LLC merges into newly formed C-Corp
3. **Asset transfer:** LLC transfers assets to new C-Corp in exchange for stock (most complex, potential tax issues)

**Tax Consequences:**
- Generally treated as a tax-free incorporation under IRC Section 351 (if properly structured)
- LLC members receive C-Corp stock in exchange for their membership interests
- Must meet requirements: transferors must control 80%+ of corporation after transfer
- Consult tax counsel -- improper structuring can trigger taxable gain

### 5.2 S-Corp to C-Corp Conversion

**Simpler:** Revoke S election by filing with IRS (with consent of shareholders owning >50% of stock)
- Effective date can be beginning of current tax year or prospective
- Built-in gains tax may apply for 5 years after conversion (on appreciated assets held at time of conversion)
- No entity-level change needed (same corporation, different tax election)

---

## 6. Formation Costs and Timeline

### 6.1 DIY vs. Startup Legal Services vs. Law Firm

| Approach | Cost | Timeline | Appropriate For |
|----------|------|----------|----------------|
| DIY (Stripe Atlas, Clerky, Firstbase) | $500-2,000 | 1-3 days | Simple formation; no special terms |
| Startup legal service (Clerky, Cooley Go, Orrick Emerge) | $2,000-5,000 | 1-2 weeks | Standard formation with standard documents |
| Law firm | $5,000-25,000 | 2-4 weeks | Complex structure, multiple founders, IP issues, unusual terms |

### 6.2 Formation Checklist

- [ ] Entity type selected (C-Corp, LLC, etc.)
- [ ] State of formation selected (Delaware for C-Corp)
- [ ] Name cleared (Secretary of State, USPTO, domain)
- [ ] Certificate of Incorporation filed
- [ ] Bylaws adopted
- [ ] Initial board resolutions approved
- [ ] EIN obtained from IRS
- [ ] Founder Stock Purchase Agreements executed
- [ ] 83(b) elections filed (within 30 days!)
- [ ] IP Assignment Agreements executed (all founders)
- [ ] Restricted stock agreements with vesting
- [ ] Stock Incentive Plan adopted
- [ ] Foreign qualification filed in operating state(s)
- [ ] Bank account opened
- [ ] Registered agent engaged
- [ ] Initial CIIA template prepared for future employees/contractors

---

*Reference: DGCL (Delaware General Corporation Law); IRC Section 83(b); IRC Section 1202 (QSBS); NVCA Model Documents; Feld & Mendelson, Venture Deals (4th ed.); Bagley & Dauchy, The Entrepreneur's Guide to Business Law (5th ed.); Clerky formation documentation.*
