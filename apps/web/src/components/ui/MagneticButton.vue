<template>
  <button ref="buttonRef" class="magnetic-btn" :class="[variant, size, { loading }]" :disabled="disabled || loading"
    @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove">
    <span class="magnetic-btn-content" :style="contentStyle">
      <span v-if="loading" class="magnetic-btn-spinner"></span>
      <slot v-else />
    </span>
    <!-- Ripple container -->
    <span class="magnetic-btn-ripples">
      <span v-for="ripple in ripples" :key="ripple.id" class="ripple" :style="{
        left: ripple.x + 'px',
        top: ripple.y + 'px',
        width: ripple.size + 'px',
        height: ripple.size + 'px',
      }"></span>
    </span>
    <!-- Glow effect -->
    <span class="magnetic-btn-glow" :style="glowStyle"></span>
  </button>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  magneticStrength?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  magneticStrength: 0.3,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonRef = ref<HTMLButtonElement | null>(null)
const isHovering = ref(false)
const contentOffset = reactive({ x: 0, y: 0 })
const glowPosition = reactive({ x: 50, y: 50 })

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}

const ripples = ref<Ripple[]>([])
let rippleId = 0

const contentStyle = computed(() => ({
  transform: `translate(${contentOffset.x}px, ${contentOffset.y}px)`,
  transition: isHovering.value ? 'transform 0.2s ease-out' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
}))

const glowStyle = computed(() => ({
  background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
  opacity: isHovering.value ? 1 : 0,
}))

function handleMouseMove(e: MouseEvent) {
  if (!buttonRef.value || props.disabled) return

  const rect = buttonRef.value.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const deltaX = e.clientX - centerX
  const deltaY = e.clientY - centerY

  // Magnetic pull — move content toward cursor
  contentOffset.x = deltaX * props.magneticStrength
  contentOffset.y = deltaY * props.magneticStrength

  // Glow follows cursor
  glowPosition.x = ((e.clientX - rect.left) / rect.width) * 100
  glowPosition.y = ((e.clientY - rect.top) / rect.height) * 100
}

function handleMouseEnter() {
  isHovering.value = true
}

function handleMouseLeave() {
  isHovering.value = false
  contentOffset.x = 0
  contentOffset.y = 0
}

function handleClick(e: MouseEvent) {
  if (props.disabled || props.loading) return

  // Create ripple
  const rect = buttonRef.value!.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const size = Math.max(rect.width, rect.height) * 2.5

  const id = rippleId++
  ripples.value.push({ id, x: x - size / 2, y: y - size / 2, size })

  setTimeout(() => {
    ripples.value = ripples.value.filter((r) => r.id !== id)
  }, 700)

  emit('click', e)
}
</script>

<style scoped>
.magnetic-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  overflow: hidden;
  font-family: var(--font-sans);
  font-weight: 600;
  letter-spacing: -0.01em;
  border-radius: var(--radius-xl);
  transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.magnetic-btn:not(:disabled):hover {
  transform: translateY(-1px);
}

.magnetic-btn:not(:disabled):active {
  transform: translateY(0) scale(0.98);
}

/* Sizes */
.magnetic-btn.sm {
  padding: 0.5rem 1.2rem;
  font-size: var(--font-size-sm);
  border-radius: var(--radius-lg);
}

.magnetic-btn.md {
  padding: 0.75rem 1.75rem;
  font-size: var(--font-size-base);
}

.magnetic-btn.lg {
  padding: 1rem 2.5rem;
  font-size: var(--font-size-lg);
  border-radius: var(--radius-2xl);
}

/* Variants */
.magnetic-btn.primary {
  background: var(--color-primary-500);
  color: white;
  box-shadow: 0 4px 15px rgba(232, 93, 58, 0.3);
}

.magnetic-btn.primary:hover {
  background: var(--color-primary-600);
  box-shadow: 0 8px 25px rgba(232, 93, 58, 0.4);
}

.magnetic-btn.secondary {
  background: var(--color-secondary-500);
  color: white;
  box-shadow: 0 4px 15px rgba(45, 106, 79, 0.3);
}

.magnetic-btn.ghost {
  background: transparent;
  color: var(--color-gray-700);
  border: 1.5px solid var(--color-gray-200);
}

.magnetic-btn.ghost:hover {
  background: var(--color-gray-50);
  border-color: var(--color-gray-300);
}

.magnetic-btn.accent {
  background: var(--color-accent-500);
  color: white;
  box-shadow: 0 4px 15px rgba(212, 168, 67, 0.35);
}

.magnetic-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Content */
.magnetic-btn-content {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  will-change: transform;
}

/* Spinner */
.magnetic-btn-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Ripples */
.magnetic-btn-ripples {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
  border-radius: inherit;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  transform: scale(0);
  animation: ripple-expand 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes ripple-expand {
  to {
    transform: scale(1);
    opacity: 0;
  }
}

/* Glow */
.magnetic-btn-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.3s ease;
}
</style>
