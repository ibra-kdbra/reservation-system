#!/bin/bash

# ISO 25010 Quality Roadmap: Phase 2 - Monorepo & Performance

# 1. Monorepo Infrastructure & Shared Types
git add packages/types pnpm-lock.yaml
git commit -m "infra: initialize @nest-asia/types packages and pnpm workspace

- Created shared types package for cross-app consistency
- Integrated workspace in pnpm-workspace.yaml"

# 2. Shared Types Integration - API DTOs
git add apps/api/src/auth/dto/auth.dto.ts \
        apps/api/src/user/dto/user.dto.ts \
        apps/api/src/listing/dto/listing.dto.ts \
        apps/api/src/booking/dto/booking.dto.ts
git commit -m "refactor(api): sync DTOs with shared interfaces

- Updated Register, Login, CreateListing, and Booking DTOs
- Ensured strict payload validation alignment with frontend"

# 3. Shared Types Integration - API Services
git add apps/api/src/auth/auth.service.ts \
        apps/api/src/auth/auth.controller.ts \
        apps/api/src/admin/admin.service.ts \
        apps/api/src/booking/booking.service.ts \
        apps/api/src/booking/booking.controller.ts \
        apps/api/src/listing/listing.service.ts \
        apps/api/src/listing/listing.controller.ts \
        apps/api/src/listing/listing.service.spec.ts \
        apps/api/src/prisma/prisma.service.ts \
        apps/api/prisma/seed.ts \
        apps/api/src/auth/guards/roles.guard.ts
git commit -m "feat(api): implement shared types in services and controllers

- Replaced internal types with @nest-asia/types
- Resolved Prisma type incompatibilities and lint errors
- Updated ListingService and BookingService for strict type safety"

# 4. Performance Efficiency: Redis Caching
git add apps/api/src/app.module.ts \
        apps/api/src/listing/listing.controller.ts \
        apps/api/package.json
git commit -m "feat(api): integrate Redis caching for listing search

- Configured CacheModule with ioredis and cache-manager-redis-store
- Applied CacheInterceptor with @CacheTTL(600) to search endpoint
- Optimized database load for frequent search queries"

# 5. Reliability & Observability: Winston Logging
git add apps/api/src/main.ts
git commit -m "feat(api): implement structured logging with Winston

- Added WinstonModule with Console and DailyRotateFile transports
- Configured JSON logging for persistence and colorized logs for dev
- Enhanced bootstrap error handling"

# 6. Frontend Resilience: axios-retry
git add apps/web/src/api/client.ts \
        apps/web/package.json \
        apps/web/src/types/index.ts
git commit -m "feat(web): add network resilience with axios-retry

- Configured exponential backoff for transient 5xx errors
- Replaced local types with @nest-asia/types
- Improved client-side robustness for unstable network conditions"

echo "✅ All Quality Roadmap Phase 2 changes committed."
