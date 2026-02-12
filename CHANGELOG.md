# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2026-02-12

### Added

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
