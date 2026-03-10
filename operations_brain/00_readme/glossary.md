# Operations Brain -- Glossary

## Purpose

This glossary defines the canonical terminology used throughout the Operations Brain.
All modules, patterns, templates, and evaluations reference these definitions.
Terms are organized by domain and cross-referenced where concepts span multiple areas.

---

## General Operations Terms

### Bottleneck
The resource or process step with the lowest capacity in a system, which constrains
overall throughput. Per Goldratt's Theory of Constraints, system output cannot exceed
the capacity of its bottleneck. Synonymous with "constraint" in TOC terminology.

### Capacity
The maximum rate of output a process or resource can sustain under defined conditions.
Measured in units per time period. Distinguish between:
- **Theoretical capacity**: Maximum possible output with zero downtime.
- **Effective capacity**: Realistic output accounting for maintenance, breaks, changeovers.
- **Demonstrated capacity**: Historical average output under actual conditions.

### Cycle Time
The total elapsed time from the beginning to the end of a process step or entire process,
as experienced by a single work item. Distinguished from lead time and takt time:
- **Cycle time** = time to complete one unit through one step.
- **Lead time** = total time from order to delivery (includes waiting).
- **Takt time** = available production time / customer demand rate.

### Lead Time
The total elapsed time from when a request enters the system to when it is fulfilled.
Includes all processing time, wait time, queue time, and transport time. Lead time
is the customer-facing metric; cycle time is the internal metric.

### Muda (Waste)
Any activity that consumes resources without creating value for the customer.
Toyota identifies seven classic wastes (sometimes extended to eight):
1. **Transport** -- unnecessary movement of materials
2. **Inventory** -- excess stock beyond immediate need
3. **Motion** -- unnecessary movement of people
4. **Waiting** -- idle time between process steps
5. **Overproduction** -- producing more than demanded
6. **Overprocessing** -- doing more work than required
7. **Defects** -- output that requires rework or disposal
8. **Skills** (8th waste) -- underutilizing human capability

### Mura (Unevenness)
Irregularity or inconsistency in workload, demand, or process execution. Mura
creates muda because systems must buffer against variation. Heijunka (production
leveling) is the primary countermeasure.

### Muri (Overburden)
Unreasonable stress placed on people, equipment, or processes. Muri leads to
breakdowns, defects, and burnout. Standard work and proper capacity planning
are the primary countermeasures.

### Process
A series of activities that transforms inputs into outputs to deliver value.
Processes can be:
- **Core processes**: Directly create customer value (e.g., order fulfillment).
- **Support processes**: Enable core processes (e.g., IT, HR, procurement).
- **Management processes**: Govern and coordinate (e.g., strategic planning).

### Throughput
The rate at which a system produces finished output. In Goldratt's Throughput
Accounting: Throughput = Revenue - Truly Variable Costs. Throughput is the primary
measure of system performance in Theory of Constraints.

### Value Stream
The complete set of activities required to deliver a product or service, from
initial request to final delivery. Value stream mapping (VSM) visualizes the
current state and designs the future state by identifying value-adding vs.
non-value-adding steps.

### Work in Process (WIP)
The number of work items currently being processed within a system. Per Little's
Law: Lead Time = WIP / Throughput. Controlling WIP is the primary lever for
reducing lead time. WIP limits are a foundational practice in Kanban.

---

## Lean and Toyota Production System Terms

### Andon
A visual signal (traditionally a cord or light) that alerts the team to a quality
or process problem. When pulled, it may stop the production line. Embodies the
principle of "stop and fix" rather than passing defects downstream.

### Gemba
"The actual place" -- the location where value-creating work happens. Gemba walks
involve leaders going to the work site to observe, ask questions, and show respect
for the people doing the work. Principle: go see, ask why, show respect.

### Heijunka
Production leveling -- smoothing the volume and mix of work over time to reduce
mura (unevenness). Prevents the bullwhip effect internally by converting variable
demand into a steady, predictable workflow.

### Jidoka
Automation with a human touch -- machines and processes are designed to detect
abnormalities and stop automatically. Prevents defects from propagating downstream.
One of the two pillars of the Toyota Production System (alongside JIT).

### Just-In-Time (JIT)
A production strategy where materials and work items arrive exactly when needed,
in the quantity needed. Minimizes inventory, reduces waste, and exposes problems
that buffer stock would otherwise hide. Requires reliable suppliers and processes.

### Kaizen
Continuous improvement through small, incremental changes made by the people who
do the work. Kaizen events (blitzes) are focused improvement workshops lasting
3-5 days. Kaizen is both a philosophy and a structured practice.

### Kanban
A signaling system (literally "visual card") that controls the flow of work by
limiting WIP. Pull-based: downstream processes signal upstream when they have
capacity. Core practices: visualize work, limit WIP, manage flow, make policies
explicit, improve collaboratively, implement feedback loops.

### Poka-Yoke
Error-proofing -- designing processes or devices so that mistakes are impossible
or immediately detectable. Examples: USB connectors that only fit one way,
form validation that prevents invalid input.

### Standard Work
The documented, agreed-upon best current method for performing a task. Standard
work defines: sequence of steps, time for each step, WIP allowed. It is the
baseline against which improvement is measured. No standard = no improvement.

---

## Quality Management Terms

### Common Cause Variation
Variation inherent in a stable process, arising from the system itself. Addressed
by changing the system (management responsibility). Distinguished from special
cause variation in Deming's theory of variation.

### Control Chart
A statistical tool that plots process output over time with control limits
(typically +/- 3 sigma from the mean). Used to distinguish common cause from
special cause variation. Types include X-bar, R-chart, p-chart, c-chart.

### DMAIC
Define, Measure, Analyze, Improve, Control -- the five-phase methodology of Six Sigma
for improving existing processes:
- **Define**: Problem statement, scope, stakeholders, goals.
- **Measure**: Baseline data collection, measurement system analysis.
- **Analyze**: Root cause identification using statistical and qualitative tools.
- **Improve**: Solution design, pilot, and implementation.
- **Control**: Sustain improvements through monitoring and standard work.

### PDCA (Plan-Do-Check-Act)
Deming's improvement cycle (also called the Shewhart Cycle):
- **Plan**: Identify the problem, analyze root causes, plan the change.
- **Do**: Implement the change on a small scale.
- **Check**: Measure results, compare to predictions.
- **Act**: Adopt, adapt, or abandon based on results. Repeat.

### Six Sigma
A data-driven methodology for reducing process variation and defects.
Sigma level indicates process capability:
- 3 sigma = 66,807 DPMO (defects per million opportunities)
- 4 sigma = 6,210 DPMO
- 5 sigma = 233 DPMO
- 6 sigma = 3.4 DPMO

### Special Cause Variation
Variation arising from identifiable, assignable causes external to the normal
process. Addressed by finding and removing the specific cause (worker/team
responsibility). Appears as points outside control limits or non-random patterns.

### Statistical Process Control (SPC)
The use of statistical methods (primarily control charts) to monitor and control
a process. SPC distinguishes signal from noise, preventing both over-adjustment
(tampering) and under-adjustment (neglect).

### Total Quality Management (TQM)
A management philosophy that embeds quality in every aspect of the organization.
Key principles: customer focus, total employee involvement, process-centered,
integrated system, strategic and systematic approach, continual improvement,
fact-based decision making, communications.

---

## Project Management Terms

### Critical Path
The longest sequence of dependent activities in a project network. Determines the
minimum project duration. Any delay on the critical path delays the entire project.
Non-critical activities have float (slack).

### RACI Matrix
Responsible, Accountable, Consulted, Informed -- a responsibility assignment matrix:
- **Responsible**: Does the work.
- **Accountable**: Ultimately answerable (only one per task).
- **Consulted**: Provides input (two-way communication).
- **Informed**: Kept in the loop (one-way communication).

### Work Breakdown Structure (WBS)
A hierarchical decomposition of the total scope of work into manageable deliverables.
The WBS is deliverable-oriented (not activity-oriented). Each level adds detail.
The lowest level items are called work packages.

### Earned Value Management (EVM)
A project performance measurement technique that integrates scope, schedule, and cost:
- **PV** (Planned Value): Budgeted cost of work scheduled.
- **EV** (Earned Value): Budgeted cost of work performed.
- **AC** (Actual Cost): Actual cost of work performed.
- **SPI** = EV/PV (Schedule Performance Index). SPI < 1 = behind schedule.
- **CPI** = EV/AC (Cost Performance Index). CPI < 1 = over budget.

---

## Supply Chain Terms

### ABC Analysis
Inventory classification based on value contribution:
- **A items**: ~20% of SKUs, ~80% of value. Tight control, frequent review.
- **B items**: ~30% of SKUs, ~15% of value. Moderate control.
- **C items**: ~50% of SKUs, ~5% of value. Simple controls, bulk ordering.
Based on Pareto principle (80/20 rule).

### Bullwhip Effect
The amplification of demand variability as information moves upstream in the
supply chain. A small change in consumer demand can cause progressively larger
swings in orders at each upstream tier. Countermeasures: information sharing,
demand smoothing, shorter lead times, smaller batch sizes.

### Economic Order Quantity (EOQ)
The optimal order quantity that minimizes total inventory cost (ordering cost +
holding cost). Formula: EOQ = sqrt(2DS/H) where D = annual demand, S = ordering
cost per order, H = holding cost per unit per year.

### Safety Stock
Buffer inventory held to protect against uncertainty in demand and supply.
Calculated based on demand variability, lead time variability, and desired
service level. Formula (simplified): SS = Z * sigma_d * sqrt(LT), where
Z = service level z-score, sigma_d = demand standard deviation, LT = lead time.

---

## Metrics Terms

### OEE (Overall Equipment Effectiveness)
A composite metric for manufacturing/process effectiveness:
OEE = Availability x Performance x Quality.
- **Availability** = Run Time / Planned Production Time
- **Performance** = (Ideal Cycle Time x Total Count) / Run Time
- **Quality** = Good Count / Total Count
World-class OEE is approximately 85%.

### Little's Law
A fundamental theorem of queueing theory: L = lambda x W, where:
- L = average number of items in the system (WIP)
- lambda = average arrival rate (throughput)
- W = average time an item spends in the system (lead time)
Rearranged: Lead Time = WIP / Throughput. Universally applicable to stable systems.

### Utilization Rate
The percentage of available capacity that is actually used:
Utilization = Actual Output / Available Capacity.
High utilization (>85%) typically causes exponential increases in wait times
due to queueing effects. Optimal utilization depends on variability.

---

## Acronyms Quick Reference

| Acronym | Full Form |
|---------|-----------|
| BCP | Business Continuity Plan |
| BPMN | Business Process Model and Notation |
| CMMI | Capability Maturity Model Integration |
| COGS | Cost of Goods Sold |
| DR | Disaster Recovery |
| DMAIC | Define, Measure, Analyze, Improve, Control |
| DPMO | Defects Per Million Opportunities |
| EOQ | Economic Order Quantity |
| EVM | Earned Value Management |
| FMEA | Failure Mode and Effects Analysis |
| JIT | Just-In-Time |
| KPI | Key Performance Indicator |
| LT | Lead Time |
| MRP | Material Requirements Planning |
| OEE | Overall Equipment Effectiveness |
| OKR | Objectives and Key Results |
| PDCA | Plan-Do-Check-Act |
| RACI | Responsible, Accountable, Consulted, Informed |
| RCA | Root Cause Analysis |
| SCOR | Supply Chain Operations Reference |
| SKU | Stock Keeping Unit |
| SLA | Service Level Agreement |
| SOP | Standard Operating Procedure |
| SPC | Statistical Process Control |
| TOC | Theory of Constraints |
| TPS | Toyota Production System |
| TQM | Total Quality Management |
| VSM | Value Stream Mapping |
| WBS | Work Breakdown Structure |
| WIP | Work in Process |

---

**This glossary is the single source of truth for Operations Brain terminology.**
**All modules must use these definitions consistently.**
