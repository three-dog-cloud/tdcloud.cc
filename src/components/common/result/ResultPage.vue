<template>
  <div class="w-full h-full flex justify-center items-center absolute inset-0">
    <NSpin :show="loading">
      <NResult :title="props.title" :status="status" :description="props.description">
        <template v-if="$slots.icon" #icon>
          <slot name="icon" :status="status" />
        </template>
        <template #footer v-if="status === 'success'">
          <slot name="operation">
            <Button @click="closePage">{{ `${refSec} s 后关闭页面` }}</Button>
          </slot>
        </template>
      </NResult>
    </NSpin>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { NSpin, NResult } from 'naive-ui'
import { Button } from '@/components/ui/button'
import type { ResultProps, ResultStatusType } from './types'

const props = withDefaults(defineProps<ResultProps>(), {
  sec: 5,
  loading: false,
  status: 'info',
  init: () => {},
  operation: () => {
    window.close()
  }
})

const status = ref<ResultStatusType>(props.status)
watch(status, (newVal: ResultStatusType) => {
  if (newVal === 'success') {
    setInterval(() => {
      refSec.value -= 1
    }, 1000)
  }
})

const refSec = ref(props.sec)
watch(refSec, (newVal) => {
  if (newVal === 0) {
    closePage()
  }
})

const closePage = () => {
  window.close()
}

onMounted(() => {
  props.init(status)
})
</script>
