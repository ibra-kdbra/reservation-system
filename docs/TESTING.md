# Testing Strategy

## Overview

The project uses a four-layer testing approach:

| Layer | Tool | Location | Target Coverage |
|---|---|---|---|
| Unit Tests | Vitest | `apps/web/src/**/*.spec.ts` | ≥ 70% composables |
| Component Tests | Vitest + `@vue/test-utils` | `apps/web/src/**/*.spec.ts` | Critical components |
| Integration Tests | NestJS + Testcontainers | `apps/api/test/**/*.integration.spec.ts` | Domain logic & DB |
| E2E Tests | Playwright | `tests/e2e/` | Full user journeys |

---

## Running Tests

### Unit & Component Tests (Web)

```bash
cd apps/web
npm run test          # Run once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Integration Tests (Backend)

We use **Testcontainers** to spin up isolated, transient PostgreSQL and Redis instances. Docker must be running.

```bash
cd apps/api
npm run test:integration
```

### E2E Tests

```bash
# From project root — builds both apps first
npm run test:e2e

# Run with browser visible
npx playwright test --headed

# View results in report
npx playwright show-report
```

---

## Unit Test Coverage

### Composables

| Composable | Test File | Status |
|---|---|---|
| `useListingSearch` | `useListingSearch.spec.ts` | ✅ Certified |
| `useBooking` | `useBooking.spec.ts` | ✅ Certified |
| `useWishlist` | `useWishlist.spec.ts` | ✅ Certified |
| `useToast` | `useToast.spec.ts` | ✅ Certified |

---

## Integration Test Coverage (Backend)

| Spec | Target | Status |
|---|---|---|
| `auth.integration.spec.ts` | JWT strategies, roles, guard protection | ✅ Certified |
| `booking.integration.spec.ts` | Transactional integrity, availability, guest capacity | ✅ Certified |
| `listing.integration.spec.ts` | Complex search filters, pricing logic, data extraction | ✅ Certified |

---

## E2E Test Coverage (Certified 100% Pass)

### Implemented & Certified Flows

| Spec | Journey | Device support |
|---|---|---|
| `basic-flow.spec.ts` | Homepage -> Search -> Detail | Desktop & Tablet |
| `auth-flow.spec.ts` | Register -> Login -> Logout | Desktop & Mobile |
| `host-management.spec.ts` | Dashboard -> My Listings -> Bookings | Desktop |
| `admin-operations.spec.ts` | User Management -> Listing Approvals | Desktop |
| `network-failures.spec.ts` | Offline resilience -> Slow network -> 500 errors | Desktop |

---

## Infrastructure Highlights

- **Database Isolation**: Every integration test run uses a fresh PostgreSQL container, ensuring zero side-effects between tests.
- **Strict Selector Strategy**: Locators use `role-based` and `data-testid` strategies to avoid brittle CSS-based failures.
- **Session Persistence**: Frontend tests verify the `isInitialized` state logic to ensure users remain logged in across page reloads.
- **Network Resilience**: Playwright mocks simulate extreme network conditions (offline/slow) to certify UI stability.
