# Serverless Operations — Observability, Cost Optimization, Testing, and CI/CD

## Overview

Operating serverless applications requires a fundamentally different observability and deployment model than traditional infrastructure. You cannot SSH into a Lambda function. You cannot tail a log file on a server. There are no servers to monitor — only functions, events, and distributed traces. This module codifies serverless operations: observability with X-Ray and Lambda Powertools, cost optimization strategies, testing methodologies for serverless applications, and CI/CD with SAM, SST, and CDK.

The operational axiom for serverless: if you cannot observe it, you cannot operate it. Invest heavily in observability — it is your only window into the runtime.

---

## Observability — AWS X-Ray and Lambda Powertools

### The Observability Challenge

Serverless applications are inherently distributed. A single user request may traverse API Gateway, multiple Lambda functions, DynamoDB, SQS, and external APIs. Without distributed tracing, debugging production issues is guesswork.

### AWS X-Ray — Distributed Tracing

X-Ray traces requests as they flow through AWS services, providing:
- End-to-end request visualization (service map)
- Latency breakdown by service (where time is spent)
- Error and fault tracing (which service failed)
- Annotation and metadata for custom filtering

**Enable X-Ray on Lambda:**
```yaml
# SAM template
MyFunction:
  Type: AWS::Serverless::Function
  Properties:
    Tracing: Active  # Enables X-Ray tracing
    Policies:
      - AWSXRayDaemonWriteAccess
```

### Lambda Powertools — Structured Observability

Lambda Powertools (available for Python, TypeScript, Java, .NET) provides production-ready observability:

**Logger — Structured Logging:**
```typescript
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({
  serviceName: 'order-service',
  logLevel: 'INFO',
  persistentLogAttributes: {
    environment: process.env.ENVIRONMENT
  }
});

export const handler = async (event: any) => {
  logger.addContext({ orderId: event.orderId });
  logger.info('Processing order', { customerId: event.customerId });

  try {
    const result = await processOrder(event);
    logger.info('Order processed successfully', { result });
    return result;
  } catch (error) {
    logger.error('Order processing failed', { error });
    throw error;
  }
};
```

**Tracer — X-Ray Integration:**
```typescript
import { Tracer } from '@aws-lambda-powertools/tracer';

const tracer = new Tracer({ serviceName: 'order-service' });

export const handler = async (event: any) => {
  const subsegment = tracer.getSegment()?.addNewSubsegment('processOrder');
  try {
    const result = await processOrder(event);
    subsegment?.close();
    return result;
  } catch (error) {
    subsegment?.addError(error as Error);
    subsegment?.close();
    throw error;
  }
};
```

**Metrics — Custom CloudWatch Metrics:**
```typescript
import { Metrics, MetricUnits } from '@aws-lambda-powertools/metrics';

const metrics = new Metrics({
  namespace: 'OrderService',
  serviceName: 'order-service'
});

export const handler = async (event: any) => {
  metrics.addMetric('OrdersProcessed', MetricUnits.Count, 1);
  metrics.addMetric('OrderValue', MetricUnits.None, event.total);
  metrics.addDimension('OrderType', event.type);

  const result = await processOrder(event);

  metrics.publishStoredMetrics(); // Flush metrics to CloudWatch
  return result;
};
```

### CloudWatch Insights for Lambda

```
# Find most expensive Lambda invocations
fields @requestId, @billedDuration, @maxMemoryUsed, @message
| filter @type = "REPORT"
| sort @billedDuration desc
| limit 20

# Find cold starts
fields @requestId, @initDuration, @duration
| filter ispresent(@initDuration)
| stats avg(@initDuration) as avgColdStart, count() as coldStarts by bin(1h)

# Find errors
fields @timestamp, @requestId, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 50
```

---

## Cost Optimization

### Lambda Pricing Model

Lambda pricing has two components:
- **Requests:** $0.20 per 1 million requests
- **Duration:** $0.0000166667 per GB-second (varies by region and architecture)
- **Free tier:** 1 million requests + 400,000 GB-seconds per month

### Cost Optimization Strategies

| Strategy | Impact | Implementation |
|----------|--------|---------------|
| Right-size memory | 10-50% cost reduction | Profile with Lambda Power Tuning, find optimal memory/cost ratio |
| Use ARM64 (Graviton2) | 20% cost reduction | Set architecture to arm64, verify compatibility |
| Reduce execution duration | Direct cost reduction | Optimize code, use connection pooling, minimize SDK initialization |
| Batch processing | Fewer invocations | Process SQS messages in batches (up to 10,000 per invocation) |
| Provisioned concurrency only when needed | Avoid idle costs | Schedule provisioned concurrency during peak hours only |
| Avoid unnecessary invocations | Direct cost reduction | S3 event filters, EventBridge content filtering |
| Use Step Functions Express | Lower orchestration cost | Express for high-volume, short workflows |

### Lambda Power Tuning

AWS Lambda Power Tuning is an open-source tool that runs your function at different memory configurations and finds the optimal balance:

```
Memory: 128MB → Duration: 3200ms → Cost: $0.0000067 → Too slow
Memory: 256MB → Duration: 1500ms → Cost: $0.0000063 → Better
Memory: 512MB → Duration: 800ms  → Cost: $0.0000067 → Optimal (best speed/cost)
Memory: 1024MB → Duration: 400ms → Cost: $0.0000067 → Same cost, faster
Memory: 2048MB → Duration: 390ms → Cost: $0.0000130 → Diminishing returns
```

### Cost Monitoring

- **AWS Cost Explorer:** Filter by Lambda, view cost by function, identify expensive functions
- **CloudWatch metrics:** Track invocation count, duration, errors per function
- **Billing alarms:** Set budget alerts for Lambda spending
- **Custom metrics:** Track cost per business transaction (cost per order, cost per API call)

---

## Testing Serverless Applications

### Testing Pyramid for Serverless

```
         /\
        /  \   E2E Tests (deployed environment)
       /    \    — Test full request flow through real AWS services
      /------\
     / Integ  \   Integration Tests (local + cloud)
    / Tests    \    — Test Lambda with real DynamoDB, SQS (localstack or real)
   /------------\
  / Unit Tests   \   Unit Tests (local, no cloud)
 /                \    — Test business logic in isolation, mock AWS SDK
/------------------\
```

### Unit Testing

```typescript
// order-handler.test.ts
import { handler } from './order-handler';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

test('creates order successfully', async () => {
  ddbMock.on(PutCommand).resolves({});

  const event = {
    body: JSON.stringify({ customerId: 'cust-1', items: [{ sku: 'SKU-1', qty: 2 }] })
  };

  const result = await handler(event as any);
  expect(result.statusCode).toBe(201);
  expect(ddbMock.calls()).toHaveLength(1);
});

test('returns 400 for invalid input', async () => {
  const event = { body: JSON.stringify({}) };
  const result = await handler(event as any);
  expect(result.statusCode).toBe(400);
});
```

### Integration Testing with LocalStack

```typescript
// Uses LocalStack for local AWS service emulation
const localDynamo = new DynamoDBClient({
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: { accessKeyId: 'test', secretAccessKey: 'test' }
});

test('order flow integration test', async () => {
  // Create table in LocalStack
  await createTable(localDynamo, 'Orders');

  // Invoke handler with real DynamoDB (local)
  const result = await handler(createOrderEvent);
  expect(result.statusCode).toBe(201);

  // Verify data in DynamoDB
  const order = await getItem(localDynamo, 'Orders', { orderId: 'ord-123' });
  expect(order.status).toBe('CREATED');
});
```

### E2E Testing

Deploy to a staging environment and test the full request flow:
```typescript
test('full order lifecycle', async () => {
  // Create order via API Gateway
  const createResponse = await fetch(`${STAGING_URL}/api/orders`, {
    method: 'POST',
    body: JSON.stringify({ customerId: 'test-1', items: [...] })
  });
  expect(createResponse.status).toBe(201);

  // Wait for async processing (SQS → Lambda → DynamoDB)
  await waitForCondition(async () => {
    const order = await fetch(`${STAGING_URL}/api/orders/${orderId}`);
    const data = await order.json();
    return data.status === 'CONFIRMED';
  }, { timeout: 30000 });
});
```

---

## CI/CD for Serverless

### AWS SAM (Serverless Application Model)

```yaml
# template.yaml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31

Globals:
  Function:
    Runtime: nodejs20.x
    Timeout: 30
    MemorySize: 256
    Tracing: Active
    Environment:
      Variables:
        TABLE_NAME: !Ref OrdersTable

Resources:
  CreateOrderFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: handlers/create-order.handler
      Events:
        CreateOrder:
          Type: Api
          Properties:
            Path: /orders
            Method: post
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref OrdersTable

  OrdersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub '${AWS::StackName}-orders'
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: orderId
          AttributeType: S
      KeySchema:
        - AttributeName: orderId
          KeyType: HASH
```

### SST (Serverless Stack)

```typescript
// sst.config.ts
export default {
  config() {
    return { name: 'order-service', region: 'us-east-1' };
  },
  stacks(app) {
    app.stack(function OrderStack({ stack }) {
      const table = new Table(stack, 'Orders', {
        fields: { orderId: 'string' },
        primaryIndex: { partitionKey: 'orderId' }
      });

      const api = new Api(stack, 'Api', {
        routes: {
          'POST /orders': 'packages/functions/src/create-order.handler',
          'GET /orders/{id}': 'packages/functions/src/get-order.handler',
        },
        defaults: {
          function: { bind: [table] }
        }
      });

      stack.addOutputs({ ApiEndpoint: api.url });
    });
  }
};
```

### AWS CDK

```typescript
const ordersTable = new dynamodb.Table(this, 'OrdersTable', {
  partitionKey: { name: 'orderId', type: dynamodb.AttributeType.STRING },
  billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  removalPolicy: RemovalPolicy.DESTROY,
});

const createOrderFn = new lambda.Function(this, 'CreateOrder', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'create-order.handler',
  code: lambda.Code.fromAsset('lambda'),
  environment: { TABLE_NAME: ordersTable.tableName },
  tracing: lambda.Tracing.ACTIVE,
});

ordersTable.grantReadWriteData(createOrderFn);

const api = new apigateway.RestApi(this, 'OrdersApi');
api.root.addResource('orders').addMethod('POST',
  new apigateway.LambdaIntegration(createOrderFn));
```

### CI/CD Pipeline

```yaml
# GitHub Actions serverless deployment
deploy:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: '20' }
    - run: npm ci
    - run: npm test
    - run: npx sst deploy --stage staging
    - run: npm run test:e2e -- --base-url ${{ steps.deploy.outputs.api_url }}
    - run: npx sst deploy --stage production
      if: github.ref == 'refs/heads/main'
```

---

## Cross-References

- `03_serverless/serverless_architecture.md` — Lambda fundamentals
- `03_serverless/serverless_patterns.md` — Architecture patterns
- `06_reliability/observability.md` — Observability deep dive
- `07_cost/cost_optimization.md` — Cost management
- `05_infrastructure_as_code/iac_fundamentals.md` — IaC for serverless
