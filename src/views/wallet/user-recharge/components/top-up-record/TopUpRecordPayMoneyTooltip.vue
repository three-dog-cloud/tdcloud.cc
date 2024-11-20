<script setup lang="ts">
import type { Row } from '@tanstack/vue-table'
import type { TopUp } from '@/api/personal'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { h, computed } from 'vue'

const props = defineProps<{
  row: Row<TopUp.TopUpHistory>
}>()

const row = computed(() => props.row)

const actual_amount = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY'
}).format(row.value.original.actual_amount / 100)

const moneyArr = [h('div', '到账金额: ' + actual_amount)]
if (row.value.original.handling_fee > 0) {
  const handling_fee = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(row.value.original.handling_fee / 100)
  moneyArr.push(h('div', '手续费: ' + handling_fee))
}

if (row.value.original.handling_fee_fixed > 0) {
  const handling_fee_fixed = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(row.value.original.handling_fee_fixed)

  moneyArr.push(h('div', `固定手续费：${handling_fee_fixed}`))
}

if (row.value.original.handling_fee_percent > 0) {
  moneyArr.push(h('div', `手续费比例：${row.value.original.handling_fee_percent}%`))
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <slot />
      </TooltipTrigger>
      <TooltipContent>
        <component v-for="(item, index) in moneyArr" :key="index" :is="item" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
