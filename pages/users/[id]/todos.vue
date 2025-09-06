<template>
  <div class="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
    <div class="mx-auto px-4">
      <div class="mx-auto max-w-7xl">
        <div v-if="data" class="flex gap-4 flex-wrap">
          <Todo v-for="todo in data" :key="todo.id" :todo="todo" />
        </div>
        <div v-else-if="pending" class="text-center py-8">
          <div
            class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
          ></div>
          <p class="mt-2 text-gray-600">Loading User todos...</p>
        </div>
        <div v-else class="text-center py-8 text-red-600">
          Failed to load user todos
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const id = route.params.id

const { data, pending } = await useFetch(`/api/todos/getByUserId?userId=${id}`);
</script>