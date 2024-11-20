<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import { TopUp } from '@/api/personal'
import {
  loading,
  data,
  columns,
  hiddenVisibleColumns,
  setPayments,
  pagination,
  setPagination,
  totalResultCount,
  totalResultCountTotal,
  fetchData
} from './columns'
import { DataTable } from '@/components/common/data-tables'
import { Loader } from '@/components/common/loader'

const { payments, parentLoading } = defineProps<{
  payments: TopUp.Payment[]
  parentLoading: boolean
}>()

watch(
  () => parentLoading,
  (newVal: boolean) => {
    if (!newVal) {
      setTimeout(() => {
        fetchData(1, pagination.value.pageSize)
      }, 500)
    }
  }
)

watchEffect(() => {
  setPayments(payments)
})
</script>

<template>
  <div class="w-full">
    <Loader :loading="loading">
      <DataTable
        :data="data"
        :columns="columns"
        :is-selectable="false"
        :filters="[]"
        :hiddenFilters="hiddenVisibleColumns"
        :pagination="pagination"
        :totalPage="totalResultCount"
        :totalCount="totalResultCountTotal"
        @set-pagination="setPagination"
      />
    </Loader>
  </div>
</template>
