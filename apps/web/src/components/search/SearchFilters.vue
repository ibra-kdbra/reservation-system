<template>
    <div class="filters-panel" :class="{ expanded: isExpanded }">
        <button class="filters-toggle" @click="isExpanded = !isExpanded">
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path fill-rule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" />
            </svg>
            <span>Filters</span>
            <span v-if="activeCount > 0" class="filter-badge">{{ activeCount }}</span>
            <svg class="toggle-chevron" :class="{ open: isExpanded }" viewBox="0 0 20 20" fill="currentColor" width="14"
                height="14">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
            </svg>
        </button>

        <Transition name="panel">
            <div v-if="isExpanded" class="filters-body">
                <!-- Property Type -->
                <div class="filter-group">
                    <label class="filter-label">Property Type</label>
                    <div class="chip-group">
                        <button v-for="type in propertyTypes" :key="type.value" class="chip"
                            :class="{ active: filters.propertyType === type.value }" @click="toggleType(type.value)">
                            {{ type.label }}
                        </button>
                    </div>
                </div>

                <!-- Price Range -->
                <div class="filter-group">
                    <label class="filter-label">Price Range</label>
                    <div class="price-inputs">
                        <div class="input-wrap">
                            <span class="input-prefix">$</span>
                            <input type="number" v-model.number="filters.minPrice" placeholder="Min" min="0" />
                        </div>
                        <span class="dash">–</span>
                        <div class="input-wrap">
                            <span class="input-prefix">$</span>
                            <input type="number" v-model.number="filters.maxPrice" placeholder="Max" min="0" />
                        </div>
                    </div>
                </div>

                <!-- Guests -->
                <div class="filter-group">
                    <label class="filter-label">Guests</label>
                    <div class="stepper-group">
                        <button v-for="n in [1, 2, 3, 4, 5, 6, 8]" :key="n" class="stepper-btn"
                            :class="{ active: filters.guests === n }"
                            @click="filters.guests = filters.guests === n ? 1 : n">
                            {{ n === 8 ? '8+' : n }}
                        </button>
                    </div>
                </div>

                <!-- Amenities -->
                <div class="filter-group full-width">
                    <label class="filter-label">Amenities</label>
                    <div class="amenities-grid">
                        <label v-for="amenity in amenitiesList" :key="amenity.name" class="checkbox-label">
                            <input type="checkbox" :value="amenity.name" v-model="filters.amenities">
                            <span class="checkbox-text">{{ amenity.icon }} {{ amenity.name }}</span>
                        </label>
                    </div>
                </div>

                <!-- Actions -->
                <div class="filter-actions">
                    <button class="btn-clear" @click="clearFilters">Clear all</button>
                    <button class="btn-apply" @click="applyFilters">Show results</button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

const props = defineProps<{
    initialFilters: any
}>()

const emit = defineEmits<{
    apply: [filters: any]
}>()

const isExpanded = ref(false)

const propertyTypes = [
    { value: 'APARTMENT', label: 'Apartment' },
    { value: 'HOUSE', label: 'House' },
    { value: 'VILLA', label: 'Villa' },
    { value: 'STUDIO', label: 'Studio' },
    { value: 'LOFT', label: 'Loft' },
    { value: 'ROOM', label: 'Room' },
    { value: 'COTTAGE', label: 'Cottage' },
]

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
    amenities: props.initialFilters.amenities || [],
})

// Update local state when props change
watch(() => props.initialFilters, (newFilters) => {
    filters.propertyType = newFilters.propertyType || ''
    filters.minPrice = newFilters.minPrice || null
    filters.maxPrice = newFilters.maxPrice || null
    filters.guests = newFilters.guests || 1
    filters.amenities = newFilters.amenities || []
}, { deep: true })

const activeCount = computed(() => {
    let count = 0
    if (filters.propertyType) count++
    if (filters.minPrice || filters.maxPrice) count++
    if (filters.guests > 1) count++
    if (filters.amenities && filters.amenities.length > 0) count += filters.amenities.length
    return count
})

function toggleType(type: string) {
    if (filters.propertyType === type) {
        filters.propertyType = ''
    } else {
        filters.propertyType = type
    }
}

function clearFilters() {
    filters.propertyType = ''
    filters.minPrice = null
    filters.maxPrice = null
    filters.guests = 1
    filters.amenities = []
    emit('apply', { ...filters }) // Emit cleared state immediately or just clear local? User expects 'Show results' or immediate?
    // Usually 'Clear all' might just reset UI, but let's apply for better UX or wait for 'Show results'
    // Let's just reset UI and let user click Show results, OR apply immediately.
    // Given the component structure, 'Show results' is the main trigger.
    // But 'Clear all' usually implies action. Let's emit.
    emit('apply', getCleanFilters())
}

function applyFilters() {
    emit('apply', getCleanFilters())
    isExpanded.value = false
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
.filters-panel {
    margin-bottom: 24px;
}

.filters-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 9999px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filters-toggle:hover {
    border-color: #d1d5db;
    background: #f9fafb;
}

.filter-badge {
    background: black;
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-chevron {
    transition: transform 0.2s;
    color: #9ca3af;
}

.toggle-chevron.open {
    transform: rotate(180deg);
}

.filters-body {
    margin-top: 12px;
    padding: 24px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.filter-group {
    flex: 1 1 200px;
    min-width: 180px;
}

.filter-group.full-width {
    flex-basis: 100%;
}

.filter-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
}

/* Chips */
.chip-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.chip {
    padding: 6px 12px;
    border: 1px solid #e5e7eb;
    background: white;
    border-radius: 9999px;
    font-size: 13px;
    cursor: pointer;
    transition: all 0.15s;
    color: #4b5563;
}

.chip:hover {
    border-color: #9ca3af;
}

.chip.active {
    background: black;
    color: white;
    border-color: black;
}

/* Price */
.price-inputs {
    display: flex;
    align-items: center;
    gap: 8px;
}

.input-wrap {
    position: relative;
    flex: 1;
}

.input-prefix {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 14px;
}

.input-wrap input {
    width: 100%;
    padding: 8px 10px 8px 24px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    font-size: 14px;
}

.input-wrap input:focus {
    outline: none;
    border-color: black;
}

.dash {
    color: #9ca3af;
}

/* Stepper */
.stepper-group {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.stepper-btn {
    width: 36px;
    height: 36px;
    border: 1px solid #e5e7eb;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.15s;
    color: #4b5563;
    display: flex;
    align-items: center;
    justify-content: center;
}

.stepper-btn:hover {
    border-color: #9ca3af;
}

.stepper-btn.active {
    background: black;
    color: white;
    border-color: black;
}

/* Amenities Grid */
.amenities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: #4b5563;
}

.checkbox-label input {
    accent-color: black;
    width: 16px;
    height: 16px;
}

/* Actions */
.filter-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding-top: 16px;
    border-top: 1px solid #f3f4f6;
    margin-top: 16px;
}

.btn-clear {
    padding: 8px 16px;
    border: none;
    background: none;
    color: #6b7280;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    text-decoration: underline;
}

.btn-clear:hover {
    color: black;
}

.btn-apply {
    padding: 10px 24px;
    background: black;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    transition: opacity 0.2s;
}

.btn-apply:hover {
    opacity: 0.9;
}

/* Panel transition */
.panel-enter-active {
    animation: panel-in 0.2s ease-out;
}

.panel-leave-active {
    animation: panel-in 0.1s ease-in reverse;
}

@keyframes panel-in {
    from {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0;
    }

    to {
        opacity: 1;
        transform: translateY(0);
        max-height: 800px;
    }
}
</style>
