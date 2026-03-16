<template>
  <div class="app-root">
    <Navbar />
    <div class="page-content">
      <router-view v-slot="{ Component, route }">
        <Transition :name="transitionName" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </router-view>
    </div>
    <Footer />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import ToastContainer from './components/ui/ToastContainer.vue'

const authStore = useAuthStore()
const transitionName = ref('page-slide-right')

const router = useRouter()

// Directional transitions based on route depth
router.beforeEach((to, from) => {
  const toDepth = to.path.split('/').filter(Boolean).length
  const fromDepth = from.path.split('/').filter(Boolean).length
  transitionName.value = toDepth >= fromDepth ? 'page-slide-right' : 'page-slide-left'
})

onMounted(async () => {
  await authStore.fetchCurrentUser()
})
</script>

<style>
.app-root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
}

/* ===== Enhanced Page Transitions ===== */

/* Slide Right (deeper navigation) */
.page-slide-right-enter-active {
  animation: page-in-right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-slide-right-leave-active {
  animation: page-out-left 0.25s ease-in;
}

/* Slide Left (back navigation) */
.page-slide-left-enter-active {
  animation: page-in-left 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-slide-left-leave-active {
  animation: page-out-right 0.25s ease-in;
}

@keyframes page-in-right {
  0% {
    opacity: 0;
    transform: translateX(30px) scale(0.98);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes page-out-left {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateX(-20px) scale(0.98);
  }
}

@keyframes page-in-left {
  0% {
    opacity: 0;
    transform: translateX(-30px) scale(0.98);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes page-out-right {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  100% {
    opacity: 0;
    transform: translateX(20px) scale(0.98);
  }
}
</style>
