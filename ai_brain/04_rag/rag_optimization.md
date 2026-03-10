# RAG Optimization: Evaluation, Advanced Techniques, and Production Tuning

## Overview

RAG system quality is not determined by any single component but by the interaction of chunking, embedding, retrieval, reranking, and generation stages. This module covers systematic evaluation of RAG systems, advanced retrieval techniques that significantly improve performance, and production tuning strategies for cost-quality optimization.

---

## 1. RAG Evaluation Framework

### 1.1 The RAG Triad

RAG system quality is measured along three orthogonal dimensions (the "RAG Triad"):

**Context Relevance**: Are the retrieved documents relevant to the query? Measured independently of the generated answer. Low context relevance indicates a retrieval problem.

**Faithfulness (Groundedness)**: Is the generated answer supported by the retrieved context? Does the model hallucinate information not present in the context? Low faithfulness indicates a generation problem.

**Answer Relevance**: Does the generated answer actually address the user's query? An answer can be faithful to the context but irrelevant if the wrong context was retrieved. Low answer relevance can indicate either a retrieval or generation problem.

### 1.2 Evaluation Metrics

**Context Precision**: Of the retrieved documents, what fraction are relevant to the query? Measures retrieval quality. Calculated by having an evaluator (human or LLM) label each retrieved chunk as relevant or not.

```
Context Precision = # relevant chunks retrieved / # total chunks retrieved
```

**Context Recall**: Of all relevant documents in the corpus, what fraction were retrieved? Measures retrieval completeness. Requires ground truth annotations of which documents are relevant for each query.

```
Context Recall = # relevant chunks retrieved / # relevant chunks in corpus
```

**Faithfulness Score**: Fraction of claims in the generated answer that are supported by the retrieved context. Decompose the answer into individual claims, then verify each claim against the context.

```
Faithfulness = # supported claims / # total claims in answer
```

**Answer Relevance**: Degree to which the answer addresses the original query. Measured by generating hypothetical questions from the answer and computing semantic similarity to the original query.

**Answer Correctness**: Comparison of the generated answer to a ground truth reference answer. Combines semantic similarity with factual overlap.

### 1.3 Evaluation Tools

| Tool | Approach | Strengths |
|------|----------|-----------|
| RAGAS | LLM-based metrics for all triad dimensions | Comprehensive, automated |
| ARES | Prediction-powered inference for RAG evaluation | Statistical rigor |
| TruLens | Feedback functions for LLM app evaluation | Real-time monitoring |
| DeepEval | Unit-testing framework for LLM outputs | CI/CD integration |
| Custom LLM-as-Judge | Task-specific evaluation prompts | Maximum flexibility |

### 1.4 Building an Evaluation Dataset

A robust evaluation dataset contains:
- **50-200 query-answer pairs** with human-verified ground truth answers
- **Relevant document annotations** for each query (which chunks should be retrieved)
- **Difficulty stratification**: Easy (answer in single chunk), medium (answer across chunks), hard (requires synthesis or the answer is not in the corpus)
- **Edge cases**: Queries with no relevant documents, ambiguous queries, multi-topic queries

---

## 2. Advanced RAG Techniques

### 2.1 HyDE (Hypothetical Document Embeddings)

**Problem**: User queries and documents occupy different regions of embedding space. Questions are short and interrogative; documents are long and declarative. This semantic gap reduces retrieval quality.

**Solution**: Generate a hypothetical answer to the query (without retrieval), then embed this hypothetical answer and use it as the retrieval query. The hypothesis is closer to actual documents in embedding space.

**Implementation**:
1. Send the query to an LLM: "Answer this question based on your knowledge: {query}"
2. Embed the generated hypothetical answer
3. Use the hypothetical answer embedding to search the vector database
4. Retrieve chunks similar to the hypothetical answer
5. Generate the final answer using the retrieved (real) chunks

**When to Use**: Queries that are very different in form from documents. Short questions against long-form documents. Domain-specific terminology where the user phrases the query differently than the document uses.

**Limitations**: The hypothetical answer may be incorrect, leading retrieval astray. Adds one LLM call of latency. Most effective when combined with the original query embedding (dual retrieval).

### 2.2 Query Decomposition

**Problem**: Complex queries require information from multiple topics or document sections that may not be co-located.

**Solution**: Decompose the query into sub-queries, retrieve for each sub-query independently, then synthesize.

**Implementation**:
1. Send the query to an LLM: "Break this question into independent sub-questions: {query}"
2. Retrieve relevant chunks for each sub-question separately
3. Deduplicate retrieved chunks across sub-questions
4. Generate the final answer using all retrieved chunks
5. Instruct the model to synthesize across sub-question results

**Example**:
- Original: "How does Company X's pricing compare to Company Y, and which is better for startups?"
- Sub-query 1: "What is Company X's pricing?"
- Sub-query 2: "What is Company Y's pricing?"
- Sub-query 3: "What features are important for startups?"

### 2.3 Multi-Step Retrieval (Iterative RAG)

**Problem**: The initial retrieval may not surface sufficient information, or the retrieved information reveals that additional information is needed.

**Solution**: Implement a retrieval loop where the model can request additional information based on what has been retrieved so far.

**Implementation**:
1. Initial retrieval based on the user query
2. Present retrieved context to the model
3. Ask the model: "Based on this context, can you fully answer the question? If not, what additional information do you need?"
4. If additional information is needed, formulate a follow-up retrieval query
5. Retrieve additional context and add it to the accumulated context
6. Repeat until the model indicates sufficient information or max iterations reached
7. Generate the final answer from the accumulated context

### 2.4 Parent Document Retrieval

**Problem**: Small chunks improve retrieval precision (more focused matching) but provide insufficient context for generation (missing surrounding information).

**Solution**: Index small chunks for retrieval but return the larger parent document (or a larger surrounding window) for generation.

**Implementation**:
1. Split documents into small chunks (256-512 tokens) for indexing
2. Maintain a mapping from each small chunk to its parent document or larger section
3. At retrieval time, find the most relevant small chunks
4. Look up the parent documents for those chunks
5. Pass the larger parent documents to the generation model

### 2.5 Sentence Window Retrieval

A variant of parent document retrieval where instead of returning the full parent, return a fixed window of sentences surrounding the matched chunk. This provides additional context without overwhelming the generation model with irrelevant content.

### 2.6 Contextual Compression

**Problem**: Retrieved chunks contain both relevant and irrelevant information. The irrelevant portions consume token budget and can distract the generation model.

**Solution**: After retrieval, compress each chunk to retain only the information relevant to the query.

**Implementation**:
1. Retrieve chunks using standard methods
2. For each chunk, prompt an LLM: "Extract only the information from this passage that is relevant to answering: {query}"
3. Use the compressed chunks as context for generation

**Tradeoff**: Adds one LLM call per chunk. The compression model may accidentally remove relevant information. Best applied when token budget is severely constrained.

---

## 3. Retrieval Quality Improvement

### 3.1 Embedding Model Fine-Tuning

Fine-tune the embedding model on domain-specific query-document pairs to improve retrieval in specialized domains. Even a small fine-tuning dataset (1000-5000 pairs) can significantly improve domain-specific retrieval quality.

### 3.2 Chunk Size Optimization

Run a systematic experiment:
1. Create evaluation dataset with ground truth relevant chunks
2. Chunk the corpus at multiple sizes: 256, 512, 1024, 2048 tokens
3. For each chunk size, run all evaluation queries
4. Measure context precision and recall at each size
5. Select the size that maximizes the target metric

### 3.3 Metadata-Augmented Retrieval

Augment the embedding search with metadata-based filtering and boosting:
- Boost documents from authoritative sources
- Filter by recency for time-sensitive queries
- Weight by document quality scores
- Apply category filters based on query intent classification

### 3.4 Reranking Calibration

The reranker's score threshold determines how many documents pass to generation. Calibrate by:
1. Running the reranker on the evaluation dataset
2. Plotting precision-recall curves at different score thresholds
3. Selecting the threshold that optimizes the target metric
4. Monitoring threshold performance on production traffic

---

## 4. Generation Quality Improvement

### 4.1 Prompt Optimization for RAG

The generation prompt should include:
- Clear instructions to base the answer on provided context
- Explicit handling for when context is insufficient
- Citation requirements (cite source documents)
- Format specifications for the answer
- Instruction to not introduce information not present in the context

### 4.2 Handling Contradictions

When retrieved documents contain contradictory information:
- Instruct the model to identify and present both perspectives
- Use document metadata (date, authority) to weight conflicting information
- Ask the model to note the contradiction explicitly

### 4.3 Handling Insufficient Context

When the retrieved context does not contain enough information:
- Instruct the model to clearly state what information is missing
- Offer to reformulate the query for better retrieval
- Distinguish between "not found in documents" and "not in the knowledge base"

---

## 5. Production Tuning

### 5.1 Latency Optimization

| Technique | Latency Reduction | Quality Impact |
|-----------|-------------------|----------------|
| Reduce top-k from 20 to 5 | 20-40% | Moderate recall decrease |
| Skip reranking | 30-50% | Significant precision decrease |
| Pre-compute common queries | 80-95% | None (cache hit) |
| Use smaller embedding model | 10-20% | Slight quality decrease |
| Async retrieval + generation | 20-30% | None |

### 5.2 Cost Optimization

- **Token Budgeting**: Limit context size to control generation costs
- **Semantic Caching**: Cache answers for semantically similar queries
- **Tiered Retrieval**: Use cheap retrieval for simple queries, expensive retrieval for complex ones
- **Model Routing**: Use smaller models for straightforward queries, larger models for complex synthesis
- **Batch Processing**: For non-real-time use cases, batch queries to amortize overhead

### 5.3 Quality Monitoring

Deploy continuous evaluation in production:
- Sample 1-5% of production queries for automated evaluation
- Track the RAG Triad metrics over time
- Alert on metric degradation
- Correlate quality metrics with user feedback signals
- Log retrieval and generation details for debugging failures

### 5.4 A/B Testing RAG Changes

When modifying any component of the RAG pipeline:
- Run the new configuration alongside the existing one
- Split traffic between configurations
- Measure quality metrics on both configurations
- Require statistical significance before deploying changes

---

## 6. Common Failure Modes and Remediation

| Failure Mode | Symptoms | Root Cause | Remediation |
|-------------|----------|------------|-------------|
| Poor retrieval | Low context relevance | Bad chunking or embedding | Re-chunk, fine-tune embeddings |
| Hallucination | Low faithfulness | Weak grounding prompt | Strengthen grounding instructions |
| Missed context | Low recall | Insufficient top-k | Increase top-k, add hybrid search |
| Irrelevant results | Low precision | No reranking | Add cross-encoder reranker |
| Stale answers | Factually outdated | Old documents | Implement freshness scoring |
| Lost in the middle | Misses middle context | LLM attention pattern | Reorder context by relevance |

---

## 7. Key References

- Es et al. (2024) -- "RAGAS: Automated Evaluation of Retrieval Augmented Generation"
- Gao et al. (2024) -- "Retrieval-Augmented Generation for Large Language Models: A Survey"
- Saad-Falcon et al. (2023) -- "ARES: An Automated Evaluation Framework for RAG"
- Ma et al. (2023) -- "Query Rewriting for Retrieval-Augmented Large Language Models"
- Gao et al. (2023) -- "Precise Zero-Shot Dense Retrieval without Relevance Labels" (HyDE)

---

*This module covers RAG evaluation and optimization. See `rag_architecture.md` for pipeline design and `vector_databases.md` for the storage layer.*
