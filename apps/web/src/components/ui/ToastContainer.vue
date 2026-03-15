<template>
  <Teleport to="body">
    <div class="toast-container" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="toast.type"
          @click="remove(toast.id)"
        >
          <div class="toast-icon">
            <CheckCircle2 v-if="toast.type === 'success'" class="w-4 h-4" />
            <XCircle v-else-if="toast.type === 'error'" class="w-4 h-4" />
            <AlertTriangle v-else-if="toast.type === 'warning'" class="w-4 h-4" />
            <Info v-else class="w-4 h-4" />
          </div>
          <div class="toast-content">
            <p class="toast-message">{{ toast.message }}</p>
          </div>
          <button class="toast-close" @click.stop="remove(toast.id)">×</button>
          <div
            class="toast-progress"
            :style="{ animationDuration: toast.duration + 'ms' }"
          ></div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info
} from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: calc(var(--navbar-height, 72px) + 16px);
  right: 16px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 380px;
  width: 100%;
  pointer-events: none;
}

.toast-item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--radius-xl);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  cursor: pointer;
  pointer-events: all;
  font-family: var(--font-sans);
}

.toast-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.toast-item.success .toast-icon {
  background: var(--color-success-light);
  color: var(--color-success);
}
.toast-item.error .toast-icon {
  background: var(--color-error-light);
  color: var(--color-error);
}
.toast-item.warning .toast-icon {
  background: var(--color-warning-light);
  color: var(--color-warning);
}
.toast-item.info .toast-icon {
  background: var(--color-info-light);
  color: var(--color-info);
}

.toast-content {
  flex: 1;
  min-width: 0;
}

.toast-message {
  margin: 0;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-gray-800);
  line-height: 1.5;
}

.toast-close {
  flex-shrink: 0;
  background: none;
  border: none;
  font-size: 18px;
  color: var(--color-gray-400);
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}
.toast-close:hover {
  color: var(--color-gray-700);
}

/* Progress bar */
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
  animation: toast-shrink linear forwards;
}

.toast-item.success .toast-progress { background: var(--color-success); }
.toast-item.error .toast-progress { background: var(--color-error); }
.toast-item.warning .toast-progress { background: var(--color-warning); }
.toast-item.info .toast-progress { background: var(--color-info); }

@keyframes toast-shrink {
  from { width: 100%; }
  to { width: 0%; }
}

/* Transition animations */
.toast-enter-active {
  animation: toast-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  animation: toast-out 0.3s ease-in forwards;
}
.toast-move {
  transition: transform 0.3s ease;
}

@keyframes toast-in {
  0% {
    opacity: 0;
    transform: translateX(80px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

@keyframes toast-out {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
    max-height: 100px;
  }
  100% {
    opacity: 0;
    transform: translateX(80px) scale(0.8);
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}
</style>
