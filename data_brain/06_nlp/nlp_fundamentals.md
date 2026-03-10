# NLP Fundamentals — Text Processing, Embeddings, and Classical Methods

## Overview

Natural Language Processing (NLP) is the computational analysis of human language.
This module covers the foundational pipeline: tokenization, text representation
(bag-of-words, TF-IDF, word embeddings), classical NLP tasks (named entity recognition,
sentiment analysis, topic modeling), and the mathematical frameworks that underpin
them. These fundamentals remain essential even in the era of large language models
because they inform feature engineering, evaluation, and debugging.

References: Jurafsky & Martin (Speech and Language Processing, 3rd ed.), Manning
et al. (Introduction to Information Retrieval), Goldberg (Neural Network Methods
for NLP), Mikolov et al. (Word2Vec papers), Pennington et al. (GloVe),
Blei et al. (LDA).

---

## Text Preprocessing Pipeline

### Standard Pipeline

```
Raw Text
  │
  ├── 1. Encoding normalization (UTF-8, unicode NFKC)
  ├── 2. Lowercasing (optional -- destroys NER signals)
  ├── 3. Tokenization (word, subword, or character level)
  ├── 4. Stop word removal (optional -- harmful for modern models)
  ├── 5. Stemming / Lemmatization
  ├── 6. Normalization (remove URLs, emails, special chars)
  └── 7. Vectorization (BoW, TF-IDF, or embeddings)
```

### Tokenization Strategies

**Whitespace / Rule-Based**
- Split on whitespace and punctuation
- Simple, fast, language-dependent
- Fails on: "New York", "don't", "C++", URLs

**Regex-Based (Penn Treebank style)**
- Handles contractions: "don't" -> "do", "n't"
- Handles possessives: "John's" -> "John", "'s"
- Used by NLTK's word_tokenize

**Subword Tokenization (Modern Standard)**

| Algorithm | Used By | Method |
|-----------|---------|--------|
| BPE (Byte Pair Encoding) | GPT-2/3/4, RoBERTa | Iteratively merge most frequent byte pairs |
| WordPiece | BERT, DistilBERT | Maximize likelihood of training data |
| Unigram | T5, ALBERT, XLNet | Start with large vocab, prune by loss |
| SentencePiece | Many multilingual | Language-agnostic, treats input as bytes |

**BPE Example**
```
Vocabulary building:
  Initial: ['l', 'o', 'w', 'e', 'r', 'n', 'w', 's', 't', ...]
  Step 1: merge 'l'+'o' -> 'lo'  (most frequent pair)
  Step 2: merge 'lo'+'w' -> 'low'
  Step 3: merge 'e'+'r' -> 'er'
  ...

Encoding "lowest":
  "low" + "est" (if learned) or "low" + "e" + "st"
```

Advantages of subword tokenization:
- Open vocabulary: handles unseen words by decomposition
- Balances character-level flexibility with word-level semantics
- Controls vocabulary size (typically 30K-50K tokens)

---

## Text Representation

### Bag of Words (BoW)

Each document is a vector of word counts, ignoring order.

```
Doc 1: "the cat sat on the mat"
Doc 2: "the dog sat on the log"

Vocabulary: [cat, dog, log, mat, on, sat, the]

BoW(Doc 1) = [1, 0, 0, 1, 1, 1, 2]
BoW(Doc 2) = [0, 1, 1, 0, 1, 1, 2]
```

Limitations:
- Ignores word order ("dog bites man" = "man bites dog")
- High dimensionality (vocabulary size can be 100K+)
- Sparse vectors (most entries are zero)

### TF-IDF (Term Frequency - Inverse Document Frequency)

Weights terms by their importance in a document relative to the corpus.

```
TF(t, d) = count(t in d) / |d|   (or log-normalized: 1 + log(count))

IDF(t) = log(N / df(t))
  where N = total documents, df(t) = documents containing term t

TF-IDF(t, d) = TF(t, d) * IDF(t)
```

Properties:
- High TF-IDF: term is frequent in this document but rare in corpus (distinctive)
- Low TF-IDF: term is rare in this document or common across corpus
- IDF downweights stop words naturally ("the", "is", "a" appear everywhere)

### Variants

| Variant | TF Formula | IDF Formula |
|---------|-----------|-------------|
| Raw | f(t,d) | log(N/df) |
| Log-normalized | 1 + log(f(t,d)) | log(N/df) |
| Double K-normalization | K + (1-K)*f(t,d)/max_f | log((N-df+0.5)/(df+0.5)) |
| BM25 | f*(k1+1)/(f+k1*(1-b+b*dl/avgdl)) | log((N-df+0.5)/(df+0.5)) |

---

## Word Embeddings

### Word2Vec (Mikolov et al., 2013)

Learns dense vector representations by predicting context.

**Skip-Gram**: predict context words given a target word.

```
Input: w_t (target word, one-hot)
Hidden: h = W_input^T * x     (embedding lookup, d dimensions)
Output: p(w_c | w_t) = softmax(W_output * h)

Objective: maximize SUM log P(w_c | w_t) over all (target, context) pairs
```

**CBOW (Continuous Bag of Words)**: predict target given context.

```
Input: average of context word embeddings
Output: predict target word
```

**Training Tricks**
- Negative sampling: instead of full softmax over vocab V, sample k negatives
- Subsampling: downsample frequent words (probability ~ sqrt(threshold/freq))
- Window size: typically 5-10 words

**Embedding Properties**

Linear algebraic relationships emerge:
```
vec("king") - vec("man") + vec("woman") ≈ vec("queen")
vec("Paris") - vec("France") + vec("Germany") ≈ vec("Berlin")
```

Similarity: cosine(u, v) = (u . v) / (||u|| * ||v||)

### GloVe (Global Vectors, Pennington et al., 2014)

Combines global co-occurrence statistics with local context windows.

```
Objective: minimize SUM_ij f(X_ij) * (w_i^T * w_j + b_i + b_j - log(X_ij))^2

where:
  X_ij = co-occurrence count of words i and j
  f(x) = weighting function (caps at x_max, typically 100)
  w_i, w_j = word vectors
  b_i, b_j = bias terms
```

Advantage over Word2Vec: explicitly leverages global statistics.

### FastText (Bojanowski et al., 2017)

Extends Word2Vec by representing words as bags of character n-grams.

```
"where" with n=3: <wh, whe, her, ere, re>

Word vector = sum of character n-gram vectors
```

Advantage: handles morphology and out-of-vocabulary words.

---

## Named Entity Recognition (NER)

### Task Definition

Identify and classify named entities in text into predefined categories.

```
Input:  "Apple CEO Tim Cook announced the new iPhone in San Francisco."
Output: [Apple/ORG] CEO [Tim Cook/PER] announced the new iPhone in [San Francisco/LOC]
```

### Standard Entity Types (OntoNotes)

| Tag | Entity Type | Example |
|-----|------------|---------|
| PER | Person | Tim Cook |
| ORG | Organization | Apple, NATO |
| LOC | Location | San Francisco |
| DATE | Date expression | January 2024 |
| MONEY | Monetary value | $1.2 billion |
| GPE | Geopolitical entity | United States |

### Approaches

**Rule-Based**: regex patterns, gazetteers, handcrafted rules
- Fast, interpretable, no training data needed
- Brittle, domain-specific, poor generalization

**Statistical (CRF)**: Conditional Random Fields on hand-crafted features
- BIO tagging: B-PER, I-PER, O (beginning, inside, outside)
- Features: word shape, POS tags, prefixes/suffixes, gazetteers

**Neural (BiLSTM-CRF)**: bidirectional LSTM with CRF output layer
- Learns features automatically from word embeddings
- State of the art before transformers

**Transformer-Based**: BERT + token classification head
- Fine-tune pretrained model on NER dataset
- Current state of the art (F1 > 92% on CoNLL-2003)

### Evaluation

```
Precision = TP / (TP + FP)   (of entities predicted, how many are correct?)
Recall    = TP / (TP + FN)   (of true entities, how many were found?)
F1        = 2 * P * R / (P + R)

Strict matching: entity boundaries AND type must match exactly
Partial matching: credit for overlapping spans
```

---

## Sentiment Analysis

### Approaches

**Lexicon-Based**
- VADER: rule-based, handles intensifiers ("very good"), negation, emoticons
- SentiWordNet: synset-level sentiment scores
- Simple, interpretable, no training needed
- Limited to patterns in the lexicon

**Machine Learning**
- Features: TF-IDF + unigrams/bigrams
- Models: Naive Bayes, SVM, Logistic Regression
- Requires labeled training data

**Deep Learning**
- CNN/LSTM on word embeddings
- BERT fine-tuned on sentiment data (SST-2, Yelp)
- Best accuracy, requires GPU and labeled data

### Aspect-Based Sentiment

Extract sentiment toward specific aspects of an entity:

```
"The food was excellent but the service was terrible."

Aspect: food     -> Sentiment: positive
Aspect: service  -> Sentiment: negative
```

---

## Topic Modeling

### Latent Dirichlet Allocation (LDA)

Generative probabilistic model that discovers topics in a corpus.

```
Generative process:
1. For each topic k: draw word distribution phi_k ~ Dirichlet(beta)
2. For each document d:
   a. Draw topic distribution theta_d ~ Dirichlet(alpha)
   b. For each word position n:
      i.  Draw topic z_dn ~ Multinomial(theta_d)
      ii. Draw word w_dn ~ Multinomial(phi_{z_dn})
```

Hyperparameters:
- alpha: controls topic sparsity per document (low = few topics per doc)
- beta: controls word sparsity per topic (low = few words per topic)
- K: number of topics (must be specified; use coherence score to select)

### Inference

- Collapsed Gibbs sampling (standard)
- Variational inference (faster, used by sklearn)
- Online variational Bayes (streaming data)

### Evaluation

- **Coherence score (C_v)**: measures semantic similarity of top words per topic
  Higher is better. Typical range: 0.3-0.7
- **Perplexity**: held-out log-likelihood (lower is better, but poor proxy for quality)
- **Human evaluation**: topic interpretability rated by annotators

### BERTopic (Modern Alternative)

```
Pipeline:
1. Generate document embeddings (Sentence-BERT)
2. Reduce dimensionality (UMAP)
3. Cluster documents (HDBSCAN)
4. Extract topic representations (c-TF-IDF per cluster)
```

Advantages over LDA:
- Leverages pretrained language model semantics
- Does not require specifying K (HDBSCAN finds clusters)
- Handles short texts better
- Supports dynamic topics (topic evolution over time)

---

## Text Similarity

### Cosine Similarity

```
cos(u, v) = (u . v) / (||u|| * ||v||)

Range: [-1, 1] for real-valued vectors, [0, 1] for non-negative (TF-IDF)
```

### Jaccard Similarity

```
J(A, B) = |A ∩ B| / |A ∪ B|

For sets of words/n-grams. Range: [0, 1].
```

### Edit Distance (Levenshtein)

Minimum number of single-character edits (insert, delete, substitute) to
transform one string into another.

```
distance("kitten", "sitting") = 3
  kitten -> sitten (substitute s for k)
  sitten -> sittin (substitute i for e)
  sittin -> sitting (insert g)
```

---

## Production Checklist

- [ ] Tokenization strategy matches downstream model requirements
- [ ] Text preprocessing pipeline is reproducible and documented
- [ ] Embeddings evaluated on domain-specific similarity benchmarks
- [ ] NER model evaluated with strict F1 on held-out data
- [ ] Sentiment model calibrated (predicted probabilities are reliable)
- [ ] Topic model coherence score and human evaluation documented
- [ ] All text data encoded as UTF-8
- [ ] PII detection applied before analysis (see 08_data_governance)
- [ ] Language detection for multilingual corpora
- [ ] Bias audit: check for demographic disparities in model outputs
