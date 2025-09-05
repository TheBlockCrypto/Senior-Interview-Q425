<template>
  <div class="max-w-2xl mx-auto p-6">
    <div v-if="pending" class="text-center py-8">
      <div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading user...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <div class="text-red-500 text-xl mb-2">❌</div>
      <h2 class="text-xl font-semibold text-red-600">Error Loading User</h2>
      <p class="text-gray-600 mt-2">{{ error.statusMessage || 'Something went wrong' }}</p>
      <button @click="refresh()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Try Again
      </button>
    </div>

    <div v-else-if="data" class="space-y-6">
      <div class="text-center border-b pb-6">
        <div class="w-24 h-24 mx-auto mb-4">
          <div v-if="data.avatar" class="w-full h-full rounded-full overflow-hidden">
            <img :src="data.avatar" :alt="data.name" class="w-full h-full object-cover">
          </div>
          <div v-else class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {{ data.name.charAt(0).toUpperCase() }}
          </div>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-900">{{ data.name }}</h1>
        <p class="text-lg text-gray-600 capitalize mt-1">{{ data.role }}</p>
        
        <div :class="roleClass" class="inline-block px-3 py-1 rounded-full text-sm font-medium mt-3">
          {{ roleIcon }} {{ data.role.charAt(0).toUpperCase() + data.role.slice(1) }}
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Information</h3>
            <div class="space-y-2">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span class="text-gray-600">✉️</span>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Email</p>
                  <p class="font-medium text-gray-900">{{ data.email }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Account Details</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">User ID:</span>
                <span class="font-medium font-mono">#{{ data.id }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Member Since:</span>
                <span class="font-medium">{{ formatDate(data.createdAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Last Updated:</span>
                <span class="font-medium">{{ formatDate(data.updatedAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Account Age:</span>
                <span class="font-medium">{{ accountAge }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
        <div class="grid grid-cols-3 gap-4 text-center">
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="text-2xl font-bold text-blue-600">🎯</div>
            <p class="text-sm text-gray-500 mt-1">Active User</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="text-2xl font-bold text-green-600">👤</div>
            <p class="text-sm text-gray-500 mt-1">{{ data.role }} Role</p>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="text-2xl font-bold text-purple-600">⚡</div>
            <p class="text-sm text-gray-500 mt-1">Verified</p>
          </div>
        </div>
      </div>

      <div class="flex space-x-3 pt-4">
        <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Send Message
        </button>
        <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
          View Todos
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

const { data, pending, error, refresh } = await useFetch(`/api/users/${id}`, {
  server: true,
  lazy: true
})

const roleClass = computed(() => {
  const role = data.value?.role
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800'
    case 'moderator':
      return 'bg-orange-100 text-orange-800'
    case 'premium':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
})

const roleIcon = computed(() => {
  const role = data.value?.role
  switch (role) {
    case 'admin':
      return '👑'
    case 'moderator':
      return '🛡️'
    case 'premium':
      return '⭐'
    default:
      return '👤'
  }
})

const accountAge = computed(() => {
  if (!data.value?.createdAt) return 'Unknown'
  
  const created = new Date(data.value.createdAt)
  const now = new Date()
  const diffTime = Math.abs(now - created)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 30) {
    return `${diffDays} days`
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months`
  } else {
    return `${Math.floor(diffDays / 365)} years`
  }
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useSeoMeta({
  title: () => data.value ? `User: ${data.value.name}` : 'User Not Found',
  description: () => `Profile page for ${data.value?.name || 'user'}`
})
</script>