<template>
    <div class="space-y-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <!-- Total Users -->
            <div class="bg-white overflow-hidden shadow rounded-lg stat-card">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <Users class="w-8 h-8 vibrant-icon icon-vibrant-users" />
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">{{ stats.users }}</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Listings -->
            <div class="bg-white overflow-hidden shadow rounded-lg stat-card">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <Home class="w-8 h-8 vibrant-icon icon-vibrant-home" />
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Listings</dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">{{ stats.listings }}</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Bookings -->
            <div class="bg-white overflow-hidden shadow rounded-lg stat-card">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <Calendar class="w-8 h-8 vibrant-icon icon-vibrant-calendar" />
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">{{ stats.bookings }}</div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Revenue -->
            <div class="bg-white overflow-hidden shadow rounded-lg stat-card">
                <div class="p-5">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <DollarSign class="w-8 h-8 vibrant-icon icon-vibrant-revenue" />
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">${{ stats.revenue.toLocaleString() }}
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Users, Home, Calendar, DollarSign } from 'lucide-vue-next'
import { api } from '@/api/client'

const stats = ref({
    users: 0,
    listings: 0,
    bookings: 0,
    revenue: 0,
})

onMounted(async () => {
    try {
        const { data: wrapper } = await api.getAdminStats()
        stats.value = wrapper.data
    } catch (error) {
        console.error('Failed to load admin stats', error)
    }
})
</script>
