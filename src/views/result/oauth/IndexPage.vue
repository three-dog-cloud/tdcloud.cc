<template>
  <Result
    :title="title"
    :description="description"
    :response-message="responseMessage"
    :init="func === 'bind' ? bindFun : callbackFun"
  >
    <template #operating-area="{ status }">
      <Button
        @click="closePage"
        variant="outline"
        :disabled="func !== 'bind'"
        v-if="status !== 'error' || isShowButton"
      >
        {{ sec + `秒后` + (func === 'bind' ? '自动关闭' : '回到主页') }}
      </Button>
    </template>
  </Result>
</template>

<script setup lang="ts">
import { Result, type StatusType } from '@/components/common/result'
import type { IErrorResponse } from '@/api'
import { OAuth } from '@/api/personal'
import { nextTick, ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { useTokenStore } from '@/stores'

const router = useRouter()
const func = router.currentRoute.value.params.func
const platform = router.currentRoute.value.params.platform
const params = router.currentRoute.value.query

const getterTitle = (status: StatusType) => {
  const msg = `${func === 'bind' ? '绑定' : '授权'} ${platform.toString()} `

  switch (status) {
    case 'loading':
      return `${msg}中...`
    case 'success':
      return `${msg}成功`
    case 'error':
      return `${msg}失败`
    default:
      return '错误，请联系管理员'
  }
}

const getterDescription = (status: StatusType) => {
  switch (status) {
    case 'loading':
      return '正在探索服务器的世界...'
    case 'success':
      return '成功与终端建立连接'
    case 'error':
      return '终端拒绝了你的想法'
    default:
      return '错误，请联系管理员'
  }
}

const isShowButton = ref(false)
const title = ref<string>(getterTitle('loading'))
const description = ref<string>(getterDescription('loading'))
const responseMessage = ref<string>('')

const sec = ref(5)
const setSec = () => {
  sec.value = sec.value - 1
}

const bindFun = (status: Ref<StatusType>) => {
  OAuth.bindAccountOAuth(platform.toString(), params)
    .then((res) => {
      status.value = 'success'
      responseMessage.value = res.message || '绑定成功'
      setInterval(() => {
        setSec()
        if (sec.value === 0) {
          closePage()
        }
      }, 1000)
    })
    .catch((err: IErrorResponse) => {
      status.value = 'error'
      responseMessage.value = err.error
    })
    .finally(() => {
      title.value = getterTitle(status.value)
      description.value = getterDescription(status.value)
    })
}

const callbackFun = (status: Ref<StatusType>) => {
  OAuth.callbackAccountOAuth(platform.toString(), params)
    .then((res) => {
      status.value = 'success'
      const interval = setInterval(() => {
        setSec()
        if (sec.value === 0) {
          clearInterval(interval)

          nextTick(() => {
            const tokenStore = useTokenStore()
            tokenStore.setToken(res.token, res.token_timeout)
            tokenStore.setRefreshToken(res.refresh_token, res.refresh_token_timeout)

            router.push({ name: 'HomePage' })
          })
        }
      }, 1000)
    })
    .catch((err: IErrorResponse) => {
      status.value = 'error'
      if (err.code === 20114) {
        err.error += '，你是不是没有注册账户呢？'
      }
      responseMessage.value = err.error
      if (err.code === 30101) {
        // client params error
        isShowButton.value = true
        const interval = setInterval(() => {
          setSec()
          if (sec.value === 0) {
            clearInterval(interval)

            nextTick(() => {
              router.push({ name: 'LoginPage' })
            })
          }
        }, 1000)
      }
    })
    .finally(() => {
      title.value = getterTitle(status.value)
      description.value = getterDescription(status.value)
    })
}

const closePage = () => {
  window.close()
}
</script>
