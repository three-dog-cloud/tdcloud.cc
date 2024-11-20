<script setup lang="ts">
const { loading = false } = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="relative">
    <div
      class="absolute bg-gray-300 dark:bg-gray-900 bg-opacity-60 z-10 h-full w-full flex items-center justify-center"
      v-if="loading"
    >
      <div class="flex flex-row gap-2">
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div class="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>

    <slot></slot>
  </div>
</template>
