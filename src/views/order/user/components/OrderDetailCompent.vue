<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Loader } from '@/components/common/loader'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { DataRowActions } from '@/components/common/data-tables'
import { Payment, Order } from '@/api/order'
import { computed, ref } from 'vue'
import { copyToClipboard, formatCoinTranslation } from '@/lib'
import type { Row } from '@tanstack/vue-table'
import { PayPayment } from '@/components/common/pay-payment'

interface OrderDetailProps {
  loading?: boolean
  order: Row<Order.IOrderItemResponse>
  payments: Payment.IPayOrderPayment[]
  open: boolean
}

const props = defineProps<OrderDetailProps>()

const emits = defineEmits<{
  'update:setOpen': [boolean]
  'update:cancelRecord': [number]
  'update:payRecord': [number, string]
}>()

const data = computed(() => {
  return props.order.original
})

const price = ref(0)
const payment = ref<string>('')
</script>

<template>
  <DataRowActions>
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
        <DropdownMenuItem @select="(e) => e.preventDefault()"> 查看 </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <Loader :loading="loading ?? false">
          <DialogHeader>
            <DialogTitle class="flex space-x-2">
              <span> 订单详情 </span>
              <div class="text-xs">更新时间 {{ data.updated_at }}</div>
            </DialogTitle>
            <DialogDescription class="items-center text-center">
              <div
                class="inline-block rounded-lg my-2 p-3 bg-gray-100 dark:bg-muted/50 font-bold"
                :class="[
                  data.status == 4 ? 'text-green!' : '',
                  data.status == 2 ? 'text-red!' : '',
                  data.status == 3 ? 'text-yellow' : ''
                ]"
              >
                {{ data.status_label }}
                <p v-if="data.status != 0 && !data.is_auto" class="text-xs text-red">
                  购买商品非自动处理商品，请耐心等待处理结果
                </p>
              </div>
              <div class="space-y-1 text-center">
                <h3
                  class="text-sm font-medium leading-none gap-2 space-x-2 flex justify-center items-center"
                >
                  订单号：{{ data.order_no }}
                  <icon-material-symbols:content-copy-outline
                    class="h-4 w-4 hover:text-gray-500 cursor-pointer"
                    @click="copyToClipboard(data.order_no)"
                  />
                </h3>
                <h4 class="text-sm font-medium leading-none color-indigo-400">Thank you!</h4>
                <p class="text-sm text-muted-foreground">如果您有任何疑问，请联系我们。</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div class="container space-y-4">
            <Separator class="my-1" />
            <template v-if="data.title.length > 0">
              <div class="justify-center text-center text-xl font-bold">
                订单信息：{{ data.title }}
              </div>
            </template>
            <template v-if="data.gd_no && data.gd_no.length > 0">
              <div class="justify-center text-center font-bold">
                商品编号：<span class="text-xs text-yellow-400">{{ data.gd_no }}</span>
              </div>
            </template>
            <div class="grid grid-cols-2 justify-items-center text-center">
              <div class="space-y-2">
                <Label class="text-lg font-medium">订单类型</Label>
                <div class="text-sm text-muted-foreground">{{ data.order_type_label }}</div>
              </div>
              <div class="space-y-1">
                <Label class="text-lg font-medium">商品金额</Label>
                <div class="text-sm text-muted-foreground">
                  <component
                    v-if="data.total_amount > 0"
                    :is="formatCoinTranslation(data.total_amount)"
                  />
                  <span v-else>{{ '-' }}</span>
                </div>
              </div>
              <div class="space-y-2">
                <Label class="text-lg font-medium">创建时间</Label>
                <div class="text-sm text-muted-foreground">{{ data.created_at }}</div>
              </div>
              <div class="space-y-1">
                <Label class="text-lg font-medium flex items-center cursor-pointer">
                  手续费
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger as-child>
                        <icon-ri:error-warning-line class="ml-1 size-4 color-red-600" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>平台收取交易手续费</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div class="text-sm text-muted-foreground">
                  <component
                    v-if="data.handling_amount > 0"
                    :is="formatCoinTranslation(data.handling_amount)"
                  />
                  <span v-else>无手续费</span>
                </div>
              </div>
              <div class="space-y-2">
                <Label class="text-lg font-medium">付款时间</Label>
                <div class="text-sm text-muted-foreground">{{ data.paid_time ?? '-' }}</div>
              </div>
              <div class="space-y-1">
                <Label class="text-lg font-medium">优惠金额</Label>
                <div class="text-sm text-muted-foreground">
                  <component
                    :is="formatCoinTranslation(data.discount_amount)"
                    v-if="data.discount_amount > 0"
                  />
                  <span v-else>无优惠</span>
                </div>
              </div>
              <div class="space-y-2">
                <Label class="text-lg font-medium">支付方式</Label>
                <div class="text-sm text-muted-foreground">
                  {{ data.payment_name.length > 0 ? data.payment_name : '-' }}
                </div>
              </div>
              <div class="space-y-1">
                <Label class="text-lg font-medium">购买数量</Label>
                <div class="text-sm text-muted-foreground">
                  {{ data.quantity }}
                </div>
              </div>
            </div>
          </div>
          <template v-if="data.status < 2">
            <template v-if="data.status == 0">
              <Separator class="my-2" />
              <slot name="pay-slot">
                <PayPayment
                  :oldPayment="''"
                  :payments="props.payments"
                  :price="data.total_amount"
                  :loading="loading ?? false"
                  :payment="payment"
                  @onUpdate:payment="
                    (playload: string) => {
                      payment = playload
                    }
                  "
                  @onUpdate:price="
                    (amount: number) => {
                      price = amount
                    }
                  "
                />
              </slot>
            </template>
            <Separator class="my-2" />
            <DialogFooter>
              <Button
                variant="outline"
                @click="emits('update:cancelRecord', props.order.index)"
                v-if="data.status == 0"
              >
                取消
              </Button>
              <Button @click="emits('update:payRecord', props.order.index, payment)">
                {{ data.status != 0 && data.is_auto ? '重试' : '支付' }}
              </Button>
            </DialogFooter>
          </template>
        </Loader>
      </DialogContent>
    </Dialog>
  </DataRowActions>
</template>
