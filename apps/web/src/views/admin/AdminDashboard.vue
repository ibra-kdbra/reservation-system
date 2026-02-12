<template>
    <div class="min-h-full bg-gray-100">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 class="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <div class="flex items-center space-x-4">
                    <span class="text-sm text-gray-500">Administrator Access</span>
                </div>
            </div>
        </header>

        <main>
            <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <!-- Tabs -->
                <div class="border-b border-gray-200 mb-6">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        <button v-for="tab in tabs" :key="tab.name" @click="currentTab = tab.name" :class="[
                            currentTab === tab.name
                                ? 'border-brand-600 text-brand-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                        ]" :aria-current="currentTab === tab.name ? 'page' : undefined">
                            {{ tab.label }}
                        </button>
                    </nav>
                </div>

                <!-- Tab Content -->
                <component :is="activeComponent" />
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import OverviewTab from './tabs/OverviewTab.vue'
import UsersTab from './tabs/UsersTab.vue'
import ListingsTab from './tabs/ListingsTab.vue'

const tabs = [
    { name: 'overview', label: 'Overview', component: OverviewTab },
    { name: 'users', label: 'Users', component: UsersTab },
    { name: 'listings', label: 'Listings', component: ListingsTab },
]

const currentTab = ref('overview')

const activeComponent = computed(() => {
    return tabs.find(t => t.name === currentTab.value)?.component || OverviewTab
})
</script>
