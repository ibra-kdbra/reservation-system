import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useWishlist } from '@/composables/useWishlist'
import { api } from '@/api/client'

const mockFavorites = [
    { id: 'fav-1', listing: { id: 'listing-1', title: 'Villa', pricePerNight: 200, city: 'Bali', country: 'Indonesia' } },
    { id: 'fav-2', listing: { id: 'listing-2', title: 'Apartment', pricePerNight: 80, city: 'Tokyo', country: 'Japan' } }
]

// api/client is mocked in test/setup.ts
describe('useWishlist', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.mocked(api.getFavorites).mockResolvedValue({ data: { data: mockFavorites } } as any)
        vi.mocked(api.addFavorite).mockResolvedValue({ data: { data: { favoriteId: 'fav-new' } } } as any)
        vi.mocked(api.removeFavorite).mockResolvedValue({ data: { data: null } } as any)
    })

    it('starts with empty favorites and loading true', () => {
        const { favorites, loading } = useWishlist()
        expect(favorites.value).toHaveLength(0)
        expect(loading.value).toBe(true)
    })

    it('fetches favorites and sets loading to false', async () => {
        const { favorites, loading, fetchWishlist } = useWishlist()
        await fetchWishlist()
        expect(favorites.value).toHaveLength(2)
        expect(loading.value).toBe(false)
    })

    it('isInWishlist returns true for a favorited listing', async () => {
        const { fetchWishlist, isInWishlist } = useWishlist()
        await fetchWishlist()
        expect(isInWishlist('listing-1')).toBe(true)
    })

    it('isInWishlist returns false for an unfavorited listing', async () => {
        const { fetchWishlist, isInWishlist } = useWishlist()
        await fetchWishlist()
        expect(isInWishlist('listing-999')).toBe(false)
    })

    it('removeFavorite removes item from local list without re-fetch', async () => {
        const { favorites, fetchWishlist, removeFavorite } = useWishlist()
        await fetchWishlist()
        expect(favorites.value).toHaveLength(2)
        await removeFavorite('fav-1')
        expect(favorites.value).toHaveLength(1)
        expect(favorites.value[0]?.id).toBe('fav-2')
    })

    it('toggleWishlist calls addFavorite for unlisted listing', async () => {
        vi.mocked(api.getFavorites).mockResolvedValueOnce({ data: { data: [] } } as any)
        const { fetchWishlist, toggleWishlist } = useWishlist()
        await fetchWishlist()
        await toggleWishlist('listing-new')
        expect(api.addFavorite).toHaveBeenCalledWith('listing-new')
    })

    it('toggleWishlist calls removeFavorite for already-favorited listing', async () => {
        const { fetchWishlist, toggleWishlist } = useWishlist()
        await fetchWishlist()
        await toggleWishlist('listing-1')
        expect(api.removeFavorite).toHaveBeenCalledWith('fav-1')
    })
})

