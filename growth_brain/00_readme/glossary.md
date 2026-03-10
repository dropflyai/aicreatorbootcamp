# Growth Brain -- Glossary of Canonical Terms

## Purpose

This glossary defines the precise meaning of every growth term used across
the Growth Brain modules. When a term appears in any module, its meaning is
exactly as defined here. Ambiguity in growth terminology leads to misaligned
teams and flawed experiments.

---

## Growth Fundamentals

### Growth Rate
The percentage change in a key metric over a defined period. Compound Monthly
Growth Rate (CMGR) = (End Value / Start Value)^(1/months) - 1. Distinct from
simple month-over-month percentage change.

### Growth Accounting
A decomposition framework (Chamath Palihapitiya, Facebook) that breaks growth
into additive and subtractive components:
Growth = New Users + Resurrected Users - Churned Users.
Retained users are the base. This reveals whether growth is healthy (driven
by retention) or unhealthy (masking churn with acquisition).

### North Star Metric (NSM)
A single metric that best captures the core value a product delivers to
customers. Not revenue. Not DAU. The NSM is the leading indicator of
sustainable growth because it measures value creation. Examples:
Airbnb = Nights Booked; Slack = Daily Active Teams Sending Messages.

### Growth Equation
A mathematical decomposition of growth into its component inputs and
conversion rates. Example for SaaS:
Revenue = Visitors x Signup Rate x Activation Rate x Conversion Rate x ARPU.
Each variable becomes an optimization target.

### Growth Loop
A closed system where the output of one step feeds back as the input to an
earlier step, creating a self-reinforcing cycle. Coined by Reforge (Brian
Balfour, Casey Winters). Loops compound; funnels do not.

### Growth Funnel
A linear model of user progression through stages (Awareness, Acquisition,
Activation, Revenue, Retention, Referral -- AARRR, Dave McClure). Useful for
diagnostics but fundamentally limited because it does not capture feedback.

---

## Acquisition Terms

### Customer Acquisition Cost (CAC)
Total cost to acquire one customer. Fully loaded CAC includes all marketing
spend, sales compensation, tooling, and overhead divided by new customers
acquired. Blended CAC mixes paid and organic; channel CAC isolates one channel.

### Channel-Model Fit
Brian Balfour's framework: not every channel works for every business model.
High-touch enterprise products cannot scale through viral loops; consumer apps
cannot scale through field sales. The channel must match the model's unit
economics.

### Channel Saturation
The point at which marginal CAC in a channel increases due to audience
exhaustion. Every channel saturates (Andrew Chen's Law of Shitty Clickthroughs).
Diversification is the only defense.

### Organic Growth
User acquisition without direct per-user cost. Includes SEO, word-of-mouth,
content marketing, community, press, and virality. Organic channels compound
but take longer to mature.

### Paid Growth
User acquisition through direct spending. Includes SEM, social ads, display,
sponsorships, and affiliates. Paid channels are controllable but linear: spend
more to get more, with diminishing returns at scale.

### Viral Coefficient (K-Factor)
K = i x c, where i = average number of invitations sent per user and
c = conversion rate of each invitation. K > 1 means exponential growth
(each user brings more than one new user). K < 1 means viral mechanics
supplement but do not drive growth.

### Viral Cycle Time
The time elapsed between a user joining and the new users they generate
joining. Shorter cycle times produce faster compounding. Reducing viral cycle
time from 48 hours to 24 hours can have more impact than doubling K-factor.

### Referral Rate
The percentage of existing users who successfully refer at least one new user
within a defined period. Distinct from K-factor, which accounts for volume
and conversion.

---

## Activation Terms

### Aha Moment
The moment a new user first experiences the core value of the product.
Identified through behavioral analysis: correlating early actions with long-term
retention. Facebook's Aha Moment = adding 7 friends in 10 days. Slack's = team
sending 2,000 messages.

### Setup Moment
The first milestone where a user has configured the product enough to begin
experiencing value. Precedes the Aha Moment. Example: connecting a data source,
inviting a team member, completing a profile.

### Habit Moment
The point at which a user has used the product enough times at the natural
frequency that continued usage becomes habitual. Follows the Aha Moment.
Typically requires 3-5 sessions at the natural frequency.

### Activation Rate
The percentage of new signups who reach the Aha Moment within a defined window
(typically 7-14 days). The single most important leading indicator of retention
and long-term growth.

### Time-to-Value (TTV)
The elapsed time between signup and the user's first meaningful value experience.
Reducing TTV is often the highest-leverage growth intervention.

### Progressive Onboarding
An onboarding strategy that reveals product complexity gradually, introducing
features as the user is ready rather than overwhelming them at signup.

---

## Retention Terms

### Cohort Retention
Retention measured by grouping users who started in the same time period
(cohort) and tracking what percentage remain active over subsequent periods.
The gold standard of retention measurement.

### Retention Curve
A plot of cohort retention rate over time. Healthy products show curves that
flatten (reach an asymptote above zero). Unhealthy products show curves that
decline to zero.

### Natural Frequency
The cadence at which users naturally want to use the product. Daily for social
media, weekly for grocery delivery, monthly for bill pay, annually for tax
software. Growth work must align with, not fight against, natural frequency.

### Churn Rate
The percentage of users (or revenue) lost in a given period.
User Churn = Users Lost / Users at Start of Period.
Revenue Churn = MRR Lost / MRR at Start of Period.
Net Revenue Churn can be negative if expansion exceeds gross churn.

### Net Revenue Retention (NRR)
(Starting MRR + Expansion - Contraction - Churn) / Starting MRR.
NRR > 100% means the company grows even without new customers. Elite SaaS
companies achieve 120-150% NRR.

### Power User Curve
A histogram showing the distribution of user activity levels over a period
(typically L28 = days active in 28 days). A "smile" shape (many low-activity
and many high-activity users) indicates a strong power user base. A left-skewed
shape indicates poor engagement.

### DAU/MAU Ratio
Daily Active Users / Monthly Active Users. Measures stickiness. Benchmarks:
Social media >50%, SaaS tools 20-40%, commerce/marketplace 10-20%.

---

## Experimentation Terms

### Minimum Detectable Effect (MDE)
The smallest effect size an experiment is powered to detect. Smaller MDE
requires larger sample size. Setting MDE too high misses real effects; too
low wastes resources on impractical experiments.

### Statistical Significance
The probability that observed results are not due to chance. Standard
threshold: p < 0.05 (frequentist) or 95% posterior probability (Bayesian).
Not a measure of practical significance.

### Statistical Power
The probability of detecting an effect when it truly exists. Standard: 80%.
Power = 1 - beta. Low power leads to false negatives (missing real effects).

### Sample Size
The number of observations needed per variant to achieve desired power at
desired significance level for a given MDE. n = 16 * sigma^2 / delta^2
(simplified formula for two-variant test at 80% power, alpha = 0.05).

### Multi-Armed Bandit
An adaptive experiment that dynamically allocates traffic to better-performing
variants. Trades off exploration (testing) vs exploitation (winning). More
sample-efficient than fixed A/B tests but harder to interpret.

### Holdout Group
A percentage of users permanently excluded from a feature or change to measure
long-term impact. Used to validate that cumulative experiments produce net
positive outcomes.

---

## Monetization Terms

### Lifetime Value (LTV)
The total revenue expected from a user over their entire relationship with the
product. LTV = ARPU / Churn Rate (simplified). More accurate: sum of discounted
future cash flows by cohort.

### LTV:CAC Ratio
The ratio of customer lifetime value to acquisition cost. Benchmark: >3:1 for
healthy unit economics. <1:1 means the company loses money on every customer.

### Payback Period
The time required for a customer to generate enough revenue to cover their
acquisition cost. Benchmark: <12 months for SaaS, <6 months for consumer.

### Average Revenue Per User (ARPU)
Total revenue divided by total users in a period. Can be calculated for all
users or paying users only (ARPPU). Track by cohort for accuracy.

### Expansion Revenue
Revenue growth from existing customers through upsells, cross-sells, or
usage-based pricing increases. The primary driver of NRR > 100%.

### Freemium Conversion Rate
The percentage of free users who convert to paid. Benchmarks vary widely:
1-5% for consumer, 5-15% for SMB SaaS, 15-30% for enterprise-grade tools.

---

## Growth Loop Terms

### Acquisition Loop
A growth loop where the output is new users. Example: user creates content,
content is indexed by search engines, searchers discover product, become users,
create more content.

### Engagement Loop
A growth loop where the output is increased engagement from existing users.
Example: user completes action, receives reward, is motivated to complete
another action.

### Viral Loop
A growth loop where existing users directly cause new users to join.
Example: user invites friend, friend joins, friend invites more friends.

### Network Effect
A property where the product becomes more valuable as more people use it.
Types: direct (more users = more value, e.g., phone network), indirect
(more users attract complementary supply, e.g., marketplace), cross-side
(supply-side growth attracts demand-side, e.g., platform), data (more
users generate more data which improves the product, e.g., ML-driven product).

### Critical Mass
The minimum number of users required for a network effect to become
self-sustaining. Below critical mass, the product provides insufficient value
to retain users.

---

## Operational Terms

### Growth Squad
A cross-functional team (PM, engineer, designer, data analyst) dedicated to
a growth initiative. Operates with its own backlog and experiment pipeline.

### ICE Score
Prioritization framework: Impact (1-10) x Confidence (1-10) x Ease (1-10).
Used to rank experiment ideas in the backlog.

### Experiment Velocity
The number of experiments shipped per unit of time. A proxy for organizational
learning speed. Target: 2-3 per week for a mature growth team.

### Learning Velocity
The rate at which an organization generates validated insights from experiments.
More important than experiment velocity because a fast team running bad
experiments learns nothing.

### Growth Review
A recurring meeting (typically weekly) where the growth team reviews experiment
results, analyzes metrics, and prioritizes the next set of experiments.
