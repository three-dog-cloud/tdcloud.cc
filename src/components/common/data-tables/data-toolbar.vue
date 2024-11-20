<script setup lang="ts" generic="T">
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { PaginationSearchItem } from '@/types'
import type { Table } from '@tanstack/vue-table'
import { computed, h, onBeforeMount, ref, watchEffect } from 'vue'
import { DataDatePicker, DataFacetedFilter } from '.'

interface DataToolbarProps {
  table: Table<T>
  filters: PaginationSearchItem[]
}

const props = defineProps<DataToolbarProps>()

const emits = defineEmits<{
  'update:filterValue': [value: { [key: string]: any }]
  'update:searchEvent': []
}>()

const data = ref<{ [key: string]: any }>({})

const isDateTimeRange = computed(
  () => props.filters.some((f) => f.type == 'datetime') && props.filters.some((f) => f.label == '-')
)

onBeforeMount(() => {
  const start_time = props.filters.find((f) => f.type == 'datetime' && f.name == 'start_time')
  const end_time = props.filters.find((f) => f.label == '-' && f.name == 'end_time')

  if (start_time) {
    data.value = {
      ...data.value,
      start_time: start_time.value.split(' ')[0]
    }
  }

  if (end_time) {
    data.value = {
      ...data.value,
      end_time: end_time.value.split(' ')[0]
    }
  }

  props.filters.map((f) => {
    if (f.type == 'input' || f.type == 'select') {
      data.value = {
        ...data.value,
        [f.name]: f.value
      }
    }
  })
})

const handleFieldComponent = (c: PaginationSearchItem) => {
  if (c.type == 'input') {
    return h(Input, {
      class: 'h-8 w-full md:w-[17rem]',
      type: 'text',
      placeholder: c.label,
      modelValue: data.value?.[c.name] || c.value,
      ['onUpdate:modelValue']: (payload: string | number) => {
        data.value = { ...data.value, [c.name]: payload }
      }
    })
  }

  if (c.type == 'select') {
    return h(DataFacetedFilter, {
      title: c.label,
      options: c.options ?? [],
      selected: [data.value?.[c.name]],
      ['onUpdate:setSelected']: (payload: string | number) => {
        data.value = { ...data.value, [c.name]: payload }
      }
    })
  }

  if (c.type == 'datetime') {
    return h(DataDatePicker, null)
  }
}

watchEffect(() => {
  const params = data.value
  if (isDateTimeRange.value) {
    if (params.start_time && params.start_time.split(' ').length < 2) {
      params.start_time = `${params.start_time} 00:00:00`
    }

    if (params.end_time && params.end_time.split(' ').length < 2) {
      params.end_time = `${params.end_time} 23:59:59`
    }
  }
  emits('update:filterValue', params)
})
</script>

<template>
  <div class="flex flex-wrap gap-4 content-start">
    <component
      v-for="f in props.filters.filter((f) => f.type != 'datetime')"
      :key="f.name"
      :is="handleFieldComponent(f)"
    />
    <template v-if="isDateTimeRange">
      <DataDatePicker
        :start_time="data?.start_time"
        :end_time="data?.end_time"
        @update:time="
          (t: string, field: string) => {
            data = {
              ...data,
              [field]: t
            }
          }
        "
      />
    </template>
    <Button @click="$emit('update:searchEvent')">查询</Button>
  </div>
</template>
