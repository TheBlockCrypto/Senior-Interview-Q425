<template>
  <NuxtLink
    :to="`/todos/${todo.id}`"
    class="block p-6 bg-yellow-100 hover:bg-yellow-200 transition-colors rounded-lg shadow-sm cursor-pointer"
  >
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-semibold text-gray-900">{{ todo.title }}</h3>
      <span
        :class="todo.completed ? 'text-green-600' : 'text-yellow-600'"
        class="text-sm"
      >
        {{ todo.completed ? "✅" : "⏳" }}
      </span>
    </div>
    <p class="text-gray-700 text-sm">{{ todo.description }}</p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  todo: {
    type: Object,
    required: true,
  },
});
</script>

