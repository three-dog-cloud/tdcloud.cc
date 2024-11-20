<script setup lang="ts">
import * as z from 'zod'
import { nextTick, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { AutoForm } from '@/components/ui/auto-form'
import { Button } from '@/components/ui/button'
import { toast } from 'vue-sonner'
import { User } from '@/api/personal'
import type { IErrorResponse } from '@/api'

const loading = ref(false)

const schema = z
  .object({
    current_password: z
      .string({
        description: '旧密码',
        required_error: '旧密码不能为空'
      })
      .min(6, {
        message: '密码长度不能少于6位'
      })
      .max(24, {
        message: '密码长度不能超过24位'
      }),
    new_password: z
      .string({
        description: '新密码',
        required_error: '新密码不能为空'
      })
      .min(6, {
        message: '密码长度不能少于6位'
      })
      .max(24, {
        message: '密码长度不能超过24位'
      }),
    new_confirm_password: z
      .string({
        description: '确认密码',
        required_error: '确认密码不能为空'
      })
      .min(6, {
        message: '密码长度不能少于6位'
      })
      .max(24, {
        message: '密码长度不能超过24位'
      })
  })
  .refine((data) => data.new_password === data.new_confirm_password, {
    message: '两次输入的密码不一致',
    path: ['confirm_password']
  })

const form = useForm({
  validationSchema: toTypedSchema(schema)
})

const onSubmit = (values: Record<string, any>) => {
  loading.value = true
  const params: User.IUpdateAccountPasswordParams = {
    old_password: values.current_password,
    password: values.new_password,
    confirm_password: values.new_confirm_password
  }

  User.updateAccountPassword(params)
    .then(() => {
      toast.success('密码更新成功')
      nextTick(() => {
        loading.value = false
        form.resetForm()
      })
    })
    .catch((err: IErrorResponse) => {
      loading.value = false
      toast.error(err.error)
    })
}
</script>

<template>
  <Card>
    <CardHeader class="dark:bg-gray-900 bg-gray-100 rounded-t-lg">
      <CardTitle>登录密码</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-4 p-6 text-sm">
      <div class="grid gap-4">
        <AutoForm
          class="space-y-6"
          :form="form"
          :schema="schema"
          :onSubmit="onSubmit"
          :field-config="{
            current_password: { inputProps: { type: 'password' } },
            new_password: { inputProps: { type: 'password' } },
            new_confirm_password: { inputProps: { type: 'password' } }
          }"
        >
          <Button type="submit" :disabled="loading">更新密码</Button>
        </AutoForm>
      </div>
    </CardContent>
  </Card>
</template>
