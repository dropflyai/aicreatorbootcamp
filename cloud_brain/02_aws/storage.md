# AWS Storage and Database Services

## Overview

AWS provides a storage continuum from object storage (S3) through block storage (EBS) to fully managed databases (RDS, DynamoDB, Aurora). This module covers the storage and database primitives, their architecture, performance characteristics, and selection criteria.

---

## 1. Storage Type Taxonomy

```
┌──────────────────────────────────────────────────────────────┐
│                AWS STORAGE TAXONOMY                           │
│                                                              │
│  Object Storage          Block Storage        File Storage   │
│  ┌──────────┐           ┌──────────┐         ┌──────────┐   │
│  │    S3     │           │   EBS    │         │   EFS    │   │
│  │          │           │          │         │          │   │
│  │ Unlimited │           │ Per-inst.│         │ Shared   │   │
│  │ Objects   │           │ Volumes  │         │ POSIX FS │   │
│  │ HTTP API  │           │ Block dev│         │ NFS v4   │   │
│  └──────────┘           └──────────┘         └──────────┘   │
│                                                              │
│  Best for:              Best for:            Best for:       │
│  - Static assets        - Boot volumes       - Shared data   │
│  - Backups              - Databases          - CMS content   │
│  - Data lakes           - High IOPS          - ML training   │
│  - Archive              - Low latency        - Lambda /tmp   │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. S3 (Simple Storage Service)

### S3 Architecture and Durability

S3 provides 99.999999999% (11 nines) durability by automatically replicating objects across a minimum of 3 Availability Zones within a region.

```
┌──────────────────────────────────────────────────────────────┐
│                    S3 INTERNALS                               │
│                                                              │
│  PUT Object → S3 Frontend                                    │
│       │                                                      │
│       v                                                      │
│  Partition Index (key → physical location)                   │
│       │                                                      │
│       ├── Replica 1 (AZ-a, storage node cluster)             │
│       ├── Replica 2 (AZ-b, storage node cluster)             │
│       └── Replica 3 (AZ-c, storage node cluster)             │
│                                                              │
│  PUT returns 200 only after durability confirmation          │
│  (data written to multiple AZs)                              │
│                                                              │
│  Consistency Model (since Dec 2020):                         │
│  - Strong read-after-write consistency for PUTs and DELETEs  │
│  - Strong consistency for LIST operations                    │
│  - No more eventual consistency caveats                      │
└──────────────────────────────────────────────────────────────┘
```

### S3 Storage Class Decision Matrix

| Storage Class | Durability | Availability | Min Duration | Retrieval Cost | Use Case |
|--------------|------------|-------------|-------------|----------------|----------|
| **Standard** | 11 9s | 99.99% | None | None | Frequently accessed data |
| **Intelligent-Tiering** | 11 9s | 99.9% | None | None | Unknown access patterns |
| **Standard-IA** | 11 9s | 99.9% | 30 days | Per-GB | Infrequent access, fast retrieval |
| **One Zone-IA** | 11 9s* | 99.5% | 30 days | Per-GB | Reproducible infrequent data |
| **Glacier Instant** | 11 9s | 99.9% | 90 days | Per-GB | Archive, millisecond retrieval |
| **Glacier Flexible** | 11 9s | 99.99% | 90 days | Per-GB + time | Archive, minutes-to-hours |
| **Glacier Deep Archive** | 11 9s | 99.99% | 180 days | Per-GB + time | Long-term archive, 12-48 hours |

*One Zone-IA has 11 9s durability within a single AZ but data is lost if the AZ is destroyed.

### S3 Performance Optimization

```
S3 Performance Limits (per prefix):
- 3,500 PUT/COPY/POST/DELETE requests per second
- 5,500 GET/HEAD requests per second

Optimization strategies:

1. PREFIX DISTRIBUTION (for high throughput)
   Bad:  s3://bucket/data/file1, s3://bucket/data/file2
   Good: s3://bucket/data/a1/file1, s3://bucket/data/b2/file2
   (S3 partitions by prefix, more prefixes = more throughput)

2. MULTIPART UPLOAD (for large files)
   - Required for files > 5GB
   - Recommended for files > 100MB
   - Parallelizes upload across parts
   - Individual parts can be retried

3. S3 TRANSFER ACCELERATION
   - Uses CloudFront edge locations for upload
   - 50-500% faster for cross-region uploads
   - Additional cost per GB

4. BYTE-RANGE FETCHES
   - Download specific byte ranges in parallel
   - Useful for large files or partial reads
   - Each range is an independent GET
```

### S3 Security Configuration

```
S3 Security Checklist (NON-NEGOTIABLE):
├── Block Public Access: ENABLED at account level
├── Bucket Policy: Explicit deny for non-SSL (aws:SecureTransport)
├── Encryption: SSE-S3 (default) or SSE-KMS (for key management)
├── Versioning: ENABLED for production buckets
├── Access Logging: ENABLED to dedicated logging bucket
├── Object Lock: For compliance (WORM - Write Once Read Many)
├── Lifecycle Rules: Auto-transition to cheaper storage classes
└── VPC Endpoint: Gateway endpoint (free) for private access
```

---

## 3. EBS (Elastic Block Store)

### EBS Volume Types

| Type | IOPS | Throughput | Latency | Use Case |
|------|------|-----------|---------|----------|
| **gp3** (General SSD) | 3000 baseline, up to 16,000 | 125-1000 MB/s | Single-digit ms | Default for most workloads |
| **gp2** (General SSD) | 3 IOPS/GB, burst to 3000 | Up to 250 MB/s | Single-digit ms | Legacy, prefer gp3 |
| **io2 Block Express** | Up to 256,000 | Up to 4,000 MB/s | Sub-ms | Critical databases |
| **st1** (Throughput HDD) | 500 IOPS max | Up to 500 MB/s | Low ms | Big data, data warehouses |
| **sc1** (Cold HDD) | 250 IOPS max | Up to 250 MB/s | Low ms | Infrequent access |

**Default recommendation:** Always use gp3 unless specific requirements dictate otherwise. gp3 decouples IOPS and throughput from volume size, unlike gp2.

### EBS Snapshots and Backup

```
EBS Snapshot Architecture:
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Snapshot 1 (full):   [Block A] [Block B] [Block C]     │
│  Snapshot 2 (incr.):           [Block B'] [Block D]     │
│  Snapshot 3 (incr.):  [Block A']                        │
│                                                          │
│  - Incremental: only changed blocks stored               │
│  - Each snapshot is independently restorable             │
│  - Stored in S3 (11 nines durability)                    │
│  - Can be copied cross-region for DR                     │
│  - EBS Snapshot Archive: 75% cheaper for long retention  │
│                                                          │
│  Backup Strategy:                                        │
│  - AWS Backup: centralized, policy-driven                │
│  - DLM (Data Lifecycle Manager): automated snapshots     │
│  - Cross-region copy: automated for DR                   │
│  - Retention: tag-based lifecycle policies                │
└──────────────────────────────────────────────────────────┘
```

---

## 4. RDS (Relational Database Service)

### RDS Engine Selection

| Engine | Best For | Max Storage | Read Replicas | Multi-AZ |
|--------|----------|------------|---------------|----------|
| **Aurora MySQL** | MySQL workloads requiring 5x performance | 128 TB | 15 | Built-in (3 AZ) |
| **Aurora PostgreSQL** | PostgreSQL workloads requiring 3x performance | 128 TB | 15 | Built-in (3 AZ) |
| **RDS MySQL** | Standard MySQL, lower cost | 64 TB | 5 | Standby replica |
| **RDS PostgreSQL** | Standard PostgreSQL, lower cost | 64 TB | 5 | Standby replica |
| **RDS SQL Server** | Microsoft ecosystem | 16 TB | 5 (Enterprise) | Yes |

### Aurora Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    AURORA ARCHITECTURE                         │
│                                                              │
│  ┌─────────────────────────────────────────────┐             │
│  │              COMPUTE LAYER                   │             │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  │             │
│  │  │  Writer   │  │ Reader 1 │  │ Reader 2 │  │             │
│  │  │ Instance  │  │ Instance │  │ Instance │  │             │
│  │  │  (AZ-a)   │  │  (AZ-b)  │  │  (AZ-c)  │  │             │
│  │  └─────┬─────┘  └─────┬────┘  └─────┬────┘  │             │
│  └────────┼──────────────┼──────────────┼───────┘             │
│           │              │              │                      │
│           └──────────────┼──────────────┘                      │
│                          │                                     │
│  ┌───────────────────────┴──────────────────────────┐         │
│  │              STORAGE LAYER (shared)               │         │
│  │                                                    │         │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐     │         │
│  │  │ 10 │ │ 10 │ │ 10 │ │ 10 │ │ 10 │ │ 10 │     │         │
│  │  │ GB │ │ GB │ │ GB │ │ GB │ │ GB │ │ GB │     │         │
│  │  └────┘ └────┘ └────┘ └────┘ └────┘ └────┘     │         │
│  │   AZ-a   AZ-b   AZ-c   AZ-a   AZ-b   AZ-c     │         │
│  │                                                    │         │
│  │  6 copies across 3 AZs                            │         │
│  │  Quorum: 4/6 writes, 3/6 reads                   │         │
│  │  Auto-scales in 10 GB increments up to 128 TB    │         │
│  │  Continuous backup to S3                           │         │
│  └──────────────────────────────────────────────────┘         │
│                                                              │
│  Key advantages over RDS:                                     │
│  - Storage is separate from compute (scale independently)    │
│  - 6-way replication for durability                          │
│  - Sub-10ms reader replica lag (shared storage)              │
│  - Instant crash recovery (no redo log replay)               │
│  - Up to 15 read replicas                                    │
│  - Aurora Serverless v2: auto-scales compute                 │
└──────────────────────────────────────────────────────────────┘
```

### Aurora Serverless v2

```
Aurora Serverless v2:
- Scales in increments of 0.5 ACU (Aurora Capacity Units)
- 1 ACU = ~2 GB memory
- Min: 0.5 ACU ($0.06/hr), Max: 128 ACU
- Scales in seconds (not minutes like v1)
- Mixed configurations: writer=provisioned, readers=serverless

Best for:
├── Unpredictable traffic patterns
├── Dev/test databases (scale to near-zero)
├── Multi-tenant applications (each tenant has spiky usage)
└── Read replicas that need to handle burst traffic
```

---

## 5. DynamoDB

### DynamoDB Architecture and Data Model

```
┌──────────────────────────────────────────────────────────────┐
│                   DYNAMODB DATA MODEL                         │
│                                                              │
│  Table: Orders                                               │
│  Partition Key (PK): customer_id                             │
│  Sort Key (SK): order_date#order_id                          │
│                                                              │
│  ┌──────────────┬───────────────────┬────────────────┐       │
│  │ customer_id  │ order_date#id     │ attributes...  │       │
│  │ (PK)         │ (SK)              │                │       │
│  ├──────────────┼───────────────────┼────────────────┤       │
│  │ cust-001     │ 2024-01-15#ord-1  │ total: 99.99   │       │
│  │ cust-001     │ 2024-02-20#ord-2  │ total: 149.50  │       │
│  │ cust-002     │ 2024-01-10#ord-3  │ total: 75.00   │       │
│  └──────────────┴───────────────────┴────────────────┘       │
│                                                              │
│  Access Patterns:                                            │
│  1. Get all orders for customer: PK = "cust-001"            │
│  2. Get orders in date range: PK = "cust-001",              │
│     SK BETWEEN "2024-01-01" AND "2024-01-31"                │
│  3. Get single order: PK = "cust-001", SK = "2024-01-15#1" │
│                                                              │
│  Design Rule: Model access patterns FIRST, schema SECOND    │
│  (opposite of relational modeling)                           │
└──────────────────────────────────────────────────────────────┘
```

### DynamoDB Capacity Modes

| Mode | Pricing | Best For | Limits |
|------|---------|----------|--------|
| **On-Demand** | Per-request ($1.25/M writes, $0.25/M reads) | Unpredictable traffic | Auto-scales, adapts to traffic |
| **Provisioned** | Per-hour (RCU/WCU) | Predictable traffic | Set RCU/WCU, auto-scaling optional |
| **Reserved** | 1yr/3yr commitment on provisioned | Stable, high-volume | Up to 77% discount |

### DynamoDB Single-Table Design

```
Single-Table Design Pattern (advanced):

All entities in ONE table, differentiated by PK/SK patterns:

PK              SK                  Type        Attributes
USER#123        PROFILE             User        name, email
USER#123        ORDER#2024-01-15    Order       total, status
USER#123        ADDRESS#home        Address     street, city
PRODUCT#abc     METADATA            Product     name, price
PRODUCT#abc     REVIEW#USER#123     Review      rating, text
ORDER#ord-1     PRODUCT#abc         OrderItem   qty, price

GSI1 (inverted):
GSI1PK = SK, GSI1SK = PK
→ Enables querying by order, product, etc.

Benefits:
├── Single request for all related data (TransactGetItems)
├── Reduced operational overhead (one table to manage)
├── Consistent performance at any scale
└── Follows DynamoDB best practice for microservices

Tradeoffs:
├── Steep learning curve
├── Harder to evolve access patterns
├── Complex queries require careful GSI design
└── Not suitable for ad-hoc querying (use Athena/Redshift)
```

---

## 6. ElastiCache

### Redis vs Memcached

| Feature | ElastiCache Redis | ElastiCache Memcached |
|---------|------------------|----------------------|
| Data structures | Strings, hashes, lists, sets, sorted sets, streams | Strings only |
| Persistence | RDB snapshots, AOF | None |
| Replication | Primary-replica, Multi-AZ | None (multi-node sharding only) |
| Cluster mode | Yes (sharding + replication) | Yes (sharding only) |
| Pub/Sub | Yes | No |
| Lua scripting | Yes | No |
| Max item size | 512 MB | 1 MB (default), 128 MB (max) |

**Default recommendation:** ElastiCache Redis (or Valkey post-license change). Memcached only for simple key-value caching where multi-threading per node matters more than features.

---

## 7. Database Selection Decision Matrix

```
┌──────────────────────────────────────────────────────────────┐
│              DATABASE SELECTION DECISION TREE                  │
│                                                              │
│  Is the data relational with complex queries/joins?          │
│  ├── YES → Need Aurora-level performance?                    │
│  │         ├── YES → Aurora (MySQL or PostgreSQL)             │
│  │         └── NO  → RDS (MySQL/PostgreSQL/SQL Server)       │
│  └── NO                                                      │
│       ├── Is it key-value or document with known access?     │
│       │   ├── YES → DynamoDB                                 │
│       │   └── NO  → Continue below                           │
│       │                                                      │
│       ├── Is it time-series data?                            │
│       │   ├── YES → Amazon Timestream                        │
│       │   └── NO  → Continue below                           │
│       │                                                      │
│       ├── Is it graph data (relationships)?                  │
│       │   ├── YES → Amazon Neptune                           │
│       │   └── NO  → Continue below                           │
│       │                                                      │
│       ├── Is it full-text search?                            │
│       │   ├── YES → OpenSearch Service                       │
│       │   └── NO  → Continue below                           │
│       │                                                      │
│       └── Is it a cache/session store?                       │
│           ├── YES → ElastiCache (Redis)                      │
│           └── NO  → Re-evaluate requirements                 │
└──────────────────────────────────────────────────────────────┘
```

---

## References

- AWS S3 Developer Guide -- Performance Optimization
- AWS Aurora Technical Overview (re:Invent DAT326)
- Kleppmann, M. *Designing Data-Intensive Applications.* O'Reilly, 2017. Chapters 3-5.
- AWS DynamoDB Best Practices -- Single-Table Design
- AWS Well-Architected Framework -- Data Pillar
- Rick Houlihan, "Advanced Design Patterns for DynamoDB" (re:Invent DAT401)

---

**This module covers AWS storage and database selection. For compute that connects to these stores, see `02_aws/compute.md`. For networking between them, see `02_aws/networking.md`.**
