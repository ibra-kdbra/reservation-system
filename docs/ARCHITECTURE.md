# System Architecture

## Overview

The reservation system is a full-stack monorepo managed with **Turborepo** and **pnpm workspaces**.

```
reservation-system/
├── apps/
│   ├── api/          # NestJS REST API (Node.js 20, TypeScript)
│   └── web/          # Vue 3 SPA (Vite, TypeScript)
├── infrastructure/   # Docker, nginx, monitoring configs
├── docs/             # Project documentation
├── tests/            # E2E + integration tests (Playwright)
└── changelogs/       # Per-file change tracking
```

## Tech Stack

### Backend (`apps/api`)

| Layer | Technology |
|---|---|
| Framework | NestJS 10 |
| Language | TypeScript 5 |
| ORM | Prisma 5 |
| Database | PostgreSQL 16 |
| Auth | JWT (httpOnly cookies) + bcrypt |
| Validation | `class-validator` + `class-transformer` |
| API Docs | Swagger / OpenAPI 3.0 (`@nestjs/swagger`) |
| Config | `@nestjs/config` + `.env` |

### Frontend (`apps/web`)

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) |
| Build | Vite 5 |
| Language | TypeScript 5 |
| State | Pinia |
| Routing | Vue Router 4 |
| HTTP | Axios (via `api/client.ts`) |
| Icons | Lucide Vue Next |
| CSS | Vanilla CSS with custom properties |

## Module Map

### API Modules

```
src/
├── auth/      → login, register, logout, me (JWT + cookie)
├── user/      → profile, stats, update
├── listing/   → search, CRUD, my-listings, publish
├── booking/   → create, cancel, confirm, host/guest views
├── admin/     → stats, user/listing management
└── prisma/    → database service wrapper
```

### Frontend Composables

| Composable | Responsibility |
|---|---|
| `useListingSearch` | URL-synced search state + API calls |
| `useBooking` | Booking form state, pricing, submission |
| `useWishlist` | Favorites fetch/toggle |
| `useToast` | Notification queue |
| `useTimeTheme` | Time-of-day visual theme |
| `useScrollReveal` | Intersection-observer animations |

## Data Flow

```
User Action → Vue Component → Composable → api/client.ts → Axios
    → NestJS Controller → Service → Prisma → PostgreSQL DB
    ← JSON Response ← Pinia Store / Reactive Ref ← View Update
```

## Authentication Flow

1. User submits credentials → `POST /api/v1/auth/login`
2. NestJS validates, creates JWT, sets **httpOnly cookie** (`access_token`)
3. All subsequent requests send cookie automatically (`withCredentials: true`)
4. Logout clears the cookie server-side → `POST /api/v1/auth/logout`
5. Route guard (`router/index.ts`) checks `useAuthStore` on navigation

## Key Design Decisions

- **httpOnly cookies** over `localStorage` — eliminates XSS token theft risk
- **`@/` import alias** — all frontend imports use `@/` for consistency
- **Composables as API layer** — views delegate all data-fetching to hooks (not inline)
- **URL-synced filters** — search state lives in URL query params for shareability
- **CSS variables** — design tokens in `index.css`, no utility-class framework
