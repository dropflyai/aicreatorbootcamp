# Process Design — Formal Operations Theory

## What This Enables

**Decisions it helps make:**
- How to design efficient, reliable processes
- How to identify and eliminate bottlenecks
- How to apply statistical quality control
- How to optimize cycle times and throughput

---

## 1. Toyota Production System (TPS)

*Citation: Ohno, T. (1988). Toyota Production System: Beyond Large-Scale Production. Productivity Press.*

### 1.1 The Two Pillars

**Just-in-Time (JIT):** Produce only what is needed, when it is needed, in the amount needed. Eliminates overproduction (the worst waste) and reduces inventory costs.

**Jidoka (autonomation):** Machines and processes designed to detect defects and stop automatically. Quality is built into the process, not inspected after the fact.

### 1.2 The Seven Wastes (Muda)

| Waste | Description | Business Examples |
|-------|------------|-------------------|
| Overproduction | Making more than needed | Building features nobody uses |
| Waiting | Idle time between steps | Approval queues, handoff delays |
| Transportation | Unnecessary movement of materials | Excessive data transfers between systems |
| Overprocessing | Doing more work than necessary | Over-engineering, excessive reviews |
| Inventory | Excess stored materials | Backlog of undeployed code, unsold products |
| Motion | Unnecessary movement of people | Context switching, searching for information |
| Defects | Rework, repairs, scrap | Bugs, customer complaints, refunds |

### 1.3 Operator's Application

For any process:
1. Map the current state (value stream map)
2. Identify each step as value-adding, necessary waste, or pure waste
3. Eliminate pure waste
4. Minimize necessary waste
5. Redesign the flow to reduce lead time

---

## 2. Lean Methodology

*Citation: Womack, J. P., & Jones, D. T. (1996). Lean Thinking: Banish Waste and Create Wealth in Your Corporation. Simon & Schuster.*

### 2.1 Five Lean Principles

1. **Identify value:** Define value from the customer's perspective (not the producer's)
2. **Map the value stream:** Map all steps and identify waste
3. **Create flow:** Eliminate interruptions and batch processing; achieve continuous flow
4. **Establish pull:** Produce only in response to customer demand (not push/forecast)
5. **Pursue perfection:** Continuous improvement (kaizen); there is always more waste to eliminate

### 2.2 Value Stream Mapping

A visual tool for analyzing the flow of materials and information:

```
Supplier -> Process 1 -> Process 2 -> Process 3 -> Customer

For each process step:
- Cycle time (time to complete one unit)
- Lead time (time from start to finish, including waiting)
- % value-added time
- Defect rate
- Changeover time
```

**Key metric:** Value-Added Ratio = Total Value-Added Time / Total Lead Time

Best-in-class manufacturing: 5-25%
Most service processes: <5%
Software development: <10%

The gap between value-added and lead time is almost entirely waste — primarily waiting.

---

## 3. Theory of Constraints (TOC)

*Citation: Goldratt, E. M. (1984). The Goal: A Process of Ongoing Improvement. North River Press.*

### 3.1 Core Principle

Every system has a constraint (bottleneck) that limits its overall throughput. Optimizing any non-constraint does not improve system performance.

**The constraint determines the maximum throughput of the entire system.**

### 3.2 Five Focusing Steps

1. **Identify** the system's constraint (the slowest step, the scarce resource)
2. **Exploit** the constraint (maximize its output — ensure it never sits idle)
3. **Subordinate** everything else to the constraint (other steps should feed the constraint at its pace)
4. **Elevate** the constraint (invest to increase its capacity)
5. **Repeat** — when the constraint is broken, a new one emerges (go to step 1)

### 3.3 Drum-Buffer-Rope (DBR)

**Drum:** The constraint sets the pace (the drumbeat) for the entire system
**Buffer:** A time or inventory buffer before the constraint protects it from upstream disruptions
**Rope:** A signal from the constraint back to the start of the process, controlling the rate of work entry (pull system)

### 3.4 Throughput Accounting

TOC replaces traditional cost accounting with throughput-based metrics:

```
Throughput (T) = Revenue - Truly Variable Costs
Operating Expense (OE) = All other costs
Net Profit = T - OE
ROI = (T - OE) / Investment
```

**Decision rule:** Pursue actions that increase T, reduce OE, or reduce Investment — in that priority order.

**Operator connection:** The constraint determines your system's output. An hour lost at the bottleneck is an hour lost for the entire system. An hour saved at a non-bottleneck is a mirage — it doesn't improve system throughput.

---

## 4. Six Sigma — Statistical Foundations

### 4.1 Statistical Basis

Six Sigma targets 3.4 defects per million opportunities (DPMO), corresponding to 6 standard deviations between the process mean and the nearest specification limit.

```
Sigma Level    DPMO          Yield
1              691,462       30.9%
2              308,538       69.1%
3              66,807        93.3%
4              6,210         99.4%
5              233           99.977%
6              3.4           99.9997%
```

### 4.2 Process Capability

**Process capability indices** measure how well a process fits within specification limits:

**Cp (potential capability):**

```
Cp = (USL - LSL) / (6 * sigma)
```

where USL = upper specification limit, LSL = lower specification limit, sigma = process standard deviation.

Cp >= 1.33 is typically considered capable.

**Cpk (actual capability, accounting for centering):**

```
Cpk = min[(USL - mu) / (3*sigma), (mu - LSL) / (3*sigma)]
```

Cpk < Cp indicates the process is not centered between specification limits.

### 4.3 DMAIC Framework

**Define:** What is the problem? What is the scope?
**Measure:** What is current performance? Collect data.
**Analyze:** What are the root causes? Statistical analysis.
**Improve:** What changes eliminate root causes? Test solutions.
**Control:** How do we sustain gains? Monitoring and control charts.

### 4.4 Control Charts

Monitor process stability over time:

```
UCL = x_bar + 3 * sigma / sqrt(n)     (Upper Control Limit)
CL  = x_bar                            (Center Line)
LCL = x_bar - 3 * sigma / sqrt(n)     (Lower Control Limit)
```

**Out-of-control signals:**
- Any point outside control limits
- 7+ consecutive points on one side of the center line (run)
- 7+ consecutive points trending up or down (trend)
- Unusual patterns (cycles, clusters)

---

## 5. Cycle Time Optimization

### 5.1 Little's Law

*Citation: Little, J. D. C. (1961). A proof for the queuing formula: L = lambda W. Operations Research, 9(3), 383-387.*

The fundamental law of queuing:

```
L = lambda * W
```

where:
- L = average number of items in the system (Work In Progress / WIP)
- lambda = average arrival rate (throughput)
- W = average time an item spends in the system (lead time)

**Rearranging:** W = L / lambda

**Implication:** To reduce lead time (W), you must either:
1. Reduce WIP (L) — fewer items in process at once
2. Increase throughput (lambda) — process items faster

**Practical application:** Most teams try to increase throughput, but reducing WIP is often easier and more effective. Limiting WIP is the core insight of kanban.

### 5.2 Cycle Time Components

```
Total Cycle Time = Processing Time + Queue Time + Setup Time + Move Time + Inspection Time
```

In most processes, queue time (waiting) dominates — often 80-95% of total cycle time. Reducing waiting is usually the highest-leverage improvement.

### 5.3 Batch Size and Cycle Time

Smaller batches reduce cycle time:

```
Batch Lead Time = Batch Size x Processing Time per Unit + Queue Time
```

Halving batch size roughly halves lead time (holding throughput constant). This is why agile sprints (small batches) outperform waterfall (large batches) in cycle time.

---

## 6. Process Design Principles

### 6.1 Summary of Design Rules

1. **Identify the constraint** and organize the system around it (TOC)
2. **Minimize WIP** to reduce lead time (Little's Law)
3. **Reduce batch sizes** to improve flow and feedback speed
4. **Build quality in** rather than inspecting it in (Jidoka)
5. **Eliminate waste** systematically (Lean)
6. **Use pull systems** to prevent overproduction (JIT)
7. **Make processes visible** so problems are immediately apparent
8. **Standardize** before you optimize (you can't improve what isn't defined)

---

## Key Citations

- Goldratt, E. M. (1984). *The Goal*. North River Press.
- Liker, J. K. (2004). *The Toyota Way*. McGraw-Hill.
- Little, J. D. C. (1961). A proof for the queuing formula: L = lambda W. *Operations Research*, 9(3), 383-387.
- Ohno, T. (1988). *Toyota Production System*. Productivity Press.
- Womack, J. P., & Jones, D. T. (1996). *Lean Thinking*. Simon & Schuster.
- Womack, J. P., Jones, D. T., & Roos, D. (1990). *The Machine That Changed the World*. Free Press.
