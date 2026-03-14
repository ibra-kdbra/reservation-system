<template>
    <div class="section amenities-section" v-if="amenities && amenities.length">
        <h2 class="section-title">What this place offers</h2>
        <div class="amenities-grid">
            <div v-for="la in displayedAmenities" :key="la.id" class="amenity-item">
                <span class="amenity-icon">{{ la.amenity?.icon || '✓' }}</span>
                <span>{{ la.amenity?.name || la.name }}</span>
            </div>
        </div>
        <button v-if="amenities.length > limit" class="show-all-btn" @click="isOpen = true" aria-label="Show all amenities">
            Show all {{ amenities.length }} amenities
        </button>

        <!-- Modal -->
        <Teleport to="body">
            <div v-if="isOpen" class="modal-overlay" @click="isOpen = false">
                <div class="modal-content" ref="modalRef" @click.stop role="dialog" aria-modal="true" aria-labelledby="amenities-title">
                    <button class="close-btn" @click="isOpen = false" aria-label="Close amenities modal">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                            fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                    <h3 class="modal-title" id="amenities-title">What this place offers</h3>
                    <div class="modal-scroll">
                        <div class="modal-amenities-list">
                            <div v-for="la in amenities" :key="la.id" class="modal-amenity-item">
                                <span class="amenity-icon large">{{ la.amenity?.icon || '✓' }}</span>
                                <span class="amenity-name">{{ la.amenity?.name || la.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useFocusTrap } from '@/composables/useFocusTrap'

const props = defineProps<{
    amenities: any[]
    limit?: number
}>()

const isOpen = ref(false)
const modalRef = ref<HTMLElement | null>(null)
const limit = props.limit || 10

useFocusTrap(modalRef, isOpen)

function handleKeydown(e: KeyboardEvent) {
    if (!isOpen.value) return
    if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

const displayedAmenities = computed(() => {
    return props.amenities.slice(0, limit)
})

// Body scroll lock
watch(isOpen, (val) => {
    if (val) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})
</script>

<style scoped>
.section {
    padding: var(--spacing-2xl) 0;
    border-top: 1px solid var(--color-gray-200);
}

.section-title {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
    color: var(--color-gray-900);
}

.amenities-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.amenity-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    color: var(--color-gray-700);
    font-size: var(--font-size-base);
}

.amenity-icon {
    width: 24px;
    text-align: center;
    font-size: 1.2rem;
}

.amenity-icon.large {
    font-size: 1.5rem;
    width: 32px;
}

.show-all-btn {
    padding: 12px 24px;
    border: 1px solid var(--color-gray-900);
    border-radius: var(--radius-lg);
    font-weight: 600;
    font-size: var(--font-size-base);
    background: white;
    cursor: pointer;
    transition: background-color var(--transition-fast);
}

.show-all-btn:hover {
    background: var(--color-gray-50);
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: var(--spacing-xl);
}

.modal-content {
    background: white;
    width: 100%;
    max-width: 780px;
    max-height: 85vh;
    border-radius: var(--radius-xl);
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--shadow-2xl);
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.close-btn {
    position: absolute;
    top: 24px;
    left: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s;
    z-index: 10;
}

.close-btn:hover {
    background-color: var(--color-gray-100);
}

.modal-title {
    padding: 24px 24px 24px 72px;
    /* Left padding for close button space ?? No, center usually or left */
    /* Airbnb style: Close button left, title below or side? Actually Airbnb puts close top-left, title below it or scrollable content starts */
    margin-top: 40px;
    padding-left: 24px;
    font-size: var(--font-size-2xl);
    font-weight: 700;
    border-bottom: 1px solid var(--color-gray-200);
}

.modal-scroll {
    overflow-y: auto;
    padding: 24px;
    flex: 1;
}

.modal-amenities-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.modal-amenity-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-gray-100);
}

.modal-amenity-item:last-child {
    border-bottom: none;
}

.amenity-name {
    font-size: var(--font-size-lg);
    color: var(--color-gray-800);
}

@media (max-width: 768px) {
    .modal-content {
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
    }
}
</style>
