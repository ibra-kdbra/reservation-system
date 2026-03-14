<template>
  <div class="detail-page">
    <!-- Loading -->
    <div v-if="loading" class="container loading-state">
      <div class="skeleton" style="height:400px;border-radius:1rem;margin-bottom:2rem"></div>
      <div class="skeleton" style="height:30px;width:60%;margin-bottom:1rem"></div>
      <div class="skeleton" style="height:20px;width:40%"></div>
    </div>

    <!-- Content -->
    <div v-else-if="listing" class="container">

      <!-- Header -->
      <ListingHeader :title="listing.title" :rating="listing.averageRating" :review-count="listing.reviewCount"
        :location="`${listing.city}, ${listing.country}`" :is-saved="isSaved" @share="shareOpen = true"
        @toggle-save="toggleSave" />

      <!-- Gallery -->
      <ListingGallery :images="listing.images" :cover-image="listing.images?.[0] || ''" :title="listing.title"
        @open="openGallery" />

      <!-- Main Layout -->
      <div class="detail-layout">

        <!-- Left Column -->
        <main class="detail-main">

          <!-- Quick Stats -->
          <div class="detail-stats">
            <span>{{ listing.maxGuests }} guest{{ listing.maxGuests > 1 ? 's' : '' }}</span>
            <span>·</span>
            <span>{{ listing.bedrooms }} bedroom{{ listing.bedrooms > 1 ? 's' : '' }}</span>
            <span>·</span>
            <span>{{ listing.beds }} bed{{ listing.beds > 1 ? 's' : '' }}</span>
            <span>·</span>
            <span>{{ listing.bathrooms }} bath{{ listing.bathrooms > 1 ? 's' : '' }}</span>
          </div>

          <!-- Host Info -->
          <ListingHost :host="listing.host" :review-count="listing.reviewCount || 0" :is-superhost="true" />

          <!-- Description -->
          <ListingDescription :description="listing.description" />

          <!-- Amenities -->
          <ListingAmenities :amenities="listing.amenities" />

          <!-- Reviews -->
          <ListingReviews v-if="listing.reviewCount && listing.reviewCount > 0" :reviews="reviews" :rating="listing.averageRating || 0"
            :review-count="listing.reviewCount" />

          <!-- Map -->
          <ListingMap :location="`${listing.city}, ${listing.country}`" />
        </main>

        <!-- Right Column (Sticky Sidebar) -->
        <aside class="detail-sidebar">
          <BookingWidget :price="Number(listing.pricePerNight)" :cleaning-fee="Number(listing.cleaningFee)"
            :service-fee="Number(listing.serviceFee)" :rating="listing.averageRating"
            :review-count="listing.reviewCount" :max-guests="listing.maxGuests" :check-in="bookingCheckIn"
            :check-out="bookingCheckOut" :guests="bookingGuests" @update:check-in="bookingCheckIn = $event"
            @update:check-out="bookingCheckOut = $event" @update:guests="bookingGuests = $event" @book="handleBook" />
        </aside>
      </div>
    </div>

    <!-- Modals -->
    <PhotoGallery :images="listing?.images || []" :is-open="galleryOpen"
      :start-index="galleryIndex" @close="galleryOpen = false" />
    <ShareModal v-if="listing" :is-open="shareOpen" :listing="listing" @close="shareOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/api/client'
import { useToast } from '@/composables/useToast'

// Components
import ListingHeader from '@/components/listing/ListingHeader.vue'
import ListingGallery from '@/components/listing/ListingGallery.vue'
import ListingHost from '@/components/listing/ListingHost.vue'
import ListingDescription from '@/components/listing/ListingDescription.vue'
import ListingAmenities from '@/components/listing/ListingAmenities.vue'
import ListingReviews from '@/components/listing/ListingReviews.vue'
import ListingMap from '@/components/listing/ListingMap.vue'
import BookingWidget from '@/components/listing/BookingWidget.vue'
import PhotoGallery from '@/components/ui/PhotoGallery.vue'
import ShareModal from '@/components/ui/ShareModal.vue'
import type { Listing } from '@/types'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const listing = ref<Listing | null>(null)
const reviews = ref<any[]>([])
const loading = ref(true)

// State
const bookingCheckIn = ref('')
const bookingCheckOut = ref('')
const bookingGuests = ref(1)
const isSaved = ref(false)
const savedId = ref<string | null>(null)
const shareOpen = ref(false)
const galleryOpen = ref(false)
const galleryIndex = ref(0)

onMounted(async () => {
  try {
    const { data } = await api.getListingById(route.params.id as string)
    listing.value = data
    reviews.value = data.reviews || []

    if (authStore.isAuthenticated) {
      try {
        const { data: favData } = await api.isFavorite(data.id)
        isSaved.value = favData.data.isFavorite
        savedId.value = favData.data.favoriteId || null
      } catch { /* ignore */ }
    }
  } catch (error) {
    console.error('Failed to fetch listing:', error)
  } finally {
    loading.value = false
  }
})

function openGallery(index: number) {
  galleryIndex.value = index
  galleryOpen.value = true
}

async function toggleSave() {
  if (!authStore.isAuthenticated) {
    toast.warning('Please log in to save listings')
    return
  }
  try {
    if (isSaved.value && savedId.value) {
      await api.removeFavorite(savedId.value)
      isSaved.value = false
      savedId.value = null
      toast.success('Removed from wishlist')
    } else if (listing.value) {
      const { data } = await api.addFavorite(listing.value.id)
      isSaved.value = true
      savedId.value = data.data.favoriteId || data.data.id // Fallback for backward compatibility if needed
      toast.success('Added to wishlist ❤️')
    }
  } catch {
    toast.error('Failed to update wishlist')
  }
}

function handleBook() {
  if (!authStore.isAuthenticated) {
    toast.warning('Please log in to make a booking')
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }
  if (!bookingCheckIn.value || !bookingCheckOut.value) {
    toast.warning('Please select check-in and check-out dates')
    return
  }
  if (!listing.value) return

  router.push({
    name: 'checkout',
    params: { listingId: listing.value.id },
    query: {
      checkIn: bookingCheckIn.value,
      checkOut: bookingCheckOut.value,
      guests: String(bookingGuests.value),
    },
  })
}
</script>

<style scoped>
.detail-page {
  padding-bottom: var(--spacing-4xl);
  padding-top: var(--spacing-lg);
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: var(--spacing-4xl);
  /* Increased gap for better breathing room */
  margin-top: var(--spacing-2xl);
  position: relative;
}

.detail-main {
  min-width: 0;
  /* Prevents overflow in grid items */
}

/* Stats */
.detail-stats {
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-gray-200);
  font-size: var(--font-size-base);
  color: var(--color-gray-900);
  margin-bottom: var(--spacing-lg);
  display: flex;
  gap: 6px;
}

/* Common Section Styles */
.section {
  padding: var(--spacing-2xl) 0;
  border-top: 1px solid var(--color-gray-200);
}

.section-title {
  font-size: var(--font-size-2xl);
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  color: var(--color-gray-900);
}

/* Description */
.description-text {
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-md);

  /* Clamp text if too long (optional simple logic) */
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.show-more-btn {
  font-weight: 600;
  text-decoration: underline;
  font-size: var(--font-size-base);
  color: var(--color-gray-900);
  display: flex;
  align-items: center;
  gap: 4px;
}

.show-more-btn::after {
  content: '>';
  font-size: 12px;
  transform: rotate(90deg);
  display: inline-block;
}

/* Amenities */
.amenities-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.amenity-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  color: var(--color-gray-700);
  font-size: var(--font-size-base);
}

.amenity-icon {
  width: 24px;
  text-align: center;
}

.show-all-amenities {
  padding: 12px 24px;
  border: 1px solid var(--color-gray-900);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--font-size-base);
  background: white;
  transition: background-color var(--transition-fast);
}

.show-all-amenities:hover {
  background: var(--color-gray-50);
}

/* Sidebar */
.detail-sidebar {
  position: relative;
}

@media (max-width: 1024px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .detail-sidebar {
    margin-top: var(--spacing-xl);
  }
}
</style>
