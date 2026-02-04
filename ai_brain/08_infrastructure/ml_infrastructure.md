# ML Infrastructure: Compute, Training Pipelines, and Cloud ML Services

## Overview

Machine learning infrastructure is the foundation that enables model training, evaluation, and iteration at scale. Unlike traditional software infrastructure that optimizes for request throughput and latency, ML infrastructure must handle GPU-intensive compute, massive datasets, long-running training jobs, and the unique operational challenges of reproducible experimentation. This module covers GPU compute planning, training pipeline architecture, distributed training strategies, and cloud ML service selection.

---

## 1. GPU Compute Fundamentals

### 1.1 GPU Architecture for ML

Modern ML training is dominated by NVIDIA GPUs, which provide the parallel processing power required for matrix operations at the core of neural network training.

**Key GPU Specifications**:
| Specification | Why It Matters | Example (A100) | Example (H100) |
|--------------|----------------|-----------------|-----------------|
| VRAM | Determines maximum model size that fits in memory | 40GB/80GB | 80GB |
| FP16 TFLOPS | Training speed for mixed-precision | 312 | 989 |
| Memory Bandwidth | Speed of data transfer to/from GPU memory | 2.0 TB/s | 3.35 TB/s |
| NVLink Bandwidth | Speed of GPU-to-GPU communication | 600 GB/s | 900 GB/s |
| TDP | Power consumption, determines cooling and cost | 400W | 700W |

### 1.2 Memory Requirements

The VRAM required to train a model depends on:

**Model Parameters**: Each parameter requires 4 bytes (FP32) or 2 bytes (FP16/BF16). A 7B parameter model in FP16 requires approximately 14GB for parameters alone.

**Optimizer State**: Adam optimizer stores 2 additional states per parameter (first and second moments). In FP32, this triples the memory requirement: 7B model = ~84GB optimizer state.

**Gradients**: One gradient per parameter during backpropagation. 7B model = ~14GB gradients in FP16.

**Activations**: Intermediate computation results stored for backpropagation. Depends on batch size, sequence length, and model architecture. Often the largest memory consumer.

**Approximate Total**: Training a 7B model requires ~120-150GB of VRAM (full fine-tuning with Adam in mixed precision). This requires at least 2x A100-80GB GPUs.

### 1.3 GPU Provisioning Strategies

**Cloud On-Demand**: Highest flexibility, highest cost. Spin up GPUs when needed, pay by the hour. Providers: AWS (p4d, p5), GCP (A3), Azure (ND series).

**Cloud Spot/Preemptible**: 60-90% cheaper than on-demand but can be interrupted. Suitable for training jobs with checkpointing (resume from last checkpoint if interrupted).

**Reserved Instances**: 30-60% cheaper than on-demand with 1-3 year commitments. Suitable for teams with predictable, ongoing training needs.

**Dedicated Clusters**: Services like Lambda, CoreWeave, and Together AI provide GPU clusters optimized for ML workloads. Often better price-performance than hyperscaler offerings.

**On-Premises**: Highest upfront cost but lowest long-term cost for continuous utilization above 60-70%. Requires significant operational expertise.

---

## 2. Training Pipeline Architecture

### 2.1 Pipeline Stages

```
Data Collection --> Data Processing --> Training --> Evaluation --> Registration --> Deployment
      |                  |                |              |              |
      v                  v                v              v              v
  [Data Store]    [Feature Store]   [Experiment     [Eval Store]  [Model
                                     Tracker]                     Registry]
```

### 2.2 Data Processing Stage

**Data Loading**: Efficient data loading is critical for GPU utilization. If the data pipeline cannot feed data fast enough, GPUs sit idle. Use:
- Memory-mapped datasets for fast random access
- Prefetching and asynchronous data loading
- Multi-worker data loaders (4-8 workers per GPU)
- Data sharding across workers to avoid duplication

**Preprocessing Pipeline**: Tokenization, formatting, and batching should be done ahead of time (offline) whenever possible. Online preprocessing during training wastes GPU cycles.

**Data Versioning**: Track the exact dataset used for each training run. Tools: DVC (Data Version Control), Delta Lake, or custom versioning with hash-based deduplication.

### 2.3 Training Stage

**Experiment Configuration**: Every training run should be fully specified by a configuration file:

```yaml
experiment:
  name: "qlora-medical-coding-v3"
  base_model: "meta-llama/Llama-3-8B"
  method: "qlora"
  lora_rank: 16
  lora_alpha: 32
  learning_rate: 2e-4
  batch_size: 4
  gradient_accumulation_steps: 8
  epochs: 3
  warmup_ratio: 0.05
  weight_decay: 0.01
  dataset: "medical-coding-v2.3"
  dataset_hash: "sha256:abc123..."
  seed: 42
```

**Experiment Tracking**: Log all metrics, hyperparameters, and artifacts for every training run. Tools: Weights & Biases, MLflow, Neptune, TensorBoard.

**Checkpointing**: Save model checkpoints at regular intervals (every N steps or every epoch). Enables:
- Recovery from interruptions (especially important with spot instances)
- Post-hoc evaluation of intermediate checkpoints
- Ensemble construction from multiple checkpoints

### 2.4 Evaluation Stage

Automated evaluation runs after every training run:
1. Load the trained model checkpoint
2. Run standard benchmarks (MMLU, HumanEval, etc.)
3. Run domain-specific evaluations
4. Compare against baseline (base model, previous best)
5. Generate evaluation report with pass/fail verdict

### 2.5 Model Registration

Models that pass evaluation are registered in a model registry:
- Model artifacts (weights, configuration, tokenizer)
- Training metadata (dataset, hyperparameters, metrics)
- Evaluation results
- Version number and lineage (base model, parent experiment)
- Deployment readiness status

---

## 3. Distributed Training

### 3.1 Why Distributed Training

When a model or its training state does not fit in a single GPU's memory, or when training time must be reduced by parallelizing across multiple GPUs, distributed training is required.

### 3.2 Data Parallelism

Replicate the model on each GPU. Split the training batch across GPUs. Each GPU computes gradients on its data shard. Aggregate gradients across GPUs (AllReduce) and update model parameters.

**Strengths**: Simple to implement, scales linearly with number of GPUs for large batch sizes.
**Limitations**: Each GPU must hold the full model. Does not help when the model itself does not fit in memory.

### 3.3 Model Parallelism

Split the model across multiple GPUs. Different layers reside on different GPUs. Data flows sequentially through GPUs.

**Pipeline Parallelism**: Split model layers across GPUs. Each GPU processes a different micro-batch simultaneously (pipeline schedule). Frameworks: DeepSpeed Pipeline, Megatron-LM.

**Tensor Parallelism**: Split individual layers across GPUs. Each GPU computes a portion of the matrix multiplication. Requires high-bandwidth GPU interconnect (NVLink). Frameworks: Megatron-LM.

### 3.4 FSDP (Fully Sharded Data Parallelism)

FSDP (PyTorch native) shards model parameters, gradients, and optimizer states across all GPUs. Each GPU holds only a fraction of the total state. Parameters are gathered on-demand for computation and released afterward.

**Strengths**: Scales to very large models with minimal per-GPU memory. Native PyTorch support.
**Limitations**: Communication overhead from parameter gathering. Requires careful tuning of sharding strategy.

### 3.5 DeepSpeed ZeRO

DeepSpeed's ZeRO (Zero Redundancy Optimizer) progressively shards training state:
- **ZeRO-1**: Shard optimizer state across GPUs
- **ZeRO-2**: Shard optimizer state + gradients
- **ZeRO-3**: Shard optimizer state + gradients + parameters

Each level reduces per-GPU memory at the cost of increased communication.

### 3.6 Distributed Training Decision Matrix

| Model Size | GPU Count | Recommended Approach |
|-----------|-----------|---------------------|
| < 1B | 1-2 | Single GPU or basic data parallelism |
| 1-10B | 2-8 | FSDP or ZeRO-2 |
| 10-70B | 8-32 | ZeRO-3 or pipeline parallelism |
| 70B+ | 32+ | Full 3D parallelism (data + pipeline + tensor) |

---

## 4. Cloud ML Services

### 4.1 AWS SageMaker

**Training**: Managed training jobs with automatic GPU provisioning. Supports distributed training with built-in framework support. Spot training for cost optimization.

**Key Features**: SageMaker Training Compiler (optimizes training code), SageMaker Experiments (experiment tracking), SageMaker Debugger (real-time training monitoring).

**Best For**: Teams already on AWS, organizations requiring compliance certifications, enterprise-scale ML operations.

### 4.2 Google Cloud Vertex AI

**Training**: Custom training jobs on TPUs and GPUs. AutoML for no-code model training. Integration with BigQuery for data pipeline.

**Key Features**: TPU access (cost-effective for large-scale training), Vertex AI Pipelines (Kubeflow-based), Vertex AI TensorBoard.

**Best For**: Teams using TensorFlow/JAX (TPU optimization), organizations leveraging Google Cloud data services.

### 4.3 Azure Machine Learning

**Training**: Managed compute with auto-scaling. Integration with Azure DevOps for MLOps pipelines. Support for OpenAI models through Azure OpenAI Service.

**Key Features**: Azure ML Pipelines, Responsible AI dashboard, integration with Microsoft ecosystem.

**Best For**: Enterprise organizations in the Microsoft ecosystem, teams needing Azure OpenAI integration.

### 4.4 Specialized Providers

| Provider | Specialty | When to Use |
|----------|-----------|-------------|
| Lambda Cloud | Low-cost GPU instances | Budget-conscious training |
| CoreWeave | GPU-optimized Kubernetes | Container-based ML workflows |
| Together AI | Fine-tuning API + GPU cloud | Simplified fine-tuning |
| Modal | Serverless GPU compute | Burst training, inference |
| Replicate | Model hosting + fine-tuning | Quick deployment |

---

## 5. Infrastructure Best Practices

### 5.1 Reproducibility

Every training run must be reproducible:
- Pin all library versions (requirements.txt or conda environment)
- Set random seeds for all sources of randomness
- Version the dataset (exact data used for training)
- Version the code (git commit hash)
- Log the full configuration

### 5.2 Cost Optimization

- Use mixed-precision training (FP16/BF16) for 2x memory savings and speed improvement
- Gradient accumulation to simulate large batches on fewer GPUs
- Spot instances with robust checkpointing
- Right-size GPU selection (do not use H100s for tasks that fit on A10s)
- Schedule training during off-peak hours for lower spot prices

### 5.3 Monitoring

Track during training:
- GPU utilization (should be > 80%, lower indicates bottleneck)
- Memory utilization (approaching limits risks OOM crashes)
- Training loss convergence
- Validation metrics per checkpoint
- Data loading throughput

---

## 6. Key References

- Rajbhandari et al. (2020) -- "ZeRO: Memory Optimizations Toward Training Trillion Parameter Models"
- Shoeybi et al. (2020) -- "Megatron-LM: Training Multi-Billion Parameter Language Models"
- Narayanan et al. (2021) -- "Efficient Large-Scale Language Model Training on GPU Clusters"
- PyTorch FSDP Documentation -- Fully Sharded Data Parallelism

---

*This module covers ML infrastructure. See `model_serving.md` for inference optimization and `cost_optimization.md` for production cost management.*
