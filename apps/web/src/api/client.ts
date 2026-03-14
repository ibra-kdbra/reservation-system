import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import type { 
    User, Listing, Booking, Review, 
    PaginatedResponse, ApiResponse 
} from '@/types'
import { useToast } from '@/composables/useToast'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

// Augment AxiosRequestConfig to include our custom property
declare module 'axios' {
  export interface AxiosRequestConfig {
    skipToast?: boolean
  }
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    const toast = useToast()

    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const skipToast = error.config?.skipToast

        if (!skipToast) {
          const message = this.extractErrorMessage(error)
          toast.error(message)
        }

        // If 401, let the calling code handle it — don't force a redirect
        return Promise.reject(error)
      }
    )
  }

  private extractErrorMessage(error: any): string {
    if (axios.isAxiosError(error)) {
      // NestJS typically returns errors in { message: string | string[] } or { data: { message: ... } }
      const response = error.response
      const data = response?.data as any

      if (data?.message) {
        if (Array.isArray(data.message)) {
          return data.message[0] // Return first validation error
        }
        return data.message
      }

      if (response?.status === 404) return 'Resource not found'
      if (response?.status === 401) return 'Session expired. Please log in again.'
      if (response?.status === 403) return 'You do not have permission to perform this action'
      if (response?.status === 500) return 'Internal server error. Please try again later.'
    }
    
    return error.message || 'An unexpected error occurred'
  }

  // Auth endpoints
  async register(data: { email: string; password: string; firstName?: string; lastName?: string }): Promise<AxiosResponse<ApiResponse<{ user: User }>>> {
    return this.client.post('/auth/register', data)
  }

  async login(data: { email: string; password: string }): Promise<AxiosResponse<ApiResponse<{ user: User }>>> {
    return this.client.post('/auth/login', data)
  }

  async logout(): Promise<AxiosResponse<ApiResponse<null>>> {
    return this.client.post('/auth/logout')
  }

  async getCurrentUser(): Promise<AxiosResponse<ApiResponse<User>>> {
    return this.client.get('/auth/me')
  }

  // User endpoints
  async getUserProfile(): Promise<AxiosResponse<User>> {
    return this.client.get('/users/me')
  }

  async updateProfile(data: Partial<User>): Promise<AxiosResponse<User>> {
    return this.client.put('/users/me', data)
  }

  async getUserStats(): Promise<AxiosResponse<any>> { // Stats shape varies, keeping any for now or define a UserStats interface
    return this.client.get('/users/me/stats')
  }

  // Listing endpoints
  async searchListings(params: Record<string, any>): Promise<AxiosResponse<PaginatedResponse<Listing>>> {
    return this.client.get('/listings/search', { params })
  }

  async getListingById(id: string): Promise<AxiosResponse<Listing>> {
    return this.client.get(`/listings/${id}`)
  }

  async createListing(data: Partial<Listing>): Promise<AxiosResponse<Listing>> {
    return this.client.post('/listings', data)
  }

  async updateListing(id: string, data: Partial<Listing>): Promise<AxiosResponse<Listing>> {
    return this.client.put(`/listings/${id}`, data)
  }

  async deleteListing(id: string) {
    return this.client.delete(`/listings/${id}`)
  }

  async getMyListings(): Promise<AxiosResponse<Listing[]>> {
    return this.client.get('/listings/my-listings')
  }

  async publishListing(id: string): Promise<AxiosResponse<Listing>> {
    return this.client.post(`/listings/${id}/publish`)
  }

  // Booking endpoints
  async createBooking(data: Partial<Booking>): Promise<AxiosResponse<Booking>> {
    return this.client.post('/bookings', data)
  }

  async getMyBookings(): Promise<AxiosResponse<Booking[]>> {
    return this.client.get('/bookings/my-bookings')
  }

  async getHostBookings(): Promise<AxiosResponse<Booking[]>> {
    return this.client.get('/bookings/host-bookings')
  }

  async getBookingById(id: string): Promise<AxiosResponse<Booking>> {
    return this.client.get(`/bookings/${id}`)
  }

  async cancelBooking(id: string, reason: string) {
    return this.client.put(`/bookings/${id}/cancel`, { cancellationReason: reason })
  }

  async confirmBooking(id: string) {
    return this.client.put(`/bookings/${id}/confirm`)
  }

  // Favorites endpoints
  async getFavorites(): Promise<AxiosResponse<any[]>> { // Favorites return array of objects with id and listing
    return this.client.get('/favorites')
  }

  async addFavorite(listingId: string): Promise<AxiosResponse<ApiResponse<any>>> {
    return this.client.post('/favorites', { listingId })
  }

  async removeFavorite(favoriteId: string): Promise<AxiosResponse<ApiResponse<null>>> {
    return this.client.delete(`/favorites/${favoriteId}`)
  }

  async isFavorite(listingId: string): Promise<AxiosResponse<ApiResponse<{ isFavorite: boolean; favoriteId?: string }>>> {
    return this.client.get(`/favorites/check/${listingId}`)
  }

  // Reviews endpoints
  async getListingReviews(listingId: string): Promise<AxiosResponse<Review[]>> {
    return this.client.get(`/listings/${listingId}/reviews`)
  }

  async createReview(data: Partial<Review>): Promise<AxiosResponse<Review>> {
    return this.client.post('/reviews', data)
  }

  // Admin endpoints
  async getAdminStats() {
    return this.client.get('/admin/stats')
  }

  async getAdminUsers() {
    return this.client.get('/admin/users')
  }

  async getAdminListings() {
    return this.client.get('/admin/listings')
  }

  async banUser(id: string) {
    return this.client.patch(`/admin/users/${id}/ban`)
  }

  async activateUser(id: string) {
    return this.client.patch(`/admin/users/${id}/activate`)
  }

  async approveListing(id: string) {
    return this.client.patch(`/admin/listings/${id}/approve`)
  }

  async rejectListing(id: string) {
    return this.client.patch(`/admin/listings/${id}/reject`)
  }
}

export const api = new ApiClient()
