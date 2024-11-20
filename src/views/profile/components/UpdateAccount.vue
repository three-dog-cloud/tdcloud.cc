<script setup lang="ts">
import * as z from 'zod'
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AutoForm, AutoFormField } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-vue-next'
import { User } from '@/api/personal'
import type { IErrorResponse } from '@/api'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/stores/personal'
import { nextTick } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const open = ref(false)
const loading = ref(false)
const showError = ref<string>('')
const value = ref<Record<string, any>>({})

const setOpen = () => {
  form.submitForm
  loading.value = true
  User.updateAccountUsername({ username: value.value.username })
    .then(() => {
      loading.value = false
      open.value = false
      nextTick(() => {
        form.resetForm()
        useUserStore().initUserInfo()
        toast.success('用户名更新成功')
      })
    })
    .catch((err: IErrorResponse) => {
      loading.value = false
      open.value = false
      toast.error(err.error)
      showError.value = err.error
    })
}
const schema = z.object({
  username: z
    .string({
      description: '用户名',
      required_error: '用户名不能为空'
    })
    .min(6, {
      message: '用户名长度不能少于6个字符'
    })
    .max(20, {
      message: '用户名长度不能超过20个字符'
    })
})

const form = useForm({
  validationSchema: toTypedSchema(schema)
})

const onSubmit = (values: Record<string, any>) => {
  value.value = values
  open.value = true
}
</script>

<template>
  <Card>
    <CardHeader class="dark:bg-gray-900 bg-gray-100 rounded-t-lg">
      <CardTitle>账户名称设置</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4 p-6 text-sm">
      <div class="grid gap-4">
        <AutoForm
          :schema="schema"
          :form="form"
          @submit="onSubmit"
          class="space-y-6"
          :field-config="{
            username: {
              hideLabel: true,
              inputProps: {
                placeholder: useUserStore().username
              }
            }
          }"
        >
          <template #username="slotProps">
            <div class="flex items-start gap-3">
              <div class="flex-1">
                <AutoFormField v-bind="slotProps" />
              </div>
              <div>
                <AlertDialog
                  :open="open"
                  @update:open="
                    (value: boolean) => {
                      if (!value) {
                        open = value
                      }
                    }
                  "
                >
                  <AlertDialogTrigger as-child>
                    <Button type="submit">更新</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>确定要更新用户名吗？</AlertDialogTitle>
                      <AlertDialogDescription>
                        <p>注意此操作不可逆，请谨慎操作！</p>
                        <template v-if="showError.length > 0">
                          <div class="text-red-500">{{ showError }}</div>
                        </template>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel :disabled="loading">取消</AlertDialogCancel>
                      <Button type="primary" @click="setOpen()" :disabled="loading">
                        <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading" />
                        确认
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </template>
        </AutoForm>
      </div>
    </CardContent>
  </Card>
</template>
