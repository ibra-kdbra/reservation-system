<template>
    <div class="section map-section">
        <h2 class="section-title">Where you'll be</h2>
        <div class="map-container">
            <div id="listing-map" class="map-view"></div>
            <div class="map-placeholder" v-if="!latitude || !longitude">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor" class="map-icon">
                    <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <p>{{ location }}</p>
                <span class="map-note">Exact location provided after booking</span>
            </div>
        </div>
        <p class="location-text">{{ location }}</p>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps<{
    location: string
    latitude?: number
    longitude?: number
}>()

const map = ref<L.Map | null>(null)

// Fix Leaflet's default icon path issues with Vite/Webpack
// Using a simple circle marker instead for a cleaner "approximate location" look
// typical of Airbnb

onMounted(() => {
    if (props.latitude && props.longitude) {
        initMap(props.latitude, props.longitude)
    }
})

watch(() => [props.latitude, props.longitude], ([newLat, newLng]) => {
    if (newLat && newLng && !map.value) {
        initMap(newLat, newLng)
    } else if (newLat && newLng && map.value) {
        map.value.setView([newLat, newLng], 13)
    }
})

function initMap(lat: number, lng: number) {
    // Create map instance
    map.value = L.map('listing-map', {
        scrollWheelZoom: false, // Prevent scrolling while reading page
        dragging: !L.Browser.mobile, // Disable dragging on mobile initially
    }).setView([lat, lng], 13)

    // Add OpenStreetMap tile layer (CartoDB Voyager for a cleaner look)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map.value)

    // Add a circle to represent precise location without giving exact address (Airbnb style)
    L.circle([lat, lng], {
        color: 'var(--color-primary-500)',
        fillColor: 'var(--color-primary-500)',
        fillOpacity: 0.2,
        radius: 800 // meters
    }).addTo(map.value)

    // Add a central icon
    const icon = L.divIcon({
        className: 'custom-map-marker',
        html: `<div style="background-color: var(--color-primary-500); width: 48px; height: 48px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
             <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
           </div>`,
        iconSize: [48, 48],
        iconAnchor: [24, 24]
    })

    L.marker([lat, lng], { icon }).addTo(map.value)
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

.location-text {
    margin-top: var(--spacing-lg);
    font-size: var(--font-size-base);
    color: var(--color-gray-700);
    font-weight: 500;
}

.map-container {
    height: 480px;
    background-color: var(--color-gray-100);
    border-radius: var(--radius-xl);
    position: relative;
    overflow: hidden;
}

.map-view {
    width: 100%;
    height: 100%;
    z-index: 1;
}

.map-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: var(--spacing-lg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    z-index: 2;
}

.map-icon {
    color: var(--color-primary-500);
}

.map-note {
    font-size: var(--font-size-xs);
    color: var(--color-gray-500);
}
</style>
