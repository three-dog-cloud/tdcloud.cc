<script setup lang="ts"></script>

<template>
  <nav class="flex justify-between items-center px-4 py-3 top-0">
    <!-- 左侧区域 -->
    <div class="flex-shrink-0 flex-grow ml-2 md:ml-6 flex justify-start">
      <slot name="left">
        <RouterLink to="/" class="flex items-center">
          <icon-logos:apidog-icon
            class="w-6 sm:w-8 lg:w-10 h-6 sm:h-8 lg:h-10 mr-2 transition-transform duration-300 hover:scale-110"
          />
          <span class="text-lg font-bold">三狗云</span>
        </RouterLink>
      </slot>
    </div>

    <!-- 中间区域 -->
    <div class="absolute left-1/2 transform -translate-x-1/2">
      <slot name="center" />
    </div>

    <!-- 右侧区域 -->
    <div class="flex flex-grow justify-end mr-1 lg:mr-36">
      <slot name="right" />
    </div>
  </nav>
</template>
