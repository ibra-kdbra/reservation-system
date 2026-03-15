<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Listing Approvals</h3>
        </div>
        <div class="border-t border-gray-200">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Property
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Host
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="listing in listings" :key="listing.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="h-10 w-10 flex-shrink-0">
                                        <img class="h-10 w-10 rounded object-cover" :src="listing.coverImage" alt="" />
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900 truncate max-w-xs"
                                            :title="listing.title">
                                            {{ listing.title }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ listing.propertyType }} • ${{ listing.pricePerNight }}/night
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ listing.host.firstName }} {{ listing.host.lastName
                                    }}</div>
                                <div class="text-sm text-gray-500">{{ listing.host.email }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ listing.city }}, {{ listing.country }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                                    'bg-green-100 text-green-800': listing.status === 'PUBLISHED',
                                    'bg-yellow-100 text-yellow-800': listing.status === 'DRAFT' || listing.status === 'UNLISTED',
                                    'bg-red-100 text-red-800': listing.status === 'REJECTED' // if implemented
                                }">
                                    {{ listing.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button v-if="listing.status !== 'PUBLISHED'" @click="approveListing(listing.id)"
                                    class="text-green-600 hover:text-green-900">Approve</button>
                                <button v-if="listing.status === 'PUBLISHED'" @click="rejectListing(listing.id)"
                                    class="text-red-600 hover:text-red-900">Unpublish</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/api/client'

const listings = ref<any[]>([])

const loadListings = async () => {
    try {
        const { data: wrapper } = await api.getAdminListings()
        listings.value = wrapper.data
    } catch (error) {
        console.error('Failed to load listings', error)
    }
}

const approveListing = async (id: string) => {
    try {
        await api.approveListing(id)
        await loadListings()
    } catch (error) {
        console.error('Failed to approve listing', error)
    }
}

const rejectListing = async (id: string) => {
    if (!confirm('Are you sure you want to unpublish this listing?')) return
    try {
        await api.rejectListing(id)
        await loadListings()
    } catch (error) {
        console.error('Failed to reject listing', error)
    }
}

onMounted(loadListings)
</script>
