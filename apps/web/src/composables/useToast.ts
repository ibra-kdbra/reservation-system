import { ref, readonly } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
  createdAt: number
}

const toasts = ref<Toast[]>([])
let nextId = 0

function addToast(message: string, type: ToastType = 'info', duration = 4000) {
  const id = nextId++
  const toast: Toast = {
    id,
    message,
    type,
    duration,
    createdAt: Date.now(),
  }

  toasts.value.push(toast)

  // Auto remove
  setTimeout(() => {
    removeToast(id)
  }, duration)

  return id
}

function removeToast(id: number) {
  const index = toasts.value.findIndex((t) => t.id === id)
  if (index !== -1) {
    toasts.value.splice(index, 1)
  }
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    success: (msg: string, duration?: number) => addToast(msg, 'success', duration),
    error: (msg: string, duration?: number) => addToast(msg, 'error', duration),
    info: (msg: string, duration?: number) => addToast(msg, 'info', duration),
    warning: (msg: string, duration?: number) => addToast(msg, 'warning', duration),
    remove: removeToast,
  }
}
