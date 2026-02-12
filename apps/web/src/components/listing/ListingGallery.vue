<template>
    <section class="gallery-container">
        <div class="gallery-grid">
            <!-- Main Image (Left) -->
            <div class="gallery-main" @click="$emit('open', 0)">
                <img :src="images[0] || coverImage" :alt="title" class="gallery-image" />
                <div class="gallery-overlay"></div>
            </div>

            <!-- Side Images (Right) -->
            <div class="gallery-side">
                <div v-for="(img, index) in displayImages" :key="index" class="gallery-item"
                    @click="$emit('open', index + 1)">
                    <img :src="img" :alt="`${title} photo ${index + 2}`" class="gallery-image" />
                    <div class="gallery-overlay"></div>
                </div>
            </div>
        </div>

        <button class="show-all-btn" @click="$emit('open', 0)">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style="margin-right: 8px;">
                <path
                    d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm16 0H5v14h14V5zm-8 4a2 2 0 110 4 2 2 0 010-4zm0 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            Show all photos
        </button>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    images: string[]
    coverImage?: string
    title: string
}>()

defineEmits<{
    (e: 'open', index: number): void
}>()

const displayImages = computed(() => {
    return (props.images || []).slice(1, 5)
})
</script>

<style scoped>
.gallery-container {
    position: relative;
    margin-top: var(--spacing-lg);
    border-radius: var(--radius-xl);
    overflow: hidden;
}

.gallery-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--spacing-xs);
    height: 400px;
}

.gallery-main {
    position: relative;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
}

.gallery-side {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: var(--spacing-xs);
    height: 100%;
}

.gallery-item {
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

.gallery-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition-slow);
}

.gallery-overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.05);
    /* subtle dim */
    opacity: 0;
    transition: opacity var(--transition-fast);
}

.gallery-main:hover .gallery-image,
.gallery-item:hover .gallery-image {
    transform: scale(1.05);
}

.gallery-main:hover .gallery-overlay,
.gallery-item:hover .gallery-overlay {
    opacity: 1;
}

/* Rounded corners for the grid */
.gallery-main {
    border-top-left-radius: var(--radius-xl);
    border-bottom-left-radius: var(--radius-xl);
}

.gallery-item:nth-child(2) {
    border-top-right-radius: var(--radius-xl);
}

.gallery-item:nth-child(4) {
    border-bottom-right-radius: var(--radius-xl);
}

.show-all-btn {
    position: absolute;
    bottom: 24px;
    right: 24px;
    background: white;
    border: 1px solid var(--color-gray-900);
    border-radius: var(--radius-md);
    padding: 6px 14px;
    font-size: var(--font-size-sm);
    font-weight: 500;
    display: flex;
    align-items: center;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-fast), background-color var(--transition-fast);
}

.show-all-btn:hover {
    transform: scale(1.02);
    background-color: var(--color-gray-50);
}

@media (max-width: 768px) {
    .gallery-grid {
        grid-template-columns: 1fr;
        height: 300px;
    }

    .gallery-side {
        display: none;
    }

    .gallery-main {
        border-radius: 0;
        /* Full width on mobile usually implies edge-to-edge users */
    }

    .gallery-container {
        border-radius: 0;
        margin-top: 0;
    }

    .show-all-btn {
        bottom: 16px;
        right: 16px;
    }
}
</style>
