<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import { TopUp } from '@/api/personal'
import { computed, ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import type { IErrorResponse } from '@/api'
import { useWalletStore } from '@/stores/personal'

const props = withDefaults(
  defineProps<{
    loading: boolean
    paymentList: TopUp.Payment[]
  }>(),
  {
    loading: false
  }
)

const emit = defineEmits<{
  (event: 'update:loading', value: boolean): void
}>()

const paymentList = computed(() => props.paymentList)

const price = ref<number>(10)
const payment = ref<string>('')
const setPayment = (value: string | string[]) => {
  if (from.values.money === undefined) {
    return
  }

  if (Array.isArray(value)) {
    payment.value = value[0]
  } else {
    payment.value = value === undefined ? '' : value
  }

  if (!payment.value) {
    price.value = from.values.money
    return
  }

  const payHandle = paymentList.value.find((item) => item.uuid === payment.value)
  if (payHandle) {
    let tmpPrice = price.value
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

    price.value = tmpPrice
  }
}

/** ============= Form Schema ============ */

const formSchema = toTypedSchema(
  z.object({
    money: z
      .number({
        required_error: '',
        invalid_type_error: '金额格式错误'
      })
      .min(10, {
        message: '最低10，充值金额太少了'
      })
      .max(500, {
        message: '最高500, 超出限制直接联系管理员，手续费太坑了'
      })
      .default(10)
  })
)

const from = useForm({
  validationSchema: formSchema
})

watch(from.values, (newValue: Record<string, number>) => {
  if (newValue.money != price.value) {
    price.value = newValue.money
    setPayment(payment.value === undefined ? '' : payment.value)
  }
})

const onSubmit = from.handleSubmit((values: Record<string, number>) => {
  if (payment.value === '') {
    toast.error('请选择支付方式')
    return
  }

  emit('update:loading', true)
  TopUp.createTopUpRedirect({
    money: values.money,
    payment: payment.value
  })
    .then((res) => {
      setTimeout(() => {
        window.open(res.redirect, '_blank')
      }, 2000)
      let timeout = res.expire_time
      toast.promise(
        () =>
          new Promise<TopUp.CheckPayStatusResponse>((resolve, reject) => {
            const timer = setInterval(() => {
              TopUp.checkPayStatus({
                session: res.trade_no,
                payment: payment.value
              })
                .then((res) => {
                  if (res.status === 1002) {
                    clearInterval(timer)
                    clearTimeout(timeoutTimer)
                    resolve(res)
                  }
                })
                .catch((err: IErrorResponse) => {
                  clearInterval(timer)
                  clearTimeout(timeoutTimer)
                  reject(err)
                })
            }, 4000)

            const timeoutTimer = setInterval(() => {
              timeout -= 1
              if (timeout <= 0) {
                clearInterval(timer)
                clearInterval(timeoutTimer)
                reject({ error: '支付超时，请重新尝试', code: -408 })
              }
            }, 1000)
          }),
        {
          loading: '等待支付中，请勿关闭页面......',
          success: (data: TopUp.CheckPayStatusResponse) => {
            useWalletStore().initWallet()
            emit('update:loading', false)
            from.resetForm()
            setPayment('')
            return data.status_label
          },
          error: (err: IErrorResponse) => {
            useWalletStore().initWallet()
            emit('update:loading', false)
            return err.error
          },
          position: 'top-center'
        }
      )
    })
    .catch((err: IErrorResponse) => {
      emit('update:loading', false)
      toast.error(err.error)
    })
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="money">
      <FormItem>
        <FormLabel class="text-lg font-bold flex justify-between">
          <span>实付金额：￥{{ isNaN(price) ? 0 : price }}</span>
          <Button type="submit" :disabled="props.loading"> 充值 </Button>
        </FormLabel>
        <FormControl>
          <NumberField
            id="money"
            :default-value="price"
            :format-options="{
              style: 'currency',
              currency: 'CNY',
              currencyDisplay: 'code',
              currencySign: 'accounting'
            }"
            :min="0"
            :max="500"
            v-bind="componentField"
            :disabled="props.loading"
          >
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </FormControl>
        <FormMessage />

        <div class="sm:gap-2 sm:items-center sm:flex sm:flex-wrap">
          <div class="flex items-center justify-between w-full mt-4">
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">支付方式</div>
            <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              支付说明
            </a>
          </div>
          <ToggleGroup
            variant="outline"
            type="single"
            class="mt-2 grid grid-cols-4 md:grid-cols-5 gap-5 md:gap-6"
            :model-value="payment"
            @update:model-value="setPayment"
          >
            <ToggleGroupItem
              v-for="item in paymentList"
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
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </FormItem>
    </FormField>
  </form>
</template>
