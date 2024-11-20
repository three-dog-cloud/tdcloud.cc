<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4"
  >
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl font-semibold text-center text-wrap" :class="statusColor">
          {{ props.title }}
        </CardTitle>
        <CardDescription class="text-center text-gray-600 text-wrap" v-if="props.description">
          {{ props.description }}
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-6">
        <div v-if="status === 'loading'" class="space-y-6">
          <div class="flex justify-center">
            <Loader2Icon class="h-12 w-12 text-primary animate-spin" />
          </div>
          <Progress v-model="progress" class="w-full" :class="statusColor" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-3/4" />
          </div>
        </div>
        <div v-else class="flex flex-col items-center space-y-4 text-wrap">
          <CheckCircle2Icon v-if="status === 'success'" class="h-16 w-16 text-green-500" />
          <XCircleIcon v-else-if="status === 'error'" class="h-16 w-16 text-red-500" />
          <Alert v-if="responseMessage" :variant="status === 'success' ? 'default' : 'destructive'">
            <AlertCircleIcon v-if="status === 'error'" class="h-4 w-4" />
            <CheckCircleIcon v-else class="h-4 w-4" />
            <AlertTitle>
              <slot name="alert-title" :status="status">
                {{ status === 'success' ? '操作成功' : '错误详情' }}
              </slot>
            </AlertTitle>
            <AlertDescription>
              {{ responseMessage }}
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
      <CardFooter class="flex justify-center space-x-2">
        <slot name="inverted-timing" v-if="status === 'loading'" :remainingTime="remainingTime">
          <p class="text-sm text-gray-500">预计剩余时间：{{ remainingTime }} 秒</p>
        </slot>

        <slot name="operating-area" v-else :status="status" :retryFunc="retry">
          <Button v-if="status === 'error' && props.retryFunc" @click="retry" variant="outline">
            重试
          </Button>
          <Button v-if="props.successFunc" @click="props.successFunc" variant="outline">
            查看
          </Button>
        </slot>
      </CardFooter>
    </Card>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import {
  Loader2Icon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-vue-next'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { type PageProps, type StatusType } from '.'
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from 'vue'

const props = withDefaults(defineProps<PageProps>(), {
  status: 'loading',
  sec: 10,
  init: (status: Ref<StatusType>) => {
    setTimeout(() => {
      status.value = 'success'
    }, 2000)
  }
})

let interval: number
const progress = ref(0)
const remainingTime = ref(props.sec)
const status = ref(props.status)
const statusColor = computed(() => {
  switch (status.value) {
    case 'loading':
      return 'text-gray-800'
    case 'success':
      return 'text-green-600'
    default:
      return 'text-red-600'
  }
})

onMounted(() => {
  startLoading()
  if (props.init) {
    props.init(status)
  }
})

onUnmounted(() => {
  clearInterval(interval)
})

const startLoading = () => {
  interval = setInterval(() => {
    if (progress.value < 100) {
      if (progress.value + 10 >= 100) {
        progress.value = 95
      } else {
        progress.value += 10
      }
      remainingTime.value = Math.max(0, remainingTime.value - 1)
    } else {
      clearInterval(interval)
    }
  }, 1000)
}

watch(status, (newVal: StatusType) => {
  if (newVal !== 'loading') {
    progress.value = 100
    remainingTime.value = 0
    clearInterval(interval)
  }
})

const retry = () => {
  status.value = 'loading'
  progress.value = 0
  remainingTime.value = 0
  if (interval) {
    clearInterval(interval)
  }

  startLoading()
  if (props.retryFunc) {
    props.retryFunc(status)
    return
  }

  if (props.init) {
    props.init(status)
  }
}
</script>
