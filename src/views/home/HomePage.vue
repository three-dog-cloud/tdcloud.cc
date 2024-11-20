<script setup lang="ts">
import { useRoute } from 'vue-router'
import Typed from '@/components/Typed.vue'

const route = useRoute()

defineOptions({
  name: 'HomePage'
})
</script>

<template>
  <section
    class="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-145px)] px-4 text-center"
  >
    <h1 class="text-3xl font-bold leading-tight md:text-4xl lg:text-7xl mb-4">
      <Typed
        :speed="180"
        :loop="true"
        :typedList="['接口', '服务', '商品']"
        class="inline-flex bg-gradient-to-r from-green-500 to-primary bg-clip-text text-transparent"
      >
        <template #prefix> 购买或出售 </template>
      </Typed>
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
      欢迎使用三狗云，专注保护你的隐私，助力您的业务快速发展。
    </p>
  </section>
</template>
