# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2026-03-16

### Added

- **Quality Certification Suite**:
  - Implemented **Backend Integration Tests** using `Testcontainers` (PostgreSQL) and Redis mocks for high-fidelity domain logic verification.
  - Implemented **Frontend E2E Tests** (Playwright) covering 100% of critical user journeys (Auth, Booking, Host/Admin Management).
  - Added `network-failures.spec.ts` to certify UI resilience under offline and slow network conditions.
- **Architectural Stabilization**:
  - Added `isInitialized` state to `AuthStore` to ensure robust session persistence across page reloads.
  - Implemented router guard synchronization to prevent guest-redirection race conditions.
- **Improved Tooling**:
  - Updated `git_commit.sh` for granular, atomic commit tracking of certification work.
  - Modernized `README.md` and documentation with professional "Certified" status.

### Changed

- **Testing Infrastructure**:
  - Standardized all Playwright locators to use `role-based` and `data-testid` strategies.
  - Optimized Prisma migration lifecycle in test environments using `db push --force-reset`.
- **UI/UX Refinements**:
  - Standardized "Log In" terminology and iconography across the platform.
  - Aligned Admin and Host dashboards with actual production data headings.

### Fixed

- **Session Persistence**: Resolved the bug where logged-in users were temporarily redirected to the login page on hard refresh.
- **Static Assets Regex**: Fixed a regression in `AppModule` where certain API suffixes triggered 500 errors in the static file server.

## [1.1.0] - 2026-02-12

### Added

- **Payment & Checkout Flow**:
  - `apps/web/src/views/bookings/Checkout.vue`: Full checkout page with booking summary, mock credit card form, and simulated payment processing.
  - `apps/web/src/views/bookings/BookingConfirmation.vue`: Post-booking success page with animated checkmark and booking details.
  - New routes: `/checkout/:listingId` and `/bookings/confirmation/:bookingId`.

- **Interactive UI Components**:
  - `apps/web/src/components/listing/ListingDescription.vue`: Expand/collapse description with "Show more/less".
  - `apps/web/src/components/listing/ListingAmenities.vue`: Amenities modal for viewing full list.
  - Updated `ListingReviews.vue` with "Show all reviews" modal.

- **Modular Listing Detail Components**:
  - `apps/web/src/components/listing/ListingGallery.vue`: Airbnb-style 1+4 grid gallery.
  - `apps/web/src/components/listing/ListingHeader.vue`: Integrated title, location, and action buttons.
  - `apps/web/src/components/listing/ListingHost.vue`: Host profile section with stats and contact option.
  - `apps/web/src/components/listing/ListingReviews.vue`: Multi-star rating breakdown and review list.
  - `apps/web/src/components/listing/BookingWidget.vue`: Sticky booking sidebar with dynamic price calculation.
  - `apps/web/src/components/listing/ListingMap.vue`: Map placeholder for property location.

### Changed

- **UI/UX Polish**:
  - `apps/web/src/views/listings/Detail.vue`: Completely overhauled the listing detail page to use modular components and premium styling.
- **Data & Seeding**:
  - `apps/api/prisma/seed.ts`: Enhanced seeding to generate realistic reviews for all listings.
  - `apps/api/prisma/seed-data.ts`: Updated image sets with high-quality, authentic travel photos.

### Fixed

- **API Integration**:
  - Resolved issue where reviews were not being fetched correctly on the detail page by using embedded review data from the listing fetching response.
- **Seeding Types**:
  - Fixed syntax and type errors in `seed.ts` related to duplicate declarations and Prisma relation mismatches.
