<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Left: Brand Panel -->
      <div class="auth-brand">
        <div class="brand-content">
          <h1>Welcome Back</h1>
          <p>Log in to manage your bookings, review your stays, and discover new destinations.</p>
          <div class="brand-features">
            <div class="feature">
              <Sparkles class="w-4 h-4 text-yellow-300" />
              <span>Instant booking confirmation</span>
            </div>
            <div class="feature">
              <ShieldCheck class="w-4 h-4 text-green-300" />
              <span>Secure & encrypted</span>
            </div>
            <div class="feature">
              <CreditCard class="w-4 h-4 text-blue-300" />
              <span>Flexible cancellation</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="auth-form-panel">
        <div class="auth-card">
          <h2>Log In</h2>
          <p class="auth-subtitle">Enter your credentials to continue</p>

          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="input-wrap">
                <span class="input-icon">
                  <Mail class="w-4 h-4 text-gray-400" />
                </span>
                <input id="email" v-model="email" type="email" required placeholder="your@email.com"
                  class="form-input with-icon" />
              </div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <div class="input-wrap">
                <span class="input-icon">
                  <Lock class="w-4 h-4 text-gray-400" />
                </span>
                <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                  placeholder="••••••••" class="form-input with-icon" />
                <button type="button" class="toggle-pass" @click="showPassword = !showPassword">
                  <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            <div v-if="error" class="alert alert-error">
              {{ error }}
            </div>

            <MagneticButton variant="primary" size="lg" :loading="loading" :disabled="loading" @click="handleLogin"
              style="width: 100%;">
              {{ loading ? 'Logging in...' : 'Log In' }}
            </MagneticButton>
          </form>

          <div class="auth-divider">
            <span>or continue with</span>
          </div>

          <div class="social-buttons">
            <button class="btn btn-secondary social-btn">
              <Github class="w-4 h-4 mr-2" /> Google
            </button>
            <button class="btn btn-secondary social-btn">
              <Apple class="w-4 h-4 mr-2" /> Apple
            </button>
          </div>

          <p class="auth-switch">
            Don't have an account?
            <router-link to="/register">Sign up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Sparkles,
  ShieldCheck,
  CreditCard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Apple
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import MagneticButton from '@/components/ui/MagneticButton.vue'

const toast = useToast()

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    await authStore.login(email.value, password.value)
    toast.success('Welcome back!')
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-gray-50);
  padding: var(--spacing-lg);
}

.auth-container {
  display: flex;
  width: 100%;
  max-width: 900px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-2xl);
  background: white;
}

/* Brand Panel */
.auth-brand {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: var(--spacing-3xl);
  display: flex;
  align-items: center;
  color: white;
}

.brand-content h1 {
  font-size: var(--font-size-3xl);
  margin-bottom: var(--spacing-md);
}

.brand-content p {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.feature {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  opacity: 0.9;
}

/* Form Panel */
.auth-form-panel {
  flex: 1;
  padding: var(--spacing-3xl);
  display: flex;
  align-items: center;
}

.auth-card {
  width: 100%;
}

.auth-card h2 {
  font-size: var(--font-size-2xl);
  margin-bottom: var(--spacing-xs);
}

.auth-subtitle {
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xl);
}

.input-wrap {
  position: relative;
}

.input-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--font-size-sm);
}

.form-input.with-icon {
  padding-left: 2.75rem;
}

.toggle-pass {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
}

.alert {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-lg);
}

.alert-error {
  background: var(--color-error-light);
  color: #991b1b;
}

.auth-divider {
  text-align: center;
  margin: var(--spacing-xl) 0;
  position: relative;
}

.auth-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-gray-200);
}

.auth-divider span {
  background: white;
  padding: 0 var(--spacing-md);
  position: relative;
  color: var(--color-gray-400);
  font-size: var(--font-size-sm);
}

.social-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-sm);
}

.social-btn {
  font-size: var(--font-size-sm);
}

.auth-switch {
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-gray-500);
  margin-top: var(--spacing-xl);
}

.auth-switch a {
  font-weight: 600;
  color: var(--color-primary-600);
}

@media (max-width: 768px) {
  .auth-brand {
    display: none;
  }

  .auth-container {
    max-width: 440px;
  }
}
</style>
