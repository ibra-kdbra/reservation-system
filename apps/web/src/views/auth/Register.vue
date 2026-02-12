<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Left: Brand Panel -->
      <div class="auth-brand">
        <div class="brand-content">
          <h1>Join NestAsia</h1>
          <p>Create an account to start booking unique stays and experiences around the world.</p>
          <div class="brand-features">
            <div class="feature">🌍 <span>Access 10,000+ listings worldwide</span></div>
            <div class="feature">💰 <span>Best price guarantee</span></div>
            <div class="feature">🏆 <span>Trusted by millions</span></div>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="auth-form-panel">
        <div class="auth-card">
          <h2>Create Account</h2>
          <p class="auth-subtitle">Fill in your details to get started</p>

          <form @submit.prevent="handleRegister">
            <div class="name-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input id="firstName" v-model="firstName" type="text" required placeholder="John" class="form-input" />
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input id="lastName" v-model="lastName" type="text" required placeholder="Doe" class="form-input" />
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input id="email" v-model="email" type="email" required placeholder="your@email.com" class="form-input" />
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                placeholder="Minimum 8 characters" class="form-input" minlength="8" />
              <!-- Strength Indicator -->
              <div class="password-strength mt-sm">
                <div class="strength-bars">
                  <div class="bar" :class="strengthClass(1)"></div>
                  <div class="bar" :class="strengthClass(2)"></div>
                  <div class="bar" :class="strengthClass(3)"></div>
                  <div class="bar" :class="strengthClass(4)"></div>
                </div>
                <span class="strength-label text-xs" :class="'text-' + strengthColor">
                  {{ strengthLabel }}
                </span>
              </div>
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="agreeTerms" required />
                <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
              </label>
            </div>

            <div v-if="error" class="alert alert-error">
              {{ error }}
            </div>

            <MagneticButton variant="primary" size="lg" :loading="loading" :disabled="loading || !agreeTerms"
              @click="handleRegister" style="width: 100%;">
              {{ loading ? 'Creating account...' : 'Create Account' }}
            </MagneticButton>
          </form>

          <div class="auth-divider">
            <span>or sign up with</span>
          </div>

          <div class="social-buttons">
            <button class="btn btn-secondary social-btn"><span>G</span> Google</button>
            <button class="btn btn-secondary social-btn"><span>🍎</span> Apple</button>
          </div>

          <p class="auth-switch">
            Already have an account?
            <router-link to="/login">Log in</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useToast } from '../../composables/useToast'
import MagneticButton from '../../components/ui/MagneticButton.vue'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const agreeTerms = ref(false)
const loading = ref(false)
const error = ref('')

const passwordStrength = computed(() => {
  const p = password.value
  if (!p) return 0
  let score = 0
  if (p.length >= 8) score++
  if (/[A-Z]/.test(p)) score++
  if (/[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})

const strengthLabel = computed(() => {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[passwordStrength.value]
})

const strengthColor = computed(() => {
  const colors = ['', 'error', 'warning', 'primary', 'success']
  return colors[passwordStrength.value]
})

function strengthClass(level: number) {
  if (passwordStrength.value >= level) {
    return 'active ' + strengthColor.value
  }
  return ''
}

async function handleRegister() {
  loading.value = true
  error.value = ''

  try {
    await authStore.register({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    })
    toast.success('Account created! Welcome to NestAsia 🎉')
    router.push('/')
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
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

.auth-brand {
  flex: 1;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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

.auth-form-panel {
  flex: 1;
  padding: var(--spacing-2xl);
  display: flex;
  align-items: center;
  overflow-y: auto;
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

.name-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.password-strength {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.strength-bars {
  display: flex;
  gap: 4px;
  flex: 1;
}

.bar {
  height: 4px;
  flex: 1;
  background: var(--color-gray-200);
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.bar.active.error {
  background: var(--color-error);
}

.bar.active.warning {
  background: var(--color-warning);
}

.bar.active.primary {
  background: var(--color-primary-500);
}

.bar.active.success {
  background: var(--color-success);
}

.strength-label {
  font-weight: 600;
  min-width: 45px;
}

.checkbox-group {
  margin-bottom: var(--spacing-lg);
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  cursor: pointer;
}

.checkbox-label input {
  margin-top: 3px;
}

.checkbox-label a {
  color: var(--color-primary-600);
  font-weight: 600;
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

  .name-row {
    grid-template-columns: 1fr;
  }
}
</style>
