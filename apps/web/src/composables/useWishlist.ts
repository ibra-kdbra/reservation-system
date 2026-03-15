import { ref } from 'vue'
import { api } from '@/api/client'
import { useCurrencyStore } from '@/stores/currency'
import type { Listing } from '@/types'

export function useWishlist() {
    const currencyStore = useCurrencyStore()
    const favorites = ref<{ id: string; listing: Listing }[]>([])
    const loading = ref(true)

    async function fetchWishlist() {
        loading.value = true
        try {
            const { data: wrapper } = await api.getFavorites()
            favorites.value = wrapper.data
        } catch (error) {
            console.error('Failed to fetch wishlist:', error)
        } finally {
            loading.value = false
        }
    }

    async function toggleWishlist(listingId: string) {
        try {
            // Check if already in favorites to decide whether to add or remove
            const existing = favorites.value.find(f => f.listing.id === listingId)
            if (existing) {
                await api.removeFavorite(existing.id)
            } else {
                await api.addFavorite(listingId)
            }
            await fetchWishlist()
        } catch (error) {
            console.error('Failed to toggle wishlist:', error)
        }
    }

    async function removeFavorite(favoriteId: string) {
        try {
            await api.removeFavorite(favoriteId)
            favorites.value = favorites.value.filter(f => f.id !== favoriteId)
        } catch (error) {
            console.error('Failed to remove favorite:', error)
        }
    }

    function isInWishlist(listingId: string) {
        return favorites.value.some(f => f.listing.id === listingId)
    }

    return {
        favorites,
        loading,
        fetchWishlist,
        toggleWishlist,
        removeFavorite,
        isInWishlist,
        formatPrice: currencyStore.format
    }
}
