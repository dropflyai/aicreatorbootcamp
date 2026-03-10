# PX1000 Project Score -- Whole-System Evaluation Rubric

> **Purpose:** Evaluate the entire PX1000 system -- not individual brains, but the
> complete platform -- across 10 dimensions on a 1-10 scale.
>
> **Auto-scoring:** Run `python -m agents.tools.project_scorer` from `agents/`.

---

## Scoring Dimensions

### 1. Brain Coverage (10%)

Does every planned brain exist with substantive content?

| Score | Criteria |
|-------|----------|
| 1-2 | Fewer than 10 brain directories |
| 3-4 | 37 brain directories exist but most lack CLAUDE.md |
| 5-6 | 37 brains with CLAUDE.md files (>100 bytes each) |
| 7-8 | 37 brains, each with CLAUDE.md and >=20 .md knowledge files |
| 9 | All of the above with >=35 brains meeting the 20-file threshold |
| **10** | **All 37 brains with >100-line CLAUDE.md, >20 .md files each, zero stub files** |

---

### 2. Agent Framework (10%)

Code quality, architecture patterns, and static-analysis health of `agents/`.

| Score | Criteria |
|-------|----------|
| 1-2 | Minimal Python code (<2000 lines) |
| 3-4 | >=2000 lines, basic module structure |
| 5-6 | >=5000 lines, factory pattern (`specialist_factory.py`) present |
| 7-8 | Result types (`result.py`), verification module, >=7000 lines |
| 9 | All of the above at >=8000 lines |
| **10** | **Clean architecture, factory pattern, Result types, typed errors, <10 cyclomatic complexity, ruff clean, mypy clean** |

---

### 3. Orchestration (10%)

CEO brain routing, task decomposition, multi-brain synthesis.

| Score | Criteria |
|-------|----------|
| 1-2 | No CEO agent |
| 3-4 | `ceo_agent.py` exists |
| 5-6 | CEO agent + brain selector + task decomposer |
| 7-8 | Selector logic >500 lines with dependency awareness |
| 9 | Selector >1000 lines |
| **10** | **CEO delegates to all 37 brains, task decomposition with dependency graph, multi-brain synthesis, error recovery** |

---

### 4. Testing (15%)

Unit, integration, E2E, property-based, contract, and benchmark tests.

| Score | Criteria |
|-------|----------|
| 1-2 | Fewer than 5 test files |
| 3-4 | >=5 test files |
| 5-6 | >=8 test files and property-based tests |
| 7 | Property + contract + benchmark tests |
| 8 | E2E orchestration tests present |
| 9 | E2E + API endpoint tests |
| **10** | **>85% coverage, property-based tests, contract tests, E2E orchestration tests, benchmarks, all green in CI** |

---

### 5. CI/CD (10%)

Pipeline completeness, security scanning, quality gates.

| Score | Criteria |
|-------|----------|
| 1-2 | No CI workflow file |
| 3-4 | CI file exists |
| 5-6 | Lint (ruff) + test (pytest) steps |
| 7 | Lint + type-check (mypy) + test + coverage threshold |
| 8 | SAST (bandit) + SBOM (cyclonedx) |
| 9 | Complexity analysis (radon) + multi-Python matrix |
| **10** | **Lint, type-check, test, SAST, SBOM, complexity analysis, coverage threshold, multi-Python matrix** |

---

### 6. Security (10%)

Supply-chain security, sandbox isolation, secrets management, SAST.

| Score | Criteria |
|-------|----------|
| 1-2 | No sandbox or Dockerfile |
| 3-4 | Dockerfile exists |
| 5-6 | Dockerfile with non-root user + health check |
| 7 | FMEA + incident-response plan |
| 8 | .env.example for secrets management |
| 9 | All of the above |
| **10** | **SBOM, Bandit, Docker sandbox with least-privilege, .env management, RLS, incident-response plan** |

---

### 7. Deployment Readiness (10%)

Docker Compose, database migrations, environment config, API server.

| Score | Criteria |
|-------|----------|
| 1-2 | No deployment artifacts |
| 3-4 | .env.example exists |
| 5-6 | Supabase migrations present |
| 7 | docker-compose.yml for local dev |
| 8 | FastAPI server (api/server.py) |
| 9 | All of the above |
| **10** | **docker-compose for local dev, Supabase migrations, .env.example, FastAPI server, health-check endpoint, seed data** |

---

### 8. Documentation (10%)

Architecture docs, FMEA, SLOs, runbooks, API docs.

| Score | Criteria |
|-------|----------|
| 1-2 | README only |
| 3-4 | BRAIN-ARCHITECTURE.md + BRAIN_ROADMAP.md |
| 5-6 | FMEA + SLOs |
| 7 | Incident-response plan |
| 8 | PROJECT_SCORE.md + BRAIN_EVAL_RUBRIC.md |
| 9 | All of the above |
| **10** | **BRAIN-ARCHITECTURE, FMEA, SLOs, incident-response, API docs (OpenAPI), runbooks, ADR template, PROJECT_SCORE, BRAIN_EVAL_RUBRIC** |

---

### 9. Memory and Observability (5%)

Supabase schema, structured logging, pattern extraction.

| Score | Criteria |
|-------|----------|
| 1-2 | No memory client |
| 3-4 | memory_client.py exists |
| 5-6 | Memory client + pattern extractor |
| 7 | Auto-logger present |
| 8-9 | Supabase migrations + memory client >300 lines |
| **10** | **Full schema, auto-logging, pattern extraction, cross-brain queries, experience search, seed data** |

---

### 10. Battle-Tested (10%)

Integration tests prove the system works end-to-end.

| Score | Criteria |
|-------|----------|
| 1-2 | No integration tests |
| 3-4 | >=50 collected tests |
| 5-6 | >=100 tests, all passing |
| 7 | E2E orchestration tests |
| 8 | E2E + specialist smoke tests |
| 9 | E2E + smoke + API tests |
| **10** | **E2E orchestration tests, specialist smoke tests, API endpoint tests, >=130 tests, all passing** |

---

## Weighted Formula

```
Overall = (Brain Coverage   x 0.10)
        + (Agent Framework  x 0.10)
        + (Orchestration    x 0.10)
        + (Testing          x 0.15)
        + (CI/CD            x 0.10)
        + (Security         x 0.10)
        + (Deployment       x 0.10)
        + (Documentation    x 0.10)
        + (Memory and Obs.  x 0.05)
        + (Battle-Tested    x 0.10)
```

Weights sum to **1.00**. Each dimension is scored 1-10, so the overall is **1.0-10.0**.

---

## Rating Scale

| Range | Rating |
|-------|--------|
| **9.0-10.0** | Production-Grade System |
| **7.0-8.9** | Release Candidate |
| **5.0-6.9** | Beta Quality |
| **3.0-4.9** | Alpha / Prototype |
| **1.0-2.9** | Proof of Concept |

---

## How to Run

```bash
cd prototype_x1000/agents
python -m agents.tools.project_scorer
```

The script inspects the filesystem, runs tests, checks CI config, and prints
a detailed scorecard with per-dimension breakdowns plus the weighted overall.

---

## Improving Your Score

Each dimension section above lists what is needed for every score level.
Focus on the dimensions with the **highest weight and lowest current score**
for maximum impact.

**Testing (15%)** has the largest weight -- invest there first.

---

*Auto-scored by `agents/tools/project_scorer.py`.*
