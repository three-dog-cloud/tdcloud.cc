<script setup lang="ts" generic="T">
import { $t } from '@/locales'
import { type Table } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'

defineProps<{
  table: Table<T>
  isSelected: boolean
}>()
</script>

<template>
  <div class="flex items-center justify-center sm:justify-between px-2 space-x-2">
    <div class="lg:flex-1 text-sm text-muted-foreground hidden lg:flex" v-if="isSelected">
      <slot name="filteredSelected" :table="table">
        {{ table.getFilteredSelectedRowModel().rows.length }} {{ $t('common.pagination.selected') }}
      </slot>

      <slot name="items-total" :table="table">
        {{ table.getFilteredRowModel().rows.length }} {{ $t('common.pagination.total') }}
      </slot>
    </div>

    <div class="flex items-center space-x-6 lg:space-x-8">
      <div class="items-center space-x-2 hidden md:flex">
        <p class="text-sm font-medium">
          {{ $t('common.pagination.rows-per-page') }}
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="
            (val: string) => {
              table.setPageSize(parseInt(val))
            }
          "
        >
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="`${table.getState().pagination.pageSize}`" />
          </SelectTrigger>

          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">{{ $t('common.pagination.page.first') }}</span>
          <icon-material-symbols:keyboard-double-arrow-left class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">{{ $t('common.pagination.page.previous') }}</span>
          <icon-material-symbols:chevron-left class="w-4 h-4" />
        </Button>

        <div>
          <span class="font-bold">{{ table.getState().pagination.pageIndex + 1 }}</span>
          /
          <span class="font-bold">{{ table.getPageCount() }}</span>
        </div>

        <Button
          variant="outline"
          class="w-8 h-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">{{ $t('common.pagination.page.next') }}</span>
          <icon-material-symbols:chevron-right class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden w-8 h-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          <span class="sr-only">{{ $t('common.pagination.page.last') }}</span>
          <icon-material-symbols:keyboard-double-arrow-right class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
