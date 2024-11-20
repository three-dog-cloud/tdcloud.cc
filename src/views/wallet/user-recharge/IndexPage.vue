<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useWalletStore } from '@/stores/personal'
import { storeToRefs } from 'pinia'
import { formatCoinTranslation, cn } from '@/lib'
import { RedemptionCodeForm, RechargeForm } from './components'
import { onMounted, ref } from 'vue'
import { NSpin } from 'naive-ui'
import { TopUpRecord } from './components/top-up-record'
import { TopUp } from '@/api/personal'
import type { IErrorResponse } from '@/api'
import { toast } from 'vue-sonner'

const walletStore = storeToRefs(useWalletStore())

const loading = ref(false)
const setLoading = (value: boolean) => {
  loading.value = value
}

const payments = ref<TopUp.Payment[]>([])
const initPayment = () => {
  TopUp.getPaymentList()
    .then((res) => {
      payments.value = res
    })
    .catch((err: IErrorResponse) => {
      toast.error(err.error)
    })
}

onMounted(() => {
  initPayment()
})
</script>

<template>
  <div class="flex items-center justify-center px-4">
    <NSpin :show="loading" class="w-sm md:w-md">
      <Card :class="cn('min-w-sm sm:min-w-full sm:w-full')">
        <CardHeader
          :class="cn('items-center text-center', 'dark:bg-gray-900 bg-gray-100 rounded-t-lg')"
        >
          <CardTitle class="flex">
            <span>余额：</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger :class="cn('flex flex-row items-center')">
                  <component :is="formatCoinTranslation(walletStore.getBalance.value)"></component>
                </TooltipTrigger>
                <TooltipContent :class="cn('text-lg font-bold')">
                  {{ walletStore.getBalance.value.toLocaleString() + ' 铜币' }}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Separator :class="cn('my-5')" label="兑换余额" />
          <RedemptionCodeForm
            class="space-x-4"
            v-model:loading="loading"
            @update:loading="setLoading"
          />
          <Separator :class="cn('my-5 mt-10')" label="在线充值" />
          <RechargeForm
            class="space-x-4"
            v-model:loading="loading"
            @update:loading="setLoading"
            :payment-list="payments"
          />
        </CardContent>
      </Card>
    </NSpin>
  </div>
  <div class="mt-10">
    <TopUpRecord :payments="payments" :parent-loading="loading" />
  </div>
</template>
