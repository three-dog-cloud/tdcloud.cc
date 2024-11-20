<script setup lang="ts">
import type { TopUp } from '@/api/personal'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { ref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    price: number
    oldPayment: string
    payments: TopUp.Payment[]
    loading: boolean
    payment: string
  }>(),
  {
    price: 0,
    loading: false,
    payment: ''
  }
)

const emits = defineEmits<{
  'update:payment': [string]
  'update:price': [number]
}>()

const setPayment = (value: string | string[]) => {
  if (Array.isArray(value)) {
    emits('update:payment', value[0])
  } else {
    emits('update:payment', value)
  }
}

const money = ref<number>(0)

if (props.oldPayment != '') {
  setPayment(props.oldPayment)
}

watchEffect(() => {
  if (props.payment) {
    const payHandle = props.payments.find((item) => item.uuid === props.payment)
    if (payHandle) {
      let tmpPrice = props.price / 100
      if (payHandle.handling_fee_fixed > 0) {
        tmpPrice += payHandle.handling_fee_fixed
      }

      if (payHandle.handling_fee_percent > 0) {
        let tmpPercentPrice = parseFloat(
          (tmpPrice * (payHandle.handling_fee_percent / 100)).toFixed(2)
        )
        if (tmpPercentPrice > payHandle.handling_fee_percent_max) {
          tmpPercentPrice = payHandle.handling_fee_percent_max
        }

        tmpPrice += tmpPercentPrice
      }
      money.value = tmpPrice
      emits('update:price', tmpPrice)
    }
  }
})
</script>

<template>
  <div class="sm:gap-2 sm:items-center sm:flex sm:flex-wrap">
    <div class="flex items-center justify-between w-full mt-4">
      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">支付方式</div>
      <div class="text-sm font-medium text-indigo-600 hover:text-indigo-500 text-size-xs">
        默认创建支付渠道，可选其他，注意手续费，悬浮查看手续费详情
      </div>
    </div>
    <ToggleGroup
      variant="outline"
      type="single"
      class="mt-2 grid grid-cols-4 md:grid-cols-5 gap-5 md:gap-6"
      :model-value="payment"
      @update:model-value="setPayment"
    >
      <ToggleGroupItem
        v-for="item in props.payments"
        :key="item.uuid"
        :value="item.uuid"
        class="px-1! py-2!"
        :aria-label="item.name"
        :variant="'outline'"
        :disabled="props.loading"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <img
                :src="item.icon"
                :alt="item.name"
                class="rounded-md object-cover size-6 md:size-8 object-scale-down"
              />
            </TooltipTrigger>
            <TooltipContent class="text-sm text-gray-900">
              <p>{{ item.name }}</p>
              <template v-if="props.oldPayment !== item.uuid">
                <template v-if="item.handling_fee_fixed > 0">
                  <p class="flex items-center">固定手续费：￥{{ item.handling_fee_fixed }}</p>
                </template>
                <template v-if="item.handling_fee_percent > 0">
                  <p>手续费：{{ item.handling_fee_percent }}%</p>
                </template>
                <template v-if="item.handling_fee_percent_max > 0">
                  <p class="flex items-center">
                    手续费比例最高扣除：￥{{ item.handling_fee_percent_max }}
                  </p>
                </template>
                <p>
                  实际支付:
                  {{
                    new Intl.NumberFormat('zh-CN', {
                      style: 'currency',
                      currency: 'CNY'
                    }).format(Number(money))
                  }}
                </p>
              </template>

              <template v-else>
                <p>选我就是继续支付</p>
              </template>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
