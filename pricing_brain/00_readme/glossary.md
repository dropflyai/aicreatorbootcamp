# Glossary — Pricing Brain

Canonical terminology for all pricing work. When a term appears in any Pricing Brain document, this glossary defines its meaning. Ambiguity is not tolerated.

---

## Pricing Fundamentals

| Term | Definition |
|------|-----------|
| **Price** | The monetary amount a buyer pays per unit of value received. Not to be confused with cost (seller's expense) or value (buyer's perceived benefit). |
| **Value** | The total benefit a buyer perceives from a product or service, expressed in monetary or utility terms. Value is subjective, contextual, and segment-specific. |
| **Willingness to Pay (WTP)** | The maximum price a buyer will accept before choosing an alternative or choosing not to buy. WTP varies by segment, context, and framing. |
| **Price Elasticity of Demand (PED)** | The percentage change in quantity demanded divided by the percentage change in price. PED = (%dQ / %dP). Elastic: |PED| > 1. Inelastic: |PED| < 1. |
| **Demand Curve** | The relationship between price and quantity demanded, holding all else equal. Typically downward-sloping: higher price leads to lower quantity demanded. |
| **Marginal Cost** | The incremental cost of producing one additional unit. In software/SaaS, marginal cost is often near zero, making value-based pricing essential. |
| **Marginal Revenue** | The incremental revenue from selling one additional unit. Profit maximizes where marginal revenue equals marginal cost. |
| **Price Floor** | The minimum price below which the seller loses money on each unit. Defined by variable costs in the short run and total costs in the long run. |
| **Price Ceiling** | The maximum price the market will bear, defined by willingness to pay and competitive alternatives. |
| **Consumer Surplus** | The difference between willingness to pay and actual price paid. Consumer surplus = WTP - Price. |
| **Producer Surplus** | The difference between actual price received and the minimum the seller would accept. Producer surplus = Price - Cost. |

---

## Pricing Strategy

| Term | Definition |
|------|-----------|
| **Value-Based Pricing** | Setting price based on the quantified value delivered to the customer, not on cost or competitive reference. The gold standard for differentiated products. |
| **Cost-Plus Pricing** | Setting price as cost + desired margin. Simple but ignores value and willingness to pay. Common in commoditized markets. |
| **Competitive Pricing** | Setting price relative to competitors. Useful as a reference but dangerous as a primary strategy since it cedes pricing power. |
| **Penetration Pricing** | Setting a low initial price to gain market share, then raising price over time. Works when network effects or switching costs lock in customers. |
| **Skimming Pricing** | Setting a high initial price targeting early adopters, then lowering over time as market saturates. Works for differentiated, innovative products. |
| **Price Positioning** | Where your price sits relative to competitive alternatives: premium, parity, or discount. Positioning must align with brand, value, and target segment. |
| **Price Discrimination** | Charging different prices to different segments based on willingness to pay. First-degree (perfect), second-degree (self-selection/tiering), third-degree (segment-based). |
| **Dynamic Pricing** | Adjusting price in real-time based on demand, supply, time, or other signals. Common in travel, ride-sharing, and e-commerce. |
| **Predatory Pricing** | Pricing below cost to drive competitors out of market, then raising price. Illegal in most jurisdictions. |

---

## Value Metrics and Packaging

| Term | Definition |
|------|-----------|
| **Value Metric** | The unit of measurement that aligns price with the value customers receive. Examples: per seat, per API call, per GB, per transaction. The most important pricing decision. |
| **Good-Better-Best (GBB)** | The standard three-tier packaging model. "Good" is the entry tier, "Better" is the recommended tier, "Best" is the premium tier. Also called bronze-silver-gold. |
| **Feature Gating** | Restricting access to specific features based on the customer's pricing tier. The mechanism that creates upgrade incentive. |
| **Usage Limit** | A quantitative cap on resource consumption within a tier (e.g., 1,000 API calls/month). Creates natural upgrade triggers. |
| **Add-On** | A feature or module sold separately from the base plan. Allows customers to customize without forcing tier upgrades. |
| **Bundle** | Multiple products or features sold together at a combined price, typically at a discount versus buying separately. |
| **Freemium** | A model where a free tier exists permanently alongside paid tiers. Designed to drive adoption, not revenue, from the free tier. |
| **Free Trial** | Time-limited access to a paid tier (typically 7-30 days). Designed to demonstrate value before requiring payment. |
| **Upgrade Trigger** | The event, limit, or moment that motivates a customer to move from a lower tier to a higher tier. Must be designed, not accidental. |
| **Seat** | A licensed user account. Per-seat pricing charges based on the number of users with access. |
| **Consumption Unit** | The unit of resource usage that drives usage-based pricing (API calls, compute minutes, storage GB, messages sent). |

---

## Pricing Psychology

| Term | Definition |
|------|-----------|
| **Anchoring** | The cognitive bias where the first number encountered influences subsequent price judgments. Showing a high reference price makes actual price seem lower. |
| **Framing Effect** | How price presentation (monthly vs annual, per-user vs total) changes perceived value and purchase likelihood. |
| **Decoy Effect (Asymmetric Dominance)** | Adding a third option that is dominated by one of the other options, making that option appear superior. Used to steer buyers toward preferred tier. |
| **Price-Quality Heuristic** | The cognitive shortcut where higher price signals higher quality, especially when quality is hard to evaluate directly. |
| **Pain of Paying** | The psychological discomfort of parting with money. Affected by payment method, timing, framing, and visibility. Coined by Prelec & Loewenstein. |
| **Reference Price** | The internal benchmark a buyer uses to evaluate whether a price is fair. Formed by past prices, competitor prices, and context. |
| **Weber-Fechner Law** | Perception of change is proportional to the relative magnitude, not the absolute magnitude. A $10 increase on a $50 product (20%) is more noticeable than $10 on a $500 product (2%). |
| **Charm Pricing** | Ending prices in .99 or .95 (e.g., $9.99 instead of $10). Exploits left-digit bias. Most effective in consumer contexts, less in enterprise B2B. |
| **Price Partitioning** | Breaking a total price into component parts (base fee + add-ons + taxes). Can reduce pain of paying by making each component seem small. |
| **Endowment Effect** | People value things more once they own them. Relevant to free trials: after using a product, giving it up feels like a loss. |

---

## Behavioral Economics

| Term | Definition |
|------|-----------|
| **Prospect Theory** | Kahneman & Tversky's model showing that losses loom larger than equivalent gains, people evaluate outcomes relative to a reference point, and risk preferences vary between gain and loss domains. |
| **Loss Aversion** | The tendency to prefer avoiding losses over acquiring equivalent gains. Losses are felt approximately 2x as intensely as gains of the same magnitude. |
| **Mental Accounting** | Richard Thaler's theory that people categorize and evaluate economic outcomes in separate mental "accounts" rather than treating money as fungible. |
| **Diminishing Sensitivity** | The marginal psychological impact of a price change decreases as the base price increases. Moving from $10 to $20 feels larger than $100 to $110. |
| **Status Quo Bias** | The preference for the current state of affairs. Existing customers prefer not to change plans, making price changes psychologically costly. |
| **Sunk Cost Fallacy** | Continuing to invest because of past investment rather than future value. Relevant to annual contracts: having paid encourages continued use. |
| **Choice Overload** | Too many options (plans, tiers, add-ons) can paralyze buyers and reduce conversion. Three to four tiers is typically optimal. |
| **Default Effect** | Pre-selected options are chosen more frequently. Highlighting a "recommended" tier exploits this bias. |

---

## SaaS Pricing

| Term | Definition |
|------|-----------|
| **MRR (Monthly Recurring Revenue)** | The normalized monthly revenue from all active subscriptions. MRR = number of customers x average monthly price. |
| **ARR (Annual Recurring Revenue)** | MRR x 12. The annualized run-rate of recurring revenue. |
| **ARPU (Average Revenue Per User)** | Total revenue divided by total users. A key pricing health metric. |
| **ARPPU (Average Revenue Per Paying User)** | Total revenue divided by paying users only. More meaningful than ARPU in freemium models. |
| **Net Revenue Retention (NRR)** | Revenue from existing customers at end of period / revenue from same customers at start of period. NRR > 100% means expansion exceeds churn. |
| **Expansion Revenue** | Additional revenue from existing customers through upsells, cross-sells, add-ons, and usage growth. |
| **Contraction Revenue** | Revenue lost from existing customers through downgrades (not churn). |
| **Price Realization** | The actual average price paid relative to list price. Price Realization = Effective Price / List Price. Discounting erodes price realization. |
| **LTV (Lifetime Value)** | The total revenue expected from a customer over their lifetime. LTV = ARPU x Gross Margin x (1 / Churn Rate). |
| **CAC (Customer Acquisition Cost)** | The total cost to acquire a new customer. LTV/CAC ratio > 3x is a common SaaS benchmark. |
| **Payback Period** | Time to recover CAC from a customer's revenue contribution. CAC / (ARPU x Gross Margin). |

---

## Experimentation

| Term | Definition |
|------|-----------|
| **Van Westendorp Price Sensitivity Meter (PSM)** | A survey technique asking four price-perception questions to identify the acceptable price range, optimal price point, and point of marginal cheapness/expensiveness. |
| **Gabor-Granger Method** | A direct price testing technique where respondents are shown prices sequentially and asked purchase intent at each price. Produces a demand curve. |
| **Conjoint Analysis** | A statistical technique that determines how people value different attributes (features, price, brand) by analyzing trade-offs in hypothetical scenarios. |
| **A/B Test (Price)** | Showing different prices to different cohorts to measure impact on conversion, revenue, and retention. Ethically complex -- requires careful methodology. |
| **Holdout Group** | A control group that does not receive a price change, used to measure the causal impact of pricing changes. |
| **Price Sensitivity** | The degree to which price changes affect purchase behavior. High sensitivity means small price changes cause large demand shifts. |
| **Reservation Price** | The maximum price an individual buyer is willing to pay for a specific product. The upper bound of their willingness to pay. |

---

## Pricing Operations

| Term | Definition |
|------|-----------|
| **Proration** | Adjusting charges when a customer changes plan mid-billing cycle. Can be prorated upgrade (charge difference) or prorated downgrade (credit). |
| **Grandfather Clause** | Allowing existing customers to keep their current price or plan when new pricing is introduced. Reduces backlash but creates pricing complexity. |
| **Discount Governance** | Rules and approval workflows that control when, how much, and by whom discounts can be offered. Prevents margin erosion. |
| **Purchasing Power Parity (PPP)** | Adjusting prices based on the relative purchasing power of different countries. $100 USD in the US may be equivalent to $30 in India. |
| **Regional Pricing** | Setting different prices in different geographic markets based on local purchasing power, competition, and willingness to pay. |
| **List Price** | The published, standard price before any discounts or negotiations. The starting point for all pricing discussions. |
| **Street Price** | The actual average transaction price after discounts. Street price = List price x (1 - average discount). |
| **Price Waterfall** | The cascade from list price to pocket price (actual revenue), showing each discount, rebate, and concession that erodes margin. |

---

**This glossary is canonical. If a term is used differently elsewhere, this definition governs.**
