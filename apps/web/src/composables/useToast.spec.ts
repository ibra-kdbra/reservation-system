import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useToast } from '@/composables/useToast'

// Clear module-level toast state between tests
function clearAllToasts() {
    const { toasts, remove } = useToast()
    // Copy to avoid mutation during iteration
    const ids = toasts.value.map(t => t.id)
    ids.forEach(id => remove(id))
}

describe('useToast', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        clearAllToasts()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('starts with empty toast list after reset', () => {
        const { toasts } = useToast()
        expect(toasts.value).toHaveLength(0)
    })

    it('adds a success toast', () => {
        const { toasts, success } = useToast()
        success('Booking confirmed!')
        expect(toasts.value).toHaveLength(1)
        expect(toasts.value[0].type).toBe('success')
        expect(toasts.value[0].message).toBe('Booking confirmed!')
    })

    it('adds an error toast', () => {
        const { toasts, error } = useToast()
        error('Something went wrong')
        expect(toasts.value).toHaveLength(1)
        expect(toasts.value[0].type).toBe('error')
    })

    it('removes a toast by id', () => {
        const { toasts, success, remove } = useToast()
        success('Hello')
        const id = toasts.value[0].id
        remove(id)
        expect(toasts.value).toHaveLength(0)
    })

    it('auto-removes toast after timeout', () => {
        const { toasts, success } = useToast()
        success('Temp toast')
        expect(toasts.value).toHaveLength(1)
        vi.runAllTimers()
        expect(toasts.value).toHaveLength(0)
    })
})

