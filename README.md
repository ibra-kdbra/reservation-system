# Reservation System v2 - Development Environment

## Quick Start

### Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- Node.js 20+ and pnpm 8+
- Git

### 1. Clone and Setup

```bash
cd /home/meitantei/WorkSpace_SWE/reservation-system-v2
pnpm install
```

### 2. Start Development Services

```bash
# Start all services in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Check service health
docker-compose ps
```

### 3. Access Services

| Service | URL | Credentials |
|---------|-----|-------------|
| PostgreSQL | `localhost:5432` | user: `reservation_user`, pass: `reservation_pass` |
| PostgreSQL Replica | `localhost:5433` | user: `reservation_user`, pass: `reservation_pass` |
| Redis | `localhost:6379` | pass: `redis_pass` |
| RabbitMQ Management | <http://localhost:15672> | user: `rabbit_user`, pass: `rabbit_pass` |
| Elasticsearch | <http://localhost:9200> | No auth |
| MinIO Console | <http://localhost:9001> | user: `minio_user`, pass: `minio_pass123` |
| Mailhog UI | <http://localhost:8025> | No auth |
| Prometheus | <http://localhost:9090> | No auth |
| Grafana | <http://localhost:3001> | user: `admin`, pass: `admin123` |

### 4. Environment Variables

Create `.env` files in each app directory:

**apps/api/.env**

```env
# Database
DATABASE_URL="postgresql://reservation_user:reservation_pass@localhost:5432/reservation_db"
DATABASE_REPLICA_URL="postgresql://reservation_user:reservation_pass@localhost:5433/reservation_db"

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_pass

# RabbitMQ
RABBITMQ_URL=amqp://rabbit_user:rabbit_pass@localhost:5672

# Elasticsearch
ELASTICSEARCH_NODE=http://localhost:9200

# MinIO (S3)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minio_user
S3_SECRET_KEY=minio_pass123
S3_BUCKET=reservation-uploads

# Email (Mailhog for dev)
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d

# App
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1
```

**apps/web/.env**

```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=Reservation System
```

### 5. Database Setup

```bash
# Navigate to API directory
cd apps/api

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Seed database (optional)
pnpm prisma db seed
```

### 6. Start Development Servers

```bash
# From root directory
pnpm dev

# Or individually
cd apps/api && pnpm dev    # Backend on :3000
cd apps/web && pnpm dev    # Frontend on :5173
```

## Development Workflow

### Making Changes

1. **Create/modify files**
2. **Update changelog**:

   ```bash
   npm run changelog:add <file-path> "<description>"
   ```

3. **Test changes**
4. **Commit with descriptive message**

### Running Tests

```bash
# All tests
pnpm test

# Specific workspace
pnpm --filter @reservation/api test
pnpm --filter @reservation/web test

# E2E tests
pnpm test:e2e

# Watch mode
pnpm test:watch
```

### Database Management

```bash
# Open Prisma Studio
cd apps/api && pnpm prisma studio

# Create migration
pnpm prisma migrate dev --name <migration-name>

# Reset database
pnpm prisma migrate reset

# View database
psql postgresql://reservation_user:reservation_pass@localhost:5432/reservation_db
```

### Monitoring

- **Logs**: `docker-compose logs -f <service-name>`
- **Metrics**: <http://localhost:9090> (Prometheus)
- **Dashboards**: <http://localhost:3001> (Grafana)
- **Email Testing**: <http://localhost:8025> (Mailhog)

## Troubleshooting

### Services won't start

```bash
# Stop all services
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Restart
docker-compose up -d
```

### Port conflicts

Edit `docker-compose.yml` to change port mappings.

### Database connection issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# View logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U reservation_user -d reservation_db
```

## Production Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter @reservation/api build
pnpm --filter @reservation/web build
```

## Useful Commands

```bash
# Stop all services
docker-compose down

# Restart a service
docker-compose restart <service-name>

# View resource usage
docker stats

# Clean up
docker system prune -a

# Update dependencies
pnpm update --recursive

# Check for outdated packages
pnpm outdated --recursive
```

## Next Steps

1. Review the [Implementation Plan](../brain/cdf47158-c949-488c-95f9-c5d3632c0a92/implementation_plan.md)
2. Check [Features List](../brain/cdf47158-c949-488c-95f9-c5d3632c0a92/features.md)
3. Follow [Task Breakdown](../brain/cdf47158-c949-488c-95f9-c5d3632c0a92/task.md)
4. Start with Phase 2: Backend Development

## Support

For issues or questions, check:

- Project documentation in `/docs`
- Changelog system: `npm run changelog:summary`
- Architecture diagrams in `/docs/architecture`
