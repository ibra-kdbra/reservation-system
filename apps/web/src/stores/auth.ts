import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '@/api/client'

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  avatar?: string
  role: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  async function login(email: string, password: string) {
    isLoading.value = true
    try {
      const { data } = await api.login({ email, password })
      user.value = data.data.user
      return data.data
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: {
    email: string
    password: string
    firstName?: string
    lastName?: string
  }) {
    isLoading.value = true
    try {
      const { data } = await api.register(userData)
      user.value = data.data.user
      return data.data
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await api.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      user.value = null
    }
  }

  async function fetchCurrentUser() {
    try {
      const { data } = await api.getCurrentUser()
      user.value = data.data
    } catch {
      // Not authenticated — this is expected for guests
      user.value = null
    }
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    fetchCurrentUser,
  }
})
