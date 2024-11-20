<script setup lang="ts">
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Commodity } from '@/api/shopping'
import { ref } from 'vue'

const { commodity } = defineProps<{
  commodity: Commodity.ICommodityResponse
}>()

const skeletonLoading = ref(true)

setTimeout(() => {
  skeletonLoading.value = false
}, 3000)
</script>

<template>
  <Card
    class="overflow-hidden flex flex-col hover:shadow-sm dark:hover:shadow-white-sm dark:bg-gray-900"
  >
    <CardHeader class="p-0">
      <Skeleton class="h-35 w-full" v-show="skeletonLoading" />
      <img
        :src="commodity.picture_url"
        :alt="commodity.gd_name"
        class="w-full h-35 object-cover"
        @load="() => (skeletonLoading = false)"
        v-show="!skeletonLoading"
      />
    </CardHeader>
    <CardContent class="flex-grow flex flex-col justify-between p-4">
      <div class="space-y-4" v-show="skeletonLoading">
        <Skeleton class="h-4 w-[250px]" />
        <Skeleton class="h-4 w-[200px]" />
        <Skeleton class="h-4 w-[200px]" />
      </div>
      <div v-show="!skeletonLoading">
        <span class="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
          <n-ellipsis class="w-full">{{ commodity.gd_name }}</n-ellipsis>
        </span>

        <div class="mt-2 flex items-center gap-2">
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            库存：<n-badge
              :max="999"
              :value="commodity.in_stock"
              type="info"
              show-zero
              class="text-gray-900!"
            />
          </span>
          <span
            class="text-sm font-medium text-gray-900 dark:text-white"
            v-if="commodity.sales_volume > 0"
          >
            销量：<n-badge
              :max="999"
              :value="commodity.sales_volume"
              type="info"
              show-zero
              class="text-gray-900!"
            />
          </span>
        </div>

        <div class="mt-2 flex items-center space-x-1 flex-wrap">
          <n-tag v-for="(tag, i) in commodity.gd_keywords" :key="i" size="small">
            {{ tag }}
          </n-tag>
        </div>

        <div class="mt-4 flex items-center justify-between gap-4">
          <slot name="footer" :commodity="commodity"></slot>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
