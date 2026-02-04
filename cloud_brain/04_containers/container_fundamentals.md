# Container Fundamentals — Docker, Multi-Stage Builds, and Production Practices

## Overview

Containers package an application with its dependencies into a portable, isolated unit that runs consistently across environments. Docker democratized containerization by providing a developer-friendly interface to Linux kernel features (namespaces, cgroups, union filesystems). This module codifies container fundamentals: multi-stage builds for minimal production images, layer caching optimization, distroless and minimal base images, health checks, Docker Compose for local development, and production container best practices.

The container axiom: a container that works on a developer's machine and fails in production reveals a configuration difference, not a container problem. Containers eliminate "works on my machine" only when the build is deterministic and the runtime environment matches.

---

## Docker Architecture

### Core Concepts

| Concept | Description |
|---------|-------------|
| Image | Immutable template defining the filesystem and configuration for a container |
| Container | Running instance of an image with its own isolated process space |
| Dockerfile | Declarative build script defining how to construct an image |
| Layer | Each Dockerfile instruction creates a layer; layers are cached and shared |
| Registry | Storage and distribution service for images (Docker Hub, ECR, GCR, GHCR) |
| Volume | Persistent storage that outlives the container lifecycle |
| Network | Isolated network namespace; containers communicate via virtual networks |

### Image Layer Architecture

```
┌─────────────────────────────┐
│  Container Layer (R/W)      │ ← Writable layer, ephemeral
├─────────────────────────────┤
│  COPY . .                   │ ← Application code
├─────────────────────────────┤
│  RUN npm ci                 │ ← Dependencies
├─────────────────────────────┤
│  COPY package*.json ./      │ ← Package manifest
├─────────────────────────────┤
│  FROM node:20-alpine        │ ← Base image
└─────────────────────────────┘
```

Layers are cached. If a layer's input (instruction + context) has not changed, Docker reuses the cached layer. This is why dependency installation (slow, large) should come before application code (fast-changing, small).

---

## Multi-Stage Builds

### Problem

A single-stage build includes build tools, dev dependencies, source code, and intermediate artifacts in the final image. This increases image size (100s of MB to GBs), expands the attack surface, and slows deployments.

### Solution — Multi-Stage Build

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (cached separately from code changes)
COPY package.json package-lock.json ./
RUN npm ci

# Build application
COPY . .
RUN npm run build

# Prune dev dependencies
RUN npm prune --production

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app

# Security: run as non-root user
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Copy only production artifacts
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Set ownership
RUN chown -R appuser:appgroup /app
USER appuser

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "dist/server.js"]
```

### Multi-Stage Build Benefits

| Benefit | Measurement |
|---------|-------------|
| Smaller images | Typical reduction: 500MB+ → 80-150MB |
| Faster deployments | Less data to transfer to registry and nodes |
| Reduced attack surface | No build tools, dev deps, source code in production |
| Better caching | Build stage cache is independent of production stage |
| Separation of concerns | Build environment != runtime environment |

---

## Layer Caching Optimization

### Caching Strategy

```dockerfile
# OPTIMAL: Dependencies cached separately from code
# Layer 1: Base image (changes rarely)
FROM node:20-alpine

# Layer 2: System dependencies (changes rarely)
RUN apk add --no-cache dumb-init

# Layer 3: Application dependencies (changes on package.json change)
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Layer 4: Application code (changes on every commit)
COPY . .

# Cache invalidation flows top-down:
# If Layer 3 changes → Layer 4 also rebuilds
# If Layer 4 changes → only Layer 4 rebuilds
# If Layer 1 changes → everything rebuilds
```

### BuildKit and Advanced Caching

```dockerfile
# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder
WORKDIR /app

# Mount cache for npm
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    npm ci

COPY . .
RUN npm run build
```

BuildKit cache mounts persist across builds, dramatically improving rebuild times for package managers.

---

## Distroless and Minimal Base Images

### Base Image Comparison

| Base Image | Size | Packages | Shell | Security |
|-----------|------|----------|-------|----------|
| ubuntu:22.04 | ~77MB | Full OS | Yes | Large attack surface |
| debian:bookworm-slim | ~74MB | Minimal Debian | Yes | Moderate |
| alpine:3.19 | ~7MB | Minimal musl-based | Yes | Small attack surface |
| node:20-alpine | ~130MB | Alpine + Node.js | Yes | Moderate |
| gcr.io/distroless/nodejs20 | ~120MB | Node.js + minimal libs | No | Minimal attack surface |
| scratch | 0MB | Nothing | No | Zero attack surface (static binaries only) |

### Distroless Images

Google's distroless images contain only the application runtime and its dependencies. No shell, no package manager, no unnecessary utilities.

```dockerfile
# Go application with scratch (smallest possible)
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server .

FROM scratch
COPY --from=builder /app/server /server
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/server"]
```

**Distroless advantages:**
- No shell = cannot `exec` into container (security)
- No package manager = cannot install tools after deployment
- Minimal libraries = fewer CVEs to patch
- Forces proper logging (stdout/stderr, no shell-based debugging)

---

## Health Checks

### Docker HEALTHCHECK Instruction

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

| Parameter | Purpose | Recommendation |
|-----------|---------|---------------|
| --interval | Time between checks | 15-30 seconds |
| --timeout | Maximum time for check to complete | 3-5 seconds |
| --start-period | Grace period for application startup | Set to expected startup time |
| --retries | Consecutive failures before unhealthy | 3-5 |

### Health Check Best Practices

**Liveness check:** Is the process running and responsive?
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});
```

**Readiness check:** Is the application ready to serve traffic?
```javascript
app.get('/ready', async (req, res) => {
  try {
    await db.query('SELECT 1');
    await redis.ping();
    res.status(200).json({ status: 'ready' });
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});
```

---

## Docker Compose for Development

### Production-Like Local Development

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build:
      context: .
      target: development  # Use development stage of multi-stage build
    ports:
      - '3000:3000'
    volumes:
      - .:/app            # Mount source code for hot reload
      - /app/node_modules # Exclude node_modules from mount
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: password
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./migrations:/docker-entrypoint-initdb.d
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    healthcheck:
      test: ['CMD', 'redis-cli', 'ping']
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  pgdata:
```

---

## Production Container Best Practices

### Security Checklist

| Practice | Rationale |
|----------|-----------|
| Run as non-root user | Principle of least privilege; container escape is less impactful |
| Use read-only filesystem | Prevent runtime modifications (malware persistence) |
| Drop all Linux capabilities | Minimize kernel interaction surface |
| No secrets in images | Secrets via environment variables or secrets manager, never baked in |
| Pin base image by digest | Prevent supply chain attacks via tag mutation |
| Scan images for CVEs | Trivy, Snyk Container, ECR scanning |
| Sign images | cosign/Sigstore for supply chain integrity |
| Minimal packages | Only what the application needs; no curl, wget, shell if possible |

### Resource Limits

```yaml
# Kubernetes resource limits (or Docker --memory / --cpus)
resources:
  requests:
    memory: '256Mi'
    cpu: '250m'
  limits:
    memory: '512Mi'
    cpu: '500m'
```

Always set resource limits. A container without limits can consume all available resources on a node, affecting other containers (noisy neighbor problem).

### Logging Best Practices

- Log to stdout/stderr (Docker captures these)
- Use structured logging (JSON)
- Include request ID / correlation ID for distributed tracing
- Never log sensitive data (passwords, tokens, PII)
- Use appropriate log levels (ERROR for failures, INFO for business events, DEBUG only in development)

---

## Container Image Lifecycle

### Build → Scan → Sign → Push → Deploy → Monitor

```
Code Change → Build Image → Scan (Trivy) → Sign (cosign) → Push (ECR) →
  Admission Control (verify signature) → Deploy (K8s/ECS) → Runtime Monitoring (Falco)
```

### Image Tagging Strategy

| Tag | Purpose | Example |
|-----|---------|---------|
| Git SHA | Immutable, traceable to commit | `myapp:a1b2c3d` |
| Semantic version | Release versioning | `myapp:1.2.3` |
| latest | Most recent build (mutable — use with caution) | `myapp:latest` |
| Environment | Deployment target | `myapp:staging`, `myapp:production` |

**Recommendation:** Always deploy by Git SHA or digest, never by mutable tags. `latest` is acceptable for development but never for production.

---

## Cross-References

- `04_containers/kubernetes.md` — Container orchestration
- `04_containers/container_orchestration.md` — Managed container services
- `08_security/data_protection.md` — Container secrets management
- `05_infrastructure_as_code/iac_fundamentals.md` — IaC for container infrastructure
- `06_reliability/observability.md` — Container observability
