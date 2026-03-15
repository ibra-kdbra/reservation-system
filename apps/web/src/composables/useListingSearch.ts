import { ref, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '@/api/client'
import type { Listing } from '@/types'

export interface SearchFiltersData {
    city: string
    checkIn: string
    checkOut: string
    guests: number
    propertyType: string
    minPrice: number | null
    maxPrice: number | null
    amenities: string[]
}

export function useListingSearch() {
    const route = useRoute()
    const router = useRouter()

    const loading = ref(true)
    const listings = ref<Listing[]>([])

    // Filters state
    const filters = reactive<SearchFiltersData>({
        city: (route.query.city as string) || '',
        checkIn: (route.query.checkIn as string) || '',
        checkOut: (route.query.checkOut as string) || '',
        guests: Number(route.query.guests) || 1,
        propertyType: (route.query.propertyType as string) || '',
        minPrice: route.query.minPrice ? Number(route.query.minPrice) : null,
        maxPrice: route.query.maxPrice ? Number(route.query.maxPrice) : null,
        amenities: Array.isArray(route.query.amenities) 
            ? (route.query.amenities as string[]) 
            : route.query.amenities 
                ? [route.query.amenities as string] 
                : [],
    })

    // Fetch listings from API
    async function fetchListings() {
        loading.value = true
        try {
            const params: any = {
                limit: 20,
                offset: 0,
                guests: filters.guests
            }

            if (filters.city) params.city = filters.city
            if (filters.checkIn) params.checkIn = filters.checkIn
            if (filters.checkOut) params.checkOut = filters.checkOut
            if (filters.propertyType) params.propertyType = filters.propertyType
            
            if (filters.minPrice !== null && filters.minPrice !== undefined) {
                params.minPrice = filters.minPrice
            }
            if (filters.maxPrice !== null && filters.maxPrice !== undefined) {
                params.maxPrice = filters.maxPrice
            }
            if (filters.amenities && filters.amenities.length > 0) {
                params.amenities = filters.amenities
            }

            const { data: wrapper } = await api.searchListings(params)
            listings.value = wrapper.data.listings || []
        } catch (err) {
            console.error('Search failed', err)
        } finally {
            loading.value = false
        }
    }

    // Sync state with URL
    watch(() => route.query, (newQuery) => {
        filters.city = (newQuery.city as string) || ''
        filters.checkIn = (newQuery.checkIn as string) || ''
        filters.checkOut = (newQuery.checkOut as string) || ''
        filters.guests = Number(newQuery.guests) || 1
        filters.propertyType = (newQuery.propertyType as string) || ''
        filters.minPrice = newQuery.minPrice ? Number(newQuery.minPrice) : null
        filters.maxPrice = newQuery.maxPrice ? Number(newQuery.maxPrice) : null

        // Handle amenities (can be string or array of strings)
        if (newQuery.amenities) {
            filters.amenities = Array.isArray(newQuery.amenities)
                ? (newQuery.amenities as string[])
                : [newQuery.amenities as string]
        } else {
            filters.amenities = []
        }

        fetchListings()
    })

    // Actions
    function refreshSearch() {
        const query: any = { ...route.query }

        if (filters.city) query.city = filters.city
        else delete query.city

        if (filters.checkIn) query.checkIn = filters.checkIn
        else delete query.checkIn

        if (filters.checkOut) query.checkOut = filters.checkOut
        else delete query.checkOut

        if (filters.guests > 1) query.guests = filters.guests
        else delete query.guests

        if (filters.propertyType) query.propertyType = filters.propertyType
        else delete query.propertyType

        if (filters.minPrice) query.minPrice = filters.minPrice
        else delete query.minPrice

        if (filters.maxPrice) query.maxPrice = filters.maxPrice
        else delete query.maxPrice

        if (filters.amenities && filters.amenities.length > 0) query.amenities = filters.amenities
        else delete query.amenities

        router.push({ query })
    }

    function toggleType(type: string) {
        if (filters.propertyType === type) {
            filters.propertyType = ''
        } else {
            filters.propertyType = type
        }
        refreshSearch() // Reuse refreshSearch to handle all sync
    }

    function clearFilters() {
        filters.city = ''
        filters.checkIn = ''
        filters.checkOut = ''
        filters.guests = 1
        filters.propertyType = ''
        filters.minPrice = null
        filters.maxPrice = null
        filters.amenities = []
        router.push({ query: {} })
    }

    onMounted(() => {
        // Initial parse of amenities from URL if needed (though watch might trigger, better safe)
        if (route.query.amenities) {
            filters.amenities = Array.isArray(route.query.amenities)
                ? (route.query.amenities as string[])
                : [route.query.amenities as string]
        }
        fetchListings()
    })

    return {
        loading,
        listings,
        filters,
        refreshSearch,
        toggleType,
        clearFilters,
        fetchListings
    }
}
