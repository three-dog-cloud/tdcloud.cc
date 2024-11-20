<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormField, FormItem, FormControl, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Wallet } from '@/api/personal'
import { toast } from 'vue-sonner'
import { useWalletStore } from '@/stores/personal'
import type { IErrorResponse } from '@/api'

const props = withDefaults(
  defineProps<{
    loading: boolean
  }>(),
  {
    loading: false
  }
)

const emit = defineEmits<{
  (event: 'update:setLoading', value: boolean): void
}>()

const formSchema = toTypedSchema(
  z.object({
    code: z
      .string({
        required_error: '兑换码不能为空',
        invalid_type_error: '兑换码格式错误'
      })
      .min(26, {
        message: '兑换码格式错误'
      })
      .max(26, {
        message: '兑换码格式错误'
      })
  })
)

const from = useForm({
  validationSchema: formSchema
})

const { handleSubmit } = from

const onSubmit = handleSubmit((values: Record<string, any>) => {
  emit('update:setLoading', true)
  Wallet.useWalletCode(values.code)
    .then((res) => {
      emit('update:setLoading', false)
      useWalletStore().setWallet(res)
      from.resetForm()
      toast.success('兑换成功')
    })
    .catch((err: IErrorResponse) => {
      emit('update:setLoading', false)
      toast.error(err.error || '兑换失败')
    })
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="code">
      <FormItem>
        <FormLabel class="text-lg font-bold flex justify-between">
          <span>兑换码</span>
          <Button type="submit" :disabled="props.loading"> 兑换 </Button>
        </FormLabel>
        <FormControl>
          <Input type="text" placeholder="请输入兑换码" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>
