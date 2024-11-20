<template>
  <Result
    :title="title"
    :description="statusMessage"
    :responseMessage="responseMessage"
    :retryFunc="payCallback"
    :successFunc="goToOrderDetails"
    :init="payCallback"
  />
</template>

<script setup lang="ts">
import { Result, type StatusType } from '@/components/common/result'
import type { IErrorResponse, IResponse } from '@/api'
import { PayGateway } from '@/api/pay'
import router from '@/router'
import { ref, type Ref } from 'vue'

const title = ref('确认支付中')
const responseMessage = ref('')
const statusMessage = ref('')

const titleMap = (status: StatusType) => {
  switch (status) {
    case 'loading':
      return '确认支付中'
    case 'success':
      return '支付成功'
    case 'error':
      return '支付失败'
    default:
      return '未知状态，请联系管理员'
  }
}
const statusMessageMap = (status: StatusType) => {
  switch (status) {
    case 'loading':
      return '请稍候，我们正在处理您的支付'
    case 'success':
      return '您的支付已成功处理'
    case 'error':
      return '抱歉，支付过程中出现了问题'
    default:
      return '未知状态，请联系管理员'
  }
}

const payCallback = (status: Ref<StatusType>) => {
  setTimeout(() => {
    PayGateway.callbackPayGateway(router.currentRoute.value.query)
      .then((res: IResponse) => {
        status.value = 'success'
        responseMessage.value = res.message
      })
      .catch((err: IErrorResponse) => {
        responseMessage.value = err.error
        status.value = 'error'
      })
      .finally(() => {
        title.value = titleMap(status.value)
        statusMessage.value = statusMessageMap(status.value)
      })
  }, 2000)
}

const goToOrderDetails = () => {
  // TODO: go to order details page
  router.push({ name: 'OrderUserPage' })
}
</script>
