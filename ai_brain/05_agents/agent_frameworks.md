# Agent Frameworks: Tools and Platforms for Building AI Agents

## Overview

Agent frameworks provide the scaffolding for building, deploying, and managing AI agents without implementing core infrastructure from scratch. They handle the reasoning loop, tool integration, memory management, and orchestration patterns, allowing developers to focus on domain-specific logic. This module evaluates the major frameworks, their architectural approaches, strengths, and limitations, with guidance on framework selection and evaluation methodology.

---

## 1. Framework Selection Criteria

### 1.1 Evaluation Dimensions

When selecting an agent framework, evaluate against these dimensions:

| Dimension | Description | Why It Matters |
|-----------|-------------|----------------|
| Abstraction Level | How much the framework hides vs. exposes | High abstraction = faster development, less control |
| Model Support | Which LLM providers are supported | Avoid vendor lock-in, enable model routing |
| Tool Ecosystem | Pre-built tools and tool creation patterns | Reduces integration effort |
| Memory Support | Built-in memory types and persistence | Critical for stateful agents |
| Observability | Logging, tracing, debugging capabilities | Essential for production |
| Community | Size, activity, documentation quality | Determines support and longevity |
| Production Readiness | Streaming, error handling, scalability | Non-negotiable for production use |

### 1.2 Build vs. Buy Decision

**Build Custom**: When you need maximum control, have unique requirements, or the framework abstraction does not match your architecture. Custom agents require implementing the reasoning loop, tool execution, memory, and error handling from scratch.

**Use Framework**: When the framework's abstractions match your use case, development speed matters, and you benefit from the framework's pre-built integrations and community.

**Hybrid Approach**: Use a framework for orchestration but implement custom components where needed. Most frameworks support this through plugin architectures.

---

## 2. LangChain / LangGraph

### 2.1 Architecture

LangChain provides composable components for LLM applications. LangGraph extends LangChain with a graph-based orchestration layer for building stateful, multi-actor applications.

**LangChain Core**: Abstractions for models, prompts, output parsers, chains, and tools. The "chain" pattern composes multiple LLM calls into a pipeline.

**LangGraph**: Models agent workflows as state machines represented by directed graphs. Nodes are functions (LLM calls, tool executions, conditional logic). Edges define transitions between nodes, optionally conditioned on state.

### 2.2 Key Capabilities

- **State Management**: LangGraph maintains typed state throughout the graph execution, with support for checkpointing and time-travel debugging
- **Human-in-the-Loop**: Built-in patterns for pausing execution to await human input
- **Streaming**: Supports token-level streaming and event-based streaming for real-time UI updates
- **Persistence**: Checkpoint state to databases for long-running agent processes
- **Tool Calling**: Unified tool calling interface across model providers

### 2.3 Strengths

- Largest ecosystem of pre-built integrations (200+ tool/retriever integrations)
- LangGraph provides fine-grained control over agent execution flow
- Strong TypeScript support alongside Python
- LangSmith provides observability, evaluation, and monitoring
- Active community and rapid development pace

### 2.4 Limitations

- Steep learning curve due to abstraction layers and rapidly evolving API
- Over-abstraction can obscure what the agent is actually doing
- Performance overhead from abstraction layers
- Frequent breaking changes between versions
- Debugging complex chains requires understanding the internal execution model

### 2.5 Best For

Complex agent architectures requiring fine-grained control over execution flow, applications needing extensive third-party integrations, teams that want a comprehensive observability platform (LangSmith).

---

## 3. LlamaIndex

### 3.1 Architecture

LlamaIndex (formerly GPT Index) focuses on connecting LLMs with external data. While it started as a RAG-focused framework, it has evolved into a comprehensive agent framework with strong data integration capabilities.

**Core Data Abstractions**: Documents, nodes, indices, and query engines. LlamaIndex provides sophisticated data ingestion, indexing, and retrieval pipelines.

**Agent Framework**: Builds on the data abstractions to create agents that can reason over structured and unstructured data using tools and sub-queries.

### 3.2 Key Capabilities

- **Data Connectors**: 160+ data source integrations (databases, APIs, file formats)
- **Advanced RAG**: Sophisticated retrieval strategies including recursive retrieval, hybrid search, and query transformation
- **Structured Data Agents**: Agents that can query SQL databases, pandas DataFrames, and knowledge graphs
- **Workflow Engine**: LlamaIndex Workflows provides an event-driven orchestration system
- **Evaluation Framework**: Built-in evaluation tools for RAG quality assessment

### 3.3 Strengths

- Best-in-class data integration and RAG capabilities
- Strong support for structured data (SQL, knowledge graphs)
- Clean abstractions for data-intensive applications
- Excellent documentation and tutorial content
- Lower abstraction overhead than LangChain for data-focused use cases

### 3.4 Limitations

- Agent capabilities less mature than dedicated agent frameworks
- Smaller tool ecosystem compared to LangChain
- Less community activity and fewer third-party extensions
- Workflow engine is newer and less battle-tested

### 3.5 Best For

Data-intensive applications where the agent needs to reason over multiple data sources, RAG-heavy applications requiring sophisticated retrieval, applications involving structured data (databases, APIs).

---

## 4. Anthropic Tool Use (Claude Agents)

### 4.1 Architecture

Anthropic's approach to agents uses Claude's native tool use capability. Rather than an external framework managing the agent loop, the model itself manages the reasoning and tool calling cycle.

**Tool Definition**: Define tools as JSON schemas that describe function names, parameters, and descriptions. Claude decides when and how to call tools based on the conversation context.

**Agent Loop**: The calling application manages a simple loop: send messages to Claude, if Claude responds with tool use requests, execute the tools, send results back to Claude, repeat until Claude produces a final text response.

### 4.2 Key Capabilities

- **Native Tool Use**: Tool calling is a core model capability, not an external framework feature
- **Extended Thinking**: Claude can reason through complex problems with visible thought process
- **Computer Use**: Native ability to interact with computer interfaces (experimental)
- **Parallel Tool Calls**: Claude can request multiple tool calls simultaneously for efficiency
- **Streaming**: Full streaming support including tool use events

### 4.3 Strengths

- Minimal framework overhead -- the model handles reasoning natively
- Extremely reliable tool calling with strong parameter construction
- Extended thinking provides transparent reasoning chains
- Simple implementation -- just a loop calling the API
- No framework lock-in -- standard API patterns

### 4.4 Limitations

- Single-model approach (Claude only, no model routing without custom code)
- No built-in memory management (must implement externally)
- No built-in orchestration for multi-agent systems
- No pre-built tool integrations (must implement tools yourself)
- Observability requires custom instrumentation

### 4.5 Best For

Applications where reliability and simplicity are paramount, teams that want full control without framework overhead, single-agent use cases where Claude's native capabilities suffice.

---

## 5. AutoGen

### 5.1 Architecture

Microsoft's AutoGen framework enables multi-agent conversations where agents communicate through natural language messages. Agents can be LLM-backed, tool-backed, or human proxies.

### 5.2 Key Capabilities

- **Conversational Agents**: Agents interact through natural language dialogue
- **Human Proxy Agents**: Human-in-the-loop agents that participate in agent conversations
- **Group Chat**: Multiple agents participate in a shared conversation with configurable speaking order
- **Code Execution**: Built-in safe code execution environments for coding agents
- **Nested Conversations**: Agents can have private sub-conversations to resolve sub-tasks

### 5.3 Strengths

- Natural conversational multi-agent paradigm
- Strong support for coding tasks with sandboxed execution
- Flexible group chat patterns for collaborative problem solving
- Good support for human-in-the-loop workflows

### 5.4 Limitations

- Conversation-based approach can be verbose and token-intensive
- Less control over execution flow compared to graph-based frameworks
- Production deployment patterns less mature
- Debugging multi-agent conversations is challenging

### 5.5 Best For

Collaborative multi-agent applications, coding assistants, research workflows where agents need to discuss and iterate.

---

## 6. CrewAI

### 6.1 Architecture

CrewAI implements the crew metaphor: agents are crew members with roles, goals, and backstories. Crews follow defined processes (sequential, hierarchical) to accomplish goals.

### 6.2 Key Capabilities

- **Role-Based Agents**: Rich agent definitions with role, goal, backstory, and tools
- **Process Types**: Sequential and hierarchical execution patterns
- **Task Delegation**: Agents can delegate tasks to other agents
- **Memory**: Short-term, long-term, and entity memory built in
- **Training**: Agents can be trained on feedback to improve over time

### 6.3 Strengths

- Intuitive mental model (teams of specialists working together)
- Low barrier to entry with simple, declarative API
- Built-in memory and learning capabilities
- Good for business process automation use cases

### 6.4 Limitations

- Less flexible than graph-based frameworks for complex workflows
- Limited control over inter-agent communication
- Newer framework with less battle-testing at scale
- Performance can degrade with large crews

### 6.5 Best For

Business process automation, content production pipelines, research and analysis workflows, teams wanting an intuitive multi-agent framework.

---

## 7. Framework Comparison Matrix

| Feature | LangGraph | LlamaIndex | Anthropic Native | AutoGen | CrewAI |
|---------|-----------|------------|------------------|---------|--------|
| Ease of Use | Medium | Medium | High | Medium | High |
| Flexibility | Very High | High | Very High | Medium | Medium |
| Multi-Agent | Yes | Limited | Manual | Yes | Yes |
| RAG Support | Good | Excellent | Manual | Limited | Limited |
| Observability | LangSmith | Built-in | Manual | Limited | Limited |
| Production Ready | Yes | Yes | Yes | Developing | Developing |
| Model Agnostic | Yes | Yes | No (Claude) | Yes | Yes |
| Memory Built-in | Yes | Yes | No | Yes | Yes |

---

## 8. Evaluation Methodology

### 8.1 Benchmarking Frameworks

To evaluate frameworks for your use case:

1. **Define Benchmark Tasks**: Create 10-20 representative tasks from your domain
2. **Implement in Each Framework**: Build the same agent in each candidate framework
3. **Measure Performance**: Task success rate, latency, token cost, development time
4. **Assess Developer Experience**: Time to implement, debugging ease, documentation quality
5. **Evaluate Production Fitness**: Error handling, monitoring, scaling capabilities
6. **Compare Total Cost**: License, infrastructure, development, and maintenance costs

### 8.2 Common Evaluation Benchmarks

| Benchmark | What It Tests | Framework Relevance |
|-----------|---------------|---------------------|
| GAIA | General AI assistant tasks | Overall agent capability |
| SWE-bench | Software engineering tasks | Coding agent quality |
| WebArena | Web navigation tasks | Tool use and planning |
| ToolBench | Tool selection and usage | Tool calling accuracy |
| HotPotQA | Multi-hop question answering | RAG and reasoning |

### 8.3 Production Evaluation

Beyond benchmarks, evaluate production readiness:
- How does the framework handle model API outages?
- What happens when a tool throws an unexpected error?
- Can the framework recover from partial failures in multi-step workflows?
- What is the overhead per agent step (framework code execution time vs. LLM call time)?
- How does memory consumption scale with conversation length?

---

## 9. Migration Strategies

### 9.1 Framework Migration

If you need to switch frameworks:
- Abstract tool definitions into a framework-agnostic format
- Separate business logic from framework-specific orchestration code
- Implement adapters that map framework-specific interfaces to your abstractions
- Migrate incrementally, running old and new frameworks in parallel during transition

### 9.2 Future-Proofing

The agent framework landscape is evolving rapidly. Protect your investment:
- Keep tool implementations framework-agnostic
- Use dependency injection for framework components
- Maintain comprehensive tests that validate agent behavior, not framework internals
- Document your architectural decisions and the reasoning behind framework choices

---

## 10. Key References

- LangChain Documentation -- https://docs.langchain.com
- LlamaIndex Documentation -- https://docs.llamaindex.ai
- Anthropic Documentation -- https://docs.anthropic.com
- AutoGen Documentation -- https://microsoft.github.io/autogen
- CrewAI Documentation -- https://docs.crewai.com

---

*This module covers agent frameworks. See `agent_architecture.md` for design principles and `multi_agent_systems.md` for orchestration patterns.*
