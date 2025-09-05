<template>
  <div class="max-w-2xl mx-auto p-6">
    <div v-if="pending" class="text-center py-8">
      <div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading todo...</p>
    </div>

    <div v-else-if="error" class="text-center py-8">
      <div class="text-red-500 text-xl mb-2">❌</div>
      <h2 class="text-xl font-semibold text-red-600">Error Loading Todo</h2>
      <p class="text-gray-600 mt-2">{{ error.statusMessage || 'Something went wrong' }}</p>
      <button @click="refresh()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Try Again
      </button>
    </div>

    <div v-else-if="data" class="space-y-6">
      <div class="border-b pb-4">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <h1 class="text-2xl font-bold text-gray-900">{{ data.title }}</h1>
            <div class="flex items-center gap-4 mt-2">
              <span :class="statusClass" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ data.completed ? '✅ Completed' : '⏳ Pending' }}
              </span>
              <span :class="priorityClass" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ priorityText }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="data.description" class="prose max-w-none">
        <h3 class="text-lg font-semibold text-gray-900">Description</h3>
        <p class="text-gray-700 leading-relaxed">{{ data.description }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Timeline</h3>
            <div class="mt-2 space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Created:</span>
                <span class="font-medium">{{ formatDate(data.createdAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Updated:</span>
                <span class="font-medium">{{ formatDate(data.updatedAt) }}</span>
              </div>
              <div v-if="data.dueDate" class="flex justify-between">
                <span class="text-gray-600">Due:</span>
                <span class="font-medium" :class="isOverdue ? 'text-red-600' : ''">
                  {{ formatDate(data.dueDate) }}
                  <span v-if="isOverdue" class="text-red-500">⚠️</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="data.user">
          <h3 class="text-sm font-semibold text-gray-500 uppercase tracking-wider">Assigned To</h3>
          <div class="mt-2 flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              {{ data.user.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-medium text-gray-900">{{ data.user.name }}</p>
              <p class="text-sm text-gray-500 capitalize">{{ data.user.role }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex space-x-3 pt-4">
        <NuxtLink 
          :to="`/users/${data.user?.id}`" 
          v-if="data.user"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          View User Profile
        </NuxtLink>
        <button @click="editTodo" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
          Edit Todo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

const { data, pending, error, refresh } = await useFetch('/api/todos/1', {
  server: true,
  lazy: true
})

const statusClass = computed(() => {
  return data.value?.completed
    ? 'bg-green-100 text-green-800'
    : 'bg-yellow-100 text-yellow-800'
})

const priorityClass = computed(() => {
  const priority = data.value?.priority
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'low':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-blue-100 text-blue-800'
  }
})

const priorityText = computed(() => {
  const priority = data.value?.priority
  switch (priority) {
    case 'high':
      return '🔴 High Priority'
    case 'low':
      return '🟢 Low Priority'
    default:
      return '🟡 Medium Priority'
  }
})

const isOverdue = computed(() => {
  if (!data.value?.dueDate || data.value?.completed) return false
  return new Date(data.value.dueDate) < new Date()
})

const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A'
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const editTodo = () => {
  console.log("edit")
}

useSeoMeta({
  title: () => data.value ? `Todo: ${data.value.title}` : 'Todo Not Found',
  description: () => data.value?.description || 'View todo details'
})
</script>