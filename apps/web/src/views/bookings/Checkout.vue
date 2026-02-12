<template>
    <div class="checkout-page">
        <div class="container">
            <!-- Back Link -->
            <button class="back-link" @click="router.back()">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Request to book
            </button>

            <div class="checkout-layout">
                <!-- Left Column — Payment Form -->
                <main class="checkout-main">

                    <!-- Trip Details -->
                    <section class="checkout-section">
                        <h2 class="section-title">Your trip</h2>

                        <div class="trip-detail">
                            <div class="trip-detail-header">
                                <div>
                                    <h3>Dates</h3>
                                    <p>{{ formattedCheckIn }} – {{ formattedCheckOut }}</p>
                                </div>
                                <button class="edit-link" @click="router.back()">Edit</button>
                            </div>
                        </div>

                        <div class="trip-detail">
                            <div class="trip-detail-header">
                                <div>
                                    <h3>Guests</h3>
                                    <p>{{ guests }} guest{{ guests > 1 ? 's' : '' }}</p>
                                </div>
                                <button class="edit-link" @click="router.back()">Edit</button>
                            </div>
                        </div>
                    </section>

                    <!-- Payment Method -->
                    <section class="checkout-section">
                        <h2 class="section-title">Pay with</h2>

                        <div class="card-form">
                            <div class="card-brands">
                                <img src="https://cdn.jsdelivr.net/gh/nicehash/design-system@1.7.4/dist/assets/img/payment/visa.svg"
                                    alt="Visa" class="brand-icon" />
                                <img src="https://cdn.jsdelivr.net/gh/nicehash/design-system@1.7.4/dist/assets/img/payment/mastercard.svg"
                                    alt="Mastercard" class="brand-icon" />
                                <img src="https://cdn.jsdelivr.net/gh/nicehash/design-system@1.7.4/dist/assets/img/payment/american-express.svg"
                                    alt="Amex" class="brand-icon" />
                            </div>

                            <div class="form-group full-width">
                                <label>Card number</label>
                                <input v-model="cardNumber" type="text" placeholder="1234 5678 9012 3456" maxlength="19"
                                    @input="formatCardNumber" />
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Expiration</label>
                                    <input v-model="cardExpiry" type="text" placeholder="MM / YY" maxlength="7"
                                        @input="formatExpiry" />
                                </div>
                                <div class="form-group">
                                    <label>CVV</label>
                                    <input v-model="cardCvv" type="text" placeholder="123" maxlength="4" />
                                </div>
                            </div>

                            <div class="form-group full-width">
                                <label>Cardholder name</label>
                                <input v-model="cardName" type="text" placeholder="Name on card" />
                            </div>
                        </div>
                    </section>

                    <!-- Special Requests -->
                    <section class="checkout-section">
                        <h2 class="section-title">Special requests</h2>
                        <textarea v-model="specialRequests" placeholder="Any special requests for the host? (optional)"
                            rows="3" class="special-requests"></textarea>
                    </section>

                    <!-- Cancellation Policy -->
                    <section class="checkout-section">
                        <h2 class="section-title">Cancellation policy</h2>
                        <p class="policy-text">
                            Free cancellation before check-in. Cancel before check-in for a full refund.
                            After that, the first night is non-refundable, but 50% of the remaining nights will be
                            refunded.
                        </p>
                    </section>

                    <!-- Confirm Button -->
                    <section class="checkout-section confirm-section">
                        <p class="legal-text">
                            By selecting the button below, I agree to the Host's House Rules, Ground Rules for Guests,
                            NestAsia's Rebooking and Refund Policy, and that NestAsia can charge my payment method if
                            I'm responsible for damage.
                        </p>
                        <button class="confirm-btn" :disabled="!isFormValid || isProcessing" @click="confirmBooking">
                            <span v-if="isProcessing" class="spinner"></span>
                            <span v-else>Confirm and pay</span>
                        </button>

                        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                    </section>
                </main>

                <!-- Right Column — Booking Summary -->
                <aside class="checkout-sidebar">
                    <div class="summary-card">
                        <!-- Listing Preview -->
                        <div class="listing-preview" v-if="listing">
                            <img :src="listing.coverImage || listing.images?.[0]" :alt="listing.title"
                                class="listing-thumb" />
                            <div class="listing-info">
                                <p class="listing-type">{{ listing.propertyType }}</p>
                                <h3 class="listing-title">{{ listing.title }}</h3>
                                <div class="listing-rating" v-if="listing.averageRating">
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                                        <path
                                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                        </path>
                                    </svg>
                                    <span>{{ listing.averageRating }} ({{ listing.reviewCount }})</span>
                                </div>
                            </div>
                        </div>

                        <hr class="divider" />

                        <!-- Price Details -->
                        <h3 class="price-title">Price details</h3>
                        <div class="price-rows">
                            <div class="price-row">
                                <span>{{ formatCurrency(pricePerNight) }} x {{ nights }} night{{ nights > 1 ? 's' : ''
                                    }}</span>
                                <span>{{ formatCurrency(pricePerNight * nights) }}</span>
                            </div>
                            <div class="price-row" v-if="cleaningFee">
                                <span>Cleaning fee</span>
                                <span>{{ formatCurrency(cleaningFee) }}</span>
                            </div>
                            <div class="price-row" v-if="serviceFee">
                                <span>Service fee</span>
                                <span>{{ formatCurrency(serviceFee) }}</span>
                            </div>
                        </div>

                        <hr class="divider" />

                        <div class="total-row">
                            <span>Total (USD)</span>
                            <span>{{ formatCurrency(totalPrice) }}</span>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { api } from '../../api/client'
import { useToast } from '../../composables/useToast'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// Listing data
const listing = ref<any>(null)

// Trip params from query
const checkIn = route.query.checkIn as string || ''
const checkOut = route.query.checkOut as string || ''
const guests = Number(route.query.guests) || 1

// Derived pricing
const pricePerNight = computed(() => Number(listing.value?.pricePerNight) || 0)
const cleaningFee = computed(() => Number(listing.value?.cleaningFee) || 0)
const serviceFee = computed(() => Number(listing.value?.serviceFee) || 0)

const nights = computed(() => {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    return Math.max(1, Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
})

const totalPrice = computed(() => {
    return (pricePerNight.value * nights.value) + cleaningFee.value + serviceFee.value
})

// Formatted dates
const formattedCheckIn = computed(() => {
    if (!checkIn) return ''
    return new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

const formattedCheckOut = computed(() => {
    if (!checkOut) return ''
    return new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

// Payment form
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const cardName = ref('')
const specialRequests = ref('')

const isProcessing = ref(false)
const errorMessage = ref('')

const isFormValid = computed(() => {
    return cardNumber.value.length >= 16 &&
        cardExpiry.value.length >= 5 &&
        cardCvv.value.length >= 3 &&
        cardName.value.length >= 2 &&
        checkIn && checkOut
})

function formatCardNumber(e: Event) {
    const input = e.target as HTMLInputElement
    let val = input.value.replace(/\D/g, '').slice(0, 16)
    val = val.replace(/(\d{4})/g, '$1 ').trim()
    cardNumber.value = val
}

function formatExpiry(e: Event) {
    const input = e.target as HTMLInputElement
    let val = input.value.replace(/\D/g, '').slice(0, 4)
    if (val.length >= 3) {
        val = val.slice(0, 2) + ' / ' + val.slice(2)
    }
    cardExpiry.value = val
}

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount)
}

// Fetch listing
onMounted(async () => {
    const listingId = route.params.listingId as string
    if (!listingId) {
        router.push({ name: 'home' })
        return
    }
    try {
        const { data } = await api.getListingById(listingId)
        listing.value = data
    } catch {
        toast.error('Failed to load listing details')
        router.push({ name: 'home' })
    }
})

// Submit booking
async function confirmBooking() {
    if (!isFormValid.value) return
    isProcessing.value = true
    errorMessage.value = ''

    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1800))

    try {
        const listingId = route.params.listingId as string
        const { data } = await api.createBooking({
            listingId,
            checkIn,
            checkOut,
            adults: guests,
            specialRequests: specialRequests.value || undefined,
        })

        toast.success('Booking confirmed! 🎉')
        router.push({ name: 'booking-confirmation', params: { bookingId: data.id } })
    } catch (err: any) {
        errorMessage.value = err?.response?.data?.message || 'Payment failed. Please try again.'
        toast.error('Booking failed')
    } finally {
        isProcessing.value = false
    }
}
</script>

<style scoped>
.checkout-page {
    padding: var(--spacing-2xl) 0 var(--spacing-4xl);
    min-height: 100vh;
    background: var(--color-gray-50);
}

.back-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--color-gray-900);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-bottom: var(--spacing-2xl);
}

.back-link:hover {
    text-decoration: underline;
}

.checkout-layout {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: var(--spacing-4xl);
    align-items: start;
}

/* Main Column */
.checkout-main {
    min-width: 0;
}

.checkout-section {
    padding: var(--spacing-xl) 0;
    border-bottom: 1px solid var(--color-gray-200);
}

.section-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-gray-900);
    margin-bottom: var(--spacing-lg);
}

/* Trip Details */
.trip-detail {
    margin-bottom: var(--spacing-md);
}

.trip-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.trip-detail h3 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-gray-900);
    margin: 0 0 4px 0;
}

.trip-detail p {
    font-size: var(--font-size-sm);
    color: var(--color-gray-600);
    margin: 0;
}

.edit-link {
    font-size: var(--font-size-sm);
    font-weight: 600;
    text-decoration: underline;
    color: var(--color-gray-900);
    background: none;
    border: none;
    cursor: pointer;
}

/* Card Form */
.card-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.card-brands {
    display: flex;
    gap: 8px;
    margin-bottom: var(--spacing-sm);
}

.brand-icon {
    height: 28px;
    width: auto;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-sm);
    padding: 2px 4px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.form-group label {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-gray-700);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.form-group input {
    padding: 12px 14px;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    transition: border-color 0.2s;
    outline: none;
}

.form-group input:focus {
    border-color: var(--color-gray-900);
    box-shadow: 0 0 0 1px var(--color-gray-900);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
}

/* Special Requests */
.special-requests {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-lg);
    font-size: var(--font-size-base);
    font-family: inherit;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
}

.special-requests:focus {
    border-color: var(--color-gray-900);
    box-shadow: 0 0 0 1px var(--color-gray-900);
}

/* Policy */
.policy-text {
    font-size: var(--font-size-sm);
    line-height: 1.6;
    color: var(--color-gray-600);
}

/* Confirm */
.confirm-section {
    border-bottom: none;
}

.legal-text {
    font-size: var(--font-size-xs);
    line-height: 1.5;
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-lg);
}

.confirm-btn {
    background: linear-gradient(to right, var(--color-primary-500), var(--color-primary-600));
    color: white;
    font-size: var(--font-size-lg);
    font-weight: 600;
    padding: 16px 32px;
    border: none;
    border-radius: var(--radius-lg);
    cursor: pointer;
    width: 100%;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.confirm-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
}

.confirm-btn:disabled {
    background: var(--color-gray-300);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.error-message {
    margin-top: var(--spacing-md);
    color: #e53e3e;
    font-size: var(--font-size-sm);
    font-weight: 500;
}

/* Sidebar */
.checkout-sidebar {
    position: sticky;
    top: 100px;
}

.summary-card {
    background: white;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-lg);
}

.listing-preview {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.listing-thumb {
    width: 130px;
    height: 100px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    flex-shrink: 0;
}

.listing-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    min-width: 0;
}

.listing-type {
    font-size: var(--font-size-xs);
    color: var(--color-gray-500);
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.listing-title {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-gray-900);
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.listing-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-xs);
    color: var(--color-gray-700);
}

.divider {
    border: none;
    border-top: 1px solid var(--color-gray-200);
    margin: var(--spacing-lg) 0;
}

.price-title {
    font-size: var(--font-size-xl);
    font-weight: 600;
    margin-bottom: var(--spacing-md);
}

.price-rows {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.price-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
}

.total-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-lg);
    font-weight: 700;
    color: var(--color-gray-900);
}

@media (max-width: 1024px) {
    .checkout-layout {
        grid-template-columns: 1fr;
    }

    .checkout-sidebar {
        position: static;
        order: -1;
    }
}
</style>
