<template>
    <div class="flex items-center justify-between mb-2">
      <h3 class="font-semibold text-gray-900">{{ user.username }}</h3>
  </div>
</template>

<script setup>

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

