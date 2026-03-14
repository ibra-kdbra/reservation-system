import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/api/client'
import { useCurrencyStore } from '@/stores/currency'
import type { Booking } from '@/types'

export function useBooking(listingId: string, pricePerNight: number) {
    const router = useRouter()
    const currencyStore = useCurrencyStore()
    const step = ref(1)
    const loading = ref(false)
    const error = ref('')

    const bookingData = ref({
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        specialRequests: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        cardName: ''
    })

    const nights = computed(() => {
        if (!bookingData.value.checkIn || !bookingData.value.checkOut) return 0
        const start = new Date(bookingData.value.checkIn)
        const end = new Date(bookingData.value.checkOut)
        const diffTime = Math.abs(end.getTime() - start.getTime())
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    })

    const totalPrice = computed(() => {
        return nights.value * pricePerNight
    })

    const formattedCheckIn = computed(() => {
        if (!bookingData.value.checkIn) return ''
        return new Date(bookingData.value.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })

    const formattedCheckOut = computed(() => {
        if (!bookingData.value.checkOut) return ''
        return new Date(bookingData.value.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    })

    async function submitBooking() {
        loading.value = true
        error.value = ''
        try {
            const payload: Partial<Booking> = {
                listingId,
                checkIn: bookingData.value.checkIn,
                checkOut: bookingData.value.checkOut,
                adults: bookingData.value.adults,
                children: bookingData.value.children,
                specialRequests: bookingData.value.specialRequests
            }

            const { data } = await api.createBooking(payload)
            // Mock payment delay
            await new Promise(resolve => setTimeout(resolve, 1500))

            router.push({ name: 'booking-confirmation', params: { id: data.id } })
        } catch (err: any) {
            // Global interceptor already shows a toast, but we still want the local error ref
            console.error('Booking failed', err)
            error.value = err.response?.data?.message || 'Failed to complete booking'
        } finally {
            loading.value = false
        }
    }

    return {
        step,
        loading,
        error,
        bookingData,
        nights,
        totalPrice,
        formattedCheckIn,
        formattedCheckOut,
        submitBooking,
        formatPrice: currencyStore.format
    }
}
