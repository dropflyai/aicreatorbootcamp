# n8n Recipe -- Workflow Automation

> Practical recipes for self-hosting n8n, building workflows, and integrating
> with PX1000 brains.
> Copy, adapt, ship.

---

## Table of Contents

1. [Self-Hosting n8n](#self-hosting-n8n)
2. [Workflow Design Patterns](#workflow-design-patterns)
3. [Credentials Management](#credentials-management)
4. [Webhooks](#webhooks)
5. [HTTP Request Node Patterns](#http-request-node-patterns)
6. [Code Node](#code-node)
7. [Error Handling and Retry](#error-handling-and-retry)
8. [PX1000 Integration Patterns](#px1000-integration-patterns)

---

## Self-Hosting n8n

### Docker (quick start)

```bash
docker run -d \
  --name n8n \
  -p 5678:5678 \
  -v n8n_data:/home/node/.n8n \
  -e N8N_BASIC_AUTH_ACTIVE=true \
  -e N8N_BASIC_AUTH_USER=admin \
  -e N8N_BASIC_AUTH_PASSWORD=changeme \
  n8nio/n8n
```

Access at `http://localhost:5678`.

### Docker Compose (production)

```yaml
# docker-compose.yml
version: "3.8"

services:
  n8n:
    image: n8nio/n8n:latest
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=n8n.yourdomain.com
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - WEBHOOK_URL=https://n8n.yourdomain.com/
      - GENERIC_TIMEZONE=America/Los_Angeles
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
      - DB_POSTGRESDB_PORT=5432
      - DB_POSTGRESDB_DATABASE=n8n
      - DB_POSTGRESDB_USER=${POSTGRES_USER}
      - DB_POSTGRESDB_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - n8n_data:/home/node/.n8n
    depends_on:
      postgres:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    restart: always
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=n8n
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  n8n_data:
  postgres_data:
```

### Environment file

```bash
# .env (never commit this)
N8N_USER=admin
N8N_PASSWORD=strong-random-password
POSTGRES_USER=n8n
POSTGRES_PASSWORD=strong-random-password
```

### Key configuration options

| Variable                    | Purpose                              | Default    |
|-----------------------------|--------------------------------------|------------|
| `N8N_BASIC_AUTH_ACTIVE`     | Enable basic auth                    | `false`    |
| `WEBHOOK_URL`               | External URL for webhooks            | auto       |
| `EXECUTIONS_DATA_PRUNE`     | Auto-delete old executions           | `true`     |
| `EXECUTIONS_DATA_MAX_AGE`   | Max age of execution data (hours)    | `336` (14d)|
| `N8N_METRICS`               | Enable Prometheus metrics            | `false`    |
| `N8N_ENCRYPTION_KEY`        | Encryption key for credentials       | auto       |

Back up `N8N_ENCRYPTION_KEY` -- without it, stored credentials cannot be decrypted.

---

## Workflow Design Patterns

Every n8n workflow follows the pattern: **Trigger --> Process --> Output**.

### Pattern 1: Webhook --> Transform --> API

```
[Webhook] --> [Set] --> [HTTP Request] --> [Respond to Webhook]
```

Receives external data, transforms it, calls an API, returns a response.

### Pattern 2: Schedule --> Fetch --> Notify

```
[Schedule Trigger] --> [HTTP Request] --> [IF] --> [Slack / Email]
```

Periodically checks a service and sends alerts when conditions are met.

### Pattern 3: Event --> Fan-out --> Aggregate

```
[Webhook] --> [Split In Batches] --> [HTTP Request] --> [Merge] --> [Respond]
```

Processes items in parallel batches and merges results.

### Pattern 4: Queue processing

```
[Webhook] --> [Redis/DB Write]
[Schedule] --> [Redis/DB Read] --> [Process] --> [Mark Complete]
```

Decouples ingestion from processing for reliability.

### Workflow organization tips

- Name workflows clearly: `[Team] - Action - Target` (e.g., `[Eng] - Deploy - Staging`).
- Use sticky notes inside workflows to document non-obvious logic.
- Pin the most-used workflows in the sidebar.
- Tag workflows by team, environment, or function.

---

## Credentials Management

n8n stores credentials encrypted in its database. Manage them through the UI
or API.

### Creating credentials (UI)

1. Go to **Settings > Credentials**.
2. Click **Add Credential**.
3. Select the service type (GitHub, Slack, AWS, etc.).
4. Fill in the fields and click **Save**.

### Sharing credentials across workflows

Credentials are scoped to the user who created them by default. To share:

1. Open the credential.
2. Click **Sharing**.
3. Add users or set to "All users".

### Environment-based credentials

Use environment variables for credentials that differ between environments:

```
Expression: {{ $env.GITHUB_TOKEN }}
```

Set the variable in your Docker environment or `.env` file.

### Credential rotation

1. Create the new credential with a suffix (e.g., `GitHub - Production v2`).
2. Update workflows to use the new credential.
3. Test all affected workflows.
4. Delete the old credential.

Never delete the old credential before verifying the new one works.

---

## Webhooks

### Receiving external events

```
[Webhook node]
  - HTTP Method: POST
  - Path: /deploy-trigger
  - Authentication: Header Auth
  - Header Name: X-Webhook-Secret
  - Header Value: {{ $env.WEBHOOK_SECRET }}
```

The webhook URL will be: `https://n8n.yourdomain.com/webhook/deploy-trigger`

### Webhook test vs production URLs

| Mode       | URL pattern                                   | Behavior           |
|------------|-----------------------------------------------|---------------------|
| Test       | `/webhook-test/deploy-trigger`                | Active only in editor |
| Production | `/webhook/deploy-trigger`                     | Active when workflow is on |

Always test with the test URL first, then activate the workflow for production.

### Responding to webhooks

Use the **Respond to Webhook** node to send a custom response:

```json
{
  "status": "accepted",
  "workflow_id": "{{ $workflow.id }}",
  "execution_id": "{{ $execution.id }}"
}
```

Return immediately with a 202 Accepted, then continue processing asynchronously.

### Webhook security

- Always use authentication (Header Auth, Basic Auth, or JWT).
- Validate payloads with HMAC signatures when available (GitHub, Stripe).
- Use HTTPS in production (set `N8N_PROTOCOL=https`).
- Rate limit at the reverse proxy level (nginx/Caddy).

---

## HTTP Request Node Patterns

### GET with query parameters

```
URL: https://api.example.com/users
Method: GET
Query Parameters:
  - page: {{ $json.page }}
  - limit: 50
Headers:
  - Authorization: Bearer {{ $credentials.apiToken }}
```

### POST with JSON body

```
URL: https://api.example.com/issues
Method: POST
Body Content Type: JSON
Body:
{
  "title": "{{ $json.title }}",
  "body": "{{ $json.description }}",
  "labels": {{ JSON.stringify($json.labels) }}
}
```

### Pagination (loop until done)

```
[Set page=1] --> [HTTP Request] --> [IF hasMore] --yes--> [Set page+1] --> [HTTP Request]
                                                --no---> [Merge all results]
```

Use the **Loop Over Items** or **Split In Batches** node with a condition check
on the response to handle paginated APIs.

### Retry configuration

In the HTTP Request node settings:
- **Retry On Fail**: true
- **Max Tries**: 3
- **Wait Between Tries**: 1000 ms (increases automatically)

---

## Code Node

The Code node lets you write JavaScript or Python for custom logic.

### JavaScript example

```javascript
// Process each item
const results = [];

for (const item of $input.all()) {
  const data = item.json;
  results.push({
    json: {
      fullName: `${data.firstName} ${data.lastName}`,
      email: data.email.toLowerCase(),
      processed: true,
      timestamp: new Date().toISOString(),
    },
  });
}

return results;
```

### Python example

```python
# Available in n8n 1.x+
import json
from datetime import datetime

results = []
for item in _input.all():
    data = item.json
    results.append({
        "json": {
            "full_name": f"{data['firstName']} {data['lastName']}",
            "email": data["email"].lower(),
            "processed": True,
            "timestamp": datetime.now().isoformat(),
        }
    })

return results
```

### Code node tips

- Use "Run Once for All Items" to batch-process (more efficient).
- Use "Run Once for Each Item" when items are independent and may fail individually.
- Access environment variables: `process.env.MY_VAR` (JS) or `os.environ["MY_VAR"]` (Python).
- Import npm packages in JS: limited to built-in modules and what n8n bundles.

---

## Error Handling and Retry

### Error workflow

1. Go to **Settings > Error Workflow**.
2. Select a workflow that handles errors (e.g., sends a Slack notification).

```
[Error Trigger] --> [Set error details] --> [Slack: Send Message]
```

### Per-node error handling

Each node has an **On Error** setting:

| Option                 | Behavior                              |
|------------------------|---------------------------------------|
| Stop Workflow          | Halt execution (default)              |
| Continue               | Skip the failed item, continue        |
| Continue Using Error   | Output error data to the next node    |

### Retry logic

```
[HTTP Request]
  Settings:
    Retry On Fail: true
    Max Tries: 3
    Wait Between Tries (ms): 1000
```

For custom retry with backoff:

```
[HTTP Request] --error--> [Wait (2^attempt seconds)] --> [IF attempts < 5] --yes--> [HTTP Request]
                                                                           --no---> [Alert]
```

### Dead letter pattern

Failed items go to a separate storage for manual review:

```
[Process] --error--> [Supabase: Insert into dead_letter_queue]
[Schedule] --> [Supabase: Read dead_letter_queue] --> [Retry Process]
```

---

## PX1000 Integration Patterns

### Pattern 1: Webhook trigger for brain tasks

External systems (GitHub, Slack, etc.) trigger PX1000 brain tasks via n8n.

```
[GitHub Webhook: new issue] --> [Code: parse issue] --> [HTTP Request: call brain API]
                                                    --> [Slack: notify team]
```

### Pattern 2: Scheduled brain orchestration

```
[Schedule: daily 6am] --> [HTTP: fetch metrics] --> [Code: analyze]
                      --> [HTTP: call CEO brain with analysis]
                      --> [Slack: post daily summary]
```

### Pattern 3: Multi-brain pipeline

```
[Webhook: new project request]
  --> [HTTP: Engineering Brain - scaffold project]
  --> [HTTP: Design Brain - generate tokens]
  --> [HTTP: Marketing Brain - create landing page copy]
  --> [HTTP: CEO Brain - compile status report]
  --> [Slack: deliver to requester]
```

### Pattern 4: Monitoring and alerting

```
[Schedule: every 5 min]
  --> [HTTP: health check all brain endpoints]
  --> [IF: any unhealthy]
    --yes--> [Slack: alert channel]
             [PagerDuty: create incident]
    --no---> [do nothing]
```

### Connecting n8n to PX1000 brains

1. Each brain exposes an HTTP endpoint (or MCP server).
2. n8n calls the brain via HTTP Request or webhook.
3. The brain processes the task and returns results.
4. n8n routes the results to the next step (another brain, Slack, database, etc.).

Store brain endpoint URLs as n8n credentials or environment variables:

```
ENGINEERING_BRAIN_URL=http://localhost:8001
DESIGN_BRAIN_URL=http://localhost:8002
CEO_BRAIN_URL=http://localhost:8000
```

---

*Engineering Brain -- Automations/Recipes/n8n.md*
