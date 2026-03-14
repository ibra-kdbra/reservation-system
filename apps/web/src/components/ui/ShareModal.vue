<template>
    <Teleport to="body">
        <Transition name="share-overlay">
            <div v-if="isOpen" class="share-overlay" @click.self="close">
                <div class="share-modal" ref="modalRef" role="dialog" aria-modal="true" aria-labelledby="share-title">
                    <div class="share-header">
                        <h3 id="share-title">Share this listing</h3>
                        <button class="share-close" @click="close" aria-label="Close share modal">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    <!-- Listing preview -->
                    <div class="share-preview" v-if="listing">
                        <img :src="previewImage" :alt="listing.title" class="share-preview-img" />
                        <div class="share-preview-info">
                            <p class="share-preview-title">{{ listing.title }}</p>
                            <p class="share-preview-location">{{ listing.city }}, {{ listing.country }}</p>
                        </div>
                    </div>

                    <!-- Share options -->
                    <div class="share-options">
                        <button class="share-option" @click="copyLink">
                            <div class="share-icon copy-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                                    stroke-width="2" aria-hidden="true">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                            </div>
                            <span>{{ copied ? 'Copied!' : 'Copy Link' }}</span>
                        </button>

                        <a :href="whatsappUrl" target="_blank" rel="noopener" class="share-option">
                            <div class="share-icon whatsapp-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                    <path
                                        d="M12 0C5.373 0 0 5.373 0 12c0 2.118.553 4.108 1.52 5.838L0 24l6.336-1.48A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.96 0-3.833-.527-5.47-1.527l-.392-.232-3.76.879.946-3.455-.256-.406A9.788 9.788 0 012.182 12c0-5.414 4.404-9.818 9.818-9.818S21.818 6.586 21.818 12 17.414 21.818 12 21.818z" />
                                </svg>
                            </div>
                            <span>WhatsApp</span>
                        </a>

                        <a :href="twitterUrl" target="_blank" rel="noopener" class="share-option">
                            <div class="share-icon twitter-icon">
                                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                            <span>X / Twitter</span>
                        </a>

                        <a :href="facebookUrl" target="_blank" rel="noopener" class="share-option">
                            <div class="share-icon facebook-icon">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </div>
                            <span>Facebook</span>
                        </a>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, toRef } from 'vue'
import { useFocusTrap } from '@/composables/useFocusTrap'

const props = defineProps<{
    isOpen: boolean
    listing: { 
        title: string; 
        city: string; 
        country: string;
        coverImage?: string;
        images?: string[];
    } | null
}>()

const emit = defineEmits<{ close: [] }>()
const copied = ref(false)
const modalRef = ref<HTMLElement | null>(null)

useFocusTrap(modalRef, toRef(props, 'isOpen'))

watch(() => props.isOpen, (val) => {
    if (val) {
        // ... (body scroll lock could go here if needed)
    }
})

function handleKeydown(e: KeyboardEvent) {
    if (!props.isOpen) return
    if (e.key === 'Escape') close()
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

const previewImage = computed(() => props.listing?.coverImage || props.listing?.images?.[0] || '')
const shareUrl = computed(() => window.location.href)
const shareText = computed(() =>
    props.listing ? `Check out ${props.listing.title} in ${props.listing.city} on NestAsia!` : ''
)

const whatsappUrl = computed(() =>
    `https://wa.me/?text=${encodeURIComponent(shareText.value + ' ' + shareUrl.value)}`
)
const twitterUrl = computed(() =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText.value)}&url=${encodeURIComponent(shareUrl.value)}`
)
const facebookUrl = computed(() =>
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`
)

async function copyLink() {
    try {
        await navigator.clipboard.writeText(shareUrl.value)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    } catch {
        // Fallback
        const input = document.createElement('input')
        input.value = shareUrl.value
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        copied.value = true
        setTimeout(() => { copied.value = false }, 2000)
    }
}

function close() {
    emit('close')
}
</script>

<style scoped>
.share-overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.share-modal {
    background: white;
    border-radius: var(--radius-2xl);
    width: 100%;
    max-width: 440px;
    padding: 24px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
}

.share-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.share-header h3 {
    font-size: var(--font-size-lg);
    font-weight: 700;
}

.share-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: none;
    background: var(--color-gray-100);
    cursor: pointer;
    color: var(--color-gray-500);
    transition: background 0.15s;
}

.share-close:hover {
    background: var(--color-gray-200);
}

.share-preview {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: var(--color-gray-50);
    border-radius: var(--radius-lg);
    margin-bottom: 20px;
}

.share-preview-img {
    width: 64px;
    height: 48px;
    border-radius: var(--radius-md);
    object-fit: cover;
}

.share-preview-title {
    font-weight: 600;
    font-size: var(--font-size-sm);
    color: var(--color-gray-800);
}

.share-preview-location {
    font-size: 0.75rem;
    color: var(--color-gray-500);
    margin-top: 2px;
}

.share-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
}

.share-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 16px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-gray-200);
    background: white;
    cursor: pointer;
    text-decoration: none;
    color: var(--color-gray-700);
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: all 0.15s;
}

.share-option:hover {
    border-color: var(--color-primary-200);
    background: var(--color-primary-50);
}

.share-icon {
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.copy-icon {
    background: var(--color-gray-100);
    color: var(--color-gray-600);
}

.whatsapp-icon {
    background: #dcf8c6;
    color: #25d366;
}

.twitter-icon {
    background: #e8f5fd;
    color: #1da1f2;
}

.facebook-icon {
    background: #e8f0fe;
    color: #1877f2;
}

/* Transition */
.share-overlay-enter-active {
    transition: opacity 0.2s ease;
}

.share-overlay-leave-active {
    transition: opacity 0.15s ease;
}

.share-overlay-enter-from,
.share-overlay-leave-to {
    opacity: 0;
}
</style>
