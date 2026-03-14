#!/bin/bash

# Repository: /home/meitantei/WorkSpace_SWE/reservation-system

echo "🚀 Starting ultra-granular commits (one per file)..."

# --- BACKEND DTOs (Docs/Swagger) ---
git add apps/api/src/auth/dto/auth.dto.ts
git commit -m "docs(api): add swagger decorators to auth DTOs"

git add apps/api/src/booking/dto/booking.dto.ts
git commit -m "docs(api): add swagger decorators to booking DTOs"

git add apps/api/src/listing/dto/listing.dto.ts
git commit -m "docs(api): add swagger decorators to listing DTOs"

git add apps/api/src/user/dto/user.dto.ts
git commit -m "docs(api): add swagger decorators to user DTOs"

# --- WEB API & STATE (Fixes/Type Safety) ---
git add apps/web/src/api/client.ts
git commit -m "fix(web): resolve type safety issues in axios client interceptors"

git add apps/web/src/stores/auth.ts
git commit -m "fix(web): enhance type safety for user authentication state"

git add apps/web/src/composables/useBooking.ts
git commit -m "fix(web): resolve type mismatch in booking implementation"

git add apps/web/src/composables/useToast.spec.ts
git commit -m "fix(web): update toast unit tests for property access compatibility"

# --- WEB COMPONENTS (A11y/Refactor) ---
git add apps/web/src/composables/useFocusTrap.ts
git commit -m "feat(web): add useFocusTrap composable for accessible modal management"

git add apps/web/src/components/listing/ListingAmenities.vue
git commit -m "refactor(web): use useFocusTrap in ListingAmenities modal"

git add apps/web/src/components/listing/ListingReviews.vue
git commit -m "refactor(web): use useFocusTrap in ListingReviews modal"

git add apps/web/src/components/search/SearchFilters.vue
git commit -m "refactor(web): use useFocusTrap in SearchFilters modal"

git add apps/web/src/components/ui/PhotoGallery.vue
git commit -m "refactor(web): use useFocusTrap in PhotoGallery component"

git add apps/web/src/components/ui/ShareModal.vue
git commit -m "refactor(web): use useFocusTrap in ShareModal component"

git add apps/web/src/components/layout/Footer.vue
git commit -m "a11y(web): add aria-labels to social links and footer navigation"

git add apps/web/src/components/layout/Navbar.vue
git commit -m "a11y(web): enhance navbar with aria-labels and keyboard support"

git add apps/web/src/components/listing/BookingWidget.vue
git commit -m "a11y(web): add aria-labels to booking widget inputs and buttons"

git add apps/web/src/components/listing/ListingDescription.vue
git commit -m "a11y(web): improve semantic structure of listing description"

git add apps/web/src/components/listing/ListingGallery.vue
git commit -m "a11y(web): convert decorative divs to buttons and add aria-labels to gallery"

git add apps/web/src/components/listing/ListingHeader.vue
git commit -m "a11y(web): add aria-labels to sharing and wishlist buttons in header"

git add apps/web/src/components/listing/ListingHost.vue
git commit -m "fix(web): handle optional host data and add a11y labels"

git add apps/web/src/components/listing/ListingMap.vue
git commit -m "a11y(web): add aria-label to map container for screen readers"

# --- WEB VIEWS (A11y/Fixes) ---
git add apps/web/src/views/Home.vue
git commit -m "fix(web): resolve property access type errors on home page"

git add apps/web/src/views/listings/Detail.vue
git commit -m "fix(web): resolve property access type errors and enhance detail page a11y"

git add apps/web/src/views/listings/Search.vue
git commit -m "a11y(web): enhance search page results with aria-labels"

git add apps/web/src/views/bookings/Checkout.vue
git commit -m "a11y(web): add aria-labels to checkout form and summary"

git add apps/web/src/views/wishlist/Wishlist.vue
git commit -m "fix(web): resolve type safety issues in wishlist view"

# --- DOCUMENTATION ---
git add docs/PROJECT_STATUS.md
git commit -m "docs: update project status for quality and accessibility phase"

git add docs/QUALITY.md
git commit -m "docs: update ISO 25010 roadmap and quality assessment"

# --- THE SCRIPT ITSELF ---
git add git_commit.sh
git commit -m "chore: add ultra-granular git commit script"

echo "✅ All surgical commits completed! You can now run 'git push'."
