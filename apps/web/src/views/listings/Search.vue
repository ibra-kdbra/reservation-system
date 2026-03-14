<template>
  <div class="search-page">
    <!-- Redesigned Search Header -->
    <header class="search-header">
      <div class="container header-content">
        <!-- Categories Carousel -->
        <div class="categories-container">
          <div class="categories-wrapper">
            <button 
              v-for="category in categories" 
              :key="category.value"
              class="category-item"
              :class="{ active: filters.propertyType === category.value }"
              @click="toggleType(category.value)"
            >
              <span class="category-icon">{{ category.icon }}</span>
              <span class="category-label">{{ category.label }}</span>
            </button>
          </div>
        </div>

        <!-- Filter Action -->
        <div class="header-actions">
           <button class="filters-trigger-btn" @click="showFiltersModal = true">
             <SlidersHorizontal :size="16" />
             <span>Filters</span>
             <span v-if="activeFiltersCount > 0" class="filter-count">{{ activeFiltersCount }}</span>
           </button>
        </div>
      </div>
    </header>

    <!-- Advanced Filters Modal -->
    <SearchFilters 
      v-if="showFiltersModal" 
      :initial-filters="filters" 
      @close="showFiltersModal = false"
      @apply="handleApplyFilters" 
    />



    <!-- Main Content -->
    <main class="container main-content">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Finding homes...</p>
      </div>

      <div v-else-if="listings.length === 0" class="empty-state">
        <div class="empty-icon">🏠</div>
        <h3>No stays found</h3>
        <p>Try adjusting your search or filters to find what you're looking for.</p>
        <button class="clear-filters-btn" @click="clearFilters">Clear all filters</button>
      </div>

      <div v-else class="listings-grid">
        <div v-for="listing in listings" :key="listing.id" class="listing-card" @click="goToListing(listing.id)">
          <div class="listing-image-wrap">
            <img :src="listing.images?.[0] || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800'" :alt="listing.title" class="listing-image" loading="lazy" />
            <button class="favorite-btn">
              <Heart :size="20" class="heart-icon" />
            </button>
            <div v-if="listing.host?.avatar" class="host-badge">
              <img :src="listing.host.avatar" :alt="listing.host.firstName" />
            </div>
          </div>

          <div class="listing-details">
            <div class="listing-header">
              <h3 class="listing-title">{{ listing.city }}, {{ listing.country }}</h3>
              <div class="listing-rating" v-if="listing.averageRating">
                <Star :size="12" fill="currentColor" />
                <span>{{ listing.averageRating }}</span>
              </div>
            </div>

            <p class="listing-desc">{{ listing.title }}</p>
            <p class="listing-meta">{{ formatDateRange() }}</p>

            <div class="listing-price">
              <span class="price-amount">${{ listing.pricePerNight }}</span>
              <span class="price-period"> night</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useListingSearch } from '@/composables/useListingSearch'
import type { SearchFiltersData } from '@/composables/useListingSearch'
import { SlidersHorizontal, Heart, Star } from 'lucide-vue-next'
import SearchFilters from '@/components/search/SearchFilters.vue'

const router = useRouter()
const route = useRoute()

const showFiltersModal = ref(false)

const {
  loading,
  listings,
  filters,
  toggleType,
  clearFilters
} = useListingSearch()

const categories = [
  { value: 'APARTMENT', label: 'Apartments', icon: '🏢' },
  { value: 'HOUSE', label: 'Houses', icon: '🏠' },
  { value: 'VILLA', label: 'Villas', icon: '🏰' },
  { value: 'STUDIO', label: 'Studios', icon: '🏙️' },
  { value: 'LOFT', label: 'Lofts', icon: '🎨' },
  { value: 'ROOM', label: 'Rooms', icon: '🛏️' },
  { value: 'COTTAGE', label: 'Cottages', icon: '🏡' },
]

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.minPrice || filters.maxPrice) count++
  if (filters.guests > 1) count++
  if (filters.amenities?.length > 0) count++
  return count
})

function goToListing(id: string) {
  // Pass dates to detail page if selected
  const query: any = {}
  if (filters.checkIn) query.checkIn = filters.checkIn
  if (filters.checkOut) query.checkOut = filters.checkOut
  if (filters.guests > 1) query.guests = filters.guests

  router.push({ name: 'listing-detail', params: { id }, query })
}

function handleApplyFilters(newFilters: SearchFiltersData) {
    const query: Record<string, any> = { 
        ...route.query, 
        ...newFilters 
    }
    
    // Clean up empty values to keep URL clean
    if (!newFilters.propertyType) delete query.propertyType
    if (!newFilters.minPrice) delete query.minPrice
    if (!newFilters.maxPrice) delete query.maxPrice
    if (!newFilters.guests || newFilters.guests === 1) delete query.guests
    // guests might be handled by SearchFilters or top bar. SearchFilters has it.
    // If top bar date search input also had guests, we need to sync. 
    // For now SearchFilters is the source of truth for guests in this view.
    
    if (!newFilters.amenities || newFilters.amenities.length === 0) delete query.amenities

    router.push({ query })
}

// Helpers
function formatDateRange() {
  if (filters.checkIn && filters.checkOut) {
    const start = new Date(filters.checkIn)
    const end = new Date(filters.checkOut)
    return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
  }
  return 'Flexible dates'
}
</script>

<style scoped>
.search-page {
  min-height: 100vh;
  background: white;
}

/* Header */
.search-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  border-bottom: 1px solid var(--color-gray-200);
  height: 80px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Categories Carousel */
.categories-container {
  flex: 1;
  overflow: hidden;
  margin-right: 24px;
}

.categories-wrapper {
  display: flex;
  align-items: center;
  gap: 32px;
  overflow-x: auto;
  padding: 8px 0;
  scrollbar-width: none; /* Firefox */
}

.categories-wrapper::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 4px 0 12px;
  cursor: pointer;
  color: var(--color-gray-500);
  transition: all 0.2s;
  white-space: nowrap;
  min-width: fit-content;
}

.category-item:hover {
  color: var(--color-gray-900);
  border-bottom-color: var(--color-gray-300);
}

.category-item.active {
  color: var(--color-gray-900);
  border-bottom-color: var(--color-gray-900);
}

.category-icon {
  font-size: 24px;
}

.category-label {
  font-size: 12px;
  font-weight: 500;
}

/* Header Actions */
.filters-trigger-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-lg);
  background: white;
  color: var(--color-gray-700);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.filters-trigger-btn:hover {
  border-color: var(--color-gray-900);
  background: var(--color-gray-50);
}

.filter-count {
  background: var(--color-gray-900);
  color: white;
  font-size: 10px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}



/* Main Content */
.main-content {
  padding-top: 24px;
  padding-bottom: 48px;
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-gray-200);
  border-top-color: var(--color-primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.clear-filters-btn {
  margin-top: 16px;
  padding: 12px 24px;
  background: black;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* Grid */
.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px 24px;
}

.listing-card {
  cursor: pointer;
}

.listing-image-wrap {
  position: relative;
  aspect-ratio: 20/19;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 12px;
  background: var(--color-gray-100);
}

.listing-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.listing-card:hover .listing-image {
  transform: scale(1.05);
}

.favorite-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: transform 0.2s;
}

.favorite-btn:hover {
  transform: scale(1.1);
  color: white;
}

.host-badge {
  position: absolute;
  bottom: 12px;
  left: 12px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid white;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.host-badge img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.listing-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.listing-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.listing-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-gray-900);
  margin: 0;
}

.listing-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--color-gray-900);
}

.listing-desc {
  font-size: 15px;
  color: var(--color-gray-500);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.listing-meta {
  font-size: 15px;
  color: var(--color-gray-500);
  margin: 0;
}

.listing-price {
  margin-top: 6px;
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.price-amount {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-gray-900);
}

.price-period {
  font-size: 15px;
  color: var(--color-gray-900);
}
</style>
