<template>
  <Result
    :title="title"
    :init="init"
    :sec="5"
    :description="description"
    :response-message="responseMessage"
  >
    <template #alert-title="{ status }">
      {{ status === 'success' ? 'Success' : 'Error' }}
    </template>
    <template #operating-area="{ status, retryFunc }">
      <Button v-if="status === 'error'" @click="retryFunc" variant="outline"> Retry </Button>
      <Button v-if="status === 'success'" variant="outline" @click="redirect">
        View ({{ sec }}s redirect)
      </Button>
    </template>
  </Result>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import { Result, type StatusType } from '@/components/common/result'
import { TopUp } from '@/api/personal'
import router from '@/router'
import type { IErrorResponse, Redirect } from '@/api'
import { Button } from '@/components/ui/button'

let interval: number
const title = ref('Transactions are being processed')
const description = ref('Transactions are being processed, please do not close the page!!!')
const responseMessage = ref('')

const sec = ref(10)
const url = ref('')
watch(url, (newVal) => {
  if (newVal.length > 0) {
    if (interval) {
      clearInterval(interval)
    }

    interval = setInterval(() => {
      sec.value--
      if (sec.value === 0) {
        clearInterval(interval)
        redirect()
      }
    }, 1000)
  }
})

const init = (status: Ref<StatusType>) => {
  setTimeout(() => {
    TopUp.payTopUpSuccess(router.currentRoute.value.query)
      .then((res: Redirect) => {
        status.value = 'success'
        responseMessage.value = 'Top-up successful'
        url.value = res.redirect
      })
      .catch((err: IErrorResponse) => {
        status.value = 'error'
        responseMessage.value = err.error
      })
  }, 2000)
}

const redirect = () => {
  if (url.value.length > 0) {
    // window.location.href = url.value TODO 应该让服务端决定跳转的页面
    window.location.href = '/wallet/top-up'
  } else {
    window.location.href = '/'
  }
}
</script>
