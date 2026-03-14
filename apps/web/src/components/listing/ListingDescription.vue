<template>
    <div class="section description-section">
        <h2 class="section-title">About this place</h2>
        <div class="description-content" :class="{ 'is-expanded': isExpanded }">
            <p class="description-text">
                {{ description }}
            </p>
        </div>
        <button v-if="shouldShowButton" class="show-more-btn" @click="toggleExpand" :aria-expanded="isExpanded" aria-label="Show more about this place">
            {{ isExpanded ? 'Show less' : 'Show more' }}
            <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"
                :class="{ 'rotate': isExpanded }" aria-hidden="true">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
    description: string
}>()

const isExpanded = ref(false)
const MAX_LENGTH = 300 // Characters before truncation

const shouldShowButton = computed(() => {
    return props.description.length > MAX_LENGTH
})

function toggleExpand() {
    isExpanded.value = !isExpanded.value
}
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

.description-content {
    position: relative;
    overflow: hidden;
    max-height: 160px;
    /* Approx 6 lines */
    transition: max-height 0.3s ease;
}

.description-content.is-expanded {
    max-height: none;
    overflow: visible;
}

.description-text {
    font-size: var(--font-size-base);
    line-height: 1.6;
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-md);
    white-space: pre-line;
}

.show-more-btn {
    font-weight: 600;
    text-decoration: underline;
    font-size: var(--font-size-base);
    color: var(--color-gray-900);
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    margin-top: var(--spacing-sm);
}

.show-more-btn svg {
    transition: transform 0.2s ease;
}

.show-more-btn svg.rotate {
    transform: rotate(180deg);
}
</style>
