# Sandbox Isolation

Runs brain agents in isolated Docker containers with resource limits,
network isolation, and read-only brain mounts.

## Architecture

```
┌─────────────────────────────────────────────────┐
│                HOST SYSTEM                       │
│                                                  │
│  ┌───────────────────────────────────────────┐   │
│  │           DOCKER CONTAINER                │   │
│  │                                           │   │
│  │  ┌──────────┐  ┌────────────────────┐    │   │
│  │  │  Agent   │  │  Brain Guidance    │    │   │
│  │  │  (code)  │  │  (read-only mount) │    │   │
│  │  └────┬─────┘  └────────────────────┘    │   │
│  │       │                                   │   │
│  │  ┌────▼─────────────────┐                │   │
│  │  │  /home/sandbox/work  │  (output)      │   │
│  │  └──────────────────────┘                │   │
│  │                                           │   │
│  │  Limits: 512MB RAM, 1 CPU                │   │
│  │  Network: isolated (optional)             │   │
│  │  User: non-root                           │   │
│  │  Filesystem: read-only + tmpfs            │   │
│  └───────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

## Usage

### Python API

```python
from sandbox.sandbox_runner import SandboxRunner

runner = SandboxRunner()

# Run a brain agent in the sandbox
result = runner.run_in_sandbox(
    brain_type="engineering",
    task="Create a REST API for user management",
    allow_network=False,
    timeout=300,
)

if result.success:
    print(result.output)
else:
    print(f"Error: {result.error}")
```

### Docker Compose

```bash
# Start the sandbox environment
docker compose -f sandbox/docker-compose.sandbox.yml up

# Run with environment variables
ANTHROPIC_API_KEY=sk-... docker compose -f sandbox/docker-compose.sandbox.yml run brain-sandbox
```

### Build Image

```bash
# Build the sandbox image directly
docker build -t px1000-sandbox -f sandbox/Dockerfile ../agents/
```

## Security Model

- **Non-root user** inside container
- **Read-only filesystem** (except /tmp and work dir)
- **No network access** by default
- **Resource limits** enforced (512MB RAM, 1 CPU)
- **No privilege escalation** (no-new-privileges)
- **Brain mounts are read-only** -- agents cannot modify brain guidance

## Requirements

- Docker Engine 20.10+
- Docker Compose v2 (optional)
