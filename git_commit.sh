#!/bin/bash

# Auto-generated commit script for individual file changes

# 1. API Core & DTOs
git add apps/api/src/app.module.ts
git commit -m "fix(api): update static asset exclusion regex to resolve 500 errors"

git add apps/api/src/listing/dto/listing.dto.ts
git commit -m "feat(api): add @Transform to SearchListingsDto amenities to handle single values"

# 2. Favorite Module (New)
git add apps/api/src/favorite/
git commit -m "feat(api): implement Favorite module (Module, Service, Controller)"

# 3. Web API Client & Composables
git add apps/web/src/api/client.ts
git commit -m "refactor(web): standardize API client response handling and retry logic"

git add apps/web/src/composables/useBooking.ts
git commit -m "refactor(web): update useBooking for standardized API response format"

git add apps/web/src/composables/useBooking.spec.ts
git commit -m "test(web): update useBooking specs for standardized API"

git add apps/web/src/composables/useListingSearch.ts
git commit -m "feat(web): add strict null checks to listing search filters"

git add apps/web/src/composables/useWishlist.ts
git commit -m "refactor(web): update useWishlist for standardized API response format"

git add apps/web/src/composables/useWishlist.spec.ts
git commit -m "test(web): update useWishlist specs for standardized API"

git add apps/web/src/composables/useTimeTheme.ts
git commit -m "feat(web): update time-based icons in useTimeTheme"

# 4. Design System
git add apps/web/src/styles/design-system.css
git commit -m "feat(web): add vibrant icon design tokens and animation classes"

# 5. UI Components (Icon Overhaul)
git add apps/web/src/components/layout/Navbar.vue
git commit -m "feat(web): replace emojis with vibrant icons in Navbar"

git add apps/web/src/components/listing/ListingAmenities.vue
git commit -m "feat(web): replace emojis with vibrant icons in ListingAmenities"

git add apps/web/src/components/search/SearchFilters.vue
git commit -m "feat(web): replace emojis with vibrant icons in SearchFilters"

git add apps/web/src/components/ui/ToastContainer.vue
git commit -m "feat(web): replace static status symbols with Lucide icons in ToastContainer"

# 6. Views (Icon Overhaul)
git add apps/web/src/views/Home.vue
git commit -m "feat(web): replace emojis with vibrant icons on Home page"

git add apps/web/src/views/admin/tabs/ListingsTab.vue
git commit -m "feat(web): replace emojis with icons in Admin ListingsTab"

git add apps/web/src/views/admin/tabs/OverviewTab.vue
git commit -m "feat(web): replace emojis with icons in Admin OverviewTab"

git add apps/web/src/views/admin/tabs/UsersTab.vue
git commit -m "feat(web): replace emojis with icons in Admin UsersTab"

git add apps/web/src/views/auth/Login.vue
git commit -m "feat(web): replace emojis with icons in Login page features"

git add apps/web/src/views/auth/Register.vue
git commit -m "feat(web): replace emojis with icons in Register page features"

git add apps/web/src/views/bookings/BookingConfirmation.vue
git commit -m "feat(web): replace emojis with icons in BookingConfirmation success state"

git add apps/web/src/views/bookings/Checkout.vue
git commit -m "feat(web): replace emojis with icons in Checkout booking summary"

git add apps/web/src/views/bookings/MyBookings.vue
git commit -m "feat(web): replace emojis with icons in MyBookings empty state"

git add apps/web/src/views/host/HostDashboard.vue
git commit -m "feat(web): replace emojis with icons in HostDashboard stats"

git add apps/web/src/views/listings/Detail.vue
git commit -m "feat(web): replace emojis with icons in Listing Detail page"

git add apps/web/src/views/profile/Profile.vue
git commit -m "feat(web): replace emojis with icons in User Profile page"

git add apps/web/src/views/static/Contact.vue
git commit -m "feat(web): replace emojis with icons in Contact page methods"

git add apps/web/src/views/static/Safety.vue
git commit -m "feat(web): replace emojis with icons in Safety page features"

# 7. Testing Infrastructure & Stabilization
git add apps/api/test/integration-test-factory.ts
git commit -m "test(api): create IntegrationTestFactory for isolated DB/Redis testing"

git add apps/api/test/auth.integration.spec.ts
git commit -m "test(api): implement comprehensive Auth integration tests"

git add apps/api/test/booking.integration.spec.ts
git commit -m "test(api): implement transactional Booking integration tests"

git add apps/api/test/jest-integration.json
git commit -m "test(api): add configuration for integration test suite"

git add playwright.config.ts
git commit -m "test(e2e): update playwright config for CI/CD synchronization"

git add apps/api/src/auth/strategies/jwt.strategy.ts
git commit -m "fix(api): support Bearer token extraction from headers in JwtStrategy"

git add apps/api/src/auth/auth.controller.ts
git commit -m "fix(api): return tokens in response body for test environment"

git add apps/api/src/app.module.ts
git commit -m "fix(api): conditional CacheModule and .env handling for test environment"

git add apps/web/src/App.vue
git commit -m "refactor(web): add global styles and session initialization to root app"

git add apps/web/src/stores/auth.ts
git commit -m "fix(web): add isInitialized state to auth store for session persistence"

git add apps/web/src/router/index.ts
git commit -m "fix(web): wait for session initialization in router guards"

git add apps/web/src/views/auth/Login.vue apps/web/src/views/auth/Register.vue
git commit -m "fix(web): update navigation paths to /auth/login and /auth/register"

git add tests/e2e/
git commit -m "test(e2e): standardize locators and role-based selectors for 100% pass rate"

git add apps/api/prisma/seed.ts
git commit -m "fix(api): update seed credentials and standardize user roles"

# 8. Dependencies & Core Root
git add apps/api/package.json
git commit -m "chore(api): add testcontainers and integration testing dependencies"

git add pnpm-lock.yaml
git commit -m "chore: update lockfile with new testing dependencies"

# 9. Documentation & Tooling
git add README.md
git commit -m "docs: modernize README with certified platform status"

git add CHANGELOG.md
git commit -m "docs: add v1.2.0 Quality Certification & Staging Overhaul"

git add docs/*.md
git commit -m "docs: certify quality, testing, and architecture specifications"

git add git_commit.sh
git commit -m "chore: update auto-commit script for v1.2.0 release"

echo "✅ All changes committed individually."
