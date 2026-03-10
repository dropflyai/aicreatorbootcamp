# AI Brain -- Glossary

A comprehensive reference of terms used throughout the AI Brain modules. Organized by domain. Terms marked with [F] have formal mathematical definitions in the foundations modules.

---

## Machine Learning Fundamentals

**Supervised Learning** [F]
Learning from labeled data where each training example consists of an input-output pair (x, y). The model learns a function f: X -> Y that maps inputs to outputs. Includes classification (discrete y) and regression (continuous y).

**Unsupervised Learning** [F]
Learning from unlabeled data where the model discovers structure, patterns, or representations without explicit target labels. Includes clustering, dimensionality reduction, density estimation, and generative modeling.

**Reinforcement Learning** [F]
Learning through interaction with an environment, where an agent takes actions to maximize cumulative reward. Formalized as a Markov Decision Process (MDP) with states S, actions A, transition function T, and reward function R.

**Bias-Variance Tradeoff** [F]
The fundamental tension in ML: models with high bias underfit (too simple), while models with high variance overfit (too complex). Formally: E[(y - f_hat(x))^2] = Bias^2 + Variance + Irreducible Error.

**Loss Function** [F]
A function L(y, y_hat) that quantifies the discrepancy between predicted values y_hat and true values y. Common examples: MSE for regression, cross-entropy for classification, hinge loss for SVMs.

**Gradient Descent** [F]
An iterative optimization algorithm that updates parameters in the direction of steepest descent of the loss function: theta_{t+1} = theta_t - eta * grad(L(theta_t)), where eta is the learning rate.

**Overfitting**
When a model learns noise and idiosyncrasies in the training data rather than the underlying pattern, leading to poor generalization on unseen data. Diagnosed by a gap between training and validation performance.

**Regularization**
Techniques to prevent overfitting by constraining model complexity. Includes L1 (Lasso), L2 (Ridge), dropout, early stopping, data augmentation, and weight decay.

**Hyperparameter**
A parameter set before training begins (not learned from data). Examples: learning rate, batch size, number of layers, dropout rate, number of attention heads.

**Cross-Validation**
A resampling technique to evaluate model generalization. K-fold CV partitions data into k subsets, trains on k-1, validates on the held-out fold, and averages performance across all k runs.

---

## Deep Learning

**Neural Network**
A computational model inspired by biological neural networks, consisting of layers of interconnected nodes (neurons) that apply weighted linear transformations followed by nonlinear activation functions.

**Backpropagation** [F]
The algorithm for computing gradients of the loss function with respect to all parameters in a neural network, using the chain rule of calculus applied recursively through the computational graph.

**Activation Function**
A nonlinear function applied to the output of each neuron. Common choices: ReLU (max(0, x)), GELU (x * Phi(x)), sigmoid (1/(1+e^{-x})), tanh, Swish (x * sigmoid(x)).

**Batch Normalization** [F]
A technique that normalizes layer inputs by re-centering and re-scaling: BN(x) = gamma * (x - mu_B) / sqrt(sigma_B^2 + epsilon) + beta, where mu_B and sigma_B are batch statistics.

**Layer Normalization** [F]
Normalization applied across the feature dimension (rather than the batch dimension). Critical in transformers: LN(x) = gamma * (x - mu) / sqrt(sigma^2 + epsilon) + beta, where statistics are computed per-sample.

**Dropout** [F]
Regularization technique that randomly sets neuron activations to zero during training with probability p. At inference, activations are scaled by (1-p). Prevents co-adaptation of features.

**Adam Optimizer** [F]
Adaptive Moment Estimation. Combines momentum (first moment) with RMSProp (second moment): m_t = beta_1 * m_{t-1} + (1-beta_1) * g_t, v_t = beta_2 * v_{t-1} + (1-beta_2) * g_t^2, then bias-corrects and updates.

**Learning Rate Schedule**
A strategy for adjusting the learning rate during training. Common schedules: cosine annealing, linear warmup + decay, step decay, one-cycle policy.

**Transfer Learning**
Using a model pretrained on one task as a starting point for a different task. Based on the observation that early layers learn general features while later layers learn task-specific features.

**Residual Connection (Skip Connection)**
A shortcut that adds the input of a layer to its output: y = F(x) + x. Introduced in ResNet (He et al., 2015). Enables training of very deep networks by mitigating vanishing gradients.

---

## Transformer Architecture

**Transformer** [F]
The dominant architecture for sequence modeling, introduced by Vaswani et al. (2017) in "Attention Is All You Need." Relies entirely on attention mechanisms, dispensing with recurrence and convolution.

**Self-Attention** [F]
A mechanism where each position in a sequence attends to all other positions. Computes: Attention(Q, K, V) = softmax(QK^T / sqrt(d_k)) * V, where Q, K, V are learned linear projections of the input.

**Multi-Head Attention** [F]
Runs multiple self-attention operations in parallel with different learned projections, then concatenates results: MultiHead(Q, K, V) = Concat(head_1, ..., head_h) * W^O, where head_i = Attention(Q*W_i^Q, K*W_i^K, V*W_i^V).

**Positional Encoding** [F]
A mechanism to inject sequence order information into the transformer, since attention is permutation-invariant. Original uses sinusoidal functions; modern models use learned positional embeddings or RoPE (Rotary Position Embedding).

**Causal Masking (Autoregressive Mask)**
A mask applied to the attention matrix that prevents each position from attending to future positions. Essential for autoregressive language modeling (decoder-only models).

**Key, Query, Value (K, Q, V)**
The three projections in attention. Intuitively: Query is "what am I looking for," Key is "what do I contain," Value is "what information do I provide." Attention scores are computed from Q-K dot products, then used to weight V.

**Feed-Forward Network (FFN)**
A two-layer MLP applied position-wise in each transformer block: FFN(x) = W_2 * activation(W_1 * x + b_1) + b_2. Typically the hidden dimension is 4x the model dimension.

**Context Window (Context Length)**
The maximum number of tokens a transformer can process in a single forward pass. Limited by the O(n^2) attention complexity and the positional encoding range.

---

## Large Language Models

**Foundation Model**
A large model trained on broad data at scale that can be adapted to a wide range of downstream tasks. Term coined by Stanford HAI (Bommasani et al., 2021).

**Autoregressive Model**
A model that generates output one token at a time, conditioning each token on all previously generated tokens. GPT, Claude, and Llama are autoregressive (decoder-only) models.

**Tokenization**
The process of converting text into a sequence of integer tokens. Common methods: BPE (Byte-Pair Encoding), SentencePiece, WordPiece. Vocabulary sizes typically range from 32K to 128K tokens.

**In-Context Learning (ICL)**
The ability of LLMs to learn from examples provided in the prompt without any parameter updates. A defining emergent capability of large-scale language models (Brown et al., 2020).

**Chain-of-Thought (CoT)**
A prompting technique where the model is encouraged to produce intermediate reasoning steps before the final answer. Significantly improves performance on reasoning tasks (Wei et al., 2022).

**Emergent Abilities**
Capabilities that appear in large models but are absent in smaller models of the same family. Examples: in-context learning, chain-of-thought reasoning, instruction following.

**Hallucination**
When an LLM generates text that is fluent and confident but factually incorrect or unsupported by the input context. A fundamental limitation of probabilistic text generation.

**Scaling Laws**
Empirical relationships between model performance and compute budget, dataset size, and parameter count. Kaplan et al. (2020) and Hoffmann et al. (2022, "Chinchilla") established key scaling laws.

**Mixture of Experts (MoE)**
An architecture where only a subset of model parameters are active for each input, routed by a gating network. Enables larger total parameter counts with lower inference cost. Used in Mixtral, Gemini.

---

## RAG and Retrieval

**Retrieval-Augmented Generation (RAG)**
An architecture that combines information retrieval with LLM generation. The retriever fetches relevant documents, which are provided as context to the generator. Introduced by Lewis et al. (2020).

**Embedding**
A dense vector representation of text (or other data) in a continuous vector space, where semantic similarity corresponds to geometric proximity. Produced by embedding models (e.g., text-embedding-3-large, BGE, E5).

**Vector Database**
A database optimized for storing and querying high-dimensional vectors via approximate nearest neighbor (ANN) search. Examples: Pinecone, Weaviate, Chroma, Qdrant, pgvector.

**Chunking**
The process of splitting documents into smaller segments for embedding and retrieval. Strategies include fixed-size, sentence-boundary, semantic, recursive character splitting, and document-structure-aware chunking.

**HNSW (Hierarchical Navigable Small World)** [F]
An ANN algorithm that builds a multi-layer graph where each layer is a navigable small-world graph with decreasing connectivity. Offers O(log n) search complexity with high recall.

**IVF (Inverted File Index)** [F]
An ANN algorithm that partitions the vector space into Voronoi cells using k-means clustering, then searches only the nearest cells. Trades recall for speed via the nprobe parameter.

**Reranking**
A second-stage retrieval step that uses a more expensive cross-encoder model to reorder the top-k results from the initial retrieval, improving precision at the cost of latency.

**Hybrid Search**
Combining dense retrieval (embedding similarity) with sparse retrieval (BM25/keyword matching) to capture both semantic and lexical similarity. Typically uses reciprocal rank fusion (RRF) to merge results.

---

## Agents

**AI Agent**
An AI system that can perceive its environment, reason about goals, plan actions, use tools, and execute multi-step workflows autonomously or semi-autonomously.

**ReAct (Reasoning + Acting)**
An agent framework where the model alternates between reasoning (thinking about what to do) and acting (executing a tool or action). Introduced by Yao et al. (2022).

**Tool Use (Function Calling)**
The ability of an LLM to invoke external tools (APIs, databases, code interpreters) by generating structured function calls, receiving results, and incorporating them into subsequent reasoning.

**Planning**
The agent capability of decomposing a complex goal into a sequence of sub-tasks, ordering them by dependency, and executing them. Approaches include task decomposition, hierarchical planning, and iterative refinement.

**Agent Memory**
Systems for persisting information across agent interactions. Types: buffer memory (recent conversation), summary memory (compressed history), vector memory (semantic retrieval), entity memory (structured knowledge).

---

## Fine-Tuning

**Full Fine-Tuning**
Updating all parameters of a pretrained model on a task-specific dataset. Maximally expressive but requires full model in GPU memory and risks catastrophic forgetting.

**LoRA (Low-Rank Adaptation)** [F]
A parameter-efficient fine-tuning method that freezes the pretrained weights and injects trainable low-rank decomposition matrices: W' = W + BA, where B is d x r and A is r x k with rank r << min(d, k). (Hu et al., 2021)

**QLoRA** [F]
Combines 4-bit quantization of the base model with LoRA adapters, enabling fine-tuning of large models on consumer GPUs. Introduced by Dettmers et al. (2023).

**RLHF (Reinforcement Learning from Human Feedback)**
A training methodology where a reward model learned from human preference data is used to fine-tune the LLM via reinforcement learning (typically PPO). Used to align GPT-4, Claude, etc.

**DPO (Direct Preference Optimization)** [F]
An alternative to RLHF that directly optimizes the policy using preference pairs without training a separate reward model. The loss implicitly defines the reward: L_DPO = -E[log sigma(beta * (log pi(y_w|x)/pi_ref(y_w|x) - log pi(y_l|x)/pi_ref(y_l|x)))].

**Synthetic Data**
Training data generated by AI models rather than collected from humans. Used when human-annotated data is scarce, expensive, or covers insufficient edge cases.

---

## Evaluation

**MMLU (Massive Multitask Language Understanding)**
A benchmark testing knowledge across 57 academic subjects. Used as a standard measure of LLM general knowledge.

**HumanEval**
A benchmark of 164 Python programming problems for evaluating code generation. Measures pass@k: the probability that at least one of k generated solutions passes all test cases.

**MT-Bench**
A multi-turn conversation benchmark using GPT-4 as a judge to evaluate response quality on a 1-10 scale across categories (writing, roleplay, reasoning, math, coding, extraction, STEM, humanities).

**Perplexity** [F]
A measure of how well a probability model predicts a sample. For language models: PPL = exp(-1/N * sum(log P(w_i | w_{<i}))). Lower perplexity indicates better prediction.

**BLEU, ROUGE, BERTScore**
Text generation evaluation metrics. BLEU measures n-gram precision (machine translation). ROUGE measures n-gram recall (summarization). BERTScore uses contextual embeddings for semantic similarity.

**Faithfulness**
In RAG evaluation, the degree to which the generated answer is supported by the retrieved context. Measured by decomposing the answer into claims and verifying each against the context.

**Relevance**
In RAG evaluation, the degree to which the retrieved documents are pertinent to the query. Measured by assessing whether each retrieved chunk contains information needed to answer the question.

---

## Infrastructure

**Quantization** [F]
Reducing the numerical precision of model weights (e.g., from FP32 to INT8 or INT4) to decrease memory footprint and increase inference speed, with minimal accuracy loss. Methods: GPTQ, AWQ, GGUF.

**Distillation**
Training a smaller "student" model to replicate the behavior of a larger "teacher" model. The student learns from the teacher's soft probability distributions rather than hard labels.

**Batching**
Processing multiple inference requests simultaneously to improve GPU utilization and throughput. Includes static batching, dynamic batching, and continuous batching (used in vLLM).

**Inference Optimization**
Techniques to reduce latency and cost of model serving: KV-cache, speculative decoding, flash attention, paged attention, tensor parallelism, pipeline parallelism.

**KV-Cache**
Caching the key and value tensors from previous tokens during autoregressive generation, avoiding redundant computation. Memory grows linearly with sequence length and is the primary memory bottleneck during inference.

---

## Responsible AI

**Alignment**
The challenge of ensuring AI systems behave in accordance with human values and intentions. Central concern in AI safety research.

**Red Teaming**
Systematic adversarial testing of AI systems to discover failure modes, biases, harmful outputs, and vulnerabilities. Essential before production deployment.

**Model Card**
A documentation framework (Mitchell et al., 2019) that provides structured information about a model's intended use, performance characteristics, limitations, and ethical considerations.

**Explainability (XAI)**
Techniques for making AI model decisions interpretable to humans. Methods include SHAP (SHapley Additive exPlanations), LIME (Local Interpretable Model-agnostic Explanations), attention visualization, and feature attribution.

**Fairness Metrics** [F]
Quantitative measures of whether a model treats different demographic groups equitably. Key metrics: demographic parity (P(Y_hat=1|A=a) equal across groups), equalized odds (equal TPR and FPR across groups), calibration (P(Y=1|Y_hat=p, A=a) = p for all groups).

---

**This glossary is maintained as a living document. Update when new terms become essential to AI Brain operations.**
