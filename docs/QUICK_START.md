# Quick Start Guide

## Prerequisites

- Node.js 20+
- pnpm
- Docker & Docker Compose
- PostgreSQL (via Docker)

## Setup Instructions

### 1. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install
```

### 2. Start Docker Services

```bash
# Start PostgreSQL, Redis, RabbitMQ, etc.
docker compose up -d

# Verify services are running
docker ps
```

### 3. Setup Database

```bash
# Generate Prisma Client
cd apps/api
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database
npx prisma db seed
```

### 4. Configure Environment

```bash
# Backend
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env with your settings

# Frontend
cp apps/web/.env.example apps/web/.env
# Edit apps/web/.env if needed
```

### 5. Start Development Servers

**Terminal 1 - Backend:**

```bash
cd apps/api
npm run start:dev
```

- API: <http://localhost:3000/api/v1>
- Swagger: <http://localhost:3000/api/docs>

**Terminal 2 - Frontend:**

```bash
cd apps/web
npm run dev
```

- App: <http://localhost:5173>

## Testing the Application

### 1. Register a User

- Navigate to <http://localhost:5173/register>
- Create an account

### 2. Login

- Go to <http://localhost:5173/login>
- Login with your credentials

### 3. Browse Listings

- View featured listings on homepage
- Use search to filter properties

### 4. View Profile

- Check your profile at <http://localhost:5173/profile>

## API Testing with Swagger

1. Open <http://localhost:3000/api/docs>
2. Click "Authorize" button
3. Register/Login to get cookies set
4. Test endpoints directly in Swagger UI

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Database Connection Issues

```bash
# Restart Docker services
docker compose restart postgres

# Check logs
docker compose logs postgres
```

### Prisma Issues

```bash
# Reset database
cd apps/api
npx prisma migrate reset

# Regenerate client
npx prisma generate
```

## Production Build

### Backend

```bash
cd apps/api
npm run build
npm run start:prod
```

### Frontend

```bash
cd apps/web
npm run build
npm run preview
```

## Available Scripts

### Backend (apps/api)

- `npm run start:dev` - Development mode with hot reload
- `npm run build` - Build for production
- `npm run start:prod` - Run production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests

### Frontend (apps/web)

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Lint code

## Next Steps

- Add more listings via API
- Test booking flow
- Explore Swagger documentation
- Customize design system
- Add additional features

---

**Need Help?** Check the documentation in `/docs` folder.
