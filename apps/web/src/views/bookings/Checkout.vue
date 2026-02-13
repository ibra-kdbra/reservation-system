<template>
    <div class="checkout-page">
        <div class="container">
            <!-- Back Link -->
            <button class="back-link" @click="router.back()">
                <ChevronLeft :size="20" />
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
                                <div class="trip-info">
                                    <h3>Dates</h3>
                                    <p>{{ formattedCheckIn }} – {{ formattedCheckOut }}</p>
                                </div>
                                <button class="edit-link" @click="router.back()">Edit</button>
                            </div>
                        </div>

                        <div class="trip-detail">
                            <div class="trip-detail-header">
                                <div class="trip-info">
                                    <h3>Guests</h3>
                                    <p>{{ guests }} guest{{ guests > 1 ? 's' : '' }}</p>
                                </div>
                                <button class="edit-link" @click="router.back()">Edit</button>
                            </div>
                        </div>
                    </section>

                    <!-- Payment Method -->
                    <section class="checkout-section">
                        <div class="payment-header">
                            <h2 class="section-title">Pay with</h2>
                            <div class="card-brands">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                                    alt="Visa" class="brand-icon" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                                    alt="Mastercard" class="brand-icon" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg"
                                    alt="Amex" class="brand-icon" />
                            </div>
                        </div>

                        <div class="card-form">
                            <div class="form-group full-width">
                                <label>Card number</label>
                                <div class="input-icon-wrapper">
                                    <CreditCard class="input-icon" :size="18" />
                                    <input v-model="cardNumber" type="text" placeholder="0000 0000 0000 0000"
                                        maxlength="19" class="input-with-icon" @input="formatCardNumber" />
                                </div>
                            </div>

                            <div class="form-row">
                                <div class="form-group">
                                    <label>Expiration</label>
                                    <div class="input-icon-wrapper">
                                        <Calendar class="input-icon" :size="18" />
                                        <input v-model="cardExpiry" type="text" placeholder="MM / YY" maxlength="7"
                                            class="input-with-icon" @input="formatExpiry" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>CVV</label>
                                    <div class="input-icon-wrapper">
                                        <Lock class="input-icon" :size="18" />
                                        <input v-model="cardCvv" type="text" placeholder="123" maxlength="4"
                                            class="input-with-icon" />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group full-width">
                                <label>Cardholder name</label>
                                <div class="input-icon-wrapper">
                                    <User class="input-icon" :size="18" />
                                    <input v-model="cardName" type="text" placeholder="Name on card"
                                        class="input-with-icon" />
                                </div>
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
                            <strong>Free cancellation before check-in.</strong> Cancel before check-in for a full
                            refund.
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
                            <span v-else class="btn-content">
                                <ShieldCheck :size="20" />
                                Confirm and pay
                            </span>
                        </button>

                        <div class="secure-badge">
                            <Lock :size="14" />
                            <span>Payments are secure and encrypted</span>
                        </div>

                        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                    </section>
                </main>

                <!-- Right Column — Booking Summary -->
                <aside class="checkout-sidebar">
                    <div class="summary-card">
                        <!-- Listing Preview -->
                        <div class="listing-preview" v-if="listing">
                            <div class="listing-thumb-wrapper">
                                <img :src="listing.coverImage || listing.images?.[0]" :alt="listing.title"
                                    class="listing-thumb" />
                            </div>
                            <div class="listing-info">
                                <p class="listing-type">{{ listing.propertyType }}</p>
                                <h3 class="listing-title">{{ listing.title }}</h3>
                                <div class="listing-rating" v-if="listing.averageRating">
                                    <Star :size="12" fill="currentColor" class="star-icon" />
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
import {
    ChevronLeft, CreditCard, Calendar, Lock, User, ShieldCheck, Star
} from 'lucide-vue-next'

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
    gap: 4px;
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--color-gray-900);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-bottom: var(--spacing-2xl);
    transition: color 0.2s;
}

.back-link:hover {
    color: var(--color-primary-600);
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
    align-items: center;
}

.trip-info h3 {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-gray-900);
    margin: 0 0 4px 0;
}

.trip-info p {
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

/* Payment Section */
.payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg);
}

.payment-header .section-title {
    margin-bottom: 0;
}

.card-brands {
    display: flex;
    gap: 8px;
}

.brand-icon {
    height: 24px;
    width: auto;
}

.card-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    background: white;
    padding: var(--spacing-lg);
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-lg);
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.form-group label {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-gray-700);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.input-icon-wrapper {
    position: relative;
}

.input-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-400);
    pointer-events: none;
}

.form-group input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    transition: all 0.2s;
    outline: none;
    box-sizing: border-box;
}

.input-with-icon {
    padding-left: 40px !important;
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
    transition: all 0.2s;
    box-sizing: border-box;
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
    margin-bottom: var(--spacing-md);
}

.btn-content {
    display: flex;
    align-items: center;
    gap: 8px;
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

.secure-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-size: var(--font-size-xs);
    color: var(--color-gray-500);
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
    text-align: center;
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

.listing-thumb-wrapper {
    width: 120px;
    height: 90px;
    border-radius: var(--radius-lg);
    overflow: hidden;
    flex-shrink: 0;
}

.listing-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.listing-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: var(--font-size-xs);
    color: var(--color-gray-700);
}

.star-icon {
    color: var(--color-gray-900);
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
