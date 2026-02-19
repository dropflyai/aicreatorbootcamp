# CI/CD Recipe -- GitHub Actions

> Practical recipes for building CI/CD pipelines with GitHub Actions.
> Copy, adapt, ship.

---

## Table of Contents

1. [GitHub Actions Anatomy](#github-actions-anatomy)
2. [Reusable Workflows](#reusable-workflows)
3. [Matrix Strategy for Multi-Version Testing](#matrix-strategy)
4. [Caching](#caching)
5. [Deploy to Vercel](#deploy-to-vercel)
6. [Deploy to Fly.io](#deploy-to-flyio)
7. [Deploy to Railway](#deploy-to-railway)
8. [Database Migrations in CI](#database-migrations-in-ci)
9. [Secrets Management](#secrets-management)
10. [Branch Protection Rules](#branch-protection-rules)

---

## GitHub Actions Anatomy

Every GitHub Actions pipeline is built from four layers:

| Concept  | Description                                      |
|----------|--------------------------------------------------|
| Workflow | A YAML file in `.github/workflows/`. Triggered by events. |
| Job      | A group of steps that run on a single runner.    |
| Step     | A single command or action within a job.         |
| Runner   | The machine (Ubuntu, macOS, Windows) executing the job. |

### Minimal workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test
```

Key points:
- `on` defines triggers (push, pull_request, schedule, workflow_dispatch).
- Jobs run in parallel by default. Use `needs:` for sequential ordering.
- Steps run sequentially within a job.

---

## Reusable Workflows

Reusable workflows let you DRY up CI config across repos.

### Defining a reusable workflow

```yaml
# .github/workflows/reusable-test.yml
name: Reusable Test

on:
  workflow_call:
    inputs:
      node-version:
        required: false
        type: string
        default: "20"
    secrets:
      NPM_TOKEN:
        required: false

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      - run: npm test
```

### Calling a reusable workflow

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]

jobs:
  test:
    uses: ./.github/workflows/reusable-test.yml
    with:
      node-version: "20"
    secrets: inherit   # pass all secrets from caller
```

- `workflow_call` is the trigger that makes a workflow reusable.
- `secrets: inherit` forwards all secrets without listing them individually.

---

## Matrix Strategy

Test across multiple runtimes, OS versions, or dependency versions in parallel.

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false       # don't cancel siblings on first failure
      matrix:
        os: [ubuntu-latest, macos-latest]
        node-version: [18, 20, 22]
        exclude:
          - os: macos-latest
            node-version: 18
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

- `fail-fast: false` keeps all matrix jobs running even if one fails.
- `exclude` removes specific combinations from the matrix.
- `include` adds extra combinations or injects per-combo variables.

---

## Caching

Caching saves minutes on every run. Match the right cache key to your lock file.

### npm cache

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: "npm"                # auto-caches ~/.npm based on package-lock.json
- run: npm ci
```

### pip cache

```yaml
- uses: actions/setup-python@v5
  with:
    python-version: "3.12"
    cache: "pip"                # auto-caches pip based on requirements.txt
- run: pip install -r requirements.txt
```

### Docker layer caching

```yaml
- uses: docker/build-push-action@v5
  with:
    context: .
    push: true
    tags: myapp:latest
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

- `type=gha` uses the GitHub Actions cache backend for Docker layers.
- `mode=max` caches all layers (not just the final image layers).

### Manual cache action

```yaml
- uses: actions/cache@v4
  with:
    path: |
      ~/.cache/pip
      node_modules
    key: deps-${{ runner.os }}-${{ hashFiles('**/package-lock.json', '**/requirements.txt') }}
    restore-keys: |
      deps-${{ runner.os }}-
```

---

## Deploy to Vercel

### Preview deployments on PRs

```yaml
name: Vercel Preview
on: pull_request

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          # omit --prod flag for preview
```

### Production deployment on merge to main

```yaml
name: Vercel Production
on:
  push:
    branches: [main]

jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci && npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

---

## Deploy to Fly.io

```yaml
name: Deploy to Fly.io
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
```

Prerequisites:
- Run `fly launch` locally first to create `fly.toml`.
- Store `FLY_API_TOKEN` in repo secrets.
- Fly.io builds with a Dockerfile by default. Include one in the repo root.

---

## Deploy to Railway

```yaml
name: Deploy to Railway
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: bervProject/railway-deploy@main
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: "my-service"
```

Alternative using Railway CLI directly:

```yaml
      - name: Install Railway CLI
        run: npm install -g @railway/cli
      - name: Deploy
        run: railway up --service my-service
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## Database Migrations in CI

Run migrations before tests, roll back on failure.

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        ports: ["5432:5432"]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    env:
      DATABASE_URL: postgres://test:test@localhost:5432/testdb

    steps:
      - uses: actions/checkout@v4

      - name: Run migrations
        id: migrate
        run: |
          npx prisma migrate deploy        # or: alembic upgrade head
          echo "migration_applied=true" >> $GITHUB_OUTPUT

      - name: Run tests
        run: npm test

      - name: Rollback on failure
        if: failure() && steps.migrate.outputs.migration_applied == 'true'
        run: |
          npx prisma migrate reset --force  # or: alembic downgrade -1
          echo "::warning::Migration rolled back due to test failure"
```

Key patterns:
- Use `services:` to spin up a real Postgres (or MySQL) alongside the runner.
- Health checks ensure the DB is ready before steps execute.
- The rollback step only runs on failure AND only if migration was applied.

---

## Secrets Management

### Setting secrets

```bash
# Via GitHub CLI
gh secret set MY_SECRET --body "secret-value"
gh secret set MY_SECRET < secret-file.txt

# Environment-scoped secrets
gh secret set MY_SECRET --env production --body "prod-value"
```

### Using secrets in workflows

```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  API_KEY: ${{ secrets.API_KEY }}
```

### Rules of thumb

- Never echo secrets in logs. GitHub redacts known secrets, but be cautious.
- Use environment-scoped secrets for prod vs staging separation.
- Rotate secrets on a schedule. Use `gh secret set` in a cron workflow.
- For AWS, use OIDC federation instead of long-lived keys (see AWS-SSM recipe).
- Secrets are not available in forks by default (security feature for PRs).

---

## Branch Protection Rules

Enforce quality gates before merging to main.

### Recommended settings

| Setting                             | Value   |
|-------------------------------------|---------|
| Require pull request before merging | Yes     |
| Required approvals                  | 1+      |
| Require status checks to pass      | Yes     |
| Require branches to be up to date  | Yes     |
| Require conversation resolution    | Yes     |
| Restrict force pushes              | Yes     |

### Configure via CLI

```bash
gh api repos/{owner}/{repo}/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["test"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1}'
```

### Integrate status checks

The job name in your workflow becomes a status check. If your workflow has:

```yaml
jobs:
  test:           # <-- this becomes the status check name "test"
    runs-on: ubuntu-latest
```

Then set `test` as a required status check in branch protection. The PR cannot
merge until the `test` job passes.

---

## Quick Reference

| Task                  | Command / Config                     |
|-----------------------|--------------------------------------|
| Trigger on push       | `on: push`                           |
| Trigger on PR         | `on: pull_request`                   |
| Trigger manually      | `on: workflow_dispatch`              |
| Trigger on schedule   | `on: schedule: - cron: '0 6 * * 1'` |
| Run jobs in sequence  | `needs: [job-name]`                  |
| Set secret            | `gh secret set NAME`                 |
| View workflow runs    | `gh run list`                        |
| Re-run failed job     | `gh run rerun <run-id> --failed`     |
| Download artifacts    | `gh run download <run-id>`           |

---

*Engineering Brain -- Automations/Recipes/CI-CD.md*
