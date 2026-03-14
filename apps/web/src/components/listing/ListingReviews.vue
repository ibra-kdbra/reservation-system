<template>
    <div class="reviews-section" v-if="reviews.length > 0">
        <h2 class="section-title">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style="margin-right: 8px;" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                </path>
            </svg>
            {{ rating }} · {{ reviewCount }} reviews
        </h2>

        <!-- Rating Breakdown -->
        <div class="rating-breakdown">
            <div v-for="star in 5" :key="star" class="rating-row">
                <span class="star-label">{{ 6 - star }} stars</span>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: getPercentage(6 - star) + '%' }"></div>
                </div>
                <span class="percentage">{{ getPercentage(6 - star) }}%</span>
            </div>
        </div>

        <!-- Reviews Grid -->
        <div class="reviews-grid">
            <div v-for="review in displayedReviews" :key="review.id" class="review-card">
                <div class="review-header">
                    <img :src="review.guest?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.guest?.firstName}`"
                        :alt="review.guest?.firstName" class="reviewer-avatar" />
                    <div class="reviewer-info">
                        <h4 class="reviewer-name">{{ review.guest?.firstName }}</h4>
                        <p class="review-date">{{ formatDate(review.createdAt) }}</p>
                    </div>
                </div>
                <div class="review-content">
                    {{ review.comment }}
                </div>
            </div>
        </div>

        <button v-if="reviews.length > 6" class="show-all-btn" @click="isOpen = true" aria-label="Show all reviews">
            Show all {{ reviewCount }} reviews
        </button>

        <!-- Reviews Modal -->
        <Teleport to="body">
            <div v-if="isOpen" class="modal-overlay" @click="isOpen = false">
                <div class="modal-content" ref="modalRef" @click.stop role="dialog" aria-modal="true" aria-labelledby="reviews-title">
                    <div class="modal-header">
                        <button class="close-btn" @click="isOpen = false" aria-label="Close reviews modal">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2"
                                fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div class="modal-body">
                        <h2 class="modal-title" id="reviews-title">
                            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor"
                                style="margin-right: 12px; color: var(--color-primary-500);" aria-hidden="true">
                                <path
                                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                                </path>
                            </svg>
                            {{ rating }} · {{ reviewCount }} reviews
                        </h2>

                        <div class="modal-reviews-list">
                            <div v-for="review in reviews" :key="review.id" class="review-card modal-card">
                                <div class="review-header">
                                    <img :src="review.guest?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.guest?.firstName}`"
                                        :alt="review.guest?.firstName" class="reviewer-avatar" />
                                    <div class="reviewer-info">
                                        <h4 class="reviewer-name">{{ review.guest?.firstName }}</h4>
                                        <p class="review-date">{{ formatDate(review.createdAt) }}</p>
                                    </div>
                                </div>
                                <div class="review-content">
                                    {{ review.comment }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useFocusTrap } from '@/composables/useFocusTrap'

const props = defineProps<{
    reviews: any[]
    rating: number
    reviewCount: number
}>()

const isOpen = ref(false)
const modalRef = ref<HTMLElement | null>(null)

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

const displayedReviews = computed(() => {
    return props.reviews.slice(0, 6)
})

function getPercentage(star: number) {
    if (!props.reviewCount) return 0
    const count = props.reviews.filter(r => Math.round(r.rating) === star).length
    return Math.round((count / props.reviewCount) * 100)
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    })
}

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
.reviews-section {
    padding: var(--spacing-2xl) 0;
    border-top: 1px solid var(--color-gray-200);
}

.section-title {
    display: flex;
    align-items: center;
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin-bottom: var(--spacing-xl);
}

.rating-breakdown {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-xl);
    max-width: 600px;
}

.rating-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: var(--font-size-sm);
    color: var(--color-gray-700);
}

.star-label {
    width: 60px;
}

.progress-bar {
    flex: 1;
    height: 6px;
    background: var(--color-gray-200);
    border-radius: var(--radius-full);
    overflow: hidden;
}

.progress-fill {
    background: var(--color-gray-900);
    height: 100%;
}

.percentage {
    width: 40px;
    text-align: right;
    color: var(--color-gray-500);
}

.reviews-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
}

.review-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.review-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.reviewer-avatar {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-full);
    object-fit: cover;
}

.reviewer-name {
    font-weight: 600;
    font-size: var(--font-size-base);
    color: var(--color-gray-900);
    margin: 0;
}

.review-date {
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
    margin: 0;
}

.review-content {
    font-size: var(--font-size-base);
    line-height: 1.6;
    color: var(--color-gray-700);
}

.show-all-btn {
    padding: 12px 24px;
    background: white;
    border: 1px solid var(--color-gray-900);
    border-radius: var(--radius-lg);
    font-weight: 600;
    font-size: var(--font-size-base);
    transition: all var(--transition-fast);
    cursor: pointer;
}

.show-all-btn:hover {
    background: var(--color-gray-50);
}

@media (max-width: 768px) {
    .reviews-grid {
        grid-template-columns: 1fr;
    }
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
    animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.modal-content {
    background: white;
    width: 100%;
    max-width: 780px;
    height: 85vh;
    border-radius: var(--radius-xl);
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: var(--shadow-2xl);
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        transform: translateY(50px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.modal-header {
    padding: 16px 24px;
    display: flex;
    justify-content: flex-start;
}

.close-btn {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.close-btn:hover {
    background-color: var(--color-gray-100);
}

.modal-body {
    overflow-y: auto;
    padding: 0 24px 24px;
}

.modal-title {
    display: flex;
    align-items: center;
    font-size: var(--font-size-3xl);
    font-weight: 700;
    margin-bottom: 32px;
    padding-top: 16px;
}

.modal-reviews-list {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.modal-card {
    padding-bottom: 24px;
    border-bottom: 1px solid var(--color-gray-100);
}

.modal-card:last-child {
    border-bottom: none;
}
</style>
