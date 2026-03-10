# RAG Architecture: Building Retrieval-Augmented Generation Systems

## Overview

Retrieval-Augmented Generation (RAG) combines the generative capabilities of large language models with external knowledge retrieval, producing responses that are grounded in specific, verifiable source documents. This module covers the complete RAG pipeline architecture, from document ingestion through retrieval to generation, with emphasis on design decisions that determine system quality.

---

## 1. RAG Pipeline Architecture

### 1.1 Core Components

A production RAG system consists of five primary stages:

**Ingestion Pipeline**: Documents are collected, cleaned, chunked, embedded, and stored in a vector database. This is an offline process that runs when new documents are added to the knowledge base.

**Query Processing**: The user's query is analyzed, potentially transformed, and prepared for retrieval. This may involve query expansion, decomposition, or reformulation.

**Retrieval**: The processed query is used to search the vector database and/or traditional search indices. Multiple retrieval strategies may be combined.

**Reranking**: Retrieved documents are re-scored using a more sophisticated model to improve precision. This stage filters out false positives from the initial retrieval.

**Generation**: The reranked context is injected into the LLM prompt alongside the user query. The model generates a response grounded in the retrieved documents.

### 1.2 Architectural Diagram

```
Documents --> [Chunking] --> [Embedding] --> [Vector DB]
                                                  |
User Query --> [Query Processing] --> [Retrieval] --> [Reranking] --> [Generation] --> Response
                                          |
                                    [Sparse Index] (optional hybrid)
```

### 1.3 Design Decisions Matrix

| Decision | Options | Tradeoff |
|----------|---------|----------|
| Chunk size | 256-2048 tokens | Smaller = more precise retrieval, larger = more context |
| Chunk overlap | 0-25% of chunk size | More overlap = redundancy but better boundary coverage |
| Embedding model | OpenAI, Cohere, open-source | Quality vs. cost vs. privacy |
| Top-k retrieval | 3-20 documents | More = better recall, higher cost and noise |
| Reranker | Cross-encoder, Cohere Rerank | Significant quality boost at latency cost |

---

## 2. Document Ingestion

### 2.1 Document Processing

Before chunking, documents must be cleaned and normalized:
- **Format Conversion**: Convert PDFs, DOCX, HTML, and other formats to clean text
- **Metadata Extraction**: Extract title, author, date, section hierarchy, and document type
- **Content Cleaning**: Remove boilerplate, headers/footers, navigation elements, and artifacts
- **Language Detection**: Identify document language for appropriate processing pipelines

### 2.2 Chunking Strategies

**Fixed-Size Chunking**: Split documents into chunks of N tokens with optional overlap. Simple and predictable. Works well for homogeneous documents (e.g., product documentation where each section is similar in structure).

**Semantic Chunking**: Split at natural boundaries -- paragraph breaks, section headers, topic shifts. Preserves semantic coherence within chunks. Requires more sophisticated processing but produces higher quality retrievals.

**Recursive Character Splitting**: Attempt to split at the highest-level boundary first (sections), then paragraphs, then sentences, then words. This produces chunks that respect document structure while staying within size limits.

**Agentic Chunking**: Use an LLM to identify optimal chunk boundaries by analyzing content for topic coherence. Most expensive but produces the highest quality chunks for complex documents.

### 2.3 Chunk Enrichment

Enrich chunks with metadata to improve retrieval:
- **Parent Document Reference**: Link chunks back to their source document for citation
- **Section Hierarchy**: Record the heading path (Chapter > Section > Subsection)
- **Summary**: Generate a 1-2 sentence summary of each chunk for quick relevance assessment
- **Hypothetical Questions**: Generate questions that this chunk would answer (HyDE approach applied at indexing time)
- **Keywords**: Extract key terms for hybrid search support

### 2.4 Embedding

Convert text chunks into dense vector representations:

**Model Selection Criteria**:
- Dimensionality: Higher dimensions capture more nuance but increase storage and compute
- Training domain: Models trained on similar domains produce better embeddings
- Context window: The embedding model must support the chunk size
- Multilingual support: If documents span multiple languages

**Embedding Best Practices**:
- Normalize embeddings to unit length for consistent cosine similarity scores
- Use the same embedding model for both indexing and query time
- Re-embed the entire corpus when changing embedding models (no mixing)
- Monitor embedding model version changes from providers

---

## 3. Query Processing

### 3.1 Query Understanding

Before retrieval, analyze the query to determine the optimal retrieval strategy:
- **Intent Classification**: Is this a factual question, comparison, summarization request, or exploratory query?
- **Entity Extraction**: Identify key entities mentioned in the query for metadata filtering
- **Temporal Analysis**: Does the query reference a specific time period? Filter by document date.
- **Complexity Assessment**: Simple queries need one retrieval; complex queries may need decomposition.

### 3.2 Query Transformation

**Query Expansion**: Add related terms to improve recall. "What is the refund policy?" becomes "What is the refund policy? Return policy. Money back guarantee. Cancellation."

**Query Decomposition**: Break complex queries into simpler sub-queries. "Compare product A and product B on price and features" becomes two queries: "Product A price and features" and "Product B price and features."

**Hypothetical Document Embedding (HyDE)**: Generate a hypothetical answer to the query using the LLM (without retrieval), then embed this hypothetical answer for retrieval. The hypothesis is closer in embedding space to actual documents than the original question.

### 3.3 Query Routing

Route queries to the appropriate knowledge base or retrieval strategy:
- Technical questions to technical documentation index
- Product questions to product catalog index
- Policy questions to policy document index
- General questions to a broad knowledge base

---

## 4. Retrieval Strategies

### 4.1 Dense Retrieval

Use embedding similarity (cosine similarity or dot product) to find chunks semantically similar to the query. Dense retrieval excels at understanding meaning and intent, capturing paraphrases and synonyms that lexical search misses.

### 4.2 Sparse Retrieval

Traditional keyword-based retrieval using BM25 or TF-IDF. Sparse retrieval excels at exact term matching, which is critical for proper nouns, product codes, error messages, and domain-specific terminology that embedding models may not handle well.

### 4.3 Hybrid Search

Combine dense and sparse retrieval for the best of both approaches:

**Score Fusion**: Run both dense and sparse retrieval, normalize scores to a common scale, and combine with weighted averaging. Typical weights: 0.7 dense + 0.3 sparse.

**Reciprocal Rank Fusion (RRF)**: Combine result lists based on rank position rather than raw scores. More robust to score distribution differences between retrieval methods.

### 4.4 Multi-Index Retrieval

Query multiple specialized indices and merge results:
- Different indices for different document types (code, prose, tables)
- Different indices for different time periods (current vs. historical)
- Different indices for different languages

---

## 5. Reranking

### 5.1 Cross-Encoder Reranking

Initial retrieval uses bi-encoders (separate embeddings for query and document) for efficiency. Reranking uses cross-encoders that jointly encode the query-document pair, enabling much richer interaction modeling at the cost of requiring pairwise computation.

### 5.2 Reranking Models

- **Cohere Rerank**: API-based, high quality, easy to integrate
- **Cross-encoder models**: Open-source models (e.g., ms-marco-MiniLM) for self-hosted deployments
- **LLM-based reranking**: Use the generation model itself to score relevance, highest quality but most expensive

### 5.3 Reranking Pipeline

1. Retrieve top-50 candidates using fast bi-encoder search
2. Rerank candidates using cross-encoder, scoring each query-document pair
3. Select top-5 reranked results for context injection
4. Apply diversity filtering to avoid redundant information

---

## 6. Context Assembly

### 6.1 Context Window Management

The retrieved chunks must fit within the model's context window alongside the system prompt, user query, and output space. Budget allocation:

| Component | Token Budget |
|-----------|-------------|
| System prompt | 500-1500 |
| Retrieved context | 2000-8000 |
| User query | 100-500 |
| Output space | 1000-4000 |
| Safety margin | 500 |

### 6.2 Context Ordering

Research shows that LLMs attend more strongly to information at the beginning and end of the context ("lost in the middle" phenomenon). Place the most relevant chunks first and last, with less relevant chunks in the middle.

### 6.3 Context Formatting

Structure retrieved context clearly:
```
## Retrieved Information

### Source 1: [Document Title] (Relevance: 0.94)
{chunk content}

### Source 2: [Document Title] (Relevance: 0.89)
{chunk content}
```

### 6.4 Citation Integration

Include source metadata in the context and instruct the model to cite sources in its response. This enables verification and builds user trust.

---

## 7. Generation

### 7.1 Grounding Instructions

The generation prompt must explicitly instruct the model to:
- Base its response on the retrieved context
- Not introduce information not present in the context
- Indicate when the retrieved context does not contain sufficient information
- Cite specific sources when making claims

### 7.2 Faithfulness vs. Helpfulness

There is an inherent tension between faithfulness (only stating what is in the context) and helpfulness (providing a complete answer). Design the prompt to handle this tension explicitly:
- For high-stakes domains (medical, legal): Prioritize faithfulness, clearly mark any information from general knowledge
- For general domains: Allow the model to supplement context with general knowledge, but distinguish between sourced and unsourced claims

### 7.3 Answer Synthesis

For queries that require information from multiple chunks:
- Instruct the model to synthesize information across sources
- Ask for explicit reasoning about how different sources relate
- Handle contradictions between sources by presenting both perspectives

---

## 8. Production Considerations

### 8.1 Indexing Pipeline Operations

- Schedule regular re-indexing for frequently updated document collections
- Implement incremental indexing for efficiency (only process new/changed documents)
- Monitor index freshness and alert when documents are stale
- Maintain index versioning for rollback capability

### 8.2 Latency Optimization

- Pre-compute and cache embeddings for common queries
- Use approximate nearest neighbor search for large indices
- Implement query result caching with TTL-based invalidation
- Parallelize retrieval across multiple indices

### 8.3 Scalability

- Horizontal scaling of vector database for large document collections
- Sharding strategies for multi-tenant deployments
- Load balancing across embedding model instances
- Async ingestion pipelines for high-throughput document processing

---

## 9. Key References

- Lewis et al. (2020) -- "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"
- Gao et al. (2024) -- "Retrieval-Augmented Generation for Large Language Models: A Survey"
- Liu et al. (2023) -- "Lost in the Middle: How Language Models Use Long Contexts"
- Izacard & Grave (2021) -- "Leveraging Passage Retrieval with Generative Models"

---

*This module covers RAG system architecture. See `vector_databases.md` for storage layer details and `rag_optimization.md` for evaluation and advanced techniques.*
