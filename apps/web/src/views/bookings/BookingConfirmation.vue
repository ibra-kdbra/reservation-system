<template>
    <div class="confirmation-page">
        <div class="container">
            <div class="confirmation-card">
                <!-- Success Animation -->
                <div class="success-icon">
                    <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>

                <h1 class="confirmation-title">Booking confirmed!</h1>
                <p class="confirmation-subtitle">Your reservation has been sent to the host. You'll receive a
                    confirmation email shortly.</p>

                <!-- Booking Details -->
                <div class="booking-details" v-if="booking">
                    <div class="detail-row">
                        <span class="detail-label">Booking ID</span>
                        <span class="detail-value">{{ booking.id?.slice(0, 8) }}...</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Property</span>
                        <span class="detail-value">{{ booking.listing?.title || 'Your listing' }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-in</span>
                        <span class="detail-value">{{ formatDate(booking.checkIn) }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-out</span>
                        <span class="detail-value">{{ formatDate(booking.checkOut) }}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Guests</span>
                        <span class="detail-value">{{ booking.adults }} adult{{ booking.adults > 1 ? 's' : '' }}</span>
                    </div>
                    <div class="detail-row total">
                        <span class="detail-label">Total paid</span>
                        <span class="detail-value">{{ formatCurrency(booking.totalPrice) }}</span>
                    </div>
                </div>

                <!-- Actions -->
                <div class="confirmation-actions">
                    <button class="primary-btn" @click="router.push({ name: 'my-bookings' })">
                        View my bookings
                    </button>
                    <button class="secondary-btn" @click="router.push({ name: 'home' })">
                        Back to exploring
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/api/client'

const route = useRoute()
const router = useRouter()

const booking = ref<any>(null)

onMounted(async () => {
    const bookingId = route.params.bookingId as string
    if (!bookingId) {
        router.push({ name: 'home' })
        return
    }
    try {
        const { data: wrapper } = await api.getBookingById(bookingId)
        booking.value = wrapper.data
    } catch {
        // Fallback — still show a success message but without details
        booking.value = null
    }
})

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount)
}
</script>

<style scoped>
.confirmation-page {
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-gray-50);
    padding: var(--spacing-4xl) 0;
}

.confirmation-card {
    max-width: 560px;
    margin: 0 auto;
    background: white;
    border-radius: var(--radius-2xl);
    padding: var(--spacing-3xl) var(--spacing-2xl);
    box-shadow: var(--shadow-xl);
    text-align: center;
}

.success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, #d4edda, #c3e6cb);
    border-radius: 50%;
    margin-bottom: var(--spacing-xl);
    color: #28a745;
    animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    60% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.confirmation-title {
    font-size: var(--font-size-3xl);
    font-weight: 700;
    color: var(--color-gray-900);
    margin: 0 0 var(--spacing-sm);
}

.confirmation-subtitle {
    font-size: var(--font-size-base);
    color: var(--color-gray-500);
    margin: 0 0 var(--spacing-2xl);
    line-height: 1.5;
}

.booking-details {
    text-align: left;
    background: var(--color-gray-50);
    border-radius: var(--radius-xl);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-gray-100);
}

.detail-row:last-child {
    border-bottom: none;
}

.detail-row.total {
    border-top: 2px solid var(--color-gray-200);
    border-bottom: none;
    margin-top: var(--spacing-sm);
    padding-top: var(--spacing-md);
}

.detail-label {
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
}

.detail-value {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-gray-900);
}

.detail-row.total .detail-value {
    font-size: var(--font-size-lg);
    color: var(--color-primary-600);
}

.confirmation-actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.primary-btn {
    background: linear-gradient(to right, var(--color-primary-500), var(--color-primary-600));
    color: white;
    font-size: var(--font-size-base);
    font-weight: 600;
    padding: 14px 24px;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.2s;
}

.primary-btn:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
}

.secondary-btn {
    background: white;
    color: var(--color-gray-900);
    font-size: var(--font-size-base);
    font-weight: 600;
    padding: 14px 24px;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.2s;
}

.secondary-btn:hover {
    background: var(--color-gray-50);
}
</style>
