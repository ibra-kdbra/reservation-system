import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useBooking } from '@/composables/useBooking'

// useRouter and useCurrencyStore are mocked in setup.ts
vi.mock('@/api/client', () => ({
    api: {
        createBooking: vi.fn().mockResolvedValue({ data: { data: { id: 'booking-123' } } })
    }
}))

describe('useBooking', () => {
    const listingId = 'listing-abc'
    const pricePerNight = 100

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('returns 0 nights when dates are not set', () => {
        const { nights } = useBooking(listingId, pricePerNight)
        expect(nights.value).toBe(0)
    })

    it('computes nights correctly from check-in and check-out', () => {
        const { bookingData, nights } = useBooking(listingId, pricePerNight)
        bookingData.value.checkIn = '2026-04-01'
        bookingData.value.checkOut = '2026-04-07'
        expect(nights.value).toBe(6)
    })

    it('computes totalPrice as nights × pricePerNight', () => {
        const { bookingData, totalPrice } = useBooking(listingId, pricePerNight)
        bookingData.value.checkIn = '2026-04-01'
        bookingData.value.checkOut = '2026-04-04'
        expect(totalPrice.value).toBe(300) // 3 nights × $100
    })

    it('formats check-in date for display', () => {
        const { bookingData, formattedCheckIn } = useBooking(listingId, pricePerNight)
        bookingData.value.checkIn = '2026-04-01'
        expect(formattedCheckIn.value).toMatch(/Apr/)
    })

    it('returns empty string for formatted dates when not set', () => {
        const { formattedCheckIn, formattedCheckOut } = useBooking(listingId, pricePerNight)
        expect(formattedCheckIn.value).toBe('')
        expect(formattedCheckOut.value).toBe('')
    })

    it('submitBooking calls api.createBooking with correct payload', async () => {
        const { api } = await import('@/api/client')
        const { bookingData, submitBooking } = useBooking(listingId, pricePerNight)
        bookingData.value.checkIn = '2026-04-01'
        bookingData.value.checkOut = '2026-04-07'
        bookingData.value.adults = 2
        bookingData.value.specialRequests = 'No pets'

        await submitBooking()

        expect(api.createBooking).toHaveBeenCalledWith({
            listingId: 'listing-abc',
            checkIn: '2026-04-01',
            checkOut: '2026-04-07',
            adults: 2,
            children: 0,
            specialRequests: 'No pets'
        })
    })

    it('sets error message when submitBooking fails', async () => {
        const { api } = await import('@/api/client')
        vi.mocked(api.createBooking).mockRejectedValueOnce({
            response: { data: { message: 'Listing not available' } }
        })

        const { bookingData, error, submitBooking } = useBooking(listingId, pricePerNight)
        bookingData.value.checkIn = '2026-04-01'
        bookingData.value.checkOut = '2026-04-07'
        await submitBooking()

        expect(error.value).toBe('Listing not available')
    })
})
