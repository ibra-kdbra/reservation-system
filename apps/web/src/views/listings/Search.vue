<template>
  <div class="search-page">
    <div class="container">
      <div class="search-layout">
        <!-- Filters Sidebar -->
        <aside class="filters-panel" data-reveal data-reveal-animation="slide-left">
          <div class="filters-header">
            <h3>Filters</h3>
            <button class="btn btn-ghost btn-sm" @click="clearFilters">Clear all</button>
          </div>

          <!-- Property Type -->
          <div class="filter-section">
            <h4>Property Type</h4>
            <div class="filter-chips">
              <button v-for="t in propertyTypes" :key="t.value" class="chip"
                :class="{ active: filters.propertyType === t.value }" @click="toggleType(t.value)">
                {{ t.icon }} {{ t.label }}
              </button>
            </div>
          </div>

          <!-- Price Range -->
          <div class="filter-section">
            <h4>Price Range</h4>
            <div class="price-range">
              <div class="price-inputs">
                <div class="price-input-wrap">
                  <span class="currency">$</span>
                  <input type="number" v-model.number="filters.minPrice" placeholder="Min"
                    class="form-input price-input" />
                </div>
                <span class="price-dash">–</span>
                <div class="price-input-wrap">
                  <span class="currency">{{ currencyStore.selected.symbol }}</span>
                  <input type="number" v-model.number="filters.maxPrice" placeholder="Max"
                    class="form-input price-input" />
                </div>
              </div>
            </div>
          </div>

          <!-- Guests -->
          <div class="filter-section">
            <h4>Guests</h4>
            <select v-model.number="filters.maxGuests" class="form-input">
              <option value="">Any</option>
              <option v-for="n in 10" :key="n" :value="n">{{ n }}+</option>
            </select>
          </div>

          <button class="btn btn-primary btn-full" @click="applyFilters">Apply Filters</button>
        </aside>

        <!-- Results -->
        <main class="results-panel" data-reveal>
          <div class="results-header">
            <p class="results-count">
              <strong>{{ listings.length }}</strong> stays found
              <span v-if="$route.query.city"> in <strong>{{ $route.query.city }}</strong></span>
            </p>
            <div class="results-controls">
              <select v-model="sortBy" class="form-input sort-select" @change="fetchListings">
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Best Rated</option>
              </select>
              <div class="view-toggle">
                <button :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'">⊞</button>
                <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'">☰</button>
              </div>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="results-grid">
            <div v-for="i in 6" :key="i" class="listing-card-skeleton">
              <div class="skeleton skeleton-image"></div>
              <div class="skeleton-body">
                <div class="skeleton" style="height:18px;width:70%;margin-bottom:8px"></div>
                <div class="skeleton" style="height:14px;width:40%"></div>
              </div>
            </div>
          </div>

          <!-- Results Grid -->
          <div v-else-if="listings.length" class="results-grid" :class="viewMode">
            <div v-for="listing in listings" :key="listing.id" class="listing-card"
              @click="$router.push({ name: 'listing-detail', params: { id: listing.id } })">
              <div class="card-image-wrap">
                <img :src="listing.coverImage" :alt="listing.title" class="card-image" loading="lazy" />
                <span class="type-badge badge badge-primary">{{ formatType(listing.propertyType) }}</span>
              </div>
              <div class="card-body">
                <div class="card-location text-xs text-gray-500">📍 {{ listing.city }}, {{ listing.country }}</div>
                <h3 class="card-title">{{ listing.title }}</h3>
                <div class="card-meta text-xs text-gray-400">
                  {{ listing.bedrooms }} bed · {{ listing.bathrooms }} bath · {{ listing.maxGuests }} guests
                </div>
                <div class="card-footer">
                  <div class="card-price">
                    <span class="price-value">{{ currencyStore.format(listing.pricePerNight) }}</span>
                    <span class="price-unit">/ night</span>
                  </div>
                  <div v-if="listing.averageRating" class="card-rating">⭐ {{ listing.averageRating }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>No listings found</h3>
            <p>Try adjusting your filters or search for a different destination.</p>
            <button class="btn btn-primary" @click="clearFilters">Clear Filters</button>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../api/client'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { useCurrencyStore } from '../../stores/currency'

useScrollReveal({ staggerDelay: 80 })
const currencyStore = useCurrencyStore()

const route = useRoute()
const listings = ref<any[]>([])
const loading = ref(true)
const sortBy = ref('newest')
const viewMode = ref('grid')

const filters = ref({
  propertyType: '' as string,
  minPrice: null as number | null,
  maxPrice: null as number | null,
  maxGuests: '' as string | number,
})

const propertyTypes = [
  { value: 'APARTMENT', label: 'Apartment', icon: '🏢' },
  { value: 'HOUSE', label: 'House', icon: '🏡' },
  { value: 'VILLA', label: 'Villa', icon: '🏛️' },
  { value: 'CABIN', label: 'Cabin', icon: '🏕️' },
  { value: 'COTTAGE', label: 'Cottage', icon: '🛖' },
  { value: 'LOFT', label: 'Loft', icon: '🏗️' },
  { value: 'STUDIO', label: 'Studio', icon: '🎨' },
]

onMounted(() => fetchListings())
watch(() => route.query, () => fetchListings(), { deep: true })

async function fetchListings() {
  loading.value = true
  try {
    const params: any = { limit: 20 }
    if (route.query.city) params.city = route.query.city
    if (route.query.type) {
      params.propertyType = route.query.type
      filters.value.propertyType = route.query.type as string
    }
    if (filters.value.propertyType) params.propertyType = filters.value.propertyType
    if (filters.value.minPrice) params.minPrice = filters.value.minPrice
    if (filters.value.maxPrice) params.maxPrice = filters.value.maxPrice
    if (filters.value.maxGuests) params.maxGuests = filters.value.maxGuests

    const { data } = await api.searchListings(params)
    listings.value = data.listings || data || []
  } catch (error) {
    console.error('Failed to fetch listings:', error)
    listings.value = []
  } finally {
    loading.value = false
  }
}

function toggleType(type: string) {
  filters.value.propertyType = filters.value.propertyType === type ? '' : type
}

function applyFilters() {
  fetchListings()
}

function clearFilters() {
  filters.value = { propertyType: '', minPrice: null, maxPrice: null, maxGuests: '' }
  fetchListings()
}

function formatType(type: string) {
  return type.charAt(0) + type.slice(1).toLowerCase()
}
</script>

<style scoped>
.search-page {
  padding: var(--spacing-xl) 0;
}

.search-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-xl);
}

/* Filters */
.filters-panel {
  position: sticky;
  top: calc(var(--navbar-height) + var(--spacing-xl));
  height: fit-content;
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-gray-100);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.filters-header h3 {
  font-size: var(--font-size-lg);
}

.filter-section {
  margin-bottom: var(--spacing-xl);
}

.filter-section h4 {
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-sm);
}

.filter-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.price-inputs {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.price-input-wrap {
  position: relative;
  flex: 1;
}

.currency {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
}

.price-input {
  padding-left: 1.75rem;
}

.price-dash {
  color: var(--color-gray-400);
}

/* Results */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.results-count {
  color: var(--color-gray-600);
  font-size: var(--font-size-sm);
}

.results-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sort-select {
  width: auto;
  padding: 0.375rem 0.75rem;
  font-size: var(--font-size-sm);
}

.view-toggle {
  display: flex;
  border: 2px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.view-toggle button {
  padding: 0.375rem 0.625rem;
  background: white;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.view-toggle button.active {
  background: var(--color-primary-50);
  color: var(--color-primary-600);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.results-grid.list {
  grid-template-columns: 1fr;
}

/* Listing Card */
.listing-card {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-gray-100);
  cursor: pointer;
  transition: all var(--transition-base);
}

.listing-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.card-image-wrap {
  position: relative;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.listing-card:hover .card-image {
  transform: scale(1.05);
}

.type-badge {
  position: absolute;
  top: var(--spacing-md);
  left: var(--spacing-md);
}

.card-body {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
}

.card-location {
  margin-bottom: var(--spacing-xs);
}

.card-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  margin-bottom: var(--spacing-md);
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--color-gray-100);
}

.price-value {
  font-weight: 800;
  font-size: var(--font-size-lg);
}

.price-unit {
  font-size: var(--font-size-xs);
  color: var(--color-gray-500);
}

.card-rating {
  font-weight: 600;
  font-size: var(--font-size-sm);
}

/* Skeleton */
.listing-card-skeleton {
  background: white;
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-gray-100);
}

.skeleton-image {
  height: 200px;
  border-radius: 0;
}

.skeleton-body {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
}

/* Empty */
.empty-state {
  text-align: center;
  padding: var(--spacing-4xl) var(--spacing-xl);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
}

.empty-state h3 {
  margin-bottom: var(--spacing-sm);
}

.empty-state p {
  color: var(--color-gray-500);
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .search-layout {
    grid-template-columns: 1fr;
  }

  .filters-panel {
    position: static;
  }
}
</style>
