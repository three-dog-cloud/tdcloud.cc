<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Loader } from '@/components/common/loader'
import { h, ref } from 'vue'
import { TopUp } from '@/api/personal'
import type { Row } from '@tanstack/vue-table'
import { computed } from 'vue'
import type { VNode } from 'vue'
import { watchEffect } from 'vue'

const props = defineProps<{
  loading: boolean
  open: boolean
  row: Row<TopUp.TopUpHistory>
}>()

const emits = defineEmits<{
  'update:setOpen': [boolean]
  'update:cancelRecord': [number]
  'update:payRecord': [number]
}>()

const data = computed<TopUp.TopUpHistory>(() => props.row.original)

const pay_money = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY'
}).format(Number(data.value.pay_money / 100))

const handling_fee = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY'
}).format(Number(data.value.handling_fee / 100))

const actual_amount = new Intl.NumberFormat('zh-CN', {
  style: 'currency',
  currency: 'CNY'
}).format(Number(data.value.actual_amount / 100))

const moneyArr: VNode[] = []
if (props.row.original.handling_fee > 0) {
  const handling_fee = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(props.row.original.handling_fee / 100)
  moneyArr.push(h('div', '手续费: ' + handling_fee))
}

if (props.row.original.handling_fee_fixed > 0) {
  const handling_fee_fixed = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY'
  }).format(props.row.original.handling_fee_fixed)

  moneyArr.push(h('div', `固定手续费：${handling_fee_fixed}`))
}

if (props.row.original.handling_fee_percent > 0) {
  moneyArr.push(h('div', `手续费比例：${props.row.original.handling_fee_percent}%`))
}

const dropdownOpen = ref(false)
const changeOpen = (value: boolean) => {
  if (props.loading) return
  dropdownOpen.value = value
}

watchEffect(() => {
  if (props.open === false) {
    dropdownOpen.value = false
  }
})
</script>

<template>
  <DropdownMenu v-model:open="dropdownOpen" @update:open="changeOpen">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
        <icon-mdi:dots-horizontal class="h-4 w-4" />
        <span class="sr-only">Open menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-[160px]">
      <DropdownMenuLabel>操作</DropdownMenuLabel>
      <Dialog
        :open="props.open"
        @update:open="
          (val: boolean) => {
            if (props.loading) return
            emits('update:setOpen', val)
          }
        "
      >
        <DialogTrigger>
          <DropdownMenuItem @select="(e) => e.preventDefault()"> 详情 </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent>
          <Loader :loading="loading">
            <DialogHeader>
              <DialogTitle class="flex space-x-2">
                <span> 支付记录 </span>
                <div class="text-xs">更新时间 {{ data.updated_at }}</div>
              </DialogTitle>
              <DialogDescription class="items-center text-center">
                <div
                  class="inline-block rounded-lg my-2 p-3 bg-gray-100 dark:bg-muted/50 font-bold"
                  :class="[
                    data.pay_status == 1 ? 'text-green!' : '',
                    data.pay_status == 2 ? 'text-red!' : '',
                    data.pay_status == 3 ? 'text-yellow' : ''
                  ]"
                >
                  {{ data.pay_status_label }}
                </div>
                <div class="space-y-1 text-center">
                  <h4 class="text-sm font-medium leading-none color-indigo-400">Thank you!</h4>
                  <p class="text-sm text-muted-foreground">如果您有任何疑问，请联系我们。</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <div class="container">
              <Separator class="my-1" />
              <div class="grid grid-cols-2 justify-items-center text-center">
                <div class="space-y-2">
                  <Label class="text-lg font-medium">支付渠道</Label>
                  <div class="text-sm text-muted-foreground">{{ data.payment_name }}</div>
                </div>
                <div class="space-y-1">
                  <Label class="text-lg font-medium">支付金额</Label>
                  <div class="text-sm text-muted-foreground">{{ pay_money }}</div>
                </div>
                <div class="space-y-2">
                  <Label class="text-lg font-medium">创建时间</Label>
                  <div class="text-sm text-muted-foreground">{{ data.created_at }}</div>
                </div>
                <div class="space-y-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <Label class="text-lg font-medium flex items-center cursor-pointer">
                          手续费
                          <icon-ri:error-warning-line class="ml-1 size-4 color-red-600" />
                        </Label>
                        <div class="text-sm text-muted-foreground">
                          {{ handling_fee }}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent class="z-999999999999">
                        <component v-for="(item, index) in moneyArr" :key="index" :is="item" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div class="space-y-1">
                  <Label class="text-lg font-medium">支付截止</Label>
                  <div class="text-sm text-muted-foreground">
                    {{ data.pay_status == 1 ? '-' : data.expire_time }}
                  </div>
                </div>
                <div class="space-y-1">
                  <Label class="text-lg font-medium">到账金额</Label>
                  <div class="text-sm text-muted-foreground">{{ actual_amount }}</div>
                </div>
              </div>
            </div>
            <template v-if="data.pay_status == 0 || data.pay_status == 4">
              <Separator class="my-2" />
              <slot name="pay-slot"></slot>
              <Separator class="my-2" />
              <DialogFooter>
                <Button
                  variant="outline"
                  @click="emits('update:cancelRecord', props.row.index)"
                  v-if="data.pay_status == 0"
                >
                  取消
                </Button>
                <Button @click="emits('update:payRecord', props.row.index)">{{
                  data.pay_status == 0 ? '支付' : '继续处理'
                }}</Button>
              </DialogFooter>
            </template>
          </Loader>
        </DialogContent>
      </Dialog>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
