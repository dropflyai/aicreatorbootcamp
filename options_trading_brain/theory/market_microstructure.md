# Market Microstructure

**Prerequisite:** Probability theory, game theory, optimization
**Relevance:** Execution quality, slippage management, market making, order flow analysis

---

## 1. Overview

Market microstructure studies how the mechanics of trading affect price formation, liquidity, and transaction costs. For options traders, understanding microstructure is essential because:

- Options markets are less liquid than equity markets (wider spreads, larger tick sizes)
- Execution quality directly impacts strategy profitability (especially for high-frequency strategies)
- Order flow patterns reveal information about institutional positioning
- Market maker behavior determines the shape of the implied volatility surface

---

## 2. Order Book Dynamics

### Limit Order Book (LOB) Structure

```
Price    |  Bids (Buy)      |  Asks (Sell)
---------|-------------------|-------------------
$105.00  |                   |  200 contracts
$104.50  |                   |  150 contracts
$104.00  |                   |  500 contracts  <-- Best Ask (Inside Ask)
$103.50  |  300 contracts    |                  <-- Best Bid (Inside Bid)
$103.00  |  450 contracts    |
$102.50  |  100 contracts    |
```

**Bid-Ask Spread:** $104.00 - $103.50 = $0.50

**Mid-Price:** ($104.00 + $103.50) / 2 = $103.75

**Microprice (Volume-Weighted):**
```
Microprice = (Ask * Bid_Size + Bid * Ask_Size) / (Bid_Size + Ask_Size)
           = (104.00 * 300 + 103.50 * 500) / (300 + 500)
           = $103.69
```

The microprice gives a better estimate of the "true" price because it accounts for the relative depth at the best bid and ask.

### Order Types

| Type | Description | When to Use |
|------|-------------|-------------|
| Market order | Execute immediately at best available price | Urgent execution; small size |
| Limit order | Execute at specified price or better | Patient execution; providing liquidity |
| IOC (Immediate or Cancel) | Fill what you can immediately, cancel rest | Sweep multiple price levels |
| FOK (Fill or Kill) | Fill entire order or nothing | Large institutional orders |
| Stop order | Becomes market order when price hits trigger | Stop-loss; breakout entry |
| Stop-limit | Becomes limit order when price hits trigger | More controlled stops |
| Peg order | Tracks the NBBO (midpoint, bid, ask) | Passive execution with automation |

### Options-Specific Order Book Features

- **Wider spreads:** Options have wider bid-ask spreads than equities (lower liquidity, more parameters)
- **Multiple series:** Same underlying has dozens of strike/expiry combinations (fragmented liquidity)
- **Quote stuffing:** Market makers adjust quotes rapidly based on underlying moves
- **Intermarket linkage:** Options prices linked to stock, other options, and volatility

---

## 3. Bid-Ask Spread Theory

### Components of the Spread

The bid-ask spread compensates market makers for three costs:

1. **Order processing cost:** Fixed cost of handling an order (technology, clearing)
2. **Inventory risk:** Risk of holding unwanted inventory (exposure to price moves)
3. **Adverse selection:** Risk of trading against informed traders (information asymmetry)

### Glosten-Milgrom Model (1985)

**Setting:** A specialist sets bid and ask prices. Traders arrive randomly. Some fraction (mu) are informed (know the true value V), the rest are uninformed (noise traders).

**Key Result:**

```
Ask = E[V | buyer arrives] = P(informed)*V_high + P(uninformed)*E[V]
Bid = E[V | seller arrives] = P(informed)*V_low + P(uninformed)*E[V]
```

The spread exists because the market maker faces adverse selection: informed traders buy when they know V > Ask and sell when V < Bid. The market maker must widen the spread to cover expected losses to informed traders.

**Spread formula:**

```
Spread = Ask - Bid = mu * (V_high - V_low) * [function of prior beliefs]
```

Key insight: The spread is proportional to:
- The fraction of informed traders (mu)
- The information advantage of informed traders (V_high - V_low)

### Kyle Model (1985)

**Setting:** Three types of agents:
- One informed trader who knows the asset's true value V
- Noise traders who submit random orders
- A competitive market maker who sets prices

The informed trader submits a market order x, noise traders submit u ~ N(0, sigma_u^2). The market maker observes total order flow y = x + u and sets price:

```
P = mu + lambda * y
```

where lambda is the Kyle lambda (price impact coefficient).

**Equilibrium:**

```
lambda = (1/2) * sigma_V / sigma_u
```

```
Informed trader's optimal strategy: x = sigma_u * (V - mu) / sigma_V
```

Key insights:
- Price impact is linear in order flow
- Lambda measures market depth (lower lambda = more liquid)
- The informed trader "camouflages" by trading proportionally to noise trader volume
- All information is revealed by the end of trading (semi-strong efficiency)

### Roll Model (1984)

Simplest spread estimator from transaction data:

```
Spread = 2 * sqrt(-Cov(r_t, r_{t-1}))
```

where r_t are transaction-to-transaction returns. The negative serial correlation arises from bid-ask bounce.

---

## 4. Market Maker Inventory Models

### Avellaneda-Stoikov Model (2008)

A market maker continuously quotes bid and ask prices while managing inventory risk.

**Setup:** Mid-price follows dS = sigma dW. The market maker quotes:

```
Bid = S - delta_b
Ask = S + delta_a
```

where delta_a, delta_b are the half-spreads (offsets from mid-price).

**Arrival rates:** Orders arrive as Poisson processes with intensity:

```
Lambda_a(delta_a) = A * exp(-k * delta_a)    (buy orders hitting the ask)
Lambda_b(delta_b) = A * exp(-k * delta_b)    (sell orders hitting the bid)
```

where A and k are market-specific parameters.

**Optimal quotes (Hamilton-Jacobi-Bellman solution):**

```
Reservation price: r(t, q) = S - q * gamma * sigma^2 * (T - t)
Optimal spread: delta_a + delta_b = gamma * sigma^2 * (T - t) + (2/gamma) * ln(1 + gamma/k)
```

where:
- q = current inventory (positive = long, negative = short)
- gamma = risk aversion parameter
- T = terminal time

**Key insights:**
- The reservation price shifts away from mid-price based on inventory (skew quotes to reduce inventory)
- Spread widens with volatility and risk aversion
- As inventory grows, the market maker aggressively skews quotes to flatten
- Optimal behavior balances earning the spread vs. inventory risk

### Inventory Skewing in Practice

```
q > 0 (long inventory):  Lower the bid, lower the ask (encourage selling to you)
q < 0 (short inventory): Raise the bid, raise the ask (encourage buying from you)
q = 0 (flat):           Symmetric quotes around mid-price
```

This is the fundamental principle behind all market making algorithms.

---

## 5. Price Impact Models

### Temporary vs. Permanent Impact

- **Temporary impact:** Price displacement during execution that reverts after the trade completes
- **Permanent impact:** Information content of the trade that moves the equilibrium price

### Linear Impact Model

```
dS = sigma * dW + g * dN_t
```

where g is the permanent impact per unit traded and N_t is the cumulative signed order flow.

### Square-Root Impact (Empirical)

Empirically observed across many markets:

```
Impact = eta * sigma_daily * (Q / V_daily)^{0.5}
```

where:
- Q = order size
- V_daily = average daily volume
- sigma_daily = daily volatility
- eta ~ 0.1-0.5 (market-dependent constant)

The square-root law is remarkably robust across asset classes and time periods. It implies:
- Doubling the order size increases impact by only 41%
- Impact is proportional to volatility
- Impact depends on relative size (Q/V), not absolute size

### Decay Kernel

Temporary impact decays over time:

```
Impact(t) = Impact_0 * G(t)
```

Common decay kernels:
- Exponential: G(t) = exp(-t/tau)
- Power law: G(t) = (1 + t/tau)^{-gamma} (empirically supported, gamma ~ 0.5)

---

## 6. Optimal Execution (Almgren-Chriss, 2001)

### Problem Statement

Execute a large order of X shares over time horizon [0, T] to minimize a combination of execution cost and execution risk.

### Model

The portfolio position decreases from X to 0 over time:

```
x(t) = X - integral_0^t v(s) ds
```

where v(t) is the trading rate (shares per unit time).

Price dynamics include permanent and temporary impact:

```
S_t = S_0 + sigma * W_t + g * integral_0^t v(s) ds    (permanent impact)
Execution price = S_t + h(v_t)                          (temporary impact)
```

where h(v) = eta * v (linear temporary impact).

### Objective Function

Minimize the mean-variance of implementation shortfall:

```
min_{v(t)} E[IS] + lambda * Var(IS)
```

where IS = X * S_0 - integral_0^T v(t) * execution_price(t) dt.

### Optimal Solution

The optimal trading trajectory is:

```
x(t) = X * sinh(kappa*(T-t)) / sinh(kappa*T)
```

where kappa = sqrt(lambda * sigma^2 / eta).

This gives a **TWAP-like trajectory** when risk aversion is low (trade uniformly) and a **front-loaded trajectory** when risk aversion is high (trade fast to reduce risk).

### Trading Rate

```
v(t) = X * kappa * cosh(kappa*(T-t)) / sinh(kappa*T)
```

### Practical Implications

- **High urgency (large lambda):** Trade fast, accept more impact, reduce timing risk
- **Low urgency (small lambda):** Trade slowly, minimize impact, accept timing risk
- **Optimal trade schedule** interpolates between the two extremes
- For a $10M options order in a typical stock: execution horizon of 1-5 days, VWAP participation rate of 5-20%

---

## 7. High-Frequency Dynamics in Options Markets

### Quote Update Frequency

Options market makers update quotes based on:
1. Underlying price changes (delta hedging drives quote updates)
2. Implied volatility changes (market-wide or stock-specific)
3. Time decay (theta, especially near expiry)
4. Inventory changes (skewing after fills)

Typical update frequency: 10-100ms for liquid names, seconds for illiquid names.

### Quote Staleness

When the underlying moves but option quotes have not yet updated, the quotes are "stale." Sophisticated traders (latency arbitrageurs) pick off stale quotes before market makers can update them. This forces market makers to widen spreads as a defense.

### Legging Risk in Multi-Leg Strategies

Spread orders (e.g., iron condors with 4 legs) face legging risk: the risk that you fill some legs but not others, leaving a partially hedged position. Solutions:
- Complex order types (submit as a package with net price)
- Sequential execution with delta hedging between legs
- Algorithmic execution that monitors fill rates

---

## 8. Maker-Taker Economics

### Fee Structure

| Role | Traditional | Maker-Taker | Payment for Order Flow |
|------|-------------|-------------|----------------------|
| Maker (provides liquidity) | Pays fee | Receives rebate | N/A |
| Taker (removes liquidity) | Pays fee | Pays higher fee | Fee paid by market maker |
| Net exchange revenue | Sum of fees | Taker fee - Maker rebate | Fee from market maker |

### Impact on Options Trading

- Limit orders earn rebates (maker); market orders pay fees (taker)
- Rebates incentivize tight quotes from market makers
- Payment for order flow (PFOF) means retail orders are sold to market makers who internalize
- Best execution requires comparing across venues (NBBO compliance)

---

## 9. Dark Pools and Alternative Venues

### Dark Pool Mechanics

- No pre-trade transparency (orders are hidden)
- Execution at midpoint (or within the spread) of the lit market
- Used for large institutional orders to minimize market impact
- Limited dark pool activity in options (primarily equities)

### Options-Specific Venues

| Venue Type | Examples | Features |
|------------|----------|----------|
| Listed exchanges | CBOE, ISE, PHLX, BOX | Transparent order book, auction mechanisms |
| Electronic crossing | Various | Complex order matching |
| Price improvement auctions | CBOE AIM, ISE PIM | Retail orders get improved fills |
| Floor trading | CBOE floor | Large/complex orders, human negotiation |

---

## 10. Information Asymmetry in Options Markets

### Informed Trading Detection

Options markets reveal informed trading through:

1. **Unusual options activity (UOA):** Sudden spikes in volume, especially in OTM options before events
2. **Put-call volume ratio:** Elevated put volume may signal negative information
3. **IV skew changes:** Sudden steepening of the put skew may indicate informed put buying
4. **Order flow imbalance:** Net buying pressure on calls or puts

### Options Order Flow as a Predictor

Research (Easley, O'Hara, Srinivas 1998) shows that options order flow contains information about future stock price movements:

```
P(informed) = (mu * alpha) / (mu * alpha + 2 * epsilon)
```

where:
- alpha = probability of an information event
- mu = arrival rate of informed traders
- epsilon = arrival rate of uninformed traders

This is the PIN (Probability of Informed Trading) model.

### Implications for Trading Systems

- Monitor unusual options activity as a signal input
- Wide spreads in options can indicate elevated information risk
- Back-infer institutional positioning from flow data
- Use options volume/open interest as confirmation for directional views

---

## 11. Integration with Trading System Architecture

### Execution Module Requirements

```
Order Signal -> Execution Engine:
  1. Check available liquidity (order book depth, spread)
  2. Choose execution strategy (limit, market, algorithmic)
  3. Select venue (best price, lowest fees, fastest fill)
  4. Monitor fill quality (slippage vs. benchmark)
  5. Adjust strategy based on realized impact
```

### Key Metrics to Track

| Metric | Definition | Target |
|--------|-----------|--------|
| Fill rate | % of orders filled | > 90% for limits |
| Slippage | Execution price vs. mid at decision time | < 1/2 spread |
| Market impact | Price move attributable to our order | Minimize |
| Latency | Time from signal to fill | < 1s for directional |
| Effective spread | 2 * |fill_price - mid_at_fill_time| | < quoted spread |

---

## References

- O'Hara, M. (1995). *Market Microstructure Theory*
- Glosten, L. & Milgrom, P. (1985). "Bid, Ask, and Transaction Prices"
- Kyle, A.S. (1985). "Continuous Auctions and Insider Trading"
- Avellaneda, M. & Stoikov, S. (2008). "High-Frequency Trading in a Limit Order Book"
- Almgren, R. & Chriss, N. (2001). "Optimal Execution of Portfolio Transactions"
- Cartea, A., Jaimungal, S. & Penalva, J. (2015). *Algorithmic and High-Frequency Trading*
- Easley, D., O'Hara, M. & Srinivas, P. (1998). "Option Volume and Stock Prices"
