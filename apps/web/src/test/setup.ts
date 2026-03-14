import { vi } from 'vitest'

// Mock Vue Router
vi.mock('vue-router', () => ({
    useRoute: vi.fn(() => ({
        query: {},
        params: {}
    })),
    useRouter: vi.fn(() => ({
        push: vi.fn(),
        back: vi.fn()
    }))
}))

// Mock Pinia stores
vi.mock('@/stores/currency', () => ({
    useCurrencyStore: vi.fn(() => ({
        format: (amount: number) => `$${amount.toFixed(0)}`,
        convert: (amount: number) => amount,
        selectedCode: 'USD'
    }))
}))

// Mock api/client
vi.mock('@/api/client', () => ({
    api: {
        searchListings: vi.fn(),
        getFavorites: vi.fn(),
        addFavorite: vi.fn(),
        removeFavorite: vi.fn(),
        createBooking: vi.fn(),
        getListingById: vi.fn()
    }
}))
