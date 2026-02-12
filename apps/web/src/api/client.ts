import axios, { type AxiosInstance } from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Important: send cookies with requests
    })

    // Response interceptor - handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        // If 401, let the calling code handle it — don't force a redirect
        // This prevents infinite reload loops when unauthenticated users
        // visit public pages that attempt to fetch the current user.
        return Promise.reject(error)
      }
    )
  }

  // Auth endpoints
  async register(data: { email: string; password: string; firstName?: string; lastName?: string }) {
    return this.client.post('/auth/register', data)
  }

  async login(data: { email: string; password: string }) {
    return this.client.post('/auth/login', data)
  }

  async logout() {
    return this.client.post('/auth/logout')
  }

  async getCurrentUser() {
    return this.client.get('/auth/me')
  }

  // User endpoints
  async getUserProfile() {
    return this.client.get('/users/me')
  }

  async updateProfile(data: any) {
    return this.client.put('/users/me', data)
  }

  async getUserStats() {
    return this.client.get('/users/me/stats')
  }

  // Listing endpoints
  async searchListings(params: any) {
    return this.client.get('/listings/search', { params })
  }

  async getListingById(id: string) {
    return this.client.get(`/listings/${id}`)
  }

  async createListing(data: any) {
    return this.client.post('/listings', data)
  }

  async updateListing(id: string, data: any) {
    return this.client.put(`/listings/${id}`, data)
  }

  async deleteListing(id: string) {
    return this.client.delete(`/listings/${id}`)
  }

  async getMyListings() {
    return this.client.get('/listings/my-listings')
  }

  async publishListing(id: string) {
    return this.client.post(`/listings/${id}/publish`)
  }

  // Booking endpoints
  async createBooking(data: any) {
    return this.client.post('/bookings', data)
  }

  async getMyBookings() {
    return this.client.get('/bookings/my-bookings')
  }

  async getHostBookings() {
    return this.client.get('/bookings/host-bookings')
  }

  async getBookingById(id: string) {
    return this.client.get(`/bookings/${id}`)
  }

  async cancelBooking(id: string, reason: string) {
    return this.client.put(`/bookings/${id}/cancel`, { cancellationReason: reason })
  }

  async confirmBooking(id: string) {
    return this.client.put(`/bookings/${id}/confirm`)
  }

  // Favorites endpoints
  async getFavorites() {
    return this.client.get('/favorites')
  }

  async addFavorite(listingId: string) {
    return this.client.post('/favorites', { listingId })
  }

  async removeFavorite(favoriteId: string) {
    return this.client.delete(`/favorites/${favoriteId}`)
  }

  async isFavorite(listingId: string) {
    return this.client.get(`/favorites/check/${listingId}`)
  }

  // Reviews endpoints
  async getListingReviews(listingId: string) {
    return this.client.get(`/listings/${listingId}/reviews`)
  }

  async createReview(data: any) {
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
