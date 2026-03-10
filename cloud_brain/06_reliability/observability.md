# Observability — Metrics, Logs, Traces, OpenTelemetry, and SLO-Based Alerting

## Overview

Observability is the ability to understand the internal state of a system by examining its external outputs. Unlike monitoring (which tells you when predefined things go wrong), observability enables you to ask arbitrary questions about system behavior — including questions you did not anticipate when designing the system. This module codifies the three pillars of observability: metrics, logs, and traces. It covers tool selection (Prometheus, Datadog, ELK, Loki, Jaeger, X-Ray), the OpenTelemetry standard for vendor-agnostic instrumentation, and SLO-based alerting that reduces alert fatigue.

The observability axiom: you cannot debug what you cannot see. In distributed systems, the ability to trace a request across services, correlate metrics with events, and search logs contextually is the difference between a 5-minute resolution and a 5-hour outage.

---

## The Three Pillars

### Metrics

Metrics are numerical measurements collected at regular intervals. They are aggregated, time-series data ideal for dashboards, alerting, and trend analysis.

**Types:**
| Type | Description | Example |
|------|-------------|---------|
| Counter | Monotonically increasing value | Total HTTP requests, errors, bytes sent |
| Gauge | Value that can go up or down | Current memory usage, active connections, queue depth |
| Histogram | Distribution of values across buckets | Request latency distribution (p50, p95, p99) |
| Summary | Similar to histogram with pre-calculated quantiles | Request duration quantiles |

**Key Metrics (RED Method for Services):**
| Metric | Definition |
|--------|-----------|
| Rate | Requests per second |
| Errors | Error rate (errors per second or error percentage) |
| Duration | Latency distribution (p50, p95, p99) |

**Key Metrics (USE Method for Resources):**
| Metric | Definition |
|--------|-----------|
| Utilization | % of resource capacity in use (CPU, memory, disk) |
| Saturation | Amount of work queued (queue depth, thread pool saturation) |
| Errors | Resource errors (disk I/O errors, network errors) |

### Metrics Tools

| Tool | Type | Strengths |
|------|------|-----------|
| Prometheus | Open Source | PromQL, pull-based, Kubernetes-native |
| Datadog | Commercial | Unified platform, APM, logs, infrastructure |
| CloudWatch | AWS Native | Deep AWS integration, no setup required |
| Grafana | Open Source (visualization) | Universal dashboarding, multi-datasource |
| InfluxDB | Open Source | Time-series optimized, Flux query language |

### Logs

Logs are discrete, timestamped, immutable records of events. They provide the detail that metrics aggregate away.

**Structured Logging (Required):**
```json
{
  "timestamp": "2024-01-15T10:30:00.123Z",
  "level": "ERROR",
  "service": "order-service",
  "traceId": "abc123def456",
  "spanId": "span789",
  "requestId": "req-001",
  "userId": "user-123",
  "message": "Failed to process order",
  "error": {
    "type": "DatabaseConnectionError",
    "message": "Connection refused",
    "stack": "..."
  },
  "metadata": {
    "orderId": "ord-456",
    "retryCount": 2,
    "durationMs": 1523
  }
}
```

### Log Tools

| Tool | Type | Strengths |
|------|------|-----------|
| ELK Stack (Elasticsearch, Logstash, Kibana) | Open Source | Powerful full-text search, mature ecosystem |
| Grafana Loki | Open Source | Log aggregation designed for Grafana, cost-effective |
| CloudWatch Logs | AWS Native | Deep AWS integration, Insights query language |
| Datadog Logs | Commercial | Unified with metrics and traces |
| Splunk | Commercial | Enterprise-grade, powerful SPL query language |

### Traces

Distributed traces follow a request as it traverses multiple services, providing end-to-end visibility:

```
Client → API Gateway → Auth Service → Order Service → Payment Service → Database
  │         │             │              │               │              │
  └─────────┴─────────────┴──────────────┴───────────────┴──────────────┘
                            Distributed Trace
                    (one trace with multiple spans)
```

**Trace Terminology:**
| Term | Definition |
|------|-----------|
| Trace | End-to-end request path across all services |
| Span | Single operation within a trace (one service's contribution) |
| Parent span | The span that initiated the current span |
| Trace ID | Unique identifier propagated across all services for a single request |
| Span ID | Unique identifier for a single span within a trace |
| Baggage | Key-value pairs propagated across services (use sparingly) |

### Tracing Tools

| Tool | Type | Strengths |
|------|------|-----------|
| Jaeger | Open Source (CNCF) | Kubernetes-native, mature |
| AWS X-Ray | AWS Native | Deep Lambda/ECS integration |
| Grafana Tempo | Open Source | Cost-effective, Grafana integration |
| Zipkin | Open Source | Lightweight, wide language support |
| Datadog APM | Commercial | Unified platform, automatic instrumentation |

---

## OpenTelemetry — Vendor-Agnostic Instrumentation

### OpenTelemetry Architecture

OpenTelemetry (OTel) is the CNCF standard for collecting telemetry data (metrics, logs, traces). It provides vendor-agnostic instrumentation that can export to any backend:

```
Application Code
     │
     ▼
OpenTelemetry SDK (auto + manual instrumentation)
     │
     ▼
OpenTelemetry Collector (receive, process, export)
     │
     ├──→ Prometheus (metrics)
     ├──→ Jaeger/Tempo (traces)
     ├──→ Loki/Elasticsearch (logs)
     └──→ Datadog / New Relic / etc.
```

### OpenTelemetry SDK Integration

```typescript
// Node.js OpenTelemetry setup
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';

const sdk = new NodeSDK({
  serviceName: 'order-service',
  traceExporter: new OTLPTraceExporter({
    url: 'http://otel-collector:4318/v1/traces',
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://otel-collector:4318/v1/metrics',
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
```

### OpenTelemetry Collector Configuration

```yaml
# otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 5s
    send_batch_size: 1024
  memory_limiter:
    check_interval: 1s
    limit_mib: 512

exporters:
  prometheus:
    endpoint: 0.0.0.0:8889
  otlp/jaeger:
    endpoint: jaeger:4317
    tls:
      insecure: true
  loki:
    endpoint: http://loki:3100/loki/api/v1/push

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [otlp/jaeger]
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [prometheus]
    logs:
      receivers: [otlp]
      processors: [memory_limiter, batch]
      exporters: [loki]
```

---

## SLO-Based Alerting

### The Problem with Threshold Alerting

Traditional threshold alerts ("CPU > 80%", "error rate > 1%") create noise:
- CPU at 82% may be perfectly fine if the system is handling load correctly
- Error rate of 0.5% may be a critical problem if the SLO is 99.9%
- Static thresholds do not account for business context or SLO targets

### SLO-Based Alerting Model

Alert based on SLO burn rate — how fast the error budget is being consumed:

```
Burn Rate = (Error Rate Observed) / (Error Rate Allowed by SLO)

For SLO 99.9% (error budget = 0.1%):
  If current error rate = 0.5%, burn rate = 0.5% / 0.1% = 5x
  At this rate, the entire 30-day error budget will be consumed in 6 days
```

### Multi-Window Burn Rate Alerting (Google SRE)

| Alert | Short Window | Long Window | Burn Rate | Severity |
|-------|-------------|-------------|-----------|----------|
| Page | 5 minutes | 1 hour | 14.4x | Critical — immediate response |
| Page | 30 minutes | 6 hours | 6x | Urgent — respond within 30 min |
| Ticket | 2 hours | 1 day | 3x | Important — address within shift |
| Ticket | 6 hours | 3 days | 1x | Normal — address within sprint |

**Why multi-window:** The short window catches fast-burning incidents (site is down). The long window confirms the issue is sustained (not a brief spike). Both must fire for the alert to trigger, dramatically reducing false positives.

### Alerting Best Practices

| Practice | Rationale |
|----------|-----------|
| Every alert must be actionable | If no action is needed, it should not page |
| Alert on symptoms, not causes | "Error rate elevated" not "CPU high" |
| Reduce time to diagnose | Include links to dashboards, runbooks, relevant traces |
| Tune aggressively | Target <5% false positive rate for pages |
| Track alert metrics | Volume, false positive rate, time to acknowledge |

---

## Dashboard Design

### Standard Service Dashboard

| Panel | Metrics | Purpose |
|-------|---------|---------|
| SLO Status | Current SLO compliance, error budget remaining | Top-level health |
| Request Rate | Requests per second by status code | Traffic volume and error rate |
| Latency | p50, p95, p99 latency over time | Performance |
| Error Rate | 4xx and 5xx rates | Client and server errors |
| Saturation | CPU, memory, connection pool utilization | Resource headroom |
| Dependencies | Latency and error rate of downstream services | Dependency health |

---

## Cross-References

- `06_reliability/site_reliability.md` — SLI/SLO definitions
- `06_reliability/high_availability.md` — HA monitoring
- `03_serverless/serverless_operations.md` — Serverless observability
- `04_containers/kubernetes.md` — K8s monitoring
- `Templates/runbook_template.md` — Operational runbooks
