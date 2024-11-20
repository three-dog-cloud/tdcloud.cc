<script setup lang="ts">
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import {
  AlertDialog,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Loader } from '@/components/common/loader'
import { PayPayment } from '@/components/common/pay-payment'
import { MoneyComponent } from '@/components/common/money'
import { NBadge } from 'naive-ui'
import type { Commodity } from '@/api/shopping'
import { CardDialog } from './components'
import { ref } from 'vue'
import { useCommodityDetailService, usePaymentService } from './data'
import { formatCoinTranslation, cn } from '@/lib'
import { toast } from 'vue-sonner'
import useOrderAmountService from './order-amount'
import useBuyingService from './buying'
import { Loader2 } from 'lucide-vue-next'
import { DOCS_CURRENCY_URL } from '@/config/docs'

const { commodity } = defineProps<{
  commodity: Commodity.ICommodityResponse
}>()

const { loading, commodityDetailsignal, product, formData, validator } = useCommodityDetailService(
  commodity.gd_no
)

const { paymentSignal, payments } = usePaymentService()

const open = ref(false)
const selectPayment = ref<string>('')

const { price } = useOrderAmountService(
  product.value?.retail_price ?? commodity.retail_price,
  selectPayment,
  formData,
  payments
)

const setBuyNumber = (value: number) => {
  formData.value.quantity = value
}

const buyCommodity = async () => {
  validator()
  if (selectPayment.value?.length === 0) {
    toast.error('请选择支付方式')
    buyOpen.value = false
    return
  }

  if (product.value && product.value.other_ipu_cnf.some((item) => item.status)) {
    toast.error('请填写辅助信息')
    buyOpen.value = false
    return
  }

  await useBuyingService(formData.value, loading, selectPayment.value, () => {
    buyOpen.value = false
  })
}

const buyOpen = ref<boolean>(false)
</script>

<template>
  <CardDialog
    :title="commodity.gd_name"
    :open="open"
    @update:open="
      (value) => {
        open = value
        paymentSignal = value
        commodityDetailsignal = value
      }
    "
  >
    <ScrollArea class="h-full p-4">
      <Loader :loading="loading">
        <div class="max-w-screen-lg px-4 mx-auto 2xl:px-0">
          <div class="text-center" v-if="!product">暂无商品信息，如果这是错误，请联系管理员</div>
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16" v-else>
            <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                :src="product.picture_url"
                class="h-full w-full object-cover object-center"
                @load="() => (loading = false)"
              />
            </div>

            <div class="mt-0">
              <h1 class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                {{ product.gd_name }}
              </h1>

              <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger class="flex flex-row items-center">
                      <span class="line-through">
                        <component :is="formatCoinTranslation(product.actual_price)" />
                      </span>
                      /
                      <component :is="formatCoinTranslation(product.retail_price)" />
                    </TooltipTrigger>
                    <TooltipContent class="text-lg z-99999999">
                      {{
                        $t('shopping.discounted.original_cost') +
                        product.actual_price.toLocaleString() +
                        $t('console.wallet_card.unit')
                      }},
                      {{
                        $t('shopping.discounted.sell_price') +
                        product.retail_price.toLocaleString() +
                        $t('console.wallet_card.unit')
                      }}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger as-child>
                      <Avatar>
                        <AvatarImage src="https://bing.ee123.net/img/rand" alt="商家/作者" />
                        <AvatarFallback>{{ product.connected_user_name }}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent class="text-lg z-99999999">
                      <span>商家/作者:</span>
                      {{ product.connected_user_name }}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    库存：<NBadge
                      :max="999"
                      :value="product.in_stock"
                      type="info"
                      show-zero
                      class="text-gray-900!"
                    />
                  </span>
                  <span class="text-sm font-medium text-gray-900 dark:text-white">
                    销量：<NBadge
                      :max="999"
                      :value="product.sales_volume"
                      type="info"
                      show-zero
                      class="text-gray-900!"
                    />
                  </span>
                </div>
              </div>

              <Separator class="mt-4 border-t-2 border-gray-200 dark:border-gray-700" />

              <div
                v-if="product.wholesale_price_cnf.length > 0 && product.buy_limit_num > 1"
                class="mt-4 sm:gap-4 sm:items-center sm:flex"
              >
                <div v-for="(item, index) in product.wholesale_price_cnf" :key="index">
                  <div class="flex items-center grid grid-cols-2 gap-4">
                    <div class="text-sm font-medium text-gray-900">
                      单次购买：{{ item.buy_number }}
                    </div>
                    <div class="text-sm font-medium text-gray-900 flex">
                      价格：
                      <component :is="formatCoinTranslation(item.price)" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="w-full my-4 grid grid-cols-2 gap-2 flex-wrap">
                <Label for="buy-amount" class="col-span-2 sm:col-span-1 text-lg"> 购买数量 </Label>
                <NumberField
                  :min="1"
                  :max="product.buy_limit_num"
                  :default-value="formData.quantity"
                  :model-value="formData.quantity"
                  @update:model-value="setBuyNumber"
                  class="col-span-2 sm:col-span-1"
                >
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>

                <template v-for="(item, index) in product.other_ipu_cnf" :key="index">
                  <Label :for="item.label" class="col-span-2 sm:col-span-1 text-lg">
                    {{ item.label }}
                  </Label>
                  <Input
                    type="text"
                    :placeholder="'请输入' + item.label"
                    class="col-span-2 sm:col-span-1"
                    :class="[item.status && item.status.length > 0 ? 'border-red-500' : '']"
                    v-model="formData.other_ipu[item.key]"
                  />
                </template>
              </div>

              <Separator class="mt-4 border-t-2 border-gray-200 dark:border-gray-700" />

              <div class="mt-4 sm:gap-2 sm:items-center sm:flex sm:flex-wrap">
                <PayPayment
                  :price="price"
                  :payments="payments"
                  :payment="selectPayment"
                  :loading="loading"
                  :isShowPrice="true"
                  @update:payment="
                    (payment: string) => {
                      if (selectPayment === payment) {
                        return
                      }

                      selectPayment = payment
                    }
                  "
                  @update:price="(newPrice: number) => (price = newPrice)"
                >
                  <a
                    :href="DOCS_CURRENCY_URL"
                    target="_blank"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >支付说明</a
                  >
                </PayPayment>
              </div>

              <Separator class="mt-4 border-t-2 border-gray-200 dark:border-gray-700" />

              <!-- action -->
              <slot>
                <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8 grid grid-cols-2 gap-4">
                  <div class="flex items-center grid grid-cols-2 gap-1 w-full md:w-1/2">
                    <Label for="total-price"> 总价 </Label>
                    <MoneyComponent :money="price" />
                  </div>
                  <div class="flex items-center justify-end grid grid-cols-1 gap-2 w-full md:w-1/2">
                    <AlertDialog v-model:open="buyOpen">
                      <AlertDialogTrigger as-child>
                        <Button>购买</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent class="z-99999999 w-full md:w-1/2 justify-end">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {{ $t('shopping.confirm_buy.title') }}
                          </AlertDialogTitle>
                          <AlertDialogDescription v-if="product.buy_prompt?.length > 0">
                            <div v-html="product.buy_prompt"></div>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel :disabled="loading">{{
                            $t('common.cancel')
                          }}</AlertDialogCancel>
                          <Button type="primary" @click="buyCommodity" :disabled="loading">
                            <Loader2 :class="cn('w-4 h-4 mr-2 animate-spin')" v-if="loading" />
                            {{ $t('common.confirm') }}
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </slot>
            </div>
          </div>

          <div class="mt-8">
            <div class="md:flex md:flex-row">
              <Label class="w-20 text-lg font-semibold text-gray-900 dark:text-white"
                >商品描述</Label
              >
              <div class="w-[calc(100%-10)] flex items-center space-x-1 flex-wrap">
                <n-tag
                  v-for="(tag, i) in product?.gd_keywords"
                  :key="i"
                  size="small"
                  class="rounded-full"
                >
                  {{ tag }}
                </n-tag>
              </div>
            </div>
            <div v-html="product?.gd_description" class="mt-2"></div>
          </div>
        </div>
      </Loader>
    </ScrollArea>
  </CardDialog>
</template>
