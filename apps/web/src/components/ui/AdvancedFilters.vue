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
                    <label class="filter-label">Price Range (per night)</label>
                    <div class="price-inputs">
                        <div class="input-wrap">
                            <span class="input-prefix">{{ currencyStore.selected.symbol }}</span>
                            <input type="number" v-model.number="filters.minPrice" placeholder="Min" min="0" />
                        </div>
                        <span class="dash">–</span>
                        <div class="input-wrap">
                            <span class="input-prefix">{{ currencyStore.selected.symbol }}</span>
                            <input type="number" v-model.number="filters.maxPrice" placeholder="Max" min="0" />
                        </div>
                    </div>
                </div>

                <!-- Bedrooms -->
                <div class="filter-group">
                    <label class="filter-label">Bedrooms</label>
                    <div class="stepper-group">
                        <button v-for="n in [0, 1, 2, 3, 4]" :key="n" class="stepper-btn"
                            :class="{ active: filters.bedrooms === n }"
                            @click="filters.bedrooms = filters.bedrooms === n ? undefined : n">
                            {{ n === 0 ? 'Any' : n === 4 ? '4+' : n }}
                        </button>
                    </div>
                </div>

                <!-- Guests -->
                <div class="filter-group">
                    <label class="filter-label">Guests</label>
                    <div class="stepper-group">
                        <button v-for="n in [0, 1, 2, 3, 4, 6, 8]" :key="n" class="stepper-btn"
                            :class="{ active: filters.maxGuests === n }"
                            @click="filters.maxGuests = filters.maxGuests === n ? undefined : n">
                            {{ n === 0 ? 'Any' : n === 8 ? '8+' : n }}
                        </button>
                    </div>
                </div>

                <!-- Instant Book -->
                <div class="filter-group inline">
                    <label class="filter-label">Instant Book only</label>
                    <label class="toggle-switch">
                        <input type="checkbox" v-model="filters.instantBook" />
                        <span class="toggle-track"></span>
                    </label>
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
import { ref, reactive, computed } from 'vue'
import { useCurrencyStore } from '../../stores/currency'

const currencyStore = useCurrencyStore()

const emit = defineEmits<{
    apply: [filters: Record<string, any>]
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

const filters = reactive<Record<string, any>>({
    propertyType: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined,
    maxGuests: undefined,
    instantBook: false,
})

const activeCount = computed(() => {
    let count = 0
    if (filters.propertyType) count++
    if (filters.minPrice) count++
    if (filters.maxPrice) count++
    if (filters.bedrooms) count++
    if (filters.maxGuests) count++
    if (filters.instantBook) count++
    return count
})

function toggleType(type: string) {
    filters.propertyType = filters.propertyType === type ? undefined : type
}

function clearFilters() {
    filters.propertyType = undefined
    filters.minPrice = undefined
    filters.maxPrice = undefined
    filters.bedrooms = undefined
    filters.maxGuests = undefined
    filters.instantBook = false
    emit('apply', {})
}

function applyFilters() {
    const params: Record<string, any> = {}
    if (filters.propertyType) params.propertyType = filters.propertyType
    if (filters.minPrice) params.minPrice = filters.minPrice
    if (filters.maxPrice) params.maxPrice = filters.maxPrice
    if (filters.bedrooms) params.bedrooms = filters.bedrooms
    if (filters.maxGuests) params.maxGuests = filters.maxGuests
    if (filters.instantBook) params.instantBook = true
    emit('apply', params)
}
</script>

<style scoped>
.filters-panel {
    margin-bottom: var(--spacing-xl);
}

.filters-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    background: white;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-xl);
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-gray-700);
    transition: all 0.2s;
}

.filters-toggle:hover {
    border-color: var(--color-primary-300);
    background: var(--color-primary-50);
}

.filter-badge {
    background: var(--color-primary-500);
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
    color: var(--color-gray-400);
}

.toggle-chevron.open {
    transform: rotate(180deg);
}

.filters-body {
    margin-top: var(--spacing-md);
    padding: var(--spacing-xl);
    background: white;
    border: 1px solid var(--color-gray-100);
    border-radius: var(--radius-xl);
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xl);
}

.filter-group {
    flex: 1 1 200px;
    min-width: 180px;
}

.filter-group.inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.filter-label {
    display: block;
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-gray-700);
    margin-bottom: var(--spacing-sm);
}

.filter-group.inline .filter-label {
    margin-bottom: 0;
}

/* Chips */
.chip-group {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.chip {
    padding: 6px 14px;
    border: 1px solid var(--color-gray-200);
    background: white;
    border-radius: 9999px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.15s;
    color: var(--color-gray-600);
}

.chip:hover {
    border-color: var(--color-primary-300);
}

.chip.active {
    background: var(--color-primary-500);
    color: white;
    border-color: var(--color-primary-500);
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
    color: var(--color-gray-400);
    font-size: var(--font-size-sm);
}

.input-wrap input {
    width: 100%;
    padding: 8px 10px 8px 28px;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
}

.input-wrap input:focus {
    outline: none;
    border-color: var(--color-primary-400);
}

.dash {
    color: var(--color-gray-400);
}

/* Stepper */
.stepper-group {
    display: flex;
    gap: 6px;
}

.stepper-btn {
    width: 40px;
    height: 36px;
    border: 1px solid var(--color-gray-200);
    border-radius: var(--radius-md);
    background: white;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: all 0.15s;
    color: var(--color-gray-600);
}

.stepper-btn:hover {
    border-color: var(--color-primary-300);
}

.stepper-btn.active {
    background: var(--color-primary-500);
    color: white;
    border-color: var(--color-primary-500);
}

/* Toggle */
.toggle-switch {
    position: relative;
    width: 44px;
    height: 24px;
    cursor: pointer;
}

.toggle-switch input {
    display: none;
}

.toggle-track {
    position: absolute;
    inset: 0;
    background: var(--color-gray-200);
    border-radius: 12px;
    transition: background 0.2s;
}

.toggle-track::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: transform 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.toggle-switch input:checked+.toggle-track {
    background: var(--color-primary-500);
}

.toggle-switch input:checked+.toggle-track::after {
    transform: translateX(20px);
}

/* Actions */
.filter-actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-gray-100);
}

.btn-clear {
    padding: 8px 20px;
    border: none;
    background: none;
    color: var(--color-gray-600);
    font-weight: 600;
    cursor: pointer;
    font-size: var(--font-size-sm);
}

.btn-clear:hover {
    color: var(--color-gray-900);
}

.btn-apply {
    padding: 8px 24px;
    background: var(--color-primary-500);
    color: white;
    border: none;
    border-radius: var(--radius-lg);
    font-weight: 600;
    cursor: pointer;
    font-size: var(--font-size-sm);
    transition: background 0.2s;
}

.btn-apply:hover {
    background: var(--color-primary-600);
}

/* Panel transition */
.panel-enter-active {
    animation: panel-in 0.25s ease-out;
}

.panel-leave-active {
    animation: panel-in 0.15s ease-in reverse;
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
        max-height: 500px;
    }
}
</style>
