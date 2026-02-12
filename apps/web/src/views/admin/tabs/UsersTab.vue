<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Users Management</h3>
        </div>
        <div class="border-t border-gray-200">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Joined
                            </th>
                            <th scope="col" class="relative px-6 py-3">
                                <span class="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="user in users" :key="user.id">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img class="h-10 w-10 rounded-full"
                                            :src="user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`"
                                            alt="" />
                                    </div>
                                    <div class="ml-4">
                                        <div class="text-sm font-medium text-gray-900">
                                            {{ user.firstName }} {{ user.lastName }}
                                        </div>
                                        <div class="text-sm text-gray-500">
                                            {{ user.email }}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : (user.role === 'HOST' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800')">
                                    {{ user.role }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                    {{ user.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ new Date(user.createdAt).toLocaleDateString() }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button v-if="user.status === 'ACTIVE' && user.role !== 'ADMIN'"
                                    @click="banUser(user.id)" class="text-red-600 hover:text-red-900">Ban</button>
                                <button v-if="user.status === 'SUSPENDED'" @click="activateUser(user.id)"
                                    class="text-green-600 hover:text-green-900">Activate</button>
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

const users = ref<any[]>([])

const loadUsers = async () => {
    try {
        const res = await api.getAdminUsers()
        users.value = res.data
    } catch (error) {
        console.error('Failed to load users', error)
    }
}

const banUser = async (id: string) => {
    if (!confirm('Are you sure you want to ban this user?')) return
    try {
        await api.banUser(id)
        await loadUsers()
    } catch (error) {
        console.error('Failed to ban user', error)
    }
}

const activateUser = async (id: string) => {
    try {
        await api.activateUser(id)
        await loadUsers()
    } catch (error) {
        console.error('Failed to activate user', error)
    }
}

onMounted(loadUsers)
</script>
