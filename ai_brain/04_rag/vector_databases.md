# Vector Databases: Storage and Retrieval for Embedding-Based Systems

## Overview

Vector databases are specialized storage systems optimized for high-dimensional vector similarity search. They form the persistence and retrieval layer of RAG systems, semantic search applications, and recommendation engines. This module covers the major vector database platforms, indexing algorithms, hybrid search capabilities, and operational considerations for production deployments.

---

## 1. Vector Database Fundamentals

### 1.1 What Distinguishes Vector Databases

Traditional databases index data by exact values (B-trees for equality/range queries, inverted indices for text search). Vector databases index data by similarity in high-dimensional space, enabling queries like "find the 10 most similar vectors to this query vector." This requires fundamentally different indexing algorithms and distance metrics.

### 1.2 Distance Metrics

**Cosine Similarity**: Measures the angle between vectors, ignoring magnitude. Ranges from -1 (opposite) to 1 (identical). Most common for text embeddings, which are typically normalized to unit length.

**Euclidean Distance (L2)**: Measures straight-line distance between vectors. Sensitive to magnitude. Appropriate when vector magnitude carries meaning.

**Dot Product (Inner Product)**: Combines both direction and magnitude. Equivalent to cosine similarity when vectors are normalized. Often the fastest to compute.

**Manhattan Distance (L1)**: Sum of absolute differences across dimensions. More robust to outliers than L2 but less common in practice.

### 1.3 The Curse of Dimensionality

As embedding dimensionality increases, distance metrics become less discriminative -- all pairs of points tend toward similar distances. Practical embedding dimensions (256-3072) are chosen to balance expressiveness against this effect. Beyond approximately 2000 dimensions, returns diminish significantly for most tasks.

---

## 2. Indexing Algorithms

### 2.1 HNSW (Hierarchical Navigable Small World)

HNSW constructs a multi-layer proximity graph where each node connects to its nearest neighbors. Search begins at the top (sparsest) layer and progressively navigates to more detailed layers, narrowing the search space at each level.

**Strengths**:
- Excellent recall at high speed (typically 95%+ recall at sub-millisecond latency)
- Supports incremental insertion without full re-indexing
- Memory-resident for fastest performance
- Well-suited for datasets up to tens of millions of vectors

**Parameters**:
- `M` (connections per node): Higher M improves recall but increases memory. Typical: 16-64
- `efConstruction` (construction beam width): Higher values produce better graphs but slower indexing. Typical: 100-500
- `efSearch` (search beam width): Higher values improve recall at query time. Typical: 50-200

**Tradeoffs**:
- High memory consumption (entire index must fit in RAM for optimal performance)
- Build time increases with M and efConstruction
- Not ideal for extremely high-dimensionality (>1000) without dimensionality reduction

### 2.2 IVF (Inverted File Index)

IVF partitions the vector space into clusters using k-means clustering. At query time, the algorithm identifies the nearest clusters and searches only within those clusters, dramatically reducing the search space.

**Strengths**:
- Lower memory footprint than HNSW (can use disk-backed storage)
- Scales well to billions of vectors
- Training (clustering) is a one-time cost
- Can be combined with product quantization (IVF-PQ) for massive compression

**Parameters**:
- `nlist` (number of clusters): More clusters = finer partitioning. Typical: sqrt(N) to 4*sqrt(N)
- `nprobe` (clusters to search): More probes = better recall. Typical: 1-20% of nlist

**Tradeoffs**:
- Requires re-training when the data distribution shifts significantly
- Boundary effects: vectors near cluster boundaries may be missed
- Lower recall than HNSW at equivalent latency for small-to-medium datasets

### 2.3 Flat Index (Brute Force)

Compares the query vector against every stored vector. Guarantees perfect recall but O(N) query time. Use for:
- Small datasets (< 50,000 vectors) where indexing overhead is not justified
- Ground truth evaluation to calibrate approximate index recall
- Reranking stage applied to pre-filtered candidate sets

### 2.4 Product Quantization (PQ)

Compresses vectors by decomposing each vector into sub-vectors and quantizing each sub-vector independently. Reduces memory by 10-100x at the cost of some recall. Often combined with IVF (IVF-PQ) for large-scale deployments.

### 2.5 Index Selection Guide

| Dataset Size | Memory Budget | Latency Requirement | Recommended Index |
|-------------|---------------|--------------------|--------------------|
| < 50K | Any | Any | Flat |
| 50K - 10M | High | < 10ms | HNSW |
| 50K - 10M | Low | < 50ms | IVF-PQ |
| 10M - 1B | High | < 10ms | HNSW with sharding |
| 10M - 1B | Low | < 100ms | IVF-PQ |
| > 1B | Any | < 100ms | IVF-PQ with sharding |

---

## 3. Platform Deep Dives

### 3.1 Pinecone

**Architecture**: Fully managed cloud-native vector database. Serverless and pod-based deployment options. Automatic scaling and replication.

**Key Features**:
- Serverless: Pay per query, no infrastructure management
- Namespaces for multi-tenant isolation within a single index
- Metadata filtering with pre-filter and post-filter modes
- Sparse-dense hybrid search (single API call)
- Built-in reranking capability

**Best For**: Teams wanting zero operational overhead, rapid prototyping, production workloads where managed infrastructure is preferred.

**Limitations**: Vendor lock-in, limited customization of indexing parameters, cost scales linearly with data volume in pod-based mode.

### 3.2 Weaviate

**Architecture**: Open-source, can be self-hosted or used as managed cloud service. Module-based architecture for extensibility.

**Key Features**:
- Built-in vectorization modules (integrate embedding model directly)
- GraphQL API for complex queries combining vector search with filters
- Multi-tenancy support with data isolation
- Hybrid search combining BM25 and vector search
- Generative search module (RAG built into the database)

**Best For**: Teams wanting open-source flexibility, complex query patterns, integrated vectorization pipeline.

**Limitations**: Higher operational complexity when self-hosted, performance tuning requires expertise, GraphQL API has a learning curve.

### 3.3 Chroma

**Architecture**: Open-source, lightweight, designed for developer experience. Embeddable (runs in-process) or client-server mode.

**Key Features**:
- Extremely simple API (add, query, update, delete)
- Built-in embedding functions (no separate embedding step needed)
- Metadata filtering with rich query operators
- Persistent storage with SQLite backend
- Minimal configuration required

**Best For**: Prototyping, small-to-medium datasets, applications where simplicity and developer experience are paramount.

**Limitations**: Limited scalability (single-node), fewer enterprise features, not designed for billion-scale deployments.

### 3.4 pgvector

**Architecture**: PostgreSQL extension that adds vector similarity search to existing PostgreSQL databases. Stores vectors alongside relational data.

**Key Features**:
- Leverages existing PostgreSQL infrastructure, tooling, and expertise
- ACID transactions for vector data
- Combine vector search with SQL queries (JOINs, aggregations, window functions)
- Supports HNSW and IVF indexing
- No separate infrastructure to manage

**Best For**: Teams already using PostgreSQL, applications requiring transactional consistency between vector and relational data, moderate-scale deployments.

**Limitations**: Performance ceiling lower than purpose-built vector databases at scale, PostgreSQL operational overhead, vector-specific monitoring requires custom tooling.

---

## 4. Hybrid Search

### 4.1 Combining Dense and Sparse Retrieval

Hybrid search combines vector similarity (dense) with keyword matching (sparse) in a single query. This addresses the complementary weaknesses of each approach:

| Query Type | Dense Retrieval | Sparse Retrieval | Hybrid |
|-----------|-----------------|-------------------|--------|
| Conceptual similarity | Excellent | Poor | Excellent |
| Exact term matching | Poor | Excellent | Excellent |
| Proper nouns | Moderate | Excellent | Excellent |
| Paraphrased queries | Excellent | Poor | Excellent |

### 4.2 Fusion Strategies

**Weighted Sum**: `score = alpha * dense_score + (1 - alpha) * sparse_score`. Requires score normalization since dense and sparse scores have different ranges.

**Reciprocal Rank Fusion**: `score = sum(1 / (k + rank_i))` across retrieval methods. Does not require score normalization, making it more robust.

**Learned Fusion**: Train a small model to combine dense and sparse signals based on query features. Highest quality but requires training data.

### 4.3 Implementation Patterns

Most vector databases now support hybrid search natively:
- Pinecone: Sparse-dense vectors in a single upsert/query
- Weaviate: `hybrid` search operator with configurable alpha
- pgvector: Combine vector similarity with full-text search using PostgreSQL's tsvector

---

## 5. Metadata Filtering

### 5.1 Pre-Filter vs. Post-Filter

**Pre-Filter**: Apply metadata filters before vector search. Reduces the search space, improving latency. Risk: may exclude relevant vectors if filters are too restrictive.

**Post-Filter**: Perform vector search first, then filter results. Guarantees the best semantic matches but may return fewer results than requested if many are filtered out.

**Hybrid Filtering**: Pre-filter with broad criteria, then post-filter with strict criteria. Balances recall and precision.

### 5.2 Filter Design

Design metadata schemas to support common query patterns:
- **Temporal filters**: Created date, updated date, effective date ranges
- **Categorical filters**: Document type, department, product line
- **Access control filters**: Tenant ID, permission level, visibility scope
- **Quality filters**: Confidence score, verification status, freshness score

---

## 6. Operational Considerations

### 6.1 Capacity Planning

Estimate storage requirements: `storage = num_vectors * dimensions * bytes_per_float + metadata_overhead`. For 1M vectors at 1536 dimensions (float32): approximately 6GB for vectors alone, plus 2-4x for HNSW index overhead.

### 6.2 Backup and Recovery

- Regular snapshots of vector data and indices
- Point-in-time recovery capability for data loss scenarios
- Cross-region replication for disaster recovery
- Test restore procedures regularly

### 6.3 Monitoring

Track these metrics in production:
- Query latency (p50, p95, p99)
- Recall rate (measured against periodic brute-force evaluation)
- Index size and growth rate
- Query throughput (QPS)
- Error rates and timeout rates

### 6.4 Security

- Encrypt vectors at rest and in transit
- Implement access control at the namespace/collection level
- Audit query logs for access pattern anomalies
- Redact sensitive metadata from vector records

---

## 7. Migration and Interoperability

### 7.1 Avoiding Vendor Lock-In

Design an abstraction layer between your application and the vector database:
- Define a common interface for CRUD operations and search
- Implement adapters for each supported backend
- Store raw text alongside embeddings to enable re-embedding for migration
- Export embeddings in standard formats (numpy, parquet)

### 7.2 Multi-Database Architectures

Some production systems use multiple vector databases:
- Fast HNSW index for real-time queries
- Disk-backed IVF-PQ index for historical/archival search
- pgvector for vectors that must be transactionally consistent with relational data

---

## 8. Key References

- Malkov & Yashunin (2018) -- "Efficient and Robust Approximate Nearest Neighbor using HNSW Graphs"
- Jegou et al. (2011) -- "Product Quantization for Nearest Neighbor Search"
- Douze et al. (2024) -- "The Faiss Library" (Meta AI vector search library)
- Bruch (2024) -- "Foundations of Vector Retrieval" (comprehensive textbook)

---

*This module covers vector database platforms and indexing. See `rag_architecture.md` for the complete RAG pipeline and `rag_optimization.md` for evaluation and advanced retrieval techniques.*
