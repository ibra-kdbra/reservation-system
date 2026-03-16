import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition // back/forward button
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/listings/search',
      name: 'search',
      component: () => import('../views/listings/Search.vue'),
    },
    {
      path: '/listings/:id',
      name: 'listing-detail',
      component: () => import('../views/listings/Detail.vue'),
    },
    {
      path: '/checkout/:listingId',
      name: 'checkout',
      component: () => import('../views/bookings/Checkout.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/bookings',
      name: 'my-bookings',
      component: () => import('../views/bookings/MyBookings.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/bookings/confirmation/:bookingId',
      name: 'booking-confirmation',
      component: () => import('../views/bookings/BookingConfirmation.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile/Profile.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/wishlist/Wishlist.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/host/dashboard',
      name: 'host-dashboard',
      component: () => import('../views/host/HostDashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminDashboard.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/static/About.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/static/Privacy.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/static/Terms.vue'),
    },
    {
      path: '/safety',
      name: 'safety',
      component: () => import('../views/static/Safety.vue'),
    },
    {
      path: '/cancellation',
      name: 'cancellation',
      component: () => import('../views/static/Cancellation.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/static/Contact.vue'),
    },
    {
      path: '/host/landing',
      name: 'host-landing',
      component: () => import('../views/static/HostLanding.vue'),
    },
    {
      path: '/host/resources',
      name: 'host-resources',
      component: () => import('../views/static/Resources.vue'),
    },
    {
      path: '/community',
      name: 'community',
      component: () => import('../views/static/Community.vue'),
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('../views/static/Help.vue'),
    },
  ],
})

// Navigation guards
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Wait for auth to initialize
  if (!authStore.isInitialized) {
    await authStore.fetchCurrentUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.requiresAdmin && authStore.user?.role !== 'ADMIN') {
    next({ name: 'home' })
    return
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
