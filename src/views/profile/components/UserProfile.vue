<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/personal'
import { toast } from 'vue-sonner'

const user = storeToRefs(useUserStore())

const copyToClipboard = (text: string) => {
  if (text.length > 0) {
    navigator.clipboard.writeText(text)
    toast.success('复制成功')
  }
}
</script>

<template>
  <Card>
    <CardHeader class="dark:bg-gray-900 bg-gray-100 rounded-t-lg">
      <CardTitle>用户信息</CardTitle>
    </CardHeader>
    <CardContent class="text-sm p-3">
      <ul class="grid gap-2 space-y-2">
        <li class="flex items-center space-x-2 sm:space-x-4">
          <Label for="账户编号" class="text-sm md:text-lg font-black">账户编号:</Label>
          <n-ellipsis class="w-1/2 lg:w-auto">
            {{ user.user_no }}
          </n-ellipsis>
          <icon-material-symbols:content-copy-outline
            class="size-6 hover:text-gray-500 cursor-pointer"
            v-if="user.user_no.value.length > 0"
            @click="copyToClipboard(user.user_no.value)"
          />
        </li>
        <li class="flex items-center space-x-2 sm:space-x-4">
          <Label for="账户名称" class="text-sm md:text-lg font-black">账户名称:</Label>
          <n-ellipsis class="w-1/2 lg:w-auto">
            {{ user.username }}
          </n-ellipsis>
          <icon-material-symbols:content-copy-outline
            class="size-6 hover:text-gray-500 cursor-pointer"
            v-if="user.username.value.length > 0"
            @click="copyToClipboard(user.username.value)"
          />
        </li>
        <li class="flex items-center space-x-2 sm:space-x-4">
          <Label for="账户邮箱" class="text-sm md:text-lg font-black">账户邮箱:</Label>
          <n-ellipsis class="w-1/2 lg:w-auto">
            {{ user.email }}
          </n-ellipsis>
          <icon-material-symbols:content-copy-outline
            class="size-6 hover:text-gray-500 cursor-pointer"
            v-if="user.email.value.length > 0"
            @click="copyToClipboard(user.email.value)"
          />
        </li>
        <li class="flex items-center space-x-2 sm:space-x-4">
          <Label for="账户等级" class="text-sm md:text-lg font-black">账户等级:</Label>
          <span>{{ user.beta_level }}</span>
        </li>
        <li class="flex items-center space-x-2 sm:space-x-4">
          <Label for="注册时间" class="text-sm md:text-lg font-black">注册时间:</Label>
          <span>{{ user.created_at }}</span>
        </li>
        <li class="flex items-center space-x-2 sm:space-x-4">
          <Label for="上次登录时间" class="text-sm md:text-lg font-black">上次登录时间:</Label>
          <span>{{ user.last_login_at }}</span>
        </li>
        <li class="flex items-center space-x-2 sm:space-x-4">
          <Label for="上次登录地址" class="text-sm md:text-lg font-black">上次登录地址:</Label>
          <span>{{ user.last_login_ip }}</span>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
