<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div class="modal-overlay" @click.self="$emit('close')">
                <Transition name="modal-slide">
                    <div class="modal-content" ref="modalRef" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <button class="btn-close" @click="$emit('close')" aria-label="Close filters">×</button>
                            <h2 class="modal-title" id="modal-title">Filters</h2>
                            <div class="header-spacer"></div>
                        </div>

                        <!-- Modal Body -->
                        <div class="modal-body">
                            <!-- Price Range -->
                            <section class="filter-section">
                                <h3 class="section-title">Price range</h3>
                                <p class="section-subtitle">Nightly prices before fees and taxes</p>
                                <div class="price-inputs">
                                    <div class="input-wrap">
                                        <label>Minimum</label>
                                        <div class="input-field">
                                            <span class="currency-symbol">$</span>
                                            <input type="number" v-model.number="filters.minPrice" placeholder="0" />
                                        </div>
                                    </div>
                                    <div class="price-divider"></div>
                                    <div class="input-wrap">
                                        <label>Maximum</label>
                                        <div class="input-field">
                                            <span class="currency-symbol">$</span>
                                            <input type="number" v-model.number="filters.maxPrice" placeholder="500+" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <hr class="divider" />

                            <!-- Guests -->
                            <section class="filter-section">
                                <h3 class="section-title">Who's coming</h3>
                                <p class="section-subtitle">Number of guests staying</p>
                                <div class="stepper-group">
                                    <button 
                                        v-for="n in [1, 2, 3, 4, 5, 6, 8]" 
                                        :key="n" 
                                        class="stepper-btn"
                                        :class="{ active: filters.guests === n }"
                                        @click="filters.guests = filters.guests === n ? 1 : n"
                                        :aria-label="`${n === 8 ? '8 or more' : n} guests`"
                                        :aria-pressed="filters.guests === n"
                                    >
                                        {{ n === 8 ? '8+' : n }}
                                    </button>
                                </div>
                            </section>

                            <hr class="divider" />

                            <!-- Amenities -->
                            <section class="filter-section">
                                <h3 class="section-title">Amenities</h3>
                                <p class="section-subtitle">Must-have features for your stay</p>
                                <div class="amenities-grid">
                                    <label v-for="amenity in amenitiesList" :key="amenity.name" class="amenity-card" :class="{ selected: filters.amenities.includes(amenity.name) }">
                                        <input type="checkbox" :value="amenity.name" v-model="filters.amenities" class="hidden-checkbox">
                                        <component :is="getIcon(amenity.icon)" class="w-6 h-6 vibrant-icon icon-vibrant-home" />
                                        <span class="amenity-text">{{ amenity.name }}</span>
                                    </label>
                                </div>
                            </section>
                        </div>

                        <!-- Modal Footer -->
                        <div class="modal-footer">
                            <button class="btn-clear" @click="clearFilters">Clear all</button>
                            <button class="btn-apply" @click="applyFilters">Show results</button>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import {
    Wifi,
    Snowflake,
    UtensilsCrossed,
    Waves,
    Tv,
    Dumbbell,
    ParkingCircle,
    Thermometer,
    Monitor,
    Leaf,
    Mountain,
    Check
} from 'lucide-vue-next'
import { reactive, watch, ref, onMounted, onUnmounted } from 'vue'
import { useFocusTrap } from '@/composables/useFocusTrap'
import type { SearchFiltersData } from '@/composables/useListingSearch'

const props = defineProps<{
    initialFilters: SearchFiltersData
}>()

const emit = defineEmits<{
    apply: [filters: SearchFiltersData],
    close: []
}>()

const iconMap: Record<string, any> = {
    '📶': Wifi,
    '❄️': Snowflake,
    '🍳': UtensilsCrossed,
    '🧺': Waves,
    '📺': Tv,
    '🏊': Waves,
    '🏋️': Dumbbell,
    '🅿️': ParkingCircle,
    '♨️': Thermometer,
    '💻': Monitor,
    '🌿': Leaf,
    '🏞️': Mountain
}

function getIcon(iconStr: string) {
    return iconMap[iconStr] || Check
}

const amenitiesList = [
    { name: 'WiFi', icon: '📶' },
    { name: 'Air Conditioning', icon: '❄️' },
    { name: 'Kitchen', icon: '🍳' },
    { name: 'Washer', icon: '🧺' },
    { name: 'TV', icon: '📺' },
    { name: 'Pool', icon: '🏊' },
    { name: 'Gym', icon: '🏋️' },
    { name: 'Parking', icon: '🅿️' },
    { name: 'Hot Tub', icon: '♨️' },
    { name: 'Workspace', icon: '💻' },
    { name: 'Garden', icon: '🌿' },
    { name: 'Balcony', icon: '🏞️' },
];

const filters = reactive({
    propertyType: props.initialFilters.propertyType || '',
    minPrice: props.initialFilters.minPrice || null,
    maxPrice: props.initialFilters.maxPrice || null,
    guests: props.initialFilters.guests || 1,
    amenities: [...(props.initialFilters.amenities || [])],
})

const modalRef = ref<HTMLElement | null>(null)
const isOpen = ref(true) // Always open when mounted as it's a conditional component

useFocusTrap(modalRef, isOpen)

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') emit('close')
    })
})

onUnmounted(() => {
    window.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') emit('close')
    })
})

watch(() => props.initialFilters, (newFilters) => {
    filters.propertyType = newFilters.propertyType || ''
    filters.minPrice = newFilters.minPrice || null
    filters.maxPrice = newFilters.maxPrice || null
    filters.guests = newFilters.guests || 1
    filters.amenities = [...(newFilters.amenities || [])]
}, { deep: true })

function clearFilters() {
    filters.propertyType = ''
    filters.minPrice = null
    filters.maxPrice = null
    filters.guests = 1
    filters.amenities = []
}

function applyFilters() {
    emit('apply', getCleanFilters() as SearchFiltersData)
    emit('close')
}

function getCleanFilters() {
    const clean: any = {}
    if (filters.propertyType) clean.propertyType = filters.propertyType
    if (filters.minPrice) clean.minPrice = filters.minPrice
    if (filters.maxPrice) clean.maxPrice = filters.maxPrice
    if (filters.guests > 1) clean.guests = filters.guests
    if (filters.amenities && filters.amenities.length > 0) clean.amenities = filters.amenities
    return clean
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.modal-content {
    background: white;
    width: 100%;
    max-width: 780px;
    max-height: 90vh;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

/* Header */
.modal-header {
    height: 64px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-gray-100);
}

.modal-title {
    font-size: 16px;
    font-weight: 800;
    color: var(--color-gray-900);
}

.btn-close {
    font-size: 24px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-gray-500);
    padding: 8px;
    border-radius: 50%;
    transition: background 0.2s;
}

.btn-close:hover {
    background: var(--color-gray-100);
    color: var(--color-gray-900);
}

.header-spacer {
    width: 40px;
}

/* Body */
.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 32px 24px;
}

.filter-section {
    margin-bottom: 32px;
}

.section-title {
    font-size: 22px;
    font-weight: 600;
    color: var(--color-gray-900);
    margin-bottom: 8px;
}

.section-subtitle {
    font-size: 14px;
    color: var(--color-gray-500);
    margin-bottom: 24px;
}

.divider {
    border: none;
    border-top: 1px solid var(--color-gray-100);
    margin: 32px 0;
}

/* Price Range */
.price-inputs {
    display: flex;
    align-items: flex-end;
    gap: 16px;
}

.input-wrap {
    flex: 1;
}

.input-wrap label {
    display: block;
    font-size: 12px;
    color: var(--color-gray-500);
    margin-bottom: 8px;
}

.input-field {
    position: relative;
    border: 1px solid var(--color-gray-300);
    border-radius: 12px;
    padding: 12px 16px 12px 32px;
}

.input-field:focus-within {
    border-color: var(--color-gray-900);
    box-shadow: 0 0 0 1px var(--color-gray-900);
}

.currency-symbol {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray-500);
}

.input-field input {
    width: 100%;
    border: none;
    background: none;
    font-size: 16px;
    outline: none;
}

.price-divider {
    width: 16px;
    height: 1px;
    background: var(--color-gray-300);
    margin-bottom: 24px;
}

/* Stepper */
.stepper-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.stepper-btn {
    min-width: 48px;
    height: 48px;
    border: 1px solid var(--color-gray-300);
    border-radius: var(--radius-full);
    background: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    color: var(--color-gray-700);
}

.stepper-btn:hover {
    border-color: var(--color-gray-900);
}

.stepper-btn.active {
    background: var(--color-gray-900);
    border-color: var(--color-gray-900);
    color: white;
}

/* Amenities Grid */
.amenities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
}

.amenity-card {
    border: 1px solid var(--color-gray-200);
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s;
}

.amenity-card:hover {
    border-color: var(--color-gray-900);
}

.amenity-card.selected {
    border-color: var(--color-gray-900);
    background: var(--color-gray-50);
    box-shadow: inset 0 0 0 1px var(--color-gray-900);
}

.amenity-icon {
    font-size: 24px;
}

.amenity-text {
    font-size: 14px;
    font-weight: 500;
}

.hidden-checkbox {
    display: none;
}

/* Footer */
.modal-footer {
    height: 80px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--color-gray-100);
    background: white;
}

.btn-clear {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-gray-900);
    text-decoration: underline;
    background: none;
    border: none;
    cursor: pointer;
}

.btn-apply {
    background: var(--color-gray-900);
    color: white;
    padding: 14px 24px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: opacity 0.2s;
}

.btn-apply:hover {
    opacity: 0.9;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-slide-enter-active {
    transition: transform 0.3s ease-out;
}

.modal-slide-leave-active {
    transition: transform 0.2s ease-in;
}

.modal-slide-enter-from,
.modal-slide-leave-to {
    transform: translateY(100px);
}

@media (max-width: 768px) {
    .modal-overlay {
        padding: 0;
    }
    
    .modal-content {
        max-height: 100vh;
        border-radius: 0;
    }
}
</style>
