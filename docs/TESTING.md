# Testing Strategy

## Overview

The project uses a three-layer testing approach:

| Layer | Tool | Location | Target Coverage |
|---|---|---|---|
| Unit Tests | Vitest | `apps/web/src/**/*.spec.ts` | ≥ 70% composables |
| Component Tests | Vitest + `@vue/test-utils` | `apps/web/src/**/*.spec.ts` | Critical components |
| E2E Tests | Playwright | `tests/e2e/` | Core user journeys |

---

## Running Tests

### Unit & Component Tests (Web)

```bash
cd apps/web
npm run test          # Run once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### E2E Tests

```bash
# From project root — builds both apps first
npm run test:e2e

# Run a specific spec file
npx playwright test tests/e2e/basic-flow.spec.ts

# Run with browser visible
npx playwright test --headed

# View last HTML report
npx playwright show-report
```

### API Unit Tests (NestJS)

```bash
cd apps/api
npm run test          # Unit tests
npm run test:e2e      # API integration tests
npm run test:cov      # Coverage report
```

---

## Unit Test Coverage

### Composables (Step 1 Priority)

| Composable | Test File | Status |
|---|---|---|
| `useListingSearch` | `useListingSearch.spec.ts` | ✅ Done |
| `useBooking` | `useBooking.spec.ts` | ✅ Done |
| `useWishlist` | `useWishlist.spec.ts` | ✅ Done |
| `useToast` | `useToast.spec.ts` | ✅ Done |

### What Each Test Covers

**`useListingSearch.spec.ts`**
- Initializes filters from route query params
- Calls `api.searchListings` on mount
- Updates filters when URL changes
- `clearFilters()` resets all fields
- Handles amenities as array or single string

**`useBooking.spec.ts`**
- Computes `nights` correctly from check-in/check-out
- Computes `totalPrice` = nights × pricePerNight
- Formats check-in/check-out dates for display
- `submitBooking()` calls `api.createBooking` with correct payload
- `submitBooking()` sets `error` on API failure

**`useWishlist.spec.ts`**
- `fetchWishlist()` calls `api.getFavorites()`
- `isInWishlist(id)` returns true/false correctly
- `toggleWishlist()` calls `addFavorite` or `removeFavorite` based on state
- `removeFavorite()` removes item from local list

**`useToast.spec.ts`**
- `toast.success()` and `toast.error()` add to queue
- Toast auto-removes after timeout
- `remove(id)` removes specific toast

---

## E2E Test Coverage

### Implemented Flows

| Test | File | Status |
|---|---|---|
| Homepage loads with hero | `basic-flow.spec.ts` | ✅ Passing |
| Search for listings | `basic-flow.spec.ts` | ✅ Passing |
| Navigate to listing detail | `basic-flow.spec.ts` | ✅ Passing |

### Planned Flows

| Test | Priority |
|---|---|
| User registration | High |
| User login / logout | High |
| Full booking: search → detail → checkout | High |
| Host dashboard: create listing | Medium |
| Admin: ban user, approve listing | Medium |
| Wishlist: add and remove | Low |

---

## Vitest Configuration

Vitest is configured in `apps/web/vite.config.ts`:

```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
}
```

The `setup.ts` file mocks global dependencies (Vue Router, Pinia).

---

## Coverage Thresholds

```json
{
  "statements": 70,
  "branches": 65,
  "functions": 70,
  "lines": 70
}
```

Run `npm run test:coverage` to see the current report.
