# Cost Optimization: Managing AI Inference Economics at Scale

## Overview

AI inference costs can dominate the economics of AI-powered products. A single customer interaction may require multiple model calls (retrieval, generation, evaluation), each consuming tokens that translate directly to cost. At scale, unoptimized AI inference can make otherwise viable products uneconomical. This module covers systematic approaches to reducing AI costs while maintaining quality: token optimization, semantic caching, intelligent model routing, batch processing, and rate limiting strategies.

---

## 1. Understanding AI Cost Structure

### 1.1 Token-Based Pricing Model

Most AI providers charge per token, with separate rates for input and output tokens:

| Provider/Model | Input (per 1M tokens) | Output (per 1M tokens) | Ratio |
|---------------|----------------------|------------------------|-------|
| Claude Haiku | $0.25 | $1.25 | 5x |
| Claude Sonnet | $3.00 | $15.00 | 5x |
| Claude Opus | $15.00 | $75.00 | 5x |
| GPT-4o | $2.50 | $10.00 | 4x |
| GPT-4o-mini | $0.15 | $0.60 | 4x |

*Note: Prices are approximate and change frequently. Always verify current pricing.*

### 1.2 Cost Anatomy of a Typical Request

For a RAG-based customer support bot:

```
System prompt:              800 tokens   (input)
Retrieved context:        2,000 tokens   (input)
Conversation history:     1,500 tokens   (input)
User message:               100 tokens   (input)
Total input:              4,400 tokens
Model response:             500 tokens   (output)

Cost per request (Claude Sonnet): $0.013 + $0.0075 = ~$0.02
Cost per 1,000 requests: ~$20
Cost per 100,000 requests/month: ~$2,000
```

### 1.3 Cost Multipliers

Real-world applications often require multiple model calls per user interaction:

| Call | Purpose | Model | Tokens |
|------|---------|-------|--------|
| 1 | Query classification | Haiku | 200 in, 50 out |
| 2 | Query expansion for retrieval | Haiku | 300 in, 100 out |
| 3 | Main generation | Sonnet | 4,400 in, 500 out |
| 4 | Output quality check | Haiku | 600 in, 100 out |
| 5 | Content safety check | Classifier | 500 in, 50 out |

The true cost per interaction is the sum of all calls, which can be 2-5x the cost of the main generation call alone.

---

## 2. Token Optimization

### 2.1 System Prompt Compression

The system prompt is sent with every request. Even small reductions multiply across all requests.

**Techniques**:
- Remove redundant instructions (say the same thing once, not three ways)
- Replace verbose explanations with concise directives
- Use structured format (bullets) instead of prose for instructions
- Eliminate examples that are not strictly necessary
- Measure quality impact of each removal to find the minimum effective prompt

**Example Optimization**:
```
Before (350 tokens):
"You are a highly skilled customer support agent working for Acme Corp.
Your job is to help customers with their questions and concerns. You should
always be polite and professional in your responses. When a customer asks
about our refund policy, you should refer to our standard refund policy
which states that customers can request a refund within 30 days of purchase.
You should always try to resolve the customer's issue on the first contact..."

After (120 tokens):
"You are Acme Corp customer support. Be polite and professional.
Key policies: Refunds within 30 days of purchase. Resolve on first contact.
If unsure, escalate to human agent."
```

Savings: 230 tokens per request. At 100K requests/month on Claude Sonnet: ~$69/month saved.

### 2.2 Context Window Optimization

**RAG Context Trimming**: Retrieve more chunks than needed, rerank, and include only the top N. Reducing from 5 chunks to 3 chunks may save 800-1200 tokens with minimal quality impact.

**Conversation History Management**: Instead of sending the full conversation history:
- Summarize older turns into a concise context summary
- Keep only the most recent 3-5 turns in full
- Remove messages that are no longer relevant to the current topic

**Dynamic Context**: Include context sections only when relevant to the current query. A routing step can determine which context sections are needed.

### 2.3 Output Length Control

**max_tokens**: Set this to the minimum needed for the task. For classification, set max_tokens=100. For generation, set max_tokens based on the expected response length plus a buffer.

**Instruction-Based Length Control**: "Respond in 2-3 sentences" is often more effective and cheaper than generating a long response and truncating.

**Stop Sequences**: Define stop sequences that terminate generation when the task is complete, preventing unnecessary token generation.

---

## 3. Semantic Caching

### 3.1 Architecture

```
User Query
    |
    v
[Embed Query]
    |
    v
[Search Cache (cosine similarity)]
    |
    +--> Cache Hit (similarity > threshold) --> Return cached response
    |
    +--> Cache Miss --> Call model --> Cache response --> Return response
```

### 3.2 Implementation Details

**Cache Storage**: Store (query_embedding, response, metadata) tuples in a vector database.

**Similarity Threshold**: Start at 0.95 cosine similarity. Higher = fewer false positives but lower hit rate. Lower = more hits but risk of returning inappropriate cached responses.

**Cache Invalidation**: Invalidate entries when:
- Underlying data changes (RAG context is updated)
- Model version changes (new model may produce different/better responses)
- Time-based expiry (content becomes stale)
- Quality feedback indicates the cached response was wrong

### 3.3 Expected Impact

| Application Type | Expected Hit Rate | Cost Reduction |
|-----------------|-------------------|----------------|
| FAQ Bot | 40-60% | 30-50% |
| Customer Support | 20-40% | 15-30% |
| Content Generation | 5-15% | 5-10% |
| Code Generation | 10-25% | 8-15% |

### 3.4 Risks and Mitigations

**Stale Responses**: Cached responses may become outdated. Mitigate with TTL-based expiry.

**Privacy**: Cached responses from one user could be served to another. Mitigate by including user-specific context in the cache key or maintaining per-user caches.

**Quality**: Semantic similarity does not guarantee the same response is appropriate. Mitigate by including metadata (user intent, entity references) in the similarity computation.

---

## 4. Model Routing by Complexity

### 4.1 Tiered Model Strategy

Route each request to the cheapest model capable of handling it:

```
User Query
    |
    v
[Complexity Classifier (Haiku)]
    |
    +--> Simple (60% of queries) --> Haiku ($0.001/request)
    |
    +--> Medium (30% of queries) --> Sonnet ($0.02/request)
    |
    +--> Complex (10% of queries) --> Opus ($0.10/request)
```

**Expected Cost**: 0.6 * $0.001 + 0.3 * $0.02 + 0.1 * $0.10 = $0.0166/request

**Without Routing** (all Sonnet): $0.02/request

**Savings**: 17% (and can be higher if the simple/complex distribution is more skewed)

### 4.2 Complexity Classification

Train or prompt a small model to classify query complexity:

**Rule-Based Features**:
- Query length (shorter queries tend to be simpler)
- Domain keywords (specific domain terms may indicate complexity)
- Question type (factual vs. analytical vs. creative)
- Required context (single-document vs. multi-document)

**ML-Based Classification**: Fine-tune a small classifier on labeled (query, optimal_model) pairs. Use production logs to build the training dataset: for each query, test which model produces acceptable quality and label with the cheapest acceptable model.

### 4.3 Cascade Routing

Start with the cheapest model. If its confidence is below threshold, escalate:

```
Step 1: Haiku generates response with confidence score
  If confidence > 0.9: return response
  If confidence <= 0.9: escalate

Step 2: Sonnet generates response with confidence score
  If confidence > 0.85: return response
  If confidence <= 0.85: escalate

Step 3: Opus generates response (always return)
```

This adds latency for escalated requests but optimizes cost for the majority of simple requests.

---

## 5. Batch Processing

### 5.1 When to Batch

Batch processing is appropriate for non-real-time tasks:
- Document classification pipelines
- Content moderation queues
- Periodic report generation
- Data extraction from document archives
- Email campaign personalization

### 5.2 Batch API Benefits

Most providers offer batch APIs with significant discounts:
- Anthropic Batch API: 50% cost reduction vs. real-time
- OpenAI Batch API: 50% cost reduction with 24-hour SLA

### 5.3 Batch Processing Architecture

```
Input Queue --> [Batch Aggregator] --> [Batch API Call] --> [Result Parser] --> Output Store
                    |                                            |
                    v                                            v
              [Wait for N items                          [Retry failed
               or T seconds]                              items individually]
```

### 5.4 Batch Optimization

- Group similar requests to maximize cache hits within the batch
- Order requests by priority within the batch
- Implement partial result delivery (do not wait for the entire batch to complete)
- Monitor and retry individual failed requests without re-processing the entire batch

---

## 6. Rate Limiting and Quota Management

### 6.1 Provider Rate Limits

Each provider imposes rate limits:
- **Requests per minute (RPM)**: Maximum number of API calls per minute
- **Tokens per minute (TPM)**: Maximum token throughput per minute
- **Tokens per day (TPD)**: Daily token budget

Exceeding limits results in 429 errors and forced backoff.

### 6.2 Client-Side Rate Limiting

Implement rate limiting in your application to stay within provider limits and control costs:

**Token Bucket**: Allow bursts up to a maximum, then enforce a steady rate. Handles traffic spikes without exceeding limits.

**Per-User Quotas**: Limit the number of AI requests per user per time period. Prevents individual users from consuming disproportionate resources.

**Per-Feature Quotas**: Allocate different token budgets to different features based on business priority.

### 6.3 Cost Alerts and Guardrails

- Set daily and monthly spend limits with hard cutoffs
- Alert at 50%, 75%, and 90% of budget thresholds
- Implement automatic quality degradation (route to cheaper model) when approaching limits
- Maintain a dashboard showing real-time cost tracking

---

## 7. Cost Monitoring and Attribution

### 7.1 Cost Attribution

Track costs at multiple levels:
- Per request (for debugging and optimization)
- Per user (for usage-based pricing)
- Per feature (for product economics)
- Per team (for internal chargeback)
- Per model (for routing optimization)

### 7.2 Unit Economics

Calculate and track:
- **Cost per conversation**: Total AI cost for a complete user interaction
- **Cost per resolution**: For support bots, cost to resolve a customer issue
- **Cost per document**: For document processing, cost per document processed
- **AI cost as % of revenue**: The portion of revenue consumed by AI inference

### 7.3 Optimization Roadmap

Prioritize optimizations by impact:

| Optimization | Implementation Effort | Expected Savings |
|-------------|----------------------|-----------------|
| System prompt compression | Low | 5-15% |
| Output length control | Low | 5-10% |
| Model routing | Medium | 15-40% |
| Semantic caching | Medium | 10-50% (varies) |
| Batch processing | Medium | 40-50% (for eligible tasks) |
| Prompt caching (provider) | Low | 10-30% (on input costs) |
| Context trimming | Medium | 10-20% |

---

## 8. Key References

- Anthropic Pricing Documentation -- Current token pricing and batch API
- OpenAI Pricing Documentation -- Current token pricing and batch API
- Chen et al. (2023) -- "FrugalGPT: How to Use Large Language Models While Reducing Cost"
- Ding et al. (2024) -- "Hybrid LLM: Cost-Efficient and Quality-Aware Query Routing"

---

*This module covers cost optimization. See `ml_infrastructure.md` for compute infrastructure and `model_serving.md` for inference optimization.*
