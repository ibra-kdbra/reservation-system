# Deployment Guide

## Local Development

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd reservation-system
pnpm install

# 2. Set environment variables
cp .env.example .env
# Edit .env with your values

# 3. Start backing services (PostgreSQL, Redis, etc.)
docker-compose up -d

# 4. Run database migrations and seed
cd apps/api
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
cd ../..

# 5. Start dev servers (in separate terminals)
cd apps/api && npm run start:dev
cd apps/web && npm run dev
```

### Service URLs

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API | http://localhost:3000/api/v1 |
| Swagger UI | http://localhost:3000/api/docs |
| PostgreSQL | localhost:5432 |
| Redis | localhost:6379 |
| RabbitMQ UI | http://localhost:15672 |
| Mailhog | http://localhost:8025 |

---

## Key Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | (required) |
| `JWT_SECRET` | Secret for signing JWTs | (required) |
| `JWT_EXPIRES_IN` | Token expiry | `7d` |
| `FRONTEND_URL` | CORS allowed origin | `http://localhost:5173` |
| `PORT` | API server port | `3000` |
| `NODE_ENV` | `development` / `production` | `development` |

See `.env.example` for the full variable list.

---

## Docker Production Build

```bash
# Build the monolith image
docker build -f Dockerfile.monolith -t reservation-system .

# Run it
docker run -p 3000:3000 --env-file .env reservation-system
```

---

## Build Verification

```bash
# Verify frontend builds without errors
cd apps/web && npm run build

# Verify API builds without errors
cd apps/api && npm run build

# Run via turborepo (builds both)
npm run build
```
