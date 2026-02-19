# Cloudflare Recipe -- DNS, CDN, Workers, and More

> Practical recipes for Cloudflare services: DNS, CDN, Workers, Pages, R2, D1,
> and Zero Trust tunnels.
> Copy, adapt, ship.

---

## Table of Contents

1. [DNS Management](#dns-management)
2. [CDN Configuration](#cdn-configuration)
3. [Workers](#workers)
4. [Pages](#pages)
5. [R2 Object Storage](#r2-object-storage)
6. [D1 Database](#d1-database)
7. [Wrangler CLI](#wrangler-cli)
8. [Zero Trust Tunnels](#zero-trust-tunnels)

---

## DNS Management

### Record types

| Type    | Purpose                         | Example                              |
|---------|---------------------------------|--------------------------------------|
| A       | IPv4 address                    | `@` -> `203.0.113.50`               |
| AAAA    | IPv6 address                    | `@` -> `2001:db8::1`                |
| CNAME   | Alias to another domain         | `www` -> `example.com`              |
| MX      | Mail server                     | `@` -> `mail.example.com` (pri 10)  |
| TXT     | Verification, SPF, DKIM         | `@` -> `v=spf1 include:_spf...`    |

### Proxied vs DNS-only

| Mode      | Icon    | Behavior                                         |
|-----------|---------|--------------------------------------------------|
| Proxied   | Orange  | Traffic flows through Cloudflare CDN/WAF          |
| DNS-only  | Gray    | Cloudflare only resolves DNS, no proxy            |

**Use proxied for:** Web traffic (HTTP/HTTPS) -- gets CDN, WAF, DDoS protection.

**Use DNS-only for:** Mail servers (MX), non-HTTP services, records that must
expose the origin IP (SSH, custom TCP).

### CLI (via Wrangler or API)

```bash
# List DNS records
curl -s "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer $CF_API_TOKEN" | jq '.result[] | {name, type, content, proxied}'

# Create an A record
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "A",
    "name": "api",
    "content": "203.0.113.50",
    "proxied": true,
    "ttl": 1
  }'
```

TTL of `1` means "automatic" (Cloudflare manages it). For DNS-only records,
set a specific TTL (e.g., 300 seconds).

---

## CDN Configuration

### Cache rules

Cloudflare caches static assets by default (JS, CSS, images). Customize with
Cache Rules in the dashboard or via API.

```
Rule: Cache API responses
  Match: URI Path starts with /api/public/
  Action: Cache eligible, Edge TTL 5 minutes, Browser TTL 1 minute

Rule: Bypass cache for authenticated routes
  Match: URI Path starts with /api/private/ OR Cookie contains session=
  Action: Bypass cache
```

### Cache headers from origin

Cloudflare respects standard cache headers:

```
Cache-Control: public, max-age=31536000, immutable    # static assets
Cache-Control: public, max-age=300, s-maxage=3600     # API responses
Cache-Control: no-store                                 # never cache
```

### Purging cache

```bash
# Purge everything (use sparingly)
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything": true}'

# Purge specific URLs
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"files": ["https://example.com/styles.css", "https://example.com/app.js"]}'
```

### Performance settings

| Setting              | Recommendation                   |
|----------------------|----------------------------------|
| Auto Minify         | Enable for JS, CSS, HTML         |
| Brotli              | Enable (better than gzip)        |
| Early Hints         | Enable (103 status code)         |
| HTTP/2 Push         | Disable (browsers handle this)   |
| Rocket Loader       | Test carefully (can break JS)    |
| Polish              | Enable for image optimization    |

---

## Workers

Cloudflare Workers run JavaScript/TypeScript at the edge (200+ locations).
Cold start is near zero.

### Hello World worker

```typescript
// src/index.ts
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/hello") {
      return Response.json({ message: "Hello from the edge!" });
    }

    return new Response("Not found", { status: 404 });
  },
};

interface Env {
  API_KEY: string;           // secret binding
  MY_KV: KVNamespace;       // KV binding
  MY_BUCKET: R2Bucket;      // R2 binding
  MY_DB: D1Database;        // D1 binding
}
```

### Worker with KV storage

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);  // strip leading /

    if (request.method === "GET") {
      const value = await env.MY_KV.get(key);
      if (!value) return new Response("Not found", { status: 404 });
      return new Response(value);
    }

    if (request.method === "PUT") {
      const body = await request.text();
      await env.MY_KV.put(key, body, { expirationTtl: 3600 });
      return new Response("Stored", { status: 201 });
    }

    return new Response("Method not allowed", { status: 405 });
  },
};
```

### Worker routing

```toml
# wrangler.toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"

routes = [
  { pattern = "api.example.com/*", zone_name = "example.com" }
]

[vars]
ENVIRONMENT = "production"

[[kv_namespaces]]
binding = "MY_KV"
id = "abc123"

[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-bucket"

[[d1_databases]]
binding = "MY_DB"
database_name = "my-database"
database_id = "def456"
```

---

## Pages

Cloudflare Pages hosts static sites and full-stack apps with automatic
preview deployments on every PR.

### Setup with Git

1. Go to **Workers & Pages > Create > Pages > Connect to Git**.
2. Select your repository.
3. Configure build settings:

| Framework    | Build command          | Output directory |
|--------------|------------------------|------------------|
| Next.js      | `npx @cloudflare/next-on-pages` | `.vercel/output/static` |
| Vite/React   | `npm run build`        | `dist`           |
| Astro        | `npm run build`        | `dist`           |
| Hugo         | `hugo`                 | `public`         |

### Preview deployments

Every push to a non-production branch creates a unique preview URL:

```
https://<commit-hash>.my-project.pages.dev
```

PR comments automatically include the preview link.

### Environment variables

```bash
# Set via Wrangler
npx wrangler pages project create my-project
npx wrangler pages secret put API_KEY --project-name my-project
```

Or set in the dashboard under **Settings > Environment variables**.
Separate values for Production and Preview environments.

### Custom domains

```bash
# Add a custom domain
npx wrangler pages project add-domain my-project example.com
```

Cloudflare automatically provisions SSL and configures DNS.

---

## R2 Object Storage

R2 is S3-compatible object storage with zero egress fees.

### Create a bucket

```bash
npx wrangler r2 bucket create my-bucket
npx wrangler r2 bucket create my-bucket --location wnam  # West North America
```

### Upload and download

```bash
# Upload a file
npx wrangler r2 object put my-bucket/images/logo.png --file ./logo.png

# Download a file
npx wrangler r2 object get my-bucket/images/logo.png --file ./downloaded-logo.png

# List objects
npx wrangler r2 object list my-bucket --prefix images/
```

### Use R2 from a Worker

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    if (request.method === "GET") {
      const object = await env.MY_BUCKET.get(key);
      if (!object) return new Response("Not found", { status: 404 });
      return new Response(object.body, {
        headers: { "Content-Type": object.httpMetadata?.contentType || "application/octet-stream" },
      });
    }

    if (request.method === "PUT") {
      await env.MY_BUCKET.put(key, request.body, {
        httpMetadata: { contentType: request.headers.get("content-type") || "application/octet-stream" },
      });
      return new Response("Uploaded", { status: 201 });
    }

    return new Response("Method not allowed", { status: 405 });
  },
};
```

### S3-compatible API

R2 works with any S3 client. Generate API tokens in the dashboard:

```python
import boto3

s3 = boto3.client(
    "s3",
    endpoint_url="https://<account_id>.r2.cloudflarestorage.com",
    aws_access_key_id="<r2_access_key>",
    aws_secret_access_key="<r2_secret_key>",
    region_name="auto",
)

# Upload
s3.upload_file("./data.csv", "my-bucket", "uploads/data.csv")

# Download
s3.download_file("my-bucket", "uploads/data.csv", "./downloaded.csv")
```

---

## D1 Database

D1 is SQLite at the edge, accessible from Workers.

### Create a database

```bash
npx wrangler d1 create my-database
# Note the database_id in the output -- add it to wrangler.toml
```

### Migrations

```bash
# Create a migration
npx wrangler d1 migrations create my-database create-users-table

# Edit the migration file
# migrations/0001_create-users-table.sql
```

```sql
-- migrations/0001_create-users-table.sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_users_email ON users(email);
```

```bash
# Apply migrations (local)
npx wrangler d1 migrations apply my-database --local

# Apply migrations (production)
npx wrangler d1 migrations apply my-database --remote
```

### Query from a Worker

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // List users
    const { results } = await env.MY_DB
      .prepare("SELECT id, email, name FROM users ORDER BY created_at DESC LIMIT 50")
      .all();

    // Insert a user
    await env.MY_DB
      .prepare("INSERT INTO users (email, name) VALUES (?, ?)")
      .bind("alice@example.com", "Alice")
      .run();

    return Response.json(results);
  },
};
```

---

## Wrangler CLI

Wrangler is the official CLI for Cloudflare Workers, Pages, R2, D1, and more.

### Installation

```bash
npm install -g wrangler

# Or as a dev dependency
npm install -D wrangler
```

### Authentication

```bash
# Login (opens browser)
npx wrangler login

# Check who you are
npx wrangler whoami
```

### Common commands

| Command                                  | Purpose                            |
|------------------------------------------|------------------------------------|
| `wrangler dev`                           | Local development server           |
| `wrangler deploy`                        | Deploy Worker to production        |
| `wrangler tail`                          | Live stream Worker logs            |
| `wrangler secret put NAME`               | Set a secret for a Worker          |
| `wrangler r2 bucket list`               | List R2 buckets                    |
| `wrangler d1 execute DB --command "SQL"` | Run SQL against D1                 |
| `wrangler pages deploy ./dist`           | Deploy static site to Pages        |
| `wrangler kv:namespace create NAME`      | Create a KV namespace              |

### wrangler.toml structure

```toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "2024-01-01"
compatibility_flags = ["nodejs_compat"]

# Environment variables (non-secret)
[vars]
ENVIRONMENT = "production"
LOG_LEVEL = "info"

# KV Namespaces
[[kv_namespaces]]
binding = "CACHE"
id = "abc123"

# R2 Buckets
[[r2_buckets]]
binding = "STORAGE"
bucket_name = "my-storage"

# D1 Databases
[[d1_databases]]
binding = "DB"
database_name = "my-db"
database_id = "def456"

# Environment overrides
[env.staging]
name = "my-worker-staging"
vars = { ENVIRONMENT = "staging" }
```

---

## Zero Trust Tunnels

Cloudflare Tunnels expose local services to the internet without opening
firewall ports. Useful for local dev, staging, and connecting private services.

### Install cloudflared

```bash
# macOS
brew install cloudflared

# Linux
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb
```

### Quick tunnel (no config, temporary)

```bash
# Expose localhost:3000 with a random subdomain
cloudflared tunnel --url http://localhost:3000
# Output: https://random-words.trycloudflare.com
```

This is perfect for quick demos, webhook testing, or sharing local dev.

### Named tunnel (persistent, production-ready)

```bash
# Login
cloudflared tunnel login

# Create a tunnel
cloudflared tunnel create my-tunnel
# Note the tunnel ID in the output

# Configure DNS
cloudflared tunnel route dns my-tunnel dev.example.com

# Create config
```

```yaml
# ~/.cloudflared/config.yml
tunnel: <tunnel-id>
credentials-file: /Users/me/.cloudflared/<tunnel-id>.json

ingress:
  - hostname: dev.example.com
    service: http://localhost:3000
  - hostname: api.example.com
    service: http://localhost:8000
  - service: http_status:404    # catch-all (required)
```

```bash
# Run the tunnel
cloudflared tunnel run my-tunnel
```

### Docker deployment

```yaml
# docker-compose.yml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: always
    command: tunnel --no-autoupdate run --token ${TUNNEL_TOKEN}
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN}
```

Get the tunnel token from the Cloudflare Zero Trust dashboard:
**Networks > Tunnels > Create > Docker**.

### Common tunnel use cases

| Use Case                  | Setup                                         |
|---------------------------|-----------------------------------------------|
| Share local dev           | Quick tunnel (`--url http://localhost:3000`)   |
| Webhook testing           | Quick tunnel + point webhook to tunnel URL     |
| Staging environment       | Named tunnel + DNS record                     |
| Connect private service   | Named tunnel + Access policies                |
| Replace VPN               | Named tunnel + Zero Trust Access rules        |

---

*Engineering Brain -- Automations/Recipes/Cloudflare.md*
