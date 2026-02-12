<template>
    <div class="host-section">
        <div class="host-header">
            <img :src="host?.avatar || defaultAvatar" :alt="host?.firstName" class="host-avatar" />
            <div class="host-info">
                <h3 class="host-name">Hosted by {{ host?.firstName || 'Host' }}</h3>
                <p class="host-joined">Joined in {{ joinedDate }}</p>
            </div>
        </div>

        <div class="host-stats">
            <div class="stat-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                    </path>
                </svg>
                <span>{{ reviewCount }} Reviews</span>
            </div>
            <div class="stat-item">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>Identity verified</span>
            </div>
            <div class="stat-item" v-if="isSuperhost">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                <span>Superhost</span>
            </div>
        </div>

        <div class="host-bio" v-if="host?.bio">
            {{ host.bio }}
        </div>

        <button class="contact-btn">
            Contact Host
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    host?: {
        firstName: string
        avatar?: string
        bio?: string
        createdAt?: string
    }
    reviewCount?: number
    isSuperhost?: boolean
}>()

const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'

const joinedDate = computed(() => {
    if (!props.host?.createdAt) return '2023'
    return new Date(props.host.createdAt).getFullYear()
})
</script>

<style scoped>
.host-section {
    padding: var(--spacing-xl) 0;
    border-top: 1px solid var(--color-gray-200);
    border-bottom: 1px solid var(--color-gray-200);
}

.host-header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.host-avatar {
    width: 64px;
    height: 64px;
    border-radius: var(--radius-full);
    object-fit: cover;
}

.host-name {
    font-size: var(--font-size-xl);
    font-weight: 600;
    color: var(--color-gray-900);
    margin: 0;
}

.host-joined {
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
    margin: 4px 0 0;
}

.host-stats {
    display: flex;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--font-size-sm);
    color: var(--color-gray-700);
}

.host-bio {
    font-size: var(--font-size-base);
    line-height: 1.6;
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-lg);
    max-width: 600px;
}

.contact-btn {
    padding: 12px 24px;
    background: white;
    border: 1px solid var(--color-gray-900);
    border-radius: var(--radius-lg);
    font-weight: 600;
    font-size: var(--font-size-base);
    color: var(--color-gray-900);
    transition: all var(--transition-fast);
}

.contact-btn:hover {
    background: var(--color-gray-50);
    border-color: var(--color-black);
}
</style>
