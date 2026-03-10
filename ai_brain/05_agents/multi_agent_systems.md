# Multi-Agent Systems: Orchestrating Collaborative AI

## Overview

Multi-agent systems deploy multiple specialized AI agents that collaborate to accomplish tasks too complex for a single agent. Each agent possesses distinct capabilities, knowledge, or perspectives, and the system's emergent intelligence exceeds what any individual agent achieves alone. This module covers orchestration patterns, communication protocols, task decomposition strategies, and the dominant paradigms in collaborative AI: crew-based and swarm-based architectures.

---

## 1. Why Multi-Agent Systems

### 1.1 Single-Agent Limitations

Single agents face fundamental constraints that multi-agent architectures overcome:

**Context Window Saturation**: Complex tasks require more information than fits in a single context window. Multiple agents can each hold different context slices.

**Specialization vs. Generalization**: A single agent prompt optimized for coding degrades at writing; one optimized for analysis weakens at action. Specialized agents outperform generalists within their domain.

**Reasoning Depth**: Single agents making many sequential decisions accumulate errors. Distributing decisions across agents introduces independent reasoning that naturally error-corrects.

**Tool Overload**: Providing 50+ tools to a single agent degrades tool selection accuracy. Agents with 3-7 focused tools select correctly at much higher rates.

### 1.2 When to Use Multi-Agent

Multi-agent architectures are justified when:
- The task requires expertise across multiple distinct domains
- Different subtasks benefit from different model configurations (temperature, system prompts)
- The task involves both analysis and action that benefit from separation of concerns
- Reliability requirements demand independent verification (checker agents)
- The system must scale to handle concurrent subtasks

---

## 2. Orchestration Patterns

### 2.1 Sequential Pipeline

Agents execute in a fixed sequence, each passing its output to the next:

```
Agent A (Research) --> Agent B (Analysis) --> Agent C (Writing) --> Agent D (Review)
```

**Characteristics**:
- Simple to implement and debug
- Clear data flow and responsibility boundaries
- Latency is the sum of all agent execution times
- Failure at any stage blocks the entire pipeline
- Best for well-defined processes with clear stage boundaries

**Error Handling**: Implement retry at each stage. If retries exhaust, roll back to the previous stage with error context and let it produce alternative output.

### 2.2 Parallel Fan-Out / Fan-In

A coordinator distributes independent subtasks to multiple agents simultaneously, then merges results:

```
                    ┌── Agent B (Market Research) ──┐
Coordinator ────────┤── Agent C (Competitor Scan)  ──├── Merger Agent
                    └── Agent D (User Interviews)  ──┘
```

**Characteristics**:
- Latency is determined by the slowest parallel agent
- Excellent for tasks with independent subtasks
- The merger agent must reconcile potentially conflicting information
- Scales well with additional agents for additional perspectives

### 2.3 Hierarchical Delegation

A manager agent breaks down tasks and delegates to subordinate agents, which may further delegate:

```
CEO Agent
├── Research Manager
│   ├── Web Researcher
│   └── Database Researcher
├── Analysis Manager
│   ├── Quantitative Analyst
│   └── Qualitative Analyst
└── Report Writer
```

**Characteristics**:
- Mirrors organizational structure, natural for business processes
- Manager agents focus on coordination, not execution
- Supports deep task decomposition
- Risk of information loss at each delegation layer
- Manager agent quality is critical -- poor delegation wastes all subordinate work

### 2.4 Debate / Adversarial

Multiple agents argue different positions, and a judge agent synthesizes the strongest arguments:

```
Agent A (Advocate) ──┐
                     ├── Judge Agent --> Final Decision
Agent B (Critic)   ──┘
```

**Characteristics**:
- Excellent for decision-making under uncertainty
- Reduces bias by forcing consideration of multiple perspectives
- The critic agent improves output quality by identifying weaknesses
- More expensive (multiple full reasoning passes) but higher quality for consequential decisions

### 2.5 Iterative Refinement Loop

One agent produces output, another provides feedback, and the first agent refines. This loops until quality criteria are met:

```
Writer Agent <--> Reviewer Agent (loop until approved)
```

**Characteristics**:
- Natural for creative and quality-sensitive tasks
- Convergence typically occurs within 2-4 iterations
- Risk of infinite loops without explicit termination criteria
- Reviewer agent must provide actionable, specific feedback

---

## 3. Communication Protocols

### 3.1 Message Formats

Agents communicate through structured messages containing:

```json
{
  "from": "research_agent",
  "to": "analysis_agent",
  "type": "task_result",
  "content": {
    "task_id": "research_001",
    "status": "complete",
    "result": "...",
    "confidence": 0.85,
    "sources": ["..."],
    "metadata": {"tokens_used": 4500, "duration_ms": 3200}
  }
}
```

### 3.2 Communication Patterns

**Direct Messaging**: Agent A sends directly to Agent B. Simple, low overhead. Requires agents to know each other's capabilities.

**Broadcast**: Agent publishes to a shared channel. All interested agents consume. Good for status updates and coordination signals.

**Blackboard**: Agents read from and write to a shared workspace. Each agent monitors the workspace for inputs it can process. Highly flexible but requires careful concurrency management.

**Request-Response**: Agent A requests specific information from Agent B and waits for a response. Clear contract between agents. Introduces coupling and blocking.

### 3.3 Shared State Management

When multiple agents operate on shared state:
- **Optimistic Concurrency**: Agents read state, perform work, then attempt to write. If state changed during work, re-read and retry.
- **Locking**: Agents acquire locks on state sections before modification. Prevents conflicts but introduces blocking.
- **Event Sourcing**: All state changes are recorded as events. Each agent maintains its own view by replaying events. No conflicts by design.

---

## 4. Task Decomposition

### 4.1 Decomposition Strategies

**Functional Decomposition**: Split by function (research, analysis, writing, review). Each agent handles a different functional role.

**Data Decomposition**: Split by data (Agent A processes customers A-M, Agent B processes N-Z). Each agent handles a portion of the dataset.

**Perspective Decomposition**: Split by viewpoint (technical analysis, business analysis, user experience analysis). Each agent provides a different lens on the same data.

**Temporal Decomposition**: Split by phase (planning, execution, verification). Each agent handles a different temporal phase of the process.

### 4.2 Dependency Management

Model task dependencies as a directed acyclic graph (DAG):
- Identify which tasks must complete before others can start
- Find the critical path (longest chain of dependent tasks)
- Maximize parallelism by scheduling independent tasks concurrently
- Handle dependency failures by propagating cancellation or retrying

### 4.3 Granularity Optimization

Too coarse: agents receive complex tasks they struggle with (back to single-agent problems)
Too fine: excessive communication overhead, coordination complexity dominates execution time

Optimal granularity: each agent's task is completable in 1-5 LLM calls with a focused tool set.

---

## 5. Crew Pattern (CrewAI)

### 5.1 Concept

A "crew" is a team of agents with defined roles, a specific process for collaboration, and a shared goal. Each crew member has a role, backstory, and set of tools. The crew follows a defined process (sequential, hierarchical, or consensual).

### 5.2 Role Definition

Each agent in a crew has:
- **Role**: "Senior Market Researcher" -- defines the agent's function
- **Goal**: "Produce comprehensive market analysis" -- defines success
- **Backstory**: "You have 15 years of experience in market research at Fortune 500 companies" -- establishes expertise and personality
- **Tools**: Specific tools the agent can access
- **Delegation**: Whether this agent can delegate tasks to others

### 5.3 Process Types

**Sequential Process**: Agents execute tasks in order. Task 1 -> Task 2 -> Task 3. Simple, predictable. Best for linear workflows.

**Hierarchical Process**: A manager agent coordinates, delegates tasks dynamically based on progress and results. More adaptive but requires a capable manager agent.

**Consensual Process**: Agents discuss and agree on approach before executing. Best for creative tasks where multiple valid approaches exist.

### 5.4 Task Definition

```python
task = Task(
    description="Analyze the competitive landscape for AI coding assistants",
    agent=market_researcher,
    expected_output="A detailed competitive analysis report with market share data",
    context=[previous_task_result],  # Output from prior tasks
    output_file="competitive_analysis.md"
)
```

---

## 6. Swarm Pattern

### 6.1 Concept

Swarm intelligence emerges from many simple agents following local rules without central coordination. Each agent makes local decisions based on limited information, but collective behavior produces intelligent global outcomes. Inspired by biological systems (ant colonies, bee swarms, flocking birds).

### 6.2 OpenAI Swarm Principles

The Swarm framework implements lightweight multi-agent orchestration through:
- **Handoffs**: Agents transfer control to other agents when the task moves outside their specialty
- **Routines**: Agents follow defined procedures for their specialty area
- **Context Variables**: Shared state that persists across agent handoffs
- **No Central Orchestrator**: Agents decide when to hand off, creating emergent coordination

### 6.3 Handoff Logic

```python
def triage_agent(context):
    """Routes to the appropriate specialist based on the user's need."""
    if context.topic == "billing":
        return billing_agent
    elif context.topic == "technical":
        return technical_agent
    else:
        return general_agent
```

### 6.4 When to Use Swarm vs. Crew

| Dimension | Crew | Swarm |
|-----------|------|-------|
| Coordination | Centralized (manager) | Decentralized (handoffs) |
| Task Type | Complex projects with defined phases | Reactive, routing-based tasks |
| Scalability | Moderate (manager bottleneck) | High (no central bottleneck) |
| Complexity | Higher setup, more capable | Simpler setup, more limited |
| Best For | Content creation, research, analysis | Customer service, triage, routing |

---

## 7. Quality Assurance in Multi-Agent Systems

### 7.1 Verification Agents

Dedicated agents that verify the output of other agents:
- **Fact Checker**: Verifies claims against source documents
- **Code Reviewer**: Validates generated code for correctness and style
- **Consistency Checker**: Ensures outputs from different agents are mutually consistent

### 7.2 Consensus Mechanisms

When multiple agents produce different answers to the same question:
- **Majority Vote**: Take the answer most agents agree on
- **Weighted Vote**: Weight votes by agent expertise and confidence
- **Deliberation**: Have agents discuss disagreements and resolve them
- **Escalation**: Flag irreconcilable disagreements for human review

### 7.3 System-Level Evaluation

Evaluate the multi-agent system holistically:
- End-to-end task success rate
- Total cost (sum of all agent inference costs)
- Total latency (accounting for parallelism)
- Communication overhead (tokens spent on inter-agent messages vs. actual work)
- Error propagation rate (how often one agent's error cascades)

---

## 8. Failure Modes

### 8.1 Coordination Failures

- **Deadlock**: Agents waiting for each other, none progressing
- **Livelock**: Agents continuously responding to each other without making progress
- **Information Loss**: Critical details lost at agent handoff boundaries
- **Echo Chamber**: Agents reinforcing each other's errors instead of catching them

### 8.2 Mitigation

- Implement timeouts at every inter-agent communication point
- Include full context in handoff messages, not just summaries
- Use independent agents (different system prompts) for verification
- Monitor inter-agent message volume for anomalies indicating loops

---

## 9. Key References

- Wu et al. (2023) -- "AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation"
- Hong et al. (2024) -- "MetaGPT: Meta Programming for Multi-Agent Collaborative Framework"
- Li et al. (2023) -- "CAMEL: Communicative Agents for Mind Exploration of Large Language Models"
- CrewAI Documentation -- Crew-based multi-agent orchestration framework
- OpenAI Swarm -- Lightweight multi-agent orchestration framework

---

*This module covers multi-agent systems. See `agent_architecture.md` for individual agent design and `agent_frameworks.md` for implementation tools.*
