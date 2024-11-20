<script setup lang="ts">
import { defaultPagination, type Pagination } from '@/types'
import type { IErrorResponse } from '@/api/error'
import { ref } from 'vue'
import { Commodity } from '@/api/shopping'
import { Payment } from '@/api/order'
import useCommodityService from './data'
import { usePaymentService } from './data'
import { CommodityCard, CommodityCardAction, CardDialog } from './components'
import { NInfiniteScroll } from 'naive-ui'
import DetailPage from './DetailPage.vue'

const params = ref<Commodity.ICommodityParams>({
  page: 1,
  limit: 4
})

const { loading, noMore, data } = useCommodityService(params)

const addPage = () => {
  if (loading.value || noMore.value) {
    return
  }

  params.value.page += 1
}
</script>

<template>
  <NInfiniteScroll :distance="10" :onLoad="addPage">
    <div
      class="grid gap-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 xxl:grid-cols-6"
    >
      <CommodityCard v-for="item in data" :key="item.gd_no" :commodity="item">
        <template #footer>
          <CommodityCardAction :commodity="item">
            <DetailPage :commodity="item"></DetailPage>
          </CommodityCardAction>
        </template>
      </CommodityCard>
    </div>
    <div class="my-2">
      <div v-if="loading" class="text-center">加载中...</div>
      <div v-if="noMore" class="text-center">没有更多了 🤪</div>
    </div>
  </NInfiniteScroll>
</template>
