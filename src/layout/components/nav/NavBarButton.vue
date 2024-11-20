<script setup lang="ts">
defineProps<{
  buttonText: string
  handleRightButtonClick?: () => void
}>()
</script>
<template>
  <button
    class="block px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all ease-in-out duration-150 m-1"
    @click="handleRightButtonClick"
  >
    {{ buttonText }}
  </button>
</template>
