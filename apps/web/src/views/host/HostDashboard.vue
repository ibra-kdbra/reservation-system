<template>
    <div class="dashboard-page">
        <div class="container">
            <div class="dashboard-header">
                <div>
                    <h1>Host Dashboard</h1>
                    <p class="dashboard-subtitle">Manage your listings and bookings</p>
                </div>
                <router-link to="/listings/create" class="create-btn" v-if="false">
                    <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                        <path fill-rule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                    New Listing
                </router-link>
            </div>

            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon listings-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value">{{ myListings.length }}</span>
                        <span class="stat-label">Active Listings</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon bookings-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value">{{ hostBookings.length }}</span>
                        <span class="stat-label">Total Bookings</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon revenue-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                        </svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value">{{ currencyStore.format(totalRevenue) }}</span>
                        <span class="stat-label">Total Revenue</span>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon rating-icon">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="none">
                            <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                    </div>
                    <div class="stat-info">
                        <span class="stat-value">{{ avgRating.toFixed(1) }}</span>
                        <span class="stat-label">Avg Rating</span>
                    </div>
                </div>
            </div>

            <!-- My Listings -->
            <section class="dashboard-section">
                <h2>My Listings</h2>
                <div v-if="loadingListings" class="loading-text">Loading listings...</div>
                <div v-else-if="myListings.length === 0" class="empty-section">
                    <p>You haven't created any listings yet.</p>
                </div>
                <div v-else class="listings-table-wrap">
                    <table class="listings-table">
                        <thead>
                            <tr>
                                <th>Property</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Rating</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="listing in myListings" :key="listing.id">
                                <td>
                                    <div class="listing-cell">
                                        <img :src="listing.images?.[0] || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800'" :alt="listing.title" class="listing-thumb" />
                                        <div>
                                            <router-link :to="`/listings/${listing.id}`" class="listing-title-link">{{
                                                listing.title }}</router-link>
                                            <span class="listing-type">{{ listing.propertyType }}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{{ listing.city }}, {{ listing.country }}</td>
                                <td>{{ currencyStore.format(listing.pricePerNight) }}/night</td>
                                <td>
                                    <span class="rating-badge" v-if="listing.averageRating">
                                        <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        {{ listing.averageRating.toFixed(1) }}
                                    </span>
                                    <span v-else class="no-rating">N/A</span>
                                </td>
                                <td>
                                    <span class="status-badge" :class="listing.status.toLowerCase()">{{ listing.status
                                        }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            <!-- Recent Bookings -->
            <section class="dashboard-section">
                <h2>Recent Bookings</h2>
                <div v-if="loadingBookings" class="loading-text">Loading bookings...</div>
                <div v-else-if="hostBookings.length === 0" class="empty-section">
                    <p>No bookings received yet.</p>
                </div>
                <div v-else class="bookings-list">
                    <div v-for="booking in hostBookings.slice(0, 8)" :key="booking.id" class="booking-item">
                        <div class="booking-guest">
                            <div class="guest-avatar">
                                {{ (booking.guest?.firstName || 'G')[0] }}
                            </div>
                            <div>
                                <p class="guest-name">{{ booking.guest?.firstName }} {{ booking.guest?.lastName }}</p>
                                <p class="booking-dates">{{ formatDate(booking.checkIn) }} – {{
                                    formatDate(booking.checkOut) }}</p>
                            </div>
                        </div>
                        <div class="booking-details">
                            <p class="booking-listing-name">{{ booking.listing?.title }}</p>
                            <p class="booking-total">{{ currencyStore.format(Number(booking.totalPrice)) }}</p>
                        </div>
                        <span class="status-badge" :class="booking.status.toLowerCase()">{{ booking.status }}</span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { api } from '@/api/client'
import { useCurrencyStore } from '@/stores/currency'
import type { Listing, Booking } from '@/types'

const currencyStore = useCurrencyStore()
const myListings = ref<Listing[]>([])
const hostBookings = ref<Booking[]>([])
const loadingListings = ref(true)
const loadingBookings = ref(true)

const totalRevenue = computed(() =>
    hostBookings.value
        .filter(b => b.status === 'COMPLETED' || b.status === 'CONFIRMED')
        .reduce((sum: number, b) => sum + Number(b.totalPrice || 0), 0)
)

const avgRating = computed(() => {
    const rated = myListings.value.filter(l => l.averageRating)
    if (rated.length === 0) return 0
    return rated.reduce((sum: number, l) => sum + (l.averageRating || 0), 0) / rated.length
})

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

onMounted(async () => {
    try {
        const { data } = await api.getMyListings()
        myListings.value = data
    } catch (err) {
        console.error('Failed to load listings:', err)
    } finally {
        loadingListings.value = false
    }

    try {
        const { data } = await api.getHostBookings()
        hostBookings.value = data
    } catch (err) {
        console.error('Failed to load bookings:', err)
    } finally {
        loadingBookings.value = false
    }
})
</script>

<style scoped>
.dashboard-page {
    padding: var(--spacing-2xl) 0 var(--spacing-4xl);
    min-height: 70vh;
}

.dashboard-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: var(--spacing-2xl);
}

.dashboard-header h1 {
    font-size: var(--font-size-3xl);
    font-weight: 800;
}

.dashboard-subtitle {
    color: var(--color-gray-500);
    margin-top: var(--spacing-xs);
}

.create-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    background: var(--color-primary-500);
    color: white;
    border-radius: var(--radius-xl);
    font-weight: 600;
    text-decoration: none;
    font-size: var(--font-size-sm);
    transition: background 0.2s;
}

.create-btn:hover {
    background: var(--color-primary-600);
}

/* Stats */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-3xl);
}

.stat-card {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-xl);
    background: white;
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-gray-100);
    box-shadow: var(--shadow-sm);
}

.stat-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.listings-icon {
    background: #fef3c7;
    color: #d97706;
}

.bookings-icon {
    background: #dbeafe;
    color: #2563eb;
}

.revenue-icon {
    background: #d1fae5;
    color: #059669;
}

.rating-icon {
    background: #fce7f3;
    color: #db2777;
}

.stat-value {
    display: block;
    font-size: var(--font-size-2xl);
    font-weight: 800;
    color: var(--color-gray-900);
}

.stat-label {
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
}

/* Sections */
.dashboard-section {
    margin-bottom: var(--spacing-3xl);
}

.dashboard-section h2 {
    font-size: var(--font-size-xl);
    font-weight: 700;
    margin-bottom: var(--spacing-lg);
}

.loading-text,
.empty-section {
    color: var(--color-gray-500);
    padding: var(--spacing-xl);
    text-align: center;
}

/* Listings Table */
.listings-table-wrap {
    overflow-x: auto;
    border: 1px solid var(--color-gray-100);
    border-radius: var(--radius-xl);
}

.listings-table {
    width: 100%;
    border-collapse: collapse;
}

.listings-table th {
    text-align: left;
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    background: var(--color-gray-50);
    border-bottom: 1px solid var(--color-gray-100);
}

.listings-table td {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-sm);
    border-bottom: 1px solid var(--color-gray-50);
    vertical-align: middle;
}

.listing-cell {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.listing-thumb {
    width: 56px;
    height: 40px;
    border-radius: var(--radius-md);
    object-fit: cover;
    flex-shrink: 0;
}

.listing-title-link {
    font-weight: 600;
    color: var(--color-gray-800);
    text-decoration: none;
}

.listing-title-link:hover {
    color: var(--color-primary-500);
}

.listing-type {
    display: block;
    font-size: 0.75rem;
    color: var(--color-gray-400);
    margin-top: 2px;
}

.rating-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #d97706;
    font-weight: 600;
}

.no-rating {
    color: var(--color-gray-400);
}

.status-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: capitalize;
}

.status-badge.published {
    background: #d1fae5;
    color: #059669;
}

.status-badge.draft {
    background: #fef3c7;
    color: #d97706;
}

.status-badge.completed {
    background: #dbeafe;
    color: #2563eb;
}

.status-badge.confirmed {
    background: #d1fae5;
    color: #059669;
}

.status-badge.pending {
    background: #fef3c7;
    color: #d97706;
}

.status-badge.cancelled {
    background: #fee2e2;
    color: #dc2626;
}

/* Bookings List */
.bookings-list {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.booking-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-lg);
    padding: var(--spacing-lg);
    background: white;
    border: 1px solid var(--color-gray-100);
    border-radius: var(--radius-xl);
    transition: box-shadow 0.2s;
}

.booking-item:hover {
    box-shadow: var(--shadow-sm);
}

.booking-guest {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    min-width: 200px;
}

.guest-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--color-primary-100);
    color: var(--color-primary-600);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: var(--font-size-sm);
    flex-shrink: 0;
}

.guest-name {
    font-weight: 600;
    font-size: var(--font-size-sm);
}

.booking-dates {
    font-size: 0.75rem;
    color: var(--color-gray-500);
    margin-top: 2px;
}

.booking-details {
    flex: 1;
}

.booking-listing-name {
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
}

.booking-total {
    font-weight: 700;
    font-size: var(--font-size-sm);
    margin-top: 2px;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: 1fr 1fr;
    }

    .booking-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .booking-guest {
        min-width: unset;
    }
}
</style>
