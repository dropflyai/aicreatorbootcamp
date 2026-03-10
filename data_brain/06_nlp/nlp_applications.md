# NLP Applications — Search, Recommendations, Knowledge Graphs, and Summarization

## Overview

This module covers the applied NLP systems that power modern products: information
retrieval (BM25, semantic search, hybrid search), recommendation systems, conversational
AI and chatbots, text summarization, and knowledge graph construction. Each application
section covers the theory, architecture, evaluation methodology, and production
considerations required to build these systems at scale.

References: Manning et al. (Introduction to Information Retrieval), Robertson & Zaragoza
(The Probabilistic Relevance Framework: BM25 and Beyond), Karpukhin et al. (DPR),
Ricci et al. (Recommender Systems Handbook), Hogan et al. (Knowledge Graphs).

---

## Information Retrieval

### BM25 (Best Matching 25)

The standard probabilistic relevance model for lexical search.

```
BM25(q, d) = SUM_{t in q} IDF(t) * (f(t,d) * (k1 + 1)) / (f(t,d) + k1 * (1 - b + b * dl/avgdl))

where:
  f(t,d)  = term frequency of t in document d
  dl      = document length (number of tokens)
  avgdl   = average document length in corpus
  k1      = term frequency saturation parameter (typically 1.2-2.0)
  b       = length normalization parameter (typically 0.75)
  IDF(t)  = log((N - df(t) + 0.5) / (df(t) + 0.5) + 1)
```

Properties:
- Term frequency saturation: additional occurrences have diminishing returns
- Length normalization: long documents are not unfairly advantaged
- IDF weighting: rare terms contribute more to relevance
- No training required (statistical, parameterized)

### Inverted Index

The data structure that makes BM25 fast:

```
Index:
  "machine"  -> [(doc_1, tf=3), (doc_5, tf=1), (doc_12, tf=7)]
  "learning" -> [(doc_1, tf=2), (doc_3, tf=4), (doc_12, tf=5)]
  "model"    -> [(doc_2, tf=1), (doc_5, tf=3)]

Query: "machine learning"
  1. Look up posting lists for each query term
  2. Intersect/union posting lists
  3. Score each candidate document with BM25
  4. Return top-K by score
```

Tools: Elasticsearch, OpenSearch, Apache Solr, Lucene.

### Semantic Search (Dense Retrieval)

Replace lexical matching with embedding similarity:

```
1. Encode query:    q_vec = encoder(query)        (768-dim vector)
2. Encode documents: d_vec = encoder(document)     (precomputed, stored)
3. Retrieve:        top-K = argmax_d cos(q_vec, d_vec)

Encoders: Sentence-BERT, E5, GTE, Cohere Embed, OpenAI text-embedding-3
```

### Approximate Nearest Neighbor (ANN) Search

Exact cosine similarity over millions of vectors is too slow.
ANN provides approximate top-K in sublinear time.

| Algorithm | Index Type | Trade-off |
|-----------|-----------|-----------|
| HNSW | Graph-based | Best recall, high memory |
| IVF-PQ | Cluster + quantization | Lower memory, needs tuning |
| ScaNN | Quantization + reranking | Google's production system |
| FAISS | Multiple options | Facebook, widely used |

Vector databases: Pinecone, Weaviate, Milvus, Qdrant, Chroma, pgvector.

### Hybrid Search

Combine lexical (BM25) and semantic (dense) retrieval:

```
Score_hybrid = alpha * score_BM25_normalized + (1 - alpha) * score_semantic_normalized

Normalization: min-max or reciprocal rank fusion (RRF):
  RRF_score(d) = SUM_{r in rankings} 1 / (k + rank_r(d))   where k = 60 (typical)
```

### Reranking

Two-stage retrieval: fast retriever (BM25/dense) + expensive reranker:

```
Stage 1: Retrieve top-1000 candidates (BM25 or dense, < 50ms)
Stage 2: Rerank top-1000 with cross-encoder (< 200ms for 1000 docs)

Cross-encoder: encode(query, document) as a single sequence
  More accurate than bi-encoder (attends to query-document interactions)
  Too expensive for full corpus (O(N) instead of O(1) per query)
```

Models: Cohere Rerank, cross-encoder/ms-marco-MiniLM-L-12-v2.

### Evaluation Metrics

| Metric | Formula | Measures |
|--------|---------|---------|
| Precision@K | Relevant in top K / K | Quality of top results |
| Recall@K | Relevant in top K / Total relevant | Coverage |
| MRR | 1/rank of first relevant | Speed to first good result |
| NDCG@K | DCG@K / IDCG@K | Ranking quality with graded relevance |
| MAP | Mean of AP across queries | Overall retrieval quality |

```
DCG@K = SUM_{i=1}^{K} (2^{rel_i} - 1) / log_2(i + 1)
NDCG@K = DCG@K / IDCG@K   (IDCG = ideal DCG with perfect ranking)
```

---

## Recommendation Systems

### Content-Based Filtering

Recommend items similar to what the user has liked before.

```
user_profile = weighted average of item feature vectors for liked items
score(user, item) = cosine(user_profile, item_features)
```

### Collaborative Filtering

**User-Based**: recommend what similar users liked.
```
sim(u, v) = cosine(ratings_u, ratings_v)
pred(u, i) = SUM_{v in neighbors(u)} sim(u,v) * rating(v,i) / SUM |sim(u,v)|
```

**Item-Based**: recommend items similar to what user liked.
```
sim(i, j) = cosine(ratings_i, ratings_j)
pred(u, i) = SUM_{j in rated_by(u)} sim(i,j) * rating(u,j) / SUM |sim(i,j)|
```

**Matrix Factorization**
```
R ≈ U * V^T

R: user-item rating matrix (n_users x n_items)
U: user embeddings (n_users x k)
V: item embeddings (n_items x k)

Objective: min ||R - U*V^T||^2 + lambda*(||U||^2 + ||V||^2)

Algorithms: ALS (Alternating Least Squares), SGD, SVD++
```

### Deep Learning Recommendations

**Two-Tower Model**
```
User Tower:  user_features -> MLP -> user_embedding (128-dim)
Item Tower:  item_features -> MLP -> item_embedding (128-dim)
Score: dot(user_embedding, item_embedding)

Training: sampled softmax or contrastive loss
Serving: precompute item embeddings, ANN retrieval at query time
```

**Sequential Models**
- Attention-based: SASRec (self-attentive sequential recommendation)
- Input: sequence of item IDs the user interacted with
- Output: next-item prediction

### Cold Start Problem

| Scenario | Approach |
|----------|---------|
| New user | Ask preferences (onboarding), popularity-based, demographic |
| New item | Content-based features, metadata similarity |
| Both new | Hybrid: content + collaborative, explore/exploit |

### Evaluation

- Offline: Precision@K, Recall@K, NDCG@K, Hit Rate, Coverage, Diversity
- Online: CTR, conversion rate, engagement time, A/B test with guardrail metrics

---

## Conversational AI and Chatbots

### Architecture Patterns

**Retrieval-Based**
```
User Query -> Intent Classification -> Entity Extraction -> Response Selection
                    │                        │
              Trained classifier       Slot filling (NER)
```

**Generative (LLM-Based)**
```
User Query -> [System Prompt + Conversation History + Query] -> LLM -> Response
                           │
                    RAG retrieval for grounding
```

**Hybrid**
```
User Query -> Router
               ├── FAQ/known intent -> Retrieval (fast, reliable)
               └── Open-ended -> LLM generation (flexible, creative)
```

### Dialog Management

| Approach | Description | Best For |
|----------|-----------|----------|
| Finite State | Predefined conversation flows | Simple, scripted |
| Frame-Based | Fill required slots to complete task | Form-filling |
| ML-Based | Predict next action from dialog state | Complex, flexible |
| LLM-Based | Generate responses from context | Open-domain |

### Evaluation

| Metric | Type | Measures |
|--------|------|---------|
| Task completion rate | Automated | % of conversations achieving goal |
| CSAT | Human | Customer satisfaction score |
| Containment rate | Automated | % resolved without human escalation |
| Avg turns to resolution | Automated | Conversation efficiency |
| Hallucination rate | Human/LLM-judge | % of responses with false claims |

---

## Text Summarization

### Extractive Summarization

Select the most important sentences from the original text.

```
Scoring methods:
  - TextRank: graph-based (sentence similarity as edges), PageRank
  - BERT extractive: encode sentences, classify as summary-worthy or not
  - Lead-N: select first N sentences (surprisingly strong baseline for news)
```

### Abstractive Summarization

Generate new text that captures the essential information.

```
Models: BART, PEGASUS, T5, GPT-4, Claude

BART pre-training: corrupt text with multiple noise functions, train decoder
to reconstruct. Effective for summarization, translation, QA.

PEGASUS: Gap Sentence Generation (GSG) pre-training objective
  - Mask entire sentences that are most similar to the rest of the document
  - Train to generate masked sentences
  - Directly mirrors the summarization task
```

### Summarization Strategies for Long Documents

| Strategy | Description | Max Length |
|----------|-----------|-----------|
| Truncation | Use first N tokens | Model context limit |
| Chunking | Summarize chunks, then summarize summaries | Unlimited |
| Map-Reduce | Parallel chunk summaries + final merge | Unlimited |
| Refine | Iteratively refine summary with each chunk | Unlimited |
| Hierarchical | Sentence -> paragraph -> section -> document | Unlimited |

### Evaluation

```
ROUGE-1: unigram overlap (content coverage)
ROUGE-2: bigram overlap (fluency proxy)
ROUGE-L: longest common subsequence
BERTScore: semantic similarity

Faithfulness evaluation:
  - NLI-based: is summary entailed by source?
  - QA-based: generate questions from summary, answer from source
  - LLM-as-judge: prompt LLM to evaluate factual consistency
```

---

## Knowledge Graphs

### Components

```
(Entity) --[Relation]--> (Entity)

("Tim Cook", "CEO_of", "Apple")
("Apple", "headquartered_in", "Cupertino")
("Cupertino", "located_in", "California")
```

### Construction Pipeline

```
Raw Text
  │
  ├── Named Entity Recognition (identify entities)
  ├── Entity Linking (link to knowledge base: Wikidata, DBpedia)
  ├── Relation Extraction (classify relationships between entities)
  ├── Coreference Resolution (merge mentions of same entity)
  └── Knowledge Graph Population (store triples in graph DB)
```

### Relation Extraction Methods

| Method | Description | Training Data |
|--------|-----------|--------------|
| Pattern-based | Hearst patterns ("X such as Y") | None |
| Supervised | Train classifier on labeled entity pairs | Annotated |
| Distant supervision | Align KB facts to text automatically | Knowledge base |
| LLM-based | Prompt LLM to extract relations | Few-shot examples |

### Graph Databases

| Database | Model | Query Language |
|----------|-------|---------------|
| Neo4j | Property graph | Cypher |
| Amazon Neptune | RDF + property graph | SPARQL / Gremlin |
| TigerGraph | Property graph | GSQL |
| Wikidata | RDF | SPARQL |

### Knowledge Graph Embeddings

Represent entities and relations as vectors for link prediction:

```
TransE: h + r ≈ t   (head + relation ≈ tail)
  Score: ||h + r - t||

DistMult: score = h^T * diag(r) * t

ComplEx: extends DistMult to complex-valued embeddings
  Handles asymmetric relations

RotatE: r is a rotation in complex space
  h * r ≈ t (element-wise product in complex plane)
```

### Applications

- Question answering: traverse graph to find answers
- Entity disambiguation: use graph context to resolve ambiguity
- Recommendation: graph-based collaborative filtering
- Drug discovery: predict protein-drug interactions
- Fraud detection: identify suspicious entity networks

---

## Production Considerations

### Latency Budgets

| Component | Target | Strategy |
|-----------|--------|---------|
| BM25 retrieval | < 10ms | Inverted index, in-memory |
| Dense retrieval | < 50ms | ANN index, GPU |
| Reranking (100 docs) | < 200ms | Batched cross-encoder |
| LLM generation | < 2s | Caching, streaming, smaller model |
| End-to-end | < 3s | Pipeline optimization |

### Scaling Patterns

- Index sharding: distribute documents across multiple nodes
- Caching: cache frequent queries and embeddings
- Batching: group inference requests for GPU efficiency
- Quantization: reduce embedding dimensions (768 -> 256) or precision (FP16)
- Streaming: return partial results as they become available

---

## Production Checklist

- [ ] Search system evaluated with NDCG on labeled query-document pairs
- [ ] Hybrid search weights tuned on evaluation set
- [ ] Recommendation model trained with proper temporal split (no future leakage)
- [ ] Cold start strategy defined for new users and items
- [ ] Chatbot hallucination rate measured and within acceptable bounds
- [ ] Summarization faithfulness evaluated (NLI or human annotation)
- [ ] Knowledge graph entity linking accuracy measured
- [ ] Latency budgets met for all components
- [ ] A/B testing framework ready for online evaluation
- [ ] Monitoring for query distribution drift
