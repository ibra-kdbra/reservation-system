export interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    avatar?: string
    bio?: string
    phone?: string
    role: 'USER' | 'ADMIN'
    createdAt: string
    updatedAt: string
}

export interface Amenity {
    id: string
    name: string
    icon?: string
}

export interface ListingAmenity {
    amenity: Amenity
}

export interface Listing {
    id: string
    title: string
    description: string
    pricePerNight: number
    address: string
    city: string
    country: string
    zipCode: string
    latitude: number
    longitude: number
    propertyType: string
    maxGuests: number
    bedrooms: number
    bathrooms: number
    beds: number
    cleaningFee: number
    serviceFee: number
    images: string[]
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
    publishedAt?: string
    instantBook: boolean
    hostId: string
    host: Partial<User>
    amenities: ListingAmenity[]
    reviews?: Review[]
    averageRating?: number
    reviewCount?: number
    viewCount?: number
    createdAt: string
    updatedAt: string
}

export interface Booking {
    id: string
    listingId: string
    guestId: string
    checkIn: string
    checkOut: string
    adults: number
    children: number
    totalPrice: number
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
    specialRequests?: string
    listing?: Partial<Listing>
    guest?: Partial<User>
    createdAt: string
    updatedAt: string
}

export interface Review {
    id: string
    listingId: string
    authorId: string
    rating: number
    content: string
    author: Partial<User>
    createdAt: string
    updatedAt: string
}

export interface PaginatedResponse<T> {
    listings?: T[] // Some endpoints return 'listings' key
    data?: T[] // Others use 'data'
    items?: T[]
    total: number
    limit: number
    offset: number
    hasMore: boolean
}

export interface ApiResponse<T> {
    data: T
    message?: string
}
