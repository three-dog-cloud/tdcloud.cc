<script setup lang="ts">
import { Loader } from '@/components/common/loader'
import { DataTable } from '@/components/common/data-tables'
import type { PaginationState } from '@tanstack/vue-table'
import { onBeforeMount, ref } from 'vue'
import { setPayments, columns, hiddenFilters } from './columns'
import useService from './data'
import { Payment } from '@/api/order'
import type { IErrorResponse } from '@/api'
import { toast } from 'vue-sonner'

const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 10
})

const params = ref<{ [key: string]: any }>({})

const { loading, tableData, totalResultCount, totalResultCountTotal, filter } = useService(
  pagination,
  params
)

function setPagination({ pageIndex, pageSize }: PaginationState): PaginationState {
  pagination.value.pageIndex = pageIndex
  pagination.value.pageSize = pageSize

  return { pageIndex, pageSize }
}

onBeforeMount(() => {
  Payment.getPayOrderPayment()
    .then((res) => {
      setPayments(res)
    })
    .catch((err: IErrorResponse) => {
      toast.error(err.error)
    })
})
</script>

<template>
  <div class="w-full">
    <Loader :loading="loading">
      <DataTable
        :data="tableData"
        :columns="columns"
        :is-selectable="false"
        :hiddenFilters="hiddenFilters"
        :pagination="pagination"
        :totalPage="totalResultCount"
        :totalCount="totalResultCountTotal"
        :filters="filter ?? []"
        @set-pagination="setPagination"
        @search="
          (newValue) => {
            params.value = newValue
          }
        "
      />
    </Loader>
  </div>
</template>
