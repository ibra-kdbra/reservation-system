<template>
  <div class="profile-page">
    <div class="container">
      <!-- Header -->
      <div class="profile-header">
        <div class="avatar-section">
          <img :src="user?.avatar || defaultAvatar" alt="Avatar" class="profile-avatar" />
          <div>
            <h1>{{ user?.firstName }} {{ user?.lastName }}</h1>
            <p class="text-gray-500">{{ user?.email }}</p>
            <span class="badge badge-primary mt-xs">{{ user?.role || 'USER' }}</span>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <Calendar class="w-6 h-6 vibrant-icon icon-vibrant-calendar" />
          </div>
          <div class="stat-value">{{ stats.totalBookings || 0 }}</div>
          <div class="stat-label">Bookings</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <Star class="w-6 h-6 vibrant-icon icon-vibrant-star" />
          </div>
          <div class="stat-value">{{ stats.reviewsGiven || 0 }}</div>
          <div class="stat-label">Reviews</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <Home class="w-6 h-6 vibrant-icon icon-vibrant-home" />
          </div>
          <div class="stat-value">{{ stats.listings || 0 }}</div>
          <div class="stat-label">Listings</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">
            <CalendarDays class="w-6 h-6 vibrant-icon icon-vibrant-success" />
          </div>
          <div class="stat-value">{{ memberSince }}</div>
          <div class="stat-label">Member Since</div>
        </div>
      </div>

      <!-- Settings -->
      <div class="settings-section">
        <h2>Profile Settings</h2>

        <form @submit.prevent="updateProfile" class="settings-form">
          <div class="form-row">
            <div class="form-group">
              <label>First Name</label>
              <input v-model="form.firstName" class="form-input" type="text" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input v-model="form.lastName" class="form-input" type="text" />
            </div>
          </div>

          <div class="form-group">
            <label>Bio</label>
            <textarea v-model="form.bio" class="form-input textarea" rows="3" placeholder="Tell us about yourself..."></textarea>
          </div>

          <div class="form-group">
            <label>Phone</label>
            <input v-model="form.phone" class="form-input" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div v-if="updateSuccess" class="alert alert-success">Profile updated successfully!</div>
          <div v-if="updateError" class="alert alert-error">{{ updateError }}</div>

          <button type="submit" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Calendar, Star, Home, CalendarDays } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/api/client'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'

const stats = ref({ totalBookings: 0, reviewsGiven: 0, listings: 0 })
const saving = ref(false)
const updateSuccess = ref(false)
const updateError = ref('')

const form = ref({
  firstName: '',
  lastName: '',
  bio: '',
  phone: '',
})

const memberSince = computed(() => {
  if (!user.value) return '—'
  return new Date().getFullYear().toString()
})

onMounted(async () => {
  if (user.value) {
    form.value.firstName = (user.value as any).firstName || ''
    form.value.lastName = (user.value as any).lastName || ''
    form.value.bio = (user.value as any).bio || ''
    form.value.phone = (user.value as any).phone || ''
  }

  try {
    const { data: wrapper } = await api.getUserStats()
    stats.value = wrapper.data
  } catch {
    // Stats not available
  }
})

async function updateProfile() {
  saving.value = true
  updateSuccess.value = false
  updateError.value = ''

  try {
    await api.updateProfile(form.value)
    updateSuccess.value = true
    setTimeout(() => (updateSuccess.value = false), 3000)
  } catch (err: any) {
    updateError.value = err.response?.data?.message || 'Failed to update profile'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.profile-page { padding: var(--spacing-xl) 0; }

.profile-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-2xl); }

.avatar-section { display: flex; align-items: center; gap: var(--spacing-lg); }
.profile-avatar { width: 80px; height: 80px; border-radius: var(--radius-full); object-fit: cover; border: 4px solid white; box-shadow: var(--shadow-lg); }
.avatar-section h1 { font-size: var(--font-size-2xl); margin-bottom: 0.125rem; }

.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-md); margin-bottom: var(--spacing-2xl); }
.stat-card { background: white; border-radius: var(--radius-xl); padding: var(--spacing-lg); text-align: center; box-shadow: var(--shadow-sm); border: 1px solid var(--color-gray-100); transition: all var(--transition-base); }
.stat-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.stat-icon { font-size: 1.5rem; margin-bottom: var(--spacing-sm); }
.stat-value { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-gray-900); }
.stat-label { font-size: var(--font-size-xs); color: var(--color-gray-500); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-top: 0.25rem; }

.settings-section { background: white; border-radius: var(--radius-xl); padding: var(--spacing-2xl); box-shadow: var(--shadow-md); border: 1px solid var(--color-gray-100); }
.settings-section h2 { margin-bottom: var(--spacing-xl); font-size: var(--font-size-xl); }

.settings-form { max-width: 600px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); }

.textarea { resize: vertical; min-height: 80px; }

.alert { padding: var(--spacing-sm) var(--spacing-md); border-radius: var(--radius-lg); font-size: var(--font-size-sm); margin-bottom: var(--spacing-lg); }
.alert-success { background: var(--color-success-light); color: #065f46; }
.alert-error { background: var(--color-error-light); color: #991b1b; }

@media (max-width: 768px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
  .form-row { grid-template-columns: 1fr; }
}
</style>
