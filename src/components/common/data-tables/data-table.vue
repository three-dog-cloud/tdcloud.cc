<script setup lang="ts" generic="T extends Object">
import type { ColumnDef, PaginationState } from '@tanstack/vue-table'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'
import { FlexRender, getCoreRowModel, useVueTable } from '@tanstack/vue-table'
import { DataPagination, DataTableColumnToggle, DatatoolBar } from './'
import { ref, watchEffect } from 'vue'
import type { PaginationSearchItem } from '@/types'

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[]
  data: T[]
  totalCount: number
  totalPage: number
  isSelectable: boolean
  hiddenFilters?: {
    [key: string]: string[]
  }
  pagination: PaginationState
  filters: PaginationSearchItem[]
}

const props = defineProps<DataTableProps<T>>()

const emit = defineEmits<{
  setPagination: [PaginationState]
  search: [{ [key: string]: any }]
}>()

const table = useVueTable<T>({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  get pageCount() {
    return props.totalPage
  },
  rowCount: 1000,
  state: {
    pagination: props.pagination,
    columnPinning: {
      right: ['actions']
    }
  },
  manualPagination: true,
  getCoreRowModel: getCoreRowModel(),
  onPaginationChange: (updater) => {
    if (typeof updater === 'function') {
      setPagination(
        updater({
          pageIndex: props.pagination.pageIndex,
          pageSize: props.pagination.pageSize
        })
      )
    } else {
      setPagination(updater)
    }
  },
  getRowId: (originalRow, index) => {
    if ('id' in originalRow) {
      return originalRow.id + '-' + index
    }

    return `row-id-${index}`
  }
})

const setPagination = ({ pageIndex, pageSize }: PaginationState): PaginationState => {
  emit('setPagination', { pageIndex, pageSize })
  return {
    pageIndex: pageIndex,
    pageSize: pageSize
  }
}

const maxWSize: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1792,
  xxl: 1920
}

watchEffect(() => {
  const resizeObserver = new ResizeObserver(() => {
    if (props.hiddenFilters) {
      const obj = props.hiddenFilters
      table.getAllColumns().forEach((column) => {
        for (const key in obj) {
          if (window.innerWidth <= maxWSize[key]) {
            if (obj[key].some((filter) => column.id === filter)) {
              column.toggleVisibility(false)
            }
          } else {
            column.toggleVisibility(true)
          }
        }
      })
    }
  })

  resizeObserver.observe(document.body)
})

const params = ref<{ [key: string]: any }>({})
</script>

<template>
  <DatatoolBar
    :table="table"
    :filters="props.filters"
    v-if="props.filters && props.filters.length > 0"
    class="w-full"
    @update:filterValue="
      (newValue) => {
        params.value = newValue
      }
    "
    @update:search-event="
      () => {
        emit('search', params.value)
      }
    "
  />
  <div class="flex items-center justify-end space-x-2 py-2">
    <slot
      name="pagination"
      :table="table"
      :is-selected="props.isSelectable"
      v-if="props.totalPage > 1"
    >
      <DataPagination :table="table" :is-selected="props.isSelectable" />
    </slot>
    <DataTableColumnToggle :table="table" />
  </div>
  <div class="border rounded-md">
    <Table>
      <TableHeader>
        <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              <slot name="empty-message"> No results. </slot>
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>
