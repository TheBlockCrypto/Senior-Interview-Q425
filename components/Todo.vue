<template>
  <div class="p-6 bg-yellow-100 hover:bg-yellow-200 transition-colors rounded-lg shadow-sm">
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-3">
        <input 
          type="checkbox" 
          :checked="todo.completed"
          class="w-4 h-4"
        />
        <h3 class="font-semibold text-gray-900">{{ todo.title }}</h3>
      </div>
      <span
        :class="todo.completed ? 'text-green-600' : 'text-yellow-600'"
        class="text-sm"
      >
        {{ todo.completed ? "✅" : "⏳" }}
      </span>
    </div>
    <p class="text-gray-700 text-sm mb-2">{{ todo.description }}</p>
    <NuxtLink :to="`/todos/${todo.id}`" class="text-blue-600 text-sm hover:underline">
      View note
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>

