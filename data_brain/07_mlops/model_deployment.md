# Model Deployment — Serving, Scaling, and Infrastructure

## Overview

Model deployment is the process of making a trained ML model available for
inference in a production environment. The choice between batch and real-time
serving, the containerization strategy, model optimization techniques
(quantization, distillation, pruning), API design, scaling infrastructure,
and edge deployment patterns determine the system's latency, throughput, cost,
and reliability. This module covers deployment architectures from single-model
APIs to large-scale inference platforms.

References: Huyen (Designing Machine Learning Systems), Google ML Engineering
Best Practices, NVIDIA TensorRT documentation, ONNX Runtime documentation,
Kubernetes documentation, AWS SageMaker architecture.

---

## Deployment Patterns

### Batch Inference

Predictions computed on a schedule for all entities, stored for later retrieval.

```
Schedule (daily/hourly)
    │
    ├── Load model from registry
    ├── Load feature data from warehouse
    ├── Run predictions on all entities
    ├── Write predictions to prediction store (warehouse/cache)
    └── Downstream services read from prediction store

Serving: prediction store lookup, not model inference at request time
```

Use cases:
- Recommendation lists (precomputed top-K per user)
- Churn risk scores (updated daily)
- Email personalization (computed before send)
- Reporting and analytics

Advantages:
- Simple infrastructure (just a scheduled job)
- Consistent latency (table lookup vs model inference)
- Easy debugging (predictions are stored and auditable)
- Cost-efficient for high-volume predictions

Disadvantages:
- Stale predictions (only updated on schedule)
- Cannot incorporate real-time features
- Storage costs for all entity predictions

### Real-Time (Online) Inference

Model runs at request time, returning predictions with low latency.

```
Request (features)
    │
    ├── Feature enrichment (online feature store)
    ├── Model inference (GPU/CPU)
    ├── Post-processing (thresholds, business rules)
    └── Response (prediction)

Target latency: < 100ms for web, < 10ms for high-frequency
```

Use cases:
- Fraud detection (instant decision at transaction time)
- Search ranking (real-time query understanding)
- Dynamic pricing (responsive to current demand)
- Content moderation (block before display)

### Near-Real-Time (Streaming)

Process events as they arrive via a stream processing engine.

```
Event Stream (Kafka)
    │
    ├── Feature computation (Flink/Spark Streaming)
    ├── Model inference (embedded or microservice)
    ├── Write prediction to stream or store
    └── Downstream consumers

Latency: seconds to minutes
```

Use cases:
- Anomaly detection on IoT sensor data
- Real-time personalization
- Fraud detection on payment streams

---

## Containerization

### Docker for ML Models

```dockerfile
FROM python:3.11-slim

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model artifacts
COPY model/ /app/model/
COPY src/ /app/src/

WORKDIR /app

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:8080/health || exit 1

# Run server
EXPOSE 8080
CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8080"]
```

### Multi-Stage Build (Smaller Images)

```dockerfile
# Stage 1: Build
FROM python:3.11 AS builder
COPY requirements.txt .
RUN pip install --prefix=/install -r requirements.txt

# Stage 2: Runtime
FROM python:3.11-slim
COPY --from=builder /install /usr/local
COPY model/ /app/model/
COPY src/ /app/src/
WORKDIR /app
CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8080"]
```

### GPU Containers

```dockerfile
FROM nvidia/cuda:12.1.0-runtime-ubuntu22.04

RUN apt-get update && apt-get install -y python3 python3-pip
COPY requirements-gpu.txt .
RUN pip3 install -r requirements-gpu.txt

# NVIDIA Container Runtime handles GPU passthrough
# Deploy with: docker run --gpus all my-model-image
```

---

## Model Optimization

### Quantization

Reduce model precision from FP32 to lower bit-widths.

```
FP32 (32-bit float): default training precision
FP16 (16-bit float): 2x memory reduction, minimal accuracy loss
INT8 (8-bit integer): 4x memory reduction, ~1% accuracy loss
INT4 (4-bit integer): 8x memory reduction, ~2-5% accuracy loss

Memory formula:
  Model size (bytes) = parameters * bytes_per_param
  7B model at FP32 = 7B * 4 = 28 GB
  7B model at FP16 = 7B * 2 = 14 GB
  7B model at INT8 = 7B * 1 = 7 GB
  7B model at INT4 = 7B * 0.5 = 3.5 GB
```

### Quantization Methods

| Method | Type | Description |
|--------|------|------------|
| Post-Training Dynamic | Dynamic | Quantize weights, activations at runtime |
| Post-Training Static | Static | Calibrate with representative data |
| Quantization-Aware Training (QAT) | Training | Simulate quantization during training |
| GPTQ | Weight-only | Layer-wise quantization for LLMs |
| AWQ | Weight-only | Activation-aware weight quantization |
| GGML/GGUF | Weight-only | CPU-optimized quantization formats |

### Knowledge Distillation

Train a smaller "student" model to mimic a larger "teacher" model.

```
Loss = alpha * CE(y_true, student_output)
     + (1 - alpha) * KL(teacher_soft_labels, student_soft_labels)

teacher_soft_labels = softmax(teacher_logits / T)
student_soft_labels = softmax(student_logits / T)

where T = temperature (typically 2-20, higher = softer distribution)
```

Benefits:
- Student can be 10-100x smaller than teacher
- Soft labels provide richer training signal than hard labels
- Can distill ensemble knowledge into a single model

### Pruning

Remove less important weights or structures from the model.

| Type | Approach | Speedup |
|------|---------|---------|
| Unstructured | Zero out individual weights | Sparse matrix ops needed |
| Structured | Remove entire neurons/heads/layers | Direct speedup |
| Magnitude | Remove smallest weights | Simple, effective |
| Movement | Remove weights that move toward zero during fine-tuning | Better accuracy |

### ONNX Runtime

Convert models to ONNX format for optimized cross-platform inference.

```python
import torch
import onnxruntime as ort

# Export PyTorch model to ONNX
torch.onnx.export(
    model, dummy_input, "model.onnx",
    input_names=["input"], output_names=["output"],
    dynamic_axes={"input": {0: "batch_size"}}
)

# Inference with ONNX Runtime
session = ort.InferenceSession("model.onnx", providers=["CUDAExecutionProvider"])
result = session.run(None, {"input": input_data})
```

### Optimization Pipeline

```
Train (FP32)
    │
    ├── Quantize (FP16 or INT8)
    ├── Prune (remove 50-90% of weights)
    ├── Distill (train smaller architecture)
    ├── Convert to ONNX/TensorRT
    └── Benchmark: latency, throughput, accuracy
```

---

## API Design for ML

### REST API (FastAPI)

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np

app = FastAPI(title="Churn Prediction API", version="1.0")

class PredictionRequest(BaseModel):
    customer_id: int
    features: dict[str, float]

class PredictionResponse(BaseModel):
    customer_id: int
    churn_probability: float
    risk_tier: str  # "low", "medium", "high"
    model_version: str
    latency_ms: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    start = time.monotonic()

    # Feature validation
    validate_features(request.features)

    # Inference
    features = preprocess(request.features)
    probability = model.predict_proba(features)[0, 1]

    # Post-processing
    risk_tier = "high" if probability > 0.7 else "medium" if probability > 0.3 else "low"

    return PredictionResponse(
        customer_id=request.customer_id,
        churn_probability=round(probability, 4),
        risk_tier=risk_tier,
        model_version="v3.2.1",
        latency_ms=round((time.monotonic() - start) * 1000, 2),
    )

@app.get("/health")
async def health():
    return {"status": "healthy", "model_loaded": model is not None}
```

### gRPC (for Low-Latency)

```protobuf
service PredictionService {
    rpc Predict(PredictionRequest) returns (PredictionResponse);
    rpc PredictBatch(BatchRequest) returns (BatchResponse);
}

message PredictionRequest {
    int64 customer_id = 1;
    map<string, double> features = 2;
}

message PredictionResponse {
    int64 customer_id = 1;
    double churn_probability = 2;
    string risk_tier = 3;
}
```

gRPC advantages: binary protocol, ~10x faster serialization than JSON,
streaming support, strong typing.

### API Best Practices

- Version the API (/v1/predict, /v2/predict)
- Include model version in response for debugging
- Return latency for monitoring
- Validate inputs and return clear error messages
- Rate limiting and authentication
- Async endpoints for long-running predictions
- Batch endpoint for high-throughput use cases

---

## Scaling Inference

### Horizontal Scaling

```
Load Balancer
    │
    ├── Model Server 1 (2 replicas)
    ├── Model Server 2 (2 replicas)
    └── Model Server 3 (2 replicas)

Autoscaling triggers:
  - CPU utilization > 70%
  - Request queue length > 100
  - P95 latency > threshold
  - Custom: GPU memory utilization > 80%
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: churn-model
spec:
  replicas: 3
  selector:
    matchLabels:
      app: churn-model
  template:
    spec:
      containers:
      - name: model-server
        image: registry/churn-model:v3.2.1
        resources:
          requests:
            cpu: "2"
            memory: "4Gi"
          limits:
            cpu: "4"
            memory: "8Gi"
        ports:
        - containerPort: 8080
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: churn-model-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: churn-model
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### GPU Serving

| Framework | Strengths |
|-----------|----------|
| NVIDIA Triton | Multi-framework, dynamic batching, model ensemble |
| TorchServe | PyTorch native, easy setup |
| TensorFlow Serving | TensorFlow native, gRPC |
| vLLM | LLM-optimized, PagedAttention, continuous batching |
| TGI (Text Generation Inference) | Hugging Face LLM serving |

---

## Edge Deployment

### Targets

| Platform | Framework | Constraints |
|----------|----------|-------------|
| Mobile (iOS) | Core ML | < 100MB model, < 100ms latency |
| Mobile (Android) | TFLite, ONNX | < 50MB model, < 100ms latency |
| Browser | ONNX.js, TF.js | < 20MB model, no GPU guarantee |
| IoT/Embedded | TFLite Micro | < 1MB model, < 1W power |
| Edge Server | NVIDIA Jetson | GPU-capable, limited memory |

### Edge Optimization Techniques

1. Model compression (quantization + pruning)
2. Architecture search for mobile (MobileNet, EfficientNet)
3. Input resolution reduction
4. On-device caching of frequent predictions
5. Hybrid: lightweight model on device, complex model in cloud

---

## Production Checklist

- [ ] Deployment pattern selected (batch/real-time/streaming) with rationale
- [ ] Container image built, tested, and pushed to registry
- [ ] Model optimized (quantization/pruning) with accuracy-latency benchmark
- [ ] API documented with OpenAPI spec
- [ ] Health check and readiness probe configured
- [ ] Autoscaling policy configured and load-tested
- [ ] Rollback procedure tested (previous model version)
- [ ] Logging: request/response pairs sampled for debugging
- [ ] Security: authentication, input validation, rate limiting
- [ ] Cost estimation for compute at expected traffic volume
