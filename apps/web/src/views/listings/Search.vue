<template>
  <div class="search-page">
    <!-- Search Header -->
    <header class="search-header">
      <div class="container header-content">
        <!-- Logo -->
        <router-link to="/" class="logo">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" class="logo-icon">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <span class="logo-text">NestAsia</span>
        </router-link>

        <!-- Compact Search Bar -->
        <div class="compact-search">
          <div class="search-divider"></div>
          <input v-model="filters.city" placeholder="Anywhere" class="search-input location" @keyup.enter="refreshSearch" />
          <div class="search-divider"></div>
          <input type="date" v-model="filters.checkIn" class="search-input date" @change="refreshSearch" />
          <div class="search-divider"></div>
          <input type="date" v-model="filters.checkOut" class="search-input date" @change="refreshSearch" />
          <div class="search-divider"></div>
          <div class="search-button-wrap">
            <button class="search-btn" @click="refreshSearch">
              <Search class="search-icon" :size="16" />
            </button>
          </div>
        </div>

        <!-- User Menu (Placeholder) -->
        <div class="user-menu">
          <div class="menu-btn">
            <Menu :size="16" />
            <div class="avatar-placeholder">
              <User :size="16" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Filters Bar -->
    <div class="filters-bar">
      <div class="container filters-content">
        <button class="filter-chip" :class="{ active: filters.priceRange }" @click="togglePriceModal">
          Price
          <ChevronDown :size="14" />
        </button>
        <button class="filter-chip" :class="{ active: filters.guests > 1 }">
          Guests
          <ChevronDown :size="14" />
        </button>
        <div class="vertical-divider"></div>
        <button class="filter-chip" v-for="type in propertyTypes" :key="type"
          :class="{ active: filters.propertyType === type }" @click="toggleType(type)">
          {{ formatType(type) }}
        </button>
      </div>
    </div>

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
            <img :src="listing.coverImage" :alt="listing.title" class="listing-image" loading="lazy" />
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
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../../api/client'
import { Search, Menu, User, ChevronDown, Heart, Star } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const listings = ref<any[]>([])

// Filters
const filters = reactive({
  city: (route.query.city as string) || '',
  checkIn: (route.query.checkIn as string) || '',
  checkOut: (route.query.checkOut as string) || '',
  guests: Number(route.query.guests) || 1,
  propertyType: (route.query.propertyType as string) || '',
  priceRange: false, // UI state for now
})

const propertyTypes = ['APARTMENT', 'HOUSE', 'VILLA', 'LOFT']

// Fetch listings
async function fetchListings() {
  loading.value = true
  try {
    const params: any = {
      limit: 20,
      offset: 0,
      guests: filters.guests
    }
    
    if (filters.city) params.city = filters.city
    if (filters.checkIn) params.checkIn = filters.checkIn
    if (filters.checkOut) params.checkOut = filters.checkOut
    if (filters.propertyType) params.propertyType = filters.propertyType

    const { data } = await api.searchListings(params)
    listings.value = data.listings || []
  } catch (err) {
    console.error('Search failed', err)
  } finally {
    loading.value = false
  }
}

// Watch URL changes to refetch
watch(() => route.query, (newQuery) => {
  filters.city = (newQuery.city as string) || ''
  filters.checkIn = (newQuery.checkIn as string) || ''
  filters.checkOut = (newQuery.checkOut as string) || ''
  filters.guests = Number(newQuery.guests) || 1
  filters.propertyType = (newQuery.propertyType as string) || ''
  fetchListings()
})

onMounted(() => {
  fetchListings()
})

// Actions
function refreshSearch() {
  const query: any = { ...route.query }
  if (filters.city) query.city = filters.city
  else delete query.city
  
  if (filters.checkIn) query.checkIn = filters.checkIn
  else delete query.checkIn
  
  if (filters.checkOut) query.checkOut = filters.checkOut
  else delete query.checkOut

  router.push({ query })
}

function toggleType(type: string) {
  if (filters.propertyType === type) {
    filters.propertyType = ''
  } else {
    filters.propertyType = type
  }
  const query: any = { ...route.query }
  if (filters.propertyType) query.propertyType = filters.propertyType
  else delete query.propertyType
  
  router.push({ query })
}

function clearFilters() {
  filters.city = ''
  filters.checkIn = ''
  filters.checkOut = ''
  filters.guests = 1
  filters.propertyType = ''
  router.push({ query: {} })
}

function goToListing(id: string) {
  // Pass dates to detail page if selected
  const query: any = {}
  if (filters.checkIn) query.checkIn = filters.checkIn
  if (filters.checkOut) query.checkOut = filters.checkOut
  if (filters.guests > 1) query.guests = filters.guests
  
  router.push({ name: 'listing-detail', params: { id }, query })
}

// Helpers
function formatType(type: string) {
  return type.charAt(0) + type.slice(1).toLowerCase() + 's'
}

function togglePriceModal() {
  // TODO: Implement price filter modal
  alert('Price filter coming soon!')
}

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

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--color-primary-600);
}

.logo-text {
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

/* Compact Search Bar */
.compact-search {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  padding: 4px 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s;
}

.compact-search:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.12), 0 6px 16px rgba(0,0,0,0.08);
}

.search-input {
  border: none;
  background: transparent;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray-900);
  outline: none;
  width: 120px;
}

.search-input.location {
  width: 140px;
  font-weight: 600;
}

.search-input::placeholder {
  color: var(--color-gray-900);
}

.search-divider {
  width: 1px;
  height: 24px;
  background-color: var(--color-gray-300);
}

.search-btn {
  background: var(--color-primary-600);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 8px;
}

/* User Menu */
.menu-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 5px 5px 5px 12px;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.menu-btn:hover {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar-placeholder {
  background: var(--color-gray-500);
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Filters Bar */
.filters-bar {
  position: sticky;
  top: 80px;
  z-index: 99;
  background: white;
  border-bottom: 1px solid var(--color-gray-100);
  padding: 16px 0;
}

.filters-content {
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
}

.filter-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: white;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-gray-700);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.filter-chip:hover {
  border-color: var(--color-gray-900);
}

.filter-chip.active {
  background: var(--color-gray-100);
  border-color: var(--color-gray-900);
  border-width: 2px;
  padding: 7px 15px; /* adjust for border width */
}

.vertical-divider {
  width: 1px;
  height: 24px;
  background: var(--color-gray-300);
  margin: 0 4px;
}

/* Main Content */
.main-content {
  padding-top: 24px;
  padding-bottom: 48px;
}

.loading-state, .empty-state {
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

@keyframes spin { to { transform: rotate(360deg); } }

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
  group: 1;
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
  color: rgba(255,255,255,0.7);
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
