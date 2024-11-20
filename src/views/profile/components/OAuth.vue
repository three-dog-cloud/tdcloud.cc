<script setup lang="ts">
import type { IErrorResponse } from '@/api'
import { OAuth } from '@/api/personal'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription
} from '@/components/ui/alert-dialog'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import { Loader2 } from 'lucide-vue-next'
import { watch } from 'vue'
import { cn } from '@/lib'

const emits = defineEmits<{
  (event: 'update:isBindDiscourse', value: boolean): void
}>()

const oauthObject = ref<OAuth.IAccountOAuthResponse[]>([])

watch(oauthObject, (newVal) => {
  newVal.forEach((item) => {
    if (item.platform.toLocaleLowerCase() === 'discourse') {
      emits('update:isBindDiscourse', item.is_bind)
    }
  })
})

onMounted(() => {
  OAuth.getAccountOAuth()
    .then((res) => {
      oauthObject.value = res
    })
    .catch((err: IErrorResponse) => {
      toast.error(err.error)
    })
})

const open = ref(false)
const loading = ref(false)
const isShowWaitText = ref(false)
const objItem = ref<OAuth.IAccountOAuthResponse | null>(null)
const setOpen = (isClose: boolean = true) => {
  if (objItem.value == null) {
    open.value = false
    return
  }

  if (isClose) {
    objItem.value.is_bind = !objItem.value.is_bind
    return
  }

  loading.value = true

  if (objItem.value.is_bind === false) {
    OAuth.unbindAccountOAuth(objItem.value.connect)
      .then(() => {
        loading.value = false
        open.value = false
        if (objItem.value?.platform.toLowerCase() === 'discourse') {
          emits('update:isBindDiscourse', false)
        }
        toast.success('解绑成功')
      })
      .catch((err: IErrorResponse) => {
        loading.value = false
        open.value = false
        if (objItem.value) {
          objItem.value.is_bind = !objItem.value.is_bind
        }
        toast.error(err.error)
      })
    return
  }

  OAuth.getBindAccountOAuthURL(objItem.value.platform.toLowerCase())
    .then((res) => {
      setTimeout(() => {
        isShowWaitText.value = true
      }, 5000)

      const timer = setInterval(() => {
        OAuth.getAccountOAuth()
          .then((res) => {
            res.forEach((item) => {
              if (
                objItem.value &&
                item.connect === objItem.value.connect &&
                item.is_bind == objItem.value.is_bind
              ) {
                objItem.value = item
                isShowWaitText.value = false
                loading.value = false
                open.value = false
                if (item.platform.toLowerCase() === 'discourse') {
                  emits('update:isBindDiscourse', true)
                }
                clearInterval(timer)
              }
            })
          })
          .catch(() => {})
      }, 5000)
      window.open(res.redirect, '_blank')
    })
    .catch((err: IErrorResponse) => {
      isShowWaitText.value = false
      loading.value = false
      open.value = false
      if (objItem.value) {
        objItem.value.is_bind = !objItem.value.is_bind
      }
      toast.error(err.error)
    })
}
const setOAuth = (item: OAuth.IAccountOAuthResponse) => {
  objItem.value = item
  open.value = true
}
</script>

<template>
  <Card>
    <CardHeader :class="cn('dark:bg-gray-900 bg-gray-100 rounded-t-lg')">
      <CardTitle> 第三方授权 </CardTitle>
    </CardHeader>
    <CardContent :class="cn('grid gap-2 p-3 text-sm')">
      <ul class="grid gap-3">
        <TooltipProvider v-for="(oauth, index) in oauthObject" :key="index">
          <Tooltip>
            <TooltipTrigger>
              <li class="flex items-center justify-between">
                <span class="text-muted-foreground">{{ oauth.platform }}</span>
                <AlertDialog v-model:open="open">
                  <AlertDialogTrigger as-child>
                    <Switch
                      v-model:checked="oauth.is_bind"
                      @update:checked="() => setOAuth(oauth)"
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        确定要{{ !objItem?.is_bind ? '解绑' : '绑定' }} {{ objItem?.platform }}？
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <div v-if="isShowWaitText">
                          正在{{ !objItem?.is_bind ? '解绑' : '绑定' }}，请稍后...
                          <p>如果操作失败或者等待时间过长，请刷新页面重试。</p>
                        </div>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel @click="setOpen()" :disabled="loading"
                        >取消</AlertDialogCancel
                      >
                      <Button type="primary" @click="setOpen(false)" :disabled="loading">
                        <Loader2 :class="cn('w-4 h-4 mr-2 animate-spin')" v-if="loading" />
                        确认
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            </TooltipTrigger>
            <TooltipContent>
              <div v-if="oauth.is_bind">
                <div>账户名称: {{ oauth.username }}</div>
                <div>绑定时间: {{ oauth.bind_time }}</div>
              </div>
              <div v-else>
                <div>尚未绑定</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ul>
    </CardContent>
  </Card>
</template>
