<template>
  <nav class="navbar glass" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner container">
      <!-- Brand -->
      <router-link to="/" class="brand">
        <svg class="brand-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-6h6v6" />
          <path d="M3 11l9-5 9 5" />
          <path d="M6 15l6-3 6 3" />
        </svg>
        <span class="brand-text">NestAsia</span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="nav-links hide-mobile">
        <router-link to="/" class="nav-link" active-class="active" exact>Home</router-link>
        <router-link to="/listings/search" class="nav-link" active-class="active">Explore</router-link>
        <router-link v-if="authStore.isAuthenticated" to="/bookings" class="nav-link" active-class="active">My
          Bookings</router-link>
      </div>

      <!-- Auth / User Section -->
      <div class="nav-actions">
        <CurrencySelector class="hide-mobile" />
        <template v-if="authStore.isAuthenticated">
          <div class="user-menu" @click="toggleDropdown" ref="dropdownRef">
            <img :src="authStore.user?.avatar || defaultAvatar" alt="Avatar" class="user-avatar" />
            <span class="user-name hide-mobile">{{ authStore.user?.firstName || 'User' }}</span>
            <svg class="chevron" :class="{ open: showDropdown }" width="16" height="16" viewBox="0 0 16 16"
              fill="currentColor">
              <path
                d="M4.427 5.427a.75.75 0 011.06-.014L8 7.773l2.513-2.36a.75.75 0 111.027 1.093l-3 2.817a.75.75 0 01-1.027 0l-3-2.817a.75.75 0 01-.086-1.08z" />
            </svg>

            <!-- Dropdown -->
            <Transition name="dropdown">
              <div v-if="showDropdown" class="dropdown-menu">
                <router-link to="/profile" class="dropdown-item" @click="showDropdown = false">
                  <span>👤</span> My Profile
                </router-link>
                <router-link to="/bookings" class="dropdown-item" @click="showDropdown = false">
                  <span>📅</span> My Bookings
                </router-link>
                <router-link to="/wishlist" class="dropdown-item" @click="showDropdown = false">
                  <span>❤️</span> Wishlist
                </router-link>
                <router-link v-if="authStore.user?.role === 'HOST'" to="/host/dashboard" class="dropdown-item"
                  @click="showDropdown = false">
                  <span>📊</span> Host Dashboard
                </router-link>
                <router-link v-if="authStore.user?.role === 'ADMIN'" to="/admin" class="dropdown-item"
                  @click="showDropdown = false">
                  <span>🛡️</span> Admin Dashboard
                </router-link>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item logout" @click="handleLogout">
                  <span>🚪</span> Log Out
                </button>
              </div>
            </Transition>
          </div>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost btn-sm">Log In</router-link>
          <router-link to="/register" class="btn btn-primary btn-sm">Sign Up</router-link>
        </template>

        <!-- Mobile Menu Toggle -->
        <button class="mobile-toggle" @click="showMobileMenu = !showMobileMenu" aria-label="Menu">
          <span class="hamburger" :class="{ open: showMobileMenu }">
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div v-if="showMobileMenu" class="mobile-menu">
        <router-link to="/" class="mobile-link" @click="showMobileMenu = false">Home</router-link>
        <router-link to="/listings/search" class="mobile-link" @click="showMobileMenu = false">Explore</router-link>
        <template v-if="authStore.isAuthenticated">
          <router-link to="/bookings" class="mobile-link" @click="showMobileMenu = false">My Bookings</router-link>
          <router-link to="/wishlist" class="mobile-link" @click="showMobileMenu = false">Wishlist</router-link>
          <router-link v-if="authStore.user?.role === 'HOST'" to="/host/dashboard" class="mobile-link"
            @click="showMobileMenu = false">Host
            Dashboard</router-link>
          <router-link v-if="authStore.user?.role === 'ADMIN'" to="/admin" class="mobile-link"
            @click="showMobileMenu = false">Admin
            Dashboard</router-link>
          <router-link to="/profile" class="mobile-link" @click="showMobileMenu = false">Profile</router-link>
          <button class="mobile-link logout" @click="handleLogout">Log Out</button>
        </template>
        <template v-else>
          <router-link to="/login" class="mobile-link" @click="showMobileMenu = false">Log In</router-link>
          <router-link to="/register" class="mobile-link" @click="showMobileMenu = false">Sign Up</router-link>
        </template>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import CurrencySelector from '@/components/ui/CurrencySelector.vue'

const router = useRouter()
const authStore = useAuthStore()

const isScrolled = ref(false)
const showDropdown = ref(false)
const showMobileMenu = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)
const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function handleClickOutside(e: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    showDropdown.value = false
  }
}

async function handleLogout() {
  showDropdown.value = false
  showMobileMenu.value = false
  await authStore.logout()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--navbar-height);
  transition: all var(--transition-base);
}

.navbar.scrolled {
  box-shadow: var(--shadow-lg);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: 800;
  font-size: var(--font-size-xl);
  letter-spacing: -0.02em;
}

.brand-icon {
  color: var(--color-primary-500);
  flex-shrink: 0;
}

.brand-text {
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-secondary-500));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.nav-link {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-lg);
  font-weight: 500;
  font-size: var(--font-size-sm);
  color: var(--color-gray-600);
  transition: all var(--transition-fast);
  text-decoration: none;
}

.nav-link:hover {
  color: var(--color-gray-900);
  background: var(--color-gray-100);
}

.nav-link.active {
  color: var(--color-primary-600);
  background: var(--color-primary-50);
}

/* Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

/* User Menu */
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-full);
  border: 2px solid var(--color-gray-200);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.user-menu:hover {
  border-color: var(--color-gray-300);
  box-shadow: var(--shadow-md);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.user-name {
  font-weight: 600;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
}

.chevron {
  color: var(--color-gray-400);
  transition: transform var(--transition-fast);
}

.chevron.open {
  transform: rotate(180deg);
}

/* Dropdown */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 200px;
  background: white;
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--color-gray-100);
  padding: var(--spacing-sm);
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0.625rem var(--spacing-md);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);
  text-decoration: none;
  transition: all var(--transition-fast);
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.dropdown-item:hover {
  background: var(--color-gray-50);
  color: var(--color-gray-900);
}

.dropdown-item.logout:hover {
  background: var(--color-error-light);
  color: var(--color-error);
}

.dropdown-divider {
  height: 1px;
  background: var(--color-gray-100);
  margin: var(--spacing-xs) 0;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--transition-fast);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  padding: var(--spacing-sm);
}

.hamburger {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 20px;
}

.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background: var(--color-gray-700);
  border-radius: 2px;
  transition: all var(--transition-fast);
}

.hamburger.open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: white;
  border-top: 1px solid var(--color-gray-100);
  padding: var(--spacing-md);
  box-shadow: var(--shadow-lg);
}

.mobile-link {
  display: block;
  padding: 0.75rem var(--spacing-md);
  border-radius: var(--radius-lg);
  font-weight: 500;
  color: var(--color-gray-700);
  text-decoration: none;
  transition: all var(--transition-fast);
  border: none;
  background: none;
  cursor: pointer;
  font-family: inherit;
  font-size: var(--font-size-base);
  text-align: left;
  width: 100%;
}

.mobile-link:hover {
  background: var(--color-gray-50);
}

.mobile-link.logout {
  color: var(--color-error);
}

/* Mobile Menu Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--transition-base);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 768px) {
  .mobile-toggle {
    display: block;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>
