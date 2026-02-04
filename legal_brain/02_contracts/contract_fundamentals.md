# Contract Fundamentals -- Formation, Structure, and Enforcement

> Module: `02_contracts/contract_fundamentals.md`
> Brain: Legal Brain
> Authority: Domain-specific (contracts)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Contract Formation

A valid contract requires four elements. Absence of any element renders the agreement unenforceable.

### 1.1 Offer

An offer is a manifestation of willingness to enter into a bargain, made so as to justify the offeree in understanding that assent is invited and will conclude the bargain (Restatement (Second) of Contracts Section 24).

**Elements of a Valid Offer:**
- Definite and certain terms (parties, subject matter, price, time for performance)
- Communicated to the offeree
- Creates a reasonable expectation that acceptance will form a binding contract

**Distinguishing Offers from Non-Offers:**
| Communication | Offer? | Reason |
|--------------|--------|--------|
| "I will sell my SaaS company for $10M" | Yes | Definite terms, specific price |
| "I might be willing to sell for around $10M" | No | Too indefinite, mere invitation to negotiate |
| Price list sent to customers | No | Invitation to make offers (generally) |
| Detailed RFP response with pricing | Maybe | Depends on specificity and context |
| Signed term sheet | Maybe | Typically non-binding except for specific provisions |

**Termination of Offers:**
- Rejection by offeree (including counteroffer)
- Revocation by offeror (effective when received, before acceptance)
- Lapse of time (reasonable time if no deadline specified)
- Death or incapacity of either party (for non-irrevocable offers)
- Option contracts: Irrevocable for the option period if supported by consideration

### 1.2 Acceptance

Acceptance is a manifestation of assent to the terms of the offer (Restatement (Second) of Contracts Section 50).

**Mirror Image Rule (Common Law):**
- Acceptance must match the offer exactly
- Any change in terms is a counteroffer, not acceptance
- UCC Section 2-207 modifies this for sale of goods (additional terms become part of the contract between merchants unless they materially alter it)

**Methods of Acceptance:**
- Express acceptance (signature, written confirmation)
- Performance (beginning performance of a unilateral contract)
- Silence (generally not acceptance, but exceptions exist: prior course of dealing, solicited offers where offeree takes the benefit)
- Click-wrap and browse-wrap agreements (click-wrap generally enforceable; browse-wrap more problematic -- *Specht v. Netscape*, *Nguyen v. Barnes & Noble*)

### 1.3 Consideration

Consideration is a bargained-for exchange -- each party must give something of legal value.

**Valid Consideration:**
- Money, goods, services, promises to act or refrain from acting
- Forbearance from exercising a legal right
- Modification of existing duties (but see pre-existing duty rule)

**Invalid Consideration:**
- Past consideration (something already done before the promise)
- Illusory promises ("I'll buy if I feel like it")
- Pre-existing duty (promising to do what you're already obligated to do)
- Moral obligation alone (with narrow exceptions)

**Modern Exceptions:**
- UCC Section 2-209: Contract modifications for sale of goods need no consideration (but good faith required)
- Promissory estoppel: Reliance on a promise may substitute for consideration (Restatement Section 90)
- SAFEs: Consideration is the investment amount; the "equity" is the future right

### 1.4 Capacity and Legality

**Capacity Issues:**
- Minors (voidable, not void)
- Mental incapacity (voidable if other party knew or should have known)
- Corporate authority (ultra vires acts, unauthorized signatories)

**Legality Issues:**
- Contracts for illegal purposes are void
- Unconscionability (procedural: unfair bargaining process; substantive: unfair terms)
- Contracts against public policy (overly broad non-competes, penalty clauses at common law)

---

## 2. Conditions

### 2.1 Conditions Precedent

A condition precedent is an event that must occur before a party's obligation to perform arises.

**Common Conditions Precedent in Tech Contracts:**
- Due diligence completion (M&A)
- Regulatory approval (fintech, healthtech)
- Board approval of the transaction
- Delivery of legal opinion letter
- No material adverse change (MAC clause)
- Third-party consent (assignment, change of control)

**Drafting Note:** Use explicit conditional language: "Subject to..." or "Provided that..." or "Upon satisfaction of the following conditions..." Avoid ambiguity about whether a provision is a condition (failure excuses performance) or a covenant (failure gives rise to breach claim but does not excuse counterparty's performance).

### 2.2 Conditions Subsequent

A condition subsequent is an event that, if it occurs, terminates an existing obligation.

**Examples:**
- Insurance policy: Coverage terminates if insured fails to report claim within 30 days
- Earn-out: Obligation to pay terminates if target misses revenue milestones
- Non-compete: Obligation terminates upon change of control of employer

---

## 3. Key Contract Provisions

### 3.1 Representations and Warranties

**Representations:** Statements of fact made to induce the other party to enter the contract. Typically backward-looking ("As of the date hereof, the Company has no pending litigation").

**Warranties:** Promises that certain facts are or will be true. Can be forward-looking ("The software will perform materially in accordance with the documentation for 12 months").

**Practical Distinctions:**
- Breach of representation: May give rise to rescission (undo the deal) and/or fraud claims
- Breach of warranty: Gives rise to contractual damages claim
- In M&A: Rep and warranty insurance policies can backstop seller's representations
- Qualifiers matter enormously: "to the knowledge of," "in all material respects," "material adverse effect"

**Standard Reps and Warranties in SaaS/Tech Contracts:**
| Party | Common Representations |
|-------|----------------------|
| Vendor | Authority to enter agreement; no conflict with other agreements; software does not infringe third-party IP; compliance with laws; data security measures |
| Customer | Authority to enter agreement; compliance with acceptable use policy; accuracy of customer data; rights to customer content |

### 3.2 Indemnification

Indemnification shifts liability from one party to another for specified claims or losses.

**Structure:**
- **Trigger:** What claims/losses give rise to indemnification? (Third-party claims, direct losses, or both)
- **Scope:** What categories of loss are covered? (IP infringement, data breach, bodily injury, breach of reps)
- **Process:** Notice requirements, control of defense, right to settle, cooperation obligations
- **Limitations:** Caps, exclusions, baskets/deductibles, survival period

**Mutual vs. One-Sided Indemnification:**
- Mutual: Each party indemnifies for their own breaches (balanced; preferred)
- One-sided: Only one party indemnifies (appropriate when risk is asymmetric, e.g., vendor indemnifies for IP infringement)

**IP Indemnification (Critical for SaaS):**
- Vendor should indemnify customer against third-party IP infringement claims arising from use of the service
- Vendor's remedies upon infringement: (1) obtain right to continue use, (2) modify to be non-infringing, (3) replace with functional equivalent, (4) if none feasible, terminate and refund
- Exclusions: Claims arising from customer modifications, combination with third-party products, use outside documentation

### 3.3 Limitation of Liability

**Consequential Damages Waiver:**
- Mutual exclusion of indirect, incidental, consequential, special, and punitive damages
- Critical carve-outs: IP indemnification, confidentiality breach (especially data breach), willful misconduct, violation of law
- Without carve-outs, a consequential damages waiver could make indemnification obligations meaningless

**Liability Cap:**
- Typical SaaS: 12 months of fees paid or payable
- Enterprise/negotiated: May be higher (24 months, or total contract value)
- Super-cap for carve-outs: 2-3x the general cap for IP indemnification, data breach, confidentiality
- Uncapped: Fraud, willful misconduct, indemnification for bodily injury/death

### 3.4 Force Majeure

Force majeure excuses performance when extraordinary events beyond a party's control prevent performance.

**Standard Events:** War, terrorism, natural disaster, epidemic/pandemic (post-COVID, this is heavily negotiated), government action, embargo, labor strike, infrastructure failure.

**Negotiation Points:**
- Is the list exclusive or illustrative? ("including but not limited to" vs. exhaustive list)
- Does it require the event to be unforeseeable? (Post-COVID, pandemics may not be "unforeseeable")
- What is the notice requirement?
- What is the cure period before the other party can terminate?
- Does force majeure excuse payment obligations? (Generally no -- paying money is always possible)

### 3.5 Assignment

**Anti-Assignment Clause:**
- Prevents either party from assigning the contract without consent
- Standard: "Neither party may assign this Agreement without prior written consent, not to be unreasonably withheld"
- Change of control: May be treated as an assignment; critical to address explicitly
- Permitted assignments: To affiliates, to successor entity in merger/acquisition

**Why It Matters:**
- Customer may not want its data handled by a different vendor post-acquisition
- Vendor may not want to be stuck serving a customer whose risk profile changes after acquisition
- Anti-assignment clauses in software licenses are a major M&A due diligence issue

### 3.6 Termination

**Termination for Convenience:**
- Either party can terminate without cause, typically with 30-90 days written notice
- More common in services agreements; less common in committed-term SaaS subscriptions
- May trigger refund obligations (prepaid but unused fees)

**Termination for Cause:**
- Material breach: Written notice + cure period (typically 30 days)
- Insolvency/bankruptcy: May trigger automatic termination (but note: ipso facto clauses may be unenforceable under Bankruptcy Code Section 365)
- Failure to cure: Termination effective at end of cure period

**Post-Termination Obligations:**
- Data return or deletion (with certification)
- Survival of provisions: Confidentiality, indemnification, limitation of liability, governing law, dispute resolution
- Wind-down period for transition
- Accrued rights and obligations survive termination

### 3.7 Governing Law and Dispute Resolution

**Governing Law:**
- Choose a jurisdiction with developed commercial law (Delaware, New York, California most common)
- Delaware: Excellent corporate law, Chancery Court expertise
- New York: Comprehensive commercial law, sophisticated courts
- California: Tech-friendly, but plaintiff-friendly employment law

**Dispute Resolution Mechanisms:**
1. **Negotiation/Escalation:** Required first step (executive escalation before formal proceedings)
2. **Mediation:** Non-binding facilitated negotiation (often required before arbitration/litigation)
3. **Arbitration:** Binding resolution by private arbitrator(s) -- faster, private, limited appeal
4. **Litigation:** Court proceedings -- public, jury available, full appellate rights

### 3.8 Boilerplate That Matters

These "standard" provisions have real legal consequences:

| Clause | Why It Matters |
|--------|---------------|
| Entire Agreement / Integration | Supersedes all prior discussions; prevents parol evidence |
| Severability | Invalid provision does not void entire contract |
| Waiver | Failure to enforce a provision once does not waive future enforcement |
| Notices | Specifies how formal notices must be delivered (email, registered mail, addresses) |
| Counterparts | Allows signing in separate copies |
| Amendments | Requires written agreement signed by both parties to modify |
| Headings | Headings are for convenience only, not contractual |
| Construction | Neither party is deemed the drafter (prevents contra proferentem) |

---

## 4. Contract Interpretation Principles

### 4.1 Hierarchy of Interpretation

When contract provisions conflict:
1. Negotiated/handwritten terms prevail over
2. Typed/specific terms, which prevail over
3. Printed/general terms (standard form provisions)

### 4.2 Key Canons of Contract Interpretation

- **Plain Meaning:** Words bear their ordinary, natural meaning
- **Four Corners:** The entire document is read together as a whole
- **Contra Proferentem:** Ambiguities construed against the drafter
- **Course of Dealing:** Past transactions between parties inform interpretation
- **Trade Usage:** Industry custom and practice inform meaning of terms
- **Specific over General:** Specific provisions control over general ones
- **Reasonable Interpretation Preferred:** Avoid interpretations that produce absurd results

---

## 5. Statute of Frauds

Certain contracts must be in writing to be enforceable:
- Contracts for the sale of goods over $500 (UCC Section 2-201)
- Contracts that cannot be performed within one year
- Contracts for the sale of land or interests in land
- Contracts to pay the debt of another (suretyship)
- Contracts in consideration of marriage

**Practical Impact:** Always put significant business agreements in writing. Email chains may satisfy the statute of frauds if they contain the essential terms and are "signed" (electronic signature, typed name in email).

---

*Reference: Restatement (Second) of Contracts; UCC Articles 1-2; Farnsworth on Contracts (4th ed.); Corbin on Contracts; Adams, A Manual of Style for Contract Drafting (5th ed.).*
