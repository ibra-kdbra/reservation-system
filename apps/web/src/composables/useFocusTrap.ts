import { onMounted, onUnmounted, type Ref, watch } from 'vue'

/**
 * A composable that traps focus within a container and manages initial focus.
 * @param containerRef Ref to the element containing the focusable items
 * @param isOpen Ref to a boolean indicating if the trap is active (e.g., modal is open)
 */
export function useFocusTrap(containerRef: Ref<HTMLElement | null>, isOpen: Ref<boolean>) {
  const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

  const handleTab = (e: KeyboardEvent) => {
    if (!containerRef.value || !isOpen.value || e.key !== 'Tab') return

    const focusableElements = containerRef.value.querySelectorAll(focusableSelector)
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (e.shiftKey) { // shift + tab
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else { // tab
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleTab)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleTab)
  })

  // Handle initial focus when modal opens
  watch(isOpen, (val) => {
    if (val) {
      setTimeout(() => {
        const firstFocusable = containerRef.value?.querySelector(focusableSelector) as HTMLElement
        firstFocusable?.focus()
      }, 100)
    }
  }, { immediate: true })
}
