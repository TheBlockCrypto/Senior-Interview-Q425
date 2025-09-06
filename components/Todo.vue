<template>
  <div
   
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
    <br />
    <NuxtLink :to="`/todos/${todo.id}`" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
        Open
    </NuxtLink>
     <input @click="markToDoAsCompleted" type="checkbox" id="scales" name="scales" class="ml-10" v-model="todo.completed" />
     <label for="checkbox">Mark as completed</label>
  </div>
</template>

<script setup>

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
});

console.log(props.todo)

const markToDoAsCompleted = async () => {
  if (props.todo.completed === false) {
    await $fetch('/api/todos/updateTodoStatus', {
    method: 'POST',
      body: {
        id: props.todo.id
      }
    })
  }
}



</script>

