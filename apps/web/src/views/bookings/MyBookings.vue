<template>
  <div class="bookings-page">
    <div class="container">
      <h1 class="page-title">My Bookings</h1>

      <!-- Tabs -->
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          class="tab"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          {{ tab.label }}
          <span v-if="getCount(tab.value)" class="tab-count">{{ getCount(tab.value) }}</span>
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="booking-list">
        <div v-for="i in 3" :key="i" class="skeleton" style="height:120px;border-radius:1rem;margin-bottom:1rem"></div>
      </div>

      <!-- Bookings List -->
      <div v-else-if="filteredBookings.length" class="booking-list">
        <div v-for="booking in filteredBookings" :key="booking.id" class="booking-card">
          <img :src="booking.listing?.coverImage" :alt="booking.listing?.title" class="booking-image" />
          <div class="booking-info">
            <div class="booking-top">
              <div>
                <h3>{{ booking.listing?.title || 'Listing' }}</h3>
                <p class="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin class="w-3.5 h-3.5 vibrant-icon icon-vibrant-users" />
                  {{ booking.listing?.city }}, {{ booking.listing?.country }}
                </p>
              </div>
              <span class="badge" :class="statusBadgeClass(booking.status)">
                {{ booking.status }}
              </span>
            </div>
            <div class="booking-details">
              <div class="detail-item">
                <span class="detail-label">Check-in</span>
                <span>{{ formatDate(booking.checkIn) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Check-out</span>
                <span>{{ formatDate(booking.checkOut) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Guests</span>
                <span>{{ booking.adults + (booking.children || 0) }}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Total</span>
                <span class="font-bold">${{ booking.totalPrice }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div v-else class="empty-state">
        <div class="empty-icon">
          <Calendar class="w-16 h-16 mx-auto mb-4 vibrant-icon icon-vibrant-calendar" />
        </div>
        <h3>No {{ activeTab.toLowerCase() }} bookings</h3>
        <p>{{ emptyMessage }}</p>
        <router-link to="/listings/search" class="btn btn-primary">Browse Listings</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { MapPin, Calendar } from 'lucide-vue-next'
import { api } from '@/api/client'

const bookings = ref<any[]>([])
const loading = ref(true)
const activeTab = ref('upcoming')

const tabs = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
  { value: 'cancelled', label: 'Cancelled' },
]

const filteredBookings = computed(() => {
  const now = new Date()
  return bookings.value.filter((b) => {
    if (activeTab.value === 'cancelled') return b.status === 'CANCELLED'
    if (activeTab.value === 'past') return b.status === 'COMPLETED' || (new Date(b.checkOut) < now && b.status !== 'CANCELLED')
    return (b.status === 'CONFIRMED' || b.status === 'PENDING') && new Date(b.checkIn) >= now
  })
})

const emptyMessage = computed(() => {
  if (activeTab.value === 'upcoming') return 'Start exploring to book your next adventure!'
  if (activeTab.value === 'past') return 'Your completed stays will appear here.'
  return 'No cancelled bookings. Great!'
})

function getCount(tab: string) {
  const now = new Date()
  return bookings.value.filter((b) => {
    if (tab === 'cancelled') return b.status === 'CANCELLED'
    if (tab === 'past') return b.status === 'COMPLETED' || (new Date(b.checkOut) < now && b.status !== 'CANCELLED')
    return (b.status === 'CONFIRMED' || b.status === 'PENDING') && new Date(b.checkIn) >= now
  }).length
}

onMounted(async () => {
  try {
    const { data: wrapper } = await api.getMyBookings()
    bookings.value = wrapper.data || []
  } catch (error) {
    console.error('Failed to fetch bookings:', error)
  } finally {
    loading.value = false
  }
})

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function statusBadgeClass(status: string) {
  const map: Record<string, string> = {
    CONFIRMED: 'badge-success',
    PENDING: 'badge-warning',
    CANCELLED: 'badge-error',
    COMPLETED: 'badge-gray',
  }
  return map[status] || 'badge-gray'
}
</script>

<style scoped>
.bookings-page { padding: var(--spacing-xl) 0; }
.page-title { margin-bottom: var(--spacing-xl); }

.tabs { display: flex; gap: var(--spacing-xs); border-bottom: 2px solid var(--color-gray-100); margin-bottom: var(--spacing-xl); }
.tab { padding: var(--spacing-md) var(--spacing-lg); font-weight: 600; font-size: var(--font-size-sm); color: var(--color-gray-500); border: none; background: none; cursor: pointer; border-bottom: 3px solid transparent; transition: all var(--transition-fast); margin-bottom: -2px; font-family: inherit; display: flex; align-items: center; gap: var(--spacing-sm); }
.tab:hover { color: var(--color-gray-700); }
.tab.active { color: var(--color-primary-600); border-bottom-color: var(--color-primary-600); }
.tab-count { background: var(--color-gray-100); padding: 0.125rem 0.5rem; border-radius: var(--radius-full); font-size: var(--font-size-xs); }
.tab.active .tab-count { background: var(--color-primary-100); color: var(--color-primary-700); }

.booking-list { display: flex; flex-direction: column; gap: var(--spacing-md); }

.booking-card { display: flex; background: white; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--color-gray-100); transition: all var(--transition-base); }
.booking-card:hover { box-shadow: var(--shadow-lg); }
.booking-image { width: 200px; min-height: 140px; object-fit: cover; }
.booking-info { flex: 1; padding: var(--spacing-lg); }
.booking-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--spacing-md); }
.booking-top h3 { font-size: var(--font-size-base); margin-bottom: 0.25rem; }
.booking-details { display: flex; gap: var(--spacing-xl); }
.detail-item { display: flex; flex-direction: column; gap: 0.125rem; }
.detail-label { font-size: var(--font-size-xs); color: var(--color-gray-400); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }

.empty-state { text-align: center; padding: var(--spacing-4xl) var(--spacing-xl); }
.empty-icon { font-size: 4rem; margin-bottom: var(--spacing-lg); }
.empty-state h3 { margin-bottom: var(--spacing-sm); }
.empty-state p { color: var(--color-gray-500); margin-bottom: var(--spacing-xl); }

@media (max-width: 768px) {
  .booking-card { flex-direction: column; }
  .booking-image { width: 100%; height: 160px; }
  .booking-details { flex-wrap: wrap; gap: var(--spacing-md); }
}
</style>
