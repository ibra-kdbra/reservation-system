<template>
    <div class="booking-widget">
        <div class="booking-header">
            <div class="price">
                <span class="amount">{{ formattedPrice }}</span>
                <span class="unit">night</span>
            </div>
            <div class="rating" v-if="rating">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                    </path>
                </svg>
                <span>{{ rating }}</span>
                <span class="review-count">· {{ reviewCount }} reviews</span>
            </div>
        </div>

        <div class="booking-form">
            <div class="date-picker">
                <div class="date-input">
                    <label for="check-in">CHECK-IN</label>
                    <input id="check-in" type="date" :value="checkIn"
                        @input="$emit('update:checkIn', ($event.target as HTMLInputElement).value)"
                        placeholder="Add date" />
                </div>
                <div class="date-input">
                    <label for="check-out">CHECKOUT</label>
                    <input id="check-out" type="date" :value="checkOut"
                        @input="$emit('update:checkOut', ($event.target as HTMLInputElement).value)"
                        placeholder="Add date" />
                </div>
            </div>

            <div class="guest-picker">
                <label for="guest-select">GUESTS</label>
                <select id="guest-select" :value="guests"
                    @change="$emit('update:guests', Number(($event.target as HTMLSelectElement).value))"
                    aria-label="Number of guests">
                    <option v-for="n in maxGuests" :key="n" :value="n">
                        {{ n }} guest{{ n > 1 ? 's' : '' }}
                    </option>
                </select>
                <svg class="chevron-down" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>

            <button class="reserve-btn" @click="$emit('book')" :disabled="!checkIn || !checkOut" aria-label="Reserve this listing">
                Reserve
            </button>

            <p class="no-charge-msg">You won't be charged yet</p>

            <div class="price-breakdown" v-if="checkIn && checkOut">
                <div class="price-row">
                    <span>{{ formattedPrice }} x {{ nights }} nights</span>
                    <span>{{ formatCurrency(price * nights) }}</span>
                </div>
                <div class="price-row">
                    <span>Cleaning fee</span>
                    <span>{{ formatCurrency(cleaningFee || 0) }}</span>
                </div>
                <div class="price-row">
                    <span>Service fee</span>
                    <span>{{ formatCurrency(serviceFee || 0) }}</span>
                </div>
                <div class="total-row">
                    <span>Total</span>
                    <span>{{ formatCurrency(totalPrice) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    price: number
    cleaningFee?: number
    serviceFee?: number
    rating?: number
    reviewCount?: number
    maxGuests: number
    checkIn: string
    checkOut: string
    guests: number
}>()

defineEmits<{
    (e: 'update:checkIn', val: string): void
    (e: 'update:checkOut', val: string): void
    (e: 'update:guests', val: number): void
    (e: 'book'): void
}>()

const nights = computed(() => {
    if (!props.checkIn || !props.checkOut) return 0
    const start = new Date(props.checkIn)
    const end = new Date(props.checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
})

const totalPrice = computed(() => {
    return (props.price * nights.value) + (props.cleaningFee || 0) + (props.serviceFee || 0)
})

const formattedPrice = computed(() => formatCurrency(props.price))

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(amount)
}
</script>

<style scoped>
.booking-widget {
    background: white;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-xl);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-xl);
    position: sticky;
    top: 120px;
    /* Offset for navbar */
}

.booking-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: var(--spacing-lg);
}

.price {
    display: flex;
    align-items: baseline;
    gap: 4px;
}

.amount {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    color: var(--color-gray-900);
}

.unit {
    font-size: var(--font-size-base);
    color: var(--color-gray-500);
}

.rating {
    font-size: var(--font-size-sm);
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--color-gray-700);
}

.review-count {
    color: var(--color-gray-500);
}

.booking-form {
    display: flex;
    flex-direction: column;
}

.date-picker {
    display: flex;
    border: 1px solid var(--color-gray-400);
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
    overflow: hidden;
}

.date-input {
    flex: 1;
    padding: 10px 12px;
    border-right: 1px solid var(--color-gray-400);
    position: relative;
}

.date-input:last-child {
    border-right: none;
}

.date-input label {
    display: block;
    font-size: 10px;
    font-weight: 800;
    color: var(--color-gray-900);
    margin-bottom: 2px;
}

.date-input input {
    width: 100%;
    border: none;
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
    background: transparent;
    padding: 0;
    outline: none;
}

.guest-picker {
    border: 1px solid var(--color-gray-400);
    border-top: none;
    border-bottom-left-radius: var(--radius-lg);
    border-bottom-right-radius: var(--radius-lg);
    padding: 10px 12px;
    position: relative;
    margin-bottom: var(--spacing-lg);
}

.guest-picker label {
    display: block;
    font-size: 10px;
    font-weight: 800;
    color: var(--color-gray-900);
    margin-bottom: 2px;
}

.guest-picker select {
    width: 100%;
    border: none;
    background: transparent;
    font-size: var(--font-size-sm);
    color: var(--color-gray-900);
    appearance: none;
    outline: none;
    cursor: pointer;
}

.chevron-down {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-900);
    pointer-events: none;
}

.reserve-btn {
    background: var(--color-primary-500);
    /* Airbnb brand color */
    color: white;
    font-size: var(--font-size-base);
    font-weight: 600;
    padding: 14px;
    border-radius: var(--radius-lg);
    border: none;
    cursor: pointer;
    transition: background-color var(--transition-fast);
    width: 100%;
    margin-bottom: var(--spacing-sm);
}

.reserve-btn:hover {
    background: var(--color-primary-600);
}

.reserve-btn:disabled {
    background: var(--color-gray-300);
    cursor: not-allowed;
}

.no-charge-msg {
    text-align: center;
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
    margin-bottom: var(--spacing-lg);
}

.price-breakdown {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.price-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
}

.price-row span:first-child {
    text-decoration: underline;
}

.total-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-gray-900);
    border-top: 1px solid var(--color-gray-200);
    padding-top: var(--spacing-lg);
    margin-top: var(--spacing-sm);
}
</style>
