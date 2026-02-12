<template>
    <div class="map-section">
        <h2 class="section-title">Where you'll be</h2>
        <div class="map-container">
            <div class="map-placeholder">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" class="map-icon">
                    <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p>{{ location }}</p>
                <span class="map-note">Exact location provided after booking</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    location: string
    latitude?: number
    longitude?: number
}>()
</script>

<style scoped>
.map-section {
    padding: var(--spacing-xl) 0;
    border-top: 1px solid var(--color-gray-200);
}

.section-title {
    font-size: var(--font-size-2xl);
    font-weight: 600;
    margin-bottom: var(--spacing-lg);
}

.map-container {
    height: 480px;
    background-color: var(--color-gray-100);
    border-radius: var(--radius-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    background-image: url('https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=800x480&sensor=false&key=none');
    /* Mock bg or just color */
    background-size: cover;
    background-position: center;
}

.map-placeholder {
    background: white;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.map-icon {
    color: var(--color-primary-500);
}

.map-note {
    font-size: var(--font-size-xs);
    color: var(--color-gray-500);
}
</style>
