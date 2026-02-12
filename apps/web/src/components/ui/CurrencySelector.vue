<template>
    <div class="currency-selector" ref="selectorRef">
        <button class="currency-btn" @click="isOpen = !isOpen" :aria-expanded="isOpen">
            <span class="currency-flag">{{ currencyStore.selected.flag }}</span>
            <span class="currency-code">{{ currencyStore.selected.code }}</span>
            <svg class="chevron" :class="{ open: isOpen }" viewBox="0 0 20 20" fill="currentColor" width="14"
                height="14">
                <path fill-rule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
            </svg>
        </button>

        <Transition name="dropdown">
            <div v-if="isOpen" class="currency-dropdown">
                <button v-for="c in currencyStore.currencies" :key="c.code" class="currency-option"
                    :class="{ active: c.code === currencyStore.selectedCode }" @click="select(c.code)">
                    <span class="option-flag">{{ c.flag }}</span>
                    <span class="option-info">
                        <span class="option-code">{{ c.code }}</span>
                        <span class="option-name">{{ c.name }}</span>
                    </span>
                    <svg v-if="c.code === currencyStore.selectedCode" class="check-icon" viewBox="0 0 20 20"
                        fill="currentColor" width="16" height="16">
                        <path fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" />
                    </svg>
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCurrencyStore } from '../../stores/currency'

const currencyStore = useCurrencyStore()
const isOpen = ref(false)
const selectorRef = ref<HTMLElement | null>(null)

function select(code: string) {
    currencyStore.setCurrency(code)
    isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
    if (selectorRef.value && !selectorRef.value.contains(e.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.currency-selector {
    position: relative;
}

.currency-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-gray-200);
    background: white;
    cursor: pointer;
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--color-gray-700);
    transition: all var(--transition-fast);
}

.currency-btn:hover {
    border-color: var(--color-primary-300);
    background: var(--color-primary-50);
}

.currency-flag {
    font-size: 1.1rem;
}

.chevron {
    transition: transform 0.2s ease;
    color: var(--color-gray-400);
}

.chevron.open {
    transform: rotate(180deg);
}

.currency-dropdown {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    min-width: 240px;
    background: white;
    border-radius: var(--radius-xl);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05);
    border: 1px solid var(--color-gray-100);
    padding: 6px;
    z-index: 100;
    max-height: 360px;
    overflow-y: auto;
}

.currency-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 10px 12px;
    border: none;
    background: none;
    border-radius: var(--radius-md);
    cursor: pointer;
    text-align: left;
    transition: background 0.15s ease;
}

.currency-option:hover {
    background: var(--color-gray-50);
}

.currency-option.active {
    background: var(--color-primary-50);
}

.option-flag {
    font-size: 1.2rem;
}

.option-info {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.option-code {
    font-weight: 600;
    font-size: var(--font-size-sm);
    color: var(--color-gray-800);
}

.option-name {
    font-size: 0.75rem;
    color: var(--color-gray-500);
}

.check-icon {
    color: var(--color-primary-500);
}

/* Dropdown transition */
.dropdown-enter-active {
    animation: dropdown-in 0.2s ease-out;
}

.dropdown-leave-active {
    animation: dropdown-in 0.15s ease-in reverse;
}

@keyframes dropdown-in {
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.96);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>
