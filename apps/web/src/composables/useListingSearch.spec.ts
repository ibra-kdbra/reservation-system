import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useRoute, useRouter } from 'vue-router'
import { useListingSearch } from '@/composables/useListingSearch'
import { api } from '@/api/client'

// api/client is mocked in test/setup.ts
describe('useListingSearch', () => {
    let mockPush: ReturnType<typeof vi.fn>

    beforeEach(() => {
        mockPush = vi.fn()
        vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
        vi.mocked(useRoute).mockReturnValue({ query: {}, params: {} } as any)
        vi.mocked(api.searchListings).mockResolvedValue({ data: { listings: [] } } as any)
        vi.clearAllMocks()
        // Re-apply the mocks after clearAllMocks
        mockPush = vi.fn()
        vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any)
        vi.mocked(useRoute).mockReturnValue({ query: {}, params: {} } as any)
        vi.mocked(api.searchListings).mockResolvedValue({ data: { listings: [] } } as any)
    })

    it('initializes filters with empty defaults when no query params', () => {
        const { filters } = useListingSearch()
        expect(filters.city).toBe('')
        expect(filters.guests).toBe(1)
        expect(filters.propertyType).toBe('')
        expect(filters.minPrice).toBeNull()
        expect(filters.amenities).toHaveLength(0)
    })

    it('initializes filters from query params', () => {
        vi.mocked(useRoute).mockReturnValue({
            query: { city: 'Bali', guests: '3', propertyType: 'villa' },
            params: {}
        } as any)
        const { filters } = useListingSearch()
        expect(filters.city).toBe('Bali')
        expect(filters.guests).toBe(3)
        expect(filters.propertyType).toBe('villa')
    })

    it('initializes single amenity value as array', () => {
        vi.mocked(useRoute).mockReturnValue({
            query: { amenities: 'wifi' },
            params: {}
        } as any)
        const { filters } = useListingSearch()
        expect(filters.amenities).toEqual(['wifi'])
    })

    it('clearFilters resets all fields', () => {
        vi.mocked(useRoute).mockReturnValue({
            query: { city: 'Singapore', guests: '4' },
            params: {}
        } as any)
        const { filters, clearFilters } = useListingSearch()
        clearFilters()
        expect(filters.city).toBe('')
        expect(filters.guests).toBe(1)
        expect(mockPush).toHaveBeenCalledWith({ query: {} })
    })

    it('toggleType sets property type and calls router', () => {
        const { filters, toggleType } = useListingSearch()
        toggleType('villa')
        expect(filters.propertyType).toBe('villa')
        expect(mockPush).toHaveBeenCalled()
    })

    it('toggleType clears property type when same type selected', () => {
        vi.mocked(useRoute).mockReturnValue({
            query: { propertyType: 'villa' },
            params: {}
        } as any)
        const { filters, toggleType } = useListingSearch()
        toggleType('villa')
        expect(filters.propertyType).toBe('')
    })
})
