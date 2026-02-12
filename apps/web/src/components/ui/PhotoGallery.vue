<template>
    <Teleport to="body">
        <Transition name="gallery-overlay">
            <div v-if="isOpen" class="gallery-overlay" @click.self="close">
                <div class="gallery-container">
                    <!-- Close button -->
                    <button class="gallery-close" @click="close" aria-label="Close gallery">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    <!-- Counter -->
                    <div class="gallery-counter">{{ currentIndex + 1 }} / {{ images.length }}</div>

                    <!-- Main image -->
                    <div class="gallery-main">
                        <button class="gallery-nav prev" @click="prev" :disabled="currentIndex === 0">
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        <img :src="images[currentIndex]" :alt="`Photo ${currentIndex + 1}`" class="gallery-image"
                            @load="imageLoaded = true" />

                        <button class="gallery-nav next" @click="next" :disabled="currentIndex === images.length - 1">
                            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>

                    <!-- Thumbnails -->
                    <div class="gallery-thumbs" v-if="images.length > 1">
                        <button v-for="(img, i) in images" :key="i" class="thumb"
                            :class="{ active: i === currentIndex }" @click="currentIndex = i">
                            <img :src="img" :alt="`Thumbnail ${i + 1}`" />
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps<{
    images: string[]
    isOpen: boolean
    startIndex?: number
}>()

const emit = defineEmits<{
    close: []
}>()

const currentIndex = ref(props.startIndex || 0)
const imageLoaded = ref(false)

watch(() => props.startIndex, (val) => {
    if (val !== undefined) currentIndex.value = val
})

watch(() => props.isOpen, (val) => {
    if (val) {
        document.body.style.overflow = 'hidden'
        currentIndex.value = props.startIndex || 0
    } else {
        document.body.style.overflow = ''
    }
})

function prev() {
    if (currentIndex.value > 0) currentIndex.value--
}

function next() {
    if (currentIndex.value < props.images.length - 1) currentIndex.value++
}

function close() {
    emit('close')
}

function handleKeydown(e: KeyboardEvent) {
    if (!props.isOpen) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'ArrowRight') next()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
})
</script>

<style scoped>
.gallery-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.92);
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-container {
    width: 100%;
    max-width: 1100px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    position: relative;
}

.gallery-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    border-radius: 50%;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
    z-index: 10;
}

.gallery-close:hover {
    background: rgba(255, 255, 255, 0.2);
}

.gallery-counter {
    position: absolute;
    top: 28px;
    left: 28px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    font-weight: 500;
}

.gallery-main {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
    width: 100%;
    min-height: 0;
}

.gallery-image {
    flex: 1;
    max-height: 70vh;
    object-fit: contain;
    border-radius: 12px;
    min-width: 0;
}

.gallery-nav {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
}

.gallery-nav:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
}

.gallery-nav:disabled {
    opacity: 0.2;
    cursor: default;
}

.gallery-thumbs {
    display: flex;
    gap: 8px;
    margin-top: 16px;
    overflow-x: auto;
    padding: 4px;
}

.thumb {
    width: 64px;
    height: 48px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s;
    padding: 0;
    background: none;
    flex-shrink: 0;
}

.thumb.active {
    border-color: white;
    opacity: 1;
}

.thumb:hover {
    opacity: 0.8;
}

.thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* Overlay transition */
.gallery-overlay-enter-active {
    transition: opacity 0.3s ease;
}

.gallery-overlay-leave-active {
    transition: opacity 0.2s ease;
}

.gallery-overlay-enter-from,
.gallery-overlay-leave-to {
    opacity: 0;
}
</style>
