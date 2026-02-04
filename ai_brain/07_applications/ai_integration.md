# AI Integration: Production Patterns for LLM-Powered Applications

## Overview

Integrating AI models into production applications requires solving engineering challenges that do not exist in prototyping: streaming responses for real-time UX, caching to reduce cost and latency, implementing fallbacks for reliability, managing costs at scale, and routing between multiple models for optimal cost-quality tradeoffs. This module covers the production-grade patterns that separate reliable AI applications from fragile prototypes.

---

## 1. API Integration Patterns

### 1.1 Direct API Integration

The simplest pattern: your application calls the model provider's API directly.

```
Application --> Model Provider API --> Response
```

**When to Use**: Early-stage products, simple use cases, single-model applications.

**Considerations**:
- Tight coupling to a specific provider
- No abstraction layer for failover or routing
- Rate limits apply directly to your application
- Latency depends entirely on the provider

### 1.2 Gateway Pattern

Insert an API gateway between your application and model providers:

```
Application --> AI Gateway --> Model Provider A
                           --> Model Provider B (fallback)
                           --> Cache Layer
```

**Gateway Responsibilities**:
- Request routing (to different models based on task type)
- Rate limiting and quota management
- Caching (exact match and semantic)
- Fallback logic (retry, failover to alternative provider)
- Logging and observability
- Cost tracking per request

**Implementation Options**:
- Custom gateway (FastAPI, Express)
- Commercial gateways (Portkey, Helicone, LiteLLM)
- Cloud API gateways with custom middleware (AWS API Gateway, Kong)

### 1.3 Unified Model Interface

Abstract model-specific API differences behind a common interface:

```python
class ModelInterface:
    def complete(self, messages, model, temperature, max_tokens, tools):
        """Unified interface for all model providers."""
        pass

class AnthropicAdapter(ModelInterface):
    def complete(self, messages, model, temperature, max_tokens, tools):
        # Translate to Anthropic API format
        pass

class OpenAIAdapter(ModelInterface):
    def complete(self, messages, model, temperature, max_tokens, tools):
        # Translate to OpenAI API format
        pass
```

This enables provider switching without changing application code.

---

## 2. Streaming

### 2.1 Why Streaming Matters

LLM responses take 2-30+ seconds to generate fully. Without streaming, users stare at a loading spinner. With streaming, users see tokens appear in real-time, which:
- Reduces perceived latency by 80%+ (time-to-first-token is typically < 500ms)
- Allows users to start reading and evaluating the response immediately
- Enables early cancellation if the response is clearly off-track
- Creates a more natural, conversational interaction feel

### 2.2 Server-Sent Events (SSE)

The dominant streaming protocol for AI applications:

```
Client                    Server
  |--- POST /chat -------->|
  |<--- SSE: token "Hello" |
  |<--- SSE: token " there"|
  |<--- SSE: token "!"     |
  |<--- SSE: [DONE]        |
```

### 2.3 Streaming Architecture Considerations

**Token Accumulation**: As tokens stream, accumulate them server-side for logging, caching, and post-processing. Do not rely solely on the client to reconstruct the full response.

**Structured Output Streaming**: When streaming JSON or structured outputs, the partial response is not valid JSON until complete. Options:
- Buffer until the complete structure is available, then send at once
- Use a streaming JSON parser that can process partial objects
- Stream the human-readable portion and append the structured data at the end

**Tool Use Streaming**: When the model requests tool calls during streaming, the stream pauses while the tool executes. Communicate this state to the client with a "processing" indicator.

### 2.4 Error Handling in Streams

- Detect mid-stream disconnections and implement automatic reconnection
- Handle partial responses gracefully (do not display half a sentence)
- Implement stream timeout detection (no tokens for > N seconds)
- Provide a fallback to non-streaming mode if SSE is blocked (corporate proxies)

---

## 3. Caching

### 3.1 Exact Match Caching

Cache responses keyed by the exact prompt (or a hash of it). Return cached responses for identical requests.

**Hit Rate**: Highly dependent on application. FAQ bots may see 40-60% hit rates. Creative applications see near-zero hit rates.

**TTL Strategy**: Set time-to-live based on content volatility:
- Static knowledge: 24-72 hours
- Dynamic data: 1-4 hours
- Real-time data: No caching

**Cache Key Design**: Include all parameters that affect output: prompt, model, temperature, max_tokens, tools. Exclude parameters that do not affect output: API key, request ID.

### 3.2 Semantic Caching

Cache responses and match new queries to cached queries using embedding similarity. If a new query is semantically similar (cosine similarity > threshold) to a cached query, return the cached response.

**Implementation**:
1. For each new query, compute its embedding
2. Search the cache for queries with embedding similarity above threshold (e.g., 0.95)
3. If a match is found, return the cached response
4. If no match, call the model, cache both the query embedding and the response

**Threshold Tuning**: Too high (0.99) = rarely matches, low hit rate. Too low (0.85) = matches dissimilar queries, returns inappropriate cached responses. Start at 0.95 and adjust based on feedback.

### 3.3 Prompt Caching (Provider-Level)

Anthropic and OpenAI offer prompt caching that caches the computation of long system prompts:
- First request with a long system prompt: full latency
- Subsequent requests with the same system prompt prefix: reduced latency and cost
- Effective for applications with consistent system prompts and varying user messages

### 3.4 Cache Invalidation

- Invalidate when the underlying data changes (RAG context updates)
- Invalidate when the model version changes
- Invalidate when the prompt template changes
- Implement manual cache clearing for corrections

---

## 4. Fallback and Reliability

### 4.1 Fallback Chain

Define a prioritized chain of model providers:

```
Primary: Claude Sonnet (fast, cost-effective)
    |
    v (on failure)
Secondary: Claude Opus (higher quality)
    |
    v (on failure)
Tertiary: GPT-4o (different provider entirely)
    |
    v (on failure)
Emergency: Cached/template response + human escalation
```

### 4.2 Failure Detection

Detect failures rapidly:
- **Timeout**: No response within N seconds (typically 30-60s)
- **HTTP Errors**: 429 (rate limited), 500/503 (service error)
- **Empty Response**: Model returns an empty or near-empty response
- **Quality Check Failure**: Response fails automated quality validation
- **Format Error**: Response does not match expected schema

### 4.3 Retry Strategy

```
Attempt 1: Primary model, standard parameters
  (wait 1s)
Attempt 2: Primary model, retry with jitter
  (wait 2s)
Attempt 3: Secondary model
  (wait 4s)
Attempt 4: Tertiary model
  (give up: return cached response or escalate)
```

### 4.4 Circuit Breaker Pattern

Track failure rates per model provider. When the failure rate exceeds a threshold (e.g., 50% of requests in the last 5 minutes), "open" the circuit breaker:
- Stop sending requests to the failing provider
- Route all traffic to the secondary provider
- Periodically probe the primary provider with test requests
- When the primary recovers, gradually shift traffic back

---

## 5. Cost Management

### 5.1 Cost Model

LLM costs are driven by token consumption:
```
Cost = (input_tokens * input_price) + (output_tokens * output_price)
```

Input tokens include: system prompt + user message + retrieved context + conversation history.
Output tokens include: the model's response.

### 5.2 Cost Reduction Strategies

**Prompt Optimization**: Reduce system prompt length without sacrificing quality. Every token saved applies to every request.

**Context Window Management**: For RAG applications, retrieve only the most relevant chunks. Fewer chunks = fewer input tokens.

**Conversation History Trimming**: Summarize or truncate older conversation turns instead of sending the full history.

**Output Length Control**: Set max_tokens appropriately. Do not allow the model to generate 4000 tokens when 500 suffice.

**Caching**: Implement exact match and semantic caching to avoid redundant inference.

**Model Selection**: Use the cheapest model that achieves acceptable quality for each task.

### 5.3 Cost Monitoring

Track and alert on:
- Cost per request (average and P95)
- Cost per user session
- Daily and monthly spend by model
- Cost per feature/endpoint
- Token efficiency (quality per dollar spent)

---

## 6. Model Routing

### 6.1 Complexity-Based Routing

Route requests to different models based on estimated task complexity:

```
Simple query (FAQ, factual) --> Small, fast model (Claude Haiku)
Medium query (analysis, summary) --> Medium model (Claude Sonnet)
Complex query (research, creative) --> Large model (Claude Opus)
```

### 6.2 Router Implementation

**Rule-Based Router**: Classify queries using keywords, length, or task type to select the model. Simple but brittle.

**ML-Based Router**: Train a small classifier to predict which model will produce acceptable quality for each query. More accurate but requires training data.

**Cascade Router**: Start with the cheapest model. If its confidence is below threshold, escalate to a more capable model. Optimizes cost by using expensive models only when necessary.

### 6.3 Multi-Model Ensembles

For high-stakes decisions, query multiple models and combine their outputs:
- **Majority Vote**: For classification tasks
- **Best-of-N**: Generate N responses from different models, use an evaluator to select the best
- **Fusion**: Use a model to synthesize the strengths of multiple responses into one

---

## 7. Multi-Model Architecture

### 7.1 Specialized Model Deployment

Different components of the application use different models optimized for their task:

| Component | Model | Rationale |
|-----------|-------|-----------|
| Query Classification | Small fine-tuned model | Low latency, high throughput |
| RAG Generation | Claude Sonnet | Good quality, reasonable cost |
| Code Generation | Claude Opus / Specialized code model | Highest accuracy needed |
| Summarization | Claude Haiku | Simple task, optimize for cost |
| Content Moderation | Safety classifier | Purpose-built, low latency |

### 7.2 Model Version Management

- Pin model versions in production (do not use "latest" aliases)
- Test new model versions on staging before production deployment
- Maintain rollback capability to previous model versions
- Monitor performance metrics across model version transitions

---

## 8. Observability

### 8.1 Request-Level Logging

Log every model interaction:
- Input prompt (redacting PII)
- Model response
- Model version, temperature, max_tokens
- Latency (TTFT and total)
- Token counts (input and output)
- Cost
- Cache hit/miss

### 8.2 Trace-Level Observability

For complex pipelines (RAG, agents, chains):
- Trace the complete execution path
- Link parent and child spans (retrieval -> reranking -> generation)
- Measure latency and cost at each step
- Identify bottlenecks in the pipeline

### 8.3 Quality Monitoring

- Sample production outputs for automated quality evaluation
- Track quality metrics over time (daily/weekly trends)
- Alert on quality degradation
- Correlate quality changes with model updates, prompt changes, or data shifts

---

## 9. Key References

- Anthropic API Documentation -- Streaming, tool use, prompt caching
- OpenAI API Documentation -- Function calling, structured outputs
- Helicone Documentation -- AI observability and gateway patterns
- Portkey Documentation -- AI gateway, routing, and reliability patterns

---

*This module covers production AI integration. See `ai_product_design.md` for UX patterns and `ai_safety.md` for safety considerations.*
