<template>
  <div class="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
    <div class="mx-auto px-4">
      <h1
        @click="sendMessage"
        class="text-3xl font-bold text-gray-900 mb-8 text-center transition-colors"
      >
        Todo App
      </h1>

      <div class="mx-auto max-w-7xl">
        <div v-if="todos" class="flex gap-4 flex-wrap">
          <Todo v-for="todo in todos" :key="todo.id" :todo="todo" />
        </div>
        <div v-else-if="todosPending" class="text-center py-8">
          <div
            class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
          ></div>
          <p class="mt-2 text-gray-600">Loading todo...</p>
        </div>
        <div v-else class="text-center py-8 text-red-600">
          Failed to load todo
        </div>

        <!-- Users -->
        <div v-if="users" class="flex gap-4 flex-wrap">
          <User v-for="user in users" :key="user.id" :user="user" />
        </div>
        <div v-else-if="usersPending" class="text-center py-8">
          <div
            class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
          ></div>
          <p class="mt-2 text-gray-600">Loading users...</p>
        </div>
        <div v-else class="text-center py-8 text-red-600">
          Failed to load users
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: todos, pending: todosPending } = await useFetch("/api/todos/getAll?status=false", {key: 'todos'});

const { data: users, pending: usersPending } = await useFetch("/api/users/getAll", {key: 'users'});
console.log(todos);
console.log(users);
const websocket = inject("websocket");

const sendMessage = () => {
  if (websocket && websocket.send) {
    const message = `Hello from ${new Date().toLocaleTimeString()}`;
    websocket.send(message);
    console.log("[WebSocket] Sent message:", message);
  } else {
    console.warn("[WebSocket] Connection not available");
  }
};

useSeoMeta({
  title: "Todo App",
  description: "Simple todo application",
});
</script>
